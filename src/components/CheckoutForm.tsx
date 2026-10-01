'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createBookingAction } from '@/actions/booking';
import { SeatType } from '@/types';
import {
  CreditCard,
  QrCode,
  Wallet,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Film,
  MapPin,
  Calendar,
  Volume2,
  Tag,
  ArrowLeft,
  Lock
} from 'lucide-react';
import Link from 'next/link';

interface CheckoutData {
  showtimeId: string;
  movieId: string;
  movieTitle: string;
  movieTitleTh: string;
  moviePoster: string;
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
}

export default function CheckoutForm() {
  const router = useRouter();
  const [data, setData] = useState<CheckoutData | null>(null);
  const [loading, setLoading] = useState(true);

  // Form State
  const [customerName, setCustomerName] = useState('คุณจิรัฎฐ์ วงค์กาสิทธิ์');
  const [customerEmail, setCustomerEmail] = useState('frame.dev@cinemago.com');
  const [customerPhone, setCustomerPhone] = useState('089-123-4567');
  const [paymentMethod, setPaymentMethod] = useState<'promptpay' | 'credit_card' | 'truemoney'>('promptpay');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  // Errors & Submit State
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Timer countdown for reservation hold (10 minutes)
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    // Load persisted checkout selection from sessionStorage
    const stored = sessionStorage.getItem('cinemago_checkout');
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch (err) {
        console.error(err);
      }
    } else {
      // Demo fallback data if visited directly
      setData({
        showtimeId: 'st-101',
        movieId: 'm-1',
        movieTitle: 'Dune: Part Two',
        movieTitleTh: 'ดูน ภาคสอง',
        moviePoster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
        hallName: 'Cinema 1 (IMAX)',
        hallType: 'IMAX Laser',
        dateTime: 'วันนี้, 19:30 น.',
        audio: 'EN/TH',
        seats: [
          { id: 'C-5', row: 'C', number: 5, type: 'premium', price: 300 },
          { id: 'C-6', row: 'C', number: 6, type: 'premium', price: 300 },
        ],
        totalPrice: 600,
      });
    }
    setLoading(false);

    // Reservation hold countdown timer
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!customerName.trim()) {
      errs.customerName = 'กรุณากรอกชื่อ-นามสกุล';
    }
    if (!customerEmail.trim()) {
      errs.customerEmail = 'กรุณากรอกอีเมล';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      errs.customerEmail = 'รูปแบบอีเมลไม่ถูกต้อง';
    }
    if (!customerPhone.trim()) {
      errs.customerPhone = 'กรุณากรอกเบอร์โทรศัพท์';
    } else if (customerPhone.replace(/\D/g, '').length < 9) {
      errs.customerPhone = 'เบอร์โทรศัพท์ต้องมีอย่างน้อย 9-10 หลัก';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'CINEMA50' || promoCode.trim().toUpperCase() === 'FRAME50') {
      setDiscount(50);
      setPromoApplied(true);
      setServerError(null);
    } else {
      setDiscount(0);
      setPromoApplied(false);
      setServerError('โค้ดส่วนลดไม่ถูกต้อง (ลองใช้: CINEMA50 หรือ FRAME50)');
    }
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setServerError(null);

    const finalPrice = Math.max(0, data.totalPrice - discount);

    // Invoke Server Action
    const result = await createBookingAction({
      showtimeId: data.showtimeId,
      movieId: data.movieId,
      hallName: data.hallName,
      hallType: data.hallType,
      dateTime: data.dateTime,
      audio: data.audio,
      seats: data.seats,
      totalPrice: finalPrice,
      paymentMethod,
      customerName,
      customerEmail,
      customerPhone,
    });

    if (result.success && result.bookingId) {
      // Clear session storage & navigate to confirmation page
      sessionStorage.removeItem('cinemago_checkout');
      router.push(`/confirmation/${result.bookingId}`);
    } else {
      setServerError(result.message || 'ไม่สามารถบันทึกการจองได้ กรุณาลองใหม่อีกครั้ง');
      setIsSubmitting(false);
    }
  };

  if (loading || !data) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
      </div>
    );
  }

  const finalTotal = Math.max(0, data.totalPrice - discount);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Top Banner with Reservation countdown timer */}
      <div className="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-amber-300">
          <Clock className="w-5 h-5 animate-pulse" />
          <span className="text-sm font-medium">
            ระบบกำลังสำรองที่นั่งให้คุณ กรุณาทำรายการให้เสร็จภายในเวลา:
          </span>
        </div>
        <div className="font-mono text-lg font-bold px-3 py-1 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-inner">
          {formatTimer(timeLeft)} นาที
        </div>
      </div>

      <form onSubmit={handleConfirmBooking} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Customer Form & Payment Methods (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Contact Information Card */}
          <div className="bg-neutral-900/70 backdrop-blur-xl rounded-3xl border border-neutral-800 p-6 sm:p-8 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center text-xs font-black">
                1
              </span>
              ข้อมูลผู้ติดต่อ / รับตั๋ว
            </h2>
            <p className="text-neutral-400 text-xs mb-6">
              ระบบจะส่ง E-Ticket และ QR Code เข้าสู่ระบบและอีเมลของคุณ
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  ชื่อ - นามสกุล *
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                    if (errors.customerName) setErrors((prev) => ({ ...prev, customerName: '' }));
                  }}
                  placeholder="เช่น สมชาย ใจดี"
                  className={`w-full px-4 py-3 rounded-xl bg-neutral-950 border text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.customerName
                      ? 'border-rose-500 focus:ring-rose-500/50'
                      : 'border-neutral-800 focus:border-amber-400 focus:ring-amber-400/20'
                  }`}
                />
                {errors.customerName && (
                  <p className="text-rose-400 text-xs mt-1">{errors.customerName}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    อีเมล (สำหรับรับ E-Ticket) *
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => {
                      setCustomerEmail(e.target.value);
                      if (errors.customerEmail) setErrors((prev) => ({ ...prev, customerEmail: '' }));
                    }}
                    placeholder="example@mail.com"
                    className={`w-full px-4 py-3 rounded-xl bg-neutral-950 border text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 transition-all ${
                      errors.customerEmail
                        ? 'border-rose-500 focus:ring-rose-500/50'
                        : 'border-neutral-800 focus:border-amber-400 focus:ring-amber-400/20'
                    }`}
                  />
                  {errors.customerEmail && (
                    <p className="text-rose-400 text-xs mt-1">{errors.customerEmail}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    เบอร์โทรศัพท์มือถือ *
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => {
                      setCustomerPhone(e.target.value);
                      if (errors.customerPhone) setErrors((prev) => ({ ...prev, customerPhone: '' }));
                    }}
                    placeholder="081-234-5678"
                    className={`w-full px-4 py-3 rounded-xl bg-neutral-950 border text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 transition-all ${
                      errors.customerPhone
                        ? 'border-rose-500 focus:ring-rose-500/50'
                        : 'border-neutral-800 focus:border-amber-400 focus:ring-amber-400/20'
                    }`}
                  />
                  {errors.customerPhone && (
                    <p className="text-rose-400 text-xs mt-1">{errors.customerPhone}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="bg-neutral-900/70 backdrop-blur-xl rounded-3xl border border-neutral-800 p-6 sm:p-8 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-black">
                2
              </span>
              เลือกช่องทางการชำระเงิน
            </h2>
            <p className="text-neutral-400 text-xs mb-6">
              รองรับการชำระเงินที่ปลอดภัยระดับมาตรฐานสากล
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* PromptPay */}
              <label
                onClick={() => setPaymentMethod('promptpay')}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border cursor-pointer transition-all duration-200 text-center gap-2 ${
                  paymentMethod === 'promptpay'
                    ? 'bg-amber-500/10 border-amber-400 shadow-lg shadow-amber-500/10 scale-[1.02]'
                    : 'bg-neutral-950/80 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center text-amber-400 border border-neutral-800">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">พร้อมเพย์ QR</div>
                  <div className="text-[10px] text-neutral-400">PromptPay QR</div>
                </div>
              </label>

              {/* Credit / Debit Card */}
              <label
                onClick={() => setPaymentMethod('credit_card')}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border cursor-pointer transition-all duration-200 text-center gap-2 ${
                  paymentMethod === 'credit_card'
                    ? 'bg-amber-500/10 border-amber-400 shadow-lg shadow-amber-500/10 scale-[1.02]'
                    : 'bg-neutral-950/80 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center text-rose-400 border border-neutral-800">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">บัตรเครดิต/เดบิต</div>
                  <div className="text-[10px] text-neutral-400">Visa, Mastercard</div>
                </div>
              </label>

              {/* TrueMoney Wallet */}
              <label
                onClick={() => setPaymentMethod('truemoney')}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border cursor-pointer transition-all duration-200 text-center gap-2 ${
                  paymentMethod === 'truemoney'
                    ? 'bg-amber-500/10 border-amber-400 shadow-lg shadow-amber-500/10 scale-[1.02]'
                    : 'bg-neutral-950/80 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center text-orange-400 border border-neutral-800">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">ทรูมันนี่ วอลเล็ท</div>
                  <div className="text-[10px] text-neutral-400">TrueMoney Wallet</div>
                </div>
              </label>
            </div>

            {/* Discount Code Input */}
            <div className="mt-6 pt-6 border-t border-neutral-800">
              <label className="block text-xs font-semibold text-neutral-300 mb-2">
                โค้ดส่วนลดโปรโมชัน (Promo Code)
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="พิมพ์ CINEMA50 หรือ FRAME50"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-neutral-200 transition-colors cursor-pointer"
                >
                  ใช้โค้ด
                </button>
              </div>
              {promoApplied && (
                <div className="mt-2 text-xs text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>ใช้โค้ดสำเร็จ! ได้รับส่วนลด ฿50</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Confirm Button (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-neutral-900/80 backdrop-blur-xl rounded-3xl border border-neutral-800 p-6 sm:p-8 shadow-2xl space-y-6">
            <h2 className="text-lg font-bold text-white pb-4 border-b border-neutral-800">
              สรุปรายการสั่งซื้อ (Order Summary)
            </h2>

            {/* Movie Info */}
            <div className="flex gap-4">
              <img
                src={data.moviePoster}
                alt={data.movieTitle}
                className="w-20 h-28 object-cover rounded-xl shadow-lg border border-neutral-800 shrink-0"
              />
              <div className="space-y-1.5 flex-1">
                <h3 className="font-extrabold text-white text-base leading-tight">{data.movieTitle}</h3>
                <p className="text-xs text-neutral-400">{data.movieTitleTh}</p>
                <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-neutral-300">
                  <span className="px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800">
                    {data.hallName}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800">
                    {data.audio}
                  </span>
                </div>
              </div>
            </div>

            {/* Showtime & Seats list */}
            <div className="space-y-3 py-4 border-y border-neutral-800/80 text-xs">
              <div className="flex justify-between text-neutral-300">
                <span className="text-neutral-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-rose-400" /> รอบฉาย:
                </span>
                <span className="font-semibold text-white">{data.dateTime}</span>
              </div>

              <div className="flex justify-between text-neutral-300">
                <span className="text-neutral-400">ที่นั่งที่เลือก ({data.seats.length} ที่นั่ง):</span>
                <span className="font-mono font-bold text-amber-400">
                  {data.seats.map((s) => s.id).join(', ')}
                </span>
              </div>

              {/* Seats breakdown */}
              <div className="bg-neutral-950/60 rounded-xl p-3 space-y-1.5">
                {data.seats.map((s) => (
                  <div key={s.id} className="flex justify-between text-[11px] text-neutral-400">
                    <span>
                      ที่นั่ง {s.id} ({s.type.toUpperCase()})
                    </span>
                    <span>฿{s.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Price breakdown */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-neutral-400 text-xs">
                <span>ราคาตั๋วรวม:</span>
                <span className="text-neutral-200">฿{data.totalPrice}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-400 text-xs">
                  <span>ส่วนลดโปรโมชัน:</span>
                  <span>-฿{discount}</span>
                </div>
              )}

              <div className="pt-3 border-t border-neutral-800 flex justify-between items-baseline">
                <span className="font-bold text-white">ยอดชำระสุทธิ:</span>
                <span className="text-3xl font-black bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-400 bg-clip-text text-transparent">
                  ฿{finalTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {serverError && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{serverError}</span>
              </div>
            )}

            {/* Confirm & Pay Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white font-extrabold text-sm shadow-xl shadow-rose-500/25 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>กำลังดำเนินการบันทึกการจอง...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>ยืนยันการจองและชำระเงิน (฿{finalTotal.toLocaleString()})</span>
                </>
              )}
            </button>

            <div className="text-center text-[11px] text-neutral-500 flex items-center justify-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>ชำระเงินผ่านระบบความปลอดภัยสูง SSL 256-bit</span>
            </div>
          </div>

          <div className="text-center">
            <Link
              href={`/booking/${data.showtimeId}`}
              className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>ย้อนกลับไปเปลี่ยนที่นั่ง</span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
