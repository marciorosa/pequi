import Image from 'next/image';
import { trustedByLogos } from './data';
import FadeInSection from './FadeInSection';

export default function LogosSection() {
  const sliderLogos = [...trustedByLogos, ...trustedByLogos];

  return (
    <FadeInSection delay={0.05}>
      <section className="py-8 md:py-10 border-y border-gray-100">
      <div className="max-w-[1274px] mx-auto px-4 md:px-8">
        <p className="text-[#111827] text-center text-[1rem] md:text-[1.125rem] lg:text-[1.25rem] font-medium leading-[130%] capitalize mb-6">
          A escolha de instituições jurídicas e financeiras de nível mundial
        </p>
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-20 w-[56px] md:w-[120px] bg-[linear-gradient(270deg,#FFFFFF_0%,#FFFFFF_50%,rgba(255,255,255,0)_100%)] rotate-180" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-20 w-[56px] md:w-[120px] bg-[linear-gradient(270deg,#FFFFFF_0%,#FFFFFF_50%,rgba(255,255,255,0)_100%)]" />

          <div className="relative overflow-hidden py-2">
            <div className="relative z-10 flex w-max items-center gap-10 md:gap-[60px] animate-trustedby-slide">
              {sliderLogos.map((logo, idx) => (
                <div key={`${logo.src}-${idx}`} className="flex shrink-0 items-center justify-center">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={200}
                    height={26}
                    className="h-[20px] md:h-[26px] w-auto object-contain"
                    priority={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </section>
    </FadeInSection>
  );
}
