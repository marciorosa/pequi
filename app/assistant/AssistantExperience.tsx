'use client';

import Link from 'next/link';
import Image from 'next/image';
import AssistantChat from '../components/AssistantChat';
import FadeInSection from '../components/landingpage/FadeInSection';
import { sectionHeadingClass, sectionSubTextClass } from '../components/landingpage/sectionStyles';
import { ClosingCta, FeatureList, ProductHero } from '../components/landingpage/ProductBlocks';

export default function AssistantExperience() {
  const features = [
    {
      title: 'Linguagem natural',
      desc: 'O cliente escreve como falaria com a sua equipe. Sem comandos complicados.',
      icon: (
        <svg className="h-10 w-10 text-castanha-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
          />
        </svg>
      ),
    },
    {
      title: 'Geração de documentos',
      desc: 'Minutas prontas em segundos, para revisar e ajustar.',
      icon: (
        <svg className="h-10 w-10 text-castanha-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
      ),
    },
    {
      title: 'Pesquisa jurídica',
      desc: 'Leis e fundamentos indicados em cada resposta, para conferir na fonte.',
      icon: (
        <svg className="h-10 w-10 text-castanha-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      <ProductHero
        eyebrow="Agentes"
        title="A assistente jurídica do seu escritório"
        text="Seus clientes tiram dúvidas a qualquer hora, com o nome e a marca do escritório. A análise do caso continua com a sua equipe."
        primary={{ label: 'Levar para o meu escritório', href: '/contact' }}
        secondary={{ label: 'Experimentar o chat', href: '#demo' }}
        image="/landingpage/intro/ai-assistant-img.png"
        imageAlt="Tela dos agentes do Pequi"
      />

      <FeatureList
        columns={3}
        title="Feito para os seus clientes"
        text="Respostas claras, textos rápidos e pesquisa com fonte, em linguagem simples."
        items={features.map((f) => ({ title: f.title, text: f.desc }))}
      />

      <FadeInSection delay={0.12}>
        <section id="demo" className="scroll-mt-24 bg-white px-4 pb-16 sm:px-6 md:scroll-mt-28 lg:px-8 lg:pb-[5.5rem]">
          <div className="mx-auto max-w-[1274px]">
            <h2 className={sectionHeadingClass}>Veja como a assistente responde</h2>
            <p className={`${sectionSubTextClass} mb-10 mt-4 md:mb-12`}>
              Faça uma pergunta abaixo e veja como a assistente responde aos seus clientes, com o tom de um copiloto jurídico de confiança.
            </p>

            <div className="landing-surface overflow-hidden transition-shadow duration-300">
              <AssistantChat />
            </div>
          </div>
        </section>
      </FadeInSection>

      <ClosingCta
        title="Atenda seus clientes a qualquer hora"
        text="A assistente responde com a sua marca e entrega os contatos para a sua equipe."
        action={{ label: 'Falar com a equipe', href: '/contact' }}
      />
    </>
  );
}
