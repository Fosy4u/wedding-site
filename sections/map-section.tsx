import { MapPinned } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { weddingInfo } from "@/data/site-content";

export function MapSection() {
  return (
    <section className="bg-[var(--color-ivory)] py-24 md:py-32">
      <div className="section-shell space-y-10">
        <SectionHeading
          centered
          eyebrow="Venue Map"
          title="Plan Your Trip to Enugu"
          description="Reception venue details are shared with invited guests closer to the date."
        />

        <div className="overflow-hidden rounded-3xl border border-[var(--color-soft-gold)]/30 bg-white p-3 shadow-[0_24px_60px_rgba(0,0,0,0.1)] md:p-5">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
            <iframe
              title="Wedding venue map"
              src={weddingInfo.mapEmbed}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-4 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-soft-gold)]">
                Venue
              </p>
              <p className="flex items-center gap-2 font-heading text-2xl text-[var(--color-warm-black)]">
                <MapPinned size={20} className="text-[var(--color-burgundy)]" />
                Enugu State, Nigeria (exact reception location shared by invite)
              </p>
            </div>
            <Button href={weddingInfo.mapDirections}>Get Directions</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
