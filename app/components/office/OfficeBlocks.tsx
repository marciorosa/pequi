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

/* ------------------------------------ planos ------------------------------------ */

const LIMITS: Array<{ key: string; label: string }> = [
  { key: 'chatCount', label: 'Mensagens no chat' },
  { key: 'searchCount', label: 'Pesquisas' },
  { key: 'docsCount', label: 'Operações com documentos' },
  { key: 'vaultFolderCount', label: 'Pastas do cofre' },
  { key: 'workflowCount', label: 'Fluxos' },
];

type PlanApi = {
  list: () => Promise<{ plans: any[] }>;
  create: (body: any) => Promise<any>;
  update: (planId: string, body: any) => Promise<any>;
};

const emptyPlan = () => ({
  name: '',
  description: '',
  price: '',
  interval: 'month',
  features: '',
  limits: { chatCount: '100', searchCount: '50', docsCount: '20', vaultFolderCount: '10', workflowCount: '0' } as Record<string, string>,
  active: true,
  popular: false,
});

const toForm = (p: any) => ({
  name: p.name,
  description: p.description || '',
  price: String(p.priceCents / 100).replace('.', ','),
  interval: p.interval,
  features: (p.features || []).join('\n'),
  limits: Object.fromEntries(LIMITS.map((l) => [l.key, p.limits?.[l.key] === null ? '' : String(p.limits?.[l.key] ?? 0)])),
  active: p.active,
  popular: Boolean(p.popular),
});

