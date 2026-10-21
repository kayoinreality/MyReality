// ─── REALITY · Engenharia de Software Sob Medida ───
// Dependências core empacotadas via esbuild (React 18, Lenis, GSAP + ScrollTrigger, Motion)
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { createRoot } from "react-dom/client";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

// Dados comerciais fictícios para a 1ª versão institucional da Reality
const COMPANY = {
  name: "Reality",
  legalName: "Reality Engenharia de Software Sob Medida Ltda.",
  tagline: "Software sob medida para operações reais.",
  domain: "myreality.tech",
  cnpj: "48.712.904/0001-88",
  location: "Goiânia, GO · Atendimento Nacional & Internacional",
  whatsappNumber: "5562999990000",
  whatsappDisplay: "+55 (62) 99999-0000",
  email: "contato@myreality.tech",
  founder: "Kayo Santos",
  github: "https://github.com/kayoinreality",
  linkedin: "https://www.linkedin.com/in/kayo-santos/",
  slaNote: "Resposta técnica em até 2 horas úteis via WhatsApp"
};

function buildWhatsAppUrl(customMessage) {
  const defaultText =
    "Olá, equipe da Reality! Acessei o site myreality.tech e gostaria de conversar sobre o desenvolvimento de um software sob medida.";
  const text = (customMessage && customMessage.trim()) ? customMessage.trim() : defaultText;
  return `https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

// Os 3 Estudos de Caso oficiais (baseados na leitura integral dos READMEs e docs de arquitetura)
const PROJECTS = [
  {
    id: "fluxo",
    slug: "fluxo-finance",
    diagram: "fluxo",
    n: "01",
    title: "Fluxo Finance",
    clientType: "Produto SaaS B2C · FinTech Multiplataforma",
    year: "2026",
    domain: "fluxo.finance",
    liveUrl: "https://fluxo.finance/",
    previewSrc: "assets/projects/fluxo.webp",
    previewAlt: "Interface do ecossistema Fluxo Finance — Jornada de Liberdade Financeira",
    accentColor: "#e06d53",
    badge: "SaaS Multiplataforma · Web + Mobile Nativo + IA/MCP",
    headline: "De retrovisor de gastos a GPS da Liberdade Financeira.",
    summary:
      "Plataforma completa de gestão financeira pessoal construída em torno da Jornada de Liberdade Financeira. Enquanto apps tradicionais apenas listam para onde o dinheiro foi, o Fluxo calcula o patrimônio-alvo a partir da renda passiva desejada e traduz cada decisão diária em dias de liberdade conquistados ou adiados.",
    metrics: [
      { value: "5 Apps", label: "Monorepo Turborepo (Web, Flutter, Admin, Landing, MCP)" },
      { value: "+Xd", label: "Custo em tempo de liberdade por categoria de gasto" },
      { value: "RLS + Trigger", label: "Segurança estrita no Supabase Postgres & Stripe" },
      { value: "MCP Nativo", label: "Integração direta com Claude, ChatGPT e DeepSeek" }
    ],
    tags: [
      "Next.js (App Router)",
      "Flutter Nativo (iOS/Android)",
      "TypeScript + Dart",
      "Supabase (Postgres + RLS)",
      "Stripe Checkout & Webhooks",
      "OpenRouter / OpenAI LLM",
      "Model Context Protocol (MCP)",
      "Resend",
      "Turborepo",
      "Vercel"
    ],
    privateRepo: true,
    links: [
      { kind: "live", label: "Acessar fluxo.finance", href: "https://fluxo.finance/" }
    ],
    study: {
      problemTitle: "Apps financeiros funcionam como retrovisores, não como GPS",
      problem:
        "Os aplicativos financeiros tradicionais do mercado brasileiro (como Mobills, Organizze e apps bancários) olham apenas para trás: mostram gráficos de onde o dinheiro já foi gasto, mas falham em responder à única pergunta que realmente importa para o usuário: 'esse gasto me deixou mais perto ou mais longe de poder viver de renda?'. Metas de poupança ficam soltas, sem conexão com o comportamento diário, gerando abandono do hábito logo nas primeiras semanas.",
      solutionTitle: "Motor da Jornada compartilhado em duas linguagens + IA contextual e protocolo MCP",
      solution:
        "Projetamos e construímos o Fluxo como um ecossistema poliglota gerenciado via Turborepo. No onboarding, o usuário define a renda passiva mensal que o tornaria livre; o motor de domínio (`packages/core` em TypeScript e portado nativamente para Dart no app Flutter) transforma essa meta em patrimônio-alvo e uma trilha de etapas concretas — cada uma com lição educativa e próxima ação prática. Todo o produto (orçamentos, previsão de fim de mês, simulador 'e se' e tutor por IA) orbita essa meta central.",
      highlights: [
        {
          code: "01",
          title: "Custo em Tempo de Liberdade (+Xd) & Simulador 'E Se'",
          body: "Cada categoria de despesa converte reais gastos em dias de vida/liberdade adiados (+Xd), gerando um impacto comportamental muito mais claro do que meros percentuais. O simulador 'E se' recalcula ao vivo o prazo de independência conforme o usuário ajusta sliders de aporte mensal, meta e taxa de retorno."
        },
        {
          code: "02",
          title: "Monorepo Next.js + Flutter Nativo (Zero WebView)",
          body: "Em vez de empacotar um site em WebView, entregamos um PWA responsivo em Next.js na Vercel (`apps/web`) e um aplicativo verdadeiramente nativo em Flutter para Android e iOS (`apps/mobile`), mantendo a paridade matemática do motor da jornada entre TypeScript e Dart e pipeline CI/CD de AAB assinado para a Google Play Store."
        },
        {
          code: "03",
          title: "Segurança Financeira com Supabase RLS & Trigger Anti-Fraude",
          body: "Todas as tabelas contam com políticas Row-Level Security (RLS) auditadas por suíte de testes SQL (`rls.sql`). O campo de assinatura `Fluxo+` é protegido pelo trigger `congelar_assinatura`: nem mesmo uma requisição autenticada do cliente pode se auto-promover — apenas o webhook assinado da Stripe com chave de serviço tem permissão de escrita."
        },
        {
          code: "04",
          title: "Tutor 'Falar com o Fluxo' & Servidor MCP Pioneiro",
          body: "O chat financeiro monta o contexto no servidor (agregados LGPD-safe, sem expor chaves de LLM no bundle e com fallback local determinístico). Além disso, o servidor MCP (`apps/mcp` e `/api/mcp`) permite que assinantes consultem e registrem transações diretamente de dentro do Claude ou ChatGPT usando chaves revogáveis."
        },
        {
          code: "05",
          title: "Monetização Híbrida Consciente (Fluxo+ & AdSense/AdMob)",
          body: "O plano gratuito monetiza com 3 slots discretos (jamais na tela da Jornada, preservando o momento de reflexão do usuário). Sem IDs configurados ou com ad-blocker, nenhuma requisição sai para terceiros e o componente converte-se automaticamente em convite nativo para a assinatura Fluxo+ (R$ 14,90/mês)."
        }
      ],
      results:
        "Produto em produção em fluxo.finance com cobrança recorrente real via Stripe (Checkout + Customer Portal), e-mails transacionais idempotentes via Resend (`ola@fluxo.finance`), exclusão em cascata em conformidade com LGPD/Google Play e roadmap estruturado para agregação Open Finance (Pluggy/Belvo)."
    }
  },
  {
    id: "fluxoacademy",
    slug: "fluxo-academy",
    diagram: "fluxoacademy",
    n: "02",
    title: "Fluxo Academy",
    formerName: "Antiga Aura Educacional",
    clientType: "Plataforma EdTech · LMS Multi-Tenant & Certificação",
    year: "2026",
    domain: "auraeducacional.app",
    liveUrl: "https://auraeducacional.app/login",
    previewSrc: "assets/projects/aura.webp",
    previewAlt: "Interface da plataforma Fluxo Academy (antiga Aura Educacional)",
    accentColor: "#c9a961",
    badge: "LMS Multi-Tenant · 4 Aplicações · Cloud Run + Mux",
    headline: "Infraestrutura própria de ensino com certificados imutáveis e venda híbrida.",
    summary:
      "Evolução da antiga Aura Educacional para uma plataforma LMS completa para cursos livres e instituições de ensino. Resolve o aprisionamento e as taxas por aluno das plataformas de mercado, unindo assinatura recorrente e venda avulsa de cursos a um motor de certificados declaratórios (LDB Art. 42) com verificação pública à prova de alterações futuras.",
    metrics: [
      { value: "4 Apps", label: "Monorepo pnpm + Turborepo (Web, Learn, Admin, API)" },
      { value: "Imutável", label: "Snapshots de certificados auditáveis sem login (LDB 9.394/96)" },
      { value: "JWT 30s", label: "Streaming de vídeo adaptativo protegido via Mux" },
      { value: "Scale-to-0", label: "API Hono em containers no Google Cloud Run" }
    ],
    tags: [
      "Next.js 15",
      "React 19",
      "Hono API",
      "Google Cloud Run",
      "Cloud SQL (Postgres 16)",
      "Drizzle ORM",
      "Stripe (Assinatura + Avulso)",
      "Mux Video (Signed JWT)",
      "Cloud Tasks + Puppeteer",
      "Firebase Auth"
    ],
    privateRepo: true,
    links: [
      { kind: "live", label: "Ver ambiente de acesso", href: "https://auraeducacional.app/login" }
    ],
    study: {
      problemTitle: "Plataformas LMS prontas penalizam o crescimento e fragilizam a certificação",
      problem:
        "Instituições de ensino e criadores de cursos livres sofrem com três gargalos graves nas soluções de prateleira: (1) cobrança por aluno ativo ou comissões abusivas que inviabilizam escala; (2) incapacidade de combinar assinatura ilimitada ('estilo catálogo') com a compra avulsa vitalícia de cursos individuais na mesma conta; e (3) certificados frágeis que mudam ou quebram quando a grade de um curso é atualizada no CMS, comprometendo a validade jurídica e a verificação por empregadores e órgãos públicos.",
      solutionTitle: "Arquitetura desacoplada de matrículas e emissão assíncrona com snapshots imutáveis",
      solution:
        "Desenvolvemos a Fluxo Academy (antiga Aura Educacional) como um monorepo de 4 aplicações independentes (`web` público, `learn` player do aluno, `admin` CMS interno e `api` em Hono no Cloud Run `southamerica-east1`) compartilhando um Design System próprio, contratos Zod estritos e banco Cloud SQL PostgreSQL 16 gerenciado com Drizzle ORM.",
      highlights: [
        {
          code: "01",
          title: "Desacoplamento `enrollments` vs. `course_access` no PostgreSQL",
          body: "Separamos a jornada pedagógica (`enrollments`, 1 registro por aluno×curso com progresso) do direito financeiro de acesso (`course_access`: `purchase`, `gift`, `admin_grant`). Assinaturas ativas não inflam tabelas materializando linhas para cada curso: a função SQL `has_course_access(user, course)` resolve permissões em tempo real, garantindo cancelamento instantâneo de assinatura sem perder compras avulsas vitalícias."
        },
        {
          code: "02",
          title: "Certificados Imutáveis (LDB Art. 42) via Cloud Tasks + Puppeteer",
          body: "Na conclusão do curso, a tabela `certificates` grava snapshots imutáveis (`user_name_snapshot`, `course_title_snapshot`, `workload_hours_snapshot`, `instructor_name_snapshot`, `final_score`) protegidos por constraint parcial `UNIQUE (user_id, course_id) WHERE status='issued'` contra duplo clique. Um worker no Cloud Run renderiza o PDF em alta fidelidade via Puppeteer, e qualquer edição futura no curso jamais altera certificados já emitidos."
        },
        {
          code: "03",
          title: "Streaming Protegido Mux & CMS Zero-Deploy",
          body: "As aulas em vídeo utilizam Mux com Signed Playback e tokens JWT renovados a cada 30 segundos diretamente no player do aluno, impedindo compartilhamento indevido de links. O painel `admin` permite que a equipe pedagógica crie módulos, publique cursos e gerencie matrículas instantaneamente sem necessidade de novo deploy."
        },
        {
          code: "04",
          title: "Webhooks Idempotentes, Auth Stateless & Conformidade LGPD/CDC",
          body: "Eventos da Stripe e da Mux passam por validação HMAC e registro na tabela `webhook_events (event_id UNIQUE)`, eliminando concessão duplicada de acesso em retentativas. Autenticação stateless via Firebase ID Tokens com custom claims (`admin`, `instructor`, `student`), exportação completa de dados em JSON, soft-delete com retenção legal dos certificados e reembolso automatizado em 7 dias (Art. 49 do CDC)."
        }
      ],
      results:
        "Arquitetura cloud-native dimensionada em `southamerica-east1` (São Paulo) para baixa latência no Brasil, custo fixo operacional reduzido graças ao escalonamento sob demanda do Cloud Run e total soberania sobre dados, catálogo e regras de negócio."
    }
  },
  {
    id: "judicial",
    slug: "administracao-judicial-advocacia",
    diagram: "judicial",
    n: "03",
    title: "Amanda Silvestre · Advocacia & Administração Judicial",
    clientType: "Escritório Jurídico & Pericial · Portal de Transparência",
    year: "2025",
    domain: "Administração Judicial & Perícia",
    liveUrl: "https://kayoinreality.github.io/Adminstra-o-Judicial/",
    repoUrl: "https://github.com/kayoinreality/Adminstra-o-Judicial",
    previewSrc: "assets/projects/judicial.webp",
    previewAlt: "Portal institucional e Mural de Transparência de Amanda Silvestre — Administração Judicial",
    accentColor: "#d4af37",
    badge: "Portal Jurídico & Mural de Transparência Processual",
    headline: "Autoridade institucional para magistrados e transparência pública para credores.",
    summary:
      "Plataforma digital sob medida desenvolvida para atuação especializada em Administração Judicial (Recuperação Judicial e Falências), Perícia Grafotécnica/Documentoscópica e Consultoria Jurídica. Une posicionamento de alta sobriedade forense a um Mural de Transparência Processual para consulta rápida de peças, editais e Relatórios Mensais de Atividades (RMA).",
    metrics: [
      { value: "Mural RMA", label: "Consulta pública estruturada de processos e peças judiciais" },
      { value: "3 Frentes", label: "Administração Judicial, Perícia Grafotécnica e Consultoria" },
      { value: "100% Forense", label: "Identidade sóbria pensada para juízos, bancas e credores" },
      { value: "Conversão", label: "Fluxo de contato segmentado por demanda técnica" }
    ],
    tags: [
      "React 18",
      "TypeScript",
      "Tailwind CSS v4",
      "Motion (Framer Motion)",
      "React Router",
      "Radix UI",
      "SEO Jurídico",
      "Vite"
    ],
    privateRepo: false,
    links: [
      { kind: "live", label: "Visitar site em produção", href: "https://kayoinreality.github.io/Adminstra-o-Judicial/" },
      { kind: "repo", label: "Inspecionar repositório", href: "https://github.com/kayoinreality/Adminstra-o-Judicial" }
    ],
    study: {
      problemTitle: "Dependência de indicações offline e dispersão na consulta de documentos processuais",
      problem:
        "Na atuação em Administração Judicial e Perícia Grafotécnica, a confiança técnica é decisiva: juízes, promotores e bancas de advocacia avaliam a estrutura e a transparência do profissional antes de uma nomeação ou contratação como assistente técnico. Ao mesmo tempo, processos de Recuperação Judicial exigem dar publicidade clara a editais, atas de Assembleia Geral de Credores, Quadros de Credores e Relatórios Mensais de Atividades (RMA). Sem uma plataforma própria, o escritório dependia apenas do boca a boca e atendia consultas repetitivas manualmente.",
      solutionTitle: "Mural de Transparência Processual aliado a uma arquitetura editorial de alta credibilidade",
      solution:
        "Construímos uma aplicação web moderna em React, TypeScript, Tailwind CSS e Motion que posiciona a titular como referência técnica em três pilares claros (Administração Judicial, Perícia Grafotécnica/Documentoscópica e Consultoria Cível/Empresarial/LGPD) e incorpora um Mural de Transparência dedicado ao acompanhamento de processos em andamento.",
      highlights: [
        {
          code: "01",
          title: "Mural de Transparência para Recuperação Judicial & Perícias",
          body: "Ambiente estruturado onde credores, advogados e partes localizam rapidamente processos por número, juízo/vara e partes envolvidas, com acesso direto aos documentos essenciais: Decisão de Deferimento, Edital do Art. 52 §1º, Relatórios Mensais de Atividades (RMA), Atas da AGC e Laudos Periciais."
        },
        {
          code: "02",
          title: "Segmentação Técnica de Especialidades Forenses",
          body: "Organização clara do escopo técnico em Perícia Grafotécnica e Documentoscópica (autenticidade de assinaturas, detecção de falsificações, exame de rasuras e lavagens químicas, pareceres assistenciais) e Administração Judicial (fiscalização do devedor, verificação de créditos e consolidação de quadros)."
        },
        {
          code: "03",
          title: "Identidade Visual Clássica & Performance Instantânea",
          body: "Direção de arte em azul-marinho profundo (`#0a1128`) e ouro envelhecido (`#d4af37`) com tipografia editorial Playfair Display e transições suaves em Motion, transmitindo rigor institucional em qualquer dispositivo e facilitando o acionamento imediato por escritórios parceiros."
        }
      ],
      results:
        "Presença digital institucional entregue e em produção, elevando a percepção de autoridade perante o meio forense, centralizando a transparência documental de processos complexos e abrindo um canal direto de captação para perícias e assistência técnica."
    }
  }
];

window.COMPANY = COMPANY;
window.buildWhatsAppUrl = buildWhatsAppUrl;
window.PROJECTS = PROJECTS;
