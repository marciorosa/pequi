'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import { useTenant } from '../contexts/TenantContext';
import { useAuth } from '../contexts/AuthContext';
import { BrandLogo } from './PequiWordmark';
import Link from 'next/link';

export default function DashboardAwareLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  // A página de planos abre dentro do painel (menu, perfil e sair) para quem está logado
  const isDashboard = pathname?.startsWith('/dashboard') || (pathname === '/pricing' && isAuthenticated);
  const { tenant } = useTenant();

  // Chat embutido no site do escritório: só o conteúdo, sem menu nem rodapé
  if (pathname?.startsWith('/embed')) {
    return <main className="flex-grow">{children}</main>;
  }

  // Painel de um escritório (white-label): cabeçalho simples com a marca dele, sem o site do Pequi
  if (tenant && !isDashboard) {
    return (
      <>
        <header className="fixed inset-x-0 top-0 z-40 flex h-20 items-center border-b border-castanha-200 bg-white/80 px-6 backdrop-blur-xl">
          <Link href="/login" aria-label={tenant.name}>
            <BrandLogo className="h-8 w-auto" />
          </Link>
        </header>
        <main className="flex-grow pt-20">{children}</main>
        <footer className="py-6 text-center text-xs text-castanha-500">{tenant.name}</footer>
      </>
    );
  }

  return (
    <>
      {!isDashboard && <Navbar />}
      <main className={`flex-grow ${!isDashboard ? 'pt-20' : ''}`}>{children}</main>
      {!isDashboard && <Footer />}
    </>
  );
} 