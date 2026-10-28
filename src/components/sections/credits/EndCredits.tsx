import Image from 'next/image';
import type { CSSProperties } from 'react';
import cave from '@/assets/credits-cave.webp';
import forest from '@/assets/credits-forest.webp';
import walk from '@/assets/knight-walk.webp';
import { Ornament } from '@/components/ornament/Ornament';
import { HkChoice } from '@/components/ui/HkChoice';
import { PlayOnView } from '@/components/ui/PlayOnView';
import { creditRoll, farewellLine, guildScene } from '@/content/credits';
import { Farewell } from './Farewell';
import styles from './EndCredits.module.css';

const SCENE_SIZES = '(max-aspect-ratio: 16/9) 100vw, 178vh';

export function EndCredits() {
  return (
    <>
      <PlayOnView
        className={`${styles.scene} ${styles.pullUp}`}
        aria-labelledby="guild-title"
        threshold={0.5}
      >
        <div className={styles.frame}>
          <Image src={forest} alt="" fill sizes={SCENE_SIZES} className={styles.art} />
          <div className={styles.guild}>
            <Ornament name="orn-crest" flip className={styles.emblem} />
            <Ornament name="orn-flourish" className={styles.flourish} />
            <h2 id="guild-title" className={styles.guildTitle}>
              {guildScene.title}
            </h2>
            {guildScene.lines.map((line, i) => (
              <p key={line} className={styles.line} style={{ '--i': i } as CSSProperties}>
                {line}
              </p>
            ))}
            <Ornament name="orn-flourish" className={styles.flourishSmall} />
          </div>
          <div className={styles.cta}>
            <HkChoice selected size="lg" href={guildScene.cta.href}>
              {guildScene.cta.label}
            </HkChoice>
          </div>
        </div>
      </PlayOnView>

      <Farewell text={farewellLine} />

      <PlayOnView className={styles.scene} aria-label="Credits" replay>
        <div className={styles.frame}>
          <Image src={cave} alt="" fill sizes={SCENE_SIZES} className={styles.art} />
          <div
            className={styles.walker}
            style={{ backgroundImage: `url(${walk.src})` }}
            aria-hidden="true"
          />
          <div className={styles.roll}>
            <div className={styles.track}>
              {[0, 1].map((copy) => (
                <ol key={copy} className={styles.list} aria-hidden={copy === 1 || undefined}>
                  {creditRoll.map((block) => (
                    <li key={block.name} className={styles.block}>
                      <span className={styles.lead}>{block.lead}</span>
                      <span className={styles.name}>{block.name}</span>
                      {block.note && <span className={styles.note}>{block.note}</span>}
                    </li>
                  ))}
                </ol>
              ))}
            </div>
          </div>
        </div>
      </PlayOnView>
    </>
  );
}
