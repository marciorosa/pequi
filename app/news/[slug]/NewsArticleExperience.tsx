'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import FadeInSection from '@/app/components/landingpage/FadeInSection';
import { getArticleBySlug, getRelatedArticles, type NewsArticleRecord } from '../newsData';

type Props = { slug: string };

const categoryLabels: Record<NewsArticleRecord['categoryKey'], string> = {
  product: 'Produto',
  company: 'Empresa',
  industry: 'Setor',
  partnership: 'Parcerias',
  press: 'Imprensa',
};

function ArticleNotFound() {
  return (
    <div className="mx-auto max-w-[1274px] px-4 pb-24 pt-28 text-center md:px-8 lg:px-6 xl:px-0">
      <p className="mb-3 text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-[#525252]">Notícias</p>
      <h1 className="text-[2rem] font-medium text-[#10101A] md:text-[2.5rem]">Artigo não encontrado</h1>
      <p className="mx-auto mt-4 max-w-md text-[1rem] text-[#525252]">
        Esta notícia pode ter sido movida. Confira as novidades mais recentes na central de notícias.
      </p>
      <Link
        href="/news"
        className="landing-primary-btn mt-8 inline-flex h-11 items-center justify-center px-6 transition hover:brightness-110"
      >
        Voltar para notícias
      </Link>
    </div>
  );
}

