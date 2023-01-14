import { ReactElement } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';

export interface IContentfulRichTextProps {
    document: Document;
}

export const ContentfulRichText = ({
    document,
}: IContentfulRichTextProps): ReactElement => {
    return (
        <div className="rich-text">{documentToReactComponents(document)}</div>
    );
};
