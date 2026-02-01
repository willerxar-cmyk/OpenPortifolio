import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const secretKey = process.env.AUTH_SECRET || 'fallback-secret-key-for-development-only';
const key = new TextEncoder().encode(secretKey);

export interface Session {
  userId: string;
  email: string;
  expiresAt: Date;
}

export async function encrypt(payload: Session) {
  return new SignJWT(payload as any)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(key);
}

export async function decrypt(input: string): Promise<Session | undefined> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    });
    return payload as unknown as Session;
  } catch (error) {
    return undefined;
  }
}

export async function createSession(userId: string, email: string) {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  const session = await encrypt({ userId, email, expiresAt });
  
  const cookieStore = await cookies();
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function verifySession(request: NextRequest): Promise<Session | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('session')?.value;
  
  if (!cookie) {
    return null;
  }
  
  const session = await decrypt(cookie);
  
  if (!session || new Date(session.expiresAt) < new Date()) {
    return null;
  }
  
  return session;
}

export async function updateSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  
  if (!session) return null;
  
  const parsed = await decrypt(session);
  
  if (!parsed) return null;
  
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
  
  return parsed;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}

export async function getSession() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('session')?.value;
  if (!cookie) return null;
  return decrypt(cookie);
}
