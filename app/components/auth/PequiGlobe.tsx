'use client';

import { useEffect, useRef } from 'react';

// Animação do login (2026-11-24): globo em linhas finas, adaptado da animação de
// contato do site da Numerals (hero-anim.js, cena "globoLinhas"). No Pequi, os
// arcos saem do escritório até clientes espalhados pelo globo: a
// assistente do escritório atende clientes onde eles estiverem. Canvas puro, sem bibliotecas;
// com "reduzir movimento" ligado, mostra um quadro parado.
const INK = '21, 24, 22';
// O escritório no centro da face visível e os clientes espalhados em volta
// (pontos abstratos, sem cidades), para os arcos ficarem longos e legíveis.
const CIDADES: [number, number][] = [
  [-8, -50], // escritório
  [52, -112],
  [64, -40],
  [38, 12],
  [-6, 24],
  [-46, 8],
  [-66, -58],
  [-44, -118],
  [6, -128],
  [24, -60],
  [-30, -30],
]

type P3 = [number, number, number];
const rgba = (a: number) => `rgba(${INK},${Math.max(0, Math.min(1, a)).toFixed(3)})`;

function girar(p: P3, ax: number, ay: number): P3 {
  let [x, y, z] = p;
  let c, s, t;
  if (ay) { c = Math.cos(ay); s = Math.sin(ay); t = x * c + z * s; z = -x * s + z * c; x = t; }
  if (ax) { c = Math.cos(ax); s = Math.sin(ax); t = y * c - z * s; z = y * s + z * c; y = t; }
  return [x, y, z];
}
function ponto(lat: number, lon: number): P3 {
  const la = (lat * Math.PI) / 180, lo = (lon * Math.PI) / 180;
  return [Math.cos(la) * Math.sin(lo), -Math.sin(la), Math.cos(la) * Math.cos(lo)];
}

export default function PequiGlobe({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, frame = 0;

    const medir = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(canvas);

    const desenhar = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * 0.42, cx = w / 2, cy = h / 2;
      // o Brasil fica de frente, com um balanço lento para os lados
      const ay = 0.87 + Math.sin(t * 0.00012) * 0.35;
      const ax = 0.12;
      const proj = (p: P3) => { const q = girar(p, ax, ay); return { x: cx + q[0] * R, y: cy + q[1] * R, z: q[2] }; };

      const linha = (a: { x: number; y: number }, b: { x: number; y: number }, alfa: number, largura = 0.8) => {
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = rgba(alfa); ctx.lineWidth = largura; ctx.stroke();
      };
      const curva = (pts: P3[], tracejada = false, largura = 0.8) => {
        let ant: { x: number; y: number; z: number } | null = null;
        pts.forEach((pt, k) => {
          const p = proj(pt);
          if (ant && (!tracejada || k % 6 < 3)) {
            const prof = ((p.z + ant.z) / 2 + 1) / 2; // 0 = fundo, 1 = frente
            linha(ant, p, 0.12 + prof * 0.7, largura);
          }
          ant = p;
        });
      };

      // contorno, meridianos e paralelos
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = rgba(0.85); ctx.lineWidth = 0.9; ctx.stroke();
      for (let i = 0; i < 6; i++) {
        const pts: P3[] = [];
        for (let k = 0; k <= 80; k++) pts.push(ponto(-90 + (k * 180) / 80, i * 30));
        curva(pts);
      }
      for (let i = -2; i <= 2; i++) {
        const pts: P3[] = [];
        for (let k = 0; k <= 120; k++) pts.push(ponto(i * 30, -180 + k * 3));
        curva(pts, i === 0);
      }

      // arcos do escritório até os clientes, desenhados aos poucos
      const base = ponto(...CIDADES[0]);
      for (let i = 1; i < CIDADES.length; i++) {
        const alvo = ponto(...CIDADES[i]);
        const prog = reduzir ? 1 : Math.min(1, (t * 0.0002 + i * 0.17) % 1.5);
        const passos = 40, pts: P3[] = [];
        for (let k = 0; k <= Math.round(passos * prog); k++) {
          const f = k / passos, alt = 1 + Math.sin(f * Math.PI) * 0.18;
          const x = base[0] + (alvo[0] - base[0]) * f, y = base[1] + (alvo[1] - base[1]) * f, z = base[2] + (alvo[2] - base[2]) * f;
          const m = Math.hypot(x, y, z) || 1;
          pts.push([(x / m) * alt, (y / m) * alt, (z / m) * alt]);
        }
        if (pts.length > 1) curva(pts, false, 1.1);
      }

      // pontos: o escritório cheio, os clientes vazados
      [...CIDADES.keys()].slice(1).concat(0).forEach((j) => {
        const c = CIDADES[j];
        const q = proj(ponto(...c));
        if (q.z < -0.1) return;
        const alfa = 0.55 + (q.z + 1) / 4;
        ctx.beginPath(); ctx.arc(q.x, q.y, j === 0 ? 5.5 : 3.8, 0, Math.PI * 2);
        ctx.fillStyle = j === 0 ? rgba(alfa) : '#F1EDE0';
        ctx.fill(); ctx.lineWidth = 1; ctx.strokeStyle = rgba(alfa); ctx.stroke();
        if (j === 0) { // anel em volta do escritório, como o ponto do ícone
          ctx.beginPath(); ctx.arc(q.x, q.y, 11, 0, Math.PI * 2);
          ctx.strokeStyle = rgba(alfa * 0.5); ctx.lineWidth = 0.9; ctx.stroke();
        }
      });

      if (!reduzir) frame = requestAnimationFrame(desenhar);
    };
    frame = requestAnimationFrame(desenhar);
    return () => { cancelAnimationFrame(frame); ro.disconnect(); };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
