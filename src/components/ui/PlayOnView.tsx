'use client';

import { type ComponentProps, useRef } from 'react';
import { useOnceInView } from '@/hooks/useOnceInView';

type PlayOnViewProps = ComponentProps<'section'> & { threshold?: number };

export function PlayOnView({ threshold = 0.6, ...props }: PlayOnViewProps) {
  const ref = useRef<HTMLElement>(null);
  const playing = useOnceInView(ref, { threshold });
  return <section ref={ref} data-playing={playing || undefined} {...props} />;
}
