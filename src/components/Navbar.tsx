'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Film, User, LogIn, LogOut, Ticket, Sparkles } from 'lucide-react';
import { AUTH_COOKIE_NAME } from '@/lib/auth-constants';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Check if session cookie exists
    const hasCookie = document.cookie.includes(AUTH_COOKIE_NAME);
    setIsLoggedIn(hasCookie);
    if (hasCookie) {
      setUserName('Frame (เฟรม)');
    }
  }, []);

  const handleLoginToggle = () => {
    if (isLoggedIn) {
      // Logout
      document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0`;
      setIsLoggedIn(false);
      window.location.reload();
    } else {
      // Login as Frame demo
      const user = {
        id: 'usr-frame',
        name: 'Frame Jirath',
        email: 'frame@cinemago.com',
      };
      document.cookie = `${AUTH_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=86400`;
      setIsLoggedIn(true);
      setUserName('Frame (เฟรม)');
      window.location.reload();
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-neutral-950/85 border-b border-neutral-800/80 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 p-[2px] shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center">
              <Film className="w-5 h-5 text-amber-400 group-hover:text-rose-400 transition-colors" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-400 bg-clip-text text-transparent">
                CinemaGo
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-neutral-400 -mt-1">ระบบจองตั๋วภาพยนตร์</p>
          </div>
        </Link>

        {/* Quick Nav & Showtime link */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-300">
          <Link href="/" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
            <Film className="w-4 h-4" /> ภาพยนตร์ทั้งหมด
          </Link>
          <Link href="/booking/st-101" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
            <Ticket className="w-4 h-4" /> ผังเลือกที่นั่ง (Demo)
          </Link>
          <Link href="/my-ticket" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" /> ตั๋วของฉัน
          </Link>
        </nav>

        {/* Auth / Profile Bar */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-700/60 text-xs text-neutral-200">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-[10px] font-bold text-white">
                  F
                </div>
                <span>{userName}</span>
              </div>
              <button
                onClick={handleLoginToggle}
                className="px-3 py-1.5 text-xs font-medium text-neutral-400 hover:text-red-400 hover:bg-neutral-900/80 rounded-lg border border-neutral-800 transition-all flex items-center gap-1.5 cursor-pointer"
                title="คลิกเพื่อออกจากระบบ"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">ออกจากระบบ</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleLoginToggle}
                className="px-4 py-2 text-xs font-semibold text-neutral-950 bg-gradient-to-r from-amber-400 to-rose-400 hover:from-amber-300 hover:to-rose-300 rounded-lg shadow-lg shadow-amber-500/20 transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>จำลองเข้าสู่ระบบ (Auth)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
