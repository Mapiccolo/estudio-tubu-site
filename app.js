// Site do Estúdio Tubu — lê o conteúdo de /content (editado pelo Pages CMS).
const CORES = {
  "Grafite": "#1D1B1E", "Off White": "#F7F7F7", "Cinza": "#C6C6C7", "Cinza frio": "#D0DACF",
  "Cinza quente": "#B2B3A5", "Verde musgo": "#705E30", "Vinho": "#8D2C19", "Vermelho": "#FF4842",
  "Laranja": "#FF7701", "Rosa": "#FF81C8", "Azul": "#81B5DD",
};
const app = document.getElementById("app");
const rel = (p) => (p || "").replace(/^\//, "");
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
let E = {}, P = [], A = {};

function cores(fundo, texto) {
  document.body.style.background = fundo || "";
  document.body.style.color = texto || "";
}


// Cabeçalho comum: projetos, sobre, contato
const menu = (atual) => `<nav class="menu" aria-label="Menu">${[["projetos", "projetos"], ["sobre", "sobre"], ["contato", "contato"]]
  .map(([h, t]) => `<a href="#${h}"${h === atual ? ' aria-current="page"' : ""}>${t}</a>`).join("")}</nav>`;

// Abertura: a página inteira com a arte da marca (verde musgo e laranja) e o logo horizontal "Estúdio tubù" em cinza
function abertura() {
  cores("#6D5F37");
  document.title = E.nome || "Estúdio Tubu";
  app.innerHTML = `<div class="abertura">
    <div class="palco-abertura">
      <img class="abertura-fundo" src="media/abertura-fundo.png" alt="">
      <h1 class="abertura-logo"><img src="media/logo-estudio-tubu-claro.png" alt="${esc(E.nome || "Estúdio Tubu")}"></h1>
    </div>
    ${menu("")}
  </div>`;
  scrollTo(0, 0);
}

// Projetos: arte da marca no fundo (triângulo e retângulo sobre a cor principal),
// lista dos projetos à esquerda e os thumbnails à direita.
// Ao passar o mouse num nome, as outras fotos apagam e fica só a dele.
function projetos() {
  // cores escolhidas no painel em "Aparência do site"; vazio = cinza quente, formas em cinza frio, texto grafite
  const fundo = CORES[A.projetos_fundo] || CORES["Cinza quente"];
  const formas = CORES[A.projetos_formas] || CORES["Cinza frio"];
  cores(fundo, CORES[A.projetos_texto] || CORES["Grafite"]);
  document.title = `Projetos — ${E.nome || "Estúdio Tubu"}`;
  app.innerHTML = `<div class="projetos">
    <svg class="projetos-arte" viewBox="0 0 2000 1125" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="2000" height="1125" fill="${fundo}"/>
      <polygon points="0,0 906,0 0,992" fill="${formas}"/>
      <rect x="1220" y="0" width="780" height="750" fill="${formas}"/>
    </svg>
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

// Sobre: arte azul e laranja (faixa à esquerda, círculo grande), texto à esquerda e foto da Marina à direita
function sobre() {
  cores("#8CB4DB", "#1D1B1E");
  document.title = `Sobre — ${E.nome || "Estúdio Tubu"}`;
  const texto = E.sobre ? "<p>" + esc(E.sobre).replace(/\n+/g, "</p><p>") + "</p>" : "<p>[texto sobre o estúdio]</p>";
  const foto = E.foto_sobre
    ? `<img src="${rel(E.foto_sobre)}" alt="${esc(E.responsavel || E.nome || "")}">`
    : `<span>foto da Marina</span>`;
  app.innerHTML = `<div class="sobre">
    <div class="sobre-arte" aria-hidden="true"><div class="palco-sobre"><i class="s-faixa"></i><i class="s-circulo"></i><i class="s-anel"></i></div></div>
    <header class="proj-topo"><a href="#" class="logo" aria-label="${esc(E.nome)}"></a>${menu("sobre")}</header>
    <div class="sobre-corpo"><div class="sobre-texto">${texto}</div><figure class="sobre-foto${E.foto_sobre ? "" : " vazia"}">${foto}</figure></div>
  </div>`;
  scrollTo(0, 0);
}
// Contato: arte da marca (faixas e arcos) no fundo e os contatos no lugar do logo central.
// Formas desenhadas a partir da arte enviada (2000 × 1126); cores escolhidas no painel em "Aparência do site".
const FORMAS_CONTATO = "M104,0 L104,600 L336,600 L336,0Z M952,0 L952,21 L953,22 L953,34 L954,35 L954,47 L955,48 L955,56 L956,57 L956,67 L957,68 L959,88 L960,89 L960,94 L961,95 L961,100 L962,101 L962,106 L964,112 L966,127 L968,132 L968,136 L970,141 L970,145 L971,146 L974,161 L976,165 L976,168 L982,186 L982,189 L992,219 L994,222 L998,235 L1004,247 L1006,254 L1010,261 L1014,272 L1034,311 L1036,313 L1046,332 L1052,340 L1058,351 L1061,354 L1062,357 L1067,363 L1068,366 L1094,401 L1109,419 L1147,458 L1171,478 L1193,494 L1213,507 L1236,520 L1280,541 L1334,561 L1393,577 L1434,585 L1492,593 L1536,597 L1574,599 L1574,600 L2000,600 L2000,428 L1655,427 L1617,425 L1578,421 L1521,411 L1476,399 L1453,391 L1424,379 L1392,363 L1353,338 L1324,315 L1303,295 L1283,273 L1262,246 L1248,225 L1243,215 L1234,201 L1216,163 L1216,160 L1212,153 L1212,150 L1206,136 L1203,127 L1203,124 L1200,117 L1200,114 L1198,111 L1196,99 L1192,87 L1192,82 L1190,77 L1188,61 L1186,56 L1186,50 L1185,49 L1184,36 L1183,35 L1183,28 L1182,27 L1182,16 L1181,15 L1180,0Z M1998,338 L1990,343 L1933,371 L1894,387 L1856,400 L1808,413 L1778,419 L1734,425 L1704,427 L1704,428 L2000,428 L2000,338Z M0,743 L0,962 L7,962 L7,961 L10,960 L32,954 L94,942 L146,936 L183,934 L832,933 L801,910 L769,889 L732,867 L693,846 L637,820 L602,806 L556,790 L484,770 L412,756 L349,748 L293,744 L256,743Z M1340,743 L1339,744 L1339,1126 L1566,1126 L1566,743Z M238,934 L273,936 L311,940 L370,950 L425,964 L484,984 L513,996 L551,1014 L581,1030 L618,1052 L651,1074 L678,1094 L710,1120 L715,1126 L1019,1126 L1016,1120 L994,1091 L966,1057 L948,1037 L890,980 L856,951 L834,934Z";
function contato() {
  const fundo = CORES[A.contato_fundo] || CORES["Verde musgo"];
  const formas = CORES[A.contato_formas] || CORES["Rosa"];
  cores(fundo, CORES[A.contato_texto] || CORES["Cinza"]);
  document.title = `Contato — ${E.nome || "Estúdio Tubu"}`;
  const ig = (E.instagram || "").replace(/^@/, "");
  const fone = (E.telefone || "").replace(/\D/g, "");
  app.innerHTML = `<div class="contato">
    <svg class="contato-arte" viewBox="0 0 2000 1126" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="2000" height="1126" fill="${fundo}"/><path fill="${formas}" stroke="${formas}" stroke-width="2" stroke-linejoin="round" d="${FORMAS_CONTATO}"/>
    </svg>
    <header class="proj-topo"><a href="#" class="logo" aria-label="${esc(E.nome)}"></a>${menu("contato")}</header>
    <div class="palco-contato"><ul class="contato-lista">
      ${E.responsavel ? `<li>${esc(E.responsavel)}</li>` : ""}
      ${E.email ? `<li><a href="mailto:${esc(E.email)}">${esc(E.email)}</a></li>` : ""}
      ${E.telefone ? `<li><a href="tel:+55${fone}">${esc(E.telefone)}</a></li>` : ""}
      ${ig ? `<li><a href="https://instagram.com/${esc(ig)}" target="_blank" rel="noopener">@${esc(ig)}</a></li>` : ""}
      ${E.cidade ? `<li>${esc(E.cidade)}</li>` : ""}
    </ul></div>
  </div>`;
  scrollTo(0, 0);
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

Promise.all([
  fetch("content/estudio.json").then((r) => r.json()),
  fetch("content/projetos.json").then((r) => r.json()),
  fetch("content/aparencia.json").then((r) => (r.ok ? r.json() : {})).catch(() => ({})),
])
  .then(([e, p, a]) => { E = e; P = p; A = a || {}; addEventListener("hashchange", rota); rota(); })
  .catch(() => { app.innerHTML = `<p style="padding:48px">Não foi possível carregar o conteúdo.</p>`; });
