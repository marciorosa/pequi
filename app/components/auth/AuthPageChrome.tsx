'use client';

import Image from 'next/image';

export function AuthHero({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <header
      id="hero"
      className="relative -mt-20 overflow-hidden border-b border-castanha-150 px-4 pb-10 pt-[11rem] sm:px-6 sm:pt-[12rem] lg:px-8 lg:pb-12 lg:pt-[11rem] scroll-mt-24 md:scroll-mt-28"
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
        <p className="mb-3 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-castanha-600">{eyebrow}</p>
        <h1 className="text-[2rem] font-medium leading-[1.15] text-ink md:text-[2.75rem] lg:text-[3rem]">{title}</h1>
        <p className="mx-auto mt-3 max-w-xl text-[1rem] text-castanha-600">{subtitle}</p>
      </div>
    </header>
  );
}

export const authInputClass =
  'w-full rounded-[0.875rem] border border-castanha-200 bg-castanha-100 px-4 py-3.5 text-ink placeholder:text-castanha-600 transition-all focus:border-castanha-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pequi-500/32';

export const authLabelClass = 'mb-2 block text-[0.8125rem] font-medium text-castanha-600';

export const authPrimaryButtonClass =
  'landing-primary-btn flex w-full items-center justify-center py-3.5 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:brightness-100';

export function AuthTrustBadges() {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-castanha-600 lg:justify-start">
      {['Alinhado ao SOC 2', 'Em conformidade com a GDPR/LGPD', 'Segurança reforçada'].map((label) => (
        <div key={label} className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cerrado-900" aria-hidden />
          {label}
        </div>
      ))}
    </div>
  );
}

export function AuthPageLayout({
  children,
  footer,
  aside,
}: {
  children: React.ReactNode;
  footer?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <div className="bg-white pb-10 md:pb-14">
      <div className="mx-auto max-w-[1274px] px-4 py-10 md:px-8 md:py-14 lg:px-6 xl:px-0">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-castanha-150 bg-white p-8 shadow-[0_12px_28px_rgba(31,42,23,0.04)] md:p-10">
              {children}
              {footer}
            </div>
            <AuthTrustBadges />
          </div>
          {aside ? <div className="hidden space-y-8 lg:col-span-7 lg:block">{aside}</div> : null}
        </div>
      </div>
    </div>
  );
}
