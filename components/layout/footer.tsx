import { AtSign, Heart, Camera, MessageCircleMore } from "lucide-react";
import { weddingInfo } from "@/data/site-content";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--color-soft-gold)]/20 bg-[var(--color-warm-black)] py-14 text-[var(--color-ivory)]">
      <div className="mx-auto flex w-[min(1120px,92%)] flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
          <p className="font-heading text-3xl">{weddingInfo.initials}</p>
          <p className="mt-1 text-sm tracking-[0.2em] uppercase text-[var(--color-soft-gold)]">
            {weddingInfo.hashtag}
          </p>
        </div>

        <div className="flex items-center gap-5 text-sm text-[var(--color-ivory)]/80">
          <a
            href="#"
            aria-label="Instagram"
            className="hover:text-[var(--color-soft-gold)]"
          >
            <AtSign size={18} />
          </a>
          <a
            href="#"
            aria-label="X"
            className="hover:text-[var(--color-soft-gold)]"
          >
            <MessageCircleMore size={18} />
          </a>
          <a
            href="#"
            aria-label="Photo stream"
            className="hover:text-[var(--color-soft-gold)]"
          >
            <Camera size={18} />
          </a>
        </div>
      </div>

      <div className="mx-auto mt-8 flex w-[min(1120px,92%)] items-center justify-center gap-2 text-xs tracking-[0.08em] uppercase text-[var(--color-ivory)]/60">
        Crafted with{" "}
        <Heart size={13} className="text-[var(--color-burgundy)]" /> for a
        timeless love story. By{" "}
        <a
          href="https://uk.linkedin.com/in/foster-ogwudu-781208174"
          className="underline hover:text-[var(--color-soft-gold)]"
        >
          Foster Ogwudu
        </a>
        .
      </div>
    </footer>
  );
}
