import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to swinburne-dev!</title>
      </Head>
      <main className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
