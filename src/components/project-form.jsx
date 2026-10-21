// "Comece hoje": três perguntas curtas que viram uma mensagem pronta no WhatsApp.
import React, { useId, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { COMPANY, whatsappUrl } from "../data.js";

const WHAT = ["Plataforma ou SaaS", "Aplicativo mobile", "Portal ou site institucional", "Sistema interno", "IA ou automação", "Ainda não sei"];
const STAGE = ["Só a ideia", "Já tenho algo e quero evoluir", "Preciso substituir um sistema"];
const WHEN = ["Este mês", "Nos próximos 3 meses", "Sem pressa"];

function Choice({ options, value, onChange, multiple, name }) {
  const selected = (o) => (multiple ? value.includes(o) : value === o);
  const toggle = (o) => {
    if (!multiple) return onChange(o);
    onChange((prev) => (prev.includes(o) ? prev.filter((v) => v !== o) : [...prev, o]));
  };
  return (
    <div className="choices" role={multiple ? "group" : "radiogroup"} aria-labelledby={name}>
      {options.map((o) => (
        <button
          key={o}
          type="button"
          role={multiple ? "checkbox" : "radio"}
          aria-checked={selected(o)}
          className={`choice${selected(o) ? " is-on" : ""}`}
          onClick={() => toggle(o)}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export function ProjectForm() {
  const id = useId();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [what, setWhat] = useState([]);
  const [stage, setStage] = useState("");
  const [when, setWhen] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [sentUrl, setSentUrl] = useState("");

  const message = () =>
    [
      `Olá! Sou ${name.trim()}${company.trim() ? `, da ${company.trim()}` : ""}.`,
      `Quero construir: ${what.join(", ")}.`,
      stage && `Situação: ${stage}.`,
      when && `Prazo: ${when}.`,
      note.trim() && `Em uma frase: ${note.trim()}`
    ]
      .filter(Boolean)
      .join("\n");

  const go = (next) => {
    setError("");
    if (next > step) {
      if (step === 0 && what.length === 0) return setError("Escolha pelo menos uma opção para continuar.");
      if (step === 1 && !stage) return setError("Diga em que pé está o projeto para continuar.");
    }
    setDir(next > step ? 1 : -1);
    setStep(next);
  };

  const submit = (e) => {
    e.preventDefault();
    if (step < 2) return go(step + 1);
    if (!name.trim()) return setError("Escreva o seu nome para a gente saber com quem fala.");
    const url = whatsappUrl(message());
    window.open(url, "_blank", "noopener");
    setSentUrl(url);
  };

  const titles = ["O que você quer construir?", "Em que pé está?", "Como falamos com você?"];

  if (sentUrl) {
    return (
      <div className="form form--done" role="status">
        <h3 className="form__title">Mensagem pronta no WhatsApp.</h3>
        <p className="form__lead">
          Abrimos uma conversa com o seu resumo. É só enviar. Se a janela não abriu, use o botão abaixo.
        </p>
        <div className="form__actions">
          <a className="btn btn--primary" href={sentUrl} target="_blank" rel="noreferrer">
            Abrir o WhatsApp
          </a>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => {
              setSentUrl("");
              setStep(0);
            }}
          >
            Editar respostas
          </button>
        </div>
        <p className="form__alt">
          Prefere e-mail? Escreva para <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
        </p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={submit} noValidate>
      <div className="form__progress" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span key={i} className={i <= step ? "is-on" : ""} />
        ))}
      </div>
      <p className="form__step">Pergunta {step + 1} de 3</p>
      <div className="form__viewport">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.fieldset
            key={step}
            className="form__fieldset"
            custom={dir}
            initial={{ opacity: 0, x: dir * 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -28 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <legend className="form__title" id={`${id}-q`}>
              {titles[step]}
            </legend>
            {step === 0 && <Choice name={`${id}-q`} options={WHAT} value={what} onChange={setWhat} multiple />}
            {step === 1 && (
              <>
                <Choice name={`${id}-q`} options={STAGE} value={stage} onChange={setStage} />
                <p className="form__sub" id={`${id}-when`}>Para quando? <span>Opcional</span></p>
                <Choice name={`${id}-when`} options={WHEN} value={when} onChange={(v) => setWhen(v === when ? "" : v)} />
              </>
            )}
            {step === 2 && (
              <div className="fields">
                <label className="field">
                  <span>Seu nome</span>
                  <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
                </label>
                <label className="field">
                  <span>Empresa <em>opcional</em></span>
                  <input value={company} onChange={(e) => setCompany(e.target.value)} autoComplete="organization" />
                </label>
                <label className="field field--wide">
                  <span>O problema, em uma frase <em>opcional</em></span>
                  <textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)} />
                </label>
              </div>
            )}
          </motion.fieldset>
        </AnimatePresence>
      </div>
      <p className="form__error" role="alert">{error}</p>
      <div className="form__actions">
        {step > 0 && (
          <button type="button" className="btn btn--ghost" onClick={() => go(step - 1)}>
            Voltar
          </button>
        )}
        <button type="submit" className="btn btn--primary">
          {step < 2 ? "Continuar" : "Enviar pelo WhatsApp"}
        </button>
      </div>
    </form>
  );
}
