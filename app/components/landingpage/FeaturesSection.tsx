import Image from 'next/image';
import FadeInSection from './FadeInSection';
import SectionHeader, { container } from './SectionHeader';

// "Tudo com a sua marca": imagem única à esquerda e lista separada por linhas
// à direita. Sem cartões dentro de cartões.
const items = [
  { title: 'Painel com a sua marca', text: 'Logo, cores, nome e domínio do escritório em todas as telas.' },
  { title: 'Chat no seu site', text: 'Um código no site e a assistente passa a atender os visitantes.' },
  { title: 'Contatos para a equipe', text: 'Cada conversa do site chega como contato, com a primeira mensagem.' },
  { title: 'Documentos com IA', text: 'Resumo, comparação e tradução de contratos para os seus clientes.' },
  { title: 'A IA fala pelo escritório', text: 'Ela se apresenta com o nome do escritório, nunca com o do Pequi.' },
];

export default function FeaturesSection() {
  return (
    <FadeInSection delay={0.1}>
      <section id="features" className="scroll-mt-20 py-20 lg:py-28">
        <div className={container}>
          <SectionHeader
            title="Tudo com a sua marca"
            text="O escritório assina. Os clientes usam a assistente com o logo, as cores e o nome do escritório, sem pagar nada."
          />

          <div className="mt-12 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <div className="relative aspect-[2544/1412] self-start overflow-hidden rounded-3xl bg-[#F4EFDF]">
              <Image
                src="/landingpage/intro/channels-img.png"
                alt="Painel do Pequi com a marca do escritório"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 640px"
              />
            </div>

            <ul className="border-t border-ink/12">
              {items.map((it) => (
                <li key={it.title} className="grid gap-1 border-b border-ink/12 py-5 sm:grid-cols-[14rem_1fr] sm:gap-6">
                  <p className="text-[1.05rem] font-medium text-ink">{it.title}</p>
                  <p className="text-[0.98rem] leading-relaxed text-ink/60">{it.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}
