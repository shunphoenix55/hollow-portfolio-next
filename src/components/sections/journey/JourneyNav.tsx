import Link from 'next/link';
import { Ornament } from '@/components/ornament/Ornament';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { JourneyLink } from '@/content/journey';
import styles from './JourneyNav.module.css';

type JourneyNavProps = {
  links: JourneyLink[];
  headingId: string;
  compact?: boolean;
  revealOnScroll?: boolean;
  onNavigate?: () => void;
};

export function JourneyNav({
  links,
  headingId,
  compact,
  revealOnScroll,
  onNavigate,
}: JourneyNavProps) {
  const reveal = revealOnScroll ? 'reveal' : undefined;
  return (
    <nav
      className={[styles.journey, compact && styles.compact].filter(Boolean).join(' ')}
      aria-labelledby={headingId}
    >
      <SectionHeading
        id={headingId}
        title="Journey"
        size={compact ? 'sm' : 'lg'}
        rule={compact ? 'narrow' : 'wide'}
        className={reveal}
      />
      <ul className={styles.list}>
        {links.map((link) => (
          <li key={link.href} className={reveal}>
            <Link className={styles.item} href={link.href} onClick={onNavigate}>
              <Ornament name="slot-mark" className={styles.mark} />
              {link.label}
              <Ornament name="slot-mark" className={styles.mark} />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
