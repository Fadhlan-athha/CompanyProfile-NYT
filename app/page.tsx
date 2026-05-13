import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { PortfolioSection } from "@/components/sections/portfolio-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ServicesSection } from "@/components/sections/services-section";
import { StatsSection } from "@/components/sections/stats-section";
import { WhyChooseUsSection } from "@/components/sections/why-choose-us-section";

export default function Home() {
  return (
    <main>
      <HeroSection /> 
      <StatsSection />
      <AboutSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <PortfolioSection />
      <ProcessSection />
      <ContactSection />
    </main>
  );
}
