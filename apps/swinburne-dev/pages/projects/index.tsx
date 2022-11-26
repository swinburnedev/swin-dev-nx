import { GetStaticProps } from 'next';
import { gql } from '@apollo/client';
import { ProjectCard } from 'libs/shared/ui/src/lib/project-card';
import client from '../../apollo/client';
import { Layout } from '../../components/layout';

export interface ProjectsProps {
    projects: any;
}

export function Projects({ projects }: ProjectsProps) {
    return (
        <Layout>
            <>
              <div className="grid-cols-1">
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200 pt-10">
                      Projects
                  </h1>
              </div>
              <div className="grid-cols-1 max-w-4xl">
                  <p className="py-4">
                      Some key projects that I have been lucky enough to
                      work on.
                  </p>
              </div>
              <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-4 py-8">
                  {projects &&
                      projects.map(project => {
                          const { title, slug, brand, thumbnail: { description = '', url = ''} } = project;
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
                        thumbnail {
                          url
                          description
                        }
                    }
                }
            }
        `,
    });

    return {
        props: {
            projects: data.projectCollection.items,
        },
    };
};

export default Projects;
