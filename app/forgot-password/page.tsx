import localFont from 'next/font/local';
import ForgotPasswordExperience from './ForgotPasswordExperience';

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

export default function ForgotPasswordPage() {
  return (
    <div className={`${landingInterTight.variable} landing-gilroy bg-[#FFFFFF] text-foreground`}>
      <ForgotPasswordExperience />
    </div>
  );
}
