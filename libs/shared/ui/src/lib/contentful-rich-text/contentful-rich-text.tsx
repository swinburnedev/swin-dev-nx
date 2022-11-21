import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';

export interface ContentfulRichTextProps {
  document: Document
}

export function ContentfulRichText({document}: ContentfulRichTextProps) {
  return documentToReactComponents(document);
}

export default ContentfulRichText;
