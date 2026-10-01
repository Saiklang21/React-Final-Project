// components/MovieCard.tsx
import Link from "next/link";
import { Movie } from "@/lib/types";
import styles from "./MovieCard.module.css";

const genreGradients: Record<string, string> = {
  "Sci-Fi": "linear-gradient(160deg, #1b1f3b, #3a2d6b)",
  Drama: "linear-gradient(160deg, #3b1f1f, #6b2d2d)",
  Action: "linear-gradient(160deg, #1f2b3b, #2d4a6b)",
};

export default function MovieCard({ movie }: { movie: Movie }) {
  const gradient = genreGradients[movie.genre] ?? "linear-gradient(160deg, #2a2a2e, #444)";

  return (
    <Link href={`/movies/${movie.id}`} className={styles.card}>
      <div className={styles.poster} style={{ background: gradient }}>
        <span className={styles.posterTitle}>{movie.title}</span>
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{movie.title}</h3>
        <div className={styles.meta}>
          <span>{movie.genre}</span>
          <span className={styles.rating}>★ {movie.rating}</span>
        </div>
      </div>
    </Link>
  );
}