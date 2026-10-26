import Link from 'next/link';
import { faqs } from './data';
import FadeInSection from './FadeInSection';
import { sectionHeadingClass, sectionSubTextClass } from './sectionStyles';

export default function FaqSection() {
  return (
    <FadeInSection delay={0.2}>
      <section id="faq" className="scroll-mt-24 md:scroll-mt-28">
        <div className="mx-auto max-w-[1274px] px-4 md:px-8 lg:px-6 xl:px-0">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-16 lg:items-start">
            <div className="lg:sticky lg:top-28">
              <h3 className={`${sectionHeadingClass} max-w-none text-left lg:text-left`}>Perguntas frequentes</h3>
              <p className={`${sectionSubTextClass} mt-4 max-w-none text-left lg:mx-0 lg:text-left`}>
                Encontre respostas rápidas sobre segurança, implantação e como a plataforma apoia suas operações jurídicas.
              </p>
              <div className="mt-8 rounded-2xl border border-[#e7e7ea] bg-[#fcfcfd] p-5">
                <p className="text-[0.9rem] font-medium text-[#10101A]">Ainda tem dúvidas?</p>
                <p className="mt-1 text-[0.875rem] leading-[1.45rem] text-[#6d6d78]">
                  Nossa equipe pode orientar você na configuração corporativa, no compliance e na implantação.
                </p>
                <Link
                  href="/contact"
                  className="landing-primary-btn mt-4 inline-flex h-10 items-center justify-center px-5 text-[0.9rem] transition hover:brightness-110"
                >
                  Fale conosco
                </Link>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#e7e7ea] bg-white">
              {faqs.map((faq, idx) => (
                <details
                  key={faq.question}
                  open={idx === 0}
                  className="group border-b border-[#ececf0] last:border-b-0 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 transition-colors hover:bg-[#fafafb] md:px-6 md:py-5">
                    <span className="text-left text-[1rem] font-medium leading-[1.45] text-[#10101A] md:text-[1.0625rem]">
                      {faq.question}
                    </span>
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#e4e4e8] bg-[#f8f8fa] text-[#4a4a55] transition group-open:rotate-180 group-open:border-[#10101A] group-open:bg-[#10101A] group-open:text-white">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="border-t border-[#f0f0f3] bg-[#fcfcfd] px-5 pb-5 pt-4 md:px-6">
                    <p className="text-[0.95rem] font-normal leading-[1.55rem] text-[#5c5c68]">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}
