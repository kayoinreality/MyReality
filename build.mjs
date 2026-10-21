// Build: concatena os fontes JSX na ordem de execução e empacota com esbuild
// incluindo React, Lenis, GSAP (ScrollTrigger) e Motion (Framer Motion) num bundle único.
import * as esbuild from "esbuild";
import { readFile, mkdir, rm, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const DEV = process.argv.includes("--dev");
const OUT = resolve(ROOT, "dist/bundle.js");

const SOURCES = [
  "data.jsx",
  "conversion-data.jsx",
  "diagrams.jsx",
  "easter.jsx",
  "conversion-app.jsx"
];

const parts = [];
for (const file of SOURCES) {
  parts.push(`// ─── ${file} ───\n${await readFile(resolve(ROOT, file), "utf8")}`);
}

await rm(resolve(ROOT, "dist"), { recursive: true, force: true });
await mkdir(resolve(ROOT, "dist"), { recursive: true });

const result = await esbuild.build({
  stdin: {
    contents: parts.join("\n\n"),
    resolveDir: ROOT,
    sourcefile: "reality-bundle.jsx",
    loader: "jsx"
  },
  bundle: true,
  outfile: OUT,
  format: "iife",
  platform: "browser",
  target: ["es2020"],
  jsx: "automatic",
  minify: !DEV,
  sourcemap: false,
  legalComments: "none",
  define: {
    "process.env.NODE_ENV": JSON.stringify(DEV ? "development" : "production")
  }
});

for (const w of result.warnings) console.warn(`[aviso] ${w.text}`);

const info = await stat(OUT);
const kb = (info.size / 1024).toFixed(1);
console.log(`dist/bundle.js — ${kb} kB (React + Lenis + GSAP + Motion)${DEV ? " — dev" : ""}`);
