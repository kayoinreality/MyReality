// Roteador mínimo com a History API. Cada rota também existe como HTML
// estático (gerado no build), então links diretos e o botão voltar funcionam.
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { scrollToTarget } from "./scroll.js";

const RouterContext = createContext(null);

function normalize(path) {
  if (!path) return "/";
  const clean = path.replace(/\/index\.html$/, "/").replace(/\/+$/, "");
  return clean || "/";
}

export function RouterProvider({ children }) {
  const [path, setPath] = useState(() => normalize(window.location.pathname));
  const pendingHash = useRef(window.location.hash || null);
  // Quando um caso é aberto pela home, a cena se expande antes da troca de página.
  const [expansion, setExpansion] = useState(null);

  useEffect(() => {
    const onPop = () => {
      pendingHash.current = window.location.hash || null;
      setPath(normalize(window.location.pathname));
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = useCallback((to, options = {}) => {
    const [rawPath, hash] = to.split("#");
    const next = normalize(rawPath || window.location.pathname);
    const current = normalize(window.location.pathname);
    if (next === current) {
      if (hash) {
        window.history.replaceState(null, "", `${next}#${hash}`);
        scrollToTarget(`#${hash}`);
      } else {
        scrollToTarget(0);
      }
      return;
    }
    pendingHash.current = hash ? `#${hash}` : null;
    window.history.pushState(null, "", hash ? `${next}#${hash}` : next);
    if (options.expand) setExpansion(options.expand);
    setPath(next);
  }, []);

  const value = useMemo(
    () => ({ path, navigate, pendingHash, expansion, clearExpansion: () => setExpansion(null) }),
    [path, navigate, expansion]
  );
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  return useContext(RouterContext);
}

export function Link({ to, children, onClick, ...rest }) {
  const { navigate } = useRouter();
  const external = /^(https?:|mailto:|tel:)/.test(to);
  if (external) {
    return (
      <a href={to} target={to.startsWith("http") ? "_blank" : undefined} rel="noreferrer" onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <a
      href={to}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        navigate(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
