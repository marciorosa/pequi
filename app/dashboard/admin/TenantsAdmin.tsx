'use client';

/**
 * Admin do Pequi · Escritórios (white-label): cadastro, marca, domínios autorizados,
 * widget e código do snippet, comissão, Stripe Connect, planos do escritório e contatos.
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import { adminService } from '../../services/api';
import { brandScale } from '../../contexts/TenantContext';
import {
  PlansEditor,
  LeadsList,
  ClientsList,
  FinancePanel,
  card,
  inputCls,
  labelCls,
  btnPrimary,
  btnSoft,
  errorMessage,
} from '../../components/office/OfficeBlocks';

const API_URL = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');

type Form = {
  name: string;
  slug: string;
  status: 'active' | 'suspended';
  pequiPlan: 'pro' | 'enterprise';
  ownerEmail: string;
  commissionPercent: string;
  displayName: string;
  logoUrl: string;
  faviconUrl: string;
  primaryColor: string;
  inkColor: string;
  welcomeMessage: string;
  widgetPosition: 'right' | 'left';
  panelDomains: string;
  widgetOrigins: string;
  widgetEnabled: boolean;
  freeMessages: string;
  leadMessages: string;
  rateLimitPerMinute: string;
  dailyMessageCap: string;
};

const emptyForm = (): Form => ({
  name: '',
  slug: '',
  status: 'active',
  pequiPlan: 'pro',
  ownerEmail: '',
  commissionPercent: '15',
  displayName: '',
  logoUrl: '',
  faviconUrl: '',
  primaryColor: '#1F4E79',
  inkColor: '#1E2430',
  welcomeMessage: 'Olá! Sou a assistente virtual do escritório. Conte o que aconteceu e eu explico seus direitos.',
  widgetPosition: 'right',
  panelDomains: '',
  widgetOrigins: '',
  widgetEnabled: true,
  freeMessages: '3',
  leadMessages: '10',
  rateLimitPerMinute: '20',
  dailyMessageCap: '2000',
});

const toForm = (t: any): Form => ({
  name: t.name,
  slug: t.slug,
  status: t.status,
  pequiPlan: t.pequiPlan,
  ownerEmail: t.owner?.email || '',
  commissionPercent: String(t.commissionPercent ?? 15),
  displayName: t.branding?.displayName || '',
  logoUrl: t.branding?.logoUrl || '',
  faviconUrl: t.branding?.faviconUrl || '',
  primaryColor: t.branding?.primaryColor || '#FA5A50',
  inkColor: t.branding?.inkColor || '#242521',
  welcomeMessage: t.branding?.welcomeMessage || '',
  widgetPosition: t.branding?.widgetPosition || 'right',
  panelDomains: (t.domains?.panelDomains || []).join('\n'),
  widgetOrigins: (t.domains?.widgetOrigins || []).join('\n'),
  widgetEnabled: t.widget?.enabled !== false,
  freeMessages: String(t.widget?.freeMessages ?? 3),
  leadMessages: String(t.widget?.leadMessages ?? 10),
  rateLimitPerMinute: String(t.widget?.rateLimitPerMinute ?? 20),
  dailyMessageCap: String(t.widget?.dailyMessageCap ?? 2000),
});

const toBody = (f: Form) => ({
  name: f.name,
  slug: f.slug,
  status: f.status,
  pequiPlan: f.pequiPlan,
  ownerEmail: f.ownerEmail,
  commissionPercent: Number(String(f.commissionPercent).replace(',', '.')),
  branding: {
    displayName: f.displayName || f.name,
    logoUrl: f.logoUrl,
    faviconUrl: f.faviconUrl,
    primaryColor: f.primaryColor,
    inkColor: f.inkColor,
    welcomeMessage: f.welcomeMessage,
    widgetPosition: f.widgetPosition,
  },
  domains: { panelDomains: f.panelDomains, widgetOrigins: f.widgetOrigins },
  widget: {
    enabled: f.widgetEnabled,
    freeMessages: f.freeMessages,
    leadMessages: f.leadMessages,
    rateLimitPerMinute: f.rateLimitPerMinute,
    dailyMessageCap: f.dailyMessageCap,
  },
});

/** Lê um arquivo de imagem pequeno como data URL (até 200 KB) */
const readImage = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    if (file.size > 500 * 1024) return reject(new Error('A imagem passa de 500 KB. Use um arquivo menor ou um endereço https://.'));
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = () => reject(new Error('Não foi possível ler a imagem.'));
    r.readAsDataURL(file);
  });

