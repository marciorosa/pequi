import Link from 'next/link';

export default function CaseStudyNotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-24 bg-castanha-100">
      <p className="text-castanha-500 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] mb-3">Casos de sucesso</p>
      <h1 className="text-ink text-[1.75rem] md:text-[2rem] font-medium text-center">Caso não encontrado</h1>
      <p className="text-castanha-600 text-[1rem] mt-3 text-center max-w-md">
        Esta história pode ter sido movida. Veja todas as histórias de sucesso de clientes na página principal.
      </p>
      <Link
        href="/case-studies"
        className="mt-8 inline-flex rounded-[0.875rem] bg-cerrado-900 text-white px-6 py-3.5 text-[0.9375rem] font-medium hover:bg-cerrado-900 transition-colors"
      >
        Voltar para os casos de sucesso
      </Link>
    </div>
  );
}
