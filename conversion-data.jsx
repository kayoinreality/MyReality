// Conteúdo editorial da revisão. Base: data.jsx e informações fornecidas por Kayo.
// Sem percentuais de desempenho, depoimentos ou resultados quantitativos presumidos.
const PROFILES = {
  logistica: {
    label: 'Logística e Operações', role: 'Analista de Logística',
    title: 'Visão de operação.\nCapacidade de transformar.',
    intro: 'Conecto a rotina do transporte aos dados que ajudam a decidir. Atuo com acompanhamento de entregas, frete fracionado, indicadores e automações para a operação.',
    strengths: ['Transporte e frete fracionado', 'Roteirização e acompanhamento de entregas', 'Indicadores e análise de dados', 'Automação de processos operacionais'],
    stack: ['Power BI', 'Excel · VBA', 'Python', 'SQL', 'SAP', 'Roadnet'],
    projects: ['comprovantes', 'dashmytracking'],
    experience: [
      { date: '2026 — atual', title: 'Analista de Logística', company: 'BR Render', text: 'Acompanhamento operacional, frete fracionado, indicadores e desenvolvimento de uma ferramenta para envio de comprovantes por motoristas.' },
      { date: '2023 — 2026', title: 'Análise e Desenvolvimento de Sistemas', company: 'PUC Goiás', text: 'Formação aplicada à análise de processos, dados e construção de soluções digitais.' }
    ]
  },
  desenvolvimento: {
    label: 'Desenvolvimento de Software', role: 'Desenvolvedor Full-stack',
    title: 'Da interface à API.\nDo problema ao produto.',
    intro: 'Desenvolvo aplicações web, integrações e produtos completos. Trago a experiência de uma operação real para pensar em usabilidade, manutenção e confiabilidade do software.',
    strengths: ['Desenvolvimento web e mobile', 'APIs, integrações e banco de dados', 'Autenticação e pagamentos', 'Bibliotecas open source'],
    stack: ['TypeScript', 'React · Next.js', 'Node.js', 'Flutter', 'PostgreSQL', 'Firebase'],
    projects: ['fluxo', 'aura', 'slidinglimiter'],
    experience: [
      { date: '2024 — atual', title: 'Cofundador · Desenvolvedor Full-stack', company: 'Aura Educacional', text: 'Plataforma educacional com área do aluno, administração, API, pagamentos e certificados verificáveis.' },
      { date: '2024 — atual', title: 'Desenvolvimento de produtos e serviços', company: 'Fluxo · clientes · open source', text: 'Aplicativo financeiro, site institucional para cliente e bibliotecas de rate limiting.' },
      { date: '2023 — 2026', title: 'Análise e Desenvolvimento de Sistemas', company: 'PUC Goiás', text: 'Engenharia de software, banco de dados e gestão de projetos.' }
    ]
  }
};
const SERVICES = {
  automacao: { label: 'Automação e dados', number: '01', title: 'Menos trabalho manual.\nMais clareza para decidir.', intro: 'Transformo rotinas repetitivas e dados dispersos em ferramentas que fazem sentido para quem trabalha na operação.', output: 'Dashboards, integração de dados, relatórios e ferramentas internas.', scope: 'Começamos por uma rotina concreta: de onde vêm os dados, quem usa e qual decisão precisa tomar.', projects: ['dashmytracking', 'comprovantes'], placeholder: 'Ex.: hoje juntamos planilhas de entregas à mão e precisamos acompanhar os atrasos.' },
  sites: { label: 'Sites e presença digital', number: '02', title: 'Sua experiência merece\numa presença à altura.', intro: 'Crio sites que apresentam seu negócio com clareza e ajudam o visitante a encontrar o próximo passo.', output: 'Sites institucionais, landing pages e portfólios responsivos.', scope: 'Definimos público, conteúdo e ação principal antes de construir a primeira versão.', projects: ['judicial', 'aura'], placeholder: 'Ex.: preciso apresentar os serviços do meu escritório e facilitar o contato de novos clientes.' },
  aplicacoes: { label: 'Aplicações sob medida', number: '03', title: 'Uma ideia de produto.\nUma primeira versão útil.', intro: 'Desenvolvo aplicações para processos e serviços que precisam ir além de uma página de apresentação.', output: 'Aplicações web, APIs, áreas de acesso e integrações.', scope: 'Recortamos o fluxo essencial e combinamos as entregas antes de desenvolver.', projects: ['fluxo', 'aura'], placeholder: 'Ex.: preciso de uma área em que meus clientes acompanhem os pedidos e enviem documentos.' }
};
const PROJECT_NOTES = {
  comprovantes: { label: 'Ferramenta em uso na empresa', blurb: 'Uma forma mais simples de motoristas enviarem comprovantes de entrega.', result: 'Ferramenta adotada na empresa, com foco na adesão dos motoristas e na organização dos registros.', role: 'Concepção e desenvolvimento', proof: 'Experiência profissional · apresentação do processo sob consulta', tags: ['Transporte', 'UX', 'Automação'] },
  dashmytracking: { label: 'Operação real · uso interno', blurb: 'Dados de rotas e rastreamento transformados em informação gerencial.', result: 'Telemetria, planejamento e indicadores reunidos para apoiar o acompanhamento da operação.', role: 'Análise e engenharia de dados', proof: 'Uso interno · código e dados da empresa não são públicos' },
  fluxo: { label: 'Produto próprio', blurb: 'Planejamento financeiro com uma jornada orientada a objetivos.', result: 'Aplicação web e mobile com autenticação, dados por usuário e integração de pagamentos.', role: 'Desenvolvimento full-stack', proof: 'Produto demonstrável · código privado' },
  aura: { label: 'Plataforma educacional', blurb: 'Do catálogo de cursos à área do aluno e aos certificados verificáveis.', result: 'Web, área do aluno, administração e API organizadas em uma plataforma própria.', role: 'Cofundador e desenvolvedor full-stack', proof: 'Produto demonstrável · código privado' },
  slidinglimiter: { label: 'Open source · código disponível', blurb: 'Controle de requisições com janela deslizante e Redis.', result: 'Pacotes para Express e Fastify com implementação aberta para inspeção.', role: 'Autor das bibliotecas', proof: 'Repositórios públicos · implementação verificável' },
  judicial: { label: 'Trabalho entregue para cliente', blurb: 'Presença digital e apresentação de serviços para um escritório jurídico.', result: 'Site institucional com identidade visual, área de serviços e caminho de contato.', role: 'Design e desenvolvimento', proof: 'Repositório público · case de serviço entregue' }
};
const DELIVERY_CASE = { id:'comprovantes', title:'Comprovantes de entrega', tags:['Transporte','UX','Automação'], links:[], privateRepo:true, study:{ problem:{pt:'O envio e o registro de comprovantes precisava ser mais simples para os motoristas na rotina de entregas.'}, build:{pt:['Ferramenta para os motoristas anexarem comprovantes de entrega.', 'Fluxo de uso pensado para facilitar a adesão e organizar os registros da empresa.']}, status:{pt:'Adotada na empresa. Detalhes internos e dados de motoristas não são publicados neste portfólio.'} } };
