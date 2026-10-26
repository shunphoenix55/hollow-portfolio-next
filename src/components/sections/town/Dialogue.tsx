import type { CSSProperties, ReactNode } from 'react';
import styles from './Dialogue.module.css';

type DialogueProps = { text: string; speaking: boolean; ornament: ReactNode };

export function Dialogue({ text, speaking, ornament }: DialogueProps) {
  return (
    <div className={styles.dialogue} data-speaking={speaking || undefined}>
      {ornament}
      <p className={styles.text}>
        <span className="sr-only">{text}</span>
        <span aria-hidden="true">
          {[...text].map((char, i) => (
            <span key={i} className={styles.char} style={{ '--i': i } as CSSProperties}>
              {char}
            </span>
          ))}
        </span>
      </p>
    </div>
  );
}
