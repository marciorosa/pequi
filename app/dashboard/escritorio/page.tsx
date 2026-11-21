'use client';

/**
 * Área do escritório (white-label): o responsável cadastra os planos que vende aos clientes,
 * conecta o Stripe para receber e vê os contatos deixados no widget do site.
 * Marca, domínios e comissão são definidos pelo admin do Pequi.
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import DashboardLayout from '../../components/DashboardLayout';
import { officeService } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { PlansEditor, LeadsList, StripeConnectCard, card, errorMessage } from '../../components/office/OfficeBlocks';

export default function OfficePage() {
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [denied, setDenied] = useState(false);
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

  const plansApi = useMemo(
    () => ({ list: officeService.plans, create: officeService.createPlan, update: officeService.updatePlan }),
    []
  );
  const stripeApi = useMemo(
    () => ({ onboard: officeService.stripeOnboard, refresh: officeService.stripeRefresh, dashboard: officeService.stripeDashboard }),
    []
  );
  const loadLeads = useCallback(() => officeService.leads(), []);

  return (
    <DashboardLayout title="Escritório">
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
          {isOwner && (
            <StripeConnectCard
              stripe={data.stripe}
              api={stripeApi}
              returnUrl={`${window.location.origin}/dashboard/escritorio`}
              onChange={(s) => setData({ ...data, stripe: s })}
            />
          )}
          <PlansEditor api={plansApi} canEdit={isOwner} commissionPercent={data.commissionPercent} />
          <LeadsList load={loadLeads} />
        </div>
      )}
    </DashboardLayout>
  );
}
