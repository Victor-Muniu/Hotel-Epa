import { useEffect, useRef, useState } from 'react';

type Slide = { src: string; alt: string };

interface RoomTourProps {
  slides: Slide[];
  open: boolean;
  onClose: () => void;
}

export default function RoomTour({ slides, open, onClose }: RoomTourProps) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const timerRef = useRef<number | null>(null);

  useEffect(() => { setIndex(0); }, [open]);

  useEffect(() => {
    if (!open) return;
    if (timerRef.current) window.clearInterval(timerRef.current);
    if (playing) {
      // 15 seconds per slide as requested
      timerRef.current = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    }
    return () => { if (timerRef.current) window.clearInterval(timerRef.current); };
  }, [open, playing, slides.length]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % slides.length);
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + slides.length) % slides.length);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, slides.length]);

  function next() { setIndex((i) => (i + 1) % slides.length); }
  function prev() { setIndex((i) => (i - 1 + slides.length) % slides.length); }

  if (!open) return null;

  return (
    <div className="tour-overlay" role="dialog" aria-modal="true" aria-label="Room tour" onClick={onClose}>
      <div className="tour-panel" onClick={(e) => e.stopPropagation()}>
        <button className="tour-close" aria-label="Close" onClick={onClose}>✕</button>
        <div
          className="tour-stage"
          onMouseEnter={() => setPlaying(false)}
          onMouseLeave={() => setPlaying(true)}
        >
          <div className="tour-track" style={{ transform: `translateX(-${index * 100}%)` }}>
            {slides.map((s, i) => (
              <figure
                key={i}
                className="tour-slide"
                style={{ backgroundImage: `url(${s.src})` }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${slides.length}`}
              >
                <img src={s.src} alt={s.alt} />
              </figure>
            ))}
          </div>

          <div className="tour-controls">
            <button className="tour-btn" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous">‹</button>
            <button className="tour-btn" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next">›</button>
          </div>

          <div className="tour-dots" aria-label="Slides">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`tour-dot ${i === index ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setIndex(i); }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
