import Link from 'next/link';
import PequiWordmark from './PequiWordmark';

// Rodapé no esquema M&C, no mesmo formato do rodapé da Lucia: cartão claro e
// quente, colunas de links com rótulos pequenos e a assinatura grande ao fundo.
const label = 'mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] opacity-60';
const col = 'flex flex-col items-start gap-3 text-sm [&_a:hover]:underline [&_a]:underline-offset-4';

const Footer = () => {
  return (
    <footer className="landing-gilroy relative z-10 mt-16 px-3 pb-3 sm:px-6 sm:pb-6 lg:mt-[130px]">
      <div className="pq-footer mx-auto max-w-7xl overflow-hidden rounded-[2rem] px-6 pt-10 sm:px-12 sm:pt-14">
        <div className="flex flex-col justify-between gap-8 border-b border-current/15 pb-10 sm:flex-row sm:items-end">
          <div>
            <PequiWordmark />
            <p className="mt-5 max-w-md text-2xl font-medium leading-snug tracking-tight">
              Sua inteligência jurídica
              <br />
              <span className="pq-accent text-[1.15em]">acessível.</span>
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex w-fit items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink shadow-[0_0_0_1px_rgba(36,37,33,0.06)] hover:shadow-[0_8px_24px_-12px_rgba(44,37,21,0.25)]"
          >
            Fale conosco
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M8 7h9v9" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-9 py-10 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <p className="col-span-2 max-w-xs text-sm leading-relaxed opacity-70 md:col-span-1">
            Inteligência jurídica em linguagem simples para pessoas, famílias e pequenos negócios.
          </p>
          <nav aria-label="Produtos" className={col}>
            <p className={label}>Produtos</p>
            <Link href="/assistant">Assistentes de IA</Link>
            <Link href="/vault">Acesso ao Cofre</Link>
            <Link href="/knowledge">Base de Conhecimento</Link>
            <Link href="/workflows">Automações</Link>
          </nav>
          <nav aria-label="Plataforma" className={col}>
            <p className={label}>Plataforma</p>
            <Link href="/#features">Recursos</Link>
            <Link href="/#why">Por que nós</Link>
            <Link href="/#pricing">Planos e preços</Link>
            <Link href="/#faq">Perguntas frequentes</Link>
          </nav>
          <nav aria-label="Empresa" className={col}>
            <p className={label}>Empresa</p>
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
          className="select-none whitespace-nowrap text-[clamp(2.9rem,14vw,12rem)] font-semibold leading-[.85] tracking-[-.075em] opacity-[.12]"
          aria-hidden="true"
        >
          Pequi<span className="text-pequi-500">.</span>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-current/15 py-6 text-xs">
          <p>© {new Date().getFullYear()} <a href="https://marciorosa.com" target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4">M&amp;C</a> LTDA. CNPJ 68.716.930/0001-80.</p>
          <div className="flex flex-wrap items-center gap-5 [&_a:hover]:underline [&_a]:underline-offset-4">
            <Link href="/terms">Termos de Serviço</Link>
            <Link href="/privacy-policy">Política de Privacidade</Link>
            <Link href="/cookies">Política de Cookies</Link>
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
