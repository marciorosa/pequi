'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import FadeInSection from '../components/landingpage/FadeInSection';
import { sectionHeadingClass, sectionSubTextClass } from '../components/landingpage/sectionStyles';
import { trustedByLogos } from '../components/landingpage/data';

const caseCardClass =
  'group overflow-hidden rounded-[1.875rem] border border-[#eceae7] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(16,16,26,0.08)]';

export default function CustomersExperience() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      quote:
        'O Pequi revolucionou nossa prática, economizando centenas de horas e melhorando os resultados dos nossos casos.',
      author: 'Sarah Johnson',
      position: 'Sócia-diretora',
      firm: 'Johnson & Associates',
      image: '/landingpage/hero/img1.png',
    },
    {
      quote:
        'Os insights jurídicos e a automação de documentos nos deram uma vantagem competitiva em um mercado cada vez mais desafiador.',
      author: 'Michael Chen',
      position: 'Diretor jurídico',
      firm: 'Nexus Corporation',
      image: '/landingpage/hero/img2.png',
    },
    {
      quote: "Reduzimos nosso tempo de pesquisa em 70%, mantendo os mais altos padrões de qualidade para nossos clientes.",
      author: 'Elena Rodriguez',
      position: 'Consultora jurídica sênior',
      firm: 'Global Legal Partners',
      image: '/landingpage/hero/img3.png',
    },
  ];

  const stats = [
    { value: '5.000+', label: 'Escritórios de advocacia' },
    { value: '70%', label: 'Tempo médio economizado' },
    { value: '99%', label: 'Satisfação dos clientes' },
    { value: '50 mi+', label: 'Documentos processados' },
  ];

  const caseStudies = [
    {
      title: 'Pesquisa de casos 70% mais rápida',
      description: 'Como um escritório líder em contencioso revolucionou seu processo de pesquisa.',
      tag: 'Contencioso',
      image: '/landingpage/features/ai-legal-assistant.png',
    },
    {
      title: 'Revisão de documentos simplificada',
      description: 'Redução de 85% no tempo de revisão de documentos, com mais precisão.',
      tag: 'M&A',
      image: '/landingpage/features/global-legal-database.png',
    },
    {
      title: 'Análise de contratos com IA',
      description: 'Análise automatizada de contratos que aumentou a produtividade de toda a equipe.',
      tag: 'Societário',
      image: '/landingpage/features/workflow-automation.png',
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
            alt="Hero background"
            fill
            priority
            className="object-cover object-top"
          />
          <div className="relative z-10 mx-auto flex w-full max-w-[1274px] flex-col items-center text-center">
              <p className="text-[0.94444rem] font-normal leading-[1.41663rem] text-[#525252]">Histórias de sucesso</p>
              <h1 className="mt-5 max-w-3xl text-[2.7rem] font-medium leading-[1.08] tracking-[-0.08rem] text-[#10101A] sm:text-[3.25rem] sm:leading-[1.08] sm:tracking-[-0.12rem]">
                Nossos clientes têm sucesso
              </h1>
              <p className="mt-5 max-w-2xl text-[1rem] font-normal leading-[160%] text-[#525252] md:text-[1.125rem] lg:text-[1.25rem]">
                Junte-se aos escritórios e departamentos jurídicos que estão transformando sua forma de trabalhar, com resultados que
                seus clientes percebem.
              </p>
              <Link
                href="/contact"
                className="landing-primary-btn mt-8 inline-flex h-11 items-center justify-center px-6 transition hover:brightness-110"
              >
                Torne-se cliente
              </Link>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.06}>
        <section className="border-b border-[#eceae7] bg-[#FFFFFF] py-12 md:py-14">
          <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
            <div className="rounded-[1.5rem] border border-[#eceae7] bg-[#f1f0ee]/65 px-6 py-10 md:px-10 md:py-12">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-[#10101A] text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-medium leading-none">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-[#525252] text-[0.8125rem] md:text-[0.875rem] font-semibold uppercase tracking-[0.08em]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.08}>
        <section className="bg-[#FFFFFF] py-16 lg:py-[5.5rem] scroll-mt-24 md:scroll-mt-28">
          <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
            <h2 className={sectionHeadingClass}>O que nossos clientes dizem</h2>
            <p className={`${sectionSubTextClass} mt-4 mb-10 md:mb-12`}>
              Depoimentos de escritórios que usam o Pequi todos os dias.
            </p>

            <div className="mb-8 rounded-[1.875rem] border border-[#eceae7] bg-white p-8 shadow-[0_24px_64px_rgba(16,16,26,0.06)] md:p-12 lg:p-14">
              <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">
                <div className="mx-auto h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-[#e7e5e1] shadow-sm md:h-28 md:w-28 lg:mx-0">
                  <Image
                    src={testimonials[activeTestimonial].image}
                    alt=""
                    width={112}
                    height={112}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <svg
                    className="mx-auto mb-4 h-9 w-9 text-[#10101A]/12 lg:mx-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="mb-8 text-[1.125rem] leading-[160%] text-[#525252] italic md:text-[1.25rem]">
                    &quot;{testimonials[activeTestimonial].quote}&quot;
                  </p>
                  <div>
                    <p className="text-[#10101A] text-[1.125rem] font-medium">{testimonials[activeTestimonial].author}</p>
                    <p className="mt-2 text-[0.8125rem] font-medium uppercase tracking-[0.1em] text-[#525252]">
                      {testimonials[activeTestimonial].position} · {testimonials[activeTestimonial].firm}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveTestimonial(index)}
                  className={`transition-all rounded-full h-2 ${
                    activeTestimonial === index ? 'w-8 bg-[#1A1A1A]' : 'w-2 bg-[#cfcac3] hover:bg-[#bdb6ac]'
                  }`}
                  aria-label={`Ver depoimento ${index + 1}`}
                  aria-current={activeTestimonial === index ? 'true' : undefined}
                />
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <section className="border-y border-[#eceae7] bg-[#FFFFFF] py-14 md:py-16">
          <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
            <p className="mb-8 text-center text-[1rem] font-medium leading-[130%] text-[#10101A] md:mb-10 md:text-[1.125rem]">
              A escolha de instituições jurídicas de nível mundial
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
              {trustedByLogos.map((logo) => (
                <div
                  key={logo.src}
                  className="flex h-[4.5rem] items-center justify-center rounded-[1rem] border border-[#e7e5e1] bg-[#f1f0ee] px-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(16,16,26,0.05)] md:h-[5rem]"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={160}
                    height={26}
                    className="h-[18px] md:h-[22px] w-auto max-w-[90%] object-contain opacity-75"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.12}>
        <section className="bg-[#FFFFFF] pb-16 lg:pb-[7rem]">
          <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
            <h2 className={sectionHeadingClass}>Histórias de sucesso</h2>
            <p className={`${sectionSubTextClass} mt-4 mb-10 md:mb-12`}>
              Uma visão aprofundada de como as equipes usam o Pequi em contencioso, transações e direito corporativo.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {caseStudies.map((study) => (
                <article key={study.title} className={caseCardClass}>
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-[#f0efed] bg-[#f1f0ee]">
                    <Image
                      src={study.image}
                      alt=""
                      fill
                      className="object-contain p-4 md:p-5 transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-block rounded-md bg-[#1A1A1A] px-3 py-1.5 text-[0.625rem] font-medium uppercase tracking-[0.12em] text-white">
                        {study.tag}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <h3 className="mb-3 text-[1.25rem] font-medium leading-tight text-[#10101A]">{study.title}</h3>
                    <p className="mb-6 text-[0.9375rem] leading-[160%] text-[#525252]">{study.description}</p>
                    <Link
                      href="/case-studies"
                      className="group/link inline-flex items-center gap-2 text-[0.9375rem] font-medium text-[#10101A] transition-opacity hover:opacity-80"
                    >
                      Ler o caso
                      <svg
                        className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
