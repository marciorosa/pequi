'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import FadeInSection from '../components/landingpage/FadeInSection';
import { sectionHeadingClass, sectionSubTextClass } from '../components/landingpage/sectionStyles';
import { careersJobs, type CareerJobFull } from './careersData';

const tabs = ['all', 'engineering', 'product', 'design', 'legal', 'sales'] as const;

const values = [
  {
    title: 'Inovação',
    description:
      'Expandimos os limites da tecnologia jurídica com pensamento criativo e experimentação disciplinada.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    ),
  },
  {
    title: 'Excelência',
    description: 'Elevamos o padrão de qualidade do produto, de segurança e da forma como atendemos nossos clientes.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    ),
  },
  {
    title: 'Impacto',
    description: 'Nossa motivação é tornar o trabalho jurídico mais eficiente, acessível e justo.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />,
  },
  {
    title: 'Colaboração',
    description: 'As melhores ideias surgem de equipes diversas que trabalham com respeito e comunicação direta.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    ),
  },
];

const benefits = [
  { title: 'Remuneração competitiva', description: 'Salário, participação acionária e bônus alinhados ao impacto.' },
  { title: 'Saúde', description: 'Planos médico, odontológico e oftalmológico com forte subsídio da empresa.' },
  { title: 'Trabalho flexível', description: 'Vagas compatíveis com trabalho remoto e horários flexíveis quando a função permite.' },
  { title: 'Verba para aprendizado', description: 'Auxílio anual para cursos, conferências e certificações.' },
  { title: 'Bem-estar', description: 'Recursos de saúde mental e benefícios de bem-estar.' },
  { title: 'Folgas', description: 'Férias remuneradas generosas, com incentivo para que você realmente as aproveite.' },
];

const cultureTiles = [
  { label: 'Colaboração', surface: 'from-castanha-100 to-castanha-150' },
  { label: 'Trabalho focado', surface: 'from-castanha-100 to-castanha-200' },
  { label: 'Visitas a clientes', surface: 'from-castanha-50 to-castanha-150' },
  { label: 'Rituais de equipe', surface: 'from-castanha-150 to-castanha-150' },
];

function JobRow({ job }: { job: CareerJobFull }) {
  return (
    <article className="landing-surface shadow-[0_12px_28px_rgba(31,42,23,0.04)] transition-all duration-300 hover:shadow-[0_20px_40px_rgba(31,42,23,0.07)] p-6 md:p-8">
      <div className="mb-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <h3 className="mb-2 text-xl font-medium text-ink">{job.title}</h3>
          <p className="text-[0.9375rem] leading-relaxed text-castanha-600">{job.description}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <span className="rounded-full border border-castanha-200 bg-castanha-100 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-castanha-600">
            {job.location}
          </span>
          <span className="rounded-full border border-castanha-200 bg-castanha-100 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-castanha-600">
            {job.type}
          </span>
          <span className="rounded-full border border-castanha-200 bg-castanha-100 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] capitalize text-castanha-600">
            {job.departmentLabel}
          </span>
        </div>
      </div>
      <div className="mb-6">
        <h4 className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-castanha-600">Requisitos</h4>
        <ul className="space-y-2">
          {job.requirements.map((req) => (
            <li key={req} className="flex gap-3 text-[0.9375rem] text-castanha-600">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-castanha-300" aria-hidden />
              {req}
            </li>
          ))}
        </ul>
      </div>
      <Link
        href={`/careers/${job.id}`}
        className="inline-flex items-center justify-center rounded-[0.875rem] bg-cerrado-800 px-6 py-3 text-[0.9375rem] font-medium text-white transition-all hover:brightness-110"
      >
        Ver vaga e candidatar-se
      </Link>
    </article>
  );
}

