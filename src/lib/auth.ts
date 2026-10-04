import bcrypt from 'bcryptjs';
import fs from 'fs/promises';
import path from 'path';
import { cookies } from 'next/headers';
import { User } from '@/types';
import { AUTH_COOKIE_NAME } from './auth-constants';

export { AUTH_COOKIE_NAME };

const usersFilePath = path.join(process.cwd(), 'data', 'users.json');

// ---- ส่วนที่ยืมมาจาก Part A: จัดการผู้ใช้ใน data/users.json ----

export async function getUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(usersFilePath, 'utf-8');
    return JSON.parse(data) as User[];
  } catch {
    return [];
  }
}

export async function saveUsers(users: User[]): Promise<void> {
  await fs.mkdir(path.dirname(usersFilePath), { recursive: true });
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  const users = await getUsers();
  const target = email.trim().toLowerCase();
  return users.find((u) => u.email.toLowerCase() === target);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// ---- จุดรวมเดียวที่ทุกส่วนใช้เรียก (Server Action / page / layout) ----
// อ่านคุกกี้ session_userId แล้วค้นผู้ใช้จาก data/users.json
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const userId = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!userId) return null;

  const users = await getUsers();
  const user = users.find((u) => u.id === userId);
  if (!user) return null;

  // ไม่ส่ง hash รหัสผ่านออกจากฝั่งเซิร์ฟเวอร์ (ถูกส่งเป็น prop ให้ Navbar ด้วย)
  const { password: _password, ...safeUser } = user;
  return safeUser;
}
