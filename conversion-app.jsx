// ─── REALITY · Engenharia de Software Sob Medida ───
// Design Cinematográfico & Institucional inspirado em Resend.com
// Stack de Interação: Lenis Smooth Scroll + GSAP ScrollTrigger + Motion

const CASE_IDS = ["fluxo", "fluxoacademy", "judicial"];

// ─── Ícones Vetoriais Minimalistas ───
const RealityPrismLogo = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="reality-prism-grad" x1="2" y1="2" x2="26" y2="26" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="55%" stopColor="#A1A1AA" />
        <stop offset="100%" stopColor="#3F3F46" />
      </linearGradient>
    </defs>
    <path
      d="M14 2L25.5 8.6V21.4L14 26L2.5 21.4V8.6L14 2Z"
      stroke="url(#reality-prism-grad)"
      strokeWidth="1.5"
      fill="rgba(255,255,255,0.03)"
    />
    <path
      d="M14 2V14.5M14 14.5L25.5 8.6M14 14.5L2.5 8.6M14 14.5V26"
      stroke="rgba(255,255,255,0.38)"
      strokeWidth="1.2"
    />
    <polygon
      points="14,7.2 20.2,10.8 14,14.5 7.8,10.8"
      fill="rgba(255,255,255,0.18)"
    />
  </svg>
);

