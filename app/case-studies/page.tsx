import localFont from 'next/font/local';
import { CtaSection } from '@/app/components/landingpage';
import CaseStudiesExperience from './CaseStudiesExperience';

const landingGilroy = localFont({
  src: [
    { path: '../../public/fonts/InterTight-Regular.ttf', weight: '300', style: 'normal' },
    { path: '../../public/fonts/InterTight-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/InterTight-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../../public/fonts/InterTight-Bold.ttf', weight: '700', style: 'normal' },
    { path: '../../public/fonts/InterTight-Bold.ttf', weight: '800', style: 'normal' },
  ],
  variable: '--font-gilroy',
  display: 'swap',
});

export default function CaseStudiesPage() {
  return (
    <div className={`${landingGilroy.variable} landing-gilroy bg-castanha-100 text-foreground`}>
      <CaseStudiesExperience />
      <div className="mt-16 lg:mt-[130px]">
        <CtaSection />
      </div>
    </div>
  );
}

