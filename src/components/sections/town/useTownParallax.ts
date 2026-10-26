'use client';

import { type RefObject, useEffect } from 'react';
import { rafScheduler } from '@/lib/raf';

export function useTownParallax(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!root || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const layers = [...root.querySelectorAll<HTMLElement>('[data-depth]')].map((el) => ({
      el,
      depth: Number(el.dataset.depth),
    }));
    const parallax = matchMedia('(hover: hover) and (pointer: fine)').matches;
    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;
    let inView = false;

    const { request, cancel } = rafScheduler(() => {
      tx += (mx - tx) * 0.08;
      ty += (my - ty) * 0.08;
      const r = root.getBoundingClientRect();
      const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
      for (const { el, depth } of layers) {
        el.style.transform = `translate3d(${(-tx * depth * 22).toFixed(2)}px, ${(-ty * depth * 12 + p * depth * 90).toFixed(2)}px, 0)`;
      }
      return Math.abs(mx - tx) > 0.001 || Math.abs(my - ty) > 0.001;
    });
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) request();
    });
    const onScroll = () => {
      if (inView) request();
    };
    const onPointer = (e: PointerEvent) => {
      mx = e.clientX / innerWidth - 0.5;
      my = e.clientY / innerHeight - 0.5;
      request();
    };

    io.observe(root);
    addEventListener('scroll', onScroll, { passive: true });
    if (parallax) root.addEventListener('pointermove', onPointer);
    return () => {
      cancel();
      io.disconnect();
      removeEventListener('scroll', onScroll);
      root.removeEventListener('pointermove', onPointer);
    };
  }, [ref]);
}
