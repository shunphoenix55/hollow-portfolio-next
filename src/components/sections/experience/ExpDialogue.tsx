import { Ornament } from '@/components/ornament/Ornament';
import type { Job } from '@/content/experience';
import styles from './Experience.module.css';

export function ExpDialogue({ job, swapping }: { job: Job | null; swapping: boolean }) {
  return (
    <div
      className={styles.dialogue}
      data-side={job?.panel ?? 'left'}
      data-swapping={swapping || undefined}
      aria-live="polite"
    >
      <Ornament name="orn-flourish" className={styles.dialogueOrn} />
      <h3 className={styles.dialogueName}>{job ? job.company : 'The climb begins'}</h3>
      <p className={styles.dialogueRole}>
        {job ? `${job.role} · ${job.dates}` : 'Scroll to follow the knight'}
      </p>
      {job?.detail ? <p className={styles.dialogueDesc}>{job.detail}</p> : null}
    </div>
  );
}
