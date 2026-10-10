'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Seat, Showtime, Movie } from '@/types';
import { useBooking } from '@/context/BookingContext';
import { Armchair, Sparkles, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Clock, MapPin, Film } from 'lucide-react';

interface SeatSelectorProps {
  showtime: Showtime;
  movie: Movie;
}

export default function SeatSelector({ showtime, movie }: SeatSelectorProps) {
  const router = useRouter();
  const { setBookingState } = useBooking();
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Group seats by row
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsByRow: Record<string, Seat[]> = {};
  rows.forEach((r) => {
    seatsByRow[r] = showtime.seats
      .filter((s) => s.row === r)
      .sort((a, b) => a.number - b.number);
  });

  const selectedSeats = showtime.seats.filter((s) => selectedSeatIds.includes(s.id));
  const totalPrice = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  const toggleSeat = (seat: Seat) => {
    if (seat.isBooked) return;
    setErrorMsg(null);

    if (selectedSeatIds.includes(seat.id)) {
      setSelectedSeatIds((prev) => prev.filter((id) => id !== seat.id));
    } else {
      if (selectedSeatIds.length >= 8) {
        setErrorMsg('สามารถเลือกที่นั่งได้สูงสุด 8 ที่นั่งต่อรายการจอง');
        return;
      }
      setSelectedSeatIds((prev) => [...prev, seat.id]);
    }
  };

  const handleProceedToCheckout = () => {
    if (selectedSeats.length === 0) {
      setErrorMsg('กรุณาเลือกที่นั่งอย่างน้อย 1 ที่นั่งเพื่อดำเนินการต่อ');
      return;
    }

    // Persist selected booking in Global State (BookingContext) and sessionStorage
    const checkoutData = {
      showtimeId: showtime.id,
      movieId: movie.id,
      movieTitle: movie.title,
      movieTitleTh: movie.titleTh,
      moviePoster: movie.poster,
      hallName: showtime.hall.name,
      hallType: showtime.hall.type,
      dateTime: showtime.dateTime,
      audio: showtime.audio,
      seats: selectedSeats.map((s) => ({
        id: s.id,
        row: s.row,
        number: s.number,
        type: s.type,
        price: s.price,
      })),
      totalPrice,
    };

    setBookingState(checkoutData);
    router.push('/checkout');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Seat Matrix Section */}
      <div className="flex-1 w-full bg-neutral-900/60 backdrop-blur-md rounded-3xl border border-neutral-800/80 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Movie quick info header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-800">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 mb-2">
              <Film className="w-3.5 h-3.5" /> กำลังฉาย
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{movie.title}</h1>
            <p className="text-neutral-400 text-sm">{movie.titleTh}</p>
          </div>
          <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-300">
            <div className="flex items-center gap-1.5 bg-neutral-950/80 px-3 py-1.5 rounded-xl border border-neutral-800">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{showtime.hall.name} ({showtime.hall.type})</span>
            </div>
            <div className="flex items-center gap-1.5 bg-neutral-950/80 px-3 py-1.5 rounded-xl border border-neutral-800">
              <Clock className="w-4 h-4 text-rose-400" />
              <span>{showtime.dateTime}</span>
            </div>
          </div>
        </div>

        {/* Cinema Screen Projection Curve */}
        <div className="my-10 text-center relative">
          <div className="relative mx-auto max-w-xl h-14 overflow-hidden">
            <div className="w-full h-24 border-t-4 border-amber-400/80 rounded-[100%] shadow-[0_-15px_35px_rgba(251,191,36,0.35)] bg-gradient-to-b from-amber-400/15 to-transparent" />
          </div>
          <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-neutral-400 -mt-6">
            จอภาพยนตร์ (CINEMA SCREEN)
          </div>
          <div className="w-48 h-1 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mx-auto mt-2 blur-sm" />
        </div>

        {/* Interactive Seats Matrix */}
        <div className="overflow-x-auto pb-6">
          <div className="min-w-[620px] flex flex-col items-center gap-3">
            {rows.map((rowLetter) => {
              const rowSeats = seatsByRow[rowLetter] || [];
              const isVipRow = rowLetter === 'A' || rowLetter === 'B';
              const isPremiumRow = rowLetter === 'C' || rowLetter === 'D' || rowLetter === 'E';

              return (
                <div key={rowLetter} className="flex items-center gap-3">
                  {/* Row Letter label left */}
                  <span className="w-6 text-center text-xs font-bold text-neutral-500 font-mono">
                    {rowLetter}
                  </span>

                  {/* Seat items */}
                  <div className="flex items-center gap-2">
                    {rowSeats.map((seat, index) => {
                      const isSelected = selectedSeatIds.includes(seat.id);
                      const isBooked = seat.isBooked;

                      // Space for aisle in middle (between seat 6 and 7)
                      const hasAisle = index === 5;

                      return (
                        <div key={seat.id} className="flex items-center">
                          <button
                            type="button"
                            onClick={() => toggleSeat(seat)}
                            disabled={isBooked}
                            title={`${seat.id} • ${seat.type.toUpperCase()} • ฿${seat.price}`}
                            className={`group relative flex items-center justify-center transition-all duration-200 cursor-pointer rounded-t-lg font-mono text-[10px] font-bold select-none ${
                              isVipRow ? 'w-8 h-8' : 'w-7 h-7'
                            } ${
                              isBooked
                                ? 'bg-neutral-800 text-neutral-600 cursor-not-allowed border border-neutral-800/40 opacity-40'
                                : isSelected
                                ? 'bg-emerald-500 text-neutral-950 scale-110 shadow-lg shadow-emerald-500/50 ring-2 ring-emerald-300 font-extrabold z-10'
                                : isVipRow
                                ? 'bg-amber-950/40 text-amber-300 border border-amber-500/40 hover:bg-amber-500 hover:text-neutral-950 hover:scale-110 hover:shadow-lg hover:shadow-amber-500/40'
                                : isPremiumRow
                                ? 'bg-indigo-950/40 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-500 hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-indigo-500/40'
                                : 'bg-neutral-800/80 text-neutral-300 border border-neutral-700/60 hover:bg-rose-500 hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-rose-500/40'
                            }`}
                          >
                            <Armchair className={`transition-transform duration-200 ${isSelected ? 'w-4 h-4' : 'w-3.5 h-3.5'}`} />
                          </button>

                          {hasAisle && <div className="w-6" />}
                        </div>
                      );
                    })}
                  </div>

                  {/* Row Letter label right */}
                  <span className="w-6 text-center text-xs font-bold text-neutral-500 font-mono">
                    {rowLetter}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 pt-6 border-t border-neutral-800/80 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-t-md bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center">
              <Armchair className="w-3 h-3 text-neutral-400" />
            </div>
            <span>Standard (240฿)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-t-md bg-indigo-950/40 border border-indigo-500/40 flex items-center justify-center">
              <Armchair className="w-3 h-3 text-indigo-300" />
            </div>
            <span>Premium (300฿)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-t-md bg-amber-950/40 border border-amber-500/40 flex items-center justify-center">
              <Armchair className="w-3 h-3 text-amber-300" />
            </div>
            <span>VIP Sofa (450฿)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-t-md bg-emerald-500 text-neutral-950 flex items-center justify-center shadow-md shadow-emerald-500/30 font-bold">
              <Armchair className="w-3 h-3" />
            </div>
            <span className="text-emerald-400 font-medium">เลือกแล้ว</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-t-md bg-neutral-800 text-neutral-600 opacity-40 flex items-center justify-center">
              <Armchair className="w-3 h-3" />
            </div>
            <span>จองแล้ว</span>
          </div>
        </div>
      </div>

      {/* Booking Summary Sidebar */}
      <aside className="w-full lg:w-96 bg-neutral-900/80 backdrop-blur-xl rounded-3xl border border-neutral-800/90 p-6 shadow-2xl flex flex-col gap-6 sticky top-24">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" /> สรุปการเลือกที่นั่ง
          </h2>
          <span className="text-xs px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700">
            {selectedSeats.length} ที่นั่ง
          </span>
        </div>

        {/* Selected Seats List */}
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            ที่นั่งที่คุณเลือก:
          </p>

          {selectedSeats.length === 0 ? (
            <div className="py-8 text-center text-neutral-500 text-xs rounded-2xl bg-neutral-950/40 border border-dashed border-neutral-800">
              <Armchair className="w-8 h-8 mx-auto mb-2 opacity-30 text-neutral-400" />
              กรุณาคลิกเลือกที่นั่งบนผังด้านซ้าย
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
              {selectedSeats.map((seat) => (
                <div
                  key={seat.id}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs group hover:border-emerald-500/50 transition-colors"
                >
                  <span className="font-mono font-black text-emerald-400">{seat.id}</span>
                  <span className="text-neutral-400 text-[11px] capitalize">({seat.type})</span>
                  <span className="text-neutral-200 font-semibold">฿{seat.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Price Breakdown */}
        <div className="bg-neutral-950/70 rounded-2xl p-4 border border-neutral-800/80 space-y-2 text-sm">
          <div className="flex justify-between text-neutral-400 text-xs">
            <span>ภาพยนตร์</span>
            <span className="text-neutral-200 font-medium truncate max-w-[180px]">{movie.title}</span>
          </div>
          <div className="flex justify-between text-neutral-400 text-xs">
            <span>โรงภาพยนตร์</span>
            <span className="text-neutral-200 font-medium">{showtime.hall.name}</span>
          </div>
          <div className="flex justify-between text-neutral-400 text-xs">
            <span>ระบบเสียง/ภาษา</span>
            <span className="text-neutral-200 font-medium">{showtime.audio}</span>
          </div>
          <div className="pt-3 mt-3 border-t border-neutral-800 flex justify-between items-baseline">
            <span className="text-sm font-semibold text-neutral-300">ยอดรวมทั้งสิ้น:</span>
            <span className="text-2xl font-black bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent">
              ฿{totalPrice.toLocaleString()}
            </span>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleProceedToCheckout}
          disabled={selectedSeats.length === 0}
          className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-xl cursor-pointer ${
            selectedSeats.length > 0
              ? 'bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white shadow-rose-500/25 hover:scale-[1.02] active:scale-[0.98]'
              : 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700/50'
          }`}
        >
          <span>ดำเนินการต่อ (ไปหน้าชำระเงิน)</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>ระบบจองตั๋วแบบเรียลไทม์ ปลอดภัย 100%</span>
        </div>
      </aside>
    </div>
  );
}
