'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../components/DashboardLayout';
import { getAllLawyers, LawyerData } from '../../services/lawyerService';
import { toast } from 'react-hot-toast';

// Category mapping for organization
const categories = {
  'Direito Penal': ['criminal'],
  'Direito Civil': ['civil', 'personal-injury'],
  'Direito Societário e Empresarial': ['corporate', 'mergers'],
  'Direito de Família': ['family'],
  'Direito Migratório': ['immigration'],
  'Direito Imobiliário': ['real-estate'],
  'Propriedade Intelectual': ['intellectual-property'],
  'Tributário e Financeiro': ['tax', 'bankruptcy'],
  'Outras especializações': ['military', 'estate-planning', 'healthcare', 'environmental', 'technology', 'entertainment', 'civil-rights', 'employment']
};

export default function LawyersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [lawyersList, setLawyersList] = useState<LawyerData[]>([]);
  const [userPlan, setUserPlan] = useState<string>('Free');
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

  const handleLawyerClick = (e: React.MouseEvent, index: number) => {
    if (userPlan === 'Free' && index >= 5) {
      e.preventDefault();
      toast.error("Desbloqueie todos os 50 especialistas jurídicos de IA fazendo upgrade para o Pro!");
      router.push('/dashboard/billing');
    }
  };

  return (
    <DashboardLayout title="Pequi">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/5 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-black/40 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/40 text-nowrap">Núcleos de inteligência especializada</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-[#10101A] mb-6">Especialistas jurídicos de IA</h1>
          <p className="text-lg text-[#525252] font-medium opacity-60 leading-relaxed">
            Conecte-se a agentes de IA de nível pericial treinados com protocolos jurídicos globais e acervos privados de casos.
          </p>
        </div>

        {/* Search and filters */}
        <div className="mb-12 flex flex-col md:flex-row gap-4 md:items-center">
          <div className="flex-1">
            <div className="relative group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pesquise um agente especializado..."
                className="w-full bg-white border border-[#e7e5e1] hover:border-black/20 focus:outline-none focus:ring-8 focus:ring-black/5 focus:border-black/10 rounded-2xl px-6 py-4 transition-all duration-300 placeholder-foreground/20 text-[#10101A] font-medium pr-14 shadow-sm"
              />
              <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-foreground/20 group-focus-within:text-black transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
 
          <div className="md:w-72">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-white border border-[#e7e5e1] hover:border-black/20 focus:outline-none focus:ring-8 focus:ring-black/5 focus:border-black/10 rounded-2xl px-6 py-4 transition-all duration-300 text-[#10101A] font-medium appearance-none shadow-sm cursor-pointer"
              style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2310101A' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 1.25rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.2em 1.2em' }}
            >
              {uniqueCategories.map((category) => (
                <option key={category} value={category} className="bg-white text-foreground">
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLawyers.map((lawyer, index) => {
            const isLocked = userPlan === 'Free' && index >= 5;
 
            return (
              <Link
                key={lawyer.id}
                href={`/dashboard/lawyers/${lawyer.id}`}
                onClick={(e) => handleLawyerClick(e, index)}
                className={`bg-white border rounded-[2rem] p-8 transition-all duration-500 group shadow-sm relative ${isLocked ? 'border-[#e7e5e1] opacity-70 grayscale' : 'border-[#e7e5e1] hover:border-black/10 hover:shadow-2xl hover:-translate-y-2'}`}
              >
                {/* Lock Overlay Badge */}
                {isLocked && (
                  <div className="absolute top-6 right-6 bg-[#10101A] rounded-full px-4 py-1.5 flex items-center text-[10px] font-bold text-white shadow-xl">
                    <svg className="w-3 h-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    BLOQUEADO
                  </div>
                )}
 
                <div className="flex flex-col">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm border transition-all duration-500 ${isLocked ? 'bg-[#F9F8F6] border-[#e7e5e1] text-[#A0A0A0]' : 'bg-[#F9F8F6] border-[#e7e5e1] group-hover:bg-black group-hover:text-white group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)] text-[#10101A]'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-7 h-7">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
                    </svg>
                  </div>
 
                  <div className="flex-1">
                    <h2 className="text-xl font-medium mb-3 text-[#10101A] group-hover:text-black transition-colors tracking-tight leading-none">{lawyer.name}</h2>
                    <p className="text-[#525252] text-[1rem] font-medium opacity-60 mb-6 line-clamp-2 leading-relaxed">{lawyer.description}</p>
 
                    <div className="flex flex-wrap gap-2">
                      {lawyer.expertise.slice(0, 3).map((skill, expertiseIndex) => (
                        <span key={expertiseIndex} className={`text-[9px] px-3 py-1.5 rounded-full border border-[#e7e5e1] font-bold uppercase tracking-[0.1em] ${isLocked ? 'bg-[#F9F8F6] text-foreground/20' : 'bg-[#F9F8F6] text-foreground/50'}`}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filteredLawyers.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gray-100 inline-block p-4 rounded-full mb-4 border border-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-foreground/40">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-foreground mb-2">Nenhum advogado encontrado</h3>
            <p className="text-foreground/60">Tente ajustar sua pesquisa ou os critérios de filtro</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 
