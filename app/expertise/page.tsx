import Link from 'next/link';

const PracticeAreaCard = ({
  title,
  description,
  capabilities
}: {
  title: string;
  description: string;
  capabilities: string[];
}) => (
  <div className="border border-white/10 group hover:border-white/30 transition-all duration-500 p-8">
    <h3 className="text-xl font-light mb-4">{title}</h3>
    <div className="w-12 h-px bg-white/20 mb-6 group-hover:bg-white/40 transition-all"></div>
    <p className="text-white/60 mb-8 leading-relaxed">{description}</p>
    <ul className="space-y-3">
      {capabilities.map((capability, index) => (
        <li key={index} className="flex items-start">
          <div className="w-1 h-1 bg-white/40 rounded-full mt-2 mr-3"></div>
          <span className="text-white/70">{capability}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default function ExpertisePage() {
  const practiceAreas = [
    {
      title: "Corporate Law & M&A",
      description: "Advanced analysis and insights for complex corporate transactions and mergers & acquisitions.",
      capabilities: [
        "Due diligence automation and risk assessment",
        "Contract analysis and comparison",
        "Regulatory compliance verification",
        "Transaction document drafting assistance"
      ]
    },
    {
      title: "Litigation & Dispute Resolution",
      description: "Comprehensive support for litigation strategy and case analysis across jurisdictions.",
      capabilities: [
        "Case law research and analysis",
        "Document review and evidence extraction",
        "Precedent identification and application",
        "Legal argument development support"
      ]
    },
    {
      title: "Regulatory & Compliance",
      description: "Real-time monitoring and analysis of regulatory requirements across multiple jurisdictions.",
      capabilities: [
        "Regulatory change tracking",
        "Compliance risk assessment",
        "Policy review and updates",
        "Cross-border regulation analysis"
      ]
    },
    {
      title: "Intellectual Property",
      description: "Advanced IP analytics and protection strategies for global intellectual property portfolios.",
      capabilities: [
        "Patent analysis and prior art search",
        "Trademark clearance and monitoring",
        "IP portfolio management",
        "Licensing agreement review"
      ]
    },
    {
      title: "Banking & Finance",
      description: "Sophisticated financial legal analysis and regulatory compliance solutions.",
      capabilities: [
        "Financial regulation compliance",
        "Transaction documentation review",
        "Risk assessment and mitigation",
        "Securities law compliance"
      ]
    },
    {
      title: "Real Estate & Construction",
      description: "Comprehensive legal support for real estate transactions and construction projects.",
      capabilities: [
        "Property due diligence",
        "Contract review and drafting",
        "Zoning and permit compliance",
        "Construction dispute analysis"
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-20"></div>

        <div className="container mx-auto px-6 max-w-6xl relative">
          <div className="max-w-3xl">
            <div className="inline-block mb-6 backdrop-blur-sm bg-white/5 rounded-full px-4 py-1.5 border border-white/10">
              <span className="text-xs uppercase tracking-widest text-white/80 font-light flex items-center">
                <span className="inline-block w-1.5 h-1.5 bg-white rounded-full mr-2"></span>
                Domain-Specific Legal Intelligence
              </span>
            </div>

            <h1 className="text-5xl font-light mb-8 leading-tight">
              Specialized Legal Expertise
              <span className="block text-lg mt-3 tracking-widest font-extralight opacity-50 uppercase">
                Powered by Advanced AI Models
              </span>
            </h1>

            <div className="w-20 h-px bg-gradient-to-r from-white/40 to-transparent mb-8"></div>

            <p className="text-xl text-white/70 leading-relaxed mb-12">
              Our AI models are specifically trained on legal precedents, regulations, and jurisprudence to deliver superior understanding of legal context and terminology across multiple practice areas.
            </p>
          </div>
        </div>
      </section>

      {/* Key Capabilities Section */}
      <section className="py-24 border-t border-white/10">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-light mb-6">Core Capabilities</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              AIForLawyers combines deep legal domain knowledge with advanced AI capabilities to deliver unparalleled assistance across various practice areas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {practiceAreas.map((area, index) => (
              <PracticeAreaCard key={index} {...area} />
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-24 border-t border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-20"></div>

        <div className="container mx-auto px-6 max-w-6xl relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light mb-6">Advanced Technology Stack</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Built on cutting-edge AI models and technologies specifically optimized for legal applications.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 border border-white/10 group hover:border-white/30 transition-all">
              <div className="mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-light mb-4">Large Language Models</h3>
              <p className="text-white/60">
                Custom-trained models on extensive legal datasets for superior comprehension and analysis.
              </p>
            </div>

            <div className="p-8 border border-white/10 group hover:border-white/30 transition-all">
              <div className="mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-light mb-4">Natural Language Processing</h3>
              <p className="text-white/60">
                Advanced NLP capabilities for understanding complex legal terminology and context.
              </p>
            </div>

            <div className="p-8 border border-white/10 group hover:border-white/30 transition-all">
              <div className="mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-light mb-4">Security & Compliance</h3>
              <p className="text-white/60">
                Built-in compliance checks and security measures for sensitive legal data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-white/10">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl font-light mb-8">Experience Professional-Grade Legal AI</h2>
          <p className="text-white/60 mb-12 text-lg">
            Discover how AIForLawyers can transform your legal practice with advanced AI capabilities.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/contact"
              className="bg-white hover:bg-white/90 text-black px-8 py-3 transition-all duration-300"
            >
              Schedule a Demo
            </Link>

            <Link
              href="/security"
              className="text-white/60 hover:text-white transition-colors flex items-center group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Security Overview
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
} 