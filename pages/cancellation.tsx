import Head from 'next/head';

export default function CancellationPolicy() {
  return (
    <main className="cancellation-page" aria-label="Cancellation Policy">
      <Head>
        <title>Cancellation Policy | Epashikino Resort & Spa</title>
        <meta name="description" content="Cancellation Policy for Epashikino Resort & Spa. Learn our cancellation terms, refund procedures, and the difference between cancellations and no-shows." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="cancellation-container">
        <header className="cancellation-header">
          <p className="cancellation-eyebrow">Policies</p>
          <h1 className="cancellation-title">Cancellation Policy</h1>
          <p className="cancellation-lead">At Epashikino Resort & Spa, we understand that plans can change. This policy outlines our cancellation terms, refund procedures, and important distinctions between cancellations and no-shows.</p>
        </header>

        <div className="cancellation-content">
          <section className="cancellation-section">
            <h2 className="cancellation-section-title">1. Overview</h2>
            <p>This Cancellation Policy applies to all bookings made directly through our website, reservation system, or by contacting our reservations team. It governs the terms under which guests may cancel their reservations and the financial implications of such cancellations.</p>
            <p>Please read this policy carefully before completing your booking, as acceptance of the booking terms constitutes your agreement to these cancellation conditions.</p>
          </section>

          <section className="cancellation-section">
            <h2 className="cancellation-section-title">2. Definition of Key Terms</h2>
            <h3 className="cancellation-subsection-title">Cancellation</h3>
            <p>A cancellation occurs when a guest formally requests to cancel their confirmed reservation prior to their scheduled check-in date. A written notice of cancellation must be received by Epashikino Resort & Spa through email, phone, or in-person request.</p>
            
            <h3 className="cancellation-subsection-title">No-Show</h3>
            <p>A no-show occurs when a guest fails to arrive for their reservation without prior notification or cancellation request. If a guest does not check in on their scheduled arrival date and has not communicated with the resort, the reservation is classified as a no-show.</p>
            
            <h3 className="cancellation-subsection-title">Important Distinction</h3>
            <p className="cancellation-highlight"><strong>Cancellation and no-show are different and are treated differently under this policy.</strong> A cancellation allows a guest to recover the majority of their funds, while a no-show results in no refund, as the resort must absorb the full cost of the reserved room and services.</p>
          </section>

          <section className="cancellation-section">
            <h2 className="cancellation-section-title">3. Cancellation Retention Policy</h2>
            <h3 className="cancellation-subsection-title">Standard Cancellation Fee</h3>
            <p>In the event of a cancellation, Epashikino Resort & Spa retains <strong>25% of the total booking revenue</strong> to cover administrative costs, operational losses, and potential loss of revenue from declining other bookings for those dates.</p>
            <p>The remaining <strong>75% of the booking amount will be refunded</strong> to the original payment method within 7-14 business days of the cancellation request.</p>
            
            <h3 className="cancellation-subsection-title">Calculation Example</h3>
            <div className="cancellation-example">
              <p><strong>Booking Details:</strong></p>
              <ul>
                <li>Total Booking Amount: KES 50,000</li>
                <li>Retention Fee (25%): KES 12,500</li>
                <li>Refundable Amount (75%): KES 37,500</li>
              </ul>
            </div>
          </section>

          <section className="cancellation-section">
            <h2 className="cancellation-section-title">4. Cancellation Timelines and Deadlines</h2>
            <h3 className="cancellation-subsection-title">Free Cancellation Period</h3>
            <p>Guests may cancel their reservation <strong>up to 7 days before the scheduled check-in date</strong> without incurring the retention fee. Full refunds will be processed for cancellations made within this window.</p>
            
            <h3 className="cancellation-subsection-title">Standard Cancellation (25% Retention)</h3>
            <p>Cancellations made <strong>within 7 days of the check-in date</strong> will be subject to the 25% retention fee. The 75% balance will be refunded to your account.</p>
            
            <h3 className="cancellation-subsection-title">Same-Day Cancellation</h3>
            <p>Cancellations requested on the same day as check-in (after 2:00 PM) or after check-in time has passed may be treated differently. Please contact our reservations team immediately if you need to cancel on the day of arrival.</p>
            
            <h3 className="cancellation-subsection-title">Late Cancellation and No-Show Fees</h3>
            <p>If a guest does not check in on their scheduled arrival date and has not formally cancelled their reservation, the full booking amount will be charged as a no-show fee. <strong>No refund will be issued for no-shows.</strong></p>
          </section>

          <section className="cancellation-section">
            <h2 className="cancellation-section-title">5. No-Show Policy</h2>
            <h3 className="cancellation-subsection-title">Definition and Consequences</h3>
            <p>A no-show occurs when a guest:</p>
            <ul className="cancellation-list">
              <li>Fails to arrive on the scheduled check-in date without prior notification</li>
              <li>Does not contact the resort to cancel or reschedule their reservation</li>
              <li>Does not communicate any delay or change in arrival plans</li>
            </ul>
            
            <h3 className="cancellation-subsection-title">No-Show Charges</h3>
            <p>In case of a no-show, the following charges will apply:</p>
            <ul className="cancellation-list">
              <li><strong>100% of the total booking amount</strong> will be charged to the guest's payment method</li>
              <li><strong>No refund will be issued</strong> for no-show reservations</li>
              <li>The resort reserves the right to hold the guest liable for additional costs incurred</li>
            </ul>
            
            <h3 className="cancellation-subsection-title">Avoiding No-Show Charges</h3>
            <p>To avoid no-show charges, please:</p>
            <ul className="cancellation-list">
              <li>Arrive by the scheduled check-in time on your reservation date</li>
              <li>Contact us immediately if you will be delayed or cannot arrive</li>
              <li>Submit a formal cancellation request if you need to cancel your stay</li>
              <li>Call our reservations team at <strong>+254 705 455 001</strong> or <strong>+254 788 455 001</strong></li>
              <li>Email cancellation requests to <strong>reservations@epashikinoresort.com</strong></li>
            </ul>
          </section>

          <section className="cancellation-section">
            <h2 className="cancellation-section-title">6. How to Cancel Your Reservation</h2>
            <h3 className="cancellation-subsection-title">Cancellation Procedures</h3>
            <p>To cancel your reservation, please contact us using any of the following methods:</p>
            <ul className="cancellation-list">
              <li><strong>Phone:</strong> +254 705 455 001 or +254 788 455 001 (Available 8:00 AM – 10:00 PM EAT)</li>
              <li><strong>Email:</strong> reservations@epashikinoresort.com with your booking reference number</li>
              <li><strong>In Person:</strong> Visit our front desk or administrative office</li>
              <li><strong>Online:</strong> Use your booking account portal if available</li>
            </ul>
            
            <h3 className="cancellation-subsection-title">Cancellation Confirmation</h3>
            <p>Upon receiving your cancellation request, we will send a confirmation email within 24 hours that includes:</p>
            <ul className="cancellation-list">
              <li>Cancellation confirmation number and date/time</li>
              <li>Original booking reference</li>
              <li>Refund amount and retention fee breakdown</li>
              <li>Expected refund timeline (7-14 business days)</li>
              <li>Original payment method for refund processing</li>
            </ul>
          </section>

          <section className="cancellation-section">
            <h2 className="cancellation-section-title">7. Refund Process</h2>
            <h3 className="cancellation-subsection-title">Refund Timeframe</h3>
            <p>Approved refunds will be processed within <strong>7-14 business days</strong> of the cancellation request. The exact timeframe depends on:</p>
            <ul className="cancellation-list">
              <li>Your bank's processing time for returned funds</li>
              <li>The payment method used for the original booking</li>
              <li>Currency conversion requirements for international bookings</li>
            </ul>
            
            <h3 className="cancellation-subsection-title">Refund Method</h3>
            <p>Refunds will be issued to the <strong>original payment method</strong> used to make the booking. If you paid via:</p>
            <ul className="cancellation-list">
              <li><strong>Credit or Debit Card:</strong> Refund will be credited back to the card within 7-14 business days</li>
              <li><strong>Bank Transfer:</strong> Refund will be transferred to the account details provided in the booking</li>
              <li><strong>Mobile Payment:</strong> Refund will be credited to the mobile wallet or account used</li>
            </ul>
            
            <h3 className="cancellation-subsection-title">Tracking Your Refund</h3>
            <p>You can track your refund status by:</p>
            <ul className="cancellation-list">
              <li>Contacting our reservations team with your cancellation confirmation number</li>
              <li>Checking your bank or payment provider account</li>
              <li>Emailing reservations@epashikinoresort.com for updates</li>
            </ul>
          </section>

          <section className="cancellation-section">
            <h2 className="cancellation-section-title">8. Special Circumstances and Exceptions</h2>
            <h3 className="cancellation-subsection-title">Force Majeure</h3>
            <p>In exceptional circumstances such as natural disasters, pandemics, government travel restrictions, or other events beyond guest control, we may consider alternative arrangements such as:</p>
            <ul className="cancellation-list">
              <li>Rebooking to alternative dates without penalty</li>
              <li>Issuing a credit voucher for future stays</li>
              <li>Full refund in exceptional cases</li>
            </ul>
            <p>Guests facing such circumstances should contact our management team immediately to discuss options.</p>
            
            <h3 className="cancellation-subsection-title">Group and Corporate Bookings</h3>
            <p>Cancellation terms for group bookings (10+ rooms) and corporate reservations may differ from standard policies. Please refer to your specific group booking agreement or contact our events team for details.</p>
            
            <h3 className="cancellation-subsection-title">Non-Refundable Rates</h3>
            <p>Some promotional rates may be marked as non-refundable or non-cancellable. Guests who book such rates understand that:</p>
            <ul className="cancellation-list">
              <li>These rates cannot be cancelled or modified</li>
              <li>No refund will be issued if a cancellation is requested</li>
              <li>The full booking amount is due regardless of cancellation timing</li>
            </ul>
          </section>

          <section className="cancellation-section">
            <h2 className="cancellation-section-title">9. Modification vs. Cancellation</h2>
            <p><strong>Room Modification:</strong> If you wish to change your check-in date, check-out date, room type, or number of guests, this is considered a modification, not a cancellation. Modifications are subject to availability and may incur additional charges or adjustments.</p>
            <p><strong>Cancellation:</strong> If you wish to completely cancel your reservation, the cancellation policy above applies.</p>
            <p>Please contact our reservations team to discuss modification options before submitting a cancellation request.</p>
          </section>

          <section className="cancellation-section">
            <h2 className="cancellation-section-title">10. Dispute Resolution</h2>
            <h3 className="cancellation-subsection-title">Disputes and Complaints</h3>
            <p>If you believe a cancellation charge or no-show fee was applied incorrectly, please contact our management team within 30 days of the charge with supporting documentation.</p>
            <ul className="cancellation-list">
              <li><strong>Email:</strong> reservations@epashikinoresort.com</li>
              <li><strong>Phone:</strong> +254 705 455 001</li>
              <li><strong>Address:</strong> Nairobi Nakuru Highway, Opposite Lake Elementaita, Kenya</li>
            </ul>
            <p>We will investigate the matter and respond within 7 business days. If you remain unsatisfied, you may pursue the matter through credit card disputes or local consumer protection channels.</p>
          </section>

          <section className="cancellation-section">
            <h2 className="cancellation-section-title">11. Policy Updates and Changes</h2>
            <p>Epashikino Resort & Spa reserves the right to update this Cancellation Policy at any time. Changes will be communicated through our website and email notifications to registered guests. For active reservations, the cancellation terms at the time of booking will apply unless otherwise stated.</p>
          </section>

          <section className="cancellation-section">
            <h2 className="cancellation-section-title">Summary: Cancellation vs. No-Show</h2>
            <div className="cancellation-comparison">
              <div className="comparison-column">
                <h3>Cancellation</h3>
                <ul>
                  <li>Guest formally requests cancellation</li>
                  <li>Resort retains 25% of booking</li>
                  <li>75% refunded to guest</li>
                  <li>Refund processed in 7-14 days</li>
                  <li>Contact required to proceed</li>
                  <li>Evidence of cancellation provided</li>
                </ul>
              </div>
              <div className="comparison-column">
                <h3>No-Show</h3>
                <ul>
                  <li>Guest fails to arrive without notification</li>
                  <li>Resort charges 100% of booking</li>
                  <li>No refund issued</li>
                  <li>Full amount forfeited</li>
                  <li>No contact or notice from guest</li>
                  <li>Reservation marked as no-show</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="cancellation-section">
            <h2 className="cancellation-section-title">Contact Information</h2>
            <div className="cancellation-contact">
              <p><strong>Reservations Team</strong><br/>
              Epashikino Resort & Spa<br/>
              Phone: +254 705 455 001 / +254 788 455 001<br/>
              Email: reservations@epashikinoresort.com<br/>
              Hours: 8:00 AM – 10:00 PM (EAT) Daily<br/>
              Address: Nairobi Nakuru Highway, Opposite Lake Elementaita, Kenya</p>
            </div>
          </section>

          <section className="cancellation-section">
            <p className="cancellation-last-updated"><strong>Last Updated:</strong> January 2025</p>
            <p className="cancellation-last-updated"><strong>Effective Date:</strong> January 2025</p>
          </section>
        </div>
      </div>
    </main>
  );
}
