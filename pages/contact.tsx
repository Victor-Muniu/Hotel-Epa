import Head from 'next/head';
import { useState } from 'react';
import type { GetServerSideProps } from 'next';

interface ContactProps { mapSrc: string; }

export default function Contact({ mapSrc }: ContactProps) {
  const [status, setStatus] = useState<null | 'ok' | 'error'>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget) as any);
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      setStatus(res.ok ? 'ok' : 'error');
    } catch (_) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="contact-page" aria-label="Contact us">
      <Head>
        <title>Contact Us | Epashikino Resort & Spa</title>
        <meta name="description" content="Get in touch with Epashikino Resort & Spa. Send us a message, call or email, and find us on Google Maps." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="contact-container">
        <header className="contact-header">
          <p className="contact-eyebrow">Contact us</p>
          <h1 className="contact-title">Get in Touch with Our Team</h1>
          <p className="contact-lead">We’re here to answer your questions, discuss your project, and help you find the best solutions for your software needs. Reach out to us, and let’s start building something great together.</p>
        </header>

        <div className="contact-grid">
          <section className="contact-card" aria-label="Let’s Talk About Your Project">
            <h3 className="contact-card-title">Let’s Talk About Your Project</h3>
            <form className="contact-form" onSubmit={onSubmit}>
              <label className="contact-field">
                <span className="contact-label">Name</span>
                <input className="input" type="text" name="name" placeholder="Your full name" required />
              </label>
              <label className="contact-field">
                <span className="contact-label">Email Address</span>
                <input className="input" type="email" name="email" placeholder="We’ll get back to you here" required />
              </label>
              <label className="contact-field">
                <span className="contact-label">Company Name</span>
                <input className="input" type="text" name="company" placeholder="Let us know who you represent" />
              </label>
              <label className="contact-field">
                <span className="contact-label">Subject</span>
                <input className="input" type="text" name="subject" placeholder="What’s this about?" required />
              </label>
              <label className="contact-field">
                <span className="contact-label">Message</span>
                <textarea className="input" name="message" placeholder="Tell us how we can help" rows={4} required />
              </label>
              <button className="btn btn-blue contact-submit" type="submit" disabled={loading}>{loading ? 'Sending…' : 'Send Message'}</button>
              {status && (
                <div className={`contact-status ${status === 'ok' ? 'ok' : 'error'}`} role="status" aria-live="polite">
                  {status === 'ok' ? 'Thanks! We received your message.' : 'Something went wrong. Please try again.'}
                </div>
              )}
            </form>
          </section>

          <aside className="contact-aside" aria-label="Prefer a Direct Approach?">
            <h3 className="contact-aside-title">Prefer a Direct Approach?</h3>
            <ul className="contact-lines">
              <li><span className="ico" aria-hidden>📞</span> +254 3224‑5904‑9801</li>
              <li><span className="ico" aria-hidden>✉️</span> contact@epashikino.com</li>
              <li><span className="ico" aria-hidden>⏰</span> Monday to Friday, 9 AM – 6 PM (GMT)</li>
            </ul>

            <figure className="contact-map">
              <iframe title="Epashikino Resort & Spa map" src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen></iframe>
            </figure>

            <div className="contact-office">
              <h4 className="office-title">Visit Our Office</h4>
              <p className="office-addr">123 SaaS Street, Innovation City, Techland 56789</p>
              <a className="btn btn-soft" href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('Epashikino Resort & Spa')}`} target="_blank" rel="noopener noreferrer"><span className="btn-dot" aria-hidden="true"></span>Get a Direction</a>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<ContactProps> = async () => {
  const place = encodeURIComponent('Epashikino Resort & Spa');
  const key = process.env.GOOGLE_MAPS_API_KEY;
  const mapSrc = key
    ? `https://www.google.com/maps/embed/v1/place?key=${key}&q=${place}`
    : `https://maps.google.com/maps?q=${place}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  return { props: { mapSrc } };
};
