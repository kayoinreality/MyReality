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
    sections: {
      selected: "Trabalho selecionado",
      selectedSub: "Projetos pessoais e profissionais",
      about: "Sobre",
      experience: "Experiência",
      now: "Agora",
      nowSub: "O que estou fazendo neste momento",
      contact: "Vamos conversar",
      contactSub: "Aberto a freelas, colaborações e conversas técnicas"
    },
    about: {
      p1: "Sou Kayo, analista de logística focado em rastreamento de frota e construção de KPIs para operações de última milha. Trabalho com Power BI, SQL, Python (pandas) e dashboards customizados que conectam telemetria, planejamento e execução.",
      p2: "Fora do CLT, escrevo software com a mesma obsessão por instrumentação. Meu projeto mais ambicioso é a Aura Educacional — uma LMS multi-tenant em Next.js + Hono em Cloud Run com player de vídeo Mux, certificados verificáveis e CMS interno. Também mantenho protótipos em React Native, automações em Python e contribuições em ferramentas de código.",
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
          "Aura Educacional — LMS completa em monorepo (Next.js, Hono, Postgres, Stripe, Mux).",
          "Site de assessoria jurídica em produção para escritório real.",
          "Apps experimentais em React Native e contribuições open source."
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
      status: "Construindo a Aura Educacional",
      statusSub: "Foundation → Core público. Próximo: Stripe Checkout + course_access.",
      reading: "Lendo",
      readingValue: "Designing Data-Intensive Applications — Kleppmann",
      listening: "Ouvindo",
      learning: "Estudando",
      learningValue: "Drizzle ORM + arquitetura monorepo com pnpm workspaces",
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
    sections: {
      selected: "Selected work",
      selectedSub: "Personal and professional projects",
      about: "About",
      experience: "Experience",
      now: "Now",
      nowSub: "What I'm doing at this very moment",
      contact: "Let's talk",
      contactSub: "Open to freelance, collaborations and technical chats"
    },
    about: {
      p1: "I'm Kayo, a logistics analyst focused on fleet tracking and KPI design for last-mile operations. I work with Power BI, SQL, Python (pandas) and custom dashboards connecting telemetry, planning and execution.",
      p2: "Off the clock I write software with the same instrumentation obsession. My most ambitious project is Aura Educacional — a multi-tenant LMS in Next.js + Hono on Cloud Run, with Mux video player, verifiable certificates and internal CMS. I also maintain React Native prototypes, Python automations and open-source contributions.",
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
          "Aura Educacional — full LMS in a monorepo (Next.js, Hono, Postgres, Stripe, Mux).",
          "Live legal-services site for a real law firm.",
          "Experimental React Native apps and open-source contributions."
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
      status: "Building Aura Educacional",
      statusSub: "Foundation → Public core. Next: Stripe Checkout + course_access.",
      reading: "Reading",
      readingValue: "Designing Data-Intensive Applications — Kleppmann",
      listening: "Listening",
      learning: "Learning",
      learningValue: "Drizzle ORM + monorepo architecture with pnpm workspaces",
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
    id: "aura",
    n: "01",
    title: "Aura Educacional",
    year: "2025",
    type: { pt: "LMS multi-tenant", en: "Multi-tenant LMS" },
    role: { pt: "Solo · Full-stack", en: "Solo · Full-stack" },
    blurb: {
      pt: "Plataforma de cursos livres com assinatura e venda avulsa, certificados de horas verificáveis e CMS administrativo. Monorepo com 4 apps (web, learn, admin, api).",
      en: "Online-courses platform with subscription, one-off sales, verifiable hour certificates and admin CMS. Monorepo with 4 apps (web, learn, admin, api)."
    },
    tags: ["Next.js 15", "Hono", "Cloud Run", "Postgres", "Drizzle", "Stripe", "Mux", "Firebase Auth"],
    metric: { pt: "4 apps · 13 sem · MVP", en: "4 apps · 13 wk · MVP" },
    href: "https://github.com/kayoinreality/aura-educacional",
    swatch: "warm"
  },
  {
    id: "dashmytracking",
    n: "02",
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
    href: "#",
    swatch: "cool"
  },
  {
    id: "antigravity",
    n: "03",
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
    href: "https://github.com/kayoinreality/Antigravity",
    swatch: "neutral"
  },
  {
    id: "judicial",
    n: "04",
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
    href: "https://github.com/kayoinreality/Adminstra-o-Judicial",
    swatch: "warm"
  },
  {
    id: "puc",
    n: "05",
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
    href: "https://github.com/kayoinreality/projeto-integrador-puc-goias",
    swatch: "cool"
  },
  {
    id: "discordbot",
    n: "06",
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
    href: "https://github.com/kayoinreality/Discordbot",
    swatch: "neutral"
  }
];

const STACK = [
  "TypeScript", "Next.js", "React", "React Native", "Node.js", "Hono",
  "PostgreSQL", "Drizzle", "Python", "pandas", "Power BI", "SQL",
  "Stripe", "Firebase", "Cloud Run", "Tailwind", "Figma", "Git"
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
