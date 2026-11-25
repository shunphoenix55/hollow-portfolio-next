'use client';

import Image from 'next/image';
import { useRef } from 'react';
import back from '@/assets/hero-back.webp';
import front from '@/assets/hero-front.webp';
import knight from '@/assets/hero-knight.webp';
import mid from '@/assets/hero-mid.webp';
import stage from '@/assets/hero-stage.webp';
import backPhone from '@/assets/portrait/hero-back.webp';
import frontPhone from '@/assets/portrait/hero-front.webp';
import midPhone from '@/assets/portrait/hero-mid.webp';
import { Ornament } from '@/components/ornament/Ornament';
import { SceneImage } from '@/components/ui/SceneImage';
import { site } from '@/content/site';
import { useHeroMotion } from './useHeroMotion';
import styles from './Hero.module.css';

const SCENE_SIZES = '(min-aspect-ratio: 16/9) 110vw, 200vh';
const PHONE_SCENE_SIZES = '165vw';
const STAGE_SIZES = `(max-width: 640px) 135vw, ${SCENE_SIZES}`;

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useHeroMotion(rootRef);

  return (
    <section ref={rootRef} className={styles.hero} aria-label={site.name}>
      <div className={styles.sticky}>
        <div className={styles.scene}>
          <div className={styles.layer} data-depth="0.15">
            <SceneImage
              src={back}
              phone={backPhone}
              sizes={SCENE_SIZES}
              phoneSizes={PHONE_SCENE_SIZES}
              priority
            />
          </div>
          <div className={styles.fog} />
          <div className={styles.layer} data-depth="0.4">
            <div className={styles.stage}>
              <Image src={stage} alt="" fill preload fetchPriority="high" sizes={STAGE_SIZES} />
              <Image src={knight} alt="" loading="eager" sizes="10vh" className={styles.knight} />
            </div>
          </div>
          <div className={styles.layer} data-depth="0.75">
            <SceneImage
              src={mid}
              phone={midPhone}
              sizes={SCENE_SIZES}
              phoneSizes={PHONE_SCENE_SIZES}
            />
          </div>
          <div className={`${styles.fog} ${styles.fogAlt}`} />
          <div className={styles.layer} data-depth="1.2">
            <SceneImage
              src={front}
              phone={frontPhone}
              sizes={SCENE_SIZES}
              phoneSizes={PHONE_SCENE_SIZES}
            />
          </div>
        </div>
        <div className={styles.vignette} />
        <div className={styles.title} data-title>
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
