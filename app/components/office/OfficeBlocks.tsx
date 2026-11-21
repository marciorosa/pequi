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
});

const toForm = (p: any) => ({
  name: p.name,
  description: p.description || '',
  price: String(p.priceCents / 100).replace('.', ','),
  interval: p.interval,
  features: (p.features || []).join('\n'),
  limits: Object.fromEntries(LIMITS.map((l) => [l.key, p.limits?.[l.key] === null ? '' : String(p.limits?.[l.key] ?? 0)])),
  active: p.active,
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
          <label className="flex items-center gap-2 text-sm text-ink/70">
            <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
            Plano à venda
          </label>
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
                  {p.name} {!p.active && <span className="ml-1 rounded-full bg-castanha-100 px-2 py-0.5 text-[10px] text-ink/60">fora de venda</span>}
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

/* ------------------------------------ Stripe ------------------------------------ */

type StripeApi = {
  onboard: (returnUrl: string) => Promise<{ url: string }>;
  refresh: () => Promise<{ stripe: any }>;
  dashboard: () => Promise<{ url: string }>;
};

export function StripeConnectCard({ stripe, api, returnUrl, onChange }: { stripe: any; api: StripeApi; returnUrl: string; onChange?: (s: any) => void }) {
  const [busy, setBusy] = useState('');
  const run = async (what: string, fn: () => Promise<void>) => {
    setBusy(what);
    try {
      await fn();
    } catch (e) {
      toast.error(errorMessage(e, 'Não foi possível falar com o Stripe.'));
    } finally {
      setBusy('');
    }
  };
  const status = !stripe?.accountId
    ? { label: 'Não conectado', cls: 'bg-castanha-100 text-ink/60' }
    : stripe.chargesEnabled
      ? { label: 'Recebendo pagamentos', cls: 'bg-emerald-50 text-emerald-700' }
      : { label: 'Cadastro pendente', cls: 'bg-amber-50 text-amber-700' };

  return (
    <div className={card}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-ink">Recebimentos (Stripe Connect)</p>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${status.cls}`}>{status.label}</span>
      </div>
      <p className="mb-4 text-xs text-ink/60">
        O escritório preenche CNPJ, dados bancários e documentos na página do próprio Stripe. Depois disso, as assinaturas dos clientes
        caem na conta do escritório, já com a comissão do Pequi descontada.
        {stripe?.accountId && <> Conta: <code className="text-[11px]">{stripe.accountId}</code>.</>}
      </p>
      <div className="flex flex-wrap gap-2">
        {!stripe?.chargesEnabled && (
          <button type="button" className={btnPrimary} disabled={!!busy} onClick={() => run('onboard', async () => { const d = await api.onboard(returnUrl); window.location.href = d.url; })}>
            {busy === 'onboard' ? 'Abrindo…' : stripe?.accountId ? 'Continuar cadastro no Stripe' : 'Conectar Stripe'}
          </button>
        )}
        {stripe?.accountId && (
          <button type="button" className={btnSoft} disabled={!!busy} onClick={() => run('refresh', async () => { const d = await api.refresh(); onChange?.(d.stripe); toast.success('Situação atualizada.'); })}>
            {busy === 'refresh' ? 'Consultando…' : 'Atualizar situação'}
          </button>
        )}
        {stripe?.detailsSubmitted && (
          <button type="button" className={btnSoft} disabled={!!busy} onClick={() => run('dash', async () => { const d = await api.dashboard(); window.open(d.url, '_blank', 'noopener'); })}>
            Painel do Stripe
          </button>
        )}
      </div>
    </div>
  );
}
