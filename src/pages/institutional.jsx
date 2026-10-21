import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "../router.jsx";
import { CASES, COMPANY, JOBS, POSTS, STATUS_COMPONENTS, STATUS_HISTORY, VALUES, whatsappUrl } from "../data.js";
import { reducedMotion } from "../scroll.js";

const ease = [0.22, 1, 0.36, 1];

function PageHead({ title, lead, children }) {
  return (
    <header className="page-head container">
      <motion.h1
        className="h1"
        initial={reducedMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.1 }}
      >
        {title}
      </motion.h1>
      {lead && (
        <motion.p
          className="lead"
          initial={reducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.3 }}
        >
          {lead}
        </motion.p>
      )}
      {children}
    </header>
  );
}

const date = (iso) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });

export function About() {
  return (
    <>
      <PageHead
        title="Uma empresa de software que começa pela operação, não pelo código."
        lead="A Reality constrói sistemas sob medida para empresas e instituições que já tentaram as ferramentas prontas e esbarraram no limite delas."
      />

      <section className="prose-block container">
        <div className="prose-block__aside">
          <h2 className="label">De onde viemos</h2>
        </div>
        <div className="prose">
          <p>
            A Reality nasceu construindo os próprios produtos. O Fluxo Finance e a Fluxo Academy estão no ar, com gente pagando e usando todos os dias. Foi assim que aprendemos o que separa um protótipo bonito de um sistema que aguenta a vida real: regra de acesso no banco, pagamento que não duplica, certificado que não muda, app que passa na revisão da loja.
          </p>
          <p>
            Hoje levamos esse mesmo padrão para clientes. Escritórios, escolas, empresas de serviço e fundadores que precisam de um sistema do jeito deles, e que querem ser donos do que pagaram para construir.
          </p>
        </div>
      </section>

      <section id="proposito" className="purpose" aria-labelledby="purpose-title">
        <div className="container">
          <h2 id="purpose-title" className="label">Propósito</h2>
          <p className="purpose__statement">Tirar empresas do aluguel de ferramentas que não foram feitas para elas.</p>
          <ul className="values">
            {VALUES.map((v) => (
              <li key={v.title}>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="founder container" aria-labelledby="founder-title">
        <img src="/assets/kayo.webp" alt={`Retrato de ${COMPANY.founder}`} width="480" height="600" loading="lazy" />
        <div>
          <h2 id="founder-title" className="label">Quem está à frente</h2>
          <p className="founder__name">{COMPANY.founder}</p>
          <p className="founder__bio">
            Fundador e engenheiro da Reality. Arquiteta e escreve os sistemas de ponta a ponta, do esquema do banco ao app publicado na loja, e responde pessoalmente a cada projeto que entra.
          </p>
          <p className="founder__links">
            <a href={COMPANY.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={COMPANY.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </p>
        </div>
      </section>

      <section className="links-grid container" aria-label="Continue">
        <Link to="/carreiras" className="link-card">
          <span className="link-card__title">Carreiras</span>
          <span>Construa software que vai para produção.</span>
        </Link>
        <Link to="/blog" className="link-card">
          <span className="link-card__title">Blog</span>
          <span>As decisões por trás dos nossos sistemas.</span>
        </Link>
        <Link to="/status" className="link-card">
          <span className="link-card__title">Status</span>
          <span>Como estão os sistemas que mantemos.</span>
        </Link>
      </section>
    </>
  );
}

export function Careers() {
  const [open, setOpen] = useState(null);
  return (
    <>
      <PageHead
        title="Construa software que vai para produção."
        lead="Equipe pequena, remota e exigente com o que entrega. Aqui ninguém passa meses num protótipo que nunca vai ao ar."
      />
      <section className="prose-block container">
        <div className="prose-block__aside">
          <h2 className="label">Como é trabalhar aqui</h2>
        </div>
        <ul className="perks">
          <li><strong>Remoto de verdade.</strong> Horário combinado com o time, não com a cadeira.</li>
          <li><strong>Ciclos de duas semanas.</strong> Cada ciclo termina com algo funcionando na frente do cliente.</li>
          <li><strong>Código revisado.</strong> Todo pull request tem outra pessoa olhando, e testes rodando.</li>
          <li><strong>Produto próprio.</strong> Parte do tempo vai para o Fluxo Finance e a Fluxo Academy.</li>
        </ul>
      </section>
      <section className="jobs container" aria-labelledby="jobs-title">
        <h2 id="jobs-title" className="h2">Vagas abertas</h2>
        <ul className="jobs__list">
          {JOBS.map((job, i) => {
            const isOpen = open === i;
            return (
              <li key={job.slug} className={`job${isOpen ? " is-open" : ""}`}>
                <button type="button" className="job__head" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}>
                  <span className="job__title">{job.title}</span>
                  <span className="job__meta">{job.stack}</span>
                  <span className="job__meta">{job.where}</span>
                  <span className="plus" aria-hidden="true" />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease }}>
                      <div className="job__body">
                        <p>{job.about}</p>
                        <h3>Você combina com a vaga se</h3>
                        <ul>
                          {job.you.map((y) => (
                            <li key={y}>{y}</li>
                          ))}
                        </ul>
                        <a className="btn btn--primary" href={`mailto:${COMPANY.careersEmail}?subject=${encodeURIComponent(`Vaga: ${job.title}`)}`}>
                          Candidatar-se por e-mail
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
        <p className="jobs__open">
          Nenhuma vaga é a sua? Mande o seu trabalho para <a href={`mailto:${COMPANY.careersEmail}`}>{COMPANY.careersEmail}</a>. Lemos tudo.
        </p>
      </section>
    </>
  );
}

export function Blog() {
  const [first, ...rest] = POSTS;
  return (
    <>
      <PageHead title="Blog" lead="As decisões de engenharia e produto por trás dos sistemas que construímos." />
      <section className="posts container">
        <Link to={`/blog/${first.slug}`} className="post-feature">
          <time dateTime={first.date}>{date(first.date)}</time>
          <h2>{first.title}</h2>
          <p>{first.dek}</p>
          <span className="post-feature__read">Leitura de {first.read}</span>
        </Link>
        <ul className="post-list">
          {rest.map((p) => (
            <li key={p.slug}>
              <Link to={`/blog/${p.slug}`}>
                <time dateTime={p.date}>{date(p.date)}</time>
                <h2>{p.title}</h2>
                <p>{p.dek}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export function Post({ slug }) {
  const post = POSTS.find((p) => p.slug === slug);
  const others = POSTS.filter((p) => p.slug !== slug);
  return (
    <article className="post">
      <header className="post__head container">
        <nav className="crumbs" aria-label="Você está em">
          <Link to="/blog">Blog</Link>
        </nav>
        <motion.h1
          className="h1"
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
        >
          {post.title}
        </motion.h1>
        <p className="lead">{post.dek}</p>
        <p className="post__meta">
          <time dateTime={post.date}>{date(post.date)}</time>, por {COMPANY.founder}. Leitura de {post.read}.
        </p>
      </header>
      <div className="post__body container">
        {post.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
      <aside className="post__more container" aria-label="Outros textos">
        <h2 className="label">Continue lendo</h2>
        <ul className="post-list">
          {others.map((p) => (
            <li key={p.slug}>
              <Link to={`/blog/${p.slug}`}>
                <h3>{p.title}</h3>
                <p>{p.dek}</p>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </article>
  );
}

const DAYS = 90;

function Bars({ incidents }) {
  const days = useMemo(() => {
    const map = new Map(incidents.map((i) => [i.day, i.level]));
    return Array.from({ length: DAYS }, (_, i) => map.get(i) || "ok");
  }, [incidents]);
  const uptime = 100 - incidents.reduce((sum, i) => sum + (i.level === "major" ? 0.21 : 0.06), 0);
  return (
    <>
      <div className="bars" role="img" aria-label={`${uptime.toFixed(2)}% de disponibilidade nos últimos ${DAYS} dias`}>
        {days.map((level, i) => (
          <span key={i} className={`bar bar--${level}`} title={level === "ok" ? "Sem incidentes" : level === "minor" ? "Degradação parcial" : "Indisponibilidade"} />
        ))}
      </div>
      <div className="bars__legend">
        <span>{DAYS} dias atrás</span>
        <span>{uptime.toFixed(2)}% no período</span>
        <span>Hoje</span>
      </div>
    </>
  );
}

export function Status() {
  const groups = [...new Set(STATUS_COMPONENTS.map((c) => c.group))];
  return (
    <>
      <PageHead title="Status" lead="Disponibilidade dos sistemas que a Reality mantém.">
        <div className="status-banner" role="status">
          <span className="status-dot" aria-hidden="true" />
          Todos os sistemas operando normalmente
        </div>
      </PageHead>
      <section className="status container">
        {groups.map((g) => (
          <div className="status__group" key={g}>
            <h2 className="label">{g}</h2>
            <ul>
              {STATUS_COMPONENTS.filter((c) => c.group === g).map((c) => (
                <li key={c.name} className="status__item">
                  <div className="status__row">
                    <span>{c.name}</span>
                    <span className="status__ok">Operando</span>
                  </div>
                  <Bars incidents={c.incidents} />
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="status__group">
          <h2 className="label">Incidentes recentes</h2>
          <ul className="incidents">
            {STATUS_HISTORY.slice()
              .reverse()
              .map((inc) => (
                <li key={inc.date + inc.title}>
                  <time dateTime={inc.date}>{date(inc.date)}</time>
                  <h3>{inc.title}</h3>
                  <p className="incidents__component">{inc.component}. Resolvido.</p>
                  <p>{inc.resolution}</p>
                </li>
              ))}
          </ul>
        </div>
        <p className="status__note">
          Versão de demonstração: estes números ainda não vêm de monitoramento automático.
        </p>
      </section>
    </>
  );
}

export function NotFound() {
  return (
    <PageHead title="Essa página não existe." lead="Talvez o endereço tenha mudado. Os casos e o contato continuam no mesmo lugar.">
      <div className="hero__actions">
        <Link to="/" className="btn btn--primary">Voltar ao início</Link>
        <a className="btn btn--ghost" href={whatsappUrl()} target="_blank" rel="noreferrer">Falar no WhatsApp</a>
      </div>
      <ul className="notfound__cases">
        {CASES.map((c) => (
          <li key={c.slug}>
            <Link to={`/casos/${c.slug}`}>{c.name}</Link>
          </li>
        ))}
      </ul>
    </PageHead>
  );
}
