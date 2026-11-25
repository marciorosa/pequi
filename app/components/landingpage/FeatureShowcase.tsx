'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FadeInSection from './FadeInSection';

// Funcionalidades em destaque (2026-11-24): seção grafite com itens numerados
// em serifa clássica. O item clicado abre com a descrição, e a tela ao lado
// muda para a daquela funcionalidade.
// Mesma ordem do menu de produtos (a da referência): assistentes, conhecimento,
// automações, cofre e assinatura; o chat no site fecha a lista.
const items = [
  {
    title: 'Agentes',
    text: 'Agentes por área do Direito que atendem os clientes do escritório a qualquer hora, sempre com o nome e a marca do escritório.',
    href: '/assistant',
    image: '/landingpage/intro/ai-assistant-img.png',
  },
  {
    title: 'Análise de documentos',
    text: 'Resumo, análise de riscos, comparação e tradução de contratos e documentos, prontos para a revisão do advogado.',
    href: '/knowledge',
    image: '/landingpage/intro/document-img.png',
  },
  {
    title: 'Automações e assinatura',
    text: 'Fluxos que recebem o documento, analisam, enviam para assinatura eletrônica e guardam no Cofre, sem trabalho manual.',
    href: '/workflows',
    image: '/landingpage/intro/automation-img.png',
  },
  {
    title: 'Cofre de documentos',
    text: 'Pastas protegidas para os documentos de cada cliente, com acesso controlado e registro de cada movimentação.',
    href: '/vault',
    image: '/landingpage/intro/valut-img.png',
  },
  {
    title: 'Chat no site do escritório',
    text: 'Cole um código no site e a assistente recebe os visitantes, explica os direitos e entrega o contato para a sua equipe.',
    href: '/assistant',
    image: '/landingpage/intro/channels-img.png',
  },
];

export default function FeatureShowcase() {
  const [active, setActive] = useState(0);

  return (
    <FadeInSection>
      <section id="funcionalidades" className="scroll-mt-20 bg-[#151816] py-20 text-white lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-6 border-b border-white/15 pb-12 lg:grid-cols-2 lg:items-end">
            <h2 className="text-[clamp(2.25rem,4.6vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.035em] text-white">
              Um escritório inteiro
              <br />
              em uma só plataforma
            </h2>
            <p className="max-w-[520px] text-[1.02rem] leading-relaxed text-white/65 lg:justify-self-end">
              Atendimento, documentos, cofre, automações e assinatura no mesmo lugar, com a marca do escritório. A IA
              prepara o trabalho; o advogado revisa e decide.
            </p>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
            <div className="relative order-2 overflow-hidden rounded-3xl lg:order-1">
              {items.map((it, i) => (
                <Image
                  key={it.image}
                  src={it.image}
                  alt={`Tela do Pequi: ${it.title}`}
                  width={1272}
                  height={706}
                  sizes="(max-width: 1024px) 100vw, 640px"
                  className={`h-auto w-full object-cover object-top transition-opacity duration-500 ${
                    i === active ? 'relative opacity-100' : 'pointer-events-none absolute inset-0 opacity-0'
                  }`}
                />
              ))}
            </div>

            <ul className="order-1 border-t border-white/15 lg:order-2">
              {items.map((it, i) => {
                const open = i === active;
                return (
                  <li key={it.title} className="border-b border-white/15">
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setActive(i)}
                      className="flex w-full items-baseline gap-5 py-5 text-left"
                    >
                      <span className="w-6 shrink-0 text-[0.75rem] tabular-nums text-white/45">{String(i + 1).padStart(2, '0')}</span>
                      <span className={`pq-accent text-[1.6rem] leading-tight transition-colors sm:text-[1.85rem] ${open ? 'text-white' : 'text-white/55 hover:text-white/85'}`}>
                        {it.title}
                      </span>
                    </button>
                    <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr] pb-6 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                      <div className="overflow-hidden pl-11">
                        <p className="max-w-[460px] text-[0.95rem] leading-relaxed text-white/65">{it.text}</p>
                        <Link
                          href={it.href}
                          className="mt-4 inline-flex items-center gap-1.5 border-b border-white/40 pb-0.5 text-[0.88rem] text-white hover:border-white"
                        >
                          Conhecer
                          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link href="/signup" className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-[0.9rem] font-medium text-ink hover:bg-[#F4EFDF]">
              Comece grátis
            </Link>
            <Link href="/pricing" className="inline-flex h-11 items-center rounded-full border border-white/30 px-5 text-[0.9rem] text-white hover:border-white/60">
              Ver preços
            </Link>
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}
