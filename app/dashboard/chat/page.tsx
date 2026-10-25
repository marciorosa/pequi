'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../components/DashboardLayout';
import { aiService } from '../../services/api';
import ReactMarkdown from 'react-markdown';
import { toast } from 'react-hot-toast';
import UpgradeModal from '../../components/UpgradeModal';

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
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! How can I assist you with your legal questions today?',
      timestamp: new Date(),
    }
  ]);

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
    setMessages([{ id: '1', role: 'assistant', content: 'Hello! How can I assist you with your legal questions today?', timestamp: new Date() }]);
    setCurrentChatId(null);
    router.push('/dashboard/chat');
  }, [router]);

  const suggestedPrompts = [
    "Draft a standard NDA for a tech startup",
    "Explain New York commercial lease terminology",
    "Compliance requirements for GDPR in 2024",
    "Liability clauses in software service agreements",
    "IP protection strategies for small businesses"
  ];

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  useEffect(() => {
    const savedChats = localStorage.getItem('legalAiChats');
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
      const savedMessages = localStorage.getItem(`chat_messages_${currentChatId}`);
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
      localStorage.setItem(`chat_messages_${currentChatId}`, JSON.stringify(messages));
      
      const savedChats = localStorage.getItem('legalAiChats');
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
          title: messages[1]?.content.substring(0, 40) || 'New Investigation',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        chats.unshift(newChat);
      }

      localStorage.setItem('legalAiChats', JSON.stringify(chats));
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
      alert(`File size exceeds 10MB limit.`);
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
        else throw new Error('Unsupported file type');

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
        const message = error.response?.data?.message || 'Failed to get AI response. Please try again.';
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
    localStorage.setItem('legalAiChats', JSON.stringify(updated));
    localStorage.removeItem(`chat_messages_${id}`);
    if (currentChatId === id) startNewChat();
  };

  return (
    <DashboardLayout title="Neural Channels">
      <div className="flex h-[calc(100vh-160px)] rounded-[2.5rem] bg-white border border-gray-100 shadow-2xl overflow-hidden relative">
        {/* Mobile Sidebar Backdrop */}
        {showSidebar && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setShowSidebar(false)}
          />
        )}

        <aside className={`${showSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} absolute lg:relative z-40 w-80 h-full bg-[#F9F8F6] border-r border-[#e7e5e1] transition-transform duration-300 font-sans`}>
          <div className="flex flex-col h-full p-6">
            <div className="flex items-center justify-between mb-8 lg:hidden">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/20">Archive</span>
              <button 
                onClick={() => setShowSidebar(false)}
                className="p-2 -mr-2 text-foreground/40 hover:text-foreground transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <button onClick={startNewChat} className="group relative w-full py-5 rounded-[1.5rem] font-bold text-[10px] uppercase tracking-[0.3em] shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all mb-10 overflow-hidden border border-white/10 btn-primary-gradient">
              <span className="relative z-10">Initialize Thread</span>
            </button>
            <div className="flex-1 overflow-y-auto space-y-4 h-full pr-2 custom-scrollbar">
              <h3 className="px-2 text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/20 mb-6">Discovery Log</h3>
              {recentChats.map(chat => (
                <div key={chat._id} className={`group flex items-center justify-between p-5 rounded-[1.5rem] cursor-pointer transition-all ${currentChatId === chat._id ? 'bg-white shadow-[0_8px_20px_rgba(0,0,0,0.04)] border border-[#e7e5e1] ring-1 ring-black/5' : 'hover:bg-black/5 text-foreground/60'}`} onClick={() => handleChatClick(chat._id)}>
                  <div className="flex flex-col min-w-0">
                    <span className={`text-[13px] font-medium truncate ${currentChatId === chat._id ? 'text-[#10101A]' : ''}`}>{chat.title}</span>
                    <span className="text-[10px] font-medium opacity-30 mt-1 uppercase tracking-[0.2em]">{new Date(chat.updatedAt).toLocaleDateString()}</span>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); deleteChat(chat._id); }} className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:bg-red-50 rounded-xl transition-all">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main className="flex-1 flex flex-col min-w-0 relative bg-white">
          <header className="h-20 px-8 border-b border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setShowSidebar(!showSidebar)} className="lg:hidden p-2 text-foreground/40 hover:text-foreground">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-foreground/20 uppercase tracking-[0.3em]">Node.042</span>
                <h2 className="text-xl font-light tracking-tight">Active Neural Session</h2>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setActiveToggle(activeToggle === 'internet' ? 'prompts' : 'internet')} className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border ${activeToggle === 'internet' ? 'btn-primary-gradient text-white border-transparent shadow-lg' : 'bg-gray-50 text-foreground/40 border-gray-100'}`}>Internet Access</button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto px-8 py-10 space-y-8 custom-scrollbar">
            {messages.length === 1 && (
              <div className="max-w-2xl mx-auto space-y-12 py-10">
                <div className="space-y-4 text-center">
                  <h1 className="text-4xl font-medium tracking-tight text-[#10101A]">Neural <span className="font-light italic text-[#525252]">Interface.</span></h1>
                  <p className="text-[#525252] text-lg leading-relaxed font-medium opacity-60 max-w-md mx-auto">Select a strategic prompt or initiate a forensic analysis thread.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {suggestedPrompts.map((p, i) => (
                    <button key={i} onClick={() => setInput(p)} className="text-left p-6 rounded-[2rem] bg-[#F9F8F6] border border-[#e7e5e1] hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#525252] opacity-30 group-hover:opacity-60 mb-3 block">Neural Prompt</span>
                      <span className="text-[14px] font-medium leading-relaxed text-[#323232]">{p}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.slice(1).map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                <div className={`max-w-[85%] ${m.role === 'user'
                  ? 'rounded-[1.5rem] py-4 px-6 btn-primary-gradient text-white shadow-[0_12px_24px_rgba(0,0,0,0.12)] border border-white/5'
                  : 'rounded-[2.5rem] p-8 bg-white border border-[#e7e5e1] text-[#323232] shadow-[0_4px_20px_rgba(0,0,0,0.02)]'}`}>
                  {m.fileData && (
                    <div className="mb-4">
                      {m.fileData.type === 'image' && (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={`data:${m.fileData.mimeType};base64,${m.fileData.base64Data}`} alt="attachment" className="max-w-full h-auto rounded-[1.5rem] border border-[#e7e5e1]" />
                        </>
                      )}
                      {m.fileData.type !== 'image' && (
                        <div className={`p-4 rounded-2xl border flex items-center gap-3 ${m.role === 'user' ? 'bg-white/10 border-white/10' : 'bg-[#F9F8F6] border-[#e7e5e1]'}`}>
                          <svg className={`w-5 h-5 ${m.role === 'user' ? 'text-white/40' : 'text-foreground/40'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                          <span className="text-xs font-bold uppercase tracking-[0.1em] truncate">{m.fileData.name}</span>
                        </div>
                      )}
                    </div>
                  )}
                  <div className={`prose prose-sm max-w-none font-medium leading-[1.6] text-[1.05rem] chat-content ${m.role === 'user' ? 'prose-invert' : 'prose-gray'}`}>
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
                    {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-50 border border-gray-100 rounded-[2rem] px-8 py-6">
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

          <footer className="p-8 bg-[#F9F8F6]/80 backdrop-blur-3xl border-t border-[#e7e5e1]">
            <div className="max-w-4xl mx-auto space-y-6">
              {filePreview && (
                <div className="relative inline-block group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={filePreview} alt="preview" className="h-32 rounded-[1.5rem] border border-[#e7e5e1] shadow-2xl" />
                  <button onClick={clearSelectedFile} className="absolute -top-2 -right-2 w-7 h-7 bg-black text-white rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
              {selectedFile && !filePreview && (
                <div className="relative inline-flex items-center gap-4 p-5 bg-white rounded-[1.5rem] border border-[#e7e5e1] group shadow-xl">
                  <div className="w-10 h-10 rounded-xl bg-[#F9F8F6] flex items-center justify-center">
                    <svg className="w-5 h-5 text-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{selectedFile.name}</span>
                  <button onClick={clearSelectedFile} className="absolute -top-2 -right-2 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center shadow-md">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
 
              <form onSubmit={handleSendMessage} className="relative group">
                <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept="image/*,video/*,application/pdf,audio/*" />
                <button type="button" onClick={() => fileInputRef.current?.click()} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-foreground/20 hover:text-black transition-all">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Initiate analysis..."
                  rows={1}
                  className="w-full bg-white border border-[#e7e5e1] focus:ring-8 focus:ring-black/5 focus:border-black/10 rounded-[2.5rem] py-7 pl-16 pr-24 resize-none text-[#10101A] transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.06)] overflow-hidden font-medium text-[1.1rem]"
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(e); } }}
                />
                <button type="submit" disabled={isLoading || isProcessingFile || (!input.trim() && !selectedFile)} className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center text-white rounded-full transition-all shadow-2xl disabled:opacity-10 group-disabled:scale-100 btn-primary-gradient">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>

              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/20 flex items-center justify-center gap-4 pt-2">
                <span>Neural Intake Capacity:</span>
                <div className="flex items-center gap-1.5 text-blue-500/50"><div className="w-1 h-1 rounded-full bg-current" /><span>Images</span></div>
                <div className="flex items-center gap-1.5 text-green-500/50"><div className="w-1 h-1 rounded-full bg-current" /><span>Videos</span></div>
                <div className="flex items-center gap-1.5 text-red-500/50"><div className="w-1 h-1 rounded-full bg-current" /><span>PDFs</span></div>
                <div className="flex items-center gap-1.5 text-purple-500/50"><div className="w-1 h-1 rounded-full bg-current" /><span>Audio</span></div>
              </div>

              <style jsx>{`
                    textarea::-webkit-scrollbar {
                        display: none;
                    }
                    .html-content p {
                        margin-bottom: 1.25rem;
                        line-height: 1.6;
                    }
                    .html-content h1, .html-content h2, .html-content h3 {
                        font-weight: 700;
                        margin-top: 1.75rem;
                        margin-bottom: 0.75rem;
                        color: #10101A;
                    }
                    .html-content ul, .html-content ol {
                        margin-left: 1.5rem;
                        margin-bottom: 1.25rem;
                        list-style-type: disc;
                    }
                    .html-content ol {
                        list-style-type: decimal;
                    }
                    .html-content li {
                        margin-bottom: 0.5rem;
                    }
                    .html-content strong {
                        font-weight: 700;
                        color: #10101A;
                    }
                `}</style>
            </div>
          </footer>
        </main>
      </div >
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </DashboardLayout >
  );
} 