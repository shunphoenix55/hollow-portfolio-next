'use client';

import { type ReactNode, useMemo } from 'react';
import { Ornament } from '@/components/ornament/Ornament';
import { ArchiveDetail } from '@/components/sections/archive/ArchiveDetail';
import { useHashSelection } from '@/components/sections/archive/useHashSelection';
import { FrameCorners } from '@/components/ui/FrameCorners';
import type { ArchiveLabels } from '@/content/archive';
import type { GuildGroup } from '@/content/guild';
import { slowScrollTo } from '@/lib/slow-scroll';
import styles from './GuildJournal.module.css';

const DETAIL_ID = 'guild-entry';

type GuildJournalProps = { groups: GuildGroup[]; labels: ArchiveLabels; intro?: ReactNode };

export function GuildJournal({ groups, labels, intro }: GuildJournalProps) {
  const entries = useMemo(() => groups.flatMap((group) => group.entries), [groups]);
  const [active, select] = useHashSelection(entries);
  const entry = entries[active];

  const open = (index: number) => {
    select(index);
    const title = document.getElementById(DETAIL_ID);
    if (!title) return;
    const { top } = title.getBoundingClientRect();
    if (top < 0 || top > innerHeight * 0.6) slowScrollTo(title, 1000);
  };

  return (
    <>
      {intro}
      <div className={styles.journal}>
        <nav className={styles.index} aria-label={labels.wheel}>
          {groups.map((group) => (
            <section key={group.label} className={styles.group}>
              <h2 className={styles.groupLabel}>{group.label}</h2>
              <ul className={styles.items}>
                {group.entries.map((item) => {
                  const index = entries.indexOf(item);
                  return (
                    <li key={item.slug}>
                      <button
                        type="button"
                        className={styles.item}
                        aria-pressed={index === active}
                        aria-controls={DETAIL_ID}
                        onClick={() => open(index)}
                      >
                        <Ornament name="slot-mark" className={styles.mark} />
                        <span className={styles.itemTitle}>{item.title}</span>
                        <span className={styles.itemSub}>{item.subtitle}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </nav>

        <div className={styles.page}>
          <FrameCorners />
          <ArchiveDetail key={entry.slug} id={DETAIL_ID} entry={entry} labels={labels} size="sm" />
        </div>
      </div>
    </>
  );
}
