// ─── Diagramas de Arquitetura — Estética Dark Glass (Inspirado em Resend.com) ───

function DgmNode({ x, y, w, h, title, lines = [], accent = false }) {
  const cx = x + w / 2;
  return (
    <g className={"dgm-node" + (accent ? " is-accent" : "")}>
      <rect x={x} y={y} width={w} height={h} rx="10" />
      <line
        className="dgm-node-shine"
        x1={x + 14}
        y1={y + 0.5}
        x2={x + w - 14}
        y2={y + 0.5}
      />
      <text className="dgm-node-title" x={cx} y={y + 26} textAnchor="middle">{title}</text>
      {lines.map((line, i) => (
        <text className="dgm-node-line" key={i} x={cx} y={y + 45 + i * 15} textAnchor="middle">{line}</text>
      ))}
    </g>
  );
}

function DgmDefs({ uid }) {
  return (
    <defs>
      <linearGradient id={uid + "-surface"} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(255,255,255,0.07)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
      </linearGradient>
      <linearGradient id={uid + "-accent-surface"} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="rgba(56,189,248,0.18)" />
        <stop offset="100%" stopColor="rgba(16,185,129,0.06)" />
      </linearGradient>
      {["", "-accent"].map((suffix) => (
        <marker
          key={suffix}
          id={uid + "-arrow" + suffix}
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path className={"dgm-arrowhead" + (suffix ? " is-accent" : "")} d="M0,0 L8,4 L0,8 Z" />
        </marker>
      ))}
    </defs>
  );
}

function DgmLink({ d, uid, accent = false }) {
  return (
    <path
      className={"dgm-link" + (suffixClass(accent))}
      d={d}
      markerEnd={`url(#${uid}-arrow${accent ? "-accent" : ""})`}
    />
  );
}

function suffixClass(accent) {
  return accent ? " is-accent" : "";
}

// 01 · Arquitetura do Fluxo Finance
function FluxoDiagram() {
  const uid = "dgm-fluxo";
  const appX = [32, 202, 372, 542, 712];
  const apps = [
    ["apps/web", "Next.js · Vercel · PWA"],
    ["apps/mobile", "Flutter Nativo · iOS/Android"],
    ["apps/mcp", "Servidor MCP · Claude/GPT"],
    ["apps/admin", "Painel Operacional"],
    ["apps/landing", "Aquisição & SEO"]
  ];

  return (
    <svg className="dgm" viewBox="0 0 900 560" role="img" aria-labelledby={uid + "-t " + uid + "-d"}>
      <title id={uid + "-t"}>Arquitetura Técnica — Fluxo Finance</title>
      <desc id={uid + "-d"}>
        Monorepo Turborepo com 5 aplicações compartilhando motor de domínio em TypeScript e Dart, rotas de servidor com OpenRouter LLM, Stripe e Supabase Postgres protegido por RLS e trigger congelar_assinatura.
      </desc>
      <DgmDefs uid={uid} />

      <rect className="dgm-group" x="18" y="24" width="864" height="112" rx="14" />
      <text className="dgm-group-label" x="34" y="46">MONOREPO TURBOREPO · 5 APLICAÇÕES</text>
      {apps.map(([title, line], i) => (
        <DgmNode key={title} x={appX[i]} y={60} w={156} h={62} title={title} lines={[line]} />
      ))}

      <DgmLink uid={uid} d="M450,136 V174" />
      <DgmNode
        x={140}
        y={174}
        w={620}
        h={68}
        title="packages/core (TypeScript)  ⇄  apps/mobile/lib/core (Dart)"
        lines={["Motor da Jornada de Liberdade Financeira · Custo em Dias (+Xd) · Simulador 'E Se'"]}
        accent
      />

      <DgmLink uid={uid} d="M300,242 V288" />
      <DgmLink uid={uid} d="M680,242 V288" />

      <DgmNode
        x={20}
        y={288}
        w={530}
        h={86}
        title="packages/servidor · Rotas /api/*"
        lines={[
          "/api/chat & /api/categorizar (OpenRouter LLM no servidor · LGPD-safe)",
          "/api/mcp (Chaves revogáveis) · Resend (ola@fluxo.finance) · Taxas BCB"
        ]}
      />
      <DgmNode
        x={590}
        y={288}
        w={290}
        h={86}
        title="Stripe Checkout + Portal"
        lines={[
          "Assinatura Fluxo+ (R$ 14,90/mês)",
          "Webhook assinado (HMAC)"
        ]}
        accent
      />
      <DgmLink uid={uid} d="M550,331 H590" />

      <DgmLink uid={uid} d="M285,374 V448" />
      <DgmLink uid={uid} d="M735,374 V448" accent />
      <text className="dgm-note" x="722" y="418" textAnchor="end">
        trigger congelar_assinatura · único escritor do plano
      </text>

      <DgmNode
        x={20}
        y={448}
        w={860}
        h={84}
        title="Supabase Auth + PostgreSQL (Row-Level Security)"
        lines={[
          "Políticas RLS por usuário auditadas em supabase/testes/rls.sql",
          "Exclusão de conta em cascata (Play Store / LGPD) + Chaves MCP por usuário"
        ]}
      />
    </svg>
  );
}

