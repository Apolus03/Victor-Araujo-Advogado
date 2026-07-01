import { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileOpen]);

  const closeMenu = () => setMobileOpen(false);

  return (
    <header className="siteHeader">
      <div className="container siteHeaderInner">

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

        <div className="navDesktopRight">
          <button
            type="button"
            className="consultoriaBtn"
            onClick={() => scrollToId('formulario-contato')}
          >
            Contatos
          </button>
        </div>

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

      {mobileOpen && (
        <>
          <button
            type="button"
            className="mobileBackdrop"
            aria-label="Fechar menu"
            onClick={closeMenu}
          />

          <div
            className="mobileMenu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu mobile"
          >
            <div className="container mobileMenuInner">
              {nav.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="mobileNavLink"
                  onClick={() => {
                    closeMenu();
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
                  closeMenu();
                  scrollToId('formulario-contato');
                }}
              >
                CONTATOS
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
