'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function LegalGuidesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const guides = [
    {
      id: 1,
      title: "Guia Completo de Abertura de Empresas",
      category: "business-law",
      description: "Tudo o que você precisa saber para abrir uma empresa, da escolha do tipo societário aos requisitos de registro.",
      readTime: "25 min",
      lastUpdated: "2024-01-15",
      author: "Sarah Johnson, Esq.",
      difficulty: "Beginner",
      topics: ["Constituição de Ltda.", "Constituição de S.A.", "Implicações Tributárias", "Exigências Estaduais"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2340&auto=format&fit=crop",
      featured: true,
      downloadable: true
    },
    {
      id: 2,
      title: "Fundamentos de Direito do Trabalho para Pequenas Empresas",
      category: "employment-law",
      description: "Saiba como contratar, gerir funcionários e manter a conformidade com a legislação trabalhista.",
      readTime: "18 min",
      lastUpdated: "2024-01-20",
      author: "Michael Chen, Esq.",
      difficulty: "Intermediate",
      topics: ["Práticas de Contratação", "Direitos dos Empregados", "Leis Salariais", "Procedimentos de Desligamento"],
      image: "https://images.unsplash.com/photo-1521791055366-0d553872125f?q=80&w=2669&auto=format&fit=crop",
      featured: true,
      downloadable: true
    },
    {
      id: 3,
      title: "Fundamentos de Direito Contratual",
      category: "contract-law",
      description: "Aprenda o básico sobre formação, interpretação e execução de contratos.",
      readTime: "22 min",
      lastUpdated: "2024-01-12",
      author: "Elena Rodriguez, Esq.",
      difficulty: "Beginner",
      topics: ["Elementos do Contrato", "Cumprimento", "Inadimplemento", "Remédios Jurídicos"],
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2670&auto=format&fit=crop",
      featured: false,
      downloadable: true
    },
    {
      id: 4,
      title: "Estratégias de Proteção da Propriedade Intelectual",
      category: "ip-law",
      description: "Proteja suas ideias, invenções e sua marca por meio de registros de marca, patentes e direitos autorais.",
      readTime: "30 min",
      lastUpdated: "2024-01-18",
      author: "David Wilson, Esq.",
      difficulty: "Advanced",
      topics: ["Patentes", "Marcas", "Direitos Autorais", "Segredos Comerciais"],
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=2526&auto=format&fit=crop",
      featured: true,
      downloadable: true
    },
    {
      id: 5,
      title: "Guia de Transações Imobiliárias",
      category: "real-estate-law",
      description: "Guia passo a passo para comprar, vender e alugar imóveis comerciais e residenciais.",
      readTime: "35 min",
      lastUpdated: "2024-01-14",
      author: "Jennifer Park, Esq.",
      difficulty: "Intermediate",
      topics: ["Contratos de Compra e Venda", "Due Diligence", "Fechamento do Negócio", "Questões de Titularidade"],
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
      featured: false,
      downloadable: true
    },
    {
      id: 6,
      title: "Conformidade em Privacidade e Segurança de Dados",
      category: "privacy-law",
      description: "Entenda a LGPD, a GDPR, a CCPA e outras normas de privacidade para proteger os dados dos clientes.",
      readTime: "28 min",
      lastUpdated: "2024-01-22",
      author: "Thomas Anderson, Esq.",
      difficulty: "Advanced",
      topics: ["Conformidade com a GDPR", "Requisitos da CCPA", "Vazamentos de Dados", "Políticas de Privacidade"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2500&auto=format&fit=crop",
      featured: true,
      downloadable: true
    },
    {
      id: 7,
      title: "Boas Práticas de Governança Corporativa",
      category: "corporate-law",
      description: "Práticas essenciais de governança para conselhos, executivos e partes interessadas.",
      readTime: "26 min",
      lastUpdated: "2024-01-16",
      author: "Lisa Wang, Esq.",
      difficulty: "Advanced",
      topics: ["Deveres do Conselho", "Direitos dos Acionistas", "Compliance", "Gestão de Riscos"],
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop",
      featured: false,
      downloadable: true
    },
    {
      id: 8,
      title: "Checklist Jurídico para Startups",
      category: "business-law",
      description: "Etapas jurídicas essenciais que toda startup deve seguir, da fundação às rodadas de investimento.",
      readTime: "20 min",
      lastUpdated: "2024-01-19",
      author: "Robert Kim, Esq.",
      difficulty: "Beginner",
      topics: ["Constituição da Empresa", "Acordo de Sócios", "Cessão de PI", "Termos de Investimento"],
      image: "https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=2500&auto=format&fit=crop",
      featured: false,
      downloadable: true
    }
  ];

  const categories = [
    { id: 'all', name: 'Todos os guias', count: guides.length },
    { id: 'business-law', name: 'Direito Empresarial', count: guides.filter(g => g.category === 'business-law').length },
    { id: 'employment-law', name: 'Direito do Trabalho', count: guides.filter(g => g.category === 'employment-law').length },
    { id: 'contract-law', name: 'Direito Contratual', count: guides.filter(g => g.category === 'contract-law').length },
    { id: 'ip-law', name: 'Propriedade Intelectual', count: guides.filter(g => g.category === 'ip-law').length },
    { id: 'real-estate-law', name: 'Imobiliário', count: guides.filter(g => g.category === 'real-estate-law').length },
    { id: 'privacy-law', name: 'Privacidade', count: guides.filter(g => g.category === 'privacy-law').length },
    { id: 'corporate-law', name: 'Direito Societário', count: guides.filter(g => g.category === 'corporate-law').length }
  ];

  const filteredGuides = guides.filter(guide => {
    const matchesCategory = activeCategory === 'all' || guide.category === activeCategory;
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredGuides = guides.filter(guide => guide.featured);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400';
      case 'Intermediate': return 'text-yellow-400';
      case 'Advanced': return 'text-red-400';
      default: return 'text-white/60';
    }
  };

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Header */}
      <header className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black"></div>
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop" 
            alt="Guias jurídicos" 
            layout="fill"
            objectFit="cover"
            priority
            className="opacity-40"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-6">
            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6">Guias jurídicos</h1>
            <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-2xl mx-auto">
              Guias jurídicos completos escritos por advogados especialistas para ajudar você com temas jurídicos complexos
            </p>
            <Link href="/signup" className="bg-white text-black px-8 py-4 text-lg font-medium transition-all hover:bg-white/90">
              Acessar todos os guias
            </Link>
          </div>
        </div>
      </header>

      {/* Featured Guides */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6">Guias em destaque</h2>
            <div className="w-24 h-1 bg-white/20 mx-auto mb-6"></div>
            <p className="text-white/60 max-w-2xl mx-auto">
              Nossos guias jurídicos mais populares e completos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {featuredGuides.map((guide) => (
              <div key={guide.id} className="bg-white/5 border border-white/10 group hover:bg-white/10 transition-all duration-300">
                <div className="aspect-video relative overflow-hidden">
                  <Image 
                    src={guide.image} 
                    alt={guide.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${getDifficultyColor(guide.difficulty)} bg-black/60`}>
                      {({ Beginner: 'Iniciante', Intermediate: 'Intermediário', Advanced: 'Avançado' } as Record<string, string>)[guide.difficulty] ?? guide.difficulty}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-2 leading-tight">{guide.title}</h3>
                  <p className="text-white/70 text-sm mb-4 line-clamp-2">{guide.description}</p>
                  
                  <div className="flex items-center text-xs text-white/60 mb-4">
                    <span>{guide.readTime}</span>
                    <span className="mx-2">•</span>
                    <span>{guide.author}</span>
                  </div>

                  <Link 
                    href={`/resources/guides/${guide.id}`}
                    className="text-white hover:text-white/80 transition-colors text-sm font-medium"
                  >
                    Ler guia →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-16 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between mb-12">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Pesquisar guias jurídicos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white placeholder-white/60 px-4 py-3 pl-12 focus:outline-none focus:border-white/40 transition-colors"
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    activeCategory === category.id
                      ? 'bg-white text-black'
                      : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div className="text-white/60 mb-8">
            Exibindo {filteredGuides.length} {filteredGuides.length !== 1 ? 'guias' : 'guia'}
            {searchTerm && ` para "${searchTerm}"`}
          </div>
        </div>
      </section>

      {/* All Guides */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-8">
            {filteredGuides.map((guide) => (
              <div key={guide.id} className="bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="aspect-video md:aspect-square relative overflow-hidden">
                    <Image 
                      src={guide.image} 
                      alt={guide.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${getDifficultyColor(guide.difficulty)} bg-black/60`}>
                        {({ Beginner: 'Iniciante', Intermediate: 'Intermediário', Advanced: 'Avançado' } as Record<string, string>)[guide.difficulty] ?? guide.difficulty}
                      </span>
                    </div>
                    {guide.downloadable && (
                      <div className="absolute top-4 right-4">
                        <span className="px-2 py-1 text-xs font-medium rounded bg-green-600 text-white">
                          Disponível para download
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="md:col-span-2 p-8">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-medium">{guide.title}</h3>
                      {guide.featured && (
                        <span className="bg-white text-black px-3 py-1 text-sm font-medium">
                          Destaque
                        </span>
                      )}
                    </div>

                    <p className="text-white/70 text-lg mb-6 leading-relaxed">{guide.description}</p>

                    {/* Meta info */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-white/60 mb-6">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {guide.readTime}
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {guide.author}
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Atualizado em {new Date(guide.lastUpdated).toLocaleDateString('pt-BR')}
                      </div>
                    </div>

                    {/* Topics */}
                    <div className="mb-8">
                      <h4 className="text-sm font-medium text-white/90 mb-3">Temas abordados:</h4>
                      <div className="flex flex-wrap gap-2">
                        {guide.topics.map((topic, index) => (
                          <span key={index} className="bg-white/10 text-white/80 px-3 py-1 text-sm rounded-full">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                      <Link
                        href={`/resources/guides/${guide.id}`}
                        className="bg-white text-black px-6 py-3 font-medium transition-all hover:bg-white/90"
                      >
                        Ler guia
                      </Link>
                      {guide.downloadable && (
                        <Link
                          href="#"
                          className="bg-white/10 text-white px-6 py-3 font-medium border border-white/20 transition-all hover:bg-white/20"
                        >
                          Baixar PDF
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredGuides.length === 0 && (
            <div className="text-center py-16">
              <div className="text-white/60 mb-4">Nenhum guia encontrado com esses critérios.</div>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                }}
                className="text-white hover:text-white/80 transition-colors"
              >
                Limpar filtros e mostrar todos os guias
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-8">
              <div className="text-4xl font-light mb-4">50+</div>
              <h3 className="text-xl font-medium mb-2">Guias especializados</h3>
              <p className="text-white/60">Recursos jurídicos completos</p>
            </div>
            <div className="p-8">
              <div className="text-4xl font-light mb-4">25+</div>
              <h3 className="text-xl font-medium mb-2">Áreas de atuação</h3>
              <p className="text-white/60">Cobrindo todos os principais temas jurídicos</p>
            </div>
            <div className="p-8">
              <div className="text-4xl font-light mb-4">100K+</div>
              <h3 className="text-xl font-medium mb-2">Downloads</h3>
              <p className="text-white/60">A confiança de profissionais do Direito</p>
            </div>
            <div className="p-8">
              <div className="text-4xl font-light mb-4">Semanais</div>
              <h3 className="text-xl font-medium mb-2">Atualizações</h3>
              <p className="text-white/60">Conteúdo novo e insights jurídicos</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-8">Mantenha-se informado com orientação jurídica especializada</h2>
          <p className="text-white/60 text-xl mb-12 max-w-2xl mx-auto">
            Acesse nossa biblioteca completa de guias jurídicos e obtenha o conhecimento necessário para tomar decisões fundamentadas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="bg-white text-black px-8 py-4 text-lg font-medium transition-all hover:bg-white/90">
              Iniciar teste grátis
            </Link>
            <Link href="/pricing" className="bg-white/10 text-white px-8 py-4 text-lg font-medium border border-white/20 transition-all hover:bg-white/20">
              Ver preços
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
