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
  'Salário competitivo e participação acionária',
  'Planos de saúde, odontológico e oftalmológico',
  'Plano de previdência com contrapartida da empresa',
  'Férias flexíveis e políticas favoráveis ao trabalho remoto',
  'Verba para desenvolvimento profissional',
  'Auxílio bem-estar e apoio à saúde mental',
];

export const careersJobs: CareerJobFull[] = [
  {
    id: 1,
    title: 'Engenheiro(a) de IA Sênior',
    location: 'San Francisco, CA',
    type: 'Tempo integral',
    department: 'engineering',
    departmentLabel: 'Engenharia',
    description:
      'Lidere o desenvolvimento de sistemas de ML e PLN que impulsionam a compreensão, a recuperação e a redação de documentos jurídicos em escala.',
    requirements: [
      '5+ anos em machine learning e PLN',
      'Experiência com implantação de ML em produção',
      'PyTorch ou TensorFlow',
      'Experiência em tecnologia jurídica é um diferencial',
    ],
    experience: '5+ anos',
    salary: '$180,000 – $250,000',
    posted: '2024-01-15',
    responsibilities: [
      'Projetar e entregar modelos para análise de documentos jurídicos',
      'Otimizar pipelines de treinamento e inferência em confiabilidade e custo',
      'Trabalhar com especialistas jurídicos para melhorar precisão e segurança',
      'Orientar a arquitetura da infraestrutura de IA',
      'Mentorar engenheiros e elevar o padrão técnico',
    ],
    preferred: [
      'Pós-graduação em Ciência da Computação, ML ou área relacionada',
      'Experiência com LLMs e sistemas de recuperação',
      'Domínio de Python e nuvem (AWS/GCP)',
      'Contribuições open source ou pesquisas publicadas',
    ],
    benefits: defaultBenefits,
    team: 'Você fará parte de uma equipe focada de plataforma de IA que constrói os principais modelos e serviços por trás do Pequi.',
    culture: 'Valorizamos avaliação rigorosa, IA responsável e a entrega de produtos em que os profissionais do Direito confiam.',
  },
  {
    id: 2,
    title: 'Gerente de Produto – Soluções Jurídicas',
    location: 'Nova York, NY',
    type: 'Tempo integral',
    department: 'product',
    departmentLabel: 'Produto',
    description:
      'Seja responsável pelo roadmap e pelos resultados do ciclo de vida de contratos e dos fluxos assistidos por IA usados por escritórios e departamentos jurídicos.',
    requirements: [
      '3+ anos em gestão de produto',
      'Experiência em legal tech ou SaaS corporativo',
      'Sólidas habilidades de pesquisa com usuários e priorização',
      'Excelente comunicação escrita e verbal',
    ],
    experience: '3+ anos',
    salary: '$150,000 – $200,000',
    posted: '2024-01-16',
    responsibilities: [
      'Definir problemas, métricas e roadmap para fluxos jurídicos',
      'Trabalhar com design, engenharia e GTM nos lançamentos',
      'Conduzir discovery com clientes e traduzir necessidades em especificações',
      'Alinhar stakeholders sobre trade-offs e prazos',
    ],
    preferred: [
      'Experiência com CLM ou produtos com uso intenso de documentos',
      'Familiaridade com padrões de produtos de IA (guardrails, avaliações)',
      'MBA ou formação em Direito é um diferencial',
    ],
    benefits: defaultBenefits,
    team: 'Produto trabalha em estreita colaboração com engenharia e sucesso do cliente para entregar experiências coesas.',
    culture: 'Priorizamos clareza, evidências dos clientes e ciclos rápidos de aprendizado.',
  },
  {
    id: 3,
    title: 'Especialista em Conteúdo Jurídico',
    location: 'Remoto',
    type: 'Tempo integral',
    department: 'legal',
    departmentLabel: 'Jurídico',
    description:
      'Crie e faça a curadoria de conteúdo jurídico de alta qualidade para melhorar a qualidade dos modelos e as orientações aos usuários.',
    requirements: [
      'Formação em Direito ou qualificação jurídica equivalente',
      '3+ anos de prática jurídica ou produção de conteúdo jurídico',
      'Excelente escrita e capacidade analítica',
      'Interesse em tecnologia jurídica e IA',
    ],
    experience: '3+ anos',
    salary: '$120,000 – $160,000',
    posted: '2024-01-17',
    responsibilities: [
      'Redigir e revisar conjuntos de dados de treinamento e avaliação',
      'Produzir conteúdos de ajuda, playbooks e documentos de políticas',
      'Trabalhar com produto na precisão e nos avisos legais',
      'Manter-se atualizado(a) sobre as nuances de cada área de atuação',
    ],
    preferred: [
      'Experiência em departamento jurídico ou escritório de advocacia',
      'Familiaridade com contratos ou compliance',
    ],
    benefits: defaultBenefits,
    team: 'Os parceiros jurídicos atuam junto às equipes de produto e IA para manter os resultados fundamentados e responsáveis.',
    culture: 'Precisão, honestidade intelectual e respeito pela profissão vêm em primeiro lugar.',
  },
  {
    id: 4,
    title: 'Designer UX/UI',
    location: 'San Francisco, CA',
    type: 'Tempo integral',
    department: 'design',
    departmentLabel: 'Design',
    description:
      'Projete interfaces claras e confiáveis para fluxos jurídicos complexos e experiências com grande volume de dados.',
    requirements: [
      '4+ anos em UX/UI para produtos corporativos ou B2B',
      'Portfólio e processo de design consistentes',
      'Design systems e bibliotecas de componentes',
      'Domínio de Figma e prototipação',
    ],
    experience: '4+ anos',
    salary: '$130,000 – $175,000',
    posted: '2024-01-18',
    responsibilities: [
      'Conduzir fluxos da pesquisa até a interface de alta fidelidade',
      'Manter e expandir o design system',
      'Trabalhar com engenharia em implementações acessíveis',
      'Iterar com base no feedback dos clientes e em dados de uso',
    ],
    preferred: [
      'Experiência com softwares profissionais densos',
      'Habilidades em motion ou design ops',
    ],
    benefits: defaultBenefits,
    team: 'Design colabora diariamente com produto e engenharia em um ambiente aberto a críticas construtivas.',
    culture: 'Nos importamos com o capricho, a acessibilidade e a redução da carga cognitiva dos usuários jurídicos.',
  },
  {
    id: 5,
    title: 'VP de Vendas',
    location: 'Nova York, NY',
    type: 'Tempo integral',
    department: 'sales',
    departmentLabel: 'Vendas',
    description:
      'Construa e lidere a estratégia de go-to-market do Pequi para escritórios de advocacia e equipes jurídicas corporativas.',
    requirements: [
      '10+ anos em liderança de vendas B2B SaaS',
      'Histórico de crescimento de receita e de equipes',
      'Experiência em vendas para o setor jurídico ou de serviços profissionais',
      'Forte disciplina em coaching e previsão de vendas',
    ],
    experience: '10+ anos',
    salary: '$220,000 – $320,000 + variável',
    posted: '2024-01-19',
    responsibilities: [
      'Ser responsável por pipeline, previsão e estratégia de territórios',
      'Contratar e desenvolver executivos de contas e engenheiros de vendas',
      'Trabalhar com marketing em campanhas e mensagens',
      'Representar a voz do cliente internamente',
    ],
    preferred: [
      'Rede de contatos em grandes escritórios ou departamentos jurídicos de grandes empresas',
      'Experiência com estratégias PLG ou híbridas',
    ],
    benefits: defaultBenefits,
    team: 'Vendas trabalha em conjunto com marketing, produto e liderança na definição de pacotes e provas de valor.',
    culture: 'Vencemos com confiança, credibilidade no domínio e resultados de longo prazo para os clientes.',
  },
  {
    id: 6,
    title: 'Engenheiro(a) DevOps',
    location: 'Remoto',
    type: 'Tempo integral',
    department: 'engineering',
    departmentLabel: 'Engenharia',
    description:
      'Opere uma infraestrutura em nuvem segura e escalável e o CI/CD da nossa plataforma de IA jurídica em produção.',
    requirements: [
      '5+ anos em DevOps ou SRE',
      'AWS, Kubernetes e contêineres',
      'Infraestrutura como código (Terraform etc.)',
      'Mentalidade voltada para segurança e compliance',
    ],
    experience: '5+ anos',
    salary: '$150,000 – $200,000',
    posted: '2024-01-20',
    responsibilities: [
      'Projetar e operar Kubernetes e redes em produção',
      'Automatizar builds, testes e implantações',
      'Melhorar observabilidade, SLOs e resposta a incidentes',
      'Apoiar revisões e auditorias de segurança',
    ],
    preferred: [
      'Experiência em ambientes regulados ou de alta confiabilidade',
      'Padrões de GitOps ou entrega progressiva',
    ],
    benefits: defaultBenefits,
    team: 'Os engenheiros de infraestrutura permitem que toda a organização de produto entregue com segurança e rapidez.',
    culture: 'Priorizamos confiabilidade, privilégio mínimo e automação pragmática.',
  },
];

export function getCareerJobByIdParam(param: string): CareerJobFull | undefined {
  const n = Number(param);
  if (!Number.isFinite(n)) return undefined;
  return careersJobs.find((j) => j.id === n);
}
