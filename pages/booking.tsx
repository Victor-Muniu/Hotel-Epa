import Head from 'next/head';
import { useState } from 'react';

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
  const [status, setStatus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const selectedRoom = ROOMS.find(r => r.id === selectedRoomId);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const body = Object.fromEntries(form.entries());
    
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
              <h2 className="section-label">Select a Room</h2>
              <div className="rooms-gallery">
                {ROOMS.map((room) => (
                  <div
                    key={room.id}
                    className={`room-gallery-card ${
                      selectedRoomId === room.id ? 'active' : ''
                    }`}
                    onClick={() => setSelectedRoomId(room.id)}
                  >
                    <div className="room-gallery-media">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="room-gallery-img"
                      />
                    </div>
                    <div className="room-gallery-info">
                      <h3 className="room-gallery-name">{room.name}</h3>
                      <p className="room-gallery-meta">
                        {room.capacity} guest{room.capacity !== 1 ? 's' : ''} • {room.beds} bed{room.beds !== 1 ? 's' : ''}
                      </p>
                      <p className="room-gallery-price">
                        ${room.price} <span className="price-period">per night</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {selectedRoom && (
                <div className="room-details-card">
                  <h3 className="room-details-title">{selectedRoom.name}</h3>
                  <p className="room-details-desc">{selectedRoom.description}</p>
                  <div className="room-details-amenities">
                    <h4 className="amenities-title">Amenities</h4>
                    <ul className="amenities-list">
                      {selectedRoom.amenities.map((amenity, idx) => (
                        <li key={idx} className="amenity-item">
                          ✓ {amenity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="form-section-container">
              <h2 className="section-label">Booking Details</h2>
              <form className="booking-form" onSubmit={submit}>
                <input type="hidden" name="type" value="room" />
                <input type="hidden" name="room_id" value={selectedRoomId} />

                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    className="form-input"
                    name="full_name"
                    placeholder="John Doe"
                    required
                  />
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
                    <label className="form-label">Phone</label>
                    <input
                      className="form-input"
                      name="phone"
                      placeholder="+1 (555) 000-0000"
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
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Check-out Date *</label>
                    <input
                      className="form-input"
                      type="date"
                      name="end_date"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Number of Guests *</label>
                  <input
                    className="form-input"
                    name="guests"
                    type="number"
                    placeholder="1"
                    min={1}
                    required
                  />
                </div>

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
