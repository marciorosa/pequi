'use client';

/**
 * Planos do escritório para os clientes dele (painel white-label).
 * O pagamento é feito no Stripe; a assinatura repassa o valor ao escritório
 * e retém a comissão do Pequi.
 */
import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useTenant } from '../contexts/TenantContext';
import { useAuth } from '../contexts/AuthContext';
import { tenantBillingService } from '../services/api';

const money = (cents: number) => (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function AssinarContent() {
  const { tenant, loading } = useTenant();
  const { isAuthenticated, isLoading: authLoading, checkAuthStatus } = useAuth();
  const params = useSearchParams();
  const [plans, setPlans] = useState<any[] | null>(null);
  const [busy, setBusy] = useState('');
  const [confirmed, setConfirmed] = useState<'idle' | 'checking' | 'ok' | 'pending'>('idle');

  useEffect(() => {
    if (!tenant) return;
    tenantBillingService.plans(tenant.slug).then((d) => setPlans(d.plans)).catch(() => setPlans([]));
  }, [tenant]);

  // Volta do Stripe: confirma o pagamento e grava a assinatura (funciona mesmo sem webhook)
  useEffect(() => {
    const sessionId = params.get('session_id');
    if (!sessionId || !isAuthenticated) return;
    setConfirmed('checking');
    tenantBillingService
      .confirm(sessionId)
      .then((d) => {
        setConfirmed(d.subscription ? 'ok' : 'pending');
        checkAuthStatus();
      })
      .catch((e) => {
        setConfirmed('pending');
        toast.error(e?.response?.data?.message || 'Não foi possível confirmar o pagamento.');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, isAuthenticated]);

  const subscribe = async (planId: string) => {
    setBusy(planId);
    try {
      const d = await tenantBillingService.checkout(planId);
      window.location.href = d.url;
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Não foi possível iniciar o pagamento.');
      setBusy('');
    }
  };

  if (loading || authLoading) return <p className="py-20 text-center text-sm text-castanha-500">Carregando…</p>;
  if (!tenant) {
    return (
      <div className="mx-auto max-w-lg py-20 text-center">
        <p className="text-lg font-semibold text-ink">Página do escritório</p>
        <p className="mt-2 text-sm text-castanha-600">Abra esta página pelo endereço do escritório. Para os planos do Pequi, veja <Link className="underline" href="/pricing">Planos</Link>.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pequi-600">{tenant.name}</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink">Planos de atendimento</h1>
      <p className="mt-2 max-w-2xl text-sm text-castanha-600">
        Continue com a assistente jurídica do escritório: chat, assistentes por área, documentos e cofre, nas condições de cada plano.
      </p>

      {confirmed === 'checking' && <p className="mt-6 rounded-xl bg-castanha-50 p-4 text-sm">Confirmando o pagamento…</p>}
      {confirmed === 'ok' && (
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          Assinatura ativa. <Link className="font-semibold underline" href="/dashboard/chat">Ir para o chat</Link>
        </div>
      )}
      {confirmed === 'pending' && <p className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">O pagamento ainda está em processamento. Atualize a página em instantes.</p>}
      {params.get('canceled') && <p className="mt-6 rounded-xl bg-castanha-50 p-4 text-sm">Pagamento cancelado. Nada foi cobrado.</p>}

      {!tenant.billingReady && <p className="mt-8 text-sm text-castanha-600">O escritório ainda está configurando os pagamentos. Volte em breve.</p>}
      {tenant.billingReady && plans && plans.length === 0 && <p className="mt-8 text-sm text-castanha-600">Nenhum plano disponível no momento.</p>}

      {tenant.billingReady && plans && plans.length > 0 && (
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p._id}
              className={`relative flex flex-col rounded-[1.5rem] border bg-white p-6 ${p.popular ? 'border-pequi-500 shadow-[0_18px_40px_-20px_var(--pequi-500)] ring-1 ring-pequi-500' : 'border-castanha-200'}`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-6 rounded-full bg-pequi-500 px-3 py-1 text-[11px] font-semibold" style={{ color: 'var(--pq-on-brand)' }}>
                  Mais popular
                </span>
              )}
              <p className="text-lg font-semibold text-ink">{p.name}</p>
              {p.description && <p className="mt-1 text-sm text-castanha-600">{p.description}</p>}
              <p className="mt-4 text-3xl font-semibold text-ink">
                {money(p.priceCents)}
                <span className="text-sm font-normal text-castanha-500"> / {p.interval === 'year' ? 'ano' : 'mês'}</span>
              </p>
              <ul className="mt-4 flex-1 space-y-1.5 text-sm text-ink/80">
                {(p.features || []).map((f: string) => (
                  <li key={f}>• {f}</li>
                ))}
                {(!p.features || p.features.length === 0) && (
                  <li>• {p.limits?.chatCount === null ? 'Mensagens sem limite' : `${p.limits?.chatCount} mensagens no chat`}</li>
                )}
              </ul>
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={() => subscribe(p._id)}
                  disabled={!!busy}
                  className="mt-6 rounded-xl bg-pequi-500 px-4 py-2.5 text-sm font-semibold disabled:opacity-50"
                  style={{ color: 'var(--pq-on-brand)' }}
                >
                  {busy === p._id ? 'Abrindo o pagamento…' : 'Assinar'}
                </button>
              ) : (
                <Link href="/signup" className="mt-6 rounded-xl bg-pequi-500 px-4 py-2.5 text-center text-sm font-semibold" style={{ color: 'var(--pq-on-brand)' }}>
                  Criar conta para assinar
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
      {!isAuthenticated && (
        <p className="mt-6 text-sm text-castanha-600">
          Já tem conta? <Link className="underline" href="/login?from=/assinar">Entrar</Link>
        </p>
      )}
    </div>
  );
}

export default function AssinarPage() {
  return (
    <Suspense fallback={null}>
      <AssinarContent />
    </Suspense>
  );
}
