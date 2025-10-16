import type { NextApiRequest, NextApiResponse } from 'next';
import { getSupabase } from '../../lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  try {
    const first_name = req.body.first_name || null;
    const last_name = req.body.last_name || null;
    const rooms = req.body.rooms ? Number(req.body.rooms) : 1;
    const payload = {
      type: req.body.type,
      first_name,
      last_name,
      full_name: [first_name, last_name].filter(Boolean).join(' ') || req.body.full_name || null,
      email: req.body.email,
      phone: req.body.phone || null,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      guests: req.body.guests ? Number(req.body.guests) : null,
      children: req.body.children ? Number(req.body.children) : 0,
      rooms,
      room: req.body.room || null,
      nationality: req.body.nationality || null,
      id_document: req.body.id_document || null,
      notes: req.body.notes || null,
      created_at: new Date().toISOString()
    };

    const supabase = getSupabase();
    if (!supabase) {
      return res.status(200).json({ message: 'Received. Configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to store requests.' });
    }

    const { error } = await supabase.from('booking_requests').insert(payload as any);
    if (error) throw error;
    return res.status(200).json({ message: 'Request submitted. We will contact you soon.' });
  } catch (e: any) {
    return res.status(200).json({ message: 'Received. Please ensure the booking_requests table exists with RLS allowing anon inserts.' });
  }
}
