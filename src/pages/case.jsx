import React, { useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { Link } from "../router.jsx";
import { CASES, whatsappUrl } from "../data.js";
import { Scene } from "../components/scenes.jsx";
import { reducedMotion } from "../scroll.js";

const ease = [0.22, 1, 0.36, 1];

// Frase-capítulo que acende palavra por palavra conforme a rolagem.
function ScrubText({ children }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".w",
        { opacity: 0.16 },
        { opacity: 1, stagger: 0.08, ease: "none", scrollTrigger: { trigger: ref.current, start: "top 82%", end: "bottom 45%", scrub: 0.4 } }
      );
    }, ref);
    return () => ctx.revert();
  }, [children]);
  return (
    <p className="statement" ref={ref}>
      {children.split(" ").map((word, i) => (
        <span className="w" key={i}>
          {word}{" "}
        </span>
      ))}
    </p>
  );
}

function More({ label, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="more">
      <button type="button" className="more__btn" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span className="plus" aria-hidden="true" />
        {open ? "Mostrar menos" : label}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease }}
            className="more__body"
          >
            <p>{children}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Inside({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <ul className="inside">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.title} className={`inside__item${isOpen ? " is-open" : ""}`}>
            <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}>
              <span>{item.title}</span>
              <span className="plus" aria-hidden="true" />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease }}
                >
                  <p className="inside__body">{item.body}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

function Shot({ c }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".shot__frame", { y: 60, rotateX: 10 }, { y: -20, rotateX: 0, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "center 40%", scrub: 0.6 } });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <figure className="shot container" ref={ref}>
      <div className="shot__frame">
        <div className="shot__bar" aria-hidden="true">
          <span />
          <span />
          <span />
          <em>{c.live.label}</em>
        </div>
        <img src={c.shot} alt={`Página de ${c.name} em produção`} loading="lazy" width="1200" height="824" />
      </div>
      <figcaption>{c.name} em produção.</figcaption>
    </figure>
  );
}

export default function CasePage({ slug }) {
  const index = CASES.findIndex((c) => c.slug === slug);
  const c = CASES[index];
  const next = CASES[(index + 1) % CASES.length];
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.to(".case-hero__scene", { yPercent: 12, scale: 0.94, ease: "none", scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 0.5 } });
    }, heroRef);
    return () => ctx.revert();
  }, [slug]);

  return (
    <article className="case">
      <header className={`case-hero scene-bg--${c.scene}`} ref={heroRef}>
        <div className="case-hero__grid container">
          <motion.div
            className="case-hero__text"
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.35 }}
          >
            <nav className="crumbs" aria-label="Você está em">
              <Link to="/#casos">Casos</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{c.name}</span>
            </nav>
            <h1 className="case-hero__title">{c.hook}</h1>
            <p className="case-hero__answer">{c.answer}</p>
            <dl className="case-hero__meta">
              <div>
                <dt>Cliente</dt>
                <dd>{c.name}{c.formerly ? <small> (antiga {c.formerly})</small> : null}</dd>
              </div>
              <div>
                <dt>Entrega</dt>
                <dd>{c.delivered}</dd>
              </div>
              <div>
                <dt>Ano</dt>
                <dd>{c.year}</dd>
              </div>
            </dl>
          </motion.div>
          <div className="case-hero__scene">
            <Scene scene={c.scene} active />
          </div>
        </div>
      </header>

      <section className="chapter container" aria-labelledby="ch-problema">
        <h2 id="ch-problema" className="chapter__label">O problema</h2>
        <div className="chapter__body">
          <ScrubText>{c.problem}</ScrubText>
          <More label="Ler o contexto">{c.problemMore}</More>
        </div>
      </section>

      <section className="chapter container" aria-labelledby="ch-virada">
        <h2 id="ch-virada" className="chapter__label">A virada</h2>
        <div className="chapter__body">
          <ScrubText>{c.turn}</ScrubText>
          <More label="Como foi construído">{c.turnMore}</More>
        </div>
      </section>

      <section className="chapter container" aria-labelledby="ch-dentro">
        <h2 id="ch-dentro" className="chapter__label">Por dentro</h2>
        <div className="chapter__body">
          <p className="chapter__hint">As decisões que fazem diferença. Abra as que interessam.</p>
          <Inside items={c.inside} />
        </div>
      </section>

      {c.shot && <Shot c={c} />}

      <section className="chapter container" aria-labelledby="ch-resultado">
        <h2 id="ch-resultado" className="chapter__label">Resultado</h2>
        <div className="chapter__body">
          <p className="chapter__result">{c.result}</p>
          <dl className="facts">
            {c.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
          <p className="stack">
            <span>Feito com</span> {c.stack.join(", ")}.
          </p>
          <div className="case__links">
            <a className="btn btn--ghost" href={c.live.href} target="_blank" rel="noreferrer">
              Visitar o site
            </a>
            {c.repo && (
              <a className="btn btn--ghost" href={c.repo} target="_blank" rel="noreferrer">
                Ver o código
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="case-cta container">
        <h2 className="h2">Tem um problema desse tamanho?</h2>
        <div className="case-cta__actions">
          <a className="btn btn--primary" href={whatsappUrl(`Olá! Vi o caso ${c.name} no site da Reality e quero conversar sobre um projeto parecido.`)} target="_blank" rel="noreferrer">
            Conversar no WhatsApp
          </a>
          <Link to="/#comecar" className="btn btn--ghost">
            Responder 3 perguntas
          </Link>
        </div>
      </section>

      <Link to={`/casos/${next.slug}`} className={`next-case scene-bg--${next.scene}`}>
        <span className="next-case__label">Próximo caso: {next.name}</span>
        <span className="next-case__hook">{next.hook}</span>
      </Link>
    </article>
  );
}
