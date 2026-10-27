'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FadeInSection from '../components/landingpage/FadeInSection';
import { sectionHeadingClass, sectionSubTextClass } from '../components/landingpage/sectionStyles';

const featureCardClass =
  'flex min-h-[240.8px] flex-col rounded-2xl border border-castanha-150 bg-castanha-100/85 px-5 py-5 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(31,42,23,0.06)]';

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
      title: 'Armazenamento seguro de documentos',
      description: 'Criptografia e controles de acesso garantem que arquivos jurídicos sensíveis fiquem disponíveis apenas para usuários autorizados.',
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
      description: 'Identifique riscos, termos-chave e resumos em grandes volumes de documentos dos casos.',
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
      title: 'Fluxos de assinatura eletrônica',
      description: 'Leve automaticamente os contratos assinados para as pastas certas do cofre a partir dos seus fluxos de assinatura.',
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
      title: 'Colaboração e permissões',
      description: 'Compartilhe com equipes e clientes usando funções granulares, sem perder a rastreabilidade.',
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
    { title: 'Criptografia AES-256', desc: 'Dados protegidos em repouso e em trânsito.' },
    { title: 'SOC 2 Tipo II', desc: 'Práticas de segurança de nível corporativo.' },
    { title: 'Alinhado à GDPR/LGPD', desc: 'Controles criados para as exigências globais de privacidade.' },
    { title: 'Acesso baseado em funções', desc: 'Gestão detalhada de permissões.' },
  ];

  return (
    <>
      <FadeInSection>
        <section
          id="hero"
          className="relative -mt-20 overflow-hidden px-4 pb-12 pt-[12rem] sm:px-6 sm:pt-[13rem] lg:px-8 lg:pb-16 lg:pt-[12rem] scroll-mt-24 md:scroll-mt-28"
        >
          <Image
            src="/landingpage/hero/hero-bgimg.png"
            alt="Imagem de fundo"
            fill
            priority
            className="object-cover object-top"
          />
          <div className="relative z-10 mx-auto w-full max-w-[1274px]">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.02fr] lg:gap-14">
              <div className="text-left">
                <p className="text-[0.94444rem] font-normal leading-[1.41663rem] text-castanha-600">Inteligência segura</p>
                <h1 className="mt-5 max-w-[700px] font-medium leading-[1.08] tracking-[-0.08rem] text-ink text-[2.7rem] sm:text-[3.25rem] sm:leading-[1.08] sm:tracking-[-0.12rem]">
                  Cofre Pequi
                </h1>
                <p className="mt-4 max-w-[620px] text-[1rem] font-normal leading-[1.5rem] text-castanha-600">
                  Armazenamento e gestão inteligentes de documentos jurídicos, com IA que ajuda você a encontrar, revisar e controlar
                  o que importa.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/contact"
                    className="landing-primary-btn inline-flex h-11 items-center justify-center px-6 transition hover:brightness-110"
                  >
                    Solicitar acesso
                  </Link>
                  <button
                    type="button"
                    onClick={() => document.getElementById('explorer')?.scrollIntoView({ behavior: 'smooth' })}
                    className="landing-secondary-btn inline-flex h-[2.83331rem] min-w-[10.81025rem] items-center justify-center px-6 transition hover:bg-castanha-150"
                  >
                    Demonstração do explorador
                  </button>
                </div>
              </div>

              <div className="relative min-h-[280px] sm:min-h-[340px] lg:min-h-[380px]">
                <div className="flex h-full min-h-[inherit] flex-col rounded-2xl border border-castanha-150 p-5 sm:p-6">
                  <div className="relative min-h-[220px] flex-1 sm:min-h-[280px] lg:min-h-[300px]">
                    <Image
                      src="/landingpage/features/secure-document-vault.png"
                      alt="Prévia do cofre seguro de documentos"
                      fill
                      className="object-contain object-center"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.08}>
        <section className="bg-white py-16 lg:py-[5.5rem] scroll-mt-24 md:scroll-mt-28">
          <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
            <h2 className={sectionHeadingClass}>Feito para o trabalho jurídico sensível</h2>
            <p className={`${sectionSubTextClass} mt-4 mb-10 md:mb-12`}>
              Um único cofre para contratos, processos e registros societários, com os controles e a inteligência que as equipes modernas
              esperam.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {features.map((feature) => (
                <div key={feature.title} className={featureCardClass}>
                  <div className="inline-flex w-full items-center justify-start">
                    {feature.icon}
                  </div>
                  <div className="mt-auto pt-6">
                    <h3 className="text-[1.125rem] font-medium leading-[1.575rem] text-castanha-800">{feature.title}</h3>
                    <p className="mt-2 text-[1rem] font-normal leading-[1.4rem] text-castanha-800">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <section id="explorer" className="bg-white pb-16 lg:pb-[5.5rem] scroll-mt-24 md:scroll-mt-28">
          <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 md:mb-12">
              <div className="text-center lg:text-left">
                <h2 className="text-ink text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-medium leading-[1.1]">
                  Explorador interativo do cofre
                </h2>
                <p className="mt-4 text-castanha-600 text-[1rem] md:text-[1.125rem] max-w-[36rem] mx-auto lg:mx-0 leading-[160%]">
                  Filtre por tipo de caso e pesquise na biblioteca de demonstração, do mesmo jeito que as equipes navegam em um cofre real.
                </p>
              </div>
              <div className="flex flex-wrap justify-center lg:justify-end gap-2 md:gap-3">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex h-11 md:h-[3.4375rem] justify-center items-center rounded-[0.625rem] text-[0.875rem] md:text-[1rem] leading-none transition-colors px-4 md:px-[1.625rem] ${
                      activeTab === tab.id
                        ? 'border border-cerrado-800 bg-cerrado-800 text-white shadow-[0_6px_16px_rgba(31,42,23,0.12)]'
                        : 'bg-castanha-100 text-castanha-600 border border-castanha-200 hover:bg-castanha-150 hover:text-ink'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="landing-surface overflow-hidden shadow-[0_24px_64px_rgba(31,42,23,0.06),0_48px_100px_rgba(31,42,23,0.04)] transition-shadow duration-300 hover:shadow-[0_28px_72px_rgba(31,42,23,0.08)]">
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
                    className="w-full rounded-[0.875rem] border border-castanha-200 bg-castanha-100 py-3.5 pl-12 pr-4 text-[0.9375rem] text-ink placeholder:text-castanha-600 transition-all focus:border-castanha-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pequi-500/32"
                  />
                </div>
                <button
                  type="button"
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-[0.875rem] bg-cerrado-800 px-6 py-3.5 text-[0.9375rem] font-medium text-white transition-all duration-300 hover:brightness-110 hover:shadow-[0_10px_24px_rgba(31,42,23,0.15)]"
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
                    className="rounded-[0.625rem] border border-castanha-200 bg-white px-4 py-2.5 text-[0.8125rem] font-medium text-ink transition-colors hover:bg-castanha-25"
                  >
                    Anterior
                  </button>
                  <button
                    type="button"
                    className="rounded-[0.625rem] border border-castanha-200 bg-white px-4 py-2.5 text-[0.8125rem] font-medium text-ink transition-colors hover:bg-castanha-25"
                  >
                    Próxima
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.12}>
        <section className="bg-white pb-16 lg:pb-[7rem]">
          <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <p className="mb-3 text-[0.94444rem] font-normal leading-[1.41663rem] text-castanha-600">Arquitetura</p>
                <h2 className="text-ink text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-medium leading-[1.1]">
                  Nuvem jurídica reforçada
                </h2>
                <p className="mt-5 max-w-[39.1975rem] text-[1rem] font-normal leading-[160%] text-castanha-600 md:text-[1.125rem] lg:text-[1.25rem]">
                  Documentos jurídicos exigem mais do que um armazenamento genérico de arquivos. O cofre foi criado para garantir confidencialidade,
                  disponibilidade e auditabilidade em escala corporativa.
                </p>
                <div className="mt-10 grid sm:grid-cols-2 gap-x-10 gap-y-8">
                  {securityPoints.map((point) => (
                    <div key={point.title}>
                      <h4 className="mb-1.5 text-[1rem] font-medium text-ink">{point.title}</h4>
                      <p className="text-[0.9375rem] leading-[160%] text-castanha-600">{point.desc}</p>
                    </div>
                  ))}
                </div>
                <Link
                  href="/security"
                  className="mt-10 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink transition-opacity hover:opacity-80"
                >
                  Ver visão geral de segurança
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="relative">
                <div className="overflow-hidden rounded-[1.875rem] border border-castanha-150 bg-white p-3 shadow-[0_24px_64px_rgba(31,42,23,0.06)] md:p-4">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-castanha-100">
                    <Image
                      src="/landingpage/one-legal-platform/vault.png"
                      alt="Acesso ao cofre na plataforma jurídica"
                      fill
                      className="object-contain p-4 md:p-6"
                      sizes="(max-width: 1024px) 100vw, 560px"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-2 hidden max-w-[200px] rounded-[1.25rem] bg-cerrado-800 p-5 text-white shadow-[0_20px_40px_rgba(31,42,23,0.2)] md:-bottom-5 md:-right-4 md:p-6 sm:block">
                  <svg className="w-7 h-7 mb-3 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.25}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <p className="text-[0.6875rem] font-medium uppercase tracking-[0.12em] leading-snug">Criptografia de ponta a ponta</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
