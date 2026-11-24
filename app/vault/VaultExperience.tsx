'use client';

import { useState } from 'react';
import FadeInSection from '../components/landingpage/FadeInSection';
import { ClosingCta, FeatureList, ProductHero } from '../components/landingpage/ProductBlocks';

const tabs = [
  { id: 'all' as const, label: 'Todos' },
  { id: 'contract' as const, label: 'Contratos' },
  { id: 'court' as const, label: 'Judicial' },
  { id: 'corporate' as const, label: 'Societário' },
];

export default function VaultExperience() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]['id']>('all');

  const documents = [
    { id: 1, name: 'Contrato de Locação Assinado.pdf', type: 'contract', size: '245 KB', lastModified: '2024-02-20', status: 'e-sign valid' },
    { id: 2, name: 'Contrato de Cessão de PI.docx', type: 'contract', size: '188 KB', lastModified: '2024-02-18', status: 'verified' },
    { id: 3, name: 'Acordo de Confidencialidade.pdf', type: 'contract', size: '167 KB', lastModified: '2023-10-28', status: 'pending' },
    { id: 4, name: 'Contrato de Arrendamento de Imóvel.pdf', type: 'contract', size: '312 KB', lastModified: '2023-10-15', status: 'verified' },
    { id: 5, name: 'Johnson vs. Smith - Petição.pdf', type: 'court', size: '1.2 MB', lastModified: '2023-11-08', status: 'verified' },
    { id: 6, name: 'Laudo do Perito.docx', type: 'court', size: '290 KB', lastModified: '2023-11-01', status: 'pending' },
    { id: 7, name: 'Estatuto Social.pdf', type: 'corporate', size: '420 KB', lastModified: '2023-09-22', status: 'verified' },
    { id: 8, name: 'Ata de Reunião do Conselho - 3º Tri.pdf', type: 'corporate', size: '156 KB', lastModified: '2023-10-05', status: 'verified' },
  ];

  const filteredDocuments = documents
    .filter((doc) => activeTab === 'all' || doc.type === activeTab)
    .filter(
      (doc) =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const features = [
    {
      title: 'Armazenamento seguro',
      description: 'Arquivos na nuvem da AWS, visíveis só para a conta de cada cliente.',
      icon: (
        <svg className="w-7 h-7 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
    },
    {
      title: 'Análise com IA',
      description: 'Riscos, termos-chave e resumo de cada contrato em segundos.',
      icon: (
        <svg className="w-7 h-7 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
    },
    {
      title: 'Integração com os fluxos',
      description: 'Os fluxos salvam documentos direto nas pastas do cofre.',
      icon: (
        <svg className="w-7 h-7 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      ),
    },
    {
      title: 'Organização por pastas',
      description: 'Pastas por assunto e busca para achar qualquer arquivo.',
      icon: (
        <svg className="w-7 h-7 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
  ];

  const securityPoints = [
    { title: 'Conexão criptografada', desc: 'Os dados trafegam por HTTPS.' },
    { title: 'Pastas com senha', desc: 'Proteja pastas sensíveis com uma senha própria.' },
    { title: 'Acesso restrito', desc: 'Cada pessoa vê apenas os próprios arquivos.' },
    { title: 'Armazenamento na AWS', desc: 'Os arquivos ficam guardados no Amazon S3.' },
  ];

  return (
    <>
      <ProductHero
        eyebrow="Cofre de documentos"
        title="O cofre do escritório e dos clientes"
        text="Cada cliente guarda, encontra e revisa com IA os documentos do caso, em pastas com senha e com a marca do escritório."
        primary={{ label: 'Solicitar acesso', href: '/contact' }}
        secondary={{ label: 'Ver o cofre em ação', href: '#explorer' }}
        image="/landingpage/intro/valut-img.png"
        imageAlt="Tela do Cofre do Pequi"
      />

      <FeatureList
        title="Feito para documentos sensíveis"
        text="Contratos, processos e documentos pessoais em um só lugar, com controle de acesso e análise por IA."
        items={features.map((f) => ({ title: f.title, text: f.description }))}
      />

      <FadeInSection delay={0.1}>
        <section id="explorer" className="scroll-mt-20 py-20 lg:py-28">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 md:mb-12">
              <div className="text-center lg:text-left">
                <h2 className="text-[clamp(2.1rem,4.4vw,3.6rem)] font-medium leading-[1.04] tracking-[-0.035em] text-ink">
                  Veja o cofre em ação
                </h2>
                <p className="mt-4 max-w-[30rem] text-[1.02rem] leading-relaxed text-ink/65">
                  Filtre e pesquise como os seus clientes fazem no cofre real.
                </p>
              </div>
              <div className="flex flex-wrap justify-center lg:justify-end gap-2 md:gap-3">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex h-10 items-center rounded-full px-5 text-[0.9rem] transition-colors ${
                      activeTab === tab.id ? 'bg-ink text-white' : 'bg-[#F4EFDF] text-ink/70 hover:text-ink'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="landing-surface overflow-hidden transition-shadow duration-300">
              <div className="bg-white p-5 md:p-6 border-b border-castanha-200 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
                <div className="relative w-full md:max-w-md">
                  <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-castanha-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="search"
                    placeholder="Pesquisar no cofre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-xl border border-castanha-200 bg-castanha-100 py-3.5 pl-12 pr-4 text-[0.9375rem] text-ink placeholder:text-castanha-600 transition-all focus:border-castanha-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pequi-500/32"
                  />
                </div>
                <button
                  type="button"
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-cerrado-800 px-6 py-3.5 text-[0.9375rem] font-medium text-white transition-all duration-300 hover:brightness-110"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Enviar arquivo
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[640px]">
                  <thead>
                    <tr className="border-b border-castanha-200 bg-castanha-100/75">
                      <th className="px-5 md:px-8 py-4 text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-castanha-600">
                        Nome
                      </th>
                      <th className="px-5 md:px-8 py-4 text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-castanha-600">
                        Tipo
                      </th>
                      <th className="px-5 md:px-8 py-4 text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-castanha-600">
                        Modificado em
                      </th>
                      <th className="px-5 md:px-8 py-4 text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-castanha-600">
                        Status
                      </th>
                      <th className="px-5 md:px-8 py-4" aria-hidden />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-castanha-150">
                    {filteredDocuments.map((doc) => (
                      <tr key={doc.id} className="group transition-colors hover:bg-castanha-25">
                        <td className="px-5 md:px-8 py-4 md:py-5">
                          <div className="flex items-center gap-3 md:gap-4">
                            <div className="w-10 h-10 shrink-0 rounded-xl border border-castanha-200 bg-castanha-100 flex items-center justify-center transition-colors group-hover:bg-white">
                              <svg className="w-5 h-5 text-castanha-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                            </div>
                            <div className="min-w-0">
                              <p className="truncate text-[0.9375rem] font-medium text-ink">{doc.name}</p>
                              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-castanha-600">{doc.size}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 md:px-8 py-4 md:py-5">
                          <span className="inline-block rounded-md border border-castanha-200 bg-castanha-100 px-2.5 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-castanha-600">
                            {({ contract: 'Contrato', court: 'Judicial', corporate: 'Societário' } as Record<string, string>)[doc.type] ?? doc.type}
                          </span>
                        </td>
                        <td className="px-5 md:px-8 py-4 md:py-5">
                          <p className="text-[0.875rem] text-castanha-600">{doc.lastModified}</p>
                        </td>
                        <td className="px-5 md:px-8 py-4 md:py-5">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full shrink-0 ${
                                doc.status === 'verified' || doc.status === 'e-sign valid' ? 'bg-cerrado-500' : 'bg-pequi-500'
                              }`}
                            />
                            <span className="text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-castanha-600">
                              {({ 'e-sign valid': 'assinatura válida', verified: 'verificado', pending: 'pendente' } as Record<string, string>)[doc.status] ?? doc.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 md:px-8 py-4 md:py-5 text-right">
                          <button
                            type="button"
                            className="p-2 rounded-lg border border-transparent opacity-0 transition-all hover:border-castanha-200 hover:bg-white group-hover:opacity-100"
                            aria-label="Mais ações"
                          >
                            <svg className="w-4 h-4 text-castanha-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col items-center justify-between gap-4 border-t border-castanha-200 bg-castanha-100/55 p-5 md:p-6 sm:flex-row">
                <p className="text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-castanha-600">
                  Exibindo {filteredDocuments.length} arquivos
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="rounded-lg border border-castanha-200 bg-white px-4 py-2.5 text-[0.8125rem] font-medium text-ink transition-colors hover:bg-castanha-25"
                  >
                    Anterior
                  </button>
                  <button
                    type="button"
                    className="rounded-lg border border-castanha-200 bg-white px-4 py-2.5 text-[0.8125rem] font-medium text-ink transition-colors hover:bg-castanha-25"
                  >
                    Próxima
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FeatureList
        tone="sand"
        title="Segurança de ponta a ponta"
        text="Confidencialidade, disponibilidade e registro de cada acesso, para o escritório e para os clientes."
        items={securityPoints.map((p) => ({ title: p.title, text: p.desc }))}
      />

      <ClosingCta
        title="Leve o cofre para o seu escritório"
        text="Pastas com senha, análise por IA e integração com os fluxos, com a sua marca."
        action={{ label: 'Falar com a equipe', href: '/contact' }}
      />
    </>
  );
}
