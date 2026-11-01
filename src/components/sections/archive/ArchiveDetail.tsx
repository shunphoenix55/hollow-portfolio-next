import { Ornament } from '@/components/ornament/Ornament';
import { HkChoice } from '@/components/ui/HkChoice';
import type { ArchiveEntry, ArchiveLabels } from '@/content/archive';
import { archiveMedia } from '@/content/archive-media';
import { ArchiveGallery } from './ArchiveGallery';
import { ArchiveLinks } from './ArchiveLinks';
import styles from './ArchiveDetail.module.css';

type ArchiveDetailProps = {
  id: string;
  entry: ArchiveEntry;
  labels: ArchiveLabels;
  size?: 'md' | 'sm';
};

export function ArchiveDetail({ id, entry, labels, size = 'md' }: ArchiveDetailProps) {
  const titleId = `${entry.slug}-title`;
  const media = archiveMedia(entry);
  const classes = [styles.detail, media.length === 0 && styles.textOnly, size === 'sm' && styles.sm]
    .filter(Boolean)
    .join(' ');

  return (
    <article id={id} className={classes} aria-labelledby={titleId}>
      <div className={styles.text}>
        <h2 id={titleId} className={styles.title}>
          {entry.title}
        </h2>
        <p className={styles.subtitle}>{entry.subtitle}</p>
        <Ornament name="orn-flourish" className={styles.flourish} />
        <div className={styles.prose}>
          {entry.overview.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <h3 className={styles.label}>{labels.features}</h3>
        <ul className={styles.features}>
          {entry.features.map((feature) => (
            <li key={feature.title}>
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
            </li>
          ))}
        </ul>

        {entry.techStack.length > 0 && (
          <>
            <h3 className={styles.label}>{labels.stack}</h3>
            <ul className={styles.tags}>
              {entry.techStack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </>
        )}

        <h3 className={styles.label}>{labels.details}</h3>
        <dl className={styles.details}>
          {entry.details.map((detail) => (
            <div key={detail.label}>
              <dt>{detail.label}</dt>
              <dd>{detail.value}</dd>
            </div>
          ))}
        </dl>

        {entry.links.length > 0 && (
          <>
            <h3 className={styles.label}>{labels.links}</h3>
            {size === 'sm' ? (
              <ul className={styles.choices}>
                {entry.links.map((link) => (
                  <li key={link.url}>
                    <HkChoice selected href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </HkChoice>
                  </li>
                ))}
              </ul>
            ) : (
              <ArchiveLinks links={entry.links} className={styles.links} />
            )}
          </>
        )}
      </div>

      {media.length > 0 && (
        <ArchiveGallery media={media} title={entry.title} className={styles.media} />
      )}
    </article>
  );
}
