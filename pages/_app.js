// pages/_app.js
import Head from 'next/head';
import '../styles/globals.css';
import '../styles/works.css';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/icon_transparent.png" />
        <link rel="apple-touch-icon" href="/images/icon_transparent.png" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
