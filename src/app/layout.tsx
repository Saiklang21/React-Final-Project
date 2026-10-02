import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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

import Navbar from "@/components/Navbar";
import { getCurrentUser } from "@/lib/auth";

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // อ่าน session จริงจากคุกกี้ session_userId (ระบบ login ของ Part A)
  const user = await getCurrentUser();

  return (
    <html
      lang="th"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-neutral-950 text-neutral-100">
        <Navbar user={user ? { name: user.name, email: user.email } : null} />
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
