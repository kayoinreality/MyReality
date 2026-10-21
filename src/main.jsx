// REALITY · Software sob medida
// React 18 + Lenis (rolagem suave) + GSAP ScrollTrigger + Motion.
import "./styles.css";
import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "motion/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RouterProvider, useRouter } from "./router.jsx";
import { CASES, POSTS, ROUTES } from "./data.js";
import { getLenis, reducedMotion, scrollToTarget, startScroll } from "./scroll.js";
import { Footer, Header } from "./components/chrome.jsx";
import { EndOfPage } from "./components/space.jsx";
import Home from "./pages/home.jsx";
import CasePage from "./pages/case.jsx";
import { About, Blog, Careers, NotFound, Post, Status } from "./pages/institutional.jsx";

function resolve(path) {
  if (path === "/") return <Home />;
  if (path === "/sobre") return <About />;
  if (path === "/carreiras") return <Careers />;
  if (path === "/blog") return <Blog />;
  if (path === "/status") return <Status />;
  const caseMatch = path.match(/^\/casos\/([\w-]+)$/);
  if (caseMatch && CASES.some((c) => c.slug === caseMatch[1])) return <CasePage slug={caseMatch[1]} />;
  const postMatch = path.match(/^\/blog\/([\w-]+)$/);
  if (postMatch && POSTS.some((p) => p.slug === postMatch[1])) return <Post slug={postMatch[1]} />;
  return <NotFound />;
}

// A cena do caso cresce da janela da home até ocupar a tela;
// a página do caso começa exatamente com esse fundo.
function Expansion() {
  const { expansion, clearExpansion } = useRouter();
  return (
    <AnimatePresence>
      {expansion && (
        <motion.div
          key="expansion"
          className={`expansion scene-bg--${expansion.scene}`}
          initial={{ ...expansion.rect, borderRadius: 28 }}
          animate={{ top: 0, left: 0, width: window.innerWidth, height: window.innerHeight, borderRadius: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={() => setTimeout(clearExpansion, 200)}
        />
      )}
    </AnimatePresence>
  );
}

// Montado junto com cada página nova (depois da saída da anterior): só então
// os elementos existem para recalcular os gatilhos e rolar até a âncora.
function PageReady({ path }) {
  const { pendingHash } = useRouter();
  useEffect(() => {
    const meta = ROUTES.find((r) => r.path === path);
    document.title = meta ? meta.title : "Página não encontrada — Reality";
    const t = setTimeout(() => {
      getLenis()?.resize();
      ScrollTrigger.refresh();
      if (pendingHash.current) {
        scrollToTarget(pendingHash.current, { offset: -16 });
        pendingHash.current = null;
      }
    }, 150);
    return () => clearTimeout(t);
  }, [path, pendingHash]);
  return null;
}

function App() {
  const { path } = useRouter();
  const stageRef = useRef(null);

  useEffect(() => {
    startScroll();
  }, []);

  return (
    <>
      <a className="skip" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <div className="stage" ref={stageRef}>
        <AnimatePresence mode="wait" initial={false} onExitComplete={() => scrollToTarget(0, { immediate: true })}>
          <motion.main
            id="conteudo"
            key={path}
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.45 } }}
            exit={{ opacity: 0, transition: { duration: 0.22 } }}
          >
            {resolve(path)}
            <PageReady path={path} />
          </motion.main>
        </AnimatePresence>
        <Footer />
      </div>
      <EndOfPage stageRef={stageRef} />
      <Expansion />
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <RouterProvider>
    <App />
  </RouterProvider>
);
