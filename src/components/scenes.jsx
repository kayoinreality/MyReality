// Cenas de produto: miniaturas vivas de cada caso, desenhadas em código.
// Cada uma mostra o gancho do caso funcionando, não um print estático.
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { reducedMotion } from "../scroll.js";

const ease = [0.22, 1, 0.36, 1];

function FluxoScene({ active }) {
  const rows = [
    { label: "Jantar fora", value: "R$ 180", days: "+4d" },
    { label: "Assinaturas do mês", value: "R$ 120", days: "+3d" },
    { label: "Fone de ouvido", value: "R$ 500", days: "+12d" },
    { label: "Aporte na corretora", value: "R$ 300", days: "−7d", good: true }
  ];
  return (
    <div className="scene__stage">
      <div className="fx-card">
        <div className="fx-card__head">
          <span>Seu mês</span>
          <span>Liberdade</span>
        </div>
        {rows.map((row, i) => (
          <div className="fx-row" key={row.label}>
            <span className="fx-row__label">{row.label}</span>
            <span className="fx-row__value">{row.value}</span>
            <motion.span
              className={`fx-chip${row.good ? " is-good" : ""}`}
              initial={false}
              animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
              transition={{ delay: active ? 0.35 + i * 0.16 : 0, duration: 0.5, ease }}
            >
              {row.days}
            </motion.span>
          </div>
        ))}
        <motion.div
          className="fx-goal"
          initial={false}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ delay: active ? 1.1 : 0, duration: 0.6, ease }}
        >
          <span>Livre em</span>
          <strong>14 anos e 3 meses</strong>
        </motion.div>
      </div>
    </div>
  );
}

function AcademyScene({ active }) {
  return (
    <div className="scene__stage">
      <div className="ac-cert">
        <div className="ac-cert__brand">Fluxo Academy</div>
        <div className="ac-cert__title">Certificado de conclusão</div>
        <div className="ac-cert__name">Marina Couto</div>
        <div className="ac-cert__course">concluiu Gestão de Projetos Ágeis, com carga horária de 40 horas.</div>
        <div className="ac-cert__foot">
          <span>Emitido em 12 mar 2026</span>
          <span>FA-7Q2K-91XD</span>
        </div>
      </div>
      <motion.div
        className="ac-note"
        initial={false}
        animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
        transition={{ delay: active ? 0.6 : 0, duration: 0.6, ease }}
      >
        <span className="ac-note__line">Ementa atualizada em 4 abr 2026</span>
        <span className="ac-note__ok">
          <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Certificado preservado
        </span>
      </motion.div>
    </div>
  );
}

const QUERY = "5021334-12.2025.8.09.0051";

function JudicialScene({ active }) {
  const [typed, setTyped] = useState(active ? QUERY.length : 0);
  useEffect(() => {
    if (!active) {
      setTyped(0);
      return;
    }
    if (reducedMotion) {
      setTyped(QUERY.length);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(i);
      if (i >= QUERY.length) clearInterval(id);
    }, 38);
    return () => clearInterval(id);
  }, [active]);
  const done = typed >= QUERY.length;
  const docs = ["Decisão de deferimento", "Edital do Art. 52 §1º", "Relatório mensal de setembro", "Ata da assembleia de credores"];
  return (
    <div className="scene__stage">
      <div className="jd-panel">
        <div className="jd-search">
          <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
            <circle cx="7" cy="7" r="4.6" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10.4 10.4L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="jd-search__text">
            {QUERY.slice(0, typed)}
            <span className={`jd-caret${done ? " is-done" : ""}`} />
          </span>
        </div>
        <AnimatePresence>
          {done && (
            <motion.div
              className="jd-result"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease }}
            >
              <div className="jd-result__kind">Recuperação judicial</div>
              <div className="jd-result__name">Grupo Horizonte Agro</div>
              <div className="jd-result__court">2ª Vara Cível de Goiânia</div>
              <ul className="jd-docs">
                {docs.map((d, i) => (
                  <motion.li
                    key={d}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.4, ease }}
                  >
                    <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M4 1.8h5.2L12.5 5v9.2H4z M9 1.8V5.2h3.4" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                    </svg>
                    {d}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const SCENES = { fluxo: FluxoScene, academy: AcademyScene, judicial: JudicialScene };

export function Scene({ scene, active = true, className = "" }) {
  const Component = SCENES[scene];
  return (
    <div className={`scene scene--${scene} ${className}`}>
      <Component active={active} />
    </div>
  );
}
