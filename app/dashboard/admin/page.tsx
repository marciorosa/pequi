'use client';

/**
 * Área administrativa do Pequi: visão geral, usuários, assinaturas, faturamento, registro e sistema.
 * Só administradores recebem os dados: a permissão é conferida no servidor a cada pedido.
 */
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import DashboardLayout from '../../components/DashboardLayout';
import { adminService, AdminUserAction } from '../../services/api';

type Tab = 'overview' | 'users' | 'subscriptions' | 'billing' | 'logs' | 'system';

const TABS: Array<{ id: Tab; label: string }> = [
  { id: 'overview', label: 'Visão geral' },
  { id: 'users', label: 'Usuários' },
  { id: 'subscriptions', label: 'Assinaturas' },
  { id: 'billing', label: 'Faturamento' },
  { id: 'logs', label: 'Registro' },
  { id: 'system', label: 'Sistema' },
];

const PLAN_LABEL: Record<string, string> = { admin: 'Administrador', pro: 'Pro', cortesia: 'Pro cortesia', free: 'Gratuito' };
const PLAN_STYLE: Record<string, string> = {
  admin: 'bg-ink text-white',
  pro: 'bg-pequi-500 text-white',
  cortesia: 'bg-pequi-50 text-pequi-700 border border-pequi-200',
  free: 'bg-castanha-100 text-castanha-600',
};
const SUB_STATUS: Record<string, string> = {
  active: 'Ativa',
  canceled: 'Cancelada',
  past_due: 'Pagamento atrasado',
  incomplete: 'Incompleta',
  incomplete_expired: 'Expirada',
  trialing: 'Em teste',
  unpaid: 'Não paga',
  paused: 'Pausada',
};
const ACTION_LABEL: Record<string, string> = {
  grantPro: 'Deu Pro de cortesia',
  revokePro: 'Encerrou a cortesia',
  resetUsage: 'Zerou o uso',
  block: 'Bloqueou a conta',
  unblock: 'Desbloqueou a conta',
  makeAdmin: 'Tornou administrador',
  removeAdmin: 'Tirou de administrador',
};

const date = (v?: string | Date | null) => (v ? new Date(v).toLocaleDateString('pt-BR') : '—');
const dateTime = (v?: string | Date | null) =>
  v ? new Date(v).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—';
const money = (value: number, currency = 'BRL') =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: currency || 'BRL' });
const errorMessage = (e: any, fallback: string) => e?.response?.data?.message || fallback;

const card = 'rounded-[1.5rem] border border-castanha-200 bg-white p-6';
const th = 'px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.2em] text-castanha-400';
const td = 'px-4 py-3 text-sm text-ink/80 align-top';

function Stat({ label, value, hint }: { label: string; value: React.ReactNode; hint?: string }) {
  return (
    <div className={card}>
      <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-castanha-400">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-ink">{value}</p>
      {hint && <p className="mt-1 text-xs text-ink/50">{hint}</p>}
    </div>
  );
}

