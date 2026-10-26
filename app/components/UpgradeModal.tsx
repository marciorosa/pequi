'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose, title, description }) => {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Blurred Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-xl transition-all duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300 border border-gray-100">
        <div className="flex flex-col items-center text-center">
          {/* Icon */}
          <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white mb-8 shadow-xl">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.83-5.83m-4.25 4.25L5.25 11.42a2.652 2.652 0 003.75-3.75l4.25 4.25m-4.25-4.25L21 3m-4.25 4.25L17.25 3M3 21l4.25-4.25M3 3l18 18" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-4 leading-tight">
            {title || "Recurso Premium"}
          </h2>
          
          <p className="text-foreground/50 text-sm mb-10 leading-relaxed font-medium">
            {description || (
              <>
                Este recurso não está incluído no seu plano atual.<br/>
                Faça upgrade para o Pro para acessá-lo.
              </>
            )}
          </p>

          <div className="flex flex-col w-full gap-3">
            <button
              onClick={() => router.push('/dashboard/billing')}
              className="w-full py-4 bg-foreground text-white rounded-2xl font-bold text-[11px] uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Fazer upgrade para o Pro
            </button>
            <button
              onClick={onClose}
              className="w-full py-4 bg-gray-50 text-foreground/40 rounded-2xl font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-gray-100 transition-all"
            >
              Talvez depois
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;
