import { ReactElement } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';

export interface IContentfulRichTextProps {
    document: Document | undefined
}

export const ContentfulRichText = ({document}: IContentfulRichTextProps): ReactElement | null => {
    if (!document) return null
    return <div className="rich-text">{documentToReactComponents(document)}</div>
}
