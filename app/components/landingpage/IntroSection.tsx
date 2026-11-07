import Image from 'next/image';

export default function IntroSection({ imageSrc = '/landingpage/intro/ai-assistant-img.png' }: { imageSrc?: string }) {
  return (
    <section
      id="intro"
      aria-label="Prévia do produto"
      className="relative overflow-hidden px-4 pb-14 pt-6 sm:px-6 lg:px-8 lg:pb-20 lg:pt-10"
    >
      <div className="relative z-10 mx-auto mt-2 max-w-6xl sm:mt-4 lg:mt-8">
        <div className="relative overflow-hidden rounded-[1.5rem] bg-white p-2 [box-shadow:0_0_0_1px_var(--castanha-200),0_24px_64px_-28px_rgba(44,37,21,0.25)] sm:rounded-[2rem] sm:p-3">
          <Image
            src={imageSrc}
            alt="Prévia do painel do Pequi"
            width={1272}
            height={706}
            className="h-auto w-full rounded-[1rem] object-cover object-top sm:rounded-[1.4rem]"
            sizes="(max-width: 1274px) 100vw, 1274px"
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}
