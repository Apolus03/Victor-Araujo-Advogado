import {
  useMemo,
  useState,
  useEffect,
  type TouchEvent,
  type FormEvent,
} from 'react';
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

/** E-mail profissional exibido no site (fallback mailto — sempre funciona). */
// const CONTACT_PROFESSIONAL_EMAIL = 'victor_araujo@adv.oab.org.br';
const CONTACT_PROFESSIONAL_EMAIL = 'apolus03@gmail.com';

/**
 * Chave Web3Forms (https://web3forms.com — grátis, 1 minuto).
 * Cole aqui; se estiver vazio, tentamos FormSubmit abaixo.
 */
const WEB3FORMS_ACCESS_KEY = '6c4324e4-d9fd-416b-a577-d5a1a898351a';

const WEB3FORMS_SUBMIT_URL = 'https://api.web3forms.com/submit';

/** ID FormSubmit (ativação por URL no e-mail deles). */
const FORMSUBMIT_FORM_ID = '4349be602e8890c4b9787fadace0bc42';

type FormSubmitResponse = {
  message?: string;
  error?: string;
  success?: string | boolean;
};

/** Confirmação explícita de sucesso em JSON (vários serviços usam boolean ou string). */
function jsonIndicatesSuccess(value: unknown): boolean {
  if (value === true) return true;
  if (typeof value === 'string') {
    const v = value.trim().toLowerCase();
    return v === 'true' || v === '1' || v === 'yes';
  }
  return false;
}

function contactMailtoHref(form: {
  nome: string;
  email: string;
  telefone: string;
  especialidade: string;
  assunto: string;
}) {
  const nome = form.nome.trim() || 'Visitante';
  const subject = encodeURIComponent(`Contato pelo site — ${nome}`);
  const tel = form.telefone.trim();
  const esp = form.especialidade.trim();
  let text = `Nome: ${form.nome.trim()}\nE-mail: ${form.email.trim()}`;
  if (tel) text += `\nTelefone: ${tel}`;
  if (esp) text += `\nÁrea jurídica: ${esp}`;
  text += `\n\n${form.assunto.trim()}`;
  const body = encodeURIComponent(text);
  return `mailto:${CONTACT_PROFESSIONAL_EMAIL}?subject=${subject}&body=${body}`;
}

type SubmitContactResult = { ok: true } | { ok: false; message: string };
type ContactPayload = {
  nome: string;
  email: string;
  telefone: string;
  especialidade: string;
  assunto: string;
};

async function submitViaWeb3Forms(
  payload: ContactPayload,
): Promise<SubmitContactResult> {
  let res: Response;
  try {
    res = await fetch(WEB3FORMS_SUBMIT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY.trim(),
        subject: `Contato pelo site — ${payload.nome.trim()}`,
        from_name: payload.nome.trim(),
        replyto: payload.email.trim(),
        Nome: payload.nome.trim(),
        'E-mail': payload.email.trim(),
        ...(payload.telefone.trim()
          ? { Telefone: payload.telefone.trim() }
          : {}),
        ...(payload.especialidade.trim()
          ? { 'Área jurídica': payload.especialidade.trim() }
          : {}),
        Mensagem: payload.assunto.trim(),
      }),
    });
  } catch {
    return {
      ok: false,
      message:
        'Não foi possível conectar ao serviço de envio (rede, firewall ou bloqueador). Use o link abaixo para abrir no seu e-mail.',
    };
  }

  const raw = await res.text();
  let data: { success?: unknown; message?: string } = {};
  try {
    data = JSON.parse(raw) as { success?: unknown; message?: string };
  } catch {
    return {
      ok: false,
      message:
        'O serviço de envio respondeu de forma inesperada. Tente o link “Enviar pelo e-mail” abaixo.',
    };
  }

  const accepted = res.ok && jsonIndicatesSuccess(data.success);
  if (!accepted) {
    return {
      ok: false,
      message:
        (typeof data.message === 'string' && data.message.trim()) ||
        'O envio não foi aceito pelo Web3Forms. Tente o link “Enviar pelo e-mail” abaixo.',
    };
  }
  return { ok: true };
}

