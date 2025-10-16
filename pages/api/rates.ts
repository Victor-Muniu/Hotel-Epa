import type { NextApiRequest, NextApiResponse } from 'next';
import { getSupabase } from '../../lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const type = String(req.query.type || req.query.room_type || '').trim();
    if (!type) return res.status(400).json({ error: 'type is required' });

    const supabase = getSupabase();
    if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });

    const { data, error } = await supabase
      .from('hotel_rooms')
      .select('rate_bed_only, rate_bed_and_breakfast, rate_half_board, rate_full_board, status, type')
      .eq('type', type)
      .eq('status', 'available');

    if (error) return res.status(500).json({ error: error.message });

    function parse(v: any): number | null {
      if (v === null || v === undefined || v === '') return null;
      const n = Number(v);
      return Number.isFinite(n) ? n : null;
    }

    const rates = (data || []).reduce(
      (acc, r) => {
        const bo = parse((r as any).rate_bed_only);
        const bb = parse((r as any).rate_bed_and_breakfast);
        const hb = parse((r as any).rate_half_board);
        const fb = parse((r as any).rate_full_board);
        if (bo != null) acc.bed_only = Math.min(acc.bed_only ?? bo, bo);
        if (bb != null) acc.bed_and_breakfast = Math.min(acc.bed_and_breakfast ?? bb, bb);
        if (hb != null) acc.half_board = Math.min(acc.half_board ?? hb, hb);
        if (fb != null) acc.full_board = Math.min(acc.full_board ?? fb, fb);
        return acc;
      },
      { bed_only: null as number | null, bed_and_breakfast: null as number | null, half_board: null as number | null, full_board: null as number | null }
    );

    return res.status(200).json({ type, rates });
  } catch (e: any) {
    return res.status(500).json({ error: 'Failed to fetch rates' });
  }
}
