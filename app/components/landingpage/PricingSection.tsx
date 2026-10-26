'use client';

import Link from 'next/link';
import { useState } from 'react';
import FadeInSection from './FadeInSection';
import { sectionHeadingClass, sectionSubTextClass } from './sectionStyles';
import { pricingPlans } from '../../pricing/pricingData';

export default function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  const getPrice = (plan: typeof pricingPlans[0]) => {
    if (plan.monthlyPrice === null) return 'Sob consulta';
    const price = billingPeriod === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
    return `$${price?.toLocaleString()}`;
  };

  const getSavings = (plan: typeof pricingPlans[0]) => {
    if (plan.monthlyPrice === null || plan.annualPrice === null || plan.monthlyPrice === 0) return null;
    const monthlyCost = plan.monthlyPrice * 12;
    return Math.round(((monthlyCost - plan.annualPrice) / monthlyCost) * 100);
  };

  return (
    <FadeInSection delay={0.15}>
      <section id="pricing" className="bg-[#F9F2FA] scroll-mt-24 md:scroll-mt-28">
        <div className="max-w-[1274px] mx-auto px-4 py-[60px] md:px-8 lg:px-6 xl:px-0">
          <div className="mx-auto max-w-[840px] text-center">
            <h3 className={sectionHeadingClass}>Preços simples para equipes jurídicas</h3>
            <p className={`${sectionSubTextClass} mt-4`}>
              Escolha o plano ideal para o seu fluxo de trabalho e cresça com segurança junto com sua equipe.
            </p>
          </div>

          <div className="mx-auto mt-10 mb-10 flex w-fit flex-col items-center gap-3 rounded-2xl border border-[#e7e7ea] bg-white px-4 py-3 shadow-[0_8px_24px_rgba(16,16,26,0.06)] sm:flex-row sm:rounded-full sm:px-3 sm:py-2">
            <div className="inline-flex rounded-full border border-[#e5e5ea] bg-[#f6f6f8] p-1">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                  billingPeriod === 'monthly' ? 'bg-[#10101A] text-white' : 'text-[#5f5f6b]'
                }`}
                type="button"
              >
                Mensal
              </button>
              <button
                onClick={() => setBillingPeriod('annual')}
                className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                  billingPeriod === 'annual' ? 'bg-[#10101A] text-white' : 'text-[#5f5f6b]'
                }`}
                type="button"
              >
                Anual
              </button>
            </div>
            <p className="text-[0.8rem] font-medium uppercase tracking-[0.08em] text-[#6a6272]">
              No plano anual, economize até 17%
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <article
                key={plan.name}
                className={`relative flex h-full flex-col rounded-[1.5rem] border p-6 md:p-8 transition ${
                  plan.popular
                    ? 'border-[#10101A] bg-[#10101A] text-white shadow-[0_24px_50px_rgba(16,16,26,0.22)]'
                    : 'border-[#e7e7ea] bg-[#fcfcfd] text-[#10101A] shadow-[0_10px_28px_rgba(16,16,26,0.07)]'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-6 inline-flex h-7 items-center rounded-full bg-white px-3 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-[#10101A]">
                    Mais popular
                  </span>
                )}
                <div className="mb-7">
                  <p className={`text-[0.85rem] font-medium uppercase tracking-[0.08em] ${plan.popular ? 'text-white/80' : 'text-[#696977]'}`}>
                    {plan.name}
                  </p>
                  <p className={`mt-2 text-sm ${plan.popular ? 'text-white/80' : 'text-[#696977]'}`}>{plan.description}</p>
                  <div className="mt-6 flex items-end gap-2">
                    <span className="text-[2.5rem] leading-none font-semibold">{getPrice(plan)}</span>
                    {plan.monthlyPrice !== null && (
                      <span className={`mb-1 text-sm ${plan.popular ? 'text-white/70' : 'text-[#696977]'}`}>
                        /{billingPeriod === 'monthly' ? 'mês' : 'ano'}
                      </span>
                    )}
                  </div>
                  {billingPeriod === 'annual' && getSavings(plan) && (
                    <p
                      className={`mt-3 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-medium ${
                        plan.popular ? 'bg-white/15 text-white' : 'bg-[#efe8f6] text-[#5d4b73]'
                      }`}
                    >
                      Economize {getSavings(plan)}% no plano anual
                    </p>
                  )}
                </div>

                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <span
                        className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          plan.popular ? 'bg-white/15 text-white' : 'bg-[#edeaf3] text-[#10101A]'
                        }`}
                      >
                        <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none" aria-hidden>
                          <path
                            d="M3.2 8.2L6.4 11.2L12.8 4.8"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span className={`text-[0.95rem] leading-[1.45rem] ${plan.popular ? 'text-white/88' : 'text-[#4d4d58]'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.name === 'Enterprise' ? '/contact' : '/dashboard/billing'}
                  className={`mt-auto inline-flex h-11 w-full items-center justify-center rounded-full text-[0.95rem] font-medium transition ${
                    plan.popular
                      ? 'landing-secondary-btn border-0 !inline-flex !h-11 !w-full'
                      : 'landing-primary-btn'
                  }`}
                >
                  {plan.ctaText}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}
