import { readdirSync } from 'fs';
import { GetStaticPaths, GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { join } from 'path';
import {
    getParsedFileContentBySlug,
    renderMarkdown,
} from '@swin-dev-nx/markdown-parser';
import { MDXRemote } from 'next-mdx-remote';
import Link from 'next/link';
import { IProjectProps } from '../../../types/pages/projects/mdx/[slug].types';

const mdxElements = {
    a: dynamic(
        async () =>
            await import(
                '@swin-dev-nx/shared/mdx-elements/custom-link/custom-link'
            )
    ),
    Youtube: dynamic(
        async () =>
            await import('@swin-dev-nx/shared/mdx-elements/youtube/youtube')
    ),
};

export function Project({ frontMatter, html }: IProjectProps) {
    return (
        <div className="m-6">
            <Link href="/projects">Back to Projects</Link>
            <article className="prose prose-lg">
                <h1>{frontMatter.title}</h1>
                <hr />
                <MDXRemote {...html} components={mdxElements} />
            </article>
        </div>
    );
}

const PROJECTS_PATH = join(
    process.cwd(),
    process.env.PROJECTS_MD_PATH || '_projects'
);

export const getStaticProps: GetStaticProps = async ({
    params,
}: {
    params: IProjectProps;
}) => {
    const project = getParsedFileContentBySlug(params.slug, PROJECTS_PATH);
    const renderHtml = await renderMarkdown(project.content);

    return {
        props: {
            frontMatter: project.frontMatter,
            html: renderHtml,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = readdirSync(PROJECTS_PATH)
        .map(path => path.replace(/\.mdx?$/, ''))
        .map(slug => ({ params: { slug } }));

    return {
        paths,
        fallback: false,
    };
};

export default Project;
