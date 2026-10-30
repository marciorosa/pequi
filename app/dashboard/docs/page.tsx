'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../components/DashboardLayout';
import documentService from '../../services/documentService';
import UpgradeModal from '../../components/UpgradeModal';
import { toast } from 'react-hot-toast';
import jsPDF from 'jspdf';

interface AnalysisResult { text?: string; title?: string; summary?: string; }
interface ChangeItem { type: string; section?: string; content?: string; original?: string; modified?: string; explanation?: string; }
interface ComparisonResult { summary?: string; changes?: ChangeItem[]; }
interface AgreementResult { text?: string; title?: string; }
interface TranslationResult { summary?: string; text?: string; }
interface OcrResult { text?: string; }

type DocTool =
   | 'agreement-summary'
   | 'compare-agreements'
   | 'create-agreement-light'
   | 'document-translation'
   | 'create-agreement-pro'
   | 'image-to-text';

interface DocHistoryItem {
   id: string;
   title: string;
   type: string;
   timestamp: Date;
}

// DocToolButton component
interface DocToolButtonProps {
   title: string;
   description: string;
   icon: React.ReactNode;
   isActive: boolean;
   isPro?: boolean;
   onClick: () => void;
}

const DocToolButton: React.FC<DocToolButtonProps> = ({ title, description, icon, isActive, isPro, onClick }) => {
   return (
      <button
         onClick={onClick}
         className={`w-full rounded-[1.5rem] p-6 text-left relative transition-all duration-300 ${isActive
            ? 'bg-white border-castanha-200 shadow-xl ring-1 ring-pequi-500/5'
            : 'bg-castanha-50 hover:bg-white border-transparent hover:border-castanha-200 hover:shadow-lg'
            }`}
      >
         <div className="flex items-start">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 transition-all ${isActive
               ? 'btn-primary-gradient'
               : 'bg-cerrado-950/5 text-ink/40 group-hover:bg-cerrado-950/10'
               }`}>
               <div className="scale-110">
                  {icon}
               </div>
            </div>
             <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                   <h3 className={`font-medium text-lg leading-tight tracking-tight ${isActive ? 'text-ink' : 'text-castanha-800'}`}>{title}</h3>
                   {isPro && (
                      <span className="bg-cerrado-900 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-[0.2em] border border-white/10">
                         PRO
                      </span>
                   )}
                </div>
                <p className={`text-[0.9rem] font-medium leading-relaxed opacity-60 ${isActive ? 'text-castanha-600' : 'text-castanha-600'}`}>{description}</p>
             </div>
         </div>
         {isActive && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-3/5 bg-hero-gradient rounded-r-full"></div>
         )}
      </button>
   );
};

// Reusable file drop component
const FileDropZone = ({
   label,
   onFilesSelected,
   accept = "*",
   multiple = false
}: {
   label?: string;
   onFilesSelected: (files: File[]) => void;
   accept?: string;
   multiple?: boolean;
}) => {
   const [isDragging, setIsDragging] = useState(false);
   const fileInputRef = useRef<HTMLInputElement>(null);

   const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
   };

   const handleDragLeave = () => {
      setIsDragging(false);
   };

   const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
         const fileList = e.dataTransfer.files;
         const files = multiple ? Array.from(fileList) : [fileList[0]];
         onFilesSelected(files);
      }
   };

   const handleClick = () => {
      if (fileInputRef.current) {
         fileInputRef.current.click();
      }
   };

   const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
         const fileList = e.target.files;
         const files = multiple ? Array.from(fileList) : [fileList[0]];
         onFilesSelected(files);
      }
   };

   return (
      <div
         className={`border-2 border-dashed ${isDragging ? 'border-cerrado-900 bg-cerrado-950/5' : 'border-castanha-200 bg-castanha-50'} rounded-[2rem] p-16 flex flex-col items-center justify-center hover:bg-white hover:border-cerrado-900/20 hover:shadow-2xl transition-all duration-500 cursor-pointer group relative overflow-hidden`}
         onDragOver={handleDragOver}
         onDragLeave={handleDragLeave}
         onDrop={handleDrop}
         onClick={handleClick}
      >
         {/* Architectural Pattern Background */}
         <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
            <svg width="100%" height="100%">
               <pattern id="grid-docs" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="black" strokeWidth="0.5" />
               </pattern>
               <rect width="100%" height="100%" fill="url(#grid-docs)" />
            </svg>
         </div>

         <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            accept={accept}
            multiple={multiple}
         />
         <div className="w-20 h-20 rounded-[1.5rem] bg-white mb-6 flex items-center justify-center group-hover:scale-110 group-hover:bg-cerrado-900 group-hover:text-white transition-all duration-500 shadow-xl border border-castanha-200 relative z-10">
            <svg className="w-10 h-10 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
         </div>
         <p className="text-ink text-xl font-medium mb-2 relative z-10 tracking-tight">Enviar documento</p>
         <p className="text-castanha-600 text-sm opacity-60 relative z-10 font-medium tracking-tight">Arraste e solte o arquivo ou <span className="underline text-ink decoration-black/20">procure no seu computador</span></p>
         {label && <div className="text-ink/20 text-[10px] font-bold uppercase tracking-[0.3em] mt-8 relative z-10">{label}</div>}
      </div>
   );
};

// Reusable content container
const ContentContainer = ({ children }: { children: React.ReactNode }) => (
   <div className="bg-white rounded-[2.5rem] p-10 border border-castanha-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
      {children}
   </div>
);

const templateOptionsByType: Record<string, string[]> = {
   "Locação Imobiliária": [
      "Locação Imobiliária Padrão",
      "Locação Comercial",
      "Locação Residencial",
      "Locação para Temporada"
   ],
   "Contrato de Trabalho": [
      "Contrato de Trabalho Padrão",
      "Contrato de Trabalho de Executivo",
      "Contrato com Prestador Autônomo",
      "Termo de Compromisso de Estágio"
   ],
   "Acordo de Confidencialidade": [
      "NDA Padrão",
      "NDA Mútuo",
      "NDA para Funcionários",
      "NDA para Fornecedores"
   ],
   "Contrato de Prestação de Serviços": [
      "Serviços Profissionais",
      "Contrato de Consultoria",
      "Contrato de Manutenção",
      "Software como Serviço (SaaS)"
   ],
   "Contrato de Sociedade": [
      "Sociedade em Nome Coletivo",
      "Sociedade em Comandita",
      "Contrato de Joint Venture",
      "Sociedade em Conta de Participação"
   ],
   "Contrato de Compra e Venda": [
      "Contrato de Compra de Mercadorias",
      "Compra de Ativos",
      "Contrato de Venda a Prazo",
      "Contrato de Compra e Venda Internacional"
   ]
};

export default function DocumentGenerationPage() {
   const [,] = useState<DocHistoryItem[]>([]);
   const [selectedTool, setSelectedTool] = useState<DocTool>('agreement-summary');
   const [recentDocuments, setRecentDocuments] = useState<DocHistoryItem[]>([]);

   // Document processing states
   const [isProcessing, setIsProcessing] = useState(false);
   const [analysisResult, setAnalysisResult] = useState<unknown>(null);
   const [comparisonResult, setComparisonResult] = useState<unknown>(null);
   const [translationResult, setTranslationResult] = useState<unknown>(null);
   const [ocrResult, setOcrResult] = useState<unknown>(null);
   const [firstDocument, setFirstDocument] = useState<File | null>(null);
   const [secondDocument, setSecondDocument] = useState<File | null>(null);
   const [documentForTranslation, setDocumentForTranslation] = useState<File | null>(null);
   const [imageForOcr, setImageForOcr] = useState<File | null>(null);
   const [sourceLanguage, setSourceLanguage] = useState("auto");
   const [targetLanguage, setTargetLanguage] = useState("english");
   const [compareType, setCompareType] = useState<'all' | 'changes' | 'additions' | 'removals'>('all');
   const [preserveFormatting, setPreserveFormatting] = useState(true);
   const [includeLegalGlossary, setIncludeLegalGlossary] = useState(true);
   const [showUpgradeModal, setShowUpgradeModal] = useState(false);

   const router = useRouter();

   // Form state for Create Agreement Light
   const [parties, setParties] = useState("");
   const [purpose, setPurpose] = useState("");
   const [obligations, setObligations] = useState("");
   const [consequences, setConsequences] = useState("");
   const [dates, setDates] = useState("");
   const [jurisdiction, setJurisdiction] = useState("");
   const [signingMethod, setSigningMethod] = useState("");
   const [language, setLanguage] = useState("");

   // Pro form state
   const [documentType, setDocumentType] = useState("Locação Imobiliária");
   const [templateStyle, setTemplateStyle] = useState("Locação Imobiliária Padrão");
   const [referenceDocument, setReferenceDocument] = useState<File | null>(null);
   const [specialRequirements, setSpecialRequirements] = useState("");
   const [templateOptions, setTemplateOptions] = useState([
      "Locação Imobiliária Padrão",
      "Locação Comercial",
      "Locação Residencial",
      "Locação para Temporada"
   ]);

   // Template options by document type


   // Update template options when document type changes
   useEffect(() => {
      const options = templateOptionsByType[documentType] || [];
      setTemplateOptions(options);
      // Set the first template option as default when document type changes
      if (options.length > 0) {
         setTemplateStyle(options[0]);
      }
   }, [documentType]);

   // Add a ref for the dropdown
   const historyDropdownRef = useRef<HTMLDivElement>(null);

   // First, add a new state for the history dropdown visibility
   const [isHistoryOpen, setIsHistoryOpen] = useState(false);

   // First, add a new state variable to store the agreement result
   const [agreementResult, setAgreementResult] = useState<unknown>(null);

   // Fetch document history on component mount
   useEffect(() => {
      // Load recent documents from localStorage
      const loadSavedData = () => {
         try {
            // Load document history
            const savedHistory = localStorage.getItem('AIForLawyers_documentHistory');
            if (savedHistory) {
               const parsedHistory = JSON.parse(savedHistory);
               // Convert string dates back to Date objects
               const historyWithDates = parsedHistory.map((doc: Record<string, unknown>) => ({
                  ...doc,
                  timestamp: new Date(doc.timestamp as string)
               }));
               setRecentDocuments(historyWithDates);
            }

            // Load last analysis result if available
            const savedAnalysisResult = localStorage.getItem('AIForLawyers_lastAnalysisResult');
            if (savedAnalysisResult) {
               setAnalysisResult(JSON.parse(savedAnalysisResult));
            }

            // Load last comparison result if available
            const savedComparisonResult = localStorage.getItem('AIForLawyers_lastComparisonResult');
            if (savedComparisonResult) {
               setComparisonResult(JSON.parse(savedComparisonResult));
            }

            // Load last translation result if available
            const savedTranslationResult = localStorage.getItem('AIForLawyers_lastTranslationResult');
            if (savedTranslationResult) {
               setTranslationResult(JSON.parse(savedTranslationResult));
            }

            // Load last OCR result if available
            const savedOcrResult = localStorage.getItem('AIForLawyers_lastOcrResult');
            if (savedOcrResult) {
               setOcrResult(JSON.parse(savedOcrResult));
            }
         } catch (error) {
            console.error('Error loading saved data:', error);
         }
      };

      // Fetch document history from API
      const fetchDocumentHistory = async () => {
         try {
            const history = await documentService.getDocumentHistory();
            if (history && history.length > 0) {
               // Update state and localStorage
               setRecentDocuments(history);
               localStorage.setItem('AIForLawyers_documentHistory', JSON.stringify(history));
            }
         } catch (error) {
            console.error('Error fetching document history:', error);
            // If API fails, we'll still have data from localStorage
         }
      };

      // First load data from localStorage (faster)
      loadSavedData();
      // Then fetch from API (might take time)
      fetchDocumentHistory();
   }, []);

   // Add a useEffect for handling clicks outside the dropdown
   useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
         if (historyDropdownRef.current && !historyDropdownRef.current.contains(event.target as Node)) {
            setIsHistoryOpen(false);
         }
      }

      // Only add the event listener if the dropdown is open
      if (isHistoryOpen) {
         document.addEventListener('mousedown', handleClickOutside);
      }
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [isHistoryOpen]);

   // Handle document analysis
   const handleDocumentAnalysis = async (files: File[]) => {
      if (!files.length) return;

      const file = files[0];
      setIsProcessing(true);
      setAnalysisResult(null);

      try {
         // Show loading toast with progress indicator
         toast.loading('Analisando documento...', {
            id: 'analysis',
            duration: Infinity // Keep toast until we explicitly dismiss it
         });

         const result = await documentService.analyzeDocument(file);
         setAnalysisResult(result);

         // Save analysis result to localStorage
         localStorage.setItem('AIForLawyers_lastAnalysisResult', JSON.stringify(result));

         // Add to recent documents
         const newDoc = {
            id: Date.now().toString(),
            title: file.name,
            type: file.name.split('.').pop()?.toUpperCase() || 'UNKNOWN',
            timestamp: new Date()
         };

         // Update recent documents and persist to localStorage
         const updatedDocs = [newDoc, ...recentDocuments.slice(0, 4)];
         setRecentDocuments(updatedDocs);
         localStorage.setItem('AIForLawyers_documentHistory', JSON.stringify(updatedDocs));

         // Dismiss loading toast and show success
         toast.dismiss('analysis');
         toast.success('Análise do documento concluída!', {
            id: 'analysis-success',
            duration: 5000
         });
      } catch (error: any) {
         console.error('Error analyzing document:', error);
         toast.dismiss('analysis');

         const status = error.response?.status || error.status;
         const message = error.response?.data?.message || error.message || '';
         const isUpgradeRequired = status === 403 || status === 402 ||
                                   message.toLowerCase().includes('upgrade') ||
                                   message.toLowerCase().includes('plan');

         if (isUpgradeRequired) {
            setShowUpgradeModal(true);
         } else {
            toast.error(message || 'Falha ao analisar o documento. Tente novamente.', {
               id: 'analysis-error',
               duration: 8000
            });
         }
      } finally {
         setIsProcessing(false);
      }
   };

   // Handle document comparison
   const handleDocumentComparison = async () => {
      if (!firstDocument || !secondDocument) {
         toast.error('Envie os dois documentos para a comparação');
         return;
      }

      setIsProcessing(true);
      setComparisonResult(null);

      try {
         toast.loading('Comparando documentos...', { id: 'comparison' });

         const result = await documentService.compareDocuments(firstDocument, secondDocument, {
            compareType
         });

         // Process the response from Gemini
         // The API returns HTML in the 'text' field that needs to be converted to structured data
         const processedResult = {
            success: result.success,
            summary: extractSummaryFromHTML(result.text),
            changes: extractChangesFromHTML(result.text),
            text: result.text // Keep the original text too
         };

         setComparisonResult(processedResult);

         // Save comparison result to localStorage
         localStorage.setItem('AIForLawyers_lastComparisonResult', JSON.stringify(processedResult));

         // Add to recent documents
         const newDoc = {
            id: Date.now().toString(),
            title: `Comparison: ${firstDocument.name} & ${secondDocument.name}`,
            type: 'COMPARISON',
            timestamp: new Date()
         };

         // Update recent documents and persist to localStorage
         const updatedDocs = [newDoc, ...recentDocuments.slice(0, 4)];
         setRecentDocuments(updatedDocs);
         localStorage.setItem('AIForLawyers_documentHistory', JSON.stringify(updatedDocs));

         toast.success('Comparação de documentos concluída!', { id: 'comparison' });
      } catch (error: any) {
         console.error('Error comparing documents:', error);
         toast.dismiss('comparison');
         
         const status = error.response?.status || error.status;
         const message = error.response?.data?.message || error.message || '';
         const isUpgradeRequired = status === 403 || status === 402 || 
                                   message.toLowerCase().includes('upgrade') || 
                                   message.toLowerCase().includes('plan');

         if (isUpgradeRequired) {
            setShowUpgradeModal(true);
         } else {
            toast.error(message || 'Falha ao comparar os documentos. Tente novamente.', { id: 'comparison' });
         }
      } finally {
         setIsProcessing(false);
      }
   };

   // Helper function to extract summary from HTML response
   const extractSummaryFromHTML = (html: string): string => {
      try {
         // Extract summary section (likely the first section after the main heading)
         let summary = '';

         // Try to find a summary section by common patterns - without using 's' flag
         const summaryMatch = html.match(/<h[2-3]>(?:Summary|Summary of Changes|Overview)[^<]*<\/h[2-3]>\s*(?:<p>)?([\s\S]*?)(?:<\/p>|<h[2-3]>)/i);
         if (summaryMatch && summaryMatch[1]) {
            summary = summaryMatch[1].trim();

            // Clean up HTML tags
            summary = summary.replace(/<\/?[^>]+(>|$)/g, '');

            // If summary is too short, try to get more content
            if (summary.length < 50) {
               const moreContent = html.split(/<h[2-3]>/)[1]?.split(/<h[2-3]>/)[0];
               if (moreContent && moreContent.length > summary.length) {
                  summary = moreContent.replace(/<\/?[^>]+(>|$)/g, '').trim();
               }
            }
         } else {
            // If no summary section found, take the first paragraph - without using 's' flag
            const firstParagraph = html.match(/<p>([\s\S]*?)<\/p>/);
            if (firstParagraph && firstParagraph[1]) {
               summary = firstParagraph[1].trim();
            } else {
               // If still no match, take the beginning of the text
               const text = html.replace(/<\/?[^>]+(>|$)/g, '');
               summary = text.substring(0, 300) + (text.length > 300 ? '...' : '');
            }
         }

         return summary;
      } catch (error) {
         console.error('Error extracting summary:', error);
         return 'Não foi possível extrair o resumo. Veja a comparação completa.';
      }
   };

   // Helper function to extract changes from HTML response
   const extractChangesFromHTML = (html: string): ChangeItem[] => {
      try {
         const changes: ChangeItem[] = [];

         // Look for patterns that indicate changes, additions, or removals
         const sections = html.split(/<h[2-4]>/i);

         // Process each section
         for (let i = 1; i < sections.length; i++) {
            const section = sections[i];

            // Skip the summary section which we already processed
            if (section.toLowerCase().includes('summary') || section.toLowerCase().includes('overview')) {
               continue;
            }

            // Extract section title
            const titleMatch = section.match(/^(.*?)<\/h[2-4]>/i);
            if (!titleMatch) continue;

            const title = titleMatch[1].trim();

            // Extract content
            let content = section.substring(titleMatch[0].length).trim();

            // Clean up HTML tags but preserve line breaks
            content = content.replace(/<\/p>\s*<p>/g, '\n\n');
            content = content.replace(/<li>/g, '• ');
            content = content.replace(/<\/li>/g, '\n');
            content = content.replace(/<\/?[^>]+(>|$)/g, '');
            content = content.replace(/\n{3,}/g, '\n\n').trim();

            // Determine the type of change
            let type = 'modification';
            if (title.toLowerCase().includes('addition') || content.toLowerCase().includes('added')) {
               type = 'addition';
            } else if (title.toLowerCase().includes('removal') || content.toLowerCase().includes('removed')) {
               type = 'removal';
            }

            changes.push({
               type,
               section: title,
               content
            });
         }

         // If no structured changes were found, create a generic entry
         if (changes.length === 0) {
            const cleanContent = html.replace(/<\/?[^>]+(>|$)/g, '')
               .replace(/\s+/g, ' ')
               .trim();

            changes.push({
               type: 'modification',
               section: 'Alterações',
               content: cleanContent.substring(0, 1000) + (cleanContent.length > 1000 ? '...' : '')
            });
         }

         return changes;
      } catch (error) {
         console.error('Error extracting changes:', error);
         return [{
            type: 'error',
            section: 'Erro',
            content: 'Não foi possível extrair as alterações detalhadas. Veja o resumo acima.'
         }];
      }
   };

   // Handle document translation
   const handleDocumentTranslation = async () => {
      if (!documentForTranslation) {
         toast.error('Envie um documento para tradução');
         return;
      }

      setIsProcessing(true);
      setTranslationResult(null);

      try {
         toast.loading('Traduzindo documento...', { id: 'translation' });

         const result = await documentService.translateDocument(documentForTranslation, {
            sourceLanguage,
            targetLanguage,
            preserveFormatting,
            includeLegalGlossary
         });

         setTranslationResult(result);

         // Save translation result to localStorage
         localStorage.setItem('AIForLawyers_lastTranslationResult', JSON.stringify(result));

         // Add to recent documents
         const newDoc = {
            id: Date.now().toString(),
            title: `Tradução: ${documentForTranslation.name} (${sourceLanguage} → ${targetLanguage})`,
            type: 'TRANSLATION',
            timestamp: new Date()
         };

         // Update recent documents and persist to localStorage
         const updatedDocs = [newDoc, ...recentDocuments.slice(0, 4)];
         setRecentDocuments(updatedDocs);
         localStorage.setItem('AIForLawyers_documentHistory', JSON.stringify(updatedDocs));

         toast.success('Tradução do documento concluída!', { id: 'translation' });
      } catch (error: any) {
         console.error('Error translating document:', error);
         toast.dismiss('translation');
         
         const status = error.response?.status || error.status;
         const message = error.response?.data?.message || error.message || '';
         const isUpgradeRequired = status === 403 || status === 402 || 
                                   message.toLowerCase().includes('upgrade') || 
                                   message.toLowerCase().includes('plan');

         if (isUpgradeRequired) {
            setShowUpgradeModal(true);
         } else {
            toast.error(message || 'Falha ao traduzir o documento. Tente novamente.', { id: 'translation' });
         }
      } finally {
         setIsProcessing(false);
      }
   };

   // Handle OCR (image to text)
   const handleImageToText = async (files: File[]) => {
      if (!files.length) return;

      const file = files[0];

      // Validate file is an image
      if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
         toast.error('Envie um arquivo de imagem (JPG, PNG, PDF etc.)');
         return;
      }

      setImageForOcr(file);
      setIsProcessing(true);
      setOcrResult(null);

      try {
         toast.loading('Extraindo texto da imagem...', { id: 'ocr' });

         const result = await documentService.extractTextFromImage(file, {
            preserveLayout: true,
            enhancedAccuracy: true
         });

         setOcrResult(result);

         // Save OCR result to localStorage
         localStorage.setItem('AIForLawyers_lastOcrResult', JSON.stringify(result));

         // Add to recent documents
         const newDoc = {
            id: Date.now().toString(),
            title: `OCR: ${file.name}`,
            type: 'OCR',
            timestamp: new Date()
         };

         // Update recent documents and persist to localStorage
         const updatedDocs = [newDoc, ...recentDocuments.slice(0, 4)];
         setRecentDocuments(updatedDocs);
         localStorage.setItem('AIForLawyers_documentHistory', JSON.stringify(updatedDocs));

         toast.success('Extração de texto concluída!', { id: 'ocr' });
      } catch (error: any) {
         console.error('Error extracting text from image:', error);
         toast.dismiss('ocr');
         
         const status = error.response?.status || error.status;
         const message = error.response?.data?.message || error.message || '';
         const isUpgradeRequired = status === 403 || status === 402 || 
                                   message.toLowerCase().includes('upgrade') || 
                                   message.toLowerCase().includes('plan');

         if (isUpgradeRequired) {
            setShowUpgradeModal(true);
         } else {
            toast.error(message || 'Falha ao extrair o texto. Tente novamente.', { id: 'ocr' });
         }
      } finally {
         setIsProcessing(false);
      }
   };

   // Handle agreement creation (light version)
   const handleCreateAgreementLight = async () => {
      if (!parties || !purpose) {
         toast.error('Preencha todos os campos obrigatórios');
         return;
      }

      setIsProcessing(true);
      setAgreementResult(null); // Reset any previous result

      try {
         toast.loading('Criando contrato...', { id: 'create-agreement' });

         const data = {
            parties,
            purpose,
            obligations,
            consequences,
            dates,
            jurisdiction,
            signingMethod,
            language
         };

         const result = await documentService.createAgreement(data, {
            title: purpose ? `Contrato: ${purpose.substring(0, 30)}` : 'Novo contrato',
            templateType: 'basic'
         });

         // Set the agreement result to display it
         setAgreementResult(result);

         // Add to recent documents
         const newDoc = {
            id: Date.now().toString(),
            title: result.title || 'Novo contrato',
            type: 'DOCX',
            timestamp: new Date()
         };

         setRecentDocuments(prev => [newDoc, ...prev.slice(0, 4)]);

         toast.success('Contrato criado com sucesso!', { id: 'create-agreement' });
      } catch (error: any) {
         console.error('Error creating agreement:', error);
         toast.dismiss('create-agreement');
         
         const status = error.response?.status || error.status;
         const message = error.response?.data?.message || error.message || '';
         const isUpgradeRequired = status === 403 || status === 402 || 
                                   message.toLowerCase().includes('upgrade') || 
                                   message.toLowerCase().includes('plan');

         if (isUpgradeRequired) {
            setShowUpgradeModal(true);
         } else {
            toast.error(message || 'Falha ao criar o contrato. Tente novamente.', { id: 'create-agreement' });
         }
      } finally {
         setIsProcessing(false);
      }
   };

   // Format date for display
   const formatDate = (date: Date) => {
      return new Intl.DateTimeFormat('pt-BR', {
         month: 'short',
         day: 'numeric',
         year: 'numeric'
      }).format(date);
   };

   const getPageTitle = () => {
      switch (selectedTool) {
         case 'agreement-summary':
            return 'Análise de documentos';
         case 'compare-agreements':
            return 'Comparação de documentos';
         case 'create-agreement-light':
            return 'Criador de contratos simples';
         case 'document-translation':
            return 'Tradução de documentos';
         case 'image-to-text':
            return 'Conversão de imagem em texto';
         default:
            return 'Documentos';
      }
   };

   const getDocumentTools = () => {
      const handleToolChange = (tool: DocTool) => {
         // Check if processing
         if (isProcessing) {
            if (!confirm("Um documento está sendo processado. Tem certeza de que deseja trocar de ferramenta?")) {
               return;
            }
         }

         // Check if there's unsaved work
         if (
            (selectedTool === 'create-agreement-light' && (parties || purpose || obligations)) ||
            (selectedTool === 'compare-agreements' && (firstDocument || secondDocument)) ||
            (selectedTool === 'document-translation' && documentForTranslation) ||
            (selectedTool === 'create-agreement-pro' && (specialRequirements || referenceDocument)) ||
            (selectedTool === 'image-to-text' && imageForOcr)
         ) {
            if (!confirm("Você tem trabalho não salvo. Tem certeza de que deseja trocar de ferramenta?")) {
               return;
            }
         }

         // Set the selected tool
         setSelectedTool(tool);

         // Load the appropriate stored result based on the selected tool
         switch (tool) {
            case 'agreement-summary':
               // If stored analysis exists but not loaded, load it
               if (!analysisResult) {
                  const savedAnalysisResult = localStorage.getItem('AIForLawyers_lastAnalysisResult');
                  if (savedAnalysisResult) {
                     setAnalysisResult(JSON.parse(savedAnalysisResult));
                  }
               }
               break;
            case 'compare-agreements':
               // If stored comparison exists but not loaded, load it
               if (!comparisonResult) {
                  const savedComparisonResult = localStorage.getItem('AIForLawyers_lastComparisonResult');
                  if (savedComparisonResult) {
                     setComparisonResult(JSON.parse(savedComparisonResult));
                  }
               }
               break;
            case 'document-translation':
               // If stored translation exists but not loaded, load it
               if (!translationResult) {
                  const savedTranslationResult = localStorage.getItem('AIForLawyers_lastTranslationResult');
                  if (savedTranslationResult) {
                     setTranslationResult(JSON.parse(savedTranslationResult));
                  }
               }
               break;
            case 'image-to-text':
               // If stored OCR result exists but not loaded, load it
               if (!ocrResult) {
                  const savedOcrResult = localStorage.getItem('AIForLawyers_lastOcrResult');
                  if (savedOcrResult) {
                     setOcrResult(JSON.parse(savedOcrResult));
                  }
               }
               break;
            default:
               break;
         }
      };

      return (
         <div className="grid grid-cols-1 gap-3">
            <DocToolButton
               title="Análise de documentos"
               description="Extraia informações-chave de contratos e documentos jurídicos"
               icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
               </svg>}
               isActive={selectedTool === 'agreement-summary'}
               onClick={() => handleToolChange('agreement-summary')}
            />

            <DocToolButton
               title="Comparação de documentos"
               description="Compare documentos para identificar diferenças e semelhanças"
               icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
               </svg>}
               isActive={selectedTool === 'compare-agreements'}
               onClick={() => handleToolChange('compare-agreements')}
            />

            <DocToolButton
               title="Criador de contratos simples"
               description="Crie contratos simples com assistência guiada"
               icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
               </svg>}
               isActive={selectedTool === 'create-agreement-light'}
               onClick={() => handleToolChange('create-agreement-light')}
            />

            <DocToolButton
               title="Tradução de documentos"
               description="Traduza documentos jurídicos preservando a terminologia jurídica"
               icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
               </svg>}
               isActive={selectedTool === 'document-translation'}
               onClick={() => handleToolChange('document-translation')}
            />

            <DocToolButton
               title="Redação profissional de documentos"
               description="Crie documentos jurídicos sofisticados com modelos profissionais"
               icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
               </svg>}
               isActive={selectedTool === 'create-agreement-pro'}
               isPro={true}
               onClick={() => handleToolChange('create-agreement-pro')}
            />

            <DocToolButton
               title="Imagem em texto"
               description="Extraia texto de imagens, documentos digitalizados e fotos"
               icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
               </svg>}
               isActive={selectedTool === 'image-to-text'}
               onClick={() => handleToolChange('image-to-text')}
            />
         </div>
      );
   };

   const renderAgreementSummary = () => {
      return (
         <div className="space-y-8">
            <ContentContainer>
               <h2 className="text-foreground text-xl font-medium mb-8 pb-4 border-b border-castanha-100">Análise de documentos</h2>
               <div className="mb-6">
                  <p className="text-foreground/70 mb-8">
                     Envie um documento jurídico para analisar seu conteúdo e extrair as informações-chave. Nossa IA identificará cláusulas, obrigações,
                     partes, datas e possíveis problemas jurídicos.
                  </p>
                  <FileDropZone
                     label="Suporta PDF, DOCX, DOC, TXT (máx. 25 MB)"
                     onFilesSelected={handleDocumentAnalysis}
                     accept=".pdf,.docx,.doc,.txt"
                  />
               </div>

               {isProcessing && selectedTool === 'agreement-summary' && (
                  <div className="mt-8 p-6 border border-castanha-100 rounded-lg bg-castanha-50/50">
                     <div className="flex items-center justify-center">
                        <div className="w-10 h-10 border-t-2 border-foreground/30 rounded-full animate-spin mr-3"></div>
                        <p className="text-foreground/80">Analisando documento...</p>
                     </div>
                  </div>
               )}

               {!!analysisResult && !isProcessing && (
                  <div className="mt-8 p-6 border border-castanha-100 rounded-lg bg-castanha-50/30">
                     <h3 className="text-foreground text-lg font-medium mb-4">Resultados da análise</h3>

                     <div className="space-y-6">
                        {/* Document Summary */}
                        <div>
                           <h4 className="text-foreground/90 font-medium mb-2">Resumo do documento</h4>
                           <div
                              className="text-foreground/70 formatted-content"
                              dangerouslySetInnerHTML={{ __html: formatAnalysisText((analysisResult as AnalysisResult).text) || "Nenhum resumo disponível" }}
                           />
                        </div>

                        {/* Download and Chat Buttons */}
                        <div className="mt-6 pt-4 border-t border-castanha-100 flex flex-wrap gap-3">
                           <button
                              className="px-6 py-2 bg-castanha-100 hover:bg-castanha-200 border border-castanha-200 rounded-lg text-foreground transition-all duration-300 flex items-center shadow-sm"
                              onClick={() => {
                                 toast.loading('Gerando PDF...', { id: 'pdf-generate' });

                                 try {
                                    // Create a new PDF document
                                    const pdf = new jsPDF({
                                       orientation: 'portrait',
                                       unit: 'mm',
                                       format: 'a4'
                                    });

                                    // Set document properties
                                    pdf.setProperties({
                                       title: 'Relatório de Análise de Documento',
                                       subject: 'Análise de Documento Jurídico',
                                       author: 'Pequi',
                                       creator: 'Análise de Documentos Pequi'
                                    });

                                    // Define margins and dimensions
                                    const pageWidth = pdf.internal.pageSize.getWidth();
                                    const pageHeight = pdf.internal.pageSize.getHeight();
                                    const margin = 20; // 20mm margins
                                    const contentWidth = pageWidth - (margin * 2);
                                    let y = margin; // Starting y position

                                    // Add title
                                    pdf.setFont("helvetica", "bold");
                                    pdf.setFontSize(24);
                                    pdf.setTextColor(0, 0, 0);

                                    const title = 'RELATÓRIO DE ANÁLISE DE DOCUMENTO';
                                    const titleWidth = pdf.getStringUnitWidth(title) * 24 / pdf.internal.scaleFactor;
                                    const titleX = (pageWidth - titleWidth) / 2;
                                    pdf.text(title, titleX, y);
                                    y += 10;

                                    // Add decorative line
                                    pdf.setDrawColor(0, 114, 255);
                                    pdf.setLineWidth(1);
                                    pdf.line(pageWidth / 2 - 30, y, pageWidth / 2 + 30, y);
                                    y += 15;

                                    // Function to add a new page
                                    const addNewPage = () => {
                                       pdf.addPage();
                                       y = margin;

                                       // Reset text properties for consistent appearance
                                       pdf.setFont("helvetica", "normal");
                                       pdf.setFontSize(12);
                                       pdf.setTextColor(0, 0, 0);

                                       // Add page footer
                                       const footerY = pageHeight - 10;
                                       pdf.setFont("helvetica", "normal");
                                       pdf.setFontSize(10);
                                       pdf.setTextColor(80, 80, 80); // Darker gray for better readability
                                       pdf.text(`Pequi | Análise de Documento | Gerado em ${new Date().toLocaleDateString('pt-BR')}`, margin, footerY, { align: 'center' });

                                       return margin;
                                    };

                                    // Document Summary Header
                                    pdf.setFont("helvetica", "bold");
                                    pdf.setFontSize(18);
                                    pdf.setTextColor(0, 0, 0);
                                    pdf.text("Resumo do Documento", margin, y);
                                    y += 8;

                                    // Section divider
                                    pdf.setDrawColor(200, 200, 200);
                                    pdf.setLineWidth(0.5);
                                    pdf.line(margin, y, pageWidth - margin, y);
                                    y += 10;

                                    // Process HTML content
                                    const processedContent = (analysisResult as AnalysisResult).text || "Nenhum resumo disponível";

                                    // Preprocess the text to handle asterisks before parsing
                                    const preprocessedContent = (() => {
                                       // Process line by line for asterisks and other special formatting
                                       const lines = processedContent.split('\n');
                                       const processedLines = lines.map((line: string) => {
                                          // Skip standalone asterisks on their own lines
                                          if (/^\s*\*+\s*$/.test(line)) {
                                             return '';
                                          }

                                          // Remove asterisks at beginning of lines
                                          let processedLine = line.replace(/^\s*\*+\s*/, '');

                                          // Remove emphasis asterisks (bold formatting)
                                          processedLine = processedLine.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
                                          processedLine = processedLine.replace(/\*([^*\n]+)\*/g, '<strong>$1</strong>');

                                          return processedLine;
                                       }).filter((line: string) => line !== null && line !== undefined && line.trim() !== '');

                                       return processedLines.join('\n');
                                    })();

                                    // Create a DOM parser and parse the HTML
                                    const parser = new DOMParser();
                                    const htmlDoc = parser.parseFromString(preprocessedContent, 'text/html');

                                    // Set regular text font
                                    pdf.setFont("helvetica", "normal");
                                    pdf.setFontSize(12);
                                    pdf.setTextColor(0, 0, 0);

                                    // Helper function to add text with word wrap
                                    function addWrappedText(text: string, x: number, currentY: number, maxWidth: number, lineHeight: number): number {
                                       if (!text || text.trim() === '') return currentY;

                                       // Reset text color to ensure consistency across pages
                                       pdf.setTextColor(0, 0, 0);

                                       // Clean the text of HTML
                                       const cleanText = text.replace(/<\/?[^>]+(>|$)/g, "").trim();
                                       if (cleanText === '') return currentY;

                                       const words = cleanText.split(' ');
                                       let line = '';
                                       let newY = currentY;

                                       for (let i = 0; i < words.length; i++) {
                                          const testLine = line + words[i] + ' ';
                                          const testWidth = pdf.getStringUnitWidth(testLine) * pdf.getFontSize() / pdf.internal.scaleFactor;

                                          if (testWidth > maxWidth) {
                                             pdf.text(line, x, newY);
                                             line = words[i] + ' ';
                                             newY += lineHeight;

                                             // Check if we need a new page
                                             if (newY >= pageHeight - margin) {
                                                newY = addNewPage();
                                             }
                                          } else {
                                             line = testLine;
                                          }
                                       }

                                       // Output the last line
                                       if (line.trim()) {
                                          pdf.text(line, x, newY);
                                          newY += lineHeight;
                                       }

                                       return newY;
                                    }

                                    // Function to process DOM nodes and render them to PDF
                                    function processNode(node: Node, currentY: number, level: number = 0): number {
                                       let y = currentY;

                                       // Check if we need a new page
                                       if (y > pageHeight - margin - 20) {
                                          y = addNewPage();
                                       }

                                       // Process different node types
                                       if (node.nodeType === Node.TEXT_NODE) {
                                          // Only process non-empty text nodes
                                          const text = node.textContent?.trim();
                                          if (text && text.length > 0) {
                                             y = addWrappedText(text, margin + (level * 5), y, contentWidth, 6);
                                             y += 2;
                                          }
                                       } else if (node.nodeType === Node.ELEMENT_NODE) {
                                          const element = node as Element;
                                          const tagName = element.tagName.toLowerCase();

                                          // Handle different HTML elements
                                          switch (tagName) {
                                             case 'h1':
                                             case 'h2':
                                             case 'h3':
                                                y += 6; // Add space before heading
                                                pdf.setFont("helvetica", "bold");
                                                pdf.setTextColor(0, 0, 0); // Ensure solid black color for headings
                                                if (tagName === 'h1') pdf.setFontSize(18);
                                                else if (tagName === 'h2') pdf.setFontSize(16);
                                                else pdf.setFontSize(14);

                                                y = addWrappedText(element.textContent || '', margin, y, contentWidth, 7);
                                                y += 5; // Add space after heading

                                                pdf.setFont("helvetica", "normal");
                                                pdf.setFontSize(12);
                                                pdf.setTextColor(0, 0, 0); // Reset to black
                                                break;

                                             case 'p':
                                                // Skip if this is an empty paragraph
                                                if (element.textContent?.trim()) {
                                                   pdf.setTextColor(0, 0, 0); // Ensure black text for paragraphs
                                                   y = addWrappedText(element.textContent || '', margin + (level * 5), y, contentWidth - (level * 5), 6);
                                                   y += 5; // Add space after paragraph
                                                }
                                                break;

                                             case 'strong':
                                             case 'b':
                                                pdf.setFont("helvetica", "bold");
                                                pdf.setTextColor(0, 0, 0); // Ensure black text for bold
                                                y = addWrappedText(element.textContent || '', margin + (level * 5), y, contentWidth - (level * 5), 6);
                                                pdf.setFont("helvetica", "normal");
                                                pdf.setTextColor(0, 0, 0); // Reset to black
                                                break;

                                             case 'em':
                                             case 'i':
                                                pdf.setFont("helvetica", "italic");
                                                y = addWrappedText(element.textContent || '', margin + (level * 5), y, contentWidth - (level * 5), 6);
                                                pdf.setFont("helvetica", "normal");
                                                break;

                                             case 'ul':
                                             case 'ol':
                                                y += 3; // Space before list
                                                // Process each list item
                                                for (let i = 0; i < element.children.length; i++) {
                                                   const li = element.children[i];
                                                   if (li.tagName.toLowerCase() === 'li') {
                                                      // Check if we need a new page
                                                      if (y > pageHeight - margin - 20) {
                                                         y = addNewPage();
                                                      }

                                                      // Add bullet or number
                                                      pdf.setFont("helvetica", "normal");
                                                      pdf.setTextColor(0, 0, 0); // Ensure solid black for list markers
                                                      if (tagName === 'ul') {
                                                         pdf.text('•', margin + (level * 5), y);
                                                         y = processChildNodes(li, y, level + 1);
                                                      } else {
                                                         pdf.text(`${i + 1}.`, margin + (level * 5), y);
                                                         y = processChildNodes(li, y, level + 1);
                                                      }
                                                      y += 3; // Space between list items
                                                   }
                                                }
                                                y += 3; // Space after list
                                                break;

                                             case 'li':
                                                // List items are handled in ul/ol processing
                                                y = processChildNodes(element, y, level);
                                                break;

                                             default:
                                                // Process child nodes for other elements
                                                y = processChildNodes(element, y, level);
                                                break;
                                          }
                                       }

                                       return y;
                                    }

                                    // Helper to process child nodes
                                    function processChildNodes(element: Element, currentY: number, level: number): number {
                                       let y = currentY;

                                       // Special case for list items - add indent
                                       const isListItem = element.tagName.toLowerCase() === 'li';
                                       const indent = isListItem ? 10 : 0;

                                       // If element has no child nodes but has text content
                                       if (element.childNodes.length === 0 && element.textContent) {
                                          return addWrappedText(
                                             element.textContent,
                                             margin + (level * 5) + indent,
                                             y,
                                             contentWidth - (level * 5) - indent,
                                             6
                                          );
                                       }

                                       // Process each child node
                                       for (let i = 0; i < element.childNodes.length; i++) {
                                          const child = element.childNodes[i];

                                          // Skip empty text nodes
                                          if (child.nodeType === Node.TEXT_NODE && (!child.textContent || child.textContent.trim() === '')) {
                                             continue;
                                          }

                                          // Text nodes in list items need special handling for indentation
                                          if (isListItem && child.nodeType === Node.TEXT_NODE) {
                                             y = addWrappedText(
                                                child.textContent || '',
                                                margin + (level * 5) + indent,
                                                y,
                                                contentWidth - (level * 5) - indent,
                                                6
                                             );
                                          } else {
                                             y = processNode(child, y, level);
                                          }
                                       }

                                       return y;
                                    }

                                    // Process the entire document
                                    const mainContent = htmlDoc.body;
                                    y = processNode(mainContent, y);

                                    // Add footer to all pages
                                    const totalPages = pdf.getNumberOfPages();
                                    for (let i = 1; i <= totalPages; i++) {
                                       pdf.setPage(i);
                                       pdf.setFont("helvetica", "normal");
                                       pdf.setFontSize(10);
                                       pdf.setTextColor(80, 80, 80); // Darker gray for better readability
                                       pdf.text(`Pequi | Análise de Documento | Gerado em ${new Date().toLocaleDateString('pt-BR')}`, margin, pageHeight - margin);
                                       pdf.text(`Página ${i} de ${totalPages}`, pageWidth - margin, pageHeight - margin, { align: 'right' });
                                    }

                                    // Save the PDF
                                    pdf.save('document-analysis.pdf');
                                    toast.success('PDF gerado com sucesso!', { id: 'pdf-generate' });
                                 } catch (error) {
                                    console.error('Error generating PDF:', error);
                                    toast.error('Falha ao gerar o PDF. Tente novamente.', { id: 'pdf-generate' });
                                 }
                              }}
                           >
                              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                              Baixar análise
                           </button>

                           <button
                              className="px-6 py-2 rounded-lg transition-all duration-300 flex items-center shadow-md btn-primary-gradient"
                              onClick={() => {
                                 // Save analysis to localStorage to share with chat page
                                 localStorage.setItem('AIForLawyers_chatContext', JSON.stringify({
                                    source: 'document_analysis',
                                    content: (analysisResult as AnalysisResult).text,
                                    documentTitle: (analysisResult as AnalysisResult).title || 'Análise de documento'
                                 }));

                                 // Redirect to the chat page instead of the specific lawyer page
                                 router.push('/dashboard/chat');
                              }}
                           >
                              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                              </svg>
                              Conversar sobre este conteúdo
                           </button>
                        </div>
                     </div>
                  </div>
               )}
            </ContentContainer>

            {recentDocuments.length > 0 && (
               <ContentContainer>
                  <h2 className="text-foreground text-xl font-medium mb-6 pb-4 border-b border-castanha-100">Documentos analisados recentemente</h2>
                  <div className="space-y-3">
                     {recentDocuments.map(doc => (
                        <div key={doc.id} className="flex items-center justify-between p-4 border border-castanha-100 rounded-lg hover:bg-castanha-50 transition-all bg-white shadow-sm">
                           <div className="flex items-center">
                              <div className="w-10 h-10 bg-castanha-50 rounded-full flex items-center justify-center mr-4 border border-castanha-100">
                                 {/* Show different icons based on document type */}
                                 {doc.type === 'COMPARISON' ? (
                                    <svg className="w-5 h-5 text-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                 ) : doc.type === 'TRANSLATION' ? (
                                    <svg className="w-5 h-5 text-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                    </svg>
                                 ) : doc.type === 'OCR' ? (
                                    <svg className="w-5 h-5 text-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                 ) : (
                                    <svg className="w-5 h-5 text-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                 )}
                              </div>
                              <div>
                                 <h3 className="text-foreground text-lg font-medium">{doc.title}</h3>
                                 <p className="text-foreground/50 text-sm">{({ COMPARISON: 'COMPARAÇÃO', TRANSLATION: 'TRADUÇÃO', OCR: 'OCR', 'Advanced Agreement': 'Contrato avançado' } as Record<string, string>)[doc.type] ?? doc.type} • {formatDate(doc.timestamp)}</p>
                              </div>
                           </div>
                           <button className="text-foreground/70 hover:text-foreground p-2 transition-colors rounded-full hover:bg-castanha-100"
                              onClick={() => {
                                 // Set the appropriate tool and load the result
                                 if (doc.type === 'PDF' || doc.type === 'DOCX' || doc.type === 'DOC' || doc.type === 'TXT') {
                                    setSelectedTool('agreement-summary');
                                    // Attempt to load from localStorage
                                    const savedResult = localStorage.getItem('AIForLawyers_lastAnalysisResult');
                                    if (savedResult) setAnalysisResult(JSON.parse(savedResult));
                                 } else if (doc.type === 'COMPARISON') {
                                    setSelectedTool('compare-agreements');
                                    const savedResult = localStorage.getItem('AIForLawyers_lastComparisonResult');
                                    if (savedResult) setComparisonResult(JSON.parse(savedResult));
                                 } else if (doc.type === 'TRANSLATION') {
                                    setSelectedTool('document-translation');
                                    const savedResult = localStorage.getItem('AIForLawyers_lastTranslationResult');
                                    if (savedResult) setTranslationResult(JSON.parse(savedResult));
                                 } else if (doc.type === 'OCR') {
                                    setSelectedTool('image-to-text');
                                    const savedResult = localStorage.getItem('AIForLawyers_lastOcrResult');
                                    if (savedResult) setOcrResult(JSON.parse(savedResult));
                                 }
                              }}
                           >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                           </button>
                        </div>
                     ))}
                  </div>
               </ContentContainer>
            )}
         </div>
      );
   };

   const renderCompareAgreements = () => {
      return (
         <div className="space-y-8">
            <ContentContainer>
               <h2 className="text-foreground text-xl font-medium mb-8 pb-4 border-b border-castanha-100">Comparação de documentos</h2>
               <div className="mb-6">
                  <p className="text-foreground/70 mb-8">
                     Compare dois documentos jurídicos para identificar diferenças, alterações e semelhanças. Esta ferramenta ajuda você a acompanhar revisões,
                     negociar contratos e garantir que todas as alterações sejam devidamente revisadas.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div>
                        <h3 className="text-foreground mb-4 font-medium">Primeiro documento</h3>
                        <FileDropZone
                           label="Versão original ou anterior"
                           onFilesSelected={(files) => {
                              if (files.length) {
                                 setFirstDocument(files[0]);
                                 toast.success(`Primeiro documento enviado: ${files[0].name}`);
                              }
                           }}
                           accept=".pdf,.docx,.doc,.txt"
                        />
                        {firstDocument && (
                           <div className="mt-2 text-foreground/70 text-sm flex items-center">
                              <svg className="w-4 h-4 mr-2 text-cerrado-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              {firstDocument.name}
                           </div>
                        )}
                     </div>

                     <div>
                        <h3 className="text-foreground mb-4 font-medium">Segundo documento</h3>
                        <FileDropZone
                           label="Versão nova ou modificada"
                           onFilesSelected={(files) => {
                              if (files.length) {
                                 setSecondDocument(files[0]);
                                 toast.success(`Segundo documento enviado: ${files[0].name}`);
                              }
                           }}
                           accept=".pdf,.docx,.doc,.txt"
                        />
                        {secondDocument && (
                           <div className="mt-2 text-foreground/70 text-sm flex items-center">
                              <svg className="w-4 h-4 mr-2 text-cerrado-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              {secondDocument.name}
                           </div>
                        )}
                     </div>
                  </div>

                  <div className="mt-8">
                     <h3 className="text-foreground mb-4 font-medium">Opções de comparação</h3>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <button
                           className={`p-3 rounded-lg border ${compareType === 'all' ? 'btn-primary-gradient border-transparent text-white' : 'border-castanha-100 bg-castanha-50 text-foreground'} text-center shadow-sm transition-all`}
                           onClick={() => setCompareType('all')}
                        >
                           <span>Todas as alterações</span>
                        </button>
                        <button
                           className={`p-3 rounded-lg border ${compareType === 'changes' ? 'btn-primary-gradient border-transparent text-white' : 'border-castanha-100 bg-castanha-50 text-foreground'} text-center shadow-sm transition-all`}
                           onClick={() => setCompareType('changes')}
                        >
                           <span>Modificações</span>
                        </button>
                        <button
                           className={`p-3 rounded-lg border ${compareType === 'additions' ? 'btn-primary-gradient border-transparent text-white' : 'border-castanha-100 bg-castanha-50 text-foreground'} text-center shadow-sm transition-all`}
                           onClick={() => setCompareType('additions')}
                        >
                           <span>Inclusões</span>
                        </button>
                        <button
                           className={`p-3 rounded-lg border ${compareType === 'removals' ? 'btn-primary-gradient border-transparent text-white' : 'border-castanha-100 bg-castanha-50 text-foreground'} text-center shadow-sm transition-all`}
                           onClick={() => setCompareType('removals')}
                        >
                           <span>Remoções</span>
                        </button>
                     </div>
                  </div>

                  <div className="mt-8">
                     <button
                        className={`w-full py-3 rounded-lg text-white font-medium transition-all duration-300 ${firstDocument && secondDocument
                           ? 'btn-primary-gradient shadow-md'
                           : 'bg-castanha-200 cursor-not-allowed text-castanha-400 opacity-50'
                           }`}
                        onClick={handleDocumentComparison}
                        disabled={!firstDocument || !secondDocument}
                     >
                        Comparar documentos
                     </button>
                  </div>
               </div>

               {isProcessing && selectedTool === 'compare-agreements' && (
                  <div className="mt-8 p-6 border border-castanha-100 rounded-lg bg-castanha-50/50">
                     <div className="flex items-center justify-center">
                        <div className="w-10 h-10 border-t-2 border-foreground/30 rounded-full animate-spin mr-3"></div>
                        <p className="text-foreground/80">Comparando documentos...</p>
                     </div>
                  </div>
               )}

               {!!comparisonResult && !isProcessing && (
                  <div className="mt-8 p-6 border border-castanha-100 rounded-lg bg-castanha-50/30">
                     <h3 className="text-foreground text-lg font-medium mb-4">Resultados da comparação</h3>

                     <div className="space-y-6">
                        {/* Document Summary */}
                        <div>
                           <h4 className="text-foreground/90 font-medium mb-2">Resumo das alterações</h4>
                           {(comparisonResult as ComparisonResult).summary ? (
                              <div className="text-foreground/70 space-y-2 whitespace-pre-wrap">
                                 {(comparisonResult as ComparisonResult).summary}
                              </div>
                           ) : (
                              <div className="text-white/70">
                                 Nenhum resumo disponível. Tente comparar os documentos novamente.
                              </div>
                           )}
                        </div>

                        {/* Changes */}
                        {(comparisonResult as ComparisonResult).changes && (
                           <div>
                              <h4 className="text-foreground/90 font-medium mb-2">Alterações detalhadas</h4>
                              <div className="mt-4 space-y-4">
                                 {(comparisonResult as ComparisonResult).changes!.map((change: ChangeItem, index: number) => (
                                    <div key={index} className="p-3 rounded-lg bg-white border border-castanha-100 shadow-sm">
                                       <div className="flex items-center mb-2">
                                          <span className={`px-2 py-1 text-xs rounded-md mr-2 ${change.type === 'addition' ? 'bg-cerrado-900/60 text-cerrado-200' :
                                             change.type === 'removal' ? 'bg-red-900/60 text-red-200' :
                                                'bg-pequi-900/60 text-pequi-200'
                                             }`}>
                                             {change.type === 'addition' ? 'Incluído' :
                                                change.type === 'removal' ? 'Removido' : 'Modificado'}
                                          </span>
                                          <span className="text-foreground/60 text-sm">
                                             {change.section && `Section: ${change.section}`}
                                          </span>
                                       </div>
                                       <div className="text-foreground/80 whitespace-pre-wrap">{change.content}</div>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        )}

                        {/* Download Comparison Button */}
                        <div className="mt-6 pt-4 border-t border-castanha-100">
                           <button
                              className="px-6 py-2 bg-castanha-100 hover:bg-castanha-200 border border-castanha-200 rounded-lg text-foreground transition-all duration-300 flex items-center shadow-sm"
                              onClick={() => {
                                 toast.loading('Gerando PDF...', { id: 'pdf-generate' });

                                 try {
                                    // Create a new PDF document
                                    const pdf = new jsPDF({
                                       orientation: 'portrait',
                                       unit: 'mm',
                                       format: 'a4'
                                    });

                                    // Set document properties
                                    pdf.setProperties({
                                       title: 'Relatório de Comparação de Documentos',
                                       subject: 'Comparação de Documentos Jurídicos',
                                       author: 'Pequi',
                                       creator: 'Comparação de Documentos Pequi'
                                    });

                                    // Define margins and dimensions
                                    const pageWidth = pdf.internal.pageSize.getWidth();
                                    const pageHeight = pdf.internal.pageSize.getHeight();
                                    const margin = 20; // 20mm margins
                                    const contentWidth = pageWidth - (margin * 2);
                                    let y = margin; // Starting y position

                                    // Add title
                                    pdf.setFont("helvetica", "bold");
                                    pdf.setFontSize(24);
                                    pdf.setTextColor(0, 0, 0);

                                    const title = 'RELATÓRIO DE COMPARAÇÃO DE DOCUMENTOS';
                                    const titleWidth = pdf.getStringUnitWidth(title) * 24 / pdf.internal.scaleFactor;
                                    const titleX = (pageWidth - titleWidth) / 2;
                                    pdf.text(title, titleX, y);
                                    y += 15;

                                    // Add documents compared
                                    pdf.setFont("helvetica", "bold");
                                    pdf.setFontSize(14);
                                    pdf.text("Documentos comparados:", margin, y);
                                    y += 7;

                                    pdf.setFont("helvetica", "normal");
                                    pdf.setFontSize(12);

                                    if (firstDocument) {
                                       pdf.text(`1. ${firstDocument.name}`, margin + 5, y);
                                       y += 6;
                                    }

                                    if (secondDocument) {
                                       pdf.text(`2. ${secondDocument.name}`, margin + 5, y);
                                       y += 12;
                                    }

                                    // Add comparison type
                                    pdf.setFont("helvetica", "bold");
                                    pdf.setFontSize(14);
                                    pdf.text("Tipo de comparação:", margin, y);
                                    y += 7;

                                    pdf.setFont("helvetica", "normal");
                                    pdf.setFontSize(12);
                                    pdf.text(({ all: 'Todas', changes: 'Modificações', additions: 'Inclusões', removals: 'Remoções' } as Record<string, string>)[compareType] ?? compareType, margin + 5, y);
                                    y += 12;

                                    // Add summary section
                                    pdf.setFont("helvetica", "bold");
                                    pdf.setFontSize(16);
                                    pdf.text("Resumo das Alterações", margin, y);
                                    y += 10;

                                    // Add summary content
                                    pdf.setFont("helvetica", "normal");
                                    pdf.setFontSize(12);

                                    if ((comparisonResult as ComparisonResult).summary) {
                                       // Add wrapped text
                                       const lines = pdf.splitTextToSize((comparisonResult as ComparisonResult).summary || "", contentWidth);

                                       // Check if adding these lines would exceed page height
                                       if (y + (lines.length * 5) > pageHeight - margin) {
                                          pdf.addPage();
                                          y = margin;
                                       }

                                       pdf.text(lines, margin, y);
                                       y += (lines.length * 5) + 10;
                                    } else {
                                       pdf.text("Nenhum resumo disponível", margin, y);
                                       y += 10;
                                    }

                                    // Add detailed changes section
                                    if ((comparisonResult as ComparisonResult).changes && (comparisonResult as ComparisonResult).changes!.length > 0) {
                                       pdf.setFont("helvetica", "bold");
                                       pdf.setFontSize(16);

                                       // Check if we need a new page
                                       if (y > pageHeight - margin - 40) {
                                          pdf.addPage();
                                          y = margin;
                                       }

                                       pdf.text("Alterações Detalhadas", margin, y);
                                       y += 10;

                                       // Process each change
                                       (comparisonResult as ComparisonResult).changes!.forEach((change: ChangeItem, index: number) => {
                                          // Check if we need a new page
                                          if (y > pageHeight - margin - 40) {
                                             pdf.addPage();
                                             y = margin;
                                          }

                                          // Change header
                                          pdf.setFont("helvetica", "bold");
                                          pdf.setFontSize(12);

                                          // Set color based on change type
                                          if (change.type === 'addition') {
                                             pdf.setTextColor(0, 100, 0); // Dark green
                                          } else if (change.type === 'removal') {
                                             pdf.setTextColor(150, 0, 0); // Dark red
                                          } else {
                                             pdf.setTextColor(150, 100, 0); // Dark yellow/amber
                                          }

                                          // Create change header with section and type
                                          const typeText = change.type === 'addition' ? 'INCLUÍDO' :
                                             change.type === 'removal' ? 'REMOVIDO' : 'MODIFICADO';

                                          const headerText = `${index + 1}. ${change.section ? `${change.section} - ` : ''}${typeText}`;
                                          pdf.text(headerText, margin, y);
                                          y += 6;

                                          // Reset text color for content
                                          pdf.setTextColor(0, 0, 0);
                                          pdf.setFont("helvetica", "normal");

                                          // Add change content with word wrap
                                          if (change.content) {
                                             const contentLines = pdf.splitTextToSize(change.content, contentWidth - 5);

                                             // Check if adding these lines would exceed page height
                                             if (y + (contentLines.length * 5) > pageHeight - margin) {
                                                pdf.addPage();
                                                y = margin;
                                             }

                                             pdf.text(contentLines, margin + 5, y);
                                             y += (contentLines.length * 5) + 8;
                                          }
                                       });
                                    }

                                    // Add page numbers and footer to all pages
                                    const totalPages = pdf.getNumberOfPages();
                                    for (let i = 1; i <= totalPages; i++) {
                                       pdf.setPage(i);
                                       pdf.setFont("helvetica", "normal");
                                       pdf.setFontSize(10);
                                       pdf.setTextColor(80, 80, 80); // Darker gray for better readability
                                       pdf.text(`Pequi | Comparação de Documentos | Gerado em ${new Date().toLocaleDateString('pt-BR')}`, margin, pageHeight - margin);
                                       pdf.text(`Página ${i} de ${totalPages}`, pageWidth - margin, pageHeight - margin, { align: 'right' });
                                    }

                                    // Save the PDF
                                    pdf.save('document-comparison.pdf');
                                    toast.success('PDF gerado com sucesso!', { id: 'pdf-generate' });
                                 } catch (error) {
                                    console.error('Error generating PDF:', error);
                                    toast.error('Falha ao gerar o PDF. Tente novamente.', { id: 'pdf-generate' });
                                 }
                              }}
                           >
                              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                              Baixar comparação
                           </button>
                        </div>
                     </div>
                  </div>
               )}
            </ContentContainer>
         </div>
      );
   };

   const renderCreateAgreementLight = () => {
      return (
         <div className="space-y-8">
            <ContentContainer>
               <h2 className="text-foreground text-xl font-medium mb-8 pb-4 border-b border-castanha-100">Criador de contratos simples</h2>
               <p className="text-foreground/70 mb-8">
                  Crie um contrato simples informando os dados principais. Esta ferramenta ajuda você a redigir contratos simples,
                  acordos e cartas rapidamente, sem precisar de conhecimento jurídico.
               </p>

               <form onSubmit={(e) => {
                  e.preventDefault();
                  handleCreateAgreementLight();
               }} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <label className="block mb-2 text-sm text-foreground/80 font-medium">Partes do contrato*</label>
                        <textarea
                           className="w-full bg-castanha-50 border border-castanha-200 rounded-lg p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-castanha-200 min-h-[100px]"
                           placeholder="Informe os nomes de todas as partes envolvidas"
                           value={parties}
                           onChange={(e) => setParties(e.target.value)}
                           required
                        ></textarea>
                     </div>

                     <div>
                        <label className="block mb-2 text-sm text-foreground/80 font-medium">Objeto do contrato*</label>
                        <textarea
                           className="w-full bg-castanha-50 border border-castanha-200 rounded-lg p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-castanha-200 min-h-[100px]"
                           placeholder="Descreva a finalidade deste contrato"
                           value={purpose}
                           onChange={(e) => setPurpose(e.target.value)}
                           required
                        ></textarea>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <label className="block mb-2 text-sm text-foreground/80 font-medium">Principais obrigações</label>
                        <textarea
                           className="w-full bg-castanha-50 border border-castanha-200 rounded-lg p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-castanha-200 min-h-[100px]"
                           placeholder="O que cada parte deve fazer ou fornecer"
                           value={obligations}
                           onChange={(e) => setObligations(e.target.value)}
                        ></textarea>
                     </div>

                     <div>
                        <label className="block mb-2 text-sm text-foreground/80 font-medium">Consequências</label>
                        <textarea
                           className="w-full bg-castanha-50 border border-castanha-200 rounded-lg p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-castanha-200 min-h-[100px]"
                           placeholder="O que acontece se as obrigações não forem cumpridas"
                           value={consequences}
                           onChange={(e) => setConsequences(e.target.value)}
                        ></textarea>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <label className="block mb-2 text-sm text-foreground/80 font-medium">Datas importantes</label>
                        <textarea
                           className="w-full bg-castanha-50 border border-castanha-200 rounded-lg p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-castanha-200"
                           placeholder="Datas de início/término, prazos etc."
                           value={dates}
                           onChange={(e) => setDates(e.target.value)}
                        ></textarea>
                     </div>

                     <div>
                        <label className="block mb-2 text-sm text-foreground/80 font-medium">Lei aplicável</label>
                        <input
                           type="text"
                           className="w-full bg-castanha-50 border border-castanha-200 rounded-lg p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-castanha-200"
                           placeholder="Jurisdição (ex.: 'República Federativa do Brasil')"
                           value={jurisdiction}
                           onChange={(e) => setJurisdiction(e.target.value)}
                        />
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <label className="block mb-2 text-sm text-foreground/80 font-medium">Forma de assinatura</label>
                        <select
                           className="w-full bg-castanha-50 border border-castanha-200 rounded-lg p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-castanha-200"
                           value={signingMethod}
                           onChange={(e) => setSigningMethod(e.target.value)}
                        >
                           <option value="">Selecione a forma de assinatura</option>
                           <option value="wet-ink">Tradicional (impresso e assinado)</option>
                           <option value="e-sign">Assinatura eletrônica</option>
                           <option value="both">Ambas as opções</option>
                        </select>
                     </div>

                     <div>
                        <label className="block mb-2 text-sm text-foreground/80 font-medium">Linguagem do contrato</label>
                        <select
                           className="w-full bg-castanha-50 border border-castanha-200 rounded-lg p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-castanha-200"
                           value={language}
                           onChange={(e) => setLanguage(e.target.value)}
                        >
                           <option value="">Padrão</option>
                           <option value="simple">Linguagem simples</option>
                           <option value="legal">Terminologia jurídica</option>
                           <option value="technical">Terminologia técnica</option>
                        </select>
                     </div>
                  </div>

                  <div className="flex justify-end mt-8">
                     <button
                        type="submit"
                        disabled={isProcessing || !parties || !purpose}
                        className={`px-8 py-3 rounded-lg text-white font-medium transition-all duration-300 ${isProcessing || !parties || !purpose
                           ? 'bg-castanha-200 cursor-not-allowed text-castanha-400'
                           : 'bg-cerrado-800 hover:bg-cerrado-900 shadow-md'
                           }`}
                     >
                        {isProcessing ? 'Criando contrato...' : 'Criar contrato'}
                     </button>
                  </div>
               </form>

               {/* Display the generated agreement */}
               {!!agreementResult && !isProcessing && (
                  <div className="mt-8 p-6 border border-castanha-100 rounded-lg bg-castanha-50/30">
                     <h3 className="text-foreground text-lg font-medium mb-4">Contrato gerado</h3>

                     <div className="space-y-6">
                        {/* Agreement Content with improved formatting */}
                        <div className="bg-white p-6 rounded-lg border border-castanha-200 legal-document shadow-inner">
                           <style jsx global>{`
                    .legal-document {
                      color: rgba(30, 46, 22, 0.9);
                      font-family: var(--font-sans);
                      line-height: 1.6;
                    }
                    .legal-document h1 {
                      font-size: 1.5rem;
                      font-weight: bold;
                      text-align: center;
                      margin-bottom: 1.5rem;
                      margin-top: 1rem;
                    }
                    .legal-document h2 {
                      font-size: 1.25rem;
                      font-weight: bold;
                      margin-top: 1.5rem;
                      margin-bottom: 1rem;
                    }
                    .legal-document h3, .legal-document strong {
                      font-weight: bold;
                      margin-top: 1rem;
                      margin-bottom: 0.5rem;
                    }
                    .legal-document p {
                      margin-bottom: 1rem;
                    }
                    .legal-document ol, .legal-document ul {
                      margin-left: 1.5rem;
                      margin-bottom: 1rem;
                    }
                    .legal-document li {
                      margin-bottom: 0.5rem;
                    }
                    .legal-document .section {
                      margin-top: 1.5rem;
                      margin-bottom: 1.5rem;
                    }
                    .legal-document .section-title {
                      font-weight: bold;
                      margin-bottom: 0.5rem;
                    }
                  `}</style>

                           {/* Format the agreement content */}
                           <div className="legal-document">
                              {(() => {
                                 // Process the text to remove unwanted characters and format nicely
                                 let formattedText = (agreementResult as AgreementResult).text || "";

                                 // Remove any AI comments at the beginning (like "Here's a revised version...")
                                 formattedText = formattedText.replace(/^(This is a good starting point|Here('s| is) a|I've created a).+?\n\n/i, '');

                                 // Process the text line by line to handle all types of asterisks
                                 const lines = formattedText.split('\n');
                                 const processedLines = lines.map((line: string) => {
                                    // Skip standalone asterisks on their own lines
                                    if (/^\s*\*+\s*$/.test(line)) {
                                       return '';
                                    }

                                    // Remove asterisks at beginning of lines
                                    let processedLine = line.replace(/^\s*\*+\s*/, '');

                                    // Remove emphasis asterisks (bold formatting)
                                    processedLine = processedLine.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
                                    processedLine = processedLine.replace(/\*([^*\n]+)\*/g, '<strong>$1</strong>');

                                    return processedLine;
                                 }).filter((line: string) => line !== null);

                                 // Join the lines back
                                 formattedText = processedLines.join('\n');

                                 // Handle all forms of markdown and formatting characters
                                 // Convert underscore to italic
                                 formattedText = formattedText.replace(/_([^_\n]+)_/g, '<em>$1</em>');

                                 // Handle section headings with various formats
                                 formattedText = formattedText.replace(/^(SECTION|Article)\s+(\d+)[:.]\s*([^\n]+)/gim, '<h2>$1 $2: $3</h2>');
                                 formattedText = formattedText.replace(/(\d+)\.\s+([^:]+):/g, '<h3 class="section-title">$1. $2:</h3>');
                                 formattedText = formattedText.replace(/^([A-Z][A-Z\s]+):/gm, '<h3 class="section-title">$1:</h3>');

                                 // Create fillable areas for placeholders
                                 formattedText = formattedText.replace(/\[([^\]]+)\]/g, '<span class="placeholder-input">________________</span><span class="placeholder-text">$1</span>');

                                 // Format lists
                                 formattedText = formattedText.replace(/^\s*(\d+)\.\s+([^\n]+)/gm, '<li>$2</li>');
                                 formattedText = formattedText.replace(/(<li>.*<\/li>)/g, '<ol>$1</ol>');

                                 // Add proper spacing between sections
                                 formattedText = formattedText.replace(/\n{3,}/g, '</div><div class="section">');
                                 formattedText = formattedText.replace(/\n{2}/g, '</p><p>');
                                 formattedText = formattedText.replace(/\n/g, '<br />');

                                 // Wrap in a section div
                                 formattedText = `<div class="section"><p>${formattedText}</p></div>`;

                                 // Apply a centered title for the agreement
                                 if ((agreementResult as AgreementResult).title) {
                                    formattedText = `<h1>${(agreementResult as AgreementResult).title}</h1>${formattedText}`;
                                 }

                                 return <div dangerouslySetInnerHTML={{ __html: formattedText }} />;
                              })()}
                           </div>
                        </div>

                        {/* Single Download PDF Button */}
                        <div className="mt-6 pt-4 border-t border-castanha-100">
                           <button
                              className="px-6 py-2 bg-cerrado-800 hover:bg-cerrado-900 border border-cerrado-700 rounded-lg text-white transition-all duration-300 flex items-center shadow-md"
                              onClick={() => {
                                 toast.loading('Gerando PDF...', { id: 'pdf-generate' });

                                 try {
                                    // Create a new PDF document
                                    const pdf = new jsPDF({
                                       orientation: 'portrait',
                                       unit: 'mm',
                                       format: 'a4'
                                    });

                                    // Set document properties
                                    pdf.setProperties({
                                       title: (agreementResult as AgreementResult).title || 'Contrato Jurídico',
                                       subject: 'Documento de Contrato Jurídico',
                                       author: 'Pequi',
                                       creator: 'Criador de Documentos Pequi'
                                    });

                                    // Define margins and dimensions
                                    const pageWidth = pdf.internal.pageSize.getWidth();
                                    const pageHeight = pdf.internal.pageSize.getHeight();
                                    const margin = 20; // 20mm margins
                                    const contentWidth = pageWidth - (margin * 2);
                                    let y = margin; // Starting y position

                                    // Add title
                                    pdf.setFont("times", "bold");
                                    pdf.setFontSize(16);
                                    pdf.setTextColor(0, 0, 0);

                                    const title = (agreementResult as AgreementResult).title?.toUpperCase() || 'CONTRATO JURÍDICO';
                                    const titleWidth = pdf.getStringUnitWidth(title) * 16 / pdf.internal.scaleFactor;
                                    const titleX = (pageWidth - titleWidth) / 2;
                                    pdf.text(title, titleX, y);
                                    y += 15;

                                    // Process the text for PDF format
                                    let plainText = (agreementResult as AgreementResult).text || "";

                                    // Remove any AI comments at the beginning
                                    plainText = plainText.replace(/^(This is a good starting point|Here('s| is) a|I've created a).+?\n\n/i, '');

                                    // Strip all HTML tags before further processing
                                    plainText = plainText.replace(/<\/?[^>]+(>|$)/g, '');

                                    // Process the text line by line to handle formatting
                                    const lines = plainText.split('\n');
                                    let processedLines: string[] = [];

                                    lines.forEach((line: string) => {
                                       // Remove standalone asterisks on their own lines
                                       if (/^\s*\*+\s*$/.test(line)) {
                                          processedLines.push('');
                                          return;
                                       }

                                       // Remove asterisks at beginning and end of lines
                                       let processedLine = line.replace(/^\s*\*+\s*/, '').replace(/\s*\*+\s*$/, '');

                                       // Remove emphasis asterisks surrounding text
                                       processedLine = processedLine.replace(/\*\*([^*]+)\*\*/g, '$1');
                                       processedLine = processedLine.replace(/\*([^*\n]+)\*/g, '$1');

                                       // Create fillable lines for placeholders
                                       processedLine = processedLine.replace(/\[([^\]]+)\]/g, () => {
                                          // Return appropriate spaces based on the placeholder text length
                                          return '________________';
                                       });

                                       processedLines.push(processedLine);
                                    });

                                    // Filter out any remaining lines that consist only of asterisks
                                    processedLines = processedLines.filter((line: string) => !(/^\s*\*+\s*$/.test(line)));

                                    // Join the lines back together
                                    plainText = processedLines.join('\n');

                                    // Process for proper section formatting
                                    plainText = plainText
                                       // Make sure headings have proper spacing before and after
                                       .replace(/([A-Z][A-Z\s]+):/g, '\n\n$1:\n')
                                       // Clean up any double/triple line breaks
                                       .replace(/\n{3,}/g, '\n\n')
                                       // Ensure numbered sections maintain their numbers with the headings
                                       .replace(/\n\n(\d+)\.\s*\n\n([A-Z][A-Z\s]+):/g, '\n\n$1. $2:');

                                    // Add agreement content with word wrap
                                    pdf.setFont("times", "normal");
                                    pdf.setFontSize(12);

                                    const textLines = pdf.splitTextToSize(plainText, contentWidth);

                                    // Add text with pagination and formatting
                                    // let currentPage = 1;
                                    for (let i = 0; i < textLines.length; i++) {
                                       if (y > pageHeight - margin) {
                                          pdf.addPage();
                                          // page tracked internally
                                          y = margin;
                                       }

                                       // Check if this is a section heading (all caps followed by colon)
                                       if (/^[0-9]+\.\s*[A-Z][A-Z\s]+:/.test(textLines[i]) || /^[A-Z][A-Z\s]+:/.test(textLines[i])) {
                                          pdf.setFont("times", "bold");
                                          pdf.text(textLines[i], margin, y);
                                          pdf.setFont("times", "normal");

                                          // Add extra space after headings
                                          y += 8; // Extra space
                                       } else {
                                          pdf.text(textLines[i], margin, y);
                                          y += 6; // Regular line height
                                       }
                                    }

                                    // Add signature lines at the end
                                    if (y > pageHeight - 50) {
                                       pdf.addPage();
                                       y = margin;
                                    }

                                    y += 20; // Space before signatures

                                    // Draw signature lines
                                    pdf.line(margin, y, margin + 70, y);
                                    pdf.line(pageWidth - margin - 70, y, pageWidth - margin, y);

                                    y += 5;
                                    pdf.setFont("times", "bold");
                                    pdf.setFontSize(11);
                                    pdf.text("Assinatura", margin, y);
                                    pdf.text("Assinatura", pageWidth - margin - 70, y);

                                    y += 15;
                                    pdf.line(margin, y, margin + 70, y);
                                    pdf.line(pageWidth - margin - 70, y, pageWidth - margin, y);

                                    y += 5;
                                    pdf.text("Nome completo", margin, y);
                                    pdf.text("Nome completo", pageWidth - margin - 70, y);

                                    y += 15;
                                    pdf.line(margin, y, margin + 70, y);
                                    pdf.line(pageWidth - margin - 70, y, pageWidth - margin, y);

                                    y += 5;
                                    pdf.text("Data", margin, y);
                                    pdf.text("Data", pageWidth - margin - 70, y);

                                    // Add page numbers and footer to all pages
                                    const totalPages = pdf.getNumberOfPages();
                                    for (let i = 1; i <= totalPages; i++) {
                                       pdf.setPage(i);
                                       pdf.setFont("helvetica", "normal");
                                       pdf.setFontSize(10);
                                       pdf.setTextColor(80, 80, 80); // Darker gray for better readability
                                       pdf.text(`Pequi | Contrato Jurídico | Gerado em ${new Date().toLocaleDateString('pt-BR')}`, margin, pageHeight - margin);
                                       pdf.text(`Página ${i} de ${totalPages}`, pageWidth - margin, pageHeight - margin, { align: 'right' });
                                    }

                                    // Save the PDF
                                    pdf.save(`${(agreementResult as AgreementResult).title || 'contrato-juridico'}.pdf`);
                                    toast.success('PDF gerado com sucesso!', { id: 'pdf-generate' });
                                 } catch (error) {
                                    console.error('Error generating PDF:', error);
                                    toast.error('Falha ao gerar o PDF. Tente novamente.', { id: 'pdf-generate' });
                                 }
                              }}
                           >
                              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                              Baixar contrato (PDF)
                           </button>
                        </div>
                     </div>
                  </div>
               )}

            </ContentContainer>
         </div>
      );
   };

   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const renderCreateAgreementPro = () => {
      return (
         <div className="space-y-8">
            <ContentContainer>
               <h2 className="text-foreground text-xl font-medium mb-8 pb-4 border-b border-castanha-100">Redação avançada de documentos</h2>
               <p className="text-foreground/70 mb-8">
                  Crie documentos jurídicos sofisticados usando modelos profissionais, cláusulas personalizáveis e linguagem específica para cada jurisdição.
                  Nossa IA se adapta às suas necessidades e gera um documento jurídico completo e pronto para uso.
               </p>

               <div className="space-y-8">
                  <div>
                     <label className="block mb-2 text-sm text-foreground/80 font-medium">Tipo de documento</label>
                     <select
                        value={documentType}
                        onChange={(e) => setDocumentType(e.target.value)}
                        className="w-full bg-castanha-50 rounded-md border border-castanha-200 p-3 text-foreground focus:outline-none focus:ring-1 focus:ring-castanha-300"
                     >
                        <option value="Locação Imobiliária">Locação Imobiliária</option>
                        <option value="Contrato de Trabalho">Contrato de Trabalho</option>
                        <option value="Acordo de Confidencialidade">Acordo de Confidencialidade</option>
                        <option value="Contrato de Prestação de Serviços">Contrato de Prestação de Serviços</option>
                        <option value="Contrato de Sociedade">Contrato de Sociedade</option>
                        <option value="Contrato de Compra e Venda">Contrato de Compra e Venda</option>
                     </select>
                  </div>

                  <div>
                     <label className="block mb-2 text-sm text-foreground/80 font-medium">Estilo do modelo</label>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {templateOptions.map((template, index) => (
                           <div key={index} className="relative">
                              <input
                                 type="radio"
                                 id={`template-${index}`}
                                 name="template"
                                 checked={templateStyle === template}
                                 onChange={() => setTemplateStyle(template)}
                                 className="absolute opacity-0 w-full h-full cursor-pointer z-10"
                              />
                              <label
                                 htmlFor={`template-${index}`}
                                 className={`block p-4 border ${templateStyle === template ? 'border-cerrado-800' : 'border-castanha-200'} rounded-lg ${templateStyle === template ? 'bg-cerrado-800 text-white' : 'bg-castanha-50 text-foreground'} hover:bg-castanha-100 cursor-pointer transition-all shadow-sm`}
                              >
                                 {template}
                              </label>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <label className="block mb-2 text-sm text-foreground/80 font-medium">Enviar documento de referência (opcional)</label>
                        <FileDropZone
                           label="Para referência de estilo e terminologia"
                           onFilesSelected={(files) => {
                              if (files?.length > 0) {
                                 setReferenceDocument(files[0]);
                              }
                           }}
                           accept=".pdf,.doc,.docx,.txt"
                        />
                        {referenceDocument && (
                           <div className="mt-2 text-sm text-foreground/70 flex items-center">
                              <span className="truncate">{referenceDocument.name}</span>
                              <button
                                 onClick={() => setReferenceDocument(null)}
                                 className="ml-2 text-foreground/50 hover:text-foreground"
                              >
                                 ✕
                              </button>
                           </div>
                        )}
                     </div>

                     <div>
                        <label className="block mb-2 text-sm text-foreground/80 font-medium">Requisitos especiais</label>
                        <textarea
                           value={specialRequirements}
                           onChange={(e) => setSpecialRequirements(e.target.value)}
                           placeholder="Descreva quaisquer requisitos específicos para este documento"
                           className="w-full bg-castanha-50 rounded-md border border-castanha-200 p-3 text-foreground focus:outline-none focus:ring-1 focus:ring-castanha-300 placeholder:text-foreground/30 min-h-[120px] resize-none shadow-inner"
                        />
                     </div>
                  </div>
               </div>

               <div className="mt-8 flex justify-end">
                  <button
                     onClick={handleCreateAgreementPro}
                     disabled={isProcessing}
                     className={`px-6 py-3 bg-cerrado-800 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-castanha-400 focus:ring-offset-2 transition-all ${isProcessing ? 'opacity-70 cursor-not-allowed' : 'hover:bg-cerrado-900 shadow-md'}`}
                  >
                     {isProcessing ? 'Criando documento...' : 'Criar documento profissional'}
                  </button>
               </div>
            </ContentContainer>
         </div>
      );
   };

   const renderDocumentTranslation = () => {
      return (
         <div className="space-y-8">
            <ContentContainer>
               <h2 className="text-foreground text-xl font-medium mb-8 pb-4 border-b border-castanha-100">Tradução de documentos</h2>
               <div className="mb-6">
                  <p className="text-foreground/70 mb-8">
                     Traduza documentos jurídicos preservando a terminologia e a formatação. Nossa IA entende o contexto
                     jurídico e garante que as traduções mantenham o sentido jurídico original.
                  </p>

                  <div className="grid grid-cols-1 gap-8">
                     <div>
                        <h3 className="text-foreground mb-4 font-medium">Enviar documento</h3>
                        <FileDropZone
                           label="Documento a traduzir"
                           onFilesSelected={(files) => {
                              if (files.length) {
                                 setDocumentForTranslation(files[0]);
                                 toast.success(`Documento enviado: ${files[0].name}`);
                              }
                           }}
                           accept=".pdf,.docx,.doc,.txt"
                        />
                        {documentForTranslation && (
                           <div className="mt-2 text-foreground/70 text-sm flex items-center">
                              <svg className="w-4 h-4 mr-2 text-cerrado-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              {documentForTranslation.name}
                           </div>
                        )}
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                           <label className="block text-foreground/80 font-medium mb-2 text-sm">Idioma de origem</label>
                           <select
                              className="w-full bg-castanha-50 border border-castanha-200 rounded-lg p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-castanha-200"
                              value={sourceLanguage}
                              onChange={(e) => setSourceLanguage(e.target.value)}
                           >
                              <option value="auto">Detectar automaticamente</option>
                              <option value="english">Inglês</option>
                              <option value="spanish">Espanhol</option>
                              <option value="french">Francês</option>
                              <option value="german">Alemão</option>
                              <option value="italian">Italiano</option>
                              <option value="portuguese">Português</option>
                              <option value="chinese">Chinês</option>
                              <option value="japanese">Japonês</option>
                              <option value="korean">Coreano</option>
                              <option value="russian">Russo</option>
                              <option value="arabic">Árabe</option>
                           </select>
                        </div>

                        <div>
                           <label className="block text-foreground/80 font-medium mb-2 text-sm">Idioma de destino</label>
                           <select
                              className="w-full bg-castanha-50 border border-castanha-200 rounded-lg p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-castanha-200"
                              value={targetLanguage}
                              onChange={(e) => setTargetLanguage(e.target.value)}
                           >
                              <option value="english">Inglês</option>
                              <option value="spanish">Espanhol</option>
                              <option value="french">Francês</option>
                              <option value="german">Alemão</option>
                              <option value="italian">Italiano</option>
                              <option value="portuguese">Português</option>
                              <option value="chinese">Chinês</option>
                              <option value="japanese">Japonês</option>
                              <option value="korean">Coreano</option>
                              <option value="russian">Russo</option>
                              <option value="arabic">Árabe</option>
                           </select>
                        </div>
                     </div>

                     <div className="space-y-3">
                        <h3 className="text-foreground mb-2 font-medium">Opções de tradução</h3>

                        <div className="flex items-center">
                           <input
                              type="checkbox"
                              id="preserveFormatting"
                              className="w-4 h-4 mr-3 bg-white border border-castanha-200 rounded focus:ring-2 focus:ring-castanha-300"
                              checked={preserveFormatting}
                              onChange={() => setPreserveFormatting(!preserveFormatting)}
                           />
                           <label htmlFor="preserveFormatting" className="text-foreground/70">
                              Preservar a formatação e a estrutura do documento
                           </label>
                        </div>

                        <div className="flex items-center">
                           <input
                              type="checkbox"
                              id="legalGlossary"
                              className="w-4 h-4 mr-3 bg-white border border-castanha-200 rounded focus:ring-2 focus:ring-castanha-300"
                              checked={includeLegalGlossary}
                              onChange={() => setIncludeLegalGlossary(!includeLegalGlossary)}
                           />
                           <label htmlFor="legalGlossary" className="text-foreground/70">
                              Incluir glossário de terminologia jurídica
                           </label>
                        </div>
                     </div>

                     <div className="mt-4">
                        <button
                           className={`w-full py-3 rounded-lg text-white font-medium transition-all duration-300 ${documentForTranslation
                              ? 'bg-cerrado-800 hover:bg-cerrado-900 shadow-md'
                              : 'bg-castanha-100 cursor-not-allowed text-castanha-400'
                              }`}
                           onClick={handleDocumentTranslation}
                           disabled={!documentForTranslation}
                        >
                           Traduzir documento
                        </button>
                     </div>
                  </div>
               </div>

               {isProcessing && selectedTool === 'document-translation' && (
                  <div className="mt-8 p-6 border border-castanha-100 rounded-lg bg-castanha-50/50">
                     <div className="flex items-center justify-center">
                        <div className="w-10 h-10 border-t-2 border-foreground/30 rounded-full animate-spin mr-3"></div>
                        <p className="text-foreground/80">Traduzindo documento...</p>
                     </div>
                  </div>
               )}

               {!!translationResult && !isProcessing && (
                  <div className="mt-8 p-6 border border-castanha-100 rounded-lg bg-castanha-50/30">
                     <h3 className="text-foreground text-lg font-medium mb-4">Tradução concluída</h3>

                     <div className="space-y-6">
                        {/* Translation Summary */}
                        <div>
                           <h4 className="text-foreground/90 font-medium mb-2">Resumo da tradução</h4>
                           <p className="text-foreground/70">{(translationResult as TranslationResult).summary || "Nenhum resumo disponível"}</p>
                        </div>

                        {/* Download Translation Button */}
                        <div className="mt-6 pt-4 border-t border-castanha-100 flex flex-wrap gap-4">
                           <button
                              className="px-6 py-2 bg-castanha-100 hover:bg-castanha-200 border border-castanha-200 rounded-lg text-foreground transition-all duration-300 flex items-center shadow-sm"
                              onClick={() => {
                                 // In a real application, this would download the translated file
                                 toast.success('Baixando documento traduzido');
                              }}
                           >
                              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                              Baixar documento traduzido
                           </button>

                           {includeLegalGlossary && (
                              <button
                                 className="px-6 py-2 bg-castanha-100 hover:bg-castanha-200 border border-castanha-200 rounded-lg text-foreground transition-all duration-300 flex items-center shadow-sm"
                                 onClick={() => {
                                    // In a real application, this would download the glossary
                                    toast.success('Baixando glossário jurídico');
                                 }}
                              >
                                 <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                 </svg>
                                 Baixar glossário jurídico
                              </button>
                           )}
                        </div>
                     </div>
                  </div>
               )}
            </ContentContainer>
         </div>
      );
   };

   const renderImageToText = () => {
      return (
         <div className="space-y-8">
            <ContentContainer>
               <h2 className="text-foreground text-xl font-medium mb-8 pb-4 border-b border-castanha-100">Conversão de imagem em texto</h2>
               <div className="mb-6">
                  <p className="text-foreground/70 mb-8">
                     Extraia texto de imagens, documentos digitalizados ou fotos. Nossa IA reconhece textos impressos e manuscritos,
                     preservando o layout e a formatação quando necessário.
                  </p>

                  <div className="grid grid-cols-1 gap-8">
                     <div>
                        <h3 className="text-foreground mb-4 font-medium">Enviar imagem</h3>
                        <FileDropZone
                           label="Suporta JPG, PNG, PDF, TIFF (máx. 25 MB)"
                           onFilesSelected={handleImageToText}
                           accept=".jpg,.jpeg,.png,.pdf,.tiff,.tif"
                        />
                        {imageForOcr && (
                           <div className="mt-2 text-foreground/70 text-sm flex items-center">
                              <svg className="w-4 h-4 mr-2 text-cerrado-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              {imageForOcr.name}
                           </div>
                        )}
                     </div>
                  </div>
               </div>

               {isProcessing && selectedTool === 'image-to-text' && (
                  <div className="mt-8 p-6 border border-castanha-100 rounded-lg bg-castanha-50/50">
                     <div className="flex items-center justify-center">
                        <div className="w-10 h-10 border-t-2 border-foreground/30 rounded-full animate-spin mr-3"></div>
                        <p className="text-foreground/80">Extraindo texto da imagem...</p>
                     </div>
                  </div>
               )}

               {!!ocrResult && !isProcessing && (
                  <div className="mt-8 p-6 border border-castanha-100 rounded-lg bg-castanha-50/30">
                     <h3 className="text-foreground text-lg font-medium mb-4">Texto extraído</h3>

                     <div className="space-y-6">
                        {/* Text Content */}
                        <div className="bg-white border border-castanha-100 p-4 rounded-lg max-h-96 overflow-y-auto shadow-inner">
                           <pre className="whitespace-pre-wrap text-foreground/80 font-mono text-sm">{(ocrResult as OcrResult).text || "Nenhum texto extraído"}</pre>
                        </div>

                        {/* Download Options */}
                        <div className="mt-6 pt-4 border-t border-castanha-100 flex flex-wrap gap-4">
                           <button
                              className="px-6 py-2 bg-castanha-100 hover:bg-castanha-200 border border-castanha-200 rounded-lg text-foreground transition-all duration-300 flex items-center shadow-sm"
                              onClick={() => {
                                 // Create a text blob with the OCR result
                                 const textBlob = new Blob([(ocrResult as OcrResult).text || ""], { type: 'text/plain' });

                                 // Create download link
                                 const url = URL.createObjectURL(textBlob);
                                 const a = document.createElement('a');
                                 a.href = url;
                                 a.download = 'extracted-text.txt';
                                 document.body.appendChild(a);
                                 a.click();
                                 document.body.removeChild(a);
                                 URL.revokeObjectURL(url);
                              }}
                           >
                              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                              Baixar como TXT
                           </button>

                           <button
                              className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all duration-300 flex items-center"
                              onClick={() => {
                                 // In a real application, this would download a Word document
                                 toast.success('Baixando como DOCX');
                              }}
                           >
                              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                              Baixar como DOCX
                           </button>

                           <button
                              className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all duration-300 flex items-center"
                              onClick={() => navigator.clipboard.writeText((ocrResult as OcrResult).text || "")}
                           >
                              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                              </svg>
                              Copiar para a área de transferência
                           </button>
                        </div>
                     </div>
                  </div>
               )}
            </ContentContainer>
         </div>
      );
   };

   const renderSelectedToolContent = () => {
      switch (selectedTool) {
         case 'agreement-summary':
            return renderAgreementSummary();
         case 'compare-agreements':
            return renderCompareAgreements();
         case 'create-agreement-light':
            return renderCreateAgreementLight();
         case 'document-translation':
            return renderDocumentTranslation();
         case 'create-agreement-pro':
            return renderCreateAgreementPro();
         case 'image-to-text':
            return renderImageToText();
         default:
            return renderAgreementSummary();
      }
   };

   // Format the analysis text to properly handle asterisks and other formatting
   const formatAnalysisText = (text: string | undefined): string => {
      if (!text) return "Nenhum resumo disponível";

      // Process the text line by line to handle all types of asterisks
      const lines = text.split('\n');
      const processedLines = lines.map((line: string) => {
         // Skip standalone asterisks on their own lines
         if (/^\s*\*+\s*$/.test(line)) {
            return '';
         }

         // Remove asterisks at beginning of lines
         let processedLine = line.replace(/^\s*\*+\s*/, '');

         // Process mid-line asterisks for emphasis/formatting - convert to proper HTML
         processedLine = processedLine.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>'); // Bold
         processedLine = processedLine.replace(/\*([^*\n]+)\*/g, '<strong>$1</strong>');  // Also bold

         return processedLine;
      }).filter((line: string) => line !== null && line !== undefined);

      // Join the lines back together
      let formattedText = processedLines.join('\n');

      // Convert newlines to <br> tags for HTML rendering
      formattedText = formattedText.replace(/\n/g, '<br />');

      // Create fillable lines for placeholders
      formattedText = formattedText.replace(/\[([^\]]+)\]/g, '<span class="placeholder-input">________________</span><span class="placeholder-text">$1</span>');

      return formattedText;
   };

   // Handle advanced agreement creation
   const handleCreateAgreementPro = async () => {
      if (!documentType || !templateStyle) {
         toast.error('Selecione o tipo de documento e o estilo do modelo');
         return;
      }

      setIsProcessing(true);
      toast.loading('Criando seu documento profissional...', { id: 'create-pro' });

      try {
         // Use document service for advanced document creation with Gemini
         const result = await documentService.createAdvancedDocument({
            documentType,
            templateStyle,
            specialRequirements,
            referenceDocument: referenceDocument || undefined
         });

         setAgreementResult(result);

         // Save to document history
         const newDoc = {
            id: Date.now().toString(),
            title: `${documentType} - Profissional`,
            type: 'Advanced Agreement',
            timestamp: new Date()
         };

         // Update recent documents and persist to localStorage
         const updatedDocs = [newDoc, ...recentDocuments.slice(0, 4)];
         setRecentDocuments(updatedDocs);
         localStorage.setItem('AIForLawyers_documentHistory', JSON.stringify(updatedDocs));

         toast.success('Documento criado com sucesso!', { id: 'create-pro' });

         // Navigate to document viewer
         router.push(`/dashboard/agreements/${newDoc.id}`);
      } catch (error: any) {
         console.error('Error creating professional document:', error);
         toast.dismiss('create-pro');
         
         const status = error.response?.status || error.status;
         const message = error.response?.data?.message || error.message || '';
         const isUpgradeRequired = status === 403 || status === 402 || 
                                   message.toLowerCase().includes('upgrade') || 
                                   message.toLowerCase().includes('plan');

         if (isUpgradeRequired) {
            setShowUpgradeModal(true);
         } else {
            toast.error(message || 'Falha ao criar o documento. Tente novamente.', { id: 'create-pro' });
         }
      } finally {
         setIsProcessing(false);
      }
   };

   return (
      <DashboardLayout 
         title={getPageTitle()}
         actions={
            <button 
               onClick={() => setShowUpgradeModal(true)}
               className="px-4 py-2 bg-pequi-100 hover:bg-pequi-200 text-pequi-900 text-[10px] font-bold rounded-lg uppercase tracking-wider transition-all flex items-center shadow-sm border border-pequi-200"
            >
               <svg className="w-3.5 h-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
               </svg>
               SEJA PRO
            </button>
         }
      >
         {/* Add history button in top-right corner */}
         <div className="absolute top-6 right-6 z-10" ref={historyDropdownRef}>
            <button
               onClick={() => setIsHistoryOpen(!isHistoryOpen)}
               className="relative bg-white border border-castanha-100 hover:bg-castanha-50 rounded-full p-2 transition-all duration-200 shadow-sm"
               aria-label="Ver histórico de documentos"
            >
               <svg className="w-6 h-6 text-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               {recentDocuments.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-cerrado-800 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                     {recentDocuments.length}
                  </span>
               )}
            </button>

            {/* History dropdown */}
            {isHistoryOpen && (
               <div className="absolute right-0 mt-2 w-96 max-h-[70vh] overflow-y-auto bg-white border border-castanha-100 rounded-lg shadow-xl z-50">
                  <div className="p-4">
                     <div className="flex items-center justify-between mb-4 pb-2 border-b border-castanha-100">
                        <h3 className="text-foreground font-medium text-lg">Documentos recentes</h3>
                        <button
                           onClick={() => setIsHistoryOpen(false)}
                           className="text-foreground/60 hover:text-foreground p-1 rounded-full hover:bg-castanha-100"
                        >
                           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                           </svg>
                        </button>
                     </div>

                     {recentDocuments.length > 0 ? (
                        <div className="space-y-3">
                           {recentDocuments.map(doc => (
                              <div key={doc.id}
                                 className="flex items-center justify-between p-3 border border-castanha-100 rounded-lg hover:bg-castanha-50 transition-colors bg-white shadow-sm"
                              >
                                 <div className="flex items-center flex-1 min-w-0">
                                    <div className="w-10 h-10 bg-castanha-50 border border-castanha-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                       {doc.type === 'COMPARISON' ? (
                                          <svg className="w-5 h-5 text-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                          </svg>
                                       ) : doc.type === 'TRANSLATION' ? (
                                          <svg className="w-5 h-5 text-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                          </svg>
                                       ) : doc.type === 'OCR' ? (
                                          <svg className="w-5 h-5 text-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                          </svg>
                                       ) : (
                                          <svg className="w-5 h-5 text-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                          </svg>
                                       )}
                                    </div>
                                    <div className="truncate">
                                       <div className="text-foreground text-sm font-medium truncate">{doc.title}</div>
                                       <div className="flex items-center mt-0.5">
                                          <span className="text-foreground/60 text-xs">{formatDate(doc.timestamp)}</span>
                                          <span className="mx-2 text-foreground/20">•</span>
                                          <span className="text-foreground/60 text-xs bg-castanha-50 px-2 py-0.5 rounded-full border border-castanha-100">{({ COMPARISON: 'COMPARAÇÃO', TRANSLATION: 'TRADUÇÃO', OCR: 'OCR', 'Advanced Agreement': 'Contrato avançado' } as Record<string, string>)[doc.type] ?? doc.type}</span>
                                       </div>
                                    </div>
                                 </div>

                                 <button
                                    onClick={() => {
                                       setIsHistoryOpen(false);
                                       // Set the appropriate tool and load the result
                                       if (doc.type === 'PDF' || doc.type === 'DOCX' || doc.type === 'DOC' || doc.type === 'TXT') {
                                          setSelectedTool('agreement-summary');
                                          const savedResult = localStorage.getItem('AIForLawyers_lastAnalysisResult');
                                          if (savedResult) setAnalysisResult(JSON.parse(savedResult));
                                       } else if (doc.type === 'COMPARISON') {
                                          setSelectedTool('compare-agreements');
                                          const savedResult = localStorage.getItem('AIForLawyers_lastComparisonResult');
                                          if (savedResult) setComparisonResult(JSON.parse(savedResult));
                                       } else if (doc.type === 'TRANSLATION') {
                                          setSelectedTool('document-translation');
                                          const savedResult = localStorage.getItem('AIForLawyers_lastTranslationResult');
                                          if (savedResult) setTranslationResult(JSON.parse(savedResult));
                                       } else if (doc.type === 'OCR') {
                                          setSelectedTool('image-to-text');
                                          const savedResult = localStorage.getItem('AIForLawyers_lastOcrResult');
                                          if (savedResult) setOcrResult(JSON.parse(savedResult));
                                       }
                                    }}
                                    className="ml-2 p-2 rounded-lg bg-castanha-50 hover:bg-castanha-100 border border-castanha-100 text-foreground/70 hover:text-foreground transition-colors"
                                    aria-label="Ver documento"
                                 >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                 </button>
                              </div>
                           ))}
                        </div>
                     ) : (
                        <div className="text-foreground/60 text-center py-8 px-4">
                           <svg className="w-12 h-12 mx-auto mb-3 text-foreground/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                           </svg>
                           <p>Ainda não há documentos no seu histórico</p>
                        </div>
                     )}

                     {recentDocuments.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-castanha-100 flex justify-end">
                           <button
                              onClick={() => {
                                 if (confirm("Tem certeza de que deseja limpar todo o histórico de documentos?")) {
                                    localStorage.removeItem('AIForLawyers_documentHistory');
                                    localStorage.removeItem('AIForLawyers_lastAnalysisResult');
                                    localStorage.removeItem('AIForLawyers_lastComparisonResult');
                                    localStorage.removeItem('AIForLawyers_lastTranslationResult');
                                    localStorage.removeItem('AIForLawyers_lastOcrResult');
                                    setRecentDocuments([]);
                                    setIsHistoryOpen(false);
                                    toast.success('Histórico de documentos limpo');
                                 }
                              }}
                              className="text-foreground/50 hover:text-foreground/80 text-xs"
                           >
                              Limpar histórico
                           </button>
                        </div>
                     )}
                  </div>
               </div>
            )}
         </div>

         <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
               <div className="lg:col-span-1">
                  <div className="sticky top-24">
                     {/* Document Tools */}
                     <h3 className="text-sm uppercase tracking-wider text-foreground/50 mb-4 font-medium">Ferramentas de documentos</h3>
                     {getDocumentTools()}
                  </div>
               </div>

               <div className="lg:col-span-3">
                  {renderSelectedToolContent()}
               </div>
            </div>
         </div>
         
         <UpgradeModal
            isOpen={showUpgradeModal}
            onClose={() => setShowUpgradeModal(false)}
         />
      </DashboardLayout>
   );
}