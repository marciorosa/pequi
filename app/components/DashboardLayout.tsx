'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  actions?: React.ReactNode;
}

export default function DashboardLayout({ children, title, actions }: DashboardLayoutProps) {
  const [showSidebar, setShowSidebar] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const isActivePath = (path: string) => {
    if (path === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(path);
  };

  const MobileNavItem = ({ href, label, icon, exact = false }: { href: string; label: string; icon: React.ReactNode; exact?: boolean }) => {
    const active = exact ? pathname === href : isActivePath(href);
    return (
      <Link
        href={href}
        onClick={() => setShowSidebar(false)}
        className={`flex items-center px-4 py-3 rounded-2xl transition-all duration-300 ${active
          ? 'bg-cerrado-900 text-white shadow-lg'
          : 'text-foreground/60 hover:bg-cerrado-950/5 hover:text-foreground'
          }`}
      >
        <div className={`mr-3 ${active ? 'text-white' : 'text-foreground/30'}`}>
          {icon}
        </div>
        <span className="text-sm font-medium tracking-tight">
          {label}
        </span>
      </Link>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-castanha-25 text-foreground overflow-hidden font-sans">
      {/* Mobile Sidebar Overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-cerrado-950/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col w-72 bg-castanha-25 border-r border-castanha-200 transition-transform duration-300 md:hidden ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="h-24 flex items-center px-8 border-b border-castanha-200 mb-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center">
              <Image src="/logo/favicon.png" alt="Pequi" width={28} height={40} className="h-7 w-auto" />
            </div>
            <div className="flex flex-col">
              <span className="text-foreground font-bold text-[15px] tracking-tight leading-none uppercase">Pequi</span>
              <span className="text-[10px] font-bold text-foreground/20 uppercase tracking-[0.3em] mt-1">Enterprise</span>
            </div>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto px-6 space-y-6">
          <div>
            <p className="px-4 text-[10px] font-bold text-foreground/20 uppercase tracking-[0.4em] mb-4">Principal</p>
            <div className="space-y-1.5">
              <MobileNavItem href="/dashboard" label="Pesquisa" exact icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>} />
              <MobileNavItem href="/dashboard/chat" label="Canais" icon={<Image src="/landingpage/hero/channels.svg" alt="Canais" width={32} height={32} className="w-8 h-8" />} />
              <MobileNavItem href="/dashboard/lawyers" label="Assistentes" icon={<Image src="/landingpage/hero/ai-assistants.svg" alt="Assistentes" width={32} height={32} className="w-8 h-8" />} />
            </div>
          </div>

          <div>
            <p className="px-4 text-[10px] font-bold text-foreground/20 uppercase tracking-[0.4em] mb-4">Recursos</p>
            <div className="space-y-1.5">
              <MobileNavItem href="/dashboard/docs" label="Registro" icon={<Image src="/landingpage/hero/document-registory.svg" alt="Registro" width={32} height={32} className="w-8 h-8" />} />
              <MobileNavItem href="/dashboard/vault" label="Cofre" icon={<Image src="/landingpage/hero/vault-access.svg" alt="Cofre" width={32} height={32} className="w-8 h-8" />} />
              <MobileNavItem href="/dashboard/workflow-builder" label="Fluxos" icon={<Image src="/landingpage/hero/automation.svg" alt="Fluxos" width={32} height={32} className="w-8 h-8" />} />
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-castanha-200 space-y-4">
          <MobileNavItem href="/dashboard/billing" label="Assinatura" icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75-10.5h16.5a1.5 1.5 0 011.5 1.5v10.5a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5V5.25a1.5 1.5 0 011.5-1.5z" /></svg>} />
          <MobileNavItem href="/dashboard/help" label="Concierge" icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-red-500 font-medium text-sm hover:bg-red-50 rounded-2xl transition-all"
          >
            <div className="mr-3">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            </div>
            Encerrar sessão
          </button>
        </div>
      </aside>

      {/* Top Header */}
      <header className="h-24 bg-white/70 backdrop-blur-2xl border-b border-castanha-200 flex items-center justify-between px-4 md:px-12 sticky top-0 z-30 w-full">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowSidebar(true)}
            className="p-3 text-foreground/40 hover:text-foreground md:hidden border border-castanha-200 rounded-xl bg-white shadow-sm"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          
          <Link href="/" className="flex items-center gap-3 hidden sm:flex lg:mr-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center">
              <Image src="/logo/favicon.png" alt="Pequi" width={28} height={40} className="h-7 w-auto" />
            </div>
            <div className="flex flex-col hidden lg:flex">
              <span className="text-foreground font-bold text-[15px] tracking-tight leading-none uppercase">Pequi</span>
              <span className="text-[10px] font-bold text-foreground/20 uppercase tracking-[0.3em] mt-1">Enterprise</span>
            </div>
          </Link>

          <div className="h-8 w-px bg-castanha-200 hidden lg:block" />
          
          <div className="flex flex-col truncate">
            <span className="text-[10px] font-bold text-foreground/20 uppercase tracking-[0.4em] hidden sm:block">Intelligence.Core</span>
            <h1 className="text-lg md:text-2xl font-medium text-ink tracking-[-0.04em] leading-tight mt-1 truncate max-w-[200px] md:max-w-none">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <div className="hidden md:block">
            {actions}
          </div>
          <div className="h-8 w-px bg-castanha-200 mx-2 hidden md:block" />
          <Link 
            href="/dashboard/profile"
            className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center transition-all ${isActivePath('/dashboard/profile') ? 'btn-primary-gradient' : 'bg-white border border-castanha-200 text-foreground/20 shadow-sm hover:border-cerrado-900/20'}`}
          >
            <svg className={`w-6 h-6 md:w-7 md:h-7 ${isActivePath('/dashboard/profile') ? 'text-white' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Link>
          <button
            onClick={handleLogout}
            className="p-3 text-foreground/10 hover:text-red-500 transition-colors hidden md:block"
            title="Encerrar sessão"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          </button>
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-1 overflow-auto pb-32 md:pb-40">
        <div className="p-4 md:p-12 max-w-7xl mx-auto">
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000">
            {children}
          </div>
        </div>
      </main>

      {/* Floating Bottom Dock (Hidden on mobile, visible on iPad/md and up) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 hidden md:block">
        <nav className="bg-white/80 backdrop-blur-3xl border border-castanha-200 rounded-[2.5rem] p-2 flex items-center gap-1 shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
          <DockItem
            href="/dashboard"
            label="Pesquisa"
            exact
            icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
          />
          <DockItem
            href="/dashboard/chat"
            label="Canais"
            icon={<Image src="/landingpage/hero/channels.svg" alt="Canais" width={32} height={32} className="w-8 h-8" />}
          />
          <DockItem
            href="/dashboard/lawyers"
            label="Assistentes"
            icon={<Image src="/landingpage/hero/ai-assistants.svg" alt="Assistentes" width={32} height={32} className="w-8 h-8" />}
          />
          <div className="w-px h-8 bg-castanha-200 mx-1" />
          <DockItem
            href="/dashboard/docs"
            label="Registro"
            icon={<Image src="/landingpage/hero/document-registory.svg" alt="Registro" width={32} height={32} className="w-8 h-8" />}
          />
          <DockItem
            href="/dashboard/vault"
            label="Cofre"
            icon={<Image src="/landingpage/hero/vault-access.svg" alt="Cofre" width={32} height={32} className="w-8 h-8" />}
          />
          <DockItem
            href="/dashboard/workflow-builder"
            label="Fluxos"
            icon={<Image src="/landingpage/hero/automation.svg" alt="Fluxos" width={32} height={32} className="w-8 h-8" />}
          />
          <div className="w-px h-8 bg-castanha-200 mx-1" />
          <DockItem
            href="/dashboard/billing"
            label="Assinatura"
            icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75-10.5h16.5a1.5 1.5 0 011.5 1.5v10.5a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5V5.25a1.5 1.5 0 011.5-1.5z" /></svg>}
          />
          <DockItem
            href="/dashboard/help"
            label="Concierge"
            icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          />
        </nav>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}

function DockItem({ href, label, icon, exact = false }: { href: string; label: string; icon: React.ReactNode; exact?: boolean }) {
  const pathname = usePathname();
  const isActivePath = (path: string) => {
    if (path === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(path);
  };
  const active = exact ? pathname === href : isActivePath(href);

  return (
    <Link
      href={href}
      className={`relative flex flex-col items-center justify-center w-16 h-16 rounded-[2rem] transition-all duration-300 group ${active
        ? 'scale-110 -translate-y-2'
        : 'text-foreground/40 hover:bg-cerrado-950/5 hover:text-foreground hover:-translate-y-1'
        }`}
    >
      <div className="mb-0">
        {icon}
      </div>
      <span className={`absolute -bottom-8 px-2 py-1 bg-cerrado-900 text-white text-[9px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap z-50`}>
        {label}
      </span>
      {active && (
        <div className="absolute -bottom-1 w-1.5 h-1.5 bg-cerrado-900 rounded-full" />
      )}
    </Link>
  );
}
