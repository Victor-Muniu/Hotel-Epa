import type { NextApiRequest, NextApiResponse } from 'next';
import { getSupabase } from '../../lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const supabase = getSupabase();
    if (!supabase) {
      return res.status(500).json({ error: 'Supabase not configured' });
    }

    const first_name = String(req.body.first_name || '').trim() || null;
    const last_name = String(req.body.last_name || '').trim() || null;
    const email = String(req.body.email || '').trim();
    const phone = String(req.body.phone || '').trim() || null;
    const start_date = req.body.start_date || req.body.checkIn || req.body.check_in || null;
    const end_date = req.body.end_date || req.body.checkOut || req.body.check_out || null;
    const adults = Number(req.body.adults ?? 1) || 1;
    const children = Number(req.body.children ?? req.body.kids ?? 0) || 0;
    const rooms = Number(req.body.rooms ?? req.body.num_rooms ?? 1) || 1;
    const room_types = Array.isArray(req.body.room_types)
      ? req.body.room_types
      : typeof req.body.room_types === 'string'
        ? (() => { try { return JSON.parse(req.body.room_types); } catch { return []; } })()
        : [];
    const notes = String(req.body.notes || '').trim() || null;
    const inquiry_type = String(req.body.inquiry_type || req.body.type || 'room');

    if (!email) return res.status(400).json({ error: 'email is required' });

    const quotePayload = {
      inquiry_type,
      first_name,
      last_name,
      email,
      phone,
      start_date,
      end_date,
      adults,
      children,
      rooms,
      room_types,
      notes,
      status: 'new',
      created_at: new Date().toISOString()
    } as any;

    const { error: qErr } = await supabase.from('quotes').insert(quotePayload);
    if (qErr) throw qErr;

    // Backward compatibility to booking_requests used elsewhere
    const requestPayload = {
      type: inquiry_type,
      first_name,
      last_name,
      full_name: [first_name, last_name].filter(Boolean).join(' ') || null,
      email,
      phone,
      start_date,
      end_date,
      guests: adults,
      children,
      rooms,
      room: room_types && room_types[0] ? String(room_types[0]) : null,
      notes,
      created_at: new Date().toISOString()
    } as any;

    await supabase.from('booking_requests').insert(requestPayload);

    return res.status(200).json({ message: 'Quote request submitted successfully. We will contact you shortly.' });
  } catch (e: any) {
    console.error('Quote error:', e);
    return res.status(500).json({ error: 'Failed to submit quote request' });
  }
}
