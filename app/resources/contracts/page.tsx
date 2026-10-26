'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function ContractTemplatesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const contractTemplates = [
    {
      id: 1,
      title: "Modelo de Contrato de Prestação de Serviços",
      category: "business",
      description: "Modelo completo de contrato de prestação de serviços para serviços profissionais, consultoria e relações com prestadores.",
      pages: 12,
      clauses: 25,
      lastUpdated: "2024-01-15",
      downloadFormat: ["DOCX", "PDF"],
      features: ["Proteção de responsabilidade", "Condições de pagamento", "Escopo do trabalho", "Cláusulas de rescisão"],
      price: "Grátis",
      popular: true
    },
    {
      id: 2,
      title: "Acordo de Confidencialidade (NDA)",
      category: "business",
      description: "Modelo padrão de NDA para proteger informações confidenciais em relações comerciais.",
      pages: 4,
      clauses: 12,
      lastUpdated: "2024-01-10",
      downloadFormat: ["DOCX", "PDF"],
      features: ["Proteção mútua", "Confidencialidade definida", "Obrigações de devolução", "Prazo de vigência"],
      price: "Grátis",
      popular: true
    },
    {
      id: 3,
      title: "Contrato de Trabalho",
      category: "employment",
      description: "Modelo completo de contrato de trabalho abrangendo salário, benefícios e políticas da empresa.",
      pages: 8,
      clauses: 18,
      lastUpdated: "2024-01-20",
      downloadFormat: ["DOCX", "PDF"],
      features: ["Estrutura de remuneração", "Pacote de benefícios", "Expectativas de desempenho", "Procedimentos de desligamento"],
      price: "Premium",
      popular: false
    },
    {
      id: 4,
      title: "Contrato de Locação Comercial",
      category: "real-estate",
      description: "Contrato de locação profissional para imóveis comerciais, incluindo lojas e escritórios.",
      pages: 16,
      clauses: 35,
      lastUpdated: "2024-01-12",
      downloadFormat: ["DOCX", "PDF"],
      features: ["Reajuste do aluguel", "Responsabilidades de manutenção", "Restrições de uso", "Direito de cessão"],
      price: "Premium",
      popular: false
    },
    {
      id: 5,
      title: "Contrato de Sociedade",
      category: "business",
      description: "Contrato completo para sociedades empresariais e joint ventures.",
      pages: 20,
      clauses: 40,
      lastUpdated: "2024-01-18",
      downloadFormat: ["DOCX", "PDF"],
      features: ["Divisão de lucros", "Tomada de decisões", "Aportes de capital", "Estratégias de saída"],
      price: "Premium",
      popular: false
    },
    {
      id: 6,
      title: "Contrato de Licença de Software",
      category: "technology",
      description: "Contrato de licenciamento de tecnologia para produtos de software e aplicações SaaS.",
      pages: 14,
      clauses: 28,
      lastUpdated: "2024-01-08",
      downloadFormat: ["DOCX", "PDF"],
      features: ["Direitos de uso", "Condições de suporte", "Privacidade de dados", "Limitação de responsabilidade"],
      price: "Premium",
      popular: true
    },
    {
      id: 7,
      title: "Contrato de Consultoria",
      category: "business",
      description: "Modelo de contrato de consultoria profissional para prestadores autônomos e consultores.",
      pages: 10,
      clauses: 22,
      lastUpdated: "2024-01-22",
      downloadFormat: ["DOCX", "PDF"],
      features: ["Definição de entregas", "Cronograma de pagamentos", "Propriedade intelectual", "Confidencialidade"],
      price: "Grátis",
      popular: true
    },
    {
      id: 8,
      title: "Contrato de Compra e Venda",
      category: "business",
      description: "Contrato geral de compra de bens e serviços com termos e condições padrão.",
      pages: 6,
      clauses: 15,
      lastUpdated: "2024-01-14",
      downloadFormat: ["DOCX", "PDF"],
      features: ["Condições de entrega", "Condições de pagamento", "Garantias de qualidade", "Políticas de devolução"],
      price: "Grátis",
      popular: false
    }
  ];

  const categories = [
    { id: 'all', name: 'Todos os modelos', count: contractTemplates.length },
    { id: 'business', name: 'Empresarial', count: contractTemplates.filter(t => t.category === 'business').length },
    { id: 'employment', name: 'Trabalhista', count: contractTemplates.filter(t => t.category === 'employment').length },
    { id: 'real-estate', name: 'Imobiliário', count: contractTemplates.filter(t => t.category === 'real-estate').length },
    { id: 'technology', name: 'Tecnologia', count: contractTemplates.filter(t => t.category === 'technology').length }
  ];

  const filteredTemplates = contractTemplates.filter(template => {
    const matchesCategory = activeCategory === 'all' || template.category === activeCategory;
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Header */}
      <header className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black"></div>
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2670&auto=format&fit=crop" 
            alt="Modelos de contratos" 
            layout="fill"
            objectFit="cover"
            priority
            className="opacity-40"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-6">
            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6">Modelos de contratos</h1>
            <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-2xl mx-auto">
              Modelos de contratos profissionais, revisados juridicamente e prontos para uso imediato
            </p>
            <Link href="/signup" className="bg-white text-black px-8 py-4 text-lg font-medium transition-all hover:bg-white/90">
              Acessar todos os modelos
            </Link>
          </div>
        </div>
      </header>

      {/* Search and Filter Section */}
      <section className="py-16 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between mb-12">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Pesquisar modelos de contratos..."
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
            Exibindo {filteredTemplates.length} {filteredTemplates.length !== 1 ? 'modelos' : 'modelo'}
            {searchTerm && ` para "${searchTerm}"`}
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template) => (
              <div key={template.id} className="bg-white/5 border border-white/10 group hover:bg-white/10 transition-all duration-300 relative">
                {template.popular && (
                  <div className="absolute -top-3 left-6 bg-white text-black px-3 py-1 text-sm font-medium">
                    Popular
                  </div>
                )}
                
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-medium mb-2">{template.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
                        <span>{template.pages} páginas</span>
                        <span>•</span>
                        <span>{template.clauses} cláusulas</span>
                        <span>•</span>
                        <span className={`font-medium ${template.price === 'Free' ? 'text-green-400' : 'text-yellow-400'}`}>
                          {template.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-white/70 mb-6 leading-relaxed">
                    {template.description}
                  </p>

                  {/* Features */}
                  <div className="mb-8">
                    <h4 className="text-sm font-medium text-white/90 mb-3">Principais características:</h4>
                    <ul className="space-y-2">
                      {template.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-sm text-white/70">
                          <svg className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Download formats */}
                  <div className="mb-6">
                    <div className="text-sm text-white/60 mb-2">Formatos disponíveis:</div>
                    <div className="flex gap-2">
                      {template.downloadFormat.map((format) => (
                        <span key={format} className="bg-white/10 text-white/80 px-2 py-1 text-xs rounded">
                          {format}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action button */}
                  <Link
                    href={template.price === 'Grátis' ? '#' : '/pricing'}
                    className="block w-full py-3 px-6 text-center font-medium transition-all bg-white text-black hover:bg-white/90"
                  >
                    {template.price === 'Grátis' ? 'Baixar grátis' : 'Obter Premium'}
                  </Link>

                  {/* Last updated */}
                  <div className="text-xs text-white/50 mt-4 text-center">
                    Atualizado em {new Date(template.lastUpdated).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-16">
              <div className="text-white/60 mb-4">Nenhum modelo encontrado com esses critérios.</div>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                }}
                className="text-white hover:text-white/80 transition-colors"
              >
                Limpar filtros e mostrar todos os modelos
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6">Por que escolher nossos modelos?</h2>
            <div className="w-24 h-1 bg-white/20 mx-auto mb-6"></div>
            <p className="text-white/60 max-w-2xl mx-auto">
              Nossos modelos de contratos são elaborados por especialistas jurídicos e atualizados regularmente de acordo com a legislação vigente
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4">Revisados juridicamente</h3>
              <p className="text-white/70">Todos os modelos são revisados por advogados qualificados e atualizados regularmente</p>
            </div>
            
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4">Personalizáveis</h3>
              <p className="text-white/70">Fáceis de modificar e adaptar às necessidades específicas do seu negócio</p>
            </div>
            
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4">Download imediato</h3>
              <p className="text-white/70">Baixe imediatamente em vários formatos, incluindo Word e PDF</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-8">Pronto para começar?</h2>
          <p className="text-white/60 text-xl mb-12 max-w-2xl mx-auto">
            Acesse nossa biblioteca completa de modelos de contratos e recursos jurídicos.
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
