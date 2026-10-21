// Marca, cabeçalho, menu mobile, rodapé e alternância de tema.
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useRouter } from "../router.jsx";
import { COMPANY, CASES, whatsappUrl } from "../data.js";
import { lockScroll } from "../scroll.js";

// O símbolo: um horizonte visto através de uma lente.
export function Mark({ size = 22 }) {
  return (
    <svg className="mark" width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="14.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2.16 19.4C8.2 15.4 23.8 15.4 29.84 19.4A14.25 14.25 0 0 1 2.16 19.4Z" fill="currentColor" />
      <circle cx="16" cy="10.6" r="2.4" fill="currentColor" />
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="wordmark">
      <Mark />
      <span className="wordmark__text">reality</span>
    </span>
  );
}

const NAV = [
  { to: "/#casos", label: "Casos" },
  { to: "/sobre", label: "Empresa" },
  { to: "/carreiras", label: "Carreiras" },
  { to: "/blog", label: "Blog" },
  { to: "/status", label: "Status" }
];

function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "dark");
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#03050a" : "#f3f5f9");
    try {
      localStorage.setItem("reality-theme", theme);
    } catch {}
  }, [theme]);
  return [theme, () => setTheme((t) => (t === "dark" ? "light" : "dark"))];
}

function ThemeToggle() {
  const [theme, toggle] = useTheme();
  const next = theme === "dark" ? "claro" : "escuro";
  return (
    <button className="icon-btn" type="button" onClick={toggle} aria-label={`Mudar para o tema ${next}`} title={`Tema ${next}`}>
      {theme === "dark" ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.2 8.2 0 1 0 10.2 10.2Z" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

export function Header() {
  const { path } = useRouter();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Some ao descer, volta ao subir: a navegação não fica ocupando a tela o tempo todo.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 160);
        last = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    lockScroll(open);
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (to) => (to.startsWith("/#") ? false : path === to || path.startsWith(`${to}/`));

  return (
    <>
      <header className={`header${hidden && !open ? " is-hidden" : ""}${scrolled ? " is-scrolled" : ""}`}>
        <div className="header__inner">
          <Link to="/" className="header__brand" aria-label="Reality, página inicial">
            <Wordmark />
          </Link>
          <nav className="header__nav" aria-label="Principal">
            {NAV.map((item) => (
              <Link key={item.to} to={item.to} className="header__link" aria-current={isActive(item.to) ? "page" : undefined}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="header__actions">
            <ThemeToggle />
            <Link to="/#comecar" className="btn btn--primary btn--sm header__cta">
              Iniciar projeto
            </Link>
            <button
              className="icon-btn header__menu"
              type="button"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              onClick={() => setOpen((o) => !o)}
            >
              <span className={`burger${open ? " is-open" : ""}`} aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            className="sheet"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="sheet__nav" aria-label="Menu">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link to={item.to} className="sheet__link" onClick={() => setOpen(false)}>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="sheet__foot">
              <Link to="/#comecar" className="btn btn--primary" onClick={() => setOpen(false)}>
                Iniciar projeto
              </Link>
              <a className="btn btn--ghost" href={whatsappUrl()} target="_blank" rel="noreferrer">
                Falar no WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top container">
        <div className="footer__brand">
          <Wordmark />
          <p>Software sob medida, de {COMPANY.city} para onde a sua operação estiver.</p>
        </div>
        <div className="footer__cols">
          <div>
            <h2 className="footer__title">Casos</h2>
            <ul>
              {CASES.map((c) => (
                <li key={c.slug}>
                  <Link to={`/casos/${c.slug}`}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="footer__title">Empresa</h2>
            <ul>
              <li><Link to="/sobre">Sobre</Link></li>
              <li><Link to="/sobre#proposito">Propósito</Link></li>
              <li><Link to="/carreiras">Carreiras</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="footer__title">Recursos</h2>
            <ul>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/status">Status</Link></li>
              <li><a href={COMPANY.github} target="_blank" rel="noreferrer">GitHub</a></li>
            </ul>
          </div>
          <div>
            <h2 className="footer__title">Contato</h2>
            <ul>
              <li><a href={whatsappUrl()} target="_blank" rel="noreferrer">WhatsApp</a></li>
              <li><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></li>
              <li><a href={COMPANY.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer__bottom container">
        <span>© {new Date().getFullYear()} Reality</span>
        <span className="footer__hint" aria-hidden="true">Continue puxando.</span>
      </div>
    </footer>
  );
}
