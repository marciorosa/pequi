import Image from 'next/image';
import FadeInSection from './FadeInSection';
import SectionHeader, { container } from './SectionHeader';

// "Atenda mais clientes": foto única, duas listas sem caixa e números em linha.
const forFirm = ['Sua marca em todas as telas e e-mails', 'Chat de atendimento no seu site', 'Contatos de novos clientes', 'Sem programar nem manter servidor'];
const forClients = ['Dúvidas jurídicas em linguagem simples', 'Assistentes por área do Direito', 'Análise de documentos e contratos', 'Uso sem custo, pago pelo escritório'];
const stats = [
  { value: 'Sua marca', label: 'Logo, cores, nome e domínio' },
  { value: '24/7', label: 'Atendimento a qualquer hora' },
  { value: '30 áreas', label: 'Do consumidor à família' },
  { value: 'Brasil', label: 'Feito para a advocacia brasileira' },
];

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ink/45">{title}</p>
      <ul className="mt-3 border-t border-ink/12">
        {items.map((it) => (
          <li key={it} className="border-b border-ink/12 py-3 text-[0.98rem] text-ink/80">
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function WhySection() {
  return (
    <FadeInSection delay={0.14}>
      <section id="why" className="scroll-mt-20 py-20 lg:py-28">
        <div className={container}>
          <SectionHeader
            title="Atenda mais clientes com a sua marca"
            text="Uma assistente pronta, com a identidade do escritório. Os clientes tiram dúvidas a qualquer hora; a equipe recebe os contatos."
          />

          <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src="/landingpage/futureoflegal/img-left.png"
                alt="Equipe de advogados conversando"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 640px"
              />
            </div>
            <div className="grid content-start gap-10">
              <List title="Para o escritório" items={forFirm} />
              <List title="Para os seus clientes" items={forClients} />
            </div>
          </div>

          <dl className="mt-16 grid gap-8 border-t border-ink/12 pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.value}>
                <dt className="text-[clamp(2rem,3.4vw,2.75rem)] font-medium leading-none tracking-[-0.035em] text-ink">{s.value}</dt>
                <dd className="mt-3 text-[0.95rem] text-ink/60">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </FadeInSection>
  );
}
