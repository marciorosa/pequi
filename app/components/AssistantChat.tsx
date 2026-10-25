'use client';

import { useState, useRef, useEffect } from 'react';
import { aiService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AssistantChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello, I\'m your personal AI legal assistant. How can I assist you today?',
      timestamp: new Date(),
    },
  ]);
  const { isAuthenticated } = useAuth();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Keep the latest message in view inside the chat panel only — avoid scrollIntoView on the page
  useEffect(() => {
    const el = messagesContainerRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    if (!isAuthenticated) {
      setTimeout(() => {
        const authMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Please login or sign up to chat with your legal assistant.',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, authMessage]);
        setIsLoading(false);
      }, 800);
      return;
    }

    try {
      // Get response from API
      const response = await aiService.generateAssistantResponse({
        prompt: userMessage.content,
      });

      // Add assistant response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.response.text,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error while processing your request. Please try again.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[520px] h-[min(700px,78vh)] flex-1 flex-col overflow-hidden bg-white">
      {/* Chat header */}
      <div className="flex items-center justify-between border-b border-[#e7e7ea] px-6 py-5 md:px-8 md:py-6">
        <div>
          <h3 className="text-[1.125rem] font-medium text-[#10101A] md:text-[1.25rem]">AIForLawyers Assistant</h3>
          <p className="mt-1 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-[#525252]">
            Expert counsel AI
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-600" />
          <span className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-[#525252]">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        className="flex-1 space-y-6 overflow-y-auto bg-[#f1f0ee]/40 p-6 md:space-y-8 md:p-8"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-5 md:max-w-[80%] md:p-6 ${message.role === 'user'
                ? 'rounded-tr-md bg-[#1A1A1A] text-white shadow-[0_12px_28px_rgba(16,16,26,0.12)]'
                : 'rounded-tl-md border border-[#eceae7] bg-white text-[#10101A] shadow-[0_2px_12px_rgba(16,16,26,0.04)]'
                }`}
            >
              <p className="whitespace-pre-wrap text-[0.9375rem] leading-[160%]">{message.content}</p>
              <div
                className={`mt-3 text-[0.625rem] font-medium uppercase tracking-[0.12em] ${message.role === 'user' ? 'text-white/45' : 'text-[#525252]'
                  }`}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-2xl rounded-tl-md border border-[#eceae7] bg-white p-5 shadow-[0_2px_12px_rgba(16,16,26,0.04)] md:max-w-[80%] md:p-6">
              <div className="flex items-center space-x-1">
                <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#10101A]/25" />
                <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#10101A]/25 delay-75" />
                <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#10101A]/25 delay-150" />
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="border-t border-[#e7e7ea] bg-white p-6 md:p-8">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your legal request..."
            className="flex-1 rounded-[0.875rem] border border-[#e7e5e1] bg-[#f1f0ee] p-4 text-[0.9375rem] text-[#10101A] transition-all placeholder:text-[#525252] focus:border-[#d4d2ce] focus:outline-none focus:ring-2 focus:ring-[#10101A]/8"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`rounded-[0.875rem] bg-[#1A1A1A] p-4 text-white shadow-[0_10px_24px_rgba(16,16,26,0.15)] transition-all hover:brightness-110 ${isLoading || !input.trim() ? 'cursor-not-allowed opacity-50' : ''
              }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
        <p className="mt-4 text-center text-[0.625rem] font-medium uppercase tracking-[0.14em] text-[#525252]">
          Powered by AIForLawyers intelligence
        </p>
      </form>
    </div>
  );
} 