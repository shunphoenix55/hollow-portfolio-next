import type { CSSProperties } from 'react';
import { Ornament } from '@/components/ornament/Ornament';
import type { Job } from '@/content/experience';
import styles from './Experience.module.css';

type XpEntryProps = {
  job: Job;
  index: number;
  open: boolean;
  onActivate: (index: number) => void;
};

function Rule() {
  return (
    <span className={styles.rule}>
      <Ornament name="orn-hook" className={styles.hook} />
      <span className={styles.line}>
        <svg viewBox="0 0 1000 10" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 2.4L995 4.6Q1000 5 995 5.4L0 7.6Z" fill="#fff" />
        </svg>
        <span className={styles.glint} />
      </span>
    </span>
  );
}

export function XpEntry({ job, index, open, onActivate }: XpEntryProps) {
  const detailId = `xp-detail-${index + 1}`;
  const content = (
    <>
      <Rule />
      <span className={styles.top}>
        <span className={styles.company} data-company>
          {job.company}
        </span>
        <span className={styles.dates}>{job.dates}</span>
      </span>
      <span className={styles.role}>{job.role}</span>
    </>
  );
  return (
    <li
      className={styles.xp}
      style={{ '--x': `${job.platform.x}%`, '--y': `${job.platform.y}%` } as CSSProperties}
      data-open={open || undefined}
      data-xp
    >
      {job.detail ? (
        <>
          <button
            type="button"
            className={styles.entry}
            aria-expanded={open}
            aria-controls={detailId}
            onClick={() => onActivate(index)}
          >
            {content}
            <Ornament name="slot-mark" className={styles.mark} />
          </button>
          <div className={styles.detail} id={detailId}>
            <p>{job.detail}</p>
          </div>
        </>
      ) : (
        <div className={styles.entry}>{content}</div>
      )}
    </li>
  );
}
