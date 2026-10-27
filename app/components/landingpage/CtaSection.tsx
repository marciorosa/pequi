import Link from 'next/link';
import Image from 'next/image';
import FadeInSection from './FadeInSection';
import { sectionHeadingClass } from './sectionStyles';

export default function CtaSection() {
  return (
    <FadeInSection delay={0.18}>
      <section>
      <div className="max-w-[1274px] mx-auto px-4 md:px-8 lg:px-6 xl:px-0">
        <div className="relative overflow-hidden rounded-[2rem] text-white min-h-[280px] md:min-h-[340px] border border-cerrado-700/50">
          <div className="absolute inset-0 z-0 overflow-hidden rounded-[2rem]">
            <Image
              src="/landingpage/cta/bg-img.png"
              alt="Imagem de fundo da chamada"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(19,29,14,0.93)_0%,rgba(30,46,22,0.86)_52%,rgba(42,64,30,0.55)_100%)]" />

          <div className="relative z-10 flex h-full items-center p-6 md:p-12 lg:p-14">
            <div className="w-full max-w-[40rem]">
              <h3 className={`${sectionHeadingClass} text-left text-white max-w-none`}>Comece hoje mesmo</h3>
              <p className="w-full max-w-[39.1975rem] text-white/80 mt-5 text-[1rem] md:text-[1.125rem] lg:text-[1.25rem] leading-[160%]">
                Simplifique seus fluxos jurídicos, automatize pesquisas e obtenha insights poderosos com uma IA criada para
                os profissionais do Direito de hoje.
              </p>
              <div className="mt-8">
                <Link
                  href="/signup"
                  className="landing-primary-btn inline-flex justify-center items-center px-7 py-2.5 transition-all duration-300"
                >
                  Comece sua jornada
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
    </FadeInSection>
  );
}
