import { Movie, Showtime, Seat, Booking, SeatType } from '@/types';

// Helper to generate realistic seats for a theater
export function generateTheaterSeats(): Seat[] {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = 12;
  const seats: Seat[] = [];

  // Random preset booked seats for realism
  const preBookedIds = new Set(['C-5', 'C-6', 'D-7', 'D-8', 'B-10', 'A-3', 'A-4', 'F-6', 'F-7', 'G-11', 'G-12']);

  rows.forEach((row) => {
    let type: SeatType = 'standard';
    let price = 240;

    if (row === 'A' || row === 'B') {
      type = 'vip';
      price = 450;
    } else if (row === 'C' || row === 'D' || row === 'E') {
      type = 'premium';
      price = 300;
    }

    for (let num = 1; num <= seatsPerRow; num++) {
      const id = `${row}-${num}`;
      seats.push({
        id,
        row,
        number: num,
        type,
        price,
        isBooked: preBookedIds.has(id),
      });
    }
  });

  return seats;
}

export const INITIAL_MOVIES: Movie[] = [
  {
    id: 'm-1',
    title: 'Dune: Part Two',
    titleTh: 'ดูน ภาคสอง',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=80',
    duration: 166,
    rating: '13+',
    genre: ['Sci-Fi', 'Action', 'Adventure'],
    releaseDate: '2026-03-01',
    synopsis: 'พอล อะทรีดีส ร่วมมือกับชานีและชาวเฟรเมน เพื่อล้างแค้นเหล่าผู้สมรู้ร่วมคิดที่ทำลายครอบครัวของเขา พร้อมเผชิญหน้ากับชะตากรรมของจักรวาล',
  },
  {
    id: 'm-2',
    title: 'Interstellar: Re-Release',
    titleTh: 'อินเตอร์สเตลลาร์ ทะลุมิติจักรวาล',
    poster: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=800&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1600&auto=format&fit=crop&q=80',
    duration: 169,
    rating: '13+',
    genre: ['Sci-Fi', 'Drama'],
    releaseDate: '2026-04-15',
    synopsis: 'เมื่อโลกมนุษย์ถึงคราววิกฤต ทีมสำรวจอวกาศต้องเดินทางข้ามรูหนอนลึกลับเพื่อค้นหาดาวเคราะห์ดวงใหม่สำหรับมนุษยชาติ',
  },
  {
    id: 'm-3',
    title: 'Cyber Blade 2099',
    titleTh: 'ล่าคมไซเบอร์ 2099',
    poster: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
    duration: 135,
    rating: '18+',
    genre: ['Cyberpunk', 'Action', 'Thriller'],
    releaseDate: '2026-05-10',
    synopsis: 'ในมหานครนีออนแห่งอนาคต นักสืบไซบอร์กต้องไขปริศนาคดีฆาตกรรมปริศนาที่อาจสั่นคลอนเสถียรภาพของปัญญาประดิษฐ์ระดับโลก',
  }
];

export const INITIAL_SHOWTIMES: Showtime[] = [
  {
    id: 'st-101',
    movieId: 'm-1',
    hall: {
      id: 'h-1',
      name: 'Cinema 1 (IMAX)',
      type: 'IMAX Laser',
      totalSeats: 96,
    },
    dateTime: 'วันนี้, 19:30 น.',
    audio: 'EN/TH',
    seats: generateTheaterSeats(),
  },
  {
    id: 'st-102',
    movieId: 'm-1',
    hall: {
      id: 'h-2',
      name: 'Cinema 2',
      type: 'Digital 4K',
      totalSeats: 96,
    },
    dateTime: 'วันนี้, 21:45 น.',
    audio: 'TH/TH',
    seats: generateTheaterSeats(),
  },
  {
    id: 'st-201',
    movieId: 'm-2',
    hall: {
      id: 'h-1',
      name: 'Cinema 1 (IMAX)',
      type: 'IMAX Laser',
      totalSeats: 96,
    },
    dateTime: 'วันนี้, 20:00 น.',
    audio: 'EN/TH',
    seats: generateTheaterSeats(),
  },
  {
    id: 'st-301',
    movieId: 'm-3',
    hall: {
      id: 'h-3',
      name: 'Cinema 3 (4DX)',
      type: 'Laser 4DX',
      totalSeats: 96,
    },
    dateTime: 'วันนี้, 18:45 น.',
    audio: 'EN/TH',
    seats: generateTheaterSeats(),
  }
];

// Initial mock booking records
export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'BK-98231',
    userId: 'usr-1',
    userName: 'จิรัฎฐ์ วงค์กาสิทธิ์',
    userEmail: 'example@cinemago.com',
    userPhone: '089-123-4567',
    showtimeId: 'st-101',
    movie: {
      id: 'm-1',
      title: 'Dune: Part Two',
      titleTh: 'ดูน ภาคสอง',
      poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
      duration: 166,
      genre: ['Sci-Fi', 'Action'],
    },
    hallName: 'Cinema 1 (IMAX)',
    hallType: 'IMAX Laser',
    dateTime: 'วันนี้, 19:30 น.',
    audio: 'EN/TH',
    seats: [
      { id: 'C-5', row: 'C', number: 5, type: 'premium', price: 300 },
      { id: 'C-6', row: 'C', number: 6, type: 'premium', price: 300 },
    ],
    totalPrice: 600,
    paymentMethod: 'promptpay',
    paymentStatus: 'completed',
    bookedAt: '2026-10-01 13:30',
  }
];

// (เดโม login แบบเขียนคุกกี้เองถูกแทนที่ด้วยระบบ register/login จริงของ Part A — ดูที่ src/lib/actions/auth.ts)
