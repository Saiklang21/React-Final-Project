import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getMovieById, getShowtimesByMovieId } from '@/lib/data';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Film,
  Star,
  Ticket,
  Volume2,
} from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const movie = await getMovieById(id);
  return { title: movie ? `${movie.title} — CinemaGo` : 'ไม่พบภาพยนตร์ — CinemaGo' };
}

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ต้อง await params ก่อนดึง id (Next 15+)

  const movie = await getMovieById(id);
  if (!movie) {
    notFound();
  }

  const showtimes = await getShowtimesByMovieId(id);

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 pb-16 relative overflow-hidden">
      {/* Backdrop hero */}
      <div className="relative h-72 sm:h-96 overflow-hidden border-b border-neutral-800">
        <img
          src={movie.backdrop || movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/20" />

        <div className="absolute top-6 left-0 w-full">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-300 hover:text-amber-400 transition-colors bg-neutral-950/70 backdrop-blur-md border border-neutral-800 rounded-full px-3.5 py-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> กลับหน้ารายการภาพยนตร์
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full pb-6">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-xl bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-[11px] font-bold text-amber-400">
                {movie.rating}
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-[11px] font-bold text-rose-300">
                {movie.titleTh}
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {movie.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 -mt-2 relative z-10">
        {/* Movie info */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-5">
            <div className="flex flex-wrap gap-2">
              {movie.genre.map((g) => (
                <span
                  key={g}
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-neutral-800/80 text-neutral-300 border border-neutral-700/60"
                >
                  {g}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" /> {movie.duration} นาที
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-400" /> เข้าฉาย {movie.releaseDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400" /> เรต {movie.rating}
              </span>
            </div>

            <div className="bg-neutral-900/60 border border-neutral-800 rounded-3xl p-6 space-y-3">
              <h2 className="text-sm font-black text-white flex items-center gap-2">
                <Film className="w-4 h-4 text-rose-400" /> เรื่องย่อ (Synopsis)
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed">{movie.synopsis}</p>
            </div>
          </div>

          {/* Showtimes sidebar */}
          <aside className="space-y-3">
            <h2 className="text-sm font-black text-white flex items-center gap-2 border-b border-neutral-800 pb-3">
              <Ticket className="w-4 h-4 text-amber-400" /> เลือกวัน / รอบฉาย
            </h2>

            {showtimes.length === 0 ? (
              <p className="text-xs text-neutral-500 bg-neutral-900/60 border border-dashed border-neutral-800 rounded-2xl p-4 text-center">
                ยังไม่มีรอบฉายสำหรับหนังเรื่องนี้
              </p>
            ) : (
              <div className="space-y-3">
                {showtimes.map((showtime) => (
                  <Link
                    key={showtime.id}
                    href={`/booking/${showtime.id}`}
                    className="block bg-neutral-900/60 hover:bg-neutral-900/90 border border-neutral-800 hover:border-amber-500/60 rounded-2xl p-4 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-black text-white group-hover:text-amber-400 transition-colors">
                        {showtime.dateTime}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-300 border border-rose-500/30">
                        {showtime.audio}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-neutral-400">
                      <span className="flex items-center gap-1.5">
                        <Volume2 className="w-3.5 h-3.5 text-neutral-500" />
                        {showtime.hall.name} · {showtime.hall.type}
                      </span>
                      <span className="flex items-center gap-1 font-bold text-amber-400">
                        เลือกที่นั่ง <Ticket className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <p className="text-[11px] text-neutral-500 flex items-start gap-1.5 pt-2">
              <span>※</span>
              <span>ต้องเข้าสู่ระบบก่อนจึงจะเลือกที่นั่งได้ (middleware ตรวจสอบสิทธิ์)</span>
            </p>
          </aside>
        </section>
      </div>
    </main>
  );
}
