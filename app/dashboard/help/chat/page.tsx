'use client';

import { useState, useRef, useEffect } from 'react';
import DashboardLayout from '../../../components/DashboardLayout';

// Message type
type MessageType = 'user' | 'agent' | 'system';

// Message interface
interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  file?: {
    name: string;
    type: string;
    preview?: string;
  };
}

// FAQ interface
interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export default function ChatSupportPage() {
  // Chat state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content: 'Olá. Sou o concierge de suporte do Pequi. Como posso ajudar você hoje?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const [, ] = useState(true);
  const [waitTime, setWaitTime] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  // FAQ suggestions
  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'Redefinição de senha',
      answer: 'Para redefinir sua senha, acesse a página de login e selecione "Esqueceu a senha?". Enviaremos as instruções de redefinição para o seu e-mail cadastrado.'
    },
    {
      id: '2',
      question: 'Status da assinatura',
      answer: 'Os detalhes da assinatura podem ser gerenciados na seção Assinatura do seu painel. Lá você pode fazer upgrade, alterar a forma de pagamento ou cancelar seu plano.'
    },
    {
      id: '3',
      question: 'Protocolo de segurança de dados',
      answer: 'O Pequi utiliza criptografia de nível militar em todos os documentos. Seus dados são criptografados em repouso e em trânsito com os padrões AES-256 e SSL/TLS.'
    }
  ];

  // Refs
  const messageEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // File handling
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setFilePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate agent typing
  const simulateAgentTyping = (response: string) => {
    setIsAgentTyping(true);
    const typingDuration = Math.min(1000 + response.length * 15, 2500);

    setTimeout(() => {
      setIsAgentTyping(false);
      setMessages(prevMessages => [
        ...prevMessages,
        {
          id: Date.now().toString(),
          type: 'agent',
          content: response,
          timestamp: new Date()
        }
      ]);
    }, typingDuration);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() && !selectedFile) return; // Allow sending only file or only text

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
      file: selectedFile ? {
        name: selectedFile.name,
        type: selectedFile.type,
        preview: filePreview || undefined
      } : undefined
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    clearSelectedFile();
    handleAgentResponse(inputValue);
  };

  // Generate agent response
  const handleAgentResponse = (userMessage: string) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    let response = '';

    if (lowerCaseMessage.includes('password') || lowerCaseMessage.includes('login') || lowerCaseMessage.includes('senha')) {
      response = faqs[0].answer;
    } else if (lowerCaseMessage.includes('cancel') || lowerCaseMessage.includes('billing') || lowerCaseMessage.includes('assinatura') || lowerCaseMessage.includes('cobrança')) {
      response = faqs[1].answer;
    } else if (lowerCaseMessage.includes('secure') || lowerCaseMessage.includes('encrypt') || lowerCaseMessage.includes('segur') || lowerCaseMessage.includes('criptograf')) {
      response = faqs[2].answer;
    } else if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('olá') || lowerCaseMessage.includes('oi')) {
      response = 'Olá! Estou aqui para facilitar sua experiência com o Pequi. Como posso ajudar?';
    } else if (lowerCaseMessage.includes('human') || lowerCaseMessage.includes('agent') || lowerCaseMessage.includes('atendente')) {
      response = 'Entendido. Vou transferir você para um atendente sênior. Aguarde um momento enquanto estabelecemos uma conexão segura.';
      setTimeout(() => setWaitTime(Math.floor(Math.random() * 5) + 2), 2000);
    } else {
      response = 'Obrigado pela sua mensagem. Estou analisando sua solicitação. Para uma solução imediata, você também pode encontrar respostas nas Dúvidas frequentes ou pesquisar em nossa base de conhecimento.';
    }

    simulateAgentTyping(response);
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  // Handle FAQ selection
  const handleFaqSelect = (faq: FAQ) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: faq.answer, // Just simplified for demo
      timestamp: new Date()
    };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    simulateAgentTyping(faq.answer);
  };

  // New chat
  const handleNewChat = () => {
    setWaitTime(null);
    setMessages([{
      id: Date.now().toString(),
      type: 'system',
      content: 'Sessão de suporte reiniciada. Como posso ajudar?',
      timestamp: new Date()
    }]);
  };

  return (
    <DashboardLayout title="Suporte Concierge">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 md:py-10 h-full flex flex-col">
        <div className="mb-6 md:mb-12 flex-shrink-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/30 mb-2 md:mb-3">Atendimento ao vivo</p>
          <h1 className="text-2xl md:text-4xl font-light text-foreground mb-2 md:mb-4 tracking-tight">Concierge de suporte</h1>
          <p className="text-foreground/50 max-w-2xl text-sm md:text-lg font-light leading-relaxed">
            Conecte-se na hora com nosso concierge automatizado ou solicite a transferência prioritária para um especialista humano.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 lg:h-[700px] flex-1 min-h-0">
          {/* Main Chat Area */}
          <div className="flex-1 bg-white border border-castanha-100 rounded-[32px] overflow-hidden shadow-sm flex flex-col relative h-[80vh] min-h-[500px] lg:h-auto lg:min-h-0 flex-shrink-0 lg:flex-shrink">
            {/* Header */}
            <div className="p-4 md:p-6 border-b border-castanha-50 flex items-center justify-between bg-castanha-50/30 flex-shrink-0">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-foreground flex items-center justify-center text-background shadow-lg shadow-black/10">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white border-4 border-white flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-cerrado-500 animate-pulse" />
                  </div>
                </div>
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">Concierge ativo</h2>
                  <p className="text-[10px] text-foreground/30 font-bold uppercase tracking-tighter">
                    {isAgentTyping ? 'O concierge está digitando...' : waitTime ? 'Na fila de atendimento' : 'Sistema pronto'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleNewChat}
                className="p-3 text-foreground/30 hover:text-foreground hover:bg-white rounded-xl transition-all border border-transparent hover:border-castanha-100"
                title="Reiniciar sessão"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 md:space-y-8 custom-scrollbar bg-[radial-gradient(#f9fafb_1px,transparent_1px)] [background-size:20px_20px]">
              {messages.map((item) => (
                <div key={item.id} className={`flex ${item.type === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                  <div className={`flex gap-4 max-w-[85%] ${item.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {item.type !== 'user' && (
                      <div className="w-10 h-10 rounded-xl bg-castanha-100 border border-castanha-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-foreground/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                      </div>
                    )}
                    <div>
                      <div className={`p-4 md:p-6 rounded-3xl text-sm leading-relaxed shadow-sm ${item.type === 'user'
                        ? 'text-white rounded-tr-none btn-primary-gradient'
                        : item.type === 'system'
                          ? 'bg-castanha-50 text-foreground border border-castanha-100 italic rounded-tl-none font-light'
                          : 'bg-white text-foreground border border-castanha-100 rounded-tl-none'
                        }`}>
                        {item.content}
                        {item.file && (
                          <div className={`mt-4 pt-4 border-t ${item.type === 'user' ? 'border-background/10' : 'border-castanha-100'}`}>
                            {item.file.preview ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={item.file.preview} alt="anexo" className="max-w-full h-auto rounded-xl border border-cerrado-900/5" />
                            ) : (
                              <div className={`flex items-center gap-3 p-3 rounded-xl ${item.type === 'user' ? 'bg-background/10' : 'bg-castanha-50'}`}>
                                <svg className="w-5 h-5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                </svg>
                                <span className="text-xs font-medium truncate">{item.file.name}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <p className={`text-[9px] font-bold uppercase tracking-widest mt-2 ${item.type === 'user' ? 'text-right text-foreground/30' : 'text-left text-foreground/20'}`}>
                        {formatTime(item.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {isAgentTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-castanha-50 flex items-center justify-center">
                      <span className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-foreground/20 rounded-full animate-bounce" />
                        <span className="w-1.5 h-1.5 bg-foreground/20 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1.5 h-1.5 bg-foreground/20 rounded-full animate-bounce [animation-delay:0.4s]" />
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {waitTime !== null && (
                <div className="px-10 py-8 bg-cerrado-50/50 border border-cerrado-100 rounded-3xl text-center space-y-2 animate-in slide-in-from-top duration-500">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-cerrado-600">Fila prioritária estabelecida</p>
                  <p className="text-xl font-light text-foreground">Conexão com um atendente em aprox. {waitTime} minutos</p>
                  <p className="text-xs text-cerrado-700/50">ID da sua sessão: PR-1005-{Math.floor(Math.random() * 9000) + 1000}</p>
                </div>
              )}

              <div ref={messageEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 md:p-8 border-t border-castanha-100 bg-white flex-shrink-0">
              <form onSubmit={handleSubmit} className="relative group">
                {/* File Preview in Input */}
                {selectedFile && (
                  <div className="mb-4 flex items-center gap-3 p-3 bg-castanha-50 border border-castanha-100 rounded-xl animate-in fade-in slide-in-from-left-2 duration-200">
                    {filePreview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={filePreview} alt="prévia" className="w-10 h-10 object-cover rounded-lg border border-castanha-200" />
                    ) : (
                      <div className="w-10 h-10 bg-white border border-castanha-200 rounded-lg flex items-center justify-center text-foreground/20">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-foreground truncate">{selectedFile.name}</p>
                      <p className="text-[9px] text-foreground/40 uppercase">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <button type="button" onClick={clearSelectedFile} className="p-1.5 hover:bg-white rounded-lg transition-colors text-foreground/30 hover:text-red-500">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}

                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileSelect} 
                  className="hidden" 
                />
                
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                  placeholder="Pergunte ao concierge..."
                  className="w-full bg-castanha-50 border border-castanha-100 rounded-2xl py-4 md:py-5 px-4 md:px-6 pr-24 md:pr-32 text-xs md:text-sm focus:bg-white focus:outline-none focus:ring-4 focus:ring-foreground/5 transition-all resize-none shadow-inner"
                  rows={1}
                  disabled={waitTime !== null}
                />
                <div className="absolute right-2 md:right-3 bottom-2 md:bottom-3 flex gap-1 md:gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={`p-2 transition-all rounded-lg ${selectedFile ? 'text-foreground' : 'text-foreground/20 hover:text-foreground'}`}
                    title="Anexar arquivo"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </button>
                  <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="px-4 md:px-6 py-2 text-white rounded-xl font-bold uppercase text-[9px] md:text-[10px] tracking-widest disabled:opacity-20 transition-all shadow-lg shadow-black/10 btn-primary-gradient"
                  >
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0 space-y-4 md:space-y-8 pb-10 lg:pb-0">
            <div className="bg-white border border-castanha-100 rounded-[32px] p-6 md:p-8 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30 mb-4 md:mb-8 px-1">Dúvidas frequentes</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                {faqs.map(faq => (
                  <button
                    key={faq.id}
                    onClick={() => handleFaqSelect(faq)}
                    className="w-full text-left p-3 md:p-4 rounded-xl bg-castanha-50 border border-transparent hover:border-castanha-200 transition-all text-xs md:text-sm font-semibold text-foreground/60 hover:text-foreground group"
                  >
                    <div className="flex items-center justify-between">
                      <span>{faq.question}</span>
                      <svg className="w-4 h-4 text-foreground/10 group-hover:text-foreground transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-castanha-50 border border-castanha-100 rounded-[32px] p-8">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Planos Enterprise</h3>
              <p className="text-xs text-foreground/50 leading-relaxed font-light mb-8">
                Assinantes dos planos Enterprise contam com concierge dedicado 24 horas por dia, 7 dias por semana, e suporte humano personalizado.
              </p>
              <div className="space-y-4">
                <a href="/dashboard/help/email" className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-foreground/40 hover:text-foreground transition-all group">
                  <div className="w-8 h-8 rounded-lg bg-white border border-castanha-100 flex items-center justify-center text-foreground/20 group-hover:text-foreground transition-all">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  Enviar e-mail para a central especializada
                </a>

              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f9fafb00;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
      `}</style>
    </DashboardLayout>
  );
} 
