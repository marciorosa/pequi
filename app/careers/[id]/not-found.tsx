import Link from 'next/link';

export default function CareerJobNotFound() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 py-20 bg-castanha-100">
      <p className="text-castanha-500 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] mb-3">Carreiras</p>
      <h1 className="text-ink text-[1.75rem] font-medium">Vaga não encontrada</h1>
      <p className="text-castanha-600 text-[1rem] mt-3 text-center max-w-md">
        Esta vaga pode ter sido preenchida ou removida. Confira as vagas abertas na página de carreiras.
      </p>
      <Link
        href="/careers"
        className="mt-8 inline-flex rounded-[0.875rem] bg-cerrado-900 text-white px-6 py-3.5 text-[0.9375rem] font-medium hover:bg-cerrado-900 transition-colors"
      >
        Voltar para carreiras
      </Link>
    </div>
  );
}
