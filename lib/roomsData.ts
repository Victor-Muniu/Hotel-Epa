import { getSupabase } from './supabaseClient';

export interface Room {
  id: string;
  name: string;
  slug: string;
  description: string;
  capacity: number;
  beds: number;
  bathrooms: number;
  size_m2: number;
  price: number;
  currency: string;
  amenities: string[];
  images: string[];
  visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  room_id: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  start_date: string;
  end_date: string;
  guests: number;
  children: number;
  total_price: number | null;
  currency: string;
  board_type: string | null; // 'Bed Only' | 'Bed and Breakfast' | 'Half Board' | 'Full Board' | 'mixed'
  board_plan?: Array<{ date: string; board_type: string }>; // per-night plan
  status: 'pending' | 'confirmed' | 'cancelled' | 'checked_in' | 'checked_out';
  payment_status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export async function getRooms(): Promise<Room[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('visible', true)
    .order('price', { ascending: true });

  if (error) {
    console.error('Error fetching rooms:', error);
    return [];
  }

  return data || [];
}

export async function getRoomBySlug(slug: string): Promise<Room | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching room:', error);
    return null;
  }

  return data;
}

export async function getRoomById(id: string): Promise<Room | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching room:', error);
    return null;
  }

  return data;
}

export async function checkRoomAvailability(
  roomId: string,
  startDate: string,
  endDate: string
): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;

  const { data, error } = await supabase
    .from('bookings')
    .select('id')
    .eq('room_id', roomId)
    .eq('status', 'confirmed')
    .or(`and(start_date.lte.${endDate},end_date.gte.${startDate})`);

  if (error) {
    console.error('Error checking availability:', error);
    return true;
  }

  return !data || data.length === 0;
}

export async function createBooking(bookingData: Partial<Booking>): Promise<{ success: boolean; data?: Booking; error?: string }> {
  const supabase = getSupabase();
  if (!supabase) {
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert([bookingData])
      .select()
      .single();

    if (error) throw error;

    return { success: true, data };
  } catch (err: any) {
    console.error('Error creating booking:', err);
    return { success: false, error: err.message };
  }
}

export async function getBookingsByEmail(email: string): Promise<Booking[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('email', email)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }

  return data || [];
}
