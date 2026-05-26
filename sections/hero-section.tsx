"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CountdownItem } from "@/components/ui/countdown-item";
import { useCountdown } from "@/hooks/use-countdown";
import { weddingInfo } from "@/data/site-content";

export function HeroSection() {
  const countdown = useCountdown(weddingInfo.dateISO);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-28">
  
      <Image
        src={weddingInfo.heroImageMobile}
        alt="Elegant wedding moment"
        fill
        priority
        className="object-cover md:hidden"
      />
      <Image
        src={weddingInfo.heroImageDesktop}
        alt="Elegant wedding splash"
        fill
        priority
        className="hidden object-cover md:block"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,17,14,0.38)_0%,rgba(19,17,14,0.76)_48%,rgba(19,17,14,0.92)_100%)]" />

      <div className="relative z-10 mx-auto flex w-[min(1160px,92%)] flex-col items-center justify-center gap-8 py-20 text-center text-[var(--color-ivory)]">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xs uppercase tracking-[0.35em] text-[var(--color-gold)]"
        >
          Save the Date
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.9 }}
          className="font-heading text-5xl leading-[1.04] md:text-7xl lg:text-8xl"
        >
          {weddingInfo.couple}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8 }}
          className="text-sm uppercase tracking-[0.26em] md:text-base"
        >
          {weddingInfo.dateText}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="grid w-full max-w-2xl grid-cols-2 gap-3 md:grid-cols-4"
        >
          <CountdownItem label="Days" value={countdown.days} />
          <CountdownItem label="Hours" value={countdown.hours} />
          <CountdownItem label="Minutes" value={countdown.minutes} />
          <CountdownItem label="Seconds" value={countdown.seconds} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-2 flex flex-col gap-3 sm:flex-row"
        >
          <Button href="#rsvp">RSVP</Button>
          <Button href="#story" variant="outline">
            View Story
          </Button>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 h-44 w-full bg-[radial-gradient(circle_at_50%_100%,rgba(209,168,111,0.35),transparent_65%)]" />
    </section>
  );
}
