import FadeInSection from './FadeInSection';
import SectionHeader, { container } from './SectionHeader';

// "Como o escritório começa": quatro passos em colunas, separados por linhas.
const steps = [
  { title: 'Sua marca', text: 'Cadastre logo, cores, nome e domínio do escritório.' },
  { title: 'Chat no site', text: 'Cole o código no site e a assistente começa a atender.' },
  { title: 'Clientes', text: 'Eles criam a conta no seu painel e usam sem custo.' },
  { title: 'Acompanhamento', text: 'Sua equipe vê os clientes e os contatos deixados no chat.' },
];

export default function SecurityStrip() {
  return (
    <FadeInSection delay={0.12}>
      <section id="security" className="scroll-mt-20 bg-[#F4EFDF] py-20 lg:py-28">
        <div className={container}>
          <SectionHeader
            line={false}
            title="Como o escritório começa"
            text="Quatro passos, sem programar nada. Em poucos minutos a assistente já atende com a sua marca."
          />
          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map((s, i) => (
              <li key={s.title} className="border-t border-ink/20 pt-6">
                <span className="text-[0.75rem] tabular-nums text-ink/45">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-6 text-[1.4rem] font-medium tracking-[-0.02em] text-ink">{s.title}</h3>
                <p className="mt-2 max-w-[18rem] text-[0.98rem] leading-relaxed text-ink/60">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </FadeInSection>
  );
}
