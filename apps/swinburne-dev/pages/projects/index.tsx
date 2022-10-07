import { GetStaticProps } from 'next';
import { join } from 'path';
import { ProjectCard } from 'libs/shared/ui/src/lib/project-card';
import { getFilenames } from '@swin-dev-nx/markdown-parser';

/* eslint-disable-next-line */
export interface ProjectsProps {
  files: Array<string>
}

export function Projects(props: ProjectsProps) {
  return (
    <div className="p-10">
      <h1>Welcome to Projects!</h1>
      { props.files && props.files.map(project => {
        return (<ProjectCard title={project} url={`projects/${project}`} />);
      })}
    </div>
  );
}

export const getStaticProps: GetStaticProps = () => {
  const PROJECTS_PATH = join(process.cwd(), process.env.PROJECTS_MD_PATH || '_projects');
  return {
    props: {
      files: getFilenames(PROJECTS_PATH)
    }
  }
}

export default Projects;
