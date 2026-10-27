import Image from 'next/image';
import type { CSSProperties } from 'react';
import ruins from '@/assets/stack-ruins.webp';
import { MotionSection } from '@/components/ui/MotionSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { Tech } from '@/content/stack';
import { StackIntro } from './StackIntro';
import { TechIcon } from './TechIcon';
import styles from './TechStack.module.css';

const COLUMNS = 5;

const jitter = (seed: number) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value) - 0.5;
};

const scatter = (index: number, total: number) => {
  const rows = Math.ceil(total / COLUMNS);
  const col = index % COLUMNS;
  const row = Math.floor(index / COLUMNS);
  return {
    x: 14 + (col * 72) / (COLUMNS - 1) + jitter(index + 1) * 8,
    y: 24 + (row * 40) / Math.max(1, rows - 1) + jitter(index + 7) * 10,
  };
};

export function TechStack({ items }: { items: Tech[] }) {
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
      <ul className={styles.field}>
        {items.map((tech, i) => {
          const { x, y } = scatter(i, items.length);
          return (
            <li
              key={tech.name}
              className={styles.card}
              style={{ '--x': `${x.toFixed(2)}%`, '--y': `${y.toFixed(2)}%` } as CSSProperties}
            >
              <div className={styles.orb} data-stack-orb tabIndex={tech.detail ? 0 : undefined}>
                <span className={styles.ball}>
                  <TechIcon icon={tech.icon} />
                </span>
                <span className={styles.label}>{tech.name}</span>
                {tech.detail && <span className={styles.detail}>{tech.detail}</span>}
              </div>
            </li>
          );
        })}
      </ul>
    </MotionSection>
  );
}
