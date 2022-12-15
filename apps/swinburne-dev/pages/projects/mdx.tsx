import { GetStaticProps } from 'next';
import { join } from 'path';
import { gql } from '@apollo/client';
import { ProjectCard } from 'libs/shared/ui/src/lib/project-card';
import { getFilenames } from '@swin-dev-nx/markdown-parser';
import client from '../../apollo/client';
import { Layout } from '../../components/layout';
import { IProjectsProps } from '../../types/pages/projects/mdx/mdx.types';

export function Projects({ projects, title }: IProjectsProps) {
    return (
        <Layout title={title}>
            <div className="grid">
                <div className="grid-cols-1">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200 pt-10">
                        Projects
                    </h1>
                </div>
                <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4">
                    <div className="max-w-4xl">
                        <p className="py-4">
                            Some key projects that I have been lucky enough to
                            work on.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-1 gap-2 py-8">
                            {projects &&
                                projects.map(project => {
                                    const { title, slug, brand } = project;
                                    return (
                                        <ProjectCard
                                            key={slug}
                                            title={title}
                                            excerpt={brand}
                                            url={`projects/${slug}`}
                                            imageAlt=""
                                            imageUrl=""
                                        />
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const PROJECTS_PATH = join(
        process.cwd(),
        process.env.PROJECTS_MD_PATH || '_projects'
    );
    const { data } = await client.query({
        query: gql`
            query {
                projectCollection(limit: 10) {
                    items {
                        title
                        brand
                        description {
                            json
                        }
                        slug
                    }
                }
            }
        `,
    });

    return {
        props: {
            mdxProjects: getFilenames(PROJECTS_PATH),
            projects: data.projectCollection.items,
            title: 'Projects',
        },
    };
};

export default Projects;
