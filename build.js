// Junta todos os projetos em content/projetos.json (roda sozinho na Vercel a cada alteração).
// Não precisa de nenhuma dependência: só Node.
const fs = require("fs");
const path = require("path");

const slug = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const dir = path.join(__dirname, "content", "projetos");
const projetos = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith(".json"))
  .map((f) => ({ slug: slug(f.replace(/\.json$/, "")), ...JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")) }))
  .filter((p) => p.publicado !== false)
  .sort((a, b) => (a.ordem ?? Infinity) - (b.ordem ?? Infinity) || String(b.ano || "").localeCompare(String(a.ano || "")));

fs.writeFileSync(path.join(__dirname, "content", "projetos.json"), JSON.stringify(projetos, null, 2));
console.log(`projetos.json: ${projetos.length} projetos`);
