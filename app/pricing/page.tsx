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
  const [selected, setSelected] = useState<'Pro' | 'Enterprise'>('Pro');
  const paidPlans = pricingPlans.filter((p) => p.name !== 'Gratuito');
  const current = paidPlans.find((p) => p.name === selected) ?? paidPlans[0];
  const heroNote: Record<string, string> = {
    Pro: 'A assistente com a marca do escritório.',
    Enterprise: 'Para escritórios maiores e redes.',
  };
  const heroCheck: Record<string, string> = {
    Pro: 'Clientes usam sem custo',
    Enterprise: 'Uso ilimitado para equipe e clientes',
  };

  // FAQ no estilo da referência: poucas perguntas, curtas, só sobre preço e plano
  const faqs = [
    {
      question: 'Quem paga a assinatura?',
      answer: 'O escritório. Os clientes usam a assistente sem custo, dentro do plano do escritório.',
    },
    {
      question: 'Como o preço é calculado?',
      answer: 'É um valor fixo por escritório: R$ 399 por mês ou R$ 3.999 por ano no Pro. Não há cobrança por cliente.',
    },
    {
      question: 'Os limites de uso são por cliente?',
      answer: 'Sim. No Pro, cada cliente tem 50 pesquisas, 50 mensagens e 50 operações com documentos por mês, renovadas a cada ciclo. No Enterprise, o uso é ilimitado.',
    },
    {
      question: 'Posso mudar ou cancelar o plano?',
      answer: 'Sim, quando quiser. O acesso do escritório e dos clientes continua até o fim do período já pago.',
    },
    {
      question: 'Quais formas de pagamento vocês aceitam?',
      answer: 'Cartão de crédito, processado pela Stripe. No Enterprise, combinamos a forma de pagamento com o escritório.',
    },
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
        className={`relative overflow-hidden bg-[#151816] text-white ${embedded ? 'pb-20 pt-14 lg:pb-24' : '-mt-20 pb-20 pt-36 sm:pt-40 lg:pb-24'}`}
      >
        <Image src="/landingpage/hero/planos.jpg" alt="" fill priority sizes="100vw" className="object-cover object-[50%_35%]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(21,24,22,0.55) 0%, rgba(21,24,22,0.2) 32%, rgba(21,24,22,0.3) 60%, rgba(21,24,22,0.8) 100%), linear-gradient(90deg, rgba(21,24,22,0.55) 0%, rgba(21,24,22,0) 55%)',
          }}
        />

        <div className={`relative z-10 ${container}`}>
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

          {/* Só os dois planos pagos sobre a foto, com o valor; o detalhe fica na seção abaixo */}
          <div className="mt-12 grid max-w-[880px] gap-4 sm:grid-cols-2">
            {paidPlans.map((plan) => {
              const dark = plan.name === 'Enterprise';
              return (
                <article
                  key={plan.name}
                  className={`flex flex-col rounded-3xl p-7 sm:p-8 ${dark ? 'bg-[#151816]/90 text-white ring-1 ring-white/15 backdrop-blur-md' : 'bg-[#FFFDF6] text-ink'}`}
                >
                  <h2 className="text-[1.6rem] font-medium tracking-[-0.02em]">{plan.name}</h2>
                  <p className={`mt-1 text-[0.9rem] ${dark ? 'text-white/60' : 'text-ink/55'}`}>{heroNote[plan.name]}</p>
                  <div className="mt-10 flex items-baseline gap-2">
                    <span className="text-[2.6rem] font-medium leading-none tracking-[-0.03em]">{getPrice(plan)}</span>
                  </div>
                  <p className={`mt-2 text-[0.72rem] font-medium uppercase tracking-[0.12em] ${dark ? 'text-white/50' : 'text-ink/45'}`}>
                    {plan.monthlyPrice === null ? 'Conforme o tamanho do escritório' : billingPeriod === 'monthly' ? 'Por escritório · mês' : 'Por escritório · ano'}
                  </p>
                  <p className={`mt-6 flex items-center gap-2 border-t pt-5 text-[0.88rem] ${dark ? 'border-white/15 text-white/80' : 'border-ink/12 text-ink/70'}`}>
                    <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {heroCheck[plan.name]}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#montar" className="inline-flex h-10 items-center rounded-full bg-[#FFFDF6] px-5 text-[0.88rem] font-medium text-ink hover:bg-white">
              Montar o plano →
            </a>
            <Link href="/signup" className="inline-flex h-10 items-center rounded-full bg-white/10 px-5 text-[0.88rem] font-medium text-white ring-1 ring-white/15 backdrop-blur-md hover:bg-white/15">
              Começar grátis
            </Link>
          </div>
        </div>
      </section>

      {/* Detalhe no padrão do "monte o plano" da Magnar: escolhas à esquerda, resumo escuro à direita */}
      <section id="montar" className={`scroll-mt-24 bg-[#F4EFDF] py-20 lg:py-28`}>
        <div className={container}>
          <h2 className="text-[clamp(2.1rem,4.4vw,3.6rem)] font-medium leading-[1.04] tracking-[-0.035em] text-ink">Monte o plano do escritório.</h2>
          <p className="mt-4 max-w-[520px] text-[1.02rem] leading-relaxed text-ink/65">Escolha o plano e a forma de cobrança e veja o que está incluído.</p>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.25fr_1fr] lg:items-start">
            <div className="space-y-3">
              {paidPlans.map((plan) => {
                const active = selected === plan.name;
                return (
                  <button
                    key={plan.name}
                    type="button"
                    onClick={() => setSelected(plan.name as 'Pro' | 'Enterprise')}
                    aria-pressed={active}
                    className={`flex w-full items-center justify-between gap-6 rounded-2xl bg-[#FFFDF6] px-6 py-5 text-left transition-shadow ${active ? 'ring-2 ring-ink' : 'ring-1 ring-ink/10 hover:ring-ink/30'}`}
                  >
                    <span>
                      <span className="block text-[1.15rem] font-medium tracking-[-0.01em] text-ink">{plan.name}</span>
                      <span className="mt-1 block text-[0.85rem] text-ink/55">{getPrice(plan)}{plan.monthlyPrice !== null ? (billingPeriod === 'monthly' ? ' / mês' : ' / ano') : ''} · {heroCheck[plan.name]}</span>
                    </span>
                    <span className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ring-1 ${active ? 'bg-ink ring-ink' : 'ring-ink/30'}`} aria-hidden="true">
                      {active && <span className="h-2 w-2 rounded-full bg-white" />}
                    </span>
                  </button>
                );
              })}

              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-[#FFFDF6] px-6 py-5 ring-1 ring-ink/10">
                <span>
                  <span className="block text-[1.15rem] font-medium tracking-[-0.01em] text-ink">Cobrança</span>
                  <span className="mt-1 block text-[0.85rem] text-ink/55">No anual, o escritório economiza 17%.</span>
                </span>
                <div role="group" aria-label="Período de cobrança" className="inline-flex rounded-full bg-[#F4EFDF] p-1">
                  {(['monthly', 'annual'] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setBillingPeriod(p)}
                      aria-pressed={billingPeriod === p}
                      className={`rounded-full px-4 py-1.5 text-[0.82rem] font-medium transition-colors ${billingPeriod === p ? 'bg-ink text-white' : 'text-ink/60 hover:text-ink'}`}
                    >
                      {p === 'monthly' ? 'Mensal' : 'Anual'}
                    </button>
                  ))}
                </div>
              </div>

              <p className="px-1 pt-2 text-[0.85rem] text-ink/55">
                Quer só conhecer? O plano Gratuito tem 5 pesquisas e 5 mensagens, sem marca própria.{' '}
                <Link href="/signup" className="font-medium text-ink underline underline-offset-4">Começar grátis</Link>
              </p>
            </div>

            <aside className="rounded-3xl bg-[#151816] p-7 text-white sm:p-8">
              <p className="text-[0.85rem] text-white/55">Plano {current.name}</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-[2.8rem] font-medium leading-none tracking-[-0.03em]">{getPrice(current)}</span>
                {current.monthlyPrice !== null && <span className="text-[0.9rem] text-white/55">{billingPeriod === 'monthly' ? '/ mês' : '/ ano'}</span>}
              </div>
              <p className="mt-2 h-5 text-[0.8rem] text-white/50">
                {current.monthlyPrice === null
                  ? 'Proposta conforme o tamanho do escritório'
                  : billingPeriod === 'annual' && getSavings(current)
                    ? `Economia de ${getSavings(current)}% em relação ao mensal`
                    : 'Cancele quando quiser'}
              </p>

              <p className="mt-7 border-t border-white/15 pt-6 text-[0.72rem] font-medium uppercase tracking-[0.12em] text-white/45">O que está incluído</p>
              <ul className="mt-4 space-y-3">
                {current.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-[0.92rem] leading-snug text-white/80">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-white/55" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={current.name === 'Enterprise' ? '/contact' : '/dashboard/billing'}
                className="mt-8 flex h-11 items-center justify-center rounded-full bg-[#FFFDF6] px-6 text-[0.92rem] font-medium text-ink hover:bg-white"
              >
                {current.ctaText} →
              </Link>
            </aside>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-[#FFFDF6] px-6 py-6 ring-1 ring-ink/10">
            <span>
              <span className="block text-[1.15rem] font-medium tracking-[-0.01em] text-ink">Precisa de algo sob medida?</span>
              <span className="mt-1 block text-[0.85rem] text-ink/55">Para redes de escritórios ou necessidades específicas, montamos um plano com a sua equipe.</span>
            </span>
            <Link href="/contact" className="inline-flex h-10 items-center rounded-full bg-ink px-5 text-[0.88rem] font-medium text-white hover:bg-ink/85">
              Falar com a equipe →
            </Link>
          </div>
        </div>
      </section>

      {/* Comparação: tabela aberta, só com linhas */}
      <section id="comparar" className={`scroll-mt-24 py-20 lg:py-28`}>
        <div className={container}>
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

      {/* Perguntas frequentes: título curto e perguntas que abrem ao clicar, como na referência */}
      <section className="border-t border-ink/12 py-20 lg:py-28">
        <div className={`${container} grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16`}>
          <h2 className="text-[clamp(2.1rem,4.4vw,3.6rem)] font-medium leading-[1.04] tracking-[-0.035em] text-ink">Preços claros desde o início.</h2>
          <div className="border-t border-ink/20">
            {faqs.map((faq) => (
              <details key={faq.question} className="group border-b border-ink/20 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[1.12rem] font-medium text-ink">
                  {faq.question}
                  <span className="relative h-4 w-4 shrink-0 text-ink/60" aria-hidden="true">
                    <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
                    <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current transition-transform group-open:rotate-90 group-open:opacity-0" />
                  </span>
                </summary>
                <p className="max-w-[620px] pb-5 text-[0.98rem] leading-relaxed text-ink/65">{faq.answer}</p>
              </details>
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
  return isAuthenticated ? <DashboardLayout title="Planos" fullBleed={!(tenant && !isOfficeTeam)}>{content}</DashboardLayout> : content;
}
