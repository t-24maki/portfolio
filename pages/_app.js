// pages/_app.js
import Head from 'next/head';
import '../styles/globals.css';
import '../styles/works.css';
import 'katex/dist/katex.min.css';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || (page => <Layout>{page}</Layout>);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/icon_transparent.png" />
        <link rel="apple-touch-icon" href="/images/icon_transparent.png" />
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}

export default MyApp;
