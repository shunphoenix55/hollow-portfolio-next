'use client';

import { useEffect, useRef } from 'react';
import { createSmokeRenderer, hexToRgb } from './smoke-gl';

type SmokeBackgroundProps = { color: string; className?: string };

export function SmokeBackground({ color, className }: SmokeBackgroundProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const renderer = createSmokeRenderer(canvas, hexToRgb(color));
    if (!renderer) return;
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let visible = false;
    let raf = 0;

    const frame = (ms: number) => {
      renderer.draw(ms / 1000);
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
    const resizer = new ResizeObserver(([entry]) => {
      renderer.resize(entry.contentRect.width, entry.contentRect.height);
      renderer.draw(performance.now() / 1000);
    });
    const watcher = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    resizer.observe(canvas);
    watcher.observe(canvas);
    document.addEventListener('visibilitychange', update);
    return () => {
      cancelAnimationFrame(raf);
      resizer.disconnect();
      watcher.disconnect();
      document.removeEventListener('visibilitychange', update);
    };
  }, [color]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
