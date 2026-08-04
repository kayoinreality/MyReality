// Diagramas de arquitetura dos case studies.
//
// Regra de cor: NADA de hex aqui. O site troca --bg/--fg/--line/--accent em
// runtime (4 paletas × claro/escuro, app.jsx), então qualquer cor fixa some no
// dark mode ou briga com a paleta. Tudo vem de currentColor e das classes de
// styles.css, que leem as variáveis.

// Caixa: título em cima, linhas de apoio embaixo, tudo centralizado.
function DgmNode({ x, y, w, h, title, lines = [], accent = false }) {
  const cx = x + w / 2;
  return (
    <g className={"dgm-node" + (accent ? " is-accent" : "")}>
      <rect x={x} y={y} width={w} height={h} rx="2" />
      <text className="dgm-node-title" x={cx} y={y + 26} textAnchor="middle">{title}</text>
      {lines.map((line, i) => (
        <text className="dgm-node-line" key={i} x={cx} y={y + 46 + i * 15} textAnchor="middle">{line}</text>
      ))}
    </g>
  );
}

// Marcadores de seta. São dois porque <marker> não herda o stroke de quem o
// referencia — a ponta ficaria cinza numa linha de destaque. Dois markers
// resolvem sem depender de context-stroke, que nem todo navegador tem.
// O id carrega o id do diagrama para dois diagramas na mesma página não
// disputarem o mesmo <marker>.
function DgmDefs({ uid }) {
  return (
    <defs>
      {["", "-accent"].map((suffix) => (
        <marker key={suffix} id={uid + "-arrow" + suffix} viewBox="0 0 8 8" refX="7" refY="4"
                markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path className={"dgm-arrowhead" + (suffix ? " is-accent" : "")} d="M0,0 L8,4 L0,8 Z" />
        </marker>
      ))}
    </defs>
  );
}

function DgmLink({ d, uid, accent = false }) {
  return (
    <path
      className={"dgm-link" + (accent ? " is-accent" : "")}
      d={d}
      markerEnd={`url(#${uid}-arrow${accent ? "-accent" : ""})`}
    />
  );
}

const DGM_TEXT = {
  fluxo: {
    pt: {
      title: "Arquitetura do Fluxo",
      desc: "Monorepo Turborepo com cinco aplicações sobre um motor de domínio compartilhado, Firebase e Cloud Functions, com a Stripe como único escritor do campo de plano.",
      group: "monorepo Turborepo · 5 apps",
      apps: [
        ["web", "Next.js · PWA"],
        ["mobile", "Flutter nativo"],
        ["admin", "painel"],
        ["landing", "site"],
        ["mcp", "servidor MCP"]
      ],
      core: "packages/core · TypeScript",
      coreLine: "motor da Jornada — portado para Dart no app Flutter",
      fn: "18 Cloud Functions",
      fnLines: ["checkout · portal · webhook · chat com LLM", "Play Billing · exclusão de conta · taxas BCB · e-mails"],
      stripe: "Stripe",
      stripeLine: "assinatura Fluxo+",
      db: "Firebase Auth · Cloud Firestore",
      dbLine: "regras de segurança por usuário",
      guard: "único escritor de `plano`"
    },
    en: {
      title: "Fluxo architecture",
      desc: "Turborepo monorepo with five apps over a shared domain engine, Firebase and Cloud Functions, with Stripe as the only writer of the plan field.",
      group: "Turborepo monorepo · 5 apps",
      apps: [
        ["web", "Next.js · PWA"],
        ["mobile", "native Flutter"],
        ["admin", "dashboard"],
        ["landing", "site"],
        ["mcp", "MCP server"]
      ],
      core: "packages/core · TypeScript",
      coreLine: "Journey engine — ported to Dart in the Flutter app",
      fn: "18 Cloud Functions",
      fnLines: ["checkout · portal · webhook · LLM chat", "Play Billing · account deletion · BCB rates · e-mail"],
      stripe: "Stripe",
      stripeLine: "Fluxo+ subscription",
      db: "Firebase Auth · Cloud Firestore",
      dbLine: "per-user security rules",
      guard: "only writer of `plano`"
    }
  },
  aura: {
    pt: {
      title: "Arquitetura da Aura Educacional",
      desc: "Monorepo de quatro aplicações sobre uma API Hono no Cloud Run, com Postgres, Firebase Auth, Stripe e Mux, emitindo certificados de verificação pública.",
      group: "monorepo · 4 apps",
      apps: [
        ["web", "site público · catálogo"],
        ["learn", "player do aluno"],
        ["admin", "CMS interno"]
      ],
      api: "api · Hono no Cloud Run",
      apiLine: "escala a zero — o custo acompanha o uso",
      services: [
        ["PostgreSQL", "Drizzle ORM"],
        ["Firebase Auth", "autenticação"],
        ["Stripe", "assinatura + avulso"],
        ["Mux", "streaming adaptativo"]
      ],
      cert: "certificado de horas",
      certLine: "verificação pública — sem login"
    },
    en: {
      title: "Aura Educacional architecture",
      desc: "Four-app monorepo over a Hono API on Cloud Run, with Postgres, Firebase Auth, Stripe and Mux, issuing publicly verifiable certificates.",
      group: "monorepo · 4 apps",
      apps: [
        ["web", "public site · catalog"],
        ["learn", "student player"],
        ["admin", "internal CMS"]
      ],
      api: "api · Hono on Cloud Run",
      apiLine: "scales to zero — cost tracks usage",
      services: [
        ["PostgreSQL", "Drizzle ORM"],
        ["Firebase Auth", "authentication"],
        ["Stripe", "subscription + one-off"],
        ["Mux", "adaptive streaming"]
      ],
      cert: "hour certificate",
      certLine: "public verification — no login"
    }
  }
};

