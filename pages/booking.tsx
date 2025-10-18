import Head from 'next/head';
import { useState, useEffect } from 'react';

interface Room {
  id: string;
  name: string;
  capacity: number;
  beds: number;
  description: string;
  images: string[];
  amenities: string[];
}

const ROOMS: Room[] = [
  {
    id: '1',
    name: 'Deluxe Ocean View',
    capacity: 2,
    beds: 1,
    description: 'Experience luxury with stunning ocean views. This spacious room features a king bed, marble bathroom, and a private balcony overlooking the sea.',
    images: [
      'https://cdn.builder.io/api/v1/image/assets%2F7efc470fe57f4b95b600ae20623acb83%2F1966ee8babb94437812b351eb3246c8a?format=webp&width=800',
      'https://cdn.builder.io/api/v1/image/assets%2F7efc470fe57f4b95b600ae20623acb83%2Ffa4d03405a5f4af6a0fb140a86159812?format=webp&width=800',
      'https://cdn.builder.io/api/v1/image/assets%2F7efc470fe57f4b95b600ae20623acb83%2F1b6d237b133545e0a2545b1e1c9b39ec?format=webp&width=800',
    ],
    amenities: ['Ocean View', 'Air Conditioning', 'Free WiFi', 'Flat Screen TV', 'Mini Bar', 'Premium Toiletries'],
  },
  {
    id: '2',
    name: 'Family Suite',
    capacity: 4,
    beds: 2,
    description: 'Perfect for families and groups. Two bedrooms, spacious living area, and modern amenities for a comfortable stay.',
    images: [
      'https://cdn.builder.io/api/v1/image/assets%2F7efc470fe57f4b95b600ae20623acb83%2Ffa4d03405a5f4af6a0fb140a86159812?format=webp&width=800',
      'https://cdn.builder.io/api/v1/image/assets%2F7efc470fe57f4b95b600ae20623acb83%2F1966ee8babb94437812b351eb3246c8a?format=webp&width=800',
      'https://cdn.builder.io/api/v1/image/assets%2F7efc470fe57f4b95b600ae20623acb83%2F9ae710d8f1ed4e49b9b727c33fb31d0f?format=webp&width=800',
    ],
    amenities: ['Living Room', 'Kitchen', 'Two Bathrooms', 'Separate Bedrooms', 'Free WiFi', 'Climate Control'],
  },
  {
    id: '3',
    name: 'Scenic Garden Room',
    capacity: 2,
    beds: 1,
    description: 'Relaxing retreat with beautiful garden views. Queen bed, ensuite bathroom, and direct access to landscaped gardens.',
    images: [
      'https://cdn.builder.io/api/v1/image/assets%2F7efc470fe57f4b95b600ae20623acb83%2F9ae710d8f1ed4e49b9b727c33fb31d0f?format=webp&width=800',
      'https://cdn.builder.io/api/v1/image/assets%2F7efc470fe57f4b95b600ae20623acb83%2Ffa4d03405a5f4af6a0fb140a86159812?format=webp&width=800',
      'https://cdn.builder.io/api/v1/image/assets%2F7efc470fe57f4b95b600ae20623acb83%2F1966ee8babb94437812b351eb3246c8a?format=webp&width=800',
    ],
    amenities: ['Garden View', 'Queen Bed', 'Ensuite Bath', 'Free WiFi', 'Work Desk', 'Safe'],
  },
  {
    id: '4',
    name: 'Twin Canopy Room',
    capacity: 2,
    beds: 2,
    description: 'Charming room with twin beds and elegant canopy. Perfect for guests who prefer separate beds with upscale comfort.',
    images: [
      'https://cdn.builder.io/api/v1/image/assets%2F7efc470fe57f4b95b600ae20623acb83%2F1b6d237b133545e0a2545b1e1c9b39ec?format=webp&width=800',
      'https://cdn.builder.io/api/v1/image/assets%2F7efc470fe57f4b95b600ae20623acb83%2F9ae710d8f1ed4e49b9b727c33fb31d0f?format=webp&width=800',
      'https://cdn.builder.io/api/v1/image/assets%2F7efc470fe57f4b95b600ae20623acb83%2Ffa4d03405a5f4af6a0fb140a86159812?format=webp&width=800',
    ],
    amenities: ['Twin Beds', 'Canopy Design', 'Shower', 'Free WiFi', 'Ceiling Fan', 'Modern Decor'],
  },
];

