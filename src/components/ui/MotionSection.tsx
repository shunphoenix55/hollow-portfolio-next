'use client';

import type { ComponentProps } from 'react';
import { useInView } from '@/hooks/useInView';

export function MotionSection(props: ComponentProps<'section'>) {
  const [ref, inView] = useInView<HTMLElement>('200px');
  return <section ref={ref} data-offscreen={inView ? undefined : ''} {...props} />;
}
