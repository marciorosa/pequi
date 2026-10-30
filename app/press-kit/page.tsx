'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function PressKitPage() {
  const [activeTab, setActiveTab] = useState('about');

  const companyInfo = { name: "Pequi, Inc.", tagline: "Transformando a prática jurídica com IA", founded: "2020", headquarters: "San Francisco, Califórnia", employees: "120+", funding: "US$ 75 milhões em capital de risco", investors: "Sequoia Capital, Andreessen Horowitz e Bessemer Venture Partners" };

  const executives = [
    { name: "Michael Chen", position: "Diretor Executivo (CEO)", bio: "Michael Chen é CEO e cofundador do Pequi. Anteriormente, foi sócio da McKinsey & Company, onde liderou a área de legal tech. Michael é formado em Direito (JD) pela Harvard Law School e bacharel em Ciência da Computação pela Universidade Stanford.", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop" },
    { name: "Sarah Johnson", position: "Diretora de Produto (CPO)", bio: "Sarah Johnson lidera a estratégia e o desenvolvimento de produtos do Pequi. Antes de entrar na empresa, foi VP de Produto da LegalZoom e advogada do Skadden, Arps. Sarah é formada pela Harvard Law School e bacharel em Economia pela Universidade de Princeton.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop" },
    { name: "David Wilson", position: "Diretor de Tecnologia (CTO)", bio: "David Wilson supervisiona a estratégia de tecnologia e a equipe de engenharia do Pequi. Anteriormente, foi pesquisador de IA no Google e é doutor em Machine Learning pela Universidade Stanford e bacharel em Matemática pelo MIT.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2670&auto=format&fit=crop" }
  ];

  const pressReleases = [
    { title: "Pequi capta US$ 50 milhões em rodada Série B", date: "3 de outubro de 2023", excerpt: "O investimento vai acelerar o desenvolvimento de produtos e a expansão global para atender à demanda crescente por soluções jurídicas com IA.", link: "#" },
    { title: "Pequi lança ferramenta revolucionária de análise de contratos", date: "15 de julho de 2023", excerpt: "Nova ferramenta de análise de contratos com IA revisa documentos jurídicos complexos em minutos, em vez de horas.", link: "#" },
    { title: "Pequi firma parceria com o escritório global Baker McKenzie", date: "2 de maio de 2023", excerpt: "A parceria estratégica levará ferramentas jurídicas de IA de ponta a um dos maiores escritórios de advocacia do mundo.", link: "#" },
    { title: "Pequi expande para o mercado europeu", date: "10 de fevereiro de 2023", excerpt: "A empresa abre escritório em Londres para atender à crescente base de clientes europeus e garantir a conformidade com as normas regionais de proteção de dados.", link: "#" }
  ];

  const tabs = [
    { key: 'about', label: 'Sobre nós' },
    { key: 'executives', label: 'Equipe executiva' },
    { key: 'press', label: 'Comunicados à imprensa' },
    { key: 'brand', label: 'Materiais da marca' },
    { key: 'photos', label: 'Fotos' },
  ];

  const companyPhotos = [
    { title: "Sede", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop" },
    { title: "Equipe trabalhando", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2670&auto=format&fit=crop" },
    { title: "Interface do produto", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop" },
    { title: "Equipe executiva", image: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=2670&auto=format&fit=crop" }
  ];

  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* Header */}
      <header className="relative h-[40vh] overflow-hidden bg-castanha-50">
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-background/95 z-10" />
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2664&auto=format&fit=crop" alt="Materiais de imprensa" fill priority className="object-cover opacity-20 grayscale" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center max-w-4xl mx-auto px-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-foreground/30 mb-6">Central de mídia</p>
            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6">Kit de imprensa</h1>
            <p className="text-lg text-foreground/50 max-w-2xl mx-auto font-medium">Recursos para jornalistas, blogueiros e profissionais de mídia</p>
          </div>
        </div>
      </header>

      {/* Media Contact Banner */}
      <div className="py-4 px-6 bg-castanha-50 border-b border-castanha-100 text-center">
        <p className="text-foreground/60 text-sm">
          Para assuntos de imprensa, entre em contato: <a href="mailto:press@AIForLawyers.com" className="font-bold text-foreground hover:underline">press@AIForLawyers.com</a> ou ligue para <a href="tel:+18005551234" className="font-bold text-foreground hover:underline">+1 (800) 555-1234</a>
        </p>
      </div>

      {/* Tabs */}
      <section className="py-8 px-6 border-b border-castanha-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex overflow-x-auto pb-2 gap-2 justify-center">
            {tabs.map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2.5 whitespace-nowrap text-[11px] font-bold uppercase tracking-widest rounded-full transition-all ${activeTab === tab.key ? 'bg-foreground text-background' : 'text-foreground/40 hover:text-foreground hover:bg-castanha-100 border border-castanha-100'}`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">

          {/* About */}
          {activeTab === 'about' && (
            <div>
              <h2 className="text-4xl font-light mb-12 text-center">Sobre o Pequi</h2>
              <div className="grid md:grid-cols-2 gap-16 items-start mb-16">
                <div>
                  <p className="text-foreground/60 text-lg mb-6 leading-relaxed">O Pequi está na vanguarda da revolução da tecnologia jurídica, desenvolvendo ferramentas com IA que transformam a forma como os profissionais do Direito trabalham. Nossa missão é tornar os serviços jurídicos de alta qualidade mais acessíveis, eficientes e econômicos por meio de inteligência artificial de ponta.</p>
                  <p className="text-foreground/60 text-lg mb-6 leading-relaxed">Fundado em 2020 por uma equipe de especialistas em Direito e tecnologia, o Pequi cresceu e hoje atende milhares de escritórios de advocacia, departamentos jurídicos corporativos e prestadores de serviços jurídicos no mundo todo.</p>
                  <p className="text-foreground/60 text-lg leading-relaxed">O Pequi tem sede em San Francisco, escritórios em Nova York e Londres, e já captou US$ 75 milhões em capital de risco.</p>
                </div>
                <div className="bg-white border border-castanha-100 rounded-2xl p-8 shadow-sm">
                  <h3 className="text-xl font-semibold mb-6">Dados da empresa</h3>
                  <div className="space-y-4">
                    {Object.entries(companyInfo).map(([key, val]) => (
                      <div key={key} className="flex border-b border-castanha-50 pb-4 last:border-0 last:pb-0">
                        <div className="w-2/5 text-[10px] font-bold uppercase tracking-widest text-foreground/30">{({ name: 'Nome', tagline: 'Slogan', founded: 'Fundação', headquarters: 'Sede', employees: 'Funcionários', funding: 'Investimento', investors: 'Investidores' } as Record<string, string>)[key]}</div>
                        <div className="w-3/5 text-foreground/70 text-sm font-medium">{val}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-castanha-50 border border-castanha-100 rounded-2xl p-8 md:p-12">
                <h3 className="text-lg font-semibold mb-4">Texto institucional para comunicados</h3>
                <p className="text-foreground/60 leading-relaxed text-sm">O Pequi é uma empresa líder em tecnologia jurídica que usa inteligência artificial para transformar a forma como os profissionais do Direito trabalham. O conjunto de ferramentas com IA da empresa inclui análise de contratos, apoio à pesquisa jurídica, automação de documentos e análises preditivas, ajudando os profissionais do Direito a trabalhar com mais eficiência e eficácia. Fundado em 2020 e apoiado por investidores de primeira linha, o Pequi atende milhares de escritórios de advocacia e departamentos jurídicos corporativos no mundo todo. Saiba mais em www.AIForLawyers.com.</p>
              </div>
            </div>
          )}

          {/* Executives */}
          {activeTab === 'executives' && (
            <div>
              <h2 className="text-4xl font-light mb-12 text-center">Equipe executiva</h2>
              <div className="space-y-12">
                {executives.map((exec, idx) => (
                  <div key={idx} className="bg-white border border-castanha-100 rounded-2xl p-8 grid md:grid-cols-3 gap-8 items-center hover:shadow-lg transition-all">
                    <div className="md:col-span-1">
                      <div className="relative aspect-square overflow-hidden rounded-2xl bg-castanha-50">
                        <Image src={exec.image} alt={exec.name} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <h3 className="text-2xl font-light mb-1">{exec.name}</h3>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 mb-6">{exec.position}</p>
                      <p className="text-foreground/60 leading-relaxed text-sm">{exec.bio}</p>
                      <a href="#" download className="mt-6 inline-flex items-center text-foreground font-bold text-xs hover:underline">
                        Baixar foto em alta resolução
                        <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Press Releases */}
          {activeTab === 'press' && (
            <div>
              <h2 className="text-4xl font-light mb-12 text-center">Comunicados à imprensa</h2>
              <div className="space-y-6">
                {pressReleases.map((release, idx) => (
                  <div key={idx} className="bg-white border border-castanha-100 rounded-2xl p-8 hover:shadow-md transition-all">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 mb-2">{release.date}</p>
                    <h3 className="text-xl font-semibold mb-3">{release.title}</h3>
                    <p className="text-foreground/60 mb-6 text-sm leading-relaxed">{release.excerpt}</p>
                    <Link href={release.link} className="text-foreground font-bold text-sm flex items-center hover:underline w-fit">
                      Ler comunicado completo
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Brand Assets */}
          {activeTab === 'brand' && (
            <div>
              <h2 className="text-4xl font-light mb-6 text-center">Materiais da marca</h2>
              <p className="text-foreground/50 text-center mb-12 max-w-2xl mx-auto text-sm">Consulte nosso manual da marca para o uso correto do logotipo e de outros elementos visuais.</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {["Logotipo principal", "Logotipo branco", "Ícone do app", "Manual da marca"].map((name, idx) => (
                  <div key={idx} className="bg-white border border-castanha-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all">
                    <div className="aspect-square bg-castanha-50 flex items-center justify-center p-8">
                      <div className="w-20 h-20 rounded-2xl bg-foreground flex items-center justify-center">
                        <svg className="w-8 h-8 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-base font-semibold mb-2">{name}</h3>
                      <div className="flex flex-wrap gap-2">
                        {(idx < 3 ? ["PNG", "SVG", "EPS"] : ["PDF"]).map(fmt => (
                          <a key={fmt} href="#" className="text-[9px] font-bold uppercase tracking-widest bg-castanha-100 text-foreground/50 px-2 py-1 rounded-md hover:bg-castanha-200 transition-colors">{fmt}</a>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 bg-castanha-50 border border-castanha-100 rounded-2xl p-8 text-center">
                <h3 className="text-lg font-semibold mb-3">Precisa de mais alguma coisa?</h3>
                <p className="text-foreground/50 text-sm mb-4">Para outros materiais da marca ou solicitações específicas, entre em contato com nossa equipe de imprensa.</p>
                <a href="mailto:press@AIForLawyers.com" className="font-bold text-foreground hover:underline text-sm">press@AIForLawyers.com</a>
              </div>
            </div>
          )}

          {/* Photos */}
          {activeTab === 'photos' && (
            <div>
              <h2 className="text-4xl font-light mb-6 text-center">Fotos da empresa</h2>
              <p className="text-foreground/50 text-center mb-12 max-w-2xl mx-auto text-sm">Fotos em alta resolução para uso da imprensa. Todas as fotos podem ser usadas com atribuição à Pequi, Inc.</p>
              <div className="grid md:grid-cols-2 gap-6">
                {companyPhotos.map((photo, idx) => (
                  <div key={idx} className="bg-white border border-castanha-100 rounded-2xl overflow-hidden group hover:shadow-xl transition-all">
                    <div className="aspect-video relative">
                      <Image src={photo.image} alt={photo.title} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                        <div className="p-6 w-full flex justify-between items-center">
                          <h3 className="text-background text-lg font-semibold">{photo.title}</h3>
                          <a href="#" download className="bg-background/20 backdrop-blur-sm text-background px-3 py-1.5 text-xs font-bold rounded-lg hover:bg-background/30 transition-colors">Baixar</a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Download CTA */}
      <section className="py-24 px-6 bg-foreground text-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light mb-6">Baixe o kit de imprensa completo</h2>
          <p className="text-background/60 text-lg mb-12 max-w-2xl mx-auto">Receba todos os materiais de imprensa, logotipos, fotos dos executivos e fichas informativas em um único pacote.</p>
          <a href="#" download className="inline-flex items-center bg-background text-foreground px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-background/90 transition-all">
            <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Baixar kit de imprensa (ZIP, 25 MB)
          </a>
        </div>
      </section>

      {/* Footer strip */}
      <section className="py-8 px-6 border-t border-castanha-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between items-center gap-4">
          <p className="text-foreground/40 text-xs">© {new Date().getFullYear()} Pequi, Inc. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="mailto:press@AIForLawyers.com" className="text-foreground/40 hover:text-foreground transition-colors text-xs font-bold">press@AIForLawyers.com</a>
            <a href="tel:+18005551234" className="text-foreground/40 hover:text-foreground transition-colors text-xs font-bold">+1 (800) 555-1234</a>
          </div>
        </div>
      </section>
    </main>
  );
}
