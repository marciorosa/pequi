'use client';

import Link from 'next/link';
import Image from 'next/image';
import FadeInSection from '../components/landingpage/FadeInSection';
import { sectionHeadingClass, sectionSubTextClass } from '../components/landingpage/sectionStyles';
import { ClosingCta, FeatureList, ProductHero } from '../components/landingpage/ProductBlocks';

const featureCardClass =
  'flex min-h-[240.8px] flex-col rounded-2xl border border-castanha-150 bg-castanha-100/85 px-5 py-5 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5';

export default function WorkflowsExperience() {
  const benefits = [
    {
      title: 'Menos trabalho manual',
      description: 'Tarefas repetitivas rodam sozinhas; a equipe cuida do que importa.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      ),
    },
    {
      title: 'Arquivamento no cofre',
      description: 'Cada documento gerado vai direto para a pasta certa do Cofre.',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
    },
    {
      title: 'Menos erros nas transições',
      description: 'A IA prepara cada etapa e você revisa antes de enviar.',
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
      title: 'Integração com o cofre',
      description: 'Fluxos e Cofre conversam: nada fica perdido no e-mail.',
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

  const integrations = [
    { title: 'Assinatura eletrônica', text: 'Envio para assinatura pelo DocuSign, direto do fluxo.' },
    { title: 'Cofre na AWS', text: 'Documentos e PDFs assinados guardados nas pastas do Cofre.' },
    { title: 'IA jurídica', text: 'Resumo, análise de riscos e minutas com Maritaca e Gemini.' },
    { title: 'E-mail', text: 'Envio do resultado para o cliente ou para a equipe.' },
    { title: 'Pesquisa jurídica', text: 'Consulta à base de conhecimento dentro do fluxo.' },
    { title: 'Revisão humana', text: 'Cada etapa pode parar para o advogado aprovar.' },
  ];

  const steps = [
    { num: '1', title: 'Desenhe', desc: 'Monte as etapas do fluxo num editor visual.' },
    { num: '2', title: 'Automatize', desc: 'Inclua etapas de geração de texto e de análise por IA.' },
    { num: '3', title: 'Execute', desc: 'Rode o fluxo quando precisar, com um clique.' },
    { num: '4', title: 'Revise', desc: 'Confira o resultado de cada etapa antes de usar.' },
  ];

  return (
    <>
      <ProductHero
        eyebrow="Automações"
        title="Fluxos que trabalham pelo escritório"
        text="O documento chega, a IA resume e analisa, envia para assinatura e guarda no Cofre. Você revisa cada etapa."
        primary={{ label: 'Montar meu primeiro fluxo', href: '/signup' }}
        secondary={{ label: 'Como funciona', href: '#como-funciona' }}
        image="/landingpage/intro/automation-img.png"
        imageAlt="Editor de fluxos do Pequi"
      />

      <FeatureList
        title="Menos burocracia no atendimento"
        text="Automatize o que se repete e dedique o tempo da equipe ao que importa."
        items={benefits.map((b) => ({ title: b.title, text: b.description }))}
      />

      <div id="como-funciona" className="scroll-mt-20">
        <FeatureList
          tone="sand"
          title="Como funciona"
          text="Do primeiro esboço ao assunto resolvido, em quatro etapas."
          items={steps.map((st) => ({ title: st.title, text: st.desc }))}
        />
      </div>

      <FeatureList
        columns={3}
        title="Integrações que já funcionam"
        text="Os fluxos usam as ferramentas que o escritório já confia."
        items={integrations}
      />

      <ClosingCta
        title="Comece com um fluxo pronto"
        text="Receber, analisar, assinar e arquivar: monte em minutos no editor visual."
        action={{ label: 'Criar conta grátis', href: '/signup' }}
      />

    </>
  );
}
