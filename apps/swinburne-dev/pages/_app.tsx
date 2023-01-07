import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="preload" as="image" href="/images/swin-dev-square-128.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="static/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="static/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="static/favicon-16x16.png" />
        <link rel="manifest" href="static/site.webmanifest" />
      </Head>
      <main className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
