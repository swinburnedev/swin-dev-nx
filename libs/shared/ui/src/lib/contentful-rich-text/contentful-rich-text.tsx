import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';

export interface ContentfulRichTextProps {
  document: Document
}

export function ContentfulRichText({document}: ContentfulRichTextProps) {
  const html = documentToReactComponents(document);
  console.log('documentToHtmlString:', html);
  return html;
  // return (
  //   <div dangerouslySetInnerHTML={{ __html: html }}></div>
  // );
}

export default ContentfulRichText;
