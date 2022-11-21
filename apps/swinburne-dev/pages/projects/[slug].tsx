import { GetStaticPaths, GetStaticProps } from 'next';
import { gql } from '@apollo/client';
import { ParsedUrlQuery } from 'querystring';
import client from '../../apollo/client';
import { Layout } from '../../components/layout';
import { BackButton, Chips, IChip, ContentfulRichText } from '@swin-dev-nx/shared/ui';

interface TagsCollection {
  items: Array<IChip>
}

interface Image {
  description: string,
  url: string,
}

export interface ProjectProps extends ParsedUrlQuery {
  brand: string,
  company: string,
  description?: {
    json: any
  },
  screenshotDesktop: Image,
  title: string,
  tagsCollection: TagsCollection,
  url: string,
}

export function Project({brand, company, description, screenshotDesktop, title, tagsCollection, url}: ProjectProps) {
  return (
    <Layout>
        <article>
          <div className='flex align-middle pt-10'>
            <h1 className='text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight'>{title}</h1>
            <BackButton href='/projects' label='Back to Projects' className='ml-auto' />
          </div>
          <div className='flex py-10'>
            <div className='grow'>
              <h2 className=" text-xl sm:text-xl font-bold text-slate-900 tracking-tight">{brand}</h2>
              {company && <span className="text-sm text-slate-600">{company}</span>}
            </div>
            <Chips chips={tagsCollection.items} />
          </div>
          <hr className="pb-10"/>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-8">
              <ContentfulRichText document={description?.json} />
            </div>
            <div className="mb-4">
              { screenshotDesktop &&
                <img
                  src={screenshotDesktop.url}
                  className="max-w-full h-auto rounded-lg"
                  alt={screenshotDesktop.description}
                />
              }
            </div>
          </div>
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
                  screenshotDesktop {
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
