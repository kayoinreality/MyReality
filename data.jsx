// Data: i18n strings + projects + experience
const STRINGS = {
  pt: {
    nav: { work: "Projetos", about: "Sobre", experience: "Experiência", now: "Agora", contact: "Contato" },
    hero: {
      role: "Analista de Logística & Desenvolvedor",
      location: "Goiânia, BR",
      available: "Disponível para freelas",
      lead1: "Construo software com a mesma disciplina que aplico em rastreamento de frota:",
      lead2: " observabilidade, métricas e processo.",
      scroll: "rolar"
    },
    project: {
      problem: "O problema",
      build: "O que construí",
      decisions: "Decisões técnicas",
      status: "Status",
      open: "abrir case study",
      close: "fechar",
      privateCode: "Código privado"
    },
    sections: {
      selected: "Trabalho selecionado",
      selectedSub: "Clique em qualquer projeto para abrir o case study",
      about: "Sobre",
      experience: "Experiência",
      now: "Agora",
      nowSub: "O que estou fazendo neste momento",
      contact: "Vamos conversar",
      contactSub: "Aberto a freelas, colaborações e conversas técnicas"
    },
    about: {
      p1: "Sou Kayo, analista de logística focado em rastreamento de frota e construção de KPIs para operações de última milha. Trabalho com Power BI, SQL, Python (pandas) e dashboards customizados que conectam telemetria, planejamento e execução.",
      p2: "Fora do CLT, escrevo software com a mesma obsessão por instrumentação. Meus dois projetos maiores estão no ar: o Fluxo, um app de finanças com web em Next.js e mobile em Flutter nativo sobre Firebase, e a Aura Educacional, uma LMS multi-tenant em Next.js + Hono no Cloud Run. Também publico bibliotecas open source — um motor de rate limiting de janela deslizante sobre Redis, com pacotes para Express e Fastify.",
      p3: "Acredito que produto bom é produto medido. Não escrevo linha sem perguntar como vou observá-la em produção."
    },
    stack: "Stack principal",
    experience: [
      {
        period: "2023 — agora",
        role: "Analista de Logística",
        company: "Operação de última milha",
        bullets: [
          "Rastreamento ao vivo de frota via plataforma mytracking; auditoria de SLA porta-a-porta.",
          "Desenho e implantação de KPIs operacionais (OTD, OTIF, ocorrências/100 entregas, tempo de fila).",
          "Dashboards em Power BI e Python conectados ao banco operacional, reduzindo tempo de fechamento gerencial."
        ]
      },
      {
        period: "2024 — agora",
        role: "Desenvolvedor independente",
        company: "Projetos paralelos",
        bullets: [
          "Fluxo — app de finanças no ar em fluxo.finance: monorepo com 5 apps, web em Next.js, mobile em Flutter nativo, Firebase e cobrança real via Stripe.",
          "Aura Educacional — LMS multi-tenant no ar em auraorg.com.br (Next.js, Hono, Cloud Run, Postgres, Stripe, Mux).",
          "Bibliotecas open source de rate limiting sobre Redis, com janela deslizante exata e pacotes para Express e Fastify.",
          "Site de assessoria jurídica em produção para escritório real."
        ]
      },
      {
        period: "2022 — 2024",
        role: "Bacharelado em Sistemas de Informação",
        company: "PUC Goiás",
        bullets: [
          "Projeto Integrador: Agenda Aura — protótipo navegável + backlog Jira + Figma.",
          "Foco em engenharia de software, banco de dados e gestão de projetos."
        ]
      }
    ],
    now: {
      status: "Construindo o Fluxo",
      statusSub: "Assinatura via Stripe no ar no web. Próximo: Google Play Billing e proxy da LLM em Cloud Function.",
      statusTags: ["Flutter", "Firebase", "Stripe"],
      reading: "Lendo",
      readingValue: "Designing Data-Intensive Applications — Kleppmann",
      listening: "Ouvindo",
      learning: "Estudando",
      learningValue: "Open Finance via agregador e MCP remoto em Cloud Run",
      location: "De Goiânia, GO",
      updated: "Atualizado em"
    },
    contact: {
      cta: "Mande um email",
      orFollow: "Ou me siga em",
      copy: "copiar",
      copied: "copiado!"
    },
    footer: {
      built: "Construído à mão com HTML, CSS e React.",
      konami: "Tente o Konami Code."
    }
  },
  en: {
    nav: { work: "Work", about: "About", experience: "Experience", now: "Now", contact: "Contact" },
    hero: {
      role: "Logistics Analyst & Developer",
      location: "Goiânia, BR",
      available: "Available for freelance",
      lead1: "I build software with the same discipline I apply to fleet tracking:",
      lead2: " observability, metrics, and process.",
      scroll: "scroll"
    },
    project: {
      problem: "The problem",
      build: "What I built",
      decisions: "Technical decisions",
      status: "Status",
      open: "open case study",
      close: "close",
      privateCode: "Private codebase"
    },
    sections: {
      selected: "Selected work",
      selectedSub: "Click any project to open the case study",
      about: "About",
      experience: "Experience",
      now: "Now",
      nowSub: "What I'm doing at this very moment",
      contact: "Let's talk",
      contactSub: "Open to freelance, collaborations and technical chats"
    },
    about: {
      p1: "I'm Kayo, a logistics analyst focused on fleet tracking and KPI design for last-mile operations. I work with Power BI, SQL, Python (pandas) and custom dashboards connecting telemetry, planning and execution.",
      p2: "Off the clock I write software with the same instrumentation obsession. My two largest projects are live: Fluxo, a personal finance app with a Next.js web app and a native Flutter mobile app on Firebase, and Aura Educacional, a multi-tenant LMS in Next.js + Hono on Cloud Run. I also publish open-source libraries — a sliding-window rate limiting engine on Redis, with packages for Express and Fastify.",
      p3: "I believe good product is measured product. I don't ship a line without asking how I'll observe it in production."
    },
    stack: "Main stack",
    experience: [
      {
        period: "2023 — now",
        role: "Logistics Analyst",
        company: "Last-mile operations",
        bullets: [
          "Live fleet tracking via mytracking platform; door-to-door SLA audit.",
          "Design and rollout of operational KPIs (OTD, OTIF, incidents/100 deliveries, queue time).",
          "Power BI and Python dashboards wired to the operational DB, cutting management close time."
        ]
      },
      {
        period: "2024 — now",
        role: "Independent developer",
        company: "Side projects",
        bullets: [
          "Fluxo — personal finance app live at fluxo.finance: 5-app monorepo, Next.js web, native Flutter mobile, Firebase and real Stripe billing.",
          "Aura Educacional — multi-tenant LMS live at auraorg.com.br (Next.js, Hono, Cloud Run, Postgres, Stripe, Mux).",
          "Open-source Redis rate limiting libraries with an exact sliding window and packages for Express and Fastify.",
          "Live legal-services site for a real law firm."
        ]
      },
      {
        period: "2022 — 2024",
        role: "BS in Information Systems",
        company: "PUC Goiás",
        bullets: [
          "Capstone: Agenda Aura — clickable prototype + Jira backlog + Figma.",
          "Software engineering, databases and project management focus."
        ]
      }
    ],
    now: {
      status: "Building Fluxo",
      statusSub: "Stripe subscription live on the web. Next: Google Play Billing and an LLM proxy in a Cloud Function.",
      statusTags: ["Flutter", "Firebase", "Stripe"],
      reading: "Reading",
      readingValue: "Designing Data-Intensive Applications — Kleppmann",
      listening: "Listening",
      learning: "Learning",
      learningValue: "Open Finance via an aggregator and a remote MCP server on Cloud Run",
      location: "From Goiânia, BR",
      updated: "Updated"
    },
    contact: {
      cta: "Send an email",
      orFollow: "Or follow me on",
      copy: "copy",
      copied: "copied!"
    },
    footer: {
      built: "Hand-built with HTML, CSS and React.",
      konami: "Try the Konami Code."
    }
  }
};

