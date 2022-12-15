import { ParsedUrlQuery } from 'querystring';
import { IChip } from '@swin-dev-nx/shared/ui';
import { Document } from '@contentful/rich-text-types';

interface ITagsCollection {
    items: Array<IChip>;
}

interface IImage {
    description: string;
    url: string;
}

export interface IParams extends ParsedUrlQuery {
    slug: string;
}

export interface IProjectProps {
    brand: string;
    company: string;
    description?: {
        json: Document;
    };
    screenshotMobile: IImage;
    title: string;
    tagsCollection: ITagsCollection;
    url?: string;
}
