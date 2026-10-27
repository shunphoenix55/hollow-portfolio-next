'use client';

import { useEffect, useRef, useState } from 'react';
import { FerrisWheel } from '@/components/ui/ferris-wheel/FerrisWheel';
import { wrap } from '@/components/ui/ferris-wheel/wheel-math';
import type { PortfolioProject } from '@/content/portfolio-projects';
import { slowScrollTo } from '@/lib/slow-scroll';
import { ProjectDetail } from './ProjectDetail';
import styles from './ProjectBrowser.module.css';

const DETAIL_ID = 'project-detail';

const scrollToId = (id: string) => {
  const element = document.getElementById(id);
  if (element) slowScrollTo(element);
};

export function ProjectBrowser({ projects }: { projects: PortfolioProject[] }) {
  const [active, setActive] = useState(0);
  const scrollPending = useRef(false);
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

  useEffect(() => {
    if (!scrollPending.current) return;
    scrollPending.current = false;
    scrollToId(`${project.slug}-title`);
  }, [project.slug]);

  const select = (index: number) => {
    const next = wrap(index, projects.length);
    scrollPending.current = true;
    setActive(next);
    history.replaceState(null, '', `#${projects[next].slug}`);
  };

  const pick = (index: number) => {
    if (wrap(index, projects.length) === active) scrollToId(`${project.slug}-title`);
  };

  return (
    <>
      <section className={styles.wheel} aria-label="Project wheel">
        <FerrisWheel
          items={items}
          active={active}
          onActiveChange={select}
          onPick={pick}
          label="Projects ferris wheel"
          controlsId={DETAIL_ID}
        />
        <a
          className={styles.cue}
          href={`#${DETAIL_ID}`}
          onClick={(event) => {
            event.preventDefault();
            scrollToId(`${project.slug}-title`);
          }}
        >
          <span className={styles.current}>{project.title}</span>
          <span className={styles.hint}>Read about it below</span>
          <i className={styles.line} aria-hidden="true" />
        </a>
      </section>
      <ProjectDetail key={project.slug} id={DETAIL_ID} project={project} />
    </>
  );
}