const PROJECTS = [
  {
    id: "fluxo",
    n: "01",
    title: "Fluxo",
    year: "2026",
    type: { pt: "App de finanças · web + mobile", en: "Personal finance app · web + mobile" },
    role: { pt: "Solo · Full-stack", en: "Solo · Full-stack" },
    blurb: {
      pt: "Gestão financeira construída em volta da Jornada de Liberdade Financeira: você define a renda passiva que te faria livre e o app transforma isso em patrimônio alvo e etapas concretas. Monorepo com 5 apps — web, mobile nativo, admin, landing e um servidor MCP.",
      en: "Personal finance built around a Financial Freedom Journey: you set the passive income that would make you free, and the app turns it into a target net worth and concrete milestones. Monorepo with 5 apps — web, native mobile, admin, landing and an MCP server."
    },
    tags: ["Next.js", "Flutter", "TypeScript", "Dart", "Firebase", "Firestore", "Cloud Functions", "Stripe", "Turborepo", "MCP"],
    metric: { pt: "5 apps · ~32k linhas", en: "5 apps · ~32k lines" },
    links: [
      { kind: "live", label: { pt: "Ver ao vivo", en: "View live" }, href: "https://fluxo.finance" }
    ],
    privateRepo: true,
    study: {
      problem: {
        pt: "Os apps de finanças brasileiros são retrovisores: mostram muito bem para onde o dinheiro foi. Nenhum responde a pergunta que importa — isso me deixou mais perto ou mais longe de poder parar de trabalhar? O Fluxo inverte a peça central: o usuário define no onboarding a renda passiva mensal que o tornaria livre, e todo o resto do app passa a se referir a essa meta.",
        en: "Brazilian finance apps are rear-view mirrors: they show you exactly where the money went. None answer the question that matters — did that bring me closer to, or further from, being able to stop working? Fluxo inverts the centerpiece: during onboarding the user sets the monthly passive income that would make them free, and everything else in the app refers back to that goal."
      },
      build: {
        pt: [
          "Monorepo Turborepo com 5 aplicações: web em Next.js (App Router, export estático, PWA instalável), mobile em Flutter nativo para Android e iOS, painel admin, landing e um servidor MCP.",
          "Motor da jornada em packages/core (TypeScript), portado para Dart no app Flutter — os dois lados compartilham o mesmo modelo de domínio, não uma WebView.",
          "12 telas no web: Visão geral, Jornada, Transações, Cartões e contas, Investimentos, Dívidas, Previsão, Relatórios, Orçamentos e metas, Perfil, Onboarding e o chat 'Falar com o Fluxo'.",
          "23 Cloud Functions: Checkout e Customer Portal da Stripe, webhook de assinatura, chat com LLM, Google Play Billing, exclusão de conta exigida pela Play Store, taxas do Banco Central e e-mails transacionais.",
          "Firebase Auth e Cloud Firestore com regras de segurança por usuário."
        ],
        en: [
          "Turborepo monorepo with 5 apps: a Next.js web app (App Router, static export, installable PWA), a native Flutter app for Android and iOS, an admin panel, a landing page and an MCP server.",
          "The journey engine lives in packages/core (TypeScript) and is ported to Dart in the Flutter app — both sides share the same domain model, not a WebView.",
          "12 web screens: Overview, Journey, Transactions, Cards and accounts, Investments, Debts, Forecast, Reports, Budgets and goals, Profile, Onboarding and the 'Talk to Fluxo' chat.",
          "23 Cloud Functions: Stripe Checkout and Customer Portal, subscription webhook, LLM chat, Google Play Billing, the account deletion the Play Store requires, Central Bank rates and transactional email.",
          "Firebase Auth and Cloud Firestore with per-user security rules."
        ]
      },
      decisions: {
        pt: [
          "O webhook da Stripe é a única escrita permitida no campo plano do usuário — firestore.rules rejeita o cliente que tentar se auto-promover a assinante.",
          "Flutter nativo em vez de wrapper de WebView: a loja distribui um app de verdade, ao custo de manter o motor da jornada em duas linguagens.",
          "O servidor MCP expõe as finanças como ferramentas para qualquer LLM — dá para perguntar 'como está minha jornada?' de dentro do Claude ou do ChatGPT.",
          "Anúncios são ligados por configuração: sem IDs de AdSense/AdMob nenhuma requisição sai para terceiros, e o slot vira um convite para o plano pago.",
          "Cada categoria de gasto mostra quantos dias ela atrasou a liberdade do usuário — converter reais em tempo de vida é mais visceral que percentual."
        ],
        en: [
          "The Stripe webhook is the only writer allowed to touch the user's plan field — firestore.rules rejects any client trying to promote itself to a paid subscriber.",
          "Native Flutter over a WebView wrapper: the store ships a real app, at the cost of maintaining the journey engine in two languages.",
          "The MCP server exposes the user's finances as tools for any LLM — you can ask 'how's my journey going?' from inside Claude or ChatGPT.",
          "Ads are wired by configuration: with no AdSense/AdMob IDs set, no third-party request leaves the app and the slot becomes a prompt for the paid plan.",
          "Every spending category shows how many days it pushed the user's freedom back — turning money into life-time is far more visceral than a percentage."
        ]
      },
      status: {
        pt: "No ar em fluxo.finance. Assinatura Fluxo+ com cobrança real da Stripe em produção no web. Google Play Billing e Open Finance via agregador estão no roadmap. Código privado.",
        en: "Live at fluxo.finance. The Fluxo+ subscription bills for real through Stripe on the web. Google Play Billing and Open Finance via an aggregator are on the roadmap. Private codebase."
      }
    },
    swatch: "warm"
  },
  {
    id: "aura",
    n: "02",
    title: "Aura Educacional",
    year: "2025",
    type: { pt: "LMS multi-tenant", en: "Multi-tenant LMS" },
    role: { pt: "Solo · Full-stack", en: "Solo · Full-stack" },
    blurb: {
      pt: "Plataforma de cursos livres com assinatura e venda avulsa, certificados de horas verificáveis e CMS administrativo. Monorepo com 4 apps (web, learn, admin, api).",
      en: "Online-courses platform with subscription, one-off sales, verifiable hour certificates and admin CMS. Monorepo with 4 apps (web, learn, admin, api)."
    },
    tags: ["Next.js 15", "Hono", "Cloud Run", "Postgres", "Drizzle", "Stripe", "Mux", "Firebase Auth"],
    metric: { pt: "4 apps · monorepo", en: "4 apps · monorepo" },
    links: [
      { kind: "live", label: { pt: "Ver ao vivo", en: "View live" }, href: "https://auraorg.com.br" }
    ],
    privateRepo: true,
    study: {
      problem: {
        pt: "Cursos livres precisam emitir certificado de horas que alguém consiga verificar depois — e vender tanto por assinatura quanto avulso. As plataformas prontas cobram por aluno, prendem o conteúdo e não entregam um certificado auditável. A Aura resolve os dois lados numa base própria.",
        en: "Continuing-education courses need to issue hour certificates that someone can actually verify later — and to sell both by subscription and one-off. Off-the-shelf platforms charge per student, lock the content in and don't produce an auditable certificate. Aura solves both on its own foundation."
      },
      build: {
        pt: [
          "Monorepo com 4 aplicações: web (site público e catálogo), learn (player do aluno), admin (CMS interno) e api.",
          "API em Hono rodando em Cloud Run, com Postgres e Drizzle ORM.",
          "Player de vídeo com Mux, autenticação com Firebase Auth e pagamentos com Stripe.",
          "Certificados de horas com verificação pública e CMS interno para publicar cursos sem deploy.",
          "Documentação de arquitetura, deploy e segurança versionada junto do código."
        ],
        en: [
          "Monorepo with 4 apps: web (public site and catalog), learn (student player), admin (internal CMS) and api.",
          "Hono API running on Cloud Run, backed by Postgres and Drizzle ORM.",
          "Mux video player, Firebase Auth for authentication and Stripe for payments.",
          "Hour certificates with public verification, and an internal CMS to publish courses without a deploy.",
          "Architecture, deployment and security docs versioned alongside the code."
        ]
      },
      decisions: {
        pt: [
          "API em Hono no Cloud Run em vez de servidor sempre ligado: escala a zero e o custo acompanha o uso, que é o que um catálogo de cursos precisa.",
          "Multi-tenant desde o início — cada instituição tem seus cursos e sua marca sobre a mesma base.",
          "Mux em vez de vídeo próprio: streaming adaptativo e proteção de conteúdo sem manter pipeline de encoding.",
          "Drizzle em vez de ORM pesado: schema em TypeScript, migrations versionadas e SQL previsível."
        ],
        en: [
          "Hono on Cloud Run instead of an always-on server: it scales to zero and cost tracks usage, which is what a course catalog needs.",
          "Multi-tenant from day one — each institution gets its own courses and branding on the same foundation.",
          "Mux instead of self-hosted video: adaptive streaming and content protection without maintaining an encoding pipeline.",
          "Drizzle over a heavyweight ORM: TypeScript schema, versioned migrations and predictable SQL."
        ]
      },
      status: {
        pt: "No ar em auraorg.com.br. Código privado.",
        en: "Live at auraorg.com.br. Private codebase."
      }
    },
    swatch: "cool"
  },
  {
    id: "slidinglimiter",
    n: "03",
    title: { pt: "Rate limiters de janela deslizante", en: "Sliding-window rate limiters" },
    year: "2026",
    type: { pt: "Bibliotecas open source", en: "Open-source libraries" },
    role: { pt: "Solo · Autor", en: "Solo · Author" },
    blurb: {
      pt: "Dois pacotes irmãos — um para Express, outro para Fastify — sobre o mesmo motor: janela deslizante exata em sorted sets do Redis, vários limites avaliados atomicamente num único round trip. Zero dependências de runtime.",
      en: "Two sibling packages — one for Express, one for Fastify — over the same engine: exact sliding window on Redis sorted sets, several limits evaluated atomically in a single round trip. Zero runtime dependencies."
    },
    tags: ["TypeScript", "Redis", "Lua", "Express", "Fastify", "Node.js", "MIT"],
    metric: { pt: "2 pacotes · MIT", en: "2 packages · MIT" },
    links: [
      { kind: "repo", label: { pt: "Express", en: "Express" }, href: "https://github.com/kayoinreality/express-rate-limit-redis-sliding" },
      { kind: "repo", label: { pt: "Fastify", en: "Fastify" }, href: "https://github.com/kayoinreality/fastify-sliding-limiter" }
    ],
    study: {
      problem: {
        pt: "A maioria dos rate limiters conta requisições num balde indexado por floor(now / janela). O balde zera na virada, então o cliente que espera a fronteira recebe duas cotas cheias seguidas: 100 requisições às 00:59.999 e mais 100 às 01:00.000 — 200 em dois milissegundos, com o limite configurado em 100 por minuto. A janela deslizante conta os últimos N milissegundos a partir de agora, e a fronteira simplesmente deixa de existir.",
        en: "Most rate limiters count requests into a bucket keyed by floor(now / window). The bucket resets on rollover, so a client that waits for the boundary gets two full quotas back to back: 100 requests at 00:59.999 and another 100 at 01:00.000 — 200 in two milliseconds, with the limit set to 100 per minute. A sliding window counts the last N milliseconds from now, and the boundary stops existing."
      },
      build: {
        pt: [
          "Um sorted set do Redis por camada de limite, com uma entrada por unidade de requisição pontuada pelo timestamp — exato, sem aproximação nem suavização.",
          "Um script Lua por requisição (EVALSHA, com EVAL só no NOSCRIPT) que apara a cauda vencida, conta o que sobrou e só grava se todas as camadas tiverem espaço.",
          "Headers no formato IETF draft-8, com draft-7, draft-6 e X-RateLimit-* legado disponíveis para migração gradual.",
          "Núcleo exportado à parte, para limitar frames de websocket ou jobs de fila — qualquer coisa que não seja uma requisição HTTP.",
          "Suíte de testes contra um Redis de verdade, subido numa porta efêmera: o valor do pacote está na semântica do script Lua, e um mock só testaria a si mesmo."
        ],
        en: [
          "One Redis sorted set per limit tier, with one entry per request unit scored by timestamp — exact, with no approximation or smoothing.",
          "One Lua script per request (EVALSHA, falling back to EVAL only on NOSCRIPT) that trims the expired tail, counts what remains and writes only if every tier has room.",
          "Headers in IETF draft-8 format, with draft-7, draft-6 and legacy X-RateLimit-* available for a staged migration.",
          "The core is exported separately, to limit websocket frames or queue jobs — anything that isn't an HTTP request.",
          "Test suite against a real Redis on an ephemeral port: the value of the package is in the Lua script's semantics, and a mock would only test itself."
        ]
      },
      decisions: {
        pt: [
          "Vários limites (um teto de rajada e um orçamento sustentado) são avaliados e gravados no mesmo script: se a rajada rejeita, o sustentado não é cobrado. Dois middlewares separados dariam dois round trips e esse bug silencioso.",
          "O relógio vem do TIME do Redis, não do processo — poucos segundos de deriva entre instâncias alargam ou estreitam a janela dependendo de onde a requisição cair.",
          "IPv6 é mascarado para /56 antes de virar chave: um assinante recebe rotineiramente um /64 inteiro, e limitar o endereço puro deixaria um cliente ciclar por bilhões deles.",
          "As chaves usam hash tag de Redis Cluster para que todas as camadas de um cliente caiam no mesmo slot, já que o script é multi-key.",
          "Em falha do Redis o padrão é deixar passar, para a API não cair junto — mas endpoint de login quer o oposto, então onError: 'deny' é configurável por rota."
        ],
        en: [
          "Multiple limits (a burst ceiling and a sustained budget) are evaluated and committed in the same script: if burst rejects, sustained is never charged. Two separate middlewares would mean two round trips and that silent bug.",
          "The clock comes from Redis TIME, not the process — a few seconds of drift between instances silently widens or narrows the window depending on where a request lands.",
          "IPv6 is masked to a /56 before becoming a key: a single subscriber is routinely handed an entire /64, and limiting the bare address would let one client cycle through billions of them.",
          "Keys use a Redis Cluster hash tag so all of a client's tiers land in one slot, since the script is multi-key.",
          "When Redis fails the default is to let requests through, so the API doesn't go down with it — but a login endpoint wants the opposite, so onError: 'deny' is configurable per route."
        ]
      },
      status: {
        pt: "Código aberto no GitHub sob licença MIT, com typecheck, lint, build e testes de integração no repositório. Ainda não publicados no npm.",
        en: "Open source on GitHub under the MIT license, with typecheck, lint, build and integration tests in the repo. Not published to npm yet."
      }
    },
    swatch: "neutral"
  },
  {
    id: "dashmytracking",
    n: "04",
    title: "DashMytracking",
    year: "2024",
    type: { pt: "Dashboard gerencial", en: "Management dashboard" },
    role: { pt: "Análise · Engenharia de dados", en: "Analytics · Data engineering" },
    blurb: {
      pt: "Dashboard em Python para análise gerencial sobre rotas do mytracking. Conecta telemetria de frota com KPIs de OTD, OTIF e ocorrências.",
      en: "Python dashboard for management analytics on mytracking routes. Connects fleet telemetry with OTD, OTIF and incident KPIs."
    },
    tags: ["Python", "pandas", "Plotly", "Power BI", "SQL"],
    metric: { pt: "Uso interno · produção", en: "Internal · production" },
    links: [],
    privateRepo: true,
    study: {
      problem: {
        pt: "A plataforma de rastreamento mostra onde cada veículo está, mas o fechamento gerencial era montado à mão sobre planilhas exportadas. A pergunta operacional — quantas entregas saíram do prazo e por quê — levava dias para ser respondida.",
        en: "The tracking platform shows where each vehicle is, but the management close was assembled by hand from exported spreadsheets. The operational question — how many deliveries missed the window, and why — took days to answer."
      },
      build: {
        pt: [
          "Dashboard em Python conectado ao banco operacional, cruzando telemetria de frota com o planejamento de rotas.",
          "KPIs de OTD, OTIF, ocorrências por 100 entregas e tempo de fila calculados no mesmo lugar em que a operação já olhava.",
          "Distribuição em Power BI para a camada gerencial."
        ],
        en: [
          "Python dashboard wired to the operational database, joining fleet telemetry with route planning.",
          "OTD, OTIF, incidents per 100 deliveries and queue-time KPIs computed where the operation was already looking.",
          "Power BI distribution for the management layer."
        ]
      },
      status: {
        pt: "Em uso interno na operação. Código privado — pertence ao contexto da empresa.",
        en: "In internal use by the operation. Private codebase — it belongs to the company's context."
      }
    },
    swatch: "cool"
  },
  {
    id: "antigravity",
    n: "05",
    title: "Antigravity",
    year: "2025",
    type: { pt: "App mobile", en: "Mobile app" },
    role: { pt: "Solo · React Native", en: "Solo · React Native" },
    blurb: {
      pt: "App de notas cross-platform com canvas interativo infinito. Drag-and-drop, persistência MMKV e dark mode automático. iOS, Android e Web.",
      en: "Cross-platform notes app with an infinite interactive canvas. Drag-and-drop, MMKV persistence and auto dark mode. iOS, Android and Web."
    },
    tags: ["React Native", "Expo 54", "Zustand", "MMKV", "Reanimated", "TypeScript"],
    metric: { pt: "3 plataformas", en: "3 platforms" },
    links: [
      { kind: "repo", label: { pt: "Código", en: "Source" }, href: "https://github.com/kayoinreality/Antigravity" }
    ],
    study: {
      problem: {
        pt: "App de notas em lista força uma ordem que nem toda ideia tem. O Antigravity troca a lista por um canvas infinito onde a posição da nota é parte do significado.",
        en: "List-based note apps impose an order that not every idea has. Antigravity swaps the list for an infinite canvas where a note's position is part of its meaning."
      },
      build: {
        pt: [
          "Canvas interativo infinito com drag-and-drop, animado com Reanimated.",
          "Estado em Zustand e persistência local em MMKV.",
          "Dark mode automático e a mesma base rodando em iOS, Android e Web via Expo."
        ],
        en: [
          "Infinite interactive canvas with drag-and-drop, animated with Reanimated.",
          "Zustand for state and MMKV for local persistence.",
          "Automatic dark mode, with one codebase running on iOS, Android and Web through Expo."
        ]
      },
      status: {
        pt: "Código aberto no GitHub.",
        en: "Open source on GitHub."
      }
    },
    swatch: "neutral"
  },
  {
    id: "judicial",
    n: "06",
    title: { pt: "Administração Judicial", en: "Judicial Administration" },
    year: "2024",
    type: { pt: "Site institucional", en: "Institutional site" },
    role: { pt: "Cliente real", en: "Real client" },
    blurb: {
      pt: "Site de assessoria jurídica para escritório real, com captação de leads, área de serviços e identidade institucional sóbria.",
      en: "Legal-services website for a real law firm, with lead capture, services area and a sober institutional identity."
    },
    tags: ["HTML", "CSS", "JavaScript", "SEO"],
    metric: { pt: "Cliente em produção", en: "Client in production" },
    links: [
      { kind: "repo", label: { pt: "Código", en: "Source" }, href: "https://github.com/kayoinreality/Adminstra-o-Judicial" }
    ],
    study: {
      problem: {
        pt: "Escritório de assessoria jurídica sem presença digital, dependendo só de indicação. Precisava de um site que passasse seriedade institucional e capturasse contato de quem chega pela busca.",
        en: "A legal-services firm with no digital presence, running purely on referrals. It needed a site that conveyed institutional seriousness and captured contact details from people arriving through search."
      },
      build: {
        pt: [
          "Site institucional com área de serviços e captação de leads.",
          "Identidade visual sóbria, adequada ao setor jurídico.",
          "Estrutura e semântica pensadas para busca orgânica."
        ],
        en: [
          "Institutional site with a services area and lead capture.",
          "A sober visual identity, appropriate to the legal sector.",
          "Structure and semantics built for organic search."
        ]
      },
      status: {
        pt: "Entregue e em produção para cliente real. Primeiro trabalho pago em código.",
        en: "Delivered and in production for a real client. First paid work in code."
      }
    },
    swatch: "warm"
  },
  {
    id: "puc",
    n: "07",
    title: "Agenda Aura — PUC",
    year: "2024",
    type: { pt: "Projeto Integrador", en: "Capstone project" },
    role: { pt: "Tech lead acadêmico", en: "Academic tech lead" },
    blurb: {
      pt: "Agendador de atividades internas para a Aura Educacional. Entregue com protótipo navegável, backlog no Jira e wireframes no Figma.",
      en: "Internal activity scheduler for Aura Educacional. Delivered with a clickable prototype, Jira backlog and Figma wireframes."
    },
    tags: ["HTML", "CSS", "JavaScript", "Figma", "Jira"],
    metric: { pt: "Entregue · PUC Goiás", en: "Delivered · PUC Goiás" },
    links: [
      { kind: "repo", label: { pt: "Código", en: "Source" }, href: "https://github.com/kayoinreality/projeto-integrador-puc-goias" }
    ],
    study: {
      problem: {
        pt: "Projeto Integrador do curso: entregar um agendador de atividades internas para a Aura Educacional com o processo completo, não só o código.",
        en: "Course capstone: deliver an internal activity scheduler for Aura Educacional with the full process behind it, not just the code."
      },
      build: {
        pt: [
          "Protótipo navegável do agendador de atividades.",
          "Wireframes no Figma e backlog gerenciado no Jira.",
          "Documentação de requisitos e modelagem de dados."
        ],
        en: [
          "Clickable prototype of the activity scheduler.",
          "Figma wireframes and a backlog managed in Jira.",
          "Requirements documentation and data modeling."
        ]
      },
      status: {
        pt: "Entregue na PUC Goiás. Virou o ponto de partida conceitual da Aura Educacional.",
        en: "Delivered at PUC Goiás. It became the conceptual starting point for Aura Educacional."
      }
    },
    swatch: "cool"
  },
  {
    id: "discordbot",
    n: "08",
    title: "Discord Bot",
    year: "2023",
    type: { pt: "Primeiro projeto JS", en: "First JS project" },
    role: { pt: "Solo · Aprendizado", en: "Solo · Learning" },
    blurb: {
      pt: "Meu primeiro bot de Discord em JavaScript. Marco da minha entrada em programação — onde aprendi event-driven, async/await e APIs REST.",
      en: "My first Discord bot in JavaScript. The milestone of my entry into programming — where I learned event-driven, async/await and REST APIs."
    },
    tags: ["JavaScript", "Node.js", "Discord.js"],
    metric: { pt: "Origem", en: "Origin" },
    links: [
      { kind: "repo", label: { pt: "Código", en: "Source" }, href: "https://github.com/kayoinreality/Discordbot" }
    ],
    study: {
      problem: {
        pt: "Queria automatizar tarefas do servidor de Discord que eu usava com amigos. Não sabia programar — o bot foi a desculpa para aprender.",
        en: "I wanted to automate chores on the Discord server I used with friends. I couldn't program — the bot was the excuse to learn."
      },
      build: {
        pt: [
          "Bot em Node.js com Discord.js respondendo a comandos e eventos do servidor.",
          "Onde aprendi programação orientada a eventos, async/await e consumo de APIs REST."
        ],
        en: [
          "Node.js bot built with Discord.js, responding to server commands and events.",
          "Where I learned event-driven programming, async/await and consuming REST APIs."
        ]
      },
      status: {
        pt: "Arquivado. Fica no portfólio como marco de origem — é onde tudo começou.",
        en: "Archived. It stays in the portfolio as an origin marker — it's where everything started."
      }
    },
    swatch: "neutral"
  }
];

