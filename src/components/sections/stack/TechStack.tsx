import Image from 'next/image';
import type { CSSProperties } from 'react';
import knight from '@/assets/stack-knight.webp';
import { Ornament } from '@/components/ornament/Ornament';
import { FrameCorners } from '@/components/ui/FrameCorners';
import { MotionSection } from '@/components/ui/MotionSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { Tech } from '@/content/stack';
import { Swords } from './Swords';
import styles from './TechStack.module.css';

const ARC_FROM = 150;
const ARC_SPAN = 120;

export function TechStack({ items }: { items: Tech[] }) {
  const step = ARC_SPAN / Math.max(1, items.length - 1);
  return (
    <MotionSection id="skills" className={styles.stack} aria-labelledby="stack-title">
      <div className={styles.backdrop} data-stack-backdrop aria-hidden="true">
        <Image src={knight} alt="" fill sizes="(max-width: 640px) 150vw, 150vh" />
      </div>
      <Swords />
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
            <div className={styles.chip} data-stack-chip>
              <FrameCorners />
              <span className={styles.mono}>
                <Ornament name={tech.icon} glow={false} />
              </span>
              <span className={styles.name}>{tech.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </MotionSection>
  );
}
