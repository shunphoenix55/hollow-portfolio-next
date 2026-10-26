import type { ReactNode } from 'react';
import { CrestRule, type RuleSize } from './CrestRule';
import styles from './SectionHeading.module.css';

type SectionHeadingProps = {
  id: string;
  title: string;
  size?: 'lg' | 'md' | 'sm';
  rule?: RuleSize;
  adornment?: ReactNode;
  className?: string;
};

export function SectionHeading({
  id,
  title,
  size = 'lg',
  rule = 'wide',
  adornment,
  className,
}: SectionHeadingProps) {
  return (
    <div className={[styles.heading, className].filter(Boolean).join(' ')}>
      <div className={styles.name}>
        {adornment}
        <h2 id={id} className={`${styles.title} ${styles[size]}`}>
          {title}
        </h2>
      </div>
      <CrestRule size={rule} />
    </div>
  );
}
