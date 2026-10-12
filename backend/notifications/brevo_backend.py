"""
Django email backend that sends via Brevo's HTTPS transactional API.

SMTP is blocked on many PaaS hosts (including Railway Hobby). HTTPS is not.
https://developers.brevo.com/reference/send-transac-email
"""

from __future__ import annotations

import base64
import json
import logging
import ssl
from email.utils import parseaddr
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from django.conf import settings
from django.core.mail.backends.base import BaseEmailBackend
from django.core.mail.message import EmailMessage, sanitize_address

logger = logging.getLogger(__name__)

BREVO_SEND_URL = 'https://api.brevo.com/v3/smtp/email'


def _split_address(address: str, default_name: str = '') -> dict[str, str]:
    name, email = parseaddr(address)
    email = (email or address or '').strip().strip('<').strip('>')
    name = (name or '').strip().strip('"').strip("'")
    result: dict[str, str] = {'email': email}
    if name:
        result['name'] = name
    elif default_name:
        result['name'] = default_name
    return result


def _html_and_text(message: EmailMessage) -> tuple[str | None, str | None]:
    html_content = None
    text_content = message.body or None
    alternatives = getattr(message, 'alternatives', None) or []
    for content, mimetype in alternatives:
        if mimetype == 'text/html':
            html_content = content
            break
    if html_content is None and text_content and message.content_subtype == 'html':
        html_content = text_content
        text_content = None
    return html_content, text_content


def _get_brevo_api_key() -> str:
    key = getattr(settings, 'BREVO_API_KEY', '').strip().strip('"').strip("'")
    return key


class EmailBackend(BaseEmailBackend):
    def send_messages(self, email_messages: list[EmailMessage]) -> int:
        if not email_messages:
            return 0

        api_key = _get_brevo_api_key()
        if not api_key:
            logger.error('BREVO_API_KEY is not configured; cannot send email via Brevo API')
            if not self.fail_silently:
                raise RuntimeError(
                    'BREVO_API_KEY is not configured. '
                    'Please set BREVO_API_KEY in environment variables.'
                )
            return 0

        sent = 0
        for message in email_messages:
            try:
                self._send(message, api_key)
                sent += 1
            except Exception as exc:
                logger.exception('Brevo email send failed for subject=%r: %s', message.subject, exc)
                if not self.fail_silently:
                    raise
        return sent

    def _send(self, message: EmailMessage, api_key: str) -> None:
        encoding = message.encoding or settings.DEFAULT_CHARSET
        from_email = sanitize_address(
            message.from_email or settings.DEFAULT_FROM_EMAIL,
            encoding,
        )
        sender = _split_address(from_email, default_name='INNI Foods')
        if not sender.get('email') or '@' not in sender['email']:
            raise RuntimeError(f'Invalid DEFAULT_FROM_EMAIL: {from_email!r}')

        recipients = [
            _split_address(sanitize_address(addr, encoding))
            for addr in message.to
            if addr and '@' in addr
        ]
        if not recipients:
            raise RuntimeError('Email has no recipients')

        payload: dict = {
            'sender': sender,
            'to': recipients,
            'subject': message.subject or '',
        }
        if message.cc:
            payload['cc'] = [
                _split_address(sanitize_address(addr, encoding))
                for addr in message.cc if addr and '@' in addr
            ]
        if message.bcc:
            payload['bcc'] = [
                _split_address(sanitize_address(addr, encoding))
                for addr in message.bcc if addr and '@' in addr
            ]
        if message.reply_to:
            payload['replyTo'] = _split_address(sanitize_address(message.reply_to[0], encoding))

        html_content, text_content = _html_and_text(message)
        if html_content:
            payload['htmlContent'] = html_content
        if text_content:
            payload['textContent'] = text_content
        if not html_content and not text_content:
            payload['textContent'] = ' '

        attachments = []
        for attachment in message.attachments:
            if isinstance(attachment, tuple) and len(attachment) >= 2:
                filename, content = attachment[0], attachment[1]
                if isinstance(content, bytes):
                    attachments.append(
                        {
                            'name': filename,
                            'content': base64.b64encode(content).decode('ascii'),
                        }
                    )
        if attachments:
            payload['attachment'] = attachments

        body = json.dumps(payload).encode('utf-8')
        request = Request(
            BREVO_SEND_URL,
            data=body,
            method='POST',
            headers={
                'accept': 'application/json',
                'content-type': 'application/json',
                'api-key': api_key,
                'user-agent': 'InniBackend/1.0',
            },
        )
        try:
            with urlopen(request, timeout=20, context=ssl.create_default_context()) as response:
                response.read()
                logger.info('Brevo HTTPS API email sent successfully to %r', [r['email'] for r in recipients])
        except HTTPError as exc:
            detail = exc.read().decode('utf-8', errors='replace')
            logger.error('Brevo API HTTP %s: %s', exc.code, detail)
            raise RuntimeError(f'Brevo API HTTP {exc.code}: {detail}') from exc
        except URLError as exc:
            logger.error('Brevo API connection failed: %s', exc.reason)
            raise RuntimeError(f'Brevo API connection failed: {exc.reason}') from exc


def send_brevo_api_email(
    *,
    to_email: str,
    subject: str,
    html_content: str,
    text_content: str | None = None,
    from_email: str | None = None,
    reply_to: str | None = None,
) -> None:
    """
    Directly sends an email via Brevo HTTPS API v3.
    If EMAIL_BACKEND is configured as console/locmem in dev, delegates to Django core mail.
    """
    from django.core.mail import EmailMultiAlternatives

    backend_name = getattr(settings, 'EMAIL_BACKEND', '')
    if backend_name.endswith(('console.EmailBackend', 'locmem.EmailBackend')):
        msg = EmailMultiAlternatives(
            subject=subject,
            body=text_content or '',
            from_email=from_email or settings.DEFAULT_FROM_EMAIL,
            to=[to_email],
        )
        if html_content:
            msg.attach_alternative(html_content, 'text/html')
        if reply_to:
            msg.reply_to = [reply_to]
        msg.send(fail_silently=False)
        return

    msg = EmailMultiAlternatives(
        subject=subject,
        body=text_content or '',
        from_email=from_email or settings.DEFAULT_FROM_EMAIL,
        to=[to_email],
    )
    if html_content:
        msg.attach_alternative(html_content, 'text/html')
    if reply_to:
        msg.reply_to = [reply_to]

    backend = EmailBackend(fail_silently=False)
    backend.send_messages([msg])

