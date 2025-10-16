import type { NextApiRequest, NextApiResponse } from 'next';
import { checkRoomAvailability } from '../../lib/roomsData';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { roomId, startDate, endDate } = req.body;

    if (!roomId || !startDate || !endDate) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const available = await checkRoomAvailability(roomId, startDate, endDate);
    return res.status(200).json({ available });
  } catch (error) {
    console.error('Error checking availability:', error);
    return res.status(500).json({ error: 'Failed to check availability' });
  }
}
