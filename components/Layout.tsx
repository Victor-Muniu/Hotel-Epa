import Link from 'next/link';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  const year = String(new Date().getFullYear());
  return (
    <div className="site-wrapper">
      <header className="topbar" role="banner">
        <div className="topbar-inner">
          <div className="brand-cluster">
            <Link href="/" className="branding" aria-label="Epashikino Resort & Spa">
              <img
                className="brand-logo"
                src="https://cdn.builder.io/api/v1/image/assets%2F0d40b83ce86943258ffc5ae08b027f61%2F8984cd6c6da84e4680b3bfa7588de42d?format=webp&width=256"
                srcSet="https://cdn.builder.io/api/v1/image/assets%2F0d40b83ce86943258ffc5ae08b027f61%2F8984cd6c6da84e4680b3bfa7588de42d?format=webp&width=256 1x, https://cdn.builder.io/api/v1/image/assets%2F0d40b83ce86943258ffc5ae08b027f61%2F8984cd6c6da84e4680b3bfa7588de42d?format=webp&width=512 2x, https://cdn.builder.io/api/v1/image/assets%2F0d40b83ce86943258ffc5ae08b027f61%2F8984cd6c6da84e4680b3bfa7588de42d?format=webp&width=768 3x"
                alt="Epashikino logo"
                decoding="async"
                loading="eager"
              />
            </Link>
          </div>

          <nav className="primary-nav" aria-label="Primary">
            <Link className="nav-link" href="/">Home</Link>
            <Link className="nav-link" href="/rooms">Accommodation</Link>
            <Link className="nav-link" href="/conference">Conferences</Link>
            <Link className="nav-link" href="/attractions">Attractions</Link>
            <Link className="nav-link" href="/contact">Contact</Link>
          </nav>

        </div>
      </header>
      {children}
      <footer className="site-footer" aria-label="Site footer">
        <div className="footer-inner">
          <div className="footer-newsletter">
            <h3 className="newsletter-title">Sign up for our newsletter to receive our news, deals and special offers.</h3>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <label className="newsletter-field">
                <input className="newsletter-input" type="email" aria-label="Your Email Address" placeholder="Your Email Address" />
                <button className="newsletter-btn" aria-label="Subscribe">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </label>
            </form>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Explore</h4>
              <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/rooms">Accommodation</Link></li>
                <li><Link href="/conference">Conferences</Link></li>
                <li><Link href="/attractions">Attractions</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Offers &amp; Experiences</h4>
              <ul>
                <li><a href="#">Seasonal Packages</a></li>
                <li><a href="#">Wedding Packages</a></li>
                <li><a href="#">Adventure &amp; Nature Tours</a></li>
                <li><a href="#">Family Stays</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Support &amp; Company</h4>
              <ul>
                <li><Link href="/about">About Us</Link></li>
                <li><a href="#">How It Works</a></li>
                <li><Link href="/faq">FAQs</Link></li>
                <li><Link href="/contact">Contact Support</Link></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Legal</h4>
              <ul>
                <li><Link href="/terms_condition">Terms &amp; Conditions</Link></li>
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/cancellation">Cancellation Policy</Link></li>
                <li><a href="#">Cookie Preferences</a></li>
                <li><a href="#">Accessibility Statement</a></li>
                <li><a href="#">Guest Code of Conduct</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-copy">© <time className="copyright-year" suppressHydrationWarning dateTime={year}>{year}</time> Epashikino Resort &amp; Spa</div>
            <div className="footer-socials">
              <span>Follow us</span>
              <nav className="social-list" aria-label="Social links">
                <a href="#" aria-label="Facebook" className="social-link">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 12.07C22 6.58 17.52 2 12.04 2S2.08 6.58 2.08 12.07c0 4.99 3.66 9.13 8.44 9.93v-7.03H8.07V12.1h2.45V9.8c0-2.42 1.44-3.75 3.64-3.75 1.06 0 2.17.19 2.17.19v2.39h-1.22c-1.2 0-1.57.75-1.57 1.52v1.81h2.67l-.43 2.87h-2.24v7.03c4.78-.8 8.44-4.94 8.44-9.93z" fill="currentColor"/></svg>
                </a>
                <a href="#" aria-label="LinkedIn" className="social-link">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.98 3.5C4.98 4.6 4.12 5.5 3 5.5S1 4.6 1 3.5 1.86 1.5 3 1.5s1.98.9 1.98 2zm.02 4.5H1v14h4V8zM9 8h3.6v2h.05c.5-.95 1.72-1.95 3.55-1.95 3.8 0 4.5 2.5 4.5 6v8h-4v-7.2c0-1.7-.03-3.9-2.5-3.9-2.5 0-2.88 1.95-2.88 3.8V22H9V8z" fill="currentColor"/></svg>
                </a>
                <a href="#" aria-label="X" className="social-link">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 3L11 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M11 3l11 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
                <a href="#" aria-label="YouTube" className="social-link">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29.2 29.2 0 0 0 1 12a29.2 29.2 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29.2 29.2 0 0 0 23 12a29.2 29.2 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" fill="currentColor"/></svg>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
