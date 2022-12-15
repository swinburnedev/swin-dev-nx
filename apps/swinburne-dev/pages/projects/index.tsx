import { GetStaticProps } from 'next';
import { gql } from '@apollo/client';
import { ProjectCard } from 'libs/shared/ui/src/lib/project-card';
import client from '../../apollo/client';
import { Layout } from '../../components/layout';
import { IProjectsProps } from './index.types';

export function Projects({ projects, title }: IProjectsProps) {
    return (
        <Layout title={title}>
            <>
                <div className="grid-cols-1">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200 pt-10">
                        {title}
                    </h1>
                </div>
                <div className="grid-cols-1 max-w-4xl">
                    <p className="py-4">
                        Some key projects that I have been lucky enough to work
                        on.
                    </p>
                </div>
                <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-4 py-8">
                    {projects &&
                        projects.map(project => {
                            const {
                                title,
                                slug,
                                brand,
                                thumbnail: { description = '', url = '' },
                            } = project;
                            return (
                                <ProjectCard
                                    key={slug}
                                    title={title}
                                    excerpt={brand}
                                    url={`projects/${slug}`}
                                    imageAlt={description}
                                    imageUrl={url}
                                />
                            );
                        })}
                </div>
            </>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const query = gql`
        query ($preview: Boolean!) {
            projectCollection(limit: 10, preview: $preview) {
                items {
                    title
                    brand
                    slug
                    thumbnail {
                        url
                        description
                    }
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

    return {
        props: {
            projects: data.projectCollection.items,
            title: 'Projects',
        },
    };
};

export default Projects;
