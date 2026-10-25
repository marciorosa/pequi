'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo } from 'react';

export default function LegalGlossaryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeLetter, setActiveLetter] = useState('all');

  const glossaryTerms = [
    // A
    { term: "Affidavit", category: "procedure", definition: "A written statement confirmed by oath or affirmation, for use as evidence in court." },
    { term: "Appeal", category: "procedure", definition: "A legal proceeding by which a case is brought before a higher court for review of the decision of a lower court." },
    { term: "Arbitration", category: "alternative-dispute", definition: "A form of alternative dispute resolution where disputes are resolved by one or more arbitrators outside of court." },
    { term: "Attorney-Client Privilege", category: "ethics", definition: "A legal privilege that protects communications between a client and their attorney from disclosure." },

    // B
    { term: "Burden of Proof", category: "procedure", definition: "The obligation to prove allegations by producing supporting evidence to establish the truth of facts needed to reach a particular conclusion." },
    { term: "Breach of Contract", category: "contract", definition: "A violation of any of the agreed-upon terms and conditions of a binding contract." },
    { term: "Brief", category: "procedure", definition: "A written legal document used to support a particular side of a dispute submitted to a court." },
    { term: "Bylaws", category: "corporate", definition: "Rules established by a corporation, organization, or other entity to regulate itself, as allowed or provided for by a charter." },

    // C
    { term: "Consideration", category: "contract", definition: "Something of value that each party to a contract gives to the other as an inducement to enter into the contract." },
    { term: "Copyright", category: "intellectual-property", definition: "A form of intellectual property protection granting exclusive rights to the creator of original works." },
    { term: "Covenant", category: "contract", definition: "A formal promise or agreement in a contract, deed, or other legal instrument." },
    { term: "Custody", category: "family", definition: "The legal right and responsibility to care for a child, including physical custody and legal custody." },

    // D
    { term: "Damages", category: "tort", definition: "A monetary award compensation for loss or injury caused by another's wrongful act, default, or negligence." },
    { term: "Due Diligence", category: "corporate", definition: "An investigation or exercise of care that a reasonable business or person is expected to take before entering into an agreement or contract." },
    { term: "Due Process", category: "constitutional", definition: "The constitutional guarantee that legal proceedings will be fair and that individuals will be given notice and opportunity to be heard." },

    // E
    { term: "Estoppel", category: "procedure", definition: "A legal principle that bars a party from asserting a claim or right that contradicts what they previously said or agreed to by law." },
    { term: "Escrow", category: "real-estate", definition: "A financial arrangement where a third party holds and regulates payment of funds required for two parties involved in a given transaction." },
    { term: "Evidence", category: "procedure", definition: "Information presented in testimony, documents, objects, etc., that is used to prove or disprove facts in a legal proceeding." },

    // F
    { term: "Fiduciary", category: "corporate", definition: "A person who holds a legal or ethical relationship of trust with one or more other parties." },
    { term: "Force Majeure", category: "contract", definition: "Unforeseeable circumstances that prevent a party from fulfilling a contract, often referred to as 'acts of God.'" },
    { term: "Fraud", category: "tort", definition: "Intentional deception made for personal gain or to damage another individual." },

    // G
    { term: "Garnishment", category: "procedure", definition: "A legal process where a debtor's money or property is seized to satisfy a debt or obligation." },
    { term: "Guardian ad Litem", category: "family", definition: "A person appointed by the court to protect the interests of minors or incapacitated persons in legal proceedings." },

    // H
    { term: "Habeas Corpus", category: "constitutional", definition: "A writ requiring a person under arrest to be brought before a judge or court to determine if their detention is lawful." },
    { term: "Hearsay", category: "evidence", definition: "An out-of-court statement offered to prove the truth of the matter asserted, generally inadmissible in court." },

    // I
    { term: "Indemnification", category: "contract", definition: "A contractual obligation of one party to compensate the loss incurred by another party due to the acts of the indemnitor." },
    { term: "Injunction", category: "procedure", definition: "A judicial order that restrains a person from beginning or continuing an action that threatens another person." },
    { term: "Intellectual Property", category: "intellectual-property", definition: "Creations of the mind, such as inventions, literary and artistic works, designs, symbols, names, and images used in commerce." },

    // J
    { term: "Jurisdiction", category: "procedure", definition: "The official power to make legal decisions and judgments over a particular area or type of legal case." },
    { term: "Jurisprudence", category: "theory", definition: "The theory or philosophy of law, or a legal system's collective legal precedents." },

    // L
    { term: "Liability", category: "tort", definition: "Legal responsibility for one's acts or omissions, often involving the obligation to pay damages." },
    { term: "Lien", category: "property", definition: "A legal right or interest that a creditor has in another's property, lasting usually until a debt is satisfied." },
    { term: "Litigation", category: "procedure", definition: "The process of taking legal action through the courts to resolve a dispute." },

    // M
    { term: "Mediation", category: "alternative-dispute", definition: "A form of alternative dispute resolution where a neutral third party helps disputing parties reach a settlement." },
    { term: "Merger", category: "corporate", definition: "A combination of two or more corporations into a single entity, typically involving the transfer of assets and liabilities." },

    // N
    { term: "Negligence", category: "tort", definition: "Failure to take proper care in doing something, resulting in damage or injury to another." },
    { term: "Non-Disclosure Agreement (NDA)", category: "contract", definition: "A legal contract that creates a confidential relationship between parties to protect sensitive information." },

    // P
    { term: "Patent", category: "intellectual-property", definition: "A government license granting exclusive rights to an inventor for a limited time in exchange for public disclosure of the invention." },
    { term: "Power of Attorney", category: "procedure", definition: "A legal document giving one person the power to act for another person in specified legal or financial matters." },
    { term: "Precedent", category: "procedure", definition: "A legal principle or rule established in a previous legal case that guides future decisions in similar cases." },

    // S
    { term: "Statute of Limitations", category: "procedure", definition: "A law that sets the maximum time after an event within which legal proceedings may be initiated." },
    { term: "Subpoena", category: "procedure", definition: "A written order to compel someone to give testimony or present evidence in a legal proceeding." },

    // T
    { term: "Tort", category: "tort", definition: "A wrongful act or an infringement of a right leading to civil legal liability." },
    { term: "Trademark", category: "intellectual-property", definition: "A symbol, word, or words legally registered or established by use as representing a company or product." },

    // V
    { term: "Venue", category: "procedure", definition: "The geographic location where a case may be tried, typically where the parties reside or where the incident occurred." },

    // W
    { term: "Warranty", category: "contract", definition: "A promise or guarantee given by a seller regarding the quality, durability, or performance of a product." },
    { term: "Will", category: "estate", definition: "A legal document that expresses a person's wishes regarding the distribution of their property after death." }
  ];

  const categories = [
    { id: 'all', name: 'All Terms', count: glossaryTerms.length },
    { id: 'procedure', name: 'Procedure', count: glossaryTerms.filter(t => t.category === 'procedure').length },
    { id: 'contract', name: 'Contract Law', count: glossaryTerms.filter(t => t.category === 'contract').length },
    { id: 'tort', name: 'Tort Law', count: glossaryTerms.filter(t => t.category === 'tort').length },
    { id: 'intellectual-property', name: 'IP Law', count: glossaryTerms.filter(t => t.category === 'intellectual-property').length },
    { id: 'corporate', name: 'Corporate Law', count: glossaryTerms.filter(t => t.category === 'corporate').length },
    { id: 'constitutional', name: 'Constitutional', count: glossaryTerms.filter(t => t.category === 'constitutional').length },
    { id: 'family', name: 'Family Law', count: glossaryTerms.filter(t => t.category === 'family').length },
    { id: 'alternative-dispute', name: 'ADR', count: glossaryTerms.filter(t => t.category === 'alternative-dispute').length }
  ];

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter(term => {
      const matchesCategory = activeFilter === 'all' || term.category === activeFilter;
      const matchesLetter = activeLetter === 'all' || term.term.charAt(0).toUpperCase() === activeLetter;
      const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesLetter && matchesSearch;
    }).sort((a, b) => a.term.localeCompare(b.term));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, activeFilter, activeLetter]);

  const groupedTerms = useMemo(() => {
    const groups: { [key: string]: typeof glossaryTerms } = {};
    filteredTerms.forEach(term => {
      const firstLetter = term.term.charAt(0).toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(term);
    });
    return groups;
  }, [filteredTerms]);

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Header */}
      <header className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black"></div>
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2558&auto=format&fit=crop"
            alt="Legal Glossary"
            layout="fill"
            objectFit="cover"
            priority
            className="opacity-40"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-6">
            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6">Legal Glossary</h1>
            <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-2xl mx-auto">
              Comprehensive definitions of legal terms and concepts to help you understand the law
            </p>
            <Link href="/signup" className="bg-white text-black px-8 py-4 text-lg font-medium transition-all hover:bg-white/90">
              Access Full Glossary
            </Link>
          </div>
        </div>
      </header>

      {/* Search and Filter Section */}
      <section className="py-16 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-12">
            <input
              type="text"
              placeholder="Search legal terms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white placeholder-white/60 px-6 py-4 pl-14 text-lg focus:outline-none focus:border-white/40 transition-colors"
            />
            <svg className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Alphabet Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setActiveLetter('all')}
              className={`px-3 py-2 text-sm transition-all ${activeLetter === 'all'
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
                }`}
            >
              All
            </button>
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => setActiveLetter(letter)}
                className={`px-3 py-2 text-sm transition-all ${activeLetter === letter
                    ? 'bg-white text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
              >
                {letter}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${activeFilter === category.id
                    ? 'bg-white text-black'
                    : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                  }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* Results count */}
          <div className="text-center text-white/60 mb-8">
            Showing {filteredTerms.length} term{filteredTerms.length !== 1 ? 's' : ''}
            {searchTerm && ` for "${searchTerm}"`}
          </div>
        </div>
      </section>

      {/* Glossary Terms */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {Object.keys(groupedTerms).length === 0 ? (
            <div className="text-center py-16">
              <div className="text-white/60 mb-4">No terms found matching your criteria.</div>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveFilter('all');
                  setActiveLetter('all');
                }}
                className="text-white hover:text-white/80 transition-colors"
              >
                Clear filters and show all terms
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.keys(groupedTerms).sort().map((letter) => (
                <div key={letter} className="space-y-6">
                  <h2 className="text-3xl font-light mb-8 pb-4 border-b border-white/20">
                    {letter}
                  </h2>
                  <div className="space-y-6">
                    {groupedTerms[letter].map((term, index) => (
                      <div
                        key={index}
                        className="bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-xl font-medium text-white">{term.term}</h3>
                          <span className="bg-white/10 text-white/80 px-3 py-1 text-sm rounded-full capitalize">
                            {term.category.replace('-', ' ')}
                          </span>
                        </div>
                        <p className="text-white/70 leading-relaxed">{term.definition}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-24 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-8">
              <div className="text-4xl font-light mb-4">500+</div>
              <h3 className="text-xl font-medium mb-2">Legal Terms</h3>
              <p className="text-white/60">Comprehensive definitions</p>
            </div>
            <div className="p-8">
              <div className="text-4xl font-light mb-4">15+</div>
              <h3 className="text-xl font-medium mb-2">Practice Areas</h3>
              <p className="text-white/60">Covering all major fields</p>
            </div>
            <div className="p-8">
              <div className="text-4xl font-light mb-4">Daily</div>
              <h3 className="text-xl font-medium mb-2">Updates</h3>
              <p className="text-white/60">New terms and revisions</p>
            </div>
            <div className="p-8">
              <div className="text-4xl font-light mb-4">Expert</div>
              <h3 className="text-xl font-medium mb-2">Reviewed</h3>
              <p className="text-white/60">Attorney-verified definitions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6">More Than Just Definitions</h2>
            <div className="w-24 h-1 bg-white/20 mx-auto mb-6"></div>
            <p className="text-white/60 max-w-2xl mx-auto">
              Our legal glossary goes beyond simple definitions to provide context and practical understanding
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4">Smart Search</h3>
              <p className="text-white/70">Find terms quickly with intelligent search across definitions and related concepts</p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4">Practice Context</h3>
              <p className="text-white/70">Understand how terms are used in different areas of law with practical examples</p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4">Cross-References</h3>
              <p className="text-white/70">Discover related terms and concepts to build comprehensive legal knowledge</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-8">Master Legal Terminology</h2>
          <p className="text-white/60 text-xl mb-12 max-w-2xl mx-auto">
            Build your legal vocabulary with our comprehensive glossary and expert-curated definitions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="bg-white text-black px-8 py-4 text-lg font-medium transition-all hover:bg-white/90">
              Start Free Trial
            </Link>
            <Link href="/pricing" className="bg-white/10 text-white px-8 py-4 text-lg font-medium border border-white/20 transition-all hover:bg-white/20">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
