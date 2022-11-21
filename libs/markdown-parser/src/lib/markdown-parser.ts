import { readFileSync, readdirSync } from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import { serialize } from 'next-mdx-remote/serialize';

export const getFilenames = (directoryPath: string) => {
  return readdirSync(directoryPath).map((fileName: string) => fileName.replace('.mdx', ''));
}
export const getParsedFileContentBySlug = (filename: string, path: string) => {
  const filePath =  join(path, `${filename}.mdx`);
  const fileContent = readFileSync(filePath);
  const { data, content } = matter(fileContent);
  return {
    frontMatter: data,
    content
  }
}

export const renderMarkdown = (content: string) => {
  return serialize(content || '');
}
