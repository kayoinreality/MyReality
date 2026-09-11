const { useState, useEffect, useRef, useCallback } = React;

const EMAIL = "kayorodrigodzn@gmail.com";
const ALL_PROJECTS = [DELIVERY_CASE, ...PROJECTS];
const FEATURED_PROJECT_IDS = ["fluxo", "aura", "judicial"];
const VIEWS = ["home", "about", "resume", "projects", "services"];
const THEMES = ["dark", "light"];
const THEME_COLORS = { dark: "#050505", light: "#f6f2ef" };
const PROJECT_PREVIEWS = {
  fluxo: {
    src: "assets/projects/fluxo.webp",
    alt: "Página inicial do Fluxo, aplicativo de planejamento financeiro",
    domain: "fluxo.finance",
    href: "https://fluxo.finance/"
  },
  aura: {
    src: "assets/projects/aura.webp",
    alt: "Tela de acesso da plataforma Aura Educacional",
    domain: "auraeducacional.app",
    href: "https://auraeducacional.app/login"
  },
  judicial: {
    src: "assets/projects/judicial.webp",
    alt: "Página inicial do site de Administração Judicial",
    domain: "GitHub Pages · site entregue",
    href: "https://kayoinreality.github.io/Adminstra-o-Judicial/"
  }
};
const PROJECT_LINKS = {
  fluxo: [{ kind: "live", href: PROJECT_PREVIEWS.fluxo.href }],
  aura: [{ kind: "live", href: PROJECT_PREVIEWS.aura.href }],
  judicial: [
    { kind: "live", href: PROJECT_PREVIEWS.judicial.href },
    { kind: "repo", href: "https://github.com/kayoinreality/Adminstra-o-Judicial" }
  ]
};

