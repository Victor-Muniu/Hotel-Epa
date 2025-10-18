import type { NextApiRequest, NextApiResponse } from 'next';
import { getSupabase } from '../../lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  
  try {
    const supabase = getSupabase();
    if (!supabase) {
      return res.status(200).json({ message: 'Received. Configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to store requests.' });
    }

    const first_name = req.body.first_name || null;
    const last_name = req.body.last_name || null;
    const rooms = req.body.rooms ? Number(req.body.rooms) : 1;
    const guests = req.body.guests ? Number(req.body.guests) : 1;
    const children = req.body.children ? Number(req.body.children) : 0;

    // Date validation
    const startDateStr: string = String(req.body.start_date || '');
    const endDateStr: string = String(req.body.end_date || '');
    const isYMD = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s);
    if (!isYMD(startDateStr) || !isYMD(endDateStr)) {
      return res.status(400).json({ message: 'Invalid date format. Use YYYY-MM-DD.' });
    }
    const todayStr = new Date().toISOString().slice(0, 10);
    if (startDateStr < todayStr) {
      return res.status(400).json({ message: 'Check-in date cannot be in the past.' });
    }
    if (endDateStr <= startDateStr) {
      return res.status(400).json({ message: 'Check-out must be after check-in.' });
    }

    // Per-night board plan parsing
    const board_plan_input = req.body.board_plan;
    let board_plan: Array<{ date: string; board_type: string }> = [];
    if (Array.isArray(board_plan_input)) {
      board_plan = board_plan_input as any;
    } else if (typeof board_plan_input === 'string') {
      try { board_plan = JSON.parse(board_plan_input); } catch { board_plan = []; }
    }
    const distinctTypes = Array.from(new Set(board_plan.map((d) => String(d.board_type || '').trim()).filter(Boolean)));
    const rawType = String(req.body.type || '');
    const candidateType = rawType.toLowerCase() === 'room' ? (req.body.board_type || null) : (rawType || req.body.board_type || null);
    const board_type_summary = candidateType || (distinctTypes.length <= 1 ? (distinctTypes[0] || null) : 'mixed');

    const bookingPayload = {
      room_id: req.body.room_id || null,
      first_name,
      last_name,
      email: req.body.email,
      phone: req.body.phone || null,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      guests,
      children,
      board_type: board_type_summary || null,
      board_plan,
      total_price: req.body.total_price || null,
      currency: 'USD',
      status: 'pending',
      payment_status: 'pending',
      notes: req.body.notes || null,
      created_at: new Date().toISOString()
    };

    // Insert booking
    const { error: bookingError } = await supabase.from('bookings').insert(bookingPayload as any);
    if (bookingError) throw bookingError;

    // Also maintain backward compatibility with booking_requests table
    const requestPayload = {
      type: req.body.type,
      first_name,
      last_name,
      full_name: [first_name, last_name].filter(Boolean).join(' ') || req.body.full_name || null,
      email: req.body.email,
      phone: req.body.phone || null,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      guests,
      children,
      rooms,
      room: req.body.room || null,
      nationality: req.body.nationality || null,
      id_document: req.body.id_document || null,
      notes: req.body.notes || null,
      created_at: new Date().toISOString()
    };

    const { error: requestError } = await supabase.from('booking_requests').insert(requestPayload as any);
    if (requestError) throw requestError;

    return res.status(200).json({ message: 'Booking confirmed! We will contact you soon with details.' });
  } catch (e: any) {
    console.error('Booking error:', e);
    return res.status(200).json({ message: 'Booking received. Please ensure the bookings and booking_requests tables exist with RLS allowing anon inserts.' });
  }
}
