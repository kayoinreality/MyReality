// ─── Dados Institucionais da Reality · Software Sob Medida ───

const SOLUTIONS = [
  {
    id: "saas-produtos",
    number: "01",
    tag: "PRODUTOS DIGITAIS & SAAS",
    title: "Plataformas SaaS & Apps Nativos Multiplataforma",
    subtitle: "Do modelo de domínio ao checkout recorrente em produção.",
    description:
      "Projetamos e construímos produtos digitais completos para empresas e fundadores que precisam escalar sem depender de plataformas alugadas. Arquitetura monorepo com Web em Next.js, aplicativos nativos em Flutter (iOS e Android), cobrança híbrida via Stripe e infraestrutura elástica.",
    deliverables: [
      "Monorepo Web (Next.js) + Mobile Nativo (Flutter) com domínio compartilhado",
      "Sistemas Multi-Tenant, autenticação segura e controle granular de permissões (RLS)",
      "Motor de assinaturas, vendas avulsas, Customer Portal e webhooks idempotentes (Stripe)",
      "Painel administrativo (CMS/Backoffice) próprio para operar sem depender de código"
    ],
    relatedCases: ["fluxo", "fluxoacademy"],
    whatsappPrompt:
      "Olá, equipe da Reality! Quero conversar sobre o desenvolvimento de uma Plataforma SaaS / Aplicativo sob medida."
  },
  {
    id: "portais-operacao",
    number: "02",
    tag: "SISTEMAS & PORTAIS CORPORATIVOS",
    title: "Portais Institucionais de Alta Autoridade & Transparência",
    subtitle: "Sistemas sob medida para operações jurídicas, educacionais e corporativas.",
    description:
      "Quando o seu escritório ou instituição precisa transmitir rigor técnico, disponibilizar documentos auditáveis para clientes, juízos ou alunos e converter demandas de alto valor, um template genérico não basta. Construímos portais rápidos, seguros e desenhados exatamente para o fluxo do seu setor.",
    deliverables: [
      "Murais de transparência processual, consulta pública de documentos e certificados verificáveis",
      "Portais de clientes e áreas restritas com geração automatizada de laudos e PDFs",
      "Identidade visual de alto padrão com animações fluidas (Lenis, GSAP e Motion)",
      "Estrutura técnica otimizada para SEO, acessibilidade e conversão direta no WhatsApp"
    ],
    relatedCases: ["judicial", "fluxoacademy"],
    whatsappPrompt:
      "Olá, equipe da Reality! Gostaria de orçar um Portal Institucional / Sistema de Transparência sob medida para minha empresa."
  },
  {
    id: "arquitetura-ia",
    number: "03",
    tag: "APIS, DADOS & INTELIGÊNCIA ARTIFICIAL",
    title: "Engenharia de Backend, Automação & Agentes IA (MCP)",
    subtitle: "Integrações críticas, segurança de dados e IA conectada ao seu negócio.",
    description:
      "Modernizamos operações manuais e conectamos inteligência artificial aos dados reais da sua empresa com segurança e conformidade LGPD. De APIs de baixa latência no Cloud Run a tutores inteligentes e servidores Model Context Protocol (MCP) que permitem operar seu sistema por linguagem natural.",
    deliverables: [
      "APIs em Hono / Node.js no Google Cloud Run com PostgreSQL (Drizzle / Supabase)",
      "Assistentes de IA e categorização automatizada com chaves protegidas no servidor",
      "Servidores MCP (Model Context Protocol) para integração nativa com Claude e ChatGPT",
      "Filas assíncronas (Cloud Tasks), geração de documentos em lote e auditoria de segurança"
    ],
    relatedCases: ["fluxo", "fluxoacademy"],
    whatsappPrompt:
      "Olá, equipe da Reality! Preciso de uma solução sob medida envolvendo APIs, Automação de Dados ou Inteligência Artificial."
  }
];

const ENGINEERING_PILLARS = [
  {
    code: "ENG-01",
    title: "Soberania Total de Código & Dados",
    metric: "Zero Lock-in",
    description:
      "Plataformas alugadas cobram comissão por cliente e prendem a sua operação. Na Reality, o código-fonte, o banco de dados e a infraestrutura pertencem à sua empresa desde o primeiro commit."
  },
  {
    code: "ENG-02",
    title: "Segurança Financeira & LGPD por Design",
    metric: "RLS + HMAC",
    description:
      "Não confiamos no front-end para regras críticas: aplicamos Row-Level Security (RLS) direto no PostgreSQL, triggers que bloqueiam escalonamento de privilégios e webhooks Stripe validados com idempotência estrita."
  },
  {
    code: "ENG-03",
    title: "Infraestrutura que Escala com o Uso",
    metric: "Cloud-Native",
    description:
      "Desenhamos sistemas sobre Google Cloud Run, Vercel e Supabase/Cloud SQL que escalam a zero em horários ociosos e suportam picos de tráfego mantendo o custo mensal enxuto e previsível."
  },
  {
    code: "ENG-04",
    title: "Experiência Nativa & Performance Real",
    metric: "Web + Flutter",
    description:
      "Nada de wrappers lentos em WebView. Quando o produto exige mobile e web, compartilhamos o núcleo de regras de negócio entre TypeScript e Dart nativo para entregar fluidez de 60/120fps."
  }
];

