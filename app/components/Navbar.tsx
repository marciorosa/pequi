'use client';

import localFont from 'next/font/local';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

const gilroyNav = localFont({
  src: [
    { path: '../../public/fonts/InterTight-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/InterTight-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../../public/fonts/InterTight-SemiBold.ttf', weight: '600', style: 'normal' },
  ],
  display: 'swap',
});

const productLinks = [
  {
    label: 'Assistentes de IA',
    description: 'Dúvidas, textos e análises jurídicas',
    href: '/assistant',
    icon: 'M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4-.83L3 20l1.4-3.72A7.6 7.6 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  },
  {
    label: 'Acesso ao Cofre',
    description: 'Documentos seguros e organizados',
    href: '/vault',
    icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
  },
  {
    label: 'Base de Conhecimento',
    description: 'Leis e decisões explicadas em um só lugar',
    href: '/knowledge',
    icon: 'M12 6.25v13m0-13C10.83 5.48 9.25 5 7.5 5S4.17 5.48 3 6.25v13C4.17 18.48 5.75 18 7.5 18s3.33.48 4.5 1.25m0-13C13.17 5.48 14.75 5 16.5 5s3.33.48 4.5 1.25v13C19.83 18.48 18.25 18 16.5 18s-3.33.48-4.5 1.25',
  },
  {
    label: 'Automações',
    description: 'Burocracias jurídicas sem esforço manual',
    href: '/workflows',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
];

const ProductIcon = ({ d }: { d: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);

const ArrowIcon = ({ className = '' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
  </svg>
);

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  const isLandingPage = pathname === '/' || pathname === '' || pathname === null;
  const desktopLinks = [
    { label: 'Clientes', href: '/customers' },
    { label: 'Empresa', href: '/company' },
    { label: 'Segurança', href: '/security' },
  ];
  const isActive = (href: string) => pathname === href || (pathname?.startsWith(`${href}/`) ?? false);
  const productActive = productLinks.some((item) => isActive(item.href));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
  }, [pathname]);

  const openProducts = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setProductsDropdownOpen(true);
  };

  const closeProductsSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setProductsDropdownOpen(false), 120);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleProductsDropdown = () => {
    setProductsDropdownOpen(!productsDropdownOpen);
  };

  const navLinkClass = (active: boolean) =>
    `relative inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 transition-colors duration-200 ${
      active
        ? 'bg-pequi-100 text-ink'
        : 'text-castanha-800 hover:bg-castanha-100 hover:text-ink'
    }`;

  return (
    <nav className={`fixed left-0 right-0 top-0 z-50 px-4 sm:px-6 transition-[padding] duration-300 ${scrolled ? 'pt-2' : 'pt-4'}`}>
      <div className={`mx-auto w-full max-w-[1274px] ${gilroyNav.className}`}>
        <div
          className={`relative flex items-center justify-between rounded-full border px-3 py-2 pl-5 backdrop-blur-xl transition-all duration-300 sm:pl-6 ${
            scrolled
              ? 'border-castanha-200 bg-white/95 shadow-[0_12px_32px_rgba(31,42,23,0.10)]'
              : 'border-white/70 bg-white/80 shadow-[0_6px_20px_rgba(31,42,23,0.06)]'
          }`}
        >
          {/* Fio dourado sutil na base da barra */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-10 -bottom-px h-px bg-gradient-to-r from-transparent via-pequi-400/70 to-transparent"
          />

          <Link
            href={isLandingPage ? '/#hero' : '/'}
            className="flex items-center"
          >
            <Image
              src="/logo/logo.png"
              alt="Pequi"
              width={140}
              height={38}
              className="h-[30px] w-auto"
              priority
            />
          </Link>

          <div className="hidden items-center gap-1 text-[0.9rem] font-medium xl:flex">
            <div
              className="relative"
              onMouseEnter={openProducts}
              onMouseLeave={closeProductsSoon}
            >
              <button
                onClick={toggleProductsDropdown}
                aria-expanded={productsDropdownOpen}
                className={navLinkClass(productActive || productsDropdownOpen)}
              >
                Produtos
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${productsDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {productsDropdownOpen && (
                <div className="absolute left-1/2 top-full z-50 w-[30rem] -translate-x-1/2 pt-3">
                  <div className="animate-fadeIn overflow-hidden rounded-3xl border border-castanha-150 bg-white shadow-[0_24px_60px_rgba(31,42,23,0.14)]">
                    <div className="grid grid-cols-2 gap-1 p-2">
                      {productLinks.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setProductsDropdownOpen(false)}
                          className={`group/item flex items-start gap-3 rounded-2xl p-3 transition-colors ${
                            isActive(item.href) ? 'bg-pequi-50' : 'hover:bg-castanha-50'
                          }`}
                        >
                          <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-pequi-100 text-cerrado-800 transition-colors group-hover/item:bg-pequi-500 group-hover/item:text-ink">
                            <ProductIcon d={item.icon} />
                          </span>
                          <span className="flex flex-col">
                            <span className="text-[0.9rem] font-medium text-ink">{item.label}</span>
                            <span className="mt-0.5 text-[0.78rem] font-normal leading-snug text-castanha-500">{item.description}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                    <Link
                      href="/contact"
                      onClick={() => setProductsDropdownOpen(false)}
                      className="group/cta flex items-center justify-between border-t border-castanha-150 bg-cerrado-900 px-5 py-3.5 text-[0.85rem] text-white transition-colors hover:bg-cerrado-800"
                    >
                      <span>
                        <span className="font-medium text-pequi-300">Novo no Pequi?</span>{' '}
                        <span className="text-white/80">Veja a plataforma em ação.</span>
                      </span>
                      <ArrowIcon className="h-4 w-4 text-pequi-300 transition-transform group-hover/cta:translate-x-1" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {desktopLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={navLinkClass(isActive(item.href))}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-2 xl:flex">
            {!isLoading && (
              isAuthenticated ? (
                <Link
                  href="/dashboard"
                  className="inline-flex h-10 items-center justify-center rounded-full px-4 text-[0.88rem] font-medium text-castanha-800 transition hover:bg-castanha-100 hover:text-ink"
                >
                  Painel
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex h-10 items-center justify-center rounded-full px-4 text-[0.88rem] font-medium text-castanha-800 transition hover:bg-castanha-100 hover:text-ink"
                >
                  Entrar
                </Link>
              )
            )}
            <Link
              href="/contact"
              className="landing-primary-btn group/demo inline-flex h-10 items-center justify-center gap-2 pl-5 pr-2"
            >
              Fale conosco
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-pequi-300 transition-transform duration-200 group-hover/demo:translate-x-0.5">
                <ArrowIcon className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>

          <div className="flex items-center pr-2 xl:hidden">
            <button
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors focus:outline-none ${
                mobileMenuOpen ? 'bg-pequi-500 text-ink' : 'bg-castanha-100 text-ink hover:bg-pequi-100'
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
          <div className="animate-fadeIn absolute left-4 right-4 top-full mt-2 max-h-[calc(100vh-5rem)] overflow-y-auto rounded-3xl border border-castanha-150 bg-white p-3 shadow-[0_24px_60px_rgba(31,42,23,0.14)] sm:left-6 sm:right-6 xl:hidden">
            <div className="flex flex-col">
              <button
                onClick={toggleProductsDropdown}
                className="flex items-center justify-between rounded-2xl px-3 py-3 font-medium text-ink transition-colors hover:bg-castanha-50 focus:outline-none"
              >
                Produtos
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`ml-2 h-4 w-4 transition-transform duration-300 ${productsDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Mobile Products Dropdown */}
              {productsDropdownOpen && (
                <div className="animate-fadeIn mb-1 grid gap-1 px-1">
                  {productLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 rounded-2xl px-2 py-2 transition-colors hover:bg-castanha-50"
                    >
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-pequi-100 text-cerrado-800">
                        <ProductIcon d={item.icon} />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-[0.9rem] text-ink">{item.label}</span>
                        <span className="text-[0.75rem] text-castanha-500">{item.description}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              )}

              {desktopLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-2xl px-3 py-3 transition-colors ${
                    isActive(item.href) ? 'bg-pequi-100 font-medium text-ink' : 'text-ink/85 hover:bg-castanha-50 hover:text-ink'
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
