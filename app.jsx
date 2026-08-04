const { useState, useEffect, useRef, useMemo, useCallback, Fragment } = React;

// ---------- Header ----------
function Header({ lang, setLang, t, dark, onToggleDark }) {
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
          aria-label={dark ? t.ui.themeToLight : t.ui.themeToDark}
          aria-pressed={dark}
          data-cursor="hover"
        >
          {dark ? "☀" : "☾"}
        </button>
        <button className="lang-toggle" onClick={() => setLang(lang === "pt" ? "en" : "pt")} aria-label={t.ui.langToggle}>
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

      <div className="hero-cta" data-reveal style={{"--d":"340ms"}}>
        <a className="btn btn-primary" href="#work" data-cursor="hover">
          {t.hero.ctaWork}
        </a>
        <a className="btn btn-ghost" href="#contact" data-cursor="hover">
          {t.hero.ctaContact}
        </a>
      </div>

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
// Bloco de lista do case study — só renderiza se a seção existir naquele idioma.
function StudyBlock({ label, items }) {
  if (!items || !items.length) return null;
  return (
    <div className="study-block">
      <div className="study-label">{label}</div>
      <ul className="study-list">
        {items.map((line, i) => <li key={i}>{line}</li>)}
      </ul>
    </div>
  );
}

const ArrowOut = () => (
  <svg width="14" height="14" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path d="M7 21 L21 7 M11 7 H21 V17" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
  </svg>
);

function ProjectRow({ p, lang, t, i, open, onToggle }) {
  const title = typeof p.title === "string" ? p.title : p.title[lang];
  const study = p.study;
  const panelId = "case-" + p.id;
  const links = p.links || [];
  const Diagram = p.diagram && window.DIAGRAMS ? window.DIAGRAMS[p.diagram] : null;
  const [copied, setCopied] = useState(false);

  // Copia a URL absoluta do case, para colar numa candidatura ou mensagem.
  const copyLink = () => {
    const url = location.origin + location.pathname + location.search + "#" + CASE_HASH + p.id;
    try {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (e) { /* clipboard bloqueado — o link continua na barra de endereço */ }
  };

  return (
    // O estado aberto vai num atributo próprio, não no className: useReveal
    // adiciona "is-revealed" com classList.add, e o className aqui é do React —
    // montar a classe com o estado faria cada clique reescrever o atributo
    // class inteiro e apagar o is-revealed, deixando a linha em opacity 0.
    <article
      id={"project-" + p.id}
      className={"project-row swatch-" + p.swatch}
      data-open={open ? "" : undefined}
      data-reveal
      style={{"--d": (i*40) + "ms"}}
    >
      <button
        type="button"
        className="project-head"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        data-cursor="hover"
      >
        <span className="project-n">{p.n}</span>
        <span className="project-main">
          <span className="project-title-row">
            <span className="project-title">{title}</span>
            <span className="project-year">{p.year}</span>
          </span>
          <span className="project-meta">
            <span>{p.type[lang]}</span>
            <span className="meta-dot">·</span>
            <span>{p.role[lang]}</span>
            <span className="meta-dot">·</span>
            <span className="project-metric">{p.metric[lang]}</span>
          </span>
          <span className="project-blurb">{p.blurb[lang]}</span>
          <span className="project-tags">
            {p.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
          </span>
        </span>
        <span className="project-toggle">
          <span className="project-toggle-text">{open ? t.project.close : t.project.open}</span>
          <span className="project-toggle-icon" aria-hidden="true"></span>
        </span>
      </button>

      <div className="project-detail" id={panelId} hidden={!open}>
        <div className="project-detail-inner">
          {Diagram && (
            <div className="study-block study-diagram">
              <div className="study-label">{t.project.architecture}</div>
              <div className="diagram-frame">
                <Diagram lang={lang} />
              </div>
            </div>
          )}
          {study && study.problem && (
            <div className="study-block">
              <div className="study-label">{t.project.problem}</div>
              <p className="study-problem">{study.problem[lang]}</p>
            </div>
          )}
          {study && study.build && <StudyBlock label={t.project.build} items={study.build[lang]} />}
          {study && study.decisions && <StudyBlock label={t.project.decisions} items={study.decisions[lang]} />}
          {study && study.status && (
            <div className="study-block">
              <div className="study-label">{t.project.status}</div>
              <p className="study-status">{study.status[lang]}</p>
            </div>
          )}
          <div className="study-links">
            {links.map((l) => (
              <a
                className={"study-link is-" + l.kind}
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
              >
                {l.label[lang]}
                <ArrowOut />
              </a>
            ))}
            {p.privateRepo && <span className="study-private">{t.project.privateCode}</span>}
            <button type="button" className="study-copy" onClick={copyLink} data-cursor="hover">
              {copied ? t.project.linkCopied : t.project.copyLink}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

// Prefixo do deep link de case study: #case/fluxo. Só hashes com este prefixo
// são interpretados como case — #work, #about e o resto da nav seguem intactos.
const CASE_HASH = "case/";

function caseFromHash() {
  const h = decodeURIComponent(location.hash.replace(/^#/, ""));
  if (!h.startsWith(CASE_HASH)) return null;
  const id = h.slice(CASE_HASH.length);
  return PROJECTS.some((p) => p.id === id) ? id : null;
}

function Work({ t, lang }) {
  // O case aberto mora na URL, não só em memória: dá para mandar o link do
  // Fluxo numa candidatura, o F5 reabre no mesmo lugar e o Google enxerga.
  const [openId, setOpenId] = useState(caseFromHash);

  // Colar uma URL com #case/... ou usar voltar/avançar reabre o case certo.
  useEffect(() => {
    const onHash = () => setOpenId(caseFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Chegou por link direto: rola até a linha depois do primeiro paint.
  useEffect(() => {
    const id = caseFromHash();
    if (!id) return;
    const el = document.getElementById("project-" + id);
    if (el) requestAnimationFrame(() => el.scrollIntoView({ block: "start" }));
  }, []);

  // replaceState, não pushState: a nav do site já usa âncoras (#work, #about),
  // e empilhar cada abre/fecha faria o botão voltar percorrer cliques de
  // acordeão em vez de devolver o visitante para a página anterior.
  const toggle = (id) => {
    const next = openId === id ? null : id;
    setOpenId(next);
    history.replaceState(null, "", next ? "#" + CASE_HASH + next : "#work");
  };

  const selected = PROJECTS.filter((p) => p.tier !== "earlier");
  const earlier = PROJECTS.filter((p) => p.tier === "earlier");

  const rows = (list, offset) => list.map((p, i) => (
    <ProjectRow
      key={p.id}
      p={p}
      lang={lang}
      t={t}
      i={i + offset}
      open={openId === p.id}
      onToggle={() => toggle(p.id)}
    />
  ));

  return (
    <section id="work" className="section work">
      <SectionHead idx="01" title={t.sections.selected} sub={t.sections.selectedSub} />
      <div className="project-list">{rows(selected, 0)}</div>

      <div className="project-list is-earlier">
        <div className="earlier-head" data-reveal>
          <h3 className="earlier-title">{t.sections.earlier}</h3>
          <p className="earlier-sub">{t.sections.earlierSub}</p>
        </div>
        {rows(earlier, selected.length)}
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
            <img className="photo-img" src="assets/kayo.webp" alt="Kayo Santos" width="900" height="1600" loading="lazy" />
            <div className="photo-caption">{t.ui.photoCaption}</div>
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
  const locale = lang === "pt" ? "pt-BR" : "en-US";
  // Data real da última revisão do conteúdo, vinda de data.jsx. Era new Date(),
  // que fazia a página alegar "atualizado agora" a cada visita — um relógio
  // não diz nada sobre quando o texto mudou pela última vez.
  const updated = new Date(t.updatedAt + "T12:00:00");
  const dateFmt = updated.toLocaleDateString(locale, { day: "2-digit", month: "short", year: "numeric" });
  const bars = Array.from({ length: 24 });
  return (
    <section id="now" className="section now">
      <SectionHead idx="04" title={t.sections.now} sub={t.sections.nowSub} />
      <div className="now-grid">
        <div className="now-status" data-reveal>
          <div className="now-label">{t.ui.statusLabel}</div>
          <h3 className="now-status-title">{t.now.status}</h3>
          <p className="now-status-sub">{t.now.statusSub}</p>
          <div className="now-tags">
            {(t.now.statusTags || []).map((tag) => <span className="tag" key={tag}>{tag}</span>)}
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
          <p>{t.now.updated}: {dateFmt}</p>
        </div>
      </div>
    </section>
  );
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

// Idioma inicial, na ordem: link compartilhado (?lang=) > escolha salva >
// idioma do navegador > português. O ?lang= vem primeiro de propósito: quem
// abre um link em inglês tem que ver inglês, mesmo tendo escolhido PT antes.
function getInitialLang() {
  const fromUrl = new URLSearchParams(location.search).get("lang");
  if (fromUrl === "pt" || fromUrl === "en") return fromUrl;
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "pt" || saved === "en") return saved;
  } catch (e) { /* localStorage bloqueado — ignora */ }
  return (navigator.language || "").toLowerCase().startsWith("pt") ? "pt" : "en";
}

// Substitui o useTweaks do tweaks-panel.jsx, que é ferramenta de autoria e não
// entra no bundle de produção (build.mjs). Mesma API: [valores, setValor].
function useTweaks(defaults) {
  const [values, setValues] = useState(defaults);
  const setTweak = useCallback((key, val) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  }, []);
  return [values, setTweak];
}

function App() {
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "palette": "ink",
    "dark": false
  }/*EDITMODE-END*/;

  const [lang, setLang] = useState(getInitialLang);
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

  // O idioma precisa existir em três lugares além do estado do React:
  // no <html lang> (senão o leitor de tela lê inglês com fonética portuguesa),
  // na URL (senão a versão em inglês não é linkável nem indexável) e no
  // localStorage (senão volta para PT a cada reload).
  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    try { localStorage.setItem("lang", lang); } catch (e) { /* ignora */ }

    const url = new URL(location.href);
    if (lang === "pt") url.searchParams.delete("lang");
    else url.searchParams.set("lang", lang);
    history.replaceState(null, "", url.pathname + url.search + url.hash);
  }, [lang]);

  useReveal();
  useLightsaberFavicon();
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
        {konamiOn && <KonamiOverlay onClose={() => setKonamiOn(false)} t={t} />}
        {jediOn && <JediOverlay onClose={() => setJediOn(false)} lang={lang} t={t} />}
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

      {/* Ferramenta de autoria: só existe no bundle de dev (npm run dev).
          Em produção `TweaksPanel` é undefined e nada disto é montado. */}
      {typeof TweaksPanel !== "undefined" && (
      <TweaksPanel title="Tweaks" defaultOpen={false}>
        <TweakSection label="Theme">
          <TweakToggle label="Dark mode" value={tweaks.dark} onChange={(v) => setTweak("dark", v)} />
        </TweakSection>
        <TweakSection label="Palette">
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
      )}
    </Fragment>
  );
}

function KonamiOverlay({ onClose, t }) {
  return (
    <div className="konami-overlay" onClick={onClose}>
      <div className="konami-card">
        <div className="konami-eyebrow">↑↑↓↓←→←→ B A</div>
        <h3>{t.ui.konamiTitle}</h3>
        <p>{t.ui.konamiBody}</p>
        <div className="konami-confetti">
          {Array.from({ length: 28 }).map((_, i) => (
            <span key={i} className="confetti" style={{"--i": i, "--n": 28}}></span>
          ))}
        </div>
      </div>
    </div>
  );
}

function JediOverlay({ onClose, lang, t }) {
  const text = lang === "pt"
    ? ["Episódio MMXXVI", "KAYO SANTOS", "",
       "Há muito tempo, numa galáxia de monorepos",
       "muito muito distante...",
       "",
       "Um desenvolvedor descobre que a Força",
       "não mora no framework, e sim no processo.",
       "Entre deploys e migrations nascem o Fluxo",
       "e a Aura Educacional — plataformas capazes",
       "de iluminar a galáxia.",
       "",
       "Que a Força esteja com seus deploys."]
    : ["Episode MMXXVI", "KAYO SANTOS", "",
       "A long time ago, in a galaxy of monorepos",
       "far, far away...",
       "",
       "A developer discovers the Force does not",
       "live in the framework, but in the process.",
       "Between deploys and migrations come Fluxo",
       "and Aura Educacional — platforms bright",
       "enough to light up the galaxy.",
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
      <div className="jedi-hint">{t.ui.jediHint}</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
