import { useState, useCallback, useRef } from 'react';
import { RainPhase } from './useMatrixRain';

export interface LineState {
  visible: boolean;
  ok: string;
}

export interface SequenceState {
  phase: RainPhase;
  lines: LineState[];
  progress: number;
  statusText: string;
  slamVisible: boolean;
  exitSlide: boolean;
  revealVisible: boolean;
  dotsText: string;
}

const INITIAL: SequenceState = {
  phase: 'idle',
  lines: Array(5).fill({ visible: false, ok: '' }),
  progress: 0,
  statusText: 'system: initializing',
  slamVisible: false,
  exitSlide: false,
  revealVisible: false,
  dotsText: '',
};

function delay(ms: number) {
  return new Promise<void>(r => setTimeout(r, ms));
}

export function useLoaderSequence() {
  const [state, setState] = useState<SequenceState>(INITIAL);
  const runningRef = useRef(false);

  const patch = (partial: Partial<SequenceState>) =>
    setState(prev => ({ ...prev, ...partial }));

  const patchLine = (index: number, partial: Partial<LineState>) =>
    setState(prev => {
      const lines = prev.lines.map((l, i) =>
        i === index ? { ...l, ...partial } : l
      );
      return { ...prev, lines };
    });

  const start = useCallback(async () => {
    if (runningRef.current) return;
    runningRef.current = true;

    setState({ ...INITIAL, phase: 'rain' });
    await delay(700);

    patchLine(0, { visible: true });
    patch({ progress: 20 });
    await delay(800);
    patchLine(0, { ok: '✓ OK' });
    patch({ statusText: 'dns: resolved' });

    await delay(200);
    patchLine(1, { visible: true });
    patch({ progress: 45 });
    await delay(900);
    patchLine(1, { ok: '✓ OK' });
    patch({ statusText: 'auth: verified' });

    await delay(200);
    patchLine(2, { visible: true });
    patch({ progress: 70 });

    let d = 0;
    const dotsInterval = setInterval(() => {
      patch({ dotsText: '.'.repeat((d++ % 3) + 1) });
    }, 280);
    await delay(900);
    clearInterval(dotsInterval);
    patch({ dotsText: '' });
    patchLine(2, { ok: '✓ 247/247' });
    patch({ statusText: 'modules: loaded' });

    await delay(200);
    patchLine(3, { visible: true });
    patch({ progress: 92 });
    await delay(800);
    patchLine(3, { ok: '✓ OK' });
    patch({ statusText: 'system: OPERATIONAL' });

    await delay(150);
    patch({ progress: 100 });
    patchLine(4, { visible: true });

    await delay(500);
    patch({ phase: 'slam', slamVisible: true });

    await delay(700);
    patch({ exitSlide: true });

    await delay(580);
    patch({ phase: 'done', revealVisible: true });

    runningRef.current = false;
  }, []);

  const reset = useCallback(() => {
    runningRef.current = false;
    setState(INITIAL);
  }, []);

  return { state, start, reset };
}