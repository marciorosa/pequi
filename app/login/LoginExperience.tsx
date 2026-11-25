'use client';

import { useTenant } from '../contexts/TenantContext';
import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { BrandLogo } from '../components/PequiWordmark';
import PequiTrajectory from '../components/auth/PequiTrajectory';

// Login no estilo da referência (2026-11-24): tela cheia em duas colunas. À esquerda,
// fundo grafite com e-mail e senha (sem entrar com Google/Microsoft/Apple) e o aceite
// da Política de Privacidade e dos Termos; à direita, painel areia com a animação
// do ícone do Pequi.
const TERMS_KEY = 'pequi_terms_accepted';
const inputClass =
  'h-11 w-full rounded-xl border-0 bg-[#151816] px-3.5 text-[0.92rem] text-white ring-1 ring-white/15 placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-white/50';
const labelClass = 'mb-1.5 block text-[0.82rem] font-medium text-white/85';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const searchParamsForError = useSearchParams();
  const [error, setError] = useState(
    searchParamsForError.get('bloqueado') ? 'Esta conta está bloqueada. Fale com o suporte.' : ''
  );
  const [isLoading, setIsLoading] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const searchParams = useSearchParams();

  // Quem já aceitou neste navegador encontra a caixa marcada
  useEffect(() => {
    if (localStorage.getItem(TERMS_KEY)) setAccepted(true);
  }, []);
  const { login } = useAuth();

  // Só aceita caminhos internos do site; qualquer outra coisa vai para o painel
  const from = searchParams.get('from') || '';
  const redirectTo = from.startsWith('/') && !from.startsWith('//') && !from.startsWith('/login') ? from : '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Informe o e-mail e a senha');
      return;
    }
    if (!accepted) {
      setError('Para entrar, aceite a Política de Privacidade e os Termos de Uso.');
      return;
    }
    localStorage.setItem(TERMS_KEY, new Date().toISOString());

    setIsLoading(true);
    setError('');

    try {
      await login({ email, password });
      // Carrega a página de novo em vez de navegar por dentro do Next.js: a navegação interna
      // podia reaproveitar o redirecionamento para o login guardado enquanto a pessoa ainda
      // não estava logada, e a pessoa ficava parada no login mesmo com a senha certa.
      window.location.assign(redirectTo);
      return;
    } catch (err: unknown) {
      setError(
        (err as { response?: { data?: { message?: string } } }).response?.data?.message ||
          'Falha no login. Verifique suas credenciais.'
      );
      // Só volta o botão ao normal se deu erro; no sucesso a página já está carregando o painel
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="rounded-2xl bg-[#1C201D] p-6 ring-1 ring-white/10 sm:p-7">
        <p className="text-center text-[0.85rem] leading-relaxed text-white/60">
          Novo por aqui?{' '}
          <Link href="/signup" className="font-medium text-white underline underline-offset-4 hover:text-white/80">
            Criar conta
          </Link>
        </p>

        {error && (
          <div role="alert" className="mt-5 rounded-xl bg-red-500/10 px-3.5 py-2.5 text-[0.85rem] text-red-200 ring-1 ring-red-400/30">
            {error}
          </div>
        )}

        <div className="mt-5">
          <label htmlFor="email" className={labelClass}>
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="nome@escritorio.com.br"
          />
        </div>

        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between gap-3">
            <label htmlFor="password" className={`${labelClass} mb-0`}>
              Senha
            </label>
            <Link href="/forgot-password" className="text-[0.8rem] text-white/55 hover:text-white">
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
            className={inputClass}
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-6 h-11 w-full rounded-xl bg-[#FFFDF6] text-[0.92rem] font-medium text-[#151816] transition-colors hover:bg-white disabled:opacity-60"
        >
          {isLoading ? 'Entrando...' : 'Entrar'}
        </button>
      </div>

      <label htmlFor="accept" className="mt-4 flex cursor-pointer items-start gap-2.5 px-1 text-[0.8rem] leading-relaxed text-white/55">
        <input
          id="accept"
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="mt-0.5 h-4 w-4 flex-shrink-0 cursor-pointer accent-[#FFFDF6]"
        />
        <span>
          Ao continuar, aceito a{' '}
          <Link href="/privacy-policy" target="_blank" className="text-white/80 underline underline-offset-2 hover:text-white">
            Política de Privacidade
          </Link>{' '}
          e os{' '}
          <Link href="/terms" target="_blank" className="text-white/80 underline underline-offset-2 hover:text-white">
            Termos de Uso
          </Link>
          .
        </span>
      </label>
    </form>
  );
}

export default function LoginExperience() {
  const { tenant } = useTenant();
  return (
    <div className="flex min-h-screen bg-[#151816] p-2 text-white sm:p-3">
      <div className="flex min-h-full flex-1 flex-col px-4 py-4 sm:px-8 lg:w-1/2 lg:flex-none">
        <Link href="/" aria-label="Página inicial" className="inline-flex w-fit items-center">
          <BrandLogo className="h-7 w-auto" tone="light" />
        </Link>
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-[380px]">
            <h1 className="mb-6 text-center text-[1.6rem] font-medium tracking-[-0.03em]">Entrar</h1>
            <Suspense fallback={<p className="py-8 text-center text-sm text-white/60">Carregando...</p>}>
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </div>

      <aside className="relative hidden flex-1 flex-col justify-end overflow-hidden rounded-[1.75rem] bg-[#F1EDE0] p-12 text-[#151816] lg:flex xl:p-16">
        <PequiTrajectory className="pointer-events-none absolute right-[2%] top-[6%] w-[96%] text-[#151816]" />
        <p className="relative text-[0.85rem] text-[#151816]/60">{tenant ? tenant.name : 'IA jurídica white-label'}</p>
        <h2 className="relative mt-3 max-w-[14ch] text-[clamp(2.4rem,4vw,3.6rem)] font-medium leading-[1.02] tracking-[-0.035em]">
          {tenant ? 'A sua assistente jurídica, a qualquer hora.' : 'A IA jurídica com a marca do seu escritório.'}
        </h2>
        <p className="relative mt-5 max-w-[440px] text-[0.85rem] leading-relaxed text-[#151816]/55">
          Respostas geradas por IA, com caráter informativo. A análise de cada caso continua com o advogado.
        </p>
      </aside>
    </div>
  );
}
