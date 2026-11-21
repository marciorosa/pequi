'use client';

/**
 * Modo white-label: descobre o escritório pelo endereço do painel e aplica a marca dele.
 *
 * - Domínio próprio (ia.escritorio.com.br) ou subdomínio (slug.pequi.me / slug.localhost:3000).
 * - Para testar sem domínio: abra qualquer página com ?tenant=slug (vale até fechar a aba);
 *   ?tenant=pequi volta para a marca do Pequi.
 *
 * As cores do site usam as variáveis --pequi-* e --pq-*; trocando essas variáveis,
 * chat, assistentes, documentos, cofre e demais telas ficam nas cores do escritório.
 */
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export interface PublicTenant {
  id: string;
  slug: string;
  name: string;
  logoUrl: string;
  faviconUrl: string;
  primaryColor: string;
  inkColor: string;
  welcomeMessage: string;
  widgetPosition: 'right' | 'left';
  panelUrl: string;
}

interface TenantContextType {
  tenant: PublicTenant | null;
  loading: boolean;
}

const TenantContext = createContext<TenantContextType>({ tenant: null, loading: false });

const API_URL = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');
const SLUG_KEY = 'pq_tenant_slug';
const PEQUI_HOSTS = ['pequi.me', 'www.pequi.me', 'localhost:3000', 'localhost', '127.0.0.1:3000'];

/* ------------------------------- cores ------------------------------- */

const hexToRgb = (hex: string): [number, number, number] => {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
};
const rgbToHex = (rgb: number[]) => `#${rgb.map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('')}`;
const mix = (hex: string, withHex: string, amount: number) => {
  const a = hexToRgb(hex);
  const b = hexToRgb(withHex);
  return rgbToHex(a.map((v, i) => v + (b[i] - v) * amount));
};
const luminance = (hex: string) => {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/** Escala 50–900 a partir da cor principal (mistura com branco e preto) */
export const brandScale = (base: string): Record<string, string> => ({
  '50': mix(base, '#FFFFFF', 0.9),
  '100': mix(base, '#FFFFFF', 0.82),
  '200': mix(base, '#FFFFFF', 0.66),
  '300': mix(base, '#FFFFFF', 0.45),
  '400': mix(base, '#FFFFFF', 0.22),
  '500': base,
  '600': mix(base, '#000000', 0.12),
  '700': mix(base, '#000000', 0.26),
  '800': mix(base, '#000000', 0.42),
  '900': mix(base, '#000000', 0.58),
});

const THEME_VARS: string[] = [
  ...['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'].map((k) => `--pequi-${k}`),
  '--pq-ink',
  '--pq-ink-soft',
  '--pq-on-brand',
];

/** Aplica as cores do escritório (ou volta às do Pequi quando tenant = null) */
export function applyTenantTheme(tenant: Pick<PublicTenant, 'primaryColor' | 'inkColor'> | null, root?: HTMLElement) {
  const el = root || document.documentElement;
  THEME_VARS.forEach((v) => el.style.removeProperty(v));
  if (!tenant || !/^#[0-9a-fA-F]{6}$/.test(tenant.primaryColor || '')) return;
  const scale = brandScale(tenant.primaryColor);
  Object.entries(scale).forEach(([k, v]) => el.style.setProperty(`--pequi-${k}`, v));
  if (/^#[0-9a-fA-F]{6}$/.test(tenant.inkColor || '')) {
    el.style.setProperty('--pq-ink', tenant.inkColor);
    el.style.setProperty('--pq-ink-soft', mix(tenant.inkColor, '#FFFFFF', 0.1));
  }
  // Texto sobre a cor da marca: branco em cores escuras, grafite em cores claras
  el.style.setProperty('--pq-on-brand', luminance(tenant.primaryColor) > 0.45 ? tenant.inkColor || '#242521' : '#FFFFFF');
}

const setFavicon = (href: string) => {
  document.querySelectorAll<HTMLLinkElement>('link[rel~="icon"]').forEach((l) => (l.href = href));
};

/** Busca a marca do escritório (por slug ou pelo host) */
export async function fetchTenant(params: { slug?: string; host?: string }): Promise<PublicTenant | null> {
  if (!API_URL) return null;
  const qs = new URLSearchParams();
  if (params.slug) qs.set('slug', params.slug);
  if (params.host) qs.set('host', params.host);
  try {
    const res = await fetch(`${API_URL}/tenants/public/resolve?${qs.toString()}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data?.tenant || null;
  } catch {
    return null;
  }
}

export function TenantProvider({ children }: { children: ReactNode }) {
  const [tenant, setTenant] = useState<PublicTenant | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // O chat embutido (/embed) cuida da própria marca a partir da chave do widget
    if (pathname?.startsWith('/embed')) {
      setLoading(false);
      return;
    }
    const url = new URL(window.location.href);
    const param = url.searchParams.get('tenant');
    if (param !== null) {
      if (!param || param === 'pequi') sessionStorage.removeItem(SLUG_KEY);
      else sessionStorage.setItem(SLUG_KEY, param.toLowerCase());
    }
    const slug = sessionStorage.getItem(SLUG_KEY) || '';
    const host = window.location.host.toLowerCase();
    if (!slug && PEQUI_HOSTS.includes(host)) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    fetchTenant(slug ? { slug } : { host }).then((t) => {
      if (cancelled) return;
      setTenant(t);
      setLoading(false);
      applyTenantTheme(t);
      if (t) {
        document.title = `${t.name} · Assistente jurídica`;
        if (t.faviconUrl || t.logoUrl) setFavicon(t.faviconUrl || t.logoUrl);
      }
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // O Next volta o título e o ícone da aba para os do Pequi a cada troca de página: reaplica os do escritório
  useEffect(() => {
    if (!tenant) return;
    const apply = () => {
      const title = `${tenant.name} · Assistente jurídica`;
      if (document.title !== title) document.title = title;
      if (tenant.faviconUrl || tenant.logoUrl) setFavicon(tenant.faviconUrl || tenant.logoUrl);
    };
    apply();
    const t1 = setTimeout(apply, 50);
    const t2 = setTimeout(apply, 500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [tenant, pathname]);

  // No painel do escritório, a página inicial de marketing do Pequi não aparece
  useEffect(() => {
    if (tenant && pathname === '/') router.replace('/login');
  }, [tenant, pathname, router]);

  return <TenantContext.Provider value={{ tenant, loading }}>{children}</TenantContext.Provider>;
}

export const useTenant = () => useContext(TenantContext);

/**
 * Nome da marca em uso nas telas: o do escritório (white-label) ou "Pequi".
 * Frases sobre a ferramenta usam "a assistente de <escritório>" no painel do escritório.
 */
export function useBrand() {
  const { tenant } = useTenant();
  return {
    tenant,
    name: tenant?.name || 'Pequi',
    assistant: tenant ? `Assistente ${tenant.name}` : 'Assistente Pequi',
    /** Sujeito das frases de aviso: "O Pequi" ou "A assistente de <escritório>" */
    subject: tenant ? `A assistente de ${tenant.name}` : 'O Pequi',
  };
}