const STACK = [
  "TypeScript", "Next.js", "React", "React Native", "Flutter", "Dart",
  "Node.js", "Hono", "PostgreSQL", "Drizzle", "Redis", "Python", "pandas",
  "Power BI", "SQL", "Stripe", "Firebase", "Firestore", "Cloud Run",
  "Turborepo", "MCP", "Tailwind", "Figma", "Git"
];

const SOCIAL = [
  { id: "email", label: "Email", value: "kayorodrigodzn@gmail.com", href: "mailto:kayorodrigodzn@gmail.com", copyable: true },
  { id: "linkedin", label: "LinkedIn", value: "/in/kayo-santos", href: "https://www.linkedin.com/in/kayo-santos/", copyable: false },
  { id: "github", label: "GitHub", value: "@kayoinreality", href: "https://github.com/kayoinreality", copyable: false }
];

// Spotify mock — placeholder while real integration isn't wired
const SPOTIFY_NOW = {
  track: "Sundial",
  artist: "Noname",
  album: "Sundial",
  progress: 0.42,
  duration: "3:18",
  current: "1:23"
};

window.STRINGS = STRINGS;
window.PROJECTS = PROJECTS;
window.STACK = STACK;
window.SOCIAL = SOCIAL;
window.SPOTIFY_NOW = SPOTIFY_NOW;
