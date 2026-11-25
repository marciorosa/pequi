'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import PequiWordmark from './PequiWordmark';

// Menu no estilo editorial (2026-11-24): barra larga e discreta, "Produtos"
// abre uma lista curta e numerada. Na página inicial a barra fica
// transparente sobre o topo escuro e ganha fundo creme ao rolar.
export const products = [
  { n: '01', label: 'Agentes', href: '/assistant' },
  { n: '02', label: 'Pesquisa jurídica', href: '/knowledge' },
  { n: '03', label: 'Automações', href: '/workflows' },
  { n: '04', label: 'Cofre de documentos', href: '/vault' },
  { n: '05', label: 'Assinatura eletrônica', href: '/workflows#assinatura' },
];

const links = [
  { label: 'Preços', href: '/pricing' },
  { label: 'Segurança', href: '/security' },
  { label: 'Fale conosco', href: '/contact' },
];

const Chevron = ({ open }: { open: boolean }) => (
  <svg className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
  </svg>
);

const ArrowUpRight = ({ className = 'h-3.5 w-3.5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M8 7h9v9" />
  </svg>
);

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isHome = pathname === '/' || !pathname;
  // Transparente com texto claro no topo das páginas com foto escura no topo
  // (início e preços; logado, a página de preços abre dentro do painel)
  const darkTop = isHome || (pathname === '/pricing' && !isAuthenticated);
  const overDark = darkTop && !scrolled && !mobileOpen;
  const isActive = (href: string) => pathname === href || (pathname?.startsWith(`${href}/`) ?? false);
  // Dois produtos podem levar à mesma página (Automações e Assinatura eletrônica
  // em /workflows); a âncora (#assinatura) decide qual dos dois fica marcado.
  const [hash, setHash] = useState('');
  const isProductActive = (href: string) => {
    const [path, anchor = ''] = href.split('#');
    if (!isActive(path)) return false;
    if (anchor) return hash === `#${anchor}`;
    const siblings = products.filter((o) => o.href !== href && o.href.split('#')[0] === path);
    return !siblings.some((o) => hash === `#${o.href.split('#')[1]}`);
  };
  const productActive = products.some((p) => isProductActive(p.href));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProductsOpen(false);
    setHash(window.location.hash);
  }, [pathname]);

  // O Next troca a âncora sem disparar hashchange; por isso o clique também atualiza
  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
    };
  }, []);
  const onProductClick = (href: string) => setHash(href.includes('#') ? `#${href.split('#')[1]}` : '');

  // Fecha a lista de produtos ao clicar fora ou apertar Esc
  useEffect(() => {
    if (!productsOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setProductsOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setProductsOpen(false);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [productsOpen]);

  // Hover como na referência: a cor não muda; o link sai de 90% para 100% e ganha sublinhado afastado
  const underline = 'underline decoration-1 underline-offset-[6px]';
  const text = `${overDark ? 'text-[#FFFDF6]' : 'text-ink'} opacity-90 hover:opacity-100 hover:underline decoration-1 underline-offset-[6px]`;
  const activeText = `${overDark ? 'text-[#FFFDF6]' : 'text-ink'} opacity-100`;

  return (
    <nav
      className={`landing-gilroy fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        overDark ? 'bg-transparent' : 'border-b border-ink/10 bg-[#FFFDF6]/95 backdrop-blur-xl'
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href={isHome ? '/#hero' : '/'} aria-label="Página inicial do Pequi" className="flex shrink-0 items-center">
          <PequiWordmark tone={overDark ? 'light' : 'ink'} />
        </Link>

        <div className="hidden items-center gap-7 text-[0.9rem] lg:flex">
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              aria-expanded={productsOpen}
              aria-haspopup="true"
              onClick={() => setProductsOpen((v) => !v)}
              className={`inline-flex items-center gap-1.5 transition-opacity ${productsOpen || productActive ? `${activeText} ${underline}` : text}`}
            >
              Produtos
              <Chevron open={productsOpen} />
            </button>

            {productsOpen && (
              <div className="animate-fadeIn absolute left-1/2 top-full mt-4 w-64 -translate-x-1/2 overflow-hidden rounded-2xl border border-ink/15 bg-[#FFFDF6] py-2 shadow-[0_18px_44px_rgba(21,24,22,0.16)]">
                {products.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    onClick={() => {
                      onProductClick(p.href);
                      setProductsOpen(false);
                    }}
                    className={`flex min-h-11 items-center gap-3 px-4 text-[0.9rem] font-medium text-ink transition-colors hover:bg-[#151816]/5 ${
                      isProductActive(p.href) ? 'bg-[#151816]/5' : ''
                    }`}
                  >
                    <span className="w-5 text-[0.72rem] tabular-nums text-ink/45">{p.n}</span>
                    <span>{p.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {links.map((l) => (
            <Link key={l.href} href={l.href} className={`transition-opacity ${isActive(l.href) ? `${activeText} ${underline}` : text}`}>
              {l.label}
            </Link>
          ))}

          {!isLoading && (
            <Link
              href={isAuthenticated ? '/dashboard' : '/login'}
              className={`inline-flex items-center gap-1.5 border-b pb-0.5 font-medium transition-colors ${
                overDark ? 'border-white/60 text-white hover:border-white' : 'border-ink/50 text-ink hover:border-ink'
              }`}
            >
              {isAuthenticated ? 'Painel' : 'Entrar'}
              <ArrowUpRight />
            </Link>
          )}
        </div>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={mobileOpen}
          className={`flex h-10 w-10 items-center justify-center rounded-xl lg:hidden ${overDark ? 'text-white' : 'text-ink'}`}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h10" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-ink/10 bg-[#FFFDF6] px-5 pb-6 pt-3 lg:hidden">
          <p className="px-1 pb-2 pt-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink/45">Produtos</p>
          {products.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              onClick={() => {
                onProductClick(p.href);
                setMobileOpen(false);
              }}
              className="flex items-baseline gap-4 rounded-xl px-1 py-2.5 text-ink"
            >
              <span className="w-5 text-[0.72rem] tabular-nums text-ink/40">{p.n}</span>
              {p.label}
            </Link>
          ))}
          <div className="my-3 border-t border-ink/10" />
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="block rounded-xl px-1 py-2.5 text-ink">
              {l.label}
            </Link>
          ))}
          <Link
            href={isAuthenticated ? '/dashboard' : '/login'}
            className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-ink text-sm font-medium text-white"
          >
            {isAuthenticated ? 'Painel' : 'Entrar'}
            <ArrowUpRight />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
