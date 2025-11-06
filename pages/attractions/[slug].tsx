import Head from 'next/head';
import Link from 'next/link';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { attractions, getAttractionBySlug, type Attraction } from '../../lib/attractionsData';

export default function AttractionDetail({ item }: { item: Attraction }) {
  return (
    <>
      <Head>
        <title>{item.title} – Attractions near Epashikino Resort & Spa</title>
        <meta name="description" content={`Details and photos for ${item.title} near Epashikino Resort & Spa.`} />
      </Head>
      <main className="attr-page">
        <div className="attr-container">
          <header className="attr-header">
            <h1 className="attr-title">{item.title}</h1>
            <div className="attr-controls detail-actions">
              <Link href="/attractions" className="ctrl-pill ctrl-back">Back</Link>
            </div>
          </header>

          <div className="detail-body">
            <section className="detail-main">
              {item.images.length > 0 && (
                <div className="detail-gallery" aria-label="Gallery">
                  {item.images.slice(0,4).map((src, i) => (
                    <figure key={src} className={i === 0 ? 'detail-hero' : 'detail-thumb'}>
                      <img src={src} alt={`${item.title}`} />
                    </figure>
                  ))}
                </div>
              )}

              <article className="detail-article">
                <h2 className="detail-section-title">About</h2>
                <p className="lead">{item.description}</p>
              </article>
            </section>

            <aside className="detail-aside" aria-label="Tours & experiences">
              <div className="aside-card">
                <h3 className="aside-title">Tours & experiences</h3>
                <p className="muted">Explore different ways to experience this place.</p>
                <button className="btn-tours">See options</button>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: attractions.map(a => ({ params: { slug: a.slug } })),
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = String(ctx.params?.slug || '');
  const item = getAttractionBySlug(slug);
  if (!item) {
    return { notFound: true };
  }
  return { props: { item } };
};