export default function CareersExperience() {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filtered = useMemo(
    () => (activeTab === 'all' ? careersJobs : careersJobs.filter((j) => j.department === activeTab)),
    [activeTab]
  );

  return (
    <div className="min-h-screen">
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
          <div className="relative z-10 mx-auto flex w-full max-w-[1274px] flex-col items-center text-center">
            <p className="text-[0.94444rem] font-normal leading-[1.41663rem] text-castanha-600">Carreiras na Pequi</p>
            <h1 className="mt-5 max-w-3xl text-[2.7rem] font-medium leading-[1.08] tracking-[-0.08rem] text-ink sm:text-[3.25rem] sm:leading-[1.08] sm:tracking-[-0.12rem]">
              Junte-se à nossa missão
            </h1>
            <p className="mt-5 max-w-xl text-[1rem] leading-[160%] text-castanha-600 md:text-[1.125rem]">
              Ajude a transformar o trabalho jurídico com IA responsável: construa produtos, modelos e confiança com a gente.
            </p>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.06}>
        <section className="border-b border-castanha-150 bg-white py-12 md:py-16">
          <div className="mx-auto max-w-[1274px] px-4 md:px-8 lg:px-6 xl:px-0">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="mb-3 text-[0.94444rem] font-normal leading-[1.41663rem] text-castanha-600">Nosso propósito</p>
                <h2 className="text-left text-[2rem] font-medium leading-[1.1] text-ink md:text-[2.5rem]">
                  Por que estamos aqui
                </h2>
                <p className="mt-4 text-[1rem] leading-[175%] text-castanha-600 md:text-[1.0625rem]">
                  Automatizamos o trabalho jurídico rotineiro e trazemos insights melhores para que as equipes possam se concentrar em análise, estratégia e
                  clientes. Se você gosta de entregar software sério em uma área séria, vai se encaixar aqui.
                </p>
                <p className="mt-4 text-[1rem] leading-[175%] text-castanha-600 md:text-[1.0625rem]">
                  Contratamos pela excelência técnica, gentileza e honestidade intelectual, em engenharia, produto, design, jurídico e
                  go-to-market.
                </p>
              </div>
              <div className="overflow-hidden rounded-[1.875rem] border border-castanha-150 bg-white shadow-[0_24px_64px_rgba(31,42,23,0.06)]">
                <div className="relative h-48 border-b border-castanha-150 bg-gradient-to-br from-castanha-100 via-castanha-150 to-castanha-200">
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_80%_0%,#fff_0%,transparent_50%)]" aria-hidden />
                  <div className="relative flex h-full items-end p-8">
                    <p className="max-w-sm text-lg font-medium text-ink">Construa o futuro da inteligência jurídica.</p>
                  </div>
                </div>
                <div className="space-y-4 p-8 text-[0.9375rem] leading-relaxed text-castanha-600">
                  <p>Squads multidisciplinares. Muita autonomia. Problemas claros que valem a pena resolver.</p>
                  <Link href="#openings" className="inline-flex font-medium text-ink hover:underline">
                    Ir para as vagas abertas →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.08}>
        <section className="border-b border-castanha-150 bg-white py-12 md:py-16">
          <div className="mx-auto max-w-[1274px] px-4 md:px-8 lg:px-6 xl:px-0">
            <h2 className={`${sectionHeadingClass} text-center`}>Nossos valores</h2>
            <p className={`${sectionSubTextClass} mx-auto mt-3 mb-10 max-w-2xl text-center md:mb-12`}>
              Como trabalhamos no dia a dia, e não apenas palavras na parede.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="rounded-2xl border border-castanha-150 bg-castanha-100/85 p-6 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(31,42,23,0.06)]"
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-castanha-200 bg-white text-castanha-800">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      {v.icon}
                    </svg>
                  </div>
                  <h3 className="mb-2 text-lg font-medium text-castanha-800">{v.title}</h3>
                  <p className="text-[0.875rem] leading-relaxed text-castanha-800">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <section className="border-b border-castanha-150 bg-white py-12 md:py-16">
          <div className="mx-auto max-w-[1274px] px-4 md:px-8 lg:px-6 xl:px-0">
            <h2 className={`${sectionHeadingClass} text-center`}>A vida na Pequi</h2>
            <p className={`${sectionSubTextClass} mx-auto mt-3 mb-10 max-w-2xl text-center`}>
              Favorável ao trabalho assíncrono, orientado a resultados e intencional na forma como passamos tempo juntos.
            </p>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {cultureTiles.map((t) => (
                <div
                  key={t.label}
                  className={`flex aspect-[4/3] items-end rounded-[1.25rem] border border-castanha-150 bg-gradient-to-br p-5 font-medium text-ink shadow-[0_8px_24px_rgba(31,42,23,0.05)] ${t.surface}`}
                >
                  <span className="text-[0.9375rem]">{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.12}>
        <section className="border-b border-castanha-150 bg-white py-12 md:py-16">
          <div className="mx-auto max-w-[1274px] px-4 md:px-8 lg:px-6 xl:px-0">
            <h2 className={`${sectionHeadingClass} text-center`}>Benefícios e vantagens</h2>
            <p className={`${sectionSubTextClass} mx-auto mt-3 mb-10 max-w-2xl text-center md:mb-12`}>
              O essencial bem feito, e espaço para crescer.
            </p>
            <div className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="rounded-[1.25rem] border border-castanha-200 bg-castanha-100/80 p-6 transition-colors hover:border-castanha-300"
                >
                  <div className="mb-4 h-px w-8 bg-cerrado-900/15" aria-hidden />
                  <h3 className="mb-2 font-medium text-ink">{b.title}</h3>
                  <p className="text-[0.875rem] leading-relaxed text-castanha-600">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.14}>
        <section id="openings" className="scroll-mt-24 bg-white py-12 md:py-16 md:scroll-mt-28">
          <div className="mx-auto max-w-[1274px] px-4 md:px-8 lg:px-6 xl:px-0">
            <h2 className={`${sectionHeadingClass} text-center`}>Vagas abertas</h2>
            <p className={`${sectionSubTextClass} mx-auto mt-3 mb-8 max-w-2xl text-center`}>
              Filtre por equipe. Cada vaga traz todos os detalhes e um formulário de candidatura.
            </p>

            <div className="mb-10 flex flex-wrap justify-center gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full border px-4 py-2.5 text-[0.875rem] font-medium transition-all ${
                    activeTab === tab
                      ? 'border-cerrado-800 bg-cerrado-800 text-white shadow-[0_6px_16px_rgba(31,42,23,0.12)]'
                      : 'border-castanha-200 bg-castanha-100 text-castanha-600 hover:border-castanha-300 hover:text-ink'
                  }`}
                >
                  {tab === 'all' ? 'Todas as equipes' : ({ engineering: 'Engenharia', product: 'Produto', design: 'Design', legal: 'Jurídico', sales: 'Vendas' } as Record<string, string>)[tab]}
                </button>
              ))}
            </div>

            <div className="space-y-5">
              {filtered.length > 0 ? (
                filtered.map((job) => <JobRow key={job.id} job={job} />)
              ) : (
                <div className="rounded-[1.25rem] border border-castanha-150 bg-white p-12 text-center shadow-[0_12px_28px_rgba(31,42,23,0.04)]">
                  <p className="mb-2 text-castanha-600">Não há vagas abertas nesta equipe no momento.</p>
                  <p className="text-sm text-castanha-600">
                    <Link href="/contact" className="font-medium text-ink hover:underline">
                      Fale conosco
                    </Link>{' '}
                    sobre oportunidades futuras.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.16}>
        <section className="border-t border-castanha-150 bg-castanha-50 py-12 md:py-14">
          <div className="mx-auto max-w-[48rem] px-4 text-center">
            <h2 className="mb-4 text-xl font-medium text-ink md:text-2xl">Empresa com igualdade de oportunidades</h2>
            <p className="text-[0.9375rem] leading-relaxed text-castanha-600">
              A Pequi é uma empresa que oferece igualdade de oportunidades. Recebemos candidatos qualificados independentemente de raça, religião,
              cor, origem nacional, gênero, orientação sexual, idade, deficiência, condição de veterano ou outras características
              protegidas.
            </p>
          </div>
        </section>
      </FadeInSection>
    </div>
  );
}
