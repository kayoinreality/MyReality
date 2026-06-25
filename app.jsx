const { useState, useEffect, useRef, useMemo, useCallback, Fragment } = React;

// ---------- Header ----------
function Header({ lang, setLang, t, dark, onToggleDark, onTweaks, hasTweaksToggle }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={"site-header " + (scrolled ? "is-scrolled" : "")}>
      <a href="#top" className="brand" data-cursor="hover">
        <span className="brand-mark">K</span>
        <span className="brand-name">kayo<span className="brand-dot">.</span>dev</span>
      </a>
      <nav className="nav">
        <a href="#work">{t.nav.work}</a>
        <a href="#about">{t.nav.about}</a>
        <a href="#experience">{t.nav.experience}</a>
        <a href="#now">{t.nav.now}</a>
        <a href="#contact">{t.nav.contact}</a>
      </nav>
      <div className="header-actions">
        <button
          className="theme-toggle"
          onClick={onToggleDark}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          aria-pressed={dark}
          data-cursor="hover"
        >
          {dark ? "☀" : "☾"}
        </button>
        <button className="lang-toggle" onClick={() => setLang(lang === "pt" ? "en" : "pt")} aria-label="Toggle language">
          <span className={lang === "pt" ? "is-active" : ""}>PT</span>
          <span className="sep">/</span>
          <span className={lang === "en" ? "is-active" : ""}>EN</span>
        </button>
      </div>
    </header>
  );
}

// ---------- Hero ----------
function Hero({ t, lang }) {
  const now = useLiveClock();
  const time = now.toLocaleTimeString(lang === "pt" ? "pt-BR" : "en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
  return (
    <section id="top" className="hero">
      <div className="hero-meta">
        <div className="meta-row">
          <span className="dot pulse"></span>
          <span>{t.hero.available}</span>
        </div>
        <div className="meta-row">
          <span className="meta-key">LOC</span>
          <span>{t.hero.location}</span>
        </div>
        <div className="meta-row">
          <span className="meta-key">LT</span>
          <span>{time}</span>
        </div>
      </div>

      <h1 className="hero-name">
        <span className="line" data-reveal style={{"--d":"0ms"}}>Kayo</span>
        <span className="line" data-reveal style={{"--d":"80ms"}}>Santos<span className="period">.</span></span>
      </h1>

      <p className="hero-role" data-reveal style={{"--d":"180ms"}}>{t.hero.role}</p>

      <p className="hero-lead" data-reveal style={{"--d":"260ms"}}>
        {t.hero.lead1}<em>{t.hero.lead2}</em>
      </p>

      <div className="hero-foot">
        <div className="scroll-indicator">
          <span>{t.hero.scroll}</span>
          <span className="scroll-line" aria-hidden="true"></span>
        </div>
        <div className="hero-index">
          <span>00 — </span>
          <span>{t.nav.work}</span>
        </div>
      </div>
    </section>
  );
}

// ---------- Marquee ----------
function Marquee({ items }) {
  const row = items.concat(items);
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((s, i) => (
          <span className="marquee-item" key={i}>{s}<span className="marquee-sep">✦</span></span>
        ))}
      </div>
    </div>
  );
}

// ---------- Section header ----------
function SectionHead({ idx, title, sub }) {
  return (
    <div className="section-head">
      <div className="section-idx">{idx}</div>
      <div>
        <h2 className="section-title" data-reveal>{title}</h2>
        {sub && <p className="section-sub" data-reveal style={{"--d":"60ms"}}>{sub}</p>}
      </div>
    </div>
  );
}

