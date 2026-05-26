"use client";

import { motion } from "framer-motion";
import { ProfileCard } from "@/components/ui/profile-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { bridalParty } from "@/data/site-content";

export function BridalPartySection() {
  return (
    <section id="party" className="bg-[var(--color-champagne)] py-24 md:py-32">
      <div className="section-shell space-y-14">
        <SectionHeading
          centered
          eyebrow="Bridal Party"
          title="Our Closest Circle"
          description="The family and friends standing beside us as we say yes forever."
        />

        <div className="space-y-6">
          <h3 className="font-heading text-3xl text-[var(--color-warm-black)]">
            Bridesmaids
          </h3>
          <div className="grid gap-5 md:grid-cols-3">
            {bridalParty.bridesmaids.map((person, index) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.07, duration: 0.6 }}
              >
                <ProfileCard {...person} />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="font-heading text-3xl text-[var(--color-warm-black)]">
            Groomsmen
          </h3>
          <div className="grid gap-5 md:grid-cols-3">
            {bridalParty.groomsmen.map((person, index) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.07, duration: 0.6 }}
              >
                <ProfileCard {...person} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
