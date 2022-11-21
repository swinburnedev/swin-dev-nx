import { Navbar, Footer } from '@swin-dev-nx/shared/ui';

type Props = {
  children: JSX.Element,
};

export const Layout: React.FC<Props> = ({
  children,
}) => (
    <>
      <Navbar />
        <main className="container mx-auto">
          {children}
        </main>
      <Footer />
    </>
);
