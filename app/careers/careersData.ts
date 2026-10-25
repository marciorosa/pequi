export type CareerJobFull = {
  id: number;
  title: string;
  location: string;
  type: string;
  department: string;
  departmentLabel: string;
  description: string;
  requirements: string[];
  experience: string;
  salary: string;
  posted: string;
  responsibilities: string[];
  preferred: string[];
  benefits: string[];
  team: string;
  culture: string;
};

const defaultBenefits = [
  'Competitive salary and equity',
  'Health, dental, and vision coverage',
  '401(k) with company matching',
  'Flexible PTO and remote-friendly policies',
  'Professional development budget',
  'Wellness stipend and mental health support',
];

export const careersJobs: CareerJobFull[] = [
  {
    id: 1,
    title: 'Senior AI Engineer',
    location: 'San Francisco, CA',
    type: 'Full-time',
    department: 'engineering',
    departmentLabel: 'Engineering',
    description:
      'Lead development of ML and NLP systems that power legal document understanding, retrieval, and drafting at scale.',
    requirements: [
      '5+ years in machine learning and NLP',
      'Production ML deployment experience',
      'PyTorch or TensorFlow',
      'Legal technology background is a plus',
    ],
    experience: '5+ years',
    salary: '$180,000 – $250,000',
    posted: '2024-01-15',
    responsibilities: [
      'Design and ship models for legal document analysis',
      'Optimize training and inference pipelines for reliability and cost',
      'Partner with legal experts to improve accuracy and safety',
      'Guide architecture for AI infrastructure',
      'Mentor engineers and raise the technical bar',
    ],
    preferred: [
      'Advanced degree in CS, ML, or related field',
      'Experience with LLMs and retrieval systems',
      'Strong Python and cloud (AWS/GCP) skills',
      'Open-source or published research',
    ],
    benefits: defaultBenefits,
    team: 'You will join a focused AI platform team building the core models and services behind AIForLawyers.',
    culture: 'We value rigorous evaluation, responsible AI, and shipping products that legal professionals trust.',
  },
  {
    id: 2,
    title: 'Product Manager – Legal Solutions',
    location: 'New York, NY',
    type: 'Full-time',
    department: 'product',
    departmentLabel: 'Product',
    description:
      'Own roadmap and outcomes for contract lifecycle and AI-assisted workflows used by firms and legal departments.',
    requirements: [
      '3+ years in product management',
      'Legal tech or enterprise SaaS experience',
      'Strong user research and prioritization skills',
      'Excellent written and verbal communication',
    ],
    experience: '3+ years',
    salary: '$150,000 – $200,000',
    posted: '2024-01-16',
    responsibilities: [
      'Define problems, metrics, and roadmap for legal workflows',
      'Work with design, engineering, and GTM on launches',
      'Run discovery with customers and translate needs into specs',
      'Align stakeholders on tradeoffs and timelines',
    ],
    preferred: [
      'Experience with CLM or document-heavy products',
      'Familiarity with AI product patterns (guardrails, evals)',
      'MBA or JD a plus',
    ],
    benefits: defaultBenefits,
    team: 'Product works tightly with engineering and customer success to ship cohesive experiences.',
    culture: 'We bias toward clarity, customer evidence, and fast learning cycles.',
  },
  {
    id: 3,
    title: 'Legal Content Specialist',
    location: 'Remote',
    type: 'Full-time',
    department: 'legal',
    departmentLabel: 'Legal',
    description:
      'Create and curate high-quality legal content to improve model quality and user-facing guidance.',
    requirements: [
      'JD or equivalent legal qualification',
      '3+ years in practice or legal content',
      'Excellent writing and analysis',
      'Interest in legal technology and AI',
    ],
    experience: '3+ years',
    salary: '$120,000 – $160,000',
    posted: '2024-01-17',
    responsibilities: [
      'Draft and review training and evaluation datasets',
      'Author help content, playbooks, and policy docs',
      'Partner with product on accuracy and disclaimers',
      'Stay current on practice-area nuances',
    ],
    preferred: [
      'In-house or law firm experience',
      'Familiarity with contracts or compliance domains',
    ],
    benefits: defaultBenefits,
    team: 'Legal partners embed with product and AI teams to keep outputs grounded and responsible.',
    culture: 'Precision, intellectual honesty, and respect for the profession come first.',
  },
  {
    id: 4,
    title: 'UX/UI Designer',
    location: 'San Francisco, CA',
    type: 'Full-time',
    department: 'design',
    departmentLabel: 'Design',
    description:
      'Design clear, trustworthy interfaces for complex legal workflows and data-heavy experiences.',
    requirements: [
      '4+ years in UX/UI for enterprise or B2B',
      'Strong portfolio and design process',
      'Design systems and component libraries',
      'Figma and prototyping proficiency',
    ],
    experience: '4+ years',
    salary: '$130,000 – $175,000',
    posted: '2024-01-18',
    responsibilities: [
      'Lead flows from research through high-fidelity UI',
      'Maintain and extend the design system',
      'Partner with engineering on accessible implementation',
      'Iterate with customer feedback and analytics',
    ],
    preferred: [
      'Experience with dense, professional software',
      'Motion or design-ops skills',
    ],
    benefits: defaultBenefits,
    team: 'Design collaborates daily with product and engineering in a critique-friendly environment.',
    culture: 'We care about craft, accessibility, and reducing cognitive load for legal users.',
  },
  {
    id: 5,
    title: 'VP of Sales',
    location: 'New York, NY',
    type: 'Full-time',
    department: 'sales',
    departmentLabel: 'Sales',
    description:
      'Build and lead the go-to-market motion for AIForLawyers across law firms and corporate legal teams.',
    requirements: [
      '10+ years in B2B SaaS sales leadership',
      'Track record scaling revenue and teams',
      'Experience selling to legal or professional services',
      'Strong coaching and forecasting discipline',
    ],
    experience: '10+ years',
    salary: '$220,000 – $320,000 + variable',
    posted: '2024-01-19',
    responsibilities: [
      'Own pipeline, forecast, and territory strategy',
      'Hire and develop AEs and sales engineers',
      'Partner with marketing on campaigns and messaging',
      'Represent the voice of the customer internally',
    ],
    preferred: [
      'Network in AmLaw or Fortune legal departments',
      'Experience with PLG or hybrid motions',
    ],
    benefits: defaultBenefits,
    team: 'Sales works closely with marketing, product, and leadership on packaging and proof points.',
    culture: 'We win with trust, domain credibility, and long-term customer outcomes.',
  },
  {
    id: 6,
    title: 'DevOps Engineer',
    location: 'Remote',
    type: 'Full-time',
    department: 'engineering',
    departmentLabel: 'Engineering',
    description:
      'Operate secure, scalable cloud infrastructure and CI/CD for our production legal AI platform.',
    requirements: [
      '5+ years in DevOps or SRE',
      'AWS, Kubernetes, and containers',
      'Infrastructure as code (Terraform, etc.)',
      'Security and compliance mindset',
    ],
    experience: '5+ years',
    salary: '$150,000 – $200,000',
    posted: '2024-01-20',
    responsibilities: [
      'Design and run production Kubernetes and networking',
      'Automate builds, tests, and deployments',
      'Improve observability, SLOs, and incident response',
      'Partner on security reviews and audits',
    ],
    preferred: [
      'Experience in regulated or high-trust environments',
      'GitOps or progressive delivery patterns',
    ],
    benefits: defaultBenefits,
    team: 'Infrastructure engineers enable the whole product org to ship safely and quickly.',
    culture: 'We prioritize reliability, least privilege, and pragmatic automation.',
  },
];

export function getCareerJobByIdParam(param: string): CareerJobFull | undefined {
  const n = Number(param);
  if (!Number.isFinite(n)) return undefined;
  return careersJobs.find((j) => j.id === n);
}
