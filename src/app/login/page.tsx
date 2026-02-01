'use client';

import { useActionState } from 'react';
import { authenticate } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { useI18n } from '@/contexts/I18nContext';
import { Eye, EyeOff, Lock, Mail, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const { t } = useI18n();
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 pb-6">
            <div className="flex items-center justify-between">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2 -ml-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              </Link>
            </div>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg">
                <Lock className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center">{t('navigation.login')}</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the admin panel
            </CardDescription>
          </CardHeader>

          <form action={formAction}>
            <CardContent className="space-y-4">
              {state?.error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm text-red-800 dark:text-red-200">
                  {state.error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@example.com"
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="h-11 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-11 w-11"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="text-xs text-muted-foreground text-center">
                Demo credentials: <span className="font-mono bg-muted px-1 rounded">admin@example.com</span> / <span className="font-mono bg-muted px-1 rounded">password123</span>
              </div>
            </CardContent>

            <CardFooter className="pt-2">
              <Button
                type="submit"
                className="w-full h-11 text-base"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('common.loading') || 'Loading...'}
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    {t('navigation.login')}
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
