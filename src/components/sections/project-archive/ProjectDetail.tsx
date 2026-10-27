'use client';

import { type LucideIcon, ExternalLink, Film, Play, CodeXml } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Ornament } from '@/components/ornament/Ornament';
import { FrameCorners } from '@/components/ui/FrameCorners';
import { HkChoice } from '@/components/ui/HkChoice';
import type { PortfolioProject, ProjectLinkKind } from '@/content/portfolio-projects';
import styles from './ProjectDetail.module.css';

const LINK_ICONS: Record<ProjectLinkKind, LucideIcon> = {
  play: Play,
  code: CodeXml,
  video: Film,
  page: ExternalLink,
};

export function ProjectDetail({ id, project }: { id: string; project: PortfolioProject }) {
  const [shot, setShot] = useState(0);
  const titleId = `${project.slug}-title`;
  const image = project.images[shot];

  return (
    <article id={id} className={styles.detail} aria-labelledby={titleId}>
      <div className={styles.text}>
        <p className={styles.eyebrow}>{project.category}</p>
        <h2 id={titleId} className={styles.title}>
          {project.title}
        </h2>
        <p className={styles.subtitle}>{project.subtitle}</p>
        <Ornament name="orn-flourish" className={styles.flourish} />
        <div className={styles.prose}>
          {project.overview.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <h3 className={styles.label}>Features</h3>
        <ul className={styles.features}>
          {project.features.map((feature) => (
            <li key={feature.title}>
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
            </li>
          ))}
        </ul>

        <h3 className={styles.label}>Built with</h3>
        <ul className={styles.tags}>
          {project.techStack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>

        <h3 className={styles.label}>Details</h3>
        <dl className={styles.details}>
          {project.details.map((detail) => (
            <div key={detail.label}>
              <dt>{detail.label}</dt>
              <dd>{detail.value}</dd>
            </div>
          ))}
        </dl>

        {project.links.length > 0 && (
          <ul className={styles.links}>
            {project.links.map((link) => {
              const Icon = LINK_ICONS[link.kind];
              return (
                <li key={link.url}>
                  <HkChoice href={link.url} target="_blank" rel="noopener noreferrer">
                    <Icon className={styles.linkIcon} aria-hidden="true" />
                    {link.label}
                  </HkChoice>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <figure className={styles.media}>
        <div className={styles.frame}>
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 900px) 92vw, 52vw"
            className={styles.photo}
          />
          <FrameCorners />
        </div>
        {project.images.length > 1 && (
          <div className={styles.thumbs} role="group" aria-label={`${project.title} images`}>
            {project.images.map((img, index) => (
              <button
                key={img.src}
                type="button"
                className={styles.thumb}
                aria-label={`Show ${img.alt}`}
                aria-pressed={index === shot}
                onClick={() => setShot(index)}
              >
                <Image src={img.src} alt="" fill sizes="96px" />
              </button>
            ))}
          </div>
        )}
      </figure>
    </article>
  );
}
