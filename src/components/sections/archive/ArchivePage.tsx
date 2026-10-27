import Image from 'next/image';
import cavern from '@/assets/projects-cavern.webp';
import { Abyss } from '@/components/sections/abyss/Abyss';
import { HkChoice } from '@/components/ui/HkChoice';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ArchiveEntry, ArchiveLabels } from '@/content/archive';
import { ArchiveBrowser } from './ArchiveBrowser';
import styles from './ArchivePage.module.css';

type ArchivePageProps = {
  id: string;
  title: string;
  intro: string;
  entries: ArchiveEntry[];
  labels: ArchiveLabels;
};

export function ArchivePage({ id, title, intro, entries, labels }: ArchivePageProps) {
  return (
    <>
      <Abyss />
      <main className={styles.page}>
        <div className={styles.backdrop} aria-hidden="true">
          <Image src={cavern} alt="" preload sizes="(max-aspect-ratio: 16/9) 178vh, 100vw" />
        </div>
        <nav className={styles.nav} aria-label="Back">
          <HkChoice href="/">Return</HkChoice>
        </nav>
        <ArchiveBrowser
          entries={entries}
          labels={labels}
          intro={
            <header className={styles.header}>
              <SectionHeading as="h1" font="dialogue" id={`${id}-page-title`} title={title} />
              <p className={styles.intro}>{intro}</p>
            </header>
          }
        />
      </main>
    </>
  );
}
