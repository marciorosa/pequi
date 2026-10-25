'use client';

import { useState } from 'react';
import Link from 'next/link';
import { authService } from '../services/api';
import {
  AuthHero,
  AuthPageLayout,
  authInputClass,
  authLabelClass,
  authPrimaryButtonClass,
} from '@/app/components/auth/AuthPageChrome';

function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await authService.forgotPassword(email);
      setIsSuccess(true);
    } catch (err: unknown) {
      setError(
        (err as { response?: { data?: { message?: string } } }).response?.data?.message ||
          'Failed to process request. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isSuccess ? (
        <div className="rounded-[0.875rem] border border-[#eceae7] bg-[#f8f7f6] px-4 py-4 text-sm text-[#525252]">
          If an account exists with this email, we&apos;ve sent instructions to reset your password. Check your inbox
          and follow the link.
        </div>
      ) : (
        <>
          {error && (
            <div
              role="alert"
              className="rounded-[0.875rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 flex items-start gap-2"
            >
              <svg className="w-4 h-4 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className={authLabelClass}>
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={authInputClass}
              placeholder="you@example.com"
            />
          </div>

          <button type="submit" disabled={isLoading} className={authPrimaryButtonClass}>
            {isLoading ? 'Sending...' : 'Send reset instructions'}
          </button>
        </>
      )}

      <div className="text-center pt-2">
        <Link href="/login" className="text-[0.9375rem] font-medium text-[#525252] hover:text-[#10101A] hover:underline">
          Back to sign in
        </Link>
      </div>
    </form>
  );
}

function ForgotAside() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#eceae7] bg-[#f8f7f6] shadow-[0_12px_28px_rgba(16,16,26,0.04)]">
      <div className="border-b border-[#eceae7] bg-white px-8 py-8">
        <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[#525252]">Secure recovery</p>
        <p className="mb-4 text-lg font-medium leading-snug text-[#10101A]">
          Password reset uses a time-limited link so only you can regain access.
        </p>
        <p className="text-[0.9375rem] leading-relaxed text-[#525252]">
          We never send your password by email. You&apos;ll set a new one after verifying your inbox.
        </p>
      </div>
      <div className="border-t border-[#eceae7] p-8">
        <p className="text-[0.9375rem] leading-relaxed text-[#525252]">
          Tip: use a unique passphrase and a password manager. Minimum length and complexity rules apply at reset.
        </p>
      </div>
    </div>
  );
}

export default function ForgotPasswordExperience() {
  return (
    <div className="min-h-screen">
      <AuthHero
        eyebrow="Account help"
        title="Reset your password"
        subtitle="Enter your email and we&apos;ll send secure reset instructions."
      />
      <AuthPageLayout
        aside={<ForgotAside />}
        footer={
          <div className="mt-8 border-t border-[#eceae7] pt-8 text-center">
            <p className="text-[0.9375rem] text-[#525252]">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-medium text-[#10101A] underline-offset-2 hover:underline">
                Create account
              </Link>
            </p>
          </div>
        }
      >
        <ForgotPasswordForm />
      </AuthPageLayout>
    </div>
  );
}
