"use client";

import { motion } from "framer-motion";
import { CountdownItem } from "@/components/ui/countdown-item";
import { SectionHeading } from "@/components/ui/section-heading";
import { useCountdown } from "@/hooks/use-countdown";
import { weddingInfo } from "@/data/site-content";

export function CountdownSection() {
  const countdown = useCountdown(weddingInfo.dateISO);

  return (
    <section className="relative overflow-hidden bg-[var(--color-warm-black)] py-24 text-[var(--color-ivory)] md:py-32">
      <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[var(--color-burgundy)]/30 blur-3xl" />
      <div className="section-shell relative space-y-10">
        <SectionHeading
          centered
          eyebrow="Countdown"
          title="The Celebration Begins Soon"
          description="We cannot wait to dance, pray, and celebrate this chapter with you."
          className="[&_h2]:text-[var(--color-ivory)] [&_p]:text-[var(--color-ivory)]/80"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          <CountdownItem label="Days" value={countdown.days} />
          <CountdownItem label="Hours" value={countdown.hours} />
          <CountdownItem label="Minutes" value={countdown.minutes} />
          <CountdownItem label="Seconds" value={countdown.seconds} />
        </motion.div>
      </div>
    </section>
  );
}
