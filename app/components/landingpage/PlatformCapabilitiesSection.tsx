import FadeInSection from './FadeInSection';
import SectionHeader, { container } from './SectionHeader';

// Seis recursos em grade aberta, cada um com uma linha no topo. Sem caixas.
const capabilities = [
  { title: 'Assistentes de IA', text: 'Especialistas em consumo, trabalho, família, moradia e contratos, com o nome do escritório.' },
  { title: 'Chat no site', text: 'A assistente atende os visitantes do site e entrega o contato para a sua equipe.' },
  { title: 'Documentos', text: 'Os clientes criam, analisam e comparam documentos. Os PDFs saem com a sua marca.' },
  { title: 'Marca do escritório', text: 'Logo, cores, nome e domínio próprio. A IA e os e-mails também falam pelo escritório.' },
  { title: 'Fluxos de trabalho', text: 'Etapas automáticas para o que se repete: receber, analisar, assinar e arquivar.' },
  { title: 'Cofre seguro', text: 'Pastas protegidas por senha, guardadas na nuvem da AWS.' },
];

export default function PlatformCapabilitiesSection() {
  return (
    <FadeInSection delay={0.17}>
      <section id="platform-capabilities" className="scroll-mt-20 py-20 lg:py-28">
        <div className={container}>
          <SectionHeader
            line={false}
            title="O que o seu escritório passa a oferecer"
            text="Seis recursos prontos para os seus clientes, com a sua marca desde o primeiro dia."
          />
          <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c, i) => (
              <article key={c.title} className="border-t border-ink/20 pt-6">
                <span className="text-[0.75rem] tabular-nums text-ink/45">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-5 text-[1.4rem] font-medium tracking-[-0.02em] text-ink">{c.title}</h3>
                <p className="mt-2 max-w-[22rem] text-[0.98rem] leading-relaxed text-ink/60">{c.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}
