'use client';

import { useState } from 'react';
import DashboardLayout from '../../../components/DashboardLayout';

// Email template interface
interface EmailTemplate {
  id: string;
  title: string;
  subject: string;
  body: string;
  category: string;
}

export default function EmailSupportPage() {
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [copied, setCopied] = useState(false);

  // Email categories
  const categories = [
    { id: 'all', name: 'Todos os temas' },
    { id: 'account', name: 'Conta' },
    { id: 'billing', name: 'Cobrança' },
    { id: 'technical', name: 'Técnico' },
    { id: 'feature', name: 'Sugestões' },
    { id: 'legal', name: 'Jurídico' }
  ];

  // Email templates
  const emailTemplates: EmailTemplate[] = [
    {
      id: '1',
      title: 'Problema de acesso à conta',
      subject: 'Não consigo acessar minha conta Pequi',
      body: `Olá, equipe de suporte do Pequi,

Estou com dificuldade para acessar minha conta. Ao tentar fazer login, recebo a seguinte mensagem de erro: [DESCREVA A MENSAGEM DE ERRO].

O e-mail da minha conta é: [SEU E-MAIL]
Meu último login bem-sucedido foi em: [DATA APROXIMADA]

Já tentei:
- Redefinir minha senha
- Limpar o cache e os cookies do navegador
- Usar outro navegador

Vocês poderiam me ajudar a recuperar o acesso à minha conta?

Obrigado(a),
[SEU NOME]`,
      category: 'account'
    },
    {
      id: '2',
      title: 'Dúvida sobre cobrança',
      subject: 'Dúvida sobre minha fatura recente do Pequi',
      body: `Olá, equipe de cobrança do Pequi,

Tenho uma dúvida sobre minha fatura recente nº [NÚMERO DA FATURA], emitida em [DATA DA FATURA].

[ESCOLHA UMA OU MAIS OPÇÕES:]
- Acredito que fui cobrado(a) incorretamente
- Não reconheço esta cobrança
- Preciso de um recibo detalhado para fins fiscais
- Preciso atualizar minha forma de pagamento
- Gostaria de solicitar um reembolso

Detalhes da minha solicitação:
[FORNEÇA DETALHES ESPECÍFICOS]

O e-mail da minha conta é: [SEU E-MAIL]

Agradeço desde já a ajuda para resolver esta questão.

Obrigado(a),
[SEU NOME]`,
      category: 'billing'
    },
    {
      id: '3',
      title: 'Erro na geração de documento',
      subject: 'Erro ao gerar documento jurídico',
      body: `Olá, suporte técnico do Pequi,

Encontrei um erro ao tentar gerar um(a) [TIPO DE DOCUMENTO] em [DATA/HORA].

Detalhes do erro:
- O que eu estava tentando fazer: [DESCRIÇÃO]
- O que aconteceu: [DESCRIÇÃO DO ERRO]
- Mensagem de erro (se houver): [MENSAGEM DE ERRO]
- URL da página: [URL DA PÁGINA]

Informações do navegador:
- Navegador: [NOME E VERSÃO DO NAVEGADOR]
- Sistema operacional: [NOME E VERSÃO DO SISTEMA]

Anexei capturas de tela para ilustrar o problema.

O e-mail da minha conta é: [SEU E-MAIL]

Obrigado(a) pela ajuda.

Atenciosamente,
[SEU NOME]`,
      category: 'technical'
    },
    {
      id: '4',
      title: 'Sugestão de recurso',
      subject: 'Sugestão de recurso para o Pequi',
      body: `Olá, equipe de produto do Pequi,

Gostaria de sugerir um novo recurso para a plataforma Pequi que, acredito, melhoraria a experiência dos usuários.

Descrição do recurso:
[DESCREVA SUA IDEIA EM DETALHES]

Caso de uso:
[EXPLIQUE COMO ESSE RECURSO SERIA USADO]

Benefícios:
[LISTE OS BENEFÍCIOS QUE ESSE RECURSO TRARIA]

Recursos semelhantes em outros produtos (se houver):
[MENCIONE SE VOCÊ JÁ VIU RECURSOS SEMELHANTES EM OUTROS LUGARES]

O e-mail da minha conta é: [SEU E-MAIL]

Fico à disposição para fornecer mais informações ou conversar sobre o assunto, se necessário.

Obrigado(a) por considerar minha sugestão.

Atenciosamente,
[SEU NOME]`,
      category: 'feature'
    },
    {
      id: '5',
      title: 'Dúvida sobre orientação jurídica',
      subject: 'Dúvida sobre a orientação jurídica do Pequi',
      body: `Olá, equipe jurídica do Pequi,

Tenho uma dúvida sobre as informações jurídicas fornecidas pela plataforma de vocês.

Documento/orientação em questão: [NOME DO DOCUMENTO OU DESCRIÇÃO DA ORIENTAÇÃO]
Data de geração: [DATA]

Minha dúvida específica é:
[DESCREVA A DÚVIDA EM DETALHES]

Entendo que o Pequi fornece informações jurídicas, e não aconselhamento jurídico, mas gostaria de um esclarecimento sobre o assunto acima.

O e-mail da minha conta é: [SEU E-MAIL]

Obrigado(a) pela ajuda.

Atenciosamente,
[SEU NOME]`,
      category: 'legal'
    },
    {
      id: '6',
      title: 'Cancelamento de assinatura',
      subject: 'Solicitação de cancelamento da minha assinatura do Pequi',
      body: `Olá, equipe de suporte do Pequi,

Gostaria de solicitar o cancelamento da minha assinatura do Pequi.

E-mail da conta: [SEU E-MAIL]
Plano de assinatura: [SEU PLANO]
Motivo do cancelamento: [OPCIONAL: MOTIVO]

Por favor, confirmem quando minha assinatura for cancelada. Estou ciente de que:
- Terei acesso ao serviço até o fim do período de cobrança atual
- Nenhuma nova cobrança será feita após o cancelamento
- Meus dados serão mantidos de acordo com a política de retenção de dados de vocês

Se houver alguma pesquisa de saída ou formulário de feedback, terei prazer em compartilhar minha experiência.

Obrigado(a) pela ajuda.

Atenciosamente,
[SEU NOME]`,
      category: 'account'
    }
  ];

  // Filter templates based on search and category
  const filteredTemplates = emailTemplates.filter(template => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.body.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Copy template to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayout title="Suporte por e-mail">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/30 mb-3">Comunicação</p>
          <h1 className="text-4xl font-light text-foreground mb-4 tracking-tight">Modelos de e-mail</h1>
          <p className="text-foreground/50 max-w-2xl text-lg font-light leading-relaxed">
            Agilize suas solicitações de suporte com nossos modelos de e-mail. Selecione uma categoria e personalize o texto pré-formatado.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Column: Template Selection */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              {/* Search */}
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Pesquisar modelos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-castanha-100 rounded-xl py-3 px-5 pl-12 text-sm focus:outline-none focus:ring-4 focus:ring-foreground/5 transition-all shadow-sm"
                />
                <svg className="w-4 h-4 text-foreground/20 absolute left-4 top-3.5 group-hover:text-foreground/40 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Categories */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 mb-4 px-1">Categorias</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all border ${selectedCategory === category.id
                          ? 'text-white border-transparent shadow-lg shadow-black/5 btn-primary-gradient'
                          : 'bg-white text-foreground/40 border-castanha-100 hover:border-castanha-200'
                        }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* List */}
              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 mb-4 px-1">Modelos</p>
                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {filteredTemplates.map(template => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template)}
                      className={`w-full text-left p-4 rounded-xl transition-all border ${selectedTemplate?.id === template.id
                          ? 'bg-white border-foreground shadow-lg shadow-black/5'
                          : 'bg-white border-castanha-100 hover:border-castanha-200 shadow-sm'
                        }`}
                    >
                      <h4 className={`text-xs font-bold uppercase tracking-wider mb-1 ${selectedTemplate?.id === template.id ? 'text-foreground' : 'text-foreground/70'}`}>
                        {template.title}
                      </h4>
                      <p className="text-[10px] text-foreground/30 font-medium truncate">{template.subject}</p>
                    </button>
                  ))}
                  {filteredTemplates.length === 0 && (
                    <p className="text-center py-10 text-xs text-foreground/30 italic">Nenhum modelo encontrado</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Template Preview */}
          <div className="flex-1 animate-in fade-in slide-in-from-right-4 duration-700">
            {selectedTemplate ? (
              <div className="bg-white border border-castanha-100 rounded-[32px] overflow-hidden shadow-sm flex flex-col h-full min-h-[600px]">
                <div className="p-8 border-b border-castanha-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-castanha-50/30">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 mb-1">Prévia do modelo</p>
                    <h2 className="text-2xl font-light text-foreground tracking-tight">{selectedTemplate.title}</h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => copyToClipboard(`Subject: ${selectedTemplate.subject}\n\n${selectedTemplate.body}`)}
                      className="group flex items-center px-6 py-3 bg-white border border-castanha-100 rounded-xl hover:border-castanha-200 transition-all shadow-sm"
                    >
                      <svg className="w-4 h-4 mr-3 text-foreground/40 group-hover:text-foreground transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      <span className="text-[11px] font-bold uppercase tracking-widest">{copied ? 'Copiado' : 'Copiar texto'}</span>
                    </button>
                    <a
                      href={`mailto:support@AIForLawyers.com?subject=${encodeURIComponent(selectedTemplate.subject)}&body=${encodeURIComponent(selectedTemplate.body)}`}
                      className="flex items-center px-10 py-3 text-white rounded-xl transition-all shadow-xl shadow-black/10 btn-primary-gradient"
                    >
                      <span className="text-[11px] font-bold uppercase tracking-widest">Abrir no app de e-mail</span>
                    </a>
                  </div>
                </div>

                <div className="p-10 flex-1 overflow-y-auto custom-scrollbar bg-white">
                  <div className="mb-10">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 mb-3">Assunto do e-mail</p>
                    <div className="p-5 bg-castanha-50 border border-castanha-100 rounded-2xl text-foreground font-medium text-sm">
                      {selectedTemplate.subject}
                    </div>
                  </div>

                  <div className="mb-10">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 mb-3">Corpo da mensagem</p>
                    <div className="p-8 bg-castanha-50 border border-castanha-100 rounded-2xl text-foreground/70 font-light text-sm leading-loose whitespace-pre-line border-dashed">
                      {selectedTemplate.body}
                    </div>
                  </div>

                  <div className="p-8 bg-castanha-50/50 border border-castanha-50 rounded-2xl flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white border border-castanha-100 flex items-center justify-center flex-shrink-0 text-foreground/20">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-2">Instruções</p>
                      <ol className="text-xs text-foreground/50 space-y-2 leading-relaxed font-light">
                        <li>Substitua todos os <span className="font-bold text-foreground/70">[COLCHETES]</span> pelos seus dados.</li>
                        <li>Revise o conteúdo antes de enviar para garantir que esteja correto.</li>
                        <li>Se houver anexos, mencione-os no corpo da mensagem.</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-castanha-100 rounded-[32px] h-full min-h-[600px] flex items-center justify-center p-20 text-center shadow-sm">
                <div>
                  <div className="w-24 h-24 bg-castanha-50 rounded-full flex items-center justify-center mx-auto mb-10 border border-castanha-100/50">
                    <svg className="w-10 h-10 text-foreground/10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-light text-foreground mb-4">Selecione um modelo</h2>
                  <p className="text-foreground/30 max-w-sm mx-auto mb-10 font-light text-base">
                    Escolha um tema na barra lateral para personalizar seu e-mail de suporte.
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/20">
                    Resposta prioritária para contas Enterprise
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f9fafb;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
      `}</style>
    </DashboardLayout>
  );
} 
