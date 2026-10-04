// lib/auth.ts
import bcrypt from "bcryptjs";
import fs from "fs/promises";
import path from "path";
import { User } from "./types";

const usersFilePath = path.join(process.cwd(), "data", "users.json");

export async function getUsers(): Promise<User[]> {
  const data = await fs.readFile(usersFilePath, "utf-8");
  return JSON.parse(data) as User[];
}

export async function saveUsers(users: User[]): Promise<void> {
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  const users = await getUsers();
  return users.find((u) => u.email === email);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// lib/auth.ts — เพิ่มฟังก์ชันนี้ต่อท้ายไฟล์เดิม
import { cookies } from "next/headers";

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const userId = cookieStore.get("session_userId")?.value;

  if (!userId) return null;

  const users = await getUsers();
  const user = users.find((u) => u.id === userId);
  return user ?? null;
}