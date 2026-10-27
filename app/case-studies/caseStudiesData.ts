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
    title: 'Escritório global reduz em 75% o tempo de revisão de contratos',
    client: 'Baker McKenzie',
    industry: 'Serviços jurídicos',
    category: 'contract-review',
    excerpt:
      "Como um dos maiores escritórios de advocacia do mundo transformou seu processo de revisão de contratos com análise baseada em IA.",
    accent: 'from-cerrado-900 via-cerrado-900 to-cerrado-950',
    metrics: [
      { label: 'Tempo economizado', value: '75%', description: 'Redução no tempo de revisão de contratos' },
      { label: 'Precisão', value: '95%', description: 'Precisão consistente em todas as revisões' },
      { label: 'Redução de custos', value: 'US$ 2,3 mi', description: 'Economia anual em custos de revisão' },
    ],
    challenge:
      'Os processos manuais de revisão levavam mais de 40 horas por contrato complexo, criando gargalos e aumentando os custos para os clientes.',
    solution:
      "Implementou a ferramenta de análise de contratos do Pequi com fluxos personalizados para diferentes tipos de contrato e sinalização automática de riscos.",
    results:
      'Alcançou redução de 75% no tempo de revisão, mantendo taxas de precisão mais altas e melhorando os índices de satisfação dos clientes.',
    testimonial: {
      quote:
        'O Pequi revolucionou nosso processo de revisão de contratos. O que levava semanas agora leva dias, e nossa precisão nunca foi tão boa.',
      author: 'Sarah Johnson',
      position: 'Sócia-diretora',
      company: 'Baker McKenzie',
    },
  },
  {
    id: 2,
    title: 'Departamento jurídico corporativo simplifica o monitoramento de compliance',
    client: 'Empresa de tecnologia da Fortune 500',
    industry: 'Tecnologia',
    category: 'compliance',
    excerpt: 'Como uma grande empresa de tecnologia automatizou o acompanhamento de conformidade regulatória em 15 jurisdições.',
    accent: 'from-terra-700 via-terra-800 to-cerrado-950',
    metrics: [
      { label: 'Alertas de compliance', value: '100%', description: 'Notificações automáticas de mudanças regulatórias' },
      { label: 'Redução de riscos', value: '85%', description: 'Queda nas violações de compliance' },
      { label: 'Eficiência da equipe', value: '3x', description: 'Aumento na produtividade da equipe' },
    ],
    challenge:
      'Acompanhar mudanças regulatórias em várias jurisdições era um trabalho manual, demorado e sujeito a falhas.',
    solution:
      "Implantou o sistema de monitoramento de compliance do Pequi, com acompanhamento regulatório em tempo real e alertas automáticos.",
    results:
      'Eliminou o acompanhamento manual de compliance, reduziu as violações em 85% e liberou a equipe jurídica para iniciativas estratégicas.',
    testimonial: {
      quote:
        'Os recursos de monitoramento de compliance mudaram o jogo. Agora tratamos as mudanças regulatórias de forma proativa, em vez de apenas reagir a elas.',
      author: 'Michael Chen',
      position: 'Diretor Jurídico',
      company: 'Empresa de Tecnologia da Fortune 500',
    },
  },
  {
    id: 3,
    title: 'Escritório de médio porte aumenta em 400% a eficiência das pesquisas',
    client: 'Johnson & Associates',
    industry: 'Serviços jurídicos',
    category: 'research',
    excerpt: 'Um escritório com 50 advogados transformou seu processo de pesquisa jurídica e melhorou drasticamente os resultados dos casos.',
    accent: 'from-cerrado-700 via-cerrado-900 to-cerrado-950',
    metrics: [
      { label: 'Velocidade de pesquisa', value: '400%', description: 'Pesquisas concluídas mais rapidamente' },
      { label: 'Casos ganhos', value: '35%', description: 'Aumento de resultados favoráveis' },
      { label: 'Horas faturáveis', value: '250h', description: 'Horas faturáveis adicionais por mês' },
    ],
    challenge:
      'Os associados gastavam 60% do tempo com pesquisa, limitando a capacidade para trabalhos de maior valor e o contato com os clientes.',
    solution:
      "Integrou a plataforma de conhecimento do Pequi aos fluxos de pesquisa já existentes no escritório e capacitou a equipe em técnicas avançadas de busca.",
    results:
      'Pesquisas que antes levavam de 8 a 10 horas agora levam cerca de 2 horas, permitindo que os advogados assumam mais casos e melhorem o atendimento aos clientes.',
    testimonial: {
      quote:
        'Nossos associados agora concluem em horas pesquisas que levavam dias. A qualidade dos insights que oferecemos aos clientes melhorou drasticamente.',
      author: 'Elena Rodriguez',
      position: 'Sócia sênior',
      company: 'Johnson & Associates',
    },
  },
  {
    id: 4,
    title: 'Banco de investimento automatiza due diligence de M&A',
    client: 'Banco de investimento global',
    industry: 'Serviços financeiros',
    category: 'due-diligence',
    excerpt: 'Como um grande banco de investimento reduziu os prazos de due diligence de M&A de meses para semanas.',
    accent: 'from-pequi-800 via-pequi-900 to-terra-900',
    metrics: [
      { label: 'Redução de prazo', value: '60%', description: 'Due diligence concluída mais rapidamente' },
      { label: 'Análise de documentos', value: '10.000+', description: 'Documentos processados por operação' },
      { label: 'Velocidade das operações', value: '2x', description: 'Aumento de operações concluídas' },
    ],
    challenge:
      "Os processos tradicionais de due diligence levavam de 3 a 4 meses por operação, limitando a capacidade do banco de competir em mercados dinâmicos.",
    solution:
      "Implementou o pacote de análise de documentos do Pequi com fluxos personalizados de M&A e sinalização automática de riscos em documentos financeiros.",
    results:
      'Reduziu os prazos de due diligence para 4 a 6 semanas, melhorando a precisão e permitindo que o banco buscasse mais oportunidades.',
    testimonial: {
      quote:
        "Os recursos de due diligence do Pequi nos deram uma vantagem competitiva significativa. Conseguimos agir mais rápido mantendo nossos padrões rigorosos.",
      author: 'David Wilson',
      position: 'Diretor-geral',
      company: 'Banco de Investimento Global',
    },
  },
  {
    id: 5,
    title: 'Rede de saúde simplifica a gestão de contratos',
    client: 'Rede nacional de saúde',
    industry: 'Saúde',
    category: 'contract-management',
    excerpt:
      'Uma rede de saúde com mais de 200 unidades automatizou a gestão de contratos com fornecedores e o acompanhamento de compliance.',
    accent: 'from-cerrado-600 via-cerrado-800 to-cerrado-950',
    metrics: [
      { label: 'Processamento de contratos', value: '90%', description: 'Formalização de contratos mais rápida' },
      { label: 'Taxa de conformidade', value: '99,8%', description: 'Acompanhamento da conformidade de fornecedores' },
      { label: 'Economia de custos', value: 'US$ 5,2 mi', description: 'Economia anual em compras' },
    ],
    challenge:
      'Gerenciar milhares de contratos com fornecedores em várias unidades, com diferentes exigências de compliance, sobrecarregava a equipe jurídica.',
    solution:
      "Implantou a plataforma de gestão de contratos do Pequi com acompanhamento automático de compliance e monitoramento do desempenho de fornecedores.",
    results:
      'Simplificou os processos contratuais, melhorou a conformidade dos fornecedores e identificou oportunidades significativas de economia.',
    testimonial: {
      quote:
        'A automação da gestão de contratos transformou a forma como trabalhamos com fornecedores. Estamos mais eficientes e em conformidade do que nunca.',
      author: 'Jennifer Park',
      position: 'Diretora Jurídica',
      company: 'Rede Nacional de Saúde',
    },
  },
  {
    id: 6,
    title: 'Empresa do setor imobiliário acelera o fechamento de transações',
    client: 'Metropolitan Real Estate Group',
    industry: 'Imobiliário',
    category: 'transactions',
    excerpt:
      'Uma empresa de imóveis comerciais reduziu o tempo de fechamento das transações, melhorando a precisão e a satisfação dos clientes.',
    accent: 'from-terra-600 via-terra-800 to-cerrado-950',
    metrics: [
      { label: 'Velocidade de fechamento', value: '50%', description: 'Fechamento de transações mais rápido' },
      { label: 'Precisão documental', value: '99,5%', description: 'Documentos de fechamento sem erros' },
      { label: 'Satisfação dos clientes', value: '96%', description: 'Índice de satisfação dos clientes' },
    ],
    challenge:
      'Transações imobiliárias complexas envolviam ampla revisão documental e coordenação, o que frequentemente gerava atrasos e frustração dos clientes.',
    solution:
      "Integrou as ferramentas de gestão de transações do Pequi com geração automática de documentos e verificação de compliance.",
    results:
      'Reduziu o tempo médio de fechamento de 45 para 22 dias, eliminando erros nos documentos e melhorando a experiência do cliente.',
    testimonial: {
      quote:
        'Nossos clientes ficam impressionados com a rapidez com que fechamos transações agora. A precisão e a agilidade nos diferenciaram da concorrência.',
      author: 'Thomas Anderson',
      position: 'Sócia-diretora',
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
