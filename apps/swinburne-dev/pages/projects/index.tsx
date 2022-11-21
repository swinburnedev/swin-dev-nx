import { GetStaticProps } from 'next';
import { join } from 'path';
import { gql } from '@apollo/client';
import { ProjectCard } from 'libs/shared/ui/src/lib/project-card';
import { getFilenames } from '@swin-dev-nx/markdown-parser';
import client from '../../apollo/client';

/* eslint-disable-next-line */
export interface ProjectsProps {
  files: Array<string>
}

export function Projects(props: ProjectsProps) {
  return (
    <div className="p-10">
      <h1>Projects</h1>
      <p>Coming soon...</p>
      {/* { props.files && props.files.map(project => {
        return (<ProjectCard title={project} url={`projects/${project}`} />);
      })} */}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const PROJECTS_PATH = join(process.cwd(), process.env.PROJECTS_MD_PATH || '_projects');
  const { data } = await client.query({
    query: gql`
      query {}
    `,
  });
  return {
    props: {
      mdxProjects: getFilenames(PROJECTS_PATH)
    }
  }
}

export default Projects;
