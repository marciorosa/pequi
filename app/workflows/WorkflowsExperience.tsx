'use client';

import Link from 'next/link';
import Image from 'next/image';
import FadeInSection from '../components/landingpage/FadeInSection';
import { sectionHeadingClass, sectionSubTextClass } from '../components/landingpage/sectionStyles';

const featureCardClass =
  'flex min-h-[240.8px] flex-col rounded-2xl border border-castanha-150 bg-castanha-100/85 px-5 py-5 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(36,37,33,0.06)]';

export default function WorkflowsExperience() {
  const benefits = [
    {
      title: 'Menos trabalho manual',
      description: 'Automatize tarefas repetitivas para que você dedique tempo ao que importa, e não à burocracia.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      ),
    },
    {
      title: 'Arquivamento no cofre',
      description: 'Salve automaticamente no cofre os documentos gerados pelos seus fluxos.',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
    },
    {
      title: 'Menos erros nas transições',
      description: 'A IA ajuda a montar cada etapa, e você revisa o resultado antes de usar.',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      ),
    },
    {
      title: 'Integração com o cofre',
      description: 'Os documentos gerados pelos fluxos podem ser guardados nas pastas do seu cofre.',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      ),
    },
  ];

  const integrations = [
    'Google Gemini AI',
    'AWS S3',
    'Banco de dados vetorial',
    'Pesquisa de conhecimento',
    'Análise de casos',
    'Automação de fluxos',
    'Cofre seguro',
  ];

  const steps = [
    { num: '1', title: 'Desenhe', desc: 'Monte as etapas do fluxo num editor visual.' },
    { num: '2', title: 'Automatize', desc: 'Inclua etapas de geração de texto e de análise por IA.' },
    { num: '3', title: 'Execute', desc: 'Rode o fluxo quando precisar, com um clique.' },
    { num: '4', title: 'Revise', desc: 'Confira o resultado de cada etapa antes de usar.' },
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
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
              <div className="text-left">
                <p className="text-[0.94444rem] font-normal leading-[1.41663rem] text-castanha-600">Pequi</p>
                <h1 className="mt-5 max-w-[700px] font-medium leading-[1.08] tracking-[-0.08rem] text-ink text-[2.7rem] sm:text-[3.25rem] sm:leading-[1.08] sm:tracking-[-0.12rem]">
                  Fluxos de trabalho com IA
                </h1>
                <p className="mt-5 max-w-xl text-[1rem] font-normal leading-[1.5rem] text-castanha-600 md:text-[1.125rem] lg:text-[1.25rem]">
                  Organize seus assuntos jurídicos de ponta a ponta: encaminhamentos, documentos, assinaturas e histórico completo em um só lugar.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/contact"
                    className="landing-primary-btn inline-flex h-11 items-center justify-center px-6 transition"
                  >
                    Tirar minhas dúvidas
                  </Link>
                </div>
              </div>

              <div className="relative min-h-[280px] sm:min-h-[320px] lg:min-h-[380px]">
                <div className="flex h-full min-h-[inherit] flex-col rounded-2xl border border-castanha-150 p-5 sm:p-6">
                  <div className="relative min-h-[220px] flex-1 sm:min-h-[280px] lg:min-h-[300px]">
                    <Image
                      src="/landingpage/features/workflow-automation.png"
                      alt="Prévia de fluxos e automação"
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

      <FadeInSection delay={0.08}>
        <section className="bg-white py-16 lg:py-[5.5rem] scroll-mt-24 md:scroll-mt-28">
          <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
            <h2 className={sectionHeadingClass}>Descomplique sua vida jurídica</h2>
            <p className={`${sectionSubTextClass} mt-4 mb-10 md:mb-12`}>
              Impacto real em agilidade, qualidade e tranquilidade, sem abrir mão das ferramentas que você já usa.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {benefits.map((b) => (
                <div key={b.title} className={featureCardClass}>
                  <div className="inline-flex w-full items-center justify-start">
                    <svg className="h-10 w-10 text-castanha-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      {b.icon}
                    </svg>
                  </div>
                  <div className="mt-auto pt-6">
                    <h3 className="text-[1.125rem] font-medium leading-[1.575rem] text-castanha-800">{b.title}</h3>
                    <p className="mt-2 text-[1rem] font-normal leading-[1.4rem] text-castanha-800">{b.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <section className="bg-white pb-16 lg:pb-[5.5rem]">
          <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
            <h2 className={sectionHeadingClass}>Como funciona</h2>
            <p className={`${sectionSubTextClass} mt-4 mb-12 md:mb-14`}>
              Do primeiro esboço ao assunto resolvido, em quatro etapas bem claras.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 relative">
              {steps.map((step, idx) => (
                <div key={step.num} className="text-center relative">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-castanha-200 bg-castanha-100 text-[1.25rem] font-medium text-ink">
                    {step.num}
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="absolute left-[calc(50%+1.75rem)] top-7 hidden h-px w-[calc(100%-3.5rem)] bg-castanha-200 lg:block">
                      <span className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-castanha-300" />
                    </div>
                  )}
                  <h3 className="mb-2 text-[1.125rem] font-medium text-ink md:text-[1.25rem]">{step.title}</h3>
                  <p className="mx-auto max-w-[220px] text-[0.9375rem] leading-[160%] text-castanha-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.14}>
        <section className="bg-white pb-16 lg:pb-[5.5rem]">
          <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
            <h2 className={sectionHeadingClass}>Integrações sem complicação</h2>
            <p className={`${sectionSubTextClass} mt-4 mb-10 md:mb-12`}>
              Conecte assinaturas, armazenamento, modelos e pesquisa para que os fluxos rodem onde suas ferramentas já estão.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {integrations.map((name) => (
                <div
                  key={name}
                  className="flex min-h-[5.5rem] items-center justify-center rounded-[1.25rem] border border-castanha-200 bg-castanha-100 px-4 py-4 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(36,37,33,0.05)]"
                >
                  <span className="text-[0.9375rem] font-medium text-castanha-600">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

    </>
  );
}
