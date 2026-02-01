'use server';

import { createSession, deleteSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function authenticate(prevState: any, formData: FormData) {
  try {
    const validatedFields = credentialsSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (!validatedFields.success) {
      return {
        error: 'Invalid credentials format',
      };
    }

    const { email, password } = validatedFields.data;

    // Simple credential check (replace with your auth logic)
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'password123';

    if (email !== adminEmail || password !== adminPassword) {
      return {
        error: 'Invalid email or password',
      };
    }

    // Create session
    await createSession('admin-user', email);
    
    // Redirect to admin
    redirect('/admin');
  } catch (error) {
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      throw error;
    }
    return {
      error: 'An error occurred during authentication',
    };
  }
}

export async function logout() {
  await deleteSession();
  redirect('/login');
}
