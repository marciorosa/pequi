'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { formatPlanPrice, pricingPlans } from './pricingData';
import { useTenant } from '../contexts/TenantContext';
import TenantAccess from '../components/office/TenantAccess';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import SectionHeader, { container } from '../components/landingpage/SectionHeader';
import { ClosingCta } from '../components/landingpage/ProductBlocks';

function PequiPricing({ embedded = false }: { embedded?: boolean }) {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  const faqs = [
    {
      question: "Quem paga a assinatura?",
      answer: "O escritório. Os clientes do escritório usam a assistente sem custo, dentro do plano do escritório."
    },
    {
      question: "O que o escritório recebe no plano Pro?",
      answer: "Painel com logo, cores e nome do escritório, chat de atendimento para colar no site, IA e e-mails com o nome do escritório, lista de clientes e contatos deixados no chat."
    },
    {
      question: "Quanto cada cliente pode usar?",
      answer: "No Pro, cada cliente do escritório tem 50 pesquisas, 50 mensagens e 50 operações com documentos por mês, renovadas a cada ciclo. No Enterprise, o uso é ilimitado."
    },
    {
      question: "Posso usar o endereço do meu escritório?",
      answer: "Sim. O painel pode ficar em um endereço do escritório (por exemplo, ia.seuescritorio.com.br) ou em um subdomínio do Pequi."
    },
    {
      question: "Quais formas de pagamento vocês aceitam?",
      answer: "Cartão de crédito, processado pela Stripe. No Enterprise, combinamos a forma de pagamento com o escritório."
    },
    {
      question: "Posso cancelar a assinatura a qualquer momento?",
      answer: "Sim. O acesso do escritório e dos clientes continua até o fim do período já pago."
    }
  ];

  const getPrice = (plan: typeof pricingPlans[0]) => {
    if (plan.monthlyPrice === null) return "Sob consulta";
    const price = billingPeriod === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
    return formatPlanPrice(price ?? 0);
  };

  const getSavings = (plan: typeof pricingPlans[0]) => {
    if (plan.monthlyPrice === null || plan.annualPrice === null || plan.monthlyPrice === 0) return null;
    const monthlyCost = plan.monthlyPrice * 12;
    const savings = monthlyCost - plan.annualPrice;
    const percentage = Math.round((savings / monthlyCost) * 100);
    return percentage;
  };

  const compare = [
    { feature: 'Marca do escritório e chat no site', starter: '—', pro: 'Incluído', enterprise: 'Incluído' },
    { feature: 'Pesquisa Inteligente', starter: '5 consultas', pro: '50 consultas', enterprise: 'Ilimitado' },
    { feature: 'Chat Jurídico com IA', starter: '5 mensagens', pro: '50 mensagens', enterprise: 'Ilimitado' },
    { feature: 'Assistentes de IA', starter: '5 áreas', pro: 'Todas as áreas', enterprise: 'Todas as áreas' },
    { feature: 'Operações com documentos', starter: '—', pro: '50 operações', enterprise: 'Ilimitado' },
    { feature: 'Pastas no Cofre', starter: '—', pro: '50 pastas', enterprise: 'Ilimitado' },
    { feature: 'Armazenamento no Cofre', starter: '—', pro: '500 MB', enterprise: 'Escala de TB' },
    { feature: 'Criador de Fluxos', starter: '—', pro: '5 fluxos', enterprise: 'Ilimitado' },
  ];

  // Topo no padrão da página de preços da Magnar (2026-11-24): foto de fundo
  // em tela cheia, título branco à esquerda e os planos por cima da foto.
  return (
    <>
      <section
        className={`relative overflow-hidden bg-[#151816] text-white ${embedded ? 'rounded-3xl px-5 pb-12 pt-12 sm:px-8' : '-mt-20 pb-20 pt-36 sm:pt-40 lg:pb-24'}`}
      >
        <Image src="/landingpage/hero/colunas.jpg" alt="" fill priority sizes="100vw" className="object-cover object-[50%_40%]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(21,24,22,0.55) 0%, rgba(21,24,22,0.2) 32%, rgba(21,24,22,0.3) 60%, rgba(21,24,22,0.8) 100%), linear-gradient(90deg, rgba(21,24,22,0.55) 0%, rgba(21,24,22,0) 55%)',
          }}
        />

        <div className={`relative z-10 ${embedded ? '' : container}`}>
          <div role="group" aria-label="Período de cobrança" className="inline-flex rounded-full bg-white/10 p-1 ring-1 ring-white/15 backdrop-blur-md">
            {(['monthly', 'annual'] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setBillingPeriod(p)}
                aria-pressed={billingPeriod === p}
                className={`rounded-full px-4 py-1.5 text-[0.82rem] font-medium transition-colors ${billingPeriod === p ? 'bg-white text-ink' : 'text-white/75 hover:text-white'}`}
              >
                {p === 'monthly' ? 'Mensal' : 'Anual · economize 17%'}
              </button>
            ))}
          </div>

          <h1 className="mt-7 max-w-[11ch] text-[clamp(2.8rem,6.4vw,5.4rem)] font-medium leading-[1.0] tracking-[-0.04em]">
            Sua marca, nossa IA.
          </h1>
          <p className="mt-6 max-w-[520px] text-[1.05rem] leading-relaxed text-white/75">
            O escritório assina e oferece aos clientes uma assistente jurídica com a própria marca. Os clientes não pagam nada.
          </p>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {pricingPlans.map((plan) => {
              const dark = plan.popular;
              const savings = billingPeriod === 'annual' ? getSavings(plan) : null;
              return (
                <article
                  key={plan.name}
                  className={`flex flex-col rounded-3xl p-7 sm:p-8 ${dark ? 'bg-[#151816] text-white ring-1 ring-white/15' : 'bg-[#FFFDF6] text-ink'}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-[1.6rem] font-medium tracking-[-0.02em]">{plan.name}</h2>
                    {plan.popular && (
                      <span className="rounded-full bg-white/10 px-3 py-1 text-[0.72rem] font-medium text-white/80">Mais popular</span>
                    )}
                  </div>
                  <p className={`mt-2 min-h-[3rem] text-[0.92rem] leading-snug ${dark ? 'text-white/60' : 'text-ink/60'}`}>{plan.description}</p>

                  <div className="mt-8 flex items-baseline gap-2">
                    <span className="text-[2.6rem] font-medium leading-none tracking-[-0.03em]">{getPrice(plan)}</span>
                    {plan.monthlyPrice !== null && (
                      <span className={`text-[0.85rem] ${dark ? 'text-white/50' : 'text-ink/45'}`}>{billingPeriod === 'monthly' ? '/ mês' : '/ ano'}</span>
                    )}
                  </div>
                  <p className={`mt-2 h-5 text-[0.8rem] ${dark ? 'text-white/50' : 'text-ink/45'}`}>
                    {savings ? `Economia de ${savings}% no plano anual` : plan.monthlyPrice === null ? 'Proposta conforme o tamanho do escritório' : ''}
                  </p>

                  <ul className={`mt-6 flex-1 space-y-3 border-t pt-6 ${dark ? 'border-white/15' : 'border-ink/12'}`}>
                    {plan.features.map((feature) => (
                      <li key={feature} className={`flex gap-3 text-[0.92rem] leading-snug ${dark ? 'text-white/80' : 'text-ink/75'}`}>
                        <svg className={`mt-0.5 h-4 w-4 flex-shrink-0 ${dark ? 'text-white/60' : 'text-ink/45'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={plan.name === 'Enterprise' ? '/contact' : '/dashboard/billing'}
                    className={`mt-8 inline-flex h-11 items-center justify-center rounded-full px-6 text-[0.92rem] font-medium transition-colors ${dark ? 'bg-white text-ink hover:bg-white/85' : 'bg-ink text-white hover:bg-ink/85'}`}
                  >
                    {plan.ctaText}
                  </Link>
                </article>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#comparar" className="inline-flex h-10 items-center rounded-full bg-white/10 px-5 text-[0.88rem] font-medium text-white ring-1 ring-white/15 backdrop-blur-md hover:bg-white/15">
              Comparar os planos
            </a>
            <Link href="/contact" className="inline-flex h-10 items-center rounded-full px-3 text-[0.88rem] font-medium text-white/75 hover:text-white">
              Tirar dúvidas com a equipe →
            </Link>
          </div>
        </div>
      </section>

      {/* Comparação: tabela aberta, só com linhas */}
      <section id="comparar" className={`scroll-mt-24 ${embedded ? 'py-16' : 'py-20 lg:py-28'}`}>
        <div className={embedded ? '' : container}>
          <SectionHeader line={false} title="Compare os planos" text="Limites de uso de cada cliente do escritório, por mês." />
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-ink/12 text-[0.8rem] text-ink/50">
                  <th className="w-[34%] py-5 pr-4 font-medium">Recurso</th>
                  <th className="py-5 pr-4 font-medium">Gratuito</th>
                  <th className="py-5 pr-4 font-medium text-ink">Pro</th>
                  <th className="py-5 font-medium">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {compare.map((row) => (
                  <tr key={row.feature} className="border-b border-ink/12">
                    <td className="py-5 pr-4 font-medium text-ink">{row.feature}</td>
                    <td className="py-5 pr-4 text-ink/55">{row.starter}</td>
                    <td className="py-5 pr-4 text-ink">{row.pro}</td>
                    <td className="py-5 text-ink/75">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Perguntas frequentes */}
      <section className={`bg-[#F4EFDF] ${embedded ? 'rounded-3xl px-5 py-14 sm:px-8' : 'py-20 lg:py-28'}`}>
        <div className={`${embedded ? '' : container} grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16`}>
          <div>
            <h2 className="text-[clamp(2.1rem,4.4vw,3.6rem)] font-medium leading-[1.04] tracking-[-0.035em] text-ink">Perguntas frequentes</h2>
            <p className="mt-5 max-w-[380px] text-[1.02rem] leading-relaxed text-ink/65">Respostas simples sobre o white-label, os planos e os pagamentos.</p>
          </div>
          <div className="border-t border-ink/15">
            {faqs.map((faq) => (
              <div key={faq.question} className="border-b border-ink/15 py-6">
                <h3 className="text-[1.1rem] font-medium tracking-tight text-ink">{faq.question}</h3>
                <p className="mt-2 max-w-[640px] text-[0.98rem] leading-relaxed text-ink/65">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {!embedded && (
        <ClosingCta
          title="Leve a IA para o seu escritório"
          text="Comece pelo plano Gratuito ou fale com a gente para configurar a marca do escritório."
          action={{ label: 'Começar grátis', href: '/signup' }}
        />
      )}
    </>
  );
}


/**
 * /pricing
 * - Painel de um escritório (white-label), para os clientes dele: aviso de que o acesso é oferecido
 *   pelo escritório (o cliente não assina nada).
 * - Equipe do escritório e usuários do Pequi: planos do Pequi (Pro R$ 399/mês ou R$ 3.999/ano, Enterprise).
 * Logado, a página abre dentro do painel (menu inferior, perfil e sair).
 */
export default function PricingPage() {
  const { tenant, loading } = useTenant();
  const { isAuthenticated, isLoading, user } = useAuth();
  if (loading || isLoading) return null;
  const isOfficeTeam = ['owner', 'staff'].includes(String(user?.tenantRole || ''));
  const content = tenant && !isOfficeTeam ? <TenantAccess /> : <PequiPricing embedded={isAuthenticated} />;
  return isAuthenticated ? <DashboardLayout title="Planos">{content}</DashboardLayout> : content;
}
