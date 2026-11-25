'use client';

import { useEffect, useRef } from 'react';

// Animação do login, versão "trajetória" (2026-11-24): anéis no formato do caroço
// do Pequi crescendo em perspectiva e uma linha que atravessa os anéis até o ponto
// do ícone. A linha se desenha, um ponto percorre o caminho e os anéis respiram.
const RINGS = [
  { cx: 230, ry: 86, dotted: true },
  { cx: 350, ry: 112, dotted: false },
  { cx: 490, ry: 138, dotted: true },
  { cx: 650, ry: 164, dotted: false },
];
const CY = 300;
const SQUASH = 0.837 * 0.62; // proporção do caroço (7,2 x 8,6) vista de lado
const PATH = 'M60 450 C 150 392, 215 372, 280 366 S 420 352, 480 330 S 600 262, 700 232';
const LOOP = 9; // segundos por volta

export default function PequiTrajectory({ className = '' }: { className?: string }) {
  const rings = useRef<(SVGEllipseElement | null)[]>([]);
  const drawn = useRef<SVGPathElement | null>(null);
  const runner = useRef<SVGCircleElement | null>(null);
  const marks = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    const path = drawn.current;
    if (!path) return;
    const L = path.getTotalLength();
    const stops = [0.3, 0.62];
    stops.forEach((f, i) => {
      const p = path.getPointAtLength(L * f);
      marks.current[i]?.setAttribute('cx', p.x.toFixed(1));
      marks.current[i]?.setAttribute('cy', p.y.toFixed(1));
    });

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    const start = performance.now();
    const draw = (now: number) => {
      const t = (now - start) / 1000;
      const raw = reduce ? 0.85 : (t % LOOP) / LOOP;
      const p = raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2; // vai e desacelera
      path.setAttribute('stroke-dasharray', `${(p * L).toFixed(1)} ${L.toFixed(1)}`);
      const pt = path.getPointAtLength(p * L);
      runner.current?.setAttribute('cx', pt.x.toFixed(1));
      runner.current?.setAttribute('cy', pt.y.toFixed(1));
      marks.current.forEach((m, i) => m?.setAttribute('opacity', p >= stops[i] ? '1' : '0.25'));
      rings.current.forEach((el, i) => {
        if (!el) return;
        const breathe = reduce ? 1 : 1 + 0.06 * Math.sin(t * 0.9 + i * 0.8);
        el.setAttribute('rx', (RINGS[i].ry * SQUASH * breathe).toFixed(1));
      });
      if (!reduce) frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <svg viewBox="0 0 760 600" className={className} aria-hidden="true">
      {RINGS.map((r, i) => (
        <ellipse
          key={r.cx}
          ref={(el) => {
            rings.current[i] = el;
          }}
          cx={r.cx}
          cy={CY}
          rx={r.ry * SQUASH}
          ry={r.ry}
          fill="none"
          stroke="currentColor"
          strokeWidth={r.dotted ? 1.4 : 0.9}
          strokeLinecap="round"
          strokeDasharray={r.dotted ? '0.1 5' : undefined}
          opacity={r.dotted ? 0.8 : 0.5}
        />
      ))}
      {/* caminho inteiro, pontilhado e claro; por cima, o trecho já percorrido */}
      <path d={PATH} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeDasharray="0.1 5" opacity={0.45} />
      <path ref={drawn} d={PATH} fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" />
      {[0, 1].map((i) => (
        <circle
          key={i}
          ref={(el) => {
            marks.current[i] = el;
          }}
          r={6}
          fill="currentColor"
        />
      ))}
      <circle ref={runner} r={4} fill="currentColor" />
      {/* destino: o ponto do ícone do Pequi */}
      <circle cx={700} cy={232} r={15} fill="none" stroke="currentColor" strokeWidth={1.1} strokeDasharray="0.1 4" strokeLinecap="round" />
      <circle cx={700} cy={232} r={6.5} fill="none" stroke="currentColor" strokeWidth={1.4} />
    </svg>
  );
}
