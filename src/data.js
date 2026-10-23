// Conteúdo do site da Reality. JS puro (sem JSX) porque o build.mjs também
// importa este arquivo para gerar uma página HTML por rota, com título e
// descrição próprios.

// Dados comerciais.
export const COMPANY = {
  name: "Reality",
  domain: "myreality.tech",
  city: "Goiânia, GO",
  whatsappNumber: "5562993538028",
  whatsappDisplay: "+55 62 99353-8028",
  email: "kayo@myreality.tech",
  careersEmail: "kayo@myreality.tech",
  founder: "Kayo Santos",
  github: "https://github.com/kayoinreality",
  linkedin: "https://www.linkedin.com/in/kayo-santos/"
};

export function whatsappUrl(message) {
  const text =
    message && message.trim()
      ? message.trim()
      : "Olá! Vim pelo site da Reality e quero conversar sobre um software sob medida.";
  return `https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

// Os estudos de caso. Cada um é lido em duas camadas: o gancho (hook, answer)
// aparece na home; o resto só abre quando a pessoa expande o caso.
export const CASES = [
  {
    slug: "fluxo-finance",
    name: "Fluxo Finance",
    kind: "App de finanças pessoais",
    year: "2026",
    scene: "fluxo",
    hook: "Quantos dias de liberdade custa um jantar fora?",
    answer:
      "Um app que traduz cada gasto em dias a mais (ou a menos) até você poder viver de renda.",
    delivered: "Web, Android, iOS e servidor MCP",
    live: { label: "fluxo.finance", href: "https://fluxo.finance/" },
    shot: "/assets/projects/fluxo.webp",
    problem:
      "Apps de finanças funcionam como retrovisor: mostram para onde o dinheiro foi e param aí.",
    problemMore:
      "Gráfico de pizza não responde à pergunta que importa — esse gasto me deixou mais perto ou mais longe de ser livre? Metas de poupança ficam soltas, sem ligação com o dia a dia, e o hábito morre nas primeiras semanas.",
    turn:
      "No Fluxo, tudo gira em torno de uma meta: a renda passiva que te deixaria livre.",
    turnMore:
      "No cadastro, a pessoa diz quanto por mês a deixaria livre. Um motor de domínio transforma isso em patrimônio-alvo e em etapas concretas, cada uma com uma lição e uma próxima ação. Orçamentos, previsão de fim de mês, simulador e chat orbitam essa jornada.",
    inside: [
      {
        title: "Custo em tempo de liberdade",
        body: "Cada categoria de gasto vira dias adiados (+4d, +12d) e cada aporte vira dias ganhos. O simulador “e se” recalcula o prazo ao vivo enquanto a pessoa mexe no aporte, na meta e no retorno."
      },
      {
        title: "Um motor, duas linguagens",
        body: "O web roda em Next.js na Vercel e o mobile é Flutter nativo, sem WebView. O motor da jornada existe em TypeScript e em Dart, com a mesma matemática nos dois, num monorepo Turborepo."
      },
      {
        title: "Ninguém se promove a assinante",
        body: "Todas as tabelas têm Row-Level Security testada por uma suíte SQL própria. O campo de assinatura é travado por trigger: só o webhook assinado da Stripe consegue mudá-lo, nunca o cliente."
      },
      {
        title: "Fale com o Fluxo, inclusive pelo Claude",
        body: "O chat monta o contexto no servidor, com a chave da IA fora do app. Um servidor MCP deixa assinantes consultarem e lançarem transações direto do Claude ou do ChatGPT, com chaves revogáveis."
      },
      {
        title: "Grátis com anúncio, sem anúncio na jornada",
        body: "O plano grátis tem três espaços discretos de anúncio, nunca na tela da jornada. Sem IDs configurados, nenhum script de terceiro carrega e o espaço vira convite para o Fluxo+ (R$ 14,90/mês)."
      }
    ],
    result:
      "Em produção, com assinatura recorrente pela Stripe, e-mails transacionais pela Resend, exclusão de conta em cascata (LGPD e Google Play) e Open Finance no roadmap.",
    facts: [
      { value: "5", label: "apps num só monorepo" },
      { value: "2", label: "linguagens, uma regra de negócio" },
      { value: "R$ 14,90", label: "assinatura Fluxo+ por mês" }
    ],
    stack: ["Next.js", "Flutter", "TypeScript", "Dart", "Supabase", "PostgreSQL + RLS", "Stripe", "OpenRouter", "MCP", "Resend", "Turborepo", "Vercel"]
  },
  {
    slug: "fluxo-academy",
    name: "Fluxo Academy",
    formerly: "Aura Educacional",
    kind: "Plataforma de ensino",
    year: "2026",
    scene: "academy",
    hook: "E se o certificado não mudasse quando o curso muda?",
    answer:
      "Uma plataforma de cursos própria, sem taxa por aluno, com assinatura e venda avulsa na mesma conta.",
    delivered: "Site, área do aluno, painel e API",
    live: { label: "auraeducacional.app", href: "https://auraeducacional.app/login" },
    problem:
      "Plataformas de curso prontas cobram por aluno e tratam certificado como uma página qualquer.",
    problemMore:
      "Três gargalos travavam o crescimento: taxa por aluno ativo ou comissão por venda; impossibilidade de vender assinatura de catálogo e curso avulso vitalício na mesma conta; e certificados que mudavam — ou quebravam — quando a ementa era editada.",
    turn:
      "Separamos o que o aluno aprendeu do que ele tem direito de acessar.",
    turnMore:
      "A Fluxo Academy são quatro aplicações — site público, área do aluno, painel interno e API — sobre um PostgreSQL 16 no Cloud Run, em São Paulo. Matrícula guarda o progresso; acesso guarda o direito (compra, presente, cortesia ou assinatura). Cancelar a assinatura não apaga a compra avulsa de ninguém.",
    inside: [
      {
        title: "Matrícula não é acesso",
        body: "A tabela de matrículas registra a jornada pedagógica; a de acesso, o direito financeiro. Uma função SQL resolve em tempo real se o aluno pode ver o curso, sem criar uma linha por curso para cada assinante."
      },
      {
        title: "Certificado é registro, não página",
        body: "Na conclusão, o certificado grava uma cópia congelada do nome, do curso, da carga horária e da nota. Um worker gera o PDF com Puppeteer. Editar o curso depois não altera nenhum certificado já emitido, e qualquer pessoa verifica a autenticidade sem login."
      },
      {
        title: "Vídeo que não vaza",
        body: "As aulas rodam no Mux com reprodução assinada e tokens renovados a cada 30 segundos. Copiar o link da aula não adianta."
      },
      {
        title: "Pagamento que não duplica",
        body: "Todo evento da Stripe e do Mux passa por validação de assinatura e é registrado uma única vez. Se a Stripe reenviar, o aluno não ganha acesso em dobro. Reembolso em 7 dias segue o Art. 49 do CDC."
      }
    ],
    result:
      "Infraestrutura em São Paulo para baixa latência no Brasil, custo ocioso perto de zero com Cloud Run e controle total sobre catálogo, dados e regras de negócio.",
    facts: [
      { value: "4", label: "aplicações independentes" },
      { value: "30 s", label: "vida útil de cada token de vídeo" },
      { value: "0", label: "taxa por aluno ativo" }
    ],
    stack: ["Next.js 15", "React 19", "Hono", "Cloud Run", "Cloud SQL (PostgreSQL 16)", "Drizzle", "Stripe", "Mux", "Cloud Tasks", "Puppeteer", "Firebase Auth"]
  },
  {
    slug: "nos-autos",
    name: "Nos Autos",
    kind: "Monitor de intimações para advocacia",
    year: "2026",
    scene: "autos",
    hook: "Quantos portais de tribunal um advogado abre antes do café?",
    answer:
      "Um monitor que acha as intimações de todos os tribunais pela OAB e avisa antes de o prazo apertar.",
    delivered: "Aplicativo web, coletas automáticas e repasse no Brasil",
    live: { label: "nosautos.vercel.app", href: "https://nosautos.vercel.app/" },
    problem:
      "Cada tribunal tem o próprio portal, a própria senha e o próprio jeito de publicar uma intimação.",
    problemMore:
      "Um escritório com processos no trabalho, no cível e na federal abre meia dúzia de sistemas por dia para descobrir se saiu alguma coisa. Os monitores prontos pedem a senha ou o certificado digital do advogado, e a mesma publicação chega repetida uma vez para cada colega intimado.",
    turn:
      "A fonte é o Diário de Justiça Eletrônico Nacional, que publica as intimações de qualquer tribunal e aceita busca por OAB.",
    turnMore:
      "O advogado cadastra a OAB e o Nos Autos busca os últimos 12 meses de uma vez, depois volta três vezes por dia, às 7h, às 12h e às 18h. Cada publicação vira um evento na linha do tempo do processo, com tribunal, comarca, vara, partes e área já identificados. A situação do processo vem do DataJud, uma vez por semana.",
    inside: [
      {
        title: "Sem senha nem certificado",
        body: "O sistema nunca pede a senha do tribunal nem o certificado digital do advogado. A busca é pública e respeita a cota do DJEN: o cliente pausa antes de esgotar as 20 consultas da janela e espera o tempo que o servidor pedir."
      },
      {
        title: "Três cópias, um aviso",
        body: "O DJEN publica uma cópia do mesmo ato para cada advogado intimado, com identificadores diferentes. O Nos Autos reconhece o ato pelo dia, pelo tipo e pelo texto, e mostra um evento só. Buscar de novo não duplica nada."
      },
      {
        title: "A área sai do número",
        body: "O número CNJ é validado pelo dígito verificador e diz o segmento da Justiça. Na estadual e na federal, a classe processual e o nome da vara separam trabalhista, cível, família, criminal, previdenciário e fazenda pública, e cada escritório escolhe o que quer acompanhar."
      },
      {
        title: "Um escritório não vê o outro",
        body: "Senha com argon2id e segundo fator obrigatório desde o primeiro login. Toda leitura de dado de cliente passa por Row-Level Security no PostgreSQL, com um papel que só enxerga as linhas da conta da sessão."
      },
      {
        title: "Um repasse em São Paulo",
        body: "A API do DJEN só responde a endereços do Brasil. O aplicativo roda perto do banco, nos EUA, e um repasse mínimo na região de São Paulo encaminha só as buscas, protegido por um segredo compartilhado."
      }
    ],
    result:
      "Em beta fechado, com cadastro por convite, planos de R$ 79 a R$ 389 por mês e a fila de coletas no próprio PostgreSQL, sem um serviço a mais para manter.",
    facts: [
      { value: "3×", label: "coletas automáticas por dia" },
      { value: "12", label: "meses buscados no cadastro da OAB" },
      { value: "0", label: "senhas de tribunal guardadas" }
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "PostgreSQL + RLS", "Drizzle", "Supabase", "Vercel", "Vercel Cron", "DJEN", "DataJud", "argon2id", "TOTP"]
  },
  {
    slug: "amanda-silvestre",
    name: "Amanda Silvestre",
    kind: "Advocacia e Administração Judicial",
    year: "2025",
    scene: "judicial",
    hook: "Juízes pesquisam antes de nomear. O que eles encontram?",
    answer:
      "Um portal de autoridade para uma administradora judicial e perita, com mural público de processos.",
    delivered: "Portal institucional e mural de transparência",
    live: { label: "kayoinreality.github.io/Adminstra-o-Judicial", href: "https://kayoinreality.github.io/Adminstra-o-Judicial/" },
    repo: "https://github.com/kayoinreality/Adminstra-o-Judicial",
    shot: "/assets/projects/judicial.webp",
    problem:
      "Em Administração Judicial, a confiança é avaliada antes do primeiro contato.",
    problemMore:
      "Magistrados, promotores e escritórios verificam a estrutura de quem vão nomear. E uma recuperação judicial obriga a dar publicidade a editais, atas de assembleia, quadros de credores e relatórios mensais. Sem um lugar próprio, o escritório dependia de indicação e respondia as mesmas consultas uma a uma.",
    turn:
      "Um mural onde credores acham o processo e o documento sem precisar ligar.",
    turnMore:
      "Construímos um portal em React, TypeScript e Motion que apresenta a titular em três frentes claras — Administração Judicial, Perícia Grafotécnica e Consultoria — e reúne os processos em andamento num mural de transparência pesquisável.",
    inside: [
      {
        title: "Mural de transparência",
        body: "Busca por número do processo, vara ou parte, com acesso direto à decisão de deferimento, ao edital do Art. 52 §1º, aos relatórios mensais de atividades, às atas da assembleia de credores e aos laudos."
      },
      {
        title: "Especialidades sem jargão solto",
        body: "Perícia grafotécnica e documentoscópica (autenticidade de assinaturas, rasuras, lavagens químicas) e administração judicial (fiscalização do devedor, verificação de créditos) organizadas para quem decide em minutos."
      },
      {
        title: "Sobriedade de fórum",
        body: "Azul-marinho profundo, ouro envelhecido e tipografia editorial. Rápido em qualquer aparelho e com contato direto para escritórios parceiros."
      }
    ],
    result:
      "Presença institucional em produção, transparência documental centralizada e um canal direto para perícias e assistência técnica.",
    facts: [
      { value: "3", label: "frentes de atuação" },
      { value: "1", label: "mural para todos os processos" },
      { value: "0", label: "ligações para achar um edital" }
    ],
    stack: ["React 18", "TypeScript", "Tailwind CSS", "Motion", "React Router", "Radix UI", "Vite"]
  }
];

export const CAPABILITIES = [
  {
    name: "Plataformas e SaaS",
    line: "Produtos com login, assinatura e painel próprio.",
    more: "Modelagem de dados, multi-tenant, permissões no banco, cobrança recorrente e avulsa, e um painel para a sua equipe operar sem depender de deploy.",
    seen: ["fluxo-finance", "fluxo-academy", "nos-autos"]
  },
  {
    name: "Aplicativos nativos",
    line: "iOS e Android em Flutter, com a mesma regra de negócio da web.",
    more: "Nada de site embrulhado em app. Interface nativa, publicação nas lojas, assinatura do pacote e login social configurados de ponta a ponta.",
    seen: ["fluxo-finance"]
  },
  {
    name: "Portais institucionais",
    line: "Presença que transmite autoridade e responde consultas sozinha.",
    more: "Sites rápidos, acessíveis e bem ranqueados, com áreas de consulta pública, documentos e contato direto para quem decide.",
    seen: ["amanda-silvestre"]
  },
  {
    name: "IA e automação",
    line: "Assistentes e integrações ligados aos seus dados, com a chave no servidor.",
    more: "Chats com contexto do seu sistema, categorização automática, filas, geração de documentos em lote e servidores MCP para operar o produto pelo Claude ou pelo ChatGPT.",
    seen: ["fluxo-finance", "fluxo-academy"]
  }
];

export const PROCESS = [
  { title: "Conversa", when: "Semana 1", body: "Entendemos onde a operação trava e qual é o menor recorte que já resolve algo de verdade." },
  { title: "Desenho", when: "Semanas 2 e 3", body: "Dados, regras de acesso e interface navegável. Você aprova antes de virar código." },
  { title: "Construção", when: "Ciclos de 2 semanas", body: "Entregas curtas num ambiente de teste com o seu domínio. Você acompanha tudo funcionando." },
  { title: "Produção", when: "Depois do lançamento", body: "Monitoramento, ajustes e evolução. O código, o banco e a infraestrutura ficam no seu nome." }
];

export const VALUES = [
  { title: "O código é seu", body: "Repositório, banco de dados e contas de infraestrutura ficam no nome do cliente desde o primeiro commit. Se um dia a gente se separar, nada fica preso." },
  { title: "Produção é o padrão", body: "Construímos os nossos próprios produtos e eles estão no ar, cobrando e sendo usados. É esse o nível que a gente entrega para os outros." },
  { title: "Simples por fora, rigoroso por dentro", body: "A tela tem que ser óbvia. Por baixo, regra de acesso no banco, pagamento idempotente e chave secreta longe do navegador." }
];

export const JOBS = [
  {
    slug: "engenharia-full-stack",
    title: "Engenharia full-stack",
    stack: "Next.js, TypeScript e PostgreSQL",
    where: "Remoto, Brasil",
    about: "Você vai construir produtos de ponta a ponta: do esquema do banco à tela, passando pela integração de pagamento.",
    you: [
      "Já colocou em produção algo que gente de verdade usa",
      "Escreve SQL sem medo e entende por que regra de acesso mora no banco",
      "Prefere uma entrega pequena hoje a uma grande daqui a um mês"
    ]
  },
  {
    slug: "desenvolvimento-flutter",
    title: "Desenvolvimento Flutter",
    stack: "Dart, Flutter e Supabase",
    where: "Remoto, Brasil",
    about: "Você vai cuidar dos apps nativos: interface, publicação nas lojas e paridade com a regra de negócio da web.",
    you: [
      "Já publicou app na Play Store ou na App Store",
      "Se importa com 60 quadros por segundo e com acessibilidade",
      "Lê TypeScript o bastante para portar uma regra para Dart"
    ]
  },
  {
    slug: "design-de-produto",
    title: "Design de produto",
    stack: "Interface, conteúdo e protótipo",
    where: "Remoto ou Goiânia",
    about: "Você vai desenhar sistemas que precisam ser óbvios para quem usa e fiéis às regras de quem opera.",
    you: [
      "Tem portfólio com produto lançado, não só conceito",
      "Escreve bem: texto de interface faz parte do design",
      "Gosta de conversar com quem usa o sistema todo dia"
    ]
  }
];

export const POSTS = [
  {
    slug: "matricula-nao-e-acesso",
    title: "Matrícula não é acesso",
    dek: "Por que a Fluxo Academy guarda o progresso do aluno e o direito de assistir em tabelas diferentes.",
    date: "2026-09-18",
    read: "5 min",
    body: [
      "Quando uma plataforma de cursos vende só assinatura, é tentador resolver tudo com uma tabela: o aluno assinou, cria-se uma matrícula para cada curso do catálogo. Funciona até o dia em que a mesma conta compra um curso avulso e, meses depois, cancela a assinatura.",
      "Nesse momento a pergunta “esse aluno pode ver esse curso?” deixa de ter uma resposta só. Ele pode porque comprou, mesmo sem assinatura. Ou não pode mais, porque o acesso vinha da assinatura. Com uma tabela única, a única saída é apagar linhas com cuidado e torcer.",
      "Na Fluxo Academy separamos as duas coisas. A matrícula registra a jornada pedagógica: em que aula o aluno parou, quanto concluiu, quando terminou. O acesso registra o direito: uma compra, um presente, uma cortesia da equipe. A assinatura nem vira linha — uma função no banco verifica, na hora, se existe assinatura ativa.",
      "O efeito prático é que cancelar uma assinatura passa a ser instantâneo e seguro. Ninguém perde o que comprou, ninguém ganha o que não pagou, e o catálogo pode crescer sem multiplicar linhas por assinante.",
      "É o tipo de decisão invisível para o aluno e decisiva para o negócio. Sistema sob medida é, muitas vezes, exatamente isso."
    ]
  },
  {
    slug: "o-trigger-que-protege-a-assinatura",
    title: "O trigger que protege a assinatura",
    dek: "No Fluxo Finance, nenhuma requisição do app consegue promover um usuário a assinante. Só a Stripe.",
    date: "2026-08-27",
    read: "4 min",
    body: [
      "Em apps com plano pago, existe um campo que vale dinheiro: o que diz se a pessoa é assinante. Se o aplicativo consegue escrever nesse campo, qualquer pessoa com um pouco de curiosidade também consegue.",
      "No Fluxo, as regras de acesso moram no próprio PostgreSQL, com Row-Level Security em todas as tabelas. Cada usuário só lê e escreve o que é dele. Mas “o que é dele” inclui o próprio perfil — e o perfil guarda o plano.",
      "Por isso o campo de assinatura tem uma proteção a mais: um trigger que congela o valor para qualquer escrita vinda do aplicativo. Quem pode alterá-lo é só a rota de servidor que recebe o webhook assinado da Stripe, usando uma chave que nunca sai do servidor.",
      "Essa regra é testada automaticamente a cada mudança, numa suíte SQL que tenta se promover a assinante de todas as formas que a gente conseguiu imaginar. Se algum dia alguém relaxar a regra sem querer, o CI quebra antes de ir para produção."
    ]
  },
  {
    slug: "quem-pesquisa-antes-de-nomear",
    title: "Quem pesquisa antes de nomear",
    dek: "O que aprendemos desenhando o portal de uma administradora judicial para um público que decide em minutos.",
    date: "2026-07-30",
    read: "4 min",
    body: [
      "Um juiz que precisa nomear um administrador judicial não lê um site do jeito que um consumidor lê. Ele procura sinais de estrutura, especialidade e transparência, e procura rápido.",
      "No portal de Amanda Silvestre, isso definiu a arquitetura antes do visual. Três frentes de atuação, cada uma com o próprio vocabulário técnico. Nenhuma promessa genérica. E um mural onde qualquer credor encontra o processo pelo número, pela vara ou pela parte.",
      "O mural resolveu um problema que parecia de atendimento: as mesmas perguntas, por telefone, sobre onde estava o edital ou o último relatório mensal. Quando o documento está a uma busca de distância, a ligação deixa de existir.",
      "O visual veio depois e foi pela sobriedade: azul-marinho, ouro envelhecido, tipografia editorial e movimento só onde ajuda a entender. Em contexto forense, discrição também é argumento."
    ]
  }
];

// Página de status: ilustrativa até existir monitoramento de verdade.
export const STATUS_COMPONENTS = [
  { name: "myreality.tech", group: "Reality", incidents: [] },
  { name: "Atendimento comercial", group: "Reality", incidents: [] },
  { name: "Fluxo Finance — app web", group: "Fluxo Finance", incidents: [{ day: 23, level: "minor" }] },
  { name: "Fluxo Finance — API e MCP", group: "Fluxo Finance", incidents: [{ day: 23, level: "minor" }, { day: 61, level: "minor" }] },
  { name: "Fluxo Academy — plataforma", group: "Fluxo Academy", incidents: [{ day: 47, level: "major" }] },
  { name: "Fluxo Academy — vídeo", group: "Fluxo Academy", incidents: [] },
  { name: "Nos Autos — aplicativo web", group: "Nos Autos", incidents: [] },
  { name: "Nos Autos — coletas do DJEN", group: "Nos Autos", incidents: [] },
  { name: "Portal Amanda Silvestre", group: "Clientes", incidents: [] }
];

export const STATUS_HISTORY = [
  {
    date: "2026-09-04",
    title: "Lentidão na geração de certificados",
    component: "Fluxo Academy — plataforma",
    resolution: "A fila de PDFs acumulou depois de uma turma inteira concluir no mesmo dia. Aumentamos o limite de instâncias do worker; todos os certificados foram emitidos em 40 minutos."
  },
  {
    date: "2026-09-28",
    title: "Respostas do chat em modo local",
    component: "Fluxo Finance — API e MCP",
    resolution: "O provedor de IA atingiu o limite diário. O chat seguiu respondendo com dados locais, como previsto, até a cota renovar."
  }
];

// Rotas estáticas, usadas pelo roteador e pelo build para gerar o HTML de cada uma.
export const ROUTES = [
  { path: "/", title: "Reality — Software sob medida", description: "A Reality projeta e constrói software sob medida: plataformas, aplicativos nativos, portais e IA, do primeiro rascunho à produção." },
  ...CASES.map((c) => ({ path: `/casos/${c.slug}`, title: `${c.name} — Reality`, description: c.answer })),
  { path: "/sobre", title: "Sobre — Reality", description: "Uma empresa de software que começa pela operação, não pelo código." },
  { path: "/carreiras", title: "Carreiras — Reality", description: "Construa software que vai para produção." },
  { path: "/blog", title: "Blog — Reality", description: "Decisões de engenharia e produto por trás dos sistemas que a Reality constrói." },
  ...POSTS.map((p) => ({ path: `/blog/${p.slug}`, title: `${p.title} — Reality`, description: p.dek })),
  { path: "/status", title: "Status — Reality", description: "Disponibilidade dos sistemas mantidos pela Reality." }
];
