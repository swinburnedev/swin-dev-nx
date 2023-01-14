import { IImage } from './content/image.types';
import { Document } from '@contentful/rich-text-types';

export interface IHomepageProps {
    contentLeft?: {
        json: Document;
    };
    contentRight?: {
        json: Document;
    };
    intro?: {
        json: Document;
    };
    outro?: {
        json: Document;
    };
    heroImage: IImage;
    slug: string;
    title: string;
}
