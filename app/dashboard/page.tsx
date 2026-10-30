'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { aiService } from '../services/api';
import DashboardLayout from '../components/DashboardLayout';
import UpgradeModal from '../components/UpgradeModal';

// Add custom CSS styles for the enhanced query display
import './enhanced-query.css';

interface SearchResult {
  id: string;
  title: string;
  type: string;
  year: number;
  relevance: number;
  summary: string;
  formattedContent?: string;
}

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [enhancedQuery, setEnhancedQuery] = useState<string | null>(null);
  const [followUpPrompts, setFollowUpPrompts] = useState<string[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchSuggestions] = useState<string[]>([
    "Interpretação de contratos segundo a lei de Nova York",
    "Análise de modelo de acordo de confidencialidade",
    "Requisitos legais para rescisão do contrato de trabalho",
    "Responsabilidade em contratos de licenciamento",
    "Jurisprudência recente sobre violação de patentes"
  ]);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent | null, customQuery?: string) => {
    if (e) e.preventDefault();

    const queryToSearch = customQuery || searchQuery;
    if (!queryToSearch.trim() || isSearching) return;

    setIsSearching(true);
    setHasSearched(true);

    try {
      const response = await aiService.searchLegalDatabase(queryToSearch);

      if (response.success) {
        setSearchResults(response.results);
        setEnhancedQuery(response.enhancedQuery);
        setFollowUpPrompts(response.followUpPrompts || []);

        if (customQuery) {
          setSearchQuery(customQuery);
        }
      } else {
        setSearchResults([]);
        setFollowUpPrompts([]);
      }
    } catch (error: any) {
      console.error('Error searching:', error);
      if (error.response?.status === 403 || error.status === 403) {
        setShowUpgradeModal(true);
      }
      setSearchResults([]);
      setFollowUpPrompts([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleFollowUpClick = (prompt: string) => {
    handleSearch(null, prompt);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    handleSearch(null, suggestion);
  };

  const handleDraftDocument = () => {
    if (!enhancedQuery) return;

    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><style>body { font-family: 'Times New Roman', serif; line-height: 1.6; } h1, h2, h3 { color: #000; } .legal-content { padding: 20px; }</style></head><body><div class='legal-content'>";
    const footer = "</div></body></html>";
    const sourceHTML = header + enhancedQuery + footer;

    const source = `data:application/vnd.ms-word;charset=utf-8,${encodeURIComponent(sourceHTML)}`;
    const fileDownload = document.createElement('a');
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = 'Pequi_Minuta.doc';
    fileDownload.click();
    document.body.removeChild(fileDownload);
  };

  return (
    <DashboardLayout title="Pesquisa Inteligente">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Two-Panel Hero Section */}
        <div className="flex flex-col lg:flex-row rounded-[3rem] overflow-hidden shadow-2xl border border-castanha-200 min-h-[600px] bg-white">
          {/* Left Panel: High-Density Intelligence Banner */}
          <div className="lg:w-1/2 p-12 md:p-20 bg-hero-gradient relative flex flex-col justify-between overflow-hidden">
            {/* Architectural Grid Background */}
            <div className="absolute inset-0 opacity-[0.03]">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="grid-left" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-left)" />
              </svg>
            </div>

            <div className="relative z-10 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cerrado-950/5 border border-cerrado-900/5 animate-in fade-in slide-in-from-top-4 duration-1000">
                <div className="w-1.5 h-1.5 rounded-full bg-cerrado-950/20 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink/40 text-nowrap">Núcleo soberano ativo</span>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-medium tracking-tight leading-tight text-ink">
                  Central de <span className="font-light opacity-60 italic">Inteligência Estratégica</span>
                </h2>
                <p className="text-lg text-ink/60 font-medium leading-relaxed max-w-sm">
                  Pesquisa jurídica autônoma em diversas jurisdições, com mapeamento de precedentes em tempo real.
                </p>
              </div>
            </div>

            <div className="relative z-10 pt-12">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink/30">Fluxo de atividade neural</span>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-cerrado-500 animate-pulse" />
                    <div className="w-1 h-1 rounded-full bg-cerrado-500/40" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  {[
                    { label: 'Mapeamento de precedentes criminais', time: 'há 12s', icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                    { label: 'Auditoria de responsabilidade corporativa', time: 'há 45s', icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' },
                    { label: 'Descoberta transfronteiriça', time: 'há 2 min', icon: 'M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-white/40 border border-castanha-200 backdrop-blur-xl group hover:bg-white/60 transition-all cursor-default">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-lg bg-cerrado-950/5 flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-ink/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                          </svg>
                        </div>
                        <span className="text-[11px] font-bold text-ink/70 uppercase tracking-wider">{item.label}</span>
                      </div>
                      <span className="text-[9px] font-bold text-ink/20 uppercase tracking-widest">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Search Operating Interface */}
          <div className="lg:w-1/2 p-12 md:p-20 flex flex-col justify-center bg-white">
            <div className="max-w-md w-full mx-auto space-y-10">
              <div className="space-y-2">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/20">Terminal operacional</h3>
                <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-ink">O que posso analisar para você?</h2>
              </div>

              <form onSubmit={handleSearch} className="relative group">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-ink/20 transition-colors group-focus-within:text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Nº do processo, cláusula ou consulta..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-castanha-50 border border-castanha-200 text-ink placeholder-ink/30 py-5 pl-14 pr-16 rounded-2xl focus:outline-none focus:ring-4 focus:ring-pequi-500/5 transition-all duration-300 font-medium"
                />
                <button
                  type="submit"
                  disabled={isSearching}
                  className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-xl btn-primary-gradient ${isSearching ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSearching ? (
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  )}
                </button>
              </form>

              {!hasSearched && (
                <div className="space-y-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/20">Acesso rápido</p>
                  <div className="flex flex-wrap gap-2">
                    {searchSuggestions.slice(0, 4).map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest bg-castanha-50 hover:bg-cerrado-950/5 border border-castanha-200 rounded-full text-ink/40 hover:text-ink transition-all duration-300"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Section */}
        {hasSearched && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Main Results Column */}
            <div className="lg:col-span-2 space-y-8">
              {enhancedQuery && (
                <div className="bg-white border border-castanha-200 rounded-[2.5rem] p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-10 h-10 rounded-xl bg-cerrado-900 flex items-center justify-center shadow-lg shadow-black/10">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/30">Parecer sintetizado</h3>
                      <p className="text-xs font-medium text-foreground/60 mt-0.5">Resultado da rede neural v4.2</p>
                    </div>
                  </div>
                  <div
                    className="legal-search-result prose prose-gray max-w-none text-castanha-800 leading-relaxed font-medium text-[1.1rem]"
                    dangerouslySetInnerHTML={{ __html: enhancedQuery }}
                  />
                </div>
              )}
 
              {searchResults.length > 0 && (
                <div className="space-y-4">
                  <h3 className="px-6 text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/20">Fontes citadas</h3>
                  {searchResults.map((result) => (
                    <div key={result.id} className="group bg-white hover:bg-castanha-50 border border-castanha-200 rounded-[2rem] p-8 transition-all duration-300 shadow-sm hover:shadow-xl cursor-pointer">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-castanha-600 mb-2 block">{result.type} • {result.year}</span>
                          <h4 className="text-xl font-medium text-ink group-hover:text-ink transition-colors tracking-tight">{result.title}</h4>
                        </div>
                        <div className="px-3 py-1.5 rounded-full bg-foreground/5 text-[10px] font-bold text-foreground/40 border border-foreground/5">
                          {Math.round(result.relevance * 100)}% de relevância
                        </div>
                      </div>
                      <p className="text-[1rem] text-castanha-600 leading-relaxed line-clamp-2 font-medium">
                        {result.summary}
                      </p>
                      <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink">Ver análise</span>
                        <svg className="w-3 h-3 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar Column */}
            <div className="space-y-8">
              {followUpPrompts.length > 0 && (
                <div className="bg-castanha-50 rounded-[2.5rem] p-8 border border-castanha-200">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/30 mb-8 font-sans">Aprofundamento estratégico</h3>
                  <div className="space-y-3">
                    {followUpPrompts.map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => handleFollowUpClick(prompt)}
                        className="w-full text-left px-6 py-5 bg-white border border-castanha-200 rounded-2xl transition-all duration-300 shadow-sm text-[0.95rem] group hover:btn-primary-gradient"
                        disabled={isSearching}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium opacity-80 group-hover:opacity-100 transition-opacity leading-tight">{prompt}</span>
                          <svg className="w-4 h-4 opacity-10 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
 
              <div className="bg-hero-gradient text-ink rounded-[2.5rem] p-10 shadow-2xl overflow-hidden relative border border-cerrado-900/5">
                <div className="absolute top-0 right-0 w-48 h-48 bg-cerrado-950/5 rounded-full -mr-24 -mt-24 blur-3xl" />
                <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-ink/30 mb-8 relative z-10">Agente de inteligência</h3>
                <p className="text-[1rem] font-medium text-ink/60 leading-relaxed mb-10 relative z-10">
                  Transforme esta pesquisa jurídica em uma minuta profissional ou solicite uma análise pericial mais aprofundada.
                </p>
                <div className="space-y-4 relative z-10">
                  <button 
                    onClick={handleDraftDocument}
                    disabled={!enhancedQuery}
                    className="w-full py-5 rounded-2xl font-bold text-[11px] uppercase tracking-[0.3em] shadow-[0_10px_30px_rgba(255,255,255,0.1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed btn-primary-gradient"
                  >
                    Redigir contrato
                  </button>
                  <button 
                    className="w-full py-5 bg-cerrado-950/5 hover:bg-cerrado-950/10 text-ink border border-cerrado-900/10 rounded-2xl font-bold text-[11px] uppercase tracking-[0.3em] transition-all" 
                    onClick={() => router.push('/dashboard/chat')}
                  >
                    Consultar assistente
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </DashboardLayout>
  );
}