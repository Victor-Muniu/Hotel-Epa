import { useState } from 'react';

interface Arrangement {
  name: string;
  capacity: number;
  description: string;
}

interface HallData {
  id: string;
  title: string;
  maxCapacity: number;
  images: string[];
  arrangements: Arrangement[];
  description: string;
  amenities: string[];
}

const HALL_DATA: Record<string, HallData> = {
  pkg1: {
    id: 'pkg1',
    title: 'Kilimanjaro',
    maxCapacity: 170,
    images: [
      'https://cdn.builder.io/api/v1/image/assets%2Fc2fe2cfdcc4f432da0d1d67f89e231a4%2F22e2311edffd4634a0a1b74e09843a11?format=webp&width=800',
      'https://cdn.builder.io/api/v1/image/assets%2Fc2fe2cfdcc4f432da0d1d67f89e231a4%2F10a5b3405c5845a29378bede4dfe85f0?format=webp&width=800'
    ],
    description: 'Premium conference hall with elegant décor and modern facilities. Perfect for corporate events, conferences, and large meetings.',
    amenities: ['Projector & Sound System', 'High-Speed Wi-Fi', 'Snacks & Hot Lunch', 'Tele-conference Ready'],
    arrangements: [
      {
        name: 'Theater',
        capacity: 170,
        description: 'Rows of chairs facing the stage. Maximum capacity configuration.'
      },
      {
        name: 'Classroom',
        capacity: 120,
        description: 'Rows of tables with chairs. Ideal for training and lectures.'
      },
      {
        name: 'U-Shape',
        capacity: 60,
        description: 'Tables arranged in U-shape facing center. Perfect for interactive discussions.'
      },
      {
        name: 'Boardroom',
        capacity: 40,
        description: 'Single rectangular table with chairs around. Ideal for executive meetings.'
      },
      {
        name: 'Banquet',
        capacity: 120,
        description: 'Round tables with chairs. Perfect for dinners and social events.'
      },
      {
        name: 'Cocktail',
        capacity: 170,
        description: 'Standing room with high-top tables. Great for receptions and networking.'
      },
      {
        name: 'Hollow Square',
        capacity: 80,
        description: 'Tables arranged in a square facing inward. Ideal for panel discussions.'
      },
      {
        name: 'Cabaret',
        capacity: 100,
        description: 'Rounds tables facing the stage. Balance between theater and dining.'
      }
    ]
  }
};

interface HallModalProps {
  hallId: string;
  onClose: () => void;
}

export default function HallModal({ hallId, onClose }: HallModalProps) {
  const hall = HALL_DATA[hallId];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedArrangement, setSelectedArrangement] = useState<Arrangement | null>(null);

  if (!hall) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % hall.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + hall.images.length) % hall.images.length);
  };

  return (
    <div className="hall-modal-overlay" onClick={onClose}>
      <div className="hall-modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="hall-modal-header">
          <h2 className="hall-modal-title">{hall.title}</h2>
          <button className="hall-modal-close" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        <div className="hall-modal-body">
          <div className="hall-gallery">
            <div className="gallery-carousel">
              <img
                src={hall.images[currentImageIndex]}
                alt={`${hall.title} - Image ${currentImageIndex + 1}`}
                className="gallery-image"
              />
              {hall.images.length > 1 && (
                <>
                  <button className="carousel-btn prev-btn" onClick={prevImage} aria-label="Previous image">
                    ‹
                  </button>
                  <button className="carousel-btn next-btn" onClick={nextImage} aria-label="Next image">
                    ›
                  </button>
                  <div className="carousel-indicators">
                    {hall.images.map((_, idx) => (
                      <span
                        key={idx}
                        className={`indicator ${idx === currentImageIndex ? 'active' : ''}`}
                        onClick={() => setCurrentImageIndex(idx)}
                        aria-label={`View image ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="hall-info">
              <div className="info-section">
                <h3 className="section-heading">Capacity</h3>
                <p className="capacity-badge">
                  <span className="capacity-number">{hall.maxCapacity}</span>
                  <span className="capacity-label">Maximum Guests</span>
                </p>
              </div>

              <div className="info-section">
                <h3 className="section-heading">Amenities</h3>
                <div className="amenities-list">
                  {hall.amenities.map((amenity, idx) => (
                    <div key={idx} className="amenity-item">
                      <span className="amenity-icon">✓</span>
                      <span className="amenity-text">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="hall-description">{hall.description}</p>
            </div>
          </div>

          <div className="arrangements-section">
            <h3 className="arrangements-heading">Seating Arrangements</h3>
            <p className="arrangements-intro">
              Kilimanjaro can be arranged in multiple configurations to suit your event needs. Select an arrangement to view capacity details.
            </p>

            <div className="arrangements-grid">
              {hall.arrangements.map((arrangement) => (
                <button
                  key={arrangement.name}
                  className={`arrangement-card ${selectedArrangement?.name === arrangement.name ? 'active' : ''}`}
                  onClick={() => setSelectedArrangement(arrangement)}
                >
                  <div className="arrangement-card-content">
                    <h4 className="arrangement-name">{arrangement.name}</h4>
                    <div className="arrangement-capacity">
                      <span className="capacity-number">{arrangement.capacity}</span>
                      <span className="capacity-label">guests</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {selectedArrangement && (
              <div className="arrangement-details">
                <h4 className="detail-title">{selectedArrangement.name} Configuration</h4>
                <p className="detail-text">{selectedArrangement.description}</p>
                <div className="detail-capacity">
                  <span className="label">Capacity:</span>
                  <span className="value">{selectedArrangement.capacity} people</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="hall-modal-footer">
          <button className="btn-inquiry" onClick={onClose}>
            Inquiry Now
          </button>
        </div>
      </div>
    </div>
  );
}
