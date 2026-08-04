// Build: concatena os fontes JSX na ordem de execução e transpila numa passada só.
//
// Por que concatenar ANTES de transformar, em vez de transformar arquivo por
// arquivo: estes arquivos são scripts clássicos que dividem o escopo global —
// data.jsx declara `const PROJECTS` e app.jsx lê `PROJECTS` solto. Transformando
// cada um em separado, o minifyIdentifiers renomearia `PROJECTS` dentro de
// data.jsx sem saber que app.jsx aponta para ele, e o site quebraria em runtime.
// Numa passada única o esbuild enxerga o programa inteiro e renomeia coerente.
import * as esbuild from "esbuild";
import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const DEV = process.argv.includes("--dev");
const OUT = resolve(ROOT, "dist/bundle.js");

// A ordem importa: data e diagrams precisam existir antes de app renderizar.
// tweaks-panel é ferramenta de autoria — fica de fora do bundle de produção.
const SOURCES = [
  "data.jsx",
  "diagrams.jsx",
  "easter.jsx",
  ...(DEV ? ["tweaks-panel.jsx"] : []),
  "app.jsx"
];

const parts = [];
for (const file of SOURCES) {
  parts.push(`// ─── ${file} ───\n${await readFile(resolve(ROOT, file), "utf8")}`);
}

const { code, warnings } = await esbuild.transform(parts.join("\n\n"), {
  loader: "jsx",
  jsx: "transform",
  target: "es2020",
  minify: !DEV,
  sourcemap: false,
  legalComments: "none"
});

for (const w of warnings) console.warn(`[aviso] ${w.text}`);

// React entra no bundle em vez de vir de CDN. Um portfólio que sai do ar
// porque o unpkg piscou não sustenta o texto da página — e é um handshake
// TLS a menos antes do primeiro paint. Vem do node_modules, não versionado:
// quem audita o repo vê a versão no package.json, não 140 kB de blob.
const REACT_UMD = [
  "react/umd/react.production.min.js",
  "react-dom/umd/react-dom.production.min.js"
];
const vendor = [];
for (const rel of REACT_UMD) {
  vendor.push(await readFile(resolve(ROOT, "node_modules", rel), "utf8"));
}

// React já vem minificado: só concatena, não passa pelo esbuild de novo.
const out = vendor.join("\n") + "\n" + code;

await rm(resolve(ROOT, "dist"), { recursive: true, force: true });
await mkdir(resolve(ROOT, "dist"), { recursive: true });
await writeFile(OUT, out);

const kb = (n) => (Buffer.byteLength(n) / 1024).toFixed(1);
console.log(
  `dist/bundle.js — ${kb(out)} kB ` +
  `(react ${kb(vendor.join(""))} kB + app ${kb(code)} kB)${DEV ? " — dev" : ""}`
);
