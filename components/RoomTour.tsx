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
  const stageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => { setIndex(0); }, [open]);

  useEffect(() => {
    if (!open) return;
    if (playing) {
      timerRef.current = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), 4800);
    }
    return () => { if (timerRef.current) window.clearInterval(timerRef.current); };
  }, [open, playing, slides.length]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  function next() { setIndex((i) => (i + 1) % slides.length); }
  function prev() { setIndex((i) => (i - 1 + slides.length) % slides.length); }

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    let raf = 0;

    function onMove(e: MouseEvent | TouchEvent) {
      const rect = el.getBoundingClientRect();
      const clientX = 'touches' in e ? (e.touches[0]?.clientX ?? rect.left + rect.width/2) : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? (e.touches[0]?.clientY ?? rect.top + rect.height/2) : (e as MouseEvent).clientY;
      const mx = ((clientX - (rect.left + rect.width / 2)) / rect.width) || 0; // -0.5 -> 0.5
      const my = ((clientY - (rect.top + rect.height / 2)) / rect.height) || 0;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--mx', String(mx));
        el.style.setProperty('--my', String(my));
      });
    }

    function onLeave() {
      if (!el) return;
      el.style.setProperty('--mx', '0');
      el.style.setProperty('--my', '0');
    }

    el.addEventListener('mousemove', onMove);
    el.addEventListener('touchmove', onMove, { passive: true });
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('touchend', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('touchmove', onMove as EventListener);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('touchend', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="tour-overlay" role="dialog" aria-modal="true" aria-label="Room tour" onClick={onClose}>
      <div className="tour-panel" onClick={(e) => e.stopPropagation()}>
        <button className="tour-close" aria-label="Close" onClick={onClose}>✕</button>
        <div
          ref={stageRef}
          className="tour-stage"
          onMouseEnter={() => setPlaying(false)}
          onMouseLeave={() => setPlaying(true)}
        >
          {/* slides: each slide receives a custom --depth to create layered parallax */}
          {slides.map((s, i) => (
            <figure
              key={i}
              className={`tour-slide ${i === index ? 'active' : i === (index + 1) % slides.length ? 'next' : i === (index - 1 + slides.length) % slides.length ? 'prev' : 'bg'}`}
              style={{
                backgroundImage: `url(${s.src})`,
                // custom properties for CSS-driven parallax depth
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                ['--depth']: `${Math.max(0.35, 1 - Math.abs(i - index) * 0.18)}`
              } as React.CSSProperties}
            >
              <img src={s.src} alt={s.alt} />
            </figure>
          ))}

          <div className="tour-controls">
            <button className="tour-btn" onClick={prev} aria-label="Previous">‹</button>
            <button className="tour-btn" onClick={next} aria-label="Next">›</button>
          </div>

          <div className="tour-dots" aria-label="Slides">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`tour-dot ${i === index ? 'active' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
