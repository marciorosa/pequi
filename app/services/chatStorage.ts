'use client';

/**
 * O histórico do Chat fica salvo no navegador. Para que uma conta não veja as conversas
 * de outra no mesmo computador, as chaves levam o identificador do usuário logado.
 * Chaves antigas sem usuário (de antes desta correção) são apagadas.
 */

const LEGACY_LIST_KEY = 'legalAiChats';
const LEGACY_MESSAGES_PREFIX = 'chat_messages_';

const currentUserId = (): string => {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return String(user.id || user._id || user.email || 'anonimo');
  } catch {
    return 'anonimo';
  }
};

export const chatListKey = (): string => `pequiChats:${currentUserId()}`;
export const chatMessagesKey = (chatId: string): string => `pequiChatMessages:${currentUserId()}:${chatId}`;

/** Apaga o histórico salvo antes desta correção, que não indicava a qual conta pertencia. */
export const removeLegacyChatHistory = (): void => {
  const toRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key === LEGACY_LIST_KEY || key.startsWith(LEGACY_MESSAGES_PREFIX))) toRemove.push(key);
  }
  toRemove.forEach((key) => localStorage.removeItem(key));
};
