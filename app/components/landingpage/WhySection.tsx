import Image from 'next/image';
import FadeInSection from './FadeInSection';
import { sectionHeadingClass } from './sectionStyles';

export default function WhySection() {
  return (
    <FadeInSection delay={0.14}>
      <section id="why" className="scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
        <div className="landing-surface p-6 md:p-10 lg:p-12">
          <h3 className={sectionHeadingClass}>Levando o Direito para mais pessoas</h3>
          <p className="mt-5 mx-auto w-full max-w-[46rem] text-castanha-600 text-center text-[1rem] md:text-[1.125rem] lg:text-[1.25rem] font-normal leading-[160%]">
            Uma plataforma única criada para traduzir todo o juridiquês, descascar o problema com cuidado e dar mais
            segurança a cada decisão sua.
          </p>

          <div className="mt-10 grid lg:grid-cols-[1.15fr_0.85fr] gap-6 items-stretch">
            <div className="landing-card p-5 md:p-7">
              <div className="relative rounded-[1.25rem] min-h-[320px] md:min-h-[470px] overflow-hidden">
                <Image
                  src="/landingpage/futureoflegal/img-left.png"
                  alt="Levando o Direito para mais pessoas"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="landing-card p-5 md:p-6">
                <h4 className="text-ink text-[1.25rem] md:text-[1.35rem] font-medium leading-[1.35]">Apoio jurídico inteligente</h4>
                <ul className="mt-4 space-y-2.5 text-castanha-600 text-[1rem] leading-[1.55rem]">
                  <li>Plataforma jurídica completa</li>
                  <li>Seus casos bem organizados</li>
                  <li>Feita para você</li>
                  <li>Documentos sempre à mão</li>
                  <li>Compartilhamento seguro com advogados</li>
                </ul>
              </div>
              <div className="landing-card p-5 md:p-6">
                <h4 className="text-ink text-[1.25rem] md:text-[1.35rem] font-medium leading-[1.35]">Automação inteligente</h4>
                <ul className="mt-4 space-y-2.5 text-castanha-600 text-[1rem] leading-[1.55rem]">
                  <li>Automatize tarefas rotineiras</li>
                  <li>Explicações geradas por IA</li>
                  <li>Menos trabalho manual</li>
                  <li>Leitura inteligente de documentos</li>
                  <li>Lembretes de etapas automatizados</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="landing-card mt-6 p-6 md:p-10 lg:p-[48px]">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <p className="text-ink text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-medium leading-none">10x mais rápido</p>
                <p className="text-castanha-600 text-[1rem] font-semibold leading-[1.28225rem] uppercase mt-[10px]">Fluxos de trabalho</p>
                <p className="mt-2 w-full max-w-[170px] text-castanha-600 text-[1rem] font-normal leading-[1.28225rem]">Acelere pesquisas e a leitura de documentos</p>
              </div>
              <div>
                <p className="text-ink text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-medium leading-none">24/7</p>
                <p className="text-castanha-600 text-[1rem] font-semibold leading-[1.28225rem] uppercase mt-[10px]">Suporte de IA</p>
                <p className="mt-2 w-full max-w-[170px] text-castanha-600 text-[1rem] font-normal leading-[1.28225rem]">Assistência contínua sempre que você precisar</p>
              </div>
              <div>
                <p className="text-ink text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-medium leading-none">50K+</p>
                <p className="text-castanha-600 text-[1rem] font-semibold leading-[1.28225rem] uppercase mt-[10px]">Casos gerenciados</p>
                <p className="mt-2 w-full max-w-[170px] text-castanha-600 text-[1rem] font-normal leading-[1.28225rem]">Conduzidos com eficiência e cuidado</p>
              </div>
              <div>
                <p className="text-ink text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-medium leading-none">Confiança</p>
                <p className="text-castanha-600 text-[1rem] font-semibold leading-[1.28225rem] uppercase mt-[10px]">De clientes</p>
                <p className="mt-2 w-full max-w-[170px] text-castanha-600 text-[1rem] font-normal leading-[1.28225rem]">Feita para pessoas e pequenos negócios do Brasil</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
    </FadeInSection>
  );
}
