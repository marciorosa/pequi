'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import FadeInSection from '../components/landingpage/FadeInSection';
import { NEWS_ARTICLES } from './newsData';

const tabIds = ['all', 'product', 'company', 'industry', 'partnership', 'press'] as const;
type NewsTab = (typeof tabIds)[number];

const tabLabels: Record<NewsTab, string> = {
  all: 'Todas',
  product: 'Produto',
  company: 'Empresa',
  industry: 'Setor',
  partnership: 'Parcerias',
  press: 'Imprensa',
};

const articles = NEWS_ARTICLES;

const articleCardImageShell = 'relative aspect-[16/10] overflow-hidden bg-castanha-100 border-b border-castanha-150';

export default function NewsExperience() {
  const [activeTab, setActiveTab] = useState<NewsTab>('all');

  const filteredArticles = activeTab === 'all' ? articles : articles.filter((a) => a.categoryKey === activeTab);

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
            className="z-0 object-cover object-top"
            sizes="100vw"
          />
          <div className="relative z-10 mx-auto w-full max-w-[1274px]">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.02fr] lg:gap-14">
              <div className="text-left">
                <p className="text-[0.94444rem] font-normal leading-[1.41663rem] text-castanha-600">Imprensa e mídia</p>
                <h1 className="mt-5 max-w-[700px] font-medium leading-[1.08] tracking-[-0.08rem] text-ink text-[2.7rem] sm:text-[3.25rem] sm:leading-[1.08] sm:tracking-[-0.12rem]">
                  Notícias e novidades
                </h1>
                <p className="mt-5 max-w-xl text-[1rem] font-normal leading-[1.5rem] text-castanha-600 md:text-[1.125rem] lg:text-[1.25rem]">
                  Lançamentos de produtos, marcos da empresa e perspectivas sobre IA jurídica, selecionados para equipes que fazem acontecer.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' })}
                    className="landing-secondary-btn inline-flex h-[2.83331rem] min-w-[10.81025rem] items-center justify-center px-6 transition hover:bg-castanha-150"
                  >
                    Assinar as novidades
                  </button>
                </div>
              </div>

              <div className="relative min-h-[260px] w-full sm:min-h-[300px] lg:min-h-[340px]">
                <div className="flex h-full min-h-[inherit] flex-col rounded-2xl border border-castanha-150 p-5 sm:p-6">
                  <div className="relative min-h-[220px] w-full flex-1 overflow-hidden rounded-xl bg-castanha-100 sm:min-h-[260px] lg:min-h-[280px]">
                    <div className="absolute inset-3 sm:inset-4 md:inset-5">
                      <div className="relative h-full min-h-[160px] w-full">
                        <Image
                          src="/landingpage/features/ai-powered-legal-assistant.png"
                          alt=""
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
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.06}>
        <section className="border-b border-castanha-150 bg-white py-8 md:py-10">
          <div className="mx-auto max-w-[1274px] px-4 md:px-8 lg:px-6 xl:px-0">
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {tabIds.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`inline-flex h-11 items-center justify-center rounded-full border px-4 text-[0.875rem] leading-none transition-colors md:h-[3.25rem] md:px-[1.5rem] md:text-[1rem] ${
                    activeTab === tab
                      ? 'border-cerrado-900 bg-cerrado-900 text-white shadow-[0_8px_24px_rgba(31,42,23,0.12)]'
                      : 'border-castanha-200 bg-castanha-100 text-castanha-600 hover:border-castanha-300 hover:bg-castanha-150 hover:text-ink'
                  }`}
                >
                  {tabLabels[tab]}
                </button>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.08}>
        <section className="bg-white py-14 md:py-16 lg:py-[5.5rem]">
          <div className="mx-auto max-w-[1274px] px-4 md:px-8 lg:px-6 xl:px-0">
            <h2 className="sr-only">Artigos mais recentes</h2>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className="group overflow-hidden rounded-2xl border border-castanha-150 bg-white shadow-[0_12px_28px_rgba(31,42,23,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(31,42,23,0.08)]"
                >
                  <Link
                    href={`/news/${article.slug}`}
                    className="block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-pequi-500/60 focus-visible:ring-offset-2"
                  >
                    <div className={articleCardImageShell}>
                      <div className="absolute inset-0 p-3 md:p-4">
                        <div className="relative h-full w-full min-h-[120px]">
                          <Image
                            src={article.image}
                            alt=""
                            fill
                            className="object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                      </div>
                      <div className="absolute left-4 top-4 z-10">
                        <span className="inline-block rounded-md bg-cerrado-900 px-3 py-1.5 text-[0.625rem] font-medium tracking-[0.06em] text-white capitalize">
                          {tabLabels[article.categoryKey]}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 md:p-8">
                      <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-castanha-600">
                        <time dateTime={article.date}>{article.date}</time>
                        <span aria-hidden>·</span>
                        <span>{article.author}</span>
                      </div>
                      <h3 className="mb-3 text-[1.125rem] font-medium leading-snug text-ink transition-opacity group-hover:opacity-90 md:text-[1.25rem]">
                        {article.title}
                      </h3>
                      <p className="mb-5 line-clamp-2 text-[0.9375rem] leading-[160%] text-castanha-600">{article.excerpt}</p>
                      <span className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink transition-all group-hover:gap-2.5">
                        Leia mais
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <section id="newsletter" className="scroll-mt-24 bg-white pb-14 md:scroll-mt-28 md:pb-16">
          <div className="mx-auto max-w-[1274px] px-4 md:px-8 lg:px-6 xl:px-0">
            <div className="rounded-[2rem] border border-castanha-150 bg-castanha-50 px-6 py-10 text-center shadow-[0_24px_64px_rgba(31,42,23,0.06)] md:px-12 md:py-12">
              <h2 className="text-[1.75rem] font-medium leading-tight text-ink md:text-[2.25rem]">Fique por dentro</h2>
              <p className="mx-auto mt-4 max-w-xl text-[1rem] leading-[160%] text-castanha-600 md:text-[1.125rem]">
                Novidades ocasionais sobre produto, pesquisas e eventos, sem spam.
              </p>
              <form
                className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Endereço de e-mail
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  name="email"
                  placeholder="Seu endereço de e-mail"
                  autoComplete="email"
                  className="flex-1 rounded-[0.875rem] border border-castanha-200 bg-castanha-100 px-5 py-3.5 text-[0.9375rem] text-ink placeholder:text-castanha-600 transition-colors focus:border-castanha-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pequi-500/40"
                />
                <button
                  type="submit"
                  className="landing-primary-btn inline-flex h-11 shrink-0 items-center justify-center px-8 transition"
                >
                  Assinar
                </button>
              </form>
              <p className="mt-4 text-[0.8125rem] text-castanha-600">Respeitamos sua privacidade. Cancele quando quiser.</p>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.12}>
        <section className="bg-white pb-16 lg:pb-[7rem]">
          <div className="mx-auto max-w-[1274px] px-4 md:px-8 lg:px-6 xl:px-0">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="mb-3 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-castanha-600">
                  Recursos para a mídia
                </p>
                <h2 className="text-[2rem] font-medium leading-[1.1] text-ink md:text-[2.5rem] lg:text-[3rem]">
                  Kit de imprensa e materiais da marca
                </h2>
                <p className="mt-5 max-w-[39rem] text-[1rem] leading-[160%] text-castanha-600 md:text-[1.125rem]">
                  Logotipos, biografias dos executivos, imagens do produto e fichas informativas para jornalistas e parceiros.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/press-kit"
                    className="landing-primary-btn inline-flex h-11 items-center justify-center px-6 transition"
                  >
                    Ver kit de imprensa
                  </Link>
                  <Link
                    href="/contact"
                    className="landing-secondary-btn inline-flex h-[2.83331rem] min-w-[10.81025rem] items-center justify-center px-6 transition hover:bg-castanha-150"
                  >
                    Contato imprensa
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="overflow-hidden rounded-2xl border border-castanha-150 bg-castanha-100/85 p-3 backdrop-blur-sm md:p-4">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-castanha-100">
                    <div className="absolute inset-4 md:inset-6">
                      <div className="relative h-full w-full">
                        <Image
                          src="/landingpage/features/ai-powered-legal-assistant.png"
                          alt=""
                          fill
                          className="object-contain object-center"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    </div>
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
