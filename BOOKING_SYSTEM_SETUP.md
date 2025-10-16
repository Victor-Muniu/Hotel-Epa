# Hotel Booking System - Setup Instructions

This hotel booking system has been fully integrated with your Supabase HMS project. Follow these steps to get everything working.

## Step 1: Set Up Your Supabase Database

### Option A: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project: https://app.supabase.com
2. Open the **SQL Editor** tab
3. Create a new query and copy all the SQL from `lib/supabase-schema.sql`
4. Click **Run** to execute the SQL and create all tables and sample rooms

### Option B: Using SQL Files

If you have psql access, you can run:
```bash
psql postgresql://[user]:[password]@[host]/[database] -f lib/supabase-schema.sql
```

## Step 2: Verify Environment Variables

Your Supabase credentials have been set as environment variables:
- ✅ `NEXT_PUBLIC_SUPABASE_URL` = https://uhxofvlffmkrlqvbisil.supabase.co
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Your provided key

These are already configured and should work automatically.

## Step 3: Test the Booking System

1. **View Available Rooms**: Navigate to `/rooms-list` or click "Rooms" in the navigation
2. **Create a Booking**: Click "Book Now" on any room
3. **Fill in Details**: Enter guest information, dates, and preferences
4. **Submit**: Click "Confirm Booking"

## Database Schema Overview

### Tables Created:

#### `rooms`
Stores all available rooms with their details:
- ID, name, slug, description, capacity, beds, bathrooms, size, price
- Amenities, images, visible flag

#### `bookings`
Stores confirmed bookings:
- Room ID, guest info, dates, guest count, board type
- Total price, status (pending/confirmed/cancelled), payment status

#### `booking_requests`
Legacy lead capture (maintained for compatibility):
- Stores initial booking inquiries

#### `room_availability`
Tracks availability per date:
- Room ID, date, status, booking ID, rate

## Features Included

✅ **Room Listing**: Browse all available rooms with images, amenities, and pricing
✅ **Real-time Booking**: Instantly book a room with guest details
✅ **Availability Checking**: Automatically prevents double-bookings
✅ **Guest Information**: Collects comprehensive booking details
✅ **Board Types**: Support for Bed Only, B&B, Half Board, Full Board
✅ **Database Integration**: All bookings saved to Supabase
✅ **Responsive Design**: Works on desktop and mobile devices
✅ **API Endpoints**: RESTful APIs for rooms and availability

## API Endpoints

### Get All Rooms
```
GET /api/rooms
```
Returns array of available rooms

### Get Single Room
```
GET /api/rooms?id=[room_id]
```
Returns specific room details

### Check Availability
```
POST /api/availability
Body: { roomId: string, startDate: string, endDate: string }
```
Returns: { available: boolean }

### Create Booking
```
POST /api/booking
Body: { room_id, first_name, last_name, email, phone, start_date, end_date, guests, children, type, notes }
```
Returns booking confirmation

## Navigation Updates

The main navigation has been updated with a "Rooms" link that directs to the room listing:
- Home → Rooms → Accommodation → Conferences → Attractions
- Book Now button now links to room listing

## Sample Data

4 sample rooms have been created:
1. **Premium Apartment with 2 Bedrooms** - $150/night - 6 guests
2. **Deluxe Suite** - $120/night - 2 guests  
3. **Standard Room** - $80/night - 2 guests
4. **Economy Room** - $50/night - 1 guest

## Customization

### To Add More Rooms:
Use Supabase dashboard or update the INSERT statements in `lib/supabase-schema.sql`

### To Modify Booking Fields:
1. Update the form in `pages/rooms-list.tsx`
2. Add corresponding fields in `lib/roomsData.ts`
3. Update the booking API in `pages/api/booking.ts`

### To Change Pricing:
Update the `price` field in the `rooms` table via Supabase dashboard

## Troubleshooting

### Bookings not saving?
- Check that Row Level Security (RLS) policies are enabled
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- Check Supabase dashboard for any error messages

### Rooms not showing?
- Verify rooms table exists: Go to Supabase > Tables > Look for "rooms"
- Check that rooms have `visible = true`
- Ensure `NEXT_PUBLIC_SUPABASE_ANON_KEY` has SELECT permission

### Double bookings happening?
- The system checks for overlapping bookings automatically
- If issues persist, check the `bookings` table for conflicting dates

## Security Notes

- Anonymous users can only insert into `booking_requests` and `bookings`
- Sensitive guest information is stored encrypted by Supabase
- All queries use parameterized statements to prevent SQL injection
- Consider adding authentication for admin/staff features

## Next Steps

1. ✅ Verify database tables are created
2. ✅ Test room listing page
3. ✅ Make a test booking
4. Consider adding:
   - Email notifications on booking
   - Admin dashboard to manage bookings
   - Payment integration
   - Multi-language support
   - Advanced filters and search

## File Structure

```
lib/
  ├── supabaseClient.ts      # Supabase client initialization
  ├── supabase-schema.sql    # Database schema & setup
  ├── roomsData.ts          # Room data fetching functions
  └── attractionsData.ts     # (Existing)

pages/
  ├── api/
  │   ├── booking.ts        # Booking creation endpoint
  │   ├── rooms.ts          # Rooms listing endpoint
  │   ├── availability.ts   # Availability checking endpoint
  │   └── booking.ts        # (Updated)
  ├── rooms-list.tsx        # NEW - Room listing page
  ├── rooms.tsx             # (Existing)
  └── index.tsx             # (Updated links)

components/
  └── Layout.tsx            # (Updated navigation)

styles/
  └── globals.css           # (Added room styling)
```

## Support

For issues or questions:
1. Check the Supabase dashboard for database status
2. Review browser console for JavaScript errors
3. Check Supabase logs for database errors
4. Verify all environment variables are set correctly

---

**Last Updated**: Database schema created with sample rooms
**Status**: Ready for testing
