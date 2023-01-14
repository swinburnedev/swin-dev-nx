import { ParsedUrlQuery } from 'querystring';
import { IChip } from '@swin-dev-nx/shared/ui';
import { Document } from '@contentful/rich-text-types';
import { IImage } from '../../content/image.types';

interface ITagsCollection {
    items: Array<IChip>;
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
