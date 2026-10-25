'use client';

import Link from 'next/link';
import { getRelatedCaseStudies, type CaseStudyRecord } from '../caseStudiesData';

type Props = { study: CaseStudyRecord };

function RelatedCard({ s }: { s: CaseStudyRecord }) {
  return (
    <Link
      href={`/case-studies/${s.id}`}
      className="group rounded-[1.25rem] border border-gray-200 bg-white overflow-hidden transition-all duration-300 hover:border-gray-300 hover:shadow-[0_12px_28px_rgba(17,24,39,0.06)] flex flex-col"
    >
      <div className={`h-28 bg-gradient-to-br ${s.accent} shrink-0`} />
      <div className="p-5">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-[#868589] mb-1">{s.industry}</p>
        <h3 className="text-[#111827] font-medium leading-snug group-hover:opacity-90 transition-opacity">{s.title}</h3>
      </div>
    </Link>
  );
}

export default function CaseStudyDetailExperience({ study }: Props) {
  const related = getRelatedCaseStudies(study.id, 2);

  return (
    <div className="min-h-screen">
      <header className="relative w-full -mt-24 md:-mt-20 min-h-[320px] md:min-h-[380px] overflow-hidden text-white border-b border-[#1f2937]">
        <div className={`absolute inset-0 bg-gradient-to-br ${study.accent}`} aria-hidden />
        <div className="absolute inset-0 bg-[#0f172a]/50" aria-hidden />
        <div
          className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,#fff_0%,transparent_50%)]"
          aria-hidden
        />
        <div className="relative max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0 pt-28 md:pt-32 pb-12 md:pb-14">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-[0.875rem] font-medium mb-8 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All case studies
          </Link>
          <p className="text-white/75 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] mb-3">{study.industry}</p>
          <h1 className="text-white text-[1.75rem] md:text-[2.5rem] lg:text-[2.75rem] font-medium leading-[1.15] max-w-4xl">
            {study.title}
          </h1>
          <p className="mt-4 text-white/80 text-[1rem] md:text-[1.0625rem] max-w-2xl leading-relaxed">{study.excerpt}</p>
          <p className="mt-6 text-white/70 text-[0.9375rem]">
            <span className="font-medium text-white/90">{study.client}</span>
          </p>
        </div>
      </header>

      <section className="bg-[#F5F5F4] py-10 md:py-12 border-b border-gray-200">
        <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
          <div className="grid sm:grid-cols-3 gap-4">
            {study.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-[1.25rem] border border-gray-200 bg-white px-5 py-6 text-center shadow-[0_8px_24px_rgba(17,24,39,0.04)]"
              >
                <div className="text-[#111827] text-2xl md:text-3xl font-semibold mb-1">{m.value}</div>
                <div className="text-[#111827] text-[0.875rem] font-medium mb-1">{m.label}</div>
                <p className="text-[#868589] text-[0.8125rem] leading-relaxed">{m.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="max-w-[48rem] mx-auto px-4 md:px-8 lg:px-6 xl:px-0 space-y-10">
          <div>
            <h2 className="text-[#111827] text-[1.25rem] font-medium mb-3">Challenge</h2>
            <p className="text-[#636977] text-[1.0625rem] leading-[175%]">{study.challenge}</p>
          </div>
          <div>
            <h2 className="text-[#111827] text-[1.25rem] font-medium mb-3">Solution</h2>
            <p className="text-[#636977] text-[1.0625rem] leading-[175%]">{study.solution}</p>
          </div>
          <div>
            <h2 className="text-[#111827] text-[1.25rem] font-medium mb-3">Results</h2>
            <p className="text-[#636977] text-[1.0625rem] leading-[175%]">{study.results}</p>
          </div>
        </div>
      </section>

      <section className="bg-[#F5F5F4] py-12 md:py-16 border-y border-gray-200">
        <div className="max-w-[48rem] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
          <div className="rounded-[1.875rem] border border-gray-200 bg-white p-8 md:p-10 shadow-[0_20px_40px_rgba(17,24,39,0.06)]">
            <svg className="h-10 w-10 text-[#111827]/15 mb-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
            </svg>
            <blockquote className="text-[#636977] text-[1.125rem] md:text-[1.1875rem] leading-[175%] mb-8">
              &ldquo;{study.testimonial.quote}&rdquo;
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-[#F5F5F4] border border-gray-200 shrink-0" aria-hidden />
              <div>
                <p className="text-[#111827] font-medium">{study.testimonial.author}</p>
                <p className="text-[#868589] text-[0.875rem]">
                  {study.testimonial.position}, {study.testimonial.company}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-white py-12 md:py-16">
          <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
            <h2 className="text-[#111827] text-[1.25rem] md:text-[1.5rem] font-medium mb-8">More case studies</h2>
            <div className="grid sm:grid-cols-2 gap-5 max-w-3xl">
              {related.map((s) => (
                <RelatedCard key={s.id} s={s} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
