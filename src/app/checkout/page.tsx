import CheckoutForm from '@/components/CheckoutForm';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const metadata = {
  title: 'ชำระเงินและยืนยันการจอง — CinemaGo',
  description: 'กรอกข้อมูลและเลือกช่องทางชำระเงินเพื่อยืนยันการจองตั๋วภาพยนตร์',
};

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-amber-400 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>กลับหน้ารายชื่อภาพยนตร์</span>
          </Link>
        </div>

        <CheckoutForm />
      </div>
    </main>
  );
}