function Badge({ plan }: { plan: string }) {
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${PLAN_STYLE[plan] || PLAN_STYLE.free}`}>{PLAN_LABEL[plan] || plan}</span>;
}

function Loading() {
  return <p className="py-10 text-center text-sm text-ink/50">Carregando…</p>;
}

/* ---------------------------------- Visão geral ---------------------------------- */

function Overview({ onOpenUser }: { onOpenUser: (id: string) => void }) {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    adminService.overview().then(setData).catch((e) => toast.error(errorMessage(e, 'Não foi possível carregar a visão geral.')));
  }, []);
  if (!data) return <Loading />;
  const s = data.subscriptions;
  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Usuários" value={data.users.total} hint={`${data.users.new7} novos em 7 dias · ${data.users.new30} em 30`} />
        <Stat label="Entraram na semana" value={data.users.active7} hint="Login nos últimos 7 dias" />
        <Stat label="Assinaturas ativas" value={s.activeMonthly + s.activeYearly} hint={`${s.activeMonthly} mensais · ${s.activeYearly} anuais${s.cancelando ? ` · ${s.cancelando} cancelando` : ''}`} />
        <Stat label="Pro de cortesia" value={data.users.cortesias} hint={`${data.users.blocked} contas bloqueadas`} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Pesquisas feitas" value={data.usage.search} hint="Soma dos contadores atuais" />
        <Stat label="Mensagens no Chat" value={data.usage.chat} />
        <Stat label="Documentos salvos" value={data.content.documents} hint={`${data.usage.docs} operações com documentos`} />
        <Stat label="Conversas" value={data.content.chats} hint={`${data.content.folders} pastas no Cofre · ${data.content.workflows} fluxos`} />
      </div>
      {Object.keys(s.byStatus || {}).length > 0 && (
        <div className={card}>
          <p className="mb-3 text-sm font-semibold text-ink">Assinaturas por situação</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(s.byStatus).map(([status, n]) => (
              <span key={status} className="rounded-full bg-castanha-50 px-3 py-1 text-sm text-ink/70">
                {SUB_STATUS[status] || status}: <strong>{n as number}</strong>
              </span>
            ))}
          </div>
        </div>
      )}
      <div className={card}>
        <p className="mb-3 text-sm font-semibold text-ink">Cadastros mais recentes</p>
        <ul className="divide-y divide-castanha-100">
          {data.recentUsers.map((u: any) => (
            <li key={u._id}>
              <button type="button" onClick={() => onOpenUser(u._id)} className="flex w-full items-center justify-between py-3 text-left hover:text-pequi-600">
                <span>
                  <span className="text-sm font-medium text-ink">{u.name}</span>
                  <span className="ml-2 text-sm text-ink/50">{u.email}</span>
                </span>
                <span className="text-xs text-ink/40">{date(u.createdAt)}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------------------------------- Usuários ---------------------------------- */

const FILTERS = [
  { id: 'all', label: 'Todos' },
  { id: 'pro', label: 'Pro pago' },
  { id: 'cortesia', label: 'Cortesia' },
  { id: 'free', label: 'Gratuito' },
  { id: 'admin', label: 'Administradores' },
  { id: 'blocked', label: 'Bloqueados' },
];

function Users({ onOpenUser, refreshKey }: { onOpenUser: (id: string) => void; refreshKey: number }) {
  const [q, setQ] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const t = setTimeout(() => { setSearch(q); setPage(1); }, 350);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    setData(null);
    adminService.users({ q: search, filter, page }).then(setData).catch((e) => toast.error(errorMessage(e, 'Não foi possível carregar os usuários.')));
  }, [search, filter, page, refreshKey]);

  const pages = data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1;

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por nome, e-mail ou empresa"
          className="w-full rounded-xl border border-castanha-200 bg-white px-4 py-2.5 text-sm text-ink placeholder-ink/30 focus:outline-none focus:ring-4 focus:ring-pequi-500/10 md:max-w-sm"
        />
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => { setFilter(f.id); setPage(1); }}
              className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${filter === f.id ? 'border-pequi-500 bg-pequi-500 text-white' : 'border-castanha-200 bg-white text-ink/70 hover:border-castanha-300'}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-[1.5rem] border border-castanha-200 bg-white">
        <table className="w-full min-w-[760px]">
          <thead className="border-b border-castanha-100">
            <tr>
              <th className={th}>Usuário</th>
              <th className={th}>Plano</th>
              <th className={th}>Uso (pesq. · chat · docs)</th>
              <th className={th}>Cadastro</th>
              <th className={th}>Último acesso</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-castanha-100">
            {!data && (
              <tr><td colSpan={5}><Loading /></td></tr>
            )}
            {data?.users.length === 0 && (
              <tr><td colSpan={5} className="py-10 text-center text-sm text-ink/50">Nenhum usuário encontrado.</td></tr>
            )}
            {data?.users.map((u: any) => (
              <tr key={u.id} onClick={() => onOpenUser(u.id)} className="cursor-pointer hover:bg-castanha-25">
                <td className={td}>
                  <p className="font-medium text-ink">{u.name}{u.blocked && <span className="ml-2 rounded-full bg-red-50 px-2 py-0.5 text-xs text-red-600">Bloqueado</span>}</p>
                  <p className="text-ink/50">{u.email}</p>
                </td>
                <td className={td}>
                  <Badge plan={u.plan} />
                  {u.planUntil && <p className="mt-1 text-xs text-ink/40">até {date(u.planUntil)}</p>}
                </td>
                <td className={td}>{u.usage?.searchCount || 0} · {u.usage?.chatCount || 0} · {u.usage?.docsCount || 0}</td>
                <td className={td}>{date(u.createdAt)}</td>
                <td className={td}>{dateTime(u.lastLoginAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data && (
        <div className="flex items-center justify-between text-sm text-ink/60">
          <span>{data.total} usuários</span>
          <div className="flex items-center gap-2">
            <button type="button" disabled={page <= 1} onClick={() => setPage(page - 1)} className="rounded-lg border border-castanha-200 px-3 py-1 disabled:opacity-40">Anterior</button>
            <span>{page} de {pages}</span>
            <button type="button" disabled={page >= pages} onClick={() => setPage(page + 1)} className="rounded-lg border border-castanha-200 px-3 py-1 disabled:opacity-40">Próxima</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------- Ficha do usuário ------------------------------- */

function UserPanel({ id, onClose, onChanged }: { id: string; onClose: () => void; onChanged: () => void }) {
  const [data, setData] = useState<any>(null);
  const [busy, setBusy] = useState(false);
  const [days, setDays] = useState('30');
  const [reason, setReason] = useState('');

  const load = useCallback(() => {
    adminService.user(id).then(setData).catch((e) => toast.error(errorMessage(e, 'Não foi possível carregar o usuário.')));
  }, [id]);
  useEffect(() => { setData(null); load(); }, [load]);

  const run = async (action: AdminUserAction, extra: { days?: number; reason?: string } = {}, confirmText?: string) => {
    if (confirmText && !window.confirm(confirmText)) return;
    setBusy(true);
    try {
      await adminService.userAction(id, action, extra);
      toast.success(ACTION_LABEL[action] || 'Feito');
      load();
      onChanged();
    } catch (e) {
      toast.error(errorMessage(e, 'Não foi possível aplicar a ação.'));
    } finally {
      setBusy(false);
    }
  };

  const u = data?.user;
  const isAdminRole = u?.role === 'admin';

  return (
    <div className="fixed inset-0 z-[60] flex justify-end bg-cerrado-950/40 backdrop-blur-sm" onClick={onClose}>
      <aside className="flex h-full w-full max-w-xl flex-col overflow-y-auto bg-castanha-25 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between border-b border-castanha-200 px-6 py-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-castanha-400">Usuário</p>
            <h2 className="mt-1 text-xl font-semibold text-ink">{u?.name || '…'}</h2>
            <p className="text-sm text-ink/50">{u?.email}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Fechar" className="rounded-xl border border-castanha-200 bg-white px-3 py-1.5 text-sm text-ink/60">Fechar</button>
        </div>

        {!data ? (
          <Loading />
        ) : (
          <div className="space-y-6 px-6 py-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge plan={data.plan.plan} />
              {data.plan.until && <span className="text-sm text-ink/50">até {date(data.plan.until)}</span>}
              {u.blocked && <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs text-red-600">Bloqueado{u.blockedReason ? `: ${u.blockedReason}` : ''}</span>}
              {u.isAdminByEmail && <span className="rounded-full bg-castanha-100 px-2.5 py-0.5 text-xs text-castanha-600">Administrador principal (ADMIN_EMAIL)</span>}
            </div>

            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <div><dt className="text-ink/40">Cadastro</dt><dd className="text-ink">{date(u.createdAt)}</dd></div>
              <div><dt className="text-ink/40">Último acesso</dt><dd className="text-ink">{dateTime(u.lastLoginAt)}</dd></div>
              <div><dt className="text-ink/40">Empresa</dt><dd className="text-ink">{u.company || '—'}</dd></div>
              <div><dt className="text-ink/40">Telefone</dt><dd className="text-ink">{u.phone || '—'}</dd></div>
              <div><dt className="text-ink/40">Documentos</dt><dd className="text-ink">{data.content.documents}</dd></div>
              <div><dt className="text-ink/40">Conversas</dt><dd className="text-ink">{data.content.chats}</dd></div>
            </dl>

            <div className={card}>
              <p className="mb-3 text-sm font-semibold text-ink">Uso no ciclo atual</p>
              {[
                ['Pesquisas', 'searchCount'],
                ['Mensagens no Chat', 'chatCount'],
                ['Operações com documentos', 'docsCount'],
                ['Pastas no Cofre', 'vaultFolderCount'],
                ['Fluxos', 'workflowCount'],
              ].map(([label, key]) => {
                const used = data.usage[key] || 0;
                const limit = data.plan.limits?.[key];
                return (
                  <div key={key} className="flex justify-between border-b border-castanha-100 py-2 text-sm last:border-0">
                    <span className="text-ink/70">{label}</span>
                    <span className="text-ink">{used} / {limit === null || limit === undefined ? '∞' : limit}</span>
                  </div>
                );
              })}
            </div>

            <div className={`${card} space-y-4`}>
              <p className="text-sm font-semibold text-ink">Ações</p>

              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="number" min={1} max={366} value={days} onChange={(e) => setDays(e.target.value)}
                  className="w-20 rounded-lg border border-castanha-200 px-3 py-1.5 text-sm" aria-label="Dias de cortesia"
                />
                <span className="text-sm text-ink/60">dias</span>
                <button type="button" disabled={busy} onClick={() => run('grantPro', { days: Number(days) })} className="rounded-lg bg-pequi-500 px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50">
                  Dar Pro de cortesia
                </button>
                {u.complimentaryProUntil && (
                  <button type="button" disabled={busy} onClick={() => run('revokePro', {}, 'Encerrar a cortesia agora?')} className="rounded-lg border border-castanha-200 px-3 py-1.5 text-sm disabled:opacity-50">
                    Encerrar cortesia
                  </button>
                )}
              </div>
              <p className="text-xs text-ink/50">A cortesia soma aos dias que ainda restam e não mexe em assinaturas pagas na Stripe.</p>

              <div className="flex flex-wrap gap-2">
                <button type="button" disabled={busy} onClick={() => run('resetUsage', {}, 'Zerar pesquisas, mensagens e operações com documentos deste usuário?')} className="rounded-lg border border-castanha-200 px-3 py-1.5 text-sm disabled:opacity-50">
                  Zerar uso
                </button>
                {isAdminRole ? (
                  <button type="button" disabled={busy} onClick={() => run('removeAdmin', {}, 'Tirar a permissão de administrador desta conta?')} className="rounded-lg border border-castanha-200 px-3 py-1.5 text-sm disabled:opacity-50">
                    Tirar de administrador
                  </button>
                ) : (
                  <button type="button" disabled={busy} onClick={() => run('makeAdmin', {}, 'Dar acesso à área administrativa para esta conta? Ela poderá ver todos os usuários e o faturamento.')} className="rounded-lg border border-castanha-200 px-3 py-1.5 text-sm disabled:opacity-50">
                    Tornar administrador
                  </button>
                )}
              </div>

              <div className="space-y-2 border-t border-castanha-100 pt-4">
                {u.blocked ? (
                  <button type="button" disabled={busy} onClick={() => run('unblock')} className="rounded-lg border border-castanha-200 px-3 py-1.5 text-sm disabled:opacity-50">
                    Desbloquear conta
                  </button>
                ) : (
                  <>
                    <input
                      value={reason} onChange={(e) => setReason(e.target.value)} maxLength={300}
                      placeholder="Motivo do bloqueio (fica no registro)"
                      className="w-full rounded-lg border border-castanha-200 px-3 py-1.5 text-sm"
                    />
                    <button
                      type="button" disabled={busy}
                      onClick={() => run('block', { reason }, 'Bloquear esta conta? A pessoa sai na hora e não consegue entrar até ser desbloqueada.')}
                      className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm text-red-700 disabled:opacity-50"
                    >
                      Bloquear conta
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className={card}>
              <p className="mb-3 text-sm font-semibold text-ink">Assinaturas</p>
              {data.subscriptions.length === 0 ? (
                <p className="text-sm text-ink/50">Nenhuma assinatura paga.</p>
              ) : (
                <ul className="space-y-2 text-sm">
                  {data.subscriptions.map((s: any) => (
                    <li key={s._id} className="flex items-center justify-between">
                      <span>{s.plan === 'yearly' ? 'Anual' : 'Mensal'} · {SUB_STATUS[s.status] || s.status}{s.cancelAtPeriodEnd ? ' (cancela no fim do período)' : ''}</span>
                      <a href={`https://dashboard.stripe.com/subscriptions/${s.stripeSubscriptionId}`} target="_blank" rel="noopener noreferrer" className="text-pequi-600 hover:underline">Abrir na Stripe</a>
                    </li>
                  ))}
                </ul>
              )}
              {u.stripeCustomerId && (
                <a href={`https://dashboard.stripe.com/customers/${u.stripeCustomerId}`} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm text-pequi-600 hover:underline">
                  Ver cliente na Stripe
                </a>
              )}
            </div>

            {data.logs.length > 0 && (
              <div className={card}>
                <p className="mb-3 text-sm font-semibold text-ink">Histórico administrativo</p>
                <ul className="space-y-2 text-sm">
                  {data.logs.map((l: any) => (
                    <li key={l._id} className="text-ink/70">
                      <span className="text-ink/40">{dateTime(l.createdAt)}</span> · {ACTION_LABEL[l.action] || l.action}
                      {l.details ? ` (${l.details})` : ''} · por {l.adminEmail}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}

/* --------------------------------- Assinaturas --------------------------------- */

function Subscriptions({ onOpenUser }: { onOpenUser: (id: string) => void }) {
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    setData(null);
    adminService.subscriptions({ status, page }).then(setData).catch((e) => toast.error(errorMessage(e, 'Não foi possível carregar as assinaturas.')));
  }, [status, page]);
  const pages = data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {[['', 'Todas'], ['active', 'Ativas'], ['past_due', 'Pagamento atrasado'], ['canceled', 'Canceladas']].map(([id, label]) => (
          <button key={id} type="button" onClick={() => { setStatus(id); setPage(1); }}
            className={`rounded-full border px-3.5 py-1.5 text-sm ${status === id ? 'border-pequi-500 bg-pequi-500 text-white' : 'border-castanha-200 bg-white text-ink/70'}`}>
            {label}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto rounded-[1.5rem] border border-castanha-200 bg-white">
        <table className="w-full min-w-[760px]">
          <thead className="border-b border-castanha-100">
            <tr>
              <th className={th}>Usuário</th>
              <th className={th}>Plano</th>
              <th className={th}>Situação</th>
              <th className={th}>Período atual</th>
              <th className={th}>Stripe</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-castanha-100">
            {!data && <tr><td colSpan={5}><Loading /></td></tr>}
            {data?.subscriptions.length === 0 && <tr><td colSpan={5} className="py-10 text-center text-sm text-ink/50">Nenhuma assinatura.</td></tr>}
            {data?.subscriptions.map((s: any) => (
              <tr key={s.id}>
                <td className={td}>
                  {s.user ? (
                    <button type="button" onClick={() => onOpenUser(s.user.id)} className="text-left hover:text-pequi-600">
                      <p className="font-medium text-ink">{s.user.name}</p>
                      <p className="text-ink/50">{s.user.email}</p>
                    </button>
                  ) : '—'}
                </td>
                <td className={td}>{s.plan === 'yearly' ? 'Anual' : 'Mensal'}</td>
                <td className={td}>{SUB_STATUS[s.status] || s.status}{s.cancelAtPeriodEnd && <p className="text-xs text-amber-700">Cancela no fim do período</p>}</td>
                <td className={td}>{date(s.currentPeriodStart)} a {date(s.currentPeriodEnd)}</td>
                <td className={td}>
                  <a href={`https://dashboard.stripe.com/subscriptions/${s.stripeSubscriptionId}`} target="_blank" rel="noopener noreferrer" className="text-pequi-600 hover:underline">Abrir</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data && data.total > data.pageSize && (
        <div className="flex justify-end gap-2 text-sm">
          <button type="button" disabled={page <= 1} onClick={() => setPage(page - 1)} className="rounded-lg border border-castanha-200 px-3 py-1 disabled:opacity-40">Anterior</button>
          <span className="py-1 text-ink/60">{page} de {pages}</span>
          <button type="button" disabled={page >= pages} onClick={() => setPage(page + 1)} className="rounded-lg border border-castanha-200 px-3 py-1 disabled:opacity-40">Próxima</button>
        </div>
      )}
    </div>
  );
}

/* --------------------------------- Faturamento --------------------------------- */

function Billing() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    adminService.billing().then(setData).catch((e) => setError(errorMessage(e, 'Não foi possível ler os dados da Stripe.')));
  }, []);
  if (error) return <div className={card}><p className="text-sm text-red-700">{error}</p></div>;
  if (!data) return <Loading />;
  if (!data.configured) {
    return (
      <div className={card}>
        <p className="text-sm text-ink/70">A Stripe não está configurada neste servidor (variável STRIPE_SECRET_KEY).</p>
      </div>
    );
  }
  const cur = data.currency;
  return (
    <div className="space-y-6">
      {data.livemode === false && (
        <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">A Stripe está em modo de teste: os valores abaixo não são cobranças reais.</p>
      )}
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Receita recorrente mensal" value={money(data.mrr, cur)} hint={`${data.activeMonthly} mensais · ${data.activeYearly} anuais (anual dividido por 12)`} />
        <Stat label="Recebido em 30 dias" value={money(data.received30, cur)} hint={`${data.received30Count} faturas pagas${data.received30More ? ' (mais de 100: valor parcial)' : ''}`} />
        <Stat
          label="Preços na Stripe"
          value={<span className="text-xl">{data.prices.monthly ? money(data.prices.monthly.amount, data.prices.monthly.currency) : '—'} <span className="text-sm text-ink/40">/mês</span></span>}
          hint={data.prices.yearly ? `Anual: ${money(data.prices.yearly.amount, data.prices.yearly.currency)}` : 'Anual não configurado'}
        />
      </div>
      <div className="overflow-x-auto rounded-[1.5rem] border border-castanha-200 bg-white">
        <table className="w-full min-w-[640px]">
          <thead className="border-b border-castanha-100">
            <tr>
              <th className={th}>Fatura</th>
              <th className={th}>Cliente</th>
              <th className={th}>Valor</th>
              <th className={th}>Situação</th>
              <th className={th}>Data</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-castanha-100">
            {data.invoices.length === 0 && <tr><td colSpan={5} className="py-10 text-center text-sm text-ink/50">Nenhuma fatura ainda.</td></tr>}
            {data.invoices.map((inv: any) => (
              <tr key={inv.id}>
                <td className={td}>{inv.url ? <a href={inv.url} target="_blank" rel="noopener noreferrer" className="text-pequi-600 hover:underline">{inv.number || inv.id}</a> : inv.number || inv.id}</td>
                <td className={td}>{inv.email || '—'}</td>
                <td className={td}>{money(inv.amount, inv.currency)}</td>
                <td className={td}>{({ paid: 'Paga', open: 'Em aberto', draft: 'Rascunho', void: 'Anulada', uncollectible: 'Incobrável' } as Record<string, string>)[inv.status] || inv.status}</td>
                <td className={td}>{date(inv.created)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-ink/50">
        Reembolsos, cancelamentos e alterações de cobrança são feitos no painel da Stripe (dashboard.stripe.com).
      </p>
    </div>
  );
}

/* ---------------------------------- Registro ---------------------------------- */

function Logs({ onOpenUser }: { onOpenUser: (id: string) => void }) {
  const [logs, setLogs] = useState<any[] | null>(null);
  useEffect(() => {
    adminService.logs().then((d) => setLogs(d.logs)).catch((e) => toast.error(errorMessage(e, 'Não foi possível carregar o registro.')));
  }, []);
  if (!logs) return <Loading />;
  if (logs.length === 0) return <div className={card}><p className="text-sm text-ink/50">Nenhuma ação administrativa registrada ainda.</p></div>;
  return (
    <div className={card}>
      <ul className="divide-y divide-castanha-100">
        {logs.map((l) => (
          <li key={l._id} className="flex flex-col gap-1 py-3 text-sm md:flex-row md:items-center md:justify-between">
            <span>
              <strong className="font-medium text-ink">{ACTION_LABEL[l.action] || l.action}</strong>
              {l.targetEmail && (
                <> · <button type="button" onClick={() => l.targetUserId && onOpenUser(l.targetUserId)} className="text-pequi-600 hover:underline">{l.targetEmail}</button></>
              )}
              {l.details && <span className="text-ink/50"> ({l.details})</span>}
            </span>
            <span className="text-xs text-ink/40">{dateTime(l.createdAt)} · por {l.adminEmail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ----------------------------------- Sistema ----------------------------------- */

const CONFIG_LABEL: Record<string, string> = {
  MONGO_URI: 'Banco de dados',
  JWT_SECRET: 'Chave de login',
  ADMIN_EMAIL: 'E-mail do administrador principal',
  GEMINI_API_KEY: 'IA Gemini',
  MARITACA_API_KEY: 'IA Maritaca',
  FRONTEND_URL: 'Endereço do site',
  STRIPE_SECRET_KEY: 'Stripe (pagamentos)',
  EMAIL_USER: 'Envio de e-mails',
  AWS_S3_BUCKET_NAME: 'Cofre: bucket',
  AWS_REGION: 'Cofre: região',
  AWS_ACCESS_KEY_ID: 'Cofre: chave de acesso',
  AWS_SECRET_ACCESS_KEY: 'Cofre: chave secreta',
};

function System() {
  const [health, setHealth] = useState<any>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    adminService.health().then(setHealth).catch(() => setError('O servidor não respondeu.'));
  }, []);
  if (error) return <div className={card}><p className="text-sm text-red-700">{error}</p></div>;
  if (!health) return <Loading />;
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Versão no ar" value={<span className="text-lg">{health.version}</span>} />
        <Stat label="Banco de dados" value={<span className={`text-lg ${health.database?.connected ? 'text-cerrado-700' : 'text-red-600'}`}>{health.database?.connected ? 'Conectado' : 'Desconectado'}</span>} hint={health.database?.lastError || undefined} />
        <Stat label="Node" value={<span className="text-lg">{health.node}</span>} hint={`Conferido em ${dateTime(health.timestamp)}`} />
      </div>
      <div className={card}>
        <p className="mb-3 text-sm font-semibold text-ink">Configurações do servidor</p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {Object.entries(health.config || {}).map(([key, ok]) => (
            <li key={key} className="flex items-center justify-between rounded-xl bg-castanha-25 px-3 py-2 text-sm">
              <span className="text-ink/70">{CONFIG_LABEL[key] || key}</span>
              <span className={ok ? 'text-cerrado-700' : 'text-red-600'}>{ok ? 'Configurada' : 'Faltando'}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-ink/50">Mostra só se cada variável existe, nunca o valor.</p>
      </div>
    </div>
  );
}

/* ------------------------------------ Página ------------------------------------ */

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>('overview');
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [openUser, setOpenUser] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Confere a permissão no servidor antes de mostrar qualquer aba
  useEffect(() => {
    adminService.overview().then(() => setAllowed(true)).catch(() => setAllowed(false));
  }, []);

  return (
    <DashboardLayout title="Administração">
      {allowed === null && <Loading />}
      {allowed === false && (
        <div className={`${card} mx-auto max-w-lg text-center`}>
          <p className="text-lg font-semibold text-ink">Acesso restrito</p>
          <p className="mt-2 text-sm text-ink/60">Esta área é só para administradores do Pequi.</p>
        </div>
      )}
      {allowed && (
        <div className="space-y-8">
          <nav className="flex flex-wrap gap-2 border-b border-castanha-200 pb-4" aria-label="Seções da administração">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                aria-current={tab === t.id ? 'page' : undefined}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${tab === t.id ? 'bg-ink text-white' : 'text-ink/60 hover:bg-castanha-100 hover:text-ink'}`}
              >
                {t.label}
              </button>
            ))}
          </nav>

          {tab === 'overview' && <Overview onOpenUser={setOpenUser} />}
          {tab === 'users' && <Users onOpenUser={setOpenUser} refreshKey={refreshKey} />}
          {tab === 'subscriptions' && <Subscriptions onOpenUser={setOpenUser} />}
          {tab === 'billing' && <Billing />}
          {tab === 'logs' && <Logs onOpenUser={setOpenUser} />}
          {tab === 'system' && <System />}
        </div>
      )}
      {openUser && <UserPanel id={openUser} onClose={() => setOpenUser(null)} onChanged={() => setRefreshKey((k) => k + 1)} />}
    </DashboardLayout>
  );
}
