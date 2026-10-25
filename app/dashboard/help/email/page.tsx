'use client';

import { useState } from 'react';
import DashboardLayout from '../../../components/DashboardLayout';

// Email template interface
interface EmailTemplate {
  id: string;
  title: string;
  subject: string;
  body: string;
  category: string;
}

export default function EmailSupportPage() {
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [copied, setCopied] = useState(false);

  // Email categories
  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'account', name: 'Account' },
    { id: 'billing', name: 'Billing' },
    { id: 'technical', name: 'Technical' },
    { id: 'feature', name: 'Requests' },
    { id: 'legal', name: 'Legal' }
  ];

  // Email templates
  const emailTemplates: EmailTemplate[] = [
    {
      id: '1',
      title: 'Account Access Issue',
      subject: 'Unable to Access My AIForLawyers Account',
      body: `Hello AIForLawyers Support Team,

I'm having difficulty accessing my account. When I attempt to log in, I receive the following error message: [DESCRIBE ERROR MESSAGE].

My account email is: [YOUR EMAIL]
I last successfully logged in on: [APPROXIMATE DATE]

I have already tried:
- Resetting my password
- Clearing browser cache and cookies
- Using a different browser

Could you please help me regain access to my account?

Thank you,
[YOUR NAME]`,
      category: 'account'
    },
    {
      id: '2',
      title: 'Billing Inquiry',
      subject: 'Question About My Recent AIForLawyers Invoice',
      body: `Hello AIForLawyers Billing Team,

I have a question regarding my recent invoice #[INVOICE NUMBER] dated [INVOICE DATE].

[CHOOSE ONE OR MORE:]
- I believe I've been charged incorrectly
- I don't recognize this charge
- I need a detailed receipt for tax purposes
- I need to update my payment method
- I would like to request a refund

Details of my concern:
[PROVIDE SPECIFIC DETAILS]

My account email is: [YOUR EMAIL]

I would appreciate your assistance in resolving this matter.

Thank you,
[YOUR NAME]`,
      category: 'billing'
    },
    {
      id: '3',
      title: 'Document Generation Error',
      subject: 'Error When Generating Legal Document',
      body: `Hello AIForLawyers Technical Support,

I encountered an error when trying to generate a [DOCUMENT TYPE] on [DATE/TIME].

Error details:
- What I was trying to do: [DESCRIPTION]
- What happened: [ERROR DESCRIPTION]
- Error message (if any): [ERROR MESSAGE]
- URL of the page: [PAGE URL]

Browser information:
- Browser: [BROWSER NAME AND VERSION]
- Operating System: [OS NAME AND VERSION]

Screenshots are attached to help illustrate the issue.

My account email is: [YOUR EMAIL]

Thank you for your assistance.

Regards,
[YOUR NAME]`,
      category: 'technical'
    },
    {
      id: '4',
      title: 'Feature Request',
      subject: 'Feature Suggestion for AIForLawyers',
      body: `Hello AIForLawyers Product Team,

I would like to suggest a new feature for the AIForLawyers platform that I believe would enhance the user experience.

Feature description:
[DESCRIBE YOUR IDEA IN DETAIL]

Use case:
[EXPLAIN HOW THIS FEATURE WOULD BE USED]

Benefits:
[LIST THE BENEFITS THIS FEATURE WOULD PROVIDE]

Similar features in other products (if applicable):
[MENTION IF YOU'VE SEEN SIMILAR FEATURES ELSEWHERE]

My account email is: [YOUR EMAIL]

I'm happy to provide more information or discuss this further if needed.

Thank you for considering my suggestion.

Best regards,
[YOUR NAME]`,
      category: 'feature'
    },
    {
      id: '5',
      title: 'Legal Advice Question',
      subject: 'Question About AIForLawyers\'s Legal Advice',
      body: `Hello AIForLawyers Legal Team,

I have a question regarding the legal information provided by your platform.

Document/advice in question: [DOCUMENT NAME OR ADVICE DESCRIPTION]
Date generated: [DATE]

My specific question is:
[PROVIDE DETAILED QUESTION]

I understand that AIForLawyers provides legal information and not legal advice, but I would like clarification on the above matter.

My account email is: [YOUR EMAIL]

Thank you for your assistance.

Regards,
[YOUR NAME]`,
      category: 'legal'
    },
    {
      id: '6',
      title: 'Subscription Cancellation',
      subject: 'Request to Cancel My AIForLawyers Subscription',
      body: `Hello AIForLawyers Support Team,

I would like to request cancellation of my subscription to AIForLawyers.

Account email: [YOUR EMAIL]
Subscription plan: [YOUR PLAN]
Reason for cancellation: [OPTIONAL: REASON]

Please confirm when my subscription has been canceled. I understand that:
- I will have access to the service until the end of my current billing period
- No further charges will be made after cancellation
- My data will be retained according to your data retention policy

If there are any exit surveys or feedback forms, I am willing to provide feedback on my experience.

Thank you for your assistance.

Regards,
[YOUR NAME]`,
      category: 'account'
    }
  ];

  // Filter templates based on search and category
  const filteredTemplates = emailTemplates.filter(template => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.body.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Copy template to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayout title="Email Support">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/30 mb-3">Communication</p>
          <h1 className="text-4xl font-light text-foreground mb-4 tracking-tight">Email Templates</h1>
          <p className="text-foreground/50 max-w-2xl text-lg font-light leading-relaxed">
            Expedite your support requests with our optimized email templates. Select a category and customize the pre-formatted text.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Column: Template Selection */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              {/* Search */}
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-gray-100 rounded-xl py-3 px-5 pl-12 text-sm focus:outline-none focus:ring-4 focus:ring-foreground/5 transition-all shadow-sm"
                />
                <svg className="w-4 h-4 text-foreground/20 absolute left-4 top-3.5 group-hover:text-foreground/40 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Categories */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 mb-4 px-1">Categories</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all border ${selectedCategory === category.id
                          ? 'text-white border-transparent shadow-lg shadow-black/5 btn-primary-gradient'
                          : 'bg-white text-foreground/40 border-gray-100 hover:border-gray-200'
                        }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* List */}
              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 mb-4 px-1">Templates</p>
                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {filteredTemplates.map(template => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template)}
                      className={`w-full text-left p-4 rounded-xl transition-all border ${selectedTemplate?.id === template.id
                          ? 'bg-white border-foreground shadow-lg shadow-black/5'
                          : 'bg-white border-gray-100 hover:border-gray-200 shadow-sm'
                        }`}
                    >
                      <h4 className={`text-xs font-bold uppercase tracking-wider mb-1 ${selectedTemplate?.id === template.id ? 'text-foreground' : 'text-foreground/70'}`}>
                        {template.title}
                      </h4>
                      <p className="text-[10px] text-foreground/30 font-medium truncate">{template.subject}</p>
                    </button>
                  ))}
                  {filteredTemplates.length === 0 && (
                    <p className="text-center py-10 text-xs text-foreground/30 italic">No templates found</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Template Preview */}
          <div className="flex-1 animate-in fade-in slide-in-from-right-4 duration-700">
            {selectedTemplate ? (
              <div className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm flex flex-col h-full min-h-[600px]">
                <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-50/30">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 mb-1">Template Preview</p>
                    <h2 className="text-2xl font-light text-foreground tracking-tight">{selectedTemplate.title}</h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => copyToClipboard(`Subject: ${selectedTemplate.subject}\n\n${selectedTemplate.body}`)}
                      className="group flex items-center px-6 py-3 bg-white border border-gray-100 rounded-xl hover:border-gray-200 transition-all shadow-sm"
                    >
                      <svg className="w-4 h-4 mr-3 text-foreground/40 group-hover:text-foreground transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      <span className="text-[11px] font-bold uppercase tracking-widest">{copied ? 'Copied' : 'Copy Text'}</span>
                    </button>
                    <a
                      href={`mailto:support@AIForLawyers.com?subject=${encodeURIComponent(selectedTemplate.subject)}&body=${encodeURIComponent(selectedTemplate.body)}`}
                      className="flex items-center px-10 py-3 text-white rounded-xl transition-all shadow-xl shadow-black/10 btn-primary-gradient"
                    >
                      <span className="text-[11px] font-bold uppercase tracking-widest">Open Client</span>
                    </a>
                  </div>
                </div>

                <div className="p-10 flex-1 overflow-y-auto custom-scrollbar bg-white">
                  <div className="mb-10">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 mb-3">Email Subject</p>
                    <div className="p-5 bg-gray-50 border border-gray-100 rounded-2xl text-foreground font-medium text-sm">
                      {selectedTemplate.subject}
                    </div>
                  </div>

                  <div className="mb-10">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 mb-3">Message Body</p>
                    <div className="p-8 bg-gray-50 border border-gray-100 rounded-2xl text-foreground/70 font-light text-sm leading-loose whitespace-pre-line border-dashed">
                      {selectedTemplate.body}
                    </div>
                  </div>

                  <div className="p-8 bg-gray-50/50 border border-gray-50 rounded-2xl flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center flex-shrink-0 text-foreground/20">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-2">Instructions</p>
                      <ol className="text-xs text-foreground/50 space-y-2 leading-relaxed font-light">
                        <li>Replace all <span className="font-bold text-foreground/70">[BRACKETS]</span> with your specific details.</li>
                        <li>Review the content to ensure accuracy before sending.</li>
                        <li>Attachments should be referenced in the body if applicable.</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-gray-100 rounded-[32px] h-full min-h-[600px] flex items-center justify-center p-20 text-center shadow-sm">
                <div>
                  <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-10 border border-gray-100/50">
                    <svg className="w-10 h-10 text-foreground/10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-light text-foreground mb-4">Select Template</h2>
                  <p className="text-foreground/30 max-w-sm mx-auto mb-10 font-light text-base">
                    Please choose a topic from the sidebar to customize your support email.
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/20">
                    Priority response for Enterprise accounts
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f9fafb;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
      `}</style>
    </DashboardLayout>
  );
} 
