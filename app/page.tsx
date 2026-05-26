import { AmbientEffects } from "@/components/layout/ambient-effects";
import { CustomCursor } from "@/components/layout/custom-cursor";
import { Footer } from "@/components/layout/footer";
import { InvitationInfoModal } from "@/components/layout/invitation-info-modal";
import { MusicToggle } from "@/components/layout/music-toggle";
import { Navbar } from "@/components/layout/navbar";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { AboutSection } from "@/sections/about-section";
import { BridalPartySection } from "@/sections/bridal-party-section";
import { CountdownSection } from "@/sections/countdown-section";
import { DetailsSection } from "@/sections/details-section";
import { FaqSection } from "@/sections/faq-section";
import { GallerySection } from "@/sections/gallery-section";
import { HeroSection } from "@/sections/hero-section";
import { MapSection } from "@/sections/map-section";
// import { RegistrySection } from "@/sections/registry-section";
import { RsvpSection } from "@/sections/rsvp-section";
import { StorySection } from "@/sections/story-section";

export default function Home() {
  return (
    <div className="relative overflow-x-clip bg-[var(--color-ivory)] text-[var(--color-warm-black)]">
      <ScrollProgress />
      <CustomCursor />
      <AmbientEffects />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <StorySection />
      <CountdownSection />
      <DetailsSection />
      <MapSection />
      <BridalPartySection />
      <RsvpSection />
      {/* <RegistrySection /> */}
      <GallerySection />
      <FaqSection />
      <Footer />
      <InvitationInfoModal />
      <MusicToggle />
    </div>
  );
}
