'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function ComplianceChecklistsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const checklists = [
    {
      id: 1,
      title: "GDPR Compliance Checklist",
      category: "data-privacy",
      description: "Comprehensive checklist to ensure your organization meets all GDPR requirements for data protection.",
      items: 45,
      lastUpdated: "2024-01-15",
      author: "Data Privacy Team",
      jurisdiction: "EU",
      priority: "High",
      completionTime: "4-6 weeks",
      topics: ["Data mapping", "Privacy policies", "Consent management", "Breach procedures"],
      downloadable: true,
      interactive: true
    },
    {
      id: 2,
      title: "SOX Compliance Audit Checklist",
      category: "financial",
      description: "Essential checklist for Sarbanes-Oxley compliance including internal controls and financial reporting.",
      items: 38,
      lastUpdated: "2024-01-20",
      author: "Financial Compliance Team",
      jurisdiction: "US",
      priority: "High",
      completionTime: "8-12 weeks",
      topics: ["Internal controls", "Financial reporting", "Audit procedures", "Documentation"],
      downloadable: true,
      interactive: true
    },
    {
      id: 3,
      title: "HIPAA Compliance for Healthcare",
      category: "healthcare",
      description: "Complete HIPAA compliance checklist for healthcare providers and business associates.",
      items: 52,
      lastUpdated: "2024-01-12",
      author: "Healthcare Compliance Team",
      jurisdiction: "US",
      priority: "High",
      completionTime: "6-8 weeks",
      topics: ["Physical safeguards", "Administrative safeguards", "Technical safeguards", "Business associates"],
      downloadable: true,
      interactive: true
    },
    {
      id: 4,
      title: "Employment Law Compliance Checklist",
      category: "employment",
      description: "Ensure your hiring and employment practices comply with federal and state regulations.",
      items: 34,
      lastUpdated: "2024-01-18",
      author: "Employment Law Team",
      jurisdiction: "US",
      priority: "Medium",
      completionTime: "2-4 weeks",
      topics: ["Hiring practices", "Wage requirements", "Workplace safety", "Employee rights"],
      downloadable: true,
      interactive: false
    },
    {
      id: 5,
      title: "Environmental Compliance for Manufacturing",
      category: "environmental",
      description: "Environmental regulations compliance checklist for manufacturing and industrial operations.",
      items: 41,
      lastUpdated: "2024-01-14",
      author: "Environmental Law Team",
      jurisdiction: "US",
      priority: "High",
      completionTime: "6-10 weeks",
      topics: ["Waste management", "Air quality", "Water discharge", "Chemical handling"],
      downloadable: true,
      interactive: false
    },
    {
      id: 6,
      title: "Financial Services Compliance (FINRA)",
      category: "financial",
      description: "FINRA compliance checklist for broker-dealers and investment advisors.",
      items: 47,
      lastUpdated: "2024-01-22",
      author: "Financial Services Team",
      jurisdiction: "US",
      priority: "High",
      completionTime: "8-12 weeks",
      topics: ["Record keeping", "Customer protection", "Supervision", "Capital requirements"],
      downloadable: true,
      interactive: true
    },
    {
      id: 7,
      title: "CCPA Privacy Rights Compliance",
      category: "data-privacy",
      description: "California Consumer Privacy Act compliance checklist for businesses handling CA resident data.",
      items: 29,
      lastUpdated: "2024-01-16",
      author: "Privacy Law Team",
      jurisdiction: "California",
      priority: "Medium",
      completionTime: "3-5 weeks",
      topics: ["Consumer rights", "Data disclosures", "Opt-out mechanisms", "Service providers"],
      downloadable: true,
      interactive: true
    },
    {
      id: 8,
      title: "ADA Website Compliance Checklist",
      category: "accessibility",
      description: "Ensure your website meets ADA accessibility requirements and WCAG guidelines.",
      items: 35,
      lastUpdated: "2024-01-19",
      author: "Accessibility Team",
      jurisdiction: "US",
      priority: "Medium",
      completionTime: "4-6 weeks",
      topics: ["WCAG guidelines", "Screen readers", "Keyboard navigation", "Color contrast"],
      downloadable: true,
      interactive: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Checklists', count: checklists.length },
    { id: 'data-privacy', name: 'Data Privacy', count: checklists.filter(c => c.category === 'data-privacy').length },
    { id: 'financial', name: 'Financial', count: checklists.filter(c => c.category === 'financial').length },
    { id: 'healthcare', name: 'Healthcare', count: checklists.filter(c => c.category === 'healthcare').length },
    { id: 'employment', name: 'Employment', count: checklists.filter(c => c.category === 'employment').length },
    { id: 'environmental', name: 'Environmental', count: checklists.filter(c => c.category === 'environmental').length },
    { id: 'accessibility', name: 'Accessibility', count: checklists.filter(c => c.category === 'accessibility').length }
  ];

  const filteredChecklists = checklists.filter(checklist => {
    const matchesCategory = activeCategory === 'all' || checklist.category === activeCategory;
    const matchesSearch = checklist.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         checklist.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         checklist.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-400 bg-red-900/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-900/20';
      case 'Low': return 'text-green-400 bg-green-900/20';
      default: return 'text-white/60 bg-white/10';
    }
  };

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Header */}
      <header className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black"></div>
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop" 
            alt="Compliance Checklists" 
            layout="fill"
            objectFit="cover"
            priority
            className="opacity-40"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-6">
            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6">Compliance Checklists</h1>
            <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-2xl mx-auto">
              Comprehensive compliance checklists to help you meet regulatory requirements and avoid penalties
            </p>
            <Link href="/signup" className="bg-white text-black px-8 py-4 text-lg font-medium transition-all hover:bg-white/90">
              Access Checklists
            </Link>
          </div>
        </div>
      </header>

      {/* Overview Stats */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center mb-16">
            <div className="bg-white/5 border border-white/10 p-8">
              <div className="text-4xl font-light mb-4">50+</div>
              <h3 className="text-xl font-medium mb-2">Compliance Areas</h3>
              <p className="text-white/60">Covering major regulations</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-8">
              <div className="text-4xl font-light mb-4">300+</div>
              <h3 className="text-xl font-medium mb-2">Checklist Items</h3>
              <p className="text-white/60">Detailed requirements</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-8">
              <div className="text-4xl font-light mb-4">95%</div>
              <h3 className="text-xl font-medium mb-2">Success Rate</h3>
              <p className="text-white/60">Organizations pass audits</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-8">
              <div className="text-4xl font-light mb-4">24/7</div>
              <h3 className="text-xl font-medium mb-2">Updates</h3>
              <p className="text-white/60">Regulatory change monitoring</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-16 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between mb-12">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search compliance checklists..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white placeholder-white/60 px-4 py-3 pl-12 focus:outline-none focus:border-white/40 transition-colors"
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    activeCategory === category.id
                      ? 'bg-white text-black'
                      : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div className="text-white/60 mb-8">
            Showing {filteredChecklists.length} checklist{filteredChecklists.length !== 1 ? 's' : ''}
            {searchTerm && ` for "${searchTerm}"`}
          </div>
        </div>
      </section>

      {/* Checklists Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredChecklists.map((checklist) => (
              <div key={checklist.id} className="bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-medium mb-2">{checklist.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
                        <span>{checklist.items} items</span>
                        <span>•</span>
                        <span>{checklist.jurisdiction}</span>
                        <span>•</span>
                        <span>{checklist.completionTime}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${getPriorityColor(checklist.priority)}`}>
                        {checklist.priority} Priority
                      </span>
                      {checklist.interactive && (
                        <span className="px-2 py-1 text-xs font-medium rounded bg-blue-900/20 text-blue-400">
                          Interactive
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-white/70 mb-6 leading-relaxed">
                    {checklist.description}
                  </p>

                  {/* Progress placeholder */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-white/80">Completion Progress</span>
                      <span className="text-white/60">0/{checklist.items}</span>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full">
                      <div className="bg-white/20 h-2 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                  </div>

                  {/* Topics */}
                  <div className="mb-8">
                    <h4 className="text-sm font-medium text-white/90 mb-3">Key Areas:</h4>
                    <div className="flex flex-wrap gap-2">
                      {checklist.topics.map((topic, index) => (
                        <span key={index} className="bg-white/10 text-white/80 px-3 py-1 text-sm rounded-full">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Meta info */}
                  <div className="flex items-center gap-6 text-sm text-white/60 mb-8">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {checklist.author}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Updated {new Date(checklist.lastUpdated).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4">
                    <Link
                      href={`/resources/compliance/${checklist.id}`}
                      className="flex-1 bg-white text-black px-6 py-3 font-medium text-center transition-all hover:bg-white/90"
                    >
                      {checklist.interactive ? 'Start Interactive' : 'View Checklist'}
                    </Link>
                    {checklist.downloadable && (
                      <Link
                        href="#"
                        className="bg-white/10 text-white px-6 py-3 font-medium border border-white/20 transition-all hover:bg-white/20"
                      >
                        <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredChecklists.length === 0 && (
            <div className="text-center py-16">
              <div className="text-white/60 mb-4">No checklists found matching your criteria.</div>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                }}
                className="text-white hover:text-white/80 transition-colors"
              >
                Clear filters and show all checklists
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6">Why Choose Our Compliance Checklists?</h2>
            <div className="w-24 h-1 bg-white/20 mx-auto mb-6"></div>
            <p className="text-white/60 max-w-2xl mx-auto">
              Designed by compliance experts and regularly updated to reflect the latest regulations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4">Expert Reviewed</h3>
              <p className="text-white/70">Created and maintained by compliance professionals with deep regulatory knowledge</p>
            </div>
            
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4">Always Current</h3>
              <p className="text-white/70">Automatically updated when regulations change, ensuring you&apos;re always compliant</p>
            </div>
            
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4">Progress Tracking</h3>
              <p className="text-white/70">Interactive checklists with progress tracking and team collaboration features</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-8">Stay Compliant, Reduce Risk</h2>
          <p className="text-white/60 text-xl mb-12 max-w-2xl mx-auto">
            Access our comprehensive compliance checklists and reduce your regulatory risk with expert guidance.
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
