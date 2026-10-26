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
    name: 'Gratuito',
    description: 'Ideal para conhecer nossos recursos de IA.',
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      'Pesquisa Inteligente (5 pesquisas)',
      'Chat Jurídico com IA (5 mensagens)',
      'Advogados de IA (acesso a 5 personas)',
      'Sem acesso ao Cofre/Documentos',
      'Sem Criador de Fluxos',
    ],
    popular: false,
    ctaText: 'Começar grátis',
  },
  {
    name: 'Pro',
    description: 'Ideal para escritórios em crescimento e profissionais ativos.',
    monthlyPrice: 49,
    annualPrice: 490,
    features: [
      'Pesquisa Inteligente (50 pesquisas)',
      'Chat Jurídico com IA (50 mensagens)',
      'Acesso completo aos Advogados de IA (todas as 50 personas)',
      'Operações com documentos (50 operações)',
      'Cofre seguro (50 pastas, 500 MB)',
      'Criador de Fluxos avançado (5 fluxos)',
    ],
    popular: true,
    ctaText: 'Fazer upgrade para o Pro',
  },
  {
    name: 'Enterprise',
    description: 'Para grandes escritórios que precisam de recursos ilimitados.',
    monthlyPrice: null,
    annualPrice: null,
    features: [
      'Pesquisa Inteligente ilimitada',
      'Chat Jurídico com IA ilimitado',
      'Acesso ilimitado aos Advogados de IA',
      'Operações com documentos ilimitadas',
      'Armazenamento e pastas ilimitados no Cofre',
      'Criador de Fluxos ilimitado',
      'Gerente de conta dedicado',
      'Integrações personalizadas',
    ],
    popular: false,
    ctaText: 'Fale conosco',
  },
];
