import { useEffect, useRef, useCallback } from 'react';

export type RainPhase = 'idle' | 'rain' | 'slam' | 'done';

const CHARS = 'edroyt.comABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&/>_~[]{}';
const COL_W = 16;
const SPEED  = 0.65;

interface UseMatrixRainOptions {
  phase: RainPhase;
}

export function useMatrixRain(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  wrapRef: React.RefObject<HTMLDivElement>,
  { phase }: UseMatrixRainOptions
) {
  const dropsRef = useRef<number[]>([]);
  const rafRef   = useRef<number>(0);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap   = wrapRef.current;
    if (!canvas || !wrap) return;
    canvas.width  = wrap.offsetWidth;
    canvas.height = wrap.offsetHeight;
    const cols    = Math.floor(canvas.width / COL_W);
    dropsRef.current = Array.from({ length: cols }, () => Math.random() * -60);
  }, [canvasRef, wrapRef]);

  useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [resize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (phase === 'idle' || phase === 'done') {
      cancelAnimationFrame(rafRef.current);
      if (phase === 'done') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    const tick = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;

      ctx.fillStyle = 'rgba(8,10,13,0.18)';
      ctx.fillRect(0, 0, w, h);

      const drops = dropsRef.current;
      for (let i = 0; i < drops.length; i++) {
        const ch   = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x    = i * COL_W;
        const y    = drops[i] * COL_W;
        const dist = Math.abs(x - cx) / cx;

        const baseAlpha = phase === 'slam'
          ? 0.9 - dist * 0.3
          : 0.15 + Math.random() * 0.55;

        const bright = i % 6 === 0;
        ctx.fillStyle = `rgba(34,197,120,${bright ? baseAlpha : baseAlpha * 0.28})`;
        ctx.font = `${bright ? 14 : 12}px monospace`;
        ctx.fillText(ch, x, y);

        if (y > h && Math.random() > 0.975) drops[i] = 0;
        drops[i] += SPEED + Math.random() * 0.4;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase, canvasRef]);
}