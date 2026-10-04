// lib/types.ts

export interface Movie {
  id: string;
  title: string;
  genre: string;
  posterUrl: string;
  rating: number;
  description: string;
}

export interface Showtime {
  id: string;
  movieId: string;
  date: string;      // "2026-10-15"
  time: string;       // "18:30"
  hallName: string;
}

export interface Seat {
  id: string;
  showtimeId: string;
  seatNumber: string;  // "A1", "B5"
  isBooked: boolean;
}

export interface User {
  id: string;
  email: string;
  password: string;   // hashed
  name: string;
}

export interface Booking {
  id: string;
  userId: string;
  showtimeId: string;
  selectedSeatIds: string[];
  totalPrice: number;
}