import type { Metadata } from 'next';
import { ArchivePage } from '@/components/sections/archive/ArchivePage';
import { site } from '@/content/site';
import { experienceLabels, experiencePage, workExperience } from '@/content/work-experience';

export const metadata: Metadata = {
  title: `${experiencePage.title} — ${site.name}`,
  description: experiencePage.intro,
  alternates: { canonical: '/experience' },
  openGraph: { url: '/experience', title: `${experiencePage.title} — ${site.name}` },
};

export default function ExperiencePage() {
  return (
    <ArchivePage
      id="experience"
      title={experiencePage.title}
      intro={experiencePage.intro}
      entries={workExperience}
      labels={experienceLabels}
    />
  );
}