function RelatedCard({ art }: { art: NewsArticleRecord }) {
  return (
    <Link
      href={`/news/${art.slug}`}
      className="group block overflow-hidden rounded-2xl border border-[#eceae7] bg-white shadow-[0_12px_28px_rgba(16,16,26,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(16,16,26,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10101A]/15 focus-visible:ring-offset-2"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-[#eceae7] bg-[#f1f0ee]">
        <div className="absolute inset-0 p-3 md:p-4">
          <div className="relative h-full w-full min-h-[100px]">
            <Image
              src={art.image}
              alt=""
              fill
              className="object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>
        <div className="absolute left-4 top-4 z-10">
          <span className="inline-block rounded-md bg-[#10101A] px-3 py-1.5 text-[0.625rem] font-medium capitalize tracking-[0.06em] text-white">
            {categoryLabels[art.categoryKey]}
          </span>
        </div>
      </div>
      <div className="p-6 md:p-7">
        <p className="mb-2 text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-[#525252]">{art.date}</p>
        <h3 className="text-[1.0625rem] font-medium leading-snug text-[#10101A] transition-opacity group-hover:opacity-90 md:text-[1.125rem]">
          {art.title}
        </h3>
      </div>
    </Link>
  );
}

export default function NewsArticleExperience({ slug }: Props) {
  const article = getArticleBySlug(slug);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  if (!article) {
    return <ArticleNotFound />;
  }

  const related = getRelatedArticles(slug, 3);

  const formattedDate = new Date(article.publishedDate).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <>
      <FadeInSection>
        <header
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
            <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.02fr] lg:gap-14">
              <div className="text-left">
                <nav
                  className="mb-6 flex flex-wrap items-center gap-2 text-[0.8125rem] text-[#525252]"
                  aria-label="Navegação estrutural"
                >
                  <Link href="/news" className="transition-colors hover:text-[#10101A]">
                    Notícias
                  </Link>
                  <span aria-hidden>/</span>
                  <span className="capitalize text-[#10101A]">{categoryLabels[article.categoryKey]}</span>
                </nav>
                <h1 className="max-w-4xl text-[1.95rem] font-medium leading-[1.12] tracking-[-0.04rem] text-[#10101A] md:text-[2.5rem] lg:text-[2.75rem]">
                  {article.title}
                </h1>
                <p className="mt-5 max-w-3xl text-[1rem] leading-[160%] text-[#525252] md:text-[1.125rem] lg:text-[1.25rem]">
                  {article.excerpt}
                </p>

                <div className="mt-10 flex flex-col gap-6 border-t border-[#eceae7] pt-8 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[#e7e5e1] bg-[#f1f0ee] shadow-sm">
                      <Image
                        src={article.authorImage}
                        alt=""
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-[0.9375rem] font-medium text-[#10101A]">{article.author}</p>
                      <p className="text-[0.8125rem] text-[#525252]">{article.authorRole}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-[#525252]">
                    <time dateTime={article.publishedDate}>{formattedDate}</time>
                    <span className="h-1 w-1 rounded-full bg-[#d4d2ce]" aria-hidden />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>

              <div className="relative min-h-[240px] w-full sm:min-h-[280px] lg:min-h-[320px]">
                <div className="flex h-full min-h-[inherit] flex-col rounded-2xl border border-[#eceae7] p-5 sm:p-6">
                  <div className="relative min-h-[200px] w-full flex-1 overflow-hidden rounded-xl bg-[#f1f0ee] sm:min-h-[240px] lg:min-h-[280px]">
                    <div className="absolute inset-3 sm:inset-4 md:inset-5">
                      <div className="relative h-full min-h-[160px] w-full">
                        <Image
                          src={article.image}
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
        </header>
      </FadeInSection>

      <FadeInSection delay={0.06}>
        <div className="mx-auto max-w-[48rem] px-4 pb-14 pt-4 md:px-8 md:pb-16 lg:px-6 xl:px-0">
          <article className="space-y-6">
            {article.content.map((paragraph, index) => (
              <p key={index} className="text-[1rem] leading-[175%] text-[#525252] md:text-[1.0625rem]">
                {paragraph}
              </p>
            ))}
          </article>

          <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-[#eceae7] pt-10">
            <span className="mr-2 text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-[#525252]">Tags</span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-[#e7e5e1] bg-[#f1f0ee] px-3 py-1.5 text-[0.8125rem] font-medium text-[#525252]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-[#eceae7] pt-8">
            <span className="text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-[#525252]">Compartilhar</span>
            {[
              {
                label: 'Twitter',
                path: 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84',
              },
              {
                label: 'LinkedIn',
                path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z',
              },
            ].map((s) => (
              <button
                key={s.label}
                type="button"
                className="rounded-lg border border-transparent p-2 text-[#525252] transition-colors hover:border-[#eceae7] hover:bg-[#f8f7f6] hover:text-[#10101A]"
                aria-label={`Compartilhar no ${s.label}`}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d={s.path} />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </FadeInSection>

      <FadeInSection delay={0.08}>
        <section className="mx-auto max-w-[1274px] px-4 pb-14 md:px-8 md:pb-16 lg:px-6 xl:px-0">
          <div className="rounded-[2rem] border border-[#eceae7] bg-[#f8f7f6] px-6 py-10 text-center shadow-[0_24px_64px_rgba(16,16,26,0.06)] md:px-12 md:py-12">
            {!isSubscribed ? (
              <>
                <h2 className="text-[1.5rem] font-medium leading-tight text-[#10101A] md:text-[2rem]">Fique por dentro</h2>
                <p className="mx-auto mt-3 max-w-lg text-[0.9375rem] leading-[160%] text-[#525252] md:text-[1rem]">
                  Novidades de produto e pesquisas: poucos e-mails e cancelamento fácil.
                </p>
                <form onSubmit={handleSubscribe} className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row">
                  <label htmlFor="article-newsletter-email" className="sr-only">
                    E-mail
                  </label>
                  <input
                    id="article-newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Seu endereço de e-mail"
                    required
                    className="flex-1 rounded-[0.875rem] border border-[#e7e5e1] bg-[#f1f0ee] px-5 py-3.5 text-[0.9375rem] text-[#10101A] placeholder:text-[#525252] transition-colors focus:border-[#d4d2ce] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#10101A]/10"
                  />
                  <button
                    type="submit"
                    className="landing-primary-btn inline-flex h-11 shrink-0 items-center justify-center px-8 transition hover:brightness-110"
                  >
                    Assinar
                  </button>
                </form>
              </>
            ) : (
              <div>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50">
                  <svg className="h-6 w-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-[1.5rem] font-medium text-[#10101A]">Inscrição confirmada</h2>
                <p className="mt-2 text-[0.9375rem] text-[#525252]">Manteremos você informado.</p>
              </div>
            )}
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <section className="border-t border-[#eceae7] bg-[#FFFFFF] pb-16 lg:pb-[7rem]">
          <div className="mx-auto max-w-[1274px] px-4 pt-14 md:px-8 md:pt-16 lg:px-6 xl:px-0">
            <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between md:mb-12">
              <h2 className="text-[1.75rem] font-medium leading-tight text-[#10101A] md:text-[2.25rem]">Mais da Pequi</h2>
              <Link
                href="/news"
                className="inline-flex shrink-0 items-center gap-2 text-[0.9375rem] font-medium text-[#10101A] underline underline-offset-2 transition-opacity hover:opacity-80 sm:mb-1"
              >
                Todas as notícias
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {related.map((art) => (
                <RelatedCard key={art.slug} art={art} />
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
