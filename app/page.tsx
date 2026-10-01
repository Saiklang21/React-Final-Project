import { getMovies } from "@/lib/data";
import MovieCard from "@/components/MovieCard";
import styles from "./page.module.css";

export default async function HomePage() {
  const movies = await getMovies();
  return (
    <main className={styles.main}> 
      <h1 className={styles.heading}>กำลังฉาย</h1>
      <div className={styles.grid}>      
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  );
}