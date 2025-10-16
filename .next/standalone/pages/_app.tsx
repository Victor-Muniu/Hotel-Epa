import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Layout from '../components/Layout';

export default function RootApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
