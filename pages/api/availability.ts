import type { NextApiRequest, NextApiResponse } from 'next';
import { getSupabase } from '../../lib/supabaseClient';

function normalizeString(v: any) {
  return typeof v === 'string' ? v.trim() : '';
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const roomType = normalizeString(req.body.roomType || req.body.room_type || req.body.room || '');
    const checkIn = normalizeString(req.body.checkIn || req.body.check_in || req.body.startDate || req.body.start_date || '');
    const checkOut = normalizeString(req.body.checkOut || req.body.check_out || req.body.endDate || req.body.end_date || '');
    const requestedRooms = Number(req.body.rooms ?? req.body.quantity ?? 1) || 1;

    if (!roomType || !checkIn || !checkOut) {
      return res.status(400).json({ error: 'roomType, checkIn, and checkOut are required' });
    }

    const supabase = getSupabase();
    if (!supabase) {
      return res.status(500).json({ error: 'Supabase not configured' });
    }

    async function fetchRoomsByType(): Promise<{ ids: string[]; count: number }> {
      const candidates = [
        { table: 'hotel_rooms', col: 'type' },
        { table: 'hotel_rooms', col: 'room_type' },
        { table: 'hotel_rooms', col: 'name' }
      ];

      for (const c of candidates) {
        try {
          const { data, error } = await supabase
            .from(c.table)
            .select('id,status')
            .eq(c.col, roomType)
            .eq('status', 'available');
          if (!error && Array.isArray(data)) {
            const ids = (data as any[])
              .filter((r: any) => !r.status || r.status === 'available')
              .map((r: any) => String(r.id));
            return { ids, count: ids.length };
          }
        } catch (_) {}
      }
      return { ids: [], count: 0 };
    }

    async function countOverlappingReservations(roomIds: string[]): Promise<{ rows: any[]; usedIds: Set<string> }> {
      const datePairs: Array<{ start: string; end: string }> = [
        { start: 'check_in', end: 'check_out' },
        { start: 'start_date', end: 'end_date' }
      ];

      const filters: Array<'room_type' | 'type' | 'room_id'> = ['room_type', 'type', 'room_id'];

      for (const pair of datePairs) {
        for (const filter of filters) {
          try {
            let q = supabase.from('room_reservations').select('*');

            // Date overlap: start <= checkOut AND end >= checkIn
            q = q.or(`and(${pair.start}.lte.${checkOut},${pair.end}.gte.${checkIn})`);

            if (filter === 'room_id' && roomIds.length > 0) {
              q = q.in('room_id', roomIds);
            } else if (filter === 'room_type' || filter === 'type') {
              q = q.eq(filter as any, roomType);
            }

            const { data, error } = await q;
            if (!error && Array.isArray(data)) {
              const rows = data as any[];
              const usedIds = new Set<string>();
              for (const r of rows) {
                if (r.room_id != null) usedIds.add(String(r.room_id));
              }
              return { rows, usedIds };
            }
          } catch (_) {}
        }
      }
      return { rows: [], usedIds: new Set<string>() };
    }

    const { ids: roomIds, count: capacity } = await fetchRoomsByType();

    const { rows: overlaps, usedIds } = await countOverlappingReservations(roomIds);

    const reservedCount = usedIds.size > 0 ? usedIds.size : overlaps.length;

    const remaining = Math.max(0, capacity - reservedCount);
    const available = remaining >= requestedRooms;

    return res.status(200).json({ available, remaining, capacity, requestedRooms });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to check availability' });
  }
}
