'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { pricingPlans } from './pricingData';

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  const faqs = [
    {
      question: "What's included in the free plan?",
      answer: "The Free plan gives you access to 5 AI Intelligence searches, 5 Chat queries, and access to 5 basic AI Legal Personas so you can test the waters."
    },
    {
      question: "Can I change plans at any time?",
      answer: "Yes, you can upgrade to Pro at any time. Changes take effect immediately."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use enterprise-grade encryption and secure AWS S3 Vaults to ensure your documents remain private."
    },
    {
      question: "How do the credits work on the Pro Plan?",
      answer: "The Pro Plan gives you generous monthly limits (50 searches, 50 chats, 50 document ops, etc.). These limits reset automatically at the beginning of your next billing cycle."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards processed securely via Stripe."
    },
    {
      question: "Can I cancel my subscription at any time?",
      answer: "Yes, you can cancel your subscription from your dashboard at any time. You'll continue to have access until the end of your current billing period."
    }
  ];

  const getPrice = (plan: typeof pricingPlans[0]) => {
    if (plan.monthlyPrice === null) return "Custom";
    const price = billingPeriod === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
    return `$${price?.toLocaleString()}`;
  };

  const getSavings = (plan: typeof pricingPlans[0]) => {
    if (plan.monthlyPrice === null || plan.annualPrice === null || plan.monthlyPrice === 0) return null;
    const monthlyCost = plan.monthlyPrice * 12;
    const savings = monthlyCost - plan.annualPrice;
    const percentage = Math.round((savings / monthlyCost) * 100);
    return percentage;
  };

  return (
    <>
      {/* Hero Header */}
      <section className="relative -mt-20 pt-[13rem] pb-48 px-6 overflow-hidden landing-gilroy bg-background">
        {/* Real Background Image like News Page */}
        <Image
          src="/landingpage/hero/hero-bgimg.png"
          alt="Hero background"
          fill
          priority
          className="z-0 object-cover object-top"
          sizes="100vw"
        />

        {/* Architectural Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] z-1">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid-pricing" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pricing)" />
          </svg>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/5 mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
            <div className="w-1.5 h-1.5 rounded-full bg-black/20 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">Tier Selection Terminal</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-medium tracking-tight mb-8 leading-[0.9] animate-in fade-in slide-in-from-bottom-8 duration-700">
            Strategic <span className="font-light opacity-60 italic">Investment.</span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground/60 mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Standardizing legal intelligence. Choose the scale that fits your operational density.
          </p>

          {/* Billing Toggle */}
          <div className="flex justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            <div className="bg-white/50 backdrop-blur-xl border border-black/5 rounded-full p-1.5 flex shadow-sm">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-8 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${billingPeriod === 'monthly'
                  ? 'btn-primary-gradient shadow-lg'
                  : 'text-foreground/40 hover:text-foreground'
                  }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('annual')}
                className={`px-8 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center ${billingPeriod === 'annual'
                  ? 'btn-primary-gradient shadow-lg'
                  : 'text-foreground/40 hover:text-foreground'
                  }`}
              >
                Annual
                <span className={`ml-2 text-[9px] px-2 py-0.5 rounded-full ${billingPeriod === 'annual' ? 'bg-white/20 text-white' : 'bg-black/5 text-black'}`}>
                  SAVE 17%
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 px-6 relative -mt-32 landing-gilroy bg-background">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`group relative bg-white border ${plan.popular
                  ? 'border-foreground shadow-2xl scale-[1.03] lg:scale-105 z-10'
                  : 'border-[#e7e5e1] shadow-sm'
                  } p-12 hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] flex flex-col min-h-[700px]`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="btn-primary-gradient px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full shadow-xl">
                      Production Standard
                    </span>
                  </div>
                )}

                <div className="mb-12">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-3xl font-medium tracking-tight">{plan.name}</h3>
                    <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center">
                      <svg className="w-5 h-5 text-black/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                  </div>
                  <p className="text-foreground/50 text-base leading-relaxed h-12 mb-10">{plan.description}</p>

                  <div className="pt-8 border-t border-[#e7e5e1]">
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-5xl font-medium tracking-tight">{getPrice(plan)}</span>
                      {plan.monthlyPrice !== null && (
                        <span className="text-sm font-bold text-foreground/20 uppercase tracking-widest whitespace-nowrap">
                          {billingPeriod === 'monthly' ? '/ Monthly' : '/ Yearly'}
                        </span>
                      )}
                    </div>
                    {billingPeriod === 'annual' && getSavings(plan) && (
                      <div className="inline-block text-[9px] font-bold uppercase tracking-widest text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md">
                        Efficiency Gain: {getSavings(plan)}%
                      </div>
                    )}
                  </div>
                </div>

                <ul className="space-y-5 mb-12 flex-1 pt-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className="w-4 h-4 rounded-full bg-black/5 flex items-center justify-center mt-1 mr-4 flex-shrink-0 group-hover:bg-black/10 transition-colors">
                        <svg className="w-2.5 h-2.5 text-black/40 group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-foreground/70 text-[0.95rem] font-medium leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.name === 'Enterprise' ? '/contact' : '/dashboard/billing'}
                  className={`block w-full py-5 rounded-2xl text-[11px] font-bold uppercase tracking-[0.25em] transition-all duration-300 text-center ${plan.popular
                    ? 'btn-primary-gradient shadow-xl hover:scale-[1.02]'
                    : 'bg-white text-foreground border border-[#e7e5e1] hover:border-black shadow-sm'
                    }`}
                >
                  {plan.ctaText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Grid */}
      <section className="py-32 px-6 bg-[#FDFDFB] landing-gilroy">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/5 mb-8">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40 leading-none mt-0.5">Technical Specs</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">Compare <span className="font-light opacity-60 italic">Matrix.</span></h2>
              <p className="text-foreground/50 text-xl font-medium leading-relaxed">
                Detailed capacity mapping for forensic legal operations.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#e7e5e1] rounded-[3rem] overflow-hidden shadow-sm">
            <div className="overflow-x-auto overflow-y-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="py-8 px-10 text-left text-[10px] font-bold uppercase tracking-widest text-[#10101A]/30 w-1/4">System Capability</th>
                    <th className="py-8 px-10 text-center text-[10px] font-bold uppercase tracking-widest text-[#10101A]/30">Protocol.I (Free)</th>
                    <th className="py-8 px-10 text-center text-[10px] font-bold uppercase tracking-widest text-[#10101A]/30">Protocol.X (Pro)</th>
                    <th className="py-8 px-10 text-center text-[10px] font-bold uppercase tracking-widest text-[#10101A]/30 bg-black/5 text-black">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e7e5e1]">
                  {[
                    { feature: 'Intelligence Search', starter: '5 queries', pro: '50 queries', enterprise: 'Unlimited' },
                    { feature: 'AI Legal Chat', starter: '5 messages', pro: '50 messages', enterprise: 'Unlimited' },
                    { feature: 'AI Lawyers Access', starter: '5 Personas', pro: 'All 50 Personas', enterprise: 'Custom Core' },
                    { feature: 'Document Operations', starter: '✗', pro: '50 Ops', enterprise: 'Unlimited' },
                    { feature: 'Vault Folders', starter: '✗', pro: '50 Folders', enterprise: 'Unlimited' },
                    { feature: 'Vault Storage', starter: '✗', pro: '500 MB', enterprise: 'TB Scale' },
                    { feature: 'Workflow Builder', starter: '✗', pro: '5 Workflows', enterprise: 'Unlimited' },
                  ].map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="py-7 px-10 font-bold text-[13px] uppercase tracking-widest text-[#10101A]">{row.feature}</td>
                      <td className="py-7 px-10 text-center text-foreground/50 text-[14px] font-medium">{row.starter}</td>
                      <td className="py-7 px-10 text-center text-foreground/50 text-[14px] font-medium">{row.pro}</td>
                      <td className="py-7 px-10 text-center text-[#10101A] text-[14px] font-bold bg-black/[0.02]">{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6 landing-gilroy bg-background">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-8">Access <span className="font-light opacity-60 italic">Intelligence.</span></h2>
            <p className="text-foreground/50 text-xl font-medium leading-relaxed max-w-xl mx-auto">
              Deployment protocols and operational questions simplified.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="group bg-white border border-[#e7e5e1] p-8 rounded-[2rem] hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-black/10 transition-colors group-hover:bg-black" />
                  <h3 className="text-lg font-bold tracking-tight">{faq.question}</h3>
                </div>
                <p className="text-foreground/60 leading-relaxed pl-5.5 font-medium text-[0.95rem]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 px-6 relative overflow-hidden border-t border-[#e7e5e1] landing-gilroy bg-background">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-6xl md:text-8xl font-medium tracking-tight mb-10 leading-[0.9]">
            Scale Your <span className="font-light opacity-60 italic">Intelligence.</span>
          </h2>
          <p className="text-foreground/60 text-xl md:text-2xl mb-16 max-w-2xl mx-auto font-medium leading-relaxed">
            Standardize your legal protocols with AiForLawyers today. No credit card required to start.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/signup" className="landing-primary-btn w-full sm:w-auto px-12 py-5 shadow-2xl">
              Initiate Free Trial
            </Link>
            <Link href="/contact" className="landing-secondary-btn w-full sm:w-auto px-12 py-5 bg-white border border-[#e7e5e1]">
              Schedule Forensic Demo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
