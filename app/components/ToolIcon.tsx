// Ícones de traço simples das ferramentas do Pequi (mesmo estilo das prévias da página inicial).
// Usados nos cartões do topo da página inicial, na barra do painel e no menu do celular.

export type ToolIconName = 'search' | 'chat' | 'assistants' | 'docs' | 'vault' | 'flows' | 'plan' | 'help';

const PATHS: Record<ToolIconName, string[]> = {
  search: ['M16.5 16.5L21 21', 'M10.5 17a6.5 6.5 0 100-13 6.5 6.5 0 000 13z'],
  chat: ['M5 5h14v10H9l-4 4V5z'],
  assistants: ['M12 4v16M7 20h10M5 7h14', 'M5 7l-3 6a3 3 0 006 0L5 7zM19 7l-3 6a3 3 0 006 0l-3-6z'],
  docs: ['M7 3h7l5 5v13H7V3z', 'M14 3v5h5M10 13h6M10 17h6'],
  vault: [
    'M7.5 10.5h9a2.5 2.5 0 012.5 2.5v5a2.5 2.5 0 01-2.5 2.5h-9A2.5 2.5 0 015 18v-5a2.5 2.5 0 012.5-2.5z',
    'M8.5 10.5V8a3.5 3.5 0 017 0v2.5',
  ],
  flows: [
    'M4.5 4h4a1.5 1.5 0 011.5 1.5v3A1.5 1.5 0 018.5 10h-4A1.5 1.5 0 013 8.5v-3A1.5 1.5 0 014.5 4zM15.5 14h4a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-4a1.5 1.5 0 01-1.5-1.5v-3a1.5 1.5 0 011.5-1.5z',
    'M10 7h4a2 2 0 012 2v5',
  ],
  plan: ['M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z', 'M3 10h18'],
  help: ['M12 20.5a8.5 8.5 0 100-17 8.5 8.5 0 000 17z', 'M12 11v5M12 8v.01'],
};

export default function ToolIcon({ name, className = 'w-5 h-5' }: { name: ToolIconName; className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {PATHS[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

/** Quadrado com o ícone: claro quando inativo, coral quando ativo. */
export function ToolIconTile({ name, active = false, size = 'md' }: { name: ToolIconName; active?: boolean; size?: 'sm' | 'md' | 'lg' }) {
  const box = size === 'lg' ? 'w-11 h-11 rounded-[0.9rem]' : size === 'sm' ? 'w-8 h-8 rounded-[0.6rem]' : 'w-10 h-10 rounded-[0.8rem]';
  const icon = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center transition-colors ${box} ${
        active ? 'bg-pequi-500 text-white' : 'bg-castanha-100 text-castanha-600'
      }`}
    >
      <ToolIcon name={name} className={icon} />
    </span>
  );
}
