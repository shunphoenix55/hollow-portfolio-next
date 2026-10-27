'use client';

import { type RefObject, useEffect } from 'react';
import { publishHeroProgress } from '@/lib/hero-progress';
import { clamp } from '@/lib/math';
import { rafScheduler } from '@/lib/raf';

export function useHeroMotion(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const layers = [...root.querySelectorAll<HTMLElement>('[data-depth]')].map((el) => ({
      el,
      depth: Number(el.dataset.depth),
    }));
    const title = root.querySelector<HTMLElement>('[data-title]')!;
    const cue = root.querySelector<HTMLElement>('[data-cue]')!;
    const dark = root.querySelector<HTMLElement>('[data-dark]')!;
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const parallax = !still && matchMedia('(hover: hover) and (pointer: fine)').matches;
    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;
    let progress = 0;
    let inView = true;

    const measure = () => {
      const span = root.offsetHeight - innerHeight;
      progress = clamp(-root.getBoundingClientRect().top / (span || 1));
    };
    const { request, cancel } = rafScheduler(() => {
      tx += (mx - tx) * 0.08;
      ty += (my - ty) * 0.08;
      const p = progress;
      if (!still) {
        for (const { el, depth } of layers) {
          const lift = -p * depth * 38;
          const zoom = 1 + p * depth * 0.32;
          el.style.transform = `translate3d(${(-tx * depth * 22).toFixed(2)}px, calc(${(-ty * depth * 14).toFixed(2)}px + ${lift.toFixed(2)}vh), 0) scale(${zoom.toFixed(4)})`;
        }
        title.style.transform = `translate3d(calc(-50% + ${(tx * 10).toFixed(2)}px), ${(ty * 6 - p * 160).toFixed(2)}px, 0)`;
      }
      title.style.opacity = String(Math.max(0, 1 - p * 1.8));
      cue.style.opacity = String(Math.max(0, 1 - p * 6));
      dark.style.opacity = String(clamp((p - 0.5) / 0.5) * 0.7);
      publishHeroProgress(p);
      return Math.abs(mx - tx) > 0.001 || Math.abs(my - ty) > 0.001;
    });

    const onScroll = () => {
      if (!inView) return;
      measure();
      request();
    };
    const onResize = () => {
      measure();
      request();
    };
    const onPointer = (e: PointerEvent) => {
      mx = e.clientX / innerWidth - 0.5;
      my = e.clientY / innerHeight - 0.5;
      request();
    };
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      measure();
      request();
    });

    measure();
    request();
    io.observe(root);
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onResize);
    if (parallax) root.addEventListener('pointermove', onPointer);
    return () => {
      cancel();
      io.disconnect();
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
      root.removeEventListener('pointermove', onPointer);
    };
  }, [rootRef]);
}
