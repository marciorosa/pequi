'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AgreementFormatter from '@/app/components/AgreementFormatter';
import { Spinner } from '@/app/components/ui/spinner';

interface AgreementData {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  documentType?: string;
  templateStyle?: string;
}

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function AgreementPage({ params }: Props) {
  const [id, setId] = useState<string>('');
  const [agreement, setAgreement] = useState<AgreementData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const initializeId = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };
    initializeId();
  }, [params]);

  useEffect(() => {
    if (!id) return;

    const fetchAgreement = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // First try to get from localStorage
        const savedHistory = localStorage.getItem('AIForLawyers_documentHistory');
        const history = savedHistory ? JSON.parse(savedHistory) : [];

        // Find the agreement in recent docs
        const recentDoc = history.find((doc: { id: string }) => doc.id === id);

        if (recentDoc) {
          // Try to load saved agreement result
          const savedResult = localStorage.getItem('AIForLawyers_lastAgreementResult');
          if (savedResult) {
            const agreementResult = JSON.parse(savedResult);
            setAgreement(agreementResult);
            setIsLoading(false);
            return;
          }
        }

        // If not found in localStorage, try to fetch from API
        const response = await fetch(`/api/documents/${id}`);

        if (!response.ok) {
          throw new Error(`Falha ao carregar o contrato: ${response.statusText}`);
        }

        const data = await response.json();
        setAgreement(data);
      } catch (err) {
        console.error('Error fetching agreement:', err);
        setError('Não foi possível carregar o contrato. Ele pode ter expirado ou sido excluído.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgreement();
  }, [id]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-castanha-50">
        <Spinner size="lg" />
        <span className="ml-3 text-foreground/60 font-medium">Carregando documento...</span>
      </div>
    );
  }

  if (error || !agreement) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-castanha-50">
        <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl p-6 mb-6 max-w-lg text-center shadow-sm">
          <svg className="w-12 h-12 text-red-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div className="font-semibold text-lg mb-1">{error || 'Contrato não encontrado'}</div>
          <p className="text-red-500/80 text-sm">O documento que você procura não está disponível.</p>
        </div>
        <button
          onClick={() => router.push('/dashboard/docs')}
          className="px-6 py-2.5 text-white rounded-lg transition-all shadow-md font-medium btn-primary-gradient"
        >
          Voltar para Documentos
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-castanha-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <button
            onClick={() => router.push('/dashboard/docs')}
            className="text-foreground/60 hover:text-foreground flex items-center gap-2 transition-colors font-medium group"
          >
            <div className="bg-white p-2 rounded-full border border-castanha-200 shadow-sm group-hover:border-castanha-300 transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            Voltar para Documentos
          </button>

          <div className="text-foreground/50 text-sm bg-white px-4 py-2 rounded-full border border-castanha-100 shadow-sm">
            <span className="font-medium text-foreground/70 mr-1">Created:</span> {new Date(agreement.createdAt).toLocaleString()}
          </div>
        </div>

        {agreement.documentType && agreement.templateStyle && (
          <div className="mb-8 flex items-center gap-3 text-xs">
            <span className="px-3 py-1.5 text-white rounded-full font-medium shadow-sm btn-primary-gradient">{agreement.documentType}</span>
            <span className="px-3 py-1.5 bg-white border border-castanha-200 text-foreground/70 rounded-full font-medium shadow-sm">{agreement.templateStyle}</span>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl border border-castanha-100 overflow-hidden">
          <AgreementFormatter agreement={agreement} />
        </div>
      </div>
    </div>
  );
}