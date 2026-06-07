"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type ProfileCardProps = {
  name: string;
  role: string;
  image: string;
  highlighted?: boolean;
};

export function ProfileCard({
  name,
  role,
  image,
  highlighted,
}: ProfileCardProps) {
  return (
    <motion.article
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25 }}
      className="group overflow-hidden rounded-3xl border border-[var(--color-soft-gold)]/25 bg-white"
    >
      <div className="relative h-100 overflow-hidden">
        {/* TODO: Replace with real bridal party portraits. */}
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        {highlighted ? (
          <span className="absolute left-4 top-4 rounded-full bg-[var(--color-burgundy)] px-3 py-1 text-xs uppercase tracking-[0.14em] text-[var(--color-ivory)]">
            Highlight
          </span>
        ) : null}
      </div>
      <div className="p-5 text-center">
        <h4 className="font-heading text-2xl text-[var(--color-warm-black)]">
          {name}
        </h4>
        <p className="mt-1 text-sm uppercase tracking-[0.16em] text-[var(--color-muted-green)]/75">
          {role}
        </p>
      </div>
    </motion.article>
  );
}
