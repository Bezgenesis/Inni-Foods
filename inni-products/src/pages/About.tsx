import React from 'react';
import { motion } from 'motion/react';

const STATS = [
  { value: '4', label: 'Generations of spice cultivation' },
  { value: '60+', label: 'Years of milling excellence' },
  { value: '60K+', label: 'Happy customers who trust INNI foods' },
] as const;

export function About() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* About INNI */}
      <section id="about-us" className="pt-32 pb-16 md:pb-24 px-6 scroll-mt-20">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-4 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter uppercase leading-[0.95] text-left"
            >
              About
              <br />
              <span className="text-[#E33E2B]">INNI foods</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-8 space-y-5 text-neutral-400 text-base md:text-lg font-light leading-relaxed"
            >
              <p>
                <strong className="font-semibold text-[#E33E2B]">INNI foods</strong> is a premium spice brand
                born from the rich heritage of Coorg and backed by the legacy and expertise of{' '}
                <strong className="font-semibold text-white">Oakroad Ventures Pvt. Ltd.</strong> With{' '}
                <strong className="font-semibold text-white">
                  four generations of experience in spice cultivation
                </strong>{' '}
                and{' '}
                <strong className="font-semibold text-white">
                  over 60 years of milling excellence
                </strong>
                , we are committed to bringing the authentic flavours of traditional Indian cooking
                to modern kitchens. Our products are crafted{' '}
                <strong className="font-semibold text-white">
                  without artificial additives, chemicals, or added colours
                </strong>
                , ensuring purity, authenticity, and exceptional taste in every pack. Today, we are
                proud to serve{' '}
                <strong className="font-semibold text-white">60,000+ happy customers</strong> who
                trust <span className="font-semibold text-[#E33E2B]">INNI foods</span> for its quality,
                consistency, and authentic flavour. We warmly invite more quality-conscious families
                to become a part of the{' '}
                <strong className="font-semibold text-white">
                  <span className="text-[#E33E2B]">INNI foods</span> Family
                </strong>
                , where healthy, natural, and flavourful cooking is a way of life.
              </p>
              <p>
                Driven by a passion for quality, tradition, and authentic taste, we create premium
                spice blends and roasted pure spices using carefully selected ingredients, balanced
                formulations, and specialized roasting techniques. Every product is thoughtfully
                developed to preserve the natural goodness of spices while delivering rich aroma,
                exceptional flavour, and consistent quality.
              </p>
              <p>
                Our portfolio includes roasted masalas, everyday cooking essentials, and specialty
                spices, available in convenient{' '}
                <strong className="font-semibold text-white">single-use sachets</strong> and
                consumer-friendly packs. Our{' '}
                <strong className="font-semibold text-white">
                  complete, ready-to-use masala blends
                </strong>{' '}
                make cooking effortless, delivering authentic flavour, rich aroma, and consistent
                taste in every meal. Whether for families, bachelors, or busy professionals,{' '}
                <span className="font-semibold text-[#E33E2B]">INNI foods</span> brings the trusted taste of
                Coorg&apos;s spice heritage to every kitchen.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature banner */}
      <section className="px-6 pb-16 md:pb-24" aria-label="Feature image">
        <div className="max-w-screen-xl mx-auto">
          <div className="relative h-[40vh] md:h-[55vh] overflow-hidden rounded-2xl sm:rounded-[2rem] border border-white/[0.06] bg-neutral-950">
            <img
              src="/images/about/feature-banner.png"
              alt="Assorted whole spices reflecting Coorg's spice heritage"
              className="absolute inset-0 h-full w-full object-cover brightness-110 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
          </div>
        </div>
      </section>

      {/* Our Promoter */}
      <section
        id="promoter"
        className="px-6 pb-24 md:pb-32 scroll-mt-20"
        aria-labelledby="promoter-heading"
      >
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#E33E2B] font-semibold mb-4">
              Leadership
            </p>
            <h2
              id="promoter-heading"
              className="text-3xl md:text-5xl font-semibold tracking-tighter uppercase mb-6"
            >
              Our Promoter.
            </h2>
            <div className="space-y-5 text-neutral-400 text-base md:text-lg font-light leading-relaxed">
              <p>
                <strong className="font-semibold text-white">Vasantha Machaiah P.</strong>, Promoter
                and Co-Founder of Oakroad Ventures Pvt. Ltd., was introduced to the world of spices
                from an early age. Growing up in Coorg, he learned the traditional art of spice
                preparation by helping his mother with{' '}
                <strong className="font-semibold text-white">stone-grinding</strong> and manual spice
                processing. This early exposure, combined with decades of experience in spice
                milling, laid the foundation for his deep understanding of authentic flavours and
                quality.
              </p>
              <p>
                In addition to his expertise in spices, Mr. Vasantha Machaiah has extensive
                experience in pharmaceutical marketing. He played a significant role in promoting
                the <strong className="font-semibold text-white">Crocin</strong> brand during its
                early years by introducing the product through mission hospitals in Bengaluru,
                contributing to its widespread acceptance before it became one of India&apos;s
                leading pharmaceutical brands.
              </p>
              <p>
                Driven by a vision to provide healthier food choices, he founded{' '}
                <span className="font-semibold text-[#E33E2B]">INNI foods</span> with a commitment to
                delivering premium spices and spice blends that are as natural as possible. His
                philosophy is simple, to help quality-conscious households enjoy authentic flavours
                without the use of artificial additives, chemicals, or added colours. Today, his
                passion continues to guide <span className="font-semibold text-[#E33E2B]">INNI foods</span>{' '}
                in creating pure, hygienic, and flavourful spices inspired by the rich culinary
                heritage of Coorg.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:rounded-[2rem] border border-white/[0.06] bg-neutral-950 md:sticky md:top-28"
          >
            <img
              src="/images/about/promoter-spices.jpg"
              alt="Traditional spices reflecting Coorg culinary heritage"
              className="absolute inset-0 h-full w-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section
        className="py-24 md:py-32 border-t border-white/[0.05] px-6"
        aria-label="INNI foods at a glance"
      >
        <div className="max-w-screen-xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#E33E2B] font-semibold mb-10 md:mb-14 text-center">
            INNI foods by the numbers
          </p>
          <dl className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-6 text-center">
            {STATS.map((stat) => (
              <div key={stat.value} className="space-y-2">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter text-[#E33E2B]">
                  {stat.value}
                </dd>
                <dd className="text-xs sm:text-sm text-neutral-500 font-light leading-snug max-w-[10rem] mx-auto">
                  {stat.label.includes('INNI foods') ? (
                    <>
                      {stat.label.split('INNI foods')[0]}
                      <span className="text-[#E33E2B] font-semibold">INNI foods</span>
                      {stat.label.split('INNI foods')[1]}
                    </>
                  ) : (
                    stat.label
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
