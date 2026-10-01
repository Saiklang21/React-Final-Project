"use server";

import { redirect } from "next/navigation";
import { getUsers, saveUsers, findUserByEmail, hashPassword, verifyPassword } from "@/lib/auth";
import { User } from "@/lib/types";

export async function registerAction(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "กรอกข้อมูลให้ครบทุกช่อง" };
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return { error: "อีเมลนี้มีผู้ใช้งานแล้ว" };
  }

  const hashedPassword = await hashPassword(password);

  const newUser: User = {
    id: crypto.randomUUID(),
    email,
    password: hashedPassword,
    name,
  };

  const users = await getUsers();
  users.push(newUser);
  await saveUsers(users);

  redirect("/login");
}

// lib/actions/auth.ts — เพิ่มต่อจากเดิม
import { cookies } from "next/headers";

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "กรอกข้อมูลให้ครบทุกช่อง" };
  }

  const user = await findUserByEmail(email);
  if (!user) {
    return { error: "ไม่พบบัญชีผู้ใช้นี้" };
  }

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    return { error: "รหัสผ่านไม่ถูกต้อง" };
  }

  const cookieStore = await cookies();
  cookieStore.set("session_userId", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 วัน
    path: "/",
  });

  redirect("/");
}

// lib/actions/auth.ts — เพิ่ม logoutAction ต่อท้ายไฟล์เดิม
export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("session_userId");
  redirect("/login");
}