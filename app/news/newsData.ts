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
    title: 'Pequi lança ferramenta revolucionária de análise de contratos',
    excerpt:
      'Nossa nova ferramenta de análise de contratos com IA revisa documentos jurídicos complexos em minutos, em vez de horas.',
    date: '15 de novembro de 2023',
    publishedDate: '2023-11-15T10:00:00.000Z',
    categoryKey: 'product',
    author: 'Sarah Johnson',
    authorRole: 'Diretora de produto (CPO)',
    authorImage: avatars[0],
    image: pool[0],
    readTime: '5 min de leitura',
    tags: ['Produto', 'IA', 'Contratos', 'Legal tech'],
    content: [
      'A Pequi anunciou hoje um recurso de análise de contratos criado para ajudar as equipes a revisar acordos extensos com mais rapidez, destacando cláusulas de risco, termos ausentes e resumos em linguagem simples, sem substituir o julgamento do advogado.',
      'O sistema foi treinado com textos e fluxos jurídicos comuns a acordos de confidencialidade, contratos de prestação de serviços, contratos de trabalho e anexos de M&A. Os clientes podem enviar os resultados para o Word, exportar em PDF ou integrá-los a ferramentas de gestão de documentos.',
      '"O volume de revisões não está diminuindo", afirmou Michael Chen, CEO da Pequi. "Criamos esta ferramenta para que os advogados passem menos tempo em revisões mecânicas e mais tempo em estratégia de negociação e aconselhamento aos clientes."',
      'O recurso está disponível para assinantes dos planos Professional e Enterprise, com integrações adicionais previstas para os próximos trimestres.',
    ],
  },
  {
    id: 2,
    slug: 'AiForLawyers-raises-50m-in-series-b-funding',
    title: 'Pequi capta US$ 50 milhões em rodada Série B',
    excerpt: 'O investimento vai acelerar o desenvolvimento de produtos e a expansão global para atender à demanda crescente.',
    date: '3 de outubro de 2023',
    publishedDate: '2023-10-03T09:00:00.000Z',
    categoryKey: 'company',
    author: 'Michael Chen',
    authorRole: 'CEO',
    authorImage: avatars[1],
    image: pool[1],
    readTime: '4 min de leitura',
    tags: ['Investimento', 'Empresa', 'Crescimento'],
    content: [
      'A Pequi concluiu uma rodada Série B de US$ 50 milhões para ampliar a engenharia de produto, o sucesso do cliente e a estratégia comercial internacional, enquanto a demanda por IA jurídica continua crescendo entre escritórios e departamentos jurídicos corporativos.',
      'A empresa vai intensificar os investimentos em infraestrutura segura, avaliação de modelos e automação de fluxos de trabalho ligados ao cofre de documentos e à pesquisa de conhecimento, áreas que os clientes apontam como de maior impacto nos programas-piloto.',
      '"O capital acompanha a clareza", disse Michael Chen. "Nossos clientes querem resultados que possam defender perante diretores jurídicos e reguladores. Esta rodada nos permite entregar mais rápido sem abrir mão da segurança ou da auditabilidade."',
      'A Pequi vai ampliar as contratações nas áreas de engenharia, engenharia jurídica e equipes de campo na América do Norte e na Europa.',
    ],
  },
  {
    id: 3,
    slug: 'future-of-legal-research-ai-vs-traditional-methods',
    title: 'O futuro da pesquisa jurídica: IA vs. métodos tradicionais',
    excerpt:
      'Novo estudo mostra que a pesquisa jurídica com IA é mais rápida e encontra precedentes mais relevantes em testes cegos.',
    date: '21 de setembro de 2023',
    publishedDate: '2023-09-21T14:00:00.000Z',
    categoryKey: 'industry',
    author: 'Elena Rodriguez',
    authorRole: 'Diretora de pesquisa',
    authorImage: avatars[2],
    image: pool[2],
    readTime: '6 min de leitura',
    tags: ['Pesquisa', 'Setor', 'IA'],
    content: [
      'Um estudo comparativo de tarefas de pesquisa típicas de associados constatou que as equipes que usaram busca assistida por IA concluíram o trabalho de forma significativamente mais rápida e encontraram um conjunto mais amplo de referências pertinentes, em comparação com a busca manual tradicional.',
      'Os pesquisadores destacaram que a IA é mais eficaz quando combinada com a verificação humana, especialmente quanto ao formato das citações, às nuances de cada jurisdição e à correspondência com os fatos do caso.',
      'A Pequi contribuiu com benchmarks anonimizados de programas-piloto com clientes; a metodologia completa e suas limitações estão documentadas no apêndice técnico que acompanha o estudo.',
      'O relatório recomenda que os escritórios adotem políticas claras sobre quando resumos gerados por máquina precisam da aprovação de um sócio ou especialista.',
    ],
  },
  {
    id: 4,
    slug: 'AiForLawyers-partners-with-global-law-firm-baker-mckenzie',
    title: 'Pequi firma parceria com o escritório global Baker McKenzie',
    excerpt: 'Parceria estratégica leva ferramentas de IA jurídica a um dos maiores escritórios de advocacia do mundo.',
    date: '17 de agosto de 2023',
    publishedDate: '2023-08-17T11:30:00.000Z',
    categoryKey: 'partnership',
    author: 'David Wilson',
    authorRole: 'VP de parcerias',
    authorImage: avatars[3],
    image: pool[3],
    readTime: '4 min de leitura',
    tags: ['Parceria', 'Escritórios globais'],
    content: [
      'A Pequi e o Baker McKenzie anunciaram uma colaboração estratégica para implantar fluxos de trabalho com IA em áreas selecionadas, com foco em agilizar pesquisas, playbooks contratuais e análise segura de documentos.',
      'Equipes conjuntas vão desenvolver modelos e salvaguardas de governança para que as equipes de cada caso adotem as ferramentas de forma consistente em todas as regiões.',
      '"Escala só importa se a qualidade se mantiver", observaram os responsáveis pela parceria. "Estamos começando com casos de uso bem delimitados e KPIs mensuráveis."',
      'Novas fases de implantação são esperadas ao longo dos próximos dezoito meses, sujeitas a aprovações internas e às etapas de treinamento.',
    ],
  },
  {
    id: 5,
    slug: 'new-compliance-module-helps-firms-navigate-regulatory-changes',
    title: 'Novo módulo de compliance ajuda escritórios a lidar com mudanças regulatórias',
    excerpt: 'Antecipe-se a cenários regulatórios complexos com monitoramento de compliance baseado em IA.',
    date: '29 de julho de 2023',
    publishedDate: '2023-07-29T08:00:00.000Z',
    categoryKey: 'product',
    author: 'Jennifer Park',
    authorRole: 'Diretora de compliance',
    authorImage: avatars[4],
    image: pool[4],
    readTime: '5 min de leitura',
    tags: ['Produto', 'Compliance', 'Regulatório'],
    content: [
      'O novo módulo de compliance reúne fontes regulatórias, políticas internas e o contexto de cada caso para destacar mudanças que possam afetar os trabalhos em andamento.',
      'Os alertas podem ser direcionados aos responsáveis por jurisdição, setor ou perfil de cliente, com trilha de auditoria para revisão posterior.',
      'Os primeiros usuários relataram uma triagem mais rápida de atualizações normativas que afetam serviços financeiros e obrigações de privacidade de dados.',
      'A Pequi planeja novos conectores com provedores de inteligência regulatória ainda este ano.',
    ],
  },
  {
    id: 6,
    slug: 'AiForLawyers-named-in-forbes-next-billion-dollar-startups-list',
    title: 'Pequi entra na lista Next Billion-Dollar Startups da Forbes',
    excerpt: 'A Forbes reconhece o potencial da Pequi para transformar o trabalho jurídico com IA aplicada.',
    date: '12 de junho de 2023',
    publishedDate: '2023-06-12T12:00:00.000Z',
    categoryKey: 'press',
    author: 'Equipe de imprensa',
    authorRole: 'Pequi',
    authorImage: avatars[0],
    image: pool[5],
    readTime: '3 min de leitura',
    tags: ['Imprensa', 'Reconhecimento'],
    content: [
      'A Forbes incluiu a Pequi entre as empresas com potencial significativo no mercado de software jurídico corporativo, citando a adesão de grandes escritórios e departamentos jurídicos.',
      'A lista é editorial e não constitui endosso de desempenho financeiro; os leitores devem consultar análises independentes antes de tomar decisões de investimento.',
      'A Pequi agradeceu aos clientes e parceiros pelo feedback que moldou o roadmap do produto ao longo do último ano.',
    ],
  },
  {
    id: 7,
    slug: 'AiForLawyers-unveils-new-multilingual-contract-capabilities',
    title: 'Pequi apresenta novos recursos multilíngues para contratos',
    excerpt: 'Análise de contratos em vários idiomas para que equipes jurídicas globais trabalhem em paralelo.',
    date: '18 de maio de 2023',
    publishedDate: '2023-05-18T15:00:00.000Z',
    categoryKey: 'product',
    author: 'Thomas Lee',
    authorRole: 'CTO',
    authorImage: avatars[1],
    image: pool[0],
    readTime: '5 min de leitura',
    tags: ['Produto', 'Global', 'Contratos'],
    content: [
      'A análise multilíngue de contratos já está disponível para idiomas selecionados, com avaliação equivalente da detecção de cláusulas e da qualidade dos resumos em cada idioma.',
      'Os clientes podem padronizar checklists de revisão entre escritórios, preservando as preferências terminológicas locais.',
      'A Pequi continua ampliando a cobertura de idiomas com base na demanda dos clientes e nos resultados das avaliações.',
    ],
  },
  {
    id: 8,
    slug: 'legal-industry-survey-shows-increasing-ai-adoption',
    title: 'Pesquisa do setor jurídico mostra adoção crescente de IA',
    excerpt:
      'A maioria dos escritórios já usa ou planeja implementar ferramentas de IA no próximo ano, segundo um novo relatório do setor.',
    date: '5 de abril de 2023',
    publishedDate: '2023-04-05T10:00:00.000Z',
    categoryKey: 'industry',
    author: 'Equipe de pesquisa',
    authorRole: 'Pequi',
    authorImage: avatars[2],
    image: pool[1],
    readTime: '5 min de leitura',
    tags: ['Pesquisa', 'Setor', 'Adoção'],
    content: [
      'Entre os participantes da pesquisa estavam grandes escritórios da lista Am Law 200, escritórios regionais e departamentos jurídicos corporativos da América do Norte e da Europa.',
      'Os casos de uso mais bem avaliados foram revisão de documentos, pesquisa e gestão do conhecimento; as preocupações se concentraram na verificação da precisão e na postura de segurança dos fornecedores.',
      'A Pequi publicou os resultados agregados sem atribuir respostas a organizações específicas.',
    ],
  },
  {
    id: 9,
    slug: 'AiForLawyers-opens-new-london-office',
    title: 'Pequi abre novo escritório em Londres para apoiar a expansão na Europa',
    excerpt: 'Polo no Reino Unido para as operações europeias, diante da demanda crescente na região.',
    date: '22 de março de 2023',
    publishedDate: '2023-03-22T09:00:00.000Z',
    categoryKey: 'company',
    author: 'Emma Thompson',
    authorRole: 'VP de operações na Europa',
    authorImage: avatars[3],
    image: pool[2],
    readTime: '3 min de leitura',
    tags: ['Empresa', 'Europa', 'Expansão'],
    content: [
      'O escritório de Londres concentra o sucesso do cliente, a engenharia de soluções e o relacionamento com parceiros para as contas europeias.',
      'A Pequi citou a demanda crescente por opções de residência de dados na UE e por suporte local como motivadores do investimento.',
      'As vagas estão abertas e listadas na página de carreiras da empresa.',
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
