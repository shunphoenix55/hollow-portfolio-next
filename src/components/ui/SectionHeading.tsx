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
  as?: 'h1' | 'h2';
  font?: 'title' | 'dialogue';
};

export function SectionHeading({
  id,
  title,
  size = 'lg',
  rule = 'wide',
  adornment,
  className,
  as: Heading = 'h2',
  font = 'title',
}: SectionHeadingProps) {
  return (
    <div className={[styles.heading, className].filter(Boolean).join(' ')}>
      <div className={styles.name}>
        {adornment}
        <Heading id={id} className={`${styles.title} ${styles[size]} ${styles[font]}`}>
          {title}
        </Heading>
      </div>
      <CrestRule size={rule} />
    </div>
  );
}
