import Link from 'next/link';
import { getUserBookings } from '@/actions/booking';
import { getCurrentUser } from '@/lib/auth';
import {
  Ticket,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Film,
  Plus
} from 'lucide-react';

export const metadata = {
  title: 'ตั๋วของฉัน (My Tickets) — CinemaGo',
  description: 'ดูประวัติการจองและตั๋วภาพยนตร์ E-Ticket ทั้งหมดของคุณ',
};

export default async function MyTicketPage() {
  const user = await getCurrentUser();
  const bookings = await getUserBookings();

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Ticket className="w-3.5 h-3.5" />
              <span>CinemaGo E-Tickets</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              ตั๋วภาพยนตร์ของฉัน
            </h1>
            <p className="text-neutral-400 text-xs sm:text-sm">
              รายการตั๋วและประวัติการสำรองที่นั่งทั้งหมดที่ผูกกับบัญชีของคุณ ({bookings.length} รายการ)
            </p>
          </div>

          <Link
            href="/"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-neutral-950 text-xs font-bold transition-all shadow-lg shadow-rose-500/20 flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>จองตั๋วเพิ่ม</span>
          </Link>
        </div>

        {/* Tickets Grid / List */}
        {bookings.length === 0 ? (
          <div className="py-16 text-center space-y-4 rounded-3xl bg-neutral-900/40 border border-dashed border-neutral-800">
            <div className="w-16 h-16 rounded-2xl bg-neutral-900 mx-auto flex items-center justify-center border border-neutral-800 text-neutral-500">
              <Ticket className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">ยังไม่มีรายการจองตั๋ว</h3>
              <p className="text-neutral-500 text-xs max-w-sm mx-auto">
                คุณยังไม่ได้ทำการจองตั๋วภาพยนตร์ เลือกรอบฉายและที่นั่งที่คุณต้องการได้ทันที
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white transition-all"
            >
              <Film className="w-4 h-4 text-amber-400" />
              <span>ดูภาพยนตร์ที่กำลังฉาย</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="group bg-neutral-900/80 hover:bg-neutral-900 backdrop-blur-xl rounded-3xl border border-neutral-800/90 hover:border-neutral-700 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                <div className="space-y-4">
                  {/* Top Bar: Booking ID & Status */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-amber-400 bg-neutral-950 px-2.5 py-1 rounded-lg border border-neutral-800">
                        {booking.id}
                      </span>
                      <span className="text-[11px] text-neutral-500">
                        {booking.bookedAt.split(' ')[0]}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>ชำระแล้ว</span>
                    </span>
                  </div>

                  {/* Movie Info */}
                  <div className="flex gap-4">
                    <img
                      src={booking.movie.poster}
                      alt={booking.movie.title}
                      className="w-20 h-28 object-cover rounded-xl shadow-lg border border-neutral-800 shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="space-y-1.5 flex-1">
                      <h3 className="font-black text-white text-base leading-tight group-hover:text-amber-400 transition-colors">
                        {booking.movie.title}
                      </h3>
                      <p className="text-xs text-neutral-400">{booking.movie.titleTh}</p>
                      
                      <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-neutral-300">
                        <span className="px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800">
                          {booking.hallName}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
                          {booking.hallType}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Showtime & Seats Info */}
                  <div className="p-3.5 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-neutral-300">
                      <span className="flex items-center gap-1.5 text-neutral-400">
                        <Clock className="w-3.5 h-3.5 text-rose-400" /> รอบฉาย:
                      </span>
                      <span className="font-semibold text-white">{booking.dateTime}</span>
                    </div>

                    <div className="flex items-center justify-between text-neutral-300">
                      <span className="text-neutral-400">ที่นั่ง ({booking.seats.length}):</span>
                      <span className="font-mono font-black text-emerald-400 text-sm">
                        {booking.seats.map((s) => s.id).join(', ')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 mt-4 border-t border-neutral-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-neutral-500 block">ยอดชำระ:</span>
                    <span className="text-base font-black text-white">
                      ฿{booking.totalPrice.toLocaleString()}
                    </span>
                  </div>

                  <Link
                    href={`/confirmation/${booking.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white transition-colors cursor-pointer group/link"
                  >
                    <span>ดู E-Ticket</span>
                    <ChevronRight className="w-3.5 h-3.5 text-amber-400 group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
