import { sectionHeadingClass, sectionSubTextClass } from './sectionStyles';
import FadeInSection from './FadeInSection';
import Image from 'next/image';

const testimonialCards = [
  {
    quote:
      'Antes de usar o Pequi, eu quase não recebia retornos. Depois de otimizar as palavras-chave e reescrever meu currículo com a IA, comecei a receber convites para entrevistas em uma semana. O processo foi rápido, simples e surpreendentemente preciso.',
    author: 'Nantaraya',
    role: 'Especialista em Marketing',
    image: '/landingpage/hero/img1.png',
    size: 'large',
  },
  {
    quote:
      'No começo eu estava cético, mas o Pequi transformou meu fluxo de trabalho jurídico. As recomendações da IA me ajudaram a destacar meus pontos fortes, e consegui uma vaga na área jurídica poucos dias depois de me candidatar.',
    author: 'Jamal',
    role: 'Engenheiro de Software',
    image: '/landingpage/hero/img2.png',
    size: 'large',
  },
  {
    quote:
      'O recurso de feedback em tempo real do Pequi me ajudou a identificar cláusulas frágeis e melhorá-las na hora. Reescrevi minha minuta em menos de 20 minutos, e ela ficou muito mais profissional e estruturada.',
    author: 'Daniel',
    role: 'Designer de UI',
    image: '/landingpage/hero/img3.png',
    size: 'small',
  },
  {
    quote:
      'Compartilhei apenas os links do meu GitHub e do meu portfólio, e o Pequi os transformou em seções de perfil jurídico claras e bem escritas. Economizei horas de escrita e consegui explicar meu trabalho muito melhor.',
    author: 'Kenji',
    role: 'Designer de UI',
    image: '/landingpage/hero/img4.png',
    size: 'small',
  },
  {
    quote:
      'Recém-formada, eu não fazia ideia de como escrever um bom currículo jurídico. O Pequi me guiou passo a passo e me ajudou a destacar minhas habilidades, mesmo com pouca experiência.',
    author: 'Aaliyah',
    role: 'Marketing',
    image: '/landingpage/hero/img5.png',
    size: 'small',
  },
];

export default function TestimonialSection() {
  const topCards = testimonialCards.filter((item) => item.size === 'large');
  const bottomCards = testimonialCards.filter((item) => item.size === 'small');

  return (
    <FadeInSection delay={0.16}>
      <section id="testimonials" className="bg-cerrado-50 scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-[1274px] mx-auto px-4 py-[60px] md:px-8 lg:px-6 xl:px-0">
        <h3 className={sectionHeadingClass}>O que nossos usuários dizem</h3>
        <p className={`${sectionSubTextClass} mt-4 mb-10`}>
          Opiniões de pessoas que usam IA para entender seus direitos, contratos e documentos do dia a dia.
        </p>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {topCards.map((item) => (
              <article key={item.author} className="landing-card p-6 md:p-7 min-h-[17.5rem]">
                <p className="text-[4rem] leading-none font-medium text-castanha-300">&ldquo;</p>
                <p className="mt-3 text-ink text-[1.02rem] font-normal leading-[1.45rem]">{item.quote}</p>
                <div className="mt-7 flex items-center gap-3">
                  <Image src={item.image} alt={item.author} width={34} height={34} className="h-[34px] w-[34px] rounded-full object-cover" />
                  <p className="text-ink text-[1rem] font-normal leading-[1.35rem]">
                    {item.author}, {item.role}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {bottomCards.map((item) => (
              <article key={item.author} className="landing-card p-5 md:p-6 min-h-[15.5rem]">
                <p className="text-ink text-[1.02rem] font-normal leading-[1.45rem]">{item.quote}</p>
                <div className="mt-6 flex items-center gap-3">
                  <Image src={item.image} alt={item.author} width={34} height={34} className="h-[34px] w-[34px] rounded-full object-cover" />
                  <p className="text-ink text-[1rem] font-normal leading-[1.35rem]">
                    {item.author}, {item.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      </section>
    </FadeInSection>
  );
}