const PROCESS_STEPS = [
  {
    step: "01",
    phase: "DIAGNÓSTICO & RECORTE",
    duration: "Semana 1",
    title: "Entendemos a operação antes de escrever uma linha de código.",
    description:
      "Mergulhamos na dor real do seu negócio: onde o processo trava, o que as ferramentas prontas não resolvem e qual é o menor recorte de alto impacto para colocar em produção primeiro.",
    outputs: ["Mapeamento do problema e fluxos críticos", "Definição de arquitetura e stack ideal", "Proposta técnica com escopo e cronograma fechados"]
  },
  {
    step: "02",
    phase: "ARQUITETURA & PROTOTIPAGEM",
    duration: "Semanas 2 — 3",
    title: "Modelagem de banco, contratos de API e interface navegável.",
    description:
      "Desenhamos o esquema de dados (PostgreSQL/Drizzle), as regras de segurança e a direção visual da aplicação. Você valida a experiência e a hierarquia das telas antes da construção pesada.",
    outputs: ["Design System e telas de alta fidelidade", "Modelagem de banco de dados e políticas RLS", "Contratos de API (Zod) e plano de integrações"]
  },
  {
    step: "03",
    phase: "ENGENHARIA PONTA A PONTA",
    duration: "Ciclos Semanais",
    title: "Construção iterativa com entregas visíveis em ambiente de homologação.",
    description:
      "Desenvolvemos front-end, back-end, mobile, pagamentos (Stripe) e automações em ciclos transparentes. A cada etapa você testa o software real rodando, sem caixas-pretas.",
    outputs: ["Aplicação Web / Mobile funcional em staging", "Integração de pagamentos, autenticação e filas", "Testes automatizados de regras de negócio e segurança"]
  },
  {
    step: "04",
    phase: "DEPLOY, OPERAÇÃO & EVOLUÇÃO",
    duration: "Go-Live & Contínuo",
    title: "Entrada em produção com observabilidade, documentação e suporte.",
    description:
      "Configuramos pipelines CI/CD, domínios, certificados, backups e monitoramento. Entregamos toda a documentação de arquitetura (`ARCHITECTURE.md` e `SECURITY.md`) versionada junto ao código.",
    outputs: ["Deploy automatizado em produção (Cloud Run / Vercel)", "Documentação técnica e de segurança completa", "Acompanhamento pós-lançamento e evolução contínua"]
  }
];

const FAQS = [
  {
    q: "Por que construir um software sob medida com a Reality em vez de usar uma plataforma pronta?",
    a: "Soluções de prateleira funcionam bem para necessidades genéricas, mas cobram mensalidades por usuário, retêm percentuais da sua receita e impõem limites quando sua operação cresce (como vimos na criação da Fluxo Academy e do Fluxo Finance). Um software sob medida adapta-se 100% à sua regra de negócio, reduz custos variáveis de escala e torna-se um ativo próprio da sua empresa."
  },
  {
    q: "O código-fonte e o banco de dados ficam em nome da minha empresa?",
    a: "Sim, integralmente. Desde o início do projeto, repositórios, contas de nuvem (Google Cloud, Vercel, Supabase, AWS) e gateways de pagamento (Stripe) podem ser provisionados diretamente sob a titularidade da sua empresa, com documentação completa de arquitetura e deploy."
  },
  {
    q: "Vocês desenvolvem apenas o site/front-end ou o sistema completo com aplicativo e API?",
    a: "Entregamos a engenharia ponta a ponta: interface web (Next.js/React), aplicativos móveis nativos para iOS e Android (Flutter), APIs de alta performance (Hono/Node.js), bancos de dados relacionais (PostgreSQL), integrações de pagamento (Stripe), geração de documentos em PDF e agentes de Inteligência Artificial."
  },
  {
    q: "Como funciona o primeiro contato e o orçamento pelo WhatsApp?",
    a: "Você pode usar o nosso Configurador de Escopo aqui na página ou clicar em qualquer botão de WhatsApp. Em uma conversa rápida e sem burocracia, entendemos o contexto do seu problema, avaliamos a viabilidade técnica e apresentamos uma proposta estruturada com etapas, prazos e investimento."
  }
];

// Dados interativos para os Simuladores Motion dos 3 Estudos de Caso
const FLUXO_CATEGORIES_DEMO = [
  { name: "Delivery & Restaurantes", monthly: 920, icon: "🍽️", color: "#e06d53" },
  { name: "Assinaturas & Streaming", monthly: 280, icon: "📺", color: "#d4a359" },
  { name: "Compras por Impulso", monthly: 650, icon: "🛍️", color: "#c95b5b" }
];

