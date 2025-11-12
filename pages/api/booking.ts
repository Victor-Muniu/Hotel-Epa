import type { NextApiRequest, NextApiResponse } from 'next';
import { getSupabase } from '../../lib/supabaseClient';
import { isValidEmail, isValidPhone, normalizePhone } from '../../lib/validation';

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

    // Email & phone validation
    const email = String(req.body.email || '').trim();
    const phoneRaw = String(req.body.phone || '').trim();
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email address.' });
    }
    if (!isValidPhone(phoneRaw)) {
      return res.status(400).json({ message: 'Invalid phone number.' });
    }
    const phone = normalizePhone(phoneRaw);

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

    const room_id_raw = String(req.body.room_id || '');
    const room_id = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(room_id_raw) ? room_id_raw : null;

    // Room types parsing (accepts array or JSON string)
    const room_types = Array.isArray(req.body.room_types)
      ? req.body.room_types
      : typeof req.body.room_types === 'string'
        ? (() => { try { return JSON.parse(req.body.room_types); } catch { return []; } })()
        : [];
    const room_type = room_types && room_types[0] ? String(room_types[0]) : null;

    const bookingPayload = {
      room_id,
      first_name,
      last_name,
      email,
      phone,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      guests,
      children,
      board_type: board_type_summary || null,
      board_plan,
      room_types,
      room_type,
      total_price: req.body.total_price || null,
      currency: 'USD',
      status: 'pending',
      payment_status: 'pending',
      notes: req.body.notes || null,
      created_at: new Date().toISOString()
    };

    // Insert only into bookings table
    const { error: bookingError } = await supabase.from('bookings').insert(bookingPayload as any);
    if (bookingError) {
      console.error('Bookings insert error:', bookingError);
      return res.status(500).json({ message: 'Failed to save booking.', details: bookingError.message || String(bookingError) });
    }

    return res.status(200).json({ message: 'Booking confirmed! We will contact you soon with details.' });
  } catch (e: any) {
    console.error('Booking error:', e);
    return res.status(500).json({ message: 'Failed to process booking.', details: e?.message || String(e) });
  }
}
