import type { Metadata } from "next";
import { EB_Garamond, Fraunces, Inter, Instrument_Serif, Lexend_Deca, Manrope, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import DashboardAwareLayout from "./components/DashboardAwareLayout";
import CookieConsent from "./components/CookieConsent";
import { AuthProvider } from "./contexts/AuthContext";
import { TenantProvider } from "./contexts/TenantContext";
import { Toaster } from "react-hot-toast";

// Font configurations
const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
});

// Esquema M&C (igual à Lucia): Manrope em todo o site, com destaques em
// Instrument Serif itálico (referência AdCraft). Fraunces fica carregada só
// para não quebrar estilos antigos que ainda a citem.
const manrope = Manrope({
  subsets: ["latin"],
  variable: '--font-manrope',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: '--font-instrument-serif',
  display: 'swap',
});

// Serifa clássica dos títulos de destaque (no lugar da Palatino, que não é fonte web)
const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: '--font-eb-garamond',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz'],
});

const lexendDeca = Lexend_Deca({
  subsets: ["latin"],
  variable: '--font-lexend-deca',
  display: 'swap',
});

const interTight = localFont({
  src: [
    { path: "../public/fonts/InterTight-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/InterTight-Medium.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/InterTight-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../public/fonts/InterTight-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pequi - IA jurídica white-label para escritórios",
  description: "Ofereça aos clientes do seu escritório uma assistente jurídica com IA, com o logo, as cores e o nome do escritório. O escritório assina e os clientes usam sem custo.",
  keywords: "IA jurídica, white-label, escritório de advocacia, assistente jurídico, chat jurídico para site, B2B, Pequi",
  icons: {
    icon: "/logo/favicon.png",
    shortcut: "/logo/favicon.png",
    apple: "/logo/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} ${instrumentSerif.variable} ${inter.variable} ${fraunces.variable} ${playfair.variable} ${lexendDeca.variable} ${interTight.variable} ${ebGaramond.variable}`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground" style={{ 
        ['--font-gilroy' as any]: 'var(--font-inter)',
        ['--font-landing' as any]: 'var(--font-inter)',
        ['--font-heading' as any]: 'var(--font-inter)',
        ['--font-accent' as any]: 'var(--font-eb-garamond), "Palatino Linotype", Palatino, Georgia, serif'
      }}>
        {/* Analytics e Tag Manager só carregam com o consentimento (LGPD) */}
        <CookieConsent />
        <AuthProvider>
          <TenantProvider>
            <DashboardAwareLayout>{children}</DashboardAwareLayout>
          </TenantProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              className: '',
              duration: 4000,
              style: {
                background: 'var(--card)',
                color: 'var(--foreground)',
                border: '1px solid var(--border)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              },
              success: {
                iconTheme: {
                  primary: '#111827',
                  secondary: '#fff',
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
