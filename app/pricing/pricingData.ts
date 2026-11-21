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

// Planos que o escritório assina no Pequi (modelo B2B white-label).
// Os clientes do escritório não pagam: usam a assistente dentro do plano do escritório.
export const pricingPlans: PricingPlan[] = [
  {
    name: 'Gratuito',
    description: 'Para o escritório conhecer a plataforma antes de assinar.',
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      'Pesquisa Inteligente (5 pesquisas)',
      'Chat Jurídico com IA (5 mensagens)',
      'Assistentes de IA (5 áreas liberadas)',
      'Sem marca própria e sem chat no site',
      'Sem Cofre, Documentos e Fluxos',
    ],
    popular: false,
    ctaText: 'Começar grátis',
  },
  {
    name: 'Pro',
    description: 'Para escritórios que oferecem a assistente aos clientes com a própria marca.',
    monthlyPrice: 399,
    annualPrice: 3999,
    features: [
      'Painel com logo, cores e nome do escritório',
      'Endereço próprio ou subdomínio do Pequi',
      'Chat de atendimento no site do escritório',
      'IA e e-mails com o nome do escritório',
      'Clientes usam sem custo, cada um com 50 pesquisas, 50 mensagens e 50 operações com documentos por mês',
      'Todos os assistentes de IA, Cofre e Fluxos',
      'Lista de clientes e contatos do chat',
    ],
    popular: true,
    ctaText: 'Assinar para o escritório',
  },
  {
    name: 'Enterprise',
    description: 'Para escritórios maiores, com uso ilimitado para a equipe e os clientes.',
    monthlyPrice: null,
    annualPrice: null,
    features: [
      'Tudo do plano Pro',
      'Uso ilimitado para o escritório e os clientes',
      'Gerente de conta dedicado',
      'Integrações personalizadas',
    ],
    popular: false,
    ctaText: 'Fale conosco',
  },
];
