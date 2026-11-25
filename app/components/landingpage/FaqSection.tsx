import Link from 'next/link';
import { faqs } from './data';
import FadeInSection from './FadeInSection';
import { container } from './SectionHeader';

// Perguntas frequentes: lista aberta separada por linhas, sem caixas.
export default function FaqSection() {
  return (
    <FadeInSection delay={0.2}>
      <section id="faq" className="scroll-mt-20 py-20 lg:py-28">
        <div className={`${container} grid gap-12 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-20`}>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-[clamp(2.1rem,4.4vw,3.6rem)] font-medium leading-[1.04] tracking-[-0.035em] text-ink">
              Dúvidas comuns, respostas curtas.
            </h2>
            <p className="mt-5 max-w-[340px] text-[1.02rem] leading-relaxed text-ink/65">
              White-label, planos e como oferecer a assistente aos seus clientes.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-1.5 border-b border-ink/50 pb-0.5 text-[0.95rem] font-medium text-ink hover:border-ink"
            >
              Ainda tem dúvidas? Fale conosco
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
              </svg>
            </Link>
          </div>

          <div className="border-t border-ink/20">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group border-b border-ink/20 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5">
                  <span className="text-[1.12rem] font-medium leading-snug text-ink">{faq.question}</span>
                  <span className="relative h-4 w-4 shrink-0 text-ink/60" aria-hidden="true">
                    <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
                    <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current transition-transform group-open:rotate-90 group-open:opacity-0" />
                  </span>
                </summary>
                <p className="max-w-[640px] pb-5 text-[0.98rem] leading-relaxed text-ink/65">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}
