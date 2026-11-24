'use client';

import Link from 'next/link';
import Image from 'next/image';
import FadeInSection from '../components/landingpage/FadeInSection';
import { sectionHeadingClass, sectionSubTextClass } from '../components/landingpage/sectionStyles';
import { ClosingCta, FeatureList, ProductHero } from '../components/landingpage/ProductBlocks';

const featureCardClass =
  'flex min-h-[240.8px] flex-col rounded-2xl border border-castanha-150 bg-castanha-100/85 px-5 py-5 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5';

const certCardClass =
  'rounded-2xl border border-castanha-150 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-0.5 md:p-8';

export default function SecurityExperience() {
  const securityFeatures = [
    {
      title: 'Conexão criptografada',
      description: 'A comunicação entre o seu navegador e a plataforma usa HTTPS.',
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
      title: 'Senhas protegidas',
      description: 'As senhas são guardadas com hash (bcrypt), nunca em texto puro.',
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
      title: 'Pastas com senha',
      description: 'No Cofre, você pode proteger pastas sensíveis com uma senha própria.',
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
      title: 'Sessões com prazo',
      description: 'O acesso usa tokens de sessão que expiram e precisam ser renovados com novo login.',
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
      title: 'Acesso individual',
      description: 'Cada conta consulta apenas os próprios documentos, conversas e arquivos. Cada escritório vê apenas os próprios clientes e contatos.',
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
      title: 'Armazenamento em nuvem',
      description: 'Os arquivos do Cofre ficam na AWS (Amazon S3), com acesso restrito à conta de cada cliente.',
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
    { name: 'LGPD', description: 'Seus direitos como titular estão na Política de Privacidade' },
    { name: 'Exclusão', description: 'Você pode apagar documentos e pastas a qualquer momento' },
    { name: 'Sem venda', description: 'Não vendemos seus dados pessoais' },
    { name: 'Contato', description: 'Dúvidas sobre dados: fale com a equipe pelo formulário' },
  ];

  const checkItems = [
    'Conexão criptografada (HTTPS) em todo o site',
    'Senhas guardadas com hash, nunca em texto puro',
    'Cada conta acessa apenas os próprios dados',
  ];

  return (
    <>
      <ProductHero
        eyebrow="Segurança"
        title="Dados do escritório e dos clientes protegidos"
        text="Confidencialidade, integridade e disponibilidade no centro de cada atendimento, do login ao Cofre."
        primary={{ label: 'Falar com a equipe', href: '/contact' }}
        secondary={{ label: 'Ver os controles', href: '#features' }}
        image="/landingpage/security/revisao-de-documentos.jpg"
        imageAlt="Advogada revisando documentos"
        imageRatio="16/7"
      />

      <FadeInSection delay={0.06}>
        <section className="py-20 lg:py-28">
          <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-[clamp(2.1rem,4.4vw,3.6rem)] font-medium leading-[1.04] tracking-[-0.035em] text-ink">
                Segurança desde o projeto
              </h2>
              <p className="mt-5 max-w-[520px] text-[1.02rem] leading-relaxed text-ink/65">
                Criptografia, controle de acesso e cuidado com o ambiente de produção. Revisamos as proteções conforme a plataforma evolui.
              </p>
              <ul className="mt-8 border-t border-ink/12">
                {checkItems.map((item) => (
                  <li key={item} className="border-b border-ink/12 py-3 text-[0.98rem] text-ink/80">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src="/landingpage/security/justica.jpg"
                alt="Estátua da Justiça segurando a balança"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            </div>
          </div>
        </section>
      </FadeInSection>

      <div id="features" className="scroll-mt-20">
        <FeatureList
          tone="sand"
          columns={3}
          title="Controles de segurança"
          text="O que o escritório pode esperar antes de oferecer a IA aos clientes."
          items={securityFeatures.map((f) => ({ title: f.title, text: f.description }))}
        />
      </div>

      <FeatureList
        title="Privacidade e seus dados"
        text="O Pequi ainda não tem certificações de segurança. Veja como tratamos os seus dados."
        items={certifications.map((c) => ({ title: c.name, text: c.description }))}
      />

      <ClosingCta
        title="Precisa dos detalhes técnicos?"
        text="Enviamos a arquitetura, os controles e como tratamos incidentes e suboperadores."
        action={{ label: 'Solicitar materiais', href: '/contact' }}
      />
    </>
  );
}
