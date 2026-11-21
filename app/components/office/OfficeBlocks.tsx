'use client';

/**
 * Blocos do modo white-label usados no admin do Pequi e na área do escritório:
 * planos que o escritório vende, contatos deixados no widget e conexão com o Stripe.
 */
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export const card = 'rounded-[1.5rem] border border-castanha-200 bg-white p-6';
export const inputCls = 'w-full rounded-xl border border-castanha-200 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-pequi-400 focus:ring-2 focus:ring-pequi-100';
export const labelCls = 'mb-1 block text-xs font-medium text-ink/60';
export const btnPrimary = 'rounded-xl bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-ink/90 disabled:opacity-50';
export const btnSoft = 'rounded-xl border border-castanha-200 bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-castanha-50 disabled:opacity-50';
export const errorMessage = (e: any, fallback: string) => e?.response?.data?.message || fallback;
const money = (cents: number) => (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const dateTime = (v?: string) =>
  v ? new Date(v).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—';

/* ------------------------------------ contatos ------------------------------------ */

export function LeadsList({ load }: { load: () => Promise<{ conversations: any[] }> }) {
  const [rows, setRows] = useState<any[] | null>(null);
  useEffect(() => {
    load().then((d) => setRows(d.conversations)).catch((e) => toast.error(errorMessage(e, 'Não foi possível carregar os contatos.')));
  }, [load]);
  return (
    <div className={card}>
      <p className="mb-1 text-sm font-semibold text-ink">Conversas do widget</p>
      <p className="mb-4 text-xs text-ink/50">As 200 mais recentes. O contato aparece quando o visitante o informa no chat.</p>
      {!rows && <p className="text-sm text-ink/50">Carregando…</p>}
      {rows && rows.length === 0 && <p className="text-sm text-ink/50">Nenhuma conversa ainda.</p>}
      {rows && rows.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.2em] text-castanha-400">
                <th className="py-2 pr-4">Contato</th>
                <th className="py-2 pr-4">Primeira mensagem</th>
                <th className="py-2 pr-4">Mensagens</th>
                <th className="py-2">Última atividade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-castanha-100">
              {rows.map((r) => (
                <tr key={r._id} className="align-top">
                  <td className="py-2 pr-4">
                    {r.lead ? (
                      <>
                        <p className="font-medium text-ink">{r.lead.name}</p>
                        <p className="text-xs text-ink/60">{[r.lead.email, r.lead.phone].filter(Boolean).join(' · ')}</p>
                      </>
                    ) : (
                      <span className="text-ink/40">Sem contato</span>
                    )}
                  </td>
                  <td className="max-w-xs py-2 pr-4 text-ink/70">{r.firstMessage || '—'}</td>
                  <td className="py-2 pr-4">{r.messages}</td>
                  <td className="py-2 text-ink/60">{dateTime(r.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------ clientes ------------------------------------ */

const STATUS: Record<string, { label: string; cls: string }> = {
  active: { label: 'Ativa', cls: 'bg-emerald-50 text-emerald-700' },
  trialing: { label: 'Em teste', cls: 'bg-emerald-50 text-emerald-700' },
  past_due: { label: 'Pagamento atrasado', cls: 'bg-amber-50 text-amber-700' },
  unpaid: { label: 'Não paga', cls: 'bg-red-50 text-red-700' },
  canceled: { label: 'Cancelada', cls: 'bg-castanha-100 text-ink/60' },
  incomplete: { label: 'Incompleta', cls: 'bg-castanha-100 text-ink/60' },
  incomplete_expired: { label: 'Expirada', cls: 'bg-castanha-100 text-ink/60' },
  paused: { label: 'Pausada', cls: 'bg-castanha-100 text-ink/60' },
};
const day = (v?: string) => (v ? new Date(v).toLocaleDateString('pt-BR') : '—');

export function ClientsList({ load }: { load: () => Promise<{ clients: any[]; coverage: any }> }) {
  const [data, setData] = useState<{ clients: any[]; coverage: any } | null>(null);
  const [q, setQ] = useState('');
  useEffect(() => {
    load().then(setData).catch((e) => toast.error(errorMessage(e, 'Não foi possível carregar os clientes.')));
  }, [load]);
  const rows = data?.clients || [];
  const list = rows.filter((r) => !q || `${r.name} ${r.email}`.toLowerCase().includes(q.toLowerCase()));
  const cov = data?.coverage;
  return (
    <div className={card}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-ink">Usuários do escritório</p>
          <p className="text-xs text-ink/50">
            {data ? `${rows.length} conta(s). ` : 'Carregando… '}
            {cov && (cov.active
              ? `Uso coberto pelo plano ${cov.tier === 'enterprise' ? 'Enterprise' : 'Pro'} do escritório.`
              : `Uso no plano Gratuito: ${cov.reason.toLowerCase()}.`)}
          </p>
        </div>
        <input className={`${inputCls} max-w-xs`} placeholder="Buscar por nome ou e-mail" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Buscar usuário" />
      </div>
      {data && list.length === 0 && <p className="text-sm text-ink/50">Nenhum usuário.</p>}
      {list.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.2em] text-castanha-400">
                <th className="py-2 pr-4">Usuário</th>
                <th className="py-2 pr-4">Uso no ciclo</th>
                <th className="py-2 pr-4">Último acesso</th>
                <th className="py-2">Cadastro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-castanha-100">
              {list.map((r) => (
                <tr key={r._id} className="align-top">
                  <td className="py-2 pr-4">
                    <p className="font-medium text-ink">
                      {r.name} {r.role !== 'client' && <span className="ml-1 rounded-full bg-ink px-2 py-0.5 text-[10px] text-white">{r.role === 'owner' ? 'responsável' : 'equipe'}</span>}
                      {r.blocked && <span className="ml-1 rounded-full bg-red-50 px-2 py-0.5 text-[10px] text-red-700">bloqueado</span>}
                    </p>
                    <p className="text-xs text-ink/60">{r.email}</p>
                  </td>
                  <td className="py-2 pr-4 text-ink/70">{r.usage.chat} mensagens · {r.usage.search} pesquisas · {r.usage.docs} documentos</td>
                  <td className="py-2 pr-4 text-ink/60">{day(r.lastLoginAt)}</td>
                  <td className="py-2 text-ink/60">{day(r.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ------------------------------ assinatura do escritório ------------------------------ */

/** Situação da assinatura do escritório no Pequi (Pro R$ 399/mês ou R$ 3.999/ano) */
export function pequiSubscriptionLabel(s: any): { text: string; ok: boolean } {
  if (!s || s.status === 'sem-assinatura') return { text: 'Sem assinatura do Pequi', ok: false };
  if (s.status === 'sem-responsavel') return { text: 'Sem responsável cadastrado', ok: false };
  if (s.status === 'cortesia') return { text: `Pro de cortesia até ${day(s.currentPeriodEnd)}`, ok: true };
  const st = STATUS[s.status]?.label || s.status;
  const ok = ['active', 'trialing'].includes(s.status);
  const when = ok ? (s.cancelAtPeriodEnd ? ` · termina em ${day(s.currentPeriodEnd)}` : ` · renova em ${day(s.currentPeriodEnd)}`) : '';
  return { text: `Pro ${s.plan || ''}: ${st.toLowerCase()}${when}`, ok };
}

export function PequiSubscriptionBadge({ sub }: { sub: any }) {
  const l = pequiSubscriptionLabel(sub);
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${l.ok ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
      {l.text}
    </span>
  );
}
