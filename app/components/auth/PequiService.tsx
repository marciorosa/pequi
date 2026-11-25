'use client';

import { useEffect, useRef } from 'react';

// Animação do login (2026-11-24) que conta o serviço, em traço fino e pontilhado:
// 1) uma linha lê o documento e marca dois trechos; 2) os trechos viajam até o
// caroço do Pequi (a IA), que pulsa; 3) a resposta se escreve no balão, com a
// fonte citada no rodapé. Repete a cada LOOP segundos.
const LOOP = 10;
const DOC = { x: 70, y: 150, w: 170, h: 230 };
const DOC_LINES = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({ y: DOC.y + 42 + i * 22, w: [130, 112, 136, 96, 128, 118, 84, 120][i] }));
const MARKED = [2, 5]; // trechos que a IA destaca
const SEED = { x: 380, y: 265 };
const BUBBLE = { x: 500, y: 165, w: 210, h: 170 };
const ANSWER = [150, 168, 132, 158];
const TRIPS = [
  `M${DOC.x + 150} ${DOC_LINES[2].y} C 300 ${DOC_LINES[2].y}, 300 ${SEED.y - 10}, ${SEED.x - 30} ${SEED.y - 6}`,
  `M${DOC.x + 140} ${DOC_LINES[5].y} C 300 ${DOC_LINES[5].y}, 300 ${SEED.y + 20}, ${SEED.x - 30} ${SEED.y + 12}`,
];
const OUT = `M${SEED.x + 34} ${SEED.y} C 440 ${SEED.y}, 450 ${BUBBLE.y + 60}, ${BUBBLE.x} ${BUBBLE.y + 60}`;

const clamp = (v: number) => Math.max(0, Math.min(1, v));
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const ease = (v: number) => (v < 0.5 ? 2 * v * v : 1 - Math.pow(-2 * v + 2, 2) / 2);

