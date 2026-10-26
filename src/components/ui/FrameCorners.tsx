import { Ornament } from '@/components/ornament/Ornament';
import styles from './FrameCorners.module.css';

const CORNERS = ['tl', 'tr', 'bl', 'br'] as const;

export function FrameCorners({ className }: { className?: string }) {
  return CORNERS.map((pos) => (
    <Ornament
      key={pos}
      name="orn-corner"
      className={[styles.corner, styles[pos], className].filter(Boolean).join(' ')}
    />
  ));
}
