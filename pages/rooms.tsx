import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import RoomTour from '../components/RoomTour';

export default function Rooms() {
  const [status, setStatus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'floor' | 'tour'>('floor');
  const [tourOpen, setTourOpen] = useState(false);
  const [numRooms, setNumRooms] = useState<number>(1);
  const [roomSelections, setRoomSelections] = useState<{ [key: number]: string }>({ 0: '' });
  const [roomTypes, setRoomTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const tourSlides = [
    { src: 'https://cdn.builder.io/api/v1/image/assets%2F940ebba695114a2a9f60c6ca6acee801%2Faa5ae259ac784d40825512253e7db2fb?format=webp&width=1600', alt: 'Elegant bedroom overview' },
    { src: 'https://cdn.builder.io/api/v1/image/assets%2F940ebba695114a2a9f60c6ca6acee801%2F9a42056b6d524f8681950c1bb20936ba?format=webp&width=1600', alt: 'Wide view with balcony light' },
    { src: 'https://cdn.builder.io/api/v1/image/assets%2F940ebba695114a2a9f60c6ca6acee801%2F4403b39547664266bd5285e4b2bdb00f?format=webp&width=1600', alt: 'Mirror reflection detail' },
    { src: 'https://cdn.builder.io/api/v1/image/assets%2F940ebba695114a2a9f60c6ca6acee801%2F66435057c73f4ca4876ee1eaeeddd83d?format=webp&width=1600', alt: 'Balcony and bedroom' },
    { src: 'https://cdn.builder.io/api/v1/image/assets%2F940ebba695114a2a9f60c6ca6acee801%2Fcd164c09d1d74a908eb8e032aa0e8f56?format=webp&width=1600', alt: 'Warm-toned room layout' },
    { src: 'https://cdn.builder.io/api/v1/image/assets%2F940ebba695114a2a9f60c6ca6acee801%2F9f1c54d650e94bebb9fe745e2c6d6479?format=webp&width=1600', alt: 'Comfortable bed in spacious room' },
    { src: 'https://cdn.builder.io/api/v1/image/assets%2F940ebba695114a2a9f60c6ca6acee801%2Fb9c805fd52ad463f817b8164540a6eb9?format=webp&width=1600', alt: 'Bathroom with walk-in shower' },
    { src: 'https://cdn.builder.io/api/v1/image/assets%2F940ebba695114a2a9f60c6ca6acee801%2Fbd4cb9b5b8f149308da6d47f2bdda31d?format=webp&width=1600', alt: 'Spacious bathroom and vanity' },
    { src: 'https://cdn.builder.io/api/v1/image/assets%2F940ebba695114a2a9f60c6ca6acee801%2F8ab2d8ecd7ec4d36b45d00dd691e4975?format=webp&width=1600', alt: 'Twin beds in teal accent room' },
    { src: 'https://cdn.builder.io/api/v1/image/assets%2F940ebba695114a2a9f60c6ca6acee801%2F15c55ae24551420eaf7da75241165a64?format=webp&width=1600', alt: 'Bright twin room with large windows' }
  ];

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const body = Object.fromEntries(form.entries());
    body.room_types = JSON.stringify(roomSelections);
    const res = await fetch('/api/booking', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const json = await res.json();
    setSubmitting(false);
    setStatus(json.message);
    if (res.ok) (e.target as HTMLFormElement).reset();
  }

  function openBooking(room?: string) { setSelectedRoom(room || null); setBookingOpen(true); }
  function openTour() { setActiveTab('tour'); setTourOpen(true); }

  function scrollToBooking() {
    const el = document.getElementById('booking');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  useEffect(() => {
    async function fetchRoomTypes() {
      try {
        const res = await fetch('/api/room-types');
        const json = await res.json();
        if (json.types && json.types.length > 0) {
          setRoomTypes(json.types);
          setRoomSelections({ 0: json.types[0] });
        }
      } catch (error) {
        console.error('Failed to fetch room types:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchRoomTypes();
  }, []);

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

  return (
    <>
      <Head>
        <title>Accommodation �� Premium Apartment</title>
        <meta name="description" content="Premium Apartment with 2 bedrooms. Availability, gallery, rooms, and amenities." />
      </Head>

      <main className="listing-page">
        <div className="listing-container">
          <header className="listing-header">
            <h1 className="listing-eyebrow">Epashikino Resort & Spa — Booking</h1>
          </header>

          <section className="listing-gallery" aria-label="Gallery">
            <figure className="gallery-hero"><img src="https://cdn.builder.io/api/v1/image/assets%2F63e670d5cbe5459ba070252373268feb%2Faf539d9179ee431cb44e93451fbbe692?format=webp&width=1600" alt="Bedroom overview" loading="eager" decoding="async" /></figure>
            <figure className="gallery-item"><img src="https://cdn.builder.io/api/v1/image/assets%2F63e670d5cbe5459ba070252373268feb%2Fa51eef199a4f441c90df189c41ff09ab?format=webp&width=800" alt="Suite seating" loading="lazy" decoding="async" /></figure>
            <figure className="gallery-item"><img src="https://cdn.builder.io/api/v1/image/assets%2F63e670d5cbe5459ba070252373268feb%2F38a2d423b8b64feea778ad2778fb42a4?format=webp&width=800" alt="Cozy bed" loading="lazy" decoding="async" /></figure>
            <figure className="gallery-item"><img src="https://cdn.builder.io/api/v1/image/assets%2F63e670d5cbe5459ba070252373268feb%2Fdf2c02b1adc04099b730d8975712c255?format=webp&width=1200" alt="Living area" loading="lazy" decoding="async" /></figure>
            <figure className="gallery-item"><img src="https://cdn.builder.io/api/v1/image/assets%2F63e670d5cbe5459ba070252373268feb%2Ffba6bbe719e443888a8766f5dacd024f?format=webp&width=1200" alt="Bright room" loading="lazy" decoding="async" /></figure>
          </section>

          <section className="listing-cta-row">
            <button className="btn btn-verify" type="button" onClick={scrollToBooking}>Check availability</button>
            <div className="listing-badges">
              <span className="badge-fav">Guest Favorite</span>
              <span className="badge-rating" aria-label="4.96 stars, 50 reviews">
                <svg className="star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5l2.9 5.88 6.5.95-4.7 4.58 1.1 6.44L12 18.9 6.2 21.35l1.1-6.44-4.7-4.58 6.5-.95L12 3.5z" fill="currentColor"/></svg>
                4.96 <span className="muted">·</span> 50 reviews
              </span>
            </div>
          </section>

          <section className="listing-body">
            <div className="listing-content">
              <h3 className="section-heading">Book your stay</h3>
              <p className="lead">Choose your board type and share your details. We’ll confirm availability at Epashikino Resort & Spa.</p>
              <form id="booking" className="form booking-form" onSubmit={submit}>
                <fieldset className="board-types">
                  <legend>Board type</legend>
                  <label className="iconline"><input type="radio" name="type" value="Bed Only" required /> Bed Only</label>
                  <label className="iconline"><input type="radio" name="type" value="Bed and Breakfast" /> Bed and Breakfast</label>
                  <label className="iconline"><input type="radio" name="type" value="Half Board" /> Half Board</label>
                  <label className="iconline"><input type="radio" name="type" value="Full Board" /> Full Board</label>
                </fieldset>
                <div className="date-row"><input className="input" name="first_name" placeholder="First name" required /><input className="input" name="last_name" placeholder="Last name" required /></div>
                <input className="input" type="email" name="email" placeholder="Email" required />
                <input className="input" name="phone" placeholder="Phone" />
                <input className="input" name="nationality" placeholder="Nationality" required />
                <input className="input" name="id_document" placeholder="Identification card or passport" required />
                <div className="date-row">
                  <input className="input" type="date" name="start_date" required />
                  <input className="input" type="date" name="end_date" required />
                </div>
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
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <textarea className="input" name="notes" placeholder="Notes"></textarea>
                <button className="btn btn-primary" disabled={submitting} type="submit">{submitting ? 'Submitting…' : 'Send Request'}</button>
                {status && <p role="status">{status}</p>}
              </form>
            </div>
            <aside className="listing-aside" aria-label="Floor plan and room tour">
              <div className="aside-tabs">
                <Link href="/explore_rooms" className={`tab ${activeTab === 'floor' ? 'active' : ''}`}>Floor plan</Link>
                <button className={`tab ${activeTab === 'tour' ? 'active' : ''}`} type="button" onClick={openTour}>Room tour</button>
              </div>
              <div className="aside-media">
                {activeTab === 'floor' ? (
                  <img src="https://cdn.builder.io/api/v1/image/assets%2F63e670d5cbe5459ba070252373268feb%2F1e15dbf5c36c4d60a854af5f6af6ad0c?format=webp&width=900" alt="Apartment floor plan" />
                ) : (
                  <img src={tourSlides[0].src} alt={tourSlides[0].alt} />
                )}
              </div>
            </aside>
          </section>

          <section className="stay-section" aria-label="Where you'll stay">
            <h3 className="section-heading">Where you&apos;ll stay</h3>
            <div className="stay-grid">
              <article className="stay-card">
                <img className="stay-img" src="https://cdn.builder.io/api/v1/image/assets%2F63e670d5cbe5459ba070252373268feb%2Fa4cdabe9d6e8490599efb87735d63b0e?format=webp&width=1200" alt="Room 1" />
                <div className="stay-info">
                  <h4>Room 1</h4>
                  <div className="stay-meta">
                    <span className="iconline">
                      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12h18M4 10h16a2 2 0 012 2v4H2v-4a2 2 0 012-2z" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
                      1 double bed
                    </span>
                    <span className="iconline">
                      <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
                      50 m²
                    </span>
                  </div>
                  <ul className="stay-utils">
                    <li className="iconline"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l9 6-9 6-9-6 9-6zM3 15l9 6 9-6" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>Free Wi‑Fi</li>
                    <li className="iconline"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v10H4zM2 18h20" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>Smart TV</li>
                    <li className="iconline"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 12h12M8 4h8v16H8z" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>Ensuite Bathroom</li>
                    <li className="iconline"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10h16v10H4zM8 7h8" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>Balcony</li>
                    <li className="iconline"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h12v6H6zM8 14h8v6H8z" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>Work desk</li>
                    <li className="iconline"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="2"/><path d="M6 20h12"/></svg>Coffee & Tea</li>
                  </ul>
                  <div className="stay-actions">
                    <button className="btn btn-primary" type="button" onClick={() => openBooking('Room 1')}>Book</button>
                  </div>
                </div>
              </article>
              <article className="stay-card">
                <img className="stay-img" src="https://cdn.builder.io/api/v1/image/assets%2F63e670d5cbe5459ba070252373268feb%2F9b88117c787d46b6afe6a697975b9237?format=webp&width=1200" alt="Room 2" />
                <div className="stay-info">
                  <h4>Room 2</h4>
                  <div className="stay-meta">
                    <span className="iconline">
                      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12h18M4 10h16a2 2 0 012 2v4H2v-4a2 2 0 012-2z" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
                      1 double bed
                    </span>
                    <span className="iconline">
                      <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
                      50 m²
                    </span>
                  </div>
                  <ul className="stay-utils">
                    <li className="iconline"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l9 6-9 6-9-6 9-6zM3 15l9 6 9-6" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>Free Wi‑Fi</li>
                    <li className="iconline"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v10H4zM2 18h20" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>Smart TV</li>
                    <li className="iconline"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 12h12M8 4h8v16H8z" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>Ensuite Bathroom</li>
                    <li className="iconline"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10h16v10H4zM8 7h8" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>Balcony</li>
                    <li className="iconline"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h12v6H6zM8 14h8v6H8z" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>Work desk</li>
                    <li className="iconline"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="2"/><path d="M6 20h12"/></svg>Coffee & Tea</li>
                  </ul>
                  <div className="stay-actions">
                    <button className="btn btn-primary" type="button" onClick={() => openBooking('Room 2')}>Book</button>
                  </div>
                </div>
              </article>
            </div>
          </section>

          <nav className="listing-bottom-nav" aria-label="Back to pages">
            <Link className="btn btn-outline" href="/">Back to Home</Link>
          </nav>
        </div>
      </main>

      {tourOpen && (
        <RoomTour slides={tourSlides} open={tourOpen} onClose={() => setTourOpen(false)} />
      )}

      {bookingOpen && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Booking form" onClick={() => setBookingOpen(false)}>
          <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
            <header className="modal-header">
              <h3>Book your stay{selectedRoom ? ` — ${selectedRoom}` : ''}</h3>
              <button className="modal-close" aria-label="Close" onClick={() => setBookingOpen(false)}>✕</button>
            </header>
            <div className="modal-body">
              <form className="form booking-form" onSubmit={submit}>
                <input type="hidden" name="room_id" value={selectedRoom || ''} />
                <fieldset className="board-types">
                  <legend>Board type</legend>
                  <label className="iconline"><input type="radio" name="type" value="Bed Only" required /> Bed Only</label>
                  <label className="iconline"><input type="radio" name="type" value="Bed and Breakfast" /> Bed and Breakfast</label>
                  <label className="iconline"><input type="radio" name="type" value="Half Board" /> Half Board</label>
                  <label className="iconline"><input type="radio" name="type" value="Full Board" /> Full Board</label>
                </fieldset>
                <div className="date-row"><input className="input" name="first_name" placeholder="First name" required /><input className="input" name="last_name" placeholder="Last name" required /></div>
                <input className="input" type="email" name="email" placeholder="Email" required />
                <input className="input" name="phone" placeholder="Phone" />
                <input className="input" name="nationality" placeholder="Nationality" required />
                <input className="input" name="id_document" placeholder="Identification card or passport" required />
                <div className="date-row">
                  <input className="input" type="date" name="start_date" required />
                  <input className="input" type="date" name="end_date" required />
                </div>
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
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <textarea className="input" name="notes" placeholder="Notes"></textarea>
                <button className="btn btn-primary" disabled={submitting} type="submit">{submitting ? 'Submitting…' : 'Send Request'}</button>
                {status && <p role="status">{status}</p>}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
