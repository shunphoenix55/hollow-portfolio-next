import { Ornament } from '@/components/ornament/Ornament';
import type { Project } from '@/content/projects';
import { ProjectPoints } from './ProjectPoints';
import styles from './ProjectCard.module.css';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={`${styles.card} reveal`}>
      <Ornament name="orn-panel-top" className={styles.cap} />
      <div className={styles.body}>
        <div className={`${styles.shot} ${styles[project.art]}`}>
          <Ornament name="knight" glow={false} />
        </div>
        <h3 className={styles.title}>{project.title}</h3>
        <ProjectPoints points={project.points} />
      </div>
    </article>
  );
}
