'use client';

import { api } from './api';

export interface DocumentAnalysisOptions {
  lawyerId?: string;
  fileType?: string;
  mimeType?: string;
}

export interface DocumentComparisonOptions {
  compareType?: 'all' | 'changes' | 'additions' | 'removals';
}

export interface DocumentTranslationOptions {
  sourceLanguage?: string;
  targetLanguage: string;
  preserveFormatting?: boolean;
  includeLegalGlossary?: boolean;
}

export interface CreateAgreementOptions {
  title?: string;
  templateType?: string;
  specialRequirements?: string;
}

export interface AdvancedDocumentOptions {
  documentType: string;
  templateStyle: string;
  specialRequirements?: string;
  referenceDocument?: File;
}

export const documentService = {
  /**
   * Analyze a document and extract key information
   */
  analyzeDocument: async (file: File, options?: DocumentAnalysisOptions) => {
    try {
      // Check file size before processing
      const maxSize = 25 * 1024 * 1024; // 25MB
      if (file.size > maxSize) {
        throw new Error('O arquivo excede o limite de 25 MB. Envie um arquivo menor.');
      }

      // Convert the file to base64
      const base64Data = await fileToBase64(file);

      // Determine file type from the file extension
      const fileType = file.name.split('.').pop()?.toLowerCase() || 'unknown';
      const mimeType = file.type || 'application/octet-stream';

      // Prepare the request payload
      const payload = {
        document: base64Data,
        options: {
          ...options,
          fileType,
          mimeType
        }
      };

      // Call the backend API with a timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout

      try {
        const response = await api.post('/ai/document-analysis', payload, {
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        return response.data;
      } catch (error: unknown) {
        if (error instanceof Error && error.name === 'AbortError') {
          throw new Error('O tempo da requisição esgotou. Tente novamente com um documento menor ou entre em contato com o suporte.');
        }
        throw error;
      }
    } catch (error: unknown) {
      throw error;
    }
  },

  /**
   * Compare two documents and identify differences
   */
  compareDocuments: async (file1: File, file2: File, options?: DocumentComparisonOptions) => {
    try {
      // Convert files to base64
      const base64File1 = await fileToBase64(file1);
      const base64File2 = await fileToBase64(file2);

      // Prepare payload
      const payload = {
        document1: base64File1,
        document2: base64File2,
        options: {
          ...options,
          fileType1: file1.name.split('.').pop()?.toLowerCase(),
          fileType2: file2.name.split('.').pop()?.toLowerCase(),
          mimeType1: file1.type,
          mimeType2: file2.type
        }
      };

      // Call the API endpoint
      const response = await api.post('/ai/document-comparison', payload);
      return response.data;
    } catch (error: unknown) {
      console.error('Error comparing documents:', error);
      throw error;
    }
  },

  /**
   * Create an agreement based on user requirements
   */
  createAgreement: async (data: unknown, options?: CreateAgreementOptions) => {
    try {
      const payload = {
        data,
        options
      };

      const response = await api.post('/ai/create-agreement', payload);
      return response.data;
    } catch (error: unknown) {
      console.error('Error creating agreement:', error);
      throw error;
    }
  },

  /**
   * Translate a document to the specified language
   */
  translateDocument: async (file: File, options: DocumentTranslationOptions) => {
    try {
      // Convert file to base64
      const base64Data = await fileToBase64(file);

      // Prepare payload
      const payload = {
        document: base64Data,
        options: {
          ...options,
          fileType: file.name.split('.').pop()?.toLowerCase(),
          mimeType: file.type
        }
      };

      // Call the API endpoint
      const response = await api.post('/ai/document-translation', payload);
      return response.data;
    } catch (error: unknown) {
      console.error('Error translating document:', error);
      throw error;
    }
  },

  /**
   * Extract text from an image
   */
  extractTextFromImage: async (file: File, options?: {
    language?: string;
    detectTables?: boolean;
    preserveLayout?: boolean;
    enhancedAccuracy?: boolean;
  }) => {
    try {
      // Ensure the file is an image
      if (!file.type.startsWith('image/')) {
        throw new Error('O arquivo deve ser uma imagem');
      }

      // Convert file to base64
      const base64Data = await fileToBase64(file);

      // Prepare payload
      const payload = {
        document: base64Data,
        options: {
          ...options,
          fileType: file.name.split('.').pop()?.toLowerCase(),
          mimeType: file.type
        }
      };

      // Call the API endpoint - reuse document analysis endpoint with special flag
      const ocrPayload = { ...payload, options: { ...payload.options, analysisType: 'ocr' } };
      const response = await api.post('/ai/document-analysis', ocrPayload);
      return response.data;
    } catch (error: unknown) {
      console.error('Error extracting text from image:', error);
      throw error;
    }
  },

  /**
   * Get recent document history
   */
  getDocumentHistory: async () => {
    try {
      // Skip if no token available yet
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (!token) return [];
      const response = await api.get('/documents/history');
      return response.data;
    } catch (error: unknown) {
      // Silently return empty on 401 (not yet authenticated) or network errors
      if ((error as { response?: { status?: number } })?.response?.status !== 401) {
        console.error('Error fetching document history:', error);
      }
      return []; // Return empty array instead of throwing, so UI doesn't break
    }
  },

  /**
   * Create an advanced document using Gemini AI
   */
  createAdvancedDocument: async (options: AdvancedDocumentOptions) => {
    try {
      // Prepare form data for the API
      const formData = new FormData();
      formData.append('documentType', options.documentType);
      formData.append('templateStyle', options.templateStyle);

      if (options.specialRequirements) {
        formData.append('specialRequirements', options.specialRequirements);
      }

      if (options.referenceDocument) {
        formData.append('referenceDocument', options.referenceDocument);
      }

      // Call the API endpoint
      const response = await fetch('/api/documents/create-advanced', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Falha ao criar o documento avançado');
      }

      return await response.json();
    } catch (error: unknown) {
      console.error('Error creating advanced document:', error);
      throw error;
    }
  }
};

/**
 * Convert a file to base64 string
 */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // Remove the data URL prefix (e.g., "data:application/pdf;base64,")
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      } else {
        reject(new Error('Falha ao converter o arquivo para base64'));
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

export default documentService; 