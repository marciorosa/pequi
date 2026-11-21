import Image from 'next/image';
import FadeInSection from './FadeInSection';
import { sectionHeadingClass } from './sectionStyles';

export default function WhySection() {
  return (
    <FadeInSection delay={0.14}>
      <section id="why" className="scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
        <div className="landing-surface p-6 md:p-10 lg:p-12">
          <h3 className={sectionHeadingClass}>Atenda mais clientes <span className="pq-accent text-[1.1em]">com a sua marca</span></h3>
          <p className="mt-5 mx-auto w-full max-w-[46rem] text-castanha-600 text-center text-[1rem] md:text-[1.125rem] lg:text-[1.25rem] font-normal leading-[160%]">
            O escritório ganha uma assistente jurídica pronta, com a própria identidade, sem desenvolver nada.
            Os clientes tiram dúvidas a qualquer hora, e a equipe recebe os contatos para atender.
          </p>

          <div className="mt-10 grid lg:grid-cols-[1.15fr_0.85fr] gap-6 items-stretch">
            <div className="landing-card p-5 md:p-7">
              <div className="relative rounded-[1.25rem] min-h-[320px] md:min-h-[470px] overflow-hidden">
                <Image
                  src="/landingpage/futureoflegal/img-left.png"
                  alt="Assistente jurídica com a marca do escritório"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="landing-card p-5 md:p-6">
                <h4 className="text-ink text-[1.25rem] md:text-[1.35rem] font-medium leading-[1.35]">Para o escritório</h4>
                <ul className="mt-4 space-y-2.5 text-castanha-600 text-[1rem] leading-[1.55rem]">
                  <li>Sua marca em todas as telas e e-mails</li>
                  <li>Chat de atendimento no seu site</li>
                  <li>Contatos de novos clientes</li>
                  <li>Lista dos clientes que usam a assistente</li>
                  <li>Sem desenvolvimento nem servidor próprio</li>
                </ul>
              </div>
              <div className="landing-card p-5 md:p-6">
                <h4 className="text-ink text-[1.25rem] md:text-[1.35rem] font-medium leading-[1.35]">Para os seus clientes</h4>
                <ul className="mt-4 space-y-2.5 text-castanha-600 text-[1rem] leading-[1.55rem]">
                  <li>Dúvidas jurídicas em linguagem simples</li>
                  <li>Assistentes por área do Direito</li>
                  <li>Análise de documentos e contratos</li>
                  <li>Cofre com pastas protegidas por senha</li>
                  <li>Uso sem custo, coberto pelo escritório</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="landing-card mt-6 p-6 md:p-10 lg:p-[48px]">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <p className="text-ink text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-medium leading-none">Sua marca</p>
                <p className="text-castanha-600 text-[1rem] font-semibold leading-[1.28225rem] uppercase mt-[10px]">White-label</p>
                <p className="mt-2 w-full max-w-[170px] text-castanha-600 text-[1rem] font-normal leading-[1.28225rem]">Logo, cores, nome e domínio do escritório</p>
              </div>
              <div>
                <p className="text-ink text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-medium leading-none">24/7</p>
                <p className="text-castanha-600 text-[1rem] font-semibold leading-[1.28225rem] uppercase mt-[10px]">Atendimento</p>
                <p className="mt-2 w-full max-w-[170px] text-castanha-600 text-[1rem] font-normal leading-[1.28225rem]">A assistente atende os clientes a qualquer hora</p>
              </div>
              <div>
                <p className="text-ink text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-medium leading-none">30 áreas</p>
                <p className="text-castanha-600 text-[1rem] font-semibold leading-[1.28225rem] uppercase mt-[10px]">Assistentes de IA</p>
                <p className="mt-2 w-full max-w-[170px] text-castanha-600 text-[1rem] font-normal leading-[1.28225rem]">Do consumidor ao trabalho, da família à saúde</p>
              </div>
              <div>
                <p className="text-ink text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-medium leading-none">Brasil</p>
                <p className="text-castanha-600 text-[1rem] font-semibold leading-[1.28225rem] uppercase mt-[10px]">Para escritórios</p>
                <p className="mt-2 w-full max-w-[170px] text-castanha-600 text-[1rem] font-normal leading-[1.28225rem]">Feito para escritórios de advocacia do Brasil</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
    </FadeInSection>
  );
}
