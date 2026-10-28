'use client';

import { type RefObject, useEffect, useState } from 'react';

export function useViewSession(ref: RefObject<Element | null>, threshold: number) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= threshold) setActive(true);
        else if (!entry.isIntersecting) setActive(false);
      },
      { threshold: [0, threshold] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);

  return active;
}
