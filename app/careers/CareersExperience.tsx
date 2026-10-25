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
    title: 'Innovation',
    description:
      'We push what is possible in legal technology through creative thinking and disciplined experimentation.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    ),
  },
  {
    title: 'Excellence',
    description: 'We set a high bar for product quality, security, and how we show up for customers.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    ),
  },
  {
    title: 'Impact',
    description: 'We are motivated by making legal work more efficient, accessible, and fair.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />,
  },
  {
    title: 'Collaboration',
    description: 'The best ideas come from diverse teams working with respect and direct communication.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    ),
  },
];

const benefits = [
  { title: 'Competitive compensation', description: 'Salary, equity, and bonuses aligned with impact.' },
  { title: 'Healthcare', description: 'Medical, dental, and vision with strong employer support.' },
  { title: 'Flexible work', description: 'Remote-friendly roles and flexible schedules where the work allows.' },
  { title: 'Learning budget', description: 'Annual stipend for courses, conferences, and certifications.' },
  { title: 'Wellness', description: 'Mental health resources and wellness perks.' },
  { title: 'Time off', description: 'Generous PTO with encouragement to actually use it.' },
];

const cultureTiles = [
  { label: 'Collaboration', surface: 'from-[#f1f0ee] to-[#e8e4df]' },
  { label: 'Deep work', surface: 'from-[#efeeec] to-[#e5e2dc]' },
  { label: 'Customer visits', surface: 'from-[#f4f2ef] to-[#ebe7e1]' },
  { label: 'Team rituals', surface: 'from-[#f0eeeb] to-[#e6e3dd]' },
];

