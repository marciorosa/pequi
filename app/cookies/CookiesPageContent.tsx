'use client';

import { useState } from 'react';
import {
  LegalDivider,
  LegalFooterBar,
  LegalHero,
  LegalLinkGrid,
  LegalMain,
  LegalParagraph,
  LegalSectionTitle,
  LegalSubsection,
  LegalTOC,
} from '@/app/components/legal/LegalDocChrome';

const cookiePolicy = {
  title: 'Política de Cookies',
  lastUpdated: '25 de outubro de 2023',
  sections: [
    {
      id: 'introduction',
      title: 'Introdução',
      content:
        "Esta Política de Cookies explica como a Pequi, Inc. ('Pequi', 'nós' ou 'nosso') utiliza cookies e tecnologias semelhantes em nosso site e aplicativos. Esta Política de Cookies deve ser lida em conjunto com nossa Política de Privacidade e nossos Termos de Serviço. Ao utilizar nossos serviços, você concorda com o uso de cookies conforme descrito nesta política.",
    },
    {
      id: 'what-are-cookies',
      title: 'O que são cookies',
      content:
        'Cookies são pequenos arquivos de texto armazenados no seu dispositivo (computador, tablet ou celular) quando você visita um site. Eles são amplamente utilizados para que os sites funcionem de forma mais eficiente e para fornecer informações aos seus proprietários. Os cookies melhoram sua experiência de navegação ao permitir que os sites lembrem suas preferências, entendam como você os utiliza e adaptem o conteúdo aos seus interesses.',
    },
    {
      id: 'cookie-types',
      title: 'Tipos de cookies que utilizamos',
      content: 'Utilizamos diferentes tipos de cookies para diversas finalidades:',
      subsections: [
        {
          title: 'Cookies essenciais',
          content:
            'Estes cookies são necessários para o funcionamento do nosso site e dos nossos serviços. Eles viabilizam funcionalidades básicas, como segurança, gerenciamento de rede e acesso à conta. Você pode desativá-los nas configurações do navegador, mas isso pode afetar o funcionamento.',
        },
        {
          title: 'Cookies de desempenho',
          content:
            'Estes cookies coletam informações sobre como os visitantes usam nosso site, como as páginas mais acessadas. Todas as informações coletadas por esses cookies são agregadas e anônimas.',
        },
        {
          title: 'Cookies de funcionalidade',
          content:
            'Estes cookies permitem que nosso site lembre as escolhas que você faz (nome de usuário, idioma, região) e ofereça recursos aprimorados e mais personalizados.',
        },
        {
          title: 'Cookies de segmentação/publicidade',
          content:
            'Estes cookies são usados para exibir anúncios mais relevantes para você e seus interesses, além de limitar o número de vezes que você vê um anúncio.',
        },
        {
          title: 'Cookies de terceiros',
          content:
            'Além dos nossos próprios cookies, podemos utilizar diversos cookies de terceiros para gerar estatísticas de uso, exibir anúncios e prestar outros serviços.',
        },
      ],
    },
    {
      id: 'specific-cookies',
      title: 'Cookies específicos que utilizamos',
      content: 'Veja a lista dos principais cookies que utilizamos:',
      cookieTable: [
        { name: 'auth_session', purpose: 'Mantém sua sessão de autenticação', duration: 'Sessão', type: 'Essencial' },
        { name: 'preferences', purpose: 'Armazena suas preferências e configurações', duration: '1 ano', type: 'Funcionalidade' },
        { name: 'analytics_id', purpose: 'Coleta dados anônimos sobre o uso do site', duration: '2 anos', type: 'Desempenho' },
        { name: 'marketing_id', purpose: 'Usado para publicidade segmentada', duration: '90 dias', type: 'Segmentação' },
      ],
    },
    {
      id: 'third-party',
      title: 'Cookies de terceiros',
      content:
        'Nosso site utiliza serviços dos seguintes terceiros, que podem armazenar cookies no seu dispositivo:',
      thirdParties: [
        { name: 'Google Analytics', purpose: 'Serviço de análise que acompanha e gera relatórios sobre o tráfego do site', privacyPolicy: 'https://policies.google.com/privacy' },
        { name: 'Stripe', purpose: 'Serviços de processamento de pagamentos', privacyPolicy: 'https://stripe.com/privacy' },
        { name: 'Intercom', purpose: 'Plataforma de mensagens com clientes', privacyPolicy: 'https://www.intercom.com/legal/privacy' },
        { name: 'LinkedIn', purpose: 'Rastreamento e publicidade em redes sociais', privacyPolicy: 'https://www.linkedin.com/legal/privacy-policy' },
      ],
    },
    {
      id: 'managing-cookies',
      title: 'Como gerenciar cookies',
      content:
        'A maioria dos navegadores permite gerenciar suas preferências de cookies. Você pode configurar o navegador para recusar cookies ou para avisar quando eles forem enviados. Se você desativar os cookies, alguns recursos dos nossos serviços podem não funcionar corretamente.',
      subsections: [
        {
          title: 'Configurações do navegador',
          content:
            'Você pode gerenciar cookies nas configurações do seu navegador. As instruções estão disponíveis nas seções de ajuda do Google Chrome, Mozilla Firefox, Safari e Microsoft Edge.',
        },
        {
          title: 'Ferramenta de preferências de cookies',
          content:
            "Você também pode gerenciar suas preferências para determinados tipos de cookies usando nossa Ferramenta de Preferências de Cookies, acessível ao clicar em 'Configurações de cookies' abaixo.",
        },
        {
          title: 'Do Not Track (Não rastrear)',
          content:
            "Alguns navegadores possuem o recurso 'Do Not Track' (Não rastrear). No momento, nosso sistema não responde aos sinais 'Do Not Track' dos navegadores.",
        },
      ],
    },
    {
      id: 'policy-changes',
      title: 'Alterações nesta Política de Cookies',
      content:
        "Podemos atualizar esta Política de Cookies periodicamente. Avisaremos sobre quaisquer alterações relevantes publicando a nova Política de Cookies nesta página e atualizando a data de 'Última atualização'.",
    },
    {
      id: 'contact-us',
      title: 'Fale conosco',
      content:
        'Se você tiver dúvidas sobre o uso de cookies, entre em contato pelo e-mail privacy@AIForLawyers.com ou escreva para: Pequi, Inc., 123 Legal Avenue, Suite 500, San Francisco, CA 94105, EUA.',
    },
  ],
};

