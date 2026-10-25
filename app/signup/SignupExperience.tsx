'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authService } from '../services/api';
import {
  AuthHero,
  AuthPageLayout,
  authInputClass,
  authLabelClass,
  authPrimaryButtonClass,
} from '@/app/components/auth/AuthPageChrome';

function SignupAside() {
  const items = [
    {
      title: 'Smart document analysis',
      body: 'Review contracts and briefs faster with AI-assisted risk and clause insights.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      ),
    },
    {
      title: 'Legal research assistant',
      body: 'Surface relevant cases and statutes with context-aware answers.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      ),
    },
    {
      title: 'Always-on workspace',
      body: 'Draft, summarize, and collaborate with guardrails built for legal teams.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      ),
    },
  ];

  return (
    <div className="rounded-2xl border border-[#eceae7] bg-[#f8f7f6] p-8 shadow-[0_12px_28px_rgba(16,16,26,0.04)] md:p-10">
      <h2 className="mb-3 text-[1.5rem] font-medium leading-tight text-[#10101A] md:text-[1.75rem]">Built for modern legal teams</h2>
      <p className="mb-10 text-[1rem] leading-relaxed text-[#525252]">
        Join professionals who use AIForLawyers to move faster without sacrificing rigor.
      </p>
      <ul className="space-y-8">
        {items.map((item) => (
          <li key={item.title} className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[0.875rem] border border-[#eceae7] bg-white text-[#10101A]">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                {item.icon}
              </svg>
            </div>
            <div>
              <h3 className="mb-1 text-[1.0625rem] font-medium text-[#10101A]">{item.title}</h3>
              <p className="text-[0.9375rem] leading-[160%] text-[#525252]">{item.body}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-10 grid grid-cols-3 gap-3">
        {[
          { n: '73%', l: 'Time saved' },
          { n: '95%', l: 'Teams trust' },
          { n: '24/7', l: 'Access' },
        ].map((s) => (
          <div
            key={s.l}
            className="rounded-xl border border-[#eceae7] bg-white px-3 py-4 text-center"
          >
            <div className="text-xl font-medium text-[#10101A]">{s.n}</div>
            <div className="mt-1 text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-[#525252]">
              {s.l}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SignupExperience() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      router.push('/login');
    } catch (err: unknown) {
      setError(
        (err as { response?: { data?: { message?: string } } }).response?.data?.message ||
          'Registration failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <AuthHero
        eyebrow="Get started"
        title="Create your account"
        subtitle="Join AIForLawyers and start working with AI built for legal workflows."
      />
      <AuthPageLayout
        aside={<SignupAside />}
        footer={
          <div className="mt-8 border-t border-[#eceae7] pt-8 text-center">
            <p className="text-[0.9375rem] text-[#525252]">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-[#10101A] underline-offset-2 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        }
      >
        {error && (
          <div
            role="alert"
            className="rounded-[0.875rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 mb-6"
          >
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className={authLabelClass}>
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={formData.name}
              onChange={handleChange}
              className={authInputClass}
              placeholder="John Doe"
            />
          </div>

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
              value={formData.email}
              onChange={handleChange}
              className={authInputClass}
              placeholder="name@company.com"
            />
          </div>

          <div>
            <label htmlFor="password" className={authLabelClass}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={formData.password}
              onChange={handleChange}
              className={authInputClass}
              placeholder="••••••••"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className={authLabelClass}>
              Confirm password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className={authInputClass}
              placeholder="••••••••"
            />
          </div>

          <button type="submit" disabled={isLoading} className={authPrimaryButtonClass}>
            {isLoading ? 'Creating account...' : 'Create account'}
          </button>
        </form>
      </AuthPageLayout>
    </div>
  );
}
