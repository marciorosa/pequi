'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { usePathname } from 'next/navigation';

// Consentimento de cookies (LGPD). O Google Analytics e o Tag Manager só
// carregam depois que a pessoa aceita os cookies de análise. A escolha fica
// gravada no navegador e pode ser mudada pelo link "Preferências de cookies"
// do rodapé, que dispara o evento OPEN_EVENT.

const STORAGE_KEY = 'pequi_cookie_consent';
const CONSENT_VERSION = 1;
export const OPEN_EVENT = 'pequi:cookie-preferences';

const GA_ID = 'G-TP6TNKTK39';
const GTM_ID = 'GTM-K5LW5NCG';

type Consent = { version: number; analytics: boolean; date: string };

function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Consent;
    return parsed.version === CONSENT_VERSION ? parsed : null;
  } catch {
    return null;
  }
}

// Apaga os cookies do Google Analytics (_ga, _ga_*, _gid) no domínio atual e no domínio pai
function clearAnalyticsCookies() {
  const host = window.location.hostname;
  const domains = ['', host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`];
  document.cookie.split(';').forEach((c) => {
    const name = c.split('=')[0].trim();
    if (/^(_ga|_gid|_gat)/.test(name)) {
      domains.forEach((d) => {
        document.cookie = `${name}=; path=/; max-age=0${d ? `; domain=${d}` : ''}`;
      });
    }
  });
}

export default function CookieConsent() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<Consent | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [analyticsChoice, setAnalyticsChoice] = useState(false);

  useEffect(() => {
    const saved = readConsent();
    setConsent(saved);
    setShowBanner(!saved);
    setLoaded(true);

    const open = () => {
      const current = readConsent();
      setAnalyticsChoice(current?.analytics ?? false);
      setShowPanel(true);
      setShowBanner(true);
    };
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  const save = (analytics: boolean) => {
    const hadAnalytics = consent?.analytics ?? false;
    const next: Consent = { version: CONSENT_VERSION, analytics, date: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setConsent(next);
    setShowBanner(false);
    setShowPanel(false);
    // Os scripts do Google não descarregam sozinhos: ao retirar o consentimento,
    // apaga os cookies e recarrega a página para parar a coleta.
    if (hadAnalytics && !analytics) {
      clearAnalyticsCookies();
      window.location.reload();
    }
  };

  // O chat embutido no site do escritório não mostra o banner nem carrega o Analytics
  const isEmbed = pathname?.startsWith('/embed');
  const analyticsOn = loaded && !isEmbed && consent?.analytics === true;

  const btn =
    'inline-flex flex-1 items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition-colors sm:flex-none';
  // "Aceitar todos" e "Recusar não necessários" com o mesmo destaque
  const strong = `${btn} bg-foreground text-white hover:bg-foreground/85`;
  const soft = `${btn} border border-border bg-white text-foreground hover:bg-muted`;

  return (
    <>
      {analyticsOn && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
            `}
          </Script>
          <Script src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`} strategy="afterInteractive" />
        </>
      )}

      {loaded && showBanner && !isEmbed && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-consent-title"
          className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl rounded-3xl border border-border bg-card p-5 text-foreground shadow-[0_18px_50px_-20px_rgba(36,37,33,0.45)] sm:inset-x-6 sm:bottom-6 sm:p-6"
        >
          <p id="cookie-consent-title" className="text-sm font-semibold">
            Cookies
          </p>

          {!showPanel ? (
            <>
              <p className="mt-2 text-sm leading-relaxed opacity-80">
                Usamos cookies necessários para o site funcionar e, com a sua permissão, cookies de análise para
                entender como o site é usado. Você pode aceitar, recusar ou escolher. Saiba mais na{' '}
                <Link href="/privacy-policy" className="font-medium underline underline-offset-4">
                  Política de Privacidade
                </Link>
                .
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" className={strong} onClick={() => save(true)}>
                  Aceitar todos
                </button>
                <button type="button" className={strong} onClick={() => save(false)}>
                  Recusar não necessários
                </button>
                <button
                  type="button"
                  className={soft}
                  onClick={() => {
                    setAnalyticsChoice(consent?.analytics ?? false);
                    setShowPanel(true);
                  }}
                >
                  Escolher
                </button>
              </div>
            </>
          ) : (
            <>
              <ul className="mt-3 space-y-3">
                <li className="flex items-start justify-between gap-4 rounded-2xl bg-muted/60 p-4">
                  <div>
                    <p className="text-sm font-semibold">Necessários (sempre ativos)</p>
                    <p className="mt-1 text-sm opacity-75">Login, segurança e prevenção a fraudes.</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-foreground/10 px-3 py-1 text-xs font-semibold">
                    Sempre ativos
                  </span>
                </li>
                <li className="flex items-start justify-between gap-4 rounded-2xl bg-muted/60 p-4">
                  <div>
                    <label htmlFor="cookie-analytics" className="text-sm font-semibold">
                      Análise (desativado por padrão)
                    </label>
                    <p className="mt-1 text-sm opacity-75">Estatísticas de visitas pelo Google Analytics.</p>
                  </div>
                  <button
                    id="cookie-analytics"
                    type="button"
                    role="switch"
                    aria-checked={analyticsChoice}
                    onClick={() => setAnalyticsChoice((v) => !v)}
                    className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
                      analyticsChoice ? 'bg-foreground' : 'bg-foreground/20'
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${
                        analyticsChoice ? 'left-6' : 'left-1'
                      }`}
                    />
                    <span className="sr-only">Ativar cookies de análise</span>
                  </button>
                </li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" className={strong} onClick={() => save(analyticsChoice)}>
                  Salvar escolhas
                </button>
                {consent && (
                  <button
                    type="button"
                    className={soft}
                    onClick={() => {
                      setShowPanel(false);
                      setShowBanner(false);
                    }}
                  >
                    Fechar
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

// Link do rodapé que reabre o painel de preferências
export function CookiePreferencesLink({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className ?? 'hover:underline underline-offset-4'}
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
    >
      Preferências de cookies
    </button>
  );
}
