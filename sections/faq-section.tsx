"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { faqItems } from "@/data/site-content";

export function FaqSection() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section className="bg-[var(--color-muted-beige)]/40 py-24 md:py-32">
      <div className="section-shell space-y-10">
        <SectionHeading
          centered
          eyebrow="FAQ"
          title="Before the Big Day"
          description="Helpful answers for a smooth and joyful celebration."
        />

        <div className="mx-auto w-full max-w-3xl space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = active === index;
            return (
              <article
                key={item.question}
                className="overflow-hidden rounded-2xl border border-[var(--color-soft-gold)]/30 bg-white/80"
              >
                <button
                  type="button"
                  onClick={() => setActive(isOpen ? null : index)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <span className="font-medium text-[var(--color-warm-black)]">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`transition ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-7 text-[var(--color-muted-green)]/85">
                        {item.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
