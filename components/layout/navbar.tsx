"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { weddingInfo } from "@/data/site-content";

const links = [
  { label: "Home", href: "#home" },
  { label: "Our Story", href: "#story" },
  { label: "Wedding Details", href: "#details" },
  { label: "Bridal Party", href: "#party" },
  { label: "Gallery", href: "#gallery" },
  { label: "RSVP", href: "#rsvp" },
  // { label: "Registry", href: "#registry" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed left-0 top-0 z-[60] w-full px-4 py-4 md:px-8">
      <nav
        className={`mx-auto flex w-[min(1200px,100%)] items-center justify-between rounded-full border px-5 py-3 transition duration-300 md:px-7 ${
          scrolled
            ? "border-white/30 bg-black/40 text-[var(--color-ivory)] backdrop-blur-xl"
            : "border-white/20 bg-white/10 text-[var(--color-ivory)] backdrop-blur-md"
        }`}
      >
        <Link
          href="#home"
          className="font-heading text-2xl tracking-[0.1em]"
          aria-label="Go to top"
        >
          {weddingInfo.initials}
        </Link>

        <ul className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-xs uppercase tracking-[0.17em] text-[var(--color-ivory)]/90 transition hover:text-[var(--color-soft-gold)]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button href="#rsvp" variant="outline" className="px-4 py-2 text-xs">
            RSVP
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex text-[var(--color-ivory)] lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mx-auto mt-3 flex w-[min(1200px,100%)] flex-col gap-3 rounded-3xl border border-white/30 bg-black/75 p-5 backdrop-blur-xl lg:hidden"
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-2 py-2 text-sm uppercase tracking-[0.18em] text-[var(--color-ivory)] transition hover:bg-white/10"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
