import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getSupabase } from '../lib/supabaseClient';
import type { Booking } from '../lib/roomsData';

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchEmail, setSearchEmail] = useState('');

  useEffect(() => {
    async function loadBookings() {
      setLoading(true);
      const supabase = getSupabase();
      if (!supabase) {
        setLoading(false);
        return;
      }

      try {
        let query = supabase.from('bookings').select('*').order('created_at', { ascending: false });

        if (filter !== 'all') {
          query = query.eq('status', filter);
        }

        if (searchEmail) {
          query = query.ilike('email', `%${searchEmail}%`);
        }

        const { data, error } = await query;

        if (error) throw error;
        setBookings(data || []);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    }

    loadBookings();
  }, [filter, searchEmail]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'badge-confirmed';
      case 'pending':
        return 'badge-pending';
      case 'cancelled':
        return 'badge-cancelled';
      case 'checked_in':
        return 'badge-checkedin';
      case 'checked_out':
        return 'badge-checkedout';
      default:
        return 'badge-default';
    }
  };

  const calculateNights = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return nights;
  };

  return (
    <>
      <Head>
        <title>Bookings | Epashikino Resort & Spa</title>
        <meta name="description" content="View and manage all bookings." />
      </Head>

      <main className="listing-page">
        <div className="listing-container">
          <header className="listing-header">
            <h1 className="listing-eyebrow">Epashikino Resort & Spa</h1>
            <h2 className="listing-title">Booking Management</h2>
            <p className="listing-subtitle">View and track all room bookings</p>
          </header>

          <section className="bookings-section">
            <div className="bookings-controls">
              <div className="bookings-filter">
                <label className="form-label">Status Filter</label>
                <select
                  className="input"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Bookings</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="checked_in">Checked In</option>
                  <option value="checked_out">Checked Out</option>
                </select>
              </div>

              <div className="bookings-search">
                <label className="form-label">Search by Email</label>
                <input
                  className="input"
                  type="email"
                  placeholder="guest@example.com"
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                />
              </div>

              <div className="bookings-count">
                <span className="count-label">Total Bookings:</span>
                <span className="count-number">{bookings.length}</span>
              </div>
            </div>

            {loading ? (
              <p className="section-title">Loading bookings...</p>
            ) : bookings.length === 0 ? (
              <p className="section-title">No bookings found.</p>
            ) : (
              <div className="bookings-table-wrapper">
                <table className="bookings-table">
                  <thead>
                    <tr>
                      <th>Guest Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Check-in</th>
                      <th>Check-out</th>
                      <th>Nights</th>
                      <th>Guests</th>
                      <th>Board Type</th>
                      <th>Total Price</th>
                      <th>Status</th>
                      <th>Booking Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="booking-row">
                        <td className="cell-name">
                          {booking.first_name} {booking.last_name}
                        </td>
                        <td className="cell-email">{booking.email}</td>
                        <td className="cell-phone">{booking.phone || '-'}</td>
                        <td className="cell-date">{formatDate(booking.start_date)}</td>
                        <td className="cell-date">{formatDate(booking.end_date)}</td>
                        <td className="cell-center">
                          {calculateNights(booking.start_date, booking.end_date)}
                        </td>
                        <td className="cell-center">
                          {booking.guests}{booking.children > 0 ? ` + ${booking.children}` : ''}
                        </td>
                        <td className="cell-board">{booking.board_type || '-'}</td>
                        <td className="cell-price">
                          {booking.total_price
                            ? `$${booking.total_price.toFixed(2)}`
                            : '-'}
                        </td>
                        <td className="cell-status">
                          <span className={`status-badge ${getStatusBadgeClass(booking.status)}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="cell-date">{formatDate(booking.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <nav className="listing-bottom-nav" aria-label="Navigation">
            <Link className="btn btn-outline" href="/rooms-list">
              View Rooms
            </Link>
            <Link className="btn btn-outline" href="/">
              Back to Home
            </Link>
          </nav>
        </div>
      </main>
    </>
  );
}
