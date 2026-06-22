// Navbar.tsx
import { useState } from 'react';
import logoDouradaPng from '../../assets/logoDourada.png';
import './Navbar.css';
type NavItem = {
  id: string;
  label: string;
};

type NavbarProps = {
  nav: NavItem[];
  scrollToId: (id: string) => void;
};

export default function Navbar({
  nav,
  scrollToId,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="siteHeader">
      <div className="container siteHeaderInner">

        {/* LOGO */}
        <div
          className="brand"
          role="banner"
          aria-label="Victor Araujo Sociedade Individual de Advocacia"
        >
          <img
            src={logoDouradaPng}
            alt="Logo"
            className="brandLogo"
          />
        </div>

        {/* DESKTOP NAV */}
        <nav className="navDesktop" aria-label="Navegação principal">
          {nav.map((item) => (
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

        {/* CTA */}
        <div className="navDesktopRight">
          <button
            type="button"
            className="consultoriaBtn"
            onClick={() => scrollToId('formulario-contato')}
          >
            Contatos

          </button>
        </div>

        {/* MOBILE BUTTON */}
        <button
          type="button"
          className="mobileToggle"
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div
          className="mobileMenu"
          role="dialog"
          aria-label="Menu mobile"
        >
          <div className="container mobileMenuInner">
            {nav.map((item) => (
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
              CONTATOS
            </button>
          </div>
        </div>
      )}
    </header>
  );
}