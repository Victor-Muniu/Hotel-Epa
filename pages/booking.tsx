import Head from 'next/head';
import { useState, useEffect } from 'react';
import type { Room } from '../lib/roomsData';

const SAMPLE_ROOMS: Room[] = [
  {
    id: '1',
    name: 'Deluxe Ocean View',
    slug: 'deluxe-ocean-view',
    description: 'Experience luxury with stunning ocean views. This spacious room features a king bed, marble bathroom, and a private balcony overlooking the sea.',
    capacity: 2,
    beds: 1,
    bathrooms: 1,
    size_m2: 45,
    price: 299,
    currency: 'USD',
    amenities: ['Ocean View', 'Air Conditioning', 'Free WiFi', 'Flat Screen TV', 'Mini Bar', 'Premium Toiletries'],
    images: [
      'https://cdn.builder.io/api/v1/image/assets%2F7efc470fe57f4b95b600ae20623acb83%2F1966ee8babb94437812b351eb3246c8a?format=webp&width=800'
    ],
    visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Family Suite',
    slug: 'family-suite',
    description: 'Perfect for families and groups. Two bedrooms, spacious living area, and modern amenities for a comfortable stay.',
    capacity: 4,
    beds: 2,
    bathrooms: 2,
    size_m2: 65,
    price: 399,
    currency: 'USD',
    amenities: ['Living Room', 'Kitchen', 'Two Bathrooms', 'Separate Bedrooms', 'Free WiFi', 'Climate Control'],
    images: [
      'https://cdn.builder.io/api/v1/image/assets%2F7efc470fe57f4b95b600ae20623acb83%2Ffa4d03405a5f4af6a0fb140a86159812?format=webp&width=800'
    ],
    visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Scenic Garden Room',
    slug: 'scenic-garden-room',
    description: 'Relaxing retreat with beautiful garden views. Queen bed, ensuite bathroom, and direct access to landscaped gardens.',
    capacity: 2,
    beds: 1,
    bathrooms: 1,
    size_m2: 38,
    price: 199,
    currency: 'USD',
    amenities: ['Garden View', 'Queen Bed', 'Ensuite Bath', 'Free WiFi', 'Work Desk', 'Safe'],
    images: [
      'https://cdn.builder.io/api/v1/image/assets%2F7efc470fe57f4b95b600ae20623acb83%2F9ae710d8f1ed4e49b9b727c33fb31d0f?format=webp&width=800'
    ],
    visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Twin Canopy Room',
    slug: 'twin-canopy-room',
    description: 'Charming room with twin beds and elegant canopy. Perfect for guests who prefer separate beds with upscale comfort.',
    capacity: 2,
    beds: 2,
    bathrooms: 1,
    size_m2: 35,
    price: 249,
    currency: 'USD',
    amenities: ['Twin Beds', 'Canopy Design', 'Shower', 'Free WiFi', 'Ceiling Fan', 'Modern Decor'],
    images: [
      'https://cdn.builder.io/api/v1/image/assets%2F7efc470fe57f4b95b600ae20623acb83%2F1b6d237b133545e0a2545b1e1c9b39ec?format=webp&width=800'
    ],
    visible: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function Booking() {
  const [rooms, setRooms] = useState<Room[]>(SAMPLE_ROOMS);
  const [selectedRoomId, setSelectedRoomId] = useState<string>('1');
  const [status, setStatus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

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
      if (res.ok) e.currentTarget.reset();
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
                {rooms.map((room) => (
                  <div
                    key={room.id}
                    className={`room-gallery-card ${
                      selectedRoomId === room.id ? 'active' : ''
                    }`}
                    onClick={() => setSelectedRoomId(room.id)}
                  >
                    {room.images && room.images.length > 0 && (
                      <div className="room-gallery-media">
                        <img
                          src={room.images[0]}
                          alt={room.name}
                          className="room-gallery-img"
                        />
                      </div>
                    )}
                    <div className="room-gallery-info">
                      <h3 className="room-gallery-name">{room.name}</h3>
                      <p className="room-gallery-meta">
                        {room.capacity} guest{room.capacity !== 1 ? 's' : ''}
                        {room.beds && ` • ${room.beds} bed${room.beds !== 1 ? 's' : ''}`}
                      </p>
                      <p className="room-gallery-price">
                        ${room.price} <span className="price-period">per night</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {selectedRoomId && (
                <div className="room-details-card">
                  {rooms.find((r) => r.id === selectedRoomId) && (
                    <>
                      <h3 className="room-details-title">
                        {rooms.find((r) => r.id === selectedRoomId)?.name}
                      </h3>
                      <p className="room-details-desc">
                        {rooms.find((r) => r.id === selectedRoomId)?.description}
                      </p>
                      {rooms.find((r) => r.id === selectedRoomId)?.amenities && (
                        <div className="room-details-amenities">
                          <h4 className="amenities-title">Amenities</h4>
                          <ul className="amenities-list">
                            {rooms
                              .find((r) => r.id === selectedRoomId)
                              ?.amenities.slice(0, 6)
                              .map((amenity, idx) => (
                                <li key={idx} className="amenity-item">
                                  ✓ {amenity}
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}
                    </>
                  )}
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
