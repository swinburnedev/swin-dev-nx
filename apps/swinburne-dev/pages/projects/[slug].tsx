import { readdirSync } from 'fs';
import { GetStaticPaths, GetStaticProps } from 'next';
import { join } from 'path';
import { ParsedUrlQuery } from 'querystring';
import { getParsedFileContentBySlug, renderMarkdown } from '@swin-dev-nx/markdown-parser';
import { MDXRemote } from 'next-mdx-remote';
import { Youtube } from '@swin-dev-nx/shared/mdx-elements';

/* eslint-disable-next-line */
export interface ProjectProps extends ParsedUrlQuery {
  frontMatter: any,
  html: any
}

const mdxElements = {
  Youtube
}

export function Project({frontMatter, html}: ProjectProps) {
  return (
    <div className='m-6'>
      <article className='prose prose-lg'>
        <h1>{frontMatter.title}</h1>
        <hr />
        <MDXRemote {...html} components={mdxElements} />
      </article>
    </div>
  );
}

const PROJECTS_PATH = join(process.cwd(), '_projects');

export const getStaticProps: GetStaticProps<ProjectProps> = async ({
  params
}: { params: ProjectProps}) => {
  const project = getParsedFileContentBySlug(params.slug, PROJECTS_PATH);
  const renderHtml = await renderMarkdown(project.content);

  return {
    props: {
      frontMatter: project.frontMatter,
      html: renderHtml
    }
  }
}


export const getStaticPaths: GetStaticPaths<ProjectProps> = async () => {

  const paths = readdirSync(PROJECTS_PATH)
    .map(path => path.replace(/\.mdx?$/, ''))
    .map(slug => ({ params: { slug }}));

  return {
    paths,
    fallback: false
  }
}

export default Project;
