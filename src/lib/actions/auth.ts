'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import {
  getUsers,
  saveUsers,
  findUserByEmail,
  hashPassword,
  verifyPassword,
  StorageError,
} from '@/lib/auth';
import { AUTH_COOKIE_NAME } from '@/lib/auth-constants';
import { User } from '@/types';

export interface AuthFormState {
  error?: string;
}

const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 วัน

// อนุญาตเฉพาะ path ภายในเว็บเท่านั้น (กัน open redirect)
function safeCallbackUrl(callbackUrl: string | null): string {
  if (callbackUrl && callbackUrl.startsWith('/') && !callbackUrl.startsWith('//')) {
    return callbackUrl;
  }
  return '/';
}

// แปลงข้อผิดพลาดที่ไม่คาดคิด (โดยเฉพาะฝั่ง storage) เป็นข้อความที่ผู้ใช้เห็นในฟอร์ม
function actionErrorMessage(err: unknown, fallback: string): string {
  if (err instanceof StorageError) return err.userMessage;
  const detail = err instanceof Error ? err.message : String(err);
  return `${fallback} (${detail})`;
}

export async function registerAction(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const name = ((formData.get('name') as string) ?? '').trim();
  const email = ((formData.get('email') as string) ?? '').trim();
  const password = (formData.get('password') as string) ?? '';

  if (!name || !email || !password) {
    return { error: 'กรอกข้อมูลให้ครบทุกช่อง' };
  }
  if (password.length < 6) {
    return { error: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร' };
  }

  try {
    const users = await getUsers();
    const emailExists = users.some(
      (u) => u.email.trim().toLowerCase() === email.toLowerCase()
    );
    if (emailExists) {
      return { error: 'อีเมลนี้มีผู้ใช้งานแล้ว' };
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      email,
      password: await hashPassword(password),
      name,
    };
    users.push(newUser);
    await saveUsers(users);
  } catch (err) {
    // เดิมพอ storage พัง (บน Vercel ไม่มี BLOB_READ_WRITE_TOKEN / Blob เขียนไม่ได้)
    // action จะ throw แล้วฟอร์มค้างไม่มีอะไรเกิดขึ้น — เก็บ error มาโชว์ในฟอร์มแทน
    console.error('[registerAction]', err);
    return { error: actionErrorMessage(err, 'สมัครสมาชิกไม่สำเร็จ กรุณาลองใหม่อีกครั้ง') };
  }

  redirect('/login');
}

export async function loginAction(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const email = ((formData.get('email') as string) ?? '').trim();
  const password = (formData.get('password') as string) ?? '';
  const callbackUrl = safeCallbackUrl(formData.get('callbackUrl') as string | null);

  if (!email || !password) {
    return { error: 'กรอกข้อมูลให้ครบทุกช่อง' };
  }

  let sessionUserId = '';
  try {
    const user = await findUserByEmail(email);
    if (!user || !user.password) {
      return { error: 'ไม่พบบัญชีผู้ใช้นี้' };
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return { error: 'รหัสผ่านไม่ถูกต้อง' };
    }
    sessionUserId = user.id;
  } catch (err) {
    console.error('[loginAction]', err);
    return { error: actionErrorMessage(err, 'เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง') };
  }

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, sessionUserId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  });

  // บังคับให้ root layout (Navbar) อ่าน session ใหม่ทันทีหลัง login
  revalidatePath('/', 'layout');

  redirect(callbackUrl);
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);

  // เช่นเดียวกัน: อัปเดต Navbar ให้กลับสู่สถานะออกจากระบบทันที
  revalidatePath('/', 'layout');

  redirect('/login');
}
