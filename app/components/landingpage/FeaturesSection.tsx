import Image from 'next/image';
import { sectionHeadingClass, sectionSubTextClass } from './sectionStyles';
import FadeInSection from './FadeInSection';

const featureItems = [
  {
    title: 'Pesquisa de Inteligência Jurídica com IA',
    description: 'Pesquise em linguagem natural, por número de processo ou com consultas jurídicas complexas para encontrar insights relevantes na hora.',
  },
  {
    title: 'Assistente Jurídico com IA',
    description: 'Seu copiloto inteligente para o trabalho jurídico: faça perguntas, analise documentos e receba recomendações contextualizadas.',
  },
  {
    title: 'Acesso a Base Jurídica Global',
    description: 'Resuma contratos, converta imagens em texto, traduza documentos e pesquise precedentes em segundos.',
  },
  {
    title: 'Acesso ao Cofre Seguro de Documentos',
    description: 'Armazenamento criptografado de nível corporativo, com acesso controlado e auditoria para cada documento jurídico.',
  },
];

const featureImages = [
  '/landingpage/features/ai-powered-legal-assistant.png',
  '/landingpage/features/ai-legal-assistant.png',
  '/landingpage/features/global-legal-database.png',
];

export default function FeaturesSection() {
  return (
    <FadeInSection delay={0.1}>
      <section id="features" className="scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
        <h3 className={sectionHeadingClass}>Recursos da IA jurídica</h3>
        <p className={`${sectionSubTextClass} mt-4 mb-10 max-w-[760px]`}>
          Alcance resultados melhores com ferramentas feitas para equipes jurídicas, redação mais rápida e decisões mais seguras.
        </p>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <article className="landing-card lg:col-span-8 p-4 md:p-5">
            <div className="rounded-[0.9rem] border border-castanha-150 bg-[linear-gradient(180deg,#ffffff_0%,#f9f9fc_100%)] p-4 md:p-6">
              <div className="mx-auto max-w-[760px]">
                <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-xl border border-castanha-200 bg-castanha-50 px-4 py-2 shadow-[0_8px_16px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(0,0,0,0.1)]">
                  <span className="h-4 w-4 rounded bg-pequi-200" />
                  <span className="text-[0.92rem] font-medium tracking-[0.01em] text-ink">Prévia do espaço de trabalho jurídico com IA</span>
                </div>
                <div className="relative mx-auto h-[250px] w-full overflow-hidden rounded-2xl border border-castanha-200 bg-castanha-100">
                  <Image
                    src="/landingpage/features/workflow-automation.png"
                    alt="Prévia do fluxo de trabalho com IA jurídica"
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 1024px) 100vw, 760px"
                  />
                </div>
                <div className="mt-4 rounded-xl border border-castanha-200 bg-white px-4 py-3 md:px-5 md:py-4">
                  <h4 className="text-[1.05rem] font-medium leading-tight text-ink">Motor de fluxos com IA</h4>
                  <p className="mt-1.5 text-[0.9rem] leading-[1.35rem] text-castanha-600">
                    Acione ações em documentos, verificações de compliance e etapas de entrega em um único fluxo jurídico estruturado.
                  </p>
                </div>
              </div>
            </div>
          </article>

          <article className="landing-card lg:col-span-4 p-4 md:p-5">
            <div className="rounded-[0.9rem] border border-castanha-150 bg-[linear-gradient(160deg,#171825_0%,#23253b_100%)] p-5 text-white">
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-white/75">Recurso em destaque</p>
              <h4 className="mt-2 text-[1.2rem] font-medium leading-snug">Assistente Jurídico com IA</h4>
              <ul className="mt-5 space-y-2.5 text-[0.92rem] leading-relaxed text-white/85">
                <li className="flex items-start gap-2"><span className="mt-1 text-white">▶</span><span>Faça perguntas jurídicas em linguagem simples.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1 text-white">▶</span><span>Receba apoio contextualizado na redação e resumos.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1 text-white">▶</span><span>Alertas de risco por cláusula, com sugestões de próximos passos.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1 text-white">▶</span><span>Confira referências com seu acervo de documentos instantaneamente.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1 text-white">▶</span><span>Prepare respostas prontas para o cliente com tom jurídico consistente.</span></li>
              </ul>
              <div className="mt-5 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-[0.8rem] text-white/80 transition-all duration-300 hover:border-white/30 hover:bg-white/15">
                Pronto para contratos, compliance e preparação de casos.
              </div>
            </div>
          </article>

          {featureItems.slice(0, 3).map((item, idx) => (
            <article key={item.title} className="landing-card lg:col-span-4 p-4 md:p-5">
              <div className="overflow-hidden rounded-[0.9rem] border border-castanha-150 bg-white">
                <div className="relative h-[220px] border-b border-castanha-200 bg-white p-3">
                  <div className="relative h-full w-full overflow-hidden rounded-xl border border-castanha-200 bg-white">
                    <Image
                      src={featureImages[idx]}
                      alt={`Prévia de ${item.title}`}
                      fill
                      className="object-contain p-3"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                </div>
                <div
                  className={`bg-white px-4 md:px-5 ${idx === 1 ? 'py-3 md:py-4' : 'py-4 md:py-5'}`}
                >
                  <h4 className="text-[1.12rem] font-medium leading-tight text-ink">{item.title}</h4>
                  <p className="mt-1.5 text-[0.9rem] leading-[1.35rem] text-castanha-600">{item.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      </section>
    </FadeInSection>
  );
}
