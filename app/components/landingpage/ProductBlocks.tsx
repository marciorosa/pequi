import Image from 'next/image';
import Link from 'next/link';
import FadeInSection from './FadeInSection';
import { container } from './SectionHeader';

// Blocos das páginas internas (2026-11-24), no mesmo estilo editorial da home:
// sem cartões dentro de cartões; imagem única com canto de 24px; listas
// separadas por linhas finas.

type Action = { label: string; href: string };

export function ProductHero({
  eyebrow,
  title,
  text,
  primary,
  secondary,
  image,
  imageAlt,
  imageRatio = '2544/1412',
  fit = 'cover',
}: {
  eyebrow: string;
  title: React.ReactNode;
  text: string;
  primary: Action;
  secondary?: Action;
  image: string;
  imageAlt: string;
  imageRatio?: string;
  fit?: 'cover' | 'contain';
}) {
  return (
    <section id="hero" className="pb-16 pt-32 sm:pt-36 lg:pb-24">
      <div className={container}>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ink/45">{eyebrow}</p>
            <h1 className="mt-5 text-[clamp(2.6rem,5.6vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.04em] text-ink">{title}</h1>
          </div>
          <div className="lg:justify-self-end">
            <p className="max-w-[500px] text-[1.05rem] leading-relaxed text-ink/65">{text}</p>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <Link href={primary.href} className="inline-flex h-11 items-center rounded-full bg-ink px-6 text-[0.92rem] font-medium text-white hover:bg-ink/85">
                {primary.label}
              </Link>
              {secondary && (
                <Link href={secondary.href} className="inline-flex items-center gap-1.5 border-b border-ink/50 pb-0.5 text-[0.92rem] font-medium text-ink hover:border-ink">
                  {secondary.label}
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="relative mt-12 overflow-hidden rounded-3xl bg-[#F4EFDF]" style={{ aspectRatio: imageRatio }}>
          <Image src={image} alt={imageAlt} fill priority className={fit === 'cover' ? 'object-cover object-center' : 'object-contain p-8 sm:p-12'} sizes="(max-width: 1280px) 100vw, 1216px" />
        </div>
      </div>
    </section>
  );
}

export function FeatureList({
  title,
  text,
  items,
  columns = 4,
  tone = 'light',
}: {
  title: string;
  text?: string;
  items: { title: string; text: string }[];
  columns?: 2 | 3 | 4;
  tone?: 'light' | 'sand';
}) {
  const cols = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[columns];
  return (
    <FadeInSection>
      <section className={`py-20 lg:py-28 ${tone === 'sand' ? 'bg-[#F4EFDF]' : ''}`}>
        <div className={container}>
          <div className="grid gap-6 pb-4 lg:grid-cols-2 lg:items-end">
            <h2 className="text-[clamp(2.1rem,4.4vw,3.6rem)] font-medium leading-[1.04] tracking-[-0.035em] text-ink">{title}</h2>
            {text && <p className="max-w-[520px] text-[1.02rem] leading-relaxed text-ink/65 lg:justify-self-end">{text}</p>}
          </div>
          <div className={`mt-12 grid gap-x-8 gap-y-12 ${cols}`}>
            {items.map((it, i) => (
              <article key={it.title} className="border-t border-ink/20 pt-6">
                <span className="text-[0.75rem] tabular-nums text-ink/45">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-5 text-[1.3rem] font-medium tracking-[-0.02em] text-ink">{it.title}</h3>
                <p className="mt-2 max-w-[22rem] text-[0.98rem] leading-relaxed text-ink/60">{it.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}

// Faixa final de chamada, em areia (o rodapé logo abaixo já é grafite)
export function ClosingCta({ title, text, action }: { title: string; text: string; action: Action }) {
  return (
    <section className="bg-[#F4EFDF] py-20 text-ink lg:py-24">
      <div className={`${container} grid gap-8 lg:grid-cols-2 lg:items-end`}>
        <h2 className="text-[clamp(2.1rem,4.4vw,3.6rem)] font-medium leading-[1.04] tracking-[-0.035em]">{title}</h2>
        <div className="lg:justify-self-end">
          <p className="max-w-[480px] text-[1.02rem] leading-relaxed text-ink/65">{text}</p>
          <Link href={action.href} className="mt-7 inline-flex h-11 items-center rounded-full bg-ink px-6 text-[0.92rem] font-medium text-white hover:bg-ink/85">
            {action.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
