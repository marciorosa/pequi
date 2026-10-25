'use client';

import Link from 'next/link';
import Image from 'next/image';
import FadeInSection from '../components/landingpage/FadeInSection';
import { sectionHeadingClass, sectionSubTextClass } from '../components/landingpage/sectionStyles';

const featureCardClass =
  'flex min-h-[240.8px] flex-col rounded-2xl border border-[#eceae7] bg-[#efeeec]/85 px-5 py-5 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(16,16,26,0.06)]';

function FeatureIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg className="h-10 w-10 text-[#323232]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      {children}
    </svg>
  );
}

export default function KnowledgeExperience() {
  const features = [
    {
      title: 'Comprehensive search',
      desc: 'Search statutes, case law, regulations, and commentary across jurisdictions—with semantic understanding of your question.',
      icon: (
        <FeatureIcon>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </FeatureIcon>
      ),
    },
    {
      title: 'Accurate citations',
      desc: 'Insights trace back to primary sources so you can verify, cite, and drill into the authorities that matter.',
      icon: (
        <FeatureIcon>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
          />
        </FeatureIcon>
      ),
    },
    {
      title: 'Contextual understanding',
      desc: 'Answers reflect jurisdiction, time period, and practice area—so research fits how the question is actually asked.',
      icon: (
        <FeatureIcon>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
          />
        </FeatureIcon>
      ),
    },
    {
      title: 'Instant results',
      desc: 'Compress hours of research into seconds—without sacrificing the rigor your matters require.',
      icon: (
        <FeatureIcon>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
          />
        </FeatureIcon>
      ),
    },
    {
      title: 'Customizable queries',
      desc: 'Filter by jurisdiction, court level, document type, date range, and precedential weight.',
      icon: (
        <FeatureIcon>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
          />
        </FeatureIcon>
      ),
    },
    {
      title: 'Export & integration',
      desc: 'Send findings to Word, PDF, or your DMS with consistent formatting and citation styles.',
      icon: (
        <FeatureIcon>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
          />
        </FeatureIcon>
      ),
    },
  ];

  const citations = [
    {
      title: 'California Business and Professions Code § 16600',
      body: '"Except as provided in this chapter, every contract by which anyone is restrained from engaging in a lawful profession, trade, or business of any kind is to that extent void."',
    },
    {
      title: 'AMN Services, LLC v. Aya Healthcare Services, Inc., 28 Cal. App. 5th 923 (2018)',
      body: 'The Court of Appeal affirmed that non-solicitation agreements are generally unenforceable in California as they restrain employee mobility.',
    },
    {
      title: 'Edwards v. Arthur Andersen LLP, 44 Cal. 4th 937 (2008)',
      body: 'The California Supreme Court rejected the "narrow restraint" exception to Section 16600, holding that even narrowly tailored non-compete agreements are invalid in California.',
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
            alt="Hero background"
            fill
            priority
            className="object-cover object-top"
          />
          <div className="relative z-10 mx-auto w-full max-w-[1274px]">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.02fr] lg:gap-14">
              <div className="text-left">
                <p className="text-[0.94444rem] font-normal leading-[1.41663rem] text-[#525252]">AiForLawyers</p>
                <h1 className="mt-5 max-w-[700px] font-medium leading-[1.08] tracking-[-0.08rem] text-[#10101A] text-[2.7rem] sm:text-[3.25rem] sm:leading-[1.08] sm:tracking-[-0.12rem]">
                  Knowledge
                </h1>
                <p className="mt-3 max-w-xl text-xl font-medium leading-snug text-[#323232] md:text-2xl">
                  Rapid research, grounded results
                </p>
                <p className="mt-5 max-w-xl text-[1rem] font-normal leading-[1.5rem] text-[#525252] md:text-[1.125rem] lg:text-[1.25rem]">
                  Answers across legal, regulatory, and tax questions—with citations you can trust from authoritative
                  sources.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/contact"
                    className="landing-primary-btn inline-flex h-11 items-center justify-center px-6 transition hover:brightness-110"
                  >
                    Request a demo
                  </Link>
                  <button
                    type="button"
                    onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                    className="landing-secondary-btn inline-flex h-[2.83331rem] min-w-[10.81025rem] items-center justify-center px-6 transition hover:bg-[#eceae7]"
                  >
                    See search demo
                  </button>
                </div>
              </div>

              <div className="relative min-h-[280px] sm:min-h-[340px] lg:min-h-[380px]">
                <div className="flex h-full min-h-[inherit] flex-col rounded-2xl border border-[#eceae7] p-5 sm:p-6">
                  <div className="relative min-h-[220px] flex-1 sm:min-h-[280px] lg:min-h-[300px]">
                    <Image
                      src="/landingpage/features/ai-powered-legal-assistant.png"
                      alt="AI-powered legal intelligence search"
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
        <section className="bg-[#FFFFFF] py-16 lg:py-[5.5rem] scroll-mt-24 md:scroll-mt-28">
          <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
            <h2 className={sectionHeadingClass}>Powerful legal research</h2>
            <p className={`${sectionSubTextClass} mt-4 mb-10 md:mb-12`}>
              Everything you need to move from question to supported answer—fast, traceable, and ready for your workflow.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((f) => (
                <div key={f.title} className={featureCardClass}>
                  <div className="inline-flex w-full items-center justify-start">{f.icon}</div>
                  <div className="mt-auto pt-6">
                    <h3 className="text-[1.125rem] font-medium leading-[1.575rem] text-[#323232]">{f.title}</h3>
                    <p className="mt-2 text-[1rem] font-normal leading-[1.4rem] text-[#323232]">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <section id="demo" className="bg-[#FFFFFF] pb-16 lg:pb-[5.5rem] scroll-mt-24 md:scroll-mt-28">
          <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
            <h2 className={sectionHeadingClass}>Experience knowledge search</h2>
            <p className={`${sectionSubTextClass} mt-4 mb-10 md:mb-12`}>
              A sample query and structured results—illustrative only, not legal advice.
            </p>

            <div className="landing-surface mx-auto max-w-4xl overflow-hidden shadow-[0_24px_64px_rgba(16,16,26,0.06),0_48px_100px_rgba(16,16,26,0.04)] transition-shadow duration-300 hover:shadow-[0_28px_72px_rgba(16,16,26,0.08)]">
              <div className="border-b border-[#e7e7ea] p-6 md:p-8">
                <h3 className="mb-4 text-[1.125rem] font-medium text-[#10101A] md:text-[1.25rem]">Enter your legal research query</h3>
                <div className="mb-6 rounded-[0.875rem] border border-[#e7e5e1] bg-[#f1f0ee] p-5">
                  <p className="text-[0.9375rem] italic leading-[160%] text-[#525252]">
                    &quot;What are the requirements for enforceability of non-compete clauses in California?&quot;
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  {(['Jurisdiction', 'Document Type'] as const).map((label) => (
                    <div key={label} className="sm:flex-1">
                      <label className="mb-2 block text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-[#525252]">
                        {label}
                      </label>
                      <select
                        className="w-full rounded-[0.875rem] border border-[#e7e5e1] bg-[#f1f0ee] px-4 py-3.5 text-[0.9375rem] text-[#10101A] focus:border-[#d4d2ce] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#10101A]/8"
                        aria-label={label}
                      >
                        <option>All {label === 'Jurisdiction' ? 'jurisdictions' : 'documents'}</option>
                        {label === 'Jurisdiction'
                          ? ['United States (Federal)', 'California', 'New York', 'Delaware'].map((o) => (
                              <option key={o}>{o}</option>
                            ))
                          : ['Case law', 'Statutes', 'Regulations', 'Secondary sources'].map((o) => (
                              <option key={o}>{o}</option>
                            ))}
                      </select>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-[0.875rem] bg-[#1A1A1A] px-8 py-3.5 text-[0.9375rem] font-medium text-white transition-all duration-300 hover:brightness-110 hover:shadow-[0_10px_24px_rgba(16,16,26,0.15)]"
                >
                  Search
                </button>
              </div>

              <div className="bg-[#f1f0ee]/45 p-6 md:p-8">
                <h3 className="mb-4 text-[1.125rem] font-medium text-[#10101A] md:text-[1.25rem]">Research results</h3>
                <div className="rounded-[1.25rem] border border-[#eceae7] bg-white p-6 md:p-8">
                  <p className="mb-6 text-[0.9375rem] leading-[160%] text-[#525252]">
                    <span className="font-medium text-[#10101A]">Summary:</span> Non-compete clauses in California are
                    generally unenforceable except in very limited circumstances. California Business and Professions
                    Code Section 16600 reflects a strong public policy against restraints on employment.
                  </p>
                  <div className="space-y-6">
                    {citations.map((cite) => (
                      <div key={cite.title} className="border-l-2 border-[#10101A]/18 py-1 pl-5">
                        <p className="mb-2 text-[0.9375rem] font-medium text-[#10101A]">{cite.title}</p>
                        <p className="text-[0.9375rem] leading-[160%] text-[#525252]">{cite.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.12}>
        <section className="bg-[#FFFFFF] pb-16 lg:pb-[7rem]">
          <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
            <div className="mx-auto max-w-4xl overflow-hidden rounded-[1.875rem] border border-[#eceae7] bg-white shadow-[0_24px_64px_rgba(16,16,26,0.06)]">
              <div className="md:flex">
                <div className="md:w-[min(280px,36%)] shrink-0 bg-[#1A1A1A] p-8 md:p-10 flex items-center justify-center min-h-[200px] md:min-h-0">
                  <div className="text-center md:text-left">
                    <p className="text-white text-[1.25rem] md:text-[1.375rem] font-medium leading-snug">
                      International law firm
                    </p>
                    <p className="mt-2 text-white/60 text-[0.6875rem] font-medium uppercase tracking-[0.14em]">
                      Global 100
                    </p>
                  </div>
                </div>
                <div className="flex-1 p-8 md:p-10">
                  <h3 className="mb-5 text-[1.5rem] font-medium leading-tight text-[#10101A] md:text-[1.75rem]">
                    Cut research time by 75%
                  </h3>
                  <p className="mb-8 text-[1rem] leading-[160%] text-[#525252]">
                    &quot;AiForLawyers&apos;s Knowledge platform has transformed our research process. Our associates now
                    complete in minutes what used to take hours. The accuracy of the citations and the depth of analysis
                    have impressed even our most senior partners.&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-px w-8 shrink-0 bg-[#e7e5e1]" />
                    <p className="text-[0.9375rem] font-medium text-[#525252]">Managing partner, global law firm</p>
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
