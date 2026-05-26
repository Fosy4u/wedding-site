"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

const SHOW_DELAY_MS = 10_000;
const DISMISS_KEY = "wedding-invite-info-dismissed";

export function InvitationInfoModal() {
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
    window.localStorage.setItem(DISMISS_KEY, "true");
  };

  const handleIndicateInterest = () => {
    closeModal();

    const rsvpSection = document.getElementById("rsvp");
    if (rsvpSection) {
      rsvpSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const dismissed = window.localStorage.getItem(DISMISS_KEY) === "true";

    if (dismissed) {
      return;
    }

    const timerId = window.setTimeout(() => {
      setOpen(true);
    }, SHOW_DELAY_MS);

    return () => {
      window.clearTimeout(timerId);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[rgba(13,12,11,0.58)] px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-xl rounded-3xl border border-[var(--color-soft-gold)]/40 bg-[var(--color-ivory)] p-6 shadow-[0_30px_70px_rgba(0,0,0,0.3)] md:p-8">
        <button
          type="button"
          onClick={closeModal}
          className="absolute right-4 top-4 rounded-full p-2 text-[var(--color-muted-green)] transition hover:bg-[var(--color-muted-beige)]/50"
          aria-label="Close invitation notice"
        >
          <X size={18} />
        </button>

        <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-soft-gold)]">
          Important Notice
        </p>
        <h3 className="mt-2 pr-10 font-heading text-[clamp(1.2rem,3.7vw,2.2rem)] leading-tight whitespace-nowrap text-[var(--color-warm-black)]">
          Attendance Is By Invitation Only
        </h3>
        <p className="mt-4 text-sm leading-7 text-[var(--color-muted-green)]/90 md:text-base">
          You can indicate interest by submitting the RSVP form. Approved guests
          will receive a special invitation card with their details, and reception
          location.
        </p>
        <p className="mt-3 text-sm leading-7 text-[var(--color-muted-green)]/90 md:text-base">
          If you do not receive your invitation card closer to the date, please
          reach out to the couple directly.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleIndicateInterest}
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-burgundy)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-ivory)] transition-transform duration-300 hover:scale-[1.03] hover:bg-[var(--color-burgundy-2)]"
          >
            Indicate Interest
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="inline-flex items-center justify-center rounded-full border border-[var(--color-soft-gold)] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-muted-green)] transition hover:bg-[var(--color-muted-beige)]/35"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
