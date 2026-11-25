'use client';

import { useRef } from 'react';
import front from '@/assets/town-front.webp';
import frontPhone from '@/assets/portrait/town-front.webp';
import scenePhone from '@/assets/portrait/town-scene.webp';
import scene from '@/assets/town-scene.webp';
import { Ornament } from '@/components/ornament/Ornament';
import { SceneImage } from '@/components/ui/SceneImage';
import { useOnceInView } from '@/hooks/useOnceInView';
import { Dialogue } from './Dialogue';
import { useTownParallax } from './useTownParallax';
import styles from './Town.module.css';

const SCENE_SIZES = '100vw';
const PHONE_SCENE_SIZES = '165vw';

export function Town({ text }: { text: string }) {
  const rootRef = useRef<HTMLElement>(null);
  const near = useOnceInView(rootRef, { rootMargin: '50% 0px' });
  const speaking = useOnceInView(rootRef, { threshold: 0.4 });
  useTownParallax(rootRef);

  return (
    <section ref={rootRef} className={styles.town} aria-label="Welcome">
      <div className={styles.scene}>
        <div className={styles.layer} data-depth="0.2">
          {near && (
            <SceneImage
              src={scene}
              phone={scenePhone}
              sizes={SCENE_SIZES}
              phoneSizes={PHONE_SCENE_SIZES}
            />
          )}
        </div>
        <div className={styles.fog} />
        <div className={`${styles.layer} ${styles.front}`} data-depth="0.7">
          {near && (
            <SceneImage
              src={front}
              phone={frontPhone}
              sizes={SCENE_SIZES}
              phoneSizes={PHONE_SCENE_SIZES}
            />
          )}
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
