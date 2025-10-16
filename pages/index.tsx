import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [availabilityMessage, setAvailabilityMessage] = useState<string | null>(null);
  const [roomTypes, setRoomTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [rates, setRates] = useState<{ bed_only: number | null; bed_and_breakfast: number | null; half_board: number | null; full_board: number | null } | null>(null);
  const [formData, setFormData] = useState({ checkIn: '', checkOut: '', guests: '02 Adults' });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/room-types');
        const json = await res.json();
        if (mounted && Array.isArray(json.types)) {
          setRoomTypes(json.types);
          if (json.types[0]) setSelectedType(json.types[0]);
        }
      } catch (_) {}
    })();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!selectedType) return;
      try {
        const res = await fetch(`/api/rates?type=${encodeURIComponent(selectedType)}`);
        const json = await res.json();
        if (mounted) setRates(json.rates || null);
      } catch (_) {}
    })();
    return () => { mounted = false; };
  }, [selectedType]);

  async function onCheckAvailability(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAvailabilityMessage(null);
    setAvailabilityLoading(true);
    const form = new FormData(e.currentTarget);
    const roomType = String(form.get('room_type') || '').trim();
    const checkIn = String(form.get('check_in') || '').trim();
    const checkOut = String(form.get('check_out') || '').trim();
    const rooms = Number(form.get('rooms') || 1) || 1;
    const children = Number(form.get('children') || 0) || 0;

    try {
      const res = await fetch('/api/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomType, checkIn, checkOut, rooms, children })
      });
      const json = await res.json();
      if (res.ok) {
        const msg = json.available
          ? `Available — ${json.remaining ?? ''}${json.remaining != null ? '/' : ''}${json.capacity ?? ''} rooms left`.trim()
          : 'Not available for the selected dates';
        setAvailabilityMessage(msg);
      } else {
        setAvailabilityMessage(json.error || 'Unable to check availability');
      }
    } catch (_) {
      setAvailabilityMessage('Unable to check availability');
    } finally {
      setAvailabilityLoading(false);
    }
  }

  const yearsInService = (startYear: number) => {
    const diff = new Date().getFullYear() - startYear;
    return diff > 0 ? diff : 0;
  };

  const years = yearsInService(2017);

  return (
    <div className="coffee-theme">
      <Head>
        <title>Epashikino Resort & Spa</title>
        <meta name="description" content="Epashikino Resort & Spa �� luxury rooms, conference facilities, and spa. Book your stay and events." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <section className="hero-banner" aria-label="Hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <h1 className="hero-title">Epashikino Resort & Spa.</h1>
            <p className="hero-subtitle">Your Ultimate Joyous Place</p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href="/rooms-list">Book Now</Link>
              <Link className="btn btn-outline" href="/rooms-list">View Rooms</Link>
            </div>
          </div>
          <aside className="hero-preview" aria-label="Highlight">
            <img src="https://cdn.builder.io/api/v1/image/assets%2F7efc470fe57f4b95b600ae20623acb83%2F11715a67bfec4a45b4e6c6f5ff24e7d3?format=webp&width=800" alt="Deluxe room at Epashikino Resort & Spa" loading="lazy" decoding="async" />
            <div className="hero-preview-caption">It’s not always easy for travellers to know – let our concierge guide the way.</div>
          </aside>
        </div>
        <div className="availability-bar" role="search" aria-label="Availability">
          <label className="availability-field">
            <span className="availability-icon" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 10V5m0 10v-3h14v3M5 5h6a2 2 0 0 1 2 2v3H5V7a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <span className="availability-text">
              <span className="availability-label">Room</span>
              <select className="availability-input" aria-label="Room" name="room_type" defaultValue={roomTypes[0] || ''}>
                {roomTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </span>
            <span className="availability-caret" aria-hidden="true"></span>
          </label>
          <label className="availability-field">
            <span className="availability-icon" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 3v2m8-2v2M4 7h12M5 11h3m4 0h3M5 15h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <span className="availability-text">
              <span className="availability-label">Check in</span>
              <input className="availability-input" type="date" aria-label="Check in" defaultValue="" />
            </span>
            <span className="availability-caret" aria-hidden="true"></span>
          </label>
          <label className="availability-field">
            <span className="availability-icon" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 3v2m8-2v2M4 7h12M5 11h3m4 0h3M5 15h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <span className="availability-text">
              <span className="availability-label">Check out</span>
              <input className="availability-input" type="date" aria-label="Check out" defaultValue="" />
            </span>
            <span className="availability-caret" aria-hidden="true"></span>
          </label>
          <label className="availability-field">
            <span className="availability-icon" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-6 5a6 6 0 1 1 12 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <span className="availability-text">
              <span className="availability-label">Guests</span>
              <select className="availability-input" aria-label="Guests" defaultValue="02 Adults">
                <option value="02 Adults">02 Adults</option>
                <option value="01 Adult">01 Adult</option>
                <option value="03 Adults">03 Adults</option>
              </select>
            </span>
            <span className="availability-caret" aria-hidden="true"></span>
          </label>
          <div className="availability-btn">
            <button type="button" className="btn btn-contrast" onClick={() => setAvailabilityOpen(true)}>Check Availability</button>
          </div>

          {availabilityOpen && (
            <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Check availability" onClick={() => setAvailabilityOpen(false)}>
              <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
                <header className="modal-header">
                  <h3>Check availability</h3>
                  <button className="modal-close" aria-label="Close" onClick={() => setAvailabilityOpen(false)}>✕</button>
                </header>
                <div className="modal-body">
                  <form className="form" onSubmit={onCheckAvailability}>
                    <label className="availability-field">
                      <span className="availability-icon" aria-hidden="true">
                        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 10V5m0 10v-3h14v3M5 5h6a2 2 0 0 1 2 2v3H5V7a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      <span className="availability-text">
                        <span className="availability-label">Room</span>
                        <select className="availability-input" aria-label="Room" name="room_type" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                          {roomTypes.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </span>
                      <span className="availability-caret" aria-hidden="true"></span>
                    </label>

                    <label className="availability-field">
                      <span className="availability-icon" aria-hidden="true">
                        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 3v2m8-2v2M4 7h12M5 11h3m4 0h3M5 15h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      <span className="availability-text">
                        <span className="availability-label">Check in</span>
                        <input className="availability-input" type="date" aria-label="Check in" name="check_in" defaultValue="" />
                      </span>
                      <span className="availability-caret" aria-hidden="true"></span>
                    </label>

                    <label className="availability-field">
                      <span className="availability-icon" aria-hidden="true">
                        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 3v2m8-2v2M4 7h12M5 11h3m4 0h3M5 15h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      <span className="availability-text">
                        <span className="availability-label">Check out</span>
                        <input className="availability-input" type="date" aria-label="Check out" name="check_out" defaultValue="" />
                      </span>
                      <span className="availability-caret" aria-hidden="true"></span>
                    </label>

                    <label className="availability-field">
                      <span className="availability-icon" aria-hidden="true">
                        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-6 5a6 6 0 1 1 12 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      <span className="availability-text">
                        <span className="availability-label">Guests</span>
                        <select className="availability-input" aria-label="Guests" defaultValue="02 Adults">
                          <option value="02 Adults">02 Adults</option>
                          <option value="01 Adult">01 Adult</option>
                          <option value="03 Adults">03 Adults</option>
                        </select>
                      </span>
                      <span className="availability-caret" aria-hidden="true"></span>
                    </label>

                    {rates && (
                      <label className="availability-field">
                        <span className="availability-icon" aria-hidden="true">
                          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 7h12v6H4z M3 15h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                        <span className="availability-text">
                          <span className="availability-label">Rates</span>
                          <span className="availability-input" aria-live="polite">
                            {rates.bed_only != null && <span>Bed Only: {rates.bed_only}</span>} {rates.bed_and_breakfast != null && <span> · B&amp;B: {rates.bed_and_breakfast}</span>} {rates.half_board != null && <span> · Half Board: {rates.half_board}</span>} {rates.full_board != null && <span> · Full Board: {rates.full_board}</span>}
                          </span>
                        </span>
                        <span className="availability-caret" aria-hidden="true"></span>
                      </label>
                    )}

                    <label className="availability-field">
                      <span className="availability-icon" aria-hidden="true">
                        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 9h12M6 6h8m-9 7h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      <span className="availability-text">
                        <span className="availability-label">Rooms</span>
                        <input className="availability-input" type="number" name="rooms" min={1} defaultValue={1} aria-label="Rooms" />
                      </span>
                      <span className="availability-caret" aria-hidden="true"></span>
                    </label>

                    <label className="availability-field">
                      <span className="availability-icon" aria-hidden="true">
                        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-6 5a6 6 0 1 1 12 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      <span className="availability-text">
                        <span className="availability-label">Children</span>
                        <input className="availability-input" type="number" name="children" min={0} defaultValue={0} aria-label="Children" />
                      </span>
                      <span className="availability-caret" aria-hidden="true"></span>
                    </label>

                    <div className="modal-actions">
                      <button className="btn btn-outline" type="button" onClick={() => setAvailabilityOpen(false)}>Cancel</button>
                      <button className="btn btn-primary" type="submit" disabled={availabilityLoading}>{availabilityLoading ? 'Searching…' : 'Search'}</button>
                    </div>
                    {availabilityMessage && <p role="status">{availabilityMessage}</p>}
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="about-section" aria-label="About">
        <div className="about-panel">
          <div className="about-inner">
            <div className="about-head-column">
              <h2 className="about-heading"><span className="about-heading-line">About</span><span className="about-heading-line">Epashikino</span></h2>
            </div>
            <div className="about-copy">
              <p className="about-description">A distinctive feature of Epashikino Resort is our spacious &amp; tastefully furnished deluxe suites each with its own theme complementing the guest&apos;s mood of either business or leisure. The private balconies provide a breath taking, awe inspiring view of flamingoes foraging for food in the Lake Elementaita with "sleeping warrior" (a rocky mountain formation resembling a sleeping Moran) in the background. In the distance, steam from hot springs slowly rise above the horizon dancing in the rays of the tropical sun.</p>
              <Link className="btn btn-soft" href="/rooms"><span className="btn-dot" aria-hidden="true"></span>Explore More</Link>
              <svg className="about-doodle" viewBox="0 0 320 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M10 86c48-28 96 28 144 0s96-28 168 0" stroke="currentColor" strokeWidth="2" strokeDasharray="4 8" opacity=".35"/>
                <path d="M180 108c10-16 30-16 40 0" stroke="currentColor" strokeWidth="2" opacity=".45"/>
                <path d="M200 108c6-10 18-10 24 0" stroke="currentColor" strokeWidth="2" opacity=".45"/>
                <g transform="translate(200,108)">
                  <path d="M6 0c0 6 6 10 12 10s12-4 12-10" fill="none" stroke="currentColor" strokeWidth="2" opacity=".9"/>
                </g>
                <path d="M210 118h36" stroke="currentColor" strokeWidth="2" opacity=".4"/>
              </svg>
            </div>
            <div className="about-gallery" aria-label="Gallery">
              <figure className="about-frame">
                <img src="https://cdn.builder.io/api/v1/image/assets%2F6c3df5a7a3f7442e951c494b89c27332%2F781707577b0147af9c231ec692cdc21b?format=webp&width=800" alt="Elegant room interior" loading="lazy" decoding="async" />
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section className="why-section" aria-label="Why Book With Us">
        <div className="why-inner">
          <div className="why-media">
            <div className="media-card">
              <img src="https://cdn.builder.io/api/v1/image/assets%2F6c3df5a7a3f7442e951c494b89c27332%2Fe46ddac554334ce183438f24777b4479?format=webp&width=800" alt="Resort house exterior" />
              <span className="years-badge" role="button" aria-label={years + ' years of service'}><strong>{years}</strong><small>Years<br/>of Services</small></span>
            </div>
          </div>

          <div className="why-panel">
            <h2 className="why-title">Why Book With Us</h2>
            <hr className="why-divider" />
            <h4 className="why-subtitle">Every stay, a better experience</h4>
            <p className="why-lead">From personalized service to luxurious amenities, discover the unmatched benefits that make every booking with us a five-star experience.</p>

            <div className="why-features">
              <div className="feature">
                <svg className="feature-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16v10H4z" fill="none" stroke="currentColor" strokeWidth="1.4"/></svg>
                <div>
                  <strong>Luxury Bedding &amp; Pillows in Every Room</strong>
                  <p>Enjoy seamless, intuitive navigation and real-time availability. Reserve your perfect stay in just a few taps.</p>
                </div>
              </div>

              <div className="feature">
                <svg className="feature-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h18v10H3z" fill="none" stroke="currentColor" strokeWidth="1.4"/></svg>
                <div>
                  <strong>Conference &amp; Meeting Room Access</strong>
                  <p>Host your events in fully equipped meeting spaces with scenic views and premium service.</p>
                </div>
              </div>

              <div className="feature">
                <svg className="feature-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="1.4"/></svg>
                <div>
                  <strong>Easy-to-Use Booking System</strong>
                  <p>Enjoy seamless, intuitive navigation and real-time availability. Reserve your perfect stay in just a few taps.</p>
                </div>
              </div>

              <div className="feature">
                <svg className="feature-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16" stroke="currentColor" strokeWidth="1.4"/></svg>
                <div>
                  <strong>High-Speed Wi-Fi Throughout</strong>
                  <p>Stay connected anywhere on the property �� whether you're working remotely or streaming by the pool.</p>
                </div>
              </div>
            </div>

            <div className="why-cta">
              <a className="btn btn-soft btn-cream" href="/rooms">Explore More</a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
