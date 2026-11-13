// O painel é sempre gerado na hora e nunca guardado em cache (nem no navegador nem na CDN).
// Antes, /dashboard saía pré-gerada com cache de um ano; atrás da CDN da Hostinger, que
// reescreve o cabeçalho Vary, o acesso direto podia receber a versão interna do Next.js
// (texto cru) no lugar da página (Relatório 4, item 6).
export const dynamic = 'force-dynamic';

export default function DashboardSegmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
