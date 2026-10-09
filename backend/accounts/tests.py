from unittest.mock import MagicMock, patch
from django.core import mail
from django.test import TestCase, override_settings
from accounts.email_service import send_admin_otp_email
from notifications.brevo_backend import EmailBackend, send_brevo_api_email


class BrevoEmailTestCase(TestCase):
    @override_settings(EMAIL_BACKEND='django.core.mail.backends.locmem.EmailBackend')
    def test_send_admin_otp_email_locmem(self):
        send_admin_otp_email('admin@example.com', '123456')
        self.assertEqual(len(mail.outbox), 1)
        self.assertIn('123456', mail.outbox[0].body)
        self.assertEqual(mail.outbox[0].to, ['admin@example.com'])

    @patch('notifications.brevo_backend.urlopen')
    @override_settings(
        EMAIL_BACKEND='notifications.brevo_backend.EmailBackend',
        BREVO_API_KEY='test-xkeysib-api-key',
        DEFAULT_FROM_EMAIL='INNI Foods <admin@innifoods.com>',
    )
    def test_send_brevo_api_email_https(self, mock_urlopen):
        mock_response = MagicMock()
        mock_response.read.return_value = b'{"messageId": "<test@brevo>"}'
        mock_response.__enter__.return_value = mock_response
        mock_urlopen.return_value = mock_response

        send_brevo_api_email(
            to_email='admin@example.com',
            subject='Test Subject',
            html_content='<p>Test</p>',
            text_content='Test',
        )

        self.assertTrue(mock_urlopen.called)
        request_obj = mock_urlopen.call_args[0][0]
        self.assertEqual(request_obj.full_url, 'https://api.brevo.com/v3/smtp/email')
        self.assertEqual(request_obj.headers['Api-key'], 'test-xkeysib-api-key')