function JobRow({ job }: { job: CareerJobFull }) {
  return (
    <article className="landing-surface shadow-[0_12px_28px_rgba(16,16,26,0.04)] transition-all duration-300 hover:shadow-[0_20px_40px_rgba(16,16,26,0.07)] p-6 md:p-8">
      <div className="mb-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <h3 className="mb-2 text-xl font-medium text-[#10101A]">{job.title}</h3>
          <p className="text-[0.9375rem] leading-relaxed text-[#525252]">{job.description}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <span className="rounded-full border border-[#e7e5e1] bg-[#f1f0ee] px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[#525252]">
            {job.location}
          </span>
          <span className="rounded-full border border-[#e7e5e1] bg-[#f1f0ee] px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[#525252]">
            {job.type}
          </span>
          <span className="rounded-full border border-[#e7e5e1] bg-[#f1f0ee] px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] capitalize text-[#525252]">
            {job.department}
          </span>
        </div>
      </div>
      <div className="mb-6">
        <h4 className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[#525252]">Requirements</h4>
        <ul className="space-y-2">
          {job.requirements.map((req) => (
            <li key={req} className="flex gap-3 text-[0.9375rem] text-[#525252]">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#cfcac3]" aria-hidden />
              {req}
            </li>
          ))}
        </ul>
      </div>
      <Link
        href={`/careers/${job.id}`}
        className="inline-flex items-center justify-center rounded-[0.875rem] bg-[#1A1A1A] px-6 py-3 text-[0.9375rem] font-medium text-white transition-all hover:brightness-110"
      >
        View role & apply
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
            alt="Hero background"
            fill
            priority
            className="object-cover object-top"
          />
          <div className="relative z-10 mx-auto flex w-full max-w-[1274px] flex-col items-center text-center">
            <p className="text-[0.94444rem] font-normal leading-[1.41663rem] text-[#525252]">Careers at AiForLawyers</p>
            <h1 className="mt-5 max-w-3xl text-[2.7rem] font-medium leading-[1.08] tracking-[-0.08rem] text-[#10101A] sm:text-[3.25rem] sm:leading-[1.08] sm:tracking-[-0.12rem]">
              Join our mission
            </h1>
            <p className="mt-5 max-w-xl text-[1rem] leading-[160%] text-[#525252] md:text-[1.125rem]">
              Help transform legal work with responsible AI—build product, models, and trust with us.
            </p>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.06}>
        <section className="border-b border-[#eceae7] bg-[#FFFFFF] py-12 md:py-16">
          <div className="mx-auto max-w-[1274px] px-4 md:px-8 lg:px-6 xl:px-0">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="mb-3 text-[0.94444rem] font-normal leading-[1.41663rem] text-[#525252]">Our purpose</p>
                <h2 className="text-left text-[2rem] font-medium leading-[1.1] text-[#10101A] md:text-[2.5rem]">
                  Why we are here
                </h2>
                <p className="mt-4 text-[1rem] leading-[175%] text-[#525252] md:text-[1.0625rem]">
                  We automate routine legal work and surface better insight so teams can focus on judgment, strategy, and
                  clients. If you care about shipping serious software in a serious domain, you will fit in.
                </p>
                <p className="mt-4 text-[1rem] leading-[175%] text-[#525252] md:text-[1.0625rem]">
                  We hire for craft, kindness, and intellectual honesty—across engineering, product, design, legal, and
                  go-to-market.
                </p>
              </div>
              <div className="overflow-hidden rounded-[1.875rem] border border-[#eceae7] bg-white shadow-[0_24px_64px_rgba(16,16,26,0.06)]">
                <div className="relative h-48 border-b border-[#eceae7] bg-gradient-to-br from-[#f1f0ee] via-[#ebe8e3] to-[#e0ddd6]">
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_80%_0%,#fff_0%,transparent_50%)]" aria-hidden />
                  <div className="relative flex h-full items-end p-8">
                    <p className="max-w-sm text-lg font-medium text-[#10101A]">Build the future of legal intelligence.</p>
                  </div>
                </div>
                <div className="space-y-4 p-8 text-[0.9375rem] leading-relaxed text-[#525252]">
                  <p>Cross-functional squads. High ownership. Clear problems worth solving.</p>
                  <Link href="#openings" className="inline-flex font-medium text-[#10101A] hover:underline">
                    Jump to open roles →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.08}>
        <section className="border-b border-[#eceae7] bg-[#FFFFFF] py-12 md:py-16">
          <div className="mx-auto max-w-[1274px] px-4 md:px-8 lg:px-6 xl:px-0">
            <h2 className={`${sectionHeadingClass} text-center`}>Our values</h2>
            <p className={`${sectionSubTextClass} mx-auto mt-3 mb-10 max-w-2xl text-center md:mb-12`}>
              How we work day to day—not just words on a wall.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="rounded-2xl border border-[#eceae7] bg-[#efeeec]/85 p-6 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(16,16,26,0.06)]"
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#e7e5e1] bg-white text-[#323232]">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      {v.icon}
                    </svg>
                  </div>
                  <h3 className="mb-2 text-lg font-medium text-[#323232]">{v.title}</h3>
                  <p className="text-[0.875rem] leading-relaxed text-[#323232]">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <section className="border-b border-[#eceae7] bg-[#FFFFFF] py-12 md:py-16">
          <div className="mx-auto max-w-[1274px] px-4 md:px-8 lg:px-6 xl:px-0">
            <h2 className={`${sectionHeadingClass} text-center`}>Life at AiForLawyers</h2>
            <p className={`${sectionSubTextClass} mx-auto mt-3 mb-10 max-w-2xl text-center`}>
              Async-friendly, outcome-driven, and intentional about how we spend time together.
            </p>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {cultureTiles.map((t) => (
                <div
                  key={t.label}
                  className={`flex aspect-[4/3] items-end rounded-[1.25rem] border border-[#eceae7] bg-gradient-to-br p-5 font-medium text-[#10101A] shadow-[0_8px_24px_rgba(16,16,26,0.05)] ${t.surface}`}
                >
                  <span className="text-[0.9375rem]">{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.12}>
        <section className="border-b border-[#eceae7] bg-[#FFFFFF] py-12 md:py-16">
          <div className="mx-auto max-w-[1274px] px-4 md:px-8 lg:px-6 xl:px-0">
            <h2 className={`${sectionHeadingClass} text-center`}>Benefits & perks</h2>
            <p className={`${sectionSubTextClass} mx-auto mt-3 mb-10 max-w-2xl text-center md:mb-12`}>
              The basics done well—plus room to grow.
            </p>
            <div className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="rounded-[1.25rem] border border-[#e7e5e1] bg-[#f1f0ee]/80 p-6 transition-colors hover:border-[#d4d2ce]"
                >
                  <div className="mb-4 h-px w-8 bg-[#10101A]/15" aria-hidden />
                  <h3 className="mb-2 font-medium text-[#10101A]">{b.title}</h3>
                  <p className="text-[0.875rem] leading-relaxed text-[#525252]">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.14}>
        <section id="openings" className="scroll-mt-24 bg-[#FFFFFF] py-12 md:py-16 md:scroll-mt-28">
          <div className="mx-auto max-w-[1274px] px-4 md:px-8 lg:px-6 xl:px-0">
            <h2 className={`${sectionHeadingClass} text-center`}>Open positions</h2>
            <p className={`${sectionSubTextClass} mx-auto mt-3 mb-8 max-w-2xl text-center`}>
              Filter by team. Each listing has full details and an application form.
            </p>

            <div className="mb-10 flex flex-wrap justify-center gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full border px-4 py-2.5 text-[0.875rem] font-medium transition-all ${
                    activeTab === tab
                      ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-[0_6px_16px_rgba(16,16,26,0.12)]'
                      : 'border-[#e7e5e1] bg-[#f1f0ee] text-[#525252] hover:border-[#d4d2ce] hover:text-[#10101A]'
                  }`}
                >
                  {tab === 'all' ? 'All teams' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="space-y-5">
              {filtered.length > 0 ? (
                filtered.map((job) => <JobRow key={job.id} job={job} />)
              ) : (
                <div className="rounded-[1.25rem] border border-[#eceae7] bg-white p-12 text-center shadow-[0_12px_28px_rgba(16,16,26,0.04)]">
                  <p className="mb-2 text-[#525252]">No open roles in this team right now.</p>
                  <p className="text-sm text-[#525252]">
                    <Link href="/contact" className="font-medium text-[#10101A] hover:underline">
                      Contact us
                    </Link>{' '}
                    about future opportunities.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.16}>
        <section className="border-t border-[#eceae7] bg-[#f8f7f6] py-12 md:py-14">
          <div className="mx-auto max-w-[48rem] px-4 text-center">
            <h2 className="mb-4 text-xl font-medium text-[#10101A] md:text-2xl">Equal opportunity employer</h2>
            <p className="text-[0.9375rem] leading-relaxed text-[#525252]">
              AiForLawyers is an equal opportunity employer. We welcome qualified applicants regardless of race, religion,
              color, national origin, gender, sexual orientation, age, disability, veteran status, or other protected
              characteristics.
            </p>
          </div>
        </section>
      </FadeInSection>
    </div>
  );
}
