import { CONTACT_WHATSAPP_URL } from './constants';
import type { ContactPayload } from './contactForm';

/** URL wa.me do escritório (sem mensagem). */
export function getWhatsAppBaseUrl(): string {
  return CONTACT_WHATSAPP_URL;
}

/** Monta a saudação com nome, e-mail e telefone (campos opcionais omitidos). */
function buildContactIntro(nome: string, email: string, telefone: string): string {
  const intro = `Olá, meu nome é ${nome}`;

  if (email && telefone) {
    return `${intro}, meu e-mail é ${email} e meu telefone é ${telefone}.`;
  }
  if (email) {
    return `${intro}, meu e-mail é ${email}.`;
  }
  if (telefone) {
    return `${intro} e meu telefone é ${telefone}.`;
  }
  return `${intro}.`;
}

/** Texto completo enviado ao WhatsApp. */
export function buildWhatsAppContactMessage(payload: ContactPayload): string {
  const nome = payload.nome.trim();
  const email = payload.email.trim();
  const telefone = payload.telefone.trim();
  const especialidade = payload.especialidade.trim();
  const assunto = payload.assunto.trim();

  const blocks = [buildContactIntro(nome, email, telefone)];

  if (especialidade) {
    blocks.push(`Tenho interesse na área de ${especialidade}.`);
  }

  blocks.push(`Assunto: ${assunto}`);

  return blocks.join('\n\n');
}

/** URL wa.me com a mensagem do formulário. */
export function buildWhatsAppContactUrl(payload: ContactPayload): string {
  const text = buildWhatsAppContactMessage(payload);
  return `${CONTACT_WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
}

/** Abre o WhatsApp com a mensagem montada. */
export function sendContactViaWhatsApp(payload: ContactPayload): void {
  window.open(buildWhatsAppContactUrl(payload), '_blank', 'noopener,noreferrer');
}
