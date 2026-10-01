import { cookies } from 'next/headers';
import { User } from '@/types';
import { DEMO_USER } from './mock-data';
import { AUTH_COOKIE_NAME } from './auth-constants';

export { AUTH_COOKIE_NAME };

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get(AUTH_COOKIE_NAME);
  if (!session?.value) return null;

  try {
    const user = JSON.parse(decodeURIComponent(session.value)) as User;
    return user;
  } catch {
    return DEMO_USER;
  }
}

export async function setDemoSession(): Promise<User> {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, encodeURIComponent(JSON.stringify(DEMO_USER)), {
    path: '/',
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: 'lax',
  });
  return DEMO_USER;
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}
