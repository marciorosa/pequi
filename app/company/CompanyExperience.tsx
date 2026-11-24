'use client';

import Image from 'next/image';
import FadeInSection from '../components/landingpage/FadeInSection';
import { ClosingCta, FeatureList } from '../components/landingpage/ProductBlocks';
import { container } from '../components/landingpage/SectionHeader';

// Página "Sobre" (2026-11-24), no estilo editorial do site: sem caixas
// aninhadas. Ficaram só pessoas reais da equipe; investidores e executivos de
// exemplo do modelo antigo foram retirados.
const leaders = [
  {
    name: 'Marcio Rosa',
    position: 'Diretor executivo (CEO)',
    bio: 'Estratégia em legal tech, com foco em IA confiável para escritórios.',
  },
  {
    name: 'Luiz Felipe de Oliveira',
    position: 'Sócio fundador · Direito Digital',
    bio: 'Advogado especialista em Direito Digital, LGPD e Direito Contratual.',
  },
];

const values = [
  { title: 'Inovação', text: 'Tecnologia de ponta sem perder de vista a rotina real do escritório.' },
  { title: 'Excelência', text: 'Segurança, precisão e bom atendimento, todos os dias.' },
  { title: 'Integridade', text: 'Transparência sobre recursos, limites e uso dos dados.' },
  { title: 'Foco no escritório', text: 'Vencemos quando o escritório atende melhor os clientes.' },
];

const initials = (name: string) =>
  name
    .split(' ')
    .filter((p) => p.length > 2)
    .slice(0, 2)
    .map((p) => p[0])
    .join('');

export default function CompanyExperience() {
  return (
    <>
      <section className="pb-16 pt-32 sm:pt-36 lg:pb-20">
        <div className={`${container} grid gap-8 lg:grid-cols-2 lg:items-end`}>
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ink/45">Sobre o Pequi</p>
            <h1 className="mt-5 text-[clamp(2.6rem,5.6vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.04em] text-ink">
              IA jurídica com a marca do escritório
            </h1>
          </div>
          <p className="max-w-[500px] text-[1.05rem] leading-relaxed text-ink/65 lg:justify-self-end">
            Criamos IA que respeita a advocacia. O escritório oferece aos clientes uma assistente com a própria marca, e a análise
            de cada caso continua com o advogado.
          </p>
        </div>
      </section>

      <FadeInSection>
        <section className="py-16 lg:py-20">
          <div className={`${container} grid gap-12 lg:grid-cols-2 lg:gap-16`}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image src="/landingpage/hero/colunas.jpg" alt="Colunas de um palácio da justiça" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 600px" />
            </div>
            <div className="self-center">
              <h2 className="text-[clamp(2.1rem,4.4vw,3.6rem)] font-medium leading-[1.04] tracking-[-0.035em] text-ink">Por que Pequi</h2>
              <p className="mt-5 max-w-[520px] text-[1.02rem] leading-relaxed text-ink/65">
                O pequi é o fruto do Cerrado de casca dura, polpa valiosa e espinhos escondidos, como o Direito. Advogados e
                criadores de produto trabalham juntos para que cada resposta reflita a prática jurídica.
              </p>
              <dl className="mt-8 border-t border-ink/12">
                <div className="grid gap-1 border-b border-ink/12 py-4 sm:grid-cols-[8rem_1fr] sm:gap-6">
                  <dt className="font-medium text-ink">Missão</dt>
                  <dd className="text-ink/65">Dar a cada escritório uma IA com a própria marca, com o advogado no comando de cada caso.</dd>
                </div>
                <div className="grid gap-1 border-b border-ink/12 py-4 sm:grid-cols-[8rem_1fr] sm:gap-6">
                  <dt className="font-medium text-ink">Visão</dt>
                  <dd className="text-ink/65">Uma advocacia mais próxima dos clientes, com direitos mais claros para quem procura ajuda.</dd>
                </div>
                <div className="grid gap-1 border-b border-ink/12 py-4 sm:grid-cols-[8rem_1fr] sm:gap-6">
                  <dt className="font-medium text-ink">Onde</dt>
                  <dd className="text-ink/65">Brasília, São Paulo e Campinas.</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FeatureList tone="sand" title="Nossos valores" text="O que guia cada decisão de produto." items={values} />

      <FadeInSection>
        <section className="py-20 lg:py-28">
          <div className={container}>
            <h2 className="text-[clamp(2.1rem,4.4vw,3.6rem)] font-medium leading-[1.04] tracking-[-0.035em] text-ink">Liderança</h2>
            <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {leaders.map((l) => (
                <article key={l.name} className="border-t border-ink/20 pt-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#151816] text-[1rem] font-medium text-white">
                    {initials(l.name)}
                  </div>
                  <h3 className="mt-5 text-[1.3rem] font-medium tracking-[-0.02em] text-ink">{l.name}</h3>
                  <p className="mt-1 text-[0.85rem] text-ink/50">{l.position}</p>
                  <p className="mt-3 max-w-[22rem] text-[0.98rem] leading-relaxed text-ink/65">{l.bio}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      <ClosingCta
        title="Vamos levar a IA ao seu escritório"
        text="Uma conversa de 20 minutos para mostrar o Pequi com a sua marca."
        action={{ label: 'Falar com a equipe', href: '/contact' }}
      />
    </>
  );
}
