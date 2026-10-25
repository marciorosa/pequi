'use client';

import Image from 'next/image';
import { useState } from 'react';
import { sectionHeadingClass, sectionSubTextClass } from './sectionStyles';
import FadeInSection from './FadeInSection';

const platformTabs = ['Search Options', 'Channels', 'AI Assistants', 'Document Registry', 'Vault Access'];
const tabImages: Record<string, string> = {
  'Search Options': '/landingpage/one-legal-platform/search-opt.png',
  Channels: '/landingpage/one-legal-platform/channels.png',
  'AI Assistants': '/landingpage/one-legal-platform/ai-assitants.png',
  'Document Registry': '/landingpage/one-legal-platform/document-regis.png',
  'Vault Access': '/landingpage/one-legal-platform/vault.png',
};

export default function PlatformSection() {
  const [activeTab, setActiveTab] = useState('Channels');

  return (
    <FadeInSection delay={0.08}>
      <section id="platform" className="scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
        <div className="text-center mb-8 md:mb-10">
          <h2 className={sectionHeadingClass}>All-in-One Legal Platform</h2>
          <p className={`${sectionSubTextClass} mt-4`}>
            Explore powerful tools designed to simplify legal workflows, automate tasks, and deliver intelligent
            insights-all in one place.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-6 md:mb-8">
          {platformTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`inline-flex h-11 md:h-[3.4375rem] justify-center items-center rounded-[0.625rem] text-[0.875rem] md:text-[1rem] lg:text-[1.1rem] leading-none transition-colors ${
                tab === activeTab
                  ? 'px-4 md:px-[2.25rem] gap-2 md:gap-[0.875rem] border border-[#14171B] bg-[#111827] text-white shadow-sm'
                  : 'px-4 md:px-[1.625rem] gap-2 md:gap-[0.625rem] bg-white text-[#636977] hover:bg-[#edeef0] hover:text-[#111827]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="rounded-[1.7rem] bg-[#F5F5F4] overflow-hidden">
          <div className="rounded-[1.3rem] bg-[#F5F5F4] h-[260px] sm:h-[360px] md:h-[560px] overflow-hidden">
            <div className="relative h-full">
              <Image
                src={tabImages[activeTab]}
                alt={`${activeTab} preview`}
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
      </section>
    </FadeInSection>
  );
}
