import { readFileSync } from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

export const getParsedFileContentBySlug = (filename: string, path: string) => {
  const filePath =  join(path, `${filename}.md`);
  const fileContent = readFileSync(filePath);
  const { data, content } = matter(fileContent);
  return {
    frontMatter: data,
    content
  }
}

export const renderMarkdown = () => {
  return null;
}
