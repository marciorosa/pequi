'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import {
  AuthHero,
  AuthPageLayout,
  authInputClass,
  authLabelClass,
  authPrimaryButtonClass,
} from '@/app/components/auth/AuthPageChrome';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const redirectTo = searchParams.get('from') || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Informe o e-mail e a senha');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await login({ email, password });
      router.push(redirectTo);
    } catch (err: unknown) {
      setError(
        (err as { response?: { data?: { message?: string } } }).response?.data?.message ||
          'Falha no login. Verifique suas credenciais.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {error && (
        <div
          role="alert"
          className="rounded-[0.875rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      <div>
        <label htmlFor="email" className={authLabelClass}>
          Endereço de e-mail
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
          placeholder="nome@empresa.com.br"
        />
      </div>

      <div>
        <div className="flex justify-between gap-3 mb-2">
          <label htmlFor="password" className={`${authLabelClass} mb-0`}>
            Senha
          </label>
          <Link
            href="/forgot-password"
            className="text-[0.8125rem] font-medium text-castanha-600 transition-colors hover:text-ink"
          >
            Esqueceu a senha?
          </Link>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={authInputClass}
          placeholder="••••••••"
        />
      </div>

      <div className="flex items-center gap-2 pt-1">
        <input
          id="remember_me"
          name="remember_me"
          type="checkbox"
          className="h-4 w-4 rounded border-castanha-200 text-ink focus:ring-pequi-500/60"
        />
        <label htmlFor="remember_me" className="text-[0.875rem] text-castanha-600">
          Lembrar de mim
        </label>
      </div>

      <button type="submit" disabled={isLoading} className={authPrimaryButtonClass}>
        {isLoading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
}

function LoginAside() {
  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-castanha-150 bg-white shadow-[0_12px_28px_rgba(31,42,23,0.04)]">
        <div className="border-b border-castanha-150 bg-castanha-50 px-8 py-6">
          <p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-castanha-600">
            Assistente Pequi
          </p>
          <p className="text-lg font-medium leading-snug text-ink">
            Como posso analisar os riscos deste contrato de fusão?
          </p>
        </div>
        <div className="space-y-5 p-8">
          <div className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cerrado-900 text-white">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <div className="rounded-[1rem] rounded-tl-sm border border-castanha-150 bg-castanha-100 px-4 py-3 text-[0.9375rem] leading-relaxed text-castanha-600">
              Identifiquei várias áreas de risco importantes no contrato de fusão: condições regulatórias, redação da cláusula de MAE e
              condições trabalhistas pós-fechamento.
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cerrado-900 text-white">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <div className="rounded-[1rem] rounded-tl-sm border border-castanha-150 bg-white px-4 py-3 text-[0.9375rem] leading-relaxed text-castanha-600">
              Deseja sugestões de redação alternativa para essas cláusulas?
            </div>
          </div>
          <p className="pt-2 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-castanha-600">
            Seguro e confidencial
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-castanha-150 bg-castanha-50 p-8 shadow-[0_12px_28px_rgba(31,42,23,0.04)]">
        <svg className="mb-4 h-8 w-8 text-ink/20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
        </svg>
        <p className="mb-6 text-[1.0625rem] leading-[175%] text-castanha-600">
          O Pequi transformou a eficiência do nosso departamento jurídico. Reduzimos significativamente o tempo de revisão de contratos
          e, ao mesmo tempo, melhoramos a precisão das pesquisas.
        </p>
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full border border-castanha-150 bg-castanha-100" />
          <div>
            <p className="font-medium text-ink">Sarah Johnson</p>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-castanha-600">
              Diretora Jurídica
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default function LoginExperience() {
  return (
    <div className="min-h-screen">
      <AuthHero eyebrow="Conta" title="Bem-vindo de volta" subtitle="Entre para continuar no seu espaço de trabalho." />
      <AuthPageLayout
        aside={<LoginAside />}
        footer={
          <div className="mt-8 border-t border-castanha-150 pt-8 text-center">
            <p className="text-[0.9375rem] text-castanha-600">
              Não tem uma conta?{' '}
              <Link href="/signup" className="font-medium text-ink underline-offset-2 hover:underline">
                Criar conta
              </Link>
            </p>
          </div>
        }
      >
        <Suspense
          fallback={<p className="py-8 text-center text-sm text-castanha-600">Carregando...</p>}
        >
          <LoginForm />
        </Suspense>
      </AuthPageLayout>
    </div>
  );
}
