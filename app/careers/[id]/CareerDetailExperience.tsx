'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { contactApi } from '@/app/services/contactApi';
import type { CareerJobFull } from '../careersData';

type Props = { job: CareerJobFull; jobId: string };

const inputClass =
  'w-full rounded-[0.875rem] border border-castanha-200 bg-castanha-100 px-4 py-3.5 text-ink placeholder:text-castanha-600 transition-all focus:border-castanha-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pequi-500/32';
const labelClass = 'mb-2 block text-[0.8125rem] font-medium text-castanha-600';

export default function CareerDetailExperience({ job, jobId }: Props) {
  const [applicationData, setApplicationData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    resume: null as File | null,
    coverLetter: '',
    linkedIn: '',
    portfolio: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setApplicationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setApplicationData((prev) => ({ ...prev, resume: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await contactApi.submitCareerApplication({
        firstName: applicationData.firstName,
        lastName: applicationData.lastName,
        email: applicationData.email,
        phone: applicationData.phone,
        location: applicationData.location,
        jobTitle: job.title,
        jobId,
        coverLetter: applicationData.coverLetter,
        linkedIn: applicationData.linkedIn,
        portfolio: applicationData.portfolio,
      });

      setIsSubmitted(true);
      setApplicationData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        resume: null,
        coverLetter: '',
        linkedIn: '',
        portfolio: '',
      });
    } catch (err: unknown) {
      const rec = err as Record<string, unknown>;
      console.error('Career application submission error:', err);
      setError(String(rec.message || 'Algo deu errado. Tente novamente.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const listItem = (text: string, key: string) => (
    <li key={key} className="flex gap-3 text-[0.9375rem] leading-relaxed text-castanha-600 md:text-[1rem]">
      <span className="mt-0.5 shrink-0 text-ink" aria-hidden>
        ?
      </span>
      {text}
    </li>
  );

  return (
    <div className="min-h-screen">
      <header
        id="hero"
        className="relative -mt-20 overflow-hidden px-4 pb-10 pt-[11.25rem] sm:px-6 lg:px-8 lg:pb-12 lg:pt-[11.75rem]"
      >
        <Image
          src="/landingpage/hero/hero-bgimg.png"
          alt="Imagem de fundo"
          fill
          priority
          className="object-cover object-top"
        />
        <div className="relative mx-auto w-full max-w-[1274px]">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-[0.8125rem] text-castanha-600">
            <Link href="/careers" className="transition-colors hover:text-ink">
              Carreiras
            </Link>
            <span aria-hidden>/</span>
            <span>{job.departmentLabel}</span>
            <span aria-hidden>/</span>
            <span className="font-medium text-ink">{job.title}</span>
          </nav>
          <h1 className="max-w-4xl text-[1.95rem] font-medium leading-tight text-ink md:text-[2.5rem] lg:text-[2.75rem]">
            {job.title}
          </h1>
          <div className="mt-6 flex flex-wrap gap-4 text-[0.9375rem] text-castanha-600">
            <span className="inline-flex items-center gap-2">
              <svg className="h-4 w-4 shrink-0 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {job.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <svg className="h-4 w-4 shrink-0 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V6a2 2 0 012 2v6M8 8v10m8-10v10" />
              </svg>
              {job.type}
            </span>
            <span className="inline-flex items-center gap-2">
              <svg className="h-4 w-4 shrink-0 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              {job.salary}
            </span>
          </div>
        </div>
      </header>

      <div className="bg-white py-10 md:py-14">
        <div className="mx-auto max-w-[1274px] px-4 md:px-8 lg:px-6 xl:px-0">
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
            <div className="space-y-10 lg:col-span-2">
              <section className="landing-surface p-8 shadow-[0_12px_28px_rgba(31,42,23,0.04)] md:p-10">
                <h2 className="mb-4 text-xl font-medium text-ink">Sobre a vaga</h2>
                <p className="text-[1rem] leading-[175%] text-castanha-600">{job.description}</p>
              </section>

              <section className="landing-surface p-8 shadow-[0_12px_28px_rgba(31,42,23,0.04)] md:p-10">
                <h2 className="mb-5 text-xl font-medium text-ink">O que você vai fazer</h2>
                <ul className="space-y-3">{job.responsibilities.map((r, i) => listItem(r, `resp-${i}`))}</ul>
              </section>

              <section className="landing-surface p-8 shadow-[0_12px_28px_rgba(31,42,23,0.04)] md:p-10">
                <h2 className="mb-5 text-xl font-medium text-ink">O que procuramos</h2>
                <h3 className="mb-3 text-[0.9375rem] font-medium text-ink">Obrigatório</h3>
                <ul className="mb-8 space-y-3">{job.requirements.map((r, i) => listItem(r, `req-${i}`))}</ul>
                <h3 className="mb-3 text-[0.9375rem] font-medium text-ink">Desejável</h3>
                <ul className="space-y-3">{job.preferred.map((p, i) => listItem(p, `pref-${i}`))}</ul>
              </section>

              <section className="landing-surface p-8 shadow-[0_12px_28px_rgba(31,42,23,0.04)] md:p-10">
                <h2 className="mb-5 text-xl font-medium text-ink">O que oferecemos</h2>
                <ul className="grid gap-3 sm:grid-cols-2">{job.benefits.map((b, i) => listItem(b, `ben-${i}`))}</ul>
              </section>

              <section className="landing-surface p-8 shadow-[0_12px_28px_rgba(31,42,23,0.04)] md:p-10">
                <h2 className="mb-5 text-xl font-medium text-ink">Equipe e cultura</h2>
                <p className="mb-4 leading-[175%] text-castanha-600">{job.team}</p>
                <p className="leading-[175%] text-castanha-600">{job.culture}</p>
              </section>
            </div>

            <div className="space-y-6">
              <div className="landing-surface p-6 shadow-[0_12px_28px_rgba(31,42,23,0.04)] md:p-8 lg:sticky lg:top-28">
                <h3 className="mb-6 text-lg font-medium text-ink">Candidate-se</h3>

                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="firstName" className={labelClass}>Nome *</label>
                        <input id="firstName" type="text" name="firstName" required value={applicationData.firstName} onChange={handleInputChange} className={inputClass} />
                      </div>
                      <div>
                        <label htmlFor="lastName" className={labelClass}>Sobrenome *</label>
                        <input id="lastName" type="text" name="lastName" required value={applicationData.lastName} onChange={handleInputChange} className={inputClass} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClass}>E-mail *</label>
                      <input id="email" type="email" name="email" required value={applicationData.email} onChange={handleInputChange} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelClass}>Telefone</label>
                      <input id="phone" type="tel" name="phone" value={applicationData.phone} onChange={handleInputChange} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="location" className={labelClass}>Localização</label>
                      <input id="location" type="text" name="location" value={applicationData.location} onChange={handleInputChange} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="resume" className={labelClass}>Currículo * (PDF, DOC)</label>
                      <input id="resume" type="file" name="resume" required accept=".pdf,.doc,.docx" onChange={handleFileChange} className={`${inputClass} file:mr-3 file:rounded-lg file:border-0 file:bg-white file:px-3 file:py-1.5 file:text-sm file:font-medium`} />
                    </div>
                    <div>
                      <label htmlFor="linkedIn" className={labelClass}>LinkedIn</label>
                      <input id="linkedIn" type="url" name="linkedIn" value={applicationData.linkedIn} onChange={handleInputChange} className={inputClass} placeholder="https://" />
                    </div>
                    <div>
                      <label htmlFor="portfolio" className={labelClass}>Portfólio</label>
                      <input id="portfolio" type="url" name="portfolio" value={applicationData.portfolio} onChange={handleInputChange} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="coverLetter" className={labelClass}>Carta de apresentação</label>
                      <textarea id="coverLetter" name="coverLetter" rows={4} value={applicationData.coverLetter} onChange={handleInputChange} className={`${inputClass} min-h-[100px] resize-none`} placeholder="Por que esta vaga?" />
                    </div>

                    {error && <div className="rounded-[0.875rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="landing-primary-btn flex w-full items-center justify-center py-3.5 transition disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviar candidatura'}
                    </button>
                  </form>
                ) : (
                  <div className="py-6 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-cerrado-200 bg-cerrado-50">
                      <svg className="h-7 w-7 text-cerrado-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="mb-2 text-lg font-medium text-ink">Candidatura recebida</h4>
                    <p className="mb-6 text-sm leading-relaxed text-castanha-600">
                      Obrigado por se candidatar à vaga de <strong className="text-ink">{job.title}</strong>. Vamos analisar seu perfil e entraremos em contato se houver compatibilidade.
                    </p>
                    <button type="button" onClick={() => { setIsSubmitted(false); setError(''); }} className="text-[0.875rem] font-medium text-ink underline underline-offset-2">
                      Enviar outra candidatura
                    </button>
                  </div>
                )}
              </div>

              <div className="landing-surface p-6 md:p-8">
                <h3 className="mb-4 font-medium text-ink">Detalhes da vaga</h3>
                <dl className="space-y-3 text-[0.9375rem]">
                  <div>
                    <dt className="text-castanha-600">Departamento</dt>
                    <dd className="font-medium text-ink">{job.departmentLabel}</dd>
                  </div>
                  <div>
                    <dt className="text-castanha-600">Experiência</dt>
                    <dd className="font-medium text-ink">{job.experience}</dd>
                  </div>
                  <div>
                    <dt className="text-castanha-600">Publicada em</dt>
                    <dd className="font-medium text-ink">{new Date(job.posted).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}</dd>
                  </div>
                  <div>
                    <dt className="text-castanha-600">ID da vaga</dt>
                    <dd className="font-medium text-ink">MLA-{jobId}</dd>
                  </div>
                </dl>
              </div>

              <Link href="/careers" className="landing-secondary-btn flex w-full items-center justify-center border-castanha-200 bg-castanha-100 text-ink transition hover:bg-castanha-150">
                Ver todas as vagas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
