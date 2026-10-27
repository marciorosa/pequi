'use client';

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

const privacyPolicy = {
  title: 'Política de Privacidade',
  lastUpdated: '10 de novembro de 2023',
  sections: [
    {
      id: 'introduction',
      title: 'Introdução',
      content:
        'No Pequi, levamos sua privacidade a sério. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações quando você visita nosso site ou usa nossos serviços. Leia esta Política de Privacidade com atenção. Se você não concordar com os termos desta Política de Privacidade, não acesse o site nem use nossos serviços.',
    },
    {
      id: 'information-we-collect',
      title: 'Informações que coletamos',
      content: 'Coletamos informações de várias formas quando você usa nossos serviços:',
      subsections: [
        {
          title: 'Informações pessoais que você fornece',
          content:
            'Coletamos as informações pessoais que você nos fornece voluntariamente ao se cadastrar, manifestar interesse em obter informações sobre nós ou nossos produtos e serviços, participar de atividades em nossos serviços ou entrar em contato conosco. Isso pode incluir nome, endereço de e-mail, dados de cobrança e outras informações que você decida fornecer.',
        },
        {
          title: 'Informações coletadas automaticamente',
          content:
            'Quando você usa nossos serviços, coletamos automaticamente determinadas informações sobre seu dispositivo e sobre como você interage com nossos serviços. Isso inclui dados do dispositivo (endereço IP, tipo de navegador, sistema operacional) e dados de uso (páginas visitadas, tempo de permanência, sites de origem).',
        },
        {
          title: 'Documentos e conteúdos jurídicos',
          content:
            'Quando você envia ou cria documentos e conteúdos jurídicos usando nossos serviços, coletamos e armazenamos essas informações. Isso pode incluir informações jurídicas sensíveis relacionadas aos seus casos, contratos e outros assuntos jurídicos.',
        },
      ],
    },
    {
      id: 'how-we-use-information',
      title: 'Como usamos suas informações',
      content: 'Podemos usar as informações coletadas para diversas finalidades, incluindo:',
      bulletPoints: [
        'Fornecer, operar e manter nossos serviços',
        'Aprimorar, personalizar e expandir nossos serviços',
        'Entender e analisar como você usa nossos serviços',
        'Desenvolver novos produtos, serviços, recursos e funcionalidades',
        'Comunicar-nos com você diretamente ou por meio de nossos parceiros',
        'Processar suas transações e gerenciar sua conta',
        'Enviar e-mails e novidades sobre nossos serviços',
        'Identificar e prevenir fraudes ou outras atividades prejudiciais',
      ],
    },
    {
      id: 'sharing-information',
      title: 'Compartilhamento das suas informações',
      content: 'Podemos compartilhar suas informações nas seguintes situações:',
      subsections: [
        {
          title: 'Com prestadores de serviços',
          content:
            'Podemos compartilhar suas informações com fornecedores, prestadores de serviços, contratados ou agentes terceirizados que prestam serviços para nós ou em nosso nome e que precisam acessar essas informações para realizar esse trabalho.',
        },
        {
          title: 'Transferências empresariais',
          content:
            'Podemos compartilhar ou transferir suas informações em conexão com, ou durante negociações de, qualquer fusão, venda de ativos da empresa, financiamento ou aquisição de todo ou parte do nosso negócio por outra empresa.',
        },
        {
          title: 'Exigências legais',
          content:
            'Podemos divulgar suas informações quando formos legalmente obrigados a fazê-lo para cumprir a legislação aplicável, solicitações governamentais, processos judiciais, ordens judiciais ou procedimentos legais.',
        },
      ],
    },
    {
      id: 'data-security',
      title: 'Segurança dos dados',
      content:
        'Adotamos medidas de segurança técnicas e organizacionais adequadas para proteger as informações pessoais que tratamos. Lembre-se de que nenhum método de transmissão pela Internet ou de armazenamento eletrônico é 100% seguro, e não podemos garantir segurança absoluta.',
    },
    {
      id: 'data-retention',
      title: 'Retenção de dados',
      content:
        'Manteremos suas informações pessoais apenas pelo tempo necessário para as finalidades descritas nesta Política de Privacidade. Quando não precisarmos mais usar seus dados, iremos excluí-los com segurança ou anonimizá-los.',
    },
    {
      id: 'your-rights',
      title: 'Seus direitos de privacidade',
      content: 'Dependendo da sua localização, você pode ter determinados direitos sobre suas informações pessoais, como:',
      bulletPoints: [
        'Direito de acesso – Solicitar cópias das suas informações pessoais.',
        'Direito de retificação – Solicitar a correção de informações imprecisas ou incompletas.',
        'Direito de eliminação – Solicitar que eliminemos suas informações pessoais.',
        'Direito de restringir o tratamento – Solicitar que restrinjamos o tratamento das suas informações.',
        'Direito à portabilidade dos dados – Solicitar a transferência das suas informações pessoais.',
        'Direito de oposição – Opor-se ao tratamento das suas informações pessoais.',
      ],
      additionalContent:
        'Para exercer qualquer um desses direitos, entre em contato pelo e-mail privacy@AIForLawyers.com. Responderemos à sua solicitação em até 30 dias.',
    },
    {
      id: 'international-transfers',
      title: 'Transferências internacionais de dados',
      content:
        'Nossos serviços são operados nos Estados Unidos. Se você estiver no Brasil, no Espaço Econômico Europeu, no Reino Unido ou em outras regiões com leis que regulam a coleta de dados, observe que poderemos transferir informações para um país que não possui as mesmas leis de proteção de dados da sua jurisdição. Tomaremos todas as medidas razoavelmente necessárias para garantir que seus dados sejam tratados com segurança.',
    },
    {
      id: 'children-privacy',
      title: 'Privacidade de crianças e adolescentes',
      content:
        'Nossos serviços não se destinam a menores de 18 anos. Não coletamos intencionalmente informações pessoais de menores de 18 anos. Se você acredita que possamos ter informações de ou sobre um menor de 18 anos, entre em contato pelo e-mail privacy@AIForLawyers.com.',
    },
    {
      id: 'changes-to-policy',
      title: 'Alterações nesta Política de Privacidade',
      content:
        "Podemos atualizar esta Política de Privacidade periodicamente. Avisaremos sobre quaisquer alterações relevantes publicando a nova Política de Privacidade nesta página e atualizando a data de 'Última atualização'.",
    },
    {
      id: 'contact-us',
      title: 'Fale conosco',
      content:
        'Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato pelo e-mail privacy@AIForLawyers.com ou escreva para: Pequi, Inc., 123 Legal Avenue, Suite 500, San Francisco, CA 94105, EUA.',
    },
  ],
};