export function PlansEditor({ api, canEdit = true, commissionPercent }: { api: PlanApi; canEdit?: boolean; commissionPercent?: number }) {
  const [plans, setPlans] = useState<any[] | null>(null);
  const [editing, setEditing] = useState<string | 'new' | null>(null);
  const [form, setForm] = useState(emptyPlan());
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    api.list().then((d) => setPlans(d.plans)).catch((e) => toast.error(errorMessage(e, 'Não foi possível carregar os planos.')));
  }, [api]);
  useEffect(load, [load]);

  const save = async () => {
    setSaving(true);
    try {
      const body = {
        ...form,
        features: form.features,
        limits: Object.fromEntries(LIMITS.map((l) => [l.key, form.limits[l.key] === '' ? null : form.limits[l.key]])),
      };
      if (editing === 'new') await api.create(body);
      else if (editing) await api.update(editing, body);
      toast.success('Plano salvo.');
      setEditing(null);
      load();
    } catch (e) {
      toast.error(errorMessage(e, 'Não foi possível salvar o plano.'));
    } finally {
      setSaving(false);
    }
  };

  const price = Number(String(form.price).replace(',', '.')) || 0;

  return (
    <div className={card}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-ink">Planos para os clientes do escritório</p>
          <p className="text-xs text-ink/50">Preço em reais. Limite em branco = sem limite.</p>
        </div>
        {canEdit && editing === null && (
          <button type="button" className={btnSoft} onClick={() => { setForm(emptyPlan()); setEditing('new'); }}>
            Novo plano
          </button>
        )}
      </div>

      {editing !== null && (
        <div className="mb-6 grid gap-3 rounded-2xl border border-castanha-200 bg-castanha-25 p-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Nome do plano</label>
            <input className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ex.: Atendimento Essencial" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Preço (R$)</label>
              <input className={inputCls} inputMode="decimal" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="49,90" />
            </div>
            <div>
              <label className={labelCls}>Cobrança</label>
              <select className={inputCls} value={form.interval} onChange={(e) => setForm({ ...form, interval: e.target.value })}>
                <option value="month">Mensal</option>
                <option value="year">Anual</option>
              </select>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Descrição</label>
            <input className={inputCls} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          {LIMITS.map((l) => (
            <div key={l.key}>
              <label className={labelCls}>{l.label}</label>
              <input
                className={inputCls}
                inputMode="numeric"
                value={form.limits[l.key]}
                placeholder="Sem limite"
                onChange={(e) => setForm({ ...form, limits: { ...form.limits, [l.key]: e.target.value.replace(/\D/g, '') } })}
              />
            </div>
          ))}
          <div className="sm:col-span-2">
            <label className={labelCls}>Itens do plano (um por linha)</label>
            <textarea className={inputCls} rows={3} value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} />
          </div>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm text-ink/70">
              <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
              Plano à venda
            </label>
            <label className="flex items-center gap-2 text-sm text-ink/70">
              <input type="checkbox" checked={form.popular} onChange={(e) => setForm({ ...form, popular: e.target.checked })} />
              Destacar como &quot;Mais popular&quot;
            </label>
          </div>
          {commissionPercent !== undefined && price > 0 && (
            <p className="text-xs text-ink/60 sm:text-right">
              Comissão do Pequi ({commissionPercent}%): {money(Math.round(price * commissionPercent))} · escritório recebe{' '}
              {money(Math.round(price * (100 - commissionPercent)))} (antes das tarifas do Stripe)
            </p>
          )}
          <div className="flex gap-2 sm:col-span-2">
            <button type="button" className={btnPrimary} disabled={saving} onClick={save}>{saving ? 'Salvando…' : 'Salvar plano'}</button>
            <button type="button" className={btnSoft} onClick={() => setEditing(null)}>Cancelar</button>
          </div>
        </div>
      )}

      {!plans && <p className="text-sm text-ink/50">Carregando…</p>}
      {plans && plans.length === 0 && <p className="text-sm text-ink/50">Nenhum plano cadastrado.</p>}
      {plans && plans.length > 0 && (
        <ul className="divide-y divide-castanha-100">
          {plans.map((p) => (
            <li key={p._id} className="flex items-center justify-between gap-4 py-3">
              <div>
                <p className="text-sm font-medium text-ink">
                  {p.name} {p.popular && <span className="ml-1 rounded-full bg-pequi-500 px-2 py-0.5 text-[10px] text-white">mais popular</span>}{' '}
                  {!p.active && <span className="ml-1 rounded-full bg-castanha-100 px-2 py-0.5 text-[10px] text-ink/60">fora de venda</span>}
                </p>
                <p className="text-xs text-ink/50">
                  {money(p.priceCents)} / {p.interval === 'year' ? 'ano' : 'mês'} · {p.limits?.chatCount === null ? 'mensagens sem limite' : `${p.limits?.chatCount} mensagens`}
                  {p.stripePriceId ? ' · no Stripe' : ' · ainda não está no Stripe'}
                </p>
              </div>
              {canEdit && (
                <button type="button" className={btnSoft} onClick={() => { setForm(toForm(p) as any); setEditing(p._id); }}>
                  Editar
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

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

export function ClientsList({ load }: { load: () => Promise<{ clients: any[] }> }) {
  const [rows, setRows] = useState<any[] | null>(null);
  const [q, setQ] = useState('');
  useEffect(() => {
    load().then((d) => setRows(d.clients)).catch((e) => toast.error(errorMessage(e, 'Não foi possível carregar os clientes.')));
  }, [load]);
  const list = (rows || []).filter((r) => !q || `${r.name} ${r.email}`.toLowerCase().includes(q.toLowerCase()));
  const active = (rows || []).filter((r) => r.subscription && ['active', 'trialing'].includes(r.subscription.status)).length;
  return (
    <div className={card}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-ink">Usuários e planos contratados</p>
          <p className="text-xs text-ink/50">{rows ? `${rows.length} conta(s) · ${active} assinatura(s) ativa(s)` : 'Carregando…'}</p>
        </div>
        <input className={`${inputCls} max-w-xs`} placeholder="Buscar por nome ou e-mail" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Buscar cliente" />
      </div>
      {rows && list.length === 0 && <p className="text-sm text-ink/50">Nenhum usuário.</p>}
      {list.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.2em] text-castanha-400">
                <th className="py-2 pr-4">Usuário</th>
                <th className="py-2 pr-4">Plano</th>
                <th className="py-2 pr-4">Situação</th>
                <th className="py-2 pr-4">Próxima cobrança</th>
                <th className="py-2 pr-4">Total pago</th>
                <th className="py-2">Cadastro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-castanha-100">
              {list.map((r) => {
                const st = r.subscription ? STATUS[r.subscription.status] || { label: r.subscription.status, cls: 'bg-castanha-100 text-ink/60' } : null;
                return (
                  <tr key={r._id} className="align-top">
                    <td className="py-2 pr-4">
                      <p className="font-medium text-ink">
                        {r.name} {r.role !== 'client' && <span className="ml-1 rounded-full bg-ink px-2 py-0.5 text-[10px] text-white">{r.role === 'owner' ? 'responsável' : 'equipe'}</span>}
                      </p>
                      <p className="text-xs text-ink/60">{r.email}</p>
                    </td>
                    <td className="py-2 pr-4">
                      {r.subscription ? (
                        <>
                          <p className="text-ink">{r.subscription.plan || 'Plano'}</p>
                          <p className="text-xs text-ink/50">{money(r.subscription.priceCents)} / {r.subscription.interval === 'year' ? 'ano' : 'mês'}</p>
                        </>
                      ) : (
                        <span className="text-ink/40">Sem plano</span>
                      )}
                    </td>
                    <td className="py-2 pr-4">
                      {st ? <span className={`rounded-full px-2 py-0.5 text-xs ${st.cls}`}>{st.label}{r.subscription.cancelAtPeriodEnd ? ' (cancelando)' : ''}</span> : '—'}
                    </td>
                    <td className="py-2 pr-4 text-ink/70">{r.subscription && ['active', 'trialing', 'past_due'].includes(r.subscription.status) ? day(r.subscription.currentPeriodEnd) : '—'}</td>
                    <td className="py-2 pr-4">{money(r.totalPaidCents || 0)}</td>
                    <td className="py-2 text-ink/60">{day(r.createdAt)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------ extrato ------------------------------------ */

function Box({ label, value, hint, strong }: { label: string; value: string; hint?: string; strong?: boolean }) {
  return (
    <div className={`rounded-2xl border p-4 ${strong ? 'border-pequi-200 bg-pequi-50' : 'border-castanha-200 bg-white'}`}>
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-castanha-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-ink">{value}</p>
      {hint && <p className="mt-1 text-xs text-ink/50">{hint}</p>}
    </div>
  );
}

/**
 * Valores do escritório: bruto pago pelos clientes, comissão do Pequi, líquido,
 * já repassado e saldo a receber. Com onPayout (admin do Pequi), registra repasses.
 */
export function FinancePanel({
  load,
  onPayout,
}: {
  load: () => Promise<any>;
  onPayout?: (body: { amount: string; paidAt?: string; note?: string }) => Promise<any>;
}) {
  const [data, setData] = useState<any>(null);
  const [form, setForm] = useState({ amount: '', paidAt: '', note: '' });
  const [saving, setSaving] = useState(false);
  const reload = useCallback(() => {
    load().then(setData).catch((e) => toast.error(errorMessage(e, 'Não foi possível carregar os valores.')));
  }, [load]);
  useEffect(reload, [reload]);
  if (!data) return <div className={card}><p className="text-sm text-ink/50">Carregando…</p></div>;
  const t = data.totals;

  return (
    <div className="space-y-6">
      <div className={card}>
        <p className="mb-1 text-sm font-semibold text-ink">Valores</p>
        <p className="mb-4 text-xs text-ink/50">
          Os clientes pagam na conta do Pequi. Comissão do Pequi em vigor: {data.commissionPercent}%. Valores antes das tarifas do Stripe.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <Box label="Pago pelos clientes" value={money(t.grossCents)} hint={`${t.invoices} fatura(s) · ${money(t.month.grossCents)} neste mês`} />
          <Box label="Comissão do Pequi" value={money(t.commissionCents)} hint={`${money(t.month.commissionCents)} neste mês`} />
          <Box label="Valor do escritório" value={money(t.netCents)} hint={`${money(t.month.netCents)} neste mês`} />
          <Box label="Já repassado" value={money(t.paidOutCents)} />
          <Box label="A receber" value={money(t.balanceCents)} strong />
        </div>
      </div>

      <div className={card}>
        <p className="mb-4 text-sm font-semibold text-ink">Faturas pagas</p>
        {data.earnings.length === 0 && <p className="text-sm text-ink/50">Nenhuma fatura paga ainda.</p>}
        {data.earnings.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.2em] text-castanha-400">
                  <th className="py-2 pr-4">Data</th>
                  <th className="py-2 pr-4">Cliente</th>
                  <th className="py-2 pr-4">Plano</th>
                  <th className="py-2 pr-4">Valor pago</th>
                  <th className="py-2 pr-4">Comissão</th>
                  <th className="py-2">Escritório</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-castanha-100">
                {data.earnings.map((e: any) => (
                  <tr key={e._id}>
                    <td className="py-2 pr-4 text-ink/70">{day(e.paidAt)}</td>
                    <td className="py-2 pr-4">{e.client ? `${e.client.name} (${e.client.email})` : '—'}</td>
                    <td className="py-2 pr-4">{e.plan || '—'}</td>
                    <td className="py-2 pr-4">{money(e.amountCents)}</td>
                    <td className="py-2 pr-4">{money(e.commissionCents)} <span className="text-xs text-ink/50">({e.commissionPercent}%)</span></td>
                    <td className="py-2 font-medium">{money(e.netCents)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className={card}>
        <p className="mb-4 text-sm font-semibold text-ink">Repasses ao escritório</p>
        {onPayout && (
          <div className="mb-4 grid gap-3 rounded-2xl border border-castanha-200 bg-castanha-25 p-4 sm:grid-cols-[1fr_1fr_2fr_auto] sm:items-end">
            <div>
              <label className={labelCls}>Valor (R$)</label>
              <input className={inputCls} inputMode="decimal" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder={(t.balanceCents / 100).toFixed(2).replace('.', ',')} />
            </div>
            <div>
              <label className={labelCls}>Data</label>
              <input className={inputCls} type="date" value={form.paidAt} onChange={(e) => setForm({ ...form, paidAt: e.target.value })} />
            </div>
            <div>
              <label className={labelCls}>Observação</label>
              <input className={inputCls} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Ex.: PIX de novembro" />
            </div>
            <button
              type="button"
              className={btnPrimary}
              disabled={saving || !form.amount}
              onClick={async () => {
                setSaving(true);
                try {
                  await onPayout(form);
                  toast.success('Repasse registrado.');
                  setForm({ amount: '', paidAt: '', note: '' });
                  reload();
                } catch (e) {
                  toast.error(errorMessage(e, 'Não foi possível registrar o repasse.'));
                } finally {
                  setSaving(false);
                }
              }}
            >
              Registrar repasse
            </button>
          </div>
        )}
        {data.payouts.length === 0 && <p className="text-sm text-ink/50">Nenhum repasse registrado.</p>}
        {data.payouts.length > 0 && (
          <ul className="divide-y divide-castanha-100 text-sm">
            {data.payouts.map((p: any) => (
              <li key={p._id} className="flex justify-between gap-4 py-2">
                <span className="text-ink/70">{day(p.paidAt)}{p.note ? ` · ${p.note}` : ''}</span>
                <span className="font-medium">{money(p.amountCents)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
