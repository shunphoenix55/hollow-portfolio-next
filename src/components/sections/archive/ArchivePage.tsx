import cavern from '@/assets/projects-cavern.webp';
import type { ArchiveEntry, ArchiveLabels } from '@/content/archive';
import { ArchiveBrowser } from './ArchiveBrowser';
import { ArchiveHeader, ArchiveShell } from './ArchiveShell';

type ArchivePageProps = {
  id: string;
  title: string;
  intro: string;
  entries: ArchiveEntry[];
  labels: ArchiveLabels;
};

export function ArchivePage({ id, title, intro, entries, labels }: ArchivePageProps) {
  return (
    <ArchiveShell backdrop={cavern}>
      <ArchiveBrowser
        entries={entries}
        labels={labels}
        intro={<ArchiveHeader id={id} title={title} intro={intro} />}
      />
    </ArchiveShell>
  );
}
