'use client';

import { useState, useTransition, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Film, LogIn, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { AUTH_COOKIE_NAME } from '@/lib/auth-constants';
import Link from 'next/link';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/booking/st-101';

  const [email, setEmail] = useState('frame@cinemago.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock Login session cookie creation
    const user = {
      id: 'usr-frame',
      name: 'Frame Jirath',
      email: email || 'frame@cinemago.com',
    };

    document.cookie = `${AUTH_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=86400`;

    setTimeout(() => {
      setLoading(false);
      router.push(decodeURIComponent(callbackUrl));
      router.refresh();
    }, 400);
  };

  return (
    <div className="w-full max-w-md bg-neutral-900/80 backdrop-blur-xl rounded-3xl border border-neutral-800 p-8 shadow-2xl space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 mx-auto flex items-center justify-center shadow-lg shadow-rose-500/20">
          <Film className="w-6 h-6 text-neutral-950 font-bold" />
        </div>
        <h1 className="text-2xl font-black text-white">เข้าสู่ระบบ CinemaGo</h1>
        <p className="text-xs text-neutral-400">
          เข้าสู่ระบบเพื่อดำเนินการเลือกที่นั่งและจองตั๋วภาพยนตร์
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
            อีเมล (Email)
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400"
              placeholder="name@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
            รหัสผ่าน (Password)
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-neutral-950 font-black text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
        >
          <LogIn className="w-4 h-4" />
          <span>{loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ (Sign In)'}</span>
        </button>
      </form>

      <div className="text-center pt-2 border-t border-neutral-800 text-xs text-neutral-400">
        <span>ยังไม่มีบัญชีสมาชิก? </span>
        <Link href="/register" className="text-amber-400 font-semibold hover:underline">
          สมัครสมาชิกใหม่
        </Link>
      </div>

      <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-400 flex items-center justify-center gap-2">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span>ระบบตรวจสอบสิทธิ์ผ่าน Next.js Middleware</span>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
      <Suspense fallback={<div className="text-neutral-400 text-sm">กำลังโหลด...</div>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
