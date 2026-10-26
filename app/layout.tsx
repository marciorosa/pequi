import type { Metadata } from "next";
import { Inter, Lexend_Deca, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import DashboardAwareLayout from "./components/DashboardAwareLayout";
import { AuthProvider } from "./contexts/AuthContext";
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
  title: "Pequi - Inteligência Jurídica Ultra-Premium",
  description: "IA sofisticada para escritórios de advocacia de elite, departamentos jurídicos corporativos e profissionais do Direito.",
  keywords: "IA, tecnologia jurídica, direito, inteligência artificial, assistente jurídico, pesquisa jurídica, Pequi",
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
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable} ${lexendDeca.variable} ${interTight.variable}`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground" style={{ 
        ['--font-gilroy' as any]: `var(${interTight.variable})`,
        ['--font-landing' as any]: `var(${interTight.variable})`
      }}>
        <AuthProvider>
          <DashboardAwareLayout>{children}</DashboardAwareLayout>
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
