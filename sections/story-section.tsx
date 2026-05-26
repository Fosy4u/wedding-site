"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { loveLetters, storyTimeline } from "@/data/site-content";

export function StorySection() {
  const letters = [loveLetters.hisInk, loveLetters.herInk];

  return (
    <section id="story" className="bg-[var(--color-ivory)] py-24 md:py-32">
      <div className="section-shell">
        <SectionHeading
          centered
          eyebrow="Our Story"
          title="A Love Story Written in Grace"
          description="Moments that shaped our journey from chance encounter to forever."
        />

        <div className="relative mt-14">
          <div className="absolute left-4 top-0 h-full w-px bg-[var(--color-soft-gold)]/40 md:left-1/2" />

          <div className="space-y-9">
            {storyTimeline.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.65, delay: index * 0.08 }}
                className={`relative ml-12 rounded-3xl border border-[var(--color-soft-gold)]/20 bg-white p-6 shadow-[0_18px_40px_rgba(26,26,26,0.07)] md:ml-0 md:w-[calc(50%-1.5rem)] ${
                  index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                }`}
              >
                <div className="absolute -left-10 top-9 h-4 w-4 rounded-full border-2 border-[var(--color-soft-gold)] bg-[var(--color-burgundy)] md:left-auto md:top-10 md:h-5 md:w-5 md:border-4 md:bg-[var(--color-burgundy)]" />
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-soft-gold)]">
                  {item.date}
                </p>
                <h3 className="mt-2 font-heading text-3xl text-[var(--color-warm-black)]">
                  {item.title}
                </h3>
                <p className="mt-3 leading-7 text-[var(--color-muted-green)]/90">
                  {item.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="relative mt-20 overflow-hidden rounded-[2rem] border border-[var(--color-soft-gold)]/30 bg-gradient-to-br from-[rgba(253,249,242,0.95)] via-[rgba(243,230,210,0.5)] to-[rgba(253,249,242,0.98)] p-7 shadow-[0_26px_50px_rgba(26,23,20,0.12)] md:p-10">
          <div className="pointer-events-none absolute inset-0 opacity-45 [background:radial-gradient(circle_at_20%_20%,rgba(111,29,53,0.1),transparent_40%),radial-gradient(circle_at_80%_12%,rgba(209,168,111,0.18),transparent_38%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-soft-gold)]/70 to-transparent" />

          <SectionHeading
            centered
            eyebrow="Love Letters"
            title="His Ink & Her Ink"
            description="Two hearts, two voices, one testimony of how grace, timing, and laughter led us here."
            className="relative z-10"
          />

          <div className="relative z-10 mt-10 grid gap-6 lg:grid-cols-2">
            {letters.map((letter, index) => (
              <motion.article
                key={letter.title}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="rounded-3xl border border-[var(--color-soft-gold)]/30 bg-[rgba(255,255,255,0.72)] p-6 shadow-[0_16px_35px_rgba(26,23,20,0.08)] backdrop-blur-sm md:p-7"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-soft-gold)]">
                  {letter.title}
                </p>
                <h3 className="mt-2 font-heading text-3xl leading-tight text-[var(--color-warm-black)] md:text-4xl">
                  {letter.subtitle}
                </h3>

                <div className="mt-6 space-y-4">
                  {letter.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-sm leading-7 text-[var(--color-muted-green)]/92 md:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
