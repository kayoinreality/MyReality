// O universo da Reality: o horizonte do topo e as estrelas do fim da página.
import React, { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { animate } from "motion";
import { atPageEnd, reducedMotion } from "../scroll.js";

function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function makeStars(count, seed) {
  const rand = seeded(seed);
  return Array.from({ length: count }, () => ({
    x: rand(),
    y: rand(),
    r: rand() < 0.08 ? 1.1 + rand() * 0.9 : 0.35 + rand() * 0.6,
    a: 0.25 + rand() * 0.75,
    tw: rand() * Math.PI * 2,
    depth: 0.3 + rand() * 0.7
  }));
}

function fitCanvas(canvas) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, width, height };
}

// Céu estático do hero: desenhado uma vez (e de novo ao redimensionar).
function Sky() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const stars = makeStars(220, 7);
    const draw = () => {
      const { ctx, width, height } = fitCanvas(canvas);
      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        ctx.globalAlpha = s.a * (1 - s.y * 0.55);
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(s.x * width, s.y * height, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, []);
  return <canvas ref={ref} className="horizon__sky" />;
}

export function Horizon() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      // O único momento orquestrado da página: o horizonte nasce.
      gsap.from(".horizon__planet", { yPercent: 14, duration: 2.8, ease: "expo.out", delay: 0.1 });
      gsap.from(".horizon__glow", { opacity: 0, scaleX: 0.5, duration: 3, ease: "power3.out", delay: 0.3 });
      gsap.from(".horizon__sun", { opacity: 0, y: 60, duration: 3.2, ease: "power3.out", delay: 0.6 });
      // Ao rolar, o sol sobe um pouco mais e o planeta se afasta.
      const scroll = { trigger: ref.current, start: "top top", end: "bottom top", scrub: 0.6 };
      gsap.to(".horizon__planet", { yPercent: -6, ease: "none", scrollTrigger: scroll });
      gsap.to(".horizon__sun", { y: -90, scale: 1.25, ease: "none", scrollTrigger: scroll });
      gsap.to(".horizon__sky", { y: 80, ease: "none", scrollTrigger: scroll });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <div className="horizon" ref={ref} aria-hidden="true">
      <Sky />
      <div className="horizon__glow" />
      <div className="horizon__sun" />
      <div className="horizon__planet" />
    </div>
  );
}

// Fim da página: ao continuar rolando no limite, o conteúdo sobe com
// resistência e revela um campo de estrelas; ao soltar, volta com mola.
export function EndOfPage({ stageRef }) {
  const fieldRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    const field = fieldRef.current;
    const canvas = canvasRef.current;
    if (!stage || !field || !canvas) return;

    const stars = makeStars(260, 42);
    let max = Math.min(window.innerHeight * 0.45, 380);
    let raw = 0;
    let pull = 0;
    let travel = 0;
    let spring = null;
    let releaseTimer = 0;
    let frame = 0;
    let size = null;

    const toPull = (r) => max * (1 - Math.exp(-r / (max * 1.4)));
    const toRaw = (p) => -max * 1.4 * Math.log(1 - Math.min(p, max - 0.5) / max);

    const draw = (t) => {
      if (!size) size = fitCanvas(canvas);
      const { ctx, width, height } = size;
      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        const y = (((s.y * height - travel * s.depth * 0.6) % height) + height) % height;
        const twinkle = reducedMotion ? 1 : 0.65 + 0.35 * Math.sin(t / 700 + s.tw);
        ctx.globalAlpha = s.a * twinkle;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(s.x * width, y, s.r * (0.8 + s.depth * 0.5), 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (t) => {
      draw(t);
      frame = pull > 0.5 ? requestAnimationFrame(loop) : 0;
    };

    const setPull = (p) => {
      travel += Math.max(0, p - pull);
      pull = Math.max(0, p);
      const on = pull > 0.5;
      stage.style.transform = on ? `translate3d(0, ${-pull}px, 0)` : "";
      field.style.setProperty("--pull", pull.toFixed(1));
      field.style.setProperty("--reveal", Math.min(1, pull / (max * 0.7)).toFixed(3));
      field.classList.toggle("is-on", on);
      if (on && !frame) frame = requestAnimationFrame(loop);
    };

    const release = () => {
      raw = 0;
      spring?.stop();
      spring = animate(pull, 0, {
        type: "spring",
        stiffness: 160,
        damping: 19,
        onUpdate: (v) => setPull(v)
      });
    };

    const grab = () => {
      if (spring) {
        spring.stop();
        spring = null;
        raw = toRaw(pull);
      }
    };

    const onWheel = (e) => {
      const dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
      if (dy > 0 && atPageEnd()) {
        grab();
        raw += dy;
      } else if (dy < 0 && pull > 0) {
        grab();
        raw = Math.max(0, raw + dy * 2);
      } else {
        return;
      }
      setPull(toPull(raw));
      clearTimeout(releaseTimer);
      releaseTimer = setTimeout(release, 160);
    };

    let touchStart = null;
    const onTouchStart = (e) => {
      touchStart = atPageEnd() ? e.touches[0].clientY : null;
      if (touchStart !== null) grab();
    };
    const onTouchMove = (e) => {
      if (touchStart === null) return;
      const d = touchStart - e.touches[0].clientY;
      raw = Math.max(0, d * 1.3);
      setPull(toPull(raw));
    };
    const onTouchEnd = () => {
      if (touchStart !== null && pull > 0) release();
      touchStart = null;
    };
    const onResize = () => {
      max = Math.min(window.innerHeight * 0.45, 380);
      size = null;
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchEnd);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("resize", onResize);
      clearTimeout(releaseTimer);
      cancelAnimationFrame(frame);
      spring?.stop();
      stage.style.transform = "";
    };
  }, [stageRef]);

  return (
    <div className="endfield" ref={fieldRef} aria-hidden="true">
      <canvas ref={canvasRef} className="endfield__canvas" />
      <p className="endfield__msg">Fim da página. O resto a gente constrói junto.</p>
    </div>
  );
}
