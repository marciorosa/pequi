import FadeInSection from './FadeInSection';
import { sectionHeadingClass, sectionSubTextClass } from './sectionStyles';

const capabilities = [
  {
    icon: '↔',
    title: 'Assistentes de IA',
    description:
      'Conecte-se a assistentes jurídicos especializados em redação, revisão, verificações de compliance e apoio a decisões mais rápidas.',
  },
  {
    icon: '✳',
    title: 'Inteligência de Conhecimento',
    description:
      'Obtenha insights instantâneos de precedentes, normas e documentos internos com buscas contextualizadas.',
  },
  {
    icon: '⇄',
    title: 'Registro de Documentos',
    description:
      'Crie e gerencie documentos jurídicos em segundos, acompanhe versões e mantenha cada caso alinhado e auditável.',
  },
  {
    icon: '⌘',
    title: 'Central de Canais',
    description:
      'Sincronize seus fluxos jurídicos entre equipes, clientes e sistemas para que a colaboração aconteça em um único lugar seguro.',
  },
  {
    icon: '▤',
    title: 'Painel de Desempenho',
    description:
      'Acompanhe o andamento dos casos, o tempo de resposta e as operações jurídicas com análises em tempo real em uma visão unificada.',
  },
  {
    icon: '◉',
    title: 'Cofre e Segurança',
    description:
      'Guarde arquivos jurídicos sensíveis em um cofre criptografado, com permissões baseadas em funções e controles de nível corporativo.',
  },
];

export default function PlatformCapabilitiesSection() {
  return (
    <FadeInSection delay={0.17}>
      <section id="platform-capabilities" className="scroll-mt-24 md:scroll-mt-28">
        <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
          <h3 className={sectionHeadingClass}>Descubra o que o Pequi pode fazer</h3>
          <p className={`${sectionSubTextClass} mt-4 mb-10 max-w-[38rem]`}>
            Simplifique as operações jurídicas com automação inteligente, colaboração segura e controle total dos fluxos de trabalho.
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
