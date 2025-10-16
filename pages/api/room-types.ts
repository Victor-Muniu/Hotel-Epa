import type { NextApiRequest, NextApiResponse } from 'next';
import { getSupabase } from '../../lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const supabase = getSupabase();
    if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });

    const { data, error } = await supabase
      .from('hotel_rooms')
      .select('type');

    if (error) return res.status(500).json({ error: error.message });

    const types = Array.from(new Set((data || []).map((r: any) => String(r.type || '').trim()).filter(Boolean))).sort();

    return res.status(200).json({ types });
  } catch (e: any) {
    return res.status(500).json({ error: 'Failed to fetch room types' });
  }
}
