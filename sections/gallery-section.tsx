"use client";

import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { GalleryItem } from "@/components/ui/gallery-item";
import { SectionHeading } from "@/components/ui/section-heading";
import { galleryImages } from "@/data/site-content";

export function GallerySection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  useEffect(() => {
    if (!emblaApi) return;
    const timer = window.setInterval(() => emblaApi.scrollNext(), 3500);
    return () => window.clearInterval(timer);
  }, [emblaApi]);

  return (
    <section id="gallery" className="bg-[var(--color-ivory)] py-24 md:py-32">
      <div className="section-shell space-y-10">
        <SectionHeading
          centered
          eyebrow="Gallery"
          title="Fragments of Our Love"
          description="A preview of the romance, laughter, and joy leading into our celebration."
        />

        <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
          <div className="flex">
            {galleryImages.slice(0, 5).map((src, index) => (
              <div
                key={src}
                className="relative min-w-0 flex-[0_0_86%] pl-3 sm:flex-[0_0_62%] md:flex-[0_0_42%]"
              >
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.08, duration: 0.6 }}
                  className="relative aspect-[4/5] overflow-hidden rounded-3xl"
                >
                  <Image
                    src={src}
                    alt={`Hero gallery slide ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {galleryImages.map((src, index) => (
            <div key={`${src}-${index}`} className="mb-4 break-inside-avoid">
              <GalleryItem src={src} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