export default function Booking() {
  const [selectedRoomId, setSelectedRoomId] = useState<string>('1');
  const [numRooms, setNumRooms] = useState<number>(1);
  const [roomSelections, setRoomSelections] = useState<{ [key: number]: string }>({ 0: '' });
  const [roomTypes, setRoomTypes] = useState<string[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  // Per-night board plan state
  const BOARD_TYPES = ['Bed Only', 'Bed and Breakfast', 'Half Board', 'Full Board'];
  const [defaultBoardType, setDefaultBoardType] = useState<string>('Bed Only');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [nights, setNights] = useState<string[]>([]);
  const [boardPlan, setBoardPlan] = useState<Record<string, string>>({});

  const toLocalDateString = (d: Date) => {
    const tzOffset = d.getTimezoneOffset() * 60000;
    return new Date(d.getTime() - tzOffset).toISOString().slice(0, 10);
  };
  const addDays = (dateStr: string, days: number) => {
    const d = new Date(dateStr + 'T00:00:00');
    d.setDate(d.getDate() + days);
    return toLocalDateString(d);
  };

  const [today, setToday] = useState<string>('');
  const [minCheckout, setMinCheckout] = useState<string>('');

  useEffect(() => {
    const t = toLocalDateString(new Date());
    setToday(t);
    setMinCheckout(addDays(t, 1));
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

  const selectedRoom = ROOMS.find(r => r.id === selectedRoomId);

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

  const handleNumRoomsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value) || 1;
    setNumRooms(num);
    const newSelections: { [key: number]: string } = {};
    for (let i = 0; i < num; i++) {
      newSelections[i] = roomSelections[i] || 'double';
    }
    setRoomSelections(newSelections);
  };

  const handleRoomTypeChange = (roomIndex: number, roomType: string) => {
    setRoomSelections(prev => ({
      ...prev,
      [roomIndex]: roomType
    }));
  };

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

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      setSubmitting(false);
      setStatus(json.message);
      if (res.ok) {
        e.currentTarget.reset();
      }
    } catch (error) {
      setSubmitting(false);
      setStatus('Error submitting booking. Please try again.');
    }
  }

  return (
    <>
      <Head>
        <title>Booking | Epashikino</title>
      </Head>
      <div className="booking-page">
        <div className="booking-container">
          <div className="booking-header">
            <h1 className="booking-title">Book Your Stay</h1>
            <p className="booking-subtitle">
              Select a room and fill in your details to make a reservation
            </p>
          </div>

          <div className="booking-layout">
            <div className="rooms-section">
              <div className="gallery-grid-2x2">
                {selectedRoom?.images.slice(0, 4).map((image, idx) => (
                  <div key={idx} className="gallery-cell">
                    <img
                      src={image}
                      alt={`Room ${idx + 1}`}
                      className="gallery-image"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="form-section-container">
              <form className="booking-form" onSubmit={submit}>
                <input type="hidden" name="type" value="room" />
                <input type="hidden" name="room_id" value={selectedRoomId} />


                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">First Name *</label>
                    <input
                      className="form-input"
                      name="first_name"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name *</label>
                    <input
                      className="form-input"
                      name="last_name"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input
                      className="form-input"
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input
                      className="form-input"
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Check-in Date *</label>
                    <input
                      className="form-input"
                      type="date"
                      name="start_date"
                      value={startDate}
                      min={today}
                      onChange={(e) => {
                        let v = e.target.value;
                        if (today && v && v < today) v = today;
                        setStartDate(v);
                        const nextMinCheckout = v ? addDays(v, 1) : addDays(today || toLocalDateString(new Date()), 1);
                        setMinCheckout(nextMinCheckout);
                        if (endDate && endDate <= v) {
                          setEndDate(nextMinCheckout);
                        }
                        const ds = enumerateNights(v, endDate && endDate > v ? endDate : nextMinCheckout);
                        setNights(ds);
                        applyDefaultToAll(defaultBoardType, ds);
                      }}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Check-out Date *</label>
                    <input
                      className="form-input"
                      type="date"
                      name="end_date"
                      value={endDate}
                      min={minCheckout}
                      onChange={(e) => {
                        let v = e.target.value;
                        const s = startDate || today;
                        const minC = s ? addDays(s, 1) : minCheckout;
                        if (v && s && v <= s) v = minC;
                        setEndDate(v);
                        const ds = enumerateNights(startDate || today, v);
                        setNights(ds);
                        applyDefaultToAll(defaultBoardType, ds);
                      }}
                      required
                    />
                  </div>
                </div>

                {nights.length > 0 && (
                  <div className="room-types-section">
                    <h4 className="room-types-label">Board plan per night</h4>
                    <div className="room-types-grid">
                      {nights.map((d) => (
                        <div key={d} className="room-type-selector">
                          <label className="room-type-title">{new Date(d).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</label>
                          <select className="form-input" value={boardPlan[d] || defaultBoardType} onChange={(e) => setBoardPlan((prev) => ({ ...prev, [d]: e.target.value }))}>
                            {BOARD_TYPES.map((t) => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Number of Adults *</label>
                    <input
                      className="form-input"
                      name="adults"
                      type="number"
                      placeholder="1"
                      min={1}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Number of Kids</label>
                    <input
                      className="form-input"
                      name="kids"
                      type="number"
                      placeholder="0"
                      min={0}
                      defaultValue="0"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Number of Rooms *</label>
                  <input
                    className="form-input"
                    name="num_rooms"
                    type="number"
                    placeholder="1"
                    min={1}
                    value={numRooms}
                    onChange={handleNumRoomsChange}
                    required
                  />
                </div>

                {numRooms > 0 && (
                  <div className="room-types-section">
                    <h4 className="room-types-label">Room Types</h4>
                    <div className="room-types-grid">
                      {Array.from({ length: numRooms }).map((_, idx) => (
                        <div key={idx} className="room-type-selector">
                          <label className="room-type-title">Room {idx + 1}</label>
                          <select
                            className="form-input"
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

                <div className="form-group">
                  <label className="form-label">Special Requests</label>
                  <textarea
                    className="form-input form-textarea"
                    name="notes"
                    placeholder="Tell us about any special requests or preferences..."
                    rows={4}
                  ></textarea>
                </div>

                <button
                  className="booking-submit-btn"
                  disabled={submitting}
                  type="submit"
                >
                  {submitting ? 'Processing...' : 'Complete Booking'}
                </button>

                {status && (
                  <div
                    className={`booking-status ${
                      status.includes('success') ||
                      status.includes('successfully') ||
                      status.includes('Thank you')
                        ? 'success'
                        : 'error'
                    }`}
                  >
                    {status}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
