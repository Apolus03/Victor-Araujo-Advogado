/** Número WhatsApp com DDI (somente dígitos). */
export const CONTACT_WHATSAPP_E164 = '5511954258694';

export const CONTACT_WHATSAPP_URL = `https://wa.me/${CONTACT_WHATSAPP_E164}`;

/** Mensagem padrão do botão flutuante. */
export const WHATSAPP_FLOAT_MESSAGE =
  'Olá! Vim pelo site e gostaria de mais informações.';

export const CONTACT_WHATSAPP_FLOAT_URL = `${CONTACT_WHATSAPP_URL}?text=${encodeURIComponent(WHATSAPP_FLOAT_MESSAGE)}`;

export const CONTACT_WHATSAPP_DISPLAY = '(11) 95425-8694';
