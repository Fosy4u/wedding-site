"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  Church,
  Shirt,
  Hotel,
  MapPinHouse,
  Clock3,
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { weddingDetails } from "@/data/site-content";

const icons = [Church, MapPinHouse, Clock3, Shirt, Hotel, CalendarDays];

export function DetailsSection() {
  return (
    <section
      id="details"
      className="bg-[var(--color-muted-beige)]/50 py-24 md:py-32"
    >
      <div className="section-shell space-y-12">
        <SectionHeading
          centered
          eyebrow="Wedding Details"
          title="Everything You Need for the Day"
          description="From ceremony to celebration, here are the key details for your seamless experience."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {weddingDetails.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
              >
                <GlassCard className="h-full bg-white/75">
                  <Icon className="text-[var(--color-burgundy)]" size={22} />
                  <h3 className="mt-4 font-heading text-2xl text-[var(--color-warm-black)]">
                    {item.label}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--color-muted-green)]/90">
                    {item.value}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
