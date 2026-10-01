import { getMovieById, getShowtimesByMovieId } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ต้อง await params ก่อนดึง id

  const movie = await getMovieById(id);

  if (!movie) {
    notFound();
  }

  const showtimes = await getShowtimesByMovieId(id);

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.genre} · ⭐ {movie.rating}</p>
      <p>{movie.description}</p>

      <h2>รอบฉาย</h2>
      {showtimes.length === 0 ? (
        <p>ยังไม่มีรอบฉายสำหรับหนังเรื่องนี้</p>
      ) : (
        <ul>
          {showtimes.map((showtime) => (
            <li key={showtime.id}>
              <Link href={`/booking/${showtime.id}`}>
                {showtime.date} เวลา {showtime.time} · {showtime.hallName}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}