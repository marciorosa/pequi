'use client';

import Link from 'next/link';
import Image from 'next/image';
import FadeInSection from '../components/landingpage/FadeInSection';
import { sectionHeadingClass, sectionSubTextClass } from '../components/landingpage/sectionStyles';

const featureCardClass =
  'flex min-h-[200px] flex-col rounded-2xl border border-castanha-150 bg-castanha-100/85 px-5 py-5 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(31,42,23,0.06)] md:px-6 md:py-8 lg:p-[40px]';

const heroAvatars = [
  '/landingpage/hero/img1.png',
  '/landingpage/hero/img2.png',
  '/landingpage/hero/img3.png',
  '/landingpage/hero/img4.png',
  '/landingpage/hero/img5.png',
];

export default function CompanyExperience() {
  const executives = [
    {
      name: 'Michael Chen',
      position: 'Diretor executivo (CEO)',
      bio: 'Ex-líder de estratégia em legal tech; focado em entregar IA de nível corporativo sem abrir mão da confiança.',
      image: heroAvatars[0],
    },
    {
      name: 'Sarah Johnson',
      position: 'Diretora de produto (CPO)',
      bio: 'Cria fluxos de trabalho que os advogados realmente adotam, unindo prática jurídica, design e avaliação de modelos.',
      image: heroAvatars[1],
    },
    {
      name: 'David Wilson',
      position: 'Diretor de tecnologia (CTO)',
      bio: 'Experiência em ML aplicado e sistemas seguros; defensor da privacidade, das avaliações e do rigor operacional.',
      image: heroAvatars[2],
    },
    {
      name: 'Elena Rodriguez',
      position: 'Diretora de receita (CRO)',
      bio: 'GTM corporativo para softwares jurídicos e de compliance; trabalha lado a lado com diretores jurídicos e equipes de inovação.',
      image: heroAvatars[3],
    },
  ];

  const investors = [
    {
      name: 'Marc Andreessen',
      designation: 'Cofundador e sócio-geral',
      firm: 'Andreessen Horowitz',
      image: heroAvatars[1],
    },
    {
      name: 'Neil Sequoia',
      designation: 'Sócio-diretor',
      firm: 'Sequoia Capital',
      image: heroAvatars[2],
    },
    {
      name: 'Sarah Chen',
      designation: 'Sócia',
      firm: 'Bessemer Venture Partners',
      image: heroAvatars[3],
    },
    {
      name: 'James Rodriguez',
      designation: 'Sócio-geral',
      firm: 'Accel',
      image: heroAvatars[4],
    },
  ];

  const values = [
    {
      title: 'Inovação',
      description: 'Expandimos os limites da tecnologia jurídica sem perder de vista a prática do dia a dia.',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      ),
    },
    {
      title: 'Excelência',
      description: 'Altos padrões de segurança, precisão e atendimento aos clientes, todos os dias.',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      ),
    },
    {
      title: 'Integridade',
      description: 'Transparência sobre recursos, limitações e a forma como os dados dos clientes são tratados.',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
        />
      ),
    },
    {
      title: 'Foco no cliente',
      description: 'Vencemos quando as equipes jurídicas alcançam resultados melhores; nosso roadmap é guiado por esse padrão.',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      ),
    },
  ];

  return (
    <>
      <FadeInSection>
        <section
          id="hero"
          className="relative -mt-20 overflow-hidden px-4 pb-12 pt-[12rem] sm:px-6 sm:pt-[13rem] lg:px-8 lg:pb-16 lg:pt-[12rem] scroll-mt-24 md:scroll-mt-28"
        >
          <Image
            src="/landingpage/hero/hero-bgimg.png"
            alt="Imagem de fundo"
            fill
            priority
            className="object-cover object-top"
          />
          <div className="relative z-10 mx-auto flex w-full max-w-[1274px] flex-col items-center text-center">
            <p className="text-[0.94444rem] font-normal leading-[1.41663rem] text-castanha-600">Sobre a Pequi</p>
            <h1 className="mt-5 max-w-3xl text-[2.7rem] font-medium leading-[1.08] tracking-[-0.08rem] text-ink sm:text-[3.25rem] sm:leading-[1.08] sm:tracking-[-0.12rem]">
              Transformando a prática jurídica
            </h1>
            <p className="mt-5 max-w-2xl text-[1rem] font-normal leading-[160%] text-castanha-600 md:text-[1.125rem] lg:text-[1.25rem]">
              Desenvolvemos IA que respeita a advocacia, para que escritórios e departamentos jurídicos avancem mais rápido sem abrir mão
              do discernimento ou da governança.
            </p>
            <Link
              href="/careers"
              className="landing-primary-btn mt-8 inline-flex h-11 items-center justify-center px-6 transition"
            >
              Ver carreiras
            </Link>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.06}>
        <section className="bg-white py-16 lg:py-[5.5rem]">
          <div className="mx-auto max-w-[1274px] px-4 md:px-8 lg:px-6 xl:px-0">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="mb-3 text-[0.94444rem] font-normal leading-[1.41663rem] text-castanha-600">Quem somos</p>
                <h2 className="text-[2rem] font-medium leading-[1.1] text-ink md:text-[2.5rem] lg:text-[3rem]">
                  Sobre a Pequi
                </h2>
                <p className="mt-5 text-[1rem] leading-[160%] text-castanha-600 md:text-[1.125rem]">
                  Fundada em 2020, a Pequi está na interseção entre a prática jurídica e a IA aplicada, entregando ferramentas de pesquisa,
                  redação e fluxos de trabalho que as equipes podem implantar com salvaguardas claras.
                </p>
                <p className="mt-4 text-[1rem] leading-[160%] text-castanha-600 md:text-[1.125rem]">
                  Advogados, pesquisadores e criadores de produto trabalham lado a lado para que o produto reflita como processos,
                  contratos e compliance funcionam na prática.
                </p>
                <p className="mt-4 text-[1rem] leading-[160%] text-castanha-600 md:text-[1.125rem]">
                  Com escritórios em Brasilia, São Paulo e Campinas, temos uma equipe pronta para oferecer a melhor IA para proteger seu patrimônio e seu direto.
                </p>
              </div>
              <div className="relative">
                <div className="overflow-hidden rounded-[1.875rem] border border-castanha-150 bg-white p-3 shadow-[0_24px_64px_rgba(31,42,23,0.06)] md:p-4">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-castanha-100">
                    <Image
                      src="/landingpage/features/workflow-automation.png"
                      alt=""
                      fill
                      className="object-contain p-4 md:p-6"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.08}>
        <section className="border-t border-castanha-150 bg-white pb-16 lg:pb-[5.5rem]">
          <div className="mx-auto max-w-[1274px] px-4 pt-16 md:px-8 lg:px-6 lg:pt-[5.5rem] xl:px-0">
            <div className="grid gap-5 md:grid-cols-2">
              <div className={featureCardClass}>
                <div className="mb-6 inline-flex w-full items-center justify-start">
                  <svg className="h-10 w-10 text-castanha-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div className="mt-auto">
                  <h3 className="mb-4 text-[1.5rem] font-medium leading-tight text-castanha-800 md:text-[1.75rem]">Nossa missão</h3>
                  <p className="text-[1rem] leading-[160%] text-castanha-800 md:text-[1.0625rem]">
                    Capacitar profissionais do Direito com IA que aumenta a agilidade e a consistência, mantendo as pessoas no comando
                    da estratégia, da ética e do aconselhamento aos clientes.
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-cerrado-800 bg-cerrado-800 p-6 text-white shadow-[0_20px_40px_rgba(31,42,23,0.18)] transition-all duration-300 hover:-translate-y-0.5 md:p-8 lg:p-[40px]">
                <div className="mb-6 inline-flex w-full items-center justify-start">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
                  <svg className="h-7 w-7 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  </div>
                </div>
                <h3 className="mb-4 text-[1.5rem] font-medium leading-tight md:text-[1.75rem]">Nossa visão</h3>
                <p className="text-[1rem] leading-[160%] text-white/80 md:text-[1.0625rem]">
                  Um mundo em que a IA e o conhecimento jurídico se fortalecem mutuamente, tornando o trabalho jurídico sofisticado mais escalável
                  e mais acessível onde ele mais importa.
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <section className="bg-white pb-16 lg:pb-[5.5rem]">
          <div className="mx-auto max-w-[1274px] px-4 md:px-8 lg:px-6 xl:px-0">
            <h2 className={sectionHeadingClass}>Nossos valores essenciais</h2>
            <p className={`${sectionSubTextClass} mt-4 mb-10 md:mb-12`}>
              Princípios presentes na forma como desenvolvemos, vendemos e damos suporte à plataforma.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {values.map((value) => (
                <div key={value.title} className={featureCardClass}>
                  <div className="mb-6 inline-flex w-full items-center justify-start">
                    <svg className="h-10 w-10 text-castanha-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      {value.icon}
                    </svg>
                  </div>
                  <div className="mt-auto">
                    <h3 className="text-[1.125rem] font-medium leading-[1.575rem] text-castanha-800">{value.title}</h3>
                    <p className="mt-2 text-[1rem] leading-[1.4rem] text-castanha-800">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.12}>
        <section className="border-t border-castanha-150 bg-white pb-16 lg:pb-[5.5rem]">
          <div className="mx-auto max-w-[1274px] px-4 pt-16 md:px-8 lg:px-6 lg:pt-[5.5rem] xl:px-0">
            <h2 className={sectionHeadingClass}>Liderança</h2>
            <p className={`${sectionSubTextClass} mt-4 mb-10 md:mb-12`}>
              Executivos e criadores com ampla experiência em Direito, software corporativo e IA.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {executives.map((executive) => (
                <article
                  key={executive.name}
                  className="group overflow-hidden rounded-[1.875rem] border border-castanha-150 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(31,42,23,0.08)]"
                >
                  <div className="relative aspect-square overflow-hidden border-b border-castanha-150 bg-castanha-100">
                    <Image
                      src={executive.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, 25vw"
                    />
                  </div>
                  <div className="p-6 md:p-7">
                    <h3 className="text-[1.125rem] font-medium text-ink">{executive.name}</h3>
                    <p className="mb-3 mt-2 text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-castanha-600">
                      {executive.position}
                    </p>
                    <p className="text-[0.9375rem] leading-[160%] text-castanha-600">{executive.bio}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.14}>
        <section className="bg-white pb-16 lg:pb-[5.5rem]">
          <div className="mx-auto max-w-[1274px] px-4 md:px-8 lg:px-6 xl:px-0">
            <h2 className={sectionHeadingClass}>Apoiada por investidores de referência</h2>
            <p className={`${sectionSubTextClass} mt-4 mb-10 md:mb-12`}>
              Parceiros que entendem apostas de longo prazo em software regulado e de missão crítica.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {investors.map((investor) => (
                <article
                  key={investor.name}
                  className="group overflow-hidden rounded-[1.875rem] border border-castanha-150 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(31,42,23,0.08)]"
                >
                  <div className="relative aspect-square overflow-hidden border-b border-castanha-150 bg-castanha-100">
                    <Image
                      src={investor.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, 25vw"
                    />
                  </div>
                  <div className="p-6 md:p-7">
                    <h3 className="text-[1.0625rem] font-medium text-ink">{investor.name}</h3>
                    <p className="mt-1 text-[0.875rem] text-castanha-600">{investor.designation}</p>
                    <p className="mt-2 text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-castanha-600">
                      {investor.firm}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.16}>
        <section className="bg-white pb-16 lg:pb-[7rem]">
          <div className="mx-auto max-w-[1274px] px-4 md:px-8 lg:px-6 xl:px-0">
            <div className="rounded-[2rem] border border-castanha-150 bg-castanha-50 px-6 py-12 text-center shadow-[0_24px_64px_rgba(31,42,23,0.06)] md:px-12 md:py-14">
              <h2 className="text-[1.75rem] font-medium leading-tight text-ink md:text-[2.25rem]">Junte-se à nossa missão</h2>
              <p className="mx-auto mt-4 max-w-xl text-[1rem] leading-[160%] text-castanha-600 md:text-[1.125rem]">
                Contratamos pela excelência, curiosidade e respeito pela profissão jurídica. Veja as vagas abertas ou entre em contato.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/careers"
                  className="landing-primary-btn inline-flex h-11 items-center justify-center px-6 transition"
                >
                  Ver vagas abertas
                </Link>
                <Link
                  href="/contact"
                  className="landing-secondary-btn inline-flex h-[2.83331rem] min-w-[10.81025rem] items-center justify-center px-6 transition hover:bg-castanha-150"
                >
                  Fale conosco
                </Link>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
