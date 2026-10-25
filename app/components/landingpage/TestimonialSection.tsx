import { sectionHeadingClass, sectionSubTextClass } from './sectionStyles';
import FadeInSection from './FadeInSection';
import Image from 'next/image';

const testimonialCards = [
  {
    quote:
      'Before using AiForLawyers, I barely got any callbacks. After optimizing keywords and rewriting my resume with the AI, I started receiving interview invitations within a week. The process was fast, simple, and surprisingly accurate.',
    author: 'Nantaraya',
    role: 'Marketing Specialist',
    image: '/landingpage/hero/img1.png',
    size: 'large',
  },
  {
    quote:
      'I was skeptical at first, but AiForLawyers transformed my legal workflow. The AI recommendations helped me highlight my strengths, and I secured a legal role just days after applying.',
    author: 'Jamal',
    role: 'Software Engineer',
    image: '/landingpage/hero/img2.png',
    size: 'large',
  },
  {
    quote:
      'The real-time feedback feature in AiForLawyers helped me spot weak legal clauses and improve them instantly. I rewrote my draft in under 20 minutes, and it looked way more professional and structured than before.',
    author: 'Daniel',
    role: 'UI Designer',
    image: '/landingpage/hero/img3.png',
    size: 'small',
  },
  {
    quote:
      'I only shared my GitHub and portfolio links, and AiForLawyers turned them into clean, well-written legal profile sections. It saved me hours of writing and helped me explain my work much better.',
    author: 'Kenji',
    role: 'UI Designer',
    image: '/landingpage/hero/img4.png',
    size: 'small',
  },
  {
    quote:
      'As a fresh graduate, I had no idea how to write a strong legal resume. AiForLawyers guided me step by step and helped me highlight my skills even with limited experience.',
    author: 'Aaliyah',
    role: 'Marketing',
    image: '/landingpage/hero/img5.png',
    size: 'small',
  },
];

export default function TestimonialSection() {
  const topCards = testimonialCards.filter((item) => item.size === 'large');
  const bottomCards = testimonialCards.filter((item) => item.size === 'small');

  return (
    <FadeInSection delay={0.16}>
      <section id="testimonials" className="bg-[#EBFAF8] scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-[1274px] mx-auto px-4 py-[60px] md:px-8 lg:px-6 xl:px-0">
        <h3 className={sectionHeadingClass}>What our Users Think</h3>
        <p className={`${sectionSubTextClass} mt-4 mb-10`}>
          Real feedback from lawyers, teams, and firms using AI to transform their legal workflows.
        </p>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {topCards.map((item) => (
              <article key={item.author} className="landing-card p-6 md:p-7 min-h-[17.5rem]">
                <p className="text-[4rem] leading-none font-medium text-[#d0d0d3]">&ldquo;</p>
                <p className="mt-3 text-[#1f2025] text-[1.02rem] font-normal leading-[1.45rem]">{item.quote}</p>
                <div className="mt-7 flex items-center gap-3">
                  <Image src={item.image} alt={item.author} width={34} height={34} className="h-[34px] w-[34px] rounded-full object-cover" />
                  <p className="text-[#111827] text-[1rem] font-normal leading-[1.35rem]">
                    {item.author}, {item.role}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {bottomCards.map((item) => (
              <article key={item.author} className="landing-card p-5 md:p-6 min-h-[15.5rem]">
                <p className="text-[#1f2025] text-[1.02rem] font-normal leading-[1.45rem]">{item.quote}</p>
                <div className="mt-6 flex items-center gap-3">
                  <Image src={item.image} alt={item.author} width={34} height={34} className="h-[34px] w-[34px] rounded-full object-cover" />
                  <p className="text-[#111827] text-[1rem] font-normal leading-[1.35rem]">
                    {item.author}, {item.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      </section>
    </FadeInSection>
  );
}
