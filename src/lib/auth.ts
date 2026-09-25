'use server';

import { getLocale } from 'next-intl/server';
import { redirect } from '@/i18n/navigation';
import { createSession, deleteSession } from '@/lib/session';

// Placeholder credentials — replace with real DB lookup
const PLACEHOLDER_USER = {
  id: '1',
  email: 'admin@vox.io',
  password: 'password',
};

export type LoginState = {
  error?: string;
} | null;

export async function loginAction(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  // Placeholder validation — swap with real DB/API call
  if (
    email !== PLACEHOLDER_USER.email ||
    password !== PLACEHOLDER_USER.password
  ) {
    return { error: 'Invalid email or password.' };
  }

  await createSession(PLACEHOLDER_USER.id, PLACEHOLDER_USER.email);
  const locale = await getLocale();
  redirect({ href: '/dashboard', locale });
  // TypeScript doesn't recognize that redirect() never returns
  // eslint-disable-next-line no-unreachable
  return null;
}

export async function logoutAction() {
  await deleteSession();
  const locale = await getLocale();
  redirect({ href: '/login', locale });
}
