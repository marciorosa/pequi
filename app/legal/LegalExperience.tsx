'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AuthHero } from '@/app/components/auth/AuthPageChrome';
import { sectionHeadingClass, sectionSubTextClass } from '@/app/components/landingpage/sectionStyles';

const legalDocuments = {
  terms: {
    title: 'Termos de Serviço',
    lastUpdated: '15 de novembro de 2023',
    sections: [
      {
        heading: '1. Introdução',
        content:
          "Estes Termos de Serviço ('Termos') regem seu acesso e uso do site, dos serviços e dos aplicativos da Pequi (em conjunto, os 'Serviços'). Ao acessar ou usar nossos Serviços, você concorda em ficar vinculado a estes Termos. Se não concordar com estes Termos, você não poderá acessar nem usar os Serviços.",
      },
      {
        heading: '2. Uso dos nossos Serviços',
        content:
          'Você pode usar nossos Serviços somente conforme permitido por estes Termos e pelas leis aplicáveis. Nossos Serviços evoluem constantemente, e podemos alterar, suspender ou descontinuar qualquer aspecto deles a qualquer momento, incluindo a disponibilidade de qualquer recurso ou conteúdo.',
      },
      {
        heading: '3. Sua conta Pequi',
        content:
          'Para usar determinados recursos dos nossos Serviços, pode ser necessário criar uma conta. Você é responsável por manter a confidencialidade das credenciais da sua conta e por todas as atividades realizadas nela.',
      },
      {
        heading: '4. Privacidade',
        content:
          'Nossa Política de Privacidade explica como coletamos, usamos e protegemos suas informações quando você usa nossos Serviços. Ao usar nossos Serviços, você concorda com os termos da nossa Política de Privacidade.',
      },
      {
        heading: '5. Propriedade intelectual',
        content:
          'Nossos Serviços, incluindo todos os textos, gráficos, imagens, logotipos, softwares e demais conteúdos, pertencem à Pequi ou são licenciados a ela e estão protegidos pelas leis de direitos autorais, de marcas e demais leis de propriedade intelectual.',
      },
    ],
  },
  privacy: {
    title: 'Política de Privacidade',
    lastUpdated: '10 de novembro de 2023',
    sections: [
      {
        heading: '1. Informações que coletamos',
        content:
          'Coletamos as informações que você nos fornece diretamente, por exemplo, ao criar uma conta, usar nossos Serviços ou se comunicar conosco. Essas informações podem incluir seu nome, endereço de e-mail e quaisquer outras informações que você decida fornecer.',
      },
      {
        heading: '2. Como usamos suas informações',
        content:
          'Usamos as informações coletadas para fornecer, manter e aprimorar nossos Serviços; para nos comunicarmos com você; para proteger nossos Serviços e usuários; e para cumprir obrigações legais.',
      },
      {
        heading: '3. Segurança dos dados',
        content:
          'Adotamos medidas técnicas e organizacionais adequadas para proteger a segurança das suas informações pessoais. No entanto, nenhum método de transmissão pela Internet ou de armazenamento eletrônico é 100% seguro.',
      },
      {
        heading: '4. Seus direitos',
        content:
          'Dependendo da sua localização, você pode ter determinados direitos sobre suas informações pessoais, como o direito de acessar, corrigir, excluir ou restringir o uso das suas informações. Entre em contato pelo e-mail privacy@AiForLawyers.com.',
      },
      {
        heading: '5. Alterações nesta Política de Privacidade',
        content:
          'Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças em nossas práticas ou por outros motivos operacionais, legais ou regulatórios.',
      },
    ],
  },
  cookies: {
    title: 'Política de Cookies',
    lastUpdated: '25 de outubro de 2023',
    sections: [
      {
        heading: '1. O que são cookies',
        content:
          'Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita um site. Eles são amplamente utilizados para que os sites funcionem de forma mais eficiente e para fornecer informações aos seus proprietários.',
      },
      {
        heading: '2. Como usamos cookies',
        content:
          'Usamos cookies para entender como você interage com nossos Serviços, lembrar suas preferências e melhorar sua experiência. Isso inclui cookies essenciais, de desempenho e de segmentação.',
      },
      {
        heading: '3. Suas escolhas sobre cookies',
        content:
          'Você pode gerenciar cookies nas configurações do seu navegador. A maioria dos navegadores permite recusar ou aceitar cookies, excluí-los ou ser avisado quando um cookie for enviado.',
      },
      {
        heading: '4. Cookies de terceiros',
        content:
          'Nossos Serviços podem utilizar serviços de terceiros que definem seus próprios cookies. Não temos controle sobre esses cookies. Consulte as respectivas políticas de privacidade desses terceiros.',
      },
      {
        heading: '5. Alterações nesta Política de Cookies',
        content:
          'Podemos atualizar esta Política de Cookies periodicamente para refletir mudanças em nossas práticas ou por outros motivos operacionais, legais ou regulatórios.',
      },
    ],
  },
  compliance: {
    title: 'Informações de compliance',
    lastUpdated: '5 de novembro de 2023',
    sections: [
      {
        heading: '1. Regulamento Geral de Proteção de Dados (GDPR)',
        content:
          'Temos o compromisso de cumprir o GDPR. Tratamos dados pessoais de forma lícita, transparente e para finalidades específicas. Adotamos medidas técnicas e organizacionais adequadas para garantir a segurança dos dados.',
      },
      {
        heading: '2. California Consumer Privacy Act (CCPA)',
        content:
          'De acordo com a CCPA, os residentes da Califórnia têm o direito de saber quais informações pessoais coletamos, solicitar a exclusão dessas informações e optar por não permitir a venda de suas informações pessoais.',
      },
      {
        heading: '3. HIPAA',
        content:
          'Em determinados serviços jurídicos relacionados à área da saúde, podemos estar sujeitos aos requisitos da HIPAA. Adotamos salvaguardas adequadas para proteger a privacidade e a segurança das informações de saúde protegidas (PHI).',
      },
      {
        heading: '4. Medidas de segurança',
        content:
          'Adotamos medidas de segurança padrão do setor para proteger seus dados, incluindo criptografia, controles de acesso, avaliações periódicas de segurança e treinamento de funcionários.',
      },
      {
        heading: '5. Como relatar problemas de segurança',
        content:
          'Se você acredita ter descoberto uma vulnerabilidade de segurança em nossos Serviços, informe pelo e-mail security@AiForLawyers.com. Agradecemos sua ajuda para tornar nossos Serviços mais seguros.',
      },
    ],
  },
};

