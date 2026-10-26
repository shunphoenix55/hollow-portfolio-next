import { Ornament } from '@/components/ornament/Ornament';
import styles from './Hud.module.css';

export function Hud({ count, masks }: { count: number; masks: number }) {
  return (
    <div className={styles.hud} role="img" aria-label={`${count} projects`}>
      <Ornament name="hud-vessel" glow={false} className={styles.vessel} />
      <div className={styles.masks}>
        {Array.from({ length: masks }, (_, i) => (
          <Ornament key={i} name="hud-mask" glow={false} />
        ))}
      </div>
      <div className={styles.geo}>
        <Ornament name="hud-geo" glow={false} />
        {count}
      </div>
    </div>
  );
}
