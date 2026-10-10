'use client';

/**
 * Global State ฝั่ง Client (React Context API)
 * ใช้สำหรับจัดการข้อมูลการเลือกที่นั่ง และยอดรวมราคา ในส่วน interactive ของแอปพลิเคชัน
 * ตรงตาม Requirement ข้อ 5: "มี global state ฝั่ง client (Context หรือ Redux/Zustand) สำหรับส่วนที่ interactive"
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SeatType } from '@/types';

export interface SelectedSeatInfo {
  id: string;
  row: string;
  number: number;
  type: SeatType;
  price: number;
}

export interface BookingState {
  showtimeId: string;
  movieId: string;
  movieTitle: string;
  movieTitleTh: string;
  moviePoster: string;
  hallName: string;
  hallType: string;
  dateTime: string;
  audio: string;
  seats: SelectedSeatInfo[];
  totalPrice: number;
}

interface BookingContextType {
  bookingState: BookingState | null;
  setBookingState: (state: BookingState | null) => void;
  updateSeats: (seats: SelectedSeatInfo[], totalPrice: number) => void;
  clearBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [bookingState, setBookingState] = useState<BookingState | null>(null);

  // โหลดสถานะการจองจาก sessionStorage เมือเข้าสู่ระบบฝั่ง Client
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('cinemago_checkout');
      if (stored) {
        setBookingState(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load booking state from sessionStorage', e);
    }
  }, []);

  const handleSetBookingState = (state: BookingState | null) => {
    setBookingState(state);
    if (state) {
      sessionStorage.setItem('cinemago_checkout', JSON.stringify(state));
    } else {
      sessionStorage.removeItem('cinemago_checkout');
    }
  };

  const updateSeats = (seats: SelectedSeatInfo[], totalPrice: number) => {
    if (bookingState) {
      const updated = { ...bookingState, seats, totalPrice };
      handleSetBookingState(updated);
    }
  };

  const clearBooking = () => {
    handleSetBookingState(null);
  };

  return (
    <BookingContext.Provider
      value={{
        bookingState,
        setBookingState: handleSetBookingState,
        updateSeats,
        clearBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
