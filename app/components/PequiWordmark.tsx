// Marca do Pequi: logotipo oficial em coral (PequiLogo) no menu, no rodapé e no painel.
// PequiMark (símbolo quadrado) fica disponível para usos pequenos.
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

// Logotipo oficial "pequi" (arquivo Pequi Brand.ai), na cor primária do site.
// O arquivo vetorial fica em Builder/Pequi/Marca/pequi-logo-coral.svg.
const LOGO_VIEWBOX = '64.5 284.4 443.6 142.5';
const LOGO_PATH =
  'M 353.61 405.24 C 359.01 397.55 362.18 388.18 362.18 378.04 C 362.18 351.55 340.61 330.33 314.12 330.33 C 287.65 330.33 266.25 351.55 266.25 378.04 C 266.25 404.52 287.65 425.76 314.12 425.76 C 319.41 425.76 324.51 424.91 329.27 423.34 L 369.63 423.34 L 369.63 411.83 Z M 329.55 378.04 C 329.55 391.89 322.54 403.11 314.12 403.11 C 305.88 403.11 298.87 391.89 298.87 378.04 C 298.87 364.18 305.88 352.96 314.12 352.96 C 322.54 352.96 329.55 364.18 329.55 378.04 M 191.93 364.01 C 195.26 354.89 202.61 348.93 211.04 348.93 C 220.5 348.93 227.93 355.94 227.93 364.01 Z M 190.71 382.25 L 254.19 382.25 C 259.1 354.37 237.35 330.33 208.94 330.33 C 178.78 330.33 158.44 351.9 158.44 378.38 C 158.44 404.52 178.07 425.76 211.23 425.76 C 227.36 425.76 242.44 418.55 251.03 409.25 L 239.28 395.75 C 233.67 400.48 226.82 403.47 217.54 403.47 C 200.36 403.47 189.83 394.7 190.71 382.25 M 491.39 285.45 C 482.97 285.45 476.13 292.28 476.13 300.7 C 476.13 309.12 482.97 315.61 491.39 315.61 C 499.63 315.61 506.47 309.12 506.47 300.7 C 506.47 292.28 499.63 285.45 491.39 285.45 M 475.79 423.81 L 507 423.81 L 507 332.27 L 475.79 332.27 Z M 110.62 332.45 C 128.48 332.45 146.74 344.68 147.05 362.52 C 147.39 383 131.46 399.57 110.62 399.57 L 96.92 399.57 L 96.92 423.81 L 65.57 423.81 L 65.57 352.12 C 65.72 346.95 65.2 332.5 83.8 332.45 Z M 103.26 380.2 L 108.82 380.2 C 116.45 380.2 122.61 373.35 122.61 364.9 C 122.61 356.4 116.45 349.56 108.82 349.56 C 105.42 349.57 106.13 349.58 102.75 349.58 C 100.61 349.58 97.09 350.43 97.01 355.31 C 97.01 363.28 97 367.01 97.01 374.97 C 97.11 378.14 99.93 380.17 103.26 380.2 M 464.34 388.96 L 464.34 332.27 L 432.21 332.27 L 432.21 391.79 C 429.37 397.47 423.7 401.25 417.09 401.25 C 408.59 401.25 405.75 397.47 405.75 382.36 L 405.75 332.27 L 373.62 332.27 L 373.62 390.86 C 373.62 408.81 388.74 425.82 417.09 425.82 C 448.27 425.82 464.34 405.98 464.34 388.96';

export function PequiLogo({ className = 'h-7 w-auto', tone = 'brand' }: { className?: string; tone?: 'brand' | 'light' | 'ink' }) {
  const fill = tone === 'light' ? '#FFFFFF' : tone === 'ink' ? 'var(--ink, #242521)' : 'var(--pequi-500, #FA5A50)';
  return (
    <svg viewBox={LOGO_VIEWBOX} className={className} role="img" aria-label="Pequi">
      <path fill={fill} fillRule="evenodd" d={LOGO_PATH} />
    </svg>
  );
}

export default function PequiWordmark({ className = '', tone = 'ink' }: Props) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <PequiLogo className="h-[26px] w-auto" tone={tone === 'light' ? 'light' : 'brand'} />
    </span>
  );
}
