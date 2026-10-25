'use client';

import localFont from 'next/font/local';
import { useState } from 'react';
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

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  const isLandingPage = pathname === '/' || pathname === '' || pathname === null;
  const desktopLinks = [
    { label: 'Customers', href: '/customers' },
    { label: 'Company', href: '/company' },
    { label: 'Security', href: '/security' },
    { label: 'News', href: '/news' },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleProductsDropdown = () => {
    setProductsDropdownOpen(!productsDropdownOpen);
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className={`mx-auto w-full max-w-[1274px] ${gilroyNav.className}`}>
        <div className="relative flex items-center justify-between rounded-full border border-[#e8e5df] bg-white/90 px-5 py-2.5 shadow-[0_10px_30px_rgba(24,24,34,0.08)] backdrop-blur-lg sm:px-6">
          <Link
            href={isLandingPage ? '/#hero' : '/'}
            className="flex items-center"
          >
            <Image
              src="/logo/logo.png"
              alt="AIForLawyers"
              width={140}
              height={38}
              className="h-[30px] w-auto"
              priority
            />
          </Link>

          <div className="hidden items-center gap-7 text-[0.87rem] font-medium text-[#373540] xl:flex">
            <div className="relative group">
              <button
                onClick={toggleProductsDropdown}
                className="flex items-center gap-1.5 transition hover:text-[#1d1c23]"
              >
                Products
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-3.5 w-3.5 transition-transform ${productsDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {productsDropdownOpen && (
                <div className="absolute left-[-0.75rem] top-full z-50 mt-4 w-52 overflow-hidden rounded-2xl border border-[#ece9e3] bg-white/95 shadow-[0_18px_35px_rgba(0,0,0,0.08)] backdrop-blur">
                  <div className="py-2 text-[#111827]">
                    <Link
                      href="/assistant"
                      onClick={() => setProductsDropdownOpen(false)}
                      className="block px-5 py-2.5 text-sm text-[#111827]/70 transition hover:bg-[#f5f4f2] hover:text-[#111827]"
                    >
                      AI Assistants
                    </Link>
                    <Link
                      href="/vault"
                      onClick={() => setProductsDropdownOpen(false)}
                      className="block px-5 py-2.5 text-sm text-[#111827]/70 transition hover:bg-[#f5f4f2] hover:text-[#111827]"
                    >
                      Vault Access
                    </Link>
                    <Link
                      href="/knowledge"
                      onClick={() => setProductsDropdownOpen(false)}
                      className="block px-5 py-2.5 text-sm text-[#111827]/70 transition hover:bg-[#f5f4f2] hover:text-[#111827]"
                    >
                      Knowledge Base
                    </Link>
                    <Link
                      href="/workflows"
                      onClick={() => setProductsDropdownOpen(false)}
                      className="block px-5 py-2.5 text-sm text-[#111827]/70 transition hover:bg-[#f5f4f2] hover:text-[#111827]"
                    >
                      Automations
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {desktopLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-[#1d1c23]"
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
                  className="inline-flex h-8 items-center justify-center rounded-full border border-[#e0ddd8] px-4 text-[0.82rem] font-medium text-[#474550] transition hover:bg-[#f3f1ee]"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex h-8 items-center justify-center rounded-full border border-[#e0ddd8] bg-[#f4f2ef] px-4 text-[0.82rem] font-medium text-[#474550] transition hover:bg-[#efedea]"
                >
                  Sign In
                </Link>
              )
            )}
            <Link
              href="/contact"
              className="landing-primary-btn inline-flex h-8 items-center justify-center px-4 transition hover:brightness-110"
            >
              Request Demo
            </Link>
          </div>

          <div className="flex items-center xl:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-[#111827] transition-transform duration-300 hover:scale-110 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="absolute left-0 right-0 top-full mt-2 max-h-[calc(100vh-5rem)] overflow-y-auto rounded-2xl border border-[#ece9e4] bg-white/95 p-4 pb-4 shadow-xl backdrop-blur xl:hidden">
            <div className="flex flex-col space-y-3">
              <div className="flex flex-col">
                <button
                  onClick={toggleProductsDropdown}
                  className="flex items-center justify-between py-2 font-medium text-foreground/90 transition-colors hover:text-foreground focus:outline-none"
                >
                  Products
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`ml-2 h-4 w-4 transition-transform duration-300 ${productsDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Mobile Products Dropdown */}
                {productsDropdownOpen && (
                  <div className="animate-fadeIn mb-2 ml-1 space-y-2 border-l-2 border-gray-100 py-2 pl-4">
                    <Link href="/assistant" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-foreground/70 transition-colors hover:text-foreground">AI Assistants</Link>
                    <Link href="/vault" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-foreground/70 transition-colors hover:text-foreground">Vault Access</Link>
                    <Link href="/knowledge" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-foreground/70 transition-colors hover:text-foreground">Knowledge Base</Link>
                    <Link href="/workflows" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-foreground/70 transition-colors hover:text-foreground">Automations</Link>
                  </div>
                )}
              </div>

              {desktopLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-foreground/90 transition-all duration-300 hover:translate-x-1 hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-4 border-t border-gray-200 flex items-center gap-3">
                <Link
                  href={isAuthenticated ? '/dashboard' : '/login'}
                  className="inline-flex h-10 items-center justify-center rounded-xl border border-[#111827]/25 px-5 text-sm text-[#111827] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f9fafb]"
                >
                  {isAuthenticated ? 'Dashboard' : 'Sign In'}
                </Link>
                <Link
                  href="/contact"
                  className="landing-primary-btn inline-flex h-10 items-center justify-center px-6 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
                >
                  Request Demo
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