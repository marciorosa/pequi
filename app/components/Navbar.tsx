'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import PequiWordmark from './PequiWordmark';

// Menu no formato do da Lucia. Os produtos ficam listados direto no menu,
// depois de "Empresa" (sem a lista suspensa "Produtos"). "Segurança" saiu do
// menu e continua no rodapé.
const navLinks = [
  { label: 'Empresa', href: '/company' },
  { label: 'Assistentes de IA', href: '/assistant' },
  { label: 'Acesso ao Cofre', href: '/vault' },
  { label: 'Base de Conhecimento', href: '/knowledge' },
  { label: 'Automações', href: '/workflows' },
];

const ArrowUpRightIcon = ({ className = '' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M8 7h9v9" />
  </svg>
);

const ArrowIcon = ({ className = '' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
  </svg>
);

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  const isLandingPage = pathname === '/' || pathname === '' || pathname === null;
  const isActive = (href: string) => pathname === href || (pathname?.startsWith(`${href}/`) ?? false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinkClass = (active: boolean) =>
    `relative inline-flex h-9 items-center whitespace-nowrap rounded-full px-3.5 transition-colors duration-200 ${
      active
        ? 'bg-white text-ink shadow-[0_0_0_1px_var(--castanha-200)]'
        : 'text-castanha-600 hover:bg-pequi-500/10 hover:text-pequi-600'
    }`;

  return (
    <nav className={`fixed left-0 right-0 top-0 z-50 px-3 sm:px-6 transition-[padding] duration-300 ${scrolled ? 'pt-2' : 'pt-3 sm:pt-4'}`}>
      <div className="landing-gilroy relative mx-auto w-full max-w-6xl">
        <div
          className={`relative flex h-[68px] items-center justify-between gap-3 rounded-[1.7rem] border px-4 backdrop-blur-xl transition-all duration-300 sm:px-5 ${
            scrolled
              ? 'border-castanha-200 bg-white/95 shadow-[0_12px_32px_rgba(36,37,33,0.08)]'
              : 'border-castanha-200/80 bg-white/90 shadow-[0_8px_35px_rgba(36,37,33,0.04)]'
          }`}
        >
          <Link
            href={isLandingPage ? '/#hero' : '/'}
            aria-label="Página inicial do Pequi"
            className="flex shrink-0 items-center"
          >
            <PequiWordmark />
          </Link>

          <div className="hidden items-center gap-0.5 rounded-full bg-castanha-50 px-1.5 py-1 text-[0.9rem] font-medium xl:flex">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href} className={navLinkClass(isActive(item.href))}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden shrink-0 items-center gap-1 xl:flex">
            {!isLoading && (
              <Link
                href={isAuthenticated ? '/dashboard' : '/login'}
                className="inline-flex h-10 items-center justify-center rounded-full px-4 text-[0.9rem] font-medium text-castanha-600 transition hover:bg-castanha-100 hover:text-ink"
              >
                {isAuthenticated ? 'Painel' : 'Entrar'}
              </Link>
            )}
            <Link
              href="/contact"
              className="landing-primary-btn group/demo inline-flex h-10 items-center justify-center gap-2 px-4"
            >
              Fale conosco
              <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-200 group-hover/demo:-translate-y-0.5 group-hover/demo:translate-x-0.5" />
            </Link>
          </div>

          <div className="flex items-center xl:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={mobileMenuOpen}
              className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors focus:outline-none ${
                mobileMenuOpen ? 'bg-castanha-100 text-ink' : 'text-castanha-600 hover:bg-castanha-100 hover:text-ink'
              }`}
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 7h16M4 12h16M4 17h10" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="animate-fadeIn absolute left-0 right-0 top-full mt-2 max-h-[calc(100vh-5rem)] overflow-y-auto rounded-3xl border border-castanha-150 bg-white p-3 shadow-[0_24px_60px_rgba(36,37,33,0.14)] xl:hidden">
            <div className="flex flex-col">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-2xl px-3 py-3 transition-colors ${
                    isActive(item.href) ? 'bg-castanha-100 font-medium text-ink' : 'text-ink/85 hover:bg-castanha-50 hover:text-ink'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <div className="mt-2 flex flex-col gap-2 border-t border-castanha-150 px-1 pt-3 sm:flex-row">
                <Link
                  href={isAuthenticated ? '/dashboard' : '/login'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-castanha-200 px-5 text-sm font-medium text-ink transition-colors hover:bg-castanha-50"
                >
                  {isAuthenticated ? 'Painel' : 'Entrar'}
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="landing-primary-btn inline-flex h-11 flex-1 items-center justify-center gap-2 px-6"
                >
                  Fale conosco
                  <ArrowIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
