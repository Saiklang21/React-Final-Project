import bcrypt from 'bcryptjs';
import fs from 'fs/promises';
import path from 'path';
import { cookies } from 'next/headers';
import { User } from '@/types';
import { AUTH_COOKIE_NAME } from './auth-constants';

export { AUTH_COOKIE_NAME };

// ---- Storage: Vercel Blob (production) or local fs (development) ----

const BLOB_FILENAME = 'users.json';
const localFilePath = path.join(process.cwd(), 'data', 'users.json');
const hasBlobToken = !!process.env.BLOB_READ_WRITE_TOKEN;
// บน Vercel พื้นที่ทำงานเป็น read-only — ห้ามเขียนไฟล์ local ถ้าไม่มี token
const runningOnVercel = !!process.env.VERCEL || hasBlobToken;

/** ข้อผิดพลาดฝั่ง storage ที่แปลงเป็นข้อความภาษาไทยให้ผู้ใช้เห็นในฟอร์มได้ */
export class StorageError extends Error {
  userMessage: string;

  constructor(message: string, userMessage: string) {
    super(message);
    this.name = 'StorageError';
    this.userMessage = userMessage;
  }
}

async function readUsersFromBlob(): Promise<User[]> {
  const { list } = await import('@vercel/blob');
  let blobUrl: string | null = null;
  try {
    const { blobs } = await list({ prefix: BLOB_FILENAME });
    blobUrl = blobs.find((b) => b.pathname === BLOB_FILENAME)?.url ?? null;
  } catch (err) {
    // ห้าม return [] เพราะจะทำให้ saveUsers ทับข้อมูลผู้ใช้เดิมทิ้งทั้งหมด
    throw new StorageError(
      `Blob list failed: ${err instanceof Error ? err.message : String(err)}`,
      'อ่านข้อมูลผู้ใช้จาก Blob ไม่ได้ (list)'
    );
  }
  if (!blobUrl) return [];
  try {
    const res = await fetch(blobUrl, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return JSON.parse(await res.text()) as User[];
  } catch (err) {
    throw new StorageError(
      `Blob read failed: ${err instanceof Error ? err.message : String(err)}`,
      'อ่านข้อมูลผู้ใช้จาก Blob ไม่ได้ (read)'
    );
  }
}

async function writeUsersToBlob(users: User[]): Promise<void> {
  const { put } = await import('@vercel/blob');
  try {
    await put(BLOB_FILENAME, JSON.stringify(users, null, 2), {
      access: 'public',
      contentType: 'application/json',
      allowOverwrite: true,
    });
  } catch (err) {
    throw new StorageError(
      `Blob write failed: ${err instanceof Error ? err.message : String(err)}`,
      'บันทึกข้อมูลผู้ใช้ลง Blob ไม่ได้ (write)'
    );
  }
}

// ---- Public API ----

export async function getUsers(): Promise<User[]> {
  if (hasBlobToken) {
    return readUsersFromBlob();
  }
  if (runningOnVercel) {
    throw new StorageError(
      'BLOB_READ_WRITE_TOKEN is not set on Vercel',
      'เซิร์ฟเวอร์ยังไม่ได้ตั้งค่า BLOB_READ_WRITE_TOKEN จึงยังบันทึกผู้ใช้ไม่ได้'
    );
  }
  try {
    const data = await fs.readFile(localFilePath, 'utf-8');
    return JSON.parse(data) as User[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException)?.code === 'ENOENT') return [];
    throw new StorageError(
      `Local read failed: ${err instanceof Error ? err.message : String(err)}`,
      'อ่านไฟล์ data/users.json ไม่ได้'
    );
  }
}

export async function saveUsers(users: User[]): Promise<void> {
  if (hasBlobToken) {
    await writeUsersToBlob(users);
    return;
  }
  if (runningOnVercel) {
    throw new StorageError(
      'BLOB_READ_WRITE_TOKEN is not set on Vercel',
      'เซิร์ฟเวอร์ยังไม่ได้ตั้งค่า BLOB_READ_WRITE_TOKEN จึงยังบันทึกผู้ใช้ไม่ได้'
    );
  }
  try {
    await fs.mkdir(path.dirname(localFilePath), { recursive: true });
    await fs.writeFile(localFilePath, JSON.stringify(users, null, 2), 'utf-8');
  } catch (err) {
    throw new StorageError(
      `Local write failed: ${err instanceof Error ? err.message : String(err)}`,
      'เขียนไฟล์ data/users.json ไม่ได้'
    );
  }
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

// ---- Session ----

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const userId = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!userId) return null;

  let users: User[];
  try {
    users = await getUsers();
  } catch (err) {
    // storage อ่านไม่ได้ -> ถือว่ายังไม่ล็อกอิน ดีกว่าให้หน้าเว็บทั้งระบบ crash
    console.error('[getCurrentUser]', err);
    return null;
  }
  const user = users.find((u) => u.id === userId);
  if (!user) return null;

  const { password: _password, ...safeUser } = user;
  return safeUser;
}
