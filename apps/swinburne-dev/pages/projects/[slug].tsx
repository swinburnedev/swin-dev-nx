import { GetStaticPaths, GetStaticProps } from 'next';
import { gql } from '@apollo/client';
import { ParsedUrlQuery } from 'querystring';
import client from '../../apollo/client';
import { Layout } from '../../components/layout';
import {
  BackButton,
  Chips,
  IChip,
  ContentfulRichText,
  MobilePreview,
} from '@swin-dev-nx/shared/ui';
import { Document } from '@contentful/rich-text-types';

interface TagsCollection {
  items: Array<IChip>
}

interface IImage {
  description: string,
  url: string,
}

interface IParams extends ParsedUrlQuery {
  slug: string
}

export interface IProjectProps {
  brand: string,
  company: string,
  description?: {
    json: Document
  },
  screenshotMobile: IImage,
  title: string,
  tagsCollection: TagsCollection,
  url?: string,
}

export function Project({brand, company, description, screenshotMobile, title, tagsCollection}: IProjectProps) {
  return (
    <Layout>
        <article>
          <div className='flex align-middle pt-10'>
            <h1 className='text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight'>{title}</h1>
            <BackButton href='/projects' label='Back to Projects' className='ml-auto' />
          </div>
          <div className='md:flex py-10'>
            <div className='grow'>
              <h2 className="text-xl sm:text-xl font-bold text-slate-900">{brand}</h2>
              {company && <span className="text-sm text-slate-600">{company}</span>}
            </div>
            <Chips chips={tagsCollection.items} />
          </div>
          <hr className="pb-10"/>
          <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-[7fr_5fr] gap-4">
            <ContentfulRichText document={description?.json} />
            <div className="px-3">
              { screenshotMobile &&
                <MobilePreview 
                    alt={screenshotMobile.description}
                    url={screenshotMobile.url}
                  />
              }
            </div>
          </div>
        </article>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;
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
                  screenshotMobile {
                    description
                    url
                  }
                  slug
                  title
                  tagsCollection(limit: 5) {
                    items {
                      id
                      name
                      icon {
                        description
                        url
                      }
                    }
                  }
                  url
                }
            }
        }
    `,
    variables: {
      slug: slug
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
