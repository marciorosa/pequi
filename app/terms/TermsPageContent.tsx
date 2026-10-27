'use client';

import {
  LegalAcknowledgment,
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

const termsOfService = {
  title: 'Termos de Serviço',
  lastUpdated: '15 de novembro de 2023',
  sections: [
    {
      id: 'acceptance',
      title: 'Aceitação dos Termos',
      content:
        "Ao acessar ou usar o site, os serviços e os aplicativos do Pequi (em conjunto, os 'Serviços'), você concorda em ficar vinculado a estes Termos de Serviço ('Termos'). Se não concordar com estes Termos, você não poderá acessar nem usar os Serviços. Estes Termos constituem um acordo juridicamente vinculante entre você e a Pequi, Inc.",
      subsections: [
        {
          title: 'Elegibilidade',
          content:
            'Você deve ter pelo menos 18 anos para usar nossos Serviços. Ao usar nossos Serviços, você declara e garante que atende a todos os requisitos de elegibilidade descritos nestes Termos.',
        },
        {
          title: 'Alterações nos Termos',
          content:
            'Podemos modificar estes Termos a qualquer momento. Ao continuar usando nossos Serviços após a publicação das alterações, você concorda em ficar vinculado aos Termos revisados.',
        },
      ],
    },
    {
      id: 'account',
      title: 'Sua conta',
      content: 'Para usar determinados recursos dos nossos Serviços, pode ser necessário criar uma conta. Estes são os termos que se aplicam à sua conta:',
      subsections: [
        {
          title: 'Cadastro da conta',
          content:
            'Ao se cadastrar, você concorda em fornecer informações precisas, atualizadas e completas. Você é responsável por manter a confidencialidade das credenciais da sua conta e por todas as atividades realizadas nela.',
        },
        {
          title: 'Segurança da conta',
          content:
            'Você é responsável por manter a segurança da sua conta. Você deve nos avisar imediatamente sobre qualquer uso não autorizado da sua conta ou qualquer outra violação de segurança.',
        },
        {
          title: 'Encerramento da conta',
          content:
            'Reservamo-nos o direito de suspender ou encerrar sua conta, a nosso exclusivo critério e sem aviso prévio, por condutas que consideremos violar estes Termos ou que sejam prejudiciais a outros usuários, a nós ou a terceiros.',
        },
      ],
    },
    {
      id: 'services',
      title: 'Nossos Serviços',
      content:
        'O Pequi oferece ferramentas e serviços jurídicos com IA criados para auxiliar em pesquisas jurídicas, geração de documentos, análise de contratos e outras tarefas jurídicas. Nossos Serviços não substituem a orientação jurídica profissional, e não prestamos consultoria nem representação jurídica.',
      subsections: [
        {
          title: 'Licença de uso',
          content:
            'Sujeito a estes Termos, concedemos a você uma licença limitada, não exclusiva, intransferível e não sublicenciável para acessar e usar nossos Serviços para fins comerciais ou pessoais legítimos.',
        },
        {
          title: 'Limitações dos Serviços',
          content:
            'As informações e os documentos fornecidos por meio dos nossos Serviços não substituem a orientação jurídica profissional. Consulte sempre um advogado qualificado para obter orientações específicas para a sua situação.',
        },
        {
          title: 'Alterações nos Serviços',
          content:
            'Reservamo-nos o direito de modificar, suspender ou descontinuar qualquer parte dos nossos Serviços a qualquer momento, com ou sem aviso prévio.',
        },
      ],
    },
    {
      id: 'fees',
      title: 'Tarifas e pagamento',
      content: 'Alguns recursos dos nossos Serviços podem exigir o pagamento de tarifas. Estes são os termos que se aplicam aos serviços pagos:',
      subsections: [
        {
          title: 'Planos de assinatura',
          content:
            'Oferecemos diversos planos de assinatura com recursos e preços diferentes. Reservamo-nos o direito de alterar nossos preços e planos de assinatura a qualquer momento.',
        },
        {
          title: 'Processamento de pagamentos',
          content:
            'Você concorda em pagar todas as tarifas associadas ao uso dos nossos Serviços, de acordo com os preços e as condições de pagamento apresentados a você. Todas as obrigações de pagamento são irrevogáveis, e as tarifas pagas não são reembolsáveis, exceto conforme expressamente previsto nestes Termos.',
        },
        {
          title: 'Renovação da assinatura',
          content:
            'As assinaturas são renovadas automaticamente ao fim de cada período de cobrança, a menos que você cancele a assinatura antes da data de renovação.',
        },
      ],
    },
    {
      id: 'content',
      title: 'Conteúdo do usuário',
      content:
        "Nossos Serviços podem permitir que você envie, publique, armazene, transmita ou receba conteúdo ('Conteúdo do Usuário'). Estes são os termos aplicáveis:",
      subsections: [
        {
          title: 'Licença sobre o conteúdo',
          content:
            'Você mantém a titularidade de quaisquer direitos de propriedade intelectual sobre o seu Conteúdo do Usuário. Ao enviar Conteúdo do Usuário, você nos concede uma licença mundial e isenta de royalties para usá-lo com a finalidade limitada de operar e aprimorar nossos Serviços.',
        },
        {
          title: 'Restrições de conteúdo',
          content:
            'Você não pode enviar Conteúdo do Usuário que viole a legislação aplicável, infrinja direitos de propriedade intelectual, contenha vírus ou malware, seja difamatório ou obsceno, ou viole estes Termos.',
        },
      ],
    },
    {
      id: 'intellectual-property',
      title: 'Propriedade intelectual',
      content:
        'Nossos Serviços e todo o seu conteúdo, recursos e funcionalidades pertencem a nós, a nossos licenciadores ou a outros fornecedores e estão protegidos pelas leis de direitos autorais, marcas, patentes e demais leis de propriedade intelectual.',
      subsections: [
        {
          title: 'Restrições',
          content:
            'Você não pode reproduzir, distribuir, modificar, criar obras derivadas nem fazer engenharia reversa de qualquer parte dos nossos Serviços ou do Conteúdo dos Serviços sem nosso consentimento expresso e por escrito.',
        },
      ],
    },
    {
      id: 'disclaimer',
      title: 'Isenção de garantias',
      content:
        "NOSSOS SERVIÇOS SÃO FORNECIDOS 'NO ESTADO EM QUE SE ENCONTRAM' E 'CONFORME DISPONÍVEIS', SEM GARANTIAS DE QUALQUER TIPO, EXPRESSAS OU IMPLÍCITAS. ISENTAMO-NOS EXPRESSAMENTE DE QUAISQUER GARANTIAS DE COMERCIALIZAÇÃO, ADEQUAÇÃO A UMA FINALIDADE ESPECÍFICA OU NÃO VIOLAÇÃO. NÃO GARANTIMOS QUE NOSSOS SERVIÇOS ATENDERÃO ÀS SUAS NECESSIDADES OU ESTARÃO DISPONÍVEIS DE FORMA ININTERRUPTA, SEGURA OU LIVRE DE ERROS.",
    },
    {
      id: 'limitation',
      title: 'Limitação de responsabilidade',
      content:
        'EM NENHUMA HIPÓTESE NÓS OU NOSSAS AFILIADAS SEREMOS RESPONSÁVEIS POR QUAISQUER DANOS INDIRETOS, ESPECIAIS, INCIDENTAIS, CONSEQUENCIAIS OU PUNITIVOS. EM NENHUMA HIPÓTESE NOSSA RESPONSABILIDADE TOTAL POR TODAS AS REIVINDICAÇÕES RELACIONADAS AOS NOSSOS SERVIÇOS EXCEDERÁ O MAIOR VALOR ENTRE US$ 100 OU O VALOR PAGO POR VOCÊ A NÓS NOS 12 MESES ANTERIORES AO EVENTO QUE DEU ORIGEM À RESPONSABILIDADE.',
    },
    {
      id: 'governing-law',
      title: 'Lei aplicável e foro',
      content:
        'Estes Termos serão regidos pelas leis do Estado da Califórnia, independentemente de suas normas sobre conflito de leis. A jurisdição e o foro exclusivos para qualquer ação serão os tribunais estaduais e federais localizados no Condado de San Francisco, Califórnia.',
    },
    {
      id: 'contact',
      title: 'Fale conosco',
      content:
        'Se você tiver dúvidas sobre estes Termos, entre em contato pelo e-mail legal@AIForLawyers.com ou escreva para: Pequi, Inc., 123 Legal Avenue, Suite 500, San Francisco, CA 94105, EUA.',
    },
  ],
};

type Section = {
  id: string;
  title: string;
  content: string;
  subsections?: { title: string; content: string }[];
};

export default function TermsPageContent() {
  return (
    <main className="min-h-screen">
      <LegalHero eyebrow="Acordo jurídico" title={termsOfService.title} lastUpdated={termsOfService.lastUpdated} />
      <LegalTOC items={termsOfService.sections.map((s) => ({ id: s.id, title: s.title }))} />
      <LegalMain>
        {termsOfService.sections.map((section: Section, index: number) => (
          <div key={section.id} id={section.id} className="mb-12 scroll-mt-28 md:scroll-mt-32">
            <LegalSectionTitle index={index} title={section.title} />
            <LegalParagraph className="mb-8 pl-0 sm:pl-12">{section.content}</LegalParagraph>
            {section.subsections?.map((sub) => (
              <LegalSubsection key={sub.title} title={sub.title}>
                {sub.content}
              </LegalSubsection>
            ))}
            {index < termsOfService.sections.length - 1 && <LegalDivider />}
          </div>
        ))}
      </LegalMain>
      <LegalAcknowledgment ctaHref="/contact" ctaLabel="Fale conosco em caso de dúvidas">
        <h2 className="mb-4 text-[1.5rem] font-medium text-ink md:text-[1.75rem]">Ciência</h2>
        <LegalParagraph className="max-w-2xl mx-auto">
          Ao usar os serviços do Pequi, você declara que leu, compreendeu e concorda com estes Termos de Serviço.
        </LegalParagraph>
      </LegalAcknowledgment>
      <LegalLinkGrid
        title="Outros documentos legais"
        items={[
          {
            href: '/privacy-policy',
            title: 'Política de Privacidade',
            desc: 'Saiba como coletamos, usamos e protegemos suas informações pessoais.',
            label: 'Ler a Política de Privacidade',
          },
          {
            href: '/cookies',
            title: 'Política de Cookies',
            desc: 'Informações sobre como usamos cookies e tecnologias semelhantes.',
            label: 'Ler a Política de Cookies',
          },
        ]}
      />
      <LegalFooterBar printLabel="Imprimir estes termos" emailLabel="legal@AIForLawyers.com" emailHref="mailto:legal@AIForLawyers.com" />
    </main>
  );
}
