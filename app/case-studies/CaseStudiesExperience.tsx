'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { AuthHero } from '@/app/components/auth/AuthPageChrome';
import { caseStudies, type CaseStudyRecord } from './caseStudiesData';

const FILTERS: { id: string; name: string }[] = [
  { id: 'all', name: 'Todos os casos' },
  { id: 'contract-review', name: 'Revisão de contratos' },
  { id: 'compliance', name: 'Compliance' },
  { id: 'research', name: 'Pesquisa jurídica' },
  { id: 'due-diligence', name: 'Due diligence' },
  { id: 'contract-management', name: 'Gestão de contratos' },
  { id: 'transactions', name: 'Transações' },
];

function StudyCard({ study }: { study: CaseStudyRecord }) {
  return (
    <article className="group flex flex-col rounded-[1.875rem] border border-gray-200 bg-white overflow-hidden shadow-[0_12px_28px_rgba(17,24,39,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-[0_20px_40px_rgba(17,24,39,0.08)]">
      <div className={`relative h-44 md:h-52 bg-gradient-to-br ${study.accent} px-6 py-5 flex flex-col justify-end`}>
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_80%_0%,#fff_0%,transparent_45%)]" aria-hidden />
        <p className="relative text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-white/70">{study.industry}</p>
        <p className="relative text-white font-medium text-lg mt-1">{study.client}</p>
      </div>
      <div className="p-6 md:p-7 flex flex-col flex-1">
        <h3 className="text-[#111827] text-[1.125rem] md:text-[1.25rem] font-medium leading-snug mb-3 group-hover:opacity-90 transition-opacity">
          {study.title}
        </h3>
        <p className="text-[#636977] text-[0.9375rem] leading-[160%] mb-6 flex-1">{study.excerpt}</p>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {study.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-[0.75rem] border border-gray-100 bg-[#F5F5F4]/80 px-2 py-2.5 text-center"
            >
              <div className="text-[#111827] text-sm md:text-base font-semibold leading-tight">{m.value}</div>
              <div className="text-[0.625rem] font-medium uppercase tracking-[0.06em] text-[#868589] mt-1 line-clamp-2">
                {m.label}
              </div>
            </div>
          ))}
        </div>
        <Link
          href={`/case-studies/${study.id}`}
          className="inline-flex items-center gap-2 text-[#111827] text-[0.9375rem] font-medium group/link"
        >
          Ler o caso completo
          <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}

export default function CaseStudiesExperience() {
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = useMemo(
    () =>
      FILTERS.map((f) => ({
        ...f,
        count: f.id === 'all' ? caseStudies.length : caseStudies.filter((cs) => cs.category === f.id).length,
      })),
    []
  );

  const filtered = useMemo(
    () => (activeFilter === 'all' ? caseStudies : caseStudies.filter((cs) => cs.category === activeFilter)),
    [activeFilter]
  );

  return (
    <div className="min-h-screen">
      <AuthHero
        eyebrow="Resultados"
        title="Histórias de sucesso de clientes"
        subtitle="Equipes reais usando o Pequi para agilizar contratos, compliance, pesquisas e operações."
      />

      <section className="bg-[#F5F5F4] border-b border-gray-200 py-12 md:py-16">
        <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {[
              { value: '500+', label: 'Histórias de sucesso', sub: 'Equipes com resultados mensuráveis' },
              { value: '75%', label: 'Tempo médio economizado', sub: 'Menos trabalho jurídico manual' },
              { value: 'US$ 50 mi+', label: 'Economia dos clientes', sub: 'Impacto anual combinado' },
              { value: '98%', label: 'Satisfação', sub: 'Recomendariam o Pequi' },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-[1.25rem] border border-gray-200 bg-white px-6 py-7 text-center shadow-[0_8px_24px_rgba(17,24,39,0.04)]"
              >
                <div className="text-[#111827] text-3xl md:text-4xl font-medium mb-2">{s.value}</div>
                <div className="text-[#111827] text-[0.9375rem] font-medium mb-1">{s.label}</div>
                <p className="text-[#868589] text-[0.8125rem] leading-relaxed">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16 border-b border-gray-200">
        <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <h2 className="text-[#111827] text-[1.5rem] md:text-[1.75rem] font-medium mb-2">Casos em destaque</h2>
              <p className="text-[#636977] text-[1rem] max-w-xl leading-relaxed">
                Filtre por caso de uso e abra uma história para ver o desafio, a solução e os resultados completos.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex justify-center items-center rounded-[0.875rem] bg-[#111827] text-white px-6 py-3.5 text-[0.9375rem] font-medium transition-all hover:bg-[#0f172a] shrink-0"
            >
              Compartilhe sua história
            </Link>
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveFilter(cat.id)}
                className={`px-4 py-2.5 rounded-full text-[0.875rem] font-medium transition-all border ${
                  activeFilter === cat.id
                    ? 'bg-[#111827] text-white border-[#111827]'
                    : 'bg-[#F5F5F4] text-[#636977] border-gray-200 hover:border-gray-300 hover:text-[#111827]'
                }`}
              >
                {cat.name}
                <span className="ml-1.5 text-[0.8125rem] opacity-80">({cat.count})</span>
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {filtered.map((study) => (
              <StudyCard key={study.id} study={study} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-[#868589] py-16">Ainda não há casos nesta categoria.</p>
          )}
        </div>
      </section>
    </div>
  );
}
