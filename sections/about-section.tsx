"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { about } from "@/data/site-content";

function PersonCard({
  name,
  title,
  bio,
  hobbies,
  image,
}: {
  name: string;
  title: string;
  bio: string;
  hobbies: string[];
  image: string;
}) {
  return (
    <GlassCard className="bg-[var(--color-ivory)]/70">
      <div className="relative mb-5 h-[440px] overflow-hidden rounded-2xl">
        {/* TODO: Replace with personal portrait image. */}
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-burgundy)]">
        {title}
      </p>
      <h3 className="mt-2 font-heading text-3xl text-[var(--color-warm-black)]">
        {name}
      </h3>
      <p className="mt-3 text-sm leading-7 text-[var(--color-muted-green)]/90">
        {bio}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {hobbies.map((hobby) => (
          <span
            key={hobby}
            className="rounded-full border border-[var(--color-soft-gold)]/40 px-3 py-1 text-xs uppercase tracking-[0.1em] text-[var(--color-muted-green)]"
          >
            {hobby}
          </span>
        ))}
      </div>
    </GlassCard>
  );
}

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative bg-[var(--color-champagne)] py-24 md:py-32"
    >
      <div className="section-shell space-y-12">
        <SectionHeading
          centered
          eyebrow="The Couple"
          title="Two Hearts, One Heritage"
          description="An intentional union rooted in friendship, faith, family, and a love that feels both gentle and extraordinary."
        />

        <div className="grid gap-7 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
          >
            <PersonCard {...about.bride} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: 0.12, duration: 0.7 }}
          >
            <PersonCard {...about.groom} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
