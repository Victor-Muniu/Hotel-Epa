import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getRooms, checkRoomAvailability } from '../lib/roomsData';
import type { Room } from '../lib/roomsData';

export default function RoomsList() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    start_date: '',
    end_date: '',
    guests: '1',
    children: '0'
  });

  useEffect(() => {
    async function loadRooms() {
      setLoading(true);
      const data = await getRooms();
      setRooms(data);
      setLoading(false);
    }
    loadRooms();
  }, []);

  function openBooking(roomId: string) {
    setSelectedRoomId(roomId);
    setBookingOpen(true);
    setStatus(null);
  }

  function closeBooking() {
    setBookingOpen(false);
    setSelectedRoomId(null);
    setStatus(null);
    setFormData({ start_date: '', end_date: '', guests: '1', children: '0' });
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);
    setSubmitting(true);

    try {
      const form = new FormData(e.currentTarget);
      const body: any = Object.fromEntries(form.entries());
      body.room_id = selectedRoomId;

      const res = await fetch('/api/booking', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(body) 
      });
      const json = await res.json();
      
      setStatus(json.message);
      if (res.ok) {
        (e.target as HTMLFormElement).reset();
        setFormData({ start_date: '', end_date: '', guests: '1', children: '0' });
        setTimeout(() => closeBooking(), 2000);
      }
    } catch (error) {
      setStatus('Error submitting booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const selectedRoom = rooms.find(r => r.id === selectedRoomId);

  return (
    <>
      <Head>
        <title>Available Rooms | Epashikino Resort & Spa</title>
        <meta name="description" content="Browse our premium rooms and book your stay at Epashikino Resort & Spa." />
      </Head>

      <main className="listing-page">
        <div className="listing-container">
          <header className="listing-header">
            <h1 className="listing-eyebrow">Epashikino Resort & Spa</h1>
            <h2 className="listing-title">Available Rooms & Suites</h2>
            <p className="listing-subtitle">Choose from our collection of comfortable and luxurious accommodations</p>
          </header>

          <section className="stay-section" aria-label="Available rooms">
            {loading ? (
              <p className="section-title">Loading rooms...</p>
            ) : rooms.length === 0 ? (
              <p className="section-title">No rooms available at the moment.</p>
            ) : (
              <>
                <h3 className="section-heading">Select Your Room</h3>
                <div className="rooms-grid">
                  {rooms.map((room) => (
                    <article key={room.id} className="room-card">
                      {room.images && room.images.length > 0 && (
                        <img className="room-img" src={room.images[0]} alt={room.name} />
                      )}
                      <div className="room-info">
                        <h4 className="room-title">{room.name}</h4>
                        <p className="room-description">{room.description}</p>
                        <div className="room-meta">
                          {room.capacity && (
                            <span className="meta-item">
                              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/></svg>
                              Up to {room.capacity} guests
                            </span>
                          )}
                          {room.beds && (
                            <span className="meta-item">
                              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12h18M4 10h16a2 2 0 012 2v4H2v-4a2 2 0 012-2z" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
                              {room.beds} bed{room.beds > 1 ? 's' : ''}
                            </span>
                          )}
                          {room.size_m2 && (
                            <span className="meta-item">
                              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
                              {room.size_m2} m²
                            </span>
                          )}
                        </div>
                        
                        {room.amenities && room.amenities.length > 0 && (
                          <ul className="amenities-list">
                            {room.amenities.slice(0, 6).map((amenity, idx) => (
                              <li key={idx} className="amenity-item">
                                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor"/></svg>
                                {amenity}
                              </li>
                            ))}
                          </ul>
                        )}

                        <div className="room-footer">
                          <div className="room-price">
                            <span className="price-label">from</span>
                            <span className="price-amount">${room.price.toFixed(2)}</span>
                            <span className="price-period">/night</span>
                          </div>
                          <button 
                            className="btn btn-primary" 
                            type="button" 
                            onClick={() => openBooking(room.id)}
                          >
                            Make your reservations
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}
          </section>

          <nav className="listing-bottom-nav" aria-label="Navigation">
            <Link className="btn btn-outline" href="/">Back to Home</Link>
          </nav>
        </div>
      </main>

      {bookingOpen && selectedRoom && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Booking form" onClick={closeBooking}>
          <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
            <header className="modal-header">
              <div>
                <h3>{selectedRoom.name}</h3>
                <p className="modal-subtitle">${selectedRoom.price.toFixed(2)} per night</p>
              </div>
              <button className="modal-close" aria-label="Close" onClick={closeBooking}>✕</button>
            </header>
            <div className="modal-body">
              <form className="form booking-form" onSubmit={submit}>
                <div className="form-section">
                  <label className="form-label">Check-in Date *</label>
                  <input 
                    className="input" 
                    type="date" 
                    name="start_date" 
                    required 
                    value={formData.start_date}
                    onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                  />
                </div>

                <div className="form-section">
                  <label className="form-label">Check-out Date *</label>
                  <input 
                    className="input" 
                    type="date" 
                    name="end_date" 
                    required 
                    value={formData.end_date}
                    onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                  />
                </div>

                <div className="form-row">
                  <div className="form-section">
                    <label className="form-label">Adults *</label>
                    <input 
                      className="input" 
                      type="number" 
                      name="guests" 
                      min="1" 
                      required 
                      value={formData.guests}
                      onChange={(e) => setFormData({...formData, guests: e.target.value})}
                    />
                  </div>
                  <div className="form-section">
                    <label className="form-label">Children</label>
                    <input 
                      className="input" 
                      type="number" 
                      name="children" 
                      min="0" 
                      value={formData.children}
                      onChange={(e) => setFormData({...formData, children: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-section">
                  <label className="form-label">Board Type</label>
                  <select className="input" name="type" defaultValue="Bed Only">
                    <option value="Bed Only">Bed Only</option>
                    <option value="Bed and Breakfast">Bed and Breakfast</option>
                    <option value="Half Board">Half Board</option>
                    <option value="Full Board">Full Board</option>
                  </select>
                </div>

                <div className="form-section">
                  <label className="form-label">First Name *</label>
                  <input className="input" name="first_name" placeholder="First name" required />
                </div>

                <div className="form-section">
                  <label className="form-label">Last Name *</label>
                  <input className="input" name="last_name" placeholder="Last name" required />
                </div>

                <div className="form-section">
                  <label className="form-label">Email *</label>
                  <input className="input" type="email" name="email" placeholder="Email" required />
                </div>

                <div className="form-section">
                  <label className="form-label">Phone</label>
                  <input className="input" name="phone" placeholder="Phone" />
                </div>

                <div className="form-section">
                  <label className="form-label">Special Requests</label>
                  <textarea className="input" name="notes" placeholder="Any special requests..." rows={3}></textarea>
                </div>

                <button className="btn btn-primary booking-btn" disabled={submitting} type="submit">
                  {submitting ? 'Processing...' : 'Confirm Booking'}
                </button>
                
                {status && (
                  <div className={`booking-status ${status.includes('confirmed') || status.includes('Booking confirmed') ? 'success' : 'error'}`}>
                    {status}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
