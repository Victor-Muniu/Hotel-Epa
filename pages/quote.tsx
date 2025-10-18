import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function QuotePage() {
  const [roomTypes, setRoomTypes] = useState<string[]>([]);
  const [numRooms, setNumRooms] = useState<number>(1);
  const [roomSelections, setRoomSelections] = useState<{ [key: number]: string }>({ 0: '' });
  const [status, setStatus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRoomTypes() {
      try {
        const res = await fetch('/api/room-types');
        const json = await res.json();
        if (json.types && json.types.length > 0) {
          setRoomTypes(json.types);
          setRoomSelections({ 0: json.types[0] });
        }
      } catch (_) {
      } finally {
        setLoading(false);
      }
    }
    fetchRoomTypes();
  }, []);

  const handleNumRoomsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = Math.max(1, parseInt(e.target.value) || 1);
    setNumRooms(num);
    const next: { [key: number]: string } = {};
    for (let i = 0; i < num; i++) next[i] = roomSelections[i] || (roomTypes[0] || 'double');
    setRoomSelections(next);
  };

  const handleRoomTypeChange = (idx: number, value: string) => {
    setRoomSelections((prev) => ({ ...prev, [idx]: value }));
  };

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    const form = new FormData(e.currentTarget);
    const body: any = Object.fromEntries(form.entries());
    body.room_types = JSON.stringify(roomSelections);
    body.inquiry_type = body.inquiry_type || 'room';

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const json = await res.json();
      setSubmitting(false);
      if (res.ok) {
        setStatus(json.message || 'Quote submitted.');
        e.currentTarget.reset();
      } else {
        setStatus(json.error || 'Failed to submit quote');
      }
    } catch {
      setSubmitting(false);
      setStatus('Failed to submit quote');
    }
  }

  return (
    <>
      <Head>
        <title>Request a Quote | Epashikino</title>
      </Head>
      <div className="booking-page">
        <div className="booking-container">
          <div className="booking-header">
            <h1 className="booking-title">Request a Quote</h1>
            <p className="booking-subtitle">Tell us your dates and preferences. We will send you the best available offer.</p>
          </div>

          <div className="booking-layout">
            <div className="form-section-container" style={{ width: '100%' }}>
              <form className="booking-form" onSubmit={submit}>
                <input type="hidden" name="type" value="quote" />

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">First Name *</label>
                    <input className="form-input" name="first_name" placeholder="Jane" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name *</label>
                    <input className="form-input" name="last_name" placeholder="Doe" required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input className="form-input" type="email" name="email" placeholder="you@example.com" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input className="form-input" name="phone" placeholder="+254..." />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Check-in Date *</label>
                    <input className="form-input" type="date" name="start_date" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Check-out Date *</label>
                    <input className="form-input" type="date" name="end_date" required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Adults *</label>
                    <input className="form-input" name="adults" type="number" min={1} defaultValue={2} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Children</label>
                    <input className="form-input" name="children" type="number" min={0} defaultValue={0} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Number of Rooms *</label>
                  <input className="form-input" name="rooms" type="number" min={1} value={numRooms} onChange={handleNumRoomsChange} required />
                </div>

                {numRooms > 0 && (
                  <div className="room-types-section">
                    <h4 className="room-types-label">Room Types</h4>
                    <div className="room-types-grid">
                      {Array.from({ length: numRooms }).map((_, idx) => (
                        <div key={idx} className="room-type-selector">
                          <label className="room-type-title">Room {idx + 1}</label>
                          <select className="form-input" value={roomSelections[idx] || ''} onChange={(e) => handleRoomTypeChange(idx, e.target.value)} disabled={loading || roomTypes.length === 0}>
                            <option value="">Select a room type</option>
                            {roomTypes.map((t) => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Notes</label>
                  <textarea className="form-input form-textarea" name="notes" rows={4} placeholder="Any special requests or questions..." />
                </div>

                <button className="booking-submit-btn" disabled={submitting} type="submit">
                  {submitting ? 'Submitting…' : 'Request Quote'}
                </button>

                {status && (
                  <div className={`booking-status ${status.toLowerCase().includes('success') || status.toLowerCase().includes('submitted') ? 'success' : 'error'}`}>
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
