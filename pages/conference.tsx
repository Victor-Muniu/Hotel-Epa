import Head from 'next/head';
import { useState, useEffect } from 'react';
import HallModal, { HALL_DATA } from '../components/HallModal';

export default function ConferenceAndMeetings() {
  const [minPrice, setMinPrice] = useState(1500); // KSh
  const [maxPrice, setMaxPrice] = useState(6500); // KSh
  const [selectedHall, setSelectedHall] = useState<string | null>(null);
  const [attendees, setAttendees] = useState(0);
  const [selectedPackages, setSelectedPackages] = useState<Record<string, boolean>>({ 'Full Day': false, 'Half Day': false, 'Team Building': false });
  const amenityOptions = ['High‑Speed Wi‑Fi','Projector','Sound System','Tele‑conference'];
  const [selectedAmenities, setSelectedAmenities] = useState<Record<string, boolean>>({ 'High‑Speed Wi‑Fi': false, 'Projector': false, 'Sound System': false, 'Tele‑conference': false });
  const [selectedRoomStyle, setSelectedRoomStyle] = useState<string | null>(null);
  const [selectedCapacityRange, setSelectedCapacityRange] = useState<string | null>(null);
  const [filteredCards, setFilteredCards] = useState<typeof CARD_DATA | null>(null);

  function activeFilters() {
    return {
      packages: Object.values(selectedPackages).some(Boolean),
      attendees: attendees && attendees !== 50,
      amenities: Object.values(selectedAmenities).some(Boolean),
      seating: !!selectedRoomStyle,
      capacity: !!selectedCapacityRange,
    };
  }

  function clearFilters() {
    setSelectedPackages({ 'Full Day': false, 'Half Day': false, 'Team Building': false });
    setSelectedAmenities({ 'High‑Speed Wi‑Fi': false, 'Projector': false, 'Sound System': false, 'Tele‑conference': false });
    setSelectedRoomStyle(null);
    setSelectedCapacityRange(null);
    setAttendees(0);
    setFilteredCards(null);
  }

  function togglePackage(name: string) {
    setSelectedPackages(prev => ({ ...prev, [name]: !prev[name] }));
  }
  function toggleAmenity(name: string) {
    setSelectedAmenities(prev => ({ ...prev, [name]: !prev[name] }));
  }

  function applyFilters() {
    const attendeeCount = Number(attendees) || 0;
    const selectedAmenityNames = Object.keys(selectedAmenities).filter(k => selectedAmenities[k]);

    const result = CARD_DATA.filter(c => {
      const hall = HALL_DATA[c.id as keyof typeof HALL_DATA];

      // if capacity range or seating arrangement is selected, require hall data
      if ((selectedCapacityRange || selectedRoomStyle) && !hall) return false;

      // capacity by attendee count
      if (attendeeCount > 0) {
        if (!hall || hall.maxCapacity < attendeeCount) return false;
      }

      // capacity range filter: interpret selection as minimum required capacity
      if (selectedCapacityRange) {
        if (!hall) return false;
        if (/Up to (\d+)/i.test(selectedCapacityRange)) {
          const cap = Number(selectedCapacityRange.match(/Up to (\d+)/i)?.[1] || 0);
          if (hall.maxCapacity < cap) return false;
        } else if (selectedCapacityRange === '100+') {
          if (hall.maxCapacity < 100) return false;
        }
      }

      // amenities filter using keywords mapping
      const amenityKeywords: Record<string,string[]> = {
        'High‑Speed Wi‑Fi': ['wifi','wi‑fi','highspeed','high-speed','complementary','internet'],
        'Projector': ['projector','screen'],
        'Sound System': ['sound','pa','audio'],
        'Tele‑conference': ['tele','conference','tele-conference']
      };

      for (const am of selectedAmenityNames) {
        const keywords = amenityKeywords[am] || [am.toLowerCase()];
        let has = false;
        if (hall) {
          const hallText = hall.amenities.join(' ').toLowerCase();
          has = keywords.some(k => hallText.includes(k));
        }
        if (!has) {
          const left = (c.metaLeft || '').toLowerCase();
          const right = (c.metaRight || '').toLowerCase();
          has = keywords.some(k => left.includes(k) || right.includes(k));
        }
        if (!has) return false;
      }

      // seating arrangement filter
      if (selectedRoomStyle) {
        if (!hall) return false;
        const found = hall.arrangements.some(a => a.name.toLowerCase() === selectedRoomStyle.toLowerCase());
        if (!found) return false;
      }

      return true;
    });

    setFilteredCards(result);
  }

  // Re-run filters on change so the UI updates immediately
  useEffect(() => { applyFilters(); }, [attendees, selectedAmenities, selectedRoomStyle, selectedCapacityRange, selectedPackages]);

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
                <select className="pill-field" aria-label="Attendees" value={attendees} onChange={(e)=> setAttendees(Number(e.target.value)||0)}>
                  <option value={0}>Any</option>
                  <option value={10}>10 Guests</option>
                  <option value={25}>25 Guests</option>
                  <option value={50}>50 Guests</option>
                  <option value={100}>100 Guests</option>
                  <option value={150}>150 Guests</option>
                </select>
              </label>
              <button className="btn primary-purple" type="button" onClick={applyFilters}>Check Availability</button>
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
            <div className="chip-actions" style={{ display: 'none' }}></div>
          </div>

          <section className="homes-body">
            <div className="grid-cards">
              {(filteredCards || CARD_DATA).map((c) => (
                <article key={c.id} className="home-card" role="button" tabIndex={0} onClick={() => (c.id === 'pkg1' || c.id === 'pkg2') && setSelectedHall(c.id)} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (c.id === 'pkg1' || c.id === 'pkg2') && setSelectedHall(c.id)} style={{ cursor: (c.id === 'pkg1' || c.id === 'pkg2') ? 'pointer' : 'default' }}>
                  <div className="media">
                    <img src={c.img} alt={c.title} />
                  </div>
                  <div className="info info-compact">
                    <h3 className="title">{c.title}</h3>

                    <div className="card-amenities" aria-hidden>
                      <span className="amenity">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                          <path d="M12 18c1.657 0 3-1.343 3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M8.5 14.5a7 7 0 0 1 7 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M5 11a11 11 0 0 1 14 0" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="amenity-label">High‑speed internet</span>
                      </span>

                      <span className="amenity">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                          <rect x="3" y="6" width="18" height="10" rx="1" stroke="currentColor" strokeWidth="1.4"/>
                          <path d="M8 17h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                          <path d="M12 6v-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                        </svg>
                        <span className="amenity-label">{c.id === 'pkg6' ? 'Tele‑conference' : 'Projector'}</span>
                      </span>

                      <span className="amenity">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                          <path d="M3 21l4-4 11-11a2 2 0 0 1 2.828 0l.172.172a2 2 0 0 1 0 2.828L11 20l-4 1z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M14 7l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="amenity-label">Writing materials</span>
                      </span>
                    </div>

                    <div className="card-actions">
                      <button
                        type="button"
                        className="btn-more-details primary"
                        onClick={(e) => { e.stopPropagation(); setSelectedHall(c.id); }}
                        aria-label={`More details about ${c.title}`}
                      >
                        More details
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="filters" aria-label="Filters">
              <div className="filters-head">
                <strong>Filters</strong>
                <button className="link-clear" type="button" onClick={() => clearFilters()}>Clear all filters ({Object.values(activeFilters()).filter(Boolean).length})</button>
              </div>

              <div className="filter-block">
                <div className="filter-title">Package type</div>
                <div className="stack">
                  {Object.keys(selectedPackages).map((k) => (
                    <label className="checkbox" key={k}>
                      <input type="checkbox" checked={!!selectedPackages[k]} onChange={() => togglePackage(k)} /> {k}
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-block">
                <div className="filter-title">Amenities</div>
                <div className="grid-rows">
                  <div>
                    <div className="sub">Connectivity</div>
                    <div className="counter-row">
                      {amenityOptions.map((x)=> <button key={'a'+x} className={`counter ${selectedAmenities[x]?'active':''}`} type="button" onClick={() => toggleAmenity(x)}>{x}</button>)}
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
                      {['Up to 20','Up to 50','Up to 100','100+'].map((x)=> <button key={'cap'+x} className={`counter ${x===selectedCapacityRange?'active':''}`} type="button" onClick={() => setSelectedCapacityRange(x)}>{x}</button>)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="filter-block">
                <div className="filter-title">Seating arrangement</div>
                <div className="seg-grid">
                  {['Theater','Classroom','U‑Shape','Boardroom','Banquet','Cocktail','Hollow Square','Cabaret'].map((s) => (
                    <button key={s} className={`seg-card ${s===selectedRoomStyle?'active':''}`} type="button" onClick={() => setSelectedRoomStyle(s)}>
                      <span className="seg-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 10l9-6 9 6v8H3z" fill="none" stroke="currentColor" strokeWidth="1.6"/></svg></span>
                      <span>{s}</span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </section>
        </div>
        {selectedHall && <HallModal hallId={selectedHall} onClose={() => setSelectedHall(null)} />}
      </main>
    </>
  );
}

const CARD_DATA = [
  { id: 'pkg1', title: 'Kilimanjaro', img: 'https://cdn.builder.io/api/v1/image/assets%2F4705a7fec00444bfa14d396c0191674a%2F8ad5f6b88c954e60a993a062691b0542?format=webp&width=800', price: 4500, rating: 4.9, metaLeft: 'Projector & Sound', metaRight: 'Snacks & Hot Lunch' },
  { id: 'pkg2', title: 'Menengai', img: 'https://cdn.builder.io/api/v1/image/assets%2F940ebba695114a2a9f60c6ca6acee801%2F3aa10e6102d1464fa353d5d488450070?format=webp&width=800', price: 3200, rating: 4.8, metaLeft: 'Projector & Wi‑Fi', metaRight: 'Snacks & Tea' },
  { id: 'pkg3', title: 'Kibo', img: 'https://cdn.builder.io/api/v1/image/assets%2F4705a7fec00444bfa14d396c0191674a%2F2178499d3afd41e6a1a009b48c6d971a?format=webp&width=800', price: 5000, rating: 4.9, metaLeft: 'Facilitators & Gear', metaRight: 'Meals Included' },
  { id: 'pkg4', title: 'Mawenzi', img: 'https://cdn.builder.io/api/v1/image/assets%2F940ebba695114a2a9f60c6ca6acee801%2F3eed4abdf32f4ec9b4e0a1512a408204?format=webp&width=800', price: 3800, rating: 4.9, metaLeft: 'Tele‑conference Ready', metaRight: 'Snacks & Water' },
  { id: 'pkg5', title: 'Lenana', img: 'https://cdn.builder.io/api/v1/image/assets%2F940ebba695114a2a9f60c6ca6acee801%2F329fd56dc90044a9a1fd823642d3d4ea?format=webp&width=800', price: 0, rating: 4.8, metaLeft: 'Bottled Water', metaRight: 'Stationery' },
  { id: 'pkg6', title: 'Boardroom', img: 'https://cdn.builder.io/api/v1/image/assets%2F940ebba695114a2a9f60c6ca6acee801%2Fd82dd3cc4afe45b68218b5634f827510?format=webp&width=800', price: 4200, rating: 4.8, metaLeft: 'Tele‑conference & Sound', metaRight: 'Meals Included' },
];
