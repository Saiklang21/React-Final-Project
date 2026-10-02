import Link from 'next/link';
import { INITIAL_MOVIES, INITIAL_SHOWTIMES } from '@/lib/mock-data';
import { Film, Clock, Star, Ticket, Sparkles, ChevronRight, Play } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Hero Banner */}
        <section className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-950 p-8 sm:p-14 shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/15 via-rose-500/10 to-transparent pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ระบบจองตั๋วโรงภาพยนตร์ CinemaGo</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              สัมผัสประสบการณ์ <br />
              <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-400 bg-clip-text text-transparent">
                ชมภาพยนตร์ระดับพรีเมียม
              </span>
            </h1>

            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              เลือกชมภาพยนตร์ยอดฮิต เลือกรอบฉาย เช็คผังที่นั่งแบบ Real-time และชำระเงินสะดวกรวดเร็วผ่าน E-Ticket
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/booking/st-101"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white font-black text-sm shadow-xl shadow-rose-500/25 transition-all flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
              >
                <Ticket className="w-4 h-4" />
                <span>ทดลองเลือกที่นั่ง (Dune: Part Two)</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Movies List Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-800/80 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-7 bg-gradient-to-b from-amber-400 to-rose-500 rounded-full" />
              <h2 className="text-2xl font-black text-white">ภาพยนตร์ที่กำลังฉาย (Now Showing)</h2>
            </div>
            <span className="text-xs text-neutral-400">{INITIAL_MOVIES.length} เรื่อง</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {INITIAL_MOVIES.map((movie) => {
              const movieShowtimes = INITIAL_SHOWTIMES.filter((st) => st.movieId === movie.id);

              return (
                <div
                  key={movie.id}
                  className="group bg-neutral-900/60 hover:bg-neutral-900/90 rounded-3xl border border-neutral-800/80 hover:border-neutral-700/80 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950">
                    <img
                      src={movie.backdrop || movie.poster}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/30 to-transparent" />

                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-xl bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-[11px] font-bold text-amber-400">
                      {movie.rating}
                    </span>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1.5">
                        {movie.genre.map((g) => (
                          <span
                            key={g}
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-neutral-800/80 text-neutral-400 border border-neutral-700/50"
                          >
                            {g}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors">
                        <Link href={`/movies/${movie.id}`} className="hover:text-amber-400 transition-colors">
                          {movie.title}
                        </Link>
                      </h3>
                      <p className="text-xs text-neutral-400 line-clamp-2">{movie.synopsis}</p>
                      <Link
                        href={`/movies/${movie.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                      >
                        ดูรายละเอียด & เลือกรอบฉาย <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-neutral-800/80">
                      <div className="flex items-center justify-between text-xs text-neutral-400">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-neutral-500" /> {movie.duration} นาที
                        </span>
                        <span>เลือกรอบฉาย:</span>
                      </div>

                      {/* Showtimes button list */}
                      <div className="flex flex-wrap gap-2">
                        {movieShowtimes.length > 0 ? (
                          movieShowtimes.map((st) => (
                            <Link
                              key={st.id}
                              href={`/booking/${st.id}`}
                              className="px-3 py-2 rounded-xl bg-neutral-950 hover:bg-gradient-to-r hover:from-rose-500 hover:to-amber-500 hover:text-neutral-950 border border-neutral-800 text-xs font-bold text-neutral-200 transition-all flex items-center gap-1.5 shadow-sm group/btn"
                            >
                              <Ticket className="w-3 h-3 text-amber-400 group-hover/btn:text-neutral-950" />
                              <span>{st.dateTime.split(', ')[1] || st.dateTime}</span>
                              <span className="text-[10px] opacity-70">({st.hall.type})</span>
                            </Link>
                          ))
                        ) : (
                          <span className="text-xs text-neutral-500">ไม่มีรอบฉายในขณะนี้</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
