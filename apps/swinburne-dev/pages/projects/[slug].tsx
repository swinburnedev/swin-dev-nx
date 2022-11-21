import { GetStaticPaths, GetStaticProps } from 'next';
import { gql } from '@apollo/client';
import { ParsedUrlQuery } from 'querystring';
import client from '../../apollo/client';
import { Layout } from '../../components/layout';
import Link from 'next/link';
import { BackButton } from '@swin-dev-nx/shared/ui';

/* eslint-disable-next-line */
export interface ProjectProps extends ParsedUrlQuery {
  title: string
}

export function Project({brand, company, description, title, url}: ProjectProps) {
  return (
    <Layout>
        <article>
          <div className='flex align-middle pt-10'>
            <h1 className='text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200'>{title}</h1>
            <BackButton href='/projects' label='Back to Projects' className='ml-auto' />
          </div>
          <h2 className="text-xl sm:text-xl font-bold text-slate-900 tracking-tight dark:text-slate-200 pt-5">{brand}</h2>
          <hr />
          <h3>{company}</h3>
          {/* <div className='prose prose-lg'>{description}</div> */}
          <hr />
        </article>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params
}: { params: ProjectProps}) => {
  const { data } = await client.query({
    query: gql`
        query($slug: String!) {
            projectCollection(where: { slug: $slug }) {
                items {
                  brand
                  company
                  description {
                    json
                  }
                  slug
                  title
                  url
                }
            }
        }
    `,
    variables: {
      slug: params.slug
    }});
    const items = data.projectCollection.items[0];

  return {
    props: {
      ...items
    }
  }
}


export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({
    query: gql`
        query {
            projectCollection(limit: 10) {
                items {
                    slug
                }
            }
        }
    `});
  const paths = data.projectCollection.items
    .map(item => ({ params: { slug: item.slug }}));

  return {
    paths,
    fallback: false
  }
}

export default Project;
