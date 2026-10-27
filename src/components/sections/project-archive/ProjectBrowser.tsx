'use client';

import { useEffect, useState } from 'react';
import { Ornament } from '@/components/ornament/Ornament';
import { FerrisWheel } from '@/components/ui/ferris-wheel/FerrisWheel';
import { wrap } from '@/components/ui/ferris-wheel/wheel-math';
import type { PortfolioProject } from '@/content/portfolio-projects';
import { ProjectDetail } from './ProjectDetail';
import styles from './ProjectBrowser.module.css';

const DETAIL_ID = 'project-detail';

export function ProjectBrowser({ projects }: { projects: PortfolioProject[] }) {
  const [active, setActive] = useState(0);
  const project = projects[wrap(active, projects.length)];
  const items = projects.map((p) => ({
    id: p.slug,
    title: p.title,
    src: p.images[0].src,
    alt: p.images[0].alt,
  }));

  useEffect(() => {
    const fromHash = () => {
      const index = projects.findIndex((p) => p.slug === location.hash.slice(1));
      if (index >= 0) setActive(index);
    };
    fromHash();
    addEventListener('hashchange', fromHash);
    return () => removeEventListener('hashchange', fromHash);
  }, [projects]);

  const select = (index: number) => {
    const next = wrap(index, projects.length);
    setActive(next);
    history.replaceState(null, '', `#${projects[next].slug}`);
  };

  return (
    <>
      <section className={styles.wheel} aria-label="Project wheel">
        <FerrisWheel
          items={items}
          active={active}
          onActiveChange={select}
          label="Projects ferris wheel"
          controlsId={DETAIL_ID}
        />
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.arrow}
            aria-label="Previous project"
            aria-controls={DETAIL_ID}
            onClick={() => select(active - 1)}
          >
            <Ornament name="slot-mark" className={styles.arrowMarkLeft} />
          </button>
          <p className={styles.current} aria-hidden="true">
            {project.title}
          </p>
          <button
            type="button"
            className={styles.arrow}
            aria-label="Next project"
            aria-controls={DETAIL_ID}
            onClick={() => select(active + 1)}
          >
            <Ornament name="slot-mark" className={styles.arrowMark} />
          </button>
        </div>
      </section>
      <ProjectDetail key={project.slug} id={DETAIL_ID} project={project} />
    </>
  );
}
