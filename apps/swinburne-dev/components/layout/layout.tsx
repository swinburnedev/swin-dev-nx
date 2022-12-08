import { Navbar, Footer } from '@swin-dev-nx/shared/ui';
import Head from 'next/head';

type Props = {
  children: JSX.Element,
  title: string,
};

export const Layout: React.FC<Props> = ({
  children,
  title,
}) => (
    <>
      <Head>
        <title>{`${title} | Swinburne Dev`}</title>
      </Head>
      <Navbar />
        <main className="container mx-auto">
          {children}
        </main>
      <Footer />
    </>
);
