'use client';

import Link from 'next/link';
import { ToolIconTile, ToolIconName } from '../ToolIcon';
import FadeInSection from './FadeInSection';

type HeroSectionProps = {
  activePreview?: string;
  onPreviewChange?: (src: string) => void;
};

export default function HeroSection({ activePreview, onPreviewChange }: HeroSectionProps) {
  const featureCards = [
    {
      title: 'Chat',
      copy: 'Reúna conversas e arquivos do caso em um lugar.',
      icon: 'chat' as ToolIconName,
      preview: '/landingpage/intro/channels-img.png',
    },
    {
      title: 'Assistentes de IA',
      copy: 'Tire dúvidas jurídicas e entenda documentos em linguagem simples.',
      icon: 'assistants' as ToolIconName,
      preview: '/landingpage/intro/ai-assistant-img.png',
    },
    {
      title: 'Documentos',
      copy: 'Crie, analise e organize documentos e contratos simples com ajuda da IA.',
      icon: 'docs' as ToolIconName,
      preview: '/landingpage/intro/document-img.png',
    },
    {
      title: 'Acesso ao Cofre',
      copy: 'Guarde documentos pessoais em pastas protegidas por senha.',
      icon: 'vault' as ToolIconName,
      preview: '/landingpage/intro/valut-img.png',
    },
    {
      title: 'Automações',
      copy: 'Monte fluxos de etapas para organizar burocracias com a ajuda da IA.',
      icon: 'flows' as ToolIconName,
      preview: '/landingpage/intro/automation-img.png',
    },
  ];

  return (
    <FadeInSection>
      <section
        id="hero"
        className="pq-hero-glow relative -mt-20 overflow-hidden px-4 pb-12 pt-[10.5rem] sm:px-6 sm:pt-[11.5rem] lg:px-8 lg:pb-16"
      >
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
          <p className="pq-eyebrow">Experimente sem compromisso</p>
          <h1 className="mt-6 max-w-[860px] text-center text-ink text-[clamp(2.7rem,6.2vw,5.4rem)] font-semibold leading-[1.02] tracking-[-0.06em]">
            Sua inteligência jurídica
            <br />
            <span className="pq-accent text-[1.12em] leading-[0.9]">acessível.</span>
          </h1>
          <p className="mt-6 max-w-[600px] text-center text-base leading-relaxed text-castanha-600 sm:text-lg">
            O Direito, como o pequi, esconde surpresas dolorosas por dentro. Nossa inteligência artificial
            revela onde estão os espinhos e traduz o juridiquês para proteger você.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="landing-primary-btn group/cta inline-flex h-12 items-center justify-center gap-2 px-6 transition"
            >
              Fale conosco
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
              </svg>
            </Link>
            <Link
              href="/#features"
              className="landing-secondary-btn !h-12 !w-auto !px-6 transition"
            >
              Conhecer os recursos
            </Link>
          </div>
          <p className="mt-4 text-xs text-castanha-500">
            Chat · Assistentes de IA · Documentos · Cofre · Automações
          </p>

          <div className="mt-12 grid w-full grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {featureCards.map((card) => (
              <button
                key={card.title}
                type="button"
                onClick={() => onPreviewChange?.(card.preview)}
                className={`pq-card flex h-[220px] flex-col px-5 py-5 text-left hover:-translate-y-0.5 ${
                  activePreview === card.preview ? '!shadow-[0_0_0_2px_var(--pequi-500),0_12px_28px_-14px_rgba(250,90,80,0.45)]' : ''
                }`}
              >
                <div className="inline-flex w-full items-center justify-start">
                  <ToolIconTile name={card.icon} active={activePreview === card.preview} size="lg" />
                </div>
                <div className="mt-auto">
                  <h3 className="text-[1.1rem] font-semibold leading-snug tracking-[-0.03em] text-ink">{card.title}</h3>
                  <p className="mt-2 text-[0.92rem] leading-[1.45] text-castanha-600">{card.copy}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}
