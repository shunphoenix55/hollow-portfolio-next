'use client';

import Image from 'next/image';
import { useRef } from 'react';
import front from '@/assets/town-front.webp';
import scene from '@/assets/town-scene.webp';
import { Ornament } from '@/components/ornament/Ornament';
import { useOnceInView } from '@/hooks/useOnceInView';
import { Dialogue } from './Dialogue';
import { useTownParallax } from './useTownParallax';
import styles from './Town.module.css';

const SCENE_SIZES = '(max-width: 640px) 230vw, 100vw';

export function Town({ text }: { text: string }) {
  const rootRef = useRef<HTMLElement>(null);
  const near = useOnceInView(rootRef, { rootMargin: '50% 0px' });
  const speaking = useOnceInView(rootRef, { threshold: 0.4 });
  useTownParallax(rootRef);

  return (
    <section ref={rootRef} className={styles.town} aria-label="Welcome">
      <div className={styles.scene}>
        <div className={styles.layer} data-depth="0.2">
          {near && <Image src={scene} alt="" fill sizes={SCENE_SIZES} />}
        </div>
        <div className={styles.fog} />
        <div className={`${styles.layer} ${styles.front}`} data-depth="0.7">
          {near && <Image src={front} alt="" fill sizes={SCENE_SIZES} />}
        </div>
      </div>
      <div className={styles.vignette} />
      <div className={styles.ui}>
        <Dialogue
          text={text}
          speaking={speaking}
          ornament={<Ornament name="orn-flourish" className={styles.orn} />}
        />
      </div>
    </section>
  );
}
