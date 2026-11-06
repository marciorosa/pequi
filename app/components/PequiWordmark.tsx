// Marca em texto do Pequi no esquema M&C (igual à Lucia): símbolo coral
// arredondado + nome em Manrope. Substitui o logo amarelo (public/logo/logo.png,
// mantido no projeto) no menu e no rodapé.
type Props = {
  className?: string;
  tone?: 'ink' | 'light';
};

export function PequiMark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="10" fill="var(--pequi-500)" />
      {/* caroço do pequi: semente clara com um ponto coral no centro */}
      <ellipse cx="16" cy="16.5" rx="7.2" ry="8.6" fill="#fff" />
      <circle cx="16" cy="17.5" r="2.6" fill="var(--pequi-500)" />
    </svg>
  );
}

export default function PequiWordmark({ className = '', tone = 'ink' }: Props) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <PequiMark />
      <span
        className={`text-[1.3rem] font-semibold leading-none tracking-[-0.045em] ${
          tone === 'light' ? 'text-white' : 'text-ink'
        }`}
      >
        Pequi
      </span>
    </span>
  );
}