export default function PequiService({ className = '' }: { className?: string }) {
  const scan = useRef<SVGLineElement | null>(null);
  const lines = useRef<(SVGLineElement | null)[]>([]);
  const marks = useRef<(SVGCircleElement | null)[]>([]);
  const trips = useRef<(SVGPathElement | null)[]>([]);
  const runners = useRef<(SVGCircleElement | null)[]>([]);
  const pulse = useRef<SVGEllipseElement | null>(null);
  const out = useRef<SVGPathElement | null>(null);
  const answer = useRef<(SVGLineElement | null)[]>([]);
  const source = useRef<SVGGElement | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lens = trips.current.map((p) => p?.getTotalLength() || 1);
    const outLen = out.current?.getTotalLength() || 1;
    let frame = 0;
    const start = performance.now();

    const draw = (now: number) => {
      const p = reduce ? 0.97 : (((now - start) / 1000) % LOOP) / LOOP;
      const fade = 1 - seg(p, 0.94, 1); // tudo some no fim, antes de repetir

      // 1. leitura do documento (0 a 0,3)
      const read = ease(seg(p, 0.02, 0.3));
      const scanY = DOC.y + 30 + read * (DOC.h - 50);
      scan.current?.setAttribute('y1', scanY.toFixed(1));
      scan.current?.setAttribute('y2', scanY.toFixed(1));
      scan.current?.setAttribute('opacity', (p < 0.31 ? 0.9 : 0).toString());
      DOC_LINES.forEach((l, i) => {
        const passed = scanY >= l.y && p < 0.94;
        const marked = MARKED.includes(i) && passed;
        lines.current[i]?.setAttribute('opacity', marked ? '0.95' : passed ? '0.4' : '0.22');
        lines.current[i]?.setAttribute('stroke-width', marked ? '2.4' : '1.4');
      });
      MARKED.forEach((li, k) => marks.current[k]?.setAttribute('opacity', (scanY >= DOC_LINES[li].y ? fade : 0).toFixed(2)));

      // 2. trechos viajam até a IA (0,3 a 0,55)
      trips.current.forEach((path, k) => {
        if (!path) return;
        const t = ease(seg(p, 0.3 + k * 0.05, 0.5 + k * 0.05));
        path.setAttribute('stroke-dasharray', `${(t * lens[k]).toFixed(1)} ${lens[k].toFixed(1)}`);
        path.setAttribute('opacity', (0.8 * fade).toFixed(2));
        const pt = path.getPointAtLength(t * lens[k]);
        const r = runners.current[k];
        r?.setAttribute('cx', pt.x.toFixed(1));
        r?.setAttribute('cy', pt.y.toFixed(1));
        r?.setAttribute('opacity', t > 0 && t < 1 ? '1' : '0');
      });
      const think = seg(p, 0.5, 0.62);
      const ring = Math.sin(think * Math.PI);
      pulse.current?.setAttribute('rx', (40 + ring * 14).toFixed(1));
      pulse.current?.setAttribute('ry', (48 + ring * 16).toFixed(1));
      pulse.current?.setAttribute('opacity', (ring * 0.6).toFixed(2));

      // 3. resposta com fonte (0,6 a 0,92)
      const go = ease(seg(p, 0.6, 0.7));
      out.current?.setAttribute('stroke-dasharray', `${(go * outLen).toFixed(1)} ${outLen.toFixed(1)}`);
      out.current?.setAttribute('opacity', (0.8 * fade).toFixed(2));
      ANSWER.forEach((w, i) => {
        const t = ease(seg(p, 0.68 + i * 0.045, 0.74 + i * 0.045));
        answer.current[i]?.setAttribute('x2', (BUBBLE.x + 22 + t * w).toFixed(1));
        answer.current[i]?.setAttribute('opacity', (t > 0 ? 0.75 * fade : 0).toFixed(2));
      });
      source.current?.setAttribute('opacity', (seg(p, 0.86, 0.9) * fade).toFixed(2));

      if (!reduce) frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);

  const label = { fontSize: 10.5, letterSpacing: '0.16em', fill: 'currentColor', opacity: 0.5, fontWeight: 600 } as const;
  const dotted = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.3, strokeLinecap: 'round' as const, strokeDasharray: '0.1 5' };

  return (
    <svg viewBox="45 125 690 300" className={className} aria-hidden="true">
      {/* documento */}
      <path
        d={`M${DOC.x} ${DOC.y + 14} q0 -14 14 -14 h${DOC.w - 48} l34 34 v${DOC.h - 34 - 14} q0 14 -14 14 h-${DOC.w - 14} q-14 0 -14 -14 z`}
        {...dotted}
      />
      <path d={`M${DOC.x + DOC.w - 34} ${DOC.y} v34 h34`} {...dotted} />
      {DOC_LINES.map((l, i) => (
        <line
          key={i}
          ref={(el) => {
            lines.current[i] = el;
          }}
          x1={DOC.x + 20}
          x2={DOC.x + 20 + l.w}
          y1={l.y}
          y2={l.y}
          stroke="currentColor"
          strokeWidth={1.4}
          strokeLinecap="round"
          opacity={0.22}
        />
      ))}
      {MARKED.map((li, k) => (
        <circle
          key={li}
          ref={(el) => {
            marks.current[k] = el;
          }}
          cx={DOC.x + 10}
          cy={DOC_LINES[li].y}
          r={3}
          fill="currentColor"
          opacity={0}
        />
      ))}
      <line ref={scan} x1={DOC.x - 12} x2={DOC.x + DOC.w + 12} y1={DOC.y} y2={DOC.y} stroke="currentColor" strokeWidth={1} opacity={0} />
      <text x={DOC.x} y={DOC.y + DOC.h + 34} style={label}>DOCUMENTO</text>

      {/* trechos até a IA */}
      {TRIPS.map((d, k) => (
        <path
          key={k}
          ref={(el) => {
            trips.current[k] = el;
          }}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.1}
          strokeLinecap="round"
        />
      ))}
      {TRIPS.map((_, k) => (
        <circle
          key={k}
          ref={(el) => {
            runners.current[k] = el;
          }}
          r={4}
          fill="currentColor"
          opacity={0}
        />
      ))}

      {/* a IA: o caroço do Pequi com o ponto no centro */}
      <ellipse ref={pulse} cx={SEED.x} cy={SEED.y} rx={40} ry={48} fill="none" stroke="currentColor" strokeWidth={1} opacity={0} />
      <ellipse cx={SEED.x} cy={SEED.y} rx={34} ry={41} {...dotted} strokeDasharray="0.1 4" />
      <ellipse cx={SEED.x} cy={SEED.y} rx={18} ry={41} {...dotted} strokeDasharray="0.1 5" opacity={0.6} />
      <circle cx={SEED.x} cy={SEED.y + 5} r={6} fill="currentColor" />
      <text x={SEED.x} y={SEED.y + 78} textAnchor="middle" style={label}>IA</text>

      {/* resposta */}
      <path ref={out} d={OUT} fill="none" stroke="currentColor" strokeWidth={1.1} strokeLinecap="round" />
      <path
        d={`M${BUBBLE.x + 16} ${BUBBLE.y} h${BUBBLE.w - 32} q16 0 16 16 v${BUBBLE.h - 32} q0 16 -16 16 h-${BUBBLE.w - 40} l-14 14 v-14 h-2 q-16 0 -16 -16 v-${BUBBLE.h - 32} q0 -16 16 -16 z`}
        {...dotted}
      />
      {ANSWER.map((w, i) => (
        <line
          key={i}
          ref={(el) => {
            answer.current[i] = el;
          }}
          x1={BUBBLE.x + 22}
          x2={BUBBLE.x + 22}
          y1={BUBBLE.y + 34 + i * 20}
          y2={BUBBLE.y + 34 + i * 20}
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          opacity={0}
        />
      ))}
      <g ref={source} opacity={0}>
        <line x1={BUBBLE.x + 22} x2={BUBBLE.x + BUBBLE.w - 22} y1={BUBBLE.y + 122} y2={BUBBLE.y + 122} stroke="currentColor" strokeWidth={0.8} opacity={0.35} />
        <path
          d={`M${BUBBLE.x + 22} ${BUBBLE.y + 138} c6 -3 12 -3 18 1 v12 c-6 -4 -12 -4 -18 -1 z M${BUBBLE.x + 40} ${BUBBLE.y + 139} c6 -4 12 -4 18 -1 v12 c-6 -3 -12 -3 -18 1`}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.1}
          strokeLinejoin="round"
        />
        <line x1={BUBBLE.x + 68} x2={BUBBLE.x + 150} y1={BUBBLE.y + 145} y2={BUBBLE.y + 145} stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" opacity={0.75} />
      </g>
      <text x={BUBBLE.x} y={DOC.y + DOC.h + 34} style={label}>RESPOSTA COM FONTE</text>
    </svg>
  );
}
