'use client';

import { useRef, useEffect } from 'react';
import { useMatrixRain }     from './useMatrixRain';
import { useLoaderSequence } from './useLoaderSequence';
import styles                from './MatrixLoader.module.css';

interface MatrixLoaderProps {
  onComplete?: () => void;
}

const TERMINAL_LINES = [
  { prompt: '$', cmd: 'resolving edroyt.com' },
  { prompt: '$', cmd: 'authenticating dns...' },
  { prompt: '$', cmd: 'loading modules'       },   // dots appended dynamically
  { prompt: '$', cmd: 'connecting services...' },
];

export default function MatrixLoader({ onComplete }: MatrixLoaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef   = useRef<HTMLDivElement>(null);

  const { state, start, reset } = useLoaderSequence();

  useMatrixRain(canvasRef, wrapRef, { phase: state.phase });

  useEffect(() => {
    start();
  }, [start]);

  useEffect(() => {
    if (state.revealVisible && onComplete) {
      const t = setTimeout(onComplete, 800);
      return () => clearTimeout(t);
    }
  }, [state.revealVisible, onComplete]);

  const handleReplay = () => {
    reset();
    setTimeout(() => start(), 60);
  };

  return (
    <div ref={wrapRef} className={styles.wrap}>
      <canvas ref={canvasRef} className={styles.canvas} />

      {/* ── Center UI ───────────────────────────────── */}
      <div className={`${styles.centerUI} ${state.phase !== 'idle' ? styles.visible : ''}`}>

        <div className={styles.logo}>edroyt</div>

        <div className={styles.terminal}>
          {/* Mac-style title bar */}
          <div className={styles.terminalHeader}>
            <span className={`${styles.dot} ${styles.dotRed}`}    />
            <span className={`${styles.dot} ${styles.dotYellow}`} />
            <span className={`${styles.dot} ${styles.dotGreen}`}  />
            <span className={styles.terminalTitle}>edroyt — live-metrics.sh</span>
          </div>

          {/* Lines 0–3 */}
          {TERMINAL_LINES.map((line, i) => (
            <div
              key={i}
              className={`${styles.line} ${state.lines[i]?.visible ? styles.show : ''}`}
            >
              <span className={styles.prompt}>{line.prompt}</span>
              <span className={styles.cmd}>
                {line.cmd}
                {i === 2 && <span>{state.dotsText}</span>}
              </span>
              {state.lines[i]?.ok && (
                <span className={styles.ok}>{state.lines[i].ok}</span>
              )}
            </div>
          ))}

          {/* Line 4 — status */}
          <div className={`${styles.line} ${state.lines[4]?.visible ? styles.show : ''}`}
            style={{ marginBottom: 0 }}>
            <span className={styles.statusText}>{state.statusText}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className={styles.progressWrap}>
          <div className={styles.progressBar} style={{ width: `${state.progress}%` }} />
        </div>
      </div>

      {/* ── Slam text ───────────────────────────────── */}
      <div className={`${styles.slamText} ${state.slamVisible ? styles.visible : ''}`}>
        connected
      </div>

      {/* ── Exit wipe ───────────────────────────────── */}
      <div className={`${styles.exitOverlay} ${state.exitSlide ? styles.slideUp : ''}`} />

      {/* ── Site reveal ─────────────────────────────── */}
      <div className={`${styles.siteReveal} ${state.revealVisible ? styles.show : ''}`}>
        <div className={styles.revealLogo}>edroyt</div>
        <div className={styles.revealSub}>system operational &mdash; welcome</div>
        <button className={styles.replayBtn} onClick={handleReplay}>
          replay ↩
        </button>
      </div>
    </div>
  );
}