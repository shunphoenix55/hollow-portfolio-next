'use client';

import type { ReactNode } from 'react';
import { FerrisWheel } from '@/components/ui/ferris-wheel/FerrisWheel';
import { wrap } from '@/components/ui/ferris-wheel/wheel-math';
import type { ArchiveEntry, ArchiveLabels } from '@/content/archive';
import { slowScrollTo } from '@/lib/slow-scroll';
import { ArchiveDetail } from './ArchiveDetail';
import styles from './ArchiveBrowser.module.css';
import { useHashSelection } from './useHashSelection';

const DETAIL_ID = 'archive-detail';

type ArchiveBrowserProps = {
  entries: ArchiveEntry[];
  labels: ArchiveLabels;
  intro?: ReactNode;
};

export function ArchiveBrowser({ entries, labels, intro }: ArchiveBrowserProps) {
  const [active, selectEntry] = useHashSelection(entries);
  const entry = entries[wrap(active, entries.length)];
  const items = entries.map((p) => ({
    id: p.slug,
    title: p.title,
    src: p.images[0].src,
    alt: p.images[0].alt,
  }));

  const select = (index: number) => selectEntry(wrap(index, entries.length));

  return (
    <>
      <div className={styles.hero}>
        {intro}
        <section className={styles.wheel} aria-label={labels.wheel}>
          <div className={styles.wheelArea}>
            <FerrisWheel
              items={items}
              active={active}
              onActiveChange={select}
              label={labels.wheel}
              controlsId={DETAIL_ID}
            />
          </div>
          <a
            className={styles.cue}
            href={`#${DETAIL_ID}`}
            onClick={(event) => {
              event.preventDefault();
              const title = document.getElementById(`${entry.slug}-title`);
              if (title) slowScrollTo(title);
            }}
          >
            <span className={styles.current}>{entry.title}</span>
            <span className={styles.hint}>Read about it below</span>
            <i className={styles.line} aria-hidden="true" />
          </a>
        </section>
      </div>
      <ArchiveDetail key={entry.slug} id={DETAIL_ID} entry={entry} labels={labels} />
    </>
  );
}
