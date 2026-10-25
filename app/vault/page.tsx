import localFont from 'next/font/local';
import VaultExperience from './VaultExperience';

const landingInterTight = localFont({
  src: [
    { path: '../../public/fonts/InterTight-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/InterTight-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../../public/fonts/InterTight-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '../../public/fonts/InterTight-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-landing',
  display: 'swap',
});

export default function VaultPage() {
  return (
    <div className={`${landingInterTight.variable} landing-gilroy bg-[#FFFFFF] text-foreground`}>
      <VaultExperience />
    </div>
  );
}

