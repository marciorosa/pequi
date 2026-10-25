import Image from 'next/image';
import FadeInSection from './FadeInSection';
import { sectionHeadingClass } from './sectionStyles';

export default function WhySection() {
  return (
    <FadeInSection delay={0.14}>
      <section id="why" className="scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
        <div className="landing-surface p-6 md:p-10 lg:p-12">
          <h3 className={sectionHeadingClass}>Powering the Future of Legal Work</h3>
          <p className="mt-5 mx-auto w-full max-w-[46rem] text-[#636977] text-center text-[1rem] md:text-[1.125rem] lg:text-[1.25rem] font-normal leading-[160%]">
            A unified platform designed to simplify complex legal operations, enhance decision-making, and bring speed
            to every workflow.
          </p>

          <div className="mt-10 grid lg:grid-cols-[1.15fr_0.85fr] gap-6 items-stretch">
            <div className="landing-card p-5 md:p-7">
              <div className="relative rounded-[1.25rem] min-h-[320px] md:min-h-[470px] overflow-hidden">
                <Image
                  src="/landingpage/futureoflegal/img-left.png"
                  alt="Powering the future of legal work"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="landing-card p-5 md:p-6">
                <h4 className="text-[#10101A] text-[1.25rem] md:text-[1.35rem] font-medium leading-[1.35]">Smart Legal Infrastructure</h4>
                <ul className="mt-4 space-y-2.5 text-[#636977] text-[1rem] leading-[1.55rem]">
                  <li>All-in-one legal platform</li>
                  <li>Easy case management</li>
                  <li>Built to scale</li>
                  <li>Centralized compliance controls</li>
                  <li>Secure team collaboration</li>
                </ul>
              </div>
              <div className="landing-card p-5 md:p-6">
                <h4 className="text-[#10101A] text-[1.25rem] md:text-[1.35rem] font-medium leading-[1.35]">Intelligent Automation</h4>
                <ul className="mt-4 space-y-2.5 text-[#636977] text-[1rem] leading-[1.55rem]">
                  <li>Automate routine tasks</li>
                  <li>AI-powered insights</li>
                  <li>Less manual work</li>
                  <li>Smart document extraction</li>
                  <li>Automated approval flows</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="landing-card mt-6 p-6 md:p-10 lg:p-[48px]">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <p className="text-[#111827] text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-medium leading-none">10x Faster</p>
                <p className="text-[#636977] text-[1rem] font-semibold leading-[1.28225rem] uppercase mt-[10px]">Workflows</p>
                <p className="mt-2 w-full max-w-[170px] text-[#636977] text-[1rem] font-normal leading-[1.28225rem]">Accelerate research and document handling</p>
              </div>
              <div>
                <p className="text-[#111827] text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-medium leading-none">24/7</p>
                <p className="text-[#636977] text-[1rem] font-semibold leading-[1.28225rem] uppercase mt-[10px]">AI Support</p>
                <p className="mt-2 w-full max-w-[170px] text-[#636977] text-[1rem] font-normal leading-[1.28225rem]">Continuous assistance whenever you need it</p>
              </div>
              <div>
                <p className="text-[#111827] text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-medium leading-none">50K+</p>
                <p className="text-[#636977] text-[1rem] font-semibold leading-[1.28225rem] uppercase mt-[10px]">Cases Managed</p>
                <p className="mt-2 w-full max-w-[170px] text-[#636977] text-[1rem] font-normal leading-[1.28225rem]">Handled efficiently across teams</p>
              </div>
              <div>
                <p className="text-[#111827] text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-medium leading-none">Trusted</p>
                <p className="text-[#636977] text-[1rem] font-semibold leading-[1.28225rem] uppercase mt-[10px]">By Professionals</p>
                <p className="mt-2 w-full max-w-[170px] text-[#636977] text-[1rem] font-normal leading-[1.28225rem]">Used by modern legal teams worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
    </FadeInSection>
  );
}