export const snippetFor = (key: string, name: string) => {
  const front = typeof window !== 'undefined' ? window.location.origin : 'https://pequi.me';
  return `<!-- Atendimento ${name} (Pequi) -->\n<script src="${front}/widget.js" data-key="${key}" data-api="${API_URL}" async></script>`;
};

/* ------------------------------------ lista ------------------------------------ */

export default function TenantsAdmin({ initialTenantId }: { initialTenantId?: string | null }) {
  const [tenants, setTenants] = useState<any[] | null>(null);
  const [open, setOpen] = useState<string | 'new' | null>(initialTenantId || null);

  const load = useCallback(() => {
    adminService.tenants().then((d) => setTenants(d.tenants)).catch((e) => toast.error(errorMessage(e, 'Não foi possível carregar os escritórios.')));
  }, []);
  useEffect(load, [load]);

  if (open) {
    return <TenantEditor id={open} onBack={() => { setOpen(null); load(); }} onCreated={(id) => setOpen(id)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-lg font-semibold text-ink">Escritórios (white-label)</p>
          <p className="text-sm text-ink/60">Cada escritório usa o Pequi com a própria marca e oferece o chat no site dele.</p>
        </div>
        <button type="button" className={btnPrimary} onClick={() => setOpen('new')}>Novo escritório</button>
      </div>
      <div className={`${card} overflow-x-auto p-0`}>
        {!tenants && <p className="p-6 text-sm text-ink/50">Carregando…</p>}
        {tenants && tenants.length === 0 && <p className="p-6 text-sm text-ink/50">Nenhum escritório cadastrado.</p>}
        {tenants && tenants.length > 0 && (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.2em] text-castanha-400">
                <th className="px-4 py-3">Escritório</th>
                <th className="px-4 py-3">Situação</th>
                <th className="px-4 py-3">Comissão</th>
                <th className="px-4 py-3">Contas</th>
                <th className="px-4 py-3">Assinaturas</th>
                <th className="px-4 py-3">Contatos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-castanha-100">
              {tenants.map((t) => (
                <tr key={t._id} className="cursor-pointer hover:bg-castanha-25" onClick={() => setOpen(t._id)}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="h-6 w-6 shrink-0 rounded-full border border-castanha-200" style={{ background: t.primaryColor }} />
                      <div>
                        <p className="font-medium text-ink">{t.name}</p>
                        <p className="text-xs text-ink/50">{t.slug} · {t.widgetOrigins.length} site(s) autorizado(s)</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{t.status === 'active' ? 'Ativo' : 'Suspenso'}</td>
                  <td className="px-4 py-3">{t.commissionPercent}%</td>
                  <td className="px-4 py-3">{t.users}</td>
                  <td className="px-4 py-3">{t.activeSubscriptions}</td>
                  <td className="px-4 py-3">{t.leads}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------ edição ------------------------------------ */

function TenantEditor({ id, onBack, onCreated }: { id: string | 'new'; onBack: () => void; onCreated: (id: string) => void }) {
  const isNew = id === 'new';
  const [tenant, setTenant] = useState<any>(null);
  const [form, setForm] = useState<Form>(emptyForm());
  const [saving, setSaving] = useState(false);
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [section, setSection] = useState<'config' | 'clients' | 'finance' | 'plans' | 'leads'>('config');

  useEffect(() => {
    if (isNew) return;
    adminService
      .tenant(id)
      .then((d) => {
        setTenant(d.tenant);
        setForm(toForm(d.tenant));
      })
      .catch((e) => toast.error(errorMessage(e, 'Não foi possível carregar o escritório.')));
  }, [id, isNew]);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    setSaving(true);
    try {
      if (isNew) {
        const d = await adminService.createTenant(toBody(form));
        toast.success('Escritório cadastrado.');
        if (d.inviteLink) sessionStorage.setItem(`pq_invite_${d.tenant._id}`, d.inviteLink);
        onCreated(d.tenant._id);
      } else {
        const d = await adminService.updateTenant(id, toBody(form));
        setTenant(d.tenant);
        setForm(toForm(d.tenant));
        if (d.inviteLink) setInviteLink(d.inviteLink);
        toast.success('Alterações salvas.');
      }
    } catch (e) {
      toast.error(errorMessage(e, 'Não foi possível salvar.'));
    } finally {
      setSaving(false);
    }
  };

  const plansApi = useMemo(
    () => ({
      list: () => adminService.tenantPlans(id),
      create: (b: any) => adminService.createTenantPlan(id, b),
      update: (planId: string, b: any) => adminService.updateTenantPlan(id, planId, b),
    }),
    [id]
  );
  const loadClients = useCallback(() => adminService.tenantClients(id), [id]);
  const loadFinance = useCallback(() => adminService.tenantFinance(id), [id]);
  const payout = useCallback((b: any) => adminService.createTenantPayout(id, b), [id]);
  const loadLeads = useCallback(() => adminService.tenantLeads(id), [id]);

  useEffect(() => {
    if (isNew) return;
    const saved = sessionStorage.getItem(`pq_invite_${id}`);
    if (saved) {
      setInviteLink(saved);
      sessionStorage.removeItem(`pq_invite_${id}`);
    }
  }, [id, isNew]);

  if (!isNew && !tenant) return <p className="py-10 text-center text-sm text-ink/50">Carregando…</p>;

  const snippet = tenant ? snippetFor(tenant.widget.publicKey, tenant.branding?.displayName || tenant.name) : '';
  const scale = /^#[0-9a-fA-F]{6}$/.test(form.primaryColor) ? brandScale(form.primaryColor) : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <button type="button" onClick={onBack} className="text-sm text-ink/60 hover:text-ink">← Escritórios</button>
          <p className="mt-1 text-lg font-semibold text-ink">{isNew ? 'Novo escritório' : tenant.name}</p>
          {!isNew && (
            <p className="text-xs text-ink/50">
              Painel: <a className="underline" href={`${tenant.panelUrl}`} target="_blank" rel="noreferrer">{tenant.panelUrl}</a> · teste sem domínio:{' '}
              <a className="underline" href={`/login?tenant=${tenant.slug}`} target="_blank" rel="noreferrer">/login?tenant={tenant.slug}</a>
            </p>
          )}
        </div>
        {!isNew && (
          <nav className="flex gap-2">
            {(['config', 'clients', 'finance', 'plans', 'leads'] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSection(s)}
                className={`rounded-xl px-3 py-1.5 text-sm ${section === s ? 'bg-ink text-white' : 'text-ink/60 hover:bg-castanha-100'}`}
              >
                {{ config: 'Configuração', clients: 'Usuários e planos', finance: 'Valores e repasses', plans: 'Planos à venda', leads: 'Contatos' }[s]}
              </button>
            ))}
          </nav>
        )}
      </div>

      {inviteLink && (
        <div className="rounded-2xl border border-pequi-200 bg-pequi-50 p-4 text-sm">
          <p className="font-medium text-ink">Conta do responsável criada.</p>
          <p className="mt-1 text-ink/70">
            Enviamos por e-mail o link para definir a senha (vale por 7 dias). Se o e-mail não chegar, envie este link à pessoa:
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <code className="break-all rounded-lg bg-white px-2 py-1 text-[11px]">{inviteLink}</code>
            <button type="button" className={btnSoft} onClick={() => navigator.clipboard.writeText(inviteLink).then(() => toast.success('Link copiado.'))}>
              Copiar link
            </button>
          </div>
        </div>
      )}

      {section === 'plans' && !isNew && <PlansEditor api={plansApi} commissionPercent={tenant.commissionPercent} />}
      {section === 'clients' && !isNew && <ClientsList load={loadClients} />}
      {section === 'finance' && !isNew && <FinancePanel load={loadFinance} onPayout={payout} />}

      {section === 'leads' && !isNew && <LeadsList load={loadLeads} />}

      {section === 'config' && (
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <div className={card}>
              <p className="mb-4 text-sm font-semibold text-ink">Escritório</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>Nome</label>
                  <input className={inputCls} value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Silva & Associados" />
                </div>
                <div>
                  <label className={labelCls}>Identificador (slug)</label>
                  <input className={inputCls} value={form.slug} onChange={(e) => set('slug', e.target.value.toLowerCase())} placeholder="silva-associados" />
                  <p className="mt-1 text-[11px] text-ink/50">Vira o endereço {form.slug || 'slug'}.pequi.me</p>
                </div>
                <div>
                  <label className={labelCls}>E-mail do responsável (acesso à administração do escritório)</label>
                  <input className={inputCls} type="email" value={form.ownerEmail} onChange={(e) => set('ownerEmail', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Plano Pequi</label>
                    <select className={inputCls} value={form.pequiPlan} onChange={(e) => set('pequiPlan', e.target.value as any)}>
                      <option value="pro">Pro</option>
                      <option value="enterprise">Enterprise</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Situação</label>
                    <select className={inputCls} value={form.status} onChange={(e) => set('status', e.target.value as any)}>
                      <option value="active">Ativo</option>
                      <option value="suspended">Suspenso</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className={card}>
              <p className="mb-4 text-sm font-semibold text-ink">Marca</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>Nome exibido</label>
                  <input className={inputCls} value={form.displayName} onChange={(e) => set('displayName', e.target.value)} placeholder={form.name} />
                </div>
                <div>
                  <label className={labelCls}>Posição do botão no site</label>
                  <select className={inputCls} value={form.widgetPosition} onChange={(e) => set('widgetPosition', e.target.value as any)}>
                    <option value="right">Canto direito</option>
                    <option value="left">Canto esquerdo</option>
                  </select>
                </div>
                <ColorField label="Cor principal" value={form.primaryColor} onChange={(v) => set('primaryColor', v)} />
                <ColorField label="Cor do texto" value={form.inkColor} onChange={(v) => set('inkColor', v)} />
                <ImageField label="Logo" value={form.logoUrl} onChange={(v) => set('logoUrl', v)} />
                <ImageField label="Ícone da aba (favicon)" value={form.faviconUrl} onChange={(v) => set('faviconUrl', v)} />
                <div className="sm:col-span-2">
                  <label className={labelCls}>Mensagem de boas-vindas do chat</label>
                  <textarea className={inputCls} rows={2} maxLength={300} value={form.welcomeMessage} onChange={(e) => set('welcomeMessage', e.target.value)} />
                </div>
              </div>
            </div>

            <div className={card}>
              <p className="mb-1 text-sm font-semibold text-ink">Domínios autorizados</p>
              <p className="mb-4 text-xs text-ink/50">Um por linha. O widget só abre nos sites listados.</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>Sites que podem usar o widget (origens)</label>
                  <textarea className={inputCls} rows={4} value={form.widgetOrigins} onChange={(e) => set('widgetOrigins', e.target.value)} placeholder={'https://silvaadvogados.com.br\nhttps://www.silvaadvogados.com.br'} />
                  <p className="mt-1 text-[11px] text-ink/50">Com https:// e sem caminho. Para testar no computador: http://localhost:8080</p>
                </div>
                <div>
                  <label className={labelCls}>Domínio próprio do painel (opcional)</label>
                  <textarea className={inputCls} rows={4} value={form.panelDomains} onChange={(e) => set('panelDomains', e.target.value)} placeholder="ia.silvaadvogados.com.br" />
                  <p className="mt-1 text-[11px] text-ink/50">O escritório aponta um CNAME para o Pequi e o domínio é adicionado na hospedagem.</p>
                </div>
              </div>
            </div>

            <div className={card}>
              <p className="mb-4 text-sm font-semibold text-ink">Widget e comissão</p>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label className={labelCls}>Comissão do Pequi (%)</label>
                  <input className={inputCls} inputMode="decimal" value={form.commissionPercent} onChange={(e) => set('commissionPercent', e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Mensagens grátis antes do contato</label>
                  <input className={inputCls} inputMode="numeric" value={form.freeMessages} onChange={(e) => set('freeMessages', e.target.value.replace(/\D/g, ''))} />
                </div>
                <div>
                  <label className={labelCls}>Mensagens após o contato</label>
                  <input className={inputCls} inputMode="numeric" value={form.leadMessages} onChange={(e) => set('leadMessages', e.target.value.replace(/\D/g, ''))} />
                </div>
                <div>
                  <label className={labelCls}>Limite por minuto (por IP)</label>
                  <input className={inputCls} inputMode="numeric" value={form.rateLimitPerMinute} onChange={(e) => set('rateLimitPerMinute', e.target.value.replace(/\D/g, ''))} />
                </div>
                <div>
                  <label className={labelCls}>Limite de mensagens por dia</label>
                  <input className={inputCls} inputMode="numeric" value={form.dailyMessageCap} onChange={(e) => set('dailyMessageCap', e.target.value.replace(/\D/g, ''))} />
                </div>
                <label className="mt-6 flex items-center gap-2 text-sm text-ink/70">
                  <input type="checkbox" checked={form.widgetEnabled} onChange={(e) => set('widgetEnabled', e.target.checked)} />
                  Widget ativo
                </label>
              </div>
              {!isNew && Number(form.commissionPercent) !== tenant.commissionPercent && (
                <p className="mt-3 text-xs text-amber-700">Salve para valer nas novas assinaturas.</p>
              )}
              {!isNew && (
                <button
                  type="button"
                  className={`${btnSoft} mt-4`}
                  onClick={async () => {
                    try {
                      const r = await adminService.applyTenantCommission(id);
                      toast.success(`Comissão de ${tenant.commissionPercent}% aplicada a ${r.updated} de ${r.total} assinatura(s) ativa(s).`);
                      if (r.errors?.length) toast.error(r.errors[0]);
                    } catch (e) {
                      toast.error(errorMessage(e, 'Não foi possível aplicar a comissão.'));
                    }
                  }}
                >
                  Aplicar a comissão salva às assinaturas ativas
                </button>
              )}
            </div>

            <div className="flex gap-2">
              <button type="button" className={btnPrimary} disabled={saving} onClick={save}>
                {saving ? 'Salvando…' : isNew ? 'Cadastrar escritório' : 'Salvar alterações'}
              </button>
              <button type="button" className={btnSoft} onClick={onBack}>Voltar</button>
            </div>
          </div>

          <div className="space-y-6">
            <div className={card}>
              <p className="mb-3 text-sm font-semibold text-ink">Prévia</p>
              <div className="overflow-hidden rounded-2xl border border-castanha-200">
                <div className="flex items-center gap-2 px-3 py-2.5" style={{ background: form.primaryColor, color: '#fff' }}>
                  {form.logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={form.logoUrl} alt="" className="h-7 w-7 rounded-full bg-white object-contain p-0.5" />
                  ) : (
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/25 text-xs font-semibold">{(form.displayName || form.name || 'E').slice(0, 1)}</span>
                  )}
                  <span className="text-sm font-semibold">{form.displayName || form.name || 'Escritório'}</span>
                </div>
                <div className="space-y-2 bg-castanha-25 p-3 text-xs" style={{ color: form.inkColor }}>
                  <p className="rounded-xl border border-castanha-200 bg-white px-3 py-2">{form.welcomeMessage}</p>
                  <p className="ml-auto w-fit rounded-xl px-3 py-2 text-white" style={{ background: form.primaryColor }}>Fui demitido sem justa causa.</p>
                </div>
              </div>
              {scale && (
                <div className="mt-3 flex overflow-hidden rounded-lg">
                  {Object.entries(scale).map(([k, v]) => (
                    <span key={k} title={`${k}: ${v}`} className="h-5 flex-1" style={{ background: v }} />
                  ))}
                </div>
              )}
            </div>

            {!isNew && (
              <div className={card}>
                <p className="mb-1 text-sm font-semibold text-ink">Código do widget</p>
                <p className="mb-3 text-xs text-ink/60">Cole antes do &lt;/body&gt; nas páginas do site do escritório.</p>
                <pre className="whitespace-pre-wrap break-all rounded-xl bg-ink p-3 text-[11px] leading-relaxed text-white">{snippet}</pre>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    className={btnPrimary}
                    onClick={() => navigator.clipboard.writeText(snippet).then(() => toast.success('Código copiado.'))}
                  >
                    Copiar código
                  </button>
                  <button
                    type="button"
                    className={btnSoft}
                    onClick={async () => {
                      if (!window.confirm('Trocar a chave? O código antigo para de funcionar e o escritório terá de colar o novo.')) return;
                      try {
                        const d = await adminService.rotateTenantKey(id);
                        setTenant(d.tenant);
                        toast.success('Chave trocada.');
                      } catch (e) {
                        toast.error(errorMessage(e, 'Não foi possível trocar a chave.'));
                      }
                    }}
                  >
                    Trocar chave
                  </button>
                </div>
                <p className="mt-3 text-[11px] text-ink/50">
                  Se o site usar Content-Security-Policy, libere {typeof window !== 'undefined' ? window.location.origin : ''} em script-src e frame-src, e{' '}
                  {API_URL} em connect-src.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <div className="flex gap-2">
        <input type="color" aria-label={label} value={/^#[0-9a-fA-F]{6}$/.test(value) ? value : '#000000'} onChange={(e) => onChange(e.target.value.toUpperCase())} className="h-10 w-12 cursor-pointer rounded-lg border border-castanha-200 bg-white p-1" />
        <input className={inputCls} value={value} onChange={(e) => onChange(e.target.value)} placeholder="#RRGGBB" />
      </div>
    </div>
  );
}

function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <div className="flex gap-2">
        <input className={inputCls} value={value.startsWith('data:') ? 'Imagem enviada' : value} onChange={(e) => onChange(e.target.value)} placeholder="https://… ou envie um arquivo" readOnly={value.startsWith('data:')} />
        <label className={`${btnSoft} cursor-pointer whitespace-nowrap`}>
          Enviar
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml,image/x-icon"
            className="hidden"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              try {
                onChange(await readImage(f));
              } catch (err: any) {
                toast.error(err.message);
              }
            }}
          />
        </label>
        {value && (
          <button type="button" className={btnSoft} onClick={() => onChange('')} aria-label={`Remover ${label}`}>×</button>
        )}
      </div>
    </div>
  );
}
