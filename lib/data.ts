import { Movie, Showtime } from "./types";
import moviesData from "@/data/movies.json";
import showtimesData from "@/data/showtimes.json";

// ดึงรายชื่อหนังทั้งหมด
export async function getMovies(): Promise<Movie[]> {
  return moviesData as Movie[];
}

// ดึงหนังเรื่องเดียวจาก id
export async function getMovieById(id: string): Promise<Movie | undefined> {
  const movies = moviesData as Movie[];
  return movies.find((movie) => movie.id === id);
}

// ดึงรอบฉายทั้งหมดของหนังเรื่องหนึ่ง
export async function getShowtimesByMovieId(movieId: string): Promise<Showtime[]> {
  const showtimes = showtimesData as Showtime[];
  return showtimes.filter((showtime) => showtime.movieId === movieId);
}

// ดึงรอบฉายเดียวจาก id (ใช้ตอนเข้าหน้าเลือกที่นั่ง)
export async function getShowtimeById(id: string): Promise<Showtime | undefined> {
  const showtimes = showtimesData as Showtime[];
  return showtimes.find((showtime) => showtime.id === id);
}