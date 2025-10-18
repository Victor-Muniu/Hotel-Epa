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
  sessionDetails?: {
    halfDay: string[];
    fullDay: string[];
  };
}

interface QuoteFormData {
  organizationName: string;
  email: string;
  phoneNumber: string;
  conferenceStartDate: string;
  conferenceEndDate: string;
  packageType: string;
}

export const HALL_DATA: Record<string, HallData> = {
  pkg1: {
    id: 'pkg1',
    title: 'Kilimanjaro',
    maxCapacity: 170,
    images: [
      'https://cdn.builder.io/api/v1/image/assets%2Fc2fe2cfdcc4f432da0d1d67f89e231a4%2F22e2311edffd4634a0a1b74e09843a11?format=webp&width=800',
      'https://cdn.builder.io/api/v1/image/assets%2Fc2fe2cfdcc4f432da0d1d67f89e231a4%2F10a5b3405c5845a29378bede4dfe85f0?format=webp&width=800'
    ],
    description: 'Premium conference hall with elegant décor and modern facilities. Perfect for corporate events, conferences, and large meetings.',
    amenities: [
      'Writing materials (provided)',
      'Complementary Wi‑Fi',
      'Water available (see session inclusions)',
      'Projector access'
    ],
    sessionDetails: {
      halfDay: [
        'Writing materials (provided)',
        'Complementary Wi‑Fi',
        'Water for one session',
        'Projector access',
        '10:00 — Tea & snacks',
        'Lunch buffet (separate from tea & snacks)'
      ],
      fullDay: [
        'Writing materials (provided)',
        'Complementary Wi‑Fi',
        'Water for both sessions',
        'Projector access',
        '10:00 — Tea & snacks',
        '16:00 — Tea & snacks',
        'Lunch buffet (separate from tea & snacks)',
        'PA system (available during the 16:00 session)'
      ]
    },
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
  },
  pkg2: {
    id: 'pkg2',
    title: 'Menengai',
    maxCapacity: 80,
    images: [
      'https://cdn.builder.io/api/v1/image/assets%2F940ebba695114a2a9f60c6ca6acee801%2Ffc47cbdcd5c4492ab8ae3ff13ca152f5?format=webp&width=1200',
      'https://cdn.builder.io/api/v1/image/assets%2F940ebba695114a2a9f60c6ca6acee801%2Fadf3787a06344ebab9e02ef5f6554acd?format=webp&width=1200',
      'https://cdn.builder.io/api/v1/image/assets%2F940ebba695114a2a9f60c6ca6acee801%2F128a93132ba042148cb2fe0029c99229?format=webp&width=1200'
    ],
    description: 'Bright and versatile conference space suitable for medium-sized events and meetings.',
    amenities: [
      'Writing materials (provided)',
      'Complementary Wi‑Fi',
      'Water available (see session inclusions)',
      'Projector access'
    ],
    sessionDetails: {
      halfDay: [
        'Writing materials (provided)',
        'Complementary Wi‑Fi',
        'Water for one session',
        'Projector access',
        '10:00 — Tea & snacks',
        'Lunch buffet (separate from tea & snacks)'
      ],
      fullDay: [
        'Writing materials (provided)',
        'Complementary Wi‑Fi',
        'Water for both sessions',
        'Projector access',
        '10:00 — Tea & snacks',
        '16:00 — Tea & snacks',
        'Lunch buffet (separate from tea & snacks)',
        'PA system (available during the 16:00 session)'
      ]
    },
    arrangements: [
      { name: 'Theater', capacity: 80, description: 'Rows of chairs facing the stage.' },
      { name: 'Classroom', capacity: 60, description: 'Rows of tables with chairs for training.' },
      { name: 'U-Shape', capacity: 30, description: 'Tables arranged in U-shape for discussions.' },
      { name: 'Boardroom', capacity: 20, description: 'Single table setup for executive meetings.' },
      { name: 'Banquet', capacity: 50, description: 'Round tables for dining and social events.' },
      { name: 'Cocktail', capacity: 80, description: 'Standing reception with high-top tables.' },
      { name: 'Hollow Square', capacity: 40, description: 'Tables arranged in a square facing inward.' },
      { name: 'Cabaret', capacity: 50, description: 'Round tables facing the stage.' }
    ]
  },
  pkg3: {
    id: 'pkg3',
    title: 'Kibo',
    maxCapacity: 20,
    images: [
      'https://cdn.builder.io/api/v1/image/assets%2F940ebba695114a2a9f60c6ca6acee801%2Fcc9e710599654352a5d9f794622f56da?format=webp&width=1200',
      'https://cdn.builder.io/api/v1/image/assets%2F940ebba695114a2a9f60c6ca6acee801%2F656dd92ea69c4333859c34cdf0d50c2e?format=webp&width=1200'
    ],
    description: 'Cozy boardroom-style space ideal for small executive meetings and workshops.',
    amenities: [
      'Writing materials (provided)',
      'Complementary Wi‑Fi',
      'Water available (see session inclusions)',
      'Projector access'
    ],
    sessionDetails: {
      halfDay: [
        'Writing materials (provided)',
        'Complementary Wi‑Fi',
        'Water for one session',
        'Projector access',
        '10:00 — Tea & snacks',
        'Lunch buffet (separate from tea & snacks)'
      ],
      fullDay: [
        'Writing materials (provided)',
        'Complementary Wi‑Fi',
        'Water for both sessions',
        'Projector access',
        '10:00 — Tea & snacks',
        '16:00 — Tea & snacks',
        'Lunch buffet (separate from tea & snacks)',
        'PA system (available during the 16:00 session)'
      ]
    },
    arrangements: [
      { name: 'Theater', capacity: 20, description: 'Rows of chairs facing the stage.' },
      { name: 'Classroom', capacity: 16, description: 'Rows of tables with chairs for training.' },
      { name: 'U-Shape', capacity: 14, description: 'Tables arranged in U-shape for discussions.' },
      { name: 'Boardroom', capacity: 12, description: 'Single table setup for executive meetings.' },
      { name: 'Banquet', capacity: 16, description: 'Round tables with chairs.' }
    ]
  },
  pkg4: {
    id: 'pkg4',
    title: 'Mawenzi',
    maxCapacity: 40,
    images: [
      'https://cdn.builder.io/api/v1/image/assets%2F940ebba695114a2a9f60c6ca6acee801%2F3eed4abdf32f4ec9b4e0a1512a408204?format=webp&width=1200',
      'https://cdn.builder.io/api/v1/image/assets%2F940ebba695114a2a9f60c6ca6acee801%2F38fcbff7f22649da9b1647984af7a987?format=webp&width=1200'
    ],
    description: 'Flexible event space suitable for medium-sized meetings and workshops.',
    amenities: [
      'Writing materials (provided)',
      'Complementary Wi‑Fi',
      'Water available (see session inclusions)',
      'Projector access'
    ],
    sessionDetails: {
      halfDay: [
        'Writing materials (provided)',
        'Complementary Wi‑Fi',
        'Water for one session',
        'Projector access',
        '10:00 — Tea & snacks',
        'Lunch buffet (separate from tea & snacks)'
      ],
      fullDay: [
        'Writing materials (provided)',
        'Complementary Wi‑Fi',
        'Water for both sessions',
        'Projector access',
        '10:00 — Tea & snacks',
        '16:00 — Tea & snacks',
        'Lunch buffet (separate from tea & snacks)',
        'PA system (available during the 16:00 session)'
      ]
    },
    arrangements: [
      { name: 'Theater', capacity: 40, description: 'Rows of chairs facing the stage.' },
      { name: 'Classroom', capacity: 30, description: 'Rows of tables with chairs for training.' },
      { name: 'U-Shape', capacity: 20, description: 'Tables arranged in U-shape for discussions.' },
      { name: 'Boardroom', capacity: 18, description: 'Single table setup for executive meetings.' },
      { name: 'Banquet', capacity: 30, description: 'Round tables with chairs.' },
      { name: 'Cocktail', capacity: 40, description: 'Standing reception with high-top tables.' },
      { name: 'Hollow Square', capacity: 22, description: 'Tables arranged in a square facing inward.' },
      { name: 'Cabaret', capacity: 28, description: 'Round tables facing the stage.' }
    ]
  },
  pkg5: {
    id: 'pkg5',
    title: 'Lenana',
    maxCapacity: 10,
    images: [
      'https://cdn.builder.io/api/v1/image/assets%2F940ebba695114a2a9f60c6ca6acee801%2F329fd56dc90044a9a1fd823642d3d4ea?format=webp&width=1200',
      'https://cdn.builder.io/api/v1/image/assets%2F940ebba695114a2a9f60c6ca6acee801%2F7247bd4a6e364afba02337258d35f68e?format=webp&width=1200'
    ],
    description: 'Small, intimate room for executive discussions and private meetings.',
    amenities: [
      'Writing materials (provided)',
      'Complementary Wi‑Fi',
      'Water available (see session inclusions)',
      'Projector access'
    ],
    sessionDetails: {
      halfDay: [
        'Writing materials (provided)',
        'Complementary Wi‑Fi',
        'Water for one session',
        'Projector access',
        '10:00 — Tea & snacks',
        'Lunch buffet (separate from tea & snacks)'
      ],
      fullDay: [
        'Writing materials (provided)',
        'Complementary Wi‑Fi',
        'Water for both sessions',
        'Projector access',
        '10:00 — Tea & snacks',
        '16:00 — Tea & snacks',
        'Lunch buffet (separate from tea & snacks)',
        'PA system (available during the 16:00 session)'
      ]
    },
    arrangements: [
      { name: 'Theater', capacity: 10, description: 'Rows of chairs facing the stage.' },
      { name: 'Classroom', capacity: 8, description: 'Rows of tables with chairs for training.' },
      { name: 'U-Shape', capacity: 6, description: 'Tables arranged in U-shape for discussions.' },
      { name: 'Boardroom', capacity: 6, description: 'Single table setup for executive meetings.' }
    ]
  }
,
  pkg6: {
    id: 'pkg6',
    title: 'Boardroom',
    maxCapacity: 14,
    images: [
      'https://cdn.builder.io/api/v1/image/assets%2F940ebba695114a2a9f60c6ca6acee801%2Fd82dd3cc4afe45b68218b5634f827510?format=webp&width=1200',
      'https://cdn.builder.io/api/v1/image/assets%2F940ebba695114a2a9f60c6ca6acee801%2F7f54b68ad68949d09474e1dd03daaece?format=webp&width=1200',
      'https://cdn.builder.io/api/v1/image/assets%2F940ebba695114a2a9f60c6ca6acee801%2F80e2eb80aa6f4d4393f7723c92f6e8e4?format=webp&width=1200'
    ],
    description: 'Executive boardroom-style space ideal for private meetings and strategy sessions.',
    amenities: [
      'Writing materials (provided)',
      'Complementary Wi‑Fi',
      'Water available (see session inclusions)',
      'Tele‑conference'
    ],
    sessionDetails: {
      halfDay: [
        'Writing materials (provided)',
        'Complementary Wi��Fi',
        'Water for one session',
        'Tele‑conference',
        '10:00 — Tea & snacks',
        'Lunch buffet (separate from tea & snacks)'
      ],
      fullDay: [
        'Writing materials (provided)',
        'Complementary Wi‑Fi',
        'Water for both sessions',
        'Tele‑conference',
        '10:00 — Tea & snacks',
        '16:00 — Tea & snacks',
        'Lunch buffet (separate from tea & snacks)',
        'PA system (available during the 16:00 session)'
      ]
    },
    arrangements: [
      { name: 'Boardroom', capacity: 14, description: 'Single table with executive chairs. Ideal for board meetings and focused discussions.' }
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
  const [isFlipped, setIsFlipped] = useState(false);
  const [formData, setFormData] = useState<QuoteFormData>({
    organizationName: '',
    email: '',
    phoneNumber: '',
    conferenceStartDate: '',
    conferenceEndDate: '',
    packageType: 'Full Day Conference'
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  if (!hall) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % hall.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + hall.images.length) % hall.images.length);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus('loading');

    try {
      const payload = {
        inquiry_type: 'conference',
        email: formData.email,
        phone: formData.phoneNumber,
        start_date: formData.conferenceStartDate,
        end_date: formData.conferenceEndDate,
        organization_name: formData.organizationName,
        hall_name: hall.title,
        package_type: formData.packageType,
        seating_arrangement: selectedArrangement?.name || null,
        notes: `Conference quote for ${hall.title}${selectedArrangement ? `, arrangement: ${selectedArrangement.name}` : ''}`
      };

      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          organizationName: '',
          email: '',
          phoneNumber: '',
          conferenceStartDate: '',
          conferenceEndDate: '',
          packageType: 'Full Day Conference'
        });
        setTimeout(() => {
          setIsFlipped(false);
          setSubmitStatus('idle');
        }, 2000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 3000);
      }
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
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

        <div className={`hall-modal-flipper ${isFlipped ? 'flipped' : ''}`}>
          <div className="flipper-front">
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

              {hall.sessionDetails && (
                <div className="info-section hall-session">
                  <h3 className="section-heading">Session Inclusions</h3>
                  <div className="session-grid">
                    <div className="session-col">
                      <h4 className="session-title">Half Day — Half Board</h4>
                      <ul className="session-list">
                        {hall.sessionDetails.halfDay.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="session-col">
                      <h4 className="session-title">Full Day — Full Board</h4>
                      <ul className="session-list">
                        {hall.sessionDetails.fullDay.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <div className="arrangements-section">
                <h3 className="arrangements-heading">Seating Arrangements</h3>
                <p className="arrangements-intro">
                  {hall.title} can be arranged in multiple configurations to suit your event needs. Select an arrangement to view capacity details.
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
          </div>

          <div className="flipper-back">
            <div className="quote-form-container">
              <h3 className="quote-form-title">Request a Quote</h3>
              <p className="quote-form-subtitle">For {hall.title}</p>

              <form onSubmit={handleSubmit} className="quote-form">
                <div className="form-group">
                  <label htmlFor="organizationName" className="form-label">Organization Name</label>
                  <input
                    type="text"
                    id="organizationName"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                    placeholder="Enter organization name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                    placeholder="Enter email address"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="conferenceStartDate" className="form-label">Conference Start Date</label>
                    <input
                      type="date"
                      id="conferenceStartDate"
                      name="conferenceStartDate"
                      value={formData.conferenceStartDate}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="conferenceEndDate" className="form-label">Conference End Date</label>
                    <input
                      type="date"
                      id="conferenceEndDate"
                      name="conferenceEndDate"
                      value={formData.conferenceEndDate}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="packageType" className="form-label">Package Type</label>
                  <select
                    id="packageType"
                    name="packageType"
                    value={formData.packageType}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  >
                    <option value="Full Day Conference">Full Day Conference</option>
                    <option value="Half Day Conference">Half Day Conference</option>
                  </select>
                </div>

                <button type="submit" className="quote-form-submit" disabled={submitStatus === 'loading'}>
                  {submitStatus === 'loading' ? 'Submitting...' : 'Submit Quote Request'}
                </button>

                {submitStatus === 'success' && (
                  <div className="quote-form-status success">
                    ✓ Quote request submitted successfully!
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="quote-form-status error">
                    ✗ Failed to submit quote request. Please try again.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        <div className="hall-modal-footer">
          <button
            className="btn-inquiry"
            onClick={() => setIsFlipped(!isFlipped)}
            aria-label={isFlipped ? 'Back to hall details' : 'Request a quote'}
          >
            {isFlipped ? '← Back' : 'Request Quote'}
          </button>
        </div>
      </div>
    </div>
  );
}
