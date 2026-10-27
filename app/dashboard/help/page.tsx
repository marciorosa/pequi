'use client';

import { useState } from 'react';
import Link from 'next/link';
import DashboardLayout from '../../components/DashboardLayout';

// FAQ item interface
interface FAQItem {
  question: string;
  answer: string;
}

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  // Sample FAQs
  const faqs: FAQItem[] = [
    {
      question: "Como começo a usar o Pequi?",
      answer: "Para começar, basta entrar na sua conta e acessar o painel. Lá você encontra nossos assistentes de chat com IA, ferramentas de documentos e outros recursos. Recomendamos começar com uma pergunta simples no chat para se familiarizar com a forma como nossa IA responde."
    },
    {
      question: "Que tipos de documentos jurídicos posso criar?",
      answer: "O Pequi pode ajudar você a criar diversos documentos jurídicos, incluindo contratos, acordos, contratos de locação, testamentos e muito mais. Acesse a seção Documentos no seu painel para conhecer todas as opções de criação e os modelos disponíveis."
    },
    {
      question: "Qual é a precisão das informações jurídicas fornecidas?",
      answer: "Embora nossa IA seja treinada com amplo conhecimento jurídico, é importante lembrar que as informações fornecidas não devem ser consideradas aconselhamento jurídico formal. Recomendamos que documentos jurídicos importantes sejam revisados por um advogado qualificado antes de serem finalizados."
    },
    {
      question: "Posso falar com um advogado de verdade pela plataforma?",
      answer: "Atualmente, o Pequi oferece assistência jurídica com IA. Para usuários Pro, indicamos escritórios parceiros nos casos que exigem atuação humana. Estamos trabalhando para ampliar nossa rede de profissionais do Direito para consultas diretas no futuro."
    },
    {
      question: "Como faço upgrade da minha assinatura?",
      answer: "Para fazer upgrade da sua assinatura, acesse a seção Assinatura no seu painel. Lá você encontra informações sobre nossos planos e a opção de fazer upgrade para o Pro, com recursos e funcionalidades adicionais."
    },
    {
      question: "Meus dados estão seguros e são confidenciais?",
      answer: "Sim, levamos a segurança e a confidencialidade dos dados muito a sério. Todas as comunicações e documentos são criptografados, e seguimos políticas de privacidade rigorosas. Não compartilhamos suas informações com terceiros sem o seu consentimento expresso."
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

  return (
    <DashboardLayout title="Ajuda e Suporte">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-20 text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cerrado-950/5 border border-cerrado-900/5 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-cerrado-950/40 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-ink/40">Base de conhecimento</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-ink mb-6">Como podemos ajudar?</h1>
          <p className="text-castanha-600 text-lg font-medium opacity-60">
            Consulte o arquivo neural ou fale com nossos especialistas de suporte jurídico.
          </p>
 
          {/* Search bar */}
          <div className="relative max-w-2xl mx-auto mt-12 group">
            <div className="absolute inset-0 bg-cerrado-950/5 rounded-3xl blur-2xl group-hover:bg-cerrado-950/10 transition-all duration-500" />
            <div className="relative">
              <input
                type="text"
                placeholder="Pesquise tópicos de ajuda, guias ou tutoriais..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white rounded-[2rem] border border-castanha-200 py-6 px-10 pl-16 text-ink text-lg focus:outline-none focus:ring-4 focus:ring-pequi-500/5 transition-all shadow-2xl placeholder:opacity-30 font-medium"
              />
              <div className="absolute inset-y-0 left-0 pl-7 flex items-center pointer-events-none">
                <svg className="w-6 h-6 text-castanha-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Help categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white rounded-[2.5rem] p-10 border border-castanha-200 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
              <svg width="150" height="150" viewBox="0 0 100 100">
                <pattern id="grid-help-1" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="black" strokeWidth="0.5" />
                </pattern>
                <rect width="100" height="100" fill="url(#grid-help-1)" />
              </svg>
            </div>
            <div className="mb-8 w-16 h-16 rounded-2xl bg-castanha-50 flex items-center justify-center border border-castanha-200 group-hover:bg-cerrado-900 group-hover:border-cerrado-900 transition-all duration-500 shadow-sm relative z-10">
              <svg className="w-8 h-8 text-ink group-hover:text-white transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-medium tracking-tight text-ink mb-4 relative z-10">Assistente ao vivo</h3>
            <p className="text-castanha-600 mb-10 leading-relaxed font-medium opacity-60 relative z-10">
              Receba ajuda instantânea do nosso assistente jurídico de IA ou de especialistas humanos por canais sincronizados.
            </p>
            <Link href="/dashboard/help/chat" className="inline-flex items-center text-ink font-bold text-[10px] uppercase tracking-[0.2em] border-b border-cerrado-900/10 hover:border-cerrado-900 pb-1 transition-all relative z-10">
              Iniciar chat
              <svg className="w-4 h-4 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
 
          <div className="bg-white rounded-[2.5rem] p-10 border border-castanha-200 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 group relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
              <svg width="150" height="150" viewBox="0 0 100 100">
                <pattern id="grid-help-2" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="black" strokeWidth="0.5" />
                </pattern>
                <rect width="100" height="100" fill="url(#grid-help-2)" />
              </svg>
            </div>
            <div className="mb-8 w-16 h-16 rounded-2xl bg-castanha-50 flex items-center justify-center border border-castanha-200 group-hover:bg-cerrado-900 group-hover:border-cerrado-900 transition-all duration-500 shadow-sm relative z-10">
              <svg className="w-8 h-8 text-ink group-hover:text-white transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-medium tracking-tight text-ink mb-4 relative z-10">Dúvidas por e-mail</h3>
            <p className="text-castanha-600 mb-10 leading-relaxed font-medium opacity-60 relative z-10">
              Solicite suporte assíncrono. Normalmente respondemos em menos de 24 horas.
            </p>
            <Link href="/dashboard/help/email" className="inline-flex items-center text-ink font-bold text-[10px] uppercase tracking-[0.2em] border-b border-cerrado-900/10 hover:border-cerrado-900 pb-1 transition-all relative z-10">
              Enviar solicitação
              <svg className="w-4 h-4 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* FAQs section */}
        <div className="mb-24">
          <div className="flex items-center mb-12">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-castanha-400 mr-8">Perguntas frequentes</h2>
            <div className="h-px flex-1 bg-castanha-200"></div>
          </div>
 
          <div className="space-y-6">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => (
                <div
                  key={index}
                  className={`bg-white border rounded-[2rem] overflow-hidden transition-all duration-500 shadow-sm hover:shadow-xl ${expandedFAQ === index ? 'border-cerrado-900 ring-4 ring-pequi-500/5 shadow-2xl scale-[1.01]' : 'border-castanha-200 hover:border-cerrado-900/20'
                    }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-10 py-7 text-left flex justify-between items-center focus:outline-none"
                  >
                    <span className="font-bold text-ink text-lg tracking-tight">{faq.question}</span>
                    <div className={`p-3 rounded-full transition-all duration-500 ${expandedFAQ === index ? 'bg-cerrado-900 text-white rotate-180 shadow-lg' : 'bg-castanha-50 text-castanha-400'}`}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  <div
                    className={`transition-all duration-500 ease-in-out ${expandedFAQ === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                  >
                    <div className="px-10 pb-10 text-castanha-600 font-medium leading-relaxed opacity-60">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-[2.5rem] border border-castanha-200 shadow-lg">
                <div className="w-24 h-24 bg-castanha-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-castanha-200">
                  <svg className="w-12 h-12 text-ink/10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-medium tracking-tight text-ink mb-4">Nenhum resultado encontrado</h3>
                <p className="text-castanha-400 mb-10 max-w-xs mx-auto font-medium">Não encontramos nenhum resultado para &quot;{searchQuery}&quot;.</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-8 py-4 text-white rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] shadow-xl transition-all btn-primary-gradient"
                >
                  Limpar pesquisa
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Contact section */}
        <div className="bg-cerrado-900 rounded-[3rem] p-16 text-center shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-20 opacity-[0.05] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
            <svg width="400" height="400" viewBox="0 0 100 100">
              <pattern id="grid-help-cta" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
              <rect width="100" height="100" fill="url(#grid-help-cta)" />
            </svg>
          </div>
 
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-8">Fale com um especialista.</h2>
            <p className="text-white/60 text-lg mb-12 max-w-lg mx-auto leading-relaxed font-medium">
              Nosso suporte funciona 24 horas por dia, 7 dias por semana. Normalmente respondemos em até 15 minutos.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/dashboard/help/contact" className="px-10 py-5 text-white font-bold text-[11px] uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl active:scale-95 btn-primary-gradient">
                Enviar solicitação
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
