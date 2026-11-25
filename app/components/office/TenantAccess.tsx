'use client';

/**
 * /pricing no painel de um escritório (white-label), para os clientes dele.
 * O cliente não assina nada: o acesso à assistente é oferecido pelo escritório,
 * dentro do plano que o escritório tem no Pequi.
 */
import Link from 'next/link';
import { useTenant } from '../../contexts/TenantContext';
import { useAuth } from '../../contexts/AuthContext';

export default function TenantAccess() {
  const { tenant } = useTenant();
  const { isAuthenticated } = useAuth();
  if (!tenant) return null;
  const btn = 'rounded-xl bg-pequi-500 px-5 py-2.5 text-sm font-semibold';
  return (
    <div className="mx-auto max-w-2xl px-6 py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pequi-600">{tenant.name}</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink">Seu acesso à assistente jurídica</h1>
      <p className="mt-3 text-sm leading-relaxed text-castanha-600">
        O acesso é oferecido por {tenant.name}, sem custo para você. Use o chat, os agentes por área, os documentos e o cofre
        dentro dos limites do plano do escritório. Para tratar do seu caso, fale com a equipe do escritório.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        {isAuthenticated ? (
          <Link href="/dashboard/chat" className={btn} style={{ color: 'var(--pq-on-brand)' }}>Ir para o chat</Link>
        ) : (
          <>
            <Link href="/signup" className={btn} style={{ color: 'var(--pq-on-brand)' }}>Criar conta</Link>
            <Link href="/login" className="rounded-xl border border-castanha-200 bg-white px-5 py-2.5 text-sm font-semibold text-ink">Entrar</Link>
          </>
        )}
      </div>
    </div>
  );
}
