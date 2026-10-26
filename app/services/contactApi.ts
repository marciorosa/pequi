const API_BASE_URL = '/api'; // Use Next.js API routes as proxy
// Note: Backend is running on port 5001

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface CareerApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  location?: string;
  jobTitle: string;
  jobId: string;
  coverLetter?: string;
  linkedIn?: string;
  portfolio?: string;
}

export interface ApiResponse {
  message: string;
  success: boolean;
  errors?: Array<{ field: string; message: string }>;
}

export const contactApi = {
  async submitContactForm(data: ContactFormData): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/contact/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Falha ao enviar o formulário de contato');
    }

    return result;
  },

  async submitCareerApplication(data: CareerApplicationData): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/contact/career-application`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Falha ao enviar a candidatura');
    }

    return result;
  },
};

export default contactApi;
