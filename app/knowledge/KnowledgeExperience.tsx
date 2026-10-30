'use client';

import Link from 'next/link';
import Image from 'next/image';
import FadeInSection from '../components/landingpage/FadeInSection';
import { sectionHeadingClass, sectionSubTextClass } from '../components/landingpage/sectionStyles';

const featureCardClass =
  'flex min-h-[240.8px] flex-col rounded-2xl border border-castanha-150 bg-castanha-100/85 px-5 py-5 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(31,42,23,0.06)]';

function FeatureIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg className="h-10 w-10 text-castanha-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      {children}
    </svg>
  );
}

export default function KnowledgeExperience() {
  const features = [
    {
      title: 'Pesquisa abrangente',
      desc: 'Pesquise leis, decisões, regulamentos e explicações em diversas jurisdições, com compreensão real da sua pergunta.',
      icon: (
        <FeatureIcon>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </FeatureIcon>
      ),
    },
    {
      title: 'Citações precisas',
      desc: 'As respostas remetem às fontes primárias para que você possa verificar, citar e aprofundar-se nas referências que importam.',
      icon: (
        <FeatureIcon>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
          />
        </FeatureIcon>
      ),
    },
    {
      title: 'Compreensão contextual',
      desc: 'As respostas consideram jurisdição, período e área de atuação, para que a pesquisa corresponda à forma como a pergunta é feita.',
      icon: (
        <FeatureIcon>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
          />
        </FeatureIcon>
      ),
    },
    {
      title: 'Resultados instantâneos',
      desc: 'Transforme horas de pesquisa em segundos, sem abrir mão do rigor que seus casos exigem.',
      icon: (
        <FeatureIcon>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
          />
        </FeatureIcon>
      ),
    },
    {
      title: 'Consultas personalizáveis',
      desc: 'Filtre por jurisdição, instância, tipo de documento, período e força do precedente.',
      icon: (
        <FeatureIcon>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
          />
        </FeatureIcon>
      ),
    },
    {
      title: 'Exportação e integração',
      desc: 'Envie os resultados para Word, PDF ou seu sistema de gestão de documentos com formatação e estilos de citação consistentes.',
      icon: (
        <FeatureIcon>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
          />
        </FeatureIcon>
      ),
    },
  ];

  const citations = [
    {
      title: 'California Business and Professions Code § 16600',
      body: '"Salvo o disposto neste capítulo, todo contrato pelo qual alguém seja impedido de exercer profissão, ofício ou negócio lícito de qualquer natureza é nulo nessa medida."',
    },
    {
      title: 'AMN Services, LLC v. Aya Healthcare Services, Inc., 28 Cal. App. 5th 923 (2018)',
      body: 'O Tribunal de Apelação confirmou que acordos de não aliciamento geralmente são inexequíveis na Califórnia, pois restringem a mobilidade dos empregados.',
    },
    {
      title: 'Edwards v. Arthur Andersen LLP, 44 Cal. 4th 937 (2008)',
      body: 'A Suprema Corte da Califórnia rejeitou a exceção de "restrição limitada" à Seção 16600, entendendo que mesmo acordos de não concorrência de alcance restrito são inválidos na Califórnia.',
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
          <div className="relative z-10 mx-auto w-full max-w-[1274px]">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.02fr] lg:gap-14">
              <div className="text-left">
                <p className="text-[0.94444rem] font-normal leading-[1.41663rem] text-castanha-600">Pequi</p>
                <h1 className="mt-5 max-w-[700px] font-medium leading-[1.08] tracking-[-0.08rem] text-ink text-[2.7rem] sm:text-[3.25rem] sm:leading-[1.08] sm:tracking-[-0.12rem]">
                  Conhecimento
                </h1>
                <p className="mt-3 max-w-xl text-xl font-medium leading-snug text-castanha-800 md:text-2xl">
                  Pesquisa rápida, resultados fundamentados
                </p>
                <p className="mt-5 max-w-xl text-[1rem] font-normal leading-[1.5rem] text-castanha-600 md:text-[1.125rem] lg:text-[1.25rem]">
                  Respostas sobre consumo, trabalho, família e moradia, com citações confiáveis de fontes
                  oficiais.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/contact"
                    className="landing-primary-btn inline-flex h-11 items-center justify-center px-6 transition"
                  >
                    Tirar minhas dúvidas
                  </Link>
                  <button
                    type="button"
                    onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                    className="landing-secondary-btn inline-flex h-[2.83331rem] min-w-[10.81025rem] items-center justify-center px-6 transition hover:bg-castanha-150"
                  >
                    Ver demonstração
                  </button>
                </div>
              </div>

              <div className="relative min-h-[280px] sm:min-h-[340px] lg:min-h-[380px]">
                <div className="flex h-full min-h-[inherit] flex-col rounded-2xl border border-castanha-150 p-5 sm:p-6">
                  <div className="relative min-h-[220px] flex-1 sm:min-h-[280px] lg:min-h-[300px]">
                    <Image
                      src="/landingpage/features/ai-powered-legal-assistant.png"
                      alt="Pesquisa de inteligência jurídica com IA"
                      fill
                      className="object-contain object-center"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.08}>
        <section className="bg-white py-16 lg:py-[5.5rem] scroll-mt-24 md:scroll-mt-28">
          <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
            <h2 className={sectionHeadingClass}>Pesquisa jurídica descomplicada</h2>
            <p className={`${sectionSubTextClass} mt-4 mb-10 md:mb-12`}>
              Tudo o que você precisa para ir da pergunta à resposta fundamentada: rápido, rastreável e pronto para o seu dia a dia.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((f) => (
                <div key={f.title} className={featureCardClass}>
                  <div className="inline-flex w-full items-center justify-start">{f.icon}</div>
                  <div className="mt-auto pt-6">
                    <h3 className="text-[1.125rem] font-medium leading-[1.575rem] text-castanha-800">{f.title}</h3>
                    <p className="mt-2 text-[1rem] font-normal leading-[1.4rem] text-castanha-800">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <section id="demo" className="bg-white pb-16 lg:pb-[5.5rem] scroll-mt-24 md:scroll-mt-28">
          <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
            <h2 className={sectionHeadingClass}>Experimente a pesquisa de conhecimento</h2>
            <p className={`${sectionSubTextClass} mt-4 mb-10 md:mb-12`}>
              Um exemplo de consulta e resultados estruturados, apenas ilustrativo e sem caráter de aconselhamento jurídico.
            </p>

            <div className="landing-surface mx-auto max-w-4xl overflow-hidden shadow-[0_24px_64px_rgba(31,42,23,0.06),0_48px_100px_rgba(31,42,23,0.04)] transition-shadow duration-300 hover:shadow-[0_28px_72px_rgba(31,42,23,0.08)]">
              <div className="border-b border-castanha-200 p-6 md:p-8">
                <h3 className="mb-4 text-[1.125rem] font-medium text-ink md:text-[1.25rem]">Digite sua consulta de pesquisa jurídica</h3>
                <div className="mb-6 rounded-[0.875rem] border border-castanha-200 bg-castanha-100 p-5">
                  <p className="text-[0.9375rem] italic leading-[160%] text-castanha-600">
                    &quot;Quais são os requisitos para a validade de cláusulas de não concorrência na Califórnia?&quot;
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  {(['Jurisdição', 'Tipo de documento'] as const).map((label) => (
                    <div key={label} className="sm:flex-1">
                      <label className="mb-2 block text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-castanha-600">
                        {label}
                      </label>
                      <select
                        className="w-full rounded-[0.875rem] border border-castanha-200 bg-castanha-100 px-4 py-3.5 text-[0.9375rem] text-ink focus:border-castanha-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pequi-500/32"
                        aria-label={label}
                      >
                        <option>{label === 'Jurisdição' ? 'Todas as jurisdições' : 'Todos os documentos'}</option>
                        {label === 'Jurisdição'
                          ? ['Estados Unidos (Federal)', 'Califórnia', 'Nova York', 'Delaware'].map((o) => (
                              <option key={o}>{o}</option>
                            ))
                          : ['Jurisprudência', 'Legislação', 'Regulamentos', 'Fontes secundárias'].map((o) => (
                              <option key={o}>{o}</option>
                            ))}
                      </select>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-[0.875rem] bg-cerrado-800 px-8 py-3.5 text-[0.9375rem] font-medium text-white transition-all duration-300 hover:brightness-110 hover:shadow-[0_10px_24px_rgba(31,42,23,0.15)]"
                >
                  Pesquisar
                </button>
              </div>

              <div className="bg-castanha-100/45 p-6 md:p-8">
                <h3 className="mb-4 text-[1.125rem] font-medium text-ink md:text-[1.25rem]">Resultados da pesquisa</h3>
                <div className="rounded-[1.25rem] border border-castanha-150 bg-white p-6 md:p-8">
                  <p className="mb-6 text-[0.9375rem] leading-[160%] text-castanha-600">
                    <span className="font-medium text-ink">Resumo:</span> Cláusulas de não concorrência na Califórnia
                    geralmente são inexequíveis, exceto em circunstâncias muito limitadas. A Seção 16600 do California Business and Professions
                    Code reflete uma forte política pública contra restrições ao exercício profissional.
                  </p>
                  <div className="space-y-6">
                    {citations.map((cite) => (
                      <div key={cite.title} className="border-l-2 border-cerrado-900/18 py-1 pl-5">
                        <p className="mb-2 text-[0.9375rem] font-medium text-ink">{cite.title}</p>
                        <p className="text-[0.9375rem] leading-[160%] text-castanha-600">{cite.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.12}>
        <section className="bg-white pb-16 lg:pb-[7rem]">
          <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
            <div className="mx-auto max-w-4xl overflow-hidden rounded-[1.875rem] border border-castanha-150 bg-white shadow-[0_24px_64px_rgba(31,42,23,0.06)]">
              <div className="md:flex">
                <div className="md:w-[min(280px,36%)] shrink-0 bg-cerrado-800 p-8 md:p-10 flex items-center justify-center min-h-[200px] md:min-h-0">
                  <div className="text-center md:text-left">
                    <p className="text-white text-[1.25rem] md:text-[1.375rem] font-medium leading-snug">
                      Escritório de advocacia internacional
                    </p>
                    <p className="mt-2 text-white/60 text-[0.6875rem] font-medium uppercase tracking-[0.14em]">
                      Global 100
                    </p>
                  </div>
                </div>
                <div className="flex-1 p-8 md:p-10">
                  <h3 className="mb-5 text-[1.5rem] font-medium leading-tight text-ink md:text-[1.75rem]">
                    Tempo de pesquisa reduzido em 75%
                  </h3>
                  <p className="mb-8 text-[1rem] leading-[160%] text-castanha-600">
                    &quot;A plataforma Knowledge do Pequi transformou nosso processo de pesquisa. Nossos associados agora
                    concluem em minutos o que antes levava horas. A precisão das citações e a profundidade das análises
                    impressionaram até nossos sócios mais experientes.&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-px w-8 shrink-0 bg-castanha-200" />
                    <p className="text-[0.9375rem] font-medium text-castanha-600">Sócio-diretor, escritório de advocacia global</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
