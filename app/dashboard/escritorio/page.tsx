'use client';

/**
 * Administração do escritório (white-label). Acesso: conta do e-mail cadastrado
 * como responsável pelo admin do Pequi (e equipe do escritório).
 * Mostra os usuários e planos contratados, os valores (pago pelos clientes, comissão do
 * Pequi, já repassado e a receber), os planos que o escritório vende e os contatos do widget.
 * Marca, domínios e comissão são definidos pelo admin do Pequi.
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import DashboardLayout from '../../components/DashboardLayout';
import { officeService } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { PlansEditor, LeadsList, ClientsList, FinancePanel, card, errorMessage } from '../../components/office/OfficeBlocks';

type Section = 'clients' | 'finance' | 'plans' | 'leads';

export default function OfficePage() {
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [denied, setDenied] = useState(false);
  const [section, setSection] = useState<Section>('clients');
  const isOwner = (user as any)?.tenantRole === 'owner';

  useEffect(() => {
    officeService
      .summary()
      .then((d) => setData(d.tenant))
      .catch((e) => {
        setDenied(true);
        if (e?.response?.status !== 403) toast.error(errorMessage(e, 'Não foi possível carregar o escritório.'));
      });
  }, []);

  const plansApi = useMemo(() => ({ list: officeService.plans, create: officeService.createPlan, update: officeService.updatePlan }), []);
  const loadLeads = useCallback(() => officeService.leads(), []);
  const loadClients = useCallback(() => officeService.clients(), []);
  const loadFinance = useCallback(() => officeService.finance(), []);

  const sections: Array<{ id: Section; label: string }> = [
    { id: 'clients', label: 'Usuários e planos' },
    ...(isOwner ? [{ id: 'finance' as Section, label: 'Valores e comissão' }] : []),
    { id: 'plans', label: 'Planos à venda' },
    { id: 'leads', label: 'Contatos do widget' },
  ];

  return (
    <DashboardLayout title="Administração do escritório">
      {denied && (
        <div className={`${card} mx-auto max-w-lg text-center`}>
          <p className="text-lg font-semibold text-ink">Área da equipe do escritório</p>
          <p className="mt-2 text-sm text-ink/60">Esta conta não faz parte da equipe de um escritório.</p>
        </div>
      )}
      {!denied && !data && <p className="py-10 text-center text-sm text-ink/50">Carregando…</p>}
      {data && (
        <div className="space-y-6">
          <div className={card}>
            <p className="text-lg font-semibold text-ink">{data.name}</p>
            <p className="mt-1 text-sm text-ink/60">
              Painel: <a className="underline" href={data.panelUrl} target="_blank" rel="noreferrer">{data.panelUrl}</a> · comissão do Pequi:{' '}
              {data.commissionPercent}% · plano Pequi: {data.pequiPlan === 'enterprise' ? 'Enterprise' : 'Pro'}
            </p>
            <p className="mt-1 text-xs text-ink/50">Para trocar logo, cores, sites autorizados ou o código do widget, fale com o suporte do Pequi.</p>
          </div>

          <nav className="flex flex-wrap gap-2 border-b border-castanha-200 pb-4" aria-label="Seções do escritório">
            {sections.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSection(s.id)}
                aria-current={section === s.id ? 'page' : undefined}
                className={`rounded-xl px-4 py-2 text-sm font-medium ${section === s.id ? 'bg-ink text-white' : 'text-ink/60 hover:bg-castanha-100 hover:text-ink'}`}
              >
                {s.label}
              </button>
            ))}
          </nav>

          {section === 'clients' && <ClientsList load={loadClients} />}
          {section === 'finance' && isOwner && <FinancePanel load={loadFinance} />}
          {section === 'plans' && <PlansEditor api={plansApi} canEdit={isOwner} commissionPercent={data.commissionPercent} />}
          {section === 'leads' && <LeadsList load={loadLeads} />}
        </div>
      )}
    </DashboardLayout>
  );
}