const ArrowRight = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowUpRight = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WhatsAppIcon = ({ size = 17 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm5.82 14.01c-.24.68-1.41 1.3-1.95 1.38-.5.08-1.13.11-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.8-4.17-4.94-4.36-.15-.19-1.18-1.57-1.18-2.99 0-1.42.74-2.12 1.01-2.41.26-.29.58-.36.77-.36.19 0 .38.01.55.01.18 0 .41-.07.64.49.24.58.82 2 .89 2.14.07.15.12.31.02.5-.1.19-.15.31-.29.48-.15.17-.3.38-.43.51-.15.14-.3.3-.13.59.17.29.75 1.24 1.61 2.01 1.11.99 2.04 1.3 2.33 1.44.29.15.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.65-.15.27.1 1.71.81 2 .95.29.15.48.22.55.34.07.12.07.7-.17 1.38Z"
      fill="currentColor"
    />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12.5 9.5 17 19 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor" />
  </svg>
);

// ─── Utilitário de Card com Iluminação Especular (Estilo Resend.com) ───
function SpotCard({ className = "", as: Tag = "div", children, ...rest }) {
  const ref = useRef(null);
  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };
  return (
    <Tag ref={ref} onMouseMove={handleMove} className={`spot-card ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}

// ─── Artefato 3D Interativo "Reality Tesseract" (Inspirado no Cubo 3D da Resend.com) ───
function RealityCubeCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId;
    let width = 0;
    let height = 0;
    let targetRotX = -0.38;
    let targetRotY = 0.62;
    let rotX = targetRotX;
    let rotY = targetRotY;
    let time = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width || 440;
      height = rect.height || 440;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      targetRotY = 0.62 + nx * 0.55;
      targetRotX = -0.38 + ny * 0.35;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Vértices de um cubo externo e um núcleo interno (Tesseract / Prisma Reality)
    const createCube = (s) => [
      [-s, -s, -s], [s, -s, -s], [s, s, -s], [-s, s, -s],
      [-s, -s, s],  [s, -s, s],  [s, s, s],  [-s, s, s]
    ];

    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7]
    ];

    const faces = [
      [0, 1, 2, 3], [4, 5, 6, 7],
      [0, 1, 5, 4], [2, 3, 7, 6],
      [0, 3, 7, 4], [1, 2, 6, 5]
    ];

    const rotatePoint = ([x, y, z], rx, ry, rz) => {
      // Rotação Y
      let x1 = x * Math.cos(ry) + z * Math.sin(ry);
      let z1 = -x * Math.sin(ry) + z * Math.cos(ry);
      // Rotação X
      let y2 = y * Math.cos(rx) - z1 * Math.sin(rx);
      let z2 = y * Math.sin(rx) + z1 * Math.cos(rx);
      // Rotação Z sutil
      let x3 = x1 * Math.cos(rz) - y2 * Math.sin(rz);
      let y3 = x1 * Math.sin(rz) + y2 * Math.cos(rz);
      return [x3, y3, z2];
    };

    const project = ([x, y, z], fov = 520) => {
      const dist = 420;
      const scale = fov / (dist + z);
      return [width / 2 + x * scale, height / 2 + y * scale, z, scale];
    };

    // Partículas sutis de luz no estúdio
    const particles = Array.from({ length: 34 }, (_, i) => ({
      angle: (i / 34) * Math.PI * 2,
      radius: 75 + (i % 7) * 22,
      yOffset: ((i % 9) - 4) * 26,
      speed: 0.002 + (i % 5) * 0.0008,
      size: (i % 3 === 0) ? 1.8 : 1.1
    }));

    const render = () => {
      time += 0.008;
      rotX += (targetRotX - rotX) * 0.05;
      rotY += (targetRotY + time * 0.35 - rotY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Halo volumétrico central de estúdio
      const glow = ctx.createRadialGradient(cx, cy, 12, cx, cy, Math.min(width, height) * 0.48);
      glow.addColorStop(0, "rgba(255, 255, 255, 0.14)");
      glow.addColorStop(0.38, "rgba(148, 163, 184, 0.06)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // Partículas orbitais
      particles.forEach((p) => {
        const a = p.angle + time * (p.speed * 60);
        const px = Math.cos(a) * p.radius;
        const pz = Math.sin(a) * p.radius;
        const py = p.yOffset + Math.sin(time * 2 + p.angle) * 8;
        const [sx, sy, sz] = project([px, py, pz]);
        const alpha = Math.max(0.08, Math.min(0.55, (180 - sz) / 340));
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(sx, sy, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      const outerSize = Math.min(width, height) * 0.21;
      const innerSize = outerSize * 0.52;

      const outerVerts = createCube(outerSize).map((v) =>
        project(rotatePoint(v, rotX, rotY + time * 0.25, Math.sin(time * 0.5) * 0.12))
      );
      const innerVerts = createCube(innerSize).map((v) =>
        project(rotatePoint(v, -rotX * 0.8, -rotY - time * 0.4, Math.cos(time * 0.6) * 0.18))
      );

      // Faces translúcidas dark-glass ordenadas por profundidade (painter's algorithm)
      const sortedFaces = faces
        .map((face) => {
          const avgZ = face.reduce((acc, idx) => acc + outerVerts[idx][2], 0) / 4;
          return { face, avgZ };
        })
        .sort((a, b) => b.avgZ - a.avgZ);

      sortedFaces.forEach(({ face, avgZ }) => {
        ctx.beginPath();
        face.forEach((vIdx, idx) => {
          const [vx, vy] = outerVerts[vIdx];
          if (idx === 0) ctx.moveTo(vx, vy);
          else ctx.lineTo(vx, vy);
        });
        ctx.closePath();
        const shade = Math.max(0.015, Math.min(0.08, (120 - avgZ) / 2200));
        ctx.fillStyle = `rgba(255, 255, 255, ${shade.toFixed(3)})`;
        ctx.fill();
      });

      // Conexões do Tesseract (vértice interno -> vértice externo)
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.13)";
      for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.moveTo(innerVerts[i][0], innerVerts[i][1]);
        ctx.lineTo(outerVerts[i][0], outerVerts[i][1]);
        ctx.stroke();
      }

      // Arestas do núcleo interno (brilho ciano/prata especular)
      ctx.lineWidth = 1.25;
      ctx.strokeStyle = "rgba(226, 232, 240, 0.52)";
      edges.forEach(([a, b]) => {
        ctx.beginPath();
        ctx.moveTo(innerVerts[a][0], innerVerts[a][1]);
        ctx.lineTo(innerVerts[b][0], innerVerts[b][1]);
        ctx.stroke();
      });

      // Arestas do cubo externo (acabamento metálico Resend)
      edges.forEach(([a, b]) => {
        const zAvg = (outerVerts[a][2] + outerVerts[b][2]) / 2;
        const alpha = Math.max(0.18, Math.min(0.82, (160 - zAvg) / 260));
        ctx.lineWidth = alpha > 0.5 ? 1.6 : 1.0;
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.moveTo(outerVerts[a][0], outerVerts[a][1]);
        ctx.lineTo(outerVerts[b][0], outerVerts[b][1]);
        ctx.stroke();
      });

      // Pontos nodais nos vértices frontais
      outerVerts.forEach(([vx, vy, vz]) => {
        if (vz < 20) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
          ctx.beginPath();
          ctx.arc(vx, vy, 2.1, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div className="reality-cube-stage" aria-hidden="true">
      <div className="studio-spotlight-beam" />
      <canvas ref={canvasRef} className="reality-cube-canvas" />
      <div className="cube-pedestal-reflection" />
    </div>
  );
}

function readCaseFromHash() {
  const hash = location.hash;
  if (!hash.startsWith("#case/")) return null;
  const raw = hash.slice(6);
  if (raw === "aura") return "fluxoacademy";
  return CASE_IDS.includes(raw) ? raw : null;
}

// ─── Simulador Interativo 01: FLUXO FINANCE (Motion) ───
function FluxoInteractiveSim() {
  const [targetIncome, setTargetIncome] = useState(8000);
  const [monthlySaving, setMonthlySaving] = useState(2200);
  const [activeStageIdx, setActiveStageIdx] = useState(2);
  const [mcpQuery, setMcpQuery] = useState("jornada");

  const targetNetWorth = Math.round(targetIncome / 0.007);
  const currentNetWorthDemo = 148000;
  const progressPct = Math.min(100, Math.round((currentNetWorthDemo / targetNetWorth) * 100));

  const monthsToFreedom = useMemo(() => {
    const r = 0.007;
    let balance = currentNetWorthDemo;
    let months = 0;
    while (balance < targetNetWorth && months < 600) {
      balance = balance * (1 + r) + monthlySaving;
      months++;
    }
    return months;
  }, [targetNetWorth, monthlySaving]);

  const yearsLabel = useMemo(() => {
    const yrs = Math.floor(monthsToFreedom / 12);
    const mos = monthsToFreedom % 12;
    if (yrs === 0) return `${mos} meses`;
    return `${yrs}a ${mos}m`;
  }, [monthsToFreedom]);

  const dailyFreedomPower = Math.max(25, monthlySaving / 30);
  const currentStage = FLUXO_STAGES[activeStageIdx] || FLUXO_STAGES[0];

  const formatBRL = (n) =>
    n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

  return (
    <div className="sim-shell">
      <div className="sim-topbar">
        <div className="sim-badge-row">
          <span className="sim-live-dot" />
          <span className="mono-tag">MOTOR DA JORNADA · SIMULADOR INTERATIVO (TS + DART)</span>
        </div>
        <span className="mono-tag sim-domain">fluxo.finance · Supabase RLS + Stripe</span>
      </div>

      <div className="sim-grid-2">
        <div className="sim-panel">
          <div className="sim-panel-head">
            <span className="micro-label">SIMULADOR "E SE" AO VIVO</span>
            <h4>Ajuste a meta de renda passiva e o aporte</h4>
          </div>

          <div className="sim-control">
            <div className="sim-control-label">
              <span>Renda passiva mensal desejada</span>
              <strong>{formatBRL(targetIncome)}/mês</strong>
            </div>
            <input
              type="range"
              min="3000"
              max="25000"
              step="500"
              value={targetIncome}
              onChange={(e) => setTargetIncome(Number(e.target.value))}
              aria-label="Renda passiva mensal desejada"
            />
          </div>

          <div className="sim-control">
            <div className="sim-control-label">
              <span>Aporte mensal recorrente</span>
              <strong>{formatBRL(monthlySaving)}/mês</strong>
            </div>
            <input
              type="range"
              min="500"
              max="10000"
              step="250"
              value={monthlySaving}
              onChange={(e) => setMonthlySaving(Number(e.target.value))}
              aria-label="Aporte mensal recorrente"
            />
          </div>

          <div className="sim-kpis">
            <motion.div
              key={targetNetWorth}
              initial={{ opacity: 0.6, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="sim-kpi-card"
            >
              <span>PATRIMÔNIO ALVO</span>
              <strong>{formatBRL(targetNetWorth)}</strong>
              <small>Para gerar {formatBRL(targetIncome)}/mês</small>
            </motion.div>

            <motion.div
              key={monthsToFreedom}
              initial={{ opacity: 0.6, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="sim-kpi-card is-highlight"
            >
              <span>PRAZO ESTIMADO</span>
              <strong>{yearsLabel}</strong>
              <small>{progressPct}% do caminho concluído</small>
            </motion.div>
          </div>

          <div className="sim-progress-block">
            <div className="sim-progress-meta">
              <span>Patrimônio acumulado (demo): {formatBRL(currentNetWorthDemo)}</span>
              <span>{progressPct}%</span>
            </div>
            <div className="sim-progress-track">
              <motion.div
                className="sim-progress-fill"
                initial={false}
                animate={{ width: `${progressPct}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              />
            </div>
          </div>
        </div>

        <div className="sim-panel">
          <div className="sim-panel-head">
            <span className="micro-label">DIFERENCIAL DE PRODUTO</span>
            <h4>Custo em Tempo de Liberdade (+Xd)</h4>
          </div>
          <p className="sim-helper">
            Em vez de mostrar apenas gráficos do passado, o Fluxo converte cada categoria de despesa em{" "}
            <strong>dias de liberdade adiados</strong> conforme o seu ritmo atual:
          </p>

          <div className="sim-expense-list">
            {FLUXO_CATEGORIES_DEMO.map((cat) => {
              const daysDelayed = Math.max(1, Math.round(cat.monthly / dailyFreedomPower));
              return (
                <motion.div key={cat.name} layout className="sim-expense-row" whileHover={{ x: 4 }}>
                  <div className="sim-expense-info">
                    <span className="sim-expense-icon" aria-hidden="true">{cat.icon}</span>
                    <div>
                      <strong>{cat.name}</strong>
                      <small>{formatBRL(cat.monthly)} no mês</small>
                    </div>
                  </div>
                  <motion.span
                    key={daysDelayed}
                    initial={{ scale: 0.92 }}
                    animate={{ scale: 1 }}
                    className="sim-days-pill"
                  >
                    +{daysDelayed}d de liberdade
                  </motion.span>
                </motion.div>
              );
            })}
          </div>

          <div className="sim-stage-box">
            <div className="sim-stage-tabs" role="tablist" aria-label="Etapas da Jornada">
              {FLUXO_STAGES.map((st, idx) => (
                <button
                  key={st.stage}
                  role="tab"
                  aria-selected={activeStageIdx === idx}
                  className={activeStageIdx === idx ? "is-active" : ""}
                  onClick={() => setActiveStageIdx(idx)}
                >
                  Etapa 0{st.stage}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStage.stage}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="sim-stage-content"
              >
                <strong>{currentStage.title}</strong>
                <p><span>Lição:</span> {currentStage.lesson}</p>
                <p><span>Próxima ação:</span> {currentStage.nextAction}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="sim-mcp-strip">
            <div className="sim-mcp-header">
              <span className="mono-tag">SERVIDOR MCP (/api/mcp)</span>
              <div className="sim-mcp-pills">
                <button
                  className={mcpQuery === "jornada" ? "is-active" : ""}
                  onClick={() => setMcpQuery("jornada")}
                >
                  fluxo_jornada_liberdade
                </button>
                <button
                  className={mcpQuery === "resumo" ? "is-active" : ""}
                  onClick={() => setMcpQuery("resumo")}
                >
                  fluxo_resumo_financeiro
                </button>
              </div>
            </div>
            <code className="sim-mcp-code">
              {mcpQuery === "jornada"
                ? `→ Claude/ChatGPT via MCP: { meta: "${formatBRL(targetIncome)}/mês", patrimonioAlvo: "${formatBRL(targetNetWorth)}", prazoEstimado: "${yearsLabel}", etapaAtual: "${currentStage.title}" }`
                : `→ Claude/ChatGPT via MCP: { aporteMensal: "${formatBRL(monthlySaving)}", plano: "Fluxo+ (RLS verified)", proximoPasso: "Reduzir Delivery antecipa ${Math.max(1, Math.round(920 / dailyFreedomPower))}d" }`}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Simulador Interativo 02: FLUXO ACADEMY (antiga Aura Educacional) ───
function FluxoAcademyInteractiveSim() {
  const [cmsCourseTitle, setCmsCourseTitle] = useState(ACADEMY_CERT_DEMO.originalTitle);
  const [cmsWorkload, setCmsWorkload] = useState(120);
  const [accessMode, setAccessMode] = useState("subscription");
  const [jwtCountdown, setJwtCountdown] = useState(28);

  useEffect(() => {
    const timer = setInterval(() => {
      setJwtCountdown((prev) => (prev <= 1 ? 30 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hasAccess = accessMode === "subscription" || accessMode === "single";

  return (
    <div className="sim-shell">
      <div className="sim-topbar">
        <div className="sim-badge-row">
          <span className="sim-live-dot" />
          <span className="mono-tag">FLUXO ACADEMY (EX-AURA) · MOTOR LMS & SNAPSHOT IMUTÁVEL</span>
        </div>
        <span className="mono-tag sim-domain">Next.js 15 + Hono Cloud Run + Drizzle</span>
      </div>

      <div className="sim-grid-2">
        <div className="sim-panel">
          <div className="sim-panel-head">
            <span className="micro-label">1. CMS INTERNO (ZERO-DEPLOY) & ACESSO SQL</span>
            <h4>Simule editar um curso no Admin ou trocar o vínculo do aluno</h4>
          </div>

          <div className="sim-field-group">
            <label htmlFor="sim-cms-title">Título atual do curso no catálogo (`courses.title`):</label>
            <input
              id="sim-cms-title"
              type="text"
              value={cmsCourseTitle}
              onChange={(e) => setCmsCourseTitle(e.target.value)}
            />
          </div>

          <div className="sim-control">
            <div className="sim-control-label">
              <span>Carga horária atual no catálogo (`courses.workload_hours`):</span>
              <strong>{cmsWorkload} horas</strong>
            </div>
            <input
              type="range"
              min="40"
              max="240"
              step="20"
              value={cmsWorkload}
              onChange={(e) => setCmsWorkload(Number(e.target.value))}
            />
          </div>

          <div className="sim-access-selector">
            <span className="micro-label">REGRA SQL: has_course_access(user, course)</span>
            <div className="sim-access-buttons">
              <button
                className={accessMode === "subscription" ? "is-active" : ""}
                onClick={() => setAccessMode("subscription")}
              >
                Assinatura Ativa
              </button>
              <button
                className={accessMode === "single" ? "is-active" : ""}
                onClick={() => setAccessMode("single")}
              >
                Compra Avulsa Vitalícia
              </button>
              <button
                className={accessMode === "canceled" ? "is-active" : ""}
                onClick={() => setAccessMode("canceled")}
              >
                Assinatura Cancelada
              </button>
            </div>

            <motion.div
              key={accessMode}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className={"sim-access-status " + (hasAccess ? "is-granted" : "is-denied")}
            >
              <strong>
                {hasAccess ? "✓ ACESSO LIBERADO AO PLAYER (apps/learn)" : "✕ ACESSO BLOQUEADO"}
              </strong>
              <p>
                {accessMode === "subscription" &&
                  "A assinatura valida permissão via subquery em `subscriptions` sem inflar linhas na tabela `course_access`."}
                {accessMode === "single" &&
                  "Mesmo sem assinatura recorrente, o registro `purchase` em `course_access` preserva o curso vitaliciamente."}
                {accessMode === "canceled" &&
                  "Cancelamento instantâneo via webhook Stripe (`webhook_events.event_id UNIQUE`). Certificados já emitidos seguem públicos."}
              </p>
            </motion.div>
          </div>

          <div className="sim-mux-bar">
            <span className="mono-tag">MUX SIGNED PLAYBACK</span>
            <span className="mono-tag">JWT renova em {jwtCountdown}s</span>
          </div>
        </div>

        <div className="sim-panel">
          <div className="sim-panel-head">
            <span className="micro-label">2. VALIDADOR PÚBLICO DE CERTIFICADO (SEM LOGIN)</span>
            <h4>Snapshots imutáveis protegem certificados emitidos</h4>
          </div>

          <div className="sim-cert-card">
            <div className="sim-cert-header">
              <div>
                <span className="sim-cert-badge">✓ CERTIFICADO AUTÊNTICO · LDB ART. 42</span>
                <h5>FLUXO ACADEMY · CERTIFICAÇÃO OFICIAL</h5>
              </div>
              <code className="sim-cert-code">{ACADEMY_CERT_DEMO.code}</code>
            </div>

            <div className="sim-cert-grid">
              <div>
                <span>TITULAR (user_name_snapshot)</span>
                <strong>{ACADEMY_CERT_DEMO.studentName}</strong>
              </div>
              <div>
                <span>APROVEITAMENTO (final_score)</span>
                <strong>{ACADEMY_CERT_DEMO.finalScore}</strong>
              </div>
              <div className="sim-cert-full">
                <span>CURSO CONCLUÍDO (course_title_snapshot — IMUTÁVEL)</span>
                <strong>{ACADEMY_CERT_DEMO.originalTitle}</strong>
              </div>
              <div>
                <span>CARGA HORÁRIA (workload_hours_snapshot)</span>
                <strong>{ACADEMY_CERT_DEMO.originalHours} horas</strong>
              </div>
              <div>
                <span>EMISSÃO (Cloud Tasks + Puppeteer)</span>
                <strong>{ACADEMY_CERT_DEMO.issuedAt}</strong>
              </div>
            </div>

            {(cmsCourseTitle !== ACADEMY_CERT_DEMO.originalTitle ||
              cmsWorkload !== ACADEMY_CERT_DEMO.originalHours) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="sim-cert-diff-alert"
              >
                <strong>Blindagem Arquitetural Ativa:</strong> Você alterou o catálogo no CMS para{" "}
                <em>"{cmsCourseTitle}" ({cmsWorkload}h)</em>, mas o certificado já emitido permanece intacto com{" "}
                <strong>"{ACADEMY_CERT_DEMO.originalTitle}" ({ACADEMY_CERT_DEMO.originalHours}h)</strong> graças aos campos{" "}
                <code>*_snapshot</code> no PostgreSQL.
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Simulador Interativo 03: ADMINISTRAÇÃO JUDICIAL & ADVOCACIA ───
function JudicialInteractiveSim() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedCaseId, setSelectedCaseId] = useState(JUDICIAL_CASES_DEMO[0].id);

  const categories = ["Todos", "Recuperação Judicial", "Perícia Grafotécnica", "Administração Judicial"];
  const filteredCases = useMemo(() => {
    if (selectedCategory === "Todos") return JUDICIAL_CASES_DEMO;
    return JUDICIAL_CASES_DEMO.filter((c) => c.category === selectedCategory);
  }, [selectedCategory]);

  const activeCase =
    filteredCases.find((c) => c.id === selectedCaseId) || filteredCases[0] || JUDICIAL_CASES_DEMO[0];

  return (
    <div className="sim-shell">
      <div className="sim-topbar">
        <div className="sim-badge-row">
          <span className="sim-live-dot" />
          <span className="mono-tag">MURAL DE TRANSPARÊNCIA PROCESSUAL & PERÍCIA FORENSE</span>
        </div>
        <span className="mono-tag sim-domain">Amanda Silvestre · Administração Judicial</span>
      </div>

      <div className="sim-filter-bar" role="tablist" aria-label="Filtrar processos por especialidade">
        {categories.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={selectedCategory === cat}
            className={selectedCategory === cat ? "is-active" : ""}
            onClick={() => {
              setSelectedCategory(cat);
              const first =
                cat === "Todos"
                  ? JUDICIAL_CASES_DEMO[0]
                  : JUDICIAL_CASES_DEMO.find((item) => item.category === cat);
              if (first) setSelectedCaseId(first.id);
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="sim-grid-2">
        <div className="sim-panel">
          <div className="sim-panel-head">
            <span className="micro-label">PROCESSOS PÚBLICOS & LAUDOS EM DESTAQUE</span>
            <h4>Selecione um processo para inspecionar os autos</h4>
          </div>

          <div className="sim-case-list">
            {filteredCases.map((item) => {
              const isSelected = activeCase.id === item.id;
              return (
                <motion.button
                  key={item.id}
                  layout
                  onClick={() => setSelectedCaseId(item.id)}
                  className={"sim-case-item" + (isSelected ? " is-active" : "")}
                >
                  <div className="sim-case-item-top">
                    <span className="mono-tag">{item.category}</span>
                    <span className="sim-status-chip">{item.status}</span>
                  </div>
                  <strong>{item.title}</strong>
                  <small>Autos nº {item.processNumber}</small>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="sim-panel">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCase.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              <div className="sim-panel-head">
                <span className="micro-label">{activeCase.status}</span>
                <h4>{activeCase.title}</h4>
              </div>

              <div className="sim-judicial-meta">
                <div>
                  <span>Nº DO PROCESSO</span>
                  <strong>{activeCase.processNumber}</strong>
                </div>
                <div>
                  <span>JUÍZO / VARA</span>
                  <strong>{activeCase.court}</strong>
                </div>
                <div className="sim-judicial-meta-full">
                  <span>ESCOPO / PARTES</span>
                  <strong>{activeCase.parties}</strong>
                </div>
              </div>

              <div className="sim-docs-list">
                <span className="micro-label">PEÇAS, RELATÓRIOS MENSAIS (RMA) & LAUDOS DISPONÍVEIS</span>
                {activeCase.documents.map((doc) => (
                  <div key={doc.name} className="sim-doc-row">
                    <div>
                      <span className="sim-doc-tag">{doc.tag}</span>
                      <strong>{doc.name}</strong>
                    </div>
                    <span className="mono-tag">{doc.date} ↗</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─── Visualizador Unificado por Estudo de Caso (Motion Tabs) ───
function CaseInteractiveVisualizer({ project }) {
  const [tab, setTab] = useState("simulador");
  const DiagramComponent = window.DIAGRAMS?.[project.diagram];

  const tabs = [
    { id: "simulador", label: "Simulador Interativo" },
    { id: "arquitetura", label: "Arquitetura & Engenharia" },
    { id: "interface", label: "Interface em Produção" }
  ];

  return (
    <div className="case-visualizer">
      <div className="visualizer-tabs-bar">
        <div className="visualizer-tabs" role="tablist" aria-label={`Visualizações de ${project.title}`}>
          {tabs.map((item) => {
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                role="tab"
                aria-selected={active}
                className={"visualizer-tab" + (active ? " is-active" : "")}
                onClick={() => setTab(item.id)}
              >
                {active && (
                  <motion.span
                    layoutId={`tab-pill-${project.id}`}
                    className="visualizer-tab-bg"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="visualizer-tab-label">{item.label}</span>
              </button>
            );
          })}
        </div>

        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="visualizer-live-link"
        >
          <span>{project.domain}</span>
          <ArrowUpRight size={14} />
        </a>
      </div>

      <div className="visualizer-stage">
        <AnimatePresence mode="wait">
          {tab === "simulador" && (
            <motion.div
              key="simulador"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.24 }}
            >
              {project.id === "fluxo" && <FluxoInteractiveSim />}
              {project.id === "fluxoacademy" && <FluxoAcademyInteractiveSim />}
              {project.id === "judicial" && <JudicialInteractiveSim />}
            </motion.div>
          )}

          {tab === "arquitetura" && (
            <motion.div
              key="arquitetura"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.24 }}
              className="visualizer-diagram-wrap"
            >
              <div className="visualizer-diagram-header">
                <span className="mono-tag">BLUEPRINT DE ARQUITETURA · {project.title.toUpperCase()}</span>
                <span className="mono-tag">{project.tags.slice(0, 4).join(" · ")}</span>
              </div>
              {DiagramComponent && (
                <div className="diagram-frame">
                  <DiagramComponent />
                </div>
              )}
            </motion.div>
          )}

          {tab === "interface" && (
            <motion.div
              key="interface"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.24 }}
              className="visualizer-preview-wrap"
            >
              <div className="browser-mockup">
                <div className="browser-bar">
                  <div className="browser-dots" aria-hidden="true">
                    <span /><span /><span />
                  </div>
                  <div className="browser-address">https://{project.domain}</div>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="browser-open-link"
                  >
                    Abrir aplicação <ArrowUpRight size={13} />
                  </a>
                </div>
                <div className="browser-viewport">
                  <img
                    src={project.previewSrc}
                    alt={project.previewAlt}
                    width="1200"
                    height="824"
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Navbar Institucional Flutuante (Estilo Resend.com) ───
function Header({ activeSection, scrollToSection, openWhatsApp }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: "solucoes", label: "Soluções" },
    { id: "cases", label: "Estudos de Caso" },
    { id: "engenharia", label: "Arquitetura" },
    { id: "processo", label: "Processo" },
    { id: "orcamento", label: "Contratar" }
  ];

  const handleNav = (id, event) => {
    event.preventDefault();
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <header className="site-header">
      <div className="scroll-progress-bar" aria-hidden="true" />
      <div className="header-inner">
        <a
          href="#topo"
          className="brand"
          onClick={(e) => handleNav("topo", e)}
          aria-label="Reality — Engenharia de Software Sob Medida"
        >
          <span className="brand-icon-wrap">
            <RealityPrismLogo size={22} />
          </span>
          <span className="brand-wordmark">Reality</span>
        </a>

        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Navegação institucional">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeSection === item.id ? "is-active" : ""}
              onClick={(e) => handleNav(item.id, e)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a
            href="#orcamento"
            className="header-ghost-link"
            onClick={(e) => handleNav("orcamento", e)}
          >
            Simular Escopo
          </a>
          <a
            className="btn-pill-light is-sm"
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              openWhatsApp();
            }}
          >
            <WhatsAppIcon size={15} />
            <span>Falar no WhatsApp</span>
          </a>
          <button
            className="menu-trigger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Abrir menu"
          >
            {menuOpen ? "Fechar" : "Menu"}
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── Hero Section Cinematográfica (Inspirada em Resend.com) ───
function HeroSection({ scrollToSection, openWhatsApp }) {
  return (
    <section id="topo" className="hero-section" aria-labelledby="hero-title">
      {/* Luz volumétrica de estúdio no topo */}
      <div className="hero-studio-glow" aria-hidden="true" />
      <div className="hero-grid-backdrop" aria-hidden="true" />

      <div className="hero-container">
        <div className="hero-copy-col">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <a
              href="#cases"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("cases");
              }}
              className="announcement-pill"
            >
              <span className="announcement-badge">REALITY</span>
              <span>Engenharia de Software Sob Medida para Operações Reais</span>
              <ArrowRight size={14} />
            </a>
          </motion.div>

          <motion.h1
            id="hero-title"
            className="hero-title"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08 }}
          >
            Onde ideias complexas se tornam{" "}
            <span className="serif-italic">software</span> em produção.
          </motion.h1>

          <motion.p
            className="hero-lead"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.16 }}
          >
            A <strong>Reality</strong> projeta, arquiteta e constrói sistemas próprios sob medida — de plataformas SaaS multi-tenant e aplicativos nativos em Flutter a portais institucionais de transparência e agentes de IA integrados ao seu negócio.
          </motion.p>

          <motion.div
            className="hero-cta-row"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.24 }}
          >
            <button
              className="btn-pill-light"
              onClick={() =>
                openWhatsApp(
                  "Olá, equipe da Reality! Acessei o site myreality.tech e quero conversar sobre um projeto de software sob medida."
                )
              }
            >
              <WhatsAppIcon size={17} />
              <span>Contratar pelo WhatsApp</span>
              <ArrowRight size={16} />
            </button>

            <button
              className="btn-pill-glass"
              onClick={() => scrollToSection("cases")}
            >
              <span>Explorar Estudos de Caso</span>
              <ArrowRight size={16} />
            </button>
          </motion.div>

          <motion.div
            className="hero-trust-row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.36 }}
          >
            <span><CheckIcon /> Código 100% próprio (Zero Lock-in)</span>
            <span><CheckIcon /> Web + Mobile Nativo + Cloud</span>
            <span><CheckIcon /> Segurança RLS & Pagamentos Stripe</span>
          </motion.div>
        </div>

        {/* Palco 3D Interativo "Reality Tesseract" */}
        <motion.div
          className="hero-visual-col"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.12 }}
        >
          <RealityCubeCanvas />
        </motion.div>
      </div>

      {/* Faixa Institucional de Capacidades Técnicas */}
      <div className="hero-metrics-bar">
        <div className="hero-metrics-inner">
          <div className="hero-metric-item">
            <span className="mono-tag">ARQUITETURA</span>
            <strong>Monorepos Poliglotas</strong>
            <small>Next.js 15 · Flutter Nativo · Hono API</small>
          </div>
          <div className="hero-metric-item">
            <span className="mono-tag">INFRAESTRUTURA & DADOS</span>
            <strong>Cloud Run & PostgreSQL</strong>
            <small>Drizzle ORM · Supabase RLS · Scale-to-Zero</small>
          </div>
          <div className="hero-metric-item">
            <span className="mono-tag">MONETIZAÇÃO & VÍDEO</span>
            <strong>Stripe & Mux Streaming</strong>
            <small>Webhooks idempotentes · Signed JWT 30s</small>
          </div>
          <div className="hero-metric-item">
            <span className="mono-tag">INTELIGÊNCIA ARTIFICIAL</span>
            <strong>LLMs & Servidores MCP</strong>
            <small>Integração nativa com Claude e ChatGPT</small>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Seção 01: Soluções Institucionais Sob Medida ───
function SolutionsSection({ openCaseModal, openWhatsApp }) {
  return (
    <section id="solucoes" className="section-shell" aria-labelledby="solutions-title">
      <div className="section-intro-centered" data-gsap="reveal">
        <span className="eyebrow-pill">
          <SparkleIcon /> SOLUÇÕES SOB MEDIDA
        </span>
        <h2 id="solutions-title" className="section-title">
          Engenharia desenhada para a realidade da sua{" "}
          <span className="serif-italic">operação.</span>
        </h2>
        <p className="section-subtitle">
          Não forçamos o seu negócio a caber em templates prontos ou plataformas alugadas que cobram comissão por usuário. Construímos tecnologia proprietária, pronta para escalar.
        </p>
      </div>

      <div className="solutions-cards-grid">
        {SOLUTIONS.map((sol) => (
          <SpotCard key={sol.id} as="article" className="solution-glass-card" data-gsap="reveal">
            <div className="solution-card-header">
              <span className="solution-num-badge">{sol.number}</span>
              <span className="mono-tag">{sol.tag}</span>
            </div>

            <h3>{sol.title}</h3>
            <p className="solution-card-sub">{sol.subtitle}</p>
            <p className="solution-card-desc">{sol.description}</p>

            <ul className="solution-card-list">
              {sol.deliverables.map((item) => (
                <li key={item}>
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="solution-card-footer">
              <div className="solution-cases-row">
                <span className="mono-tag">EM PRODUÇÃO:</span>
                {sol.relatedCases.map((cId) => {
                  const p = PROJECTS.find((item) => item.id === cId);
                  if (!p) return null;
                  return (
                    <button key={cId} className="mini-case-chip" onClick={() => openCaseModal(cId)}>
                      {p.title} ↗
                    </button>
                  );
                })}
              </div>

              <button
                className="btn-card-action"
                onClick={() => openWhatsApp(sol.whatsappPrompt)}
              >
                <WhatsAppIcon size={15} />
                <span>Orçar esta solução</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </SpotCard>
        ))}
      </div>
    </section>
  );
}

// ─── Seção 02: Estudos de Caso Cinematográficos (GSAP ScrollTrigger + Motion) ───
function CaseStudiesSection({ openCaseModal, openWhatsApp }) {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      PROJECTS.forEach((proj, idx) => {
        const el = document.getElementById(`case-study-card-${proj.id}`);
        if (!el) return;

        ScrollTrigger.create({
          trigger: el,
          start: "top 48%",
          end: "bottom 48%",
          onEnter: () => setActiveCaseIndex(idx),
          onEnterBack: () => setActiveCaseIndex(idx)
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cases"
      ref={sectionRef}
      className="section-shell cases-section"
      aria-labelledby="cases-title"
    >
      <div className="horizon-glow-divider" aria-hidden="true" />

      <div className="section-intro-centered" data-gsap="reveal">
        <span className="eyebrow-pill">
          <SparkleIcon /> ESTUDOS DE CASO EM PRODUÇÃO
        </span>
        <h2 id="cases-title" className="section-title">
          Três sistemas reais. Três problemas resolvidos na{" "}
          <span className="serif-italic">raiz.</span>
        </h2>
        <p className="section-subtitle">
          Cada projeto abaixo nasceu de uma dor concreta que softwares de prateleira não conseguiam atender. Interaja com os simuladores ao vivo (em Motion) e inspecione a arquitetura de cada aplicação.
        </p>
      </div>

      {/* Barra Flutuante de Índice dos Estudos de Caso */}
      <div className="cases-floating-bar-wrap">
        <div className="cases-floating-bar" role="navigation" aria-label="Navegação rápida entre Estudos de Caso">
          {PROJECTS.map((proj, idx) => {
            const isCurrent = activeCaseIndex === idx;
            return (
              <a
                key={proj.id}
                href={`#case-study-card-${proj.id}`}
                className={"case-pill-link" + (isCurrent ? " is-active" : "")}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(`case-study-card-${proj.id}`);
                  if (target && window.__realityLenis) {
                    window.__realityLenis.scrollTo(target, { offset: -120, duration: 1.1 });
                  } else if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <span className="case-pill-num">{proj.n}</span>
                <span>{proj.title}</span>
                {proj.formerName && <small className="case-pill-sub">({proj.formerName})</small>}
              </a>
            );
          })}
        </div>
      </div>

      <div className="cases-stack">
        {PROJECTS.map((project) => (
          <SpotCard
            key={project.id}
            as="article"
            id={`case-study-card-${project.id}`}
            className={`case-showcase-card aura-${project.id}`}
            data-gsap="case-card"
          >
            {/* Cabeçalho do Estudo de Caso */}
            <div className="case-showcase-head">
              <div className="case-showcase-meta">
                <span className="case-index-pill">CASE {project.n}</span>
                <span className="mono-tag">{project.badge}</span>
                {project.formerName && (
                  <span className="case-rebrand-pill">{project.formerName} → {project.title}</span>
                )}
              </div>

              <div className="case-showcase-title-row">
                <div>
                  <h3>{project.title}</h3>
                  <p className="case-headline">{project.headline}</p>
                </div>

                <div className="case-head-actions">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-pill-glass is-sm"
                  >
                    <span>Ver em produção</span>
                    <ArrowUpRight size={14} />
                  </a>
                  <button
                    className="btn-pill-light is-sm"
                    onClick={() => openCaseModal(project.id)}
                  >
                    <span>Dossiê Técnico Completo</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              <p className="case-summary-text">{project.summary}</p>

              {/* Métricas de Engenharia */}
              <div className="case-metrics-strip">
                {project.metrics.map((m) => (
                  <div key={m.label} className="case-metric-box">
                    <strong>{m.value}</strong>
                    <span>{m.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* O Problema Real vs. A Solução Construída */}
            <div className="case-problem-solution-grid">
              <div className="case-narrative-box is-problem">
                <span className="micro-label">O PROBLEMA DE NEGÓCIO</span>
                <h4>{project.study.problemTitle}</h4>
                <p>{project.study.problem}</p>
              </div>

              <div className="case-narrative-box is-solution">
                <span className="micro-label">O QUE BUSCAMOS RESOLVER (SOLUÇÃO REALITY)</span>
                <h4>{project.study.solutionTitle}</h4>
                <p>{project.study.solution}</p>
              </div>
            </div>

            {/* Visualizador Interativo da Aplicação (Motion + Diagrama + Captura) */}
            <CaseInteractiveVisualizer project={project} />

            {/* Rodapé do Case */}
            <div className="case-showcase-footer">
              <div className="case-tags-row">
                {project.tags.map((tag) => (
                  <span key={tag} className="tech-tag">{tag}</span>
                ))}
              </div>

              <div className="case-conversion-bar">
                <div>
                  <strong>Deseja construir um sistema com esse nível de acabamento e arquitetura?</strong>
                  <small>Fale diretamente com a engenharia da Reality pelo WhatsApp.</small>
                </div>
                <div className="case-conversion-btns">
                  <button
                    className="btn-pill-glass is-sm"
                    onClick={() => openCaseModal(project.id)}
                  >
                    <span>Ver decisões técnicas ({project.study.highlights.length})</span>
                  </button>
                  <button
                    className="btn-pill-light is-sm"
                    onClick={() =>
                      openWhatsApp(
                        `Olá, equipe da Reality! Vi o estudo de caso do projeto *${project.title}* em myreality.tech e gostaria de conversar sobre um software sob medida.`
                      )
                    }
                  >
                    <WhatsAppIcon size={15} />
                    <span>Quero um projeto similar</span>
                  </button>
                </div>
              </div>
            </div>
          </SpotCard>
        ))}
      </div>
    </section>
  );
}

// ─── Seção 03: Padrão de Engenharia Reality (Bento Grid Estilo Resend) ───
function EngineeringSection() {
  return (
    <section id="engenharia" className="section-shell" aria-labelledby="eng-title">
      <div className="horizon-glow-divider" aria-hidden="true" />

      <div className="section-intro-centered" data-gsap="reveal">
        <span className="eyebrow-pill">
          <SparkleIcon /> PADRÃO TÉCNICO REALITY
        </span>
        <h2 id="eng-title" className="section-title">
          Construído para continuar de pé quando a operação{" "}
          <span className="serif-italic">escala.</span>
        </h2>
        <p className="section-subtitle">
          Cada decisão técnica — do esquema relacional no PostgreSQL às regras de idempotência de pagamento — é projetada para máxima segurança, previsibilidade de custos e autonomia da sua instituição.
        </p>
      </div>

      <div className="pillars-bento">
        {ENGINEERING_PILLARS.map((pillar) => (
          <SpotCard key={pillar.code} as="article" className="pillar-card" data-gsap="reveal">
            <div className="pillar-card-top">
              <span className="mono-tag">{pillar.code}</span>
              <span className="pillar-metric-badge">{pillar.metric}</span>
            </div>
            <h3>{pillar.title}</h3>
            <p>{pillar.description}</p>
          </SpotCard>
        ))}
      </div>
    </section>
  );
}

// ─── Seção 04: Processo de Entrega (GSAP ScrollTrigger Scrubbed Timeline) ───
function ProcessSection() {
  const timelineRef = useRef(null);
  const beamRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!timelineRef.current || !beamRef.current) return;
      gsap.fromTo(
        beamRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 68%",
            end: "bottom 42%",
            scrub: 0.3
          }
        }
      );
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="processo" className="section-shell" aria-labelledby="process-title">
      <div className="section-intro-centered" data-gsap="reveal">
        <span className="eyebrow-pill">
          <SparkleIcon /> COMO TRABALHAMOS
        </span>
        <h2 id="process-title" className="section-title">
          Do diagnóstico operacional ao software em{" "}
          <span className="serif-italic">produção.</span>
        </h2>
        <p className="section-subtitle">
          Um processo transparente em quatro etapas, com entregas testáveis desde as primeiras semanas e comunicação direta com quem projeta e escreve o código.
        </p>
      </div>

      <div className="process-timeline" ref={timelineRef}>
        <div className="process-beam-track" aria-hidden="true">
          <div className="process-beam-fill" ref={beamRef} />
        </div>

        {PROCESS_STEPS.map((item) => (
          <SpotCard key={item.step} as="article" className="process-step-card" data-gsap="reveal">
            <div className="process-step-marker">
              <span>{item.step}</span>
            </div>
            <div className="process-step-body">
              <div className="process-step-meta">
                <span className="micro-label">{item.phase}</span>
                <span className="mono-tag">{item.duration}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="process-outputs">
                {item.outputs.map((out) => (
                  <span key={out} className="process-output-chip">
                    <CheckIcon /> {out}
                  </span>
                ))}
              </div>
            </div>
          </SpotCard>
        ))}
      </div>
    </section>
  );
}

// ─── Seção 05: Configurador de Escopo, Redirecionamento WhatsApp & FAQ ───
function ScopeBuilderSection({ setNotice }) {
  const [solutionType, setSolutionType] = useState("Plataforma SaaS / Web + App Mobile");
  const [stage, setStage] = useState("Tirar ideia / produto do papel (MVP ou V1)");
  const [timeline, setTimeline] = useState("Início imediato (próximas 2 semanas)");
  const [clientName, setClientName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [problemDesc, setProblemDesc] = useState("");

  const solutionOptions = [
    "Plataforma SaaS / Web + App Mobile",
    "Portal Institucional / Transparência (Jurídico, Educação, etc.)",
    "Sistema Interno / Automação Operacional & Dashboards",
    "API Crítica / Banco de Dados / Agente de IA & MCP"
  ];

  const stageOptions = [
    "Tirar ideia / produto do papel (MVP ou V1)",
    "Substituir planilhas ou plataforma alugada por sistema próprio",
    "Modernizar ou refazer um sistema legado já em operação",
    "Adicionar novas funcionalidades, pagamentos ou IA"
  ];

  const timelineOptions = [
    "Início imediato (próximas 2 semanas)",
    "Dentro de 30 a 45 dias",
    "Planejamento para o próximo trimestre"
  ];

  const composedMessage = useMemo(() => {
    const lines = [
      "Olá, equipe da *Reality*! Acessei *myreality.tech* e gostaria de solicitar um diagnóstico / orçamento de software sob medida.",
      "",
      `• *Solução desejada:* ${solutionType}`,
      `• *Momento atual:* ${stage}`,
      `• *Previsão de início:* ${timeline}`
    ];
    if (clientName.trim() || companyName.trim()) {
      lines.push(
        `• *Contato / Empresa:* ${[clientName.trim(), companyName.trim()].filter(Boolean).join(" — ")}`
      );
    }
    if (problemDesc.trim()) {
      lines.push("", `*O que buscamos resolver:*`, problemDesc.trim());
    }
    lines.push("", "Podemos agendar uma conversa rápida?");
    return lines.join("\n");
  }, [solutionType, stage, timeline, clientName, companyName, problemDesc]);

  const whatsappHref = buildWhatsAppUrl(composedMessage);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(composedMessage);
      setNotice("Briefing copiado para a área de transferência!");
    } catch {
      setNotice("Não foi possível copiar automaticamente.");
    }
  };

  return (
    <section id="orcamento" className="section-shell scope-section" aria-labelledby="scope-title">
      <div className="horizon-glow-divider" aria-hidden="true" />

      <div className="section-intro-centered" data-gsap="reveal">
        <span className="eyebrow-pill">
          <SparkleIcon /> INICIAR PROJETO
        </span>
        <h2 id="scope-title" className="section-title">
          Traga a visão da sua empresa para a{" "}
          <span className="serif-italic">Reality.</span>
        </h2>
        <p className="section-subtitle">
          Selecione o perfil da sua demanda abaixo para gerar um briefing estruturado e iniciar sua conversa diretamente com a nossa engenharia pelo WhatsApp.
        </p>
      </div>

      <div className="scope-builder-grid" data-gsap="reveal">
        <SpotCard className="scope-form-card">
          <div className="scope-step-block">
            <span className="micro-label">01 · O QUE VOCÊ PRECISA CONSTRUIR?</span>
            <div className="scope-options-grid">
              {solutionOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={"scope-option-btn" + (solutionType === opt ? " is-selected" : "")}
                  onClick={() => setSolutionType(opt)}
                >
                  <span className="radio-dot" />
                  <strong>{opt}</strong>
                </button>
              ))}
            </div>
          </div>

          <div className="scope-step-block">
            <span className="micro-label">02 · QUAL É O CENÁRIO ATUAL?</span>
            <div className="scope-options-grid">
              {stageOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={"scope-option-btn" + (stage === opt ? " is-selected" : "")}
                  onClick={() => setStage(opt)}
                >
                  <span className="radio-dot" />
                  <strong>{opt}</strong>
                </button>
              ))}
            </div>
          </div>

          <div className="scope-step-block">
            <span className="micro-label">03 · HORIZONTE DE PRAZO</span>
            <div className="scope-pills-row">
              {timelineOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={"scope-pill-btn" + (timeline === opt ? " is-selected" : "")}
                  onClick={() => setTimeline(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="scope-inputs-row">
            <div>
              <label htmlFor="scope-name">Seu nome <small>(opcional)</small></label>
              <input
                id="scope-name"
                type="text"
                placeholder="Ex.: Dr. Marcos Azevedo"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                maxLength="90"
              />
            </div>
            <div>
              <label htmlFor="scope-company">Empresa ou Instituição <small>(opcional)</small></label>
              <input
                id="scope-company"
                type="text"
                placeholder="Ex.: Azevedo & Associados"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                maxLength="90"
              />
            </div>
          </div>

          <div className="scope-textarea-block">
            <label htmlFor="scope-problem">Qual problema principal o software deve resolver? <small>(opcional)</small></label>
            <textarea
              id="scope-problem"
              rows="3"
              placeholder="Ex.: Precisamos de uma plataforma própria com área do cliente, cobrança via Stripe e geração automatizada de relatórios..."
              value={problemDesc}
              onChange={(e) => setProblemDesc(e.target.value)}
              maxLength="1200"
            />
          </div>
        </SpotCard>

        <SpotCard as="aside" className="scope-summary-card">
          <div className="scope-summary-top">
            <span className="micro-label">PRÉVIA DO ATENDIMENTO</span>
            <h3>Fale direto com quem constrói</h3>
            <p>A mensagem abaixo será aberta automaticamente no seu WhatsApp para iniciarmos o diagnóstico.</p>
          </div>

          <pre className="scope-message-preview">{composedMessage}</pre>

          <div className="scope-cta-stack">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-light is-full"
            >
              <WhatsAppIcon size={18} />
              <span>Enviar Escopo pelo WhatsApp</span>
              <ArrowUpRight size={16} />
            </a>

            <button type="button" className="btn-copy-briefing" onClick={handleCopy}>
              Copiar texto do briefing
            </button>
          </div>

          <div className="company-credentials-box">
            <div>
              <span>WHATSAPP COMERCIAL (DADOS DEMO V1)</span>
              <strong>{COMPANY.whatsappDisplay}</strong>
            </div>
            <div>
              <span>E-MAIL CORPORATIVO</span>
              <strong>{COMPANY.email}</strong>
            </div>
            <div>
              <span>INSTITUIÇÃO</span>
              <strong>{COMPANY.legalName}</strong>
              <small>CNPJ {COMPANY.cnpj} · {COMPANY.location}</small>
            </div>
          </div>
        </SpotCard>
      </div>

      {/* FAQ Institucional */}
      <div className="faq-block" data-gsap="reveal">
        <div className="faq-head">
          <span className="micro-label">DÚVIDAS FREQUENTES</span>
          <h3>Perguntas sobre contratação e propriedade</h3>
        </div>
        <div className="faq-list">
          {FAQS.map((item) => (
            <details key={item.q} className="faq-item">
              <summary>
                <strong>{item.q}</strong>
                <span>+</span>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Modal de Dossiê Completo do Estudo de Caso ───
function ProjectCaseModal({ project, dialogRef, closeModal, openWhatsApp }) {
  if (!project) return <dialog ref={dialogRef} className="project-dialog" />;
  const DiagramComponent = window.DIAGRAMS?.[project.diagram];

  return (
    <dialog
      ref={dialogRef}
      className="project-dialog"
      aria-labelledby={`modal-title-${project.id}`}
      onClose={closeModal}
      onClick={(e) => {
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
    >
      <div className="dialog-topbar">
        <span className="mono-tag">DOSSIÊ TÉCNICO REALITY · CASE {project.n}</span>
        <button className="dialog-close" onClick={() => dialogRef.current?.close()} aria-label="Fechar dossiê">
          Fechar ×
        </button>
      </div>

      <div className="dialog-head">
        <span className="micro-label">{project.clientType}</span>
        <h2 id={`modal-title-${project.id}`}>{project.title}</h2>
        {project.formerName && (
          <p className="dialog-former-note">Evolução institucional do projeto {project.formerName}</p>
        )}
        <p>{project.summary}</p>
        <div className="dialog-tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>

      <div className="case-sections">
        <section>
          <span className="micro-label">O PROBLEMA DE NEGÓCIO</span>
          <h3>{project.study.problemTitle}</h3>
          <p>{project.study.problem}</p>
        </section>
        <section>
          <span className="micro-label">A SOLUÇÃO SOB MEDIDA</span>
          <h3>{project.study.solutionTitle}</h3>
          <p>{project.study.solution}</p>
        </section>

        <section className="case-build">
          <span className="micro-label">ENGENHARIA, ARQUITETURA & DECISÕES TÉCNICAS</span>
          <div className="modal-highlights-grid">
            {project.study.highlights.map((h) => (
              <div key={h.code} className="modal-highlight-item">
                <span className="mono-tag">{h.code}</span>
                <h4>{h.title}</h4>
                <p>{h.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="case-build">
          <span className="micro-label">RESULTADO & STATUS OPERACIONAL</span>
          <p>{project.study.results}</p>
        </section>
      </div>

      {DiagramComponent && (
        <div className="architecture-modal-block">
          <div className="architecture-modal-head">
            <span className="micro-label">ARQUITETURA DO SISTEMA</span>
            <span className="mono-tag">{project.domain}</span>
          </div>
          <div className="diagram-frame">
            <DiagramComponent />
          </div>
        </div>
      )}

      <div className="case-footer">
        <div className="case-footer-links">
          {project.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="btn-pill-glass is-sm">
              <span>{link.label}</span>
              <ArrowUpRight size={14} />
            </a>
          ))}
        </div>

        <button
          className="btn-pill-light is-sm"
          onClick={() => {
            dialogRef.current?.close();
            openWhatsApp(
              `Olá, equipe da Reality! Analisei o dossiê técnico do projeto *${project.title}* em myreality.tech e quero conversar sobre um sistema sob medida.`
            );
          }}
        >
          <WhatsAppIcon size={16} />
          <span>Solicitar projeto com esta arquitetura no WhatsApp</span>
        </button>
      </div>
    </dialog>
  );
}

// ─── Componente Raiz App ───
function App() {
  const [activeSection, setActiveSection] = useState("topo");
  const [openCaseId, setOpenCaseId] = useState(readCaseFromHash);
  const [notice, setNotice] = useState("");
  const caseDialogRef = useRef(null);

  // Força o tema cinematográfico obsidian (estilo Resend.com)
  useEffect(() => {
    document.documentElement.dataset.theme = "dark";
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#000000");
  }, []);

  // 1. Inicializa o Lenis para rolagem suave sincronizada com GSAP ScrollTrigger
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.18,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5
    });

    window.__realityLenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      window.__realityLenis = null;
    };
  }, []);

  // 2. Animações GSAP + ScrollTrigger
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".scroll-progress-bar",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.15
          }
        }
      );

      gsap.utils.toArray('[data-gsap="reveal"]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 86%",
              toggleActions: "play none none none"
            }
          }
        );
      });

      gsap.utils.toArray('[data-gsap="case-card"]').forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 38 },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 84%",
              toggleActions: "play none none none"
            }
          }
        );
      });

      ["topo", "solucoes", "cases", "engenharia", "processo", "orcamento"].forEach((secId) => {
        const secEl = document.getElementById(secId);
        if (!secEl) return;
        ScrollTrigger.create({
          trigger: secEl,
          start: "top 45%",
          end: "bottom 45%",
          onEnter: () => setActiveSection(secId),
          onEnterBack: () => setActiveSection(secId)
        });
      });
    });

    return () => ctx.revert();
  }, []);

  // 3. Sincronização de hash (#case/fluxo, #case/fluxoacademy, #case/judicial)
  useEffect(() => {
    const onHash = () => setOpenCaseId(readCaseFromHash());
    window.addEventListener("hashchange", onHash);
    window.addEventListener("popstate", onHash);
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("popstate", onHash);
    };
  }, []);

  useEffect(() => {
    const dialog = caseDialogRef.current;
    if (!dialog) return;
    if (openCaseId) {
      if (!dialog.open) dialog.showModal();
      window.__realityLenis?.stop();
    } else {
      if (dialog.open) dialog.close();
      window.__realityLenis?.start();
    }
  }, [openCaseId]);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(""), 4200);
    return () => clearTimeout(t);
  }, [notice]);

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (window.__realityLenis) {
      window.__realityLenis.scrollTo(el, { offset: -76, duration: 1.15 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const openCaseModal = useCallback((id) => {
    history.pushState(null, "", `#case/${id}`);
    setOpenCaseId(id);
  }, []);

  const closeCaseModal = useCallback(() => {
    if (location.hash.startsWith("#case/")) {
      history.replaceState(null, "", location.pathname + location.search);
    }
    setOpenCaseId(null);
  }, []);

  const openWhatsApp = useCallback((customMsg) => {
    const url = buildWhatsAppUrl(customMsg);
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  const activeProject = PROJECTS.find((p) => p.id === openCaseId) || null;

  return (
    <>
      <a className="skip-link" href="#main-content">Pular para o conteúdo principal</a>

      <Header
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        openWhatsApp={openWhatsApp}
      />

      <main id="main-content">
        <HeroSection scrollToSection={scrollToSection} openWhatsApp={openWhatsApp} />
        <SolutionsSection openCaseModal={openCaseModal} openWhatsApp={openWhatsApp} />
        <CaseStudiesSection openCaseModal={openCaseModal} openWhatsApp={openWhatsApp} />
        <EngineeringSection />
        <ProcessSection />
        <ScopeBuilderSection setNotice={setNotice} />
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand-col">
            <a href="#topo" className="brand" onClick={(e) => { e.preventDefault(); scrollToSection("topo"); }}>
              <span className="brand-icon-wrap">
                <RealityPrismLogo size={22} />
              </span>
              <span className="brand-wordmark">Reality</span>
            </a>
            <p>
              Engenharia de software sob medida para empresas que precisam transformar processos complexos em produtos digitais próprios, escaláveis e auditáveis.
            </p>
            <small className="footer-legal">
              © {new Date().getFullYear()} {COMPANY.legalName} · CNPJ {COMPANY.cnpj} (Dados demonstrativos v1)
            </small>
          </div>

          <div className="footer-links-col">
            <span className="micro-label">ESTUDOS DE CASO</span>
            <button onClick={() => openCaseModal("fluxo")}>Fluxo Finance (Web + Flutter + MCP)</button>
            <button onClick={() => openCaseModal("fluxoacademy")}>Fluxo Academy (Ex-Aura Educacional)</button>
            <button onClick={() => openCaseModal("judicial")}>Amanda Silvestre · Administração Judicial</button>
          </div>

          <div className="footer-links-col">
            <span className="micro-label">NAVEGAÇÃO</span>
            <button onClick={() => scrollToSection("solucoes")}>Soluções Sob Medida</button>
            <button onClick={() => scrollToSection("engenharia")}>Padrão de Arquitetura</button>
            <button onClick={() => scrollToSection("processo")}>Como Construímos</button>
            <button onClick={() => scrollToSection("orcamento")}>Configurador de Escopo</button>
          </div>

          <div className="footer-cta-col">
            <span className="micro-label">ATENDIMENTO DIRETO</span>
            <strong>{COMPANY.whatsappDisplay}</strong>
            <small>{COMPANY.email}</small>
            <small>{COMPANY.location}</small>
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-light is-sm"
            >
              <WhatsAppIcon size={15} />
              <span>Iniciar conversa no WhatsApp</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Botão Flutuante de Conversão Rápida para o WhatsApp */}
      <a
        href={buildWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-wa-pill"
        aria-label="Conversar sobre um software sob medida no WhatsApp"
      >
        <span className="wa-pulse-dot" />
        <WhatsAppIcon size={18} />
        <span>Orçar Software</span>
      </a>

      <ProjectCaseModal
        project={activeProject}
        dialogRef={caseDialogRef}
        closeModal={closeCaseModal}
        openWhatsApp={openWhatsApp}
      />

      <div className="status-message" role="status" aria-live="polite">{notice}</div>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
