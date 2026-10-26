'use client';

import { type RefObject, useEffect, useState } from 'react';

type Options = { rootMargin?: string; threshold?: number };

export function useOnceInView(ref: RefObject<Element | null>, { rootMargin, threshold }: Options) {
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setSeen(true);
        io.disconnect();
      },
      { rootMargin, threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin, threshold]);

  return seen;
}
