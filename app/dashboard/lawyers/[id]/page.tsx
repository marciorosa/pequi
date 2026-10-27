'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/app/components/DashboardLayout';
import { getLawyer, getLawyerResponse, uploadDocument } from '../../../services/lawyerService';
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
        content: `Olá. Sou o ${data.name}. Meus parâmetros neurais estão ajustados para ${data.expertise.join(', ')}. Como podemos prosseguir com sua consulta jurídica?`,
        timestamp: new Date()
      }]);
    };
    initializeId();
  }, [params]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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

  return (
    <DashboardLayout title={lawyer?.name || 'Especialista Neural'}>
      <div className="flex h-[calc(100vh-160px)] rounded-[2.5rem] bg-white border border-castanha-100 shadow-2xl overflow-hidden relative">
        {/* Profile Sidebar */}
        <aside className="hidden lg:flex flex-col w-96 h-full bg-castanha-50 border-r border-castanha-100 p-10 space-y-12">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-foreground/40 hover:text-foreground transition-all">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Voltar ao diretório</span>
          </button>

          <div className="space-y-8">
            <div className="w-24 h-24 rounded-3xl bg-white border border-castanha-100 shadow-2xl flex items-center justify-center text-foreground">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" /></svg>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">{lawyer?.name}</h1>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-foreground/30">Núcleo de consultoria ativo</p>
            </div>
            <p className="text-[13px] leading-relaxed font-medium text-foreground/40">{lawyer?.description}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/20">Matriz de especialização</h3>
            <div className="flex flex-wrap gap-2">
              {lawyer?.expertise.map((skill, i) => (
                <span key={i} className="px-3 py-1.5 rounded-full bg-white border border-castanha-100 text-[10px] font-bold uppercase tracking-wider text-foreground/60">{skill}</span>
              ))}
            </div>
          </div>
        </aside>

        {/* Chat Main Area */}
        <main className="flex-1 flex flex-col min-w-0 bg-white">
          <header className="h-20 px-10 border-b border-castanha-50 flex items-center justify-between backdrop-blur-xl bg-white/80 sticky top-0 z-20">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-foreground/20 uppercase tracking-[0.3em]">Canal Node.0{Math.floor(Math.random() * 100)}</span>
              <h2 className="text-xl font-light tracking-tight">Sessão de consultoria ativa</h2>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => fileInputRefPdf.current?.click()} className="p-3 text-foreground/40 hover:text-foreground hover:bg-castanha-50 rounded-xl transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
              </button>
              <input type="file" ref={fileInputRefPdf} className="hidden" accept=".pdf" onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'pdf')} />
            </div>
          </header>

          <div className="flex-1 overflow-y-auto px-10 py-10 space-y-10 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                <div className={`max-w-[85%] ${m.role === 'user' 
                  ? 'rounded-[1.5rem] py-4 px-6 btn-primary-gradient text-white shadow-[0_12px_24px_rgba(0,0,0,0.12)] border border-white/5' 
                  : 'rounded-[2.5rem] p-8 bg-white border border-castanha-200 text-castanha-800 shadow-[0_4px_20px_rgba(0,0,0,0.02)]'}`}>
                  <div className={`prose prose-sm max-w-none font-medium leading-[1.6] text-[1.05rem] ${m.role === 'user' ? 'prose-invert' : 'prose-gray'}`}>
                    {m.role === 'assistant' ? (
                      <div 
                        dangerouslySetInnerHTML={{ __html: m.content }} 
                        className="html-content"
                      />
                    ) : (
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    )}
                  </div>
                  <div className={`text-[9px] font-bold uppercase tracking-[0.2em] ${m.role === 'user' ? 'mt-3 text-right text-white/40' : 'mt-6 text-foreground/20'}`}>
                    {new Date(m.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-castanha-50 border border-castanha-100 rounded-[2rem] px-8 py-6">
                  <div className="flex space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground/20 animate-bounce" />
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground/20 animate-bounce delay-100" />
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground/20 animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <footer className="p-10 bg-white/80 backdrop-blur-xl">
            <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto relative group">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Inicie sua consulta jurídica..."
                rows={1}
                className="w-full bg-castanha-50/50 border border-castanha-100 focus:bg-white focus:ring-4 focus:ring-pequi-500/5 focus:border-cerrado-900/10 rounded-[2rem] py-6 pl-8 pr-20 resize-none text-foreground transition-all duration-300 shadow-sm overflow-hidden scrollbar-none"
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
                style={{ height: '76px' }}
              />
              <button type="submit" disabled={isTyping || !inputMessage.trim()} className="absolute right-3 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center text-white rounded-full transition-all shadow-xl disabled:opacity-20 btn-primary-gradient">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </form>
            <style jsx>{`
                    .html-content p {
                        margin-bottom: 1rem;
                    }
                    .html-content h1, .html-content h2, .html-content h3 {
                        font-weight: 700;
                        margin-top: 1.5rem;
                        margin-bottom: 0.5rem;
                        color: #10101A;
                    }
                    .html-content ul, .html-content ol {
                        margin-left: 1.5rem;
                        margin-bottom: 1rem;
                        list-style-type: disc;
                    }
                    .html-content ol {
                        list-style-type: decimal;
                    }
                    .html-content li {
                        margin-bottom: 0.25rem;
                    }
                    .html-content strong {
                        font-weight: 700;
                        color: #10101A;
                    }
                `}</style>
          </footer>
        </main>
      </div>
    </DashboardLayout>
  );
} 
