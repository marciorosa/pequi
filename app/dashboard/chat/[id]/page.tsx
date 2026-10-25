'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function ChatRedirect() {
  const router = useRouter();
  const params = useParams();
  const chatId = params.id as string;

  useEffect(() => {
    // Simply redirect to the main chat page
    // The chat page will load the specific chat based on the URL parameter
    router.push('/dashboard/chat');
    
    // We could also pass the chat ID as a query parameter if needed
    // router.push(`/dashboard/chat?id=${chatId}`);
  }, [chatId, router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-black text-white">
      <div className="flex flex-col items-center">
        <div className="flex space-x-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-white/70 animate-pulse"></div>
          <div className="w-3 h-3 rounded-full bg-white/70 animate-pulse delay-100"></div>
          <div className="w-3 h-3 rounded-full bg-white/70 animate-pulse delay-200"></div>
        </div>
        <p className="text-white/50">Loading chat...</p>
      </div>
    </div>
  );
} 