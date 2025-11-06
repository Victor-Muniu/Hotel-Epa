import Head from 'next/head';
import Link from 'next/link';
import { getAttractions } from '../lib/attractionsData';
import { useMemo, useState } from 'react';

export default function Attractions() {
  const all = getAttractions();
  const [selectedBadges, setSelectedBadges] = useState<Record<string, boolean>>({});
  const [rating4Up, setRating4Up] = useState(false);
  const [query, setQuery] = useState('');

  const badges = useMemo(() => {
    const set = new Set<string>();
    for (const a of all) {
      if (Array.isArray(a.badges)) a.badges.forEach(b => set.add(b));
    }
    return Array.from(set).sort();
  }, [all]);

  function toggleBadge(b: string) {
    setSelectedBadges(prev => ({ ...prev, [b]: !prev[b] }));
  }

  const filtered = useMemo(() => {
    return all.filter(a => {
      // search
      if (query && !(`${a.title} ${a.description}`.toLowerCase().includes(query.toLowerCase()))) return false;
      // rating
      if (rating4Up && a.rating < 4) return false;
      // badges
      const activeBadges = Object.keys(selectedBadges).filter(k => selectedBadges[k]);
      if (activeBadges.length > 0) {
        const has = activeBadges.every(b => Array.isArray(a.badges) && a.badges.some(x => x.toLowerCase() === b.toLowerCase()));
        if (!has) return false;
      }
      return true;
    });
  }, [all, selectedBadges, rating4Up, query]);

  const total = filtered.length;

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
                <div className="filter-head"><strong>Search</strong></div>
                <div style={{ marginTop: 8 }}>
                  <input className="form-input" placeholder="Search attractions" value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>
              </div>

              <div className="filter-group">
                <div className="filter-head"><strong>Filters (by features)</strong></div>
                <div style={{ marginTop: 8 }}>
                  {badges.length === 0 && <div className="muted">No features available</div>}
                  {badges.map(b => (
                    <div key={b} style={{ marginBottom: 6 }}>
                      <label className="checkbox"><input type="checkbox" checked={!!selectedBadges[b]} onChange={() => toggleBadge(b)} /> {b}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <div className="filter-head"><strong>Traveler rating</strong></div>
                <div style={{ marginTop: 8 }}>
                  <label className="checkbox"><input type="checkbox" checked={rating4Up} onChange={() => setRating4Up(!rating4Up)} /> 4 & up</label>
                </div>
              </div>

              <div className="filter-group">
                <div className="filter-head"><strong>Good for</strong></div>
                <div style={{ marginTop: 8 }}>
                  <label className="checkbox"><input type="checkbox" checked={!!selectedBadges['Good for Kids']} onChange={() => toggleBadge('Good for Kids')} /> Good for Kids</label>
                  <label className="checkbox" style={{ display: 'block', marginTop: 6 }}><input type="checkbox" checked={!!selectedBadges['Free Entry']} onChange={() => toggleBadge('Free Entry')} /> Free Entry</label>
                </div>
              </div>
            </aside>

            <section>
              <p className="attr-results-eyebrow">{total} results</p>
              <div className="attr-results">
                {filtered.map((item, idx) => (
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
                      {item.badges && item.badges.length > 0 && (
                        <ul className="detail-badges">
                          {item.badges.map(b => <li key={b}>{b}</li>)}
                        </ul>
                      )}
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