type Section = {
  id: string;
  title: string;
  content: string;
  subsections?: { title: string; content: string }[];
  bulletPoints?: string[];
  additionalContent?: string;
};

export default function PrivacyPageContent() {
  return (
    <main className="min-h-screen">
      <LegalHero eyebrow="Proteção de dados" title={privacyPolicy.title} lastUpdated={privacyPolicy.lastUpdated} />
      <LegalTOC items={privacyPolicy.sections.map((s) => ({ id: s.id, title: s.title }))} />
      <LegalMain>
        {privacyPolicy.sections.map((section: Section, index: number) => (
          <div key={section.id} id={section.id} className="mb-12 scroll-mt-28 md:scroll-mt-32">
            <LegalSectionTitle index={index} title={section.title} />
            <LegalParagraph className="mb-8 pl-0 sm:pl-12">{section.content}</LegalParagraph>
            {section.subsections?.map((sub) => (
              <LegalSubsection key={sub.title} title={sub.title}>
                {sub.content}
              </LegalSubsection>
            ))}
            {section.bulletPoints && (
              <ul className="mb-6 list-none space-y-2.5 pl-0 sm:pl-12">
                {section.bulletPoints.map((point) => (
                  <li key={point} className="flex gap-3 text-[0.9375rem] leading-[175%] text-castanha-600 md:text-[1rem]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cerrado-900" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            )}
            {section.additionalContent && (
              <LegalParagraph className="mt-4 pl-0 sm:pl-12">{section.additionalContent}</LegalParagraph>
            )}
            {index < privacyPolicy.sections.length - 1 && <LegalDivider />}
          </div>
        ))}
      </LegalMain>
      <LegalLinkGrid
        title="Recursos adicionais"
        items={[
          {
            href: '/terms',
            title: 'Termos de Serviço',
            desc: 'Leia os Termos de Serviço que regem o uso da nossa plataforma.',
            label: 'Ler os Termos',
          },
          {
            href: '/cookies',
            title: 'Política de Cookies',
            desc: 'Saiba como usamos cookies e tecnologias semelhantes.',
            label: 'Ler a Política de Cookies',
          },
          {
            href: '/security',
            title: 'Práticas de segurança',
            desc: 'Descubra como protegemos seus dados e mantemos a segurança.',
            label: 'Saiba mais sobre segurança',
          },
          {
            href: '/contact',
            title: 'Solicitação de dados',
            desc: 'Solicite uma cópia dos seus dados ou exerça seus direitos de privacidade.',
            label: 'Falar com a equipe de privacidade',
          },
        ]}
      />
      <LegalFooterBar printLabel="Imprimir esta política" emailLabel="privacy@AIForLawyers.com" emailHref="mailto:privacy@AIForLawyers.com" />
    </main>
  );
}
