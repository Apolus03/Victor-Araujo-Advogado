import { useState, useEffect, type TouchEvent } from 'react';
import logoPng from './assets/Logo.png';
import vitorPng from '../img/img_vitor.png';
import temisPng from '../img/img_temis.png';
import officePng from '../img/img_escritório.png';
import { FaLinkedinIn, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { SpecialtyCard, type SpecialtyItem } from './components/SpecialtyCard';
import { useScrollReveal } from './hooks/useScrollReveal';

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
    title: 'Penal',
    desc: 'Atuação estratégica e técnica na defesa de direitos fundamentais.',
    icon: IconShield,
  },
];

const SPECIALTY_OPTIONS = SPECIALTY_ITEMS.map((item) => item.title);

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const CONTACT_PROFESSIONAL_EMAIL = 'victor_araujo@adv.oab.org.br';
const CONTACT_WHATSAPP_PHONE = '5511954258694';
const MAX_NOME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 150;
const MAX_ASSUNTO_LENGTH = 255;

function buildWhatsappMessage(form: {
  nome: string;
  email: string;
  telefone: string;
  especialidade: string;
  assunto: string;
}) {
  const nome = form.nome.trim() || 'Não informado';
  const email = form.email.trim() || 'Não informado';
  const telefone = form.telefone.trim();
  const especialidade = form.especialidade.trim();
  const assunto = form.assunto.trim() || 'Não informado';

  const lines = [
    'Olá, Victor! Vim pelo site e gostaria de um atendimento.',
    `Meu nome é ${nome}, meu e-mail é ${email}${telefone ? ` e meu telefone é ${telefone}` : ''}.`,
    ...(especialidade
      ? [`A especialidade jurídica de meu interesse é ${especialidade}.`]
      : []),
    'O que eu gostaria de falar é:',
    assunto,
  ];

  return lines.join('\n');
}

function formatWhatsappPhone(phone: string) {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 13 && digits.startsWith('55')) {
    const ddd = digits.slice(2, 4);
    const firstPart = digits.slice(4, 9);
    const secondPart = digits.slice(9);
    return `(${ddd}) ${firstPart}-${secondPart}`;
  }
  return phone;
}

