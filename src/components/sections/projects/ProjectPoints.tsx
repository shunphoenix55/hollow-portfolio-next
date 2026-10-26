'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { HkChoice } from '@/components/ui/HkChoice';
import styles from './ProjectCard.module.css';

const COLLAPSED_EM = 5.4;

export function ProjectPoints({ points }: { points: string[] }) {
  const id = useId();
  const listRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [fits, setFits] = useState(false);
  const [fullHeight, setFullHeight] = useState(0);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const collapsed = parseFloat(getComputedStyle(list).fontSize) * COLLAPSED_EM;
      setFullHeight(list.scrollHeight);
      setFits(list.scrollHeight <= collapsed + 1);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      <ul
        ref={listRef}
        id={id}
        className={styles.points}
        data-open={open || fits || undefined}
        style={open ? { maxHeight: fullHeight } : undefined}
      >
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <HkChoice
        className={styles.more}
        aria-expanded={open}
        aria-controls={id}
        hidden={fits}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? 'Show less' : 'Read more'}
      </HkChoice>
    </>
  );
}
