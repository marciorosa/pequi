'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { aiService } from '../services/api';
import DashboardLayout from '../components/DashboardLayout';
import UpgradeModal from '../components/UpgradeModal';
import LimpaNomeModal, { LimpaNomeFormData } from '../components/LimpaNomeModal';

// Add custom CSS styles for the enhanced query display
import './enhanced-query.css';

const SEARCH_ERROR_MESSAGE = 'Não foi possível concluir a pesquisa. Tente novamente em instantes; esta tentativa não consumiu sua cota.';

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [enhancedQuery, setEnhancedQuery] = useState<string | null>(null);
  const [followUpPrompts, setFollowUpPrompts] = useState<string[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchSuggestions] = useState<string[]>([
    "Direitos do consumidor em compras pela internet (CDC)",
    "Verbas da rescisão do contrato de trabalho (CLT)",
    "Plano de saúde negou cobertura: o que diz a lei",
    "Como a LGPD protege meus dados pessoais",
    "Direitos do inquilino no fim do aluguel"
  ]);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  // Serviço Limpa Nome: o resultado aparece no mesmo lugar da resposta da pesquisa
  const [showLimpaNome, setShowLimpaNome] = useState(false);
  const [isGeneratingLimpaNome, setIsGeneratingLimpaNome] = useState(false);
  const [resultKind, setResultKind] = useState<'pesquisa' | 'limpa-nome'>('pesquisa');
  const router = useRouter();

  const handleLimpaNome = async (data: LimpaNomeFormData) => {
    setIsGeneratingLimpaNome(true);
    try {
      const response = await aiService.createLimpaNome(data);
      setResultKind('limpa-nome');
      setEnhancedQuery(response.content);
      setFollowUpPrompts([]);
      setSearchError(null);
      setHasSearched(true);
      setShowLimpaNome(false);
    } catch (error: any) {
      console.error('Error generating Limpa Nome:', error);
      const status = error.response?.status || error.status;
      setShowLimpaNome(false);
      if (status === 403) {
        setShowUpgradeModal(true);
      } else {
        setResultKind('limpa-nome');
        setEnhancedQuery(null);
        setHasSearched(true);
        setSearchError('Não foi possível gerar a petição. Tente novamente em instantes; esta tentativa não consumiu sua cota.');
      }
    } finally {
      setIsGeneratingLimpaNome(false);
    }
  };

  const handleSearch = async (e: React.FormEvent | null, customQuery?: string) => {
    if (e) e.preventDefault();

    const queryToSearch = customQuery || searchQuery;
    if (!queryToSearch.trim() || isSearching) return;

    setIsSearching(true);
    setHasSearched(true);
    setResultKind('pesquisa');
    setSearchError(null);
    setEnhancedQuery(null);
    setFollowUpPrompts([]);

    try {
      const response = await aiService.searchLegalDatabase(queryToSearch);

      if (response.success) {
        setEnhancedQuery(response.enhancedQuery);
        setFollowUpPrompts(response.followUpPrompts || []);

        if (customQuery) {
          setSearchQuery(customQuery);
        }
      } else {
        setSearchError(SEARCH_ERROR_MESSAGE);
      }
    } catch (error: any) {
      console.error('Error searching:', error);
      const status = error.response?.status || error.status;
      if (status === 403) {
        setShowUpgradeModal(true);
      } else {
        setSearchError(status === 422 ? error.response.data.message : SEARCH_ERROR_MESSAGE);
      }
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
    fileDownload.download = resultKind === 'limpa-nome' ? 'Pequi_Limpa_Nome.doc' : 'Pequi_Minuta.doc';
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
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink/40 text-nowrap">Pesquisa com IA</span>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-medium tracking-tight leading-tight text-ink">
                  Pesquisa <span className="font-light opacity-60 italic">jurídica com IA</span>
                </h2>
                <p className="text-lg text-ink/60 font-medium leading-relaxed max-w-sm">
                  Tire dúvidas sobre as leis brasileiras em linguagem simples. A pesquisa não consulta processos nem bases de jurisprudência.
                </p>
              </div>
            </div>

            <div className="relative z-10 pt-12">
              <div className="p-5 rounded-2xl bg-white/60 border border-castanha-200 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink/40">Importante</span>
                <p className="text-sm font-medium text-ink/70 leading-relaxed">
                  As respostas são geradas por inteligência artificial e têm caráter apenas informativo. O Pequi não é um escritório de advocacia e não presta consultoria jurídica. Para avaliar o seu caso, procure um advogado inscrito na OAB ou a Defensoria Pública.
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel: Search Operating Interface */}
          <div className="lg:w-1/2 p-12 md:p-20 flex flex-col justify-center bg-white">
            <div className="max-w-md w-full mx-auto space-y-10">
              <div className="space-y-2">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/20">Pesquisa</h3>
                <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-ink">Qual é a sua dúvida?</h2>
              </div>

              <form onSubmit={handleSearch} className="relative group">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-ink/20 transition-colors group-focus-within:text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Cláusula, direito ou dúvida jurídica..."
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

              <button
                type="button"
                onClick={() => setShowLimpaNome(true)}
                className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-pequi-500/30 bg-pequi-500/5 px-5 py-4 text-left transition-all duration-300 hover:border-pequi-500/60 hover:bg-pequi-500/10"
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-pequi-600">Serviço</p>
                  <p className="mt-1 text-lg font-medium text-ink">Limpa Nome</p>
                  <p className="text-sm text-ink/60">Nome negativado por dívida que não é sua? Gere a petição com pedido de liminar.</p>
                </div>
                <svg className="h-5 w-5 shrink-0 text-pequi-600 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

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
              {searchError && (
                <div role="alert" className="bg-red-50 border border-red-100 text-red-600 rounded-2xl p-6 font-medium">
                  {searchError}
                </div>
              )}

              {enhancedQuery && (
                <div className="bg-white border border-castanha-200 rounded-[2.5rem] p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-10 h-10 rounded-xl bg-cerrado-900 flex items-center justify-center shadow-lg shadow-black/10">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/30">
                        {resultKind === 'limpa-nome' ? 'Limpa Nome · minuta de petição' : 'Resposta da IA'}
                      </h3>
                      <p className="text-xs font-medium text-foreground/60 mt-0.5">
                        {resultKind === 'limpa-nome'
                          ? 'Gerada por inteligência artificial · revise e complete os campos [PREENCHER] com um advogado'
                          : 'Gerada por inteligência artificial · conteúdo informativo'}
                      </p>
                    </div>
                  </div>
                  <div
                    className="legal-search-result prose prose-gray max-w-none text-castanha-800 leading-relaxed font-medium text-[1.1rem]"
                    dangerouslySetInnerHTML={{ __html: enhancedQuery }}
                  />
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
                    {resultKind === 'limpa-nome' ? 'Baixar petição (Word)' : 'Redigir contrato'}
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
      <LimpaNomeModal
        isOpen={showLimpaNome}
        isGenerating={isGeneratingLimpaNome}
        onClose={() => setShowLimpaNome(false)}
        onSubmit={handleLimpaNome}
      />
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </DashboardLayout>
  );
}