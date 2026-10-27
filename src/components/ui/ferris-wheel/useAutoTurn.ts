'use client';

import { type RefObject, useCallback, useEffect, useLayoutEffect, useRef } from 'react';

type AutoTurn = { enabled: boolean; interval: number; onTick: () => void };

const VISIBLE_SHARE = 0.5;

export function useAutoTurn(
  root: RefObject<HTMLElement | null>,
  { enabled, interval, onTick }: AutoTurn,
) {
  const tick = useRef(onTick);
  const idleUntil = useRef(0);

  useLayoutEffect(() => {
    tick.current = onTick;
  }, [onTick]);

  useEffect(() => {
    const el = root.current;
    if (!enabled || !el) return;
    let visible = false;
    let hovered = false;
    let focused = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.intersectionRatio >= VISIBLE_SHARE;
      },
      { threshold: [0, VISIBLE_SHARE, 1] },
    );
    const onEnter = () => (hovered = true);
    const onLeave = () => (hovered = false);
    const onFocusIn = () => (focused = true);
    const onFocusOut = (event: FocusEvent) => {
      focused = el.contains(event.relatedTarget as Node | null);
    };
    const timer = window.setInterval(() => {
      const idle = performance.now() >= idleUntil.current;
      if (visible && idle && !hovered && !focused && !document.hidden) tick.current();
    }, interval);

    io.observe(el);
    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointerleave', onLeave);
    el.addEventListener('focusin', onFocusIn);
    el.addEventListener('focusout', onFocusOut);
    return () => {
      window.clearInterval(timer);
      io.disconnect();
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('focusin', onFocusIn);
      el.removeEventListener('focusout', onFocusOut);
    };
  }, [enabled, interval, root]);

  return useCallback((ms: number) => {
    idleUntil.current = performance.now() + ms;
  }, []);
}
