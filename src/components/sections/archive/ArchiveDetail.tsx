'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Ornament } from '@/components/ornament/Ornament';
import { FrameCorners } from '@/components/ui/FrameCorners';
import { HkChoice } from '@/components/ui/HkChoice';
import type { ArchiveEntry, ArchiveLabels } from '@/content/archive';
import { ArchiveLinks } from './ArchiveLinks';
import styles from './ArchiveDetail.module.css';

type ArchiveDetailProps = {
  id: string;
  entry: ArchiveEntry;
  labels: ArchiveLabels;
  size?: 'md' | 'sm';
};

export function ArchiveDetail({ id, entry, labels, size = 'md' }: ArchiveDetailProps) {
  const [shot, setShot] = useState(0);
  const titleId = `${entry.slug}-title`;
  const image = entry.images[shot];
  const classes = [styles.detail, !image && styles.textOnly, size === 'sm' && styles.sm]
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

      {image && (
        <figure className={styles.media}>
          <div className={styles.frame}>
            <Image
              key={image.src.src}
              src={image.src}
              placeholder="blur"
              alt={image.alt}
              fill
              sizes="(max-width: 900px) 92vw, 52vw"
              className={styles.photo}
            />
            <FrameCorners />
          </div>
          {entry.images.length > 1 && (
            <div className={styles.thumbs} role="group" aria-label={`${entry.title} images`}>
              {entry.images.map((img, index) => (
                <button
                  key={img.src.src}
                  type="button"
                  className={styles.thumb}
                  aria-label={`Show ${img.alt}`}
                  aria-pressed={index === shot}
                  onClick={() => setShot(index)}
                >
                  <Image src={img.src} alt="" fill sizes="96px" placeholder="blur" />
                </button>
              ))}
            </div>
          )}
        </figure>
      )}
    </article>
  );
}
