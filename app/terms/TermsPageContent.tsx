import LegalDocument, { type LegalDoc } from '@/app/components/legal/LegalDocument';
import termos from '@/app/legal-content/termos.json';

// Texto oficial: Pequi_Termos_de_Licenca_e_Uso_PUBLICACAO_PROVISORIA_2026-11-24_rev3.docx
export default function TermsPageContent() {
  return (
    <LegalDocument
      doc={termos as LegalDoc}
      title="Termos de Licença e Uso"
      eyebrow="Acordo jurídico"
      links={[
        { href: '/privacy-policy', title: 'Política de Privacidade', desc: 'Como o Pequi trata dados pessoais.', label: 'Ler a Política de Privacidade' },
        { href: '/cookies', title: 'Política de Cookies', desc: 'Como usamos cookies e como mudar a sua escolha.', label: 'Ler a Política de Cookies' },
      ]}
    />
  );
}
