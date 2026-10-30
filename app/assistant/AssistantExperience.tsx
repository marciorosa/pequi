'use client';

import Link from 'next/link';
import Image from 'next/image';
import AssistantChat from '../components/AssistantChat';
import FadeInSection from '../components/landingpage/FadeInSection';
import { sectionHeadingClass, sectionSubTextClass } from '../components/landingpage/sectionStyles';

export default function AssistantExperience() {
  const features = [
    {
      title: 'Interface em linguagem natural',
      desc: 'Descreva o que você precisa em linguagem simples, sem prompts complexos. Comunique-se como faria com um amigo experiente.',
      icon: (
        <svg className="h-10 w-10 text-castanha-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
          />
        </svg>
      ),
    },
    {
      title: 'Geração de documentos',
      desc: 'Redija documentos jurídicos de alta qualidade em segundos. Edite e refine até ficar bem do seu jeito.',
      icon: (
        <svg className="h-10 w-10 text-castanha-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
      ),
    },
    {
      title: 'Pesquisa jurídica',
      desc: 'Encontre jurisprudência, legislação e precedentes com citações precisas de fontes confiáveis.',
      icon: (
        <svg className="h-10 w-10 text-castanha-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      <FadeInSection>
        <section
          id="hero"
          className="relative -mt-20 overflow-hidden px-4 pb-12 pt-[12rem] sm:px-6 sm:pt-[13rem] lg:px-8 lg:pb-16 lg:pt-[12rem] scroll-mt-24 md:scroll-mt-28"
        >
          <Image
            src="/landingpage/hero/hero-bgimg.png"
            alt="Imagem de fundo"
            fill
            priority
            className="object-cover object-top"
          />
          <div className="relative z-10 mx-auto w-full max-w-[1274px]">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.02fr] lg:gap-14">
              <div className="text-left">
                <p className="text-[0.94444rem] font-normal leading-[1.41663rem] text-castanha-600">Assistente de IA</p>
                <h1 className="mt-5 max-w-[700px] font-medium leading-[1.08] tracking-[-0.08rem] text-ink text-[2.7rem] sm:text-[3.25rem] sm:leading-[1.08] sm:tracking-[-0.12rem]">
                  Seu assistente jurídico pessoal
                </h1>
                <p className="mt-4 max-w-[620px] text-[1rem] font-normal leading-[1.5rem] text-castanha-600">
                  Resolva dúvidas jurídicas em linguagem natural. Feito para quem não é advogado, com a clareza que
                  você espera de um bom especialista.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/contact"
                    className="landing-primary-btn inline-flex h-11 items-center justify-center px-6 transition"
                  >
                    Tirar minhas dúvidas
                  </Link>
                  <button
                    type="button"
                    onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                    className="landing-secondary-btn inline-flex h-[2.83331rem] min-w-[10.81025rem] items-center justify-center px-6 transition hover:bg-castanha-150"
                  >
                    Experimente o chat
                  </button>
                </div>
              </div>

              <div className="relative min-h-[280px] sm:min-h-[340px] lg:min-h-[380px]">
                <div className="flex h-full min-h-[inherit] flex-col rounded-2xl border border-castanha-150 p-5 sm:p-6">
                  <div className="relative min-h-[220px] flex-1 sm:min-h-[280px] lg:min-h-[300px]">
                    <Image
                      src="/landingpage/features/ai-legal-assistant.png"
                      alt="Prévia do assistente jurídico com IA"
                      fill
                      className="object-contain object-center"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <section className="scroll-mt-24 bg-white px-4 py-16 sm:px-6 md:scroll-mt-28 lg:px-8 lg:py-[5.5rem]">
          <div className="mx-auto max-w-[1274px]">
            <h2 className={sectionHeadingClass}>Sob medida para a sua realidade</h2>
            <p className={`${sectionSubTextClass} mb-10 mt-4 md:mb-12`}>
              Recursos pensados para o jeito como as pessoas resolvem problemas reais: respostas claras, textos rápidos e pesquisas
              confiáveis.
            </p>

            <div className="grid gap-4 md:grid-cols-3 md:gap-5">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex min-h-[240.8px] flex-col rounded-2xl border border-castanha-150 bg-castanha-100/85 px-5 py-5 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(31,42,23,0.06)]"
                >
                  <div className="inline-flex w-full items-center justify-start">{feature.icon}</div>
                  <div className="mt-auto pt-6">
                    <h3 className="text-[1.125rem] font-medium leading-[1.575rem] text-castanha-800">{feature.title}</h3>
                    <p className="mt-2 text-[1rem] font-normal leading-[1.4rem] text-castanha-800">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.12}>
        <section id="demo" className="scroll-mt-24 bg-white px-4 pb-16 sm:px-6 md:scroll-mt-28 lg:px-8 lg:pb-[5.5rem]">
          <div className="mx-auto max-w-[1274px]">
            <h2 className={sectionHeadingClass}>Converse com seu assistente</h2>
            <p className={`${sectionSubTextClass} mb-10 mt-4 md:mb-12`}>
              Faça uma pergunta abaixo e veja como o Pequi responde em contexto, com o tom de um copiloto jurídico de confiança.
            </p>

            <div className="landing-surface overflow-hidden shadow-[0_24px_64px_rgba(31,42,23,0.06),0_48px_100px_rgba(31,42,23,0.04)] transition-shadow duration-300 hover:shadow-[0_28px_72px_rgba(31,42,23,0.08)]">
              <AssistantChat />
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.14}>
        <section className="bg-white px-4 pb-16 sm:px-6 lg:px-8 lg:pb-[7rem]">
          <div className="mx-auto max-w-[1274px]">
            <div className="rounded-[2rem] border border-castanha-150 bg-castanha-50 p-5 sm:p-7 lg:p-10">
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
                <div className="relative order-2 lg:order-1">
                  <div className="rounded-[1.5rem] border border-castanha-150 bg-white p-4 shadow-[0_16px_36px_rgba(31,42,23,0.06)] sm:p-5">
                    <div className="space-y-3">
                      {[
                        'Criador de contratos simples',
                        'Criador de contratos simples',
                        'Comparação de documentos',
                      ].map((item, index) => (
                        <div
                          key={`${item}-${index}`}
                          className="flex items-center gap-3 rounded-[0.875rem] border border-castanha-150 bg-castanha-25 px-4 py-4 text-[1rem] font-normal leading-[1.4rem] text-castanha-800"
                        >
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-castanha-150 bg-white text-castanha-600">
                            {index === 0 ? '◉' : index === 1 ? '▢' : '⎈'}
                          </span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-[0.875rem] bg-cerrado-900 px-4 text-[1.25rem] font-medium leading-[1.1rem] text-white sm:text-[1.375rem]">
                      Registro de documentos
                    </div>
                  </div>
                </div>

                <div className="order-1 lg:order-2">
                  <p className="mb-3 text-[0.94444rem] font-normal leading-[1.41663rem] text-castanha-600">Ecossistema</p>
                  <h2 className="text-left text-[2rem] font-medium leading-[1.1] tracking-[-0.06rem] text-ink md:text-[2.5rem] md:tracking-[-0.08rem] lg:text-[3rem] lg:tracking-[-0.1rem]">
                    Integração com o Microsoft Word
                  </h2>
                  <p className="mt-5 max-w-[39.1975rem] text-[1rem] font-normal leading-[160%] text-castanha-600 md:text-[1.125rem] lg:text-[1.25rem]">
                    Potencialize o Word com nosso suplemento: transforme seu ambiente de trabalho habitual em um espaço de redação com
                    suporte de IA, onde você já trabalha.
                  </p>
                  <ul className="mt-8 space-y-3 text-base leading-[160%] text-castanha-600 md:text-lg">
                    {[
                      'Redija e edite sem sair do Word',
                      'Sugestões e melhorias em tempo real',
                      'Integra-se aos seus fluxos de trabalho e sistemas de gestão de processos',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-0.5 shrink-0 text-ink" aria-hidden>
                          ▶
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
