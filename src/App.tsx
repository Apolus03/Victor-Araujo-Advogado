import { useState, useRef, useEffect, type TouchEvent } from 'react';
import logoPng from './assets/Logo.png';
import vitorReadPng from './assets/img_vitor_read.png';
import officePng from './assets/img_escritório.png';
import { SpecialtyCard, type SpecialtyItem } from './hooks/SpecialtyCard';
import { WhatsAppFloat } from './hooks/WhatsAppFloat';
import { useScrollReveal } from './hooks/useScrollReveal';
import { Scale, FileText, Folder, ChevronLeft, ChevronRight } from 'lucide-react';
import HeroSection from './components/hero/HeroSection';
import NavbarSection from './components/navbar/NavbarSection';
import ContactSection from "./components/contact/ContactSection";

import {
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



function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function SiteHeader({ nav }: { nav: NavItem[] }) {
  return (
    <NavbarSection nav={nav} scrollToId={scrollToId} />
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

          <div className='titleContainer'>
            <span className="sectionHeader">
              <span className="line" />
              <span className="sectionTag">Sobre</span>
            </span>

            <h2 className="sectionTitle">
              Conheça um pouco da <em>minha</em> trajetória.
            </h2>

            <div className="titleDivider" />
          </div>
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
      type: "image",
      src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200",
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200",
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200",
    },
    {
      type: "map",
      src: "https://www.google.com/maps?q=Av.+Marginal+do+Oratorio,+37+Santo+Andre&output=embed",
      link: "https://www.google.com/maps?q=Av.+Marginal+do+Oratorio,+37+Santo+Andre",
    },
  ];

  const extendedSlides = [
    slides[slides.length - 1],
    ...slides,
    slides[0],
  ];

  const [current, setCurrent] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [paused, setPaused] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const startX = useRef(0);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setCurrent((prev) => prev + 1);
    }, 4000);

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
      const timeout = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);

      return () => clearTimeout(timeout);
    }
  }, [isTransitioning]);

  useEffect(() => {
  const timer = setTimeout(() => {
    setLoaded(true);
    setCurrent(1);
  }, 100);

  
  return () => clearTimeout(timer);
}, []);

  const handleTouchStart = (e: TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX.current - endX;

    if (diff > 50) {
      setCurrent((prev) => prev + 1);
    }

    if (diff < -50) {
      setCurrent((prev) => prev - 1);
    }

    startX.current = 0;
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
            rel="noreferrer"
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
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="carouselTrack"
            onTransitionEnd={handleTransitionEnd}
            style={{
              transform: `translateX(-${current * 100}%)`,
              transition: isTransitioning
                ? "transform 0.5s ease"
                : "none",
            }}
          >
            {extendedSlides.map((slide, index) => (
              <div className="carouselSlide" key={index}>
                {slide.type === "image" ? (
                  <img
                    src={slide.src}
                    alt={`Escritório ${index}`}
                  />
                ) : (
                  <div className="mapWrapper">
                    <iframe
                      src={slide.src}
                      loading="lazy"
                      title="Localização do escritório"
                    />

                    <a
                      href={slide.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mapButton"
                    >
                      📍 Abrir no Google Maps
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* SETA ESQUERDA */}
          <button
            className="carouselArrow carouselArrowLeft"
            onClick={() => setCurrent((prev) => prev - 1)}
            aria-label="Slide anterior"
          >
            <ChevronLeft size={28} />
          </button>

          {/* SETA DIREITA */}
          <button
            className="carouselArrow carouselArrowRight"
            onClick={() => setCurrent((prev) => prev + 1)}
            aria-label="Próximo slide"
          >
            <ChevronRight size={28} />
          </button>

          <div className="carouselDots">
            {slides.map((_, index) => {
              const activeIndex =
                current === 0
                  ? slides.length - 1
                  : current === slides.length + 1
                    ? 0
                    : current - 1;

              return (
                <button
                  key={index}
                  className={`dot ${activeIndex === index ? "active" : ""
                    }`}
                  onClick={() => setCurrent(index + 1)}
                />
              );
            })}
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


          <div className="vitorReadWrapper">
            <img src={vitorReadPng} alt="vitorReadPng" />
          </div>
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
            ADVOCACIA. TODOS OS DIREITOS RESERVADOS.<a href="https://apolus.vercel.app/" className="footerApolusLink">
              Desenvolvido por Apolus
            </a>

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
  ];

  return (
    <div className="siteRoot">
      <SiteHeader nav={nav} />
      <main>
        <HeroSection
          CONTACT_WHATSAPP_URL={CONTACT_WHATSAPP_URL}
          scrollToId={scrollToId}
        />
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