function FluxoDiagram({ lang }) {
  const d = DGM_TEXT.fluxo[lang] || DGM_TEXT.fluxo.pt;
  const uid = "dgm-fluxo";
  const appX = [36, 204, 372, 540, 708];

  return (
    <svg className="dgm" viewBox="0 0 900 552" role="img" aria-labelledby={uid + "-t " + uid + "-d"}>
      <title id={uid + "-t"}>{d.title}</title>
      <desc id={uid + "-d"}>{d.desc}</desc>
      <DgmDefs uid={uid} />

      <rect className="dgm-group" x="20" y="36" width="860" height="104" rx="2" />
      <text className="dgm-group-label" x="32" y="56">{d.group}</text>
      {d.apps.map(([title, line], i) => (
        <DgmNode key={title} x={appX[i]} y={68} w={156} h={56} title={title} lines={[line]} />
      ))}

      <DgmLink uid={uid} d="M450,140 V176" />
      <DgmNode x={190} y={176} w={520} h={68} title={d.core} lines={[d.coreLine]} />

      <DgmLink uid={uid} d="M280,244 V292" />
      <DgmNode x={20} y={292} w={520} h={84} title={d.fn} lines={d.fnLines} />
      <DgmNode x={600} y={292} w={280} h={84} title={d.stripe} lines={[d.stripeLine]} />
      <DgmLink uid={uid} d="M540,334 H600" />

      <DgmLink uid={uid} d="M280,376 V448" />
      <DgmLink uid={uid} d="M740,376 V448" accent />
      <text className="dgm-note" x="726" y="418" textAnchor="end">{d.guard}</text>

      <DgmNode x={20} y={448} w={860} h={76} title={d.db} lines={[d.dbLine]} />
    </svg>
  );
}

function AuraDiagram({ lang }) {
  const d = DGM_TEXT.aura[lang] || DGM_TEXT.aura.pt;
  const uid = "dgm-aura";
  const appX = [40, 320, 600];
  const svcX = [20, 240, 460, 680];

  return (
    <svg className="dgm" viewBox="0 0 900 524" role="img" aria-labelledby={uid + "-t " + uid + "-d"}>
      <title id={uid + "-t"}>{d.title}</title>
      <desc id={uid + "-d"}>{d.desc}</desc>
      <DgmDefs uid={uid} />

      <rect className="dgm-group" x="20" y="36" width="860" height="104" rx="2" />
      <text className="dgm-group-label" x="32" y="56">{d.group}</text>
      {d.apps.map(([title, line], i) => (
        <DgmNode key={title} x={appX[i]} y={68} w={260} h={56} title={title} lines={[line]} />
      ))}

      <DgmLink uid={uid} d="M450,140 V176" />
      <DgmNode x={190} y={176} w={520} h={68} title={d.api} lines={[d.apiLine]} />

      {/* Trilho: desce da api, abre na horizontal e cai em cada serviço. */}
      <path className="dgm-link" d="M450,244 V272 M120,272 H780" />
      {[120, 340, 560, 780].map((cx) => (
        <DgmLink key={cx} uid={uid} d={`M${cx},272 V296`} />
      ))}
      {d.services.map(([title, line], i) => (
        <DgmNode key={title} x={svcX[i]} y={296} w={200} h={76} title={title} lines={[line]} />
      ))}

      <DgmLink uid={uid} d="M120,372 V404 H450 V432" accent />
      <DgmNode x={190} y={432} w={520} h={64} title={d.cert} lines={[d.certLine]} accent />
    </svg>
  );
}

window.DIAGRAMS = {
  fluxo: FluxoDiagram,
  aura: AuraDiagram
};
