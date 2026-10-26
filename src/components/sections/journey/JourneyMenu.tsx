import { Ornament } from '@/components/ornament/Ornament';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { JourneyLink } from '@/content/journey';
import styles from './JourneyMenu.module.css';

export function JourneyMenu({ links }: { links: JourneyLink[] }) {
  return (
    <section className={styles.screen}>
      <nav className={styles.journey} aria-labelledby="journey-title">
        <SectionHeading id="journey-title" title="Journey" className="reveal" />
        <ul className={styles.list}>
          {links.map((link) => (
            <li key={link.href} className="reveal">
              <a className={styles.item} href={link.href}>
                <Ornament name="slot-mark" className={styles.mark} />
                {link.label}
                <Ornament name="slot-mark" className={styles.mark} />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
