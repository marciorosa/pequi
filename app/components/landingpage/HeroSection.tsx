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
      title: 'Canais',
      copy: 'Mantenha a colaboração jurídica sincronizada entre equipes e sistemas.',
      icon: '/landingpage/hero/channels.svg',
      preview: '/landingpage/intro/channels-img.png',
    },
    {
      title: 'Assistentes de IA',
      copy: 'Tenha apoio contextualizado em redação, revisão e pesquisa jurídica.',
      icon: '/landingpage/hero/ai-assistants.svg',
      preview: '/landingpage/intro/ai-assistant-img.png',
    },
    {
      title: 'Registro de Documentos',
      copy: 'Acompanhe versões, status e aprovações em um único registro pesquisável.',
      icon: '/landingpage/hero/document-registory.svg',
      preview: '/landingpage/intro/document-img.png',
    },
    {
      title: 'Acesso ao Cofre',
      copy: 'Proteja arquivos sensíveis com permissões e controles baseados em funções.',
      icon: '/landingpage/hero/vault-access.svg',
      preview: '/landingpage/intro/valut-img.png',
    },
    {
      title: 'Automações',
      copy: 'Automatize fluxos jurídicos repetitivos para ganhar agilidade e precisão.',
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
          alt="Imagem de fundo"
          fill
          priority
          className="object-cover object-top"
        />
        <div className="relative z-10 mx-auto flex w-full max-w-[1274px] flex-col items-center text-center">
          <p className="text-[0.94444rem] font-normal leading-[1.41663rem] text-castanha-600">
            Avaliação 5 estrelas no Google
          </p>
          <h1 className="mt-5 max-w-[700px] text-center font-medium text-ink text-[2.7rem] leading-[1.08] tracking-[-0.08rem] sm:text-[4.13188rem] sm:leading-[4.54513rem] sm:tracking-[-0.16525rem]">
            Transformando a inteligência jurídica
          </h1>
          <p className="mt-4 max-w-[620px] text-center text-[1rem] font-normal leading-[1.5rem] text-castanha-600">
            Desenvolvemos plataformas de IA de elite para os profissionais do Direito mais exigentes do mundo, que buscam
            precisão e desempenho sem concessões.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="landing-primary-btn inline-flex h-11 items-center justify-center px-6 transition"
            >
              Solicitar demonstração
            </Link>
            <Link
              href="/#features"
              className="landing-secondary-btn transition hover:bg-castanha-150"
            >
              Conhecer os recursos
            </Link>
          </div>

          <div className="mt-14 grid w-full grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {featureCards.map((card, index) => (
              <button
                key={card.title}
                type="button"
                onClick={() => onPreviewChange?.(card.preview)}
                className={`flex h-[240.8px] flex-col rounded-2xl border px-5 py-5 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-castanha-300 hover:shadow-[0_16px_32px_rgba(31,42,23,0.08)] ${
                  activePreview === card.preview ? 'border-castanha-300 bg-white shadow-[0_12px_28px_rgba(31,42,23,0.08)]' : 'border-castanha-150 bg-castanha-100/85'
                }`}
              >
                <div className="inline-flex w-full items-center justify-start">
                  <Image
                    src={card.icon}
                    alt={`Ícone de ${card.title}`}
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain opacity-95"
                    priority={index < 2}
                  />
                </div>
                <div className="mt-auto">
                  <h3 className="text-[1.125rem] font-medium leading-[1.575rem] text-castanha-800">{card.title}</h3>
                  <p className="mt-2 text-[1rem] font-normal leading-[1.4rem] text-castanha-800">{card.copy}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}
