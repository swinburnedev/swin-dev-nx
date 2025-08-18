import { GetStaticProps } from 'next';
import Link from 'next/link';
import { ContentfulRichText, ImageCaption } from '@swin-dev-nx/shared/ui';
import { gql } from '@apollo/client';
import client from '../apollo/client';
import { Layout } from '../components/layout';
import { IPageProps } from '../types/index.types';

export function Index({
  contentLeft,
  contentRight,
  heroImage,
  intro,
  outro,
}: IPageProps) {
  const flags =
    (typeof window !== 'undefined' && (window as any).__FLAGS__) || {};
  return (
    <Layout title="Home">
      <div className="grid">
        <div className="grid-cols-1">
          <ContentfulRichText document={intro?.json} />
        </div>
        <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4">
          <div className="max-w-4xl">
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
              <ContentfulRichText document={contentLeft?.json} />
              <ContentfulRichText document={contentRight?.json} />
            </div>
            <div className="py-4">
              <ContentfulRichText document={outro?.json} />
              {flags.showCV ? (
                <Link href="/pdf/CV_Swinburne_Andy_website.pdf">View CV</Link>
              ) : null}
            </div>
          </div>
          <div className="max-w-4xl">
            <ImageCaption
              alt={heroImage.title}
              caption={heroImage.description}
              loading="lazy"
              priority="high"
              url={heroImage.url}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const query = gql`
    query ($preview: Boolean!) {
      pageCollection(where: { slug: "/" }, preview: $preview) {
        items {
          contentLeft {
            json
          }
          contentRight {
            json
          }
          heroImage {
            description
            title
            url
          }
          intro {
            json
          }
          outro {
            json
          }
          slug
          title
        }
      }
    }
  `;
  const contentfulPreview = Boolean(process.env.CONTENTFUL_PREVIEW);
  const { data } = await client.query({
    query: query,
    variables: {
      preview: contentfulPreview,
    },
  });
  const page = data.pageCollection.items[0];

  return {
    props: {
      ...page,
    },
  };
};

export default Index;
