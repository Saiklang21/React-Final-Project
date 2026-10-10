import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CinemaGo — ระบบจองตั๋วภาพยนตร์ออนไลน์",
  description: "จองตั๋วภาพยนตร์ออนไลน์ เลือกดูรอบฉายและเลือกที่นั่งได้สะดวกรวดเร็ว",
};

import { BookingProvider } from "@/context/BookingContext";

// Server Component: layout ไม่อ่าน cookie แล้ว เพื่อให้หน้าต่าง ๆ เป็น static/ISR ได้
// ข้อมูลผู้ใช้ที่ login อยู่ ให้ AuthProvider (Client Component) ดึงจาก /api/me แทน
// BookingProvider เก็บ state จองตั๋ว/ที่นั่ง ของ Frame-dev ไว้ครอบแอปทั้งหมด
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="th"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-neutral-950 text-neutral-100">
        <AuthProvider>
          <BookingProvider>
            <Navbar />
            <div className="flex-1">{children}</div>
          </BookingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}