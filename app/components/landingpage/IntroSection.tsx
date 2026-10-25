import Image from 'next/image';

export default function IntroSection({ imageSrc = '/landingpage/intro/ai-assistant-img.png' }: { imageSrc?: string }) {
  return (
    <section
      id="intro"
      aria-label="Product preview"
      className="relative overflow-hidden px-4 pb-14 pt-6 sm:px-6 lg:px-8 lg:pb-20 lg:pt-10"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0">
        <Image
          src="/landingpage/intro/bg-img.png"
          alt="Intro gradient background"
          width={1920}
          height={843}
          priority={false}
          className="h-auto w-full object-contain"
          sizes="100vw"
        />
      </div>
      <div className="relative z-10 mx-auto mt-4 max-w-[1274px] sm:mt-6 lg:mt-20">
        <div className="relative overflow-hidden rounded-[1.25rem] ring-4 ring-white/95 sm:rounded-[1.5rem] [box-shadow:0_0_0_1px_rgba(255,255,255,0.98),0_24px_64px_rgba(16,16,26,0.08),0_48px_100px_rgba(16,16,26,0.05)]">
          <Image
            src={imageSrc}
            alt="AiForLawyers Enterprise dashboard showing AI Legal Specialists, search, and specialty cards"
            width={1272}
            height={706}
            className="h-auto w-full object-cover object-top"
            sizes="(max-width: 1274px) 100vw, 1274px"
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}
