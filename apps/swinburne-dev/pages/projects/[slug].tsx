import { GetStaticPaths, GetStaticProps } from 'next';
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
  return {
    paths: [
      {
        params: {
          slug: 'jlr-configurator'
        }
      },
      {
        params: {
          slug: 'jlr-ncos'
        }
      }
    ],
    fallback: false
  }
}

export default Project;
