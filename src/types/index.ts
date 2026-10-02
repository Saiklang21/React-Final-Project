export type SeatType = 'standard' | 'premium' | 'vip';
export type SeatStatus = 'available' | 'selected' | 'booked' | 'reserved';

export interface Seat {
  id: string; // e.g. "A-1"
  row: string; // "A"
  number: number; // 1
  type: SeatType;
  price: number;
  isBooked: boolean;
}

export interface Movie {
  id: string;
  title: string;
  titleTh: string;
  poster: string;
  backdrop: string;
  duration: number; // minutes
  rating: string;
  genre: string[];
  releaseDate: string;
  synopsis: string;
}

export interface Hall {
  id: string;
  name: string;
  type: 'IMAX Laser' | 'Digital 4K' | 'Laser 4DX' | 'Standard';
  totalSeats: number;
}

export interface Showtime {
  id: string;
  movieId: string;
  hall: Hall;
  dateTime: string; // "2026-10-01 19:30"
  audio: 'TH/TH' | 'EN/TH';
  seats: Seat[];
}

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  showtimeId: string;
  movie: {
    id: string;
    title: string;
    titleTh: string;
    poster: string;
    duration: number;
    genre: string[];
  };
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
  paymentStatus: 'completed' | 'pending';
  bookedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // bcrypt hash — เฉพาะฝั่งเซิร์ฟเวอร์เท่านั้น (มาจาก Part A)
  phone?: string;
  avatar?: string;
}
