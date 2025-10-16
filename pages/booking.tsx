import Head from 'next/head';
import Head from 'next/head';
import { useState } from 'react';

export default function Booking() {
  const [status, setStatus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const body = Object.fromEntries(form.entries());
    const res = await fetch('/api/booking', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const json = await res.json();
    setSubmitting(false);
    setStatus(json.message);
    if (res.ok) e.currentTarget.reset();
  }

  return (
    <>
      <Head>
        <title>Booking | Epashikino</title>
      </Head>
      <section className="section">
        <h1 className="section-title">Booking Request</h1>
        <form className="form" onSubmit={submit}>
          <select className="select" name="type" required defaultValue="room" aria-label="Booking type">
            <option value="room">Room</option>
            <option value="conference">Conference</option>
          </select>
          <input className="input" name="full_name" placeholder="Full name" required />
          <input className="input" type="email" name="email" placeholder="Email" required />
          <input className="input" name="phone" placeholder="Phone" />
          <input className="input" type="date" name="start_date" required />
          <input className="input" type="date" name="end_date" required />
          <input className="input" type="number" name="guests" placeholder="Guests" min={1} />
          <textarea className="input" name="notes" placeholder="Notes"></textarea>
          <button className="btn btn-primary" disabled={submitting} type="submit">{submitting ? 'Submitting…' : 'Send Request'}</button>
        </form>
        {status && <p role="status">{status}</p>}
      </section>
    </>
  );
}
