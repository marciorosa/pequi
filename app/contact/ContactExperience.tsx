'use client';

import { useState } from 'react';
import { contactApi } from '../services/contactApi';
import {
  AuthHero,
  authInputClass,
  authLabelClass,
  authPrimaryButtonClass,
} from '@/app/components/auth/AuthPageChrome';

const offices = [
  {
    name: 'Nova York',
    address: '110 Wall Street, New York, NY 10005',
    phone: '+1 (212) 555-1234',
    email: 'newyork@AIForLawyers.com',
    regionLabel: 'Américas',
  },
  {
    name: 'San Francisco',
    address: '555 Market Street, San Francisco, CA 94105',
    phone: '+1 (415) 555-5678',
    email: 'sanfrancisco@AIForLawyers.com',
    regionLabel: 'Américas',
  },
  {
    name: 'Londres',
    address: '30 St Mary Axe, London EC3A 8BF, Reino Unido',
    phone: '+44 20 7123 4567',
    email: 'london@AIForLawyers.com',
    regionLabel: 'EMEA',
  },
];

const contactChannels = [
  {
    title: 'Envie um e-mail',
    hint: 'Dúvidas gerais',
    value: 'info@AIForLawyers.com',
    href: 'mailto:info@AIForLawyers.com',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
  },
  {
    title: 'Ligue para nós',
    hint: 'Atendimento ao cliente',
    value: '+1 (800) 555-1234',
    href: 'tel:+18005551234',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    ),
  },
  {
    title: 'Chat ao vivo',
    hint: 'Dias úteis',
    value: '9h às 18h (horário de Nova York)',
    href: null as string | null,
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
    ),
  },
];

