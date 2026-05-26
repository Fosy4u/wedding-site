"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function CustomCursor() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const cursorX = useSpring(x, { stiffness: 300, damping: 25 });
  const cursorY = useSpring(y, { stiffness: 300, damping: 25 });

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      x.set(event.clientX - 12);
      y.set(event.clientY - 12);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[80] hidden h-6 w-6 rounded-full border border-[var(--color-soft-gold)]/60 bg-[var(--color-soft-gold)]/10 backdrop-blur-sm lg:block"
      style={{ x: cursorX, y: cursorY }}
    />
  );
}
