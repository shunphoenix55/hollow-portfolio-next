'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import walk from '@/assets/knight-walk.webp';
import stand from '@/assets/exp-knight-stand.webp';
import farewell from '@/assets/town-farewell.webp';
import { Ornament } from '@/components/ornament/Ornament';
import { Dialogue } from '@/components/sections/town/Dialogue';
import { useOnceInView } from '@/hooks/useOnceInView';
import scene from './EndCredits.module.css';
import styles from './Farewell.module.css';

const TYPE_START_MS = 350;
const TYPE_PER_CHAR_MS = 34;
const LINGER_MS = 1400;

export function Farewell({ text }: { text: string }) {
  const ref = useRef<HTMLElement>(null);
  const speaking = useOnceInView(ref, { threshold: 0.6 });
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!speaking || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setTimeout(
      () => setLeaving(true),
      TYPE_START_MS + text.length * TYPE_PER_CHAR_MS + LINGER_MS,
    );
    return () => clearTimeout(timer);
  }, [speaking, text]);

  return (
    <section ref={ref} className={scene.scene} aria-label="Farewell">
      <div className={`${scene.frame} ${styles.frame}`}>
        <Image
          src={farewell}
          alt=""
          fill
          sizes="(max-aspect-ratio: 16/9) 100vw, 178vh"
          className={scene.art}
        />
        <div className={styles.knight} data-leaving={leaving || undefined} aria-hidden="true">
          <Image src={stand} alt="" sizes="8vw" className={styles.stand} />
          <div className={styles.walker} style={{ backgroundImage: `url(${walk.src})` }} />
        </div>
        <div className={styles.ui}>
          <Dialogue
            text={text}
            speaking={speaking}
            ornament={<Ornament name="orn-flourish" className={styles.orn} />}
          />
        </div>
      </div>
    </section>
  );
}
