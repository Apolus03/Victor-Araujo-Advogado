
import {
  FaWhatsapp,
  HiArrowRight,
  temisPng,
  vitorPng,
  logoDouradaPng
} from '../import/Imports';
import './Hero.css';

interface HeroSectionProps {
  CONTACT_WHATSAPP_URL: string;
  scrollToId: (id: string) => void;
}

export default function HeroSection({
  CONTACT_WHATSAPP_URL,
  scrollToId,
}: HeroSectionProps) {
  return (
    <section
      id="inicio"
      className="hero container"
      aria-label="Apresentação"

    >
      <div className="heroInner">

        {/* ESQUERDA - ATHENAS */}
        <div className="heroLeft">
          <img
            src={temisPng}
            alt="Estátua de Atenas"
            className="athenasImg"
          />
        </div>

        {/* CENTRO - TÍTULO */}
        <div className="heroCenter">

          <img
            src={logoDouradaPng}
            alt="Victor Araujo"
            className="heroLogoDourada"
          />

          <span className="heroSince"></span>

          <span
            className="sectionHeaderCentralize"
            id="inicialSection"
          >
            <span className="line" />
            <span className="sectionTag">DESDE 2020</span>
            <span className="line" />
          </span>

          <h1 className="heroTitle">
            VICTOR ARAUJO

            <p className="heroSubtitle">
              SOCIEDADE INDIVIDUAL DE ADVOCACIA
            </p>

            <div
              className="titleDividerCentralize"
              id="titleDividerCentralizeSection"
            />
          </h1>

          <div className="heroActions">

            <button
              type="button"
              className="primaryBtn"
              id="agendarReuniaoButton"
              onClick={() =>
                window.open(CONTACT_WHATSAPP_URL, '_blank')
              }
            >
              AGENDAR REUNIÃO

              <FaWhatsapp />
            </button>


            <button
              className="primaryBtn"
              type="button"
              onClick={() => scrollToId('escritorio')}
            >
              ÁREAS DE ATUAÇÃO

              <HiArrowRight className="buttonArrowIcon" />
            </button>

          </div>
        </div>

        {/* DIREITA - VITOR */}
        <div className="heroRight">
          <img
            src={vitorPng}
            alt="Victor Araujo"
            className="vitorImg"
          />
        </div>

      </div>
    </section>
  );
}