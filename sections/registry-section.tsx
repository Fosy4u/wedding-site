"use client";

import { motion } from "framer-motion";
import { Gift, Wallet, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { registryLinks } from "@/data/site-content";

const iconSet = [Gift, Gift, Wallet, Plane];

export function RegistrySection() {
  return (
    <section id="registry" className="bg-[var(--color-ivory)] py-24 md:py-32">
      <div className="section-shell space-y-12">
        <SectionHeading
          centered
          eyebrow="Gift Registry"
          title="A Thoughtful Way to Bless Us"
          description="Your presence is our greatest gift. If you wish to give more, here are a few meaningful options."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {registryLinks.map((item, index) => {
            const Icon = iconSet[index % iconSet.length];
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
                className="group flex h-full flex-col rounded-3xl border border-[var(--color-soft-gold)]/30 bg-[var(--color-champagne)]/30 p-6"
              >
                <Icon className="text-[var(--color-burgundy)]" size={22} />
                <h3 className="mt-4 font-heading text-2xl text-[var(--color-warm-black)]">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-7 text-[var(--color-muted-green)]/85">
                  {item.description}
                </p>
                <Button
                  href={item.href}
                  className="mt-6 w-fit"
                  variant={item.href === "#" ? "ghost" : "primary"}
                >
                  Visit
                </Button>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
