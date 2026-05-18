export const CONTACT_FIELD_LIMITS = {
  nome: { min: 3, max: 80 },
  email: { max: 254 },
  telefone: { max: 15 },
  assunto: { min: 10, max: 300 },
} as const;

export type ContactFormFieldKey = 'nome' | 'email' | 'telefone' | 'assunto';
export type ContactFieldErrors = Partial<Record<ContactFormFieldKey, string>>;

export type ContactPayload = {
  nome: string;
  email: string;
  telefone: string;
  especialidade: string;
  assunto: string;
};

const CONTACT_EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

function clampToMax(value: string, max: number): string {
  return value.length > max ? value.slice(0, max) : value;
}

function formatNomeInput(value: string): string {
  let s = value.replace(/[^\p{L}\s'.-]/gu, '');
  s = s.replace(/\s+/g, ' ');
  s = s.toLocaleLowerCase('pt-BR').replace(
    /(^|[\s'-])(\p{L})/gu,
    (_, sep: string, letter: string) => sep + letter.toLocaleUpperCase('pt-BR'),
  );
  return clampToMax(s, CONTACT_FIELD_LIMITS.nome.max);
}

function formatEmailInput(value: string): string {
  return clampToMax(
    value
      .toLowerCase()
      .replace(/\s/g, '')
      .replace(/[^a-z0-9.@!#$%&'*+/=?^_`{|}~-]/g, ''),
    CONTACT_FIELD_LIMITS.email.max,
  );
}

function formatPhoneBrInput(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (!digits) return '';
  if (digits.length <= 2) return `(${digits}`;
  const ddd = digits.slice(0, 2);
  const rest = digits.slice(2);
  if (digits.length <= 6) return `(${ddd}) ${rest}`;
  if (digits.length <= 10) {
    return `(${ddd}) ${rest.slice(0, 4)}-${rest.slice(4)}`;
  }
  return `(${ddd}) ${rest.slice(0, 5)}-${rest.slice(5)}`;
}

function formatAssuntoInput(value: string): string {
  let s = value.replace(/\r\n/g, '\n');
  s = s.replace(/\n{3,}/g, '\n\n');
  s = s
    .split('\n')
    .map((line) => line.replace(/ {2,}/g, ' '))
    .join('\n');
  s = s.replace(
    /(^|\n|[.!?]\s+)(\p{L})/gu,
    (_, sep: string, letter: string) => sep + letter.toLocaleUpperCase('pt-BR'),
  );
  return clampToMax(s, CONTACT_FIELD_LIMITS.assunto.max);
}

export function formatContactField(
  field: ContactFormFieldKey,
  value: string,
  { trimEdges = false }: { trimEdges?: boolean } = {},
): string {
  const raw = trimEdges ? value.trim() : value;
  switch (field) {
    case 'nome':
      return formatNomeInput(raw);
    case 'email':
      return formatEmailInput(raw);
    case 'telefone':
      return formatPhoneBrInput(raw);
    case 'assunto':
      return formatAssuntoInput(raw);
    default:
      return raw;
  }
}

function phoneDigits(value: string): string {
  return value.replace(/\D/g, '');
}

function looksLikeSpam(text: string): boolean {
  if (/https?:\/\/|www\./i.test(text)) return true;
  if (/(.)\1{7,}/.test(text)) return true;
  return false;
}

export function validateContactFormFields(
  form: ContactPayload,
): ContactFieldErrors {
  const errors: ContactFieldErrors = {};
  const nome = form.nome.trim().replace(/\s+/g, ' ');
  const email = form.email.trim();
  const telefone = form.telefone.trim();
  const assunto = form.assunto.trim();

  if (!nome) errors.nome = 'Preencha o nome.';
  else if (nome.length < CONTACT_FIELD_LIMITS.nome.min)
    errors.nome = `Use pelo menos ${CONTACT_FIELD_LIMITS.nome.min} caracteres.`;
  else if (nome.length > CONTACT_FIELD_LIMITS.nome.max)
    errors.nome = `Máximo ${CONTACT_FIELD_LIMITS.nome.max} caracteres.`;
  else if (!/^[\p{L}]/u.test(nome))
    errors.nome = 'O nome deve começar com uma letra.';
  else if (!/^[\p{L}\s'.-]+$/u.test(nome))
    errors.nome = 'Use apenas letras, espaços e hífen.';
  else if (nome.split(/\s+/).filter(Boolean).length < 2)
    errors.nome = 'Informe nome e sobrenome.';
  else if (/\d/.test(nome))
    errors.nome = 'O nome não pode conter números.';

  if (email) {
    if (email.length > CONTACT_FIELD_LIMITS.email.max)
      errors.email = 'E-mail muito longo.';
    else if (!CONTACT_EMAIL_RE.test(email))
      errors.email = 'Digite um e-mail válido.';
  }

  if (telefone) {
    const digits = phoneDigits(telefone);
    if (digits.length < 10 || digits.length > 11)
      errors.telefone =
        'Telefone inválido (DDD + número, 10 ou 11 dígitos).';
  }

  if (!assunto) errors.assunto = 'Descreva o assunto da mensagem.';
  else if (assunto.length < CONTACT_FIELD_LIMITS.assunto.min)
    errors.assunto = `Use pelo menos ${CONTACT_FIELD_LIMITS.assunto.min} caracteres.`;
  else if (assunto.length > CONTACT_FIELD_LIMITS.assunto.max)
    errors.assunto = `Máximo ${CONTACT_FIELD_LIMITS.assunto.max} caracteres.`;
  else if (looksLikeSpam(assunto))
    errors.assunto = 'Remova links ou texto repetitivo da mensagem.';

  return errors;
}

export function trimContactPayload(form: ContactPayload): ContactPayload {
  return {
    nome: formatContactField('nome', form.nome, { trimEdges: true }),
    email: formatContactField('email', form.email, { trimEdges: true }),
    telefone: formatContactField('telefone', form.telefone, { trimEdges: true }),
    especialidade: form.especialidade.trim(),
    assunto: formatContactField('assunto', form.assunto, { trimEdges: true }),
  };
}

export const EMPTY_CONTACT_FORM: ContactPayload = {
  nome: '',
  email: '',
  telefone: '',
  especialidade: '',
  assunto: '',
};