// 02 · Arquitetura da Fluxo Academy (antiga Aura Educacional)
function FluxoAcademyDiagram() {
  const uid = "dgm-academy";
  const appX = [36, 320, 604];
  const apps = [
    ["apps/web", "Catálogo · Checkout · Validador Cert"],
    ["apps/learn", "Área do Aluno · Player · Progresso"],
    ["apps/admin", "CMS Interno · Publicação Zero-Deploy"]
  ];
  const svcX = [20, 240, 460, 680];
  const services = [
    ["Cloud SQL Postgres 16", "Drizzle ORM · has_course_access()"],
    ["Firebase Auth", "ID Tokens + Custom Claims"],
    ["Stripe Híbrido", "Assinatura + Compra Avulsa"],
    ["Mux Video", "Signed Playback · JWT 30s"]
  ];

  return (
    <svg className="dgm" viewBox="0 0 900 556" role="img" aria-labelledby={uid + "-t " + uid + "-d"}>
      <title id={uid + "-t"}>Arquitetura Técnica — Fluxo Academy (LMS Multi-Tenant)</title>
      <desc id={uid + "-d"}>
        Monorepo pnpm + Turborepo com 4 aplicações, API Hono no Google Cloud Run, Cloud SQL Postgres 16 com Drizzle ORM, Mux Signed Video, Stripe com idempotência e geração assíncrona de certificados imutáveis via Cloud Tasks e Puppeteer.
      </desc>
      <DgmDefs uid={uid} />

      <rect className="dgm-group" x="18" y="24" width="864" height="110" rx="14" />
      <text className="dgm-group-label" x="34" y="46">MONOREPO TURBOREPO + PNPM · FRONTENDS NEXT.JS 15 + REACT 19</text>
      {apps.map(([title, line], i) => (
        <DgmNode key={title} x={appX[i]} y={60} w={260} h={60} title={title} lines={[line]} />
      ))}

      <DgmLink uid={uid} d="M450,134 V172" />
      <DgmNode
        x={150}
        y={172}
        w={600}
        h={70}
        title="apps/api · Hono em Google Cloud Run (southamerica-east1)"
        lines={[
          "Middleware requireAuth / requireRole · Idempotência webhook_events (event_id UNIQUE)"
        ]}
      />

      <path className="dgm-link" d="M450,242 V270 M120,270 H780" />
      {[120, 340, 560, 780].map((cx) => (
        <DgmLink key={cx} uid={uid} d={`M${cx},270 V296`} />
      ))}
      {services.map(([title, line], i) => (
        <DgmNode key={title} x={svcX[i]} y={296} w={200} h={76} title={title} lines={[line]} />
      ))}

      <DgmLink uid={uid} d="M120,372 V412 H450 V440" accent />
      <DgmNode
        x={110}
        y={440}
        w={680}
        h={86}
        title="Cloud Tasks + Puppeteer Worker · Motor de Certificados Imutáveis (LDB Art. 42)"
        lines={[
          "Snapshots imutáveis (user_name, course_title, workload_hours, final_score)",
          "Verificação pública sem login · imune a edições futuras do curso"
        ]}
        accent
      />
    </svg>
  );
}

// 03 · Arquitetura do Portal Amanda Silvestre — Administração Judicial & Perícia
function JudicialDiagram() {
  const uid = "dgm-judicial";
  const pillarsX = [36, 320, 604];
  const pillars = [
    ["Administração Judicial", "Recuperação Judicial & Falências"],
    ["Perícia Grafotécnica", "Documentoscopia & Autenticidade"],
    ["Consultoria Jurídica", "Cível · Empresarial · LGPD"]
  ];

  return (
    <svg className="dgm" viewBox="0 0 900 520" role="img" aria-labelledby={uid + "-t " + uid + "-d"}>
      <title id={uid + "-t"}>Arquitetura de Informação e Transparência — Portal Jurídico & Pericial</title>
      <desc id={uid + "-d"}>
        Aplicação React + TypeScript + Motion com segmentação por perfil forense, Mural de Transparência Processual (RMAs, Editais, QGC, Laudos) e roteamento de captação qualificada.
      </desc>
      <DgmDefs uid={uid} />

      <rect className="dgm-group" x="18" y="24" width="864" height="110" rx="14" />
      <text className="dgm-group-label" x="34" y="46">CAMADA DE APRESENTAÇÃO · REACT 18 + TYPESCRIPT + TAILWIND V4 + MOTION</text>
      {pillars.map(([title, line], i) => (
        <DgmNode key={title} x={pillarsX[i]} y={60} w={260} h={60} title={title} lines={[line]} />
      ))}

      <DgmLink uid={uid} d="M166,134 V184" accent />
      <DgmLink uid={uid} d="M450,134 V184" />
      <DgmLink uid={uid} d="M734,134 V184" />

      <DgmNode
        x={36}
        y={184}
        w={400}
        h={110}
        title="Mural de Transparência Processual"
        lines={[
          "Metadados por Processo, Juízo/Vara e Partes",
          "Relatórios Mensais de Atividades (RMA) & Atas AGC",
          "Quadro Geral de Credores & Editais (Lei 11.101/05)"
        ]}
        accent
      />

      <DgmNode
        x={464}
        y={184}
        w={400}
        h={110}
        title="Central de Pareceres & Assistência Técnica"
        lines={[
          "Exame de Assinaturas, Rasuras e Lavagens Químicas",
          "Atuação como Perita Nomeada pelo Juízo",
          "Atuação como Assistente Técnica para Bancas e Partes"
        ]}
      />

      <DgmLink uid={uid} d="M236,294 V358 H450 V388" accent />
      <DgmLink uid={uid} d="M664,294 V358 H450 V388" />

      <DgmNode
        x={140}
        y={388}
        w={620}
        h={90}
        title="Canal de Atendimento Forense & Captação Qualificada"
        lines={[
          "Acesso público desburocratizado para Credores e Magistrados",
          "Triagem direta por WhatsApp, Telefone e E-mail para Escritórios Parceiros"
        ]}
      />
    </svg>
  );
}

window.DIAGRAMS = {
  fluxo: FluxoDiagram,
  fluxoacademy: FluxoAcademyDiagram,
  judicial: JudicialDiagram
};
