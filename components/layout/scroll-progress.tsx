"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useScrollProgress } from "@/hooks/use-scroll-progress";

export function ScrollProgress() {
  const progress = useScrollProgress();
  const width = useSpring(progress, {
    stiffness: 140,
    damping: 28,
    mass: 0.2,
  });
  const widthPercent = useTransform(width, (value) => `${value}%`);

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-[70] h-1 origin-left bg-[linear-gradient(90deg,var(--color-burgundy),var(--color-soft-gold))]"
      style={{ width: widthPercent }}
    />
  );
}
