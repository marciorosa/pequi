import localFont from 'next/font/local';
import {
  FaqSection,
  FeaturesSection,
  HomeHeroIntroInteractive,
  LogosSection,
  PlatformCapabilitiesSection,
  PricingSection,
  SecurityStrip,
  TestimonialSection,
  WhySection,
} from './components/landingpage';

export default function Home() {
  return (
    <main className="landing-gilroy bg-white text-foreground">
      <HomeHeroIntroInteractive />
      <LogosSection />
      <div className="mt-[130px] space-y-16 lg:space-y-[130px]">
        <FeaturesSection />
        <SecurityStrip />
        <WhySection />
        <PricingSection />
        <PlatformCapabilitiesSection />
        <TestimonialSection />
        <FaqSection />
      </div>
    </main>
  );
}
