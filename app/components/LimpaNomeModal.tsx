'use client';

import { useEffect, useState } from 'react';

/**
 * Formulário do serviço Limpa Nome (Pesquisa Inteligente).
 * Os campos são opcionais: o que ficar em branco vira [PREENCHER] na petição.
 */
export type LimpaNomeFormData = {
  autorNome: string;
  autorQualificacao: string;
  reuNome: string;
  reuQualificacao: string;
  orgao: string;
  valorDebito: string;
  contrato: string;
  dataInclusao: string;
  protocolo: string;
  cidadeUf: string;
  valorDanoMoral: string;
  fatosAdicionais: string;
};

const EMPTY: LimpaNomeFormData = {
  autorNome: '',
  autorQualificacao: '',
  reuNome: '',
  reuQualificacao: '',
  orgao: '',
  valorDebito: '',
  contrato: '',
  dataInclusao: '',
  protocolo: '',
  cidadeUf: '',
  valorDanoMoral: '',
  fatosAdicionais: '',
};

type Field = { key: keyof LimpaNomeFormData; label: string; placeholder: string; wide?: boolean; textarea?: boolean };

const SECTIONS: Array<{ title: string; fields: Field[] }> = [
  {
    title: 'Quem está com o nome negativado',
    fields: [
      { key: 'autorNome', label: 'Nome completo', placeholder: 'Ex.: Maria da Silva', wide: true },
      { key: 'autorQualificacao', label: 'Qualificação', placeholder: 'Estado civil, profissão, RG, CPF, endereço e e-mail', wide: true, textarea: true },
    ],
  },
  {
    title: 'Empresa ou banco que negativou',
    fields: [
      { key: 'reuNome', label: 'Nome da empresa ou banco', placeholder: 'Ex.: Banco Exemplo S.A.', wide: true },
      { key: 'reuQualificacao', label: 'CNPJ e endereço da sede', placeholder: 'CNPJ e endereço', wide: true },
    ],
  },
  {
    title: 'A negativação',
    fields: [
      { key: 'orgao', label: 'Onde está negativado', placeholder: 'Serasa, SPC ou Boa Vista' },
      { key: 'valorDebito', label: 'Valor cobrado (R$)', placeholder: 'Ex.: 1.250,00' },
      { key: 'contrato', label: 'Número do contrato', placeholder: 'Como aparece na consulta' },
      { key: 'dataInclusao', label: 'Data da inclusão', placeholder: 'Ex.: 15/09/2026' },
      { key: 'protocolo', label: 'Protocolo de reclamação (se houver)', placeholder: 'Deixe em branco se não houver' },
      { key: 'cidadeUf', label: 'Cidade/UF da ação', placeholder: 'Ex.: Campinas/SP' },
      { key: 'valorDanoMoral', label: 'Dano moral pedido (R$)', placeholder: 'Ex.: 10.000,00' },
    ],
  },
  {
    title: 'Algo mais sobre o caso? (opcional)',
    fields: [
      { key: 'fatosAdicionais', label: 'Fatos adicionais', placeholder: 'Ex.: o pedido de financiamento foi negado em 20/10/2026', wide: true, textarea: true },
    ],
  },
];

const inputClass =
  'w-full rounded-xl border border-castanha-200 bg-castanha-50 px-4 py-3 text-[0.95rem] text-ink placeholder-ink/30 focus:outline-none focus:ring-4 focus:ring-pequi-500/10';

export default function LimpaNomeModal({
  isOpen,
  isGenerating,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  isGenerating: boolean;
  onClose: () => void;
  onSubmit: (data: LimpaNomeFormData) => void;
}) {
  const [form, setForm] = useState<LimpaNomeFormData>(EMPTY);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isGenerating) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, isGenerating, onClose]);

  if (!isOpen) return null;

  const set = (key: keyof LimpaNomeFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-3 md:p-6" role="dialog" aria-modal="true" aria-labelledby="limpa-nome-title">
      <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-[2rem] bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-castanha-150 px-6 py-5 md:px-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink/40">Serviço</p>
            <h2 id="limpa-nome-title" className="mt-1 text-2xl font-medium tracking-tight text-ink">Limpa Nome</h2>
            <p className="mt-1 text-sm text-ink/60">
              Gera a minuta de uma petição inicial para tirar o nome de cadastros como Serasa e SPC quando a dívida não é sua, com
              pedido de liminar e de indenização por danos morais.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isGenerating}
            aria-label="Fechar"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-ink/50 hover:bg-castanha-100 hover:text-ink disabled:opacity-40"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form
          className="flex min-h-0 flex-1 flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            if (!isGenerating) onSubmit(form);
          }}
        >
          <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-6 py-5 md:px-8">
            <p className="rounded-xl bg-castanha-50 px-4 py-3 text-sm text-ink/70">
              Todos os campos são opcionais. O que ficar em branco aparece na petição como <strong>[PREENCHER]</strong>, para você completar depois.
            </p>
            {SECTIONS.map((section) => (
              <fieldset key={section.title} className="space-y-3">
                <legend className="mb-2 text-sm font-semibold text-ink">{section.title}</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {section.fields.map((field) => (
                    <label key={field.key} className={`block space-y-1 ${field.wide ? 'sm:col-span-2' : ''}`}>
                      <span className="text-xs font-medium text-ink/60">{field.label}</span>
                      {field.textarea ? (
                        <textarea rows={2} value={form[field.key]} onChange={set(field.key)} placeholder={field.placeholder} className={inputClass} maxLength={600} />
                      ) : (
                        <input type="text" value={form[field.key]} onChange={set(field.key)} placeholder={field.placeholder} className={inputClass} maxLength={600} />
                      )}
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>

          <div className="flex flex-col gap-3 border-t border-castanha-150 px-6 py-4 sm:flex-row sm:items-center sm:justify-between md:px-8">
            <p className="text-xs text-ink/50">A minuta deve ser revisada e assinada por advogado inscrito na OAB.</p>
            <button
              type="submit"
              disabled={isGenerating}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl px-6 text-[11px] font-bold uppercase tracking-[0.2em] btn-primary-gradient disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isGenerating ? 'Gerando a petição…' : 'Gerar petição'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
