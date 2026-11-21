'use client';

/**
 * Administração do escritório (white-label). Acesso: conta do e-mail cadastrado
 * como responsável pelo admin do Pequi (e equipe do escritório).
 * Mostra a assinatura do escritório no Pequi, os usuários do escritório e os contatos do widget.
 * Marca e domínios são definidos pelo admin do Pequi.
 */
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import DashboardLayout from '../../components/DashboardLayout';
import { officeService } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { LeadsList, ClientsList, PequiSubscriptionBadge, pequiSubscriptionLabel, card, errorMessage, btnPrimary, btnSoft } from '../../components/office/OfficeBlocks';
import Link from 'next/link';

type Section = 'clients' | 'leads';

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

  const loadLeads = useCallback(() => officeService.leads(), []);
  const loadClients = useCallback(() => officeService.clients(), []);

  const sections: Array<{ id: Section; label: string }> = [
    { id: 'clients', label: 'Usuários' },
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
              Painel: <a className="underline" href={data.panelUrl} target="_blank" rel="noreferrer">{data.panelUrl}</a>
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border border-castanha-200 bg-castanha-25 p-4">
              <div className="flex-1">
                <p className="text-sm font-medium text-ink">Assinatura do escritório no Pequi</p>
                <p className="text-xs text-ink/60">Pro por R$ 399/mês ou R$ 3.999/ano, ou Enterprise sob consulta. Com a assinatura ativa, seus clientes usam a assistente dentro do plano do escritório, sem pagar nada.</p>
              </div>
              <PequiSubscriptionBadge sub={data.pequiSubscription} />
              {isOwner && (
                <Link href="/dashboard/billing" className={pequiSubscriptionLabel(data.pequiSubscription).ok ? btnSoft : btnPrimary}>
                  {pequiSubscriptionLabel(data.pequiSubscription).ok ? 'Gerenciar assinatura' : 'Assinar o Pequi'}
                </Link>
              )}
            </div>
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
          {section === 'leads' && <LeadsList load={loadLeads} />}
        </div>
      )}
    </DashboardLayout>
  );
}
