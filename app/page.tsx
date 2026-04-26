import { HeroSection } from "@/components/hero/HeroSection";
import { TrustBar } from "@/components/sections/TrustBar";
import { TaglineSection } from "@/components/sections/TaglineSection";
import { TeamSection } from "@/components/team/TeamSection";
import { ClientSplitSection } from "@/components/sections/ClientSplitSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { CtaStrip } from "@/components/sections/CtaStrip";

export default function Home() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <TrustBar />
      <TaglineSection />
      <TeamSection />
      <ClientSplitSection />
      <TestimonialSection />
      <CtaStrip />
    </main>
  );
}
