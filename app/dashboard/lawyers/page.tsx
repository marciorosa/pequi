'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../components/DashboardLayout';
import { getAllLawyers, LawyerData, isLawyerLockedForPlan } from '../../services/lawyerService';
import { toast } from 'react-hot-toast';

// Category mapping for organization
const categories = {
  'Direito do Consumidor': ['consumer-protection'],
  'Direito do Trabalho': ['employment'],
  'Saúde e Planos de Saúde': ['healthcare', 'elder'],
  'Dados Pessoais e Direito Digital': ['cybersecurity'],
  'Direito Penal': ['criminal'],
  'Direito Civil': ['civil', 'personal-injury'],
  'Direito Societário e Empresarial': ['corporate', 'mergers'],
  'Direito de Família': ['family'],
  'Direito Migratório': ['immigration'],
  'Direito Imobiliário': ['real-estate'],
  'Propriedade Intelectual': ['intellectual-property'],
  'Tributário e Financeiro': ['tax', 'bankruptcy'],
  'Outras áreas': ['military', 'estate-planning', 'environmental', 'entertainment', 'civil-rights', 'international', 'mediation', 'construction', 'aviation', 'space-law', 'energy', 'agricultural', 'education', 'sports', 'insurance', 'legal-document']
};

export default function LawyersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [lawyersList, setLawyersList] = useState<LawyerData[]>([]);
  const [userPlan, setUserPlan] = useState<string>('Free');
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Get all lawyer types from the service
    const lawyers = getAllLawyers();
    setLawyersList(lawyers);

    // Fetch user profile to check restrictions
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data && data.subscription && data.subscription.plan) {
          setUserPlan(data.subscription.plan);
          setIsAdmin(Boolean(data.subscription.isAdmin));
        }
      } catch (error) {
        console.error('Failed to fetch profile', error);
      }
    };
    fetchProfile();
  }, []);

  // Filter lawyers based on search query and selected category
  const filteredLawyers = lawyersList.filter(lawyer => {
    const matchesSearch =
      lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lawyer.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lawyer.expertise.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

    if (selectedCategory === 'Todas') {
      return matchesSearch;
    }

    // Check if lawyer belongs to the selected category
    return matchesSearch && Object.entries(categories).some(([category, ids]) => {
      return category === selectedCategory && ids.includes(lawyer.id);
    });
  });

  // Get unique categories from lawyers
  const uniqueCategories = ['Todas', ...Object.keys(categories)];

  // A trava vale por assistente (não pela posição na lista) e também é aplicada no servidor
  const isLocked = (lawyerId: string) => !isAdmin && isLawyerLockedForPlan(lawyerId, userPlan);

  const handleLawyerClick = (e: React.MouseEvent, lawyerId: string) => {
    if (isLocked(lawyerId)) {
      e.preventDefault();
      toast.error("Este assistente faz parte do plano Pro. Faça upgrade para liberar todos os assistentes de IA.");
      router.push('/dashboard/billing');
    }
  };

  // Nome curto na lista ("Direito de Família" em vez de "Assistente de IA em Direito de Família")
  const shortName = (name: string) => name.replace(/^Assistente(?: Jurídico)? de IA (?:em |para )?/i, '') || name;
  const isFree = (lawyerId: string) => !isLawyerLockedForPlan(lawyerId, 'Free');

  // Lista no padrão editorial (2026-11-24): título à esquerda, busca na moldura
  // areia e assistentes em faixas numeradas, como nas telas do site.
  return (
    <DashboardLayout title="Assistentes de IA">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 border-b border-ink/12 pb-10 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ink/45">Assistentes de IA</p>
            <h2 className="mt-4 text-[clamp(2.2rem,4.4vw,3.6rem)] font-medium leading-[1.04] tracking-[-0.035em] text-ink">Um assistente para cada área</h2>
          </div>
          <p className="max-w-[460px] text-[1.02rem] leading-relaxed text-ink/65 lg:justify-self-end">
            Ferramentas de IA que explicam temas jurídicos em linguagem simples. Não são advogados e não substituem a análise do seu caso
            por um profissional inscrito na OAB.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-2 rounded-3xl border border-ink/10 bg-[#F1EDE0] p-3 sm:p-4 md:flex-row">
          <label className="flex flex-1 items-center gap-2 rounded-2xl bg-[#FFFDF6] px-4 ring-1 ring-ink/10 focus-within:ring-ink/30">
            <svg className="h-5 w-5 flex-shrink-0 text-ink/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar um assistente ou tema..."
              aria-label="Buscar um assistente ou tema"
              className="h-12 min-w-0 flex-1 border-0 bg-transparent px-1 text-[1rem] text-ink placeholder:text-ink/40 focus:outline-none focus:ring-0"
            />
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="Área do Direito"
            className="h-12 cursor-pointer appearance-none rounded-2xl border-0 bg-[#FFFDF6] px-4 pr-10 text-[0.95rem] text-ink ring-1 ring-ink/10 focus:outline-none focus:ring-ink/30 md:w-72"
            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23151816' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.9rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.1em 1.1em' }}
          >
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 grid gap-2 md:grid-cols-2">
          {filteredLawyers.map((lawyer, index) => {
            const locked = isLocked(lawyer.id);
            return (
              <Link
                key={lawyer.id}
                href={`/dashboard/lawyers/${lawyer.id}`}
                onClick={(e) => handleLawyerClick(e, lawyer.id)}
                className={`group flex items-center gap-4 rounded-2xl px-5 py-4 transition-colors ${locked ? 'bg-[#F1EDE0]/60 text-ink/55' : 'bg-[#F1EDE0] text-ink hover:bg-[#E9E3D2]'}`}
              >
                <span className="w-6 flex-shrink-0 text-[0.85rem] tabular-nums text-ink/40">{index + 1}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[1rem] font-medium leading-snug">{shortName(lawyer.name)}</span>
                  <span className="mt-0.5 block truncate text-[0.85rem] text-ink/55">{lawyer.description}</span>
                </span>
                {locked ? (
                  <span className="flex flex-shrink-0 items-center gap-1.5 rounded-full bg-[#151816] px-2.5 py-1 text-[0.7rem] font-semibold text-white">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Pro
                  </span>
                ) : (
                  <span className="flex flex-shrink-0 items-center gap-3">
                    {isFree(lawyer.id) && userPlan === 'Free' && (
                      <span className="rounded-full bg-ink/8 px-2.5 py-1 text-[0.7rem] font-semibold text-ink/60">Gratuito</span>
                    )}
                    <svg className="h-4 w-4 text-ink/35 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
                    </svg>
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {filteredLawyers.length === 0 && (
          <div className="mt-6 rounded-2xl bg-[#F1EDE0] px-6 py-10 text-center">
            <p className="text-[1.05rem] font-medium text-ink">Nenhum assistente encontrado</p>
            <p className="mt-1 text-[0.92rem] text-ink/55">Tente outra palavra ou escolha outra área.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
