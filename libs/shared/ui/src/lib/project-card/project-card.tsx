import styles from './project-card.module.css';

/* eslint-disable-next-line */
export interface ProjectCardProps {}

export function ProjectCard(props: ProjectCardProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ProjectCard!</h1>
    </div>
  );
}

export default ProjectCard;
