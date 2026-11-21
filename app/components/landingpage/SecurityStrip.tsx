import FadeInSection from './FadeInSection';
import { sectionHeadingClass } from './sectionStyles';

export default function SecurityStrip() {
  const steps = [
    {
      id: '01',
      title: 'Sua marca',
      desc: 'Cadastre logo, cores, nome e domínio. O painel, a IA e os e-mails passam a falar com o nome do escritório.',
      tone: 'from-cerrado-400 to-cerrado-600',
    },
    {
      id: '02',
      title: 'Chat no site',
      desc: 'Cole o código no site do escritório. A assistente atende os visitantes e pede o contato para a sua equipe.',
      tone: 'from-pequi-500 to-pequi-700',
    },
    {
      id: '03',
      title: 'Clientes',
      desc: 'Os clientes criam a conta no painel do escritório e usam a assistente sem custo, dentro do plano do escritório.',
      tone: 'from-terra-400 to-terra-600',
    },
    {
      id: '04',
      title: 'Acompanhamento',
      desc: 'Na administração do escritório, a equipe vê os clientes e os contatos deixados no chat do site.',
      tone: 'from-cerrado-600 to-cerrado-800',
    },
  ];

  return (
    <FadeInSection delay={0.12}>
      <section id="security" className="bg-cerrado-50 scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
        <div className="rounded-[2rem] p-6 md:p-10 lg:p-12">
          <h3 className={sectionHeadingClass}>Como o escritório <span className="pq-accent text-[1.1em]">começa</span></h3>
          <p className="w-full max-w-[39.1975rem] mx-auto text-center text-castanha-600 text-[1rem] md:text-[1.125rem] lg:text-[1.25rem] font-normal leading-[160%] mt-4">
            Quatro passos para oferecer a assistente jurídica aos seus clientes, com a sua marca.
          </p>

          <div className="mt-10 lg:mt-14">
            <div className="relative mb-5 hidden h-8 lg:block">
              <div className="absolute left-[12.5%] right-[12.5%] top-4 border-t border-dashed border-castanha-300" />
              <div className="absolute left-[12.5%] top-[0.72rem] h-2 w-2 -translate-x-1/2 rounded-sm bg-cerrado-500" />
              <div className="absolute left-[37.5%] top-[0.72rem] h-2 w-2 -translate-x-1/2 rounded-sm bg-pequi-600" />
              <div className="absolute left-[62.5%] top-[0.72rem] h-2 w-2 -translate-x-1/2 rounded-sm bg-terra-500" />
              <div className="absolute left-[87.5%] top-[0.72rem] h-2 w-2 -translate-x-1/2 rounded-sm bg-cerrado-800" />
            </div>
            <div className="grid gap-9 lg:grid-cols-4">
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col items-center text-center">
                  <div className={`relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-b ${step.tone} text-white text-[1.5rem] font-medium shadow-[0_8px_24px_rgba(0,0,0,0.16)]`}>
                    {step.id}
                  </div>
                  <h4 className="mt-5 text-ink text-center text-[1.5rem] font-medium leading-[2.1rem]">
                    {step.title}
                  </h4>
                  <p className="mt-3 max-w-[24rem] text-castanha-600 text-[1rem] font-normal leading-[1.55rem]">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </section>
    </FadeInSection>
  );
}
