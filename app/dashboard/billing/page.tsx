'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DashboardLayout from '../../components/DashboardLayout';
import { stripeService } from '../../services/api';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-hot-toast';
import { formatPlanPrice } from '../../pricing/pricingData';
import { useTenant } from '../../contexts/TenantContext';
import { useAuth } from '../../contexts/AuthContext';

// Initialize Stripe
const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

// Plan interface
interface Plan {
  id: string;
  name: string;
  price: number;
  billingPeriod: 'monthly' | 'yearly';
  description: string;
  features: string[];
  isPopular?: boolean;
  priceId: string; // Stripe Price ID
}

// Subscription interface
interface Subscription {
  plan: string;
  status: 'active' | 'canceled' | 'pastDue';
  startDate: Date;
  nextBillingDate: Date;
  paymentMethod: {
    type: 'card';
    last4: string;
    expiryMonth: number;
    expiryYear: number;
    brand: string;
  };
}

// Invoice interface
interface Invoice {
  id: string;
  date: Date;
  amount: number;
  currency?: string;
  status: 'paid' | 'pending' | 'failed';
  downloadUrl: string;
}

// ProfileData interface for type casting apiUsage
interface ProfileData {
  apiUsage?: {
    searchCount: number;
    chatCount: number;
    docsCount: number;
    vaultFolderCount: number;
    workflowCount: number;
  };
  subscription?: {
    isAdmin?: boolean;
    limits?: {
      searchCount: number | null;
      chatCount: number | null;
      docsCount: number | null;
      vaultFolderCount: number | null;
      workflowCount: number | null;
    };
  };
}

