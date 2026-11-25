'use client';

import { useBrand } from '../contexts/TenantContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { aiService } from '../services/api';
import DashboardLayout from '../components/DashboardLayout';
import UpgradeModal from '../components/UpgradeModal';

// Add custom CSS styles for the enhanced query display
import './enhanced-query.css';

const SEARCH_ERROR_MESSAGE = 'Não foi possível concluir a pesquisa. Tente novamente em instantes; esta tentativa não consumiu sua cota.';

export default function DashboardPage() {
  const brand = useBrand();
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
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent | null, customQuery?: string) => {
    if (e) e.preventDefault();

    const queryToSearch = customQuery || searchQuery;
    if (!queryToSearch.trim() || isSearching) return;

    setIsSearching(true);
    setHasSearched(true);
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
    fileDownload.download = `${brand.name.replace(/[^A-Za-z0-9]+/g, '_')}_Minuta.doc`;
    fileDownload.click();
    document.body.removeChild(fileDownload);
  };

  // Visual no padrão editorial do painel (2026-11-24): título à esquerda e texto à
  // direita, busca na moldura areia, sugestões em faixas numeradas e resposta em
  // cartão claro com etiqueta, como no chat.
  const arrow = (
    <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
    </svg>
  );

  return (
    <DashboardLayout title="Pesquisa Inteligente">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 border-b border-ink/12 pb-10 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ink/45">Pesquisa com IA</p>
            <h2 className="mt-4 text-[clamp(2.2rem,4.4vw,3.6rem)] font-medium leading-[1.04] tracking-[-0.035em] text-ink">Qual é a sua dúvida jurídica?</h2>
          </div>
          <p className="max-w-[460px] text-[1.02rem] leading-relaxed text-ink/65 lg:justify-self-end">
            Explicações sobre as leis brasileiras em linguagem simples. A pesquisa não consulta processos nem bases de jurisprudência.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-ink/10 bg-[#F1EDE0] p-3 sm:p-4">
          <form onSubmit={handleSearch} className="flex items-center gap-2 rounded-2xl bg-[#FFFDF6] p-2 ring-1 ring-ink/10 focus-within:ring-ink/30">
            <svg className="ml-3 h-5 w-5 flex-shrink-0 text-ink/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Cláusula, direito ou dúvida jurídica..."
              aria-label="Sua dúvida jurídica"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 min-w-0 flex-1 border-0 bg-transparent px-1 text-[1rem] text-ink placeholder:text-ink/40 focus:outline-none focus:ring-0"
            />
            <button
              type="submit"
              disabled={isSearching || !searchQuery.trim()}
              aria-label="Pesquisar"
              className="flex h-11 flex-shrink-0 items-center gap-2 rounded-xl bg-[#151816] px-4 text-[0.92rem] font-medium text-white transition-opacity disabled:opacity-30"
            >
              {isSearching ? (
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <>
                  <span className="hidden sm:inline">Pesquisar</span>
                  {arrow}
                </>
              )}
            </button>
          </form>

          {!hasSearched && (
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {searchSuggestions.slice(0, 4).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="flex items-center gap-4 rounded-2xl bg-[#FFFDF6]/70 px-5 py-4 text-left text-ink transition-colors hover:bg-[#FFFDF6]"
                >
                  <span className="w-4 flex-shrink-0 text-[0.85rem] tabular-nums text-ink/40">{index + 1}</span>
                  <span className="flex-1 text-[0.95rem] leading-snug">{suggestion}</span>
                  <span className="text-ink/35">{arrow}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <p className="mt-4 text-center text-[0.78rem] leading-relaxed text-ink/45">
          Respostas geradas por IA, com caráter informativo.{' '}
          {brand.tenant
            ? `${brand.subject} não presta consultoria jurídica; para o seu caso, fale com um advogado do escritório.`
            : 'O Pequi não presta consultoria jurídica; para o seu caso, procure um advogado inscrito na OAB ou a Defensoria Pública.'}
        </p>

        {hasSearched && (
          <div className="mt-10 grid grid-cols-1 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {searchError && (
                <div role="alert" className="rounded-2xl bg-red-50 px-5 py-4 text-[0.95rem] text-red-700 ring-1 ring-red-200">
                  {searchError}
                </div>
              )}

              {isSearching && !enhancedQuery && (
                <div className="rounded-3xl bg-[#FFFDF6] p-8 ring-1 ring-ink/8">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ink/45">Pesquisando</p>
                  <div className="mt-5 space-y-3">
                    {[92, 80, 86, 60].map((w) => (
                      <div key={w} className="h-2.5 animate-pulse rounded-full bg-ink/8" style={{ width: `${w}%` }} />
                    ))}
                  </div>
                </div>
              )}

              {enhancedQuery && (
                <article className="rounded-3xl bg-[#FFFDF6] p-6 ring-1 ring-ink/8 sm:p-8">
                  <p className="mb-5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ink/45">Resposta</p>
                  <div className="legal-search-result" dangerouslySetInnerHTML={{ __html: enhancedQuery }} />
                  <p className="mt-6 border-t border-ink/10 pt-4 text-[0.78rem] text-ink/45">Gerada por inteligência artificial · conteúdo informativo</p>
                </article>
              )}
            </div>

            <aside className="space-y-6">
              {followUpPrompts.length > 0 && (
                <div>
                  <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ink/45">Para aprofundar</p>
                  <div className="space-y-2">
                    {followUpPrompts.map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => handleFollowUpClick(prompt)}
                        disabled={isSearching}
                        className="flex w-full items-center gap-3 rounded-2xl bg-[#F1EDE0] px-4 py-3.5 text-left text-[0.92rem] leading-snug text-ink transition-colors hover:bg-[#E9E3D2] disabled:opacity-50"
                      >
                        <span className="flex-1">{prompt}</span>
                        <span className="text-ink/40">{arrow}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-3xl bg-[#151816] p-6 text-white">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/50">Próximos passos</p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-white/70">Leve esta resposta para um documento ou continue a conversa no chat.</p>
                <button
                  onClick={handleDraftDocument}
                  disabled={!enhancedQuery}
                  className="mt-5 flex h-11 w-full items-center justify-between rounded-xl bg-[#FFFDF6] px-4 text-[0.92rem] font-medium text-ink transition-colors hover:bg-white disabled:opacity-40"
                >
                  Baixar como documento (.doc)
                  {arrow}
                </button>
                <button
                  onClick={() => router.push('/dashboard/chat')}
                  className="mt-2 flex h-11 w-full items-center justify-between rounded-xl px-4 text-[0.92rem] font-medium text-white ring-1 ring-white/20 transition-colors hover:bg-white/10"
                >
                  Continuar no chat
                  {arrow}
                </button>
              </div>
            </aside>
          </div>
        )}
      </div>
      <UpgradeModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
    </DashboardLayout>
  );
}
