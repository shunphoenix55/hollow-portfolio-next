'use client';

import { type ReactNode, useEffect, useState } from 'react';
import { FerrisWheel } from '@/components/ui/ferris-wheel/FerrisWheel';
import { wrap } from '@/components/ui/ferris-wheel/wheel-math';
import type { PortfolioProject } from '@/content/portfolio-projects';
import { slowScrollTo } from '@/lib/slow-scroll';
import { ProjectDetail } from './ProjectDetail';
import styles from './ProjectBrowser.module.css';

const DETAIL_ID = 'project-detail';

type ProjectBrowserProps = { projects: PortfolioProject[]; intro?: ReactNode };

export function ProjectBrowser({ projects, intro }: ProjectBrowserProps) {
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
      <div className={styles.hero}>
        {intro}
        <section className={styles.wheel} aria-label="Project wheel">
          <div className={styles.wheelArea}>
            <FerrisWheel
              items={items}
              active={active}
              onActiveChange={select}
              label="Projects ferris wheel"
              controlsId={DETAIL_ID}
            />
          </div>
          <a
            className={styles.cue}
            href={`#${DETAIL_ID}`}
            onClick={(event) => {
              event.preventDefault();
              const title = document.getElementById(`${project.slug}-title`);
              if (title) slowScrollTo(title);
            }}
          >
            <span className={styles.current}>{project.title}</span>
            <span className={styles.hint}>Read about it below</span>
            <i className={styles.line} aria-hidden="true" />
          </a>
        </section>
      </div>
      <ProjectDetail key={project.slug} id={DETAIL_ID} project={project} />
    </>
  );
}
