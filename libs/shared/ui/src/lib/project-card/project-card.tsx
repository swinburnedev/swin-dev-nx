import styles from './project-card.module.css';

/* eslint-disable-next-line */
export interface ProjectCardProps {
  excerpt?: string;
  title: string;
  url: string;
}

export function ProjectCard(props: ProjectCardProps) {
  return (
    <a href={props.url} className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.title}</h3>
      <p className="font-normal text-gray-700 dark:text-gray-400">{props.excerpt}</p>
    </a>
  );
}

export default ProjectCard;
