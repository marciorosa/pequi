// Cabeçalho de seção no estilo editorial (2026-11-24): título grande à esquerda,
// texto curto à direita e uma linha fina separando do conteúdo. Sem caixas.
export const container = 'mx-auto w-full max-w-7xl px-5 sm:px-8';

export default function SectionHeader({
  title,
  text,
  dark = false,
  line = true,
  children,
}: {
  title: React.ReactNode;
  text?: React.ReactNode;
  dark?: boolean;
  line?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className={`grid gap-6 lg:grid-cols-2 lg:items-end ${line ? `border-b pb-12 ${dark ? 'border-white/15' : 'border-ink/12'}` : 'pb-4'}`}>
      <h2
        className={`text-[clamp(2.1rem,4.4vw,3.6rem)] font-medium leading-[1.04] tracking-[-0.035em] ${dark ? 'text-white' : 'text-ink'}`}
      >
        {title}
      </h2>
      {(text || children) && (
        <div className="lg:justify-self-end">
          {text && (
            <p className={`max-w-[520px] text-[1.02rem] leading-relaxed ${dark ? 'text-white/65' : 'text-ink/65'}`}>{text}</p>
          )}
          {children}
        </div>
      )}
    </div>
  );
}
