import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AboutUs() {
  const [rooms, setRooms] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/rooms');
        const json = await res.json();
        if (mounted && Array.isArray(json.rooms)) {
          setRooms(json.rooms);
        }
      } catch (_) {}
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <main className="privacy-page" aria-label="About Epashikino Resort & Spa">
      <Head>
        <title>About Us | Epashikino Resort & Spa</title>
        <meta name="description" content="Learn about Epashikino Resort & Spa. Discover our history, commitment to excellence, and world-class accommodations in Kenya's scenic Rift Valley." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div style={{position: 'relative', width: '100%', height: '300px', overflow: 'hidden', marginBottom: '40px'}}>
        <img src="https://cdn.builder.io/api/v1/image/assets%2F7efc470fe57f4b95b600ae20623acb83%2F11715a67bfec4a45b4e6c6f5ff24e7d3?format=webp&width=1200" alt="Epashikino Resort hero image" style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}} />
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2))'}}>
        </div>
      </div>
      <div className="privacy-container">
        <header className="privacy-header">
          <p className="privacy-eyebrow">Our Story</p>
          <h1 className="privacy-title">About Epashikino Resort & Spa</h1>
          <p className="privacy-lead">Welcome to Epashikino Resort & Spa, a sanctuary of luxury and natural beauty nestled on the shores of Lake Elementaita in Kenya's spectacular Great Rift Valley. We are committed to delivering exceptional hospitality experiences that blend world-class comfort with the breathtaking splendor of our pristine natural surroundings.</p>
        </header>

        <div className="privacy-content">
          <section className="privacy-section">
            <h2 className="privacy-section-title">Our Vision and Mission</h2>
            <h3 className="privacy-subsection-title">Vision</h3>
            <p>To be Kenya's premier destination resort, renowned for providing unforgettable experiences that harmonize luxury accommodations with the natural wonder of the Rift Valley, creating lasting memories for every guest.</p>
            
            <h3 className="privacy-subsection-title">Mission</h3>
            <p>To deliver exceptional hospitality through personalized service, innovative accommodations, and seamless integration with our stunning lakeside environment. We are dedicated to exceeding guest expectations by combining world-class amenities with authentic African hospitality and environmental stewardship.</p>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">Our Story</h2>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '20px 0'}}>
              <figure style={{margin: 0, borderRadius: '8px', overflow: 'hidden'}}>
                <img src="https://cdn.builder.io/api/v1/image/assets%2F6c3df5a7a3f7442e951c494b89c27332%2F781707577b0147af9c231ec692cdc21b?format=webp&width=800" alt="Elegant Epashikino resort room" style={{width: '100%', height: '250px', objectFit: 'cover', display: 'block'}} />
              </figure>
              <figure style={{margin: 0, borderRadius: '8px', overflow: 'hidden'}}>
                <img src="https://cdn.builder.io/api/v1/image/assets%2F6c3df5a7a3f7442e951c494b89c27332%2Fe46ddac554334ce183438f24777b4479?format=webp&width=800" alt="Resort exterior view" style={{width: '100%', height: '250px', objectFit: 'cover', display: 'block'}} />
              </figure>
            </div>
            <p>Epashikino Resort & Spa represents years of dedication to creating a world-class hospitality destination in one of Kenya's most captivating locations. Situated on the shores of Lake Elementaita, directly opposite the iconic "Sleeping Warrior" rocky mountain formation, our resort has become a preferred sanctuary for travelers seeking both relaxation and adventure.</p>

            <p>Our distinctive architecture and thoughtfully designed spaces celebrate the region's natural beauty while providing the comfort and sophistication our guests deserve. Every detail, from our spacious deluxe suites to our panoramic views of flamingoes foraging in the lake, has been crafted to create an unforgettable stay.</p>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">Why Choose Epashikino</h2>
            <h3 className="privacy-subsection-title">Spectacular Location</h3>
            <p>Perched on the shores of Lake Elementaita within the UNESCO World Heritage Kenya Lake System, Epashikino offers unparalleled natural beauty. Guests wake to breath-taking views of flamingoes foraging in the crystalline waters and the majestic "Sleeping Warrior" mountain formation in the distance. The constant sight of steam rising from natural hot springs dancing in the tropical sun creates an enchanting backdrop unlike any other destination.</p>
            
            <h3 className="privacy-subsection-title">Luxurious Accommodations</h3>
            <p>Our spacious and tastefully furnished deluxe suites are individually themed to complement either business or leisure stays. Each room features a private balcony providing breathtaking, awe-inspiring views. Whether you're a business traveler requiring a professional space or a leisure guest seeking tranquility, our suites are designed to exceed your expectations with premium bedding, modern amenities, and elegant décor.</p>
            
            <h3 className="privacy-subsection-title">World-Class Facilities</h3>
            <p>Beyond our exceptional rooms, Epashikino Resort & Spa offers a comprehensive range of facilities including fully equipped conference and meeting spaces, spa services, fine dining restaurants, and recreational activities. Our commitment to excellence extends to every aspect of the guest experience, from the moment of check-in to departure.</p>
            
            <h3 className="privacy-subsection-title">Expert Hospitality</h3>
            <p>Our dedicated team is trained to provide personalized service that anticipates your needs and exceeds your expectations. From our reservations team to our housekeeping staff, every member of our team is committed to ensuring your stay is exceptional. We take pride in understanding that each guest is unique and offer customized experiences accordingly.</p>
            
            <h3 className="privacy-subsection-title">Eco-Conscious Operations</h3>
            <p>We are deeply committed to environmental stewardship and sustainable tourism practices. Our location on Lake Elementaita, home to thousands of flamingoes and diverse birdlife, demands that we operate responsibly. We implement water conservation measures, energy-efficient systems, and waste management programs to minimize our environmental footprint while preserving the natural beauty that makes our destination special.</p>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">Our Accommodations</h2>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', margin: '20px 0'}}>
              {rooms.slice(0, 3).map((room) => (
                <figure key={room.id} style={{margin: 0, borderRadius: '8px', overflow: 'hidden'}}>
                  {room.images && room.images.length > 0 && (
                    <img 
                      src={room.images[0]} 
                      alt={room.name}
                      style={{width: '100%', height: '200px', objectFit: 'cover', display: 'block'}}
                    />
                  )}
                </figure>
              ))}
            </div>
            <p>Epashikino offers a carefully curated selection of accommodation options to suit diverse guest preferences and needs:</p>
            <ul className="privacy-list">
              {rooms.map((room) => (
                <li key={room.id}>
                  <strong>{room.name}:</strong> {room.description}
                </li>
              ))}
            </ul>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">Services and Amenities</h2>
            <h3 className="privacy-subsection-title">Dining</h3>
            <p>Our on-site restaurants serve a diverse range of cuisines, from international favorites to authentic Kenyan dishes prepared with locally sourced ingredients. Whether dining in our main restaurant overlooking the lake or enjoying a private meal in your suite, our culinary team crafts memorable dining experiences.</p>
            
            <h3 className="privacy-subsection-title">Conferences and Events</h3>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '16px 0'}}>
              <figure style={{margin: 0, borderRadius: '8px', overflow: 'hidden'}}>
                <img src="https://cdn.builder.io/api/v1/image/assets%2Fc2fe2cfdcc4f432da0d1d67f89e231a4%2F22e2311edffd4634a0a1b74e09843a11?format=webp&width=800" alt="Kilimanjaro conference hall" style={{width: '100%', height: '200px', objectFit: 'cover', display: 'block'}} />
              </figure>
              <figure style={{margin: 0, borderRadius: '8px', overflow: 'hidden'}}>
                <img src="https://cdn.builder.io/api/v1/image/assets%2Fc2fe2cfdcc4f432da0d1d67f89e231a4%2F10a5b3405c5845a29378bede4dfe85f0?format=webp&width=800" alt="Conference hall interior" style={{width: '100%', height: '200px', objectFit: 'cover', display: 'block'}} />
              </figure>
            </div>
            <p>Epashikino Resort & Spa features fully equipped conference halls and meeting spaces with state-of-the-art technology, scenic views, and professional support. Whether hosting a corporate retreat, intimate wedding, or large conference, our events team ensures every detail is executed flawlessly.</p>
            
            <h3 className="privacy-subsection-title">Spa and Wellness</h3>
            <p>Our spa offers a comprehensive range of treatments and therapies designed to rejuvenate body, mind, and spirit. From traditional massages to modern wellness treatments, our skilled therapists create personalized experiences in a serene environment overlooking the lake.</p>
            
            <h3 className="privacy-subsection-title">Recreation and Activities</h3>
            <p>Whether seeking adventure or relaxation, Epashikino offers numerous activities including birdwatching, nature walks, lake activities, visits to nearby Soysambu Conservancy for wildlife viewing, and exploration of local attractions like the Sleeping Warrior hiking trail and natural hot springs.</p>
            
            <h3 className="privacy-subsection-title">Connectivity</h3>
            <p>High-speed Wi-Fi is available throughout the resort, ensuring that business travelers and digital nomads can stay connected while enjoying the resort's amenities. Our dedicated business center provides additional support for professional needs.</p>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">Location & Accessibility</h2>
            <p>Epashikino Resort & Spa is strategically located on the Nairobi-Nakuru Highway, directly opposite Lake Elementaita in the stunning Great Rift Valley. Our location provides:</p>
            <ul className="privacy-list">
              <li>Easy access from Nairobi (approximately 2 hours drive)</li>
              <li>Close proximity to Lake Nakuru National Park and other Rift Valley attractions</li>
              <li>Direct access to natural wonders including Lake Elementaita, the Sleeping Warrior, and Soysambu Conservancy</li>
              <li>Convenient location for both leisure travelers and business professionals</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">Sustainability and Social Responsibility</h2>
            <p>Epashikino Resort & Spa is committed to being a responsible corporate citizen. Our initiatives include:</p>
            <ul className="privacy-list">
              <li>Environmental conservation programs protecting Lake Elementaita's ecosystem and flamingo population</li>
              <li>Community engagement and support for local development projects</li>
              <li>Employment opportunities for local residents with professional training and development</li>
              <li>Sustainable tourism practices that preserve natural habitats for future generations</li>
              <li>Energy efficiency and waste reduction programs across all resort operations</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">Awards and Recognition</h2>
            <p>Epashikino Resort & Spa has earned recognition for its commitment to excellence in hospitality, environmental stewardship, and guest satisfaction. We take pride in our reputation as a premier destination within Kenya's hospitality industry and continue to maintain the highest standards of service.</p>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">Our Team</h2>
            <p>Our success is rooted in our passionate and dedicated team. From management to housekeeping, every staff member shares a commitment to providing exceptional service and creating memorable guest experiences. We invest in continuous training and professional development, ensuring our team stays current with industry best practices and maintains the highest service standards.</p>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">Plan Your Stay</h2>
            <p>Whether you're seeking a relaxing getaway, an adventure-filled vacation, or a productive business retreat, Epashikino Resort & Spa is your ideal destination. Our team is ready to help you plan the perfect stay tailored to your preferences and needs.</p>
            <ul className="privacy-list">
              <li><strong>Browse Accommodations:</strong> Explore our room options and find the perfect fit for your needs</li>
              <li><strong>Check Availability:</strong> Search for your desired dates and check real-time availability</li>
              <li><strong>Contact Our Team:</strong> Reach out with any questions or special requests</li>
              <li><strong>Special Packages:</strong> Inquire about seasonal packages and group discounts</li>
            </ul>
            <p style={{marginTop: '20px'}}>
              <Link href="/booking" className="btn btn-primary">Book Your Stay</Link>
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">Contact Information</h2>
            <p>We look forward to welcoming you to Epashikino Resort & Spa. Please contact us for more information, reservations, or to discuss your specific needs:</p>
            <div className="privacy-contact">
              <p><strong>Epashikino Resort & Spa</strong><br/>
              Nairobi Nakuru Highway<br/>
              Opposite Lake Elementaita, Kenya<br/>
              <br/>
              <strong>Phone:</strong> +254 705 455 001 / +254 788 455 001<br/>
              <strong>Email:</strong> reservations@epashikinoresort.com<br/>
              <strong>Hours:</strong> 8:00 AM – 10:00 PM (EAT) Daily</p>
            </div>
          </section>

          <section className="privacy-section">
            <p className="privacy-last-updated"><strong>Last Updated:</strong> January 2025</p>
          </section>
        </div>
      </div>
    </main>
  );
}
