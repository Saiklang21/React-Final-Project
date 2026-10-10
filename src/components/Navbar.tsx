'use client';
// Client Component: ใช้ useAuth() (Context) และ form action ของปุ่มออกจากระบบ
// ข้อมูลผู้ใช้มาจาก AuthProvider ซึ่งดึงจาก /api/me ไม่ได้อ่านคุกกี้ที่ layout แล้ว
// ทำให้ layout ไม่บังคับให้ทั้งแอป render ใหม่ทุก request (หน้า / จึงเป็น ISR ได้จริง)

import Link from 'next/link';
import { Film, LogIn, LogOut, Ticket, Sparkles, UserPlus } from 'lucide-react';
import { logoutAction } from '@/lib/actions/auth';
import { useAuth } from '@/components/AuthProvider';

export default function Navbar() {
  const { user, loading } = useAuth();

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

        {/* Quick Nav */}
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
          {loading ? (
            // เว้นที่ไว้ระหว่างรอ /api/me ตอบกลับ ป้องกันปุ่มกะพริบ
            <div className="h-8 w-40" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/my-ticket"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-700/60 text-xs text-neutral-200 hover:border-amber-500/60 transition-colors"
                title={user.email}
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-[10px] font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline">{user.name}</span>
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-medium text-neutral-400 hover:text-red-400 hover:bg-neutral-900/80 rounded-lg border border-neutral-800 transition-all flex items-center gap-1.5 cursor-pointer"
                  title="ออกจากระบบ"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">ออกจากระบบ</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 text-xs font-semibold text-neutral-200 bg-neutral-900 hover:bg-neutral-800 rounded-lg border border-neutral-700/60 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>เข้าสู่ระบบ</span>
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 text-xs font-semibold text-neutral-950 bg-gradient-to-r from-amber-400 to-rose-400 hover:from-amber-300 hover:to-rose-300 rounded-lg shadow-lg shadow-amber-500/20 transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>สมัครสมาชิก</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}