const Arrow = ({ left = false }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    style={left ? { transform: "rotate(180deg)" } : undefined}
  >
    <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const Sun = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M12 2.7v2.5M12 18.8v2.5M2.7 12h2.5M18.8 12h2.5M5.4 5.4l1.8 1.8M16.8 16.8l1.8 1.8M18.6 5.4l-1.8 1.8M7.2 16.8l-1.8 1.8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const Moon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M20.2 14.6A8.4 8.4 0 0 1 9.4 3.8a8.4 8.4 0 1 0 10.8 10.8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const Out = () => <span aria-hidden="true">↗</span>;
const projectTitle = (project) =>
  typeof project.title === "string" ? project.title : project.title.pt;
const projectById = (id) => ALL_PROJECTS.find((project) => project.id === id);

function readStoredTheme() {
  try {
    const stored = localStorage.getItem("theme");
    return THEMES.includes(stored) ? stored : null;
  } catch {
    return null;
  }
}

function readTheme() {
  const stored = readStoredTheme();
  if (stored) return stored;
  const applied = document.documentElement.dataset.theme;
  if (THEMES.includes(applied)) return applied;
  return matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

// Só grava quando alguém clica no botão: sem escolha salva, a página continua
// acompanhando o sistema operacional em vez de congelar no tema da primeira visita.
function storeTheme(theme) {
  try {
    localStorage.setItem("theme", theme);
  } catch {
    /* modo privado sem storage: a escolha vale só para esta visita. */
  }
}

function readRoute() {
  const url = new URL(location.href);
  const requested = url.searchParams.get("view");
  let view = VIEWS.includes(requested) ? requested : "home";
  const legacyPath = url.searchParams.get("caminho");

  if (!requested && legacyPath === "contratacao") view = "resume";
  if (!requested && legacyPath === "servicos") view = "services";

  const profile = url.searchParams.get("perfil") === "logistica"
    ? "logistica"
    : "desenvolvimento";
  const requestedService = url.searchParams.get("servico");
  const service = Object.hasOwn(SERVICES, requestedService)
    ? requestedService
    : "sites";
  const caseId = url.hash.startsWith("#case/") ? url.hash.slice(6) : null;
  const project = FEATURED_PROJECT_IDS.includes(caseId) ? caseId : null;

  if (project) view = "projects";
  return { view, profile, service, project };
}

function routeHref(view, route = {}) {
  const url = new URL(location.href);
  url.searchParams.delete("caminho");
  url.searchParams.delete("view");
  url.searchParams.delete("perfil");
  url.searchParams.delete("servico");
  url.hash = "";

  if (view !== "home") url.searchParams.set("view", view);
  if (view === "resume") url.searchParams.set("perfil", route.profile || "desenvolvimento");
  if (view === "services") url.searchParams.set("servico", route.service || "sites");
  if (route.project) url.hash = "case/" + route.project;
  return url.pathname + url.search + url.hash;
}

function PageIntro({ index, eyebrow, title, body }) {
  return (
    <div className="page-intro">
      <div className="page-kicker"><span>{index}</span>{eyebrow}</div>
      <h1>{title}</h1>
      {body && <p>{body}</p>}
    </div>
  );
}

function Header({ route, navigate, menu, setMenu, openContact, theme, toggleTheme }) {
  const items = [
    ["about", "Sobre"],
    ["resume", "Currículo"],
    ["projects", "Projetos"],
    ["services", "Serviços"]
  ];

  return (
    <header className="site-header">
      <a
        className="brand"
        href={routeHref("home")}
        onClick={(event) => { event.preventDefault(); navigate("home"); }}
        aria-label="Kayo Santos — início"
      >
        <span className="brand-mark">K</span>
        <span>kayo<span className="red">.</span>dev</span>
      </a>
      <nav className={menu ? "main-nav is-open" : "main-nav"} aria-label="Navegação principal">
        {items.map(([view, label]) => (
          <a
            key={view}
            className={route.view === view ? "is-active" : ""}
            href={routeHref(view, route)}
            onClick={(event) => {
              event.preventDefault();
              setMenu(false);
              navigate(view);
            }}
          >
            {label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <span className="availability"><i /> aberto a projetos</span>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-pressed={theme === "light"}
          aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
          title={theme === "dark" ? "Modo claro" : "Modo escuro"}
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </button>
        <button className="contact-trigger" onClick={openContact}>Contato <Out /></button>
        <button
          className="menu-trigger"
          onClick={() => setMenu(!menu)}
          aria-expanded={menu}
          aria-label="Abrir menu"
        >
          {menu ? "Fechar" : "Menu"}
        </button>
      </div>
    </header>
  );
}

function HomeView({ navigate }) {
  const choices = [
    { view: "about", index: "01", title: "Sobre mim", copy: "Quem eu sou e como penso produto, operação e design." },
    { view: "resume", index: "02", title: "Currículo", copy: "Experiência em desenvolvimento de software e logística." },
    { view: "projects", index: "03", title: "Projetos", copy: "Fluxo, Aura Educacional e trabalho entregue para cliente." },
    { view: "services", index: "04", title: "Serviços", copy: "Sites, aplicações, automação e dados para negócios reais." }
  ];

  return (
    <section className="portal" aria-labelledby="portal-title">
      <div className="halftone" aria-hidden="true" />
      <div className="portal-topline"><span>PORTFÓLIO · 2026</span><span>GOIÂNIA, BR</span></div>
      <div className="portal-copy">
        <p className="portal-role">DESENVOLVEDOR FULL-STACK · ANALISTA DE LOGÍSTICA · DESIGNER</p>
        <h1 id="portal-title">Kayo<br />Santos<span>.</span></h1>
        <p className="portal-prompt">Por onde você quer começar?</p>
      </div>
      <div className="portal-choices">
        {choices.map((choice) => (
          <a
            key={choice.view}
            className="portal-choice"
            href={routeHref(choice.view)}
            onClick={(event) => { event.preventDefault(); navigate(choice.view); }}
          >
            <span className="choice-index">{choice.index}</span>
            <span className="choice-copy"><strong>{choice.title}</strong><small>{choice.copy}</small></span>
            <Arrow />
          </a>
        ))}
      </div>
    </section>
  );
}

function AboutView({ navigate }) {
  return (
    <section className="view-shell about-view" aria-labelledby="about-title">
      <PageIntro
        index="01"
        eyebrow="SOBRE MIM"
        title={<>Eu entendo o problema.<br /><em>Depois construo.</em></>}
        body="Software, operação e design não são três histórias separadas. São as ferramentas que uso para transformar uma rotina confusa em algo claro, útil e confiável."
      />
      <div className="about-grid">
        <figure className="portrait-panel">
          <img src="assets/kayo.webp" alt="Kayo Santos" width="680" height="850" />
          <figcaption>KAYO SANTOS · GOIÂNIA, GO</figcaption>
        </figure>
        <div className="about-copy">
          <p>{STRINGS.pt.about.p1}</p>
          <p>{STRINGS.pt.about.p2}</p>
          <p>{STRINGS.pt.about.p3}</p>
          <p className="personal-line">Também sou músico e designer gráfico. Talvez por isso eu me importe tanto com ritmo, hierarquia e com a sensação de usar aquilo que construo.</p>
        </div>
        <aside className="about-facts">
          <div><span>BASE</span><strong>Goiânia, GO</strong></div>
          <div><span>FORMAÇÃO</span><strong>ADS · PUC Goiás</strong></div>
          <div><span>FOCO</span><strong>Produtos e sistemas reais</strong></div>
          <div><span>STACK</span><strong>TypeScript · Next.js · Flutter · Python</strong></div>
        </aside>
      </div>
      <div className="next-actions">
        <button onClick={() => navigate("resume")}>Ver currículo <Arrow /></button>
        <button onClick={() => navigate("projects")}>Explorar projetos <Arrow /></button>
      </div>
    </section>
  );
}

function ResumeView({ route, selectProfile, navigate, openContact }) {
  const profile = PROFILES[route.profile];
  return (
    <section className="view-shell resume-view" aria-labelledby="resume-title">
      <PageIntro
        index="02"
        eyebrow="CURRÍCULO"
        title={<>Duas frentes.<br /><em>Uma forma de trabalhar.</em></>}
        body="Escolha o perfil mais próximo da oportunidade. A experiência muda; a capacidade de entender o contexto e entregar uma solução permanece."
      />
      <div className="segment-control" role="group" aria-label="Selecionar perfil do currículo">
        {Object.entries(PROFILES).map(([key, item]) => (
          <button
            key={key}
            aria-pressed={route.profile === key}
            onClick={() => selectProfile(key)}
          >
            <span>{key === "desenvolvimento" ? "01" : "02"}</span>{item.label}
          </button>
        ))}
      </div>
      <div className="resume-sheet" id="print-resume">
        <div className="resume-heading">
          <div><span className="micro-label">PERFIL SELECIONADO</span><h2>{profile.role}</h2></div>
          <div className="resume-heading-actions">
            <button onClick={() => window.print()}>Imprimir / salvar em PDF <Out /></button>
            <button className="solid-button" onClick={openContact}>Falar sobre uma vaga <Arrow /></button>
          </div>
        </div>
        <div className="resume-summary">
          <div><h3>{profile.title}</h3><p>{profile.intro}</p></div>
          <ul>{profile.strengths.map((strength, index) => <li key={strength}><span>0{index + 1}</span>{strength}</li>)}</ul>
        </div>
        <div className="resume-body">
          <div className="resume-stack"><span className="micro-label">COMPETÊNCIAS</span><div>{profile.stack.map((item) => <span key={item}>{item}</span>)}</div></div>
          <div className="timeline"><span className="micro-label">EXPERIÊNCIA & FORMAÇÃO</span>{profile.experience.map((item) => (
            <article key={item.title}>
              <time>{item.date}</time>
              <div><h3>{item.title}</h3><strong>{item.company}</strong><p>{item.text}</p></div>
            </article>
          ))}</div>
        </div>
      </div>
      <div className="next-actions"><button onClick={() => navigate("projects")}>Ver o que construí <Arrow /></button></div>
    </section>
  );
}

function ProjectSlide({ project, index, active, openProject }) {
  const note = PROJECT_NOTES[project.id];
  const preview = PROJECT_PREVIEWS[project.id];
  return (
    <article
      id={"project-slide-" + project.id}
      className={"project-slide project-" + project.id + (active ? " is-active" : "")}
      aria-current={active ? "true" : undefined}
    >
      <button onClick={() => openProject(project.id)} aria-label={"Explorar projeto " + projectTitle(project)}>
        <span className="project-preview">
          <img
            src={preview.src}
            alt={preview.alt}
            width="1200"
            height="824"
            loading={index === 0 ? "eager" : "lazy"}
          />
          <span className="preview-browser" aria-hidden="true">
            <span><i /><i /><i /></span>
            <small>{preview.domain}</small>
          </span>
          <span className="preview-index" aria-hidden="true">0{index + 1}</span>
        </span>
        <span className="project-slide-body">
          <span className="micro-label">{note.label}</span>
          <strong>{projectTitle(project)}</strong>
          <small>{note.blurb}</small>
          <span className="project-slide-foot"><span>{project.year}</span><span>ABRIR CASE <Arrow /></span></span>
        </span>
      </button>
    </article>
  );
}

function ProjectsView({ openProject }) {
  const wheel = useRef(null);
  const scrollFrame = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const projects = FEATURED_PROJECT_IDS.map(projectById);
  const goTo = useCallback((index) => {
    const next = Math.max(0, Math.min(projects.length - 1, index));
    const container = wheel.current;
    const item = container?.children[next];
    if (!container || !item) return;
    const top = item.offsetTop - (container.clientHeight - item.clientHeight) / 2;
    container.scrollTo({ top, behavior: "smooth" });
    setActiveIndex(next);
  }, [projects.length]);
  const syncActive = () => {
    cancelAnimationFrame(scrollFrame.current);
    scrollFrame.current = requestAnimationFrame(() => {
      const container = wheel.current;
      if (!container) return;
      const middle = container.scrollTop + container.clientHeight / 2;
      const items = Array.from(container.children);
      const closest = items.reduce((best, item, index) => {
        const distance = Math.abs(item.offsetTop + item.clientHeight / 2 - middle);
        return distance < best.distance ? { index, distance } : best;
      }, { index: 0, distance: Infinity });
      setActiveIndex(closest.index);
    });
  };
  useEffect(() => () => cancelAnimationFrame(scrollFrame.current), []);

  return (
    <section className="view-shell projects-view" aria-labelledby="projects-title">
      <PageIntro
        index="03"
        eyebrow="PROJETOS SELECIONADOS"
        title={<>Três produtos.<br /><em>Três problemas reais.</em></>}
        body="Gire a galeria vertical e abra qualquer case. As prévias vêm das interfaces reais; a história, as decisões e a arquitetura continuam aqui dentro."
      />
      <div className="project-wheel-frame">
        <div
          className="project-wheel"
          ref={wheel}
          tabIndex="0"
          role="region"
          aria-roledescription="galeria em roleta"
          aria-label="Galeria vertical de projetos"
          onScroll={syncActive}
          onKeyDown={(event) => {
            if (event.key === "ArrowUp") { event.preventDefault(); goTo(activeIndex - 1); }
            if (event.key === "ArrowDown") { event.preventDefault(); goTo(activeIndex + 1); }
          }}
        >
          {projects.map((project, index) => (
            <ProjectSlide
              key={project.id}
              project={project}
              index={index}
              active={activeIndex === index}
              openProject={openProject}
            />
          ))}
        </div>
        <aside className="wheel-controls" aria-label="Controles da galeria">
          <span className="wheel-counter" aria-live="polite"><strong>0{activeIndex + 1}</strong> / 0{projects.length}</span>
          <div className="wheel-dots">
            {projects.map((project, index) => (
              <button
                key={project.id}
                className={activeIndex === index ? "is-active" : ""}
                onClick={() => goTo(index)}
                aria-label={"Mostrar " + projectTitle(project)}
                aria-pressed={activeIndex === index}
              ><span /></button>
            ))}
          </div>
          <div className="wheel-arrows">
            <button onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Projeto anterior">↑</button>
            <button onClick={() => goTo(activeIndex + 1)} disabled={activeIndex === projects.length - 1} aria-label="Próximo projeto">↓</button>
          </div>
          <small>ROLE<br />VERTICAL</small>
        </aside>
      </div>
      <p className="projects-note">Fluxo e Administração Judicial usam capturas das páginas públicas. A Aura mostra a interface pública de acesso, sem depender do domínio institucional.</p>
    </section>
  );
}

function ServicesView({ route, selectService, openProject, openContact }) {
  const service = SERVICES[route.service];
  return (
    <section className="view-shell services-view" aria-labelledby="services-title">
      <PageIntro
        index="04"
        eyebrow="SERVIÇOS"
        title={<>Do problema à<br /><em>primeira versão útil.</em></>}
        body="Um escopo claro, uma entrega que pode ser validada e tecnologia proporcional ao que o negócio realmente precisa."
      />
      <div className="service-layout">
        <div className="service-list" role="group" aria-label="Selecionar serviço">
          {Object.entries(SERVICES).map(([key, item]) => (
            <button key={key} aria-pressed={route.service === key} onClick={() => selectService(key)}>
              <span>{item.number}</span><strong>{item.label}</strong><Arrow />
            </button>
          ))}
        </div>
        <article className="service-detail">
          <span className="micro-label">SERVIÇO SELECIONADO</span>
          <h2>{service.title}</h2>
          <p>{service.intro}</p>
          <div className="service-delivery"><span>O QUE PODEMOS CONSTRUIR</span><strong>{service.output}</strong></div>
          <div className="service-scope"><span>COMO COMEÇAMOS</span><p>{service.scope}</p></div>
          <button className="solid-button" onClick={openContact}>Conversar sobre este serviço <Arrow /></button>
        </article>
      </div>
      <div className="related-work">
        <span className="micro-label">TRABALHOS RELACIONADOS</span>
        <div>{service.projects.filter((id) => FEATURED_PROJECT_IDS.includes(id)).map((id) => (
          <button key={id} onClick={() => openProject(id)}>{projectTitle(projectById(id))} <Out /></button>
        ))}</div>
      </div>
    </section>
  );
}

function ProjectDialog({ project, dialogRef, closeProject }) {
  if (!project) return <dialog ref={dialogRef} />;
  const note = PROJECT_NOTES[project.id];
  const Diagram = project.diagram && window.DIAGRAMS?.[project.diagram];
  const problem = project.study?.problem?.pt;
  const build = project.study?.build?.pt || [];
  const decisions = project.study?.decisions?.pt || [];

  return (
    <dialog
      ref={dialogRef}
      className="project-dialog"
      aria-labelledby={"project-dialog-" + project.id}
      onClose={closeProject}
      onClick={(event) => { if (event.target === event.currentTarget) event.currentTarget.close(); }}
    >
      <button className="dialog-close" onClick={() => dialogRef.current?.close()} aria-label="Fechar case">Fechar ×</button>
      <div className="dialog-head">
        <span className="micro-label">{note.label}</span>
        <h2 id={"project-dialog-" + project.id}>{projectTitle(project)}<span>.</span></h2>
        <p>{note.blurb}</p>
        <div className="dialog-tags">{project.tags.slice(0, 7).map((tag) => <span key={tag}>{tag}</span>)}</div>
      </div>
      <div className="case-sections">
        <section><span className="micro-label">O DESAFIO</span><p>{problem}</p></section>
        <section><span className="micro-label">MINHA PARTICIPAÇÃO</span><p>{note.role}</p><span className="micro-label second-label">ENTREGA</span><p>{note.result}</p></section>
        <section className="case-build"><span className="micro-label">O QUE CONSTRUÍ</span><ul>{build.map((item) => <li key={item}>{item}</li>)}</ul></section>
        {decisions.length > 0 && <section className="case-build"><span className="micro-label">DECISÕES TÉCNICAS</span><ul>{decisions.map((item) => <li key={item}>{item}</li>)}</ul></section>}
      </div>
      {Diagram && <details className="architecture"><summary>Ver arquitetura técnica <span>+</span></summary><div className="diagram-frame"><Diagram lang="pt" /></div></details>}
      <div className="case-footer">
        <span>{note.proof}</span>
        <div>{(PROJECT_LINKS[project.id] || project.links).map((link) => (
          <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
            {link.kind === "repo" ? "Ver código" : "Visitar projeto"} <Out />
          </a>
        ))}</div>
      </div>
    </dialog>
  );
}

function ContactDialog({ route, dialogRef, closeContact, setNotice }) {
  const isService = route.view === "services";
  const profile = PROFILES[route.profile];
  const service = SERVICES[route.service];
  const [name, setName] = useState("");
  const [context, setContext] = useState("");
  const [deadline, setDeadline] = useState("");
  const subject = isService ? "Projeto · " + service.label : "Conversa · " + profile.label;
  const message = isService
    ? `Olá, Kayo!\n\nTenho interesse em ${service.label.toLowerCase()}.${name.trim() ? "\nNome / empresa: " + name.trim() : ""}${context.trim() ? "\n\nO que preciso resolver:\n" + context.trim() : ""}${deadline.trim() ? "\nPrazo desejado: " + deadline.trim() : ""}\n\nPodemos conversar sobre o escopo?`
    : `Olá, Kayo!${name.trim() ? "\n\nMeu nome / empresa: " + name.trim() : ""}${context.trim() ? "\n\nGostaria de conversar sobre:\n" + context.trim() : ""}\n\nPodemos conversar?`;
  const mailto = "mailto:" + EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(message);
  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setNotice("Mensagem copiada. Cole no seu e-mail para continuar.");
    } catch {
      setNotice("Não foi possível copiar automaticamente.");
    }
  };

  return (
    <dialog ref={dialogRef} className="contact-dialog" aria-labelledby="contact-dialog-title" onClose={closeContact} onClick={(event) => { if (event.target === event.currentTarget) event.currentTarget.close(); }}>
      <button className="dialog-close" onClick={() => dialogRef.current?.close()} aria-label="Fechar contato">Fechar ×</button>
      <span className="micro-label">VAMOS CONVERSAR</span>
      <h2 id="contact-dialog-title">{isService ? "Vamos tirar isso do papel." : "Talvez eu seja a peça que falta."}</h2>
      <p>Você revisa a mensagem e envia pelo seu aplicativo de e-mail. Nada é armazenado nesta página.</p>
      <label htmlFor="contact-name">Seu nome ou empresa <small>(opcional)</small></label>
      <input id="contact-name" value={name} onChange={(event) => setName(event.target.value)} maxLength="120" />
      <label htmlFor="contact-context">{isService ? "O que você precisa resolver?" : "Sobre o que gostaria de conversar?"} <small>(opcional)</small></label>
      <textarea id="contact-context" value={context} onChange={(event) => setContext(event.target.value)} rows="4" maxLength="1800" />
      {isService && <><label htmlFor="contact-deadline">Prazo desejado <small>(opcional)</small></label><input id="contact-deadline" value={deadline} onChange={(event) => setDeadline(event.target.value)} maxLength="80" /></>}
      <a className="solid-button" href={mailto}>Abrir no e-mail <Arrow /></a>
      <button className="copy-button" onClick={copyMessage}>Copiar mensagem</button>
    </dialog>
  );
}

function App() {
  const [route, setRoute] = useState(readRoute);
  const [theme, setTheme] = useState(readTheme);
  const [menu, setMenu] = useState(false);
  const [notice, setNotice] = useState("");
  const [contactOpen, setContactOpen] = useState(false);
  const [egg, setEgg] = useState(false);
  const projectDialog = useRef(null);
  const contactDialog = useRef(null);

  const commitRoute = (next, push = true) => {
    setRoute(next);
    history[push ? "pushState" : "replaceState"](null, "", routeHref(next.view, next));
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const navigate = (view) => commitRoute({ ...route, view, project: null });
  const selectProfile = (profile) => commitRoute({ ...route, view: "resume", profile, project: null }, false);
  const selectService = (service) => commitRoute({ ...route, view: "services", service, project: null }, false);
  const openProject = (project) => commitRoute({ ...route, view: "projects", project });
  const closeProject = useCallback(() => {
    setRoute((current) => {
      if (!current.project) return current;
      const next = { ...current, project: null };
      history.replaceState(null, "", routeHref(next.view, next));
      return next;
    });
  }, []);
  const closeContact = () => setContactOpen(false);
  const openContact = () => setContactOpen(true);
  const toggleTheme = () => setTheme((current) => {
    const next = current === "dark" ? "light" : "dark";
    storeTheme(next);
    return next;
  });

  useEffect(() => {
    const restore = () => setRoute(readRoute());
    addEventListener("popstate", restore);
    addEventListener("hashchange", restore);
    return () => { removeEventListener("popstate", restore); removeEventListener("hashchange", restore); };
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLORS[theme]);
  }, [theme]);
  useEffect(() => {
    const query = matchMedia("(prefers-color-scheme: light)");
    const follow = (event) => { if (!readStoredTheme()) setTheme(event.matches ? "light" : "dark"); };
    query.addEventListener("change", follow);
    return () => query.removeEventListener("change", follow);
  }, []);
  useEffect(() => {
    const titles = { home: "Portfólio", about: "Sobre", resume: "Currículo", projects: "Projetos", services: "Serviços" };
    document.title = "Kayo Santos — " + titles[route.view];
  }, [route.view]);
  useEffect(() => {
    if (route.project && projectDialog.current && !projectDialog.current.open) projectDialog.current.showModal();
    if (!route.project && projectDialog.current?.open) projectDialog.current.close();
  }, [route.project]);
  useEffect(() => {
    if (contactOpen && contactDialog.current && !contactDialog.current.open) contactDialog.current.showModal();
    if (!contactOpen && contactDialog.current?.open) contactDialog.current.close();
  }, [contactOpen]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 4200);
    return () => clearTimeout(timer);
  }, [notice]);
  useKonami(useCallback(() => setEgg((value) => !value), []));

  return (
    <>
      <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
      <Header route={route} navigate={navigate} menu={menu} setMenu={setMenu} openContact={openContact} theme={theme} toggleTheme={toggleTheme} />
      <main id="main-content">
        {route.view === "home" && <HomeView navigate={navigate} />}
        {route.view === "about" && <AboutView navigate={navigate} />}
        {route.view === "resume" && <ResumeView route={route} selectProfile={selectProfile} navigate={navigate} openContact={openContact} />}
        {route.view === "projects" && <ProjectsView openProject={openProject} />}
        {route.view === "services" && <ServicesView route={route} selectService={selectService} openProject={openProject} openContact={openContact} />}
      </main>
      <footer>
        <span>© 2026 Kayo Santos</span>
        <span>{egg ? "A força está nos detalhes. ✦" : "PRODUTO · OPERAÇÃO · DESIGN"}</span>
        <div><a href="https://github.com/kayoinreality" target="_blank" rel="noopener noreferrer">GitHub <Out /></a><a href="https://www.linkedin.com/in/kayo-santos/" target="_blank" rel="noopener noreferrer">LinkedIn <Out /></a></div>
      </footer>
      <ProjectDialog project={projectById(route.project)} dialogRef={projectDialog} closeProject={closeProject} />
      <ContactDialog route={route} dialogRef={contactDialog} closeContact={closeContact} setNotice={setNotice} />
      <div className="status-message" role="status" aria-live="polite">{notice}</div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
