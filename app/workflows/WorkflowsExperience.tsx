'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import FadeInSection from '../components/landingpage/FadeInSection';
import { sectionHeadingClass, sectionSubTextClass } from '../components/landingpage/sectionStyles';

const featureCardClass =
  'flex min-h-[240.8px] flex-col rounded-2xl border border-castanha-150 bg-castanha-100/85 px-5 py-5 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(31,42,23,0.06)]';

const tabIds = ['contract', 'litigation', 'compliance'] as const;
type WorkflowTab = (typeof tabIds)[number];

const tabLabels: Record<WorkflowTab, string> = {
  contract: 'Contratos',
  litigation: 'Contencioso',
  compliance: 'Compliance',
};

export default function WorkflowsExperience() {
  const [activeTab, setActiveTab] = useState<WorkflowTab>('contract');

  const workflowTemplates: Record<
    WorkflowTab,
    { name: string; description: string; steps: number; users: string; image: string }[]
  > = {
    contract: [
      {
        name: 'Revisão e aprovação de contratos',
        description: 'Automatize a revisão com análise por IA, encaminhamento para aprovação e assinatura eletrônica.',
        steps: 5,
        users: 'Equipe jurídica, executivos',
        image: '/landingpage/one-legal-platform/document-regis.png',
      },
      {
        name: 'Processamento de NDAs',
        description: 'Da escolha do modelo à assinatura e ao armazenamento no cofre, em um único fluxo.',
        steps: 3,
        users: 'Jurídico, RH, prestadores',
        image: '/landingpage/one-legal-platform/search-opt.png',
      },
      {
        name: 'Gestão de renovações contratuais',
        description: 'Alertas, revisão de alterações e renovações sem cobranças manuais.',
        steps: 4,
        users: 'Jurídico, gerentes de conta',
        image: '/landingpage/one-legal-platform/vault.png',
      },
    ],
    litigation: [
      {
        name: 'Fluxo de ajuizamento',
        description: 'Da captação ao protocolo, com geração de documentos e checklists rigorosos.',
        steps: 7,
        users: 'Contencioso, paralegais',
        image: '/landingpage/one-legal-platform/ai-assitants.png',
      },
      {
        name: 'Gestão de produção de provas',
        description: 'Coleta, revisão e produção de provas com priorização assistida por IA.',
        steps: 6,
        users: 'Contencioso, advogados externos',
        image: '/landingpage/one-legal-platform/channels.png',
      },
      {
        name: 'Preparação de depoimentos',
        description: 'Agendamento, materiais de preparação e acompanhamentos vinculados ao seu caso.',
        steps: 5,
        users: 'Contencioso, testemunhas',
        image: '/landingpage/one-legal-platform/document-regis.png',
      },
    ],
    compliance: [
      {
        name: 'Protocolos regulatórios',
        description: 'Fluxos de redação, revisão e envio com responsáveis bem definidos.',
        steps: 4,
        users: 'Compliance, jurídico',
        image: '/landingpage/one-legal-platform/vault.png',
      },
      {
        name: 'Monitoramento de compliance',
        description: 'Acompanhe mudanças regulatórias e envie alertas aos responsáveis certos.',
        steps: 3,
        users: 'Compliance, liderança',
        image: '/landingpage/one-legal-platform/search-opt.png',
      },
      {
        name: 'Processo de auditoria interna',
        description: 'Planejamento, trabalho de campo, relatórios e correções em um único sistema.',
        steps: 6,
        users: 'Compliance, chefes de departamento',
        image: '/landingpage/one-legal-platform/channels.png',
      },
    ],
  };

  const benefits = [
    {
      title: 'Menos trabalho manual',
      description: 'Automatize tarefas repetitivas para que sua equipe dedique tempo à análise, e não à burocracia.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      ),
    },
    {
      title: 'Sincronização de assinaturas digitais',
      description: 'Envie, acompanhe e arquive automaticamente no cofre os contratos assinados.',
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
      description: 'Validações e verificações por IA em cada etapa reduzem retrabalho e aprovações esquecidas.',
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
      description: 'Os resultados, de minutas a PDFs assinados, vão por padrão para um armazenamento controlado.',
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
    'DocuSign',
    'Google Gemini AI',
    'AWS S3',
    'Banco de dados vetorial',
    'Pesquisa de conhecimento',
    'Análise de casos',
    'Automação de fluxos',
    'Cofre seguro',
  ];

  const steps = [
    { num: '1', title: 'Desenhe', desc: 'Editor de arrastar e soltar para etapas, responsáveis e SLAs.' },
    { num: '2', title: 'Automatize', desc: 'Adicione regras de geração por IA, revisão e encaminhamento.' },
    { num: '3', title: 'Implante', desc: 'Publique com um clique e conecte as ferramentas que você já usa.' },
    { num: '4', title: 'Monitore', desc: 'Acompanhe volume, gargalos e sinais de compliance.' },
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
                  Automatize processos jurídicos de ponta a ponta: encaminhamentos, documentos, assinaturas e trilhas de auditoria em um só lugar.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/contact"
                    className="landing-primary-btn inline-flex h-11 items-center justify-center px-6 transition"
                  >
                    Solicitar uma demonstração
                  </Link>
                  <button
                    type="button"
                    onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })}
                    className="landing-secondary-btn inline-flex h-[2.83331rem] min-w-[10.81025rem] items-center justify-center px-6 transition hover:bg-castanha-150"
                  >
                    Ver modelos
                  </button>
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
            <h2 className={sectionHeadingClass}>Transforme suas operações jurídicas</h2>
            <p className={`${sectionSubTextClass} mt-4 mb-10 md:mb-12`}>
              Impacto mensurável em agilidade, qualidade e governança, sem abrir mão das ferramentas que você já usa.
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
              Do primeiro esboço à operação em produção, em quatro etapas claras.
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

      <FadeInSection delay={0.12}>
        <section id="templates" className="bg-white pb-16 lg:pb-[5.5rem] scroll-mt-24 md:scroll-mt-28">
          <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
            <div className="flex flex-col items-center text-center mb-10 md:mb-12">
              <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-castanha-200 bg-castanha-100 px-5 py-2">
                <span className="w-2 h-2 rounded-full bg-pequi-500 animate-pulse" aria-hidden />
                <span className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-castanha-600">
                  Novos modelos em breve
                </span>
              </div>
              <h2 className={sectionHeadingClass}>Modelos de fluxo prontos para usar</h2>
              <p className={`${sectionSubTextClass} mt-4`}>
                Fluxos iniciais por área de atuação: personalize etapas, responsáveis e integrações de acordo com o seu escritório.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-12">
              {tabIds.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`inline-flex h-11 md:h-[3.4375rem] justify-center items-center rounded-[0.625rem] text-[0.875rem] md:text-[1rem] leading-none transition-colors px-5 md:px-[1.75rem] ${
                    activeTab === tab
                      ? 'border border-cerrado-800 bg-cerrado-800 text-white shadow-[0_6px_16px_rgba(31,42,23,0.12)]'
                      : 'bg-castanha-100 text-castanha-600 border border-castanha-200 hover:bg-castanha-150 hover:text-ink'
                  }`}
                >
                  {tabLabels[tab]}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {workflowTemplates[activeTab].map((workflow) => (
                <article
                  key={workflow.name}
                  className="group overflow-hidden rounded-[1.875rem] border border-castanha-150 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(31,42,23,0.08)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-castanha-150 bg-castanha-100">
                    <Image
                      src={workflow.image}
                      alt=""
                      fill
                      className="object-contain p-4 md:p-5 transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6 md:p-8">
                    <h3 className="mb-3 text-[1.25rem] font-medium leading-tight text-ink">{workflow.name}</h3>
                    <p className="mb-6 text-[0.9375rem] leading-[160%] text-castanha-600">{workflow.description}</p>
                    <div className="flex flex-col gap-3 text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-castanha-600 sm:flex-row sm:items-center sm:justify-between">
                      <span className="inline-flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                        {workflow.steps} etapas
                      </span>
                      <span className="inline-flex items-center gap-2 sm:text-right">
                        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                        {workflow.users}
                      </span>
                    </div>
                  </div>
                </article>
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
                  className="flex min-h-[5.5rem] items-center justify-center rounded-[1.25rem] border border-castanha-200 bg-castanha-100 px-4 py-4 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(31,42,23,0.05)]"
                >
                  <span className="text-[0.9375rem] font-medium text-castanha-600">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.16}>
        <section className="bg-white pb-16 lg:pb-[7rem]">
          <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
            <div className="overflow-hidden rounded-[1.875rem] border border-castanha-150 bg-white shadow-[0_24px_64px_rgba(31,42,23,0.06)]">
              <div className="grid lg:grid-cols-2 gap-0 lg:gap-0">
                <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                  <p className="mb-4 text-[0.94444rem] font-normal leading-[1.41663rem] text-castanha-600">
                    História de sucesso
                  </p>
                  <h2 className="mb-6 text-[1.75rem] font-medium leading-tight text-ink md:text-[2.25rem]">
                    De 12 dias para 2 dias
                  </h2>
                  <p className="mb-8 text-[1rem] leading-[160%] text-castanha-600 md:text-[1.125rem]">
                    &quot;Antes do Pequi, nosso processo de revisão de contratos levava em média 12 dias. Com fluxos
                    automatizados, reduzimos para cerca de dois dias, melhorando a consistência e o compliance.&quot;
                  </p>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-castanha-200 bg-castanha-100">
                      <Image
                        src="/landingpage/hero/img1.png"
                        alt=""
                        width={44}
                        height={44}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-[0.9375rem] font-medium text-ink">John Anderson</p>
                      <p className="text-[0.8125rem] text-castanha-600">Diretor jurídico, empresa de tecnologia da Fortune 500</p>
                    </div>
                  </div>
                  <Link
                    href="/customers"
                    className="inline-flex w-fit items-center gap-2 rounded-[0.875rem] border border-castanha-200 px-6 py-3 text-[0.9375rem] font-medium text-ink transition-colors hover:bg-castanha-25"
                  >
                    Ver mais casos de sucesso
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                <div className="relative flex min-h-[280px] items-center border-t border-castanha-200 bg-castanha-100 p-6 lg:min-h-0 lg:border-l lg:border-t-0 md:p-8 lg:p-10">
                  <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[1.25rem] border border-castanha-200 bg-white">
                    <Image
                      src="/landingpage/features/workflow-automation.png"
                      alt="Visualização do fluxo de trabalho da equipe"
                      fill
                      className="object-contain p-4 md:p-6"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
