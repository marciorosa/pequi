'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function PressKitPage() {
  const [activeTab, setActiveTab] = useState('about');

  const companyInfo = { name: "AIForLawyers, Inc.", tagline: "Transforming Legal Practice with AI", founded: "2020", headquarters: "San Francisco, California", employees: "120+", funding: "$75M in venture capital funding", investors: "Sequoia Capital, Andreessen Horowitz, and Bessemer Venture Partners" };

  const executives = [
    { name: "Michael Chen", position: "Chief Executive Officer", bio: "Michael Chen is the CEO and co-founder of AIForLawyers. Previously, he was a Partner at McKinsey & Company, where he led the legal tech practice. Michael holds a JD from Harvard Law School and a BS in Computer Science from Stanford University.", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop" },
    { name: "Sarah Johnson", position: "Chief Product Officer", bio: "Sarah Johnson leads product strategy and development at AIForLawyers. Before joining the company, she was VP of Product at LegalZoom and an attorney at Skadden, Arps. Sarah graduated from Harvard Law School and has a BA in Economics from Princeton University.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop" },
    { name: "David Wilson", position: "Chief Technology Officer", bio: "David Wilson oversees AIForLawyers's technology strategy and engineering team. He previously worked as an AI researcher at Google and holds a PhD in Machine Learning from Stanford University and a BS in Mathematics from MIT.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2670&auto=format&fit=crop" }
  ];

  const pressReleases = [
    { title: "AIForLawyers Raises $50M in Series B Funding", date: "October 3, 2023", excerpt: "Funding will accelerate product development and global expansion to meet growing demand for AI-powered legal solutions.", link: "#" },
    { title: "AIForLawyers Launches Revolutionary Contract Analysis Tool", date: "July 15, 2023", excerpt: "New AI-powered contract analysis tool can review complex legal documents in minutes instead of hours.", link: "#" },
    { title: "AIForLawyers Partners with Global Law Firm Baker McKenzie", date: "May 2, 2023", excerpt: "Strategic partnership will bring cutting-edge AI legal tools to one of the world's largest law firms.", link: "#" },
    { title: "AIForLawyers Expands to European Market", date: "February 10, 2023", excerpt: "Company opens London office to serve growing European client base and ensure compliance with regional data protection regulations.", link: "#" }
  ];

  const tabs = [
    { key: 'about', label: 'About Us' },
    { key: 'executives', label: 'Executive Team' },
    { key: 'press', label: 'Press Releases' },
    { key: 'brand', label: 'Brand Assets' },
    { key: 'photos', label: 'Photos' },
  ];

  const companyPhotos = [
    { title: "Headquarters", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop" },
    { title: "Team Working", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2670&auto=format&fit=crop" },
    { title: "Product Interface", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop" },
    { title: "Executive Team", image: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=2670&auto=format&fit=crop" }
  ];

  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* Header */}
      <header className="relative h-[40vh] overflow-hidden bg-gray-50">
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-background/95 z-10" />
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2664&auto=format&fit=crop" alt="Press Materials" fill priority className="object-cover opacity-20 grayscale" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center max-w-4xl mx-auto px-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-foreground/30 mb-6">Media Center</p>
            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6">Press Kit</h1>
            <p className="text-lg text-foreground/50 max-w-2xl mx-auto font-medium">Resources for journalists, bloggers, and media professionals</p>
          </div>
        </div>
      </header>

      {/* Media Contact Banner */}
      <div className="py-4 px-6 bg-gray-50 border-b border-gray-100 text-center">
        <p className="text-foreground/60 text-sm">
          For press inquiries, contact: <a href="mailto:press@AIForLawyers.com" className="font-bold text-foreground hover:underline">press@AIForLawyers.com</a> or call <a href="tel:+18005551234" className="font-bold text-foreground hover:underline">+1 (800) 555-1234</a>
        </p>
      </div>

      {/* Tabs */}
      <section className="py-8 px-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex overflow-x-auto pb-2 gap-2 justify-center">
            {tabs.map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2.5 whitespace-nowrap text-[11px] font-bold uppercase tracking-widest rounded-full transition-all ${activeTab === tab.key ? 'bg-foreground text-background' : 'text-foreground/40 hover:text-foreground hover:bg-gray-100 border border-gray-100'}`}>
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
              <h2 className="text-4xl font-light mb-12 text-center">About AIForLawyers</h2>
              <div className="grid md:grid-cols-2 gap-16 items-start mb-16">
                <div>
                  <p className="text-foreground/60 text-lg mb-6 leading-relaxed">AIForLawyers is at the forefront of the legal technology revolution, developing AI-powered tools that transform how legal professionals work. Our mission is to make high-quality legal services more accessible, efficient, and affordable through cutting-edge artificial intelligence.</p>
                  <p className="text-foreground/60 text-lg mb-6 leading-relaxed">Founded in 2020 by a team of legal and technology experts, AIForLawyers has grown to serve thousands of law firms, corporate legal departments, and legal service providers worldwide.</p>
                  <p className="text-foreground/60 text-lg leading-relaxed">AIForLawyers is headquartered in San Francisco with offices in New York and London, and has raised $75 million in venture capital funding.</p>
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
                  <h3 className="text-xl font-semibold mb-6">Company Facts</h3>
                  <div className="space-y-4">
                    {Object.entries(companyInfo).map(([key, val]) => (
                      <div key={key} className="flex border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                        <div className="w-2/5 text-[10px] font-bold uppercase tracking-widest text-foreground/30">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
                        <div className="w-3/5 text-foreground/70 text-sm font-medium">{val}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 md:p-12">
                <h3 className="text-lg font-semibold mb-4">Boilerplate for Press Releases</h3>
                <p className="text-foreground/60 leading-relaxed text-sm">AIForLawyers is a leading legal technology company that uses artificial intelligence to transform how legal professionals work. The company&apos;s suite of AI-powered tools includes contract analysis, legal research assistance, document automation, and predictive analytics, helping legal professionals work more efficiently and effectively. Founded in 2020 and backed by top-tier investors, AIForLawyers serves thousands of law firms and corporate legal departments worldwide. Learn more at www.AIForLawyers.com.</p>
              </div>
            </div>
          )}

          {/* Executives */}
          {activeTab === 'executives' && (
            <div>
              <h2 className="text-4xl font-light mb-12 text-center">Executive Team</h2>
              <div className="space-y-12">
                {executives.map((exec, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-8 grid md:grid-cols-3 gap-8 items-center hover:shadow-lg transition-all">
                    <div className="md:col-span-1">
                      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-50">
                        <Image src={exec.image} alt={exec.name} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <h3 className="text-2xl font-light mb-1">{exec.name}</h3>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 mb-6">{exec.position}</p>
                      <p className="text-foreground/60 leading-relaxed text-sm">{exec.bio}</p>
                      <a href="#" download className="mt-6 inline-flex items-center text-foreground font-bold text-xs hover:underline">
                        Download high-res photo
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
              <h2 className="text-4xl font-light mb-12 text-center">Press Releases</h2>
              <div className="space-y-6">
                {pressReleases.map((release, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-md transition-all">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 mb-2">{release.date}</p>
                    <h3 className="text-xl font-semibold mb-3">{release.title}</h3>
                    <p className="text-foreground/60 mb-6 text-sm leading-relaxed">{release.excerpt}</p>
                    <Link href={release.link} className="text-foreground font-bold text-sm flex items-center hover:underline w-fit">
                      Read full release
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </Link>
                  </div>
                ))}
              </div>
              <div className="mt-12 text-center">
                <Link href="/news" className="inline-block bg-foreground text-background px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black/90 transition-all">
                  View All Press Releases
                </Link>
              </div>
            </div>
          )}

          {/* Brand Assets */}
          {activeTab === 'brand' && (
            <div>
              <h2 className="text-4xl font-light mb-6 text-center">Brand Assets</h2>
              <p className="text-foreground/50 text-center mb-12 max-w-2xl mx-auto text-sm">Please refer to our brand guidelines for proper usage of our logo and other visual assets.</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {["Primary Logo", "White Logo", "App Icon", "Brand Guidelines"].map((name, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all">
                    <div className="aspect-square bg-gray-50 flex items-center justify-center p-8">
                      <div className="w-20 h-20 rounded-2xl bg-foreground flex items-center justify-center">
                        <svg className="w-8 h-8 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-base font-semibold mb-2">{name}</h3>
                      <div className="flex flex-wrap gap-2">
                        {(idx < 3 ? ["PNG", "SVG", "EPS"] : ["PDF"]).map(fmt => (
                          <a key={fmt} href="#" className="text-[9px] font-bold uppercase tracking-widest bg-gray-100 text-foreground/50 px-2 py-1 rounded-md hover:bg-gray-200 transition-colors">{fmt}</a>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 bg-gray-50 border border-gray-100 rounded-2xl p-8 text-center">
                <h3 className="text-lg font-semibold mb-3">Need Something Else?</h3>
                <p className="text-foreground/50 text-sm mb-4">For additional brand assets or specific requests, contact our press team.</p>
                <a href="mailto:press@AIForLawyers.com" className="font-bold text-foreground hover:underline text-sm">press@AIForLawyers.com</a>
              </div>
            </div>
          )}

          {/* Photos */}
          {activeTab === 'photos' && (
            <div>
              <h2 className="text-4xl font-light mb-6 text-center">Company Photos</h2>
              <p className="text-foreground/50 text-center mb-12 max-w-2xl mx-auto text-sm">High-resolution photos for media use. All photos can be used with attribution to AIForLawyers, Inc.</p>
              <div className="grid md:grid-cols-2 gap-6">
                {companyPhotos.map((photo, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 rounded-2xl overflow-hidden group hover:shadow-xl transition-all">
                    <div className="aspect-video relative">
                      <Image src={photo.image} alt={photo.title} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                        <div className="p-6 w-full flex justify-between items-center">
                          <h3 className="text-background text-lg font-semibold">{photo.title}</h3>
                          <a href="#" download className="bg-background/20 backdrop-blur-sm text-background px-3 py-1.5 text-xs font-bold rounded-lg hover:bg-background/30 transition-colors">Download</a>
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
          <h2 className="text-4xl font-light mb-6">Download Complete Press Kit</h2>
          <p className="text-background/60 text-lg mb-12 max-w-2xl mx-auto">Get all press materials, logos, executive photos, and fact sheets in one package.</p>
          <a href="#" download className="inline-flex items-center bg-background text-foreground px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-background/90 transition-all">
            <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Download Press Kit (ZIP, 25MB)
          </a>
        </div>
      </section>

      {/* Footer strip */}
      <section className="py-8 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between items-center gap-4">
          <p className="text-foreground/40 text-xs">© {new Date().getFullYear()} AIForLawyers, Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="mailto:press@AIForLawyers.com" className="text-foreground/40 hover:text-foreground transition-colors text-xs font-bold">press@AIForLawyers.com</a>
            <a href="tel:+18005551234" className="text-foreground/40 hover:text-foreground transition-colors text-xs font-bold">+1 (800) 555-1234</a>
          </div>
        </div>
      </section>
    </main>
  );
}
