'use client';

import { useBrand } from '../../contexts/TenantContext';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../components/DashboardLayout';
import { aiService } from '../../services/api';
import ReactMarkdown from 'react-markdown';
import { toast } from 'react-hot-toast';
import UpgradeModal from '../../components/UpgradeModal';
import { chatListKey, chatMessagesKey, removeLegacyChatHistory } from '../../services/chatStorage';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  fileData?: FileData;
}

interface FileData {
  type: 'image' | 'video' | 'pdf' | 'audio';
  mimeType: string;
  base64Data: string;
  name: string;
  storageTruncated?: boolean;
}

interface Chat {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export default function ChatPage() {
  const brand = useBrand();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Olá! Sou o assistente de IA do Pequi. Posso explicar temas jurídicos em linguagem simples. Lembre que não sou advogado: minhas respostas são informativas e não substituem a análise do seu caso por um profissional.',
      timestamp: new Date(),
    }
  ]);

  // No painel de um escritório (white-label), a saudação usa o nome do escritório
  useEffect(() => {
    if (!brand.tenant) return;
    setMessages((prev) =>
      prev.map((m) =>
        m.id === '1' && m.role === 'assistant'
          ? { ...m, content: `Olá! Sou a assistente de IA de ${brand.name}. Posso explicar temas jurídicos em linguagem simples. Lembre que não sou advogada: minhas respostas são informativas e não substituem a análise do seu caso por um profissional.` }
          : m
      )
    );
  }, [brand.tenant, brand.name]);

  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [recentChats, setRecentChats] = useState<Chat[]>([]);
  const [, setIsLoadingChats] = useState(false);
  const [,] = useState<string | null>(null);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [,] = useState(false);
  const [selectedLanguageLevel] = useState<'professional' | 'regular' | 'simple'>('professional');
  const [activeToggle, setActiveToggle] = useState<'internet' | 'prompts'>('prompts');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const startNewChat = useCallback(() => {
    setMessages([{ id: '1', role: 'assistant', content: 'Olá! Como posso ajudar você com suas questões jurídicas hoje?', timestamp: new Date() }]);
    setCurrentChatId(null);
    router.push('/dashboard/chat');
  }, [router]);

  const suggestedPrompts = [
    "Comprei um produto com defeito: quais são meus direitos pelo CDC?",
    "Quais verbas recebo se for demitido sem justa causa (CLT)?",
    "O plano de saúde negou meu tratamento. O que diz a lei?",
    "Como a LGPD protege os dados pessoais dos clientes da minha empresa?",
    "Quais cuidados tomar ao alugar um imóvel comercial?"
  ];

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Rola só a lista de mensagens; scrollIntoView rolava a página inteira e escondia o topo do cartão
    const box = messagesEndRef.current?.parentElement;
    if (box) box.scrollTo({ top: box.scrollHeight, behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  useEffect(() => {
    removeLegacyChatHistory();
    const savedChats = localStorage.getItem(chatListKey());
    if (savedChats) {
      try {
        setRecentChats(JSON.parse(savedChats));
      } catch {
        setRecentChats([]);
      }
    }
    setIsLoadingChats(false);

    const urlParams = new URLSearchParams(window.location.search);
    const chatIdFromUrl = urlParams.get('id');
    if (chatIdFromUrl) {
      setCurrentChatId(chatIdFromUrl);
    }
  }, []);

  useEffect(() => {
    if (currentChatId) {
      const savedMessages = localStorage.getItem(chatMessagesKey(currentChatId));
      if (savedMessages) {
        try {
          const parsedMessages = JSON.parse(savedMessages, (key, value) => {
            if (key === 'timestamp' && typeof value === 'string') return new Date(value);
            return value;
          });
          setMessages(parsedMessages);
        } catch {
          startNewChat();
        }
      }
    }
  }, [currentChatId, startNewChat]);

  // Persist messages and update recent chats archive
  useEffect(() => {
    if (currentChatId && messages.length > 1) {
      localStorage.setItem(chatMessagesKey(currentChatId), JSON.stringify(messages));
      
      const savedChats = localStorage.getItem(chatListKey());
      let chats: Chat[] = [];
      if (savedChats) {
        try {
          chats = JSON.parse(savedChats);
        } catch {
          chats = [];
        }
      }

      const existingChatIndex = chats.findIndex(c => c._id === currentChatId);
      if (existingChatIndex >= 0) {
        chats[existingChatIndex] = {
          ...chats[existingChatIndex],
          updatedAt: new Date().toISOString()
        };
      } else {
        const newChat: Chat = {
          _id: currentChatId,
          title: messages[1]?.content.substring(0, 40) || 'Nova consulta',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        chats.unshift(newChat);
      }

      localStorage.setItem(chatListKey(), JSON.stringify(chats));
      setRecentChats(chats);
    }
  }, [messages, currentChatId]);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert(`O arquivo excede o limite de 10 MB.`);
      return;
    }
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

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64Data = result.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !selectedFile) || isLoading) return;

    let fileData: FileData | undefined;
    if (selectedFile) {
      setIsProcessingFile(true);
      try {
        const base64Data = await fileToBase64(selectedFile);
        let fileType: 'image' | 'video' | 'pdf' | 'audio';
        if (selectedFile.type.startsWith('image/')) fileType = 'image';
        else if (selectedFile.type.startsWith('video/')) fileType = 'video';
        else if (selectedFile.type === 'application/pdf') fileType = 'pdf';
        else if (selectedFile.type.startsWith('audio/')) fileType = 'audio';
        else throw new Error('Tipo de arquivo não suportado');

        fileData = {
          type: fileType,
          mimeType: selectedFile.type,
          base64Data,
          name: selectedFile.name
        };
      } catch (error: unknown) {
        console.error('Error processing file:', error);
        setIsProcessingFile(false);
        return;
      }
      setIsProcessingFile(false);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
      fileData
    };

    setMessages((prev) => [...prev, userMessage]);
    
    // Generate a chat ID if it doesn't exist
    let chatId = currentChatId;
    if (!chatId) {
      chatId = Date.now().toString();
      setCurrentChatId(chatId);
    }

    const currentInput = input;
    setInput('');
    clearSelectedFile();
    setIsLoading(true);

    try {
      const response = await aiService.chatWithAssistant({
        message: currentInput,
        languageLevel: selectedLanguageLevel,
        useWebSearch: activeToggle === 'internet',
        chatHistory: messages.map(m => ({ role: m.role, content: m.content })),
        context: fileData ? {
          inlineData: {
            data: fileData.base64Data,
            mimeType: fileData.mimeType
          }
        } : undefined
      });

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error: any) {
      console.error(error);
      if (error.response?.status === 403 || error.status === 403) {
        setShowUpgradeModal(true);
      } else {
        const message = error.response?.data?.message || error.message || 'Não foi possível obter a resposta da IA. Tente novamente.';
        toast.error(message, {
          duration: 4000,
          position: 'top-center',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };



  const handleChatClick = (id: string) => {
    setCurrentChatId(id);
    router.push(`/dashboard/chat?id=${id}`);
  };

  const deleteChat = (id: string) => {
    const updated = recentChats.filter(c => c._id !== id);
    setRecentChats(updated);
    localStorage.setItem(chatListKey(), JSON.stringify(updated));
    localStorage.removeItem(chatMessagesKey(id));
    if (currentChatId === id) startNewChat();
  };

  // Visual no padrão editorial (2026-11-24): moldura areia, pergunta em balão
  // grafite, resposta em cartão claro com etiqueta; conversas em faixas areia.
  return (
    <DashboardLayout title="Chat" fitScreen>
      <div className="relative flex h-full min-h-[600px] overflow-hidden rounded-3xl border border-ink/10 bg-[#F1EDE0]">
        {showSidebar && (
          <div className="fixed inset-0 z-30 bg-[#151816]/20 backdrop-blur-sm lg:hidden" onClick={() => setShowSidebar(false)} />
        )}

        <aside
          className={`${showSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} absolute z-40 flex h-full w-80 flex-col border-r border-ink/10 bg-[#FFFDF6] transition-transform duration-300 lg:relative`}
        >
          <div className="flex h-16 flex-shrink-0 items-center justify-between border-b border-ink/10 px-5">
            <span className="text-[0.95rem] font-medium text-ink">Conversas</span>
            <button onClick={() => setShowSidebar(false)} className="-mr-2 p-2 text-ink/40 hover:text-ink lg:hidden" aria-label="Fechar conversas">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex min-h-0 flex-1 flex-col p-4">
            <button
              onClick={startNewChat}
              className="flex h-12 w-full flex-shrink-0 items-center justify-between rounded-2xl bg-[#151816] px-5 text-[0.92rem] font-medium text-white hover:bg-[#151816]/90"
            >
              Nova conversa
              <svg className="h-4 w-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
              </svg>
            </button>

            <p className="mb-2 mt-6 px-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink/40">Histórico</p>
            <div className="custom-scrollbar min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
              {recentChats.length === 0 && <p className="px-1 text-[0.85rem] text-ink/45">As conversas aparecem aqui.</p>}
              {recentChats.map((chat) => {
                const active = currentChatId === chat._id;
                return (
                  <div
                    key={chat._id}
                    onClick={() => handleChatClick(chat._id)}
                    className={`group flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 transition-colors ${active ? 'bg-[#151816] text-white' : 'bg-[#F1EDE0] text-ink hover:bg-[#E9E3D2]'}`}
                  >
                    <svg className={`h-4 w-4 flex-shrink-0 ${active ? 'text-white/60' : 'text-ink/45'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8M8 14h5M21 12c0 4.4-4 8-9 8-1.3 0-2.6-.2-3.7-.7L3 20l1.4-3.8C3.5 15 3 13.5 3 12c0-4.4 4-8 9-8s9 3.6 9 8z" />
                    </svg>
                    <span className="min-w-0 flex-1 truncate text-[0.92rem]">{chat.title}</span>
                    <span className={`flex-shrink-0 text-[0.75rem] group-hover:hidden ${active ? 'text-white/55' : 'text-ink/45'}`}>
                      {new Date(chat.updatedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteChat(chat._id);
                      }}
                      className={`hidden flex-shrink-0 rounded-lg p-1 group-hover:block ${active ? 'text-white/70 hover:text-white' : 'text-ink/45 hover:text-red-600'}`}
                      aria-label="Excluir conversa"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        <main className="relative flex min-w-0 flex-1 flex-col">
          <header className="flex h-16 flex-shrink-0 items-center justify-between gap-4 border-b border-ink/10 px-5 sm:px-8">
            <div className="flex items-center gap-3">
              <button onClick={() => setShowSidebar(!showSidebar)} className="-ml-2 p-2 text-ink/50 hover:text-ink lg:hidden" aria-label="Abrir conversas">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <span className="hidden gap-1.5 sm:flex" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveToggle(activeToggle === 'internet' ? 'prompts' : 'internet')}
                aria-pressed={activeToggle === 'internet'}
                className={`rounded-full px-3.5 py-1.5 text-[0.8rem] font-medium transition-colors ${activeToggle === 'internet' ? 'bg-[#151816] text-white' : 'text-ink/60 ring-1 ring-ink/15 hover:text-ink'}`}
              >
                Pesquisa na internet {activeToggle === 'internet' ? 'ligada' : 'desligada'}
              </button>
              <span className="hidden text-[0.95rem] font-medium text-ink sm:inline">{brand.tenant ? brand.name : 'Pequi'} / Chat</span>
            </div>
          </header>

          <div className="custom-scrollbar min-h-0 flex-1 space-y-6 overflow-y-auto px-5 py-8 sm:px-8">
            {messages.length === 1 && (
              <div className="mx-auto max-w-2xl py-6">
                <h1 className="text-[clamp(1.8rem,3vw,2.4rem)] font-medium leading-tight tracking-[-0.03em] text-ink">Como posso ajudar hoje?</h1>
                <p className="mt-2 text-[1rem] text-ink/60">Escolha uma sugestão ou escreva a sua dúvida.</p>
                <div className="mt-8 space-y-2">
                  {suggestedPrompts.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => setInput(p)}
                      className="flex w-full items-center gap-4 rounded-2xl bg-[#FFFDF6] px-5 py-4 text-left transition-colors hover:bg-white"
                    >
                      <span className="w-4 flex-shrink-0 text-[0.85rem] tabular-nums text-ink/40">{i + 1}</span>
                      <span className="flex-1 text-[0.98rem] leading-snug text-ink">{p}</span>
                      <svg className="h-4 w-4 flex-shrink-0 text-ink/35" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.slice(1).map((m, i) => (
              <div key={i} className={`mx-auto flex max-w-4xl ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                <div
                  className={
                    m.role === 'user'
                      ? 'max-w-[80%] rounded-2xl bg-[#151816] px-6 py-4 text-white'
                      : 'w-full rounded-3xl bg-[#FFFDF6] p-6 text-ink sm:p-8'
                  }
                >
                  {m.role === 'assistant' && (
                    <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ink/45">
                      Resposta{activeToggle === 'internet' ? ' com pesquisa' : ''}
                    </p>
                  )}
                  {m.fileData && (
                    <div className="mb-4">
                      {m.fileData.type === 'image' ? (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={`data:${m.fileData.mimeType};base64,${m.fileData.base64Data}`} alt="anexo" className="h-auto max-w-full rounded-xl" />
                        </>
                      ) : (
                        <div className={`flex items-center gap-3 rounded-xl px-4 py-3 ${m.role === 'user' ? 'bg-white/10' : 'bg-[#F1EDE0]'}`}>
                          <svg className={`h-4 w-4 ${m.role === 'user' ? 'text-white/60' : 'text-ink/45'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="truncate text-[0.88rem]">{m.fileData.name}</span>
                        </div>
                      )}
                    </div>
                  )}
                  {m.role === 'assistant' ? (
                    <div dangerouslySetInnerHTML={{ __html: m.content }} className="html-content text-[1rem] leading-[1.75] text-ink/75" />
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
            {isLoading && (
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

          <footer className="flex-shrink-0 border-t border-ink/10 px-5 py-4 sm:px-8">
            <div className="mx-auto max-w-4xl">
              {filePreview && (
                <div className="relative mb-3 inline-block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={filePreview} alt="prévia" className="h-24 rounded-xl" />
                  <button onClick={clearSelectedFile} className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#151816] text-white" aria-label="Remover arquivo">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
              {selectedFile && !filePreview && (
                <div className="relative mb-3 inline-flex items-center gap-3 rounded-xl bg-[#FFFDF6] px-4 py-3">
                  <svg className="h-4 w-4 text-ink/45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-[0.88rem] text-ink">{selectedFile.name}</span>
                  <button onClick={clearSelectedFile} className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#151816] text-white" aria-label="Remover arquivo">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}

              <form onSubmit={handleSendMessage} className="flex items-end gap-2 rounded-2xl bg-[#FFFDF6] p-2 ring-1 ring-ink/10 focus-within:ring-ink/30">
                <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept="image/*,video/*,application/pdf,audio/*" />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-ink/45 hover:bg-[#F1EDE0] hover:text-ink"
                  aria-label="Anexar imagem, vídeo, PDF ou áudio"
                  title="Anexar imagem, vídeo, PDF ou áudio"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escreva sua dúvida..."
                  rows={1}
                  className="max-h-40 min-h-[44px] flex-1 resize-none overflow-hidden border-0 bg-transparent px-1 py-2.5 text-[1rem] text-ink placeholder:text-ink/40 focus:outline-none focus:ring-0"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                />
                <button
                  type="submit"
                  disabled={isLoading || isProcessingFile || (!input.trim() && !selectedFile)}
                  className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#151816] text-white transition-opacity disabled:opacity-25"
                  aria-label="Enviar"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
                  </svg>
                </button>
              </form>

              <p className="mt-3 text-center text-[0.75rem] leading-relaxed text-ink/45">
                Respostas geradas por IA, com caráter informativo.{' '}
                {brand.tenant
                  ? `${brand.subject} não presta consultoria jurídica; para o seu caso, fale com um advogado do escritório.`
                  : 'O Pequi não presta consultoria jurídica; para o seu caso, procure um advogado inscrito na OAB ou a Defensoria Pública.'}
              </p>

              <style jsx>{`
                textarea::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              <style jsx global>{`
                .html-content p {
                  margin-bottom: 1rem;
                }
                .html-content p:last-child {
                  margin-bottom: 0;
                }
                .html-content h1,
                .html-content h2,
                .html-content h3 {
                  font-family: var(--font-accent);
                  font-weight: 500;
                  font-size: 1.6rem;
                  line-height: 1.2;
                  letter-spacing: -0.01em;
                  color: #151816;
                  margin: 1.5rem 0 0.75rem;
                }
                .html-content h1:first-child,
                .html-content h2:first-child,
                .html-content h3:first-child {
                  margin-top: 0;
                }
                .html-content ul,
                .html-content ol {
                  margin: 0 0 1rem 1.25rem;
                  list-style-type: disc;
                }
                .html-content ol {
                  list-style-type: decimal;
                }
                .html-content li {
                  margin-bottom: 0.4rem;
                }
                .html-content strong {
                  font-weight: 600;
                  color: #151816;
                }
                .html-content a {
                  color: #151816;
                  text-decoration: underline;
                  text-underline-offset: 4px;
                }
              `}</style>
            </div>
          </footer>
        </main>
      </div>
      <UpgradeModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
    </DashboardLayout>
  );
} 