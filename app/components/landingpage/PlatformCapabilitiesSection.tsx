import FadeInSection from './FadeInSection';
import { sectionHeadingClass, sectionSubTextClass } from './sectionStyles';

const capabilities = [
  {
    icon: '↔',
    title: 'AI Assistants',
    description:
      'Connect with specialized legal assistants for drafting, review, compliance checks, and faster decision support.',
  },
  {
    icon: '✳',
    title: 'Knowledge Intelligence',
    description:
      'Get instant insights from legal precedents, regulations, and internal documents with context-aware retrieval.',
  },
  {
    icon: '⇄',
    title: 'Document Registry',
    description:
      'Create and manage legal documents in seconds, track versions, and keep every matter aligned and auditable.',
  },
  {
    icon: '⌘',
    title: 'Channels Hub',
    description:
      'Sync your legal workflows across teams, clients, and systems so collaboration happens in one secure place.',
  },
  {
    icon: '▤',
    title: 'Performance Dashboard',
    description:
      'Monitor matter progress, response speed, and legal operations with real-time analytics in one unified view.',
  },
  {
    icon: '◉',
    title: 'Vault & Security',
    description:
      'Store sensitive legal files in an encrypted vault with role-based permissions and enterprise-grade controls.',
  },
];

export default function PlatformCapabilitiesSection() {
  return (
    <FadeInSection delay={0.17}>
      <section id="platform-capabilities" className="scroll-mt-24 md:scroll-mt-28">
        <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
          <h3 className={sectionHeadingClass}>Discover what AIForLawyers can do</h3>
          <p className={`${sectionSubTextClass} mt-4 mb-10 max-w-[38rem]`}>
            Simplify legal operations with intelligent automation, secure collaboration, and complete workflow control.
          </p>

          <div className="overflow-hidden rounded-[1.25rem] border border-[#e7e7ea] bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((item, idx) => (
                <article
                  key={item.title}
                  className={`p-8 ${idx % 3 !== 2 ? 'lg:border-r lg:border-[#e7e7ea]' : ''} ${idx < 3 ? 'border-b border-[#e7e7ea]' : ''} ${idx % 2 === 0 ? 'md:border-r md:border-[#e7e7ea] lg:border-r' : ''}`}
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#e8e8ed] bg-[#fbfbfd] text-[#1a1a23] text-[1.05rem] shadow-[0_6px_14px_rgba(0,0,0,0.05)]">
                    {item.icon}
                  </div>
                  <h4 className="mt-5 text-[#10101A] text-[1.75rem] font-medium leading-[1.2]">{item.title}</h4>
                  <p className="mt-3 text-[#5f5f6b] text-[1rem] leading-[1.55rem]">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}