type Section = {
  id: string;
  title: string;
  content: string;
  subsections?: { title: string; content: string }[];
  cookieTable?: { name: string; purpose: string; duration: string; type: string }[];
  thirdParties?: { name: string; purpose: string; privacyPolicy: string }[];
};

export default function CookiesPageContent() {
  const [showCookieSettings, setShowCookieSettings] = useState(false);

  return (
    <main className="min-h-screen">
      <LegalHero eyebrow="Transparência" title={cookiePolicy.title} lastUpdated={cookiePolicy.lastUpdated} />
      <LegalTOC items={cookiePolicy.sections.map((s) => ({ id: s.id, title: s.title }))} />
      <LegalMain>
        {cookiePolicy.sections.map((section: Section, index: number) => (
          <div key={section.id} id={section.id} className="mb-12 scroll-mt-28 md:scroll-mt-32">
            <LegalSectionTitle index={index} title={section.title} />
            <LegalParagraph className="mb-8 pl-0 sm:pl-12">{section.content}</LegalParagraph>
            {section.subsections?.map((sub) => (
              <LegalSubsection key={sub.title} title={sub.title}>
                {sub.content}
              </LegalSubsection>
            ))}
            {section.cookieTable && (
              <div className="mb-8 ml-0 overflow-x-auto rounded-2xl border border-castanha-150 bg-white shadow-[0_12px_28px_rgba(31,42,23,0.04)] sm:ml-12">
                <table className="w-full min-w-[36rem] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-castanha-150 bg-castanha-50">
                      <th className="px-5 py-3.5 text-left text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-castanha-600">Nome do cookie</th>
                      <th className="px-5 py-3.5 text-left text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-castanha-600">Finalidade</th>
                      <th className="px-5 py-3.5 text-left text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-castanha-600">Duração</th>
                      <th className="px-5 py-3.5 text-left text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-castanha-600">Tipo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-castanha-150">
                    {section.cookieTable.map((cookie) => (
                      <tr key={cookie.name} className="transition-colors hover:bg-castanha-50/80">
                        <td className="px-5 py-4 font-medium text-ink">{cookie.name}</td>
                        <td className="px-5 py-4 text-castanha-600">{cookie.purpose}</td>
                        <td className="px-5 py-4 text-castanha-600">{cookie.duration}</td>
                        <td className="px-5 py-4">
                          <span className="inline-block rounded-full border border-castanha-200 bg-castanha-100 px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-castanha-600">
                            {cookie.type}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {section.thirdParties && (
              <div className="mb-8 ml-0 grid gap-4 sm:ml-12 sm:grid-cols-2">
                {section.thirdParties.map((party) => (
                  <div
                    key={party.name}
                    className="rounded-2xl border border-castanha-150 bg-castanha-50 p-6 transition-all duration-300 hover:border-castanha-300 hover:shadow-[0_12px_28px_rgba(31,42,23,0.06)]"
                  >
                    <h3 className="mb-2 text-[1.0625rem] font-medium text-ink">{party.name}</h3>
                    <p className="mb-3 text-[0.9375rem] leading-[160%] text-castanha-600">{party.purpose}</p>
                    <a
                      href={party.privacyPolicy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-ink hover:underline"
                    >
                      Política de privacidade
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                ))}
              </div>
            )}
            {index < cookiePolicy.sections.length - 1 && <LegalDivider />}
          </div>
        ))}
      </LegalMain>

      {showCookieSettings && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-cerrado-900/25 p-4 backdrop-blur-sm md:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-prefs-title"
        >
          <div className="w-full max-w-2xl rounded-[2rem] border border-castanha-150 bg-white p-8 shadow-[0_24px_64px_rgba(31,42,23,0.12)] md:p-10">
            <h2 id="cookie-prefs-title" className="mb-8 text-[1.5rem] font-medium text-ink">
              Preferências de cookies
            </h2>
            <div className="mb-10 space-y-2">
              {[
                { label: 'Cookies essenciais', desc: 'Necessários para o funcionamento básico do site', locked: true, defaultOn: true },
                { label: 'Cookies de desempenho', desc: 'Ajudam a melhorar nosso site coletando dados anônimos', locked: false, defaultOn: true },
                { label: 'Cookies de funcionalidade', desc: 'Permitem personalizar sua experiência', locked: false, defaultOn: true },
                { label: 'Cookies de segmentação/publicidade', desc: 'Usados para exibir anúncios relevantes com base nos seus interesses', locked: false, defaultOn: false },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-4 border-b border-castanha-150 py-4 last:border-0">
                  <div>
                    <h3 className="mb-1 text-[1rem] font-medium text-ink">{item.label}</h3>
                    <p className="text-[0.9375rem] leading-[150%] text-castanha-600">{item.desc}</p>
                  </div>
                  <div
                    className={`relative inline-flex h-6 w-12 shrink-0 rounded-full transition-colors ${item.defaultOn ? 'bg-cerrado-900' : 'bg-castanha-200'} ${item.locked ? 'opacity-60' : ''}`}
                    aria-hidden
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm ${item.defaultOn ? 'right-1' : 'left-1'}`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-end gap-3 sm:flex-row">
              <button
                type="button"
                className="rounded-[0.875rem] border border-castanha-200 bg-castanha-100 px-6 py-3 text-[0.9375rem] font-medium text-ink transition-colors hover:bg-castanha-150"
                onClick={() => setShowCookieSettings(false)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="landing-primary-btn inline-flex h-11 items-center justify-center px-6 transition"
                onClick={() => setShowCookieSettings(false)}
              >
                Salvar preferências
              </button>
            </div>
          </div>
        </div>
      )}

      <LegalLinkGrid
        title="Recursos adicionais"
        items={[
          {
            href: '/privacy-policy',
            title: 'Política de Privacidade',
            desc: 'Saiba como coletamos, usamos e protegemos suas informações pessoais.',
            label: 'Ler a Política de Privacidade',
          },
          {
            href: '/terms',
            title: 'Termos de Serviço',
            desc: 'Leia os termos que regem o uso da nossa plataforma.',
            label: 'Ler os Termos',
          },
        ]}
      />
      <LegalFooterBar
        printLabel="Imprimir esta política"
        emailLabel="privacy@AIForLawyers.com"
        emailHref="mailto:privacy@AIForLawyers.com"
        extra={
          <button
            type="button"
            onClick={() => setShowCookieSettings(true)}
            className="inline-flex items-center gap-2 text-[0.8125rem] font-medium text-castanha-600 transition-colors hover:text-ink"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Configurações de cookies
          </button>
        }
      />
    </main>
  );
}
