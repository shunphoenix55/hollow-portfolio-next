'use client';

import Image from 'next/image';
import { useRef } from 'react';
import back from '@/assets/hero-back.webp';
import front from '@/assets/hero-front.webp';
import knight from '@/assets/hero-knight.webp';
import mid from '@/assets/hero-mid.webp';
import stage from '@/assets/hero-stage.webp';
import { Ornament } from '@/components/ornament/Ornament';
import { site } from '@/content/site';
import { useHeroMotion } from './useHeroMotion';
import styles from './Hero.module.css';

const SCENE_SIZES = '(min-aspect-ratio: 16/9) 110vw, 200vh';

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useHeroMotion(rootRef);

  return (
    <section ref={rootRef} className={styles.hero} aria-label={site.name}>
      <div className={styles.sticky}>
        <div className={styles.scene}>
          <div className={styles.layer} data-depth="0.15">
            <Image src={back} alt="" fill preload sizes={SCENE_SIZES} />
          </div>
          <div className={styles.fog} />
          <div className={styles.layer} data-depth="0.4">
            <Image
              src={stage}
              alt=""
              fill
              preload
              fetchPriority="high"
              sizes={SCENE_SIZES}
              className={styles.stage}
            />
            <Image src={knight} alt="" loading="eager" sizes="10vh" className={styles.knight} />
          </div>
          <div className={styles.layer} data-depth="0.75">
            <Image src={mid} alt="" fill loading="eager" sizes={SCENE_SIZES} />
          </div>
          <div className={`${styles.fog} ${styles.fogAlt}`} />
          <div className={styles.layer} data-depth="1.2">
            <Image src={front} alt="" fill loading="eager" sizes={SCENE_SIZES} />
          </div>
        </div>
        <div className={styles.vignette} />
        <div className={styles.title} data-title>
          <Ornament name="knight" glow={false} className={styles.mark} />
          <Ornament name="orn-flourish" className={styles.top} />
          <h1 className={styles.name}>{site.name}</h1>
          <Ornament name="orn-crest" flip className={styles.bottom} />
        </div>
        <div className={styles.cue} data-cue aria-hidden="true">
          <span>Descend</span>
          <i />
        </div>
        <div className={styles.dark} data-dark />
      </div>
    </section>
  );
}
