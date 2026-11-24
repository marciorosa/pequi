'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Topo da página inicial (2026-11-24): fundo grafite, título grande em Inter,
// caixa para testar a assistente e um único botão de ação.
export default function HeroSection() {
  const router = useRouter();
  const [question, setQuestion] = useState('');

  const ask = (e: React.FormEvent) => {
    e.preventDefault();
    const q = question.trim();
    router.push(q ? `/assistant?q=${encodeURIComponent(q)}#demo` : '/assistant#demo');
  };

  return (
    <section
      id="hero"
      className="relative -mt-20 overflow-hidden bg-[#151816] px-5 pb-20 pt-40 text-white sm:px-8 sm:pt-48 lg:pb-28"
    >
      {/* luz quente e linhas finas no fundo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(244,239,223,0.16), transparent 70%), radial-gradient(ellipse 50% 40% at 85% 100%, rgba(244,239,223,0.08), transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, #000 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, #000 30%, transparent 75%)',
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        <p className="text-[0.78rem] uppercase tracking-[0.2em] text-white/55">IA jurídica white-label para escritórios</p>

        <h1 className="mt-6 text-[clamp(2.75rem,7vw,5.5rem)] font-medium leading-[1.02] tracking-[-0.035em] text-white">
          A IA jurídica com a
          <br />
          <span className="pq-accent">marca do seu escritório.</span>
        </h1>

        <p className="mt-7 max-w-[620px] text-[1.05rem] leading-relaxed text-white/70 sm:text-lg">
          Uma assistente jurídica com o logo, as cores e o nome do seu escritório: no seu site, no seu painel e nos seus
          e-mails. O escritório assina, e os clientes usam sem custo.
        </p>

        <form
          onSubmit={ask}
          className="mt-10 w-full max-w-[640px] rounded-2xl bg-[#FFFDF6] p-2 text-left text-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]"
        >
          <label htmlFor="hero-question" className="sr-only">
            Faça uma pergunta para a assistente
          </label>
          <textarea
            id="hero-question"
            rows={2}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) ask(e);
            }}
            placeholder="Faça uma pergunta como se fosse um cliente do escritório…"
            className="w-full resize-none rounded-xl bg-[#F4EFDF]/70 px-4 py-3 text-[0.95rem] text-ink placeholder:text-ink/45 focus:outline-none focus:ring-2 focus:ring-ink/15"
          />
          <div className="flex items-center justify-between px-2 pb-1 pt-2">
            <span className="rounded-full border border-ink/15 px-3 py-1 text-[0.75rem] text-ink/60">Teste a assistente</span>
            <button
              type="submit"
              aria-label="Enviar pergunta"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-white transition hover:bg-ink/85"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m-6 6l6-6 6 6" />
              </svg>
            </button>
          </div>
        </form>

        <Link
          href="/contact"
          className="group mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-[0.95rem] font-medium text-ink transition hover:bg-[#F4EFDF]"
        >
          Agendar uma demonstração
          <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
          </svg>
        </Link>

        <p className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[0.8rem] text-white/50">
          <span>Sua marca</span>
          <span aria-hidden="true">·</span>
          <span>Chat no seu site</span>
          <span aria-hidden="true">·</span>
          <span>Cofre</span>
          <span aria-hidden="true">·</span>
          <span>Automações</span>
          <span aria-hidden="true">·</span>
          <span>Assinatura eletrônica</span>
        </p>
      </div>
    </section>
  );
}
