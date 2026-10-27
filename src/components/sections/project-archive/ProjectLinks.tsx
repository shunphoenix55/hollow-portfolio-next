import { ArrowUpRight, CodeXml, ExternalLink, Film, type LucideIcon, Play } from 'lucide-react';
import type { ProjectLink, ProjectLinkKind } from '@/content/portfolio-projects';
import styles from './ProjectLinks.module.css';

const LINK_ICONS: Record<ProjectLinkKind, LucideIcon> = {
  play: Play,
  code: CodeXml,
  video: Film,
  page: ExternalLink,
};

type ProjectLinksProps = { links: ProjectLink[]; size?: 'md' | 'sm'; className?: string };

export function ProjectLinks({ links, size = 'md', className }: ProjectLinksProps) {
  if (links.length === 0) return null;
  return (
    <ul className={[styles.links, styles[size], className].filter(Boolean).join(' ')}>
      {links.map((link) => {
        const Icon = LINK_ICONS[link.kind];
        return (
          <li key={link.url}>
            <a className={styles.link} href={link.url} target="_blank" rel="noopener noreferrer">
              {size === 'md' && <Icon className={styles.icon} aria-hidden="true" />}
              {link.label}
              {size === 'md' && <ArrowUpRight className={styles.arrow} aria-hidden="true" />}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
