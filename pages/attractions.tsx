import Head from 'next/head';
import Link from 'next/link';
import { getAttractions } from '../lib/attractionsData';

export default function Attractions() {
  const data = getAttractions();
  const total = data.length;


  return (
    <>
      <Head>
        <title>Attractions near Epashikino Resort & Spa</title>
        <meta name="description" content="Discover attractions near Epashikino Resort & Spa: Lake Elementaita, Sleeping Warrior, Lake Nakuru, Soysambu Game Sanctuary, and more." />
      </Head>

      <main className="attr-page">
        <div className="attr-container">
          <header className="attr-header" aria-label="Page header">
            <h1 className="attr-title">Attractions near Epashikino Resort & Spa</h1>
            <div className="attr-controls">
              <button className="ctrl-pill">Sort</button>
              <button className="ctrl-pill ctrl-ghost">Map</button>
            </div>
          </header>

          <div className="attr-body">
            <aside className="attr-filters" aria-label="Filters">
              <div className="filter-group">
                <div className="filter-head"><strong>Category types</strong></div>
                <ul className="checklist">
                  <li><label className="checkbox"><input type="checkbox"/> Attractions</label></li>
                  <li><label className="checkbox"><input type="checkbox"/> Tours</label></li>
                  <li><label className="checkbox"><input type="checkbox"/> Day Trips</label></li>
                  <li><label className="checkbox"><input type="checkbox"/> Transportation</label></li>
                </ul>
              </div>
              <div className="filter-group">
                <div className="filter-head"><strong>Types of Attractions</strong></div>
                <ul className="checklist">
                  <li><label className="checkbox"><input type="checkbox"/> Nature & Parks</label></li>
                  <li><label className="checkbox"><input type="checkbox"/> Hot Springs & Geysers</label></li>
                  <li><label className="checkbox"><input type="checkbox"/> Wildlife Areas</label></li>
                </ul>
              </div>
              <div className="filter-group">
                <div className="filter-head"><strong>Traveler rating</strong></div>
                <ul className="checklist">
                  <li><label className="checkbox"><input type="checkbox"/> 4 & up</label></li>
                </ul>
              </div>
              <div className="filter-group">
                <div className="filter-head"><strong>Good for</strong></div>
                <ul className="checklist">
                  <li><label className="checkbox"><input type="checkbox"/> Good for Kids</label></li>
                  <li><label className="checkbox"><input type="checkbox"/> Free Entry</label></li>
                </ul>
              </div>
            </aside>

            <section>
              <p className="attr-results-eyebrow">{total} results sorted by traveler favorites</p>
              <div className="attr-results">
                {data.map((item, idx) => (
                  <article key={item.slug} className={`result-card no-cta${item.images.length === 0 ? ' no-thumb' : ''}`} aria-label={item.title}>
                    {item.images.length > 0 && (
                      <div className="result-media-wrap">
                        <Link href={`/attractions/${item.slug}`} className="result-media" aria-label={`${item.title} photo`}>
                          <img src={item.images[0]} alt={item.title} />
                        </Link>
                      </div>
                    )}
                    <div className="result-main">
                      <div className="result-head">
                        <h3 className="result-title"><Link href={`/attractions/${item.slug}`}>{idx + 1}. {item.title}</Link></h3>
                      </div>
                      <p className="lead result-summary">{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
