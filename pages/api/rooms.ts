import type { NextApiRequest, NextApiResponse } from 'next';
import { getRooms, getRoomById } from '../../lib/roomsData';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { id } = req.query;

    if (id && typeof id === 'string') {
      const room = await getRoomById(id);
      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }
      return res.status(200).json(room);
    }

    const rooms = await getRooms();
    return res.status(200).json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return res.status(500).json({ error: 'Failed to fetch rooms' });
  }
}
