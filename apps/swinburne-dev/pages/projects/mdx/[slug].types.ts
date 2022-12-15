import { ParsedUrlQuery } from 'querystring';

export interface IProjectProps extends ParsedUrlQuery {
    frontMatter: any;
    html: any;
    slug: string;
}
