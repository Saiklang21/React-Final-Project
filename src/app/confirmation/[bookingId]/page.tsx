import { notFound } from 'next/navigation';
import { getBookingById } from '@/actions/booking';
import Link from 'next/link';
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  QrCode,
  Ticket,
  Printer,
  Home,
  ShieldCheck,
  Film,
  Sparkles
} from 'lucide-react';

interface ConfirmationPageProps {
  params: Promise<{
    bookingId: string;
  }>;
}

export default async function ConfirmationPage({ params }: ConfirmationPageProps) {
  const { bookingId } = await params;
  const booking = await getBookingById(bookingId);

  if (!booking) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-3xl mx-auto space-y-8 relative z-10">
        {/* Success Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-xl shadow-emerald-500/20 mb-2 animate-bounce">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            การจองตั๋วภาพยนตร์สำเร็จ!
          </h1>
          <p className="text-neutral-400 text-sm max-w-md mx-auto">
            ระบบได้ส่ง E-Ticket ยืนยันไปยังอีเมล <span className="text-amber-300 font-medium">{booking.userEmail}</span> เรียบร้อยแล้ว
          </p>
        </div>

        {/* Premium Digital E-Ticket Card */}
        <div className="bg-neutral-900/90 backdrop-blur-2xl rounded-3xl border border-neutral-800 shadow-2xl overflow-hidden relative">
          {/* Ticket Header */}
          <div className="bg-gradient-to-r from-neutral-900 via-neutral-850 to-neutral-900 p-6 sm:p-8 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center shadow-lg">
                <Ticket className="w-5 h-5 text-neutral-950 font-bold" />
              </div>
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-amber-400">
                  CinemaGo Official E-Ticket
                </span>
                <div className="text-sm font-bold text-neutral-200">
                  รหัสการจอง: <span className="font-mono text-white tracking-wider">{booking.id}</span>
                </div>
              </div>
            </div>

            <div className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>ชำระเงินสำเร็จแล้ว</span>
            </div>
          </div>

          {/* Ticket Body */}
          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Movie Poster & Title (5 cols) */}
            <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left gap-4">
              <img
                src={booking.movie.poster}
                alt={booking.movie.title}
                className="w-40 sm:w-48 h-60 object-cover rounded-2xl shadow-2xl border border-neutral-700/60"
              />
              <div>
                <h2 className="text-xl font-black text-white leading-tight">{booking.movie.title}</h2>
                <p className="text-xs text-neutral-400">{booking.movie.titleTh}</p>
                <div className="flex flex-wrap gap-1.5 mt-2 justify-center md:justify-start">
                  {booking.movie.genre.map((g) => (
                    <span key={g} className="text-[10px] px-2 py-0.5 rounded-md bg-neutral-800 text-neutral-300">
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Ticket Info & QR Code (7 cols) */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-6">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="bg-neutral-950/80 p-3.5 rounded-2xl border border-neutral-800/90 space-y-1">
                  <span className="text-neutral-500 text-[11px] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" /> โรงภาพยนตร์
                  </span>
                  <div className="font-bold text-white text-sm">{booking.hallName}</div>
                  <div className="text-[10px] text-amber-400 font-semibold">{booking.hallType}</div>
                </div>

                <div className="bg-neutral-950/80 p-3.5 rounded-2xl border border-neutral-800/90 space-y-1">
                  <span className="text-neutral-500 text-[11px] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-rose-400" /> วันที่และรอบฉาย
                  </span>
                  <div className="font-bold text-white text-sm">{booking.dateTime}</div>
                  <div className="text-[10px] text-neutral-400">ระบบเสียง: {booking.audio}</div>
                </div>

                <div className="bg-neutral-950/80 p-3.5 rounded-2xl border border-neutral-800/90 space-y-1 col-span-2">
                  <span className="text-neutral-500 text-[11px] flex items-center gap-1">
                    <Ticket className="w-3.5 h-3.5 text-emerald-400" /> ที่นั่ง ({booking.seats.length} ที่นั่ง)
                  </span>
                  <div className="font-mono font-black text-emerald-400 text-lg tracking-wider">
                    {booking.seats.map((s) => s.id).join('  ·  ')}
                  </div>
                </div>
              </div>

              {/* Customer & Price summary */}
              <div className="bg-neutral-950/50 p-4 rounded-2xl border border-neutral-800/60 space-y-2 text-xs text-neutral-400">
                <div className="flex justify-between">
                  <span>ชื่อผู้จอง:</span>
                  <span className="text-neutral-200 font-medium">{booking.userName}</span>
                </div>
                <div className="flex justify-between">
                  <span>เบอร์โทร:</span>
                  <span className="text-neutral-200 font-medium">{booking.userPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span>เวลาที่ทำรายการ:</span>
                  <span className="text-neutral-200 font-medium">{booking.bookedAt}</span>
                </div>
                <div className="pt-2 border-t border-neutral-800 flex justify-between items-baseline">
                  <span className="font-bold text-neutral-200">ยอดชำระเงินรวม:</span>
                  <span className="text-xl font-black text-amber-400">
                    ฿{booking.totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* QR Code Demo Section */}
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center gap-4">
                <div className="w-20 h-20 bg-white rounded-xl p-1.5 flex items-center justify-center shrink-0 shadow-md">
                  <QrCode className="w-full h-full text-black" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-white">สแกน QR Code เข้าโรงภาพยนตร์</div>
                  <div className="text-[11px] text-neutral-400">
                    สามารถแสดงบัตร E-Ticket บนมือถือแก่เจ้าหน้าที่หน้าทางเข้าโรงได้ทันที
                  </div>
                  <div className="font-mono text-[10px] text-neutral-500 tracking-widest uppercase">
                    BARCODE: {booking.id}-IMAX-{booking.showtimeId}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ticket Perforated Tear Line */}
          <div className="relative border-t-2 border-dashed border-neutral-800 py-3 bg-neutral-950/90 flex items-center justify-between px-6 text-[11px] text-neutral-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>CinemaGo Official Booking Verification</span>
            </div>
            <span>No refunds or exchanges after showtime begins</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-sm font-semibold transition-all flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>กลับสู่หน้าหลักภาพยนตร์</span>
          </Link>

          <Link
            href="/booking/st-101"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-neutral-950 text-sm font-extrabold transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>จองรอบภาพยนตร์อื่นเพิ่มเติม</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
