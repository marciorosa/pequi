import FadeInSection from './FadeInSection';
import { sectionHeadingClass, sectionSubTextClass } from './sectionStyles';

const capabilities = [
  {
    icon: '↔',
    title: 'Assistentes de IA',
    description:
      'Conecte-se a assistentes jurídicos especializados em consumo, trabalho, família, moradia e contratos para decidir com mais tranquilidade.',
  },
  {
    icon: '✳',
    title: 'Inteligência de Conhecimento',
    description:
      'Encontre explicações instantâneas sobre leis, decisões e seus documentos com buscas simples.',
  },
  {
    icon: '⇄',
    title: 'Assinatura de Documento',
    description:
      'Crie documentos jurídicos em segundos, envie para assinatura pela DocuSign e mantenha cada caso sempre organizado.',
  },
  {
    icon: '⌘',
    title: 'Central de Canais',
    description:
      'Reúna conversas, arquivos e anotações sobre seus assuntos jurídicos para que tudo fique guardado em um único lugar seguro.',
  },
  {
    icon: '▤',
    title: 'Painel de Desempenho',
    description:
      'Acompanhe o andamento dos seus casos, os próximos passos e as pendências importantes com informações atualizadas em uma tela só para você.',
  },
  {
    icon: '◉',
    title: 'Cofre e Segurança',
    description:
      'Guarde documentos pessoais sensíveis em um cofre criptografado, com permissões definidas por você e controles de segurança reforçados.',
  },
];

export default function PlatformCapabilitiesSection() {
  return (
    <FadeInSection delay={0.17}>
      <section id="platform-capabilities" className="scroll-mt-24 md:scroll-mt-28">
        <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
          <h3 className={sectionHeadingClass}>Descubra o que o Pequi pode fazer</h3>
          <p className={`${sectionSubTextClass} mt-4 mb-10 max-w-[38rem]`}>
            Simplifique sua vida jurídica com automação inteligente, documentos seguros e controle total de cada etapa importante.
          </p>

          <div className="overflow-hidden rounded-[1.25rem] border border-castanha-200 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((item, idx) => (
                <article
                  key={item.title}
                  className={`p-8 ${idx % 3 !== 2 ? 'lg:border-r lg:border-castanha-200' : ''} ${idx < 3 ? 'border-b border-castanha-200' : ''} ${idx % 2 === 0 ? 'md:border-r md:border-castanha-200 lg:border-r' : ''}`}
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-castanha-100 bg-castanha-25 text-ink text-[1.05rem] shadow-[0_6px_14px_rgba(0,0,0,0.05)]">
                    {item.icon}
                  </div>
                  <h4 className="mt-5 text-ink text-[1.75rem] font-medium leading-[1.2]">{item.title}</h4>
                  <p className="mt-3 text-castanha-600 text-[1rem] leading-[1.55rem]">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}
