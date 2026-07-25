import React from 'react';
import { motion } from 'motion/react';
import { Bookmark, Heart, MessageCircle, MoreVertical, Send, Star } from 'lucide-react';

const FEATURED_REVIEWS = [
  {
    name: 'Samantha',
    rating: 5,
    avatar: '/images/home/review-avatar-alex.jpg',
    quote:
      'The aroma alone sold me. INNI spices taste cleaner and brighter than anything I have bought in stores, pure flavor in every dish.',
  },
  {
    name: 'Nehitha',
    rating: 5,
    avatar: '/images/home/review-avatar-woman.jpg',
    quote:
      'INNI giving authentic flavour, rich aroma, and consistent taste in every meal.',
  },
] as const;

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          className={i < rating ? 'fill-[#E33E2B] text-[#E33E2B]' : 'text-neutral-700'}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function ReviewBubble({
  review,
  className,
  delay = 0,
}: {
  review: (typeof FEATURED_REVIEWS)[number];
  className?: string;
  delay?: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      <div className="relative rounded-2xl sm:rounded-[1.5rem] border border-white/[0.08] bg-neutral-950/95 backdrop-blur-sm p-4 sm:p-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)]">
        <div className="flex items-center gap-3 pb-3 mb-3 border-b border-white/[0.06]">
          <img
            src={review.avatar}
            alt=""
            className="h-10 w-10 sm:h-11 sm:w-11 rounded-full object-cover border border-white/[0.1] shrink-0"
          />
          <div className="min-w-0">
            <h3 className="text-sm font-semibold tracking-tight text-white truncate">
              {review.name}
            </h3>
            <div className="mt-0.5">
              <StarRating rating={review.rating} />
            </div>
          </div>
        </div>
        <blockquote className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
          “{review.quote}”
        </blockquote>
        <span
          className="absolute -bottom-2 left-8 h-4 w-4 rotate-45 border-b border-r border-white/[0.08] bg-neutral-950/95"
          aria-hidden="true"
        />
      </div>
    </motion.article>
  );
}

function VisualCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-md mx-auto overflow-hidden rounded-2xl sm:rounded-[2rem] border border-white/[0.06] bg-neutral-950 shadow-[0_24px_60px_-20px_rgba(227,62,43,0.15)]"
    >
      <div className="flex items-center justify-end px-4 py-2.5 sm:py-3 border-b border-white/[0.06] bg-neutral-950">
        <MoreVertical size={18} className="text-neutral-500" aria-hidden="true" />
        <span className="sr-only">Post options</span>
      </div>

      <div className="relative aspect-[4/5]">
        <img
          src="/images/home/reviews-chicken-curry.png"
          alt="INNI Chicken Masala featured dish"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="flex items-center justify-between px-4 py-2.5 sm:py-3 border-t border-white/[0.06] bg-neutral-950">
        <div className="flex items-center gap-4 text-neutral-500" aria-hidden="true">
          <Heart size={18} />
          <MessageCircle size={18} />
          <Send size={18} />
        </div>
        <Bookmark size={18} className="text-neutral-500" aria-hidden="true" />
      </div>
    </motion.div>
  );
}

export function ReviewsSection() {
  return (
    <section
      className="relative py-32 md:py-40 border-t border-white/[0.05] overflow-hidden"
      aria-labelledby="reviews-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(227,62,43,0.04),transparent_65%)]" />

      <div className="relative max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-16 items-center">
          {/* Left: title */}
          <div className="lg:col-span-5 text-center lg:text-left">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#E33E2B] font-semibold mb-4">
              What People Say
            </p>
            <h2
              id="reviews-heading"
              className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tighter text-white"
            >
              60,000+ happy customers
            </h2>
          </div>

          {/* Right: image + overlapping reviews */}
          <div className="lg:col-span-7">
            {/* Mobile: stacked */}
            <div className="flex flex-col gap-6 md:hidden">
              <VisualCard />
              {FEATURED_REVIEWS.map((review) => (
                <ReviewBubble key={review.name} review={review} />
              ))}
            </div>

            {/* Desktop: overlapping composition */}
            <div className="relative hidden md:flex md:justify-center md:items-center md:min-h-[32rem] lg:min-h-[36rem] xl:min-h-[40rem]">
              <VisualCard />

              <ReviewBubble
                review={FEATURED_REVIEWS[0]}
                delay={0.12}
                className="absolute z-10 top-[4%] -left-2 lg:-left-4 xl:left-0 w-[min(100%,18rem)] lg:w-[19rem] xl:w-[20rem]"
              />

              <ReviewBubble
                review={FEATURED_REVIEWS[1]}
                delay={0.2}
                className="absolute z-10 bottom-[6%] -right-2 lg:-right-4 xl:right-0 w-[min(100%,18rem)] lg:w-[19rem] xl:w-[20rem]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
