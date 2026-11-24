import { Fragment } from 'react';
import { LegalFooterBar, LegalHero, LegalLinkGrid, LegalMain, LegalParagraph } from './LegalDocChrome';

// Renderiza um documento jurídico (Termos, Política de Privacidade) a partir do
// JSON em app/legal-content, gerado a partir do .docx aprovado. O texto é
// publicado sem alterações; só os títulos em caixa alta ganham caixa normal.

type Block = { type: 'p'; text: string } | { type: 'table'; head: string[]; rows: string[][] };
type Section = { id: string; title: string; blocks: Block[] };
type Part = { title: string | null; subtitle: string | null; intro: Block[]; sections: Section[] };
export type LegalDoc = { title: string; version: string; intro: Block[]; parts: Part[] };

const KEEP: Record<string, string> = { lgpd: 'LGPD', oab: 'OAB', anpd: 'ANPD', pequi: 'Pequi', 'white-label': 'white-label' };

function sentenceCase(s: string) {
  const out = s
    .toLowerCase()
    .split(' ')
    .map((w) => KEEP[w.replace(/[^\p{L}-]/gu, '')] ?? w)
    .join(' ');
  return out.charAt(0).toUpperCase() + out.slice(1);
}

// "CLÁUSULA 3. OBJETO" -> { label: "Cláusula 3", title: "Objeto" }; "3. COOKIES" -> { label: "3", title: "Cookies" }
function splitHeading(raw: string) {
  const m = raw.match(/^(CLÁUSULA \d+|\d+)\.\s+(.*)$/);
  if (!m) return { label: '', title: sentenceCase(raw) };
  return { label: sentenceCase(m[1]), title: sentenceCase(m[2]) };
}

// Deixa e-mails e o domínio pequi.me clicáveis
function linkify(text: string) {
  const parts = text.split(/([\w.+-]+@[\w-]+\.[\w.]+|\bpequi\.me\b)/g);
  return parts.map((p, i) => {
    if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(p)) {
      return (
        <a key={i} href={`mailto:${p}`} className="font-medium text-ink underline underline-offset-4">
          {p}
        </a>
      );
    }
    if (p === 'pequi.me') {
      return (
        <a key={i} href="https://pequi.me" className="font-medium text-ink underline underline-offset-4">
          {p}
        </a>
      );
    }
    return <Fragment key={i}>{p}</Fragment>;
  });
}

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) =>
        b.type === 'p' ? (
          <LegalParagraph key={i} className={`mb-4 ${/^[a-z]\)/.test(b.text) ? 'pl-5' : ''}`}>
            {linkify(b.text)}
          </LegalParagraph>
        ) : (
          <div key={i} className="mb-6 overflow-x-auto rounded-2xl border border-castanha-150">
            <table className="w-full min-w-[36rem] border-collapse text-left text-[0.875rem] leading-relaxed">
              <thead className="bg-castanha-50">
                <tr>
                  {b.head.map((h) => (
                    <th key={h} scope="col" className="border-b border-castanha-150 px-4 py-3 font-semibold text-ink">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((r, ri) => (
                  <tr key={ri} className="align-top even:bg-castanha-25">
                    {r.map((c, ci) => (
                      <td key={ci} className={`border-b border-castanha-100 px-4 py-3 text-castanha-600 ${ci === 0 ? 'font-medium text-ink' : ''}`}>
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ),
      )}
    </>
  );
}

export default function LegalDocument({
  doc,
  title,
  eyebrow,
  links,
}: {
  doc: LegalDoc;
  title: string;
  eyebrow: string;
  links: { href: string; title: string; desc: string; label: string }[];
}) {
  const toc = doc.parts.flatMap((p) => [
    ...(p.title ? [{ id: p.title.replace(/\s+/g, '-').toLowerCase(), title: `${p.title}: ${sentenceCase(p.subtitle ?? '')}`, main: true }] : []),
    ...p.sections.map((s) => {
      const h = splitHeading(s.title);
      return { id: s.id, title: h.label ? `${h.label}. ${h.title}` : h.title, main: !p.title };
    }),
  ]);

  return (
    <main className="min-h-screen">
      <LegalHero eyebrow={eyebrow} title={title} lastUpdated={doc.version.replace(/^Versão de /, '')} />

      <section className="border-b border-castanha-150 bg-white py-10 md:py-12">
        <div className="mx-auto max-w-[48rem] px-4 md:px-8 lg:px-6 xl:px-0">
          <div className="rounded-2xl border border-castanha-150 bg-castanha-50 px-5 py-7 md:px-7 md:py-8">
            <h2 className="mb-5 text-[1.25rem] font-medium text-ink md:text-[1.5rem]">Índice</h2>
            <nav className="grid gap-x-6 gap-y-1 sm:grid-cols-2" aria-label="Índice">
              {toc
                .filter((t) => t.main)
                .map((t) => (
                  <a key={t.id} href={`#${t.id}`} className="rounded-lg px-2 py-1.5 text-[0.9375rem] text-castanha-600 hover:bg-white hover:text-ink">
                    {t.title}
                  </a>
                ))}
            </nav>
          </div>
        </div>
      </section>

      <LegalMain>
        <div className="mb-12">
          <Blocks blocks={doc.intro} />
        </div>

        {doc.parts.map((p, pi) => (
          <div key={pi}>
            {p.title && (
              <div id={p.title.replace(/\s+/g, '-').toLowerCase()} className="mb-10 mt-16 scroll-mt-28 border-t-2 border-ink pt-8 md:scroll-mt-32">
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-castanha-600">{p.title}</p>
                <h2 className="mt-2 text-[1.75rem] font-medium leading-tight text-ink">{sentenceCase(p.subtitle ?? '')}</h2>
              </div>
            )}
            <Blocks blocks={p.intro} />
            {p.sections.map((s) => {
              const h = splitHeading(s.title);
              return (
                <section key={s.id} id={s.id} className="mb-10 scroll-mt-28 md:scroll-mt-32">
                  <div className="mb-4 flex items-baseline gap-3">
                    {h.label && (
                      <span className="shrink-0 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-castanha-600">{h.label}</span>
                    )}
                    <h3 className="text-[1.3125rem] font-medium leading-tight text-ink md:text-[1.4375rem]">{h.title}</h3>
                  </div>
                  <Blocks blocks={s.blocks} />
                </section>
              );
            })}
          </div>
        ))}
      </LegalMain>

      <LegalLinkGrid title="Recursos adicionais" items={links} />
      <LegalFooterBar printLabel="Imprimir este documento" emailLabel="contato@pequi.me" emailHref="mailto:contato@pequi.me" />
    </main>
  );
}