export default function ContactExperience() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await contactApi.submitContactForm(formData);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err : new Error(String(err));
      console.error('Contact form submission error:', message);
      setError(message.message || 'Algo deu errado. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const textareaClass = `${authInputClass} resize-none min-h-[140px]`;

  return (
    <div className="min-h-screen">
      <AuthHero
        eyebrow="Estamos aqui para ajudar"
        title="Fale conosco"
        subtitle="Dúvidas sobre demonstrações, segurança ou preços? Envie uma mensagem e responderemos rapidamente."
      />

      <section className="border-b border-[#eceae7] bg-[#FFFFFF]">
        <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0 py-12 md:py-16">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5 space-y-10">
              <div>
                <h2 className="mb-4 text-[1.5rem] font-medium leading-tight text-[#10101A] md:text-[1.75rem]">
                  Fale com a nossa equipe
                </h2>
                <p className="text-[1rem] leading-[175%] text-[#525252] md:text-[1.0625rem]">
                  Conte um pouco sobre seu escritório ou departamento jurídico e o que você deseja resolver. Vamos direcionar você para a
                  pessoa certa.
                </p>
              </div>

              <ul className="space-y-8">
                {contactChannels.map((ch) => (
                  <li key={ch.title} className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[0.875rem] border border-[#eceae7] bg-[#f8f7f6] text-[#10101A] shadow-[0_4px_12px_rgba(16,16,26,0.04)]">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        {ch.icon}
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-[#10101A]">{ch.title}</p>
                      <p className="mb-1 mt-0.5 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-[#525252]">
                        {ch.hint}
                      </p>
                      {ch.href ? (
                        <a
                          href={ch.href}
                          className="text-[0.9375rem] font-medium text-[#525252] transition-colors hover:text-[#10101A]"
                        >
                          {ch.value}
                        </a>
                      ) : (
                        <p className="text-[0.9375rem] font-medium text-[#525252]">{ch.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-[1.875rem] border border-[#eceae7] bg-white p-8 shadow-[0_20px_40px_rgba(16,16,26,0.06)] md:p-10">
                <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#f8f7f6]" aria-hidden />

                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="relative space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className={authLabelClass}>
                          Nome completo
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className={authInputClass}
                          placeholder="João Silva"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className={authLabelClass}>
                          E-mail
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className={authInputClass}
                          placeholder="joao@empresa.com.br"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="company" className={authLabelClass}>
                          Empresa
                        </label>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleChange}
                          className={authInputClass}
                          placeholder="Nome da empresa"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className={authLabelClass}>
                          Telefone
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className={authInputClass}
                          placeholder="+55 (11) 91234-5678"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className={authLabelClass}>
                        Assunto
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className={authInputClass}
                        placeholder="Como podemos ajudar?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className={authLabelClass}>
                        Mensagem
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className={textareaClass}
                        placeholder="Conte sobre seu caso de uso, o tamanho da equipe ou o prazo…"
                      />
                    </div>

                    {error && (
                      <div
                        role="alert"
                        className="rounded-[0.875rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 flex items-start gap-2"
                      >
                        <svg className="w-4 h-4 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {error}
                      </div>
                    )}

                    <button type="submit" disabled={isSubmitting} className={authPrimaryButtonClass}>
                      {isSubmitting ? (
                        <span className="inline-flex items-center justify-center gap-2">
                          <svg
                            className="h-5 w-5 animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            aria-hidden
                          >
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Enviando...
                        </span>
                      ) : (
                        'Enviar mensagem'
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="relative text-center py-10 md:py-14">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#e7e5e1] bg-[#f1f0ee]">
                      <svg className="h-8 w-8 text-[#10101A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="mb-3 text-[1.5rem] font-medium text-[#10101A]">Obrigado</h3>
                    <p className="mx-auto mb-8 max-w-md text-[1rem] leading-relaxed text-[#525252]">
                      Recebemos sua mensagem. Normalmente respondemos em até um dia útil.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          company: '',
                          phone: '',
                          subject: '',
                          message: '',
                        });
                      }}
                      className="landing-secondary-btn inline-flex h-[2.83331rem] min-w-[10.81025rem] items-center justify-center px-6 transition hover:bg-[#eceae7]"
                    >
                      Enviar outra mensagem
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#eceae7] bg-white py-14 md:py-16">
        <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
          <div className="mb-10 md:mb-12">
            <h2 className="mb-3 text-[1.5rem] font-medium text-[#10101A] md:text-[1.75rem]">Nossos escritórios</h2>
            <p className="max-w-2xl text-[1rem] leading-relaxed text-[#525252]">
              Equipes nos principais polos jurídicos e de tecnologia: a mesma plataforma, com suporte local.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {offices.map((office) => (
              <article
                key={office.name}
                className="overflow-hidden rounded-[1.875rem] border border-[#eceae7] bg-[#f8f7f6] shadow-[0_8px_24px_rgba(16,16,26,0.04)] transition-all duration-300 hover:border-[#d4d2ce] hover:shadow-[0_12px_28px_rgba(16,16,26,0.06)]"
              >
                <div className="relative overflow-hidden bg-[#10101A] px-6 py-8 text-white">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_80%_0%,#fff_0%,transparent_50%)]" aria-hidden />
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-white/60 mb-2 relative">
                    {office.regionLabel}
                  </p>
                  <h3 className="text-xl font-medium relative">{office.name}</h3>
                </div>
                <div className="space-y-5 bg-white p-6 md:p-7">
                  <div className="flex gap-3">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#e7e5e1] bg-[#f1f0ee]">
                      <svg className="h-4 w-4 text-[#525252]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <address className="text-[0.9375rem] not-italic leading-relaxed text-[#525252]">{office.address}</address>
                  </div>
                  <div className="flex gap-3 items-center">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#e7e5e1] bg-[#f1f0ee]">
                      <svg className="h-4 w-4 text-[#525252]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <a
                      href={`tel:${office.phone.replace(/\s/g, '')}`}
                      className="text-[0.9375rem] font-medium text-[#10101A] hover:underline"
                    >
                      {office.phone}
                    </a>
                  </div>
                  <div className="flex gap-3 items-center">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#e7e5e1] bg-[#f1f0ee]">
                      <svg className="h-4 w-4 text-[#525252]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <a href={`mailto:${office.email}`} className="break-all text-[0.9375rem] font-medium text-[#10101A] hover:underline">
                      {office.email}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#FFFFFF] py-12 md:py-16">
        <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
          <div className="gap-8 rounded-[1.875rem] border border-[#eceae7] bg-[#f8f7f6] p-8 shadow-[0_12px_28px_rgba(16,16,26,0.05)] md:flex md:items-center md:justify-between md:p-10">
            <div>
              <h3 className="mb-2 text-lg font-medium text-[#10101A]">Presença global</h3>
              <p className="max-w-xl text-[0.9375rem] leading-relaxed text-[#525252]">
                Nova York, San Francisco e Londres: cobertura coordenada de produto e sucesso do cliente em diferentes fusos horários.
              </p>
            </div>
            <div className="mt-6 md:mt-0 flex flex-wrap gap-3 shrink-0">
              {['Nova York', 'San Francisco', 'Londres'].map((city) => (
                <span
                  key={city}
                  className="inline-flex items-center rounded-full border border-[#e7e5e1] bg-white px-4 py-2 text-[0.8125rem] font-medium text-[#10101A]"
                >
                  <span className="mr-2 h-2 w-2 rounded-full bg-[#10101A]" aria-hidden />
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
