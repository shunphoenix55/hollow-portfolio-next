import type { JourneyLink } from '@/content/journey';
import { JourneyNav } from './JourneyNav';
import styles from './JourneyMenu.module.css';

export function JourneyMenu({ links }: { links: JourneyLink[] }) {
  return (
    <section className={styles.screen}>
      <JourneyNav links={links} headingId="journey-title" revealOnScroll />
    </section>
  );
}
