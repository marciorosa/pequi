'use client';

import Link from 'next/link';
import { useState } from 'react';
import FadeInSection from './FadeInSection';
import SectionHeader, { container } from './SectionHeader';
import { formatPlanPrice, pricingPlans } from '../../pricing/pricingData';

export default function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  const getPrice = (plan: typeof pricingPlans[0]) => {
    if (plan.monthlyPrice === null) return 'Sob consulta';
    const price = billingPeriod === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
    return formatPlanPrice(price ?? 0);
  };

  const getSavings = (plan: typeof pricingPlans[0]) => {
    if (plan.monthlyPrice === null || plan.annualPrice === null || plan.monthlyPrice === 0) return null;
    const monthlyCost = plan.monthlyPrice * 12;
    return Math.round(((monthlyCost - plan.annualPrice) / monthlyCost) * 100);
  };

  return (
    <FadeInSection delay={0.15}>
      <section id="pricing" className="scroll-mt-20 bg-[#F4EFDF] py-20 lg:py-28">
        <div className={container}>
          <SectionHeader title="Um plano para o seu escritório" text="O escritório assina e oferece a assistente com a própria marca. Os clientes não pagam nada." />

          <div className="mb-10 mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <div className="inline-flex rounded-full bg-[#FFFDF6] p-1">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                  billingPeriod === 'monthly' ? 'bg-cerrado-900 text-white' : 'text-castanha-600'
                }`}
                type="button"
              >
                Mensal
              </button>
              <button
                onClick={() => setBillingPeriod('annual')}
                className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                  billingPeriod === 'annual' ? 'bg-cerrado-900 text-white' : 'text-castanha-600'
                }`}
                type="button"
              >
                Anual
              </button>
            </div>
            <p className="text-[0.85rem] text-ink/55">No plano anual, economize até 17%</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <article
                key={plan.name}
                className={`relative flex h-full flex-col rounded-3xl p-7 md:p-9 ${
                  plan.popular ? 'bg-[#151816] text-white' : 'bg-[#FFFDF6] text-ink'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-6 inline-flex h-7 items-center rounded-full bg-white px-3 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-ink">
                    Mais popular
                  </span>
                )}
                <div className="mb-7">
                  <p className={`text-[0.85rem] font-medium uppercase tracking-[0.08em] ${plan.popular ? 'text-white/80' : 'text-castanha-600'}`}>
                    {plan.name}
                  </p>
                  <p className={`mt-2 text-sm ${plan.popular ? 'text-white/80' : 'text-castanha-600'}`}>{plan.description}</p>
                  <div className="mt-6 flex items-end gap-2">
                    <span className="text-[2.5rem] leading-none font-medium tracking-[-0.03em]">{getPrice(plan)}</span>
                    {plan.monthlyPrice !== null && (
                      <span className={`mb-1 text-sm ${plan.popular ? 'text-white/70' : 'text-castanha-600'}`}>
                        /{billingPeriod === 'monthly' ? 'mês' : 'ano'}
                      </span>
                    )}
                  </div>
                  {billingPeriod === 'annual' && getSavings(plan) && (
                    <p
                      className={`mt-3 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-medium ${
                        plan.popular ? 'bg-white/15 text-white' : 'bg-[#F4EFDF] text-ink/70'
                      }`}
                    >
                      Economize {getSavings(plan)}% no plano anual
                    </p>
                  )}
                </div>

                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <span className={`mt-1 inline-flex shrink-0 ${plan.popular ? 'text-white/70' : 'text-ink/50'}`}>
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
                      <span className={`text-[0.95rem] leading-[1.45rem] ${plan.popular ? 'text-white/88' : 'text-castanha-700'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.name === 'Enterprise' ? '/contact' : '/dashboard/billing'}
                  className={`mt-auto inline-flex h-11 w-full items-center justify-center rounded-full text-[0.95rem] font-medium transition ${
                    plan.popular
                      ? 'bg-white text-ink hover:bg-[#F4EFDF]'
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
