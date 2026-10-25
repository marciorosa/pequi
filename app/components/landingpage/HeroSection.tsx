'use client';

import Link from 'next/link';
import Image from 'next/image';
import FadeInSection from './FadeInSection';

type HeroSectionProps = {
  activePreview?: string;
  onPreviewChange?: (src: string) => void;
};

export default function HeroSection({ activePreview, onPreviewChange }: HeroSectionProps) {
  const featureCards = [
    {
      title: 'Channels',
      copy: 'Keep legal collaboration in sync across teams and systems.',
      icon: '/landingpage/hero/channels.svg',
      preview: '/landingpage/intro/channels-img.png',
    },
    {
      title: 'AI Assistants',
      copy: 'Get context-aware drafting, review, and legal research support.',
      icon: '/landingpage/hero/ai-assistants.svg',
      preview: '/landingpage/intro/ai-assistant-img.png',
    },
    {
      title: 'Document Registry',
      copy: 'Track versions, status, and approvals in one searchable record.',
      icon: '/landingpage/hero/document-registory.svg',
      preview: '/landingpage/intro/document-img.png',
    },
    {
      title: 'Vault Access',
      copy: 'Secure sensitive files with role-based permissions and controls.',
      icon: '/landingpage/hero/vault-access.svg',
      preview: '/landingpage/intro/valut-img.png',
    },
    {
      title: 'Automations',
      copy: 'Automate repetitive legal workflows to improve speed and accuracy.',
      icon: '/landingpage/hero/automation.svg',
      preview: '/landingpage/intro/automation-img.png',
    },
  ];

  return (
    <FadeInSection>
      <section
        id="hero"
        className="relative -mt-20 overflow-hidden px-4 pb-12 pt-[12rem] sm:px-6 sm:pt-[13rem] lg:px-8 lg:pb-16 lg:pt-[12rem]"
      >
        <Image
          src="/landingpage/hero/hero-bgimg.png"
          alt="Hero background"
          fill
          priority
          className="object-cover object-top"
        />
        <div className="relative z-10 mx-auto flex w-full max-w-[1274px] flex-col items-center text-center">
          <p className="text-[0.94444rem] font-normal leading-[1.41663rem] text-[#525252]">
            5-Star Reviewed on Google
          </p>
          <h1 className="mt-5 max-w-[700px] text-center font-medium text-[#10101A] text-[2.7rem] leading-[1.08] tracking-[-0.08rem] sm:text-[4.13188rem] sm:leading-[4.54513rem] sm:tracking-[-0.16525rem]">
            Transforming Legal Intelligence
          </h1>
          <p className="mt-4 max-w-[620px] text-center text-[1rem] font-normal leading-[1.5rem] text-[#525252]">
            Engineering elite AI platforms for the world&apos;s most sophisticated legal practitioners seeking
            uncompromising precision and performance.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="landing-primary-btn inline-flex h-11 items-center justify-center px-6 transition hover:brightness-110"
            >
              Request Demo
            </Link>
            <Link
              href="/#features"
              className="landing-secondary-btn transition hover:bg-[#eceae7]"
            >
              Explore Features
            </Link>
          </div>

          <div className="mt-14 grid w-full grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {featureCards.map((card, index) => (
              <button
                key={card.title}
                type="button"
                onClick={() => onPreviewChange?.(card.preview)}
                className={`flex h-[240.8px] flex-col rounded-2xl border px-5 py-5 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4d2ce] hover:shadow-[0_16px_32px_rgba(16,16,26,0.08)] ${
                  activePreview === card.preview ? 'border-[#d4d2ce] bg-white shadow-[0_12px_28px_rgba(16,16,26,0.08)]' : 'border-[#eceae7] bg-[#efeeec]/85'
                }`}
              >
                <div className="inline-flex w-full items-center justify-start">
                  <Image
                    src={card.icon}
                    alt={`${card.title} icon`}
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain opacity-95"
                    priority={index < 2}
                  />
                </div>
                <div className="mt-auto">
                  <h3 className="text-[1.125rem] font-medium leading-[1.575rem] text-[#323232]">{card.title}</h3>
                  <p className="mt-2 text-[1rem] font-normal leading-[1.4rem] text-[#323232]">{card.copy}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}
