import Head from 'next/head';
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What are the check-in and check-out times?',
    answer: 'Check-in starts at 12:00 noon and check-out is at 10:00 AM. Early check-in or late check-out may be available upon request, subject to availability and additional charges.'
  },
  {
    question: 'Do you offer airport transfers or shuttle services?',
    answer: 'Yes, we can arrange airport transfers for our guests. Please contact our reservations team in advance to arrange this service. Additional charges may apply based on distance and timing.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express), bank transfers, mobile payment options, and cash. A valid credit card is required to secure your reservation.'
  },
  {
    question: 'Is there a cancellation policy?',
    answer: 'Yes, our standard cancellation policy allows free cancellation up to 3 days before your arrival date. Cancellations made within 3 days of arrival may be subject to a charge equivalent to one night\'s stay. Please refer to your booking confirmation for specific terms.'
  },
  {
    question: 'Do you have WiFi in all rooms?',
    answer: 'Yes, complimentary high-speed WiFi is available throughout the resort, including all guest rooms, public areas, and conference facilities.'
  },
  {
    question: 'Are pets allowed at the resort?',
    answer: 'Pets are not allowed in our facility.'
  },
  {
    question: 'What dining options are available?',
    answer: 'We offer several dining experiences including our main restaurant, rooftop lounge, and room service. Our menus feature both local and international cuisine. Special dietary requirements can be accommodated with advance notice.'
  },
  {
    question: 'Do you offer conference and event facilities?',
    answer: 'Yes, we have comprehensive conference and events facilities suitable for meetings, conferences, weddings, and other special occasions. Please contact our events team for customized packages and availability.'
  },
  {
    question: 'What amenities are included in the rooms?',
    answer: 'All rooms include air conditioning, en-suite bathrooms with premium toiletries, flat-screen TV, minibar, safe deposit box, and complimentary WiFi. Some room categories include additional amenities such as private balconies and jacuzzis.'
  },
  {
    question: 'Is there a spa or wellness facility?',
    answer: 'Yes, Epashikino Resort & Spa offers a full-service spa with various massage and wellness treatments. We also have a fitness center and can arrange yoga and meditation sessions. Spa services can be booked through our front desk.'
  },
  {
    question: 'What activities and tours are available?',
    answer: 'We offer nature tours, adventure activities, local cultural experiences, and guided visits to nearby attractions. Our concierge team can help arrange activities based on your interests and schedule.'
  },
  {
    question: 'Do you accommodate special requests?',
    answer: 'We are happy to accommodate special requests such as honeymoon arrangements, birthday celebrations, dietary preferences, and room preferences. Please mention these when booking or contact us directly.'
  }
];

export default function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <main className="faq-page" aria-label="Frequently Asked Questions">
      <Head>
        <title>FAQs | Epashikino Resort & Spa</title>
        <meta name="description" content="Find answers to frequently asked questions about Epashikino Resort & Spa, including booking, amenities, policies, and services." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="faq-container">
        <header className="faq-header">
          <p className="faq-eyebrow">Questions?</p>
          <h1 className="faq-title">Frequently Asked Questions</h1>
          <p className="faq-lead">Find answers to common questions about your stay at Epashikino Resort & Spa. If you can't find what you're looking for, please don't hesitate to contact our team.</p>
        </header>

        <div className="faq-list">
          {faqs.map((item, index) => (
            <div key={index} className="faq-item">
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={expandedIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="faq-question-text">{item.question}</span>
                <span className="faq-toggle" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`faq-answer ${expandedIndex === index ? 'expanded' : ''}`}
              >
                <p className="faq-answer-text">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-cta">
          <p className="faq-cta-text">Didn't find your answer?</p>
          <a href="/contact" className="btn btn-blue">Contact Support</a>
        </div>
      </div>
    </main>
  );
}
