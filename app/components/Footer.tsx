import Link from 'next/link';
import PequiWordmark from './PequiWordmark';
import { CookiePreferencesLink } from './CookieConsent';

// Rodapé grafite de ponta a ponta (estilo editorial, 2026-11-24): colunas de
// links com rótulos pequenos em caixa alta e a assinatura grande ao fundo.
const label = 'mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45';
const col = 'flex flex-col items-start gap-3 text-sm [&_a]:text-white/70 [&_a:hover]:text-white';

const Footer = () => {
  return (
    <footer className="landing-gilroy pq-footer relative z-10">
      <div className="mx-auto max-w-7xl overflow-hidden px-5 pt-14 sm:px-8 sm:pt-20">
        <div className="flex flex-col justify-between gap-8 border-b border-white/15 pb-12 sm:flex-row sm:items-end">
          <div>
            <PequiWordmark tone="light" />
            <p className="mt-5 max-w-md text-2xl font-medium leading-snug tracking-tight">
              A IA jurídica com a
              <br />
              <span className="pq-accent text-[1.1em]">marca do seu escritório.</span>
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex w-fit items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-medium text-ink transition hover:bg-[#F4EFDF]"
          >
            Fale conosco
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M8 7h9v9" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-9 py-10 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <p className="col-span-2 max-w-xs text-sm leading-relaxed text-white/60 md:col-span-1">
            Assistente jurídica com IA, white-label, para escritórios de advocacia oferecerem aos seus clientes.
          </p>
          <nav aria-label="Produtos" className={col}>
            <p className={label}>Produtos</p>
            <Link href="/assistant">Agentes</Link>
            <Link href="/knowledge">Pesquisa jurídica</Link>
            <Link href="/workflows">Automações</Link>
            <Link href="/vault">Cofre de documentos</Link>
            <Link href="/workflows#assinatura">Assinatura eletrônica</Link>
          </nav>
          <nav aria-label="Plataforma" className={col}>
            <p className={label}>Plataforma</p>
            <Link href="/#features">Recursos</Link>
            <Link href="/#why">Por que nós</Link>
            <Link href="/#faq">Perguntas frequentes</Link>
          </nav>
          <nav aria-label="Empresa" className={col}>
            <p className={label}>Empresa</p>
            <Link href="/pricing">Preços e planos</Link>
            <Link href="/company">Sobre nós</Link>
            <Link href="/security">Segurança</Link>
            <Link href="/login">Entrar</Link>
          </nav>
          <nav aria-label="Conecte-se" className={col}>
            <p className={label}>Conecte-se</p>
            <Link href="/contact">Fale conosco</Link>
          </nav>
        </div>

        <div
          className="select-none whitespace-nowrap text-[clamp(2.9rem,14vw,12rem)] font-medium leading-[.85] tracking-[-.06em] text-white opacity-[.08]"
          aria-hidden="true"
        >
          Pequi.
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-white/15 py-6 text-xs text-white/55">
          <p>© {new Date().getFullYear()} <a href="https://marciorosa.com" target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4">M&amp;C</a> LTDA. CNPJ 68.716.930/0001-80.</p>
          <div className="flex flex-wrap items-center gap-5 [&_a:hover]:text-white [&_button:hover]:text-white">
            <Link href="/terms">Termos de Uso</Link>
            <Link href="/privacy-policy">Política de Privacidade</Link>
            <Link href="/cookies">Política de Cookies</Link>
            <CookiePreferencesLink className="transition-colors" />
            <a href="#" className="inline-flex items-center gap-2">
              Voltar ao topo
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m-6 6l6-6 6 6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