function formatPhoneInput(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length === 0) return '';
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
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
          <img src={logoPng} alt="BUZZETTO & SALLES" className="brandLogo" />
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
            onClick={() => scrollToId('formulario-contato')}
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
          <img src={logoPng} alt="Vitor Araujo" className="heroLogo" />
          <span className="heroSince">DESDE 2020</span>

          <h1 className="heroTitle">VICTOR ARAUJO</h1>

          <p className="heroSubtitle">SOCIEDADE INDIVIDUAL DE ADVOCACIA</p>

          <div className="heroActions">
            <a href="https://wa.me/5511954258694">
              <button type="button" className="primaryBtn">
                AGENDAR REUNIÃO
              </button>
            </a>
            <button
              className="ghostBtn"
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
        <div
          ref={textRef}
          className={`identityText reveal ${textShow ? 'show' : ''}`}
        >
          <h2 className="sectionTitle">
            Conheça um pouco da minha <em>trajetória</em>.
          </h2>

          <p className="lead">
            A <b>Victor Araujo Sociedade Individual de Advocacia</b> foi criada
            com o propósito de oferecer um atendimento jurídico próximo,
            estratégico e realmente comprometido com cada cliente.
            <br />
            Cada caso é tratado com atenção e seriedade, sempre buscando a
            melhor solução de forma clara e eficiente. Mais do que atuar em
            processos, o foco está em orientar, prevenir problemas e proteger
            seus interesses no longo prazo.
          </p>

          <p className="body"></p>

          <div className="quoteCard">
            <span className="quoteIcon">“</span>
            <blockquote>
              Onde houver um direito a ser defendido, haverá dedicação total em
              cada etapa do caminho.
            </blockquote>
          </div>
        </div>

        <div
          ref={imgRef}
          className={`identityMedia reveal ${imgShow ? 'show' : ''}`}
          aria-label="Foto do escritório (recorte)"
        >
          <div className="identityFrame">
            <img
              src={officePng}
              alt="Foto do escritório"
              className="officeImg"
            />

            {/* Badge 1 */}
            <div className="historyBadge historyBadge1" aria-hidden="true">
              <div className="historyNumber">6+</div>
              <div className="historyLabel">ANOS DE HISTÓRIA</div>
            </div>

            {/* Badge 2 */}
            <div className="historyBadge historyBadge2" aria-hidden="true">
              <div className="historyNumber">100+</div>
              <div className="historyLabel">CASOS ATENDIDOS</div>
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
          <h2 className="sectionTitle">
            Conheça o meu <em>escritório</em>
          </h2>

          <a
            href="https://www.google.com/maps?q=Av.+Marginal+do+Oratorio,+37+Santo+Andre"
            target="_blank"
            className="officeAddress"
          >
            Av. Marginal Oratório, Jardim Utinga, 37
          </a>
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
          <h2 className="subsectionTitle">Especialidades Jurídicas</h2>
          <br />
          <div className="kicker">
            Veja em quais situações posso te ajudar no dia a dia.
          </div>
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
    <section id="apoio" className="section sectionIdentity supportSection">
      <div className="container supportGrid">
        <div
          ref={textRef}
          className={`supportText reveal ${textShow ? 'show' : ''}`}
        >
          <h2 className="supportTitle">
            Logística Jurídica e
            <br />
            Correspondência
          </h2>
          <br />
          <div className="kicker">
            Se você é advogado, conte comigo para te apoiar.
          </div>
        </div>

        <div
          ref={cardsRef}
          className={`supportCards reveal ${cardsShow ? 'show' : ''}`}
          aria-label="Serviços de apoio"
        >
          <div className="supportCardsInner">
            <div className="supportCard" style={{ transitionDelay: '0.2s' }}>
              <div className="supportCardTitle">Audiências</div>
              <div className="supportCardBody">
                Acompanhamento em audiências cíveis e criminais, com registro
                fiel do ato e alinhamento à estratégia definida para o caso.
              </div>
            </div>

            <div
              className="supportCard supportCardHighlight"
              style={{ transitionDelay: '0.3s' }}
            >
              <div className="supportCardTitle">Pareceres</div>
              <div className="supportCardBody">
                Pareceres com análise aprofundada e fundamentação técnica
                consistente, orientando decisões com segurança jurídica.
              </div>
            </div>

            <div className="supportCard" style={{ transitionDelay: '0.4s' }}>
              <div className="supportCardTitle">Diligências</div>
              <div className="supportCardBody">
                Diligências em fóruns, tribunais e órgãos administrativos, com
                agilidade e retorno objetivo sobre cada etapa cumprida.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    especialidade: '',
    assunto: '',
  });
  const { ref: leftRef, show: leftShow } = useScrollReveal<HTMLDivElement>();
  const { ref: rightRef, show: rightShow } = useScrollReveal<HTMLDivElement>();
  const handleSendToWhatsapp = () => {
    const message = buildWhatsappMessage(form);
    const url = `https://wa.me/${CONTACT_WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
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
            <a
              href={`https://wa.me/${CONTACT_WHATSAPP_PHONE}`}
              className="contactRow"
            >
              <div className="contactIcon" aria-hidden="true">
                <FaWhatsapp />
              </div>
              <div>
                <div className="contactLabel">WHATSAPP</div>
                <div className="contactValue">
                  {formatWhatsappPhone(CONTACT_WHATSAPP_PHONE)}
                </div>
              </div>
            </a>

            <div className="contactRow">
              <div className="contactIcon" aria-hidden="true">
                ✉
              </div>
              <div>
                <div className="contactLabel">E-MAIL PROFISSIONAL</div>
                <div className="contactValue">{CONTACT_PROFESSIONAL_EMAIL}</div>
              </div>
            </div>

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
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="returnTitle">Solicite</div>

            <label className="field" style={{ transitionDelay: '0.3s' }}>
              <span className="fieldLabel">NOME COMPLETO</span>
              <input
                value={form.nome}
                onChange={(e) =>
                  setForm((s) => ({
                    ...s,
                    nome: e.target.value.slice(0, MAX_NOME_LENGTH),
                  }))
                }
                placeholder="Digite seu nome..."
                maxLength={MAX_NOME_LENGTH}
              />
            </label>

            <label className="field" style={{ transitionDelay: '0.5s' }}>
              <span className="fieldLabel">SEU E-MAIL</span>
              <input
                value={form.email}
                onChange={(e) =>
                  setForm((s) => ({
                    ...s,
                    email: e.target.value.slice(0, MAX_EMAIL_LENGTH),
                  }))
                }
                placeholder="exemplo@dominio.com"
                type="email"
                maxLength={MAX_EMAIL_LENGTH}
              />
            </label>

            <label className="field" style={{ transitionDelay: '0.6s' }}>
              <span className="fieldLabel">
                TELEFONE <span className="fieldOptional">(opcional)</span>
              </span>
              <input
                value={form.telefone}
                onChange={(e) => {
                  const telefoneFormatado = formatPhoneInput(e.target.value);
                  setForm((s) => ({ ...s, telefone: telefoneFormatado }));
                }}
                placeholder="(00) 00000-0000"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                maxLength={15}
              />
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
              <span className="fieldLabel">ASSUNTO JURÍDICO</span>
              <textarea
                value={form.assunto}
                onChange={(e) =>
                  setForm((s) => ({
                    ...s,
                    assunto: e.target.value.slice(0, MAX_ASSUNTO_LENGTH),
                  }))
                }
                placeholder="Descreva brevemente sua necessidade..."
                maxLength={MAX_ASSUNTO_LENGTH}
              />
            </label>

            <button
              type="button"
              className="sendBtn"
              style={{ transitionDelay: '0.4s' }}
              onClick={handleSendToWhatsapp}
            >
              ENVIAR MENSAGEM
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
    { id: 'escritorio', label: 'ESCRITÓRIO' },
    { id: 'sobre', label: 'SOBRE' },
    { id: 'atuacao', label: 'ATUAÇÃO' },
    { id: 'apoio', label: 'APOIO' },
    { id: 'contato', label: 'CONTATO' },
  ];

  return (
    <div className="siteRoot">
      <SiteHeader nav={nav} />
      <main>
        <HeroSection />
        <SpecialtiesSection />
        <SupportSection />
        <IdentitySection />
        <OfficeSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
