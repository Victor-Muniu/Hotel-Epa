import Head from 'next/head';
import { useState } from 'react';

export default function ConferenceAndMeetings() {
  const [minPrice, setMinPrice] = useState(1500); // KSh
  const [maxPrice, setMaxPrice] = useState(6500); // KSh
  return (
    <>
      <Head>
        <title>Conferences & Meetings | Epashikino</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Book conference halls, executive boardroom and team building at Epashikino. Full day, half day, snacks, meals, Wi‑Fi, projector and sound system. Boardroom supports tele‑conference." />
      </Head>
      <main className="homes-page coffee-theme" aria-label="Homes search results">
        <div className="homes-container">
          <header className="homes-searchbar" role="search">
            <nav className="seg-tabs" aria-label="Category">
              <button className="seg-btn" aria-pressed={false}>
                <span className="seg-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 10l9-6 9 6v8H3z" fill="none" stroke="currentColor" strokeWidth="1.6"/></svg></span>
                Boardroom
              </button>
              <button className="seg-btn active" aria-pressed>
                <span className="seg-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 7h18v10H3z" fill="none" stroke="currentColor" strokeWidth="1.6"/></svg></span>
                Conference Halls
              </button>
            </nav>

            <div className="pill-search">
              <label className="pill-input">
                <span className="pill-label">Venue</span>
                <input className="pill-field" defaultValue="Epashikino, Elementaita" aria-label="Venue" />
              </label>
              <label className="pill-input">
                <span className="pill-label">Check-in</span>
                <input className="pill-field" type="date" defaultValue="" aria-label="Check-in" />
              </label>
              <label className="pill-input">
                <span className="pill-label">Check-out</span>
                <input className="pill-field" type="date" defaultValue="" aria-label="Check-out" />
              </label>
              <label className="pill-input">
                <span className="pill-label">Attendees</span>
                <select className="pill-field" aria-label="Attendees" defaultValue="50 Guests">
                  <option>10 Guests</option>
                  <option>25 Guests</option>
                  <option>50 Guests</option>
                  <option>100 Guests</option>
                  <option>150 Guests</option>
                </select>
              </label>
              <button className="btn primary-purple" type="button">Check Availability</button>
            </div>
          </header>

          <p className="results-eyebrow">Conference packages and meeting halls at <strong>Epashikino Resort & Spa</strong></p>

          <div className="chip-toolbar">
            <div className="chip-row">
              <button className="chip active"><span className="chip-ico" aria-hidden="true">📅</span> Full Day</button>
              <button className="chip"><span className="chip-ico" aria-hidden="true">⏱️</span> Half Day</button>
              <button className="chip"><span className="chip-ico" aria-hidden="true">🤝</span> Team Building</button>
              <button className="chip"><span className="chip-ico" aria-hidden="true">🏢</span> Boardroom</button>
              <button className="chip"><span className="chip-ico" aria-hidden="true">🎥</span> Projector & Sound</button>
              <button className="chip"><span className="chip-ico" aria-hidden="true">📶</span> High‑Speed Wi‑Fi</button>
            </div>
          </div>

          <section className="homes-body">
            <div className="grid-cards">
              {CARD_DATA.map((c) => (
                <article key={c.id} className="home-card">
                  <div className="media">
                    <img src={c.img} alt={c.title} />
                    <button className="fav" aria-label="Save"><svg viewBox="0 0 24 24"><path d="M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.54 0 3.04.99 3.57 2.36h.86C11.46 4.99 12.96 4 14.5 4 17 4 19 6 19 8.5c0 3.78-3.4 6.86-8.55 11.18L12 21z" fill="currentColor"/></svg></button>
                  </div>
                  <div className="info">
                    <h3 className="title">{c.title}</h3>
                    <p className="addr">Epashikino Resort & Spa, Elementaita</p>
                    <div className="meta">
                      <span className="iconline"><svg viewBox="0 0 24 24"><path d="M4 10h16v10H4zM8 7h8" fill="none" stroke="currentColor" strokeWidth="1.4"/></svg>{c.metaLeft}</span>
                      <span className="iconline"><svg viewBox="0 0 24 24"><path d="M6 12h12" fill="none" stroke="currentColor" strokeWidth="1.4"/></svg>{c.metaRight}</span>
                    </div>
                    <div className="price">
                      <strong>KSh {c.price.toLocaleString()}</strong>
                      <span>/person</span>
                      <a className="fee" href="#">Snacks, meals, Wi‑Fi included</a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="filters" aria-label="Filters">
              <div className="filters-head">
                <strong>Filters</strong>
                <button className="link-clear" type="button">Clear all filter (3)</button>
              </div>

              <div className="filter-block">
                <div className="filter-title">Budget (per person)</div>
                <p className="muted">Typical range for conference packages at Epashikino</p>
                <div className="row-2">
                  <label className="field"><span>Minimum</span><input className="input" type="number" value={minPrice} onChange={(e)=>setMinPrice(Number(e.target.value)||0)} /></label>
                  <label className="field"><span>Maximum</span><input className="input" type="number" value={maxPrice} onChange={(e)=>setMaxPrice(Number(e.target.value)||0)} /></label>
                </div>
              </div>

              <div className="filter-block">
                <div className="filter-title">Package type</div>
                <div className="stack">
                  <label className="checkbox"><input type="checkbox" defaultChecked /> Full Day</label>
                  <label className="checkbox"><input type="checkbox" /> Half Day</label>
                  <label className="checkbox"><input type="checkbox" /> Team Building</label>
                </div>
              </div>

              <div className="filter-block">
                <div className="filter-title">Amenities</div>
                <div className="grid-rows">
                  <div>
                    <div className="sub">Connectivity</div>
                    <div className="counter-row">
                      {['High‑Speed Wi‑Fi','Projector','Sound System','Tele‑conference'].map((x)=> <button key={'a'+x} className={`counter ${x==='High‑Speed Wi‑Fi'?'active':''}`} type="button">{x}</button>)}
                    </div>
                  </div>
                  <div>
                    <div className="sub">Catering</div>
                    <div className="counter-row">
                      {['Snacks','Meals','Snacks & Meals'].map((x)=> <button key={'c'+x} className={`counter ${x==='Snacks & Meals'?'active':''}`} type="button">{x}</button>)}
                    </div>
                  </div>
                  <div>
                    <div className="sub">Capacity</div>
                    <div className="counter-row">
                      {['Up to 20','Up to 50','Up to 100','100+'].map((x)=> <button key={'cap'+x} className={`counter ${x==='Up to 50'?'active':''}`} type="button">{x}</button>)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="filter-block">
                <div className="filter-title">Room style</div>
                <div className="seg-grid">
                  <button className="seg-card active" type="button">
                    <span className="seg-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 10l9-6 9 6v8H3z" fill="none" stroke="currentColor" strokeWidth="1.6"/></svg></span>
                    <span>U‑Shape</span>
                  </button>
                  <button className="seg-card" type="button">
                    <span className="seg-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="1.6"/></svg></span>
                    <span>Classroom</span>
                  </button>
                </div>
              </div>
            </aside>
          </section>
        </div>
      </main>
    </>
  );
}

const CARD_DATA = [
  { id: 'pkg1', title: 'Full Day Conference – Elementaita Hall', img: 'https://cdn.builder.io/api/v1/image/assets%2F4705a7fec00444bfa14d396c0191674a%2F8ad5f6b88c954e60a993a062691b0542?format=webp&width=800', price: 4500, rating: 4.9, metaLeft: 'Projector & Sound', metaRight: 'Snacks & Hot Lunch' },
  { id: 'pkg2', title: 'Half Day Conference – Naivasha Hall', img: 'https://cdn.builder.io/api/v1/image/assets%2F4705a7fec00444bfa14d396c0191674a%2Fc2fce71f1d8141c38739a7b044a4659e?format=webp&width=800', price: 3200, rating: 4.8, metaLeft: 'Projector & Wi‑Fi', metaRight: 'Snacks & Tea' },
  { id: 'pkg3', title: 'Team Building – Gardens & Grounds', img: 'https://cdn.builder.io/api/v1/image/assets%2F4705a7fec00444bfa14d396c0191674a%2F2178499d3afd41e6a1a009b48c6d971a?format=webp&width=800', price: 5000, rating: 4.9, metaLeft: 'Facilitators & Gear', metaRight: 'Meals Included' },
  { id: 'pkg4', title: 'Executive Boardroom – Tele‑conference', img: 'https://cdn.builder.io/api/v1/image/assets%2F4705a7fec00444bfa14d396c0191674a%2F8488b00f0b5f4ce2b58cf6ffd4c3e8a6?format=webp&width=800', price: 3800, rating: 4.9, metaLeft: 'Tele‑conference Ready', metaRight: 'Snacks & Water' },
  { id: 'pkg5', title: 'Conference Setup – Details', img: 'https://cdn.builder.io/api/v1/image/assets%2F4705a7fec00444bfa14d396c0191674a%2Ff2dbf3219b3b4abb9e55c5df84facc97?format=webp&width=800', price: 0, rating: 4.8, metaLeft: 'Bottled Water', metaRight: 'Stationery' },
  { id: 'pkg6', title: 'U‑Shape Hall – Lakeside Wing', img: 'https://cdn.builder.io/api/v1/image/assets%2F4705a7fec00444bfa14d396c0191674a%2F73429092cd0d4b37939fadbbedf2dda0?format=webp&width=800', price: 4200, rating: 4.8, metaLeft: 'Projector & Sound', metaRight: 'Meals Included' },
];
