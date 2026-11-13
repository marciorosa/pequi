'use client';

import { useState } from 'react';

/**
 * Formulário do serviço Limpa Nome (recurso Pro da página Documentos).
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
  /** Súmula 385 do STJ: havia outra negativação legítima antes desta? */
  negativacaoAnterior: '' | 'nao' | 'sim' | 'contestada' | 'nao_sei';
  /** Juizado Especial Cível ou Vara Cível */
  via: '' | 'jec' | 'vara' | 'nao_sei';
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
  negativacaoAnterior: '',
  via: '',
};

type TextKey = Exclude<keyof LimpaNomeFormData, 'negativacaoAnterior' | 'via'>;
type Field = { key: TextKey; label: string; placeholder: string; wide?: boolean; textarea?: boolean };

type Choice<T extends string> = { value: T; label: string };

const ANTERIOR_CHOICES: Choice<LimpaNomeFormData['negativacaoAnterior']>[] = [
  { value: 'nao', label: 'Não, é a única' },
  { value: 'sim', label: 'Sim, outra dívida que é minha' },
  { value: 'contestada', label: 'Sim, mas também é indevida' },
  { value: 'nao_sei', label: 'Não sei' },
];

const VIA_CHOICES: Choice<LimpaNomeFormData['via']>[] = [
  { value: 'jec', label: 'Juizado Especial Cível' },
  { value: 'vara', label: 'Vara Cível' },
  { value: 'nao_sei', label: 'Ainda não sei' },
];

// Dano moral: acima de R$ 15 mil mostra alerta; acima de R$ 50 mil não aceita
const DANO_ALERTA = 15000;
const DANO_MAXIMO = 50000;

/** Converte "10.000,00", "10000" ou "R$ 10 mil" em número; null se não der para ler. */
export const parseValor = (value: string): number | null => {
  let s = value.replace(/R\$\s*/i, '').replace(/\s/g, '').toLowerCase();
  const mil = /mil$/.test(s);
  s = s.replace(/mil$/, '');
  if (!s || !/^\d[\d.,]*$/.test(s)) return null;
  if (s.includes(',')) s = s.replace(/\./g, '').replace(',', '.');
  else if (/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, '');
  const n = Number(s);
  if (!Number.isFinite(n)) return null;
  return mil ? n * 1000 : n;
};

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
      { key: 'valorDanoMoral', label: 'Dano moral pedido (R$)', placeholder: 'Ex.: 8.000,00' },
    ],
  },
  {
    title: 'Algo mais sobre o caso? (opcional)',
    fields: [
      { key: 'fatosAdicionais', label: 'Fatos adicionais', placeholder: 'Ex.: o pedido de financiamento foi negado em 20/10/2026', wide: true, textarea: true },
    ],
  },
];

export const LIMPA_NOME_DESCRIPTION =
  'Gera a minuta de uma petição inicial para tirar o nome de cadastros como Serasa e SPC quando a dívida não é sua, com pedido de liminar e de indenização por danos morais.';

const inputClass =
  'w-full rounded-xl border border-castanha-200 bg-castanha-50 px-4 py-3 text-[0.95rem] text-ink placeholder-ink/30 focus:outline-none focus:ring-4 focus:ring-pequi-500/10';

