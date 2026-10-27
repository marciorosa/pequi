import Image from 'next/image';
import FadeInSection from './FadeInSection';
import { sectionHeadingClass } from './sectionStyles';

export default function WhySection() {
  return (
    <FadeInSection delay={0.14}>
      <section id="why" className="scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
        <div className="landing-surface p-6 md:p-10 lg:p-12">
          <h3 className={sectionHeadingClass}>Impulsionando o futuro do trabalho jurídico</h3>
          <p className="mt-5 mx-auto w-full max-w-[46rem] text-castanha-600 text-center text-[1rem] md:text-[1.125rem] lg:text-[1.25rem] font-normal leading-[160%]">
            Uma plataforma unificada criada para simplificar operações jurídicas complexas, aprimorar a tomada de decisões e dar agilidade
            a cada fluxo de trabalho.
          </p>

          <div className="mt-10 grid lg:grid-cols-[1.15fr_0.85fr] gap-6 items-stretch">
            <div className="landing-card p-5 md:p-7">
              <div className="relative rounded-[1.25rem] min-h-[320px] md:min-h-[470px] overflow-hidden">
                <Image
                  src="/landingpage/futureoflegal/img-left.png"
                  alt="Impulsionando o futuro do trabalho jurídico"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="landing-card p-5 md:p-6">
                <h4 className="text-ink text-[1.25rem] md:text-[1.35rem] font-medium leading-[1.35]">Infraestrutura jurídica inteligente</h4>
                <ul className="mt-4 space-y-2.5 text-castanha-600 text-[1rem] leading-[1.55rem]">
                  <li>Plataforma jurídica completa</li>
                  <li>Gestão de casos simplificada</li>
                  <li>Feita para escalar</li>
                  <li>Controles de compliance centralizados</li>
                  <li>Colaboração segura entre equipes</li>
                </ul>
              </div>
              <div className="landing-card p-5 md:p-6">
                <h4 className="text-ink text-[1.25rem] md:text-[1.35rem] font-medium leading-[1.35]">Automação inteligente</h4>
                <ul className="mt-4 space-y-2.5 text-castanha-600 text-[1rem] leading-[1.55rem]">
                  <li>Automatize tarefas rotineiras</li>
                  <li>Insights gerados por IA</li>
                  <li>Menos trabalho manual</li>
                  <li>Extração inteligente de documentos</li>
                  <li>Fluxos de aprovação automatizados</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="landing-card mt-6 p-6 md:p-10 lg:p-[48px]">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <p className="text-ink text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-medium leading-none">10x mais rápido</p>
                <p className="text-castanha-600 text-[1rem] font-semibold leading-[1.28225rem] uppercase mt-[10px]">Fluxos de trabalho</p>
                <p className="mt-2 w-full max-w-[170px] text-castanha-600 text-[1rem] font-normal leading-[1.28225rem]">Acelere pesquisas e o tratamento de documentos</p>
              </div>
              <div>
                <p className="text-ink text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-medium leading-none">24/7</p>
                <p className="text-castanha-600 text-[1rem] font-semibold leading-[1.28225rem] uppercase mt-[10px]">Suporte de IA</p>
                <p className="mt-2 w-full max-w-[170px] text-castanha-600 text-[1rem] font-normal leading-[1.28225rem]">Assistência contínua sempre que você precisar</p>
              </div>
              <div>
                <p className="text-ink text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-medium leading-none">50K+</p>
                <p className="text-castanha-600 text-[1rem] font-semibold leading-[1.28225rem] uppercase mt-[10px]">Casos gerenciados</p>
                <p className="mt-2 w-full max-w-[170px] text-castanha-600 text-[1rem] font-normal leading-[1.28225rem]">Conduzidos com eficiência entre equipes</p>
              </div>
              <div>
                <p className="text-ink text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-medium leading-none">Confiança</p>
                <p className="text-castanha-600 text-[1rem] font-semibold leading-[1.28225rem] uppercase mt-[10px]">De profissionais</p>
                <p className="mt-2 w-full max-w-[170px] text-castanha-600 text-[1rem] font-normal leading-[1.28225rem]">Usada por equipes jurídicas modernas no mundo todo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
    </FadeInSection>
  );
}
