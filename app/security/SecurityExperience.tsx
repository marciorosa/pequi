'use client';

import Link from 'next/link';
import Image from 'next/image';
import FadeInSection from '../components/landingpage/FadeInSection';
import { sectionHeadingClass, sectionSubTextClass } from '../components/landingpage/sectionStyles';

const featureCardClass =
  'flex min-h-[240.8px] flex-col rounded-2xl border border-castanha-150 bg-castanha-100/85 px-5 py-5 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(31,42,23,0.06)]';

const certCardClass =
  'rounded-2xl border border-castanha-150 bg-white p-6 text-center shadow-[0_12px_28px_rgba(31,42,23,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(31,42,23,0.06)] md:p-8';

export default function SecurityExperience() {
  const securityFeatures = [
    {
      title: 'Criptografia de ponta a ponta',
      description: 'Dados criptografados em trânsito e em repouso com o padrão de mercado AES-256.',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      ),
    },
    {
      title: 'SOC 2 Tipo II',
      description: 'Infraestrutura e controles revisados por auditorias independentes rigorosas.',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      ),
    },
    {
      title: 'Autenticação multifator',
      description: 'Controles de acesso robustos, além de senhas, para contas e ações administrativas.',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
        />
      ),
    },
    {
      title: 'Detecção de ameaças',
      description: 'Monitoramento contínuo e alertas para identificar acessos incomuns e padrões de abuso.',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      ),
    },
    {
      title: 'Isolamento de dados',
      description: 'Separação lógica para que os dados de clientes e casos fiquem restritos aos ambientes corretos.',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
        />
      ),
    },
    {
      title: 'Testes de segurança',
      description: 'Testes de invasão e avaliações periódicas realizados por empresas independentes.',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      ),
    },
  ];

  const certifications = [
    { name: 'GDPR', description: 'Alinhamento à proteção de dados da UE' },
    { name: 'HIPAA', description: 'Requisitos de privacidade na área da saúde' },
    { name: 'SOC 2', description: 'Segurança e disponibilidade' },
    { name: 'ISO 27001', description: 'Gestão da segurança da informação' },
  ];

  const checkItems = [
    'Monitoramento de segurança e resposta a incidentes 24 horas por dia, 7 dias por semana',
    'Alta disponibilidade com infraestrutura redundante',
    'Auditorias externas e testes de invasão',
  ];

  return (
    <>
      <FadeInSection>
        <section
          id="hero"
          className="relative -mt-20 overflow-hidden px-4 pb-12 pt-[12rem] sm:px-6 sm:pt-[13rem] lg:px-8 lg:pb-16 lg:pt-[12rem] scroll-mt-24 md:scroll-mt-28"
        >
          <Image
            src="/landingpage/hero/hero-bgimg.png"
            alt="Imagem de fundo"
            fill
            priority
            className="z-0 object-cover object-top"
            sizes="100vw"
          />
          <div className="relative z-10 mx-auto w-full max-w-[1274px]">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.02fr] lg:gap-14">
              <div className="text-left">
                <p className="text-[0.94444rem] font-normal leading-[1.41663rem] text-castanha-600">Proteção de dados</p>
                <h1 className="mt-5 max-w-[700px] font-medium leading-[1.08] tracking-[-0.08rem] text-ink text-[2.7rem] sm:text-[3.25rem] sm:leading-[1.08] sm:tracking-[-0.12rem]">
                  Segurança de nível corporativo
                </h1>
                <p className="mt-5 max-w-xl text-[1rem] font-normal leading-[1.5rem] text-castanha-600 md:text-[1.125rem] lg:text-[1.25rem]">
                  Dados jurídicos exigem mais do que um compliance protocolar. Nossa plataforma foi criada para que confidencialidade, integridade
                  e disponibilidade estejam no centro da sua forma de trabalhar.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/contact"
                    className="landing-primary-btn inline-flex h-11 items-center justify-center px-6 transition hover:brightness-110"
                  >
                    Fale com a equipe de segurança
                  </Link>
                </div>
              </div>

              <div className="relative min-h-[280px] w-full sm:min-h-[340px] lg:min-h-[380px]">
                <div className="flex h-full min-h-[inherit] flex-col rounded-2xl border border-castanha-150 p-5 sm:p-6">
                  <div className="relative min-h-[220px] w-full flex-1 overflow-hidden rounded-xl bg-cerrado-900 sm:min-h-[280px] lg:min-h-[300px]">
                    <div className="absolute inset-3 sm:inset-4 md:inset-5">
                      <div className="relative h-full min-h-[160px] w-full">
                        <Image
                          src="/landingpage/features/secure-document-vault.png"
                          alt="Prévia do cofre seguro de documentos"
                          fill
                          className="object-contain object-center"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.06}>
        <section className="bg-white py-16 lg:py-[5.5rem]">
          <div className="mx-auto max-w-[1274px] px-4 md:px-8 lg:px-6 xl:px-0">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="mb-3 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-castanha-600">
                  Nosso compromisso
                </p>
                <h2 className="text-[2rem] font-medium leading-[1.1] text-ink md:text-[2.5rem] lg:text-[3rem]">
                  A segurança dos seus dados é nossa prioridade
                </h2>
                <p className="mt-5 text-[1rem] leading-[160%] text-castanha-600 md:text-[1.125rem]">
                  Você lida com informações sensíveis de clientes todos os dias. O Pequi foi arquitetado com a segurança como princípio
                  de design, da criptografia e do controle de acesso à forma como operamos nosso ambiente de produção.
                </p>
                <p className="mt-4 text-[1rem] leading-[160%] text-castanha-600 md:text-[1.125rem]">
                  Nossas equipes de segurança e engenharia monitoram, corrigem e testam continuamente para que as proteções acompanhem
                  os riscos reais.
                </p>
                <ul className="mt-8 space-y-3 text-[1rem] leading-[160%] text-castanha-600">
                  {checkItems.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 shrink-0 text-ink" aria-hidden>
                        ▶
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="overflow-hidden rounded-2xl border border-castanha-150 bg-castanha-100/85 p-3 backdrop-blur-sm md:p-4">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-cerrado-900">
                    <div className="absolute inset-4 md:inset-6">
                      <div className="relative h-full w-full">
                        <Image
                          src="/landingpage/features/secure-document-vault.png"
                          alt="Prévia do cofre seguro de documentos"
                          fill
                          className="object-contain object-center"
                          sizes="(max-width: 1024px) 100vw, 560px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.08}>
        <section
          id="features"
          className="border-t border-castanha-150 bg-white pb-16 lg:pb-[5.5rem]"
        >
          <div className="mx-auto max-w-[1274px] px-4 pt-16 md:px-8 lg:px-6 lg:pt-[5.5rem] xl:px-0">
            <h2 className={sectionHeadingClass}>Recursos de segurança corporativa</h2>
            <p className={`${sectionSubTextClass} mt-4 mb-10 md:mb-12`}>
              Uma visão resumida dos controles que as equipes esperam antes de confiar dados de casos à IA.
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {securityFeatures.map((feature) => (
                <div key={feature.title} className={featureCardClass}>
                  <div className="inline-flex w-full items-center justify-start">
                    <svg className="h-10 w-10 text-castanha-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      {feature.icon}
                    </svg>
                  </div>
                  <div className="mt-auto pt-6">
                    <h3 className="text-[1.125rem] font-medium leading-[1.575rem] text-castanha-800">{feature.title}</h3>
                    <p className="mt-2 text-[1rem] font-normal leading-[1.4rem] text-castanha-800">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <section className="bg-white pb-16 lg:pb-[5.5rem]">
          <div className="mx-auto max-w-[1274px] px-4 md:px-8 lg:px-6 xl:px-0">
            <h2 className={sectionHeadingClass}>Compliance e certificações</h2>
            <p className={`${sectionSubTextClass} mt-4 mb-10 md:mb-12`}>
              Normas e programas com os quais estamos alinhados; detalhes disponíveis mediante NDA para clientes corporativos.
            </p>
            <div className="grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
              {certifications.map((cert) => (
                <div key={cert.name} className={certCardClass}>
                  <div className="mb-4 inline-flex min-h-[3.25rem] items-center justify-center rounded-xl bg-cerrado-900 px-4 text-[0.9375rem] font-medium text-white md:text-[1rem]">
                    {cert.name}
                  </div>
                  <p className="text-[0.8125rem] leading-[150%] text-castanha-600 md:text-[0.875rem]">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.12}>
        <section className="bg-white pb-16 lg:pb-[7rem]">
          <div className="mx-auto max-w-[1274px] px-4 md:px-8 lg:px-6 xl:px-0">
            <div className="rounded-[2rem] border border-castanha-150 bg-castanha-50 px-6 py-12 text-center shadow-[0_24px_64px_rgba(31,42,23,0.06)] md:px-12 md:py-14">
              <h2 className="text-[1.75rem] font-medium leading-tight text-ink md:text-[2.25rem] lg:text-[2.5rem]">
                Visão geral de segurança e whitepaper
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[1rem] leading-[160%] text-castanha-600 md:text-[1.125rem]">
                Solicite nosso pacote completo de segurança, com diagramas de arquitetura, mapeamento de controles e detalhes sobre como tratamos
                incidentes e suboperadores.
              </p>
              <Link
                href="/contact"
                className="landing-primary-btn mx-auto mt-8 inline-flex h-11 items-center justify-center gap-2 px-6 transition hover:brightness-110"
              >
                <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Solicitar materiais de segurança
              </Link>
            </div>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
