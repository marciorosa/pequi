'use client';

/**
 * Chat do widget white-label, dentro do iframe aberto pelo widget.js no site do escritório.
 * O visitante conversa sem conta; depois das mensagens grátis deixa o contato;
 * esgotadas as mensagens após o contato, vê os planos do escritório.
 */
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { applyTenantTheme, PublicTenant } from '../../contexts/TenantContext';

const API_URL = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');

type Msg = { role: 'user' | 'assistant'; content: string };
type Gate = 'none' | 'lead' | 'plan';
type State = { gate: Gate; hasLead: boolean; remaining: number; messages: Msg[] };

/** Limpa o HTML da resposta da IA antes de mostrar (sem scripts, eventos ou links javascript:) */
function sanitize(html: string): string {
  if (typeof window === 'undefined') return '';
  const doc = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html');
  doc.querySelectorAll('script,style,iframe,object,embed,form,input,button,link,meta').forEach((n) => n.remove());
  doc.querySelectorAll('*').forEach((el) => {
    for (const attr of Array.from(el.attributes)) {
      const name = attr.name.toLowerCase();
      const value = attr.value.trim().toLowerCase();
      if (name.startsWith('on') || name === 'style' || ((name === 'href' || name === 'src') && !/^(https?:|mailto:|tel:|#)/.test(value))) {
        el.removeAttribute(attr.name);
      }
    }
    if (el.tagName === 'A') {
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
    }
  });
  return doc.body.firstElementChild?.innerHTML || '';
}

/** Origem da página que abriu o iframe (o site do escritório) */
function parentOrigin(hint: string | null): string {
  try {
    const ancestors = (window.location as any).ancestorOrigins as DOMStringList | undefined;
    if (ancestors && ancestors.length > 0) return ancestors[0];
    if (document.referrer) return new URL(document.referrer).origin;
  } catch {
    // segue para a dica
  }
  return hint || '';
}

export default function EmbedChat() {
  const params = useSearchParams();
  const key = params.get('key') || '';
  const [tenant, setTenant] = useState<PublicTenant | null>(null);
  const [token, setToken] = useState('');
  const [state, setState] = useState<State | null>(null);
  const [error, setError] = useState('');
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [plansUrl, setPlansUrl] = useState('');
  const [lead, setLead] = useState({ name: '', email: '', phone: '' });
  const [leadError, setLeadError] = useState('');
  const listRef = useRef<HTMLDivElement>(null);

  // Abre a sessão do chat
  useEffect(() => {
    if (!key || !API_URL) {
      setError('Widget mal configurado.');
      return;
    }
    const storageKey = `pq_widget_visitor_${key.slice(-12)}`;
    let visitorId = '';
    try {
      visitorId = localStorage.getItem(storageKey) || '';
    } catch {
      // armazenamento bloqueado: conversa sem histórico
    }
    fetch(`${API_URL}/widget/session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, visitorId, parentOrigin: parentOrigin(params.get('origin')) }),
    })
      .then(async (r) => {
        const data = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(data?.message || 'Não foi possível abrir o atendimento.');
        return data;
      })
      .then((data) => {
        try {
          localStorage.setItem(storageKey, data.visitorId);
        } catch {
          // ignora
        }
        setTenant(data.tenant);
        setToken(data.token);
        setState(data.state);
        setPlansUrl(`${data.tenant.panelUrl}/assinar`);
        applyTenantTheme(data.tenant);
        document.title = `Atendimento · ${data.tenant.name}`;
      })
      .catch((e) => setError(e.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [state?.messages.length, sending, state?.gate]);

  const close = () => window.parent?.postMessage({ type: 'pequi:close' }, '*');

  const send = async (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending || !state || state.gate !== 'none') return;
    setInput('');
    setSending(true);
    setState({ ...state, messages: [...state.messages, { role: 'user', content: text }] });
    try {
      const r = await fetch(`${API_URL}/widget/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ message: text }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data?.message || 'Não foi possível enviar a mensagem.');
      if (data.plansUrl) setPlansUrl(data.plansUrl);
      if (data.gate) {
        // Bloqueado antes de responder: devolve o texto para a caixa
        setInput(text);
        setState(data.state);
      } else {
        setState(data.state);
      }
    } catch (err: any) {
      setState((s) => (s ? { ...s, messages: s.messages.slice(0, -1) } : s));
      setInput(text);
      setError(err.message);
      setTimeout(() => setError(''), 5000);
    } finally {
      setSending(false);
    }
  };

  const sendLead = async (e: FormEvent) => {
    e.preventDefault();
    setLeadError('');
    try {
      const r = await fetch(`${API_URL}/widget/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(lead),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data?.message || 'Não foi possível salvar o contato.');
      setState(data.state);
    } catch (err: any) {
      setLeadError(err.message);
    }
  };

  if (!tenant || !state) {
    return (
      <div className="flex h-screen items-center justify-center bg-white p-6 text-center text-sm text-castanha-600">
        {error || 'Carregando o atendimento…'}
      </div>
    );
  }

  const input_ = 'w-full rounded-xl border border-castanha-200 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-pequi-400 focus:ring-2 focus:ring-pequi-100';

  return (
    <div className="flex h-screen flex-col bg-castanha-25 text-ink">
      <header className="flex items-center justify-between gap-3 bg-pequi-500 px-4 py-3" style={{ color: 'var(--pq-on-brand)' }}>
        <div className="flex min-w-0 items-center gap-3">
          {tenant.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={tenant.logoUrl} alt="" className="h-9 w-9 rounded-full bg-white object-contain p-1" />
          ) : (
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-sm font-semibold">
              {tenant.name.slice(0, 1).toUpperCase()}
            </span>
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{tenant.name}</p>
            <p className="text-xs opacity-80">Assistente virtual</p>
          </div>
        </div>
        <button type="button" onClick={close} aria-label="Fechar o atendimento" className="rounded-lg p-1.5 hover:bg-white/15">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </header>

      <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
        <Bubble role="assistant" html={sanitize(tenant.welcomeMessage || 'Olá! Como posso ajudar?')} />
        {state.messages.map((m, i) =>
          m.role === 'user' ? <Bubble key={i} role="user" text={m.content} /> : <Bubble key={i} role="assistant" html={sanitize(m.content)} />
        )}
        {sending && <Bubble role="assistant" text="Escrevendo…" />}

        {state.gate === 'lead' && (
          <form onSubmit={sendLead} className="space-y-2 rounded-2xl border border-castanha-200 bg-white p-4">
            <p className="text-sm font-medium">Para continuar a conversa, deixe seu contato. A equipe de {tenant.name} pode falar com você.</p>
            <input className={input_} placeholder="Seu nome" value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} required aria-label="Seu nome" />
            <input className={input_} type="email" placeholder="E-mail" value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })} aria-label="E-mail" />
            <input className={input_} type="tel" placeholder="Telefone com DDD" value={lead.phone} onChange={(e) => setLead({ ...lead, phone: e.target.value })} aria-label="Telefone com DDD" />
            {leadError && <p className="text-xs text-red-600">{leadError}</p>}
            <button type="submit" className="w-full rounded-xl bg-pequi-500 px-4 py-2 text-sm font-semibold" style={{ color: 'var(--pq-on-brand)' }}>
              Continuar
            </button>
          </form>
        )}

        {state.gate === 'plan' && (
          <div className="space-y-2 rounded-2xl border border-castanha-200 bg-white p-4 text-sm">
            <p className="font-medium">Você usou as mensagens gratuitas do atendimento.</p>
            <p className="text-castanha-600">Para continuar com a assistente sem limite, conheça os planos de {tenant.name}.</p>
            <a href={plansUrl} target="_blank" rel="noopener noreferrer" className="block w-full rounded-xl bg-pequi-500 px-4 py-2 text-center font-semibold" style={{ color: 'var(--pq-on-brand)' }}>
              Ver planos
            </a>
          </div>
        )}
      </div>

      {error && <p className="px-4 pb-1 text-xs text-red-600">{error}</p>}

      <form onSubmit={send} className="flex items-end gap-2 border-t border-castanha-200 bg-white px-3 py-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              send(e as any);
            }
          }}
          rows={1}
          maxLength={2000}
          disabled={state.gate !== 'none'}
          placeholder={state.gate === 'none' ? 'Escreva sua dúvida…' : 'Conversa pausada'}
          aria-label="Mensagem"
          className="max-h-32 flex-1 resize-none rounded-xl border border-castanha-200 px-3 py-2 text-sm outline-none focus:border-pequi-400 disabled:bg-castanha-50"
        />
        <button
          type="submit"
          disabled={!input.trim() || sending || state.gate !== 'none'}
          className="rounded-xl bg-pequi-500 px-4 py-2 text-sm font-semibold disabled:opacity-40"
          style={{ color: 'var(--pq-on-brand)' }}
        >
          Enviar
        </button>
      </form>
      <p className="bg-white px-4 pb-2 text-center text-[10px] text-castanha-500">
        Assistente com IA: as respostas são informativas e não substituem a orientação de um advogado. Tecnologia Pequi.
      </p>
    </div>
  );
}

function Bubble({ role, text, html }: { role: 'user' | 'assistant'; text?: string; html?: string }) {
  const mine = role === 'user';
  const cls = `max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${mine ? 'ml-auto bg-pequi-500' : 'bg-white border border-castanha-200 prose prose-sm [&_p]:my-1'}`;
  const style = mine ? { color: 'var(--pq-on-brand)' } : undefined;
  return html !== undefined ? (
    <div className={cls} style={style} dangerouslySetInnerHTML={{ __html: html }} />
  ) : (
    <div className={`${cls} whitespace-pre-wrap`} style={style}>
      {text}
    </div>
  );
}
