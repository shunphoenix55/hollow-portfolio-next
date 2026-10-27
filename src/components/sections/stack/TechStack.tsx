import Image from 'next/image';
import type { CSSProperties } from 'react';
import ruins from '@/assets/stack-ruins.webp';
import { Ornament } from '@/components/ornament/Ornament';
import { MotionSection } from '@/components/ui/MotionSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { Tech } from '@/content/stack';
import { StackIntro } from './StackIntro';
import styles from './TechStack.module.css';

const ARC_FROM = 150;
const ARC_SPAN = 120;

export function TechStack({ items }: { items: Tech[] }) {
  const step = ARC_SPAN / Math.max(1, items.length - 1);
  return (
    <MotionSection
      id="skills"
      className={styles.stack}
      aria-labelledby="stack-title"
      data-intro="final"
    >
      <div className={styles.backdrop} aria-hidden="true">
        <Image src={ruins} alt="" fill sizes="(max-width: 640px) 150vw, 150vh" />
        <StackIntro />
      </div>
      <SectionHeading id="stack-title" title="Tech Stack" rule="medium" className={styles.head} />
      <ul className={styles.arc}>
        {items.map((tech, i) => (
          <li
            key={tech.name}
            className={styles.card}
            style={
              {
                '--a': `${(ARC_FROM - i * step).toFixed(1)}deg`,
                '--d': `${(-i * 0.7).toFixed(1)}s`,
              } as CSSProperties
            }
          >
            <div className={styles.orb} data-stack-orb>
              <span className={styles.ball}>
                <Ornament name={tech.icon} glow={false} />
              </span>
              <span className={styles.label}>{tech.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </MotionSection>
  );
}
