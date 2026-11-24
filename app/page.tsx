import localFont from 'next/font/local';
import {
  FaqSection,
  FeatureShowcase,
  FeaturesSection,
  HomeHeroIntroInteractive,
  PlatformCapabilitiesSection,
  PricingSection,
  SecurityStrip,
  WhySection,
} from './components/landingpage';

export default function Home() {
  return (
    <main className="landing-gilroy bg-background text-foreground">
      <HomeHeroIntroInteractive />
      <div>
        <FeaturesSection />
        <FeatureShowcase />
        <SecurityStrip />
        <WhySection />
        <PricingSection />
        <PlatformCapabilitiesSection />
        <FaqSection />
      </div>
    </main>
  );
}