async function submitViaFormSubmit(
  payload: ContactPayload,
): Promise<SubmitContactResult> {
  let res: Response;
  try {
    res = await fetch(
      `https://formsubmit.co/ajax/${FORMSUBMIT_FORM_ID}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          Nome: payload.nome.trim(),
          'E-mail': payload.email.trim(),
          ...(payload.telefone.trim()
            ? { Telefone: payload.telefone.trim() }
            : {}),
          ...(payload.especialidade.trim()
            ? { 'Área jurídica': payload.especialidade.trim() }
            : {}),
          Mensagem: payload.assunto.trim(),
          _subject: `Contato pelo site — ${payload.nome.trim()}`,
          _replyto: payload.email.trim(),
          _captcha: false,
        }),
      },
    );
  } catch {
    return {
      ok: false,
      message:
        'Não foi possível conectar ao serviço de envio (rede, firewall ou bloqueador). Use o link abaixo para abrir no seu e-mail.',
    };
  }

  const raw = await res.text();
  let data: FormSubmitResponse = {};
  try {
    data = JSON.parse(raw) as FormSubmitResponse;
  } catch {
    return {
      ok: false,
      message:
        'O serviço de envio respondeu de forma inesperada. Tente o link “Enviar pelo e-mail” abaixo.',
    };
  }

  const accepted = res.ok && jsonIndicatesSuccess(data.success);

  if (!accepted) {
    const rawMsg = typeof data.message === 'string' ? data.message : '';
    if (/activation|activate form|needs activation/i.test(rawMsg)) {
      return {
        ok: false,
        message:
          'O formulário ainda não foi ativado. Abra o e-mail que o FormSubmit enviou, clique em “Activate Form” e tente de novo. Confira também o spam.',
      };
    }
    if (/web server|html files/i.test(rawMsg)) {
      return {
        ok: false,
        message:
          'Abra o site pelo endereço do servidor (npm run dev ou o link publicado), não abra o arquivo HTML direto no disco.',
      };
    }
    return {
      ok: false,
      message:
        rawMsg.trim() ||
        (typeof data.error === 'string' && data.error.trim()) ||
        'O envio não foi aceito pelo FormSubmit. Use o link “Enviar pelo e-mail” abaixo.',
    };
  }
  return { ok: true };
}

async function submitContactForm(
  payload: ContactPayload,
): Promise<SubmitContactResult> {
  if (WEB3FORMS_ACCESS_KEY.trim()) {
    return submitViaWeb3Forms(payload);
  }
  return submitViaFormSubmit(payload);
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
          <span className="heroSince">DESDE 2023</span>

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
            Tradição que evolui <em>com a modernidade</em>.
          </h2>

          <div className="kicker">Conheça um pouco da minha trajetória.</div>

          <p className="lead">
            A <b>Victor Araujo Sociedade Individual de Advocacia</b> foi criada
            com o propósito de oferecer um atendimento jurídico próximo,
            estratégico e realmente comprometido com cada cliente.
          </p>

          <p className="body">
            Cada caso é tratado com atenção e seriedade, sempre buscando a
            melhor solução de forma clara e eficiente. Mais do que atuar em
            processos, o foco está em orientar, prevenir problemas e proteger
            seus interesses no longo prazo.
          </p>

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
      link: 'https://www.google.com/maps?q=Av.+Marginal+do+Oratorio,+33+Santo+Andre',
    },
    {
      type: 'map',
      src: 'https://www.google.com/maps?q=Av.+Marginal+do+Oratorio,+33+Santo+Andre&output=embed',
      link: 'https://www.google.com/maps?q=Av.+Marginal+do+Oratorio,+33+Santo+Andre',
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
            href="https://www.google.com/maps?q=Av.+Marginal+do+Oratorio,+33+Santo+Andre"
            target="_blank"
            className="officeAddress"
          >
            Av. Marginal do Oratório, 33 - Jd. Utinga, Santo André - SP
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

        <div className="supporters">
          <p className="supportersTitle">
            apoiadores que confiam no meu trabalho
          </p>

          <div className="supportersGrid">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
              alt=""
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
              alt=""
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
              alt=""
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
              alt=""
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
              alt=""
            />
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
            <div className="supportCard" style={{ transitionDelay: '0.1s' }}>
              <div className="supportIndex">01</div>
              <div className="supportCardTitle">Sustentação Oral</div>
              <div className="supportCardBody">
                Sustentação oral presencial ou remota, com preparo técnico,
                firmeza argumentativa e clareza na exposição da tese.
              </div>
            </div>

            <div className="supportCard" style={{ transitionDelay: '0.2s' }}>
              <div className="supportIndex">02</div>
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
              <div className="supportIndex">03</div>
              <div className="supportCardTitle">Pareceres</div>
              <div className="supportCardBody">
                Pareceres com análise aprofundada e fundamentação técnica
                consistente, orientando decisões com segurança jurídica.
              </div>
            </div>

            <div className="supportCard" style={{ transitionDelay: '0.4s' }}>
              <div className="supportIndex">04</div>
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<'nome' | 'email' | 'assunto', string>>
  >({});
  const { ref: leftRef, show: leftShow } = useScrollReveal<HTMLDivElement>();
  const { ref: rightRef, show: rightShow } = useScrollReveal<HTMLDivElement>();
  const mailtoHref = useMemo(() => contactMailtoHref(form), [form]);

  const validateForm = () => {
    const nome = form.nome.trim();
    const email = form.email.trim();
    const assunto = form.assunto.trim();
    const next: Partial<Record<'nome' | 'email' | 'assunto', string>> = {};
    if (!nome) next.nome = 'Preencha o nome.';
    if (!email) next.email = 'Preencha o e-mail.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = 'Digite um e-mail válido.';
    if (assunto.length < 3)
      next.assunto = 'O assunto precisa ter pelo menos 3 letras.';
    return next;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setIsSubmitting(true);
    try {
      const result = await submitContactForm(form);
      if (result.ok) {
        setForm({
          nome: '',
          email: '',
          telefone: '',
          especialidade: '',
          assunto: '',
        });
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setSubmitError(result.message);
      }
    } catch (err) {
      const hint =
        err instanceof Error && err.message ? ` (${err.message})` : '';
      setSubmitError(
        `Não foi possível enviar agora.${hint} Tente de novo ou use o link abaixo para abrir no seu e-mail.`,
      );
    } finally {
      setIsSubmitting(false);
    }
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
            <a href="https://wa.me/5511954258694" className="contactRow">
              <div className="contactIcon" aria-hidden="true">
                <FaWhatsapp />
              </div>
              <div>
                <div className="contactLabel">TELEFONE / WHATSAPP</div>
                <div className="contactValue">(11) 95425-8694</div>
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
              href="https://www.instagram.com/_araujoadvogados/"
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
                onChange={(e) => {
                  setForm((s) => ({ ...s, nome: e.target.value }));
                  if (fieldErrors.nome) {
                    setFieldErrors(({ nome: _n, ...rest }) => rest);
                  }
                }}
                placeholder="Digite seu nome..."
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
                SEU E-MAIL
              </span>
              <input
                value={form.email}
                onChange={(e) => {
                  setForm((s) => ({ ...s, email: e.target.value }));
                  if (fieldErrors.email) {
                    setFieldErrors(({ email: _e, ...rest }) => rest);
                  }
                }}
                placeholder="exemplo@dominio.com"
                type="email"
                className={fieldErrors.email ? 'fieldInputError' : undefined}
                aria-invalid={Boolean(fieldErrors.email)}
              />
              {fieldErrors.email ? (
                <p className="fieldErrorMsg">{fieldErrors.email}</p>
              ) : null}
            </label>

            <label className="field" style={{ transitionDelay: '0.6s' }}>
              <span className="fieldLabel">
                TELEFONE{' '}
                <span className="fieldOptional">(opcional)</span>
              </span>
              <input
                value={form.telefone}
                onChange={(e) =>
                  setForm((s) => ({ ...s, telefone: e.target.value }))
                }
                placeholder="(00) 00000-0000"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
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
              <span
                className={`fieldLabel ${fieldErrors.assunto ? 'fieldLabelError' : ''}`}
              >
                ASSUNTO JURÍDICO
              </span>
              <textarea
                value={form.assunto}
                onChange={(e) => {
                  setForm((s) => ({ ...s, assunto: e.target.value }));
                  if (fieldErrors.assunto) {
                    setFieldErrors(({ assunto: _a, ...rest }) => rest);
                  }
                }}
                placeholder="Descreva brevemente sua necessidade..."
                className={fieldErrors.assunto ? 'fieldInputError' : undefined}
                aria-invalid={Boolean(fieldErrors.assunto)}
              />
              {fieldErrors.assunto ? (
                <p className="fieldErrorMsg">{fieldErrors.assunto}</p>
              ) : null}
            </label>

            {submitError ? (
              <p className="formFeedback formFeedbackErr" role="alert">
                {submitError}
              </p>
            ) : null}

            <button
              type="submit"
              className="sendBtn"
              style={{ transitionDelay: '0.4s' }}
              disabled={isSubmitting}
            >
              {isSubmitted
                ? 'MENSAGEM ENVIADA!'
                : isSubmitting
                  ? 'ENVIANDO…'
                  : 'ENVIAR MENSAGEM'}
            </button>

            <p className="contactMailtoHint">
              <a className="contactMailtoLink" href={mailtoHref}>
                Abrir mensagem no seu e-mail
              </a>
              <span className="contactMailtoHintSub">
                {' '}
                (Gmail, Outlook etc. — não depende do FormSubmit.)
              </span>
            </p>
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