/** Formulário do Limpa Nome (recurso Pro da página Documentos). */
export function LimpaNomeForm({
  isGenerating,
  onSubmit,
  scrollable = false,
}: {
  isGenerating: boolean;
  onSubmit: (data: LimpaNomeFormData) => void;
  /** Na janela, os campos rolam e o botão fica fixo embaixo */
  scrollable?: boolean;
}) {
  const [form, setForm] = useState<LimpaNomeFormData>(EMPTY);

  const set = (key: TextKey) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const dano = parseValor(form.valorDanoMoral);
  const danoAlto = dano !== null && dano > DANO_ALERTA && dano <= DANO_MAXIMO;
  const danoExcessivo = dano !== null && dano > DANO_MAXIMO;
  const semDanoMoral = form.negativacaoAnterior === 'sim';

  const choiceGroup = <K extends 'negativacaoAnterior' | 'via'>(key: K, choices: Choice<LimpaNomeFormData[K]>[]) => (
    <div className="flex flex-wrap gap-2" role="radiogroup">
      {choices.map((c) => {
        const active = form[key] === c.value;
        return (
          <button
            key={c.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setForm((f) => ({ ...f, [key]: active ? '' : c.value }))}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              active ? 'border-pequi-500 bg-pequi-500 text-white' : 'border-castanha-200 bg-castanha-50 text-ink/80 hover:border-castanha-300'
            }`}
          >
            {c.label}
          </button>
        );
      })}
    </div>
  );

  return (
    <form
      className={scrollable ? 'flex min-h-0 flex-1 flex-col' : 'space-y-6'}
      onSubmit={(e) => {
        e.preventDefault();
        if (!isGenerating && !danoExcessivo) onSubmit(form);
      }}
    >
      <div className={scrollable ? 'min-h-0 flex-1 space-y-6 overflow-y-auto px-6 py-5 md:px-8' : 'space-y-6'}>
        <p className="rounded-xl bg-castanha-50 px-4 py-3 text-sm text-ink/70">
          Todos os campos são opcionais. O que ficar em branco aparece na petição como <strong>[PREENCHER]</strong>, para você completar depois.
        </p>
        <fieldset className="space-y-4">
          <legend className="mb-2 text-sm font-semibold text-ink">Duas perguntas antes de gerar</legend>
          <div className="space-y-2">
            <p className="text-sm text-ink/80">Você já tinha outra negativação no seu nome antes desta?</p>
            {choiceGroup('negativacaoAnterior', ANTERIOR_CHOICES)}
            <p className="text-xs text-ink/50">
              Importa para o dano moral: se já havia outra negativação legítima, a Súmula 385 do STJ não admite indenização por esta.
              Confira a consulta completa no Serasa, no SPC e na Boa Vista.
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-ink/80">Onde pretende entrar com a ação?</p>
            {choiceGroup('via', VIA_CHOICES)}
            <p className="text-xs text-ink/50">
              No Juizado Especial Cível não há custas no primeiro grau e, em causas de até 20 salários mínimos, você pode entrar sem advogado.
              Acima disso, e até 40 salários mínimos, o Juizado exige advogado. Na Vara Cível, o advogado é sempre necessário.
            </p>
          </div>
        </fieldset>

        {SECTIONS.map((section) => (
          <fieldset key={section.title} className="space-y-3">
            <legend className="mb-2 text-sm font-semibold text-ink">{section.title}</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {section.fields.map((field) => (
                <label key={field.key} className={`block space-y-1 ${field.wide ? 'sm:col-span-2' : ''}`}>
                  <span className="text-xs font-medium text-ink/60">{field.label}</span>
                  {field.key === 'valorDanoMoral' && semDanoMoral ? (
                    <p className="rounded-xl border border-castanha-200 bg-castanha-50 px-4 py-3 text-sm text-ink/60">
                      Sem pedido de dano moral, porque já havia outra negativação legítima (Súmula 385 do STJ).
                    </p>
                  ) : field.textarea ? (
                    <textarea rows={2} value={form[field.key]} onChange={set(field.key)} placeholder={field.placeholder} className={inputClass} maxLength={600} />
                  ) : (
                    <input type="text" value={form[field.key]} onChange={set(field.key)} placeholder={field.placeholder} className={inputClass} maxLength={600} />
                  )}
                  {field.key === 'valorDanoMoral' && !semDanoMoral && (
                    <span className={`block text-xs ${danoExcessivo ? 'text-red-600' : danoAlto ? 'text-amber-700' : 'text-ink/50'}`}>
                      {danoExcessivo
                        ? 'Valor muito acima do que os tribunais costumam conceder nesses casos. Use até R$ 50.000,00.'
                        : danoAlto
                          ? 'Valor alto para negativação indevida. Pedidos desproporcionais não aumentam a chance de ganhar e podem pesar contra.'
                          : 'Os tribunais costumam fixar valores moderados, de alguns milhares de reais. Em dúvida, deixe em branco.'}
                    </span>
                  )}
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      <div
        className={
          scrollable
            ? 'flex flex-col gap-3 border-t border-castanha-150 px-6 py-4 sm:flex-row sm:items-center sm:justify-between md:px-8'
            : 'flex flex-col gap-3 border-t border-castanha-150 pt-6 sm:flex-row sm:items-center sm:justify-between'
        }
      >
        <p className="text-xs text-ink/50">A minuta deve ser revisada por advogado inscrito na OAB antes do protocolo.</p>
        <button
          type="submit"
          disabled={isGenerating || danoExcessivo}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl px-6 text-[11px] font-bold uppercase tracking-[0.2em] btn-primary-gradient disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isGenerating ? 'Gerando a petição…' : 'Gerar petição'}
        </button>
      </div>
    </form>
  );
}
