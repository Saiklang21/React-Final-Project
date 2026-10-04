'use server';

import { revalidatePath } from 'next/cache';
import { Booking, SeatType } from '@/types';
import { getCurrentUser } from '@/lib/auth';
import { INITIAL_MOVIES, INITIAL_SHOWTIMES, INITIAL_BOOKINGS } from '@/lib/mock-data';

export interface CreateBookingInput {
  showtimeId: string;
  movieId: string;
  hallName: string;
  hallType: string;
  dateTime: string;
  audio: string;
  seats: {
    id: string;
    row: string;
    number: number;
    type: SeatType;
    price: number;
  }[];
  totalPrice: number;
  paymentMethod: 'promptpay' | 'credit_card' | 'truemoney';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

export interface BookingResponse {
  success: boolean;
  bookingId?: string;
  message?: string;
}

// In-memory persistent storage for runtime demo
const bookingsStore = new Map<string, Booking>();

export async function createBookingAction(input: CreateBookingInput): Promise<BookingResponse> {
  try {
    // 1. Check user authentication
    const user = await getCurrentUser();
    const userId = user ? user.id : 'usr-guest-' + Math.random().toString(36).substring(2, 7);

    // 2. Validation
    if (!input.seats || input.seats.length === 0) {
      return { success: false, message: 'กรุณาเลือกที่นั่งอย่างน้อย 1 ที่นั่ง' };
    }

    if (!input.customerName || !input.customerEmail || !input.customerPhone) {
      return { success: false, message: 'กรุณากรอกข้อมูลติดต่อให้ครบถ้วน' };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.customerEmail)) {
      return { success: false, message: 'รูปแบบอีเมลไม่ถูกต้อง' };
    }

    // Phone validation
    if (input.customerPhone.replace(/\D/g, '').length < 9) {
      return { success: false, message: 'กรุณากรอกเบอร์โทรศัพท์ที่ถูกต้อง' };
    }

    // 3. Resolve movie details
    const movie = INITIAL_MOVIES.find((m) => m.id === input.movieId) || {
      id: input.movieId,
      title: 'CinemaGo Movie',
      titleTh: 'ภาพยนตร์',
      poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
      duration: 120,
      genre: ['Action', 'Drama'],
    };

    // 4. Generate unique Booking ID
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const bookingId = `BK-${randomNum}`;

    const newBooking: Booking = {
      id: bookingId,
      userId,
      userName: input.customerName,
      userEmail: input.customerEmail,
      userPhone: input.customerPhone,
      showtimeId: input.showtimeId,
      movie: {
        id: movie.id,
        title: movie.title,
        titleTh: movie.titleTh,
        poster: movie.poster,
        duration: movie.duration,
        genre: movie.genre,
      },
      hallName: input.hallName,
      hallType: input.hallType,
      dateTime: input.dateTime,
      audio: input.audio,
      seats: input.seats,
      totalPrice: input.totalPrice,
      paymentMethod: input.paymentMethod,
      paymentStatus: 'completed',
      bookedAt: new Date().toLocaleString('th-TH', {
        timeZone: 'Asia/Bangkok',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    // Save to runtime store
    bookingsStore.set(bookingId, newBooking);

    // 5. Update seat isBooked status in mock showtimes
    const showtime = INITIAL_SHOWTIMES.find((st) => st.id === input.showtimeId);
    if (showtime) {
      const bookedSeatIds = new Set(input.seats.map((s) => s.id));
      showtime.seats.forEach((seat) => {
        if (bookedSeatIds.has(seat.id)) {
          seat.isBooked = true;
        }
      });
    }

    // 6. Revalidate cache
    revalidatePath(`/booking/${input.showtimeId}`);
    revalidatePath(`/confirmation/${bookingId}`);

    return {
      success: true,
      bookingId,
      message: 'การจองตั๋วสำเร็จเรียบร้อย',
    };
  } catch (error) {
    console.error('Error creating booking:', error);
    return {
      success: false,
      message: 'เกิดข้อผิดพลาดในการบันทึกการจอง กรุณาลองใหม่อีกครั้ง',
    };
  }
}

export async function getBookingById(bookingId: string): Promise<Booking | null> {
  // Check in runtime store first
  if (bookingsStore.has(bookingId)) {
    return bookingsStore.get(bookingId)!;
  }

  // Check in initial bookings
  const initial = INITIAL_BOOKINGS.find((b) => b.id === bookingId);
  if (initial) return initial;
  
  // Fallback demo bookings
  const defaultBooking: Booking = {
    id: bookingId,
    userId: 'usr-frame',
    userName: 'จิรัฎฐ์ วงค์กาสิทธิ์ (คุณเฟรม)',
    userEmail: 'example@cinemago.com',
    userPhone: '089-123-4567',
    showtimeId: 'st-101',
    movie: {
      id: 'm-1',
      title: 'Dune: Part Two',
      titleTh: 'ดูน ภาคสอง',
      poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
      duration: 166,
      genre: ['Sci-Fi', 'Action', 'Adventure'],
    },
    hallName: 'Cinema 1 (IMAX)',
    hallType: 'IMAX Laser',
    dateTime: 'วันนี้, 19:30 น.',
    audio: 'EN/TH',
    seats: [
      { id: 'C-5', row: 'C', number: 5, type: 'premium', price: 300 },
      { id: 'C-6', row: 'C', number: 6, type: 'premium', price: 300 },
    ],
    totalPrice: 600,
    paymentMethod: 'promptpay',
    paymentStatus: 'completed',
    bookedAt: new Date().toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' }),
  };

  return defaultBooking;
}

export async function getUserBookings(): Promise<Booking[]> {
  const user = await getCurrentUser();
  const currentUserId = user ? user.id : 'usr-frame';

  // Get all bookings from runtime store
  const storeBookings = Array.from(bookingsStore.values());
  
  // Combine initial bookings and newly created bookings
  const allBookings = [...storeBookings, ...INITIAL_BOOKINGS];

  // Remove duplicates by id
  const uniqueBookingsMap = new Map<string, Booking>();
  allBookings.forEach((b) => {
    uniqueBookingsMap.set(b.id, b);
  });

  return Array.from(uniqueBookingsMap.values());
}
