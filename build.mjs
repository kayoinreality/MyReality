// Build do site da Reality.
//   node build.mjs           → _site/ minificado, pronto para o GitHub Pages
//   node build.mjs --dev     → _site/ sem minificar, recompila ao salvar e serve em http://localhost:5501
//
// Gera um index.html por rota (com título e descrição próprios) para que links
// diretos funcionem no Pages, e um 404.html que cai no mesmo app.
//
// O Pages serve tudo com max-age=600 e não deixa mudar o cabeçalho. Para um deploy
// aparecer na hora, o HTML pede o bundle com ?v=<hash do conteúdo>: cada versão é
// uma URL nova para o navegador. O nome do arquivo não muda, então um HTML antigo
// ainda em cache continua achando o bundle em vez de pedir um arquivo apagado.
import * as esbuild from "esbuild";
import { createHash } from "node:crypto";
import { cp, mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { ROUTES } from "./src/data.js";

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(ROOT, "_site");
const DEV = process.argv.includes("--dev");
const ORIGIN = "https://myreality.tech";

const escape = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

async function writePages(version) {
  let template = await readFile(resolve(ROOT, "index.html"), "utf8");
  if (version) {
    template = template
      .replace('"/static/app.css"', `"/static/app.css?v=${version}"`)
      .replace('"/static/app.js"', `"/static/app.js?v=${version}"`);
  }
  const page = (title, description, canonical, robots = "") =>
    template
      .replaceAll("%TITLE%", escape(title))
      .replaceAll("%DESCRIPTION%", escape(description))
      .replaceAll("%CANONICAL%", canonical)
      .replace("%ROBOTS%", robots);

  for (const r of ROUTES) {
    const dir = join(OUT, r.path);
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, "index.html"), page(r.title, r.description, `${ORIGIN}${r.path === "/" ? "/" : r.path}`));
  }
  await writeFile(
    join(OUT, "404.html"),
    page("Página não encontrada — Reality", "Essa página não existe.", `${ORIGIN}/`, '<meta name="robots" content="noindex"/>')
  );
}

async function bundleVersion() {
  const hash = createHash("sha256");
  for (const f of ["app.js", "app.css"]) hash.update(await readFile(join(OUT, "static", f)));
  return hash.digest("hex").slice(0, 10);
}

async function copyStatic() {
  await cp(resolve(ROOT, "assets"), join(OUT, "assets"), { recursive: true });
  for (const f of ["CNAME", ".nojekyll"]) await cp(resolve(ROOT, f), join(OUT, f));
}

const options = {
  entryPoints: { app: resolve(ROOT, "src/main.jsx") },
  outdir: join(OUT, "static"),
  bundle: true,
  format: "iife",
  platform: "browser",
  target: ["es2020", "safari15"],
  jsx: "automatic",
  minify: !DEV,
  sourcemap: DEV,
  legalComments: "none",
  external: ["/assets/*"],
  logLevel: "warning",
  define: { "process.env.NODE_ENV": JSON.stringify(DEV ? "development" : "production") }
};

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });
await copyStatic();

if (!DEV) {
  await esbuild.build(options);
  await writePages(await bundleVersion());
  const kb = async (f) => ((await stat(join(OUT, "static", f))).size / 1024).toFixed(1);
  console.log(`_site pronto — app.js ${await kb("app.js")} kB, app.css ${await kb("app.css")} kB, ${ROUTES.length} rotas`);
} else {
  await writePages();
  const ctx = await esbuild.context(options);
  await ctx.watch();

  const types = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css",
    ".js": "application/javascript",
    ".map": "application/json",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
    ".png": "image/png",
    ".woff2": "font/woff2"
  };
  createServer(async (req, res) => {
    const url = decodeURIComponent(req.url.split("?")[0]);
    const candidates = extname(url) ? [url] : [join(url, "index.html"), "/404.html"];
    for (const c of candidates) {
      try {
        const body = await readFile(join(OUT, c));
        res.writeHead(c === "/404.html" ? 404 : 200, { "Content-Type": types[extname(c)] || "application/octet-stream" });
        return res.end(body);
      } catch {}
    }
    res.writeHead(404);
    res.end("Não encontrado");
  }).listen(5501, () => console.log("Reality em http://localhost:5501 (recompila ao salvar)"));
}
