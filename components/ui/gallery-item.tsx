"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

type GalleryItemProps = {
  src: string;
  index: number;
};

export function GalleryItem({ src, index }: GalleryItemProps) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block overflow-hidden rounded-2xl"
      >
        {!loaded ? (
          <div className="absolute inset-0 animate-pulse bg-[var(--color-muted-beige)]" />
        ) : null}
        {/* TODO: Replace with your engagement/pre-wedding photos. */}
        <Image
          src={src}
          alt={`Wedding gallery ${index + 1}`}
          width={800}
          height={1100}
          onLoad={() => setLoaded(true)}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/15" />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.button
            type="button"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] grid place-items-center bg-black/80 p-5"
            aria-label="Close image preview"
          >
            <motion.div
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              className="relative h-[75vh] w-full max-w-3xl overflow-hidden rounded-2xl"
            >
              <Image
                src={src}
                alt={`Wedding gallery full ${index + 1}`}
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.button>
        ) : null}
      </AnimatePresence>
    </>
  );
}
