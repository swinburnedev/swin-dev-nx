import { Navbar, Footer } from '@swin-dev-nx/shared/ui';
import Head from 'next/head';
import { IProps } from './layout.types';

export const Layout: React.FC<IProps> = ({ children, title }) => (
    <>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>{`${title} | Swinburne Dev`}</title>
        </Head>
        <Navbar />
        <main className="container mx-auto">{children}</main>
        <Footer />
    </>
);
