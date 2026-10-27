import Image from 'next/image';
import Link from 'next/link';
import { Ornament } from '@/components/ornament/Ornament';
import type { PortfolioProject } from '@/content/portfolio-projects';
import { ProjectPoints } from './ProjectPoints';
import styles from './ProjectCard.module.css';

export function ProjectCard({ project }: { project: PortfolioProject }) {
  const [feature] = project.features;
  const points = feature
    ? [project.summary, `${feature.title}: ${feature.description}`]
    : [project.summary];
  const cover = project.images[0];
  return (
    <article className={`${styles.card} reveal`}>
      <Ornament name="orn-panel-top" className={styles.cap} />
      <div className={styles.body}>
        <Link href={`/projects#${project.slug}`} className={styles.shot} tabIndex={-1}>
          <Image src={cover.src} alt={cover.alt} fill sizes="(max-width: 640px) 80vw, 320px" />
        </Link>
        <h3 className={styles.title}>
          <Link href={`/projects#${project.slug}`} className={styles.titleLink}>
            {project.title}
          </Link>
        </h3>
        <ProjectPoints points={points} />
      </div>
    </article>
  );
}
