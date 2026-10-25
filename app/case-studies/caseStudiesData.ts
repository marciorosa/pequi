export type CaseStudyMetric = {
  label: string;
  value: string;
  description: string;
};

export type CaseStudyTestimonial = {
  quote: string;
  author: string;
  position: string;
  company: string;
};

export type CaseStudyRecord = {
  id: number;
  title: string;
  client: string;
  industry: string;
  category: string;
  excerpt: string;
  /** Tailwind gradient classes for card / hero accent (no external images). */
  accent: string;
  metrics: CaseStudyMetric[];
  challenge: string;
  solution: string;
  results: string;
  testimonial: CaseStudyTestimonial;
};

export const caseStudies: CaseStudyRecord[] = [
  {
    id: 1,
    title: 'Global law firm reduces contract review time by 75%',
    client: 'Baker McKenzie',
    industry: 'Legal services',
    category: 'contract-review',
    excerpt:
      "How one of the world's largest law firms transformed their contract review process using AI-powered analysis.",
    accent: 'from-[#1e293b] via-[#0f172a] to-[#020617]',
    metrics: [
      { label: 'Time saved', value: '75%', description: 'Reduction in contract review time' },
      { label: 'Accuracy', value: '95%', description: 'Consistent accuracy across reviews' },
      { label: 'Cost reduction', value: '$2.3M', description: 'Annual savings in review costs' },
    ],
    challenge:
      'Manual contract review processes were taking 40+ hours per complex agreement, creating bottlenecks and increasing costs for clients.',
    solution:
      "Implemented AIForLawyers's contract analysis tool with custom workflows for different contract types and automated risk flagging.",
    results:
      'Achieved 75% reduction in review time while maintaining higher accuracy rates and improving client satisfaction scores.',
    testimonial: {
      quote:
        'AIForLawyers has revolutionized our contract review process. What used to take weeks now takes days, and our accuracy has never been better.',
      author: 'Sarah Johnson',
      position: 'Managing Partner',
      company: 'Baker McKenzie',
    },
  },
  {
    id: 2,
    title: 'Corporate legal department streamlines compliance monitoring',
    client: 'Fortune 500 technology company',
    industry: 'Technology',
    category: 'compliance',
    excerpt: 'How a major tech company automated regulatory compliance tracking across 15 jurisdictions.',
    accent: 'from-[#312e81] via-[#1e1b4b] to-[#0f172a]',
    metrics: [
      { label: 'Compliance alerts', value: '100%', description: 'Automated regulatory change notifications' },
      { label: 'Risk reduction', value: '85%', description: 'Decrease in compliance violations' },
      { label: 'Team efficiency', value: '3x', description: 'Increase in team productivity' },
    ],
    challenge:
      'Tracking regulatory changes across multiple jurisdictions was manual, time-consuming, and prone to oversight errors.',
    solution:
      "Deployed AIForLawyers's compliance monitoring system with real-time regulatory tracking and automated alert systems.",
    results:
      'Eliminated manual compliance tracking, reduced violations by 85%, and freed the legal team to focus on strategic initiatives.',
    testimonial: {
      quote:
        'The compliance monitoring capabilities have been game-changing. We now proactively address regulatory changes instead of reacting to them.',
      author: 'Michael Chen',
      position: 'General Counsel',
      company: 'Fortune 500 Technology Company',
    },
  },
  {
    id: 3,
    title: 'Mid-size firm increases research efficiency by 400%',
    client: 'Johnson & Associates',
    industry: 'Legal services',
    category: 'research',
    excerpt: 'A 50-lawyer firm transformed their legal research process and dramatically improved case outcomes.',
    accent: 'from-[#14532d] via-[#052e16] to-[#020617]',
    metrics: [
      { label: 'Research speed', value: '400%', description: 'Faster research completion' },
      { label: 'Case wins', value: '35%', description: 'Increase in favorable outcomes' },
      { label: 'Billable hours', value: '250h', description: 'Additional monthly billable hours' },
    ],
    challenge:
      'Associates were spending 60% of their time on research, limiting capacity for higher-value work and client interaction.',
    solution:
      "Integrated AIForLawyers's knowledge platform with the firm's existing research workflows and trained the team on advanced search techniques.",
    results:
      'Research tasks that previously took 8–10 hours now take about 2 hours, allowing lawyers to take on more cases and improve client service.',
    testimonial: {
      quote:
        'Our associates now complete research in hours that used to take days. The quality of insights we can provide clients has improved dramatically.',
      author: 'Elena Rodriguez',
      position: 'Senior Partner',
      company: 'Johnson & Associates',
    },
  },
  {
    id: 4,
    title: 'Investment bank automates M&A due diligence',
    client: 'Global investment bank',
    industry: 'Financial services',
    category: 'due-diligence',
    excerpt: 'How a major investment bank reduced M&A due diligence timelines from months to weeks.',
    accent: 'from-[#713f12] via-[#422006] to-[#0c0a09]',
    metrics: [
      { label: 'Timeline reduction', value: '60%', description: 'Faster due diligence completion' },
      { label: 'Document analysis', value: '10,000+', description: 'Documents processed per deal' },
      { label: 'Deal velocity', value: '2x', description: 'Increase in deals completed' },
    ],
    challenge:
      "Traditional due diligence processes were taking 3–4 months per deal, limiting the bank's ability to compete in fast-moving markets.",
    solution:
      "Implemented AIForLawyers's document analysis suite with custom M&A workflows and automated risk flagging for financial documents.",
    results:
      'Reduced due diligence timelines to 4–6 weeks while improving accuracy and enabling the bank to pursue more opportunities.',
    testimonial: {
      quote:
        "AIForLawyers's due diligence capabilities have given us a significant competitive advantage. We can move faster while maintaining our rigorous standards.",
      author: 'David Wilson',
      position: 'Managing Director',
      company: 'Global Investment Bank',
    },
  },
  {
    id: 5,
    title: 'Healthcare system streamlines contract management',
    client: 'National healthcare network',
    industry: 'Healthcare',
    category: 'contract-management',
    excerpt:
      'A healthcare network with 200+ facilities automated vendor contract management and compliance tracking.',
    accent: 'from-[#0c4a6e] via-[#082f49] to-[#020617]',
    metrics: [
      { label: 'Contract processing', value: '90%', description: 'Faster contract execution' },
      { label: 'Compliance rate', value: '99.8%', description: 'Vendor compliance tracking' },
      { label: 'Cost savings', value: '$5.2M', description: 'Annual procurement savings' },
    ],
    challenge:
      'Managing thousands of vendor contracts across multiple facilities with varying compliance requirements was overwhelming the legal team.',
    solution:
      "Deployed AIForLawyers's contract management platform with automated compliance tracking and vendor performance monitoring.",
    results:
      'Streamlined contract processes, improved vendor compliance, and identified significant cost savings opportunities.',
    testimonial: {
      quote:
        'The contract management automation has transformed how we work with vendors. We are more efficient and compliant than ever before.',
      author: 'Jennifer Park',
      position: 'Chief Legal Officer',
      company: 'National Healthcare Network',
    },
  },
  {
    id: 6,
    title: 'Real estate firm accelerates transaction closings',
    client: 'Metropolitan Real Estate Group',
    industry: 'Real estate',
    category: 'transactions',
    excerpt:
      'A commercial real estate firm reduced transaction closing times while improving accuracy and client satisfaction.',
    accent: 'from-[#4c1d95] via-[#2e1065] to-[#0f172a]',
    metrics: [
      { label: 'Closing speed', value: '50%', description: 'Faster transaction closings' },
      { label: 'Document accuracy', value: '99.5%', description: 'Error-free closing documents' },
      { label: 'Client satisfaction', value: '96%', description: 'Client satisfaction score' },
    ],
    challenge:
      'Complex real estate transactions involved extensive document review and coordination, often leading to delays and client frustration.',
    solution:
      "Integrated AIForLawyers's transaction management tools with automated document generation and compliance checking.",
    results:
      'Reduced average closing time from 45 to 22 days while eliminating document errors and improving client experience.',
    testimonial: {
      quote:
        'Our clients are amazed at how quickly we can close transactions now. The accuracy and speed have set us apart from competitors.',
      author: 'Thomas Anderson',
      position: 'Managing Partner',
      company: 'Metropolitan Real Estate Group',
    },
  },
];

export function getCaseStudyByParam(param: string): CaseStudyRecord | undefined {
  const n = Number(param);
  if (!Number.isFinite(n)) return undefined;
  return caseStudies.find((c) => c.id === n);
}

export function getRelatedCaseStudies(excludeId: number, limit: number): CaseStudyRecord[] {
  return caseStudies.filter((c) => c.id !== excludeId).slice(0, limit);
}
