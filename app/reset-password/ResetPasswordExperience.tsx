'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { authService } from '../services/api';
import {
  AuthHero,
  AuthPageLayout,
  authInputClass,
  authLabelClass,
  authPrimaryButtonClass,
} from '@/app/components/auth/AuthPageChrome';

function ResetPasswordForm() {
  const [formData, setFormData] = useState({
    email: '',
    token: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    if (token && email) {
      setFormData((prev) => ({ ...prev, email, token }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.token) {
      setError('Link de redefinição inválido. Solicite uma nova redefinição de senha.');
      return;
    }

    if (!formData.newPassword) {
      setError('Informe uma nova senha');
      return;
    }

    if (formData.newPassword.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await authService.resetPassword({
        email: formData.email,
        token: formData.token,
        newPassword: formData.newPassword,
      });
      setIsSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (err: unknown) {
      setError(
        (err as { response?: { data?: { message?: string } } }).response?.data?.message ||
          'Não foi possível redefinir a senha. Tente novamente.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {isSuccess ? (
        <div className="rounded-[0.875rem] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 flex items-start gap-2">
          <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Senha atualizada. Redirecionando para o login...
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
            <label htmlFor="newPassword" className={authLabelClass}>
              Nova senha
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              required
              value={formData.newPassword}
              onChange={handleChange}
              className={authInputClass}
              placeholder="••••••••"
            />
            <p className="mt-1.5 text-[0.8125rem] text-[#525252]">No mínimo 8 caracteres.</p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className={authLabelClass}>
              Confirmar senha
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className={authInputClass}
              placeholder="••••••••"
            />
          </div>

          <button type="submit" disabled={isLoading} className={authPrimaryButtonClass}>
            {isLoading ? 'Atualizando...' : 'Atualizar senha'}
          </button>
        </>
      )}

      <div className="text-center pt-2">
        <Link href="/login" className="text-[0.9375rem] font-medium text-[#525252] hover:text-[#10101A] hover:underline">
          Voltar para o login
        </Link>
      </div>
    </form>
  );
}

function ResetAside() {
  return (
    <div className="rounded-2xl border border-[#eceae7] bg-[#f8f7f6] p-8 shadow-[0_12px_28px_rgba(16,16,26,0.04)] md:p-10">
      <h2 className="mb-4 text-[1.25rem] font-medium text-[#10101A]">Senhas fortes</h2>
      <ul className="space-y-3 text-[0.9375rem] leading-relaxed text-[#525252]">
        <li className="flex gap-2">
          <span className="font-medium text-[#10101A]">•</span>
          Use uma frase-senha longa e exclusiva, que você não tenha usado em outro lugar.
        </li>
        <li className="flex gap-2">
          <span className="font-medium text-[#10101A]">•</span>
          Combine letras, números e símbolos quando a política permitir.
        </li>
        <li className="flex gap-2">
          <span className="font-medium text-[#10101A]">•</span>
          Guarde suas credenciais em um gerenciador de senhas confiável.
        </li>
      </ul>
    </div>
  );
}

export default function ResetPasswordExperience() {
  return (
    <div className="min-h-screen">
      <AuthHero
        eyebrow="Segurança"
        title="Defina uma nova senha"
        subtitle="Escolha uma senha forte para proteger sua conta e os dados dos seus clientes."
      />
      <AuthPageLayout
        aside={<ResetAside />}
        footer={
          <div className="mt-8 border-t border-[#eceae7] pt-8 text-center">
            <p className="text-[0.9375rem] text-[#525252]">
              Não tem uma conta?{' '}
              <Link href="/signup" className="font-medium text-[#10101A] underline-offset-2 hover:underline">
                Criar conta
              </Link>
            </p>
          </div>
        }
      >
        <Suspense fallback={<p className="py-8 text-center text-sm text-[#525252]">Carregando...</p>}>
          <ResetPasswordForm />
        </Suspense>
      </AuthPageLayout>
    </div>
  );
}
