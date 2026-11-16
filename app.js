// Site do Estúdio Tubu — lê o conteúdo de /content (editado pelo Pages CMS).
const CORES = {
  "Grafite": "#1D1B1E", "Off White": "#F7F7F7", "Cinza": "#C6C6C7", "Cinza frio": "#D0DACF",
  "Cinza quente": "#B2B3A5", "Verde musgo": "#705E30", "Vinho": "#8D2C19", "Vermelho": "#FF4842",
  "Laranja": "#FF7701", "Rosa": "#FF81C8", "Azul": "#81B5DD",
};
const app = document.getElementById("app");
const rel = (p) => (p || "").replace(/^\//, "");
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
let E = {}, P = [];

function cores(fundo, texto) {
  document.body.style.background = fundo || "";
  document.body.style.color = texto || "";
}


// Cabeçalho comum: projetos, sobre, contato
const menu = (atual) => `<nav class="menu" aria-label="Menu">${[["projetos", "projetos"], ["sobre", "sobre"], ["contato", "contato"]]
  .map(([h, t]) => `<a href="#${h}"${h === atual ? ' aria-current="page"' : ""}>${t}</a>`).join("")}</nav>`;

// Abertura: a página inteira com a arte da marca (verde musgo e laranja) e o logo vertical em cinza
function abertura() {
  cores("#6D5F37");
  document.title = E.nome || "Estúdio Tubu";
  app.innerHTML = `<div class="abertura">
    <div class="palco-abertura">
      <img class="abertura-fundo" src="media/abertura-fundo.png" alt="">
      <h1 class="abertura-logo"><img src="media/logo-claro.png" alt="${esc(E.nome || "Estúdio Tubu")}"></h1>
    </div>
    ${menu("")}
  </div>`;
  scrollTo(0, 0);
}

// Projetos: página verde com a lista dos projetos à esquerda e os thumbnails à direita.
// Ao passar o mouse num nome, as outras fotos apagam e fica só a dele.
function projetos() {
  cores("#6D5F37", "#E6E6E6");
  document.title = `Projetos — ${E.nome || "Estúdio Tubu"}`;
  app.innerHTML = `<div class="projetos">
    <header class="proj-topo"><a href="#" class="logo" aria-label="${esc(E.nome)}"></a>${menu("projetos")}</header>
    <div class="projetos-corpo">
      <ul class="lista-projetos">${P.map((p, i) => `<li><a href="#p-${p.slug}" data-i="${i}">${esc(p.titulo.toLowerCase())}</a></li>`).join("")}</ul>
      <div class="thumbs">${P.map((p, i) => {
        const foto = p.capa || (p.fotos || [])[0];
        return `<a href="#p-${p.slug}" data-i="${i}" aria-label="${esc(p.titulo)}">${foto ? `<img src="${rel(foto)}" alt="" loading="lazy">` : ""}</a>`;
      }).join("")}</div>
    </div>
  </div>`;
  const thumbs = app.querySelector(".thumbs");
  app.querySelectorAll(".lista-projetos a, .thumbs a").forEach((a) => {
    const t = thumbs.children[a.dataset.i];
    const on = () => { thumbs.classList.add("foco"); t.classList.add("ativo"); };
    const off = () => { thumbs.classList.remove("foco"); t.classList.remove("ativo"); };
    a.addEventListener("mouseenter", on); a.addEventListener("mouseleave", off);
    a.addEventListener("focus", on); a.addEventListener("blur", off);
  });
  scrollTo(0, 0);
}

// Sobre e Contato: páginas simples, fundo vinho, texto claro
function pagina(id, titulo, corpo) {
  cores("#823321", "#C6C6C7");
  document.title = `${titulo} — ${E.nome || "Estúdio Tubu"}`;
  app.innerHTML = `<div class="simples">
    <header class="proj-topo"><a href="#" class="logo" aria-label="${esc(E.nome)}"></a>${menu(id)}</header>
    <main class="simples-corpo">${corpo}</main>
  </div>`;
  scrollTo(0, 0);
}
function sobre() {
  pagina("sobre", "Sobre", `<div class="sobre-texto">${E.sobre ? esc(E.sobre).replace(/\n+/g, "</p><p>").replace(/^/, "<p>") + "</p>" : "<p>[texto sobre o estúdio]</p>"}</div>`);
}
function contato() {
  const ig = (E.instagram || "").replace(/^@/, "");
  pagina("contato", "Contato", `<dl class="contato-lista">
    ${E.responsavel ? `<dt>Arquiteta</dt><dd>${esc(E.responsavel)}</dd>` : ""}
    ${E.email ? `<dt>E-mail</dt><dd><a href="mailto:${esc(E.email)}">${esc(E.email)}</a></dd>` : ""}
    ${E.telefone ? `<dt>Telefone</dt><dd>${esc(E.telefone)}</dd>` : ""}
    ${ig ? `<dt>Instagram</dt><dd><a href="https://instagram.com/${esc(ig)}">@${esc(ig)}</a></dd>` : ""}
    ${E.cidade ? `<dt>Cidade</dt><dd>${esc(E.cidade)}</dd>` : ""}
  </dl>`);
}

function projeto(slug) {
  const i = P.findIndex((p) => p.slug === slug);
  if (i < 0) return projetos();
  const p = P[i], prox = P[(i + 1) % P.length];
  cores(CORES[p.cor_fundo], CORES[p.cor_texto]);
  document.title = `${p.titulo} — ${E.nome || "Estúdio Tubu"}`;
  const ficha = [["Localização", p.localizacao], ["Ano", p.ano], ["Área", p.area], ["Colaboradores", p.colaboradores],
    ["Fotografia", p.fotografia], ["Construção", p.construcao]].filter(([, v]) => v);
  const fotos = p.fotos || [];
  app.innerHTML = `<div class="projeto">
    <header class="proj-topo"><a href="#" class="logo" aria-label="${esc(E.nome)}"></a>${menu("projetos")}</header>
    <div class="fotos">${fotos.length
      ? fotos.map((f) => `<img loading="lazy" src="${rel(f)}" alt="${esc(p.titulo)}">`).join("")
      : `<div class="vazio">fotos ainda não adicionadas</div>`}</div>
    <section class="fim">
      <div><h1>${esc(p.titulo)}</h1><p class="sub">${[p.localizacao, p.ano].filter(Boolean).map(esc).join(" · ")}</p></div>
      <div>
        ${p.texto ? `<p class="texto">${esc(p.texto)}</p>` : ""}
        ${ficha.length ? `<dl class="ficha">${ficha.map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join("")}</dl>` : ""}
      </div>
    </section>
    <nav class="proj-rodape"><a href="#projetos">← Todos os projetos</a>${P.length > 1 ? `<a href="#p-${prox.slug}">Próximo: ${esc(prox.titulo)} →</a>` : ""}</nav>
  </div>`;
  scrollTo(0, 0);
}

function rota() {
  const h = location.hash.slice(1);
  if (h.startsWith("p-")) projeto(h.slice(2));
  else if (h === "projetos") projetos();
  else if (h === "sobre") sobre();
  else if (h === "contato") contato();
  else abertura();
}

Promise.all([fetch("content/estudio.json").then((r) => r.json()), fetch("content/projetos.json").then((r) => r.json())])
  .then(([e, p]) => { E = e; P = p; addEventListener("hashchange", rota); rota(); })
  .catch(() => { app.innerHTML = `<p style="padding:48px">Não foi possível carregar o conteúdo.</p>`; });
