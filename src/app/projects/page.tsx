import type { Metadata } from 'next';
import { ArchivePage } from '@/components/sections/archive/ArchivePage';
import { portfolioProjects, projectLabels, projectsPage } from '@/content/portfolio-projects';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: `${projectsPage.title} — ${site.name}`,
  description: projectsPage.intro,
  alternates: { canonical: '/projects' },
  openGraph: { url: '/projects', title: `${projectsPage.title} — ${site.name}` },
};

export default function ProjectsPage() {
  return (
    <ArchivePage
      id="projects"
      title={projectsPage.title}
      intro={projectsPage.intro}
      entries={portfolioProjects}
      labels={projectLabels}
    />
  );
}
