'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { Film, UserPlus, Lock, Mail, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { registerAction, type AuthFormState } from '@/lib/actions/auth';

const initialState: AuthFormState = { error: '' };

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerAction, initialState);

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md bg-neutral-900/80 backdrop-blur-xl rounded-3xl border border-neutral-800 p-8 shadow-2xl space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 mx-auto flex items-center justify-center shadow-lg shadow-rose-500/20">
            <Film className="w-6 h-6 text-neutral-950 font-bold" />
          </div>
          <h1 className="text-2xl font-black text-white">สมัครสมาชิก CinemaGo</h1>
          <p className="text-xs text-neutral-400">
            สร้างบัญชีเพื่อจองตั๋ว ผูกการจองกับสมาชิกของคุณ และดู E-Ticket ย้อนหลัง
          </p>
        </div>

        <form action={formAction} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-xs font-semibold text-neutral-300 mb-1.5">
              ชื่อ-นามสกุล (Name)
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400"
                placeholder="ชื่อของคุณ"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-neutral-300 mb-1.5">
              อีเมล (Email)
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400"
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-neutral-300 mb-1.5">
              รหัสผ่าน (อย่างน้อย 6 ตัวอักษร)
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="password"
                name="password"
                type="password"
                minLength={6}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400"
                placeholder="••••••••"
              />
            </div>
          </div>

          {state?.error && (
            <p className="text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl px-3 py-2">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-neutral-950 font-black text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
          >
            <UserPlus className="w-4 h-4" />
            <span>{isPending ? 'กำลังสมัครสมาชิก...' : 'สมัครสมาชิก (Sign Up)'}</span>
          </button>
        </form>

        <div className="text-center pt-2 border-t border-neutral-800 text-xs text-neutral-400">
          <span>มีบัญชีอยู่แล้ว? </span>
          <Link href="/login" className="text-amber-400 font-semibold hover:underline">
            เข้าสู่ระบบ
          </Link>
        </div>

        <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-400 flex items-center justify-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>รหัสผ่านถูก hash ด้วย bcrypt ก่อนบันทึกลง data/users.json</span>
        </div>
      </div>
    </main>
  );
}
