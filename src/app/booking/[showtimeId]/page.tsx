import { notFound } from 'next/navigation';
import { INITIAL_SHOWTIMES, INITIAL_MOVIES } from '@/lib/mock-data';
import SeatSelector from '@/components/SeatSelector';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

interface BookingPageProps {
  params: Promise<{
    showtimeId: string;
  }>;
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { showtimeId } = await params;

  // Find showtime or fallback to first showtime if demo
  const showtime = INITIAL_SHOWTIMES.find((s) => s.id === showtimeId) || INITIAL_SHOWTIMES[0];
  const movie = INITIAL_MOVIES.find((m) => m.id === showtime.movieId) || INITIAL_MOVIES[0];

  if (!showtime || !movie) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Breadcrumb / Back button */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-amber-400 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>กลับหน้ารายชื่อภาพยนตร์</span>
          </Link>
        </div>

        {/* Seat Matrix and Summary */}
        <SeatSelector showtime={showtime} movie={movie} />
      </div>
    </main>
  );
}
