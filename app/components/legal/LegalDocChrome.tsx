'use client';

import Image from 'next/image';
import Link from 'next/link';

export function LegalHero({ eyebrow, title, lastUpdated }: { eyebrow: string; title: string; lastUpdated: string }) {
  return (
    <header
      id="hero"
      className="relative -mt-20 overflow-hidden border-b border-[#eceae7] px-4 pb-12 pt-[11.5rem] sm:px-6 sm:pt-[12.5rem] lg:px-8 lg:pb-14 lg:pt-[11.5rem] scroll-mt-24 md:scroll-mt-28"
    >
      <Image
        src="/landingpage/hero/hero-bgimg.png"
        alt="Hero background"
        fill
        priority
        className="z-0 object-cover object-top"
        sizes="100vw"
      />
      <div className="relative z-10 mx-auto max-w-[1274px] text-center">
        <p className="mb-4 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-[#525252]">{eyebrow}</p>
        <h1 className="text-[2.25rem] font-medium leading-[1.15] text-[#10101A] md:text-[3rem] lg:text-[3.25rem]">{title}</h1>
        <p className="mt-4 text-[1rem] text-[#525252]">Last updated: {lastUpdated}</p>
      </div>
    </header>
  );
}

export function LegalTOC({ items }: { items: { id: string; title: string }[] }) {
  return (
    <section className="border-b border-[#eceae7] bg-[#FFFFFF] py-10 md:py-12">
      <div className="mx-auto flex max-w-[1274px] justify-center px-4 md:px-8 lg:px-6 xl:px-0">
        <div className="w-full max-w-[34rem] rounded-2xl border border-[#eceae7] bg-[#f8f7f6] px-5 py-7 shadow-[0_12px_28px_rgba(16,16,26,0.04)] md:max-w-[38rem] md:px-7 md:py-8">
          <h2 className="mb-5 text-[1.25rem] font-medium text-[#10101A] md:mb-6 md:text-[1.5rem]">Table of contents</h2>
          <nav className="grid gap-1 sm:grid-cols-2" aria-label="Table of contents">
            {items.map((item, i) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="-mx-2 flex gap-3 rounded-[0.875rem] px-2 py-2.5 text-[0.9375rem] text-[#525252] transition-colors hover:bg-white hover:text-[#10101A]"
              >
                <span className="w-7 shrink-0 tabular-nums font-medium text-[#525252]">{i + 1}.</span>
                <span className="text-left underline-offset-2 hover:underline">{item.title}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}

export function LegalMain({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-[#FFFFFF] py-12 md:py-16">
      <div className="mx-auto max-w-[48rem] px-4 md:px-8 lg:px-6 xl:px-0">{children}</div>
    </section>
  );
}

export function LegalSectionTitle({ index, title }: { index: number; title: string }) {
  return (
    <div className="mb-5 flex items-baseline gap-4">
      <span className="w-8 shrink-0 tabular-nums text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-[#525252]">
        {String(index + 1).padStart(2, '0')}
      </span>
      <h2 className="text-[1.375rem] font-medium leading-tight text-[#10101A] md:text-[1.5rem]">{title}</h2>
    </div>
  );
}

export function LegalParagraph({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-[1rem] leading-[175%] text-[#525252] md:text-[1.0625rem] ${className}`}>{children}</p>;
}

export function LegalSubsection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 ml-8 border-l-2 border-[#eceae7] pl-5 sm:ml-11">
      <h3 className="mb-2 text-[1.0625rem] font-medium text-[#10101A]">{title}</h3>
      <div className="text-[0.9375rem] leading-[175%] text-[#525252] md:text-[1rem]">{children}</div>
    </div>
  );
}

export function LegalDivider() {
  return <div className="mb-4 mt-12 h-px w-full bg-[#eceae7]" />;
}

export function LegalLinkGrid({
  title,
  items,
}: {
  title: string;
  items: { href: string; title: string; desc: string; label: string }[];
}) {
  return (
    <section className="border-y border-[#eceae7] bg-[#FFFFFF] py-12 md:py-16">
      <div className="mx-auto max-w-[1274px] px-4 md:px-8 lg:px-6 xl:px-0">
        <h2 className="mb-8 text-[1.25rem] font-medium text-[#10101A] md:text-[1.5rem]">{title}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-[#eceae7] bg-[#f8f7f6] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4d2ce] hover:shadow-[0_12px_28px_rgba(16,16,26,0.06)] md:p-7"
            >
              <h3 className="mb-2 text-[1.0625rem] font-medium text-[#10101A]">{item.title}</h3>
              <p className="mb-4 text-[0.9375rem] leading-[160%] text-[#525252]">{item.desc}</p>
              <span className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-[#10101A] transition-all group-hover:gap-2.5">
                {item.label}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LegalAcknowledgment({ children, ctaHref, ctaLabel }: { children: React.ReactNode; ctaHref: string; ctaLabel: string }) {
  return (
    <section className="border-t border-[#eceae7] bg-[#FFFFFF] py-12 md:py-16">
      <div className="mx-auto max-w-[48rem] px-4 md:px-8 lg:px-6 xl:px-0">
        <div className="rounded-[2rem] border border-[#eceae7] bg-[#f8f7f6] p-8 text-center shadow-[0_24px_64px_rgba(16,16,26,0.06)] md:p-10">
          {children}
          <Link
            href={ctaHref}
            className="landing-primary-btn mt-8 inline-flex h-11 items-center justify-center px-8 transition hover:brightness-110"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}

export function LegalFooterBar({
  printLabel,
  emailLabel,
  emailHref,
  extra,
}: {
  printLabel: string;
  emailLabel: string;
  emailHref: string;
  extra?: React.ReactNode;
}) {
  return (
    <section className="border-t border-[#eceae7] bg-[#FFFFFF] py-8">
      <div className="mx-auto flex max-w-[1274px] flex-col gap-4 px-4 md:flex-row md:items-center md:justify-between md:px-8 lg:px-6 xl:px-0">
        <p className="text-[0.8125rem] text-[#525252]">© {new Date().getFullYear()} AiForLawyers, Inc. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-6">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 text-[0.8125rem] font-medium text-[#525252] transition-colors hover:text-[#10101A]"
          >
            <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            {printLabel}
          </button>
          {extra}
          <a href={emailHref} className="text-[0.8125rem] font-medium text-[#525252] transition-colors hover:text-[#10101A]">
            {emailLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
