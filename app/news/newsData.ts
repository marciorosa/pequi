export type NewsCategoryKey = 'product' | 'company' | 'industry' | 'partnership' | 'press';

export type NewsArticleRecord = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  publishedDate: string;
  categoryKey: NewsCategoryKey;
  author: string;
  authorRole: string;
  authorImage: string;
  image: string;
  readTime: string;
  tags: string[];
  content: string[];
};

const pool = [
  '/landingpage/features/ai-legal-assistant.png',
  '/landingpage/features/global-legal-database.png',
  '/landingpage/features/workflow-automation.png',
  '/landingpage/features/ai-powered-legal-assistant.png',
  '/landingpage/one-legal-platform/document-regis.png',
  '/landingpage/one-legal-platform/channels.png',
];

const avatars = [
  '/landingpage/hero/img1.png',
  '/landingpage/hero/img2.png',
  '/landingpage/hero/img3.png',
  '/landingpage/hero/img4.png',
  '/landingpage/hero/img5.png',
];

export const NEWS_ARTICLES: NewsArticleRecord[] = [
  {
    id: 1,
    slug: 'AiForLawyers-launches-revolutionary-contract-analysis-tool',
    title: 'AiForLawyers launches revolutionary contract analysis tool',
    excerpt:
      'Our new AI-powered contract analysis tool can review complex legal documents in minutes instead of hours.',
    date: 'November 15, 2023',
    publishedDate: '2023-11-15T10:00:00.000Z',
    categoryKey: 'product',
    author: 'Sarah Johnson',
    authorRole: 'Chief product officer',
    authorImage: avatars[0],
    image: pool[0],
    readTime: '5 min read',
    tags: ['Product', 'AI', 'Contracts', 'Legal tech'],
    content: [
      'AiForLawyers today announced a contract analysis capability designed to help teams review dense agreements faster—surfacing risk clauses, missing terms, and plain-language summaries without replacing attorney judgment.',
      'The system is trained on legal text and workflows common to NDAs, master services agreements, employment contracts, and M&A schedules. Customers can route outputs into Word, PDF exports, or connected document management tools.',
      '"Review volume is not slowing down," said Michael Chen, CEO of AiForLawyers. "We built this so lawyers spend less time on mechanical passes and more time on negotiation strategy and client counsel."',
      'The feature is available to Professional and Enterprise subscribers, with additional integrations planned over the coming quarters.',
    ],
  },
  {
    id: 2,
    slug: 'AiForLawyers-raises-50m-in-series-b-funding',
    title: 'AiForLawyers raises $50M in Series B funding',
    excerpt: 'The investment will accelerate product development and global expansion to meet growing demand.',
    date: 'October 3, 2023',
    publishedDate: '2023-10-03T09:00:00.000Z',
    categoryKey: 'company',
    author: 'Michael Chen',
    authorRole: 'CEO',
    authorImage: avatars[1],
    image: pool[1],
    readTime: '4 min read',
    tags: ['Funding', 'Company', 'Growth'],
    content: [
      'AiForLawyers has closed $50 million in Series B financing to scale product engineering, customer success, and international go-to-market efforts as demand for legal AI continues to climb among firms and corporate legal departments.',
      'The company will deepen investments in secure infrastructure, model evaluation, and workflow automation tied to vault storage and knowledge search—areas customers cite as highest impact in pilot programs.',
      '"Capital follows clarity," said Michael Chen. "Our buyers want outcomes they can defend to general counsel and regulators. This round lets us ship faster without compromising on security or auditability."',
      'AiForLawyers will expand hiring across engineering, legal engineering, and field teams in North America and Europe.',
    ],
  },
  {
    id: 3,
    slug: 'future-of-legal-research-ai-vs-traditional-methods',
    title: 'The future of legal research: AI vs. traditional methods',
    excerpt:
      'New study shows AI-powered legal research is faster and surfaces more relevant precedents in blind benchmarks.',
    date: 'September 21, 2023',
    publishedDate: '2023-09-21T14:00:00.000Z',
    categoryKey: 'industry',
    author: 'Elena Rodriguez',
    authorRole: 'Head of research',
    authorImage: avatars[2],
    image: pool[2],
    readTime: '6 min read',
    tags: ['Research', 'Industry', 'AI'],
    content: [
      'A comparative study of associate-style research tasks found that teams using AI-assisted search completed work significantly faster while retrieving a broader set of on-point authorities when measured against traditional manual search alone.',
      'Researchers emphasized that AI is most effective when paired with human verification—especially for citation format, jurisdictional nuance, and factual record alignment.',
      'AiForLawyers contributed anonymized benchmarks from customer pilots; full methodology and limitations are documented in the accompanying technical appendix.',
      'The report recommends firms adopt clear policies for when machine-generated summaries require partner or specialist sign-off.',
    ],
  },
  {
    id: 4,
    slug: 'AiForLawyers-partners-with-global-law-firm-baker-mckenzie',
    title: 'AiForLawyers partners with global law firm Baker McKenzie',
    excerpt: "Strategic partnership brings AI legal tooling to one of the world's largest law firms.",
    date: 'August 17, 2023',
    publishedDate: '2023-08-17T11:30:00.000Z',
    categoryKey: 'partnership',
    author: 'David Wilson',
    authorRole: 'VP of partnerships',
    authorImage: avatars[3],
    image: pool[3],
    readTime: '4 min read',
    tags: ['Partnership', 'Global firms'],
    content: [
      'AiForLawyers and Baker McKenzie announced a strategic collaboration to deploy AI workflows across select practices, focusing on research acceleration, contract playbooks, and secure document analysis.',
      'Joint teams will co-develop templates and governance guardrails so matter teams can adopt tools consistently across regions.',
      '"Scale only matters if quality holds," noted partnership leads. "We are starting with tightly scoped use cases and measurable KPIs."',
      'Additional rollout phases are expected over the next eighteen months subject to internal approvals and training milestones.',
    ],
  },
  {
    id: 5,
    slug: 'new-compliance-module-helps-firms-navigate-regulatory-changes',
    title: 'New compliance module helps firms navigate regulatory change',
    excerpt: 'Stay ahead of complex regulatory landscapes with AI-powered compliance monitoring.',
    date: 'July 29, 2023',
    publishedDate: '2023-07-29T08:00:00.000Z',
    categoryKey: 'product',
    author: 'Jennifer Park',
    authorRole: 'Compliance director',
    authorImage: avatars[4],
    image: pool[4],
    readTime: '5 min read',
    tags: ['Product', 'Compliance', 'Regulatory'],
    content: [
      'The new compliance module aggregates regulatory feeds, internal policies, and matter context to highlight changes that may affect active engagements.',
      'Alerts can be routed to owners by jurisdiction, industry, or client profile, with an audit trail for downstream review.',
      'Early adopters reported faster triage of rule updates affecting financial services and data privacy obligations.',
      'AiForLawyers plans additional connectors to third-party regulatory intelligence providers later this year.',
    ],
  },
  {
    id: 6,
    slug: 'AiForLawyers-named-in-forbes-next-billion-dollar-startups-list',
    title: 'AiForLawyers named in Forbes Next Billion-Dollar Startups list',
    excerpt: "Forbes recognizes AiForLawyers's potential to transform legal work through applied AI.",
    date: 'June 12, 2023',
    publishedDate: '2023-06-12T12:00:00.000Z',
    categoryKey: 'press',
    author: 'Press team',
    authorRole: 'AiForLawyers',
    authorImage: avatars[0],
    image: pool[5],
    readTime: '3 min read',
    tags: ['Press', 'Recognition'],
    content: [
      'Forbes included AiForLawyers among companies viewed as having significant upside in enterprise legal software, citing traction with large firms and in-house teams.',
      'The list is editorial and not an endorsement of financial performance; readers should consult independent analysis before making investment decisions.',
      'AiForLawyers thanked customers and partners for feedback that shaped the product roadmap over the past year.',
    ],
  },
  {
    id: 7,
    slug: 'AiForLawyers-unveils-new-multilingual-contract-capabilities',
    title: 'AiForLawyers unveils new multilingual contract capabilities',
    excerpt: 'Contract analysis in multiple languages so global legal teams can move in parallel.',
    date: 'May 18, 2023',
    publishedDate: '2023-05-18T15:00:00.000Z',
    categoryKey: 'product',
    author: 'Thomas Lee',
    authorRole: 'CTO',
    authorImage: avatars[1],
    image: pool[0],
    readTime: '5 min read',
    tags: ['Product', 'Global', 'Contracts'],
    content: [
      'Multilingual contract analysis is now available for select languages, with parity-focused evaluation on clause detection and summary quality per locale.',
      'Customers can standardize review checklists across offices while preserving localized terminology preferences.',
      'AiForLawyers continues to expand language coverage based on customer demand and evaluation harness results.',
    ],
  },
  {
    id: 8,
    slug: 'legal-industry-survey-shows-increasing-ai-adoption',
    title: 'Legal industry survey shows increasing AI adoption',
    excerpt:
      'A majority of firms now use or plan to implement AI tools within the next year, per a new industry report.',
    date: 'April 5, 2023',
    publishedDate: '2023-04-05T10:00:00.000Z',
    categoryKey: 'industry',
    author: 'Research team',
    authorRole: 'AiForLawyers',
    authorImage: avatars[2],
    image: pool[1],
    readTime: '5 min read',
    tags: ['Survey', 'Industry', 'Adoption'],
    content: [
      'Survey respondents included a mix of Am Law 200 firms, regional practices, and corporate legal departments across North America and Europe.',
      'Use cases ranked highest included document review, research, and knowledge management; concerns centered on accuracy verification and vendor security posture.',
      'AiForLawyers published aggregate findings without attributing responses to individual organizations.',
    ],
  },
  {
    id: 9,
    slug: 'AiForLawyers-opens-new-london-office',
    title: 'AiForLawyers opens new London office to support European expansion',
    excerpt: 'UK hub for European operations as demand grows across the region.',
    date: 'March 22, 2023',
    publishedDate: '2023-03-22T09:00:00.000Z',
    categoryKey: 'company',
    author: 'Emma Thompson',
    authorRole: 'VP, European operations',
    authorImage: avatars[3],
    image: pool[2],
    readTime: '3 min read',
    tags: ['Company', 'Europe', 'Expansion'],
    content: [
      'The London office anchors customer success, solutions engineering, and partner engagement for European accounts.',
      'AiForLawyers cited growing demand for EU data residency options and localized support as drivers for the investment.',
      'Hiring is open for roles listed on the company careers page.',
    ],
  },
];

export function getArticleBySlug(slug: string): NewsArticleRecord | undefined {
  return NEWS_ARTICLES.find((a) => a.slug === slug);
}

export function getRelatedArticles(slug: string, limit = 3): NewsArticleRecord[] {
  const current = getArticleBySlug(slug);
  if (!current) {
    return NEWS_ARTICLES.slice(0, limit);
  }
  return NEWS_ARTICLES.filter((a) => a.slug !== slug)
    .sort((a, b) => Math.abs(a.id - current.id) - Math.abs(b.id - current.id))
    .slice(0, limit);
}
