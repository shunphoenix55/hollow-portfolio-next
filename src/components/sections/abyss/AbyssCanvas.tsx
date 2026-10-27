'use client';

import { useEffect, useRef } from 'react';
import { subscribeHeroProgress } from '@/lib/hero-progress';
import { clamp } from '@/lib/math';
import { type AbyssRenderer, createAbyssRenderer } from './abyss-gl';
import styles from './AbyssCanvas.module.css';

export default function AbyssCanvas({ revealOnHero }: { revealOnHero: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let renderer: AbyssRenderer | null = null;
    let failed = false;
    let visible = false;
    let raf = 0;

    const ensureRenderer = () => {
      if (renderer || failed) return renderer;
      renderer = createAbyssRenderer(canvas);
      failed = !renderer;
      renderer?.resize();
      renderer?.draw(performance.now() / 1000);
      return renderer;
    };
    const frame = (ms: number) => {
      renderer?.draw(ms / 1000);
      raf = requestAnimationFrame(frame);
    };
    const update = () => {
      const should = visible && !document.hidden && !still;
      if (should && !raf) raf = requestAnimationFrame(frame);
      if (!should && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };
    const onResize = () => {
      if (!renderer) return;
      renderer.resize();
      renderer.draw(performance.now() / 1000);
    };

    const reveal = (opacity: number) => {
      canvas.style.opacity = opacity.toFixed(3);
      visible = opacity > 0 && !!ensureRenderer();
      update();
    };
    const unsubscribe = revealOnHero
      ? subscribeHeroProgress((progress) => reveal(clamp((progress - 0.55) / 0.4)))
      : (reveal(1), undefined);
    addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', update);
    return () => {
      unsubscribe?.();
      cancelAnimationFrame(raf);
      removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', update);
    };
  }, [revealOnHero]);

  return <canvas ref={ref} className={styles.canvas} aria-hidden="true" />;
}
