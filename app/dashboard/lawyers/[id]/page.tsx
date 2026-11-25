'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/app/components/DashboardLayout';
import { getLawyer, getLawyerResponse, uploadDocument, isLawyerLockedForPlan } from '../../../services/lawyerService';
import { toast } from 'react-hot-toast';
import { LawyerData } from '@/app/services/lawyerService';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function LawyerDetailPage({ params }: Props) {
  const [id, setId] = useState<string>('');
  const [lawyer, setLawyer] = useState<LawyerData | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [apiMessages, setApiMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [, setIsUploading] = useState(false);
  const router = useRouter();

  const fileInputRefPdf = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeId = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
      const data = getLawyer(resolvedParams.id);
      setLawyer(data);
      setMessages([{
        role: 'assistant',
        content: `Olá! Sou o ${data.name}, uma ferramenta de inteligência artificial. Posso explicar temas como ${data.expertise.join(', ')}. Não sou advogado: minhas respostas são informativas e não substituem a análise do seu caso por um profissional inscrito na OAB.`,
        timestamp: new Date()
      }]);
    };
    initializeId();
  }, [params]);

  // Quem abre pelo endereço direto um assistente fora do plano volta para a página de planos.
  // O servidor também recusa as mensagens, então a trava não depende só desta tela.
  useEffect(() => {
    if (!id) return;
    const checkPlan = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        const plan = data?.subscription?.plan || 'Free';
        if (!data?.subscription?.isAdmin && isLawyerLockedForPlan(id, plan)) {
          toast.error('Este assistente faz parte do plano Pro.');
          router.replace('/dashboard/billing');
        }
      } catch (error) {
        console.error('Failed to check plan', error);
      }
    };
    checkPlan();
  }, [id, router]);

  useEffect(() => {
    // Rola só a lista de mensagens; scrollIntoView rolava a página inteira e escondia o topo do cartão
    const box = messagesEndRef.current?.parentElement;
    if (box) box.scrollTo({ top: box.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputMessage.trim() || isTyping) return;

    const userMsg: Message = { role: 'user', content: inputMessage, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setApiMessages(prev => [...prev, userMsg]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await getLawyerResponse(id, currentInput, apiMessages);
      const aiResponse: Message = { role: 'assistant', content: response.text, timestamp: new Date() };
      setMessages(prev => [...prev, aiResponse]);
      setApiMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFileUpload = async (file: File, type: 'pdf' | 'image') => {
    setIsUploading(true);
    try {
      const response = await uploadDocument(id, file, type);
      const aiResponse: Message = { role: 'assistant', content: response.text, timestamp: new Date() };
      setMessages(prev => [...prev, aiResponse]);
      setApiMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  // Mesmo padrão do chat do painel (2026-11-24): moldura areia, perfil à esquerda,
  // pergunta em balão grafite e resposta em cartão claro com etiqueta.
  return (
    <DashboardLayout title={lawyer?.name || 'Assistente de IA'} fitScreen>
      <div className="relative flex h-full min-h-[600px] overflow-hidden rounded-3xl border border-ink/10 bg-[#F1EDE0]">
        <aside className="custom-scrollbar hidden w-80 shrink-0 flex-col overflow-y-auto border-r border-ink/10 bg-[#FFFDF6] lg:flex">
          <div className="flex h-16 flex-shrink-0 items-center border-b border-ink/10 px-5">
            <button onClick={() => router.back()} className="flex items-center gap-2 text-[0.9rem] text-ink/60 hover:text-ink">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Todos os assistentes
            </button>
          </div>
          <div className="p-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#151816] text-white">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
              </svg>
            </div>
            <h1 className="mt-5 text-[1.5rem] font-medium leading-tight tracking-[-0.02em] text-ink">{lawyer?.name}</h1>
            <p className="mt-1 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ink/40">Assistente de IA · informativo</p>
            <p className="mt-4 text-[0.92rem] leading-relaxed text-ink/65">{lawyer?.description}</p>

            {!!lawyer?.expertise?.length && (
              <>
                <p className="mb-2 mt-8 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink/40">Temas</p>
                <div className="space-y-2">
                  {lawyer.expertise.map((skill, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setInputMessage(`Tenho uma dúvida sobre ${skill.toLowerCase()}: `)}
                      className="flex w-full items-center gap-3 rounded-2xl bg-[#F1EDE0] px-4 py-3 text-left text-[0.92rem] text-ink transition-colors hover:bg-[#E9E3D2]"
                    >
                      <span className="w-4 flex-shrink-0 text-[0.8rem] tabular-nums text-ink/40">{i + 1}</span>
                      <span className="flex-1">{skill}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-ink/10 px-5 sm:px-8">
            <span className="hidden gap-1.5 sm:flex" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
            </span>
            <button onClick={() => router.back()} className="text-[0.9rem] text-ink/60 hover:text-ink lg:hidden">
              ← Assistentes
            </button>
            <span className="truncate text-[0.95rem] font-medium text-ink">Assistentes / {lawyer?.name || '...'}</span>
          </header>

          <div className="custom-scrollbar min-h-0 flex-1 space-y-6 overflow-y-auto px-5 py-8 sm:px-8">
            {messages.map((m, i) => (
              <div key={i} className={`mx-auto flex max-w-4xl ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                <div className={m.role === 'user' ? 'max-w-[80%] rounded-2xl bg-[#151816] px-6 py-4 text-white' : 'w-full rounded-3xl bg-[#FFFDF6] p-6 text-ink sm:p-8'}>
                  {m.role === 'assistant' && (
                    <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ink/45">{lawyer?.name || 'Resposta'}</p>
                  )}
                  {m.role === 'assistant' ? (
                    <div dangerouslySetInnerHTML={{ __html: m.content }} className="pq-answer" />
                  ) : (
                    <div className="text-[1rem] leading-relaxed [&_p]:m-0">
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  )}
                  <div className={m.role === 'user' ? 'mt-2 text-right text-[0.72rem] text-white/45' : 'mt-6 border-t border-ink/10 pt-4 text-[0.78rem] text-ink/45'}>
                    {new Date(m.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="mx-auto flex max-w-4xl justify-start">
                <div className="rounded-2xl bg-[#FFFDF6] px-6 py-5">
                  <div className="flex space-x-2">
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/30" />
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/30 delay-100" />
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/30 delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <footer className="shrink-0 border-t border-ink/10 px-5 py-4 sm:px-8">
            <form onSubmit={handleSendMessage} className="mx-auto flex max-w-4xl items-end gap-2 rounded-2xl bg-[#FFFDF6] p-2 ring-1 ring-ink/10 focus-within:ring-ink/30">
              <input type="file" ref={fileInputRefPdf} className="hidden" accept=".pdf" onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'pdf')} />
              <button
                type="button"
                onClick={() => fileInputRefPdf.current?.click()}
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-ink/45 hover:bg-[#F1EDE0] hover:text-ink"
                aria-label="Anexar PDF"
                title="Anexar PDF"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Escreva sua dúvida..."
                rows={1}
                className="max-h-40 min-h-[44px] flex-1 resize-none border-0 bg-transparent px-1 py-2.5 text-[1rem] text-ink placeholder:text-ink/40 focus:outline-none focus:ring-0"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <button
                type="submit"
                disabled={isTyping || !inputMessage.trim()}
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#151816] text-white transition-opacity disabled:opacity-25"
                aria-label="Enviar"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
                </svg>
              </button>
            </form>
            <p className="mx-auto mt-3 max-w-4xl text-center text-[0.75rem] leading-relaxed text-ink/45">
              Este assistente é uma ferramenta de IA, não um advogado. As respostas têm caráter informativo; para o seu caso, procure um advogado inscrito na OAB ou a Defensoria Pública.
            </p>
          </footer>
        </main>
      </div>
    </DashboardLayout>
  );
}
