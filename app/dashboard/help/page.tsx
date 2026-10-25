'use client';

import { useState } from 'react';
import Link from 'next/link';
import DashboardLayout from '../../components/DashboardLayout';

// FAQ item interface
interface FAQItem {
  question: string;
  answer: string;
}

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  // Sample FAQs
  const faqs: FAQItem[] = [
    {
      question: "How do I get started with AIForLawyers?",
      answer: "To get started, simply log into your account and navigate to the dashboard. From there, you can access our AI chat assistants, document tools, and other features. We recommend starting with a simple question in the chat interface to familiarize yourself with how our AI responds."
    },
    {
      question: "What types of legal documents can I create?",
      answer: "AIForLawyers can help you create various legal documents including contracts, agreements, leases, wills, and more. Navigate to the Docs section in your dashboard to explore all document creation options and templates available to you."
    },
    {
      question: "How accurate is the legal information provided?",
      answer: "While our AI is trained on extensive legal knowledge, it&apos;s important to note that the information provided should not be considered as formal legal advice. We recommend having any important legal documents reviewed by a qualified attorney before finalizing them."
    },
    {
      question: "Can I speak with a real lawyer through the platform?",
      answer: "Currently, AIForLawyers provides AI-powered legal assistance. For Pro users, we offer referrals to partnered law firms for cases that require human expertise. We&apos;re working on expanding our network of legal professionals for direct consultations in the future."
    },
    {
      question: "How do I upgrade my subscription?",
      answer: "To upgrade your subscription, go to the Billing section in your dashboard. There you&apos;ll find information about our different plans and the option to upgrade to Pro for additional features and capabilities."
    },
    {
      question: "Is my data secure and confidential?",
      answer: "Yes, we take data security and confidentiality very seriously. All communications and documents are encrypted, and we adhere to strict privacy policies. We do not share your information with third parties without your explicit consent."
    },
    {
      question: "How do I download or export my documents?",
      answer: "In the Docs section, you can find all your created documents. Each document has an export option that allows you to download it in various formats including PDF, DOCX, and TXT depending on the document type."
    }
  ];

  // Filter FAQs based on search query
  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle FAQ expanded state
  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <DashboardLayout title="Help & Support">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-20 text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/5 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-black/40 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/40">Knowledge Base</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-[#10101A] mb-6">How can we help?</h1>
          <p className="text-[#525252] text-lg font-medium opacity-60">
            Access the neural archive or contact our legal support specialists.
          </p>
 
          {/* Search bar */}
          <div className="relative max-w-2xl mx-auto mt-12 group">
            <div className="absolute inset-0 bg-black/5 rounded-3xl blur-2xl group-hover:bg-black/10 transition-all duration-500" />
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help topics, guides, or tutorials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white rounded-[2rem] border border-[#e7e5e1] py-6 px-10 pl-16 text-[#10101A] text-lg focus:outline-none focus:ring-4 focus:ring-black/5 transition-all shadow-2xl placeholder:opacity-30 font-medium"
              />
              <div className="absolute inset-y-0 left-0 pl-7 flex items-center pointer-events-none">
                <svg className="w-6 h-6 text-[#A0A0A0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Help categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white rounded-[2.5rem] p-10 border border-[#e7e5e1] shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
              <svg width="150" height="150" viewBox="0 0 100 100">
                <pattern id="grid-help-1" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="black" strokeWidth="0.5" />
                </pattern>
                <rect width="100" height="100" fill="url(#grid-help-1)" />
              </svg>
            </div>
            <div className="mb-8 w-16 h-16 rounded-2xl bg-[#F9F8F6] flex items-center justify-center border border-[#e7e5e1] group-hover:bg-black group-hover:border-black transition-all duration-500 shadow-sm relative z-10">
              <svg className="w-8 h-8 text-[#10101A] group-hover:text-white transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-medium tracking-tight text-[#10101A] mb-4 relative z-10">Live Assistant</h3>
            <p className="text-[#525252] mb-10 leading-relaxed font-medium opacity-60 relative z-10">
              Get instant help from our AI legal assistant or real human experts via synchronized channels.
            </p>
            <Link href="/dashboard/help/chat" className="inline-flex items-center text-black font-bold text-[10px] uppercase tracking-[0.2em] border-b border-black/10 hover:border-black pb-1 transition-all relative z-10">
              Initialize Chat
              <svg className="w-4 h-4 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
 
          <div className="bg-white rounded-[2.5rem] p-10 border border-[#e7e5e1] shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 group relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
              <svg width="150" height="150" viewBox="0 0 100 100">
                <pattern id="grid-help-2" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="black" strokeWidth="0.5" />
                </pattern>
                <rect width="100" height="100" fill="url(#grid-help-2)" />
              </svg>
            </div>
            <div className="mb-8 w-16 h-16 rounded-2xl bg-[#F9F8F6] flex items-center justify-center border border-[#e7e5e1] group-hover:bg-black group-hover:border-black transition-all duration-500 shadow-sm relative z-10">
              <svg className="w-8 h-8 text-[#10101A] group-hover:text-white transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-medium tracking-tight text-[#10101A] mb-4 relative z-10">Email Inquiries</h3>
            <p className="text-[#525252] mb-10 leading-relaxed font-medium opacity-60 relative z-10">
              Request asynchronous support. Our typical synchronization interval is under 24 neural hours.
            </p>
            <Link href="/dashboard/help/email" className="inline-flex items-center text-black font-bold text-[10px] uppercase tracking-[0.2em] border-b border-black/10 hover:border-black pb-1 transition-all relative z-10">
              Dispatch Request
              <svg className="w-4 h-4 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* FAQs section */}
        <div className="mb-24">
          <div className="flex items-center mb-12">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#A0A0A0] mr-8">Neural Frequency</h2>
            <div className="h-px flex-1 bg-[#e7e5e1]"></div>
          </div>
 
          <div className="space-y-6">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => (
                <div
                  key={index}
                  className={`bg-white border rounded-[2rem] overflow-hidden transition-all duration-500 shadow-sm hover:shadow-xl ${expandedFAQ === index ? 'border-black ring-4 ring-black/5 shadow-2xl scale-[1.01]' : 'border-[#e7e5e1] hover:border-black/20'
                    }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-10 py-7 text-left flex justify-between items-center focus:outline-none"
                  >
                    <span className="font-bold text-[#10101A] text-lg tracking-tight">{faq.question}</span>
                    <div className={`p-3 rounded-full transition-all duration-500 ${expandedFAQ === index ? 'bg-black text-white rotate-180 shadow-lg' : 'bg-[#F9F8F6] text-[#A0A0A0]'}`}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  <div
                    className={`transition-all duration-500 ease-in-out ${expandedFAQ === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                  >
                    <div className="px-10 pb-10 text-[#525252] font-medium leading-relaxed opacity-60">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-[2.5rem] border border-[#e7e5e1] shadow-lg">
                <div className="w-24 h-24 bg-[#F9F8F6] rounded-full flex items-center justify-center mx-auto mb-8 border border-[#e7e5e1]">
                  <svg className="w-12 h-12 text-black/10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-medium tracking-tight text-[#10101A] mb-4">No Spectral Matches</h3>
                <p className="text-[#A0A0A0] mb-10 max-w-xs mx-auto font-medium">We could not find any archival logs matching &quot;{searchQuery}&quot;.</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-8 py-4 text-white rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] shadow-xl transition-all btn-primary-gradient"
                >
                  Reset Query
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Contact section */}
        <div className="bg-black rounded-[3rem] p-16 text-center shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-20 opacity-[0.05] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
            <svg width="400" height="400" viewBox="0 0 100 100">
              <pattern id="grid-help-cta" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
              <rect width="100" height="100" fill="url(#grid-help-cta)" />
            </svg>
          </div>
 
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-8">Synchronize with an expert.</h2>
            <p className="text-white/60 text-lg mb-12 max-w-lg mx-auto leading-relaxed font-medium">
              Our neural support frequency is active 24/7. We typically respond within 15 spectral minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/dashboard/help/contact" className="px-10 py-5 text-white font-bold text-[11px] uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl active:scale-95 btn-primary-gradient">
                Dispatch Request
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
