'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo } from 'react';

export default function LegalGlossaryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeLetter, setActiveLetter] = useState('all');

  const glossaryTerms = [
    // A
    { term: "Declaração Juramentada", category: "procedure", definition: "Declaração escrita confirmada por juramento ou compromisso, para uso como prova em juízo." },
    { term: "Recurso", category: "procedure", definition: "Procedimento pelo qual um caso é levado a um tribunal superior para revisão da decisão de uma instância inferior." },
    { term: "Arbitragem", category: "alternative-dispute", definition: "Método alternativo de solução de disputas em que os conflitos são resolvidos por um ou mais árbitros, fora do Judiciário." },
    { term: "Sigilo Profissional do Advogado", category: "ethics", definition: "Prerrogativa legal que protege contra divulgação as comunicações entre o cliente e seu advogado." },

    // B
    { term: "Ônus da Prova", category: "procedure", definition: "Obrigação de comprovar alegações por meio de provas que demonstrem a veracidade dos fatos necessários para chegar a determinada conclusão." },
    { term: "Inadimplemento Contratual", category: "contract", definition: "Violação de qualquer dos termos e condições acordados em um contrato vinculante." },
    { term: "Petição", category: "procedure", definition: "Documento jurídico escrito apresentado a um tribunal para sustentar a posição de uma das partes em uma disputa." },
    { term: "Estatuto Social", category: "corporate", definition: "Regras estabelecidas por uma empresa, organização ou outra entidade para se autorregular, conforme permitido ou previsto em seu ato constitutivo." },

    // C
    { term: "Contraprestação", category: "contract", definition: "Algo de valor que cada parte de um contrato entrega à outra como incentivo para celebrar o contrato." },
    { term: "Direito Autoral", category: "intellectual-property", definition: "Forma de proteção da propriedade intelectual que concede direitos exclusivos ao criador de obras originais." },
    { term: "Obrigação Contratual (Covenant)", category: "contract", definition: "Promessa ou compromisso formal previsto em um contrato, escritura ou outro instrumento jurídico." },
    { term: "Guarda", category: "family", definition: "Direito e dever legal de cuidar de uma criança, incluindo a guarda física e a guarda jurídica." },

    // D
    { term: "Indenização por Danos", category: "tort", definition: "Compensação em dinheiro por perda ou lesão causada por ato ilícito, inadimplemento ou negligência de outra pessoa." },
    { term: "Due Diligence", category: "corporate", definition: "Investigação ou cuidado que se espera de uma empresa ou pessoa razoável antes de celebrar um acordo ou contrato." },
    { term: "Devido Processo Legal", category: "constitutional", definition: "Garantia constitucional de que os procedimentos legais serão justos e de que as pessoas serão notificadas e terão oportunidade de ser ouvidas." },

    // E
    { term: "Vedação ao Comportamento Contraditório (Estoppel)", category: "procedure", definition: "Princípio jurídico que impede uma parte de alegar um direito ou pretensão que contradiga o que ela declarou ou acordou anteriormente." },
    { term: "Conta Garantia (Escrow)", category: "real-estate", definition: "Arranjo financeiro em que um terceiro mantém e controla o pagamento de valores devidos entre duas partes de uma transação." },
    { term: "Prova", category: "procedure", definition: "Informações apresentadas por depoimentos, documentos, objetos etc., usadas para provar ou refutar fatos em um processo." },

    // F
    { term: "Fiduciário", category: "corporate", definition: "Pessoa que mantém uma relação jurídica ou ética de confiança com uma ou mais partes." },
    { term: "Força Maior", category: "contract", definition: "Circunstâncias imprevisíveis que impedem uma parte de cumprir um contrato, muitas vezes chamadas de 'casos fortuitos'." },
    { term: "Fraude", category: "tort", definition: "Engano intencional praticado para obter vantagem pessoal ou prejudicar outra pessoa." },

    // G
    { term: "Penhora", category: "procedure", definition: "Procedimento legal em que dinheiro ou bens de um devedor são apreendidos para satisfazer uma dívida ou obrigação." },
    { term: "Curador Especial", category: "family", definition: "Pessoa nomeada pelo juiz para proteger os interesses de menores ou incapazes em processos judiciais." },

    // H
    { term: "Habeas Corpus", category: "constitutional", definition: "Ação que exige que uma pessoa presa seja apresentada a um juiz ou tribunal para verificar se sua detenção é legal." },
    { term: "Testemunho Indireto (Hearsay)", category: "evidence", definition: "Declaração feita fora do juízo e apresentada para provar a veracidade do que foi afirmado, geralmente inadmissível em juízo." },

    // I
    { term: "Indenização Contratual", category: "contract", definition: "Obrigação contratual de uma parte de compensar a perda sofrida por outra parte em razão de atos de quem indeniza." },
    { term: "Medida Liminar", category: "procedure", definition: "Ordem judicial que impede uma pessoa de iniciar ou continuar uma conduta que ameace outra pessoa." },
    { term: "Propriedade Intelectual", category: "intellectual-property", definition: "Criações do intelecto, como invenções, obras literárias e artísticas, desenhos, símbolos, nomes e imagens usados no comércio." },

    // J
    { term: "Jurisdição", category: "procedure", definition: "Poder oficial de tomar decisões e proferir julgamentos sobre determinada área ou tipo de caso." },
    { term: "Jurisprudência", category: "theory", definition: "Teoria ou filosofia do Direito, ou o conjunto de precedentes de um sistema jurídico." },

    // L
    { term: "Responsabilidade", category: "tort", definition: "Responsabilidade legal por atos ou omissões, muitas vezes envolvendo a obrigação de indenizar." },
    { term: "Direito Real de Garantia", category: "property", definition: "Direito ou interesse legal de um credor sobre bens de outra pessoa, que geralmente perdura até a quitação da dívida." },
    { term: "Litígio", category: "procedure", definition: "Processo de recorrer ao Judiciário para resolver uma disputa." },

    // M
    { term: "Mediação", category: "alternative-dispute", definition: "Método alternativo de solução de disputas em que um terceiro neutro ajuda as partes a chegar a um acordo." },
    { term: "Fusão", category: "corporate", definition: "Combinação de duas ou mais empresas em uma única entidade, normalmente com transferência de ativos e passivos." },

    // N
    { term: "Negligência", category: "tort", definition: "Falta do cuidado devido ao fazer algo, resultando em dano ou lesão a outra pessoa." },
    { term: "Acordo de Confidencialidade (NDA)", category: "contract", definition: "Contrato que cria uma relação de confidencialidade entre as partes para proteger informações sensíveis." },

    // P
    { term: "Patente", category: "intellectual-property", definition: "Título concedido pelo Estado que garante ao inventor direitos exclusivos por tempo limitado em troca da divulgação pública da invenção." },
    { term: "Procuração", category: "procedure", definition: "Documento jurídico que dá a uma pessoa poderes para agir em nome de outra em assuntos jurídicos ou financeiros específicos." },
    { term: "Precedente", category: "procedure", definition: "Princípio ou regra jurídica estabelecida em um caso anterior que orienta decisões futuras em casos semelhantes." },

    // S
    { term: "Prescrição", category: "procedure", definition: "Lei que fixa o prazo máximo, a partir de um evento, para que um processo judicial possa ser iniciado." },
    { term: "Intimação", category: "procedure", definition: "Ordem escrita que obriga alguém a prestar depoimento ou apresentar provas em um processo." },

    // T
    { term: "Ato Ilícito", category: "tort", definition: "Ato ilícito ou violação de direito que gera responsabilidade civil." },
    { term: "Marca", category: "intellectual-property", definition: "Símbolo, palavra ou palavras registradas legalmente ou consagradas pelo uso como identificação de uma empresa ou produto." },

    // V
    { term: "Foro", category: "procedure", definition: "Localidade em que um caso pode ser julgado, normalmente onde as partes residem ou onde o fato ocorreu." },

    // W
    { term: "Garantia", category: "contract", definition: "Promessa ou garantia dada pelo vendedor sobre a qualidade, durabilidade ou desempenho de um produto." },
    { term: "Testamento", category: "estate", definition: "Documento jurídico que expressa a vontade de uma pessoa sobre a destinação de seus bens após a morte." }
  ];

  const categories = [
    { id: 'all', name: 'Todos os termos', count: glossaryTerms.length },
    { id: 'procedure', name: 'Processo', count: glossaryTerms.filter(t => t.category === 'procedure').length },
    { id: 'contract', name: 'Direito Contratual', count: glossaryTerms.filter(t => t.category === 'contract').length },
    { id: 'tort', name: 'Responsabilidade Civil', count: glossaryTerms.filter(t => t.category === 'tort').length },
    { id: 'intellectual-property', name: 'Propriedade Intelectual', count: glossaryTerms.filter(t => t.category === 'intellectual-property').length },
    { id: 'corporate', name: 'Direito Societário', count: glossaryTerms.filter(t => t.category === 'corporate').length },
    { id: 'constitutional', name: 'Constitucional', count: glossaryTerms.filter(t => t.category === 'constitutional').length },
    { id: 'family', name: 'Direito de Família', count: glossaryTerms.filter(t => t.category === 'family').length },
    { id: 'alternative-dispute', name: 'Métodos Alternativos', count: glossaryTerms.filter(t => t.category === 'alternative-dispute').length }
  ];

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter(term => {
      const matchesCategory = activeFilter === 'all' || term.category === activeFilter;
      const matchesLetter = activeLetter === 'all' || term.term.charAt(0).toUpperCase() === activeLetter;
      const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesLetter && matchesSearch;
    }).sort((a, b) => a.term.localeCompare(b.term));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, activeFilter, activeLetter]);

  const groupedTerms = useMemo(() => {
    const groups: { [key: string]: typeof glossaryTerms } = {};
    filteredTerms.forEach(term => {
      const firstLetter = term.term.charAt(0).toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(term);
    });
    return groups;
  }, [filteredTerms]);

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Header */}
      <header className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black"></div>
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2558&auto=format&fit=crop"
            alt="Glossário jurídico"
            layout="fill"
            objectFit="cover"
            priority
            className="opacity-40"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-6">
            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6">Glossário jurídico</h1>
            <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-2xl mx-auto">
              Definições completas de termos e conceitos jurídicos para ajudar você a entender o Direito
            </p>
            <Link href="/signup" className="bg-white text-black px-8 py-4 text-lg font-medium transition-all hover:bg-white/90">
              Acessar o glossário completo
            </Link>
          </div>
        </div>
      </header>

      {/* Search and Filter Section */}
      <section className="py-16 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-12">
            <input
              type="text"
              placeholder="Pesquisar termos jurídicos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white placeholder-white/60 px-6 py-4 pl-14 text-lg focus:outline-none focus:border-white/40 transition-colors"
            />
            <svg className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Alphabet Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setActiveLetter('all')}
              className={`px-3 py-2 text-sm transition-all ${activeLetter === 'all'
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
                }`}
            >
              Todos
            </button>
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => setActiveLetter(letter)}
                className={`px-3 py-2 text-sm transition-all ${activeLetter === letter
                    ? 'bg-white text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
              >
                {letter}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${activeFilter === category.id
                    ? 'bg-white text-black'
                    : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                  }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* Results count */}
          <div className="text-center text-white/60 mb-8">
            Exibindo {filteredTerms.length} {filteredTerms.length !== 1 ? 'termos' : 'termo'}
            {searchTerm && ` para "${searchTerm}"`}
          </div>
        </div>
      </section>

      {/* Glossary Terms */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {Object.keys(groupedTerms).length === 0 ? (
            <div className="text-center py-16">
              <div className="text-white/60 mb-4">Nenhum termo encontrado com esses critérios.</div>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveFilter('all');
                  setActiveLetter('all');
                }}
                className="text-white hover:text-white/80 transition-colors"
              >
                Limpar filtros e mostrar todos os termos
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.keys(groupedTerms).sort().map((letter) => (
                <div key={letter} className="space-y-6">
                  <h2 className="text-3xl font-light mb-8 pb-4 border-b border-white/20">
                    {letter}
                  </h2>
                  <div className="space-y-6">
                    {groupedTerms[letter].map((term, index) => (
                      <div
                        key={index}
                        className="bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-xl font-medium text-white">{term.term}</h3>
                          <span className="bg-white/10 text-white/80 px-3 py-1 text-sm rounded-full capitalize">
                            {({ procedure: 'processo', contract: 'contratos', tort: 'responsabilidade civil', 'intellectual-property': 'propriedade intelectual', corporate: 'societário', constitutional: 'constitucional', family: 'família', 'alternative-dispute': 'métodos alternativos', ethics: 'ética', 'real-estate': 'imobiliário', evidence: 'provas', theory: 'teoria do Direito', property: 'direitos reais', estate: 'sucessões' } as Record<string, string>)[term.category] ?? term.category.replace('-', ' ')}
                          </span>
                        </div>
                        <p className="text-white/70 leading-relaxed">{term.definition}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-24 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-8">
              <div className="text-4xl font-light mb-4">500+</div>
              <h3 className="text-xl font-medium mb-2">Termos jurídicos</h3>
              <p className="text-white/60">Definições completas</p>
            </div>
            <div className="p-8">
              <div className="text-4xl font-light mb-4">15+</div>
              <h3 className="text-xl font-medium mb-2">Áreas de atuação</h3>
              <p className="text-white/60">Cobrindo todas as principais áreas</p>
            </div>
            <div className="p-8">
              <div className="text-4xl font-light mb-4">Diárias</div>
              <h3 className="text-xl font-medium mb-2">Atualizações</h3>
              <p className="text-white/60">Novos termos e revisões</p>
            </div>
            <div className="p-8">
              <div className="text-4xl font-light mb-4">Especialistas</div>
              <h3 className="text-xl font-medium mb-2">Revisão</h3>
              <p className="text-white/60">Definições verificadas por advogados</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6">Muito além de definições</h2>
            <div className="w-24 h-1 bg-white/20 mx-auto mb-6"></div>
            <p className="text-white/60 max-w-2xl mx-auto">
              Nosso glossário jurídico vai além de definições simples, oferecendo contexto e compreensão prática
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4">Pesquisa inteligente</h3>
              <p className="text-white/70">Encontre termos rapidamente com uma pesquisa inteligente em definições e conceitos relacionados</p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4">Contexto prático</h3>
              <p className="text-white/70">Entenda como os termos são usados em diferentes áreas do Direito, com exemplos práticos</p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4">Referências cruzadas</h3>
              <p className="text-white/70">Descubra termos e conceitos relacionados para construir um conhecimento jurídico abrangente</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-8">Domine a terminologia jurídica</h2>
          <p className="text-white/60 text-xl mb-12 max-w-2xl mx-auto">
            Amplie seu vocabulário jurídico com nosso glossário completo e definições selecionadas por especialistas.
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
