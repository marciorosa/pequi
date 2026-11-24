'use client';

import { useState } from 'react';
import { contactApi } from '../services/contactApi';
import {
  authInputClass,
  authLabelClass,
  authPrimaryButtonClass,
} from '@/app/components/auth/AuthPageChrome';

const offices = [
  {
    name: 'Brasília',
    address: 'SCS, Quadra 09, Bloco C, Torre C',
    phone: '+55 (11) 94492-0944',
    email: 'brasilia@pequi.me',
    regionLabel: 'DF',
  },
  {
    name: 'São Paulo',
    address: 'Na Avenida Paulista, 37 (4º andar)',
    phone: '+55 (11) 94492-0944',
    email: 'saopaulo@pequi.me',
    regionLabel: 'SP',
  },
  {
    name: 'Campinas',
    address: 'Rua Gustavo Ambrust, 36',
    phone: '+55 (11) 94492-0944',
    email: 'campinas@pequi.me',
    regionLabel: 'SP',
  },
];

const contactChannels = [
  {
    title: 'Envie um e-mail',
    hint: 'Dúvidas gerais',
    value: 'contato@pequi.me',
    href: 'mailto:contato@pequi.me',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
  },
  {
    title: 'Ligue para nós',
    hint: 'Atendimento ao cliente',
    value: '+55 (11) 94492-0944',
    href: 'tel:+5511944920944',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    ),
  },
  {
    title: 'Chat ao vivo',
    hint: '7 dias da semana',
    value: '24hs',
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
      <section className="pt-32 sm:pt-36">
        <div className="mx-auto grid w-full max-w-7xl gap-8 border-b border-ink/12 px-5 pb-12 sm:px-8 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ink/45">Contato</p>
            <h1 className="mt-5 text-[clamp(2.6rem,5.6vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.04em] text-ink">Fale conosco</h1>
          </div>
          <p className="max-w-[500px] text-[1.05rem] leading-relaxed text-ink/65 lg:justify-self-end">
            Recursos, segurança ou preços: mande sua pergunta e respondemos em até um dia útil.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5 space-y-10">
              <div>
                <h2 className="text-[1.6rem] font-medium tracking-[-0.025em] text-ink">Fale com a nossa equipe</h2>
                <p className="mt-3 max-w-[420px] text-[1rem] leading-relaxed text-ink/65">
                  Conte sobre o seu escritório e o que precisa. Encaminhamos para a pessoa certa.
                </p>
              </div>

              <ul className="border-t border-ink/12">
                {contactChannels.map((ch) => (
                  <li key={ch.title} className="grid grid-cols-[9rem_1fr] gap-4 border-b border-ink/12 py-4">
                    <div>
                      <p className="text-[0.95rem] font-medium text-ink">{ch.title}</p>
                      <p className="mt-0.5 text-[0.8rem] text-ink/50">{ch.hint}</p>
                    </div>
                    <div className="self-center">
                      {ch.href ? (
                        <a
                          href={ch.href}
                          className="text-[0.9375rem] font-medium text-castanha-600 transition-colors hover:text-ink"
                        >
                          {ch.value}
                        </a>
                      ) : (
                        <p className="text-[0.9375rem] font-medium text-castanha-600">{ch.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7">
              <div className="relative rounded-3xl bg-[#F4EFDF] p-7 md:p-10 [&_input]:bg-[#FFFDF6] [&_textarea]:bg-[#FFFDF6]">

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
                          placeholder="Opcional, se houver"
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
                        placeholder="Conte sobre sua situação, o que já aconteceu até aqui ou o prazo…"
                      />
                    </div>

                    {error && (
                      <div
                        role="alert"
                        className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 flex items-start gap-2"
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
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-castanha-200 bg-castanha-100">
                      <svg className="h-8 w-8 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="mb-3 text-[1.5rem] font-medium text-ink">Obrigado</h3>
                    <p className="mx-auto mb-8 max-w-md text-[1rem] leading-relaxed text-castanha-600">
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
                      className="landing-secondary-btn inline-flex h-[2.83331rem] min-w-[10.81025rem] items-center justify-center px-6 transition hover:bg-castanha-150"
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

      <section className="bg-[#F4EFDF] py-20 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="grid gap-6 pb-4 lg:grid-cols-2 lg:items-end">
            <h2 className="text-[clamp(2.1rem,4.4vw,3.6rem)] font-medium leading-[1.04] tracking-[-0.035em] text-ink">Nossos escritórios</h2>
            <p className="max-w-[480px] text-[1.02rem] leading-relaxed text-ink/65 lg:justify-self-end">
              Brasília, São Paulo e Campinas. Atendimento online, em português, de segunda a sexta, no horário de Brasília.
            </p>
          </div>
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {offices.map((office) => (
              <article key={office.name} className="border-t border-ink/20 pt-6">
                <span className="text-[0.75rem] uppercase tracking-[0.14em] text-ink/45">{office.regionLabel}</span>
                <h3 className="mt-4 text-[1.4rem] font-medium tracking-[-0.02em] text-ink">{office.name}</h3>
                <address className="mt-3 text-[0.98rem] not-italic leading-relaxed text-ink/65">{office.address}</address>
                <div className="mt-4 flex flex-col gap-1 text-[0.95rem]">
                  <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="text-ink hover:underline">{office.phone}</a>
                  <a href={`mailto:${office.email}`} className="text-ink hover:underline">{office.email}</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
