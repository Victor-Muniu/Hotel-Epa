import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ExploreRooms() {
  const [selectedRoom, setSelectedRoom] = useState<number>(0);
  const [roomTypes, setRoomTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterLocation, setFilterLocation] = useState<string>('All');
  const [filterType, setFilterType] = useState<string>('Any');
  const [filterCapacity, setFilterCapacity] = useState<string>('Any');

  // Booking / Reserve state
  const [bookingOpen, setBookingOpen] = useState(false);
  const [reserveRoom, setReserveRoom] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const [today, setToday] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [minCheckout, setMinCheckout] = useState<string>('');
  const [nights, setNights] = useState<string[]>([]);
  const BOARD_TYPES = ['Bed Only', 'Bed and Breakfast', 'Half Board', 'Full Board'];
  const [defaultBoardType, setDefaultBoardType] = useState<string>('Bed Only');
  const [boardPlan, setBoardPlan] = useState<Record<string, string>>({});
  const [numRooms, setNumRooms] = useState<number>(1);
  const [roomSelections, setRoomSelections] = useState<{ [key: number]: string }>({ 0: '' });

  const rooms = [
    {
      id: 1,
      name: 'Deluxe Double',
      roomType: 'double',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F63e670d5cbe5459ba070252373268feb%2F2485ae8cfcdc42bf97186752d3dfedc2?format=webp&width=1600',
      description: 'Elegant double room with premium finishes and balcony views for a refined stay.',
      features: ['1 Double Bed', '50m²', 'Balcony', 'Smart TV', 'Work Desk']
    },
    {
      id: 2,
      name: 'Standard Double',
      roomType: 'double',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F63e670d5cbe5459ba070252373268feb%2F0f158b48159b4dea9fd22050b1ed4319?format=webp&width=1600',
      description: 'Comfortable standard double with modern décor and everything you need for a great night\'s sleep.',
      features: ['1 Double Bed', '45m²', 'Air Conditioning', 'Wi‑Fi', 'Wardrobe']
    },
    {
      id: 3,
      name: 'Double with an extra bed',
      roomType: 'triple',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F63e670d5cbe5459ba070252373268feb%2F28a2e9e58f4640fa9d68f363c8330e78?format=webp&width=1600',
      description: 'Ideal for small families or groups—double bed with an additional single bed.',
      features: ['1 Double + 1 Single', '55m²', 'Spacious Layout', 'Seating Area', 'Wardrobe']
    },
    {
      id: 4,
      name: 'Standard Single',
      roomType: 'single',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F63e670d5cbe5459ba070252373268feb%2F32d5855646ed417e83b45d3d4e1ebbfb?format=webp&width=1600',
      description: 'Cozy single room perfect for solo travelers, with modern amenities and style.',
      features: ['1 Single Bed', '25m²', 'Wi‑Fi', 'Smart TV', 'Work Desk']
    },
    {
      id: 5,
      name: 'Twin',
      roomType: 'twin',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F63e670d5cbe5459ba070252373268feb%2F75f97fc26f914e6489ee10104767af66?format=webp&width=1600',
      description: 'Two comfortable single beds with modern furnishings and a fresh look.',
      features: ['2 Single Beds', '50m²', 'Modern Decor', 'Reading Lamps', 'Wardrobe']
    },
    {
      id: 6,
      name: 'Tripple',
      roomType: 'triple',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F63e670d5cbe5459ba070252373268feb%2F11597a5f3c144797bb99b59dac85173c?format=webp&width=1600',
      description: 'Spacious room suitable for three guests, offering flexibility and comfort.',
      features: ['3 Single Beds', '60m²', 'Ample Storage', 'Seating Area', 'Wi‑Fi']
    },
    {
      id: 7,
      name: 'Family interconnecting',
      roomType: 'family',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F63e670d5cbe5459ba070252373268feb%2F71052c8e23024c39a2a8bdfd0fbef059?format=webp&width=1600',
      description: 'Two interconnecting rooms perfect for families seeking space and privacy.',
      features: ['2 Interconnecting Rooms', '80m²', '2 Double Beds', 'Nursery Option', 'Spacious Layout']
    }
  ];

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/room-types');
        const json = await res.json();
        if (mounted && Array.isArray(json.types)) {
          setRoomTypes(json.types);
        }
      } catch (_) {
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const visibleRooms = rooms.filter(r => filterType === 'Any' || r.roomType.toLowerCase() === filterType.toLowerCase());

  function toLocalDateString(d: Date) {
    const tzOffset = d.getTimezoneOffset() * 60000;
    return new Date(d.getTime() - tzOffset).toISOString().slice(0, 10);
  }
  function addDays(dateStr: string, days: number) {
    const d = new Date(dateStr + 'T00:00:00');
    d.setDate(d.getDate() + 1 * days);
    return toLocalDateString(d);
  }
  function enumerateNights(start: string, end: string): string[] {
    if (!start || !end) return [];
    const s = new Date(start + 'T00:00:00');
    const e = new Date(end + 'T00:00:00');
    const out: string[] = [];
    for (let d = new Date(s); d < e; d.setDate(d.getDate() + 1)) {
      out.push(d.toISOString().slice(0, 10));
    }
    return out;
  }
  function applyDefaultToAll(type: string, dates: string[]) {
    const next: Record<string, string> = {};
    for (const d of dates) next[d] = type;
    setBoardPlan(next);
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);
    setSubmitting(true);

    const t = today || toLocalDateString(new Date());
    const s = startDate;
    const en = endDate;
    if (!s || !en) {
      setSubmitting(false);
      setStatus('Please select both check-in and check-out dates.');
      return;
    }
    if (s < t) {
      setSubmitting(false);
      setStatus('Please select a check-in date that is today or later.');
      return;
    }
    if (en <= s) {
      setSubmitting(false);
      setStatus('Check-out must be at least one day after check-in.');
      return;
    }

    const form = new FormData(e.currentTarget);
    const body: any = Object.fromEntries(form.entries());
    body.room_types = JSON.stringify(roomSelections);
    const plan = nights.map((d) => ({ date: d, board_type: boardPlan[d] || defaultBoardType }));
    body.board_plan = JSON.stringify(plan);

    const res = await fetch('/api/booking', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const json = await res.json();
    setSubmitting(false);
    setStatus(json.message);
    if (res.ok) {
      (e.target as HTMLFormElement).reset();
      setBookingOpen(false);
    }
  }

  function openBooking(roomName?: string) { if (roomName) setReserveRoom(roomName); const idx = rooms.findIndex(r => r.name === roomName); if (idx >= 0) setSelectedRoom(idx); setBookingOpen(true); }

  const handleNumRoomsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value) || 1;
    setNumRooms(num);
    const newSelections: { [key: number]: string } = {};
    for (let i = 0; i < num; i++) {
      newSelections[i] = roomSelections[i] || (roomTypes[0] || '');
    }
    setRoomSelections(newSelections);
  };

  const handleRoomTypeChange = (roomIndex: number, roomType: string) => {
    setRoomSelections(prev => ({
      ...prev,
      [roomIndex]: roomType
    }));
  };

  // initialize dates
  useEffect(() => {
    const t = toLocalDateString(new Date());
    setToday(t);
    setMinCheckout(addDays(t, 1));
  }, []);

  return (
    <>
      <Head>
        <title>Explore Rooms — Epashikino Resort & Spa</title>
        <meta name="description" content="Explore our beautiful room collection with stunning photography and detailed amenities." />
      </Head>

      <main className="explore-page">
        <div className="explore-container">
          <header className="explore-header">
            <h1>Explore Our Rooms</h1>
            <p>Discover the perfect accommodation for your stay</p>
          </header>

          <section className="browse-section" aria-label="Explore grid">
            <form className="filters-bar" onSubmit={(e) => e.preventDefault()} role="search">
              <label className="filter-field">
                <span className="filter-label">Location</span>
                <select className="filter-input" value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)}>
                  <option>All</option>
                  <option>On-site</option>
                  <option>Off-site</option>
                </select>
              </label>
              <label className="filter-field">
                <span className="filter-label">Type</span>
                <select className="filter-input" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                  <option>Any</option>
                  <option value="single">Single</option>
                  <option value="double">Double</option>
                  <option value="twin">Twin</option>
                  <option value="triple">Triple</option>
                  <option value="family">Family</option>
                </select>
              </label>
              <label className="filter-field">
                <span className="filter-label">Guests</span>
                <select className="filter-input" value={filterCapacity} onChange={(e) => setFilterCapacity(e.target.value)}>
                  <option>Any</option>
                  <option>2</option>
                  <option>4</option>
                  <option>6</option>
                  <option>8</option>
                </select>
              </label>
              <button className="btn-search" type="submit">Search</button>
            </form>

            <div className="card-grid">
              {visibleRooms.map((room) => (
                <article key={room.id} className="room-card">
                  <figure className="room-card-image">
                    <img src={room.image} alt={room.name} loading="lazy" decoding="async" />
                  </figure>
                  <div className="room-card-body">
                    <div className="room-card-location">
                      <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 22s7-5.43 7-12A7 7 0 0 0 5 10c0 6.57 7 12 7 12z" fill="none" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="10" r="3" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
                      Epashikino · Kenya
                    </div>
                    <h3 className="room-card-title">{room.name}</h3>
                    <p className="room-card-desc">{room.description}</p>
                    <ul className="room-card-amenities">
                      {room.features.map((f,i) => (
                        <li key={i} className="amenity">
                          <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M3 13h18M4 10h16a2 2 0 0 1 2 2v6H2v-6a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="room-card-meta">
                      <span style={{textTransform: 'capitalize'}}>{room.roomType}</span>
                      <span>•</span>
                      <span>{room.features.find(f=>/\dm²/i.test(f)) || '50 m²'}</span>
                    </div>

                    <div className="room-card-actions">
                      <button className="btn-more-details" type="button" onClick={() => openBooking(room.name)}>Reserve</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className="explore-body">
            <aside className="explore-sidebar">
              <div className="rooms-list">
                <h3 className="rooms-list-title">Room Collection</h3>
                <nav className="rooms-navigation">
                  {rooms.map((room, idx) => (
                    <button
                      key={room.id}
                      className={`room-nav-item ${selectedRoom === idx ? 'active' : ''}`}
                      onClick={() => setSelectedRoom(idx)}
                    >
                      <span className="room-nav-number">{idx + 1}</span>
                      <span className="room-nav-name">{room.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            <section className="explore-main">
              <div className="room-viewer">
                <figure className="room-display-image">
                  <img
                    src={rooms[selectedRoom].image}
                    alt={rooms[selectedRoom].name}
                    loading="eager"
                    decoding="async"
                  />
                </figure>

                <div className="room-details">
                  <div className="room-header-info">
                    <h2 className="room-display-title">{rooms[selectedRoom].name}</h2>
                    <p className="room-display-desc">{rooms[selectedRoom].description}</p>
                  </div>

                  <div className="room-features-block">
                    <h3 className="features-title">Room Features</h3>
                    <ul className="features-list">
                      {rooms[selectedRoom].features.map((feature, idx) => (
                        <li key={idx} className="feature-item">
                          <span className="feature-icon">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {!loading && roomTypes.length > 0 && (
                    <div className="room-types-available">
                      <h3 className="types-title">This Room Type</h3>
                      <div className="types-list">
                        <span className="type-badge type-badge-active">{rooms[selectedRoom].roomType}</span>
                      </div>
                    </div>
                  )}

                  <div className="room-actions">
                    <Link className="btn btn-primary" href="/rooms">Book This Room</Link>
                  </div>
                </div>
              </div>

              <div className="room-gallery-grid">
                <h3 className="gallery-title">All Rooms</h3>
                <div className="gallery-grid">
                  {rooms.map((room, idx) => (
                    <button
                      key={room.id}
                      className={`gallery-item ${selectedRoom === idx ? 'selected' : ''}`}
                      onClick={() => setSelectedRoom(idx)}
                      aria-label={`Select ${room.name}`}
                    >
                      <figure className="gallery-figure">
                        <img
                          src={room.image}
                          alt={room.name}
                          loading="lazy"
                          decoding="async"
                        />
                      </figure>
                      <span className="gallery-item-name">{room.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <nav className="explore-bottom-nav">
            <Link className="btn btn-outline" href="/rooms">Back to Accommodation</Link>
          </nav>
        </div>
      </main>

      {/* Booking modal (reserve) */}
      {bookingOpen && (
        <div className="hall-modal-overlay" role="dialog" aria-modal="true" aria-label="Booking form" onClick={() => setBookingOpen(false)}>
          <div className="hall-modal-panel" onClick={(e) => e.stopPropagation()}>
            <header className="hall-modal-header">
              <h3 className="hall-modal-title">Reserve — {reserveRoom || ''}</h3>
              <button className="hall-modal-close" aria-label="Close" onClick={() => setBookingOpen(false)}>✕</button>
            </header>
            <div className="hall-modal-body">
              <div className="hall-gallery">
                <div className="gallery-carousel">
                  {/* simple image */}
                  <img src={rooms[selectedRoom].image} alt={rooms[selectedRoom].name} className="gallery-image" />
                </div>
                <div className="hall-info">
                  <form className="form booking-form" onSubmit={submit}>
                    <input type="hidden" name="room_name" value={reserveRoom || ''} />
                    <div className="date-row"><input className="input" name="first_name" placeholder="First name" required /><input className="input" name="last_name" placeholder="Last name" required /></div>
                    <input className="input" type="email" name="email" placeholder="Email" required />
                    <input className="input" name="phone" placeholder="Phone" />
                    <input className="input" name="nationality" placeholder="Nationality" required />
                    <div className="date-row">
                      <input className="input" type="date" name="start_date" value={startDate} min={today} onChange={(e) => { let v = e.target.value; if (today && v && v < today) v = today; setStartDate(v); const nextMinC = v ? addDays(v, 1) : addDays(today || toLocalDateString(new Date()), 1); setMinCheckout(nextMinC); if (endDate && endDate <= v) { setEndDate(nextMinC); } const ds = enumerateNights(v, endDate && endDate > v ? endDate : nextMinC); setNights(ds); applyDefaultToAll(defaultBoardType, ds); }} required />
                      <input className="input" type="date" name="end_date" value={endDate} min={minCheckout} onChange={(e) => { let v = e.target.value; const s = startDate || today; const minC = s ? addDays(s, 1) : minCheckout; if (v && s && v <= s) v = minC; setEndDate(v); const ds = enumerateNights(startDate || today, v); setNights(ds); applyDefaultToAll(defaultBoardType, ds); }} required />
                    </div>

                    {nights.length > 0 && (
                      <div className="room-types-section">
                        <h4 className="room-types-label">Board plan per night</h4>
                        <div className="room-types-grid">
                          {nights.map((d) => (
                            <div key={d} className="room-type-selector">
                              <label className="room-type-title">{new Date(d).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</label>
                              <select className="input" value={boardPlan[d] || defaultBoardType} onChange={(e) => setBoardPlan((prev) => ({ ...prev, [d]: e.target.value }))}>
                                {BOARD_TYPES.map((t) => (
                                  <option key={t} value={t}>{t}</option>
                                ))}
                              </select>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="count-row"><input className="input" type="number" name="adults" placeholder="Adults" min={1} /><input className="input" type="number" name="kids" placeholder="Children" min={0} /><input className="input" type="number" name="num_rooms" placeholder="Rooms" min={1} value={numRooms} onChange={handleNumRoomsChange} /></div>
                    {numRooms > 0 && (
                      <div className="room-types-section">
                        <h4 className="room-types-label">Room Types</h4>
                        <div className="room-types-grid">
                          {Array.from({ length: numRooms }).map((_, idx) => (
                            <div key={idx} className="room-type-selector">
                              <label className="room-type-title">Room {idx + 1}</label>
                              <select
                                className="input"
                                value={roomSelections[idx] || ''}
                                onChange={(e) => handleRoomTypeChange(idx, e.target.value)}
                                disabled={roomTypes.length === 0}
                              >
                                <option value="">Select a room type</option>
                                {roomTypes.map(type => (
                                  <option key={type} value={type}>{type}</option>
                                ))}
                              </select>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <textarea className="input" name="notes" placeholder="Notes"></textarea>
                    <button className="btn btn-primary" disabled={submitting} type="submit">{submitting ? 'Submitting…' : 'Make your reservations'}</button>
                    {status && <p role="status">{status}</p>}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .explore-page { margin-top: 16px; }
        .explore-container { width: 90%; max-width: 1200px; margin: 0 auto; padding: 24px 16px 60px; }
        
        .explore-header { text-align: center; margin-bottom: 32px; }
        .explore-header h1 { margin: 0 0 8px; font-size: 2.2rem; font-weight: 700; color: var(--text-black); }
        .explore-header p { margin: 0; color: rgba(0,0,0,0.65); font-size: 1.05rem; }

        .explore-body { display: none; }

        .explore-sidebar { position: sticky; top: 90px; height: fit-content; }
        .rooms-list { background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 0; padding: 0; }
        .rooms-list-title { margin: 0; padding: 16px 12px; font-size: 1.1rem; font-weight: 700; border-bottom: 1px solid rgba(0,0,0,0.06); background: #fafafa; }
        .rooms-navigation { display: flex; flex-direction: column; gap: 0; list-style: none; padding: 0; margin: 0; }

        .room-nav-item { width: 100%; text-align: left; background: transparent; border: 0; border-bottom: 1px solid rgba(0,0,0,0.04); padding: 12px; display: flex; align-items: center; gap: 12px; cursor: pointer; transition: background 0.2s ease; }
        .room-nav-item:last-child { border-bottom: 0; }
        .room-nav-item:hover { background: rgba(111,78,55,0.04); }
        .room-nav-item.active { background: rgba(111,78,55,0.1); border-left: 3px solid var(--brand-brown); padding-left: 9px; }

        .room-nav-number { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 50%; background: var(--brand-brown); color: #fff; font-size: 0.9rem; font-weight: 700; flex-shrink: 0; }
        .room-nav-name { flex: 1; font-size: 0.95rem; color: rgba(0,0,0,0.75); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

        .explore-main { display: grid; gap: 32px; }

        .room-viewer { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; }
        .room-display-image { margin: 0; border-radius: 0; overflow: hidden; background: #e8e6e1; }
        .room-display-image img { width: 100%; height: auto; display: block; aspect-ratio: 4/3; object-fit: cover; }

        .room-details { display: grid; gap: 20px; }
        .room-header-info { display: grid; gap: 10px; }
        .room-display-title { margin: 0; font-size: 1.8rem; font-weight: 700; color: var(--text-black); }
        .room-display-desc { margin: 0; color: rgba(0,0,0,0.7); line-height: 1.6; font-size: 1rem; }

        .room-features-block { background: #fafafa; border: 1px solid rgba(0,0,0,0.06); border-radius: 0; padding: 16px; }
        .features-title { margin: 0 0 12px; font-size: 1rem; font-weight: 700; color: var(--text-black); }
        .features-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; }
        .feature-item { display: flex; align-items: center; gap: 10px; color: rgba(0,0,0,0.75); font-size: 0.95rem; }
        .feature-icon { display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; color: var(--brand-brown); font-weight: 700; }

        .room-types-available { background: rgba(111,78,55,0.05); border: 1px solid rgba(111,78,55,0.1); border-radius: 0; padding: 14px; }
        .types-title { margin: 0 0 10px; font-size: 0.95rem; font-weight: 700; color: var(--text-black); }
        .types-list { display: flex; flex-wrap: wrap; gap: 8px; }
        .type-badge { display: inline-flex; align-items: center; padding: 6px 12px; border-radius: 999px; background: #e8e6e1; color: var(--text-black); font-size: 0.85rem; font-weight: 600; border: 1px solid rgba(111,78,55,0.2); }
        .type-badge-active { background: var(--brand-brown); color: #fff; border-color: var(--brand-brown); }

        .room-actions { display: flex; gap: 12px; }

        .room-gallery-grid { display: grid; gap: 16px; }
        .gallery-title { margin: 0; font-size: 1.2rem; font-weight: 700; color: var(--text-black); }

        .gallery-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
        .gallery-item { background: transparent; border: 2px solid rgba(0,0,0,0.08); border-radius: 0; padding: 0; cursor: pointer; transition: border-color 0.2s ease, transform 0.2s ease; overflow: hidden; }
        .gallery-item:hover { border-color: rgba(111,78,55,0.3); transform: translateY(-2px); }
        .gallery-item.selected { border-color: var(--brand-brown); }

        .gallery-figure { margin: 0; border-radius: 0; overflow: hidden; background: #e8e6e1; }
        .gallery-item img { width: 100%; height: 120px; object-fit: cover; display: block; }
        .gallery-item-name { display: block; padding: 10px 8px; font-size: 0.85rem; color: rgba(0,0,0,0.75); text-align: center; background: #fafafa; border-top: 1px solid rgba(0,0,0,0.04); }

        .explore-bottom-nav { display: flex; gap: 12px; }

        @media (max-width: 1000px) {
          .explore-body { grid-template-columns: 1fr; }
          .explore-sidebar { position: static; }
          .room-viewer { grid-template-columns: 1fr; }
          .gallery-grid { grid-template-columns: repeat(4, 1fr); }
        }

        @media (max-width: 768px) {
          .explore-header h1 { font-size: 1.8rem; }
          .room-display-title { font-size: 1.4rem; }
          .explore-sidebar { order: 2; }
          .explore-main { order: 1; }
          .gallery-grid { grid-template-columns: repeat(3, 1fr); }
          .rooms-list-title { display: none; }
          .rooms-navigation { flex-direction: row; flex-wrap: wrap; }
          .room-nav-item { flex: 1 1 48%; border-right: 1px solid rgba(0,0,0,0.04); }
        }

        @media (max-width: 600px) {
          .explore-container { width: 92%; padding: 16px 12px 40px; }
          .explore-header h1 { font-size: 1.5rem; }
          .explore-header p { font-size: 0.95rem; }
          .gallery-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
          .gallery-item img { height: 100px; }
          .room-features-block { padding: 12px; }
          .room-nav-item { font-size: 0.9rem; }
        }
        /* Browse grid styles */
        .browse-section { display: grid; gap: 20px; margin-bottom: 16px; }
        .filters-bar { display: grid; grid-template-columns: repeat(4, auto); gap: 12px; align-items: end; background: #fff; border: 1px solid rgba(0,0,0,0.08); padding: 12px; }
        .filter-field { display: grid; gap: 6px; }
        .filter-label { font-size: 0.8rem; color: rgba(0,0,0,0.6); }
        .filter-input { appearance: none; background: #fafafa; border: 1px solid rgba(0,0,0,0.1); padding: 10px 12px; border-radius: 8px; }
        .btn-search { padding: 10px 16px; border-radius: 8px; background: var(--brand-brown); color: #fff; border: 0; cursor: pointer; }

        .card-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .room-card { background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 12px; overflow: hidden; display: grid; }
        .room-card-image { margin: 0; }
        .room-card-image img { width: 100%; height: 180px; object-fit: cover; display: block; }
        .room-card-body { padding: 12px; display: grid; gap: 8px; }
        .room-card-location { display: inline-flex; align-items: center; gap: 6px; color: rgba(0,0,0,0.6); font-size: 0.85rem; }
        .room-card-location svg { width: 16px; height: 16px; }
        .room-card-title { margin: 0; font-size: 1.05rem; color: var(--text-black); }
        .room-card-desc { margin: 0; color: rgba(0,0,0,0.65); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .room-card-amenities { list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-top: 6px; }
        .amenity { display: inline-flex; align-items: center; gap: 8px; color: rgba(0,0,0,0.75); font-size: 0.85rem; padding: 6px 8px; background: #fafafa; border-radius: 8px; border: 1px solid rgba(0,0,0,0.03); }
        .amenity svg { width: 16px; height: 16px; flex-shrink: 0; }
        .room-card-meta { display: inline-flex; gap: 8px; align-items: center; color: rgba(0,0,0,0.6); font-size: 0.8rem; flex-wrap: wrap; }
        .room-card-actions { margin-top: 8px; display: flex; gap: 8px; }

        @media (max-width: 1000px) { .card-grid { grid-template-columns: repeat(2, 1fr); } .filters-bar { grid-template-columns: 1fr 1fr 1fr auto; } }
        @media (max-width: 600px) { .card-grid { grid-template-columns: 1fr; } .filters-bar { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}