const FLUXO_STAGES = [
  {
    stage: 1,
    title: "Organize seu Fluxo",
    targetPct: 5,
    lesson: "Clareza vem antes de rentabilidade: mapeie entradas, custos fixos e estanque vazamentos invisíveis.",
    nextAction: "Categorizar extrato do mês e definir teto para 3 categorias variáveis."
  },
  {
    stage: 2,
    title: "Reserva de Paz (6 meses)",
    targetPct: 20,
    lesson: "A reserva impede que um imprevisto desmonte seus investimentos de longo prazo.",
    nextAction: "Automatizar transferência mensal para liquidez diária (100% CDI)."
  },
  {
    stage: 3,
    title: "Aceleração de Patrimônio",
    targetPct: 55,
    lesson: "Juros compostos trabalham sobre a constância do aporte + reinvestimento dos proventos.",
    nextAction: "Simular aumento de R$ 500 no aporte mensal e observar quantos meses você antecipa."
  },
  {
    stage: 4,
    title: "Independência Financeira",
    targetPct: 100,
    lesson: "Sua renda passiva mensal supera seu custo de vida. Trabalhar passa a ser escolha.",
    nextAction: "Manter balanceamento de carteira e regra de retirada segura (SWR)."
  }
];

const ACADEMY_CERT_DEMO = {
  code: "FLX-2026-9841-BR",
  studentName: "Dra. Helena Vasconcelos",
  instructorName: "Prof. Me. Ricardo Alencar",
  issuedAt: "14 Ago 2026 · 19:42 BRT",
  legalBasis: "Lei nº 9.394/96 (LDB Art. 42) · Decreto nº 5.154/04",
  originalTitle: "Gestão Pedagógica e Tecnologias Educacionais Ativas",
  originalHours: 120,
  finalScore: "96.5%"
};

const JUDICIAL_CASES_DEMO = [
  {
    id: "rj-01",
    category: "Recuperação Judicial",
    status: "Em Andamento · Fase de Cumprimento",
    title: "Recuperação Judicial — Grupo Agroindustrial Cerrado S/A",
    processNumber: "5419283-14.2025.8.09.0051",
    court: "2ª Vara Empresarial e de Recuperações — Comarca de Goiânia/GO",
    parties: "Devedora: Grupo Agroindustrial Cerrado S/A · Adm. Judicial: Amanda Silvestre",
    documents: [
      { name: "Relatório Mensal de Atividades (RMA) — Outubro/2026", date: "10 Out 2026", tag: "RMA" },
      { name: "Quadro Geral de Credores Consolidado (Art. 18 LRF)", date: "22 Set 2026", tag: "QGC" },
      { name: "Ata da Assembleia Geral de Credores — Aprovação do Plano", date: "04 Ago 2026", tag: "AGC" },
      { name: "Edital do Art. 52, §1º da Lei 11.101/2005", date: "15 Mai 2026", tag: "Edital" }
    ]
  },
  {
    id: "pericia-02",
    category: "Perícia Grafotécnica",
    status: "Laudo Entregue · Homologado",
    title: "Perícia Grafotécnica e Documentoscópica — Impugnação de Cédula de Crédito",
    processNumber: "5108472-88.2026.8.09.0149",
    court: "1ª Vara Cível — Comarca de Trindade/GO",
    parties: "Exame de autenticidade gráfica e detecção de montagem documental",
    documents: [
      { name: "Laudo Pericial Grafotécnico Conclusivo (Análise Óptica e Morfológica)", date: "18 Set 2026", tag: "Laudo" },
      { name: "Anexo Fotográfico Macro — Confronto de Punhos Escritores", date: "18 Set 2026", tag: "Perícia" },
      { name: "Esclarecimentos Técnicos aos Quesitos Complementares", date: "02 Out 2026", tag: "Quesitos" }
    ]
  },
  {
    id: "falencia-03",
    category: "Administração Judicial",
    status: "Arrecadação e Avaliação de Ativos",
    title: "Processo Falimentar — Metalúrgica Centro-Oeste Ltda.",
    processNumber: "5093811-05.2025.8.09.0051",
    court: "1ª Vara Empresarial — Comarca de Goiânia/GO",
    parties: "Massa Falida de Metalúrgica Centro-Oeste Ltda.",
    documents: [
      { name: "Auto de Arrecadação e Avaliação de Bens Ativos", date: "29 Set 2026", tag: "Ativos" },
      { name: "Relatório de Prestação de Contas da Massa Falida", date: "12 Out 2026", tag: "Contas" }
    ]
  }
];

window.SOLUTIONS = SOLUTIONS;
window.ENGINEERING_PILLARS = ENGINEERING_PILLARS;
window.PROCESS_STEPS = PROCESS_STEPS;
window.FAQS = FAQS;
window.FLUXO_CATEGORIES_DEMO = FLUXO_CATEGORIES_DEMO;
window.FLUXO_STAGES = FLUXO_STAGES;
window.ACADEMY_CERT_DEMO = ACADEMY_CERT_DEMO;
window.JUDICIAL_CASES_DEMO = JUDICIAL_CASES_DEMO;
