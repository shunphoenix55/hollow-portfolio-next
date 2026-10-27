import type { Metadata } from 'next';
import Image from 'next/image';
import cavern from '@/assets/projects-cavern.webp';
import { Abyss } from '@/components/sections/abyss/Abyss';
import { ProjectBrowser } from '@/components/sections/project-archive/ProjectBrowser';
import { HkChoice } from '@/components/ui/HkChoice';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { portfolioProjects, projectsPage } from '@/content/portfolio-projects';
import { site } from '@/content/site';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: `${projectsPage.title} — ${site.name}`,
  description: projectsPage.intro,
  alternates: { canonical: '/projects' },
  openGraph: { url: '/projects', title: `${projectsPage.title} — ${site.name}` },
};

export default function ProjectsPage() {
  return (
    <>
      <Abyss />
      <main className={styles.page}>
        <div className={styles.backdrop} aria-hidden="true">
          <Image src={cavern} alt="" preload sizes="(max-aspect-ratio: 16/9) 178vh, 100vw" />
        </div>
        <nav className={styles.nav} aria-label="Back">
          <HkChoice href="/">Return</HkChoice>
        </nav>
        <ProjectBrowser
          projects={portfolioProjects}
          intro={
            <header className={styles.header}>
              <SectionHeading
                as="h1"
                font="dialogue"
                id="projects-page-title"
                title={projectsPage.title}
              />
              <p className={styles.intro}>{projectsPage.intro}</p>
            </header>
          }
        />
      </main>
    </>
  );
}
