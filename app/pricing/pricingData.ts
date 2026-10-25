export type PricingPlan = {
  name: string;
  description: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  features: string[];
  popular: boolean;
  ctaText: string;
};

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Free',
    description: 'Perfect for exploring our AI capabilities.',
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      'Intelligence Search (5 searches)',
      'AI Legal Chat (5 messages)',
      'AI Lawyers (Access to 5 personas)',
      'No Vault/Docs access',
      'No Workflow Builder',
    ],
    popular: false,
    ctaText: 'Start Free',
  },
  {
    name: 'Pro',
    description: 'Ideal for growing law firms and active professionals.',
    monthlyPrice: 49,
    annualPrice: 490,
    features: [
      'Intelligence Search (50 searches)',
      'AI Legal Chat (50 messages)',
      'Full AI Lawyers Access (All 50 personas)',
      'Document Operations (50 ops)',
      'Secure Vault (50 folders, 500MB)',
      'Advanced Workflow Builder (5 workflows)',
    ],
    popular: true,
    ctaText: 'Upgrade to Pro',
  },
  {
    name: 'Enterprise',
    description: 'For large firms requiring unlimited capabilities.',
    monthlyPrice: null,
    annualPrice: null,
    features: [
      'Unlimited Intelligence Search',
      'Unlimited AI Legal Chat',
      'Unlimited AI Lawyers Access',
      'Unlimited Document Operations',
      'Unlimited Vault Storage & Folders',
      'Unlimited Workflow Builder',
      'Dedicated Account Manager',
      'Custom Integrations',
    ],
    popular: false,
    ctaText: 'Contact Us',
  },
];