const tabs = [
  { key: 'terms', label: 'Termos de Serviço' },
  { key: 'privacy', label: 'Política de Privacidade' },
  { key: 'cookies', label: 'Política de Cookies' },
  { key: 'compliance', label: 'Compliance' },
] as const;

const certifications = ['SOC 2 Tipo II', 'GDPR (em conformidade)', 'HIPAA (em conformidade)', 'ISO 27001'];

const faqs = [
  {
    question: 'Como a Pequi cuida da segurança dos dados?',
    answer:
      'Adotamos medidas de segurança padrão do setor, incluindo criptografia, controles de acesso e avaliações periódicas de segurança. Todos os dados são criptografados em trânsito e em repouso, e mantemos a certificação SOC 2 Tipo II.',
  },
  {
    question: 'A Pequi está em conformidade com o GDPR?',
    answer:
      'Sim, estamos totalmente em conformidade com o GDPR. Tratamos dados pessoais de forma lícita, transparente e para finalidades específicas. Adotamos medidas técnicas e organizacionais adequadas para garantir a segurança dos dados.',
  },
  {
    question: 'Como solicito uma cópia dos meus dados?',
    answer:
      'Você pode solicitar uma cópia dos seus dados entrando em contato com nosso Encarregado de Proteção de Dados pelo e-mail privacy@AiForLawyers.com. Atenderemos sua solicitação em até 30 dias, de acordo com as leis de proteção de dados aplicáveis.',
  },
  {
    question: 'A Pequi compartilha meus dados com terceiros?',
    answer:
      'Compartilhamos seus dados com terceiros somente conforme descrito em nossa Política de Privacidade. Isso pode incluir prestadores de serviços que nos ajudam a fornecer nossos serviços, com acordos adequados de proteção de dados.',
  },
];

