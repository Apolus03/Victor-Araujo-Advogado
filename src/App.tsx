import { useState, useEffect, type TouchEvent, type FormEvent } from 'react';
import logoPng from './assets/Logo.png';
import logoDouradaPng from './assets/LogoDourada.png';
import vitorPng from '../img/img_vitor.png';
import vitorReadPng from '../img/img_vitor_read.png';
import temisPng from '../img/img_temis.png';
import officePng from '../img/img_escritório.png';
import escavadorPng from '../img/img_escavador.png';
import escavadorTitlePng from '../img/img_escavadorTitle.png';
import { FaLinkedinIn, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { SpecialtyCard, type SpecialtyItem } from './components/SpecialtyCard';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { useScrollReveal } from './hooks/useScrollReveal';
import { Scale, FileText, Folder } from 'lucide-react';
import {
  CONTACT_FIELD_LIMITS,
  EMPTY_CONTACT_FORM,
  formatContactField,
  trimContactPayload,
  validateContactFormFields,
  type ContactFieldErrors,
  type ContactFormFieldKey,
} from './contact/contactForm';
import { sendContactViaWhatsApp } from './contact/contactWhatsApp';
import {
  CONTACT_WHATSAPP_DISPLAY,
  CONTACT_WHATSAPP_URL,
} from './contact/constants';

type NavItem = { id: string; label: string };

function IconScale(props: { className?: string }) {
  return (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 3v18M6 7h12M8 7l-4 7h6l-2-7Zm10 0l2 7h-6l4-7Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconUsers(props: { className?: string }) {
  return (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16 18c0-2-2-3-4-3s-4 1-4 3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 18c0-1.6-1.2-2.6-2.7-2.9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M17.8 9.5a2.5 2.5 0 0 0-1.2-4.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconBriefcase(props: { className?: string }) {
  return (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 8V7a1 1 0 0 1 1-1h4a1 1 0 0 1 1v1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 9h16v10H4V9Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 13h16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M12 13v6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconShield(props: { className?: string }) {
  return (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 3 20 7v6c0 5-3.4 8.6-8 9-4.6-.4-8-4-8-9V7l8-4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const SPECIALTY_ITEMS: SpecialtyItem[] = [
  {
    title: 'Direito Civil',
    desc: 'Soluções para relações contratuais e responsabilidade civil.',
    icon: IconScale,
  },
  {
    title: 'Família',
    desc: 'Atendimento humanizado para questões sucessórias e familiares.',
    icon: IconUsers,
  },
  {
    title: 'Trabalhista',
    desc: 'Defesa de direitos individuais e assessoria patrimonial.',
    icon: IconBriefcase,
  },
  {
    title: 'Penitenciário',
    desc: 'Atuação na execução penal, garantindo direitos e acompanhamento de pessoas privadas de liberdade.',
    icon: IconShield,
  },
];

const SPECIALTY_OPTIONS = SPECIALTY_ITEMS.map((item) => item.title);

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function SiteHeader(props: { nav: NavItem[] }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="siteHeader">
      <div className="container siteHeaderInner">
        <div
          className="brand"
          role="banner"
          aria-label="Buzzetto & Salles Advogados Associados"
        >
          <img src={logoDouradaPng} alt="VictorLogo" className="brandLogo" />
        </div>

        <nav className="navDesktop" aria-label="Navegação principal">
          {props.nav.map((item) => (
            <button
              key={item.id}
              type="button"
              className="navLink"
              onClick={() => scrollToId(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="navDesktopRight">
          <button
            type="button"
            className="consultoriaBtn"
            onClick={() =>
      window.open(CONTACT_WHATSAPP_URL, '_blank')
    }
          >
            CONSULTORIA
          </button>
        </div>

        <button
          type="button"
          className="mobileToggle"
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {mobileOpen && (
        <div className="mobileMenu" role="dialog" aria-label="Menu">
          <div className="container mobileMenuInner">
            {props.nav.map((item) => (
              <button
                key={item.id}
                type="button"
                className="mobileNavLink"
                onClick={() => {
                  setMobileOpen(false);
                  scrollToId(item.id);
                }}
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              className="consultoriaBtn mobileConsultoria"
              onClick={() => {
                setMobileOpen(false);
                scrollToId('formulario-contato');
              }}
            >
              CONSULTORIA
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function HeroSection() {
  return (
    <section
      id="inicio"
      className="hero container"
      aria-label="Apresentação"
      style={{ ['--hero-temis-url' as string]: `url(${temisPng})` }}
    >
      <div className="heroInner">
        <div className="heroCenter">
          <img src={logoDouradaPng} alt="Vitor Araujo" className="heroLogoDourada" />
          <span className="heroSince"></span>
          <span className="sectionHeaderCentralize" id='inicialSection'>
            <span className="line" />
            <span className="sectionTag">DESDE 2020</span>
            <span className="line" />

          </span>
          <h1 className="heroTitle">VICTOR ARAUJO  <p className="heroSubtitle">SOCIEDADE INDIVIDUAL DE ADVOCACIA</p>

           <div className="titleDividerCentralize" id='titleDividerCentralizeSection'/></h1>

          <div className="heroActions">
            <a href={CONTACT_WHATSAPP_URL}>
              <button type="button" className="primaryBtn">
                AGENDAR REUNIÃO
              </button>
            </a>
            <button
              className="primaryBtn"
              type="button"
              onClick={() => scrollToId('escritorio')}
            >
              CONHEÇA O ESCRITÓRIO
            </button>
          </div>
        </div>
        <div className="heroRight">
          <img src={vitorPng} alt="Vitor Araujo" className="vitorImg" />
        </div>
      </div>
    </section>
  );
}

function IdentitySection() {
  const { ref: textRef, show: textShow } = useScrollReveal<HTMLDivElement>();
  const { ref: imgRef, show: imgShow } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="sobre" className="section sectionIdentity">
      <div className="container identityGrid">

        {/* TEXTO */}
        <div
          ref={textRef}
          className={`identityText reveal ${textShow ? 'show' : ''}`}
        >


          <span className="sectionHeader">
            <span className="line" />
            <span className="sectionTag">Sobre</span>
          </span>

          <h2 className="sectionTitle">
            Conheça um pouco da <em>minha</em> trajetória.
          </h2>

          <div className="titleDivider" />
          <p className="lead">
            A <b>Victor Araujo Sociedade Individual de Advocacia</b> foi criada
            com o propósito de oferecer um atendimento jurídico próximo,
            estratégico e realmente comprometido com cada cliente.
          </p>

          <p className="body">
            Cada caso é tratado com atenção e seriedade, sempre buscando a melhor
            solução de forma clara e eficiente. Mais do que atuar em processos,
            o foco está em orientar, prevenir problemas e proteger seus
            interesses no longo prazo.
          </p>
        </div>

        {/* IMAGEM + OVERLAY */}
        <div
          ref={imgRef}
          className={`identityVisual reveal ${imgShow ? 'show' : ''}`}
        >
          <div className="imageWrapper">
            <img
              src={officePng}
              alt="Advogado"
              className="officeImg"
            />

            {/* OVERLAY */}
            <div className="imageOverlay" />

            {/* FRASE */}
            <div className="quoteOverlay">
              <span className="quoteMark">“</span>

              <p className="quoteText">
                Onde houver um direito a ser defendido, haverá dedicação total em cada etapa do caminho.
              </p>

              <div className="quoteLine" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
function OfficeSection() {
  const slides = [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200',
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200',
    },
    {
      type: 'image',
      src: 'https://static.revistahaus.com.br/revistahaus/2024/05/02172529/revista-haus-projeto-de-arquitetura-escritorio-de-advocacia-submerso-studio-archa-divulgacao-5.jpg',
    },
    {
      type: 'map',
      src: 'https://www.google.com/maps?q=Av.+Marginal+do+Oratorio,+37+Santo+Andre&output=embed',
      link: 'https://www.google.com/maps?q=Av.+Marginal+do+Oratorio,+37+Santo+Andre',
    },
  ];

  const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

  const [current, setCurrent] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setCurrent((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [paused]);

  const handleTransitionEnd = () => {
    if (current === 0) {
      setIsTransitioning(false);
      setCurrent(slides.length);
    }

    if (current === slides.length + 1) {
      setIsTransitioning(false);
      setCurrent(1);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      setTimeout(() => setIsTransitioning(true), 50);
    }
  }, [isTransitioning]);

  let startX = 0;

  const handleTouchStart = (e: TouchEvent) => {
    startX = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    const moveX = e.touches[0].clientX;
    const diff = startX - moveX;

    if (diff > 50) {
      setCurrent((prev) => prev + 1);
      startX = 0;
    }

    if (diff < -50) {
      setCurrent((prev) => prev - 1);
      startX = 0;
    }
  };

  const handleTouchEnd = () => {
    startX = 0;
  };

  return (
    <section id="escritorio" className="section officeSection">
      <div className="container officeGrid">
        <div className="officeText">
          <span className="sectionHeaderCentralize">
            <span className="line" />
            <span className="sectionTag">escritório</span>
            <span className="line" />
          </span>
          <h2 className="sectionTitle">
            Conheça o meu <em>escritório</em>.
          </h2>


          <a
            href="https://www.google.com/maps?q=Av.+Marginal+do+Oratorio,+37+Santo+Andre"
            target="_blank"
            className="officeAddress"
          >
            Av. Marginal Oratório, Jardim Utinga, 37
          </a>
          <div className="titleDividerCentralize" />

        </div>

        <div
          className="carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="carouselTrack"
            onTransitionEnd={handleTransitionEnd}
            style={{
              transform: `translateX(-${current * 100}%)`,
              transition: isTransitioning ? 'transform 0.5s ease' : 'none',
            }}
          >
            {extendedSlides.map((slide, index) => (
              <div className="carouselSlide" key={index}>
                {slide.type === 'image' ? (
                  <img src={slide.src} alt="Escritório" />
                ) : (
                  <div className="mapWrapper">
                    <iframe
                      src={slide.src}
                      loading="lazy"
                      title="Localização do escritório"
                    />

                    <a href={slide.link} target="_blank" className="mapButton">
                      📍 Abrir no Google Maps
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="carouselDots">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === current - 1 ? 'active' : ''}`}
                onClick={() => setCurrent(index + 1)}
              />
            ))}
          </div>
        </div>


      </div>
    </section>
  );
}

function SpecialtiesSection() {
  return (
    <section id="atuacao" className="section sectionSpecialties">
      <div className="container">
        <div className="sectionHeadingCentered">

          <span className="sectionHeaderCentralize">
            <span className="line" />
            <span className="sectionTag">Atuação</span>
            <span className="line" />
          </span>
          <h2 className="sectionTitle"> Veja em quais situações posso te <em>ajudar</em> no dia a dia.<br /> <div className="titleDividerCentralize" /></h2>


        </div>
      </div>

      <div className="container specialtiesGrid">
        {SPECIALTY_ITEMS.map((it, i) => (
          <SpecialtyCard key={it.title} item={it} i={i} />
        ))}
      </div>
    </section>
  );
}


function SupportSection() {
  const { ref: textRef, show: textShow } = useScrollReveal<HTMLDivElement>();
  const { ref: cardsRef, show: cardsShow } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="apoio" className="section proceedingSection">
      <div className="container supportGrid">
        <div className='titleContainer'>
          <span className="sectionHeader">
            <span className="line" />
            <span className="sectionTag">Apoio</span>
          </span>
          <h2 className="sectionTitle">
            Se voce é advogado, conte <em>comigo</em> para apoio.
          </h2>
          <div className="titleDivider" />
        </div>
        {/* 🔴 ESQUERDA (vermelho) */}
        <div
          ref={textRef}
          className={`supportText reveal ${textShow ? 'show' : ''}`}
        >

          <div
            ref={cardsRef}
            className={`supportCards reveal ${cardsShow ? 'show' : ''}`}
          >
            <div className="supportCardsInner">

              <div className="supportCard">
                <div className="card">
                  <div className="icon">
                    <Scale size={48} />
                  </div>
                  <div className="supportCardBody">
                    <div className="supportCardTitle">Audiências</div>
                    Acompanhamento em audiências cíveis e criminais, com registro fiel do ato e alinhamento à estratégia definida para o caso.
                  </div>
                </div>
              </div>

              <div className="supportCard supportCardHighlight">
                <div className="card">
                  <div className="icon">
                    <FileText size={48} />
                  </div>

                  <div className="supportCardBody">
                    <div className="supportCardTitle">Pareceres</div>
                    Pareceres com análise aprofundada e fundamentação técnica consistente, orientando decisões com segurança jurídica.
                  </div>
                </div>
              </div>

              <div className="supportCard">
                <div className="card">
                  <div className="icon">
                    <Folder size={48} />
                  </div>
                  <div className="supportCardBody">
                    <div className="supportCardTitle">Diligências</div>
                    Diligências em fóruns, tribunais e órgãos administrativos, com agilidade e retorno objetivo sobre cada etapa cumprida.
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>

        {/* 🔵 DIREITA (azul) */}


        <div className="supportMedia">

          <div className="escavadorHeader">
            <div className='escavadorLogoContainer'>
              <img src={escavadorPng} alt="Escavador" className='escavadorPng' />
            </div>

            <div className='escavadorLabelContainer'>
              <h3>
                Perfil verificado no
                <img src={escavadorTitlePng} alt="EscavadorTitle" className='escavadorTitlePng' />
              </h3>
              <p>
                Transparência e acompanhamento público dos processos em que atuo.
              </p>
              <a
                href="https://www.escavador.com/nomes/victor-araujo-da-silva-951154e42b"
                target="_blank"
                className="escavadorLink"
              >
                Ver perfil completo
              </a>
            </div>


          </div>

          <div className="vitorReadWrapper">
            <img src={vitorReadPng} alt="vitorReadPng" />
          </div>
        </div>


      </div>
    </section>
  );
}

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
              <div className="contactIcon" aria-hidden="true">
                <FaWhatsapp />
              </div>
              <div>
                <div className="contactLabel">TELEFONE / WHATSAPP</div>
                <div className="contactValue">{CONTACT_WHATSAPP_DISPLAY}</div>
              </div>
            </a>


            <a
              href="https://www.linkedin.com/in/victor-ara%C3%BAjo-586b98165/"
              className="contactRow"
            >
              <div className="contactIcon" aria-hidden="true">
                <FaLinkedinIn />
              </div>
              <div>
                <div className="contactLabel">linkedin</div>
                <div className="contactValue">Victor Araújo</div>
              </div>
            </a>

            <a
              href="https://www.instagram.com/ojuara1994/"
              className="contactRow"
            >
              <div className="contactIcon" aria-hidden="true">
                <FaInstagram />
              </div>
              <div>
                <div className="contactLabel">INSTAGRAM</div>
                <div className="contactValue">_araujoadvogados</div>
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

            <label className="field" style={{ transitionDelay: '0.3s' }}>
              <span
                className={`fieldLabel ${fieldErrors.nome ? 'fieldLabelError' : ''}`}
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
                className={fieldErrors.nome ? 'fieldInputError' : undefined}
                aria-invalid={Boolean(fieldErrors.nome)}
              />
              {fieldErrors.nome ? (
                <p className="fieldErrorMsg">{fieldErrors.nome}</p>
              ) : null}
            </label>

            <label className="field" style={{ transitionDelay: '0.5s' }}>
              <span
                className={`fieldLabel ${fieldErrors.email ? 'fieldLabelError' : ''}`}
              >
                SEU E-MAIL{' '}
                <span className="fieldOptional">(opcional)</span>
              </span>
              <input
                value={form.email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                onBlur={() => handleFieldBlur('email')}
                placeholder="exemplo@dominio.com"
                type="email"
                inputMode="email"
                maxLength={CONTACT_FIELD_LIMITS.email.max}
                autoComplete="email"
                spellCheck={false}
                className={fieldErrors.email ? 'fieldInputError' : undefined}
                aria-invalid={Boolean(fieldErrors.email)}
              />
              {fieldErrors.email ? (
                <p className="fieldErrorMsg">{fieldErrors.email}</p>
              ) : null}
            </label>

            <label className="field" style={{ transitionDelay: '0.6s' }}>
              <span
                className={`fieldLabel ${fieldErrors.telefone ? 'fieldLabelError' : ''}`}
              >
                TELEFONE{' '}
                <span className="fieldOptional">(opcional)</span>
              </span>
              <input
                value={form.telefone}
                onChange={(e) => handleFieldChange('telefone', e.target.value)}
                onBlur={() => handleFieldBlur('telefone')}
                placeholder="(11) 98765-4321"
                type="tel"
                inputMode="numeric"
                maxLength={CONTACT_FIELD_LIMITS.telefone.max}
                autoComplete="tel"
                className={fieldErrors.telefone ? 'fieldInputError' : undefined}
                aria-invalid={Boolean(fieldErrors.telefone)}
              />
              {fieldErrors.telefone ? (
                <p className="fieldErrorMsg">{fieldErrors.telefone}</p>
              ) : null}
            </label>

            <label className="field" style={{ transitionDelay: '0.7s' }}>
              <span className="fieldLabel">
                ESPECIALIDADE JURÍDICA{' '}
                <span className="fieldOptional">(opcional)</span>
              </span>
              <div className="selectWrap">
                <select
                  value={form.especialidade}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, especialidade: e.target.value }))
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

            <label className="field" style={{ transitionDelay: '0.8s' }}>
              <span
                className={`fieldLabel ${fieldErrors.assunto ? 'fieldLabelError' : ''}`}
              >
                ASSUNTO JURÍDICO
              </span>
              <textarea
                value={form.assunto}
                onChange={(e) => handleFieldChange('assunto', e.target.value)}
                onBlur={() => handleFieldBlur('assunto')}
                placeholder="Descreva brevemente sua necessidade..."
                maxLength={CONTACT_FIELD_LIMITS.assunto.max}
                rows={5}
                className={fieldErrors.assunto ? 'fieldInputError' : undefined}
                aria-invalid={Boolean(fieldErrors.assunto)}
              />
              <p
                className={`fieldCharCount ${
                  form.assunto.length >= CONTACT_FIELD_LIMITS.assunto.max * 0.9
                    ? 'fieldCharCountWarn'
                    : ''
                }`}
                aria-live="polite"
              >
                {form.assunto.length}/{CONTACT_FIELD_LIMITS.assunto.max}
              </p>
              {fieldErrors.assunto ? (
                <p className="fieldErrorMsg">{fieldErrors.assunto}</p>
              ) : null}
            </label>

            <button type="submit" className="sendBtn" style={{ transitionDelay: '0.4s' }}>
              ENVIAR PELO WHATSAPP
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  const links: NavItem[] = [
    { id: 'inicio', label: 'INÍCIO' },
    { id: 'escritorio', label: 'ESCRITÓRIO' },
    { id: 'atuacao', label: 'ATUAÇÃO' },
    { id: 'contato', label: 'CONTATO' },
  ];

  return (
    <footer className="siteFooter" aria-label="Rodapé">
      <div className="container footerInner">
        <div className="footerBrand">
          <img src={logoPng} alt="Vitor Advogado Logo" className="footerLogo" />

          <div className="footerBrandSub">
            VICTOR ARAUJO <br />
            SOCIEDADE INDIVIDUAL DE ADVOCACIA
          </div>
        </div>

        <div className="footerLinks" aria-label="Links do rodapé">
          {links.map((l, idx) => (
            <button
              key={`${l.label}-${idx}`}
              type="button"
              className="footerLink"
              onClick={() => scrollToId(l.id)}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="footerMeta">
          <div className="footerOab">OAB/SP 139.533</div>

          <div>
            © {new Date().getFullYear()} VICTOR ARAUJO SOCIEDADE INDIVIDUAL DE
            ADVOCACIA. TODOS OS DIREITOS RESERVADOS.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const nav: NavItem[] = [
    { id: 'atuacao', label: 'ATUAÇÃO' },
    { id: 'apoio', label: 'APOIO' },
    { id: 'escritorio', label: 'ESCRITÓRIO' },
    { id: 'sobre', label: 'SOBRE' },
    { id: 'contato', label: 'CONTATO' },
  ];

  return (
    <div className="siteRoot">
      <SiteHeader nav={nav} />
      <main>
        <HeroSection />
        <SpecialtiesSection />

        <SupportSection />
        <OfficeSection />
        <IdentitySection />

        <ContactSection />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