// Component that uses useSearchParams
function BillingContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [, setSubscription] = useState<unknown>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { tenant } = useTenant();
  const { user } = useAuth();

  // Cliente de um escritório (white-label) assina os planos do escritório, não os do Pequi
  useEffect(() => {
    if (tenant && user && !['owner', 'staff'].includes(String(user.tenantRole || ''))) router.replace('/pricing');
  }, [tenant, user, router]);

  // Current profile data
  const [profileData, setProfileData] = useState<unknown>(null);

  // Current subscription
  const [currentSubscription, setCurrentSubscription] = useState<Subscription | null>(null);

  // Plans
  const plans: Plan[] = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      billingPeriod: 'monthly',
      description: 'Ideal para conhecer nossos recursos de IA',
      features: [
        'Pesquisa Inteligente (5 pesquisas)',
        'Chat Jurídico com IA (5 mensagens)',
        'Assistentes de IA (5 áreas liberadas)',
        'Sem acesso ao Cofre/Documentos',
        'Sem Criador de Fluxos'
      ],
      priceId: 'free'
    },
    {
      id: 'pro-monthly',
      name: 'Pro Monthly',
      price: 399,
      billingPeriod: 'monthly',
      description: 'Ideal para quem lida com questões jurídicas com frequência',
      features: [
        'Pesquisa Inteligente (50 pesquisas)',
        'Chat Jurídico com IA (50 mensagens)',
        'Todos os assistentes de IA, em todas as áreas',
        'Operações com documentos (50 operações)',
        'Cofre seguro (50 pastas, 500 MB)',
        'Criador de Fluxos avançado (5 fluxos)'
      ],
      isPopular: true,
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY as string
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 0, // Handled as custom string in UI
      billingPeriod: 'monthly',
      description: 'Para pequenos negócios que precisam de recursos ilimitados',
      features: [
        'Pesquisa Inteligente ilimitada',
        'Chat Jurídico com IA ilimitado',
        'Acesso ilimitado aos assistentes de IA',
        'Operações com documentos ilimitadas',
        'Armazenamento e pastas ilimitados no Cofre',
        'Criador de Fluxos ilimitado',
        'Gerente de conta dedicado'
      ],
      priceId: 'enterprise'
    }
  ];

  useEffect(() => {
    // Check for success/error query params from Stripe redirect
    const success = searchParams.get('success');
    const canceled = searchParams.get('canceled');

    if (success) {
      toast.success('Assinatura atualizada com sucesso!');
    } else if (canceled) {
      toast.error('Atualização da assinatura cancelada.');
    }

    fetchProfileAndSubscription();
    fetchInvoices();
  }, [searchParams]);

  const fetchProfileAndSubscription = async () => {
    try {
      setIsLoading(true);
      // Fetch both profile (for usage) and subscription (for Stripe specific data)
      const token = localStorage.getItem('token');
      const profileResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => res.json());

      setProfileData(profileResponse);

      const response = await stripeService.getSubscription();

      // Check if subscription exists and is active
      if (response.subscription &&
        response.subscription.plan !== 'Free' &&
        response.subscription.status === 'active') {

        // Map to our frontend subscription structure
        const mappedSubscription: Subscription = {
          plan: response.subscription.plan,
          status: response.subscription.status,
          startDate: new Date(response.subscription.startDate),
          nextBillingDate: new Date(response.subscription.nextBillingDate),
          paymentMethod: response.subscription.paymentMethod || {
            type: 'card',
            last4: '****',
            expiryMonth: 0,
            expiryYear: 0,
            brand: 'unknown'
          }
        };

        setCurrentSubscription(mappedSubscription);
      } else {
        // No active paid subscription
        setCurrentSubscription(null);
      }

      // Store full subscription data for reference
      setSubscription(response.subscription);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Falha ao carregar os dados de cobrança.');
      setCurrentSubscription(null);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchInvoices = async () => {
    try {
      const response = await stripeService.getInvoices();
      setInvoices(response.invoices);
    } catch (error) {
      console.error('Error fetching invoices:', error);
      toast.error('Falha ao carregar o histórico de cobrança. Tente novamente mais tarde.');
    }
  };

  const handleSubscribe = async (plan: Plan) => {
    try {
      if (plan.id === 'free') {
        toast.success("Você já está no plano gratuito.");
        return;
      }
      if (plan.id === 'enterprise') {
        router.push('/contact');
        return;
      }

      if (!stripePromise) {
        toast.error('O Stripe não está configurado corretamente');
        return;
      }

      setSelectedPlan(plan);

      // Show loading state
      toast.loading('Preparando o checkout...');

      const { sessionId } = await stripeService.createCheckoutSession(plan.priceId);

      // Clear loading toast
      toast.dismiss();

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) {
        toast.error('Falha ao inicializar o Stripe');
        setSelectedPlan(null);
        return;
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        console.error('Stripe redirect error:', error);
        toast.error(error.message || 'Falha ao redirecionar para o checkout');
        setSelectedPlan(null);
      }
    } catch (error: unknown) {
      const err = error instanceof Error ? error : new Error(String(error));
      console.error('Error subscribing:', err);
      toast.dismiss();
      const errMsg = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
      toast.error(errMsg || err.message || 'Falha ao processar a assinatura. Tente novamente.');
      setSelectedPlan(null);
    }
  };

  const handleManageSubscription = async () => {
    try {
      toast.loading('Carregando portal...');
      const { url } = await stripeService.createPortalSession();
      toast.dismiss();
      window.location.href = url;
    } catch (error: unknown) {
      const err = error instanceof Error ? error : new Error(String(error));
      console.error('Error opening customer portal:', err);
      const errMsg = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
      toast.error(errMsg || 'Falha ao abrir o gerenciamento da assinatura');
    }
  };

  // Get current plan
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _getCurrentPlan = (): Plan | undefined => {
    return plans.find(plan => plan.id === currentSubscription?.plan);
  };

  // Format currency
  const formatCurrency = (amount: number, currency = 'brl'): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Format date
  const formatDate = (date: Date | string | null): string => {
    if (!date) return 'N/A';
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(dateObj);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Data inválida';
    }
  };

  // Get payment method icon
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _getPaymentIcon = (brand: string) => {
    switch (brand.toLowerCase()) {
      case 'visa':
        return (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 8.5C2 7.67157 2.67157 7 3.5 7H20.5C21.3284 7 22 7.67157 22 8.5V15.5C22 16.3284 21.3284 17 20.5 17H3.5C2.67157 17 2 16.3284 2 15.5V8.5Z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M7 13L9 11V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.5 11H14.5C15.0523 11 15.5 11.4477 15.5 12V14C15.5 14.5523 15.0523 15 14.5 15H13.5C12.9477 15 12.5 14.5523 12.5 14V12C12.5 11.4477 12.9477 11 13.5 11Z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M18 15V11L20 15V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'mastercard':
        return (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 8.5C2 7.67157 2.67157 7 3.5 7H20.5C21.3284 7 22 7.67157 22 8.5V15.5C22 16.3284 21.3284 17 20.5 17H3.5C2.67157 17 2 16.3284 2 15.5V8.5Z" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="14" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="10" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        );
      case 'amex':
        return (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 8.5C2 7.67157 2.67157 7 3.5 7H20.5C21.3284 7 22 7.67157 22 8.5V15.5C22 16.3284 21.3284 17 20.5 17H3.5C2.67157 17 2 16.3284 2 15.5V8.5Z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M7 13.5L7 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5.5 12H8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17 10.5L17 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15.5 12H18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12.5 10.5L10.5 12L12.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 8.5C2 7.67157 2.67157 7 3.5 7H20.5C21.3284 7 22 7.67157 22 8.5V15.5C22 16.3284 21.3284 17 20.5 17H3.5C2.67157 17 2 16.3284 2 15.5V8.5Z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M5 13.5H7M19 13.5H17M5 10.5H8M19 10.5H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );
    }
  };

  // Function to handle plan change
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _handlePlanChange = (planId: string) => {
    setCurrentSubscription(prev => {
      if (!prev) return null;
      return {
        ...prev,
        plan: planId,
        nextBillingDate: new Date(prev.nextBillingDate.getTime() + 30 * 24 * 60 * 60 * 1000)
      };
    });
  };

  // Function to handle cancellation
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _handleCancelSubscription = () => {
    if (window.confirm('Tem certeza de que deseja cancelar sua assinatura? Você perderá o acesso aos recursos premium ao fim do período de cobrança.')) {
      setCurrentSubscription(prev => {
        if (!prev) return null;
        return {
          ...prev,
          status: 'canceled'
        };
      });
    }
  };

  // Get invoice status badge
  const getInvoiceStatusBadge = (status: Invoice['status']) => {
    switch (status) {
      case 'paid':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-cerrado-100 text-cerrado-700">Paga</span>;
      case 'pending':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-pequi-100 text-pequi-800">Pendente</span>;
      case 'failed':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">Falhou</span>;
      default:
        return null;
    }
  };

  // Medidor de uso em linha (padrão editorial 2026-11-24): rótulo, número e barra fina.
  // limit null = sem limite (conta de administrador ou Enterprise)
  const renderMeter = (title: string, current: number, rawLimit: number | null) => {
    const limit = rawLimit === null || rawLimit === undefined ? Infinity : rawLimit;
    const percent = limit === Infinity ? 0 : limit === 0 ? 100 : Math.min(100, (current / limit) * 100);
    return (
      <div className="border-t border-ink/15 pt-4">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ink/45">{title}</p>
        <p className="mt-2 text-[1.9rem] font-medium leading-none tracking-[-0.03em] text-ink">
          {current}
          <span className="ml-1.5 text-[0.85rem] font-normal tracking-normal text-ink/45">
            {limit === Infinity ? 'sem limite' : limit === 0 ? 'não incluso' : `de ${limit}`}
          </span>
        </p>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-ink/8">
          <div className={`h-full rounded-full ${percent > 90 ? 'bg-[#C2462B]' : 'bg-[#151816]'}`} style={{ width: `${limit === 0 ? 0 : percent}%` }} />
        </div>
      </div>
    );
  };

  const planLabel = (name: string) => ({ Free: 'Gratuito', 'Pro Monthly': 'Pro Mensal' } as Record<string, string>)[name] ?? name;
  const statusLabel = (st: string) =>
    ({ active: 'ativa', canceled: 'cancelada', cancelled: 'cancelada', past_due: 'em atraso', trialing: 'em teste', incomplete: 'incompleta', paid: 'paga', pending: 'pendente', failed: 'falhou' } as Record<string, string>)[st] ?? st;
  const eyebrow = 'text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ink/45';
  const sectionTitle = 'text-[clamp(1.6rem,2.6vw,2.2rem)] font-medium tracking-[-0.03em] text-ink';

  return (
    <DashboardLayout title="Cobrança e Assinatura">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 border-b border-ink/12 pb-10 lg:grid-cols-2 lg:items-end">
          <div>
            <p className={eyebrow}>Plano e cobrança</p>
            <h2 className="mt-4 text-[clamp(2.2rem,4.4vw,3.6rem)] font-medium leading-[1.04] tracking-[-0.035em] text-ink">Cobrança e assinatura</h2>
          </div>
          <p className="max-w-[460px] text-[1.02rem] leading-relaxed text-ink/65 lg:justify-self-end">
            Acompanhe o seu consumo, gerencie a assinatura e consulte o histórico de cobranças.
          </p>
        </div>

        {/* Consumo */}
        {(profileData as ProfileData)?.apiUsage && (profileData as ProfileData)?.subscription?.limits && (
          <section className="mt-10">
            <h3 className={sectionTitle}>Seu consumo</h3>
            {(profileData as ProfileData).subscription?.isAdmin && (
              <p className="mt-2 text-[0.92rem] text-ink/60">Esta é a conta de administrador: os limites do plano não se aplicam a ela, para permitir testes e suporte.</p>
            )}
            <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-6 lg:grid-cols-5">
              {renderMeter('Pesquisas', (profileData as ProfileData).apiUsage!.searchCount, (profileData as ProfileData).subscription!.limits!.searchCount)}
              {renderMeter('Mensagens', (profileData as ProfileData).apiUsage!.chatCount, (profileData as ProfileData).subscription!.limits!.chatCount)}
              {renderMeter('Op. de docs', (profileData as ProfileData).apiUsage!.docsCount, (profileData as ProfileData).subscription!.limits!.docsCount)}
              {renderMeter('Pastas do Cofre', (profileData as ProfileData).apiUsage!.vaultFolderCount, (profileData as ProfileData).subscription!.limits!.vaultFolderCount)}
              {renderMeter('Fluxos', (profileData as ProfileData).apiUsage!.workflowCount, (profileData as ProfileData).subscription!.limits!.workflowCount)}
            </div>
            <p className="mt-5 text-[0.82rem] leading-relaxed text-ink/50">
              &quot;Mensagens&quot; soma as conversas no Chat, com os Assistentes de IA e com arquivos do Cofre. O histórico do Chat fica salvo apenas neste navegador; por isso pode aparecer vazio em outro aparelho.
            </p>
          </section>
        )}

        {/* Assinatura atual */}
        <section className="mt-14 rounded-3xl bg-[#F1EDE0] p-6 sm:p-8">
          {currentSubscription ? (
            <>
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                  <p className={eyebrow}>Assinatura</p>
                  <h3 className={`mt-2 ${sectionTitle}`}>Assinatura ativa</h3>
                </div>
                <button
                  onClick={handleManageSubscription}
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-[#151816] px-5 text-[0.92rem] font-medium text-white transition-colors hover:bg-[#151816]/90"
                >
                  Gerenciar assinatura
                </button>
              </div>
              <dl className="mt-6 grid gap-x-8 sm:grid-cols-3">
                <div className="border-t border-ink/15 py-4">
                  <dt className={eyebrow}>Plano</dt>
                  <dd className="mt-1.5 text-[1.3rem] font-medium text-ink">{planLabel(currentSubscription.plan)}</dd>
                </div>
                <div className="border-t border-ink/15 py-4">
                  <dt className={eyebrow}>Status</dt>
                  <dd className="mt-1.5 flex items-center gap-2 text-[1.3rem] font-medium capitalize text-ink">
                    <span className="h-2 w-2 rounded-full bg-[#151816]" />
                    {statusLabel(currentSubscription.status)}
                  </dd>
                </div>
                <div className="border-t border-ink/15 py-4">
                  <dt className={eyebrow}>Próxima renovação</dt>
                  <dd className="mt-1.5 text-[1.3rem] font-medium text-ink">{formatDate(currentSubscription.nextBillingDate)}</dd>
                </div>
              </dl>
            </>
          ) : (
            <div>
              <p className={eyebrow}>Assinatura</p>
              <h3 className={`mt-2 ${sectionTitle}`}>Você está no plano Gratuito</h3>
              <p className="mt-2 max-w-xl text-[0.98rem] leading-relaxed text-ink/65">Assine o Pro para liberar todos os assistentes, o Cofre, os Fluxos e a marca do escritório.</p>
            </div>
          )}
        </section>

        {/* Planos */}
        <section className="mt-14">
          <h3 className={sectionTitle}>Planos</h3>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {plans.map((plan) => {
              const dark = plan.isPopular || plan.id === 'pro-monthly';
              return (
                <div key={plan.id} className={`flex flex-col rounded-3xl p-7 ${dark ? 'bg-[#151816] text-white' : 'bg-[#FFFDF6] text-ink ring-1 ring-ink/10'}`}>
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="text-[1.5rem] font-medium tracking-[-0.02em]">{planLabel(plan.name)}</h4>
                    {plan.isPopular && <span className="rounded-full bg-white/10 px-3 py-1 text-[0.72rem] font-medium text-white/80">Mais popular</span>}
                  </div>
                  <p className={`mt-1 min-h-[2.75rem] text-[0.9rem] leading-snug ${dark ? 'text-white/60' : 'text-ink/60'}`}>{plan.description}</p>
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-[2.4rem] font-medium leading-none tracking-[-0.03em]">
                      {plan.price === 0 && plan.id === 'free' ? formatPlanPrice(0) : plan.price === 0 && plan.id === 'enterprise' ? 'Sob consulta' : formatPlanPrice(plan.id === 'pro-monthly' ? 399 : plan.price)}
                    </span>
                    {plan.price !== 0 && (
                      <span className={`text-[0.85rem] ${dark ? 'text-white/50' : 'text-ink/45'}`}>/ {plan.billingPeriod === 'monthly' ? 'mês' : plan.billingPeriod === 'yearly' || plan.billingPeriod === 'annual' ? 'ano' : plan.billingPeriod}</span>
                    )}
                    {plan.price === 0 && plan.id === 'free' && <span className="text-[0.85rem] text-ink/45">/ para sempre</span>}
                  </div>
                  <ul className={`mt-6 flex-1 space-y-3 border-t pt-6 ${dark ? 'border-white/15' : 'border-ink/12'}`}>
                    {plan.features.map((feature, index) => (
                      <li key={index} className={`flex gap-3 text-[0.9rem] leading-snug ${dark ? 'text-white/80' : 'text-ink/75'}`}>
                        <svg className={`mt-0.5 h-4 w-4 flex-shrink-0 ${dark ? 'text-white/60' : 'text-ink/45'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleSubscribe(plan)}
                    disabled={isLoading || selectedPlan?.id === plan.id || currentSubscription?.plan === plan.name}
                    className={`mt-7 inline-flex h-11 items-center justify-center rounded-xl px-5 text-[0.92rem] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${dark ? 'bg-[#FFFDF6] text-ink hover:bg-white' : 'bg-[#151816] text-white hover:bg-[#151816]/90'}`}
                  >
                    {selectedPlan?.id === plan.id
                      ? 'Processando...'
                      : currentSubscription?.plan === plan.name
                        ? 'Plano atual'
                        : plan.id === 'free'
                          ? 'Nível atual'
                          : plan.id === 'enterprise'
                            ? 'Solicitar acesso'
                            : 'Ativar o Pro'}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Histórico */}
        <section className="mt-14">
          <h3 className={sectionTitle}>Histórico de cobranças</h3>
          {invoices.length > 0 ? (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[620px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-ink/15 text-[0.8rem] text-ink/50">
                    <th className="py-4 pr-4 font-medium">Fatura</th>
                    <th className="py-4 pr-4 font-medium">Data</th>
                    <th className="py-4 pr-4 font-medium">Valor</th>
                    <th className="py-4 pr-4 font-medium">Status</th>
                    <th className="py-4 text-right font-medium">Recibo</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-ink/10 text-[0.92rem]">
                      <td className="py-4 pr-4 font-medium text-ink">{invoice.id}</td>
                      <td className="py-4 pr-4 text-ink/60">{formatDate(invoice.date)}</td>
                      <td className="py-4 pr-4 font-medium text-ink">{formatCurrency(invoice.amount, invoice.currency)}</td>
                      <td className="py-4 pr-4">
                        <span className={`rounded-full px-2.5 py-1 text-[0.75rem] font-medium ${invoice.status === 'paid' ? 'bg-ink/8 text-ink/70' : 'bg-red-50 text-red-700'}`}>{statusLabel(invoice.status)}</span>
                      </td>
                      <td className="py-4 text-right">
                        <a href={invoice.downloadUrl} className="text-[0.88rem] font-medium text-ink underline underline-offset-4 hover:text-ink/70">
                          Baixar
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-4 border-t border-ink/12 pt-4 text-[0.95rem] text-ink/55">Nenhuma cobrança ainda. As faturas aparecem aqui assim que houver transações.</p>
          )}
        </section>

        {/* Perguntas frequentes, conforme os Termos de Uso (cláusula 8) */}
        <section className="mt-14 grid gap-8 border-t border-ink/12 pt-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <h3 className={sectionTitle}>Perguntas frequentes</h3>
          <div className="border-t border-ink/20">
            {[
              { q: 'Posso cancelar quando quiser?', a: 'Sim, pelo painel. O cancelamento impede a renovação e o acesso continua até o fim do período já pago.' },
              { q: 'Quais formas de pagamento vocês aceitam?', a: 'Cartão de crédito, processado pela Stripe.' },
              { q: 'Existe reembolso?', a: 'Você pode desistir em até 7 dias da contratação, com estorno da cobrança. Depois disso, no plano mensal não há reembolso do mês em curso; no anual, a devolução é proporcional, como prevê a cláusula 8 dos Termos de Uso.' },
            ].map((f) => (
              <details key={f.q} className="group border-b border-ink/20 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[1.05rem] font-medium text-ink">
                  {f.q}
                  <span className="relative h-4 w-4 shrink-0 text-ink/60" aria-hidden="true">
                    <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
                    <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current transition-transform group-open:rotate-90 group-open:opacity-0" />
                  </span>
                </summary>
                <p className="max-w-[620px] pb-5 text-[0.95rem] leading-relaxed text-ink/65">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

export default function BillingPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-foreground font-medium">Carregando informações de cobrança...</div>}>
      <BillingContent />
    </Suspense>
  );
}