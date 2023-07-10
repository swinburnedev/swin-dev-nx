import {
  Tree,
  formatFiles,
  generateFiles,
  joinPathFragments,
  names,
} from '@nx/devkit';

interface ProjectSchemaOptions {
  title: string;
  excerpt?: string;
}
export default async function (tree: Tree, schema: ProjectSchemaOptions) {
  generateFiles(tree, joinPathFragments(__dirname, './files'), './_projects', {
    title: schema.title,
    excerpt: schema.excerpt || '',
    normalizedTitle: names(schema.title).fileName,
    creationDate: new Date().toISOString(),
  });
  await formatFiles(tree);
}
