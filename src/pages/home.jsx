import React, { useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link, useRouter } from "../router.jsx";
import { CAPABILITIES, CASES, COMPANY, PROCESS, whatsappUrl } from "../data.js";
import { Horizon } from "../components/space.jsx";
import { Scene } from "../components/scenes.jsx";
import { ProjectForm } from "../components/project-form.jsx";
import { reducedMotion, scrollToY } from "../scroll.js";

const ease = [0.22, 1, 0.36, 1];

function Hero() {
  return (
    <section className="hero">
      <Horizon />
      <div className="hero__content container">
        <motion.h1
          className="hero__title"
          initial={reducedMotion ? false : { opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.4, ease, delay: 0.2 }}
        >
          Software
          <br />
          sob medida.
        </motion.h1>
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.7 }}
        >
          <p className="hero__lead">
            A Reality projeta e constrói sistemas próprios para empresas que não cabem em ferramentas prontas. Do primeiro rascunho ao software em produção.
          </p>
          <div className="hero__actions">
            <Link to="/#comecar" className="btn btn--primary">
              Iniciar um projeto
            </Link>
            <Link to="/#casos" className="btn btn--ghost">
              Ver casos
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Trust() {
  return (
    <section className="trust container" aria-labelledby="trust-title">
      <p id="trust-title" className="trust__title">Em produção hoje, construído pela Reality</p>
      <ul className="trust__logos">
        <li>
          <Link to="/casos/fluxo-finance" className="logo logo--fluxo">
            <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
              <rect width="26" height="26" rx="7" fill="currentColor" />
              <path d="M9 18.5V7.5h8M9 13h6" stroke="var(--bg)" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            </svg>
            Fluxo Finance
          </Link>
        </li>
        <li>
          <Link to="/casos/fluxo-academy" className="logo logo--academy">
            <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
              <path d="M13 4L24 9.5 13 15 2 9.5z" fill="currentColor" />
              <path d="M6.5 12.2V17c0 1.8 3 3.5 6.5 3.5s6.5-1.7 6.5-3.5v-4.8" fill="none" stroke="currentColor" strokeWidth="1.8" />
            </svg>
            Fluxo Academy
          </Link>
        </li>
        <li>
          <Link to="/casos/amanda-silvestre" className="logo logo--judicial">
            <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
              <path d="M13 4v17M7 21h12M5 8h16M8 8l-3.2 7h6.4zM18 8l-3.2 7h6.4z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            Amanda Silvestre
          </Link>
        </li>
      </ul>
    </section>
  );
}

function OpenCase({ c, windowRef, children, className = "btn btn--primary" }) {
  const { navigate } = useRouter();
  return (
    <a
      href={`/casos/${c.slug}`}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        const r = windowRef.current?.getBoundingClientRect();
        navigate(`/casos/${c.slug}`, {
          expand: r && !reducedMotion ? { scene: c.scene, rect: { top: r.top, left: r.left, width: r.width, height: r.height } } : null
        });
      }}
    >
      {children}
    </a>
  );
}

