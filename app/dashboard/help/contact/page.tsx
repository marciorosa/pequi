'use client';

import { useState } from 'react';
import DashboardLayout from '../../../components/DashboardLayout';

// Support ticket category
type TicketCategory = 'general' | 'technical' | 'billing' | 'legal' | 'other';

// Support ticket interface
interface SupportTicket {
  subject: string;
  category: TicketCategory;
  message: string;
  attachments?: File[];
}

export default function ContactSupportPage() {
  // Form state
  const [formData, setFormData] = useState<SupportTicket>({
    subject: '',
    category: 'general',
    message: ''
  });

  // File state
  const [attachments, setAttachments] = useState<File[]>([]);

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle file uploads
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachments(prev => [...prev, ...newFiles]);
    }
  };

  // Remove an attachment
  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  // Submit the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      setError(null);

      // In a real app, you would send the data to your backend here
      // For now, we'll simulate a successful submission after a delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Success
      setIsSubmitted(true);
    } catch (err) {
      setError('Ocorreu um erro ao enviar sua solicitação. Tente novamente.');
      console.error('Error submitting support request:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset the form
  const handleReset = () => {
    setFormData({
      subject: '',
      category: 'general',
      message: ''
    });
    setAttachments([]);
    setIsSubmitted(false);
    setError(null);
  };

  return (
    <DashboardLayout title="Falar com o suporte">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/30 mb-3">Suporte</p>
          <h1 className="text-4xl font-light text-foreground mb-4 tracking-tight">Atendimento especializado</h1>
          <p className="text-foreground/50 max-w-2xl text-lg font-light leading-relaxed">
            Nossa equipe especializada está pronta para ajudar. Envie uma solicitação abaixo e retornaremos em até 24 horas úteis.
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-white border border-castanha-100 rounded-[32px] p-16 text-center shadow-xl shadow-black/5 animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 rounded-full bg-cerrado-50 flex items-center justify-center mx-auto mb-8 border border-cerrado-100">
              <svg className="w-8 h-8 text-cerrado-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-light text-foreground mb-4 tracking-tight">Solicitação recebida</h2>
            <p className="text-foreground/50 mb-10 max-w-sm mx-auto font-light leading-relaxed">
              Registramos seu chamado de suporte. Uma confirmação foi enviada para o seu e-mail, e um especialista entrará em contato em breve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleReset}
                className="px-8 py-4 bg-castanha-50 hover:bg-castanha-100 text-foreground text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all"
              >
                Nova solicitação
              </button>
              <a
                href="/dashboard/help"
                className="px-8 py-4 text-white text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg btn-primary-gradient"
              >
                Voltar à central
              </a>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="bg-white border border-castanha-100 rounded-[32px] overflow-hidden shadow-sm">
                <div className="p-8 border-b border-castanha-50 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">Abrir um chamado</h2>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cerrado-500 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/30">Suporte prioritário ativo</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="p-10">
                  {error && (
                    <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-3">
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <p className="text-sm font-medium">{error}</p>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="subject" className="text-[11px] font-bold uppercase tracking-widest text-foreground/40 ml-1">
                        Assunto
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-castanha-50/50 border border-castanha-100 rounded-xl py-3.5 px-5 text-foreground text-sm focus:bg-white focus:outline-none focus:ring-4 focus:ring-foreground/5 focus:border-castanha-200 transition-all"
                        placeholder="Breve descrição do problema"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="category" className="text-[11px] font-bold uppercase tracking-widest text-foreground/40 ml-1">
                        Categoria
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-castanha-50/50 border border-castanha-100 rounded-xl py-3.5 px-5 text-foreground text-sm focus:bg-white focus:outline-none focus:ring-4 focus:ring-foreground/5 focus:border-castanha-200 transition-all appearance-none"
                      >
                        <option value="general">Dúvida geral</option>
                        <option value="technical">Suporte técnico</option>
                        <option value="billing">Cobrança e assinatura</option>
                        <option value="legal">Questões jurídicas</option>
                        <option value="other">Outros</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mb-8">
                    <label htmlFor="message" className="text-[11px] font-bold uppercase tracking-widest text-foreground/40 ml-1">
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full bg-castanha-50/50 border border-castanha-100 rounded-xl py-4 px-5 text-foreground text-sm focus:bg-white focus:outline-none focus:ring-4 focus:ring-foreground/5 focus:border-castanha-200 transition-all resize-none"
                      placeholder="Forneça o máximo de detalhes possível para nos ajudar a resolver seu problema rapidamente."
                    ></textarea>
                  </div>

                  <div className="mb-10">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-foreground/40 ml-1 block mb-3">
                      Anexos
                    </label>
                    <div className="flex flex-wrap items-center gap-4">
                      <label
                        htmlFor="attachments"
                        className="cursor-pointer group flex items-center gap-3 px-5 py-3 bg-castanha-50 border border-castanha-100 rounded-xl hover:bg-castanha-100 transition-all"
                      >
                        <svg className="w-5 h-5 text-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="text-xs font-semibold uppercase tracking-wider text-foreground/60">Escolher arquivos</span>
                      </label>
                      <input
                        type="file"
                        id="attachments"
                        onChange={handleFileChange}
                        multiple
                        className="hidden"
                      />
                      <p className="text-[10px] text-foreground/30 font-bold uppercase tracking-widest">
                        Máximo de 3 arquivos, 5 MB cada (PNG, JPG, PDF)
                      </p>
                    </div>

                    {attachments.length > 0 && (
                      <div className="mt-6 space-y-3">
                        {attachments.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-castanha-50/50 border border-castanha-100 rounded-xl group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-white border border-castanha-100 flex items-center justify-center">
                                <svg className="w-4 h-4 text-foreground/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-foreground truncate max-w-[200px]">{file.name}</p>
                                <p className="text-[9px] text-foreground/30 font-bold uppercase">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeAttachment(index)}
                              className="text-foreground/30 hover:text-red-500 p-2 transform group-hover:scale-110 transition-all"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-castanha-50">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-[11px] font-bold uppercase tracking-widest text-foreground/40 hover:text-foreground transition-colors"
                    >
                      Limpar formulário
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-10 py-4 text-white text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-black/10 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed btn-primary-gradient"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-3 w-3 border-2 border-white border-t-transparent"></div>
                          Enviando...
                        </>
                      ) : (
                        <>
                          Enviar solicitação
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white border border-castanha-100 rounded-[32px] p-8 shadow-sm">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/30 mb-8 px-1">Outros canais</h3>
                <div className="space-y-8">
                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-castanha-50 flex items-center justify-center text-foreground/40 group-hover:bg-foreground group-hover:text-background transition-all">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-1">Suporte por e-mail</p>
                      <a href="mailto:support@AIForLawyers.com" className="text-xs font-medium text-foreground/40 hover:text-foreground transition-colors">
                        support@AIForLawyers.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-castanha-50 flex items-center justify-center text-foreground/40 group-hover:bg-foreground group-hover:text-background transition-all">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-1">Suporte por telefone</p>
                      <p className="text-xs font-medium text-foreground/40 underline">Linha prioritária para usuários</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-castanha-50 flex items-center justify-center text-foreground/40 group-hover:bg-foreground group-hover:text-background transition-all">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-1">Horário de atendimento</p>
                      <p className="text-xs font-medium text-foreground/40">Seg. a sex., das 9h às 17h (horário de Nova York)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-castanha-50 border border-castanha-100 rounded-[32px] p-8">
                <h4 className="text-[11px] font-bold uppercase tracking-widest mb-4">Planos Enterprise</h4>
                <p className="text-xs text-foreground/50 leading-relaxed mb-6">
                  Contas Enterprise contam com um gerente de conta dedicado e tempo de resposta prioritário de 1 hora.
                </p>
                <a href="/pricing" className="text-[10px] font-bold uppercase tracking-widest text-foreground hover:underline">Ver benefícios</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 