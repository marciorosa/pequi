import FadeInSection from './FadeInSection';
import { sectionHeadingClass } from './sectionStyles';

export default function SecurityStrip() {
  const steps = [
    {
      id: '01',
      title: 'Assistant',
      desc: 'Optimize your expertise with a specialized AI personal assistant for legal research and drafting.',
      tone: 'from-[#21D4C8] to-[#14AFA4]',
    },
    {
      id: '02',
      title: 'Knowledge',
      desc: 'Instant access to case law, regulatory changes, and legal precedents with verified citations.',
      tone: 'from-[#2996FF] to-[#1E6ED5]',
    },
    {
      id: '03',
      title: 'Vault',
      desc: 'Securely analyze thousands of documents using powerful generative AI extraction tools.',
      tone: 'from-[#7A53F5] to-[#5B36CC]',
    },
    {
      id: '04',
      title: 'Workflows',
      desc: 'Multi-model agent workflows designed to streamline complex legal and administrative operations.',
      tone: 'from-[#FF8A5B] to-[#E35B5B]',
    },
  ];

  return (
    <FadeInSection delay={0.12}>
      <section id="security" className="bg-[#EFF3FF] scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
        <div className="rounded-[2rem] p-6 md:p-10 lg:p-12">
          <h3 className={sectionHeadingClass}>One Integrated, Secure Platform</h3>
          <p className="w-full max-w-[39.1975rem] mx-auto text-center text-[#636977] text-[1rem] md:text-[1.125rem] lg:text-[1.25rem] font-normal leading-[160%] mt-4">
            Explore features that boost productivity, strengthen compliance, and simplify legal operations across teams.
          </p>

          <div className="mt-10 lg:mt-14">
            <div className="relative mb-5 hidden h-8 lg:block">
              <div className="absolute left-[12.5%] right-[12.5%] top-4 border-t border-dashed border-[#CDD0D8]" />
              <div className="absolute left-[12.5%] top-[0.72rem] h-2 w-2 -translate-x-1/2 rounded-sm bg-[#1ABDB0]" />
              <div className="absolute left-[37.5%] top-[0.72rem] h-2 w-2 -translate-x-1/2 rounded-sm bg-[#2A82EE]" />
              <div className="absolute left-[62.5%] top-[0.72rem] h-2 w-2 -translate-x-1/2 rounded-sm bg-[#744BEE]" />
              <div className="absolute left-[87.5%] top-[0.72rem] h-2 w-2 -translate-x-1/2 rounded-sm bg-[#E35B5B]" />
            </div>
            <div className="grid gap-9 lg:grid-cols-4">
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col items-center text-center">
                  <div className={`relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-b ${step.tone} text-white text-[1.5rem] font-medium shadow-[0_8px_24px_rgba(0,0,0,0.16)]`}>
                    {step.id}
                  </div>
                  <h4 className="mt-5 text-[#10101A] text-center text-[1.5rem] font-medium leading-[2.1rem]">
                    {step.title}
                  </h4>
                  <p className="mt-3 max-w-[24rem] text-[#636977] text-[1rem] font-normal leading-[1.55rem]">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </section>
    </FadeInSection>
  );
}
