'use client';

import { useEffect, useRef } from 'react';

// Animação do login (2026-11-24), no estilo de linhas pontilhadas finas que giram
// em 3D, desenhada com a forma do ícone do Pequi: o caroço oval (proporção do
// símbolo, 7,2 x 8,6) feito de meridianos que giram, duas órbitas inclinadas com
// um ponto percorrendo cada uma, e o ponto no centro, como no ícone.
const C = 300; // centro do desenho (viewBox 600 x 600)
const RY = 210; // meia altura do caroço
const RX = Math.round(RY * (7.2 / 8.6)); // meia largura, na proporção do ícone
const MERIDIANS = 7;

export default function PequiOrbit({ className = '' }: { className?: string }) {
  const meridians = useRef<(SVGEllipseElement | null)[]>([]);
  const dots = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    const start = performance.now();

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      const spin = reduce ? 0.6 : t * 0.35; // uma volta a cada ~18 s
      meridians.current.forEach((el, i) => {
        if (!el) return;
        const a = spin + (i * Math.PI) / MERIDIANS;
        el.setAttribute('rx', (Math.abs(Math.cos(a)) * RX).toFixed(1));
        // meridianos "de trás" ficam mais claros, dando profundidade
        el.setAttribute('opacity', (0.25 + 0.6 * Math.abs(Math.sin(a))).toFixed(2));
      });
      // pontos nas órbitas inclinadas (elipses 270 x 70 e 250 x 110)
      const orbits = [
        { rx: 270, ry: 70, rot: -14, speed: 0.5 },
        { rx: 250, ry: 110, rot: 22, speed: -0.32 },
      ];
      dots.current.forEach((el, i) => {
        if (!el) return;
        const o = orbits[i];
        const a = (reduce ? 1 : t) * o.speed + i * 2;
        const x = o.rx * Math.cos(a);
        const y = o.ry * Math.sin(a);
        const r = (o.rot * Math.PI) / 180;
        el.setAttribute('cx', (C + x * Math.cos(r) - y * Math.sin(r)).toFixed(1));
        el.setAttribute('cy', (C + x * Math.sin(r) + y * Math.cos(r)).toFixed(1));
      });
      if (!reduce) frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);

  const dotted = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round' as const };

  return (
    <svg viewBox="0 0 600 600" className={className} aria-hidden="true">
      {/* contorno do caroço */}
      <ellipse cx={C} cy={C} rx={RX} ry={RY} {...dotted} strokeDasharray="0.1 5" opacity={0.9} />
      {/* meridianos que giram */}
      {Array.from({ length: MERIDIANS }).map((_, i) => (
        <ellipse
          key={i}
          ref={(el) => {
            meridians.current[i] = el;
          }}
          cx={C}
          cy={C}
          rx={RX}
          ry={RY}
          {...dotted}
          strokeDasharray="0.1 6"
        />
      ))}
      {/* órbitas inclinadas */}
      <ellipse cx={C} cy={C} rx={270} ry={70} transform={`rotate(-14 ${C} ${C})`} {...dotted} strokeDasharray="0.1 4" opacity={0.7} />
      <ellipse cx={C} cy={C} rx={250} ry={110} transform={`rotate(22 ${C} ${C})`} {...dotted} strokeDasharray="0.1 7" opacity={0.45} />
      {[0, 1].map((i) => (
        <circle
          key={i}
          ref={(el) => {
            dots.current[i] = el;
          }}
          r={i === 0 ? 5 : 3.5}
          fill="currentColor"
        />
      ))}
      {/* o ponto do centro, como no ícone */}
      <circle cx={C} cy={C + 12} r={16} fill="none" stroke="currentColor" strokeWidth={1.2} opacity={0.5} />
      <circle cx={C} cy={C + 12} r={7} fill="currentColor" />
    </svg>
  );
}
