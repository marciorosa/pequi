'use client';

import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

// Base URL for API calls
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 60 seconds timeout to match backend maxDuration
  timeoutErrorMessage: 'Tempo limite da requisição esgotado (timeout) - tente novamente',
});

// Add a request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from local storage
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    // If token exists, add to headers
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle timeout errors
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      console.error('Request timeout:', error.message);
      // You can add a toast notification here if you have a toast library
    }

    // Handle network errors
    if (!error.response && error.message === 'Network Error') {
      console.error('Network error - check your connection or backend availability');
    }

    // Handle common errors (401, 403, etc.)
    if (error.response) {
      const { status } = error.response;
      const requestUrl: string = error.config?.url || '';

      if (status === 401) {
        // Only force-logout & redirect for auth-related endpoints.
        // For other endpoints (vault, ai, docs, chat, etc.) let the caller handle the error.
        const isAuthEndpoint = requestUrl.includes('/auth');
        if (isAuthEndpoint && typeof window !== 'undefined') {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          document.cookie = 'token=; path=/; max-age=0';
          if (!window.location.pathname.includes('/login')) {
            window.location.href = '/login';
          }
        }
      }

      // Handle 504 Gateway Timeout
      if (status === 504) {
        console.error('Gateway timeout - server took too long to respond');
      }
    }

    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  register: async (userData: { name: string; email: string; password: string }) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);

    // Store token and user data
    if (response.data.token && typeof window !== 'undefined') {
      // Store in localStorage for API calls
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Store in cookies for middleware
      document.cookie = `token=${response.data.token}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days
    }

    return response.data;
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Clear cookies
      document.cookie = 'token=; path=/; max-age=0';
    }
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  updateProfile: async (profileData: {
    fullName?: string;
    email?: string;
    company?: string;
    role?: string;
    phone?: string;
    image?: string | File;
  }) => {
    // Create form data if there's a file upload
    if (profileData.image instanceof File) {
      const formData = new FormData();

      // Add the image file
      formData.append('image', profileData.image);

      // Add other profile data
      Object.entries(profileData).forEach(([key, value]) => {
        if (key !== 'image' && value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      const response = await api.put('/auth/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Update local storage with new user data if available
      if (response.data.user && typeof window !== 'undefined') {
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        const updatedUser = { ...currentUser, ...response.data.user };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }

      return response.data;
    }

    // Regular JSON request if no file upload
    const response = await api.put('/auth/profile', profileData);

    // Update local storage with new user data if available
    if (response.data.user && typeof window !== 'undefined') {
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      const updatedUser = { ...currentUser, ...response.data.user };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }

    return response.data;
  },

  changePassword: async (passwordData: {
    currentPassword: string;
    newPassword: string;
  }) => {
    const response = await api.put('/auth/change-password', passwordData);
    return response.data;
  },

  forgotPassword: async (email: string) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (data: { email: string; token: string; newPassword: string }) => {
    const response = await api.post('/auth/reset-password', data);
    return response.data;
  }
};

// AI services
export const aiService = {
  generateAssistantResponse: async (data: { prompt: string; context?: unknown }) => {
    const response = await api.post('/ai/assistant', data);
    return response.data;
  },

  analyzeDocument: async (data: { document: string; options?: unknown }) => {
    try {
      const response = await api.post('/ai/document-analysis', data);
      return response.data;
    } catch (error: unknown) {
      console.error('API Error in analyzeDocument:', error);

      // Extract error message
      let errorMessage = 'Falha ao analisar o documento';

      // Type guard to safely access properties
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.error) {
          errorMessage = error.response.data.error;
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      throw new Error(`Erro na análise do documento: ${errorMessage}`);
    }
  },

  searchLegalDatabase: async (query: string, filters?: Record<string, unknown>) => {
    const response = await api.get('/ai/search', {
      params: { query, ...filters }
    });
    return response.data;
  },

  chatWithAssistant: async (data: {
    message: string;
    languageLevel?: 'professional' | 'regular' | 'simple';
    useWebSearch?: boolean;
    context?: unknown;
    chatHistory?: Array<{ role: string, content: string }>;
  }) => {
    try {
      console.log('Sending chat request to API:', {
        messageLength: data.message?.length || 0,
        contextProvided: !!data.context,
        historyCount: data.chatHistory?.length || 0
      });

      // Clean up chat history to ensure it's in the correct format
      const cleanedData = {
        ...data,
        chatHistory: data.chatHistory?.map(msg => ({
          role: msg.role === 'assistant' ? 'assistant' : 'user', // Ensure roles are either 'user' or 'assistant'
          content: msg.content || ''
        }))
      };

      const response = await api.post('/ai/chat', cleanedData);

      // Handle both old and new API response formats for backward compatibility
      // New format has 'message', old format has 'text'
      const responseData = response.data;

      return {
        message: responseData.message || responseData.text || '',
        timestamp: responseData.timestamp || new Date().toISOString(),
        isError: responseData.isError || false
      };
    } catch (error: unknown) {
      console.error('API Error in chatWithAssistant:', error);

      // Extract the error message from the response if possible
      let errorMessage = 'Falha na comunicação com o serviço de IA';
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.error) {
          errorMessage = error.response.data.error;
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      // Rethrow with a clearer message, keeping the HTTP response so the page
      // can react to the status (e.g. 403 -> upgrade modal) and show the server message
      const wrapped: any = new Error(`Erro no chat de IA: ${errorMessage}`);
      if (axios.isAxiosError(error)) {
        wrapped.response = error.response;
        wrapped.status = error.response?.status;
      }
      throw wrapped;
    }
  },
};

// Chat services
export const chatService = {
  // Get all chats
  getChats: async () => {
    const response = await api.get('/chats');
    return response.data;
  },

  // Get a specific chat by ID
  getChatById: async (chatId: string) => {
    const response = await api.get(`/chats/${chatId}`);
    return response.data;
  },

  // Create a new chat
  createChat: async (data: {
    title?: string;
    messages?: Array<{
      role: 'user' | 'assistant';
      content: string;
      timestamp?: Date;
    }>;
  }) => {
    const response = await api.post('/chats', data);
    return response.data;
  },

  // Update a chat (add message or update title)
  updateChat: async (chatId: string, data: {
    title?: string;
    message?: {
      role: 'user' | 'assistant';
      content: string;
      timestamp?: Date;
    };
  }) => {
    const response = await api.put(`/chats/${chatId}`, data);
    return response.data;
  },

  // Delete a chat
  deleteChat: async (chatId: string) => {
    const response = await api.delete(`/chats/${chatId}`);
    return response.data;
  }
};

// Stripe services
export const stripeService = {
  createCheckoutSession: async (priceId: string) => {
    try {
      const response = await api.post('/stripe/create-checkout-session', { priceId });
      return response.data;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  },

  createPortalSession: async () => {
    try {
      const response = await api.post('/stripe/create-portal-session');
      return response.data;
    } catch (error) {
      console.error('Error creating portal session:', error);
      throw error;
    }
  },

  getSubscription: async () => {
    try {
      const response = await api.get('/stripe/subscription');
      return response.data;
    } catch (error: unknown) {
      // Type guard to safely access properties
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        // Return an empty subscription object instead of null
        console.log('No subscription found, returning empty subscription');
        return {
          subscription: {
            plan: 'Pro Monthly',
            status: 'active',
            startDate: new Date(),
            nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            paymentMethod: {
              type: 'card',
              last4: '4242',
              expiryMonth: 12,
              expiryYear: 2024,
              brand: 'visa'
            }
          }
        };
      }
      console.error('Error fetching subscription:', error);
      throw error;
    }
  },

  cancelSubscription: async () => {
    try {
      const response = await api.post('/stripe/cancel-subscription');
      return response.data;
    } catch (error) {
      console.error('Error canceling subscription:', error);
      throw error;
    }
  },

  getInvoices: async () => {
    try {
      const response = await api.get('/stripe/invoices');
      return response.data;
    } catch (error) {
      console.error('Error fetching invoices:', error);
      throw error;
    }
  },
};

// Vault services
export const vaultService = {
  // Folders
  getFolders: async () => {
    const response = await api.get('/vault/folders');
    return response.data;
  },

  createFolder: async (data: { name: string; description?: string; color?: string }) => {
    const response = await api.post('/vault/folders', data);
    return response.data;
  },

  updateFolder: async (folderId: string, data: { name?: string; description?: string; color?: string }) => {
    const response = await api.put(`/vault/folders/${folderId}`, data);
    return response.data;
  },

  deleteFolder: async (folderId: string) => {
    const response = await api.delete(`/vault/folders/${folderId}`);
    return response.data;
  },

  // Lock management
  lockFolder: async (folderId: string, password: string) => {
    const response = await api.post(`/vault/folders/${folderId}/lock`, { password });
    return response.data;
  },

  unlockFolder: async (folderId: string, password: string) => {
    const response = await api.post(`/vault/folders/${folderId}/unlock`, { password });
    return response.data;
  },

  removeLock: async (folderId: string, password: string) => {
    const response = await api.post(`/vault/folders/${folderId}/remove-lock`, { password });
    return response.data;
  },

  // Files
  uploadFiles: async (folderId: string, files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    const response = await api.post(`/vault/folders/${folderId}/files`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  deleteFile: async (folderId: string, fileId: string) => {
    const response = await api.delete(`/vault/folders/${folderId}/files/${fileId}`);
    return response.data;
  },

  getDownloadUrl: async (folderId: string, fileId: string) => {
    const response = await api.get(`/vault/folders/${folderId}/files/${fileId}/download`);
    return response.data; // { url, fileName }
  },

  // ── Chat with file ──────────────────────────────────────────────────────────
  chatWithFile: async (
    folderId: string,
    fileId: string,
    message: string,
    conversationHistory: { role: string; content: string }[],
    isFirstMessage: boolean
  ) => {
    const response = await api.post(`/vault/folders/${folderId}/files/${fileId}/chat`, {
      message,
      conversationHistory,
      isFirstMessage,
    });
    return response.data; // { response: string }
  },

  saveChatSession: async (
    folderId: string,
    fileId: string,
    title: string,
    messages: { role: string; content: string; timestamp: string }[]
  ) => {
    const response = await api.post(`/vault/folders/${folderId}/files/${fileId}/save-chat`, {
      title,
      messages,
    });
    return response.data;
  },

  getChatSessions: async (folderId: string, fileId: string) => {
    const response = await api.get(`/vault/folders/${folderId}/files/${fileId}/chat-sessions`);
    return response.data; // { sessions: [] }
  },
};

export const workflowService = {
  getWorkflows: async () => {
    const response = await api.get('/workflows');
    return response.data; // { workflows: [] }
  },
  createWorkflow: async (data: unknown) => {
    const response = await api.post('/workflows', data);
    return response.data; // { workflow }
  },
  updateWorkflow: async (id: string, data: unknown) => {
    const response = await api.put(`/workflows/${id}`, data);
    return response.data; // { workflow }
  },
  deleteWorkflow: async (id: string) => {
    const response = await api.delete(`/workflows/${id}`);
    return response.data;
  },
  runWorkflow: async (id: string, data?: Record<string, unknown>) => {
    if (data?.simulationFile) {
      const formData = new FormData();
      formData.append('file', data.simulationFile as File);
      formData.append('isSimulation', 'true');
      formData.append('fileName', (data.simulationFile as File).name);

      const response = await api.post(`/workflows/${id}/run`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    }
    const response = await api.post(`/workflows/${id}/run`, data);
    return response.data;
  },
};

export { api };
const apiServices = {
  auth: authService,
  ai: aiService,
  chat: chatService,
  stripe: stripeService,
  vault: vaultService,
  workflow: workflowService,
};

export default apiServices;
