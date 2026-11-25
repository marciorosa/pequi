'use client';

import { useBrand } from '../../contexts/TenantContext';
import { useState } from 'react';
import Link from 'next/link';
import DashboardLayout from '../../components/DashboardLayout';

// FAQ item interface
interface FAQItem {
  question: string;
  answer: string;
}

export default function HelpPage() {
  const brand = useBrand();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  // Sample FAQs
  const faqs: FAQItem[] = [
    {
      question: `Como começo a usar ${brand.tenant ? "a assistente" : "o Pequi"}?`,
      answer: "Para começar, basta entrar na sua conta e acessar o painel. Lá você encontra nossos assistentes de chat com IA, ferramentas de documentos e outros recursos. Recomendamos começar com uma pergunta simples no chat para se familiarizar com a forma como nossa IA responde."
    },
    {
      question: "Que tipos de documentos jurídicos posso criar?",
      answer: `${brand.subject} pode ajudar você a criar diversos documentos jurídicos, incluindo contratos, acordos, contratos de locação, testamentos e muito mais. Acesse a seção Documentos no seu painel para conhecer todas as opções de criação e os modelos disponíveis.`
    },
    {
      question: "Qual é a precisão das informações jurídicas fornecidas?",
      answer: "Embora nossa IA seja treinada com amplo conhecimento jurídico, é importante lembrar que as informações fornecidas não devem ser consideradas aconselhamento jurídico formal. Recomendamos que documentos jurídicos importantes sejam revisados por um advogado qualificado antes de serem finalizados."
    },
    {
      question: "Posso falar com um advogado de verdade pela plataforma?",
      answer: `Não. ${brand.subject} é uma ferramenta de inteligência artificial com conteúdo informativo e não presta serviços de advocacia, nem indica advogados ou escritórios. Se o seu caso precisar de um profissional, procure um advogado de sua confiança inscrito na OAB, a Defensoria Pública ou o serviço de assistência jurídica da OAB do seu estado.`
    },
    {
      question: "Como faço upgrade da minha assinatura?",
      answer: "Para fazer upgrade da sua assinatura, acesse a seção Plano no seu painel. Lá você encontra informações sobre nossos planos e a opção de fazer upgrade para o Pro, com recursos e funcionalidades adicionais."
    },
    {
      question: "Meus dados estão seguros e são confidenciais?",
      answer: "Sim, levamos a segurança e a confidencialidade dos dados muito a sério. As comunicações com a plataforma usam conexão criptografada (HTTPS), e o tratamento dos seus dados segue a nossa Política de Privacidade. Não compartilhamos suas informações com terceiros sem o seu consentimento expresso."
    },
    {
      question: "Como baixo ou exporto meus documentos?",
      answer: "Na seção Documentos, você encontra todos os documentos que criou. Cada documento tem uma opção de exportação que permite baixá-lo em vários formatos, incluindo PDF, DOCX e TXT, dependendo do tipo de documento."
    }
  ];

  // Filter FAQs based on search query
  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle FAQ expanded state
  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const arrow = (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
    </svg>
  );

  // Ajuda no padrão editorial (2026-11-24): título à esquerda, canais em faixas e
  // perguntas em lista com linhas que abre ao clicar.
  return (
    <DashboardLayout title="Ajuda e Suporte">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 border-b border-ink/12 pb-10 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ink/45">Ajuda e suporte</p>
            <h2 className="mt-4 text-[clamp(2.2rem,4.4vw,3.6rem)] font-medium leading-[1.04] tracking-[-0.035em] text-ink">Como podemos ajudar?</h2>
          </div>
          <p className="max-w-[460px] text-[1.02rem] leading-relaxed text-ink/65 lg:justify-self-end">
            Consulte as dúvidas frequentes ou fale com a nossa equipe. Respondemos em até 24 horas úteis.
          </p>
        </div>

        <div className="mt-10 grid gap-2 md:grid-cols-2">
          <Link href="/dashboard/help/chat" className="group flex items-center gap-4 rounded-2xl bg-[#F1EDE0] px-5 py-5 text-ink transition-colors hover:bg-[#E9E3D2]">
            <span className="w-4 text-[0.85rem] tabular-nums text-ink/40">1</span>
            <span className="flex-1">
              <span className="block text-[1.05rem] font-medium">Assistente ao vivo</span>
              <span className="mt-0.5 block text-[0.88rem] text-ink/55">Respostas automáticas para dúvidas comuns sobre a plataforma.</span>
            </span>
            <span className="text-ink/40">{arrow}</span>
          </Link>
          <Link href="/dashboard/help/email" className="group flex items-center gap-4 rounded-2xl bg-[#F1EDE0] px-5 py-5 text-ink transition-colors hover:bg-[#E9E3D2]">
            <span className="w-4 text-[0.85rem] tabular-nums text-ink/40">2</span>
            <span className="flex-1">
              <span className="block text-[1.05rem] font-medium">Dúvidas por e-mail</span>
              <span className="mt-0.5 block text-[0.88rem] text-ink/55">Escreva para a equipe; respondemos em até 24 horas úteis.</span>
            </span>
            <span className="text-ink/40">{arrow}</span>
          </Link>
        </div>

        <section className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <div>
            <h3 className="text-[clamp(1.6rem,2.6vw,2.2rem)] font-medium tracking-[-0.03em] text-ink">Perguntas frequentes</h3>
            <label className="mt-6 flex items-center gap-2 rounded-2xl bg-[#FFFDF6] px-4 ring-1 ring-ink/10 focus-within:ring-ink/30">
              <svg className="h-5 w-5 flex-shrink-0 text-ink/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Buscar nas perguntas..."
                aria-label="Buscar nas perguntas"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 min-w-0 flex-1 border-0 bg-transparent px-1 text-[1rem] text-ink placeholder:text-ink/40 focus:outline-none focus:ring-0"
              />
            </label>
          </div>

          <div className="border-t border-ink/20">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => (
                <div key={index} className="border-b border-ink/20">
                  <button
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={expandedFAQ === index}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left text-[1.05rem] font-medium text-ink focus:outline-none"
                  >
                    {faq.question}
                    <span className="relative h-4 w-4 shrink-0 text-ink/60" aria-hidden="true">
                      <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
                      <span className={`absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current transition-transform ${expandedFAQ === index ? 'rotate-90 opacity-0' : ''}`} />
                    </span>
                  </button>
                  {expandedFAQ === index && <p className="max-w-[640px] pb-5 text-[0.95rem] leading-relaxed text-ink/65">{faq.answer}</p>}
                </div>
              ))
            ) : (
              <div className="py-8">
                <p className="text-[1.05rem] font-medium text-ink">Nenhum resultado para &quot;{searchQuery}&quot;</p>
                <button onClick={() => setSearchQuery('')} className="mt-3 text-[0.92rem] font-medium text-ink underline underline-offset-4">
                  Limpar a busca
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="mt-14 grid gap-6 rounded-3xl bg-[#151816] p-8 text-white sm:p-10 lg:grid-cols-2 lg:items-end">
          <h3 className="text-[clamp(1.8rem,3.2vw,2.6rem)] font-medium leading-[1.05] tracking-[-0.03em]">Fale com a nossa equipe</h3>
          <div className="lg:justify-self-end">
            <p className="max-w-[420px] text-[0.98rem] leading-relaxed text-white/65">Respondemos em até 24 horas úteis, de segunda a sexta-feira (horário de Brasília).</p>
            <Link href="/dashboard/help/contact" className="mt-5 inline-flex h-11 items-center gap-2 rounded-xl bg-[#FFFDF6] px-5 text-[0.92rem] font-medium text-ink hover:bg-white">
              Enviar solicitação {arrow}
            </Link>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