// Desktop: um caso por vez, numa cena fixa enquanto a rolagem troca o gancho.
function CasesPinned() {
  const ref = useRef(null);
  const windowRef = useRef(null);
  const barRef = useRef(null);
  const [index, setIndex] = useState(0);
  const c = CASES[index];

  useLayoutEffect(() => {
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const i = Math.min(CASES.length - 1, Math.floor(self.progress * CASES.length));
        setIndex(i);
        if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`;
      }
    });
    return () => st.kill();
  }, []);

  const jump = (i) => {
    const el = ref.current;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    scrollToY(top + span * ((i + 0.5) / CASES.length));
  };

  return (
    <div className="cases-pin" ref={ref} style={{ height: `${CASES.length * 100 + 20}vh` }}>
      <div className="cases-pin__sticky">
        <div className="cases-pin__grid container">
          <div className="cases-pin__text">
            <nav className="case-tabs" aria-label="Casos">
              {CASES.map((item, i) => (
                <button key={item.slug} type="button" className={i === index ? "is-on" : ""} aria-current={i === index} onClick={() => jump(i)}>
                  {item.name}
                </button>
              ))}
              <span className="case-tabs__bar" ref={barRef} />
            </nav>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.5, ease }}
              >
                <p className="case-kind">{c.kind}</p>
                <h3 className="case-hook">{c.hook}</h3>
                <p className="case-answer">{c.answer}</p>
                <OpenCase c={c} windowRef={windowRef}>
                  Abrir o caso
                </OpenCase>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="cases-pin__window" ref={windowRef}>
            <AnimatePresence initial={false}>
              <motion.div
                key={c.slug}
                className={`scene-frame scene-bg--${c.scene}`}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease }}
              >
                <Scene scene={c.scene} active />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mobile: os casos empilhados, cada cena entra em ação quando aparece.
function CaseStacked({ c }) {
  const windowRef = useRef(null);
  const [active, setActive] = useState(false);
  return (
    <motion.article className="case-stack" onViewportEnter={() => setActive(true)} viewport={{ amount: 0.5, once: true }}>
      <div className={`scene-frame scene-bg--${c.scene}`} ref={windowRef}>
        <Scene scene={c.scene} active={active} />
      </div>
      <p className="case-kind">{c.kind}</p>
      <h3 className="case-hook">{c.hook}</h3>
      <p className="case-answer">{c.answer}</p>
      <OpenCase c={c} windowRef={windowRef}>
        Abrir o caso
      </OpenCase>
    </motion.article>
  );
}

function useDesktop() {
  const [desktop, setDesktop] = useState(() => window.matchMedia("(min-width: 960px)").matches);
  useLayoutEffect(() => {
    const mq = window.matchMedia("(min-width: 960px)");
    const on = () => setDesktop(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return desktop;
}

function Cases() {
  const desktop = useDesktop();
  return (
    <section id="casos" className="cases" aria-labelledby="casos-title">
      <div className="section-head container">
        <h2 id="casos-title" className="h2">Três sistemas, três perguntas.</h2>
        <p className="lead">Cada um começou com um problema que nenhuma ferramenta pronta resolvia.</p>
      </div>
      {desktop ? (
        <CasesPinned />
      ) : (
        <div className="container cases-stack">
          {CASES.map((c) => (
            <CaseStacked key={c.slug} c={c} />
          ))}
        </div>
      )}
    </section>
  );
}

function Capabilities() {
  const [open, setOpen] = useState(null);
  return (
    <section className="caps container" aria-labelledby="caps-title">
      <div className="section-head">
        <h2 id="caps-title" className="h2">O que construímos.</h2>
        <p className="lead">Quatro tipos de sistema. O mesmo cuidado em todos.</p>
      </div>
      <ul className="caps__list">
        {CAPABILITIES.map((cap, i) => {
          const isOpen = open === i;
          return (
            <li key={cap.name} className={`cap${isOpen ? " is-open" : ""}`}>
              <button type="button" className="cap__head" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}>
                <span className="cap__name">{cap.name}</span>
                <span className="cap__line">{cap.line}</span>
                <span className="plus" aria-hidden="true" />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    className="cap__body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease }}
                  >
                    <div className="cap__inner">
                      <p>{cap.more}</p>
                      <p className="cap__seen">
                        Visto em{" "}
                        {cap.seen.map((slug, j) => {
                          const c = CASES.find((x) => x.slug === slug);
                          return (
                            <React.Fragment key={slug}>
                              {j > 0 && " e "}
                              <Link to={`/casos/${slug}`}>{c.name}</Link>
                            </React.Fragment>
                          );
                        })}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Process() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".process__line-fill", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: ref.current, start: "top 75%", end: "bottom 60%", scrub: 0.5 } });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section className="process container" ref={ref} aria-labelledby="process-title">
      <div className="section-head">
        <h2 id="process-title" className="h2">Como trabalhamos.</h2>
        <p className="lead">Você vê o sistema funcionando a cada duas semanas, não só no fim.</p>
      </div>
      <div className="process__line" aria-hidden="true">
        <span className="process__line-fill" />
      </div>
      <ol className="process__steps">
        {PROCESS.map((p, i) => (
          <li key={p.title}>
            <span className="process__n">{i + 1}</span>
            <h3>{p.title}</h3>
            <p className="process__when">{p.when}</p>
            <p>{p.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Start() {
  return (
    <section id="comecar" className="start" aria-labelledby="start-title">
      <div className="start__glow" aria-hidden="true" />
      <div className="start__grid container">
        <div className="start__intro">
          <h2 id="start-title" className="h1">Comece hoje.</h2>
          <p className="lead">
            Três perguntas e a sua mensagem sai pronta no WhatsApp. Respondemos em até um dia útil com os próximos passos.
          </p>
          <ul className="start__alts">
            <li>
              <a href={whatsappUrl()} target="_blank" rel="noreferrer">WhatsApp {COMPANY.whatsappDisplay}</a>
            </li>
            <li>
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            </li>
          </ul>
        </div>
        <ProjectForm />
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Trust />
      <Cases />
      <Capabilities />
      <Process />
      <Start />
    </>
  );
}
