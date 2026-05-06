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
window.useLiveClock = useLiveClock;
window.useSpotifyProgress = useSpotifyProgress;
