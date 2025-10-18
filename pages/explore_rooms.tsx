import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ExploreRooms() {
  const [selectedRoom, setSelectedRoom] = useState<number>(0);
  const [roomTypes, setRoomTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterLocation, setFilterLocation] = useState<string>('All');
  const [filterType, setFilterType] = useState<string>('Any');
  const [filterCapacity, setFilterCapacity] = useState<string>('Any');

  const rooms = [
    {
      id: 1,
      name: 'Deluxe Blue Room',
      roomType: 'double',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F63e670d5cbe5459ba070252373268feb%2F0f158b48159b4dea9fd22050b1ed4319?format=webp&width=1600',
      description: 'Experience comfort in our spacious deluxe room with blue accent wall and modern furnishings.',
      features: ['1 Double Bed', '50m²', 'Balcony', 'Smart TV', 'Work Desk']
    },
    {
      id: 2,
      name: 'Elegant Suite with Balcony',
      roomType: 'double',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F63e670d5cbe5459ba070252373268feb%2F2485ae8cfcdc42bf97186752d3dfedc2?format=webp&width=1600',
      description: 'Relax in luxury with our elegant suite featuring a stunning balcony view.',
      features: ['1 Double Bed', '55m²', 'Large Balcony', 'Premium Amenities', 'Mountain View']
    },
    {
      id: 3,
      name: 'Round Bed Suite',
      roomType: 'single',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F63e670d5cbe5459ba070252373268feb%2F32d5855646ed417e83b45d3d4e1ebbfb?format=webp&width=1600',
      description: 'Unique and luxurious with our signature round bed and teal accent wall.',
      features: ['1 Round Bed', '60m²', 'Decorative Mirror', 'Fine Linens', 'Artistic Design']
    },
    {
      id: 4,
      name: 'Panoramic Room',
      roomType: 'double',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F63e670d5cbe5459ba070252373268feb%2F06582229117145b5bc4bdbf74004bfca?format=webp&width=1600',
      description: 'Stunning panoramic views with modern décor and spacious seating area.',
      features: ['1 Double Bed', '58m²', 'Floor-to-Ceiling Windows', 'Seating Area', 'Scenic View']
    },
    {
      id: 5,
      name: 'Family Room with Nursery',
      roomType: 'family',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F63e670d5cbe5459ba070252373268feb%2F71052c8e23024c39a2a8bdfd0fbef059?format=webp&width=1600',
      description: 'Perfect for families with main bedroom and separate nursery area.',
      features: ['1 Double Bed + Crib', '65m²', 'Family Setup', 'Safe Nursery', 'Spacious Layout']
    },
    {
      id: 6,
      name: 'Twin Bed Suite',
      roomType: 'twin',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F63e670d5cbe5459ba070252373268feb%2F11597a5f3c144797bb99b59dac85173c?format=webp&width=1600',
      description: 'Comfortable twin beds with elegant décor and warm lighting.',
      features: ['2 Single Beds', '52m²', 'Separate Beds', 'Elegant Design', 'Reading Nook']
    },
    {
      id: 7,
      name: 'Teal Accent Twin Room',
      roomType: 'twin',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F63e670d5cbe5459ba070252373268feb%2F75f97fc26f914e6489ee10104767af66?format=webp&width=1600',
      description: 'Modern twin beds with striking teal accent walls and quality furnishings.',
      features: ['2 Single Beds', '54m²', 'Color Accent', 'Modern Decor', 'Double Vanity']
    },
    {
      id: 10,
      name: 'Multi-Bed Suite',
      roomType: 'family',
      image: 'https://cdn.builder.io/api/v1/image/assets%2F63e670d5cbe5459ba070252373268feb%2F28a2e9e58f4640fa9d68f363c8330e78?format=webp&width=1600',
      description: 'Spacious suite with multiple bed options and teal accent walls.',
      features: ['2 Double Beds', '70m²', 'Teal Accents', 'Large Windows', 'Entertainment Area']
    }
  ];

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/room-types');
        const json = await res.json();
        if (mounted && Array.isArray(json.types)) {
          setRoomTypes(json.types);
        }
      } catch (_) {
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const visibleRooms = rooms.filter(r => filterType === 'Any' || r.roomType.toLowerCase() === filterType.toLowerCase());

  return (
    <>
      <Head>
        <title>Explore Rooms — Epashikino Resort & Spa</title>
        <meta name="description" content="Explore our beautiful room collection with stunning photography and detailed amenities." />
      </Head>

      <main className="explore-page">
        <div className="explore-container">
          <header className="explore-header">
            <h1>Explore Our Rooms</h1>
            <p>Discover the perfect accommodation for your stay</p>
          </header>

          <div className="explore-body">
            <aside className="explore-sidebar">
              <div className="rooms-list">
                <h3 className="rooms-list-title">Room Collection</h3>
                <nav className="rooms-navigation">
                  {rooms.map((room, idx) => (
                    <button
                      key={room.id}
                      className={`room-nav-item ${selectedRoom === idx ? 'active' : ''}`}
                      onClick={() => setSelectedRoom(idx)}
                    >
                      <span className="room-nav-number">{idx + 1}</span>
                      <span className="room-nav-name">{room.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            <section className="explore-main">
              <div className="room-viewer">
                <figure className="room-display-image">
                  <img
                    src={rooms[selectedRoom].image}
                    alt={rooms[selectedRoom].name}
                    loading="eager"
                    decoding="async"
                  />
                </figure>

                <div className="room-details">
                  <div className="room-header-info">
                    <h2 className="room-display-title">{rooms[selectedRoom].name}</h2>
                    <p className="room-display-desc">{rooms[selectedRoom].description}</p>
                  </div>

                  <div className="room-features-block">
                    <h3 className="features-title">Room Features</h3>
                    <ul className="features-list">
                      {rooms[selectedRoom].features.map((feature, idx) => (
                        <li key={idx} className="feature-item">
                          <span className="feature-icon">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {!loading && roomTypes.length > 0 && (
                    <div className="room-types-available">
                      <h3 className="types-title">This Room Type</h3>
                      <div className="types-list">
                        <span className="type-badge type-badge-active">{rooms[selectedRoom].roomType}</span>
                      </div>
                    </div>
                  )}

                  <div className="room-actions">
                    <Link className="btn btn-primary" href="/rooms">Book This Room</Link>
                  </div>
                </div>
              </div>

              <div className="room-gallery-grid">
                <h3 className="gallery-title">All Rooms</h3>
                <div className="gallery-grid">
                  {rooms.map((room, idx) => (
                    <button
                      key={room.id}
                      className={`gallery-item ${selectedRoom === idx ? 'selected' : ''}`}
                      onClick={() => setSelectedRoom(idx)}
                      aria-label={`Select ${room.name}`}
                    >
                      <figure className="gallery-figure">
                        <img
                          src={room.image}
                          alt={room.name}
                          loading="lazy"
                          decoding="async"
                        />
                      </figure>
                      <span className="gallery-item-name">{room.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <nav className="explore-bottom-nav">
            <Link className="btn btn-outline" href="/rooms">Back to Accommodation</Link>
          </nav>
        </div>
      </main>

      <style jsx>{`
        .explore-page { margin-top: 86px; }
        .explore-container { width: 80%; max-width: 1200px; margin: 0 auto; padding: 24px 16px 60px; }
        
        .explore-header { text-align: center; margin-bottom: 32px; }
        .explore-header h1 { margin: 0 0 8px; font-size: 2.2rem; font-weight: 700; color: var(--text-black); }
        .explore-header p { margin: 0; color: rgba(0,0,0,0.65); font-size: 1.05rem; }

        .explore-body { display: grid; grid-template-columns: 280px 1fr; gap: 24px; align-items: start; margin-bottom: 32px; }

        .explore-sidebar { position: sticky; top: 90px; height: fit-content; }
        .rooms-list { background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 0; padding: 0; }
        .rooms-list-title { margin: 0; padding: 16px 12px; font-size: 1.1rem; font-weight: 700; border-bottom: 1px solid rgba(0,0,0,0.06); background: #fafafa; }
        .rooms-navigation { display: flex; flex-direction: column; gap: 0; list-style: none; padding: 0; margin: 0; }

        .room-nav-item { width: 100%; text-align: left; background: transparent; border: 0; border-bottom: 1px solid rgba(0,0,0,0.04); padding: 12px; display: flex; align-items: center; gap: 12px; cursor: pointer; transition: background 0.2s ease; }
        .room-nav-item:last-child { border-bottom: 0; }
        .room-nav-item:hover { background: rgba(111,78,55,0.04); }
        .room-nav-item.active { background: rgba(111,78,55,0.1); border-left: 3px solid var(--brand-brown); padding-left: 9px; }

        .room-nav-number { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 50%; background: var(--brand-brown); color: #fff; font-size: 0.9rem; font-weight: 700; flex-shrink: 0; }
        .room-nav-name { flex: 1; font-size: 0.95rem; color: rgba(0,0,0,0.75); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

        .explore-main { display: grid; gap: 32px; }

        .room-viewer { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; }
        .room-display-image { margin: 0; border-radius: 0; overflow: hidden; background: #e8e6e1; }
        .room-display-image img { width: 100%; height: auto; display: block; aspect-ratio: 4/3; object-fit: cover; }

        .room-details { display: grid; gap: 20px; }
        .room-header-info { display: grid; gap: 10px; }
        .room-display-title { margin: 0; font-size: 1.8rem; font-weight: 700; color: var(--text-black); }
        .room-display-desc { margin: 0; color: rgba(0,0,0,0.7); line-height: 1.6; font-size: 1rem; }

        .room-features-block { background: #fafafa; border: 1px solid rgba(0,0,0,0.06); border-radius: 0; padding: 16px; }
        .features-title { margin: 0 0 12px; font-size: 1rem; font-weight: 700; color: var(--text-black); }
        .features-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; }
        .feature-item { display: flex; align-items: center; gap: 10px; color: rgba(0,0,0,0.75); font-size: 0.95rem; }
        .feature-icon { display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; color: var(--brand-brown); font-weight: 700; }

        .room-types-available { background: rgba(111,78,55,0.05); border: 1px solid rgba(111,78,55,0.1); border-radius: 0; padding: 14px; }
        .types-title { margin: 0 0 10px; font-size: 0.95rem; font-weight: 700; color: var(--text-black); }
        .types-list { display: flex; flex-wrap: wrap; gap: 8px; }
        .type-badge { display: inline-flex; align-items: center; padding: 6px 12px; border-radius: 999px; background: #e8e6e1; color: var(--text-black); font-size: 0.85rem; font-weight: 600; border: 1px solid rgba(111,78,55,0.2); }
        .type-badge-active { background: var(--brand-brown); color: #fff; border-color: var(--brand-brown); }

        .room-actions { display: flex; gap: 12px; }

        .room-gallery-grid { display: grid; gap: 16px; }
        .gallery-title { margin: 0; font-size: 1.2rem; font-weight: 700; color: var(--text-black); }

        .gallery-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
        .gallery-item { background: transparent; border: 2px solid rgba(0,0,0,0.08); border-radius: 0; padding: 0; cursor: pointer; transition: border-color 0.2s ease, transform 0.2s ease; overflow: hidden; }
        .gallery-item:hover { border-color: rgba(111,78,55,0.3); transform: translateY(-2px); }
        .gallery-item.selected { border-color: var(--brand-brown); }

        .gallery-figure { margin: 0; border-radius: 0; overflow: hidden; background: #e8e6e1; }
        .gallery-item img { width: 100%; height: 120px; object-fit: cover; display: block; }
        .gallery-item-name { display: block; padding: 10px 8px; font-size: 0.85rem; color: rgba(0,0,0,0.75); text-align: center; background: #fafafa; border-top: 1px solid rgba(0,0,0,0.04); }

        .explore-bottom-nav { display: flex; gap: 12px; }

        @media (max-width: 1000px) {
          .explore-body { grid-template-columns: 1fr; }
          .explore-sidebar { position: static; }
          .room-viewer { grid-template-columns: 1fr; }
          .gallery-grid { grid-template-columns: repeat(4, 1fr); }
        }

        @media (max-width: 768px) {
          .explore-header h1 { font-size: 1.8rem; }
          .room-display-title { font-size: 1.4rem; }
          .explore-sidebar { order: 2; }
          .explore-main { order: 1; }
          .gallery-grid { grid-template-columns: repeat(3, 1fr); }
          .rooms-list-title { display: none; }
          .rooms-navigation { flex-direction: row; flex-wrap: wrap; }
          .room-nav-item { flex: 1 1 48%; border-right: 1px solid rgba(0,0,0,0.04); }
        }

        @media (max-width: 600px) {
          .explore-container { width: 92%; padding: 16px 12px 40px; }
          .explore-header h1 { font-size: 1.5rem; }
          .explore-header p { font-size: 0.95rem; }
          .gallery-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
          .gallery-item img { height: 100px; }
          .room-features-block { padding: 12px; }
          .room-nav-item { font-size: 0.9rem; }
        }
      `}</style>
    </>
  );
}
