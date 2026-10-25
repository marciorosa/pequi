import Image from 'next/image';
import { sectionHeadingClass, sectionSubTextClass } from './sectionStyles';
import FadeInSection from './FadeInSection';

const featureItems = [
  {
    title: 'AI-Powered Legal Intelligence Search',
    description: 'Search with natural language, case IDs, or complex legal queries to instantly surface relevant insights.',
  },
  {
    title: 'AI Legal Assistant',
    description: 'Your intelligent co-pilot for legal work - ask questions, analyze documents, and get contextual recommendations.',
  },
  {
    title: 'Global Legal Database Access',
    description: 'Summarize agreements, convert images to text, translate documents, and search precedents in seconds.',
  },
  {
    title: 'Secure Document Vault Access',
    description: 'Enterprise-grade encrypted storage with controlled access and audit visibility for every legal document.',
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
        <h3 className={sectionHeadingClass}>Features of Legal AI</h3>
        <p className={`${sectionSubTextClass} mt-4 mb-10 max-w-[760px]`}>
          Build better outcomes with tools crafted for legal teams, faster drafting, and confident decision making.
        </p>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <article className="landing-card lg:col-span-8 p-4 md:p-5">
            <div className="rounded-[0.9rem] border border-[#ececf2] bg-[linear-gradient(180deg,#ffffff_0%,#f9f9fc_100%)] p-4 md:p-6">
              <div className="mx-auto max-w-[760px]">
                <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-xl border border-[#e1e4ef] bg-[#f8f7f6] px-4 py-2 shadow-[0_8px_16px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(0,0,0,0.1)]">
                  <span className="h-4 w-4 rounded bg-[#b5a7ff]" />
                  <span className="text-[0.92rem] font-medium tracking-[0.01em] text-[#10101A]">AI legal workspace preview</span>
                </div>
                <div className="relative mx-auto h-[250px] w-full overflow-hidden rounded-2xl border border-[#e1e4ef] bg-[#f1f0ee]">
                  <Image
                    src="/landingpage/features/workflow-automation.png"
                    alt="Legal AI workflow preview"
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 1024px) 100vw, 760px"
                  />
                </div>
                <div className="mt-4 rounded-xl border border-[#e1e4ef] bg-white px-4 py-3 md:px-5 md:py-4">
                  <h4 className="text-[1.05rem] font-medium leading-tight text-[#10101A]">AI Workflow Engine</h4>
                  <p className="mt-1.5 text-[0.9rem] leading-[1.35rem] text-[#525252]">
                    Trigger document actions, compliance checks, and delivery steps in one structured legal flow.
                  </p>
                </div>
              </div>
            </div>
          </article>

          <article className="landing-card lg:col-span-4 p-4 md:p-5">
            <div className="rounded-[0.9rem] border border-[#ececf2] bg-[linear-gradient(160deg,#171825_0%,#23253b_100%)] p-5 text-white">
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-white/75">Featured capability</p>
              <h4 className="mt-2 text-[1.2rem] font-medium leading-snug">AI Legal Assistant</h4>
              <ul className="mt-5 space-y-2.5 text-[0.92rem] leading-relaxed text-white/85">
                <li className="flex items-start gap-2"><span className="mt-1 text-white">▶</span><span>Ask legal questions in plain language.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1 text-white">▶</span><span>Get contextual drafting support and summaries.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1 text-white">▶</span><span>Clause-level risk flags with suggested next steps.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1 text-white">▶</span><span>Cross-check references against your document set instantly.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1 text-white">▶</span><span>Prepare client-ready responses with consistent legal tone.</span></li>
              </ul>
              <div className="mt-5 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-[0.8rem] text-white/80 transition-all duration-300 hover:border-white/30 hover:bg-white/15">
                Ready for contracts, compliance, and case prep.
              </div>
            </div>
          </article>

          {featureItems.slice(0, 3).map((item, idx) => (
            <article key={item.title} className="landing-card lg:col-span-4 p-4 md:p-5">
              <div className="overflow-hidden rounded-[0.9rem] border border-[#ececf2] bg-white">
                <div className="relative h-[220px] border-b border-[#e1e4ef] bg-white p-3">
                  <div className="relative h-full w-full overflow-hidden rounded-xl border border-[#e1e4ef] bg-white">
                    <Image
                      src={featureImages[idx]}
                      alt={`${item.title} preview`}
                      fill
                      className="object-contain p-3"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                </div>
                <div
                  className={`bg-white px-4 md:px-5 ${idx === 1 ? 'py-3 md:py-4' : 'py-4 md:py-5'}`}
                >
                  <h4 className="text-[1.12rem] font-medium leading-tight text-[#10101A]">{item.title}</h4>
                  <p className="mt-1.5 text-[0.9rem] leading-[1.35rem] text-[#525252]">{item.description}</p>
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
