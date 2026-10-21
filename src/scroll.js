// Rolagem suave (Lenis) sincronizada com o GSAP ScrollTrigger.
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const reducedMotion =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let lenis = null;

export function startScroll() {
  if (lenis || reducedMotion) return lenis;
  lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4) });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function getLenis() {
  return lenis;
}

export function scrollToTarget(target, { immediate = false, offset = -24 } = {}) {
  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (target !== 0 && !el) return;
  if (lenis) {
    // O limite do Lenis pode ainda ser o da página anterior.
    lenis.resize();
    lenis.scrollTo(target === 0 ? 0 : el, { immediate, offset: target === 0 ? 0 : offset });
  } else {
    const top = target === 0 ? 0 : el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: immediate || reducedMotion ? "auto" : "smooth" });
  }
}

export function scrollToY(y) {
  if (lenis) lenis.scrollTo(y);
  else window.scrollTo({ top: y, behavior: reducedMotion ? "auto" : "smooth" });
}

// Usado pelo efeito de fim de página: estamos encostados no limite inferior?
export function atPageEnd() {
  if (lenis) return lenis.limit - lenis.animatedScroll < 2;
  return window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
}

// Trava a rolagem enquanto um menu cobre a tela.
export function lockScroll(locked) {
  if (lenis) locked ? lenis.stop() : lenis.start();
  document.documentElement.classList.toggle("is-locked", locked);
}
