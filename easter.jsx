// Easter eggs & micro-interactions
function useKonami(callback) {
  React.useEffect(() => {
    const seq = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
    let pos = 0;
    const handler = (e) => {
      const want = seq[pos];
      if (e.key === want) {
        pos++;
        if (pos === seq.length) { callback(); pos = 0; }
      } else { pos = 0; }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [callback]);
}

// Custom cursor: subtle ring that grows on interactive elements
function CustomCursor() {
  const ringRef = React.useRef(null);
  const dotRef = React.useRef(null);
  React.useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let rx = window.innerWidth/2, ry = window.innerHeight/2;
    let dx = rx, dy = ry;
    const onMove = (e) => { dx = e.clientX; dy = e.clientY; };
    const onOver = (e) => {
      const t = e.target;
      const interactive = t.closest("a, button, [data-cursor='hover'], input, textarea");
      if (ringRef.current) ringRef.current.classList.toggle("is-hover", !!interactive);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    let raf;
    const tick = () => {
      rx += (dx - rx) * 0.18;
      ry += (dy - ry) * 0.18;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${rx-16}px, ${ry-16}px, 0)`;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${dx-2}px, ${dy-2}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseover", onOver); };
  }, []);
  return (
    <React.Fragment>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true"></div>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true"></div>
    </React.Fragment>
  );
}

// Reveal-on-scroll using IntersectionObserver
function useReveal() {
  React.useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-revealed");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -10% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

// Favicon animado: sabre de luz vermelho pixelado que acende e apaga.
// O Chrome não anima favicon SVG nem GIF — renderiza só o primeiro quadro —
// então cada quadro é desenhado num canvas e vira o href do <link rel=icon>.
// O SVG do index.html continua sendo o que aparece antes do JS rodar.
function useLightsaberFavicon() {
  React.useEffect(() => {
    const GRID = 16;   // grade lógica do pixel art
    const SCALE = 2;   // cada pixel lógico vira um bloco 2x2 no PNG final
    const BLADE_X0 = 6, BLADE_X1 = 15;

    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = GRID * SCALE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let link = document.querySelector("link[rel='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    const originalHref = link.getAttribute("href");

    const px = (x, y, color, alpha) => {
      ctx.globalAlpha = alpha === undefined ? 1 : alpha;
      ctx.fillStyle = color;
      ctx.fillRect(x * SCALE, y * SCALE, SCALE, SCALE);
    };

    // extend: 0 = apagado, 1 = lâmina inteira. flicker varia o tom do halo —
    // tudo opaco, porque alpha em 16px vira borrão e mata o efeito pixelado.
    const draw = (extend, flicker) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // fundo transparente

      // Cabo — 6 linhas contra as 4 da lâmina, para ler como punho e não como
      // continuação da barra. Sempre visível: sabre apagado ainda é um sabre.
      const hilt = ["#26262A", "#4A4A50", "#2E2E33", "#4A4A50", "#9A9AA2"];
      hilt.forEach((color, i) => {
        for (let y = 5; y <= 10; y++) px(1 + i, y, color);
      });
      px(3, 7, "#D93A24");  // botão de acionamento
      px(3, 8, "#D93A24");

      // Lâmina — cresce do emissor para a direita. Quatro linhas de vermelho
      // contra duas de núcleo: de longe o ícone precisa ler como vermelho.
      const glow = flicker > 0.5 ? "#FF2A16" : "#FF5233";
      const cells = Math.round(extend * (BLADE_X1 - BLADE_X0 + 1));
      for (let i = 0; i < cells; i++) {
        const x = BLADE_X0 + i;
        const fromTip = cells - 1 - i;
        px(x, 7, "#FFF1EC");
        px(x, 8, "#FFF1EC");
        if (fromTip >= 1) {          // penúltima célula perde o halo externo
          px(x, 6, glow);
          px(x, 9, glow);
        }
        if (fromTip >= 2) {          // ponta afinada em dois degraus
          px(x, 5, glow);
          px(x, 10, glow);
        }
      }
      link.setAttribute("href", canvas.toDataURL("image/png"));
    };

    // Sem movimento: desenha a lâmina acesa uma vez e não liga o loop.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      draw(1, 1);
      return () => { if (originalHref) link.setAttribute("href", originalHref); };
    }

    const IGNITE = 520, HOLD = 2000, RETRACT = 420, REST = 300;
    const CYCLE = IGNITE + HOLD + RETRACT + REST;
    const start = performance.now();

    const tick = () => {
      if (document.hidden) return; // aba em segundo plano não gasta CPU
      const elapsed = performance.now() - start;
      const t = elapsed % CYCLE;
      let extend;
      if (t < IGNITE) extend = t / IGNITE;
      else if (t < IGNITE + HOLD) extend = 1;
      else if (t < IGNITE + HOLD + RETRACT) extend = 1 - (t - IGNITE - HOLD) / RETRACT;
      else extend = 0;
      draw(extend, 0.5 + 0.5 * Math.sin(elapsed / 110)); // 0..1, cruza o meio
    };

    tick();
    const id = setInterval(tick, 80); // ~12 fps, suficiente para 32px
    return () => {
      clearInterval(id);
      if (originalHref) link.setAttribute("href", originalHref);
    };
  }, []);
}

// Live clock for the Now section
function useLiveClock() {
  const [now, setNow] = React.useState(new Date());
  React.useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

// Spotify progress: simulate ticking forward
function useSpotifyProgress() {
  const [p, setP] = React.useState(SPOTIFY_NOW.progress);
  React.useEffect(() => {
    const t = setInterval(() => {
      setP((prev) => {
        const next = prev + 0.0035;
        return next >= 1 ? 0 : next;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  return p;
}

window.useKonami = useKonami;
window.CustomCursor = CustomCursor;
window.useReveal = useReveal;
window.useLightsaberFavicon = useLightsaberFavicon;
window.useLiveClock = useLiveClock;
window.useSpotifyProgress = useSpotifyProgress;
