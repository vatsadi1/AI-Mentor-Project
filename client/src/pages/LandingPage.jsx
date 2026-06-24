import HeroSection from "../components/landing/HeroSection";
import ServicesSection from "../components/landing/ServicesSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import HowItWorksSection from "../components/landing/HowItWorksSection";
import FaqSection from "../components/landing/FaqSection";
import CtaSection from "../components/landing/CtaSection";
import MarketingLayout from "../components/layout/MarketingLayout";

export default function LandingPage() {
  return (
    <MarketingLayout>
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <FeaturesSection />
      <FaqSection />
      <CtaSection />
    </MarketingLayout>
  );
}
