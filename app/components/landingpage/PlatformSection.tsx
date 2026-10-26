'use client';

import Image from 'next/image';
import { useState } from 'react';
import { sectionHeadingClass, sectionSubTextClass } from './sectionStyles';
import FadeInSection from './FadeInSection';

const platformTabs = ['Opções de pesquisa', 'Canais', 'Assistentes de IA', 'Registro de documentos', 'Acesso ao cofre'];
const tabImages: Record<string, string> = {
  'Opções de pesquisa': '/landingpage/one-legal-platform/search-opt.png',
  Canais: '/landingpage/one-legal-platform/channels.png',
  'Assistentes de IA': '/landingpage/one-legal-platform/ai-assitants.png',
  'Registro de documentos': '/landingpage/one-legal-platform/document-regis.png',
  'Acesso ao cofre': '/landingpage/one-legal-platform/vault.png',
};

export default function PlatformSection() {
  const [activeTab, setActiveTab] = useState('Canais');

  return (
    <FadeInSection delay={0.08}>
      <section id="platform" className="scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
        <div className="text-center mb-8 md:mb-10">
          <h2 className={sectionHeadingClass}>Plataforma jurídica completa</h2>
          <p className={`${sectionSubTextClass} mt-4`}>
            Conheça ferramentas poderosas criadas para simplificar fluxos jurídicos, automatizar tarefas e gerar insights
            inteligentes, tudo em um só lugar.
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
                alt={`Prévia de ${activeTab}`}
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
