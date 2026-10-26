'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function ComplianceChecklistsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const checklists = [
    {
      id: 1,
      title: "Checklist de Conformidade com a GDPR",
      category: "data-privacy",
      description: "Checklist completo para garantir que sua organização atenda a todos os requisitos de proteção de dados da GDPR.",
      items: 45,
      lastUpdated: "2024-01-15",
      author: "Equipe de Privacidade de Dados",
      jurisdiction: "UE",
      priority: "High",
      completionTime: "4 a 6 semanas",
      topics: ["Mapeamento de dados", "Políticas de privacidade", "Gestão de consentimento", "Procedimentos para incidentes"],
      downloadable: true,
      interactive: true
    },
    {
      id: 2,
      title: "Checklist de Auditoria de Conformidade SOX",
      category: "financial",
      description: "Checklist essencial para conformidade com a Lei Sarbanes-Oxley, incluindo controles internos e relatórios financeiros.",
      items: 38,
      lastUpdated: "2024-01-20",
      author: "Equipe de Compliance Financeiro",
      jurisdiction: "EUA",
      priority: "High",
      completionTime: "8 a 12 semanas",
      topics: ["Controles internos", "Relatórios financeiros", "Procedimentos de auditoria", "Documentação"],
      downloadable: true,
      interactive: true
    },
    {
      id: 3,
      title: "Conformidade com a HIPAA na Saúde",
      category: "healthcare",
      description: "Checklist completo de conformidade com a HIPAA para prestadores de saúde e parceiros de negócios.",
      items: 52,
      lastUpdated: "2024-01-12",
      author: "Equipe de Compliance na Saúde",
      jurisdiction: "EUA",
      priority: "High",
      completionTime: "6 a 8 semanas",
      topics: ["Salvaguardas físicas", "Salvaguardas administrativas", "Salvaguardas técnicas", "Parceiros de negócios"],
      downloadable: true,
      interactive: true
    },
    {
      id: 4,
      title: "Checklist de Conformidade Trabalhista",
      category: "employment",
      description: "Garanta que suas práticas de contratação e emprego estejam em conformidade com as normas federais e estaduais.",
      items: 34,
      lastUpdated: "2024-01-18",
      author: "Equipe de Direito do Trabalho",
      jurisdiction: "EUA",
      priority: "Medium",
      completionTime: "2 a 4 semanas",
      topics: ["Práticas de contratação", "Requisitos salariais", "Segurança no trabalho", "Direitos dos empregados"],
      downloadable: true,
      interactive: false
    },
    {
      id: 5,
      title: "Conformidade Ambiental na Indústria",
      category: "environmental",
      description: "Checklist de conformidade com normas ambientais para operações industriais e de manufatura.",
      items: 41,
      lastUpdated: "2024-01-14",
      author: "Equipe de Direito Ambiental",
      jurisdiction: "EUA",
      priority: "High",
      completionTime: "6 a 10 semanas",
      topics: ["Gestão de resíduos", "Qualidade do ar", "Lançamento de efluentes", "Manuseio de produtos químicos"],
      downloadable: true,
      interactive: false
    },
    {
      id: 6,
      title: "Compliance em Serviços Financeiros (FINRA)",
      category: "financial",
      description: "Checklist de conformidade com a FINRA para corretoras e consultores de investimentos.",
      items: 47,
      lastUpdated: "2024-01-22",
      author: "Equipe de Serviços Financeiros",
      jurisdiction: "EUA",
      priority: "High",
      completionTime: "8 a 12 semanas",
      topics: ["Manutenção de registros", "Proteção do cliente", "Supervisão", "Requisitos de capital"],
      downloadable: true,
      interactive: true
    },
    {
      id: 7,
      title: "Conformidade com os Direitos de Privacidade da CCPA",
      category: "data-privacy",
      description: "Checklist de conformidade com a California Consumer Privacy Act para empresas que tratam dados de residentes da Califórnia.",
      items: 29,
      lastUpdated: "2024-01-16",
      author: "Equipe de Direito da Privacidade",
      jurisdiction: "Califórnia",
      priority: "Medium",
      completionTime: "3 a 5 semanas",
      topics: ["Direitos do consumidor", "Divulgação de dados", "Mecanismos de opt-out", "Prestadores de serviços"],
      downloadable: true,
      interactive: true
    },
    {
      id: 8,
      title: "Checklist de Acessibilidade de Sites (ADA)",
      category: "accessibility",
      description: "Garanta que seu site atenda aos requisitos de acessibilidade da ADA e às diretrizes WCAG.",
      items: 35,
      lastUpdated: "2024-01-19",
      author: "Equipe de Acessibilidade",
      jurisdiction: "EUA",
      priority: "Medium",
      completionTime: "4 a 6 semanas",
      topics: ["Diretrizes WCAG", "Leitores de tela", "Navegação por teclado", "Contraste de cores"],
      downloadable: true,
      interactive: false
    }
  ];

  const categories = [
    { id: 'all', name: 'Todos os checklists', count: checklists.length },
    { id: 'data-privacy', name: 'Privacidade de dados', count: checklists.filter(c => c.category === 'data-privacy').length },
    { id: 'financial', name: 'Financeiro', count: checklists.filter(c => c.category === 'financial').length },
    { id: 'healthcare', name: 'Saúde', count: checklists.filter(c => c.category === 'healthcare').length },
    { id: 'employment', name: 'Trabalhista', count: checklists.filter(c => c.category === 'employment').length },
    { id: 'environmental', name: 'Ambiental', count: checklists.filter(c => c.category === 'environmental').length },
    { id: 'accessibility', name: 'Acessibilidade', count: checklists.filter(c => c.category === 'accessibility').length }
  ];

  const filteredChecklists = checklists.filter(checklist => {
    const matchesCategory = activeCategory === 'all' || checklist.category === activeCategory;
    const matchesSearch = checklist.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         checklist.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         checklist.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-400 bg-red-900/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-900/20';
      case 'Low': return 'text-green-400 bg-green-900/20';
      default: return 'text-white/60 bg-white/10';
    }
  };

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Header */}
      <header className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black"></div>
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop" 
            alt="Checklists de compliance" 
            layout="fill"
            objectFit="cover"
            priority
            className="opacity-40"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-6">
            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6">Checklists de compliance</h1>
            <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-2xl mx-auto">
              Checklists completos de compliance para ajudar você a cumprir as exigências regulatórias e evitar penalidades
            </p>
            <Link href="/signup" className="bg-white text-black px-8 py-4 text-lg font-medium transition-all hover:bg-white/90">
              Acessar checklists
            </Link>
          </div>
        </div>
      </header>

      {/* Overview Stats */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center mb-16">
            <div className="bg-white/5 border border-white/10 p-8">
              <div className="text-4xl font-light mb-4">50+</div>
              <h3 className="text-xl font-medium mb-2">Áreas de compliance</h3>
              <p className="text-white/60">Cobrindo as principais regulamentações</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-8">
              <div className="text-4xl font-light mb-4">300+</div>
              <h3 className="text-xl font-medium mb-2">Itens de checklist</h3>
              <p className="text-white/60">Requisitos detalhados</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-8">
              <div className="text-4xl font-light mb-4">95%</div>
              <h3 className="text-xl font-medium mb-2">Taxa de sucesso</h3>
              <p className="text-white/60">Organizações aprovadas em auditorias</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-8">
              <div className="text-4xl font-light mb-4">24/7</div>
              <h3 className="text-xl font-medium mb-2">Atualizações</h3>
              <p className="text-white/60">Monitoramento de mudanças regulatórias</p>
            </div>
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
                placeholder="Pesquisar checklists de compliance..."
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
            Exibindo {filteredChecklists.length} {filteredChecklists.length !== 1 ? 'checklists' : 'checklist'}
            {searchTerm && ` para "${searchTerm}"`}
          </div>
        </div>
      </section>

      {/* Checklists Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredChecklists.map((checklist) => (
              <div key={checklist.id} className="bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-medium mb-2">{checklist.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
                        <span>{checklist.items} itens</span>
                        <span>•</span>
                        <span>{checklist.jurisdiction}</span>
                        <span>•</span>
                        <span>{checklist.completionTime}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${getPriorityColor(checklist.priority)}`}>
                        Prioridade {({ High: 'alta', Medium: 'média', Low: 'baixa' } as Record<string, string>)[checklist.priority] ?? checklist.priority}
                      </span>
                      {checklist.interactive && (
                        <span className="px-2 py-1 text-xs font-medium rounded bg-blue-900/20 text-blue-400">
                          Interativo
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-white/70 mb-6 leading-relaxed">
                    {checklist.description}
                  </p>

                  {/* Progress placeholder */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-white/80">Progresso de conclusão</span>
                      <span className="text-white/60">0/{checklist.items}</span>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full">
                      <div className="bg-white/20 h-2 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                  </div>

                  {/* Topics */}
                  <div className="mb-8">
                    <h4 className="text-sm font-medium text-white/90 mb-3">Principais áreas:</h4>
                    <div className="flex flex-wrap gap-2">
                      {checklist.topics.map((topic, index) => (
                        <span key={index} className="bg-white/10 text-white/80 px-3 py-1 text-sm rounded-full">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Meta info */}
                  <div className="flex items-center gap-6 text-sm text-white/60 mb-8">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {checklist.author}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Atualizado em {new Date(checklist.lastUpdated).toLocaleDateString('pt-BR')}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4">
                    <Link
                      href={`/resources/compliance/${checklist.id}`}
                      className="flex-1 bg-white text-black px-6 py-3 font-medium text-center transition-all hover:bg-white/90"
                    >
                      {checklist.interactive ? 'Iniciar versão interativa' : 'Ver checklist'}
                    </Link>
                    {checklist.downloadable && (
                      <Link
                        href="#"
                        className="bg-white/10 text-white px-6 py-3 font-medium border border-white/20 transition-all hover:bg-white/20"
                      >
                        <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Baixar
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredChecklists.length === 0 && (
            <div className="text-center py-16">
              <div className="text-white/60 mb-4">Nenhum checklist encontrado com esses critérios.</div>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                }}
                className="text-white hover:text-white/80 transition-colors"
              >
                Limpar filtros e mostrar todos os checklists
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6">Por que escolher nossos checklists de compliance?</h2>
            <div className="w-24 h-1 bg-white/20 mx-auto mb-6"></div>
            <p className="text-white/60 max-w-2xl mx-auto">
              Elaborados por especialistas em compliance e atualizados regularmente de acordo com as normas mais recentes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4">Revisados por especialistas</h3>
              <p className="text-white/70">Criados e mantidos por profissionais de compliance com profundo conhecimento regulatório</p>
            </div>
            
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4">Sempre atualizados</h3>
              <p className="text-white/70">Atualizados automaticamente quando as normas mudam, para que você esteja sempre em conformidade</p>
            </div>
            
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4">Acompanhamento do progresso</h3>
              <p className="text-white/70">Checklists interativos com acompanhamento do progresso e recursos de colaboração em equipe</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-8">Mantenha a conformidade e reduza riscos</h2>
          <p className="text-white/60 text-xl mb-12 max-w-2xl mx-auto">
            Acesse nossos checklists completos de compliance e reduza seu risco regulatório com orientação especializada.
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
