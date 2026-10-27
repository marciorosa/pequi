import localFont from 'next/font/local';
import { notFound } from 'next/navigation';
import { careersJobs, getCareerJobByIdParam } from '../careersData';
import CareerDetailExperience from './CareerDetailExperience';

const landingInterTight = localFont({
  src: [
    { path: '../../../public/fonts/InterTight-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../../../public/fonts/InterTight-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../../../public/fonts/InterTight-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '../../../public/fonts/InterTight-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-landing',
  display: 'swap',
});

export function generateStaticParams() {
  return careersJobs.map((j) => ({ id: String(j.id) }));
}

export default async function CareerJobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = getCareerJobByIdParam(id);
  if (!job) notFound();

  return (
    <div className={`${landingInterTight.variable} landing-gilroy bg-white text-foreground`}>
      <CareerDetailExperience job={job} jobId={id} />
    </div>
  );
}
