import { readdirSync } from 'fs';
import { GetStaticPaths, GetStaticProps } from 'next';
import { join } from 'path';
import { ParsedUrlQuery } from 'querystring';
import styles from './index.module.css';

/* eslint-disable-next-line */
export interface ProjectProps extends ParsedUrlQuery {
  slug: string
}

export function Project(props: ProjectProps) {
  return (
    <div className={styles['container']}>
      <h1>Project {props.slug}</h1>
    </div>
  );
}

const PROJECTS_PATH = join(process.cwd(), '_projects');

export const getStaticProps: GetStaticProps<ProjectProps> = async ({
  params
}: { params: ProjectProps}) => {
  return {
    props: {
      slug: params.slug
    }
  }
}


export const getStaticPaths: GetStaticPaths<ProjectProps> = async () => {

  const paths = readdirSync(PROJECTS_PATH)
    .map(path => path.replace(/\.mdx?$/, ''))
    .map(slug => ({ params: { slug }}));

  return {
    paths,
    fallback: false
  }
}

export default Project;
