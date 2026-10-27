import Link from 'next/link';
import { Ornament } from '@/components/ornament/Ornament';
import type { RuleSize } from '@/components/ui/CrestRule';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { JourneyLink } from '@/content/journey';
import styles from './JourneyNav.module.css';

type JourneyNavProps = {
  links: JourneyLink[];
  headingId: string;
  rule?: RuleSize;
  revealOnScroll?: boolean;
  onNavigate?: () => void;
};

export function JourneyNav({
  links,
  headingId,
  rule,
  revealOnScroll,
  onNavigate,
}: JourneyNavProps) {
  const reveal = revealOnScroll ? 'reveal' : undefined;
  return (
    <nav className={styles.journey} aria-labelledby={headingId}>
      <SectionHeading id={headingId} title="Journey" rule={rule} className={reveal} />
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
