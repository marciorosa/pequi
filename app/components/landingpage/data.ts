export const trustedLogos = ['openAI', 'Google', 'microsoft', 'A&O', 'meta', 'claude'];

export const trustedByLogos = [
  { src: '/landingpage/trustedby/allenovery.png', alt: 'Allen & Overy' },
  { src: '/landingpage/trustedby/cliffordchance.png', alt: 'Clifford Chance' },
  { src: '/landingpage/trustedby/kirklandellis.png', alt: 'Kirkland & Ellis' },
  { src: '/landingpage/trustedby/lathamwatkins.png', alt: 'Latham & Watkins' },
  { src: '/landingpage/trustedby/skadden.png', alt: 'Skadden' },
  { src: '/landingpage/trustedby/whitecase.png', alt: 'White & Case' },
];

export const heroAssets = [
  '/landingpage/hero/overlap-automations.png',
  '/landingpage/hero/overlap-vaultaccess.png',
  '/landingpage/hero/overlap-aiassistants.png',
  '/landingpage/hero/overlap-document-registry.png',
  '/landingpage/hero/overlap-searchoptions.png',
  '/landingpage/hero/overlap-channels.png',
];

export const featureCards = [
  { title: 'Contracts', desc: 'Create, review and compare agreements with structured AI extraction.' },
  { title: 'Client Workflows', desc: 'Automate intake, legal steps, reminders and approvals in one place.' },
  { title: 'Private Vault', desc: 'Store and query legal files with enterprise-grade permission controls.' },
  { title: 'Matter Insights', desc: 'Track trends, deadlines and risk signals across ongoing legal matters.' },
  { title: 'Smart Templates', desc: 'Use reusable legal templates with clause-level version support.' },
  { title: 'Case Intelligence', desc: 'Search and summarize legal precedents with citation-aware results.' },
];

export const securityStats = [
  { label: 'Encrypted Docs', value: '100%' },
  { label: 'Uptime', value: '99.9%' },
  { label: 'Response Speed', value: '< 2s' },
  { label: 'Secure Regions', value: '12+' },
];

export const reasons = [
  'Draft and review legal content in minutes.',
  'Stay compliant with built-in security and audit trails.',
  'Collaborate with teams and clients from one workspace.',
  'Work faster with AI suggestions and contextual references.',
];

export const testimonials = [
  { quote: 'It cut our document review time almost in half.', author: 'Head of Legal Operations' },
  { quote: 'Our team now handles more matters with the same headcount.', author: 'Managing Partner' },
  { quote: 'The platform feels tailored for modern legal teams.', author: 'General Counsel' },
];

export const faqs: { question: string; answer: string }[] = [
  {
    question: 'How does AiForLawyers protect confidential legal data?',
    answer:
      'We use encryption in transit and at rest, role-based access, audit trails, and deployment options that align with how your firm handles privileged information.',
  },
  {
    question: 'Can teams collaborate on matters and contracts?',
    answer:
      'Yes. Shared workspaces, commenting, and version history help legal, business, and outside counsel stay aligned without losing control of sensitive documents.',
  },
  {
    question: 'Does the platform support custom legal workflows?',
    answer:
      'You can tailor review stages, approvals, and templates so intake, drafting, and sign-off match your policies—not a one-size-fits-all playbook.',
  },
  {
    question: 'How quickly can we onboard our legal team?',
    answer:
      'Most teams complete core setup in days. We provide guided onboarding and can phase rollout by practice group or region if you prefer.',
  },
  {
    question: 'Do you offer enterprise support and SLA?',
    answer:
      'Enterprise plans include dedicated support channels, response targets, and options for enhanced availability so critical workflows stay covered.',
  },
];
