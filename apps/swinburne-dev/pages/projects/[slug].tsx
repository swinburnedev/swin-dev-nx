import { GetStaticPaths, GetStaticProps } from 'next';
import { gql } from '@apollo/client';

import client from '../../apollo/client';
import { Layout } from '../../components/layout';
import {
    BackButton,
    Chips,
    ContentfulRichText,
    MobilePreview,
} from '@swin-dev-nx/shared/ui';
import {
    IParams,
    IProjectProps,
} from '../../types/pages/projects/[slug].types';

export function Project({
    brand,
    company,
    description,
    screenshotMobile,
    title,
    tagsCollection,
}: IProjectProps) {
    return (
        <Layout title={title}>
            <article>
                <div className="md:flex align-middle pt-10">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
                        {title}
                    </h1>
                    <BackButton
                        href="/projects"
                        label="Back to Projects"
                        className="hidden md:flex ml-auto mt-4 md:mt-0"
                    />
                </div>
                <div className="md:flex py-10">
                    <div className="grow">
                        <h2 className="text-xl sm:text-xl font-bold text-slate-900">
                            {brand}
                        </h2>
                        {company && (
                            <span className="text-sm text-slate-600">
                                {company}
                            </span>
                        )}
                    </div>
                    <Chips chips={tagsCollection.items} />
                </div>
                <hr className="pb-10" />
                <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-[7fr_5fr] gap-4">
                    <ContentfulRichText document={description?.json} />
                    <div className="px-3 mb-4">
                        {screenshotMobile && (
                            <MobilePreview
                                alt={screenshotMobile.description}
                                url={screenshotMobile.url}
                            />
                        )}
                    </div>
                </div>
                <BackButton
                    href="/projects"
                    label="Back to Projects"
                    className="flex md:hidden my-4"
                />
            </article>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async context => {
    const { slug } = context.params as IParams;
    const query = gql`
        query ($preview: Boolean!, $slug: String!) {
            projectCollection(where: { slug: $slug }, preview: $preview) {
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
    `;
    const contentfulPreview = Boolean(process.env.CONTENTFUL_PREVIEW);
    const { data } = await client.query({
        query: query,
        variables: {
            slug: slug,
            preview: contentfulPreview,
        },
    });
    const items = data.projectCollection.items[0];

    return {
        props: {
            ...items,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const query = gql`
        query ($preview: Boolean!) {
            projectCollection(limit: 10, preview: $preview) {
                items {
                    slug
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
    const paths = data.projectCollection.items.map(item => ({
        params: { slug: item.slug },
    }));

    return {
        paths,
        fallback: false,
    };
};

export default Project;
