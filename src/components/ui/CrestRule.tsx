import { Ornament } from '@/components/ornament/Ornament';
import styles from './CrestRule.module.css';

export type RuleSize = 'wide' | 'medium' | 'aside' | 'narrow';

export function CrestRule({ size = 'wide', className }: { size?: RuleSize; className?: string }) {
  return (
    <div className={[styles.rule, styles[size], className].filter(Boolean).join(' ')}>
      <Ornament name="orn-crest" flip className={styles.crest} />
    </div>
  );
}
