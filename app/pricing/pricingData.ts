export type PricingPlan = {
  name: string;
  description: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  features: string[];
  popular: boolean;
  ctaText: string;
};

const priceFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
});

export const formatPlanPrice = (price: number) => priceFormatter.format(price);

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Gratuito',
    description: 'Ideal para conhecer nossos recursos de IA.',
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      'Pesquisa Inteligente (5 pesquisas)',
      'Chat Jurídico com IA (5 mensagens)',
      'Assistentes de IA (5 áreas liberadas)',
      'Sem acesso ao Cofre/Documentos',
      'Sem Criador de Fluxos',
    ],
    popular: false,
    ctaText: 'Começar grátis',
  },
  {
    name: 'Pro',
    description: 'Ideal para quem lida com questões jurídicas frequentes.',
    monthlyPrice: 399,
    annualPrice: 3999,
    features: [
      'Pesquisa Inteligente (50 pesquisas)',
      'Chat Jurídico com IA (50 mensagens)',
      'Todos os assistentes de IA, em todas as áreas',
      'Operações com documentos (50 operações)',
      'Cofre seguro (50 pastas, 500 MB)',
      'Criador de Fluxos avançado (5 fluxos)',
    ],
    popular: true,
    ctaText: 'Fazer upgrade para o Pro',
  },
  {
    name: 'Enterprise',
    description: 'Para pequenos negócios que precisam de recursos ilimitados.',
    monthlyPrice: null,
    annualPrice: null,
    features: [
      'Pesquisa Inteligente ilimitada',
      'Chat Jurídico com IA ilimitado',
      'Acesso ilimitado aos assistentes de IA',
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
