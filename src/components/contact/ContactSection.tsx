import { useState, type FormEvent } from 'react';
import { FaLinkedinIn, FaInstagram, FaWhatsapp, FaSearch  } from 'react-icons/fa';
import { useScrollReveal } from '../../hooks/useScrollReveal';

import {
  CONTACT_FIELD_LIMITS,
  EMPTY_CONTACT_FORM,
  formatContactField,
  trimContactPayload,
  validateContactFormFields,
  type ContactFieldErrors,
  type ContactFormFieldKey,
} from '../../contact/contactForm';
  

import { sendContactViaWhatsApp } from '../../contact/contactWhatsApp';

import {
  CONTACT_WHATSAPP_DISPLAY,
  CONTACT_WHATSAPP_URL,
} from '../../contact/constants';


const SPECIALTY_OPTIONS = [
  'Direito Civil',
  'Família',
  'Trabalhista',
  'Penitenciário',
];

function ContactSection() {
  const [form, setForm] = useState(EMPTY_CONTACT_FORM);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const { ref: leftRef, show: leftShow } = useScrollReveal<HTMLDivElement>();
  const { ref: rightRef, show: rightShow } = useScrollReveal<HTMLDivElement>();

  const clearFieldError = (field: ContactFormFieldKey) => {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const { [field]: _removed, ...rest } = prev;
      return rest;
    });
  };

  const handleFieldChange = (field: ContactFormFieldKey, value: string) => {
    setForm((s) => ({
      ...s,
      [field]: formatContactField(field, value),
    }));
    clearFieldError(field);
  };

  const handleFieldBlur = (field: ContactFormFieldKey) => {
    setForm((s) => {
      const formatted = formatContactField(field, s[field], { trimEdges: true });
      return formatted === s[field] ? s : { ...s, [field]: formatted };
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = trimContactPayload(form);
    setForm(payload);

    const errors = validateContactFormFields(payload);

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    sendContactViaWhatsApp(payload);
    setForm(EMPTY_CONTACT_FORM);
  };

  return (
    <section id="contato" className="section sectionDark contactSection">
      <div className="container contactGrid">
        <div
          ref={leftRef}
          className={`contactLeft reveal ${leftShow ? 'show' : ''}`}
        >
          <h2 className="contactTitle">Entre em contato.</h2>

          <div className="kicker" style={{ color: '#fff' }}>
            Entre em contato agora e entenda como posso te ajudar no seu caso.
          </div>

          <div className="contactDirect">
            <a href={CONTACT_WHATSAPP_URL} className="contactRow">
              <div className="contactIcon">
                <FaWhatsapp />
              </div>

              <div>
                <div className="contactLabel">TELEFONE / WHATSAPP</div>
                <div className="contactValue">
                  {CONTACT_WHATSAPP_DISPLAY}
                </div>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/victor-ara%C3%BAjo-586b98165/"
              target="_blank"
              rel="noreferrer"
              className="contactRow"
            >
              <div className="contactIcon">
                <FaLinkedinIn />
              </div>

              <div>
                <div className="contactLabel">LINKEDIN</div>
                <div className="contactValue">Victor Araújo</div>
              </div>
            </a>

            <a
              href="https://www.instagram.com/ojuara1994/"
              target="_blank"
              rel="noreferrer"
              className="contactRow"
            >
              <div className="contactIcon">
                <FaInstagram />
              </div>

              <div>
                <div className="contactLabel">INSTAGRAM</div>
                <div className="contactValue">_araujoadvogados</div>
              </div>
            </a>

                        <a
              href="https://www.escavador.com/nomes/victor-araujo-da-silva-951154e42b"
              target="_blank"
              rel="noreferrer"
              className="contactRow"
            >
              <div className="contactIcon">
                <FaSearch/>
              </div>

              <div>
                <div className="contactLabel">Escavador</div>
                <div className="contactValue">OAB/SP 139.533</div>
              </div>
            </a>

          </div>
        </div>

        <div
          ref={rightRef}
          className={`contactRight reveal ${rightShow ? 'show' : ''}`}
        >
          <form
            id="formulario-contato"
            className="returnForm"
            onSubmit={handleSubmit}
          >
            <div className="returnTitle">Solicite</div>

            <label className="field">
              <span
                className={`fieldLabel ${
                  fieldErrors.nome ? 'fieldLabelError' : ''
                }`}
              >
                NOME COMPLETO
              </span>

              <input
                value={form.nome}
                onChange={(e) => handleFieldChange('nome', e.target.value)}
                onBlur={() => handleFieldBlur('nome')}
                placeholder="Ex.: Maria Silva"
                maxLength={CONTACT_FIELD_LIMITS.nome.max}
                autoComplete="name"
              />
            </label>

            <label className="field">
              <span className="fieldLabel">
                SEU E-MAIL
                <span className="fieldOptional">(opcional)</span>
              </span>

              <input
                value={form.email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                onBlur={() => handleFieldBlur('email')}
                placeholder="exemplo@dominio.com"
                type="email"
              />
            </label>

            <label className="field">
              <span className="fieldLabel">
                TELEFONE
                <span className="fieldOptional">(opcional)</span>
              </span>

              <input
                value={form.telefone}
                onChange={(e) => handleFieldChange('telefone', e.target.value)}
                onBlur={() => handleFieldBlur('telefone')}
                placeholder="(11) 98765-4321"
                type="tel"
              />
            </label>

            <label className="field">
              <span className="fieldLabel">
                ESPECIALIDADE JURÍDICA
                <span className="fieldOptional">(opcional)</span>
              </span>

              <div className="selectWrap">
                <select
                  value={form.especialidade}
                  onChange={(e) =>
                    setForm((s) => ({
                      ...s,
                      especialidade: e.target.value,
                    }))
                  }
                  className="contactSelect"
                >
                  <option value="">Selecione uma área</option>

                  {SPECIALTY_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </label>

            <label className="field">
              <span className="fieldLabel">ASSUNTO JURÍDICO</span>

              <textarea
                value={form.assunto}
                onChange={(e) =>
                  handleFieldChange('assunto', e.target.value)
                }
                onBlur={() => handleFieldBlur('assunto')}
                placeholder="Descreva brevemente sua necessidade..."
                rows={5}
              />
            </label>

            <button type="submit" className="sendBtn">
              ENVIAR PELO WHATSAPP
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;