import Image from 'next/image';
import cave from '@/assets/projects-cave.webp';
import { HkChoice } from '@/components/ui/HkChoice';
import { MotionSection } from '@/components/ui/MotionSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { projects, projectsHeading } from '@/content/projects';
import { Hud } from './Hud';
import { ProjectCard } from './ProjectCard';
import styles from './Projects.module.css';

export function Projects() {
  return (
    <MotionSection id="projects" className={styles.projects} aria-labelledby="projects-title">
      <div className={styles.backdrop} aria-hidden="true">
        <Image src={cave} alt="" sizes="(max-width: 900px) 100vw, 64vw" />
      </div>
      <div className={styles.aside}>
        <SectionHeading
          id="projects-title"
          title={projectsHeading.title}
          size="md"
          rule="aside"
          className={`${styles.heading} reveal`}
          adornment={<Hud count={projectsHeading.count} masks={projectsHeading.masks} />}
        />
      </div>
      <div className={styles.main}>
        <div className={styles.grid}>
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
        <HkChoice selected href={projectsHeading.viewAllHref} className={styles.all}>
          View all
        </HkChoice>
      </div>
    </MotionSection>
  );
}
