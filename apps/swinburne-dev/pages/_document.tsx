/* eslint-disable react/display-name */
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { GA_TRACKING_ID } from '@swin-dev-nx/gtag';

export default class CustomDocument extends Document<{
  featureFlags: Record<string, any>;
}> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps & { featureFlags: Record<string, any> }> {
    const originalRenderPage = ctx.renderPage;
    const sheet = new ServerStyleSheet();

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        enhanceComponent: (Component) => Component,
      });

    // Fetch feature flags securely server-side
    let featureFlags: Record<string, any> = {};
    try {
      const protocol = ctx.req?.headers['x-forwarded-proto'] || 'https';
      const host = ctx.req?.headers['host'] || 'swinburne.dev';
      const baseUrl = `${protocol}://${host}`;
      const res = await fetch(`${baseUrl}/api/feature-flags`, {
        headers: { cookie: ctx.req?.headers.cookie || '' },
      });
      featureFlags = await res.json();
    } catch (e) {
      console.error('Failed to fetch flags in _document', e);
    }

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      featureFlags,
      styles: (
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>
      ),
    };
  }

  render() {
    const { featureFlags } = this.props;
    return (
      <Html>
        <Head>
          {process.env.NODE_ENV !== 'development' && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_TRACKING_ID}');
                    window.__FLAGS__ = ${JSON.stringify(featureFlags || {})};
                  `,
                }}
              />
            </>
          )}
          {this.props.styles}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