// ---------- Work / Projects ----------
function ProjectRow({ p, lang, i }) {
  const [hover, setHover] = useState(false);
  const title = typeof p.title === "string" ? p.title : p.title[lang];
  const type = p.type[lang];
  const role = p.role[lang];
  const blurb = p.blurb[lang];
  const metric = p.metric[lang];
  return (
    <a
      className={"project-row swatch-" + p.swatch}
      href={p.href}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-cursor="hover"
      data-reveal
      style={{"--d": (i*40) + "ms"}}
    >
      <div className="project-n">{p.n}</div>
      <div className="project-main">
        <div className="project-title-row">
          <h3 className="project-title">{title}</h3>
          <span className="project-year">{p.year}</span>
        </div>
        <div className="project-meta">
          <span>{type}</span>
          <span className="meta-dot">·</span>
          <span>{role}</span>
          <span className="meta-dot">·</span>
          <span className="project-metric">{metric}</span>
        </div>
        <p className="project-blurb">{blurb}</p>
        <div className="project-tags">
          {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
        </div>
      </div>
      <div className="project-arrow" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M7 21 L21 7 M11 7 H21 V17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square"/>
        </svg>
      </div>
    </a>
  );
}

function Work({ t, lang }) {
  return (
    <section id="work" className="section work">
      <SectionHead idx="01" title={t.sections.selected} sub={t.sections.selectedSub} />
      <div className="project-list">
        {PROJECTS.map((p, i) => <ProjectRow key={p.id} p={p} lang={lang} i={i} />)}
      </div>
    </section>
  );
}

// ---------- About ----------
function About({ t }) {
  return (
    <section id="about" className="section about">
      <SectionHead idx="02" title={t.sections.about} />
      <div className="about-grid">
        <div className="about-text">
          <p data-reveal>{t.about.p1}</p>
          <p data-reveal style={{"--d":"80ms"}}>{t.about.p2}</p>
          <p data-reveal style={{"--d":"160ms"}}>{t.about.p3}</p>
        </div>
        <aside className="about-side">
          <div className="about-photo" data-reveal>
            <img className="photo-img" src="assets/kayo.webp" alt="Kayo" loading="lazy" />
            <div className="photo-caption">photo: kayo</div>
          </div>
          <div className="stack-block" data-reveal style={{"--d":"60ms"}}>
            <div className="stack-label">{t.stack}</div>
            <div className="stack-list">
              {STACK.map((s) => <span className="stack-chip" key={s}>{s}</span>)}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

// ---------- Experience ----------
function Experience({ t }) {
  return (
    <section id="experience" className="section experience">
      <SectionHead idx="03" title={t.sections.experience} />
      <ol className="exp-list">
        {t.experience.map((e, i) => (
          <li className="exp-row" key={i} data-reveal style={{"--d": (i*60) + "ms"}}>
            <div className="exp-period">{e.period}</div>
            <div className="exp-body">
              <h3 className="exp-role">{e.role}</h3>
              <div className="exp-company">{e.company}</div>
              <ul className="exp-bullets">
                {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

// ---------- Now ----------
function Now({ t, lang }) {
  const now = useLiveClock();
  const dateFmt = now.toLocaleDateString(lang === "pt" ? "pt-BR" : "en-US", { day: "2-digit", month: "short", year: "numeric" });
  const timeFmt = now.toLocaleTimeString(lang === "pt" ? "pt-BR" : "en-US", { hour: "2-digit", minute: "2-digit" });
  // Bars for fake spotify visualizer
  const bars = Array.from({ length: 24 });
  return (
    <section id="now" className="section now">
      <SectionHead idx="04" title={t.sections.now} sub={t.sections.nowSub} />
      <div className="now-grid">
        <div className="now-status" data-reveal>
          <div className="now-label">STATUS</div>
          <h3 className="now-status-title">{t.now.status}</h3>
          <p className="now-status-sub">{t.now.statusSub}</p>
          <div className="now-tags">
            <span className="tag">Next.js 15</span>
            <span className="tag">Drizzle</span>
            <span className="tag">Cloud Run</span>
          </div>
        </div>

        <div className="now-spotify" data-reveal style={{"--d":"60ms"}}>
          <div className="now-label">
            <span className="spotify-dot pulse"></span>
            {t.now.listening.toUpperCase()} · SPOTIFY · "REALITY"
          </div>
          <div className="spotify-vis" aria-hidden="true">
            {bars.map((_, i) => (
              <span key={i} className="bar" style={{"--i": i, "--n": bars.length}}></span>
            ))}
          </div>
          <div className="spotify-embed">
            <iframe
              title="Spotify playlist Reality"
              src="https://open.spotify.com/embed/playlist/5qyc4tmVkQ50VJx3RLzd9P?utm_source=generator&theme=0"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy">
            </iframe>
          </div>
        </div>

        <div className="now-card" data-reveal style={{"--d":"120ms"}}>
          <div className="now-label">{t.now.reading.toUpperCase()}</div>
          <p>{t.now.readingValue}</p>
        </div>
        <div className="now-card" data-reveal style={{"--d":"180ms"}}>
          <div className="now-label">{t.now.learning.toUpperCase()}</div>
          <p>{t.now.learningValue}</p>
        </div>
        <div className="now-card now-meta-card" data-reveal style={{"--d":"240ms"}}>
          <div className="now-label">{t.now.location.toUpperCase()}</div>
          <p>{t.now.updated}: {dateFmt} · {timeFmt}</p>
        </div>
      </div>
    </section>
  );
}

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, "0");
  return m + ":" + sec;
}

// ---------- Contact ----------
function Contact({ t }) {
  const [copied, setCopied] = useState(null);
  const copy = (val, id) => {
    navigator.clipboard.writeText(val);
    setCopied(id);
    setTimeout(() => setCopied(null), 1400);
  };
  return (
    <section id="contact" className="section contact">
      <SectionHead idx="05" title={t.sections.contact} sub={t.sections.contactSub} />
      <div className="contact-cta" data-reveal>
        <a className="huge-mail" href="mailto:kayorodrigodzn@gmail.com" data-cursor="hover">
          kayorodrigodzn<span className="at">@</span>gmail.com
        </a>
      </div>
      <div className="contact-rows">
        {SOCIAL.map((s, i) => (
          <div className="contact-row" key={s.id} data-reveal style={{"--d": (i*60) + "ms"}}>
            <span className="contact-label">{s.label}</span>
            <a className="contact-value" href={s.href} target="_blank" rel="noreferrer" data-cursor="hover">{s.value}</a>
            {s.copyable && (
              <button className="copy-btn" onClick={() => copy(s.value, s.id)} data-cursor="hover">
                {copied === s.id ? t.contact.copied : t.contact.copy}
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------- Footer ----------
function Footer({ t }) {
  return (
    <footer className="site-footer">
      <div className="footer-row">
        <div>© 2026 Kayo Santos</div>
        <div className="footer-built">{t.footer.built}</div>
        <div className="footer-tip">{t.footer.konami}</div>
      </div>
      <div className="footer-mark" aria-hidden="true">KAYO</div>
    </footer>
  );
}

// ---------- App ----------
const PALETTES = {
  ink:    { bg: "#FAFAF7", fg: "#0A0A0A", muted: "#6B6B66", line: "#E5E2DA", accent: "#C04A1B" }, // warm orange
  forest: { bg: "#F4F2EC", fg: "#0F1410", muted: "#666B65", line: "#DCDDD3", accent: "#2D6A3E" }, // green
  cobalt: { bg: "#F4F4F0", fg: "#0A0F1A", muted: "#5F6573", line: "#DDDFD8", accent: "#1F4FCF" }, // blue
  mono:   { bg: "#FAFAFA", fg: "#0A0A0A", muted: "#6E6E6E", line: "#E6E6E6", accent: "#0A0A0A" }  // pure b/w
};
const DARK_PALETTES = {
  ink:    { bg: "#0A0A0A", fg: "#F2F0EA", muted: "#8A8880", line: "#1F1E1A", accent: "#E8743A" },
  forest: { bg: "#0C100D", fg: "#EDEEE6", muted: "#878C82", line: "#1C2018", accent: "#5BB073" },
  cobalt: { bg: "#08090E", fg: "#ECECEE", muted: "#7C8294", line: "#171922", accent: "#5C82FF" },
  mono:   { bg: "#0A0A0A", fg: "#FAFAFA", muted: "#9A9A9A", line: "#1F1F1F", accent: "#FAFAFA" }
};

// Decide o tema inicial: 1º a escolha salva do visitante, 2º a preferência
// do sistema operacional (prefers-color-scheme), 3º o default do site.
function getInitialDark(fallback) {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") return true;
    if (saved === "light") return false;
  } catch (e) { /* localStorage bloqueado — ignora */ }
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return true;
  return fallback;
}

function App() {
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "palette": "ink",
    "dark": false
  }/*EDITMODE-END*/;

  const [lang, setLang] = useState("pt");
  // Resolve o tema inicial uma única vez (salvo > sistema > default).
  const initialTweaks = useMemo(
    () => ({ ...TWEAK_DEFAULTS, dark: getInitialDark(TWEAK_DEFAULTS.dark) }),
    []
  );
  const [tweaks, setTweak] = useTweaks(initialTweaks);
  const [konamiOn, setKonamiOn] = useState(false);
  const [jediOn, setJediOn] = useState(false);

  const t = STRINGS[lang];

  // Apply palette + theme to root. useLayoutEffect roda antes do paint,
  // então no primeiro carregamento já aplicamos as cores certas sem flash.
  React.useLayoutEffect(() => {
    const root = document.documentElement;
    const pal = (tweaks.dark ? DARK_PALETTES : PALETTES)[tweaks.palette] || PALETTES.ink;
    root.style.setProperty("--bg", pal.bg);
    root.style.setProperty("--fg", pal.fg);
    root.style.setProperty("--muted", pal.muted);
    root.style.setProperty("--line", pal.line);
    root.style.setProperty("--accent", pal.accent);
    root.dataset.theme = tweaks.dark ? "dark" : "light";
    root.dataset.palette = tweaks.palette;
  }, [tweaks.palette, tweaks.dark]);

  // Lembra a escolha do visitante entre visitas.
  useEffect(() => {
    try { localStorage.setItem("theme", tweaks.dark ? "dark" : "light"); } catch (e) { /* ignora */ }
  }, [tweaks.dark]);

  useReveal();
  useKonami(useCallback(() => {
    setKonamiOn((v) => !v);
  }, []));

  // Star Wars easter egg — type "r2d2", "jedi" or "force"
  useEffect(() => {
    const triggers = ["r2d2", "jedi", "force"];
    let buf = "";
    const onKey = (e) => {
      if (e.key.length !== 1) return;
      buf = (buf + e.key.toLowerCase()).slice(-6);
      if (triggers.some((w) => buf.endsWith(w))) {
        setJediOn((v) => !v);
        buf = "";
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <Fragment>
      <CustomCursor />
      <div className={"app " + (konamiOn ? "konami" : "") + (jediOn ? " jedi" : "")}>
        {konamiOn && <KonamiOverlay onClose={() => setKonamiOn(false)} />}
        {jediOn && <JediOverlay onClose={() => setJediOn(false)} lang={lang} />}
        <Header lang={lang} setLang={setLang} t={t} dark={tweaks.dark} onToggleDark={() => setTweak("dark", !tweaks.dark)} />
        <main>
          <Hero t={t} lang={lang} />
          <Marquee items={STACK} />
          <Work t={t} lang={lang} />
          <About t={t} />
          <Experience t={t} />
          <Now t={t} lang={lang} />
          <Contact t={t} />
        </main>
        <Footer t={t} />
      </div>

      <TweaksPanel title="Tweaks" defaultOpen={false}>
        <TweakSection title="Theme">
          <TweakToggle label="Dark mode" value={tweaks.dark} onChange={(v) => setTweak("dark", v)} />
        </TweakSection>
        <TweakSection title="Palette">
          <TweakSelect
            label="Accent"
            value={tweaks.palette}
            onChange={(v) => setTweak("palette", v)}
            options={[
              { value: "ink", label: "Ink (warm orange)" },
              { value: "forest", label: "Forest (green)" },
              { value: "cobalt", label: "Cobalt (blue)" },
              { value: "mono", label: "Mono (b/w)" }
            ]}
          />
        </TweakSection>
      </TweaksPanel>
    </Fragment>
  );
}

function KonamiOverlay({ onClose }) {
  return (
    <div className="konami-overlay" onClick={onClose}>
      <div className="konami-card">
        <div className="konami-eyebrow">↑↑↓↓←→←→ B A</div>
        <h3>You found it.</h3>
        <p>Easter egg unlocked: tudo agora está em <em>fun mode</em>. Click em qualquer lugar pra fechar.</p>
        <div className="konami-confetti">
          {Array.from({ length: 28 }).map((_, i) => (
            <span key={i} className="confetti" style={{"--i": i, "--n": 28}}></span>
          ))}
        </div>
      </div>
    </div>
  );
}

function JediOverlay({ onClose, lang }) {
  const text = lang === "pt"
    ? ["Episódio MMXXVI", "KAYO SANTOS", "",
       "Há muito tempo, em uma operação de última milha,",
       "muito muito distante...",
       "",
       "Um analista de logística encontra a Força",
       "através do código. Entre dashboards de frota",
       "e KPIs operacionais, ele constrói a Aura",
       "Educacional — uma plataforma capaz de",
       "iluminar a galáxia da educação livre.",
       "",
       "Que a Força esteja com seus deploys."]
    : ["Episode MMXXVI", "KAYO SANTOS", "",
       "A long time ago, in a last-mile operation",
       "far, far away...",
       "",
       "A logistics analyst finds the Force",
       "through code. Between fleet dashboards",
       "and operational KPIs, he builds Aura",
       "Educacional — a platform capable of",
       "lighting up the galaxy of free education.",
       "",
       "May the Force be with your deploys."];
  return (
    <div className="jedi-overlay" onClick={onClose}>
      <div className="jedi-stars" aria-hidden="true">
        {Array.from({ length: 80 }).map((_, i) => (
          <span key={i} className="star" style={{
            "--x": Math.random() * 100 + "%",
            "--y": Math.random() * 100 + "%",
            "--s": (Math.random() * 0.7 + 0.3).toFixed(2),
            "--d": (Math.random() * 3).toFixed(2) + "s"
          }}></span>
        ))}
      </div>
      <div className="jedi-crawl-wrap">
        <div className="jedi-crawl">
          {text.map((line, i) => (
            <p key={i} className={i === 1 ? "jedi-title" : ""}>{line || "\u00A0"}</p>
          ))}
        </div>
      </div>
      <div className="jedi-hint">click anywhere · may the force be with you</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
