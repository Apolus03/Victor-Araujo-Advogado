import { FaWhatsapp } from 'react-icons/fa';
import { CONTACT_WHATSAPP_FLOAT_URL } from '../contact/constants';

export function WhatsAppFloat() {
  return (
    <a
      href={CONTACT_WHATSAPP_FLOAT_URL}
      className="whatsappFloat"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      title="Falar no WhatsApp"
    >
      <FaWhatsapp className="whatsappFloatIcon" aria-hidden />
    </a>
  );
}
