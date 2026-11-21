import { Suspense } from 'react';
import EmbedChat from './EmbedChat';

export const metadata = {
  title: 'Atendimento',
  robots: { index: false, follow: false },
};

// Chat embutido no site do escritório (aberto pelo widget.js dentro de um iframe)
export default function EmbedChatPage() {
  return (
    <Suspense fallback={null}>
      <EmbedChat />
    </Suspense>
  );
}
