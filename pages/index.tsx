import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [availabilityMessage, setAvailabilityMessage] = useState<string | null>(null);
  const [availabilityStatus, setAvailabilityStatus] = useState<'success' | 'error' | null>(null);
  const [roomTypes, setRoomTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [rates, setRates] = useState<{ bed_only: number | null; bed_and_breakfast: number | null; half_board: number | null; full_board: number | null } | null>(null);
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    adults: '2',
    children: '0',
    numRooms: '1',
    roomTypes: ['double']
  });

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

  function updateRoomType(index: number, value: string) {
    const newRoomTypes = [...formData.roomTypes];
    newRoomTypes[index] = value;
    setFormData({ ...formData, roomTypes: newRoomTypes });
  }

  function updateNumRooms(num: number) {
    const newNum = Math.max(1, num);
    const currentTypes = formData.roomTypes;
    let newRoomTypes = [...currentTypes];

    if (newNum > currentTypes.length) {
      newRoomTypes = [...currentTypes, ...Array(newNum - currentTypes.length).fill('double')];
    } else {
      newRoomTypes = currentTypes.slice(0, newNum);
    }

    setFormData({ ...formData, numRooms: String(newNum), roomTypes: newRoomTypes });
  }

  async function onCheckAvailability(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAvailabilityMessage(null);
    setAvailabilityStatus(null);
    setAvailabilityLoading(true);

    const checkIn = formData.checkIn;
    const checkOut = formData.checkOut;
    const adults = Number(formData.adults) || 1;
    const children = Number(formData.children) || 0;
    const numRooms = Number(formData.numRooms) || 1;

    try {
      const res = await fetch('/api/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomType: selectedType,
          checkIn,
          checkOut,
          rooms: numRooms,
          children,
          adults,
          roomTypes: formData.roomTypes
        })
      });
      const json = await res.json();
      if (res.ok) {
        if (json.available) {
          setAvailabilityMessage('Unit is available');
          setAvailabilityStatus('success');
        } else {
          setAvailabilityMessage('Not available for the selected dates');
          setAvailabilityStatus('error');
        }
      } else {
        setAvailabilityMessage(json.error || 'Unable to check availability');
        setAvailabilityStatus('error');
      }
    } catch (_) {
      setAvailabilityMessage('Unable to check availability');
      setAvailabilityStatus('error');
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
              <Link className="btn btn-primary" href="/rooms">Make your reservations</Link>
              <Link className="btn btn-outline" href="/explore_rooms">View Rooms</Link>
            </div>
          </div>
          <aside className="hero-preview" aria-label="Highlight">
            <img src="https://cdn.builder.io/api/v1/image/assets%2F7efc470fe57f4b95b600ae20623acb83%2F11715a67bfec4a45b4e6c6f5ff24e7d3?format=webp&width=800" alt="Deluxe room at Epashikino Resort & Spa" loading="lazy" decoding="async" />
            <div className="hero-preview-caption">It’s not always easy for travellers to know – let our concierge guide the way.</div>
          </aside>
        </div>
        <form className="availability-bar" onSubmit={onCheckAvailability} role="search" aria-label="Availability">
          <label className="availability-field">
            <span className="availability-icon" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 10V5m0 10v-3h14v3M5 5h6a2 2 0 0 1 2 2v3H5V7a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <span className="availability-text">
              <span className="availability-label">Room</span>
              <select className="availability-input" aria-label="Room" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
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
              <input
                className="availability-input"
                type="date"
                aria-label="Check in"
                value={formData.checkIn}
                onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </span>
            <span className="availability-caret" aria-hidden="true"></span>
          </label>
          <label className="availability-field">
            <span className="availability-icon" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 3v2m8-2v2M4 7h12M5 11h3m4 0h3M5 15h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <span className="availability-text">
              <span className="availability-label">Check out</span>
              <input
                className="availability-input"
                type="date"
                aria-label="Check out"
                value={formData.checkOut}
                onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                min={formData.checkIn || new Date().toISOString().split('T')[0]}
                required
              />
            </span>
            <span className="availability-caret" aria-hidden="true"></span>
          </label>
          <label className="availability-field">
            <span className="availability-icon" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-6 5a6 6 0 1 1 12 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <span className="availability-text">
              <span className="availability-label">Adults</span>
              <input
                className="availability-input"
                type="number"
                min="1"
                aria-label="Adults"
                value={formData.adults}
                onChange={(e) => setFormData({ ...formData, adults: e.target.value })}
                placeholder="Adults"
              />
            </span>
            <span className="availability-caret" aria-hidden="true"></span>
          </label>

          <label className="availability-field">
            <span className="availability-icon" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-6 5a6 6 0 1 1 12 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <span className="availability-text">
              <span className="availability-label">Children</span>
              <input
                className="availability-input"
                type="number"
                min="0"
                aria-label="Children"
                value={formData.children}
                onChange={(e) => setFormData({ ...formData, children: e.target.value })}
                placeholder="Children"
              />
            </span>
            <span className="availability-caret" aria-hidden="true"></span>
          </label>

          <label className="availability-field">
            <span className="availability-icon" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 9h12M6 6h8m-9 7h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <span className="availability-text">
              <span className="availability-label">Rooms</span>
              <input
                className="availability-input"
                type="number"
                min="1"
                max="10"
                aria-label="Number of rooms"
                value={formData.numRooms}
                onChange={(e) => updateNumRooms(Number(e.target.value))}
                placeholder="Rooms"
              />
            </span>
            <span className="availability-caret" aria-hidden="true"></span>
          </label>

          <div className="availability-btn">
            <button type="submit" className="btn btn-primary" disabled={availabilityLoading}>
              {availabilityLoading ? 'Searching…' : 'Check Availability'}
            </button>
          </div>

          {Number(formData.numRooms) > 1 && (
            <div className="availability-room-types">
              <h4 className="room-types-title">Room Types</h4>
              <div className="room-types-grid">
                {formData.roomTypes.map((roomType, index) => (
                  <label key={index} className="room-type-field">
                    <span className="room-type-label">Room {index + 1}</span>
                    <select
                      className="room-type-input"
                      value={roomType}
                      onChange={(e) => updateRoomType(index, e.target.value)}
                      aria-label={`Room ${index + 1} type`}
                    >
                      {roomTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </label>
                ))}
              </div>
            </div>
          )}

          {availabilityMessage && (
            <div className={`availability-result ${availabilityStatus === 'success' ? 'result-success' : 'result-error'}`} role="status" aria-live="polite">
              <div className="result-content">
                <span className="result-message">{availabilityMessage}</span>
                {availabilityStatus === 'success' && (
                  <Link href="/booking" className="btn btn-primary btn-small">
                    Proceed to Book
                  </Link>
                )}
              </div>
            </div>
          )}
        </form>
      </section>

      <section className="about-section" aria-label="About">
        <div className="about-panel">
          <div className="about-inner">
            <div className="about-head-column">
              <h2 className="about-heading"><span className="about-heading-line">About</span><span className="about-heading-line">Epashikino</span></h2>
            </div>
            <div className="about-copy">
              <p className="about-description">A distinctive feature of Epashikino Resort is our spacious &amp; tastefully furnished deluxe suites each with its own theme complementing the guest&apos;s mood of either business or leisure. The private balconies provide a breath taking, awe inspiring view of flamingoes foraging for food in the Lake Elementaita with "sleeping warrior" (a rocky mountain formation resembling a sleeping Moran) in the background. In the distance, steam from hot springs slowly rise above the horizon dancing in the rays of the tropical sun.</p>
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

          </div>
        </div>
      </section>

    </div>
  );
}
