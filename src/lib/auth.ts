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
const isVercel = !!process.env.BLOB_READ_WRITE_TOKEN;

async function readUsersFromBlob(): Promise<User[]> {
  const { list } = await import('@vercel/blob');
  try {
    const { blobs } = await list({ prefix: BLOB_FILENAME });
    const blob = blobs.find((b) => b.pathname === BLOB_FILENAME);
    if (!blob) return [];
    const res = await fetch(blob.url, { cache: 'no-store' });
    const text = await res.text();
    return JSON.parse(text) as User[];
  } catch {
    return [];
  }
}

async function writeUsersToBlob(users: User[]): Promise<void> {
  const { put } = await import('@vercel/blob');
  await put(BLOB_FILENAME, JSON.stringify(users, null, 2), {
    access: 'public',
    contentType: 'application/json',
    allowOverwrite: true,
  });
}

// ---- Public API ----

export async function getUsers(): Promise<User[]> {
  if (isVercel) {
    return readUsersFromBlob();
  }
  try {
    const data = await fs.readFile(localFilePath, 'utf-8');
    return JSON.parse(data) as User[];
  } catch {
    return [];
  }
}

export async function saveUsers(users: User[]): Promise<void> {
  if (isVercel) {
    await writeUsersToBlob(users);
    return;
  }
  await fs.mkdir(path.dirname(localFilePath), { recursive: true });
  await fs.writeFile(localFilePath, JSON.stringify(users, null, 2), 'utf-8');
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

  const users = await getUsers();
  const user = users.find((u) => u.id === userId);
  if (!user) return null;

  const { password: _password, ...safeUser } = user;
  return safeUser;
}
