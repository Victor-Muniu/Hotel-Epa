import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';
import Layout from '../components/Layout';

export default function RootApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Epashikino Resort &amp; Spa</title>
        <link rel="icon" href="https://cdn.builder.io/api/v1/image/assets%2F0d40b83ce86943258ffc5ae08b027f61%2F8984cd6c6da84e4680b3bfa7588de42d?format=webp&width=64" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
