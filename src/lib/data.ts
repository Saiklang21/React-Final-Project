// ชั้นเข้าถึงข้อมูล — ฟังก์ชันชื่อเดียวกับ Part A (getMovies/getMovieById/...)
// แต่ชี้ไปที่ dataset เดียวของแอป (mock-data ของ Part B) เพื่อให้
// /movies/[id] เชื่อมกับผังที่นั่ง /booking/[showtimeId] ได้จริง
import { Movie, Showtime } from '@/types';
import { INITIAL_MOVIES, INITIAL_SHOWTIMES } from './mock-data';

// ดึงรายชื่อหนังทั้งหมด
export async function getMovies(): Promise<Movie[]> {
  return INITIAL_MOVIES;
}

// ดึงหนังเรื่องเดียวจาก id
export async function getMovieById(id: string): Promise<Movie | undefined> {
  return INITIAL_MOVIES.find((movie) => movie.id === id);
}

// ดึงรอบฉายทั้งหมดของหนังเรื่องหนึ่ง
export async function getShowtimesByMovieId(movieId: string): Promise<Showtime[]> {
  return INITIAL_SHOWTIMES.filter((showtime) => showtime.movieId === movieId);
}

// ดึงรอบฉายเดียวจาก id (ใช้ตอนเข้าหน้าเลือกที่นั่ง)
export async function getShowtimeById(id: string): Promise<Showtime | undefined> {
  return INITIAL_SHOWTIMES.find((showtime) => showtime.id === id);
}
