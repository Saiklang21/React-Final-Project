import bcrypt from 'bcryptjs';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { cookies } from 'next/headers';
import { User } from '@/types';
import { AUTH_COOKIE_NAME } from './auth-constants';

export { AUTH_COOKIE_NAME };

// ---- Storage: Vercel Blob (production if configured) or local/tmp fs ----

const BLOB_FILENAME = 'users.json';
const localFilePath = path.join(process.cwd(), 'data', 'users.json');
const tmpFilePath = path.join(os.tmpdir(), 'cinemago-users.json');

async function readUsersFromBlob(): Promise<User[] | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  try {
    const { list } = await import('@vercel/blob');
    const { blobs } = await list({ prefix: BLOB_FILENAME });
    const blob = blobs.find((b) => b.pathname === BLOB_FILENAME);
    if (!blob) return null;
    const res = await fetch(blob.url, { cache: 'no-store' });
    if (!res.ok) return null;
    const text = await res.text();
    return JSON.parse(text) as User[];
  } catch (err) {
    console.error('Failed to read users from Vercel Blob:', err);
    return null;
  }
}

async function writeUsersToBlob(users: User[]): Promise<boolean> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return false;
  try {
    const { put } = await import('@vercel/blob');
    await put(BLOB_FILENAME, JSON.stringify(users, null, 2), {
      access: 'public',
      contentType: 'application/json',
      allowOverwrite: true,
    });
    return true;
  } catch (err) {
    console.error('Failed to write users to Vercel Blob:', err);
    return false;
  }
}

async function readUsersFromFileSystem(): Promise<User[]> {
  // 1. Try tmpFilePath first if it exists (for serverless environments after registration)
  try {
    const tmpData = await fs.readFile(tmpFilePath, 'utf-8');
    const tmpUsers = JSON.parse(tmpData) as User[];
    if (Array.isArray(tmpUsers) && tmpUsers.length > 0) {
      return tmpUsers;
    }
  } catch {
    // ignore if tmpFilePath doesn't exist
  }

  // 2. Fallback to localFilePath (data/users.json inside bundle)
  try {
    const localData = await fs.readFile(localFilePath, 'utf-8');
    const localUsers = JSON.parse(localData) as User[];
    if (Array.isArray(localUsers)) {
      return localUsers;
    }
  } catch {
    // ignore
  }

  return [];
}

export async function getUsers(): Promise<User[]> {
  // If Blob token is set, try blob first
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blobUsers = await readUsersFromBlob();
    if (blobUsers !== null) {
      return blobUsers;
    }
  }

  return readUsersFromFileSystem();
}

export async function saveUsers(users: User[]): Promise<void> {
  let savedToBlob = false;

  // 1. Try Vercel Blob if token is available
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    savedToBlob = await writeUsersToBlob(users);
  }

  // 2. Try saving to localFilePath (data/users.json)
  try {
    await fs.mkdir(path.dirname(localFilePath), { recursive: true });
    await fs.writeFile(localFilePath, JSON.stringify(users, null, 2), 'utf-8');
    return;
  } catch (err) {
    // If writing to localFilePath failed (e.g. EROFS read-only filesystem on Vercel)
    console.warn('Could not write to localFilePath (read-only filesystem), using tmpFilePath:', err);
  }

  // 3. Fallback to tmpFilePath (/tmp/cinemago-users.json)
  try {
    await fs.writeFile(tmpFilePath, JSON.stringify(users, null, 2), 'utf-8');
  } catch (tmpErr) {
    console.error('Failed to write users to tmpFilePath:', tmpErr);
    if (!savedToBlob) {
      throw new Error('ไม่สามารถบันทึกข้อมูลผู้ใช้ได้ (Storage write failure)');
    }
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

  const users = await getUsers();
  const user = users.find((u) => u.id === userId);
  if (!user) return null;

  const { password: _password, ...safeUser } = user;
  return safeUser;
}