export default function LegalExperience() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]['key']>('terms');
  const activeDoc = legalDocuments[activeTab];

  return (
    <div className="min-h-screen">
      <AuthHero
        eyebrow="Transparência"
        title="Informações legais"
        subtitle="Nosso compromisso com políticas claras, compliance e padrões de segurança."
      />

      <section className="bg-castanha-100 py-12 md:py-16 border-b border-castanha-200">
        <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2.5 rounded-full text-[0.875rem] font-medium transition-all border ${
                  activeTab === tab.key
                    ? 'bg-cerrado-900 text-white border-cerrado-900'
                    : 'bg-white text-castanha-600 border-castanha-200 hover:border-castanha-300 hover:text-ink'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="max-w-[48rem] mx-auto rounded-[1.875rem] border border-castanha-200 bg-white p-8 md:p-10 shadow-[0_20px_40px_rgba(31,42,23,0.06)]">
            <div className="mb-8 pb-6 border-b border-castanha-200">
              <h2 className="text-ink text-[1.75rem] font-medium mb-2">{activeDoc.title}</h2>
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-castanha-500">
                Última atualização: {activeDoc.lastUpdated}
              </p>
            </div>
            <div className="space-y-8">
              {activeDoc.sections.map((section) => (
                <div key={section.heading}>
                  <h3 className="text-ink text-[1.125rem] font-medium mb-2">{section.heading}</h3>
                  <p className="text-castanha-600 text-[0.9375rem] leading-[175%]">{section.content}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 pt-7 border-t border-castanha-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-castanha-600 text-[0.9375rem]">
                Dúvidas sobre estes documentos?{' '}
                <Link href="/contact" className="text-ink font-medium hover:underline">
                  Fale conosco
                </Link>
              </p>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 text-castanha-500 hover:text-ink transition-colors text-[0.875rem] font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                  />
                </svg>
                Imprimir documento
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16 border-b border-castanha-200">
        <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
          <h2 className={sectionHeadingClass}>Nossas certificações</h2>
          <p className={`${sectionSubTextClass} mt-3 mb-10`}>Padrões validados que sustentam fluxos jurídicos corporativos.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert}
                className="rounded-[1.25rem] border border-castanha-200 bg-castanha-100/40 p-6 text-center hover:border-castanha-300 transition-colors"
              >
                <div className="w-14 h-14 rounded-xl bg-cerrado-900 text-white flex items-center justify-center mx-auto mb-4 text-sm font-semibold">
                  {cert.split(' ')[0]}
                </div>
                <h3 className="text-ink text-[0.9375rem] font-medium">{cert}</h3>
                <p className="text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-castanha-500 mt-1">Certificado</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-castanha-100 py-12 md:py-16">
        <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
          <h2 className={sectionHeadingClass}>Perguntas frequentes</h2>
          <div className="grid md:grid-cols-2 gap-4 mt-10">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-[1.25rem] border border-castanha-200 bg-white p-6">
                <h3 className="text-ink text-[1rem] font-medium mb-3">{faq.question}</h3>
                <p className="text-castanha-600 text-[0.9375rem] leading-[170%]">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-[1.875rem] border border-castanha-200 bg-cerrado-900 text-white p-8 md:p-10 text-center">
            <h3 className="text-[1.5rem] md:text-[1.75rem] font-medium mb-3">Ainda tem dúvidas?</h3>
            <p className="text-white/75 text-[1rem] max-w-2xl mx-auto mb-8">
              Nossa equipe jurídica pode ajudar com dúvidas sobre termos, privacidade ou compliance.
            </p>
            <Link
              href="/contact"
              className="inline-flex rounded-[0.875rem] bg-white text-ink px-8 py-3.5 text-[0.9375rem] font-medium hover:bg-castanha-100 transition-colors"
            >
              Falar com a equipe jurídica
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
