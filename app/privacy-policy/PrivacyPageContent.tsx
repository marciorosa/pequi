import LegalDocument, { type LegalDoc } from '@/app/components/legal/LegalDocument';
import privacidade from '@/app/legal-content/privacidade.json';

// Texto oficial: Pequi_Politica_de_Privacidade_PUBLICACAO_PROVISORIA_2026-11-24_rev3.docx
export default function PrivacyPageContent() {
  return (
    <LegalDocument
      doc={privacidade as LegalDoc}
      title="Política de Privacidade"
      eyebrow="Proteção de dados"
      links={[
        { href: '/terms', title: 'Termos de Licença e Uso', desc: 'As regras de uso da plataforma Pequi white-label.', label: 'Ler os Termos' },
        { href: '/cookies', title: 'Política de Cookies', desc: 'Como usamos cookies e como mudar a sua escolha.', label: 'Ler a Política de Cookies' },
        { href: '/security', title: 'Práticas de segurança', desc: 'Como protegemos os dados na plataforma.', label: 'Saiba mais sobre segurança' },
        { href: 'mailto:contato@pequi.me', title: 'Seus direitos', desc: 'Peça acesso, correção ou eliminação dos seus dados.', label: 'Escrever para contato@pequi.me' },
      ]}
    />
  );
}
