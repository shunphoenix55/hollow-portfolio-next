'use client';

import { type ComponentProps, useRef } from 'react';
import { useOnceInView } from '@/hooks/useOnceInView';
import { useViewSession } from '@/hooks/useViewSession';

type PlayOnViewProps = ComponentProps<'section'> & { threshold?: number; replay?: boolean };

export function PlayOnView({ threshold = 0.6, replay, ...props }: PlayOnViewProps) {
  const ref = useRef<HTMLElement>(null);
  const seen = useOnceInView(ref, { threshold });
  const inSession = useViewSession(ref, threshold);
  const playing = replay ? inSession : seen;
  return <section ref={ref} data-playing={playing || undefined} {...props} />;
}
