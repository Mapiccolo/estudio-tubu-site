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

// Abertura: a página inteira com a arte da marca (fundo e formas) e o logo vertical "Estúdio tubù".
// Formas desenhadas a partir da arte original (2282 × 1282); cores escolhidas no painel em "Aparência do site".
const FORMAS_ABERTURA = "M60,0 C60,5 60,20 60,30 C60,40 60,50.2 60,60 C60,69.8 60,79.2 60,89 C60,98.8 60,109 60,119 C60,129 60,139 60,149 C60,159 60,169 60,179 C60,189 60,199.2 60,209 C60,218.8 60,228.2 60,238 C60,247.8 60,258 60,268 C60,278 60,288 60,298 C60,308 60,318 60,328 C60,338 60,348.2 60,358 C60,367.8 60,377.2 60,387 C60,396.8 60,407 60,417 C60,427 60,437 60,447 C60,457 60,467 60,477 C60,487 60,497.2 60,507 C60,516.8 60,526.2 60,536 C60,545.8 60,556 60,566 C60,576 60,586 60,596 C60,606 60,616 60,626 C60,636 60,646 60,656 C60,666 60,676.2 60,686 C60,695.8 60,705.2 60,715 C60,724.8 60,735 60,745 C60,755 60,765 60,775 C60,785 59.8,795.2 60.2,804.8 C60.5,814.5 61.2,824 61.9,833.1 C62.6,842.3 63.3,850.9 64.3,859.7 C65.3,868.6 66.4,877.3 67.8,886.2 C69.1,895.1 70.6,904 72.3,913.1 C74,922.2 75.9,931.7 78,940.9 C80.1,950 82.5,959.1 84.9,968.1 C87.3,977.1 89.7,985.9 92.6,994.9 C95.5,1003.9 98.8,1013 102.1,1022 C105.5,1030.9 108.9,1039.8 112.6,1048.7 C116.4,1057.6 120.4,1066.5 124.7,1075.3 C128.9,1084.2 133.4,1093.4 138,1102 C142.6,1110.6 147.3,1118.4 152.2,1126.8 C157.2,1135.2 162.1,1143.9 167.6,1152.1 C173,1160.4 178.9,1168.4 184.8,1176.4 C190.7,1184.4 196.7,1192.6 202.8,1200.4 C208.9,1208.2 215.2,1216.1 221.6,1223.4 C228,1230.6 234.3,1237.3 241.1,1244.1 C247.9,1250.8 255.3,1257.4 262.4,1263.8 C269.6,1270.1 280.4,1279 284,1282 L1595,1282 L1595,1227 C1590,1227 1575,1227 1565,1227 C1555,1227 1545.1,1226.9 1535.1,1226.9 C1525.1,1226.9 1515.1,1226.9 1505.1,1226.9 C1495.1,1226.9 1485.1,1226.9 1475.1,1226.9 C1465.2,1226.8 1455.2,1226.8 1445.2,1226.8 C1435.2,1226.8 1425.2,1226.8 1415.2,1226.8 C1405.2,1226.8 1395.2,1226.8 1385.2,1226.8 C1375.3,1226.7 1365.3,1226.7 1355.3,1226.7 C1345.3,1226.7 1335.3,1226.7 1325.3,1226.7 C1315.3,1226.7 1305.3,1226.7 1295.4,1226.6 C1285.4,1226.6 1275.4,1226.6 1265.4,1226.6 C1255.4,1226.6 1245.4,1226.6 1235.4,1226.6 C1225.4,1226.6 1215.3,1226.5 1205.5,1226.5 C1195.6,1226.5 1186.3,1226.5 1176.5,1226.5 C1166.7,1226.5 1156.5,1226.5 1146.5,1226.5 C1136.5,1226.5 1126.6,1226.4 1116.6,1226.4 C1106.6,1226.4 1096.6,1226.4 1086.6,1226.4 C1076.6,1226.4 1066.6,1226.4 1056.6,1226.4 C1046.7,1226.3 1036.7,1226.3 1026.7,1226.3 C1016.7,1226.3 1006.7,1226.3 996.7,1226.3 C986.7,1226.3 976.7,1226.3 966.7,1226.3 C956.8,1226.2 946.8,1226.2 936.8,1226.2 C926.8,1226.2 916.8,1226.2 906.8,1226.2 C896.8,1226.2 886.8,1226.2 876.9,1226.1 C866.9,1226.1 856.9,1226.1 846.9,1226.1 C836.9,1226.1 826.9,1226.1 816.9,1226.1 C806.9,1226.1 796.9,1226.1 787,1226 C777,1226 766.9,1226.2 757,1225.9 C747.1,1225.6 737.4,1224.9 727.6,1224.2 C717.8,1223.5 708.1,1222.6 698.3,1221.5 C688.5,1220.4 678.8,1219.2 669,1217.7 C659.3,1216.1 649.4,1214.3 639.7,1212.2 C630.1,1210.2 620.5,1208 611,1205.5 C601.5,1203 592.2,1200.4 582.9,1197.4 C573.6,1194.4 564.4,1191.1 555.2,1187.5 C546,1183.9 536.8,1180 527.8,1175.9 C518.8,1171.7 509.9,1167.2 501.3,1162.4 C492.7,1157.6 484.4,1152.7 476.3,1147.3 C468.1,1142 460,1136.1 452.3,1130.3 C444.7,1124.4 437.7,1118.6 430.6,1112.1 C423.5,1105.7 416.4,1098.7 409.6,1091.6 C402.9,1084.5 396.5,1076.9 390.1,1069.4 C383.8,1061.8 377.4,1054.1 371.6,1046.1 C365.8,1038.1 360.4,1029.9 355.3,1021.6 C350.2,1013.2 345.3,1004.6 340.9,996 C336.5,987.4 332.6,978.9 328.7,969.9 C324.8,961 320.9,951.7 317.5,942.4 C314.1,933.1 311.1,923.3 308.4,914 C305.7,904.7 303.4,895.3 301.4,886.4 C299.4,877.4 297.6,868.8 296.1,860.1 C294.6,851.3 293.3,842.7 292.2,833.8 C291.1,824.9 290.1,815.9 289.4,806.6 C288.7,797.3 288.3,787.7 287.9,778.1 C287.5,768.5 287.2,758.8 287,749 C286.8,739.2 287,729 287,719 C287,709 287,699 287,689 C287,679 287,669 287,659 C287,649 287,639 287,629 C287,619 287,609 287,599 C287,589 287,579 287,569 C287,559 287,549 287,539 C287,529 287,519 287,509 C287,499 287,489 287,479 C287,469 287,459 287,449 C287,439 287,428.8 287,419 C287,409.2 287,399.8 287,390 C287,380.2 287,370 287,360 C287,350 287,340 287,330 C287,320 287,310 287,300 C287,290 287,280 287,270 C287,260 287,250 287,240 C287,230 287,220 287,210 C287,200 287,190 287,180 C287,170 287,160 287,150 C287,140 287,130 287,120 C287,110 287,100 287,90 C287,80 287,70 287,60 C287,50 287,40 287,30 C287,20 287,5 287,0 L60,0Z M1367,0 C1367,5 1367,20 1367,30 C1367,40 1367,50 1367,60 C1367,70 1367,79.8 1367,90 C1367,100.2 1367,110.8 1367,121 C1367,131.2 1367,141 1367,151 C1367,161 1367,171 1367,181 C1367,191 1367,201 1367,211 C1367,221 1367,231 1367,241 C1367,251 1367,261 1367,271 C1367,281 1367,291 1367,301 C1367,311 1367,320.8 1367,331 C1367,341.2 1367,351.8 1367,362 C1367,372.2 1367,382 1367,392 C1367,402 1367,412 1367,422 C1367,432 1367,442 1367,452 C1367,462 1367,472 1367,482 C1367,492 1367,502 1367,512 C1367,522 1367,531.8 1367,542 C1367,552.2 1367,562.8 1367,573 C1367,583.2 1367,593 1367,603 C1367,613 1367,623 1367,633 C1367,643 1367.3,653.3 1367,663 C1366.7,672.7 1366.2,682.2 1365.4,691.4 C1364.7,700.7 1363.7,709.7 1362.6,718.6 C1361.6,727.6 1360.5,736 1359.2,745.2 C1357.9,754.5 1356.4,764.6 1354.7,774.1 C1353.1,783.6 1351.2,793.1 1349.3,802.2 C1347.4,811.3 1345.4,819.9 1343.2,828.7 C1341,837.5 1338.6,846.1 1335.9,855.1 C1333.3,864.2 1330.5,874.2 1327.5,883.2 C1324.5,892.1 1321.4,900.1 1317.9,908.8 C1314.5,917.6 1310.8,926.6 1306.7,935.4 C1302.6,944.2 1298,952.8 1293.3,961.7 C1288.5,970.5 1283.5,979.8 1278.2,988.3 C1272.9,996.8 1267.5,1004.6 1261.7,1012.4 C1255.9,1020.3 1249.7,1028.2 1243.2,1035.6 C1236.7,1043 1229.8,1050.2 1222.8,1057 C1215.8,1063.8 1208.7,1070.3 1201.1,1076.5 C1193.4,1082.8 1185.3,1088.7 1177.1,1094.4 C1168.9,1100.1 1160.6,1105.4 1152,1110.7 C1143.5,1116 1134.3,1121.2 1125.7,1126.3 C1117,1131.3 1108.8,1136.3 1100.1,1141 C1091.4,1145.8 1082.6,1150.2 1073.7,1154.7 C1064.8,1159.1 1055.8,1163.5 1046.8,1167.6 C1037.7,1171.7 1028.5,1175.7 1019.4,1179.4 C1010.2,1183.1 1001.2,1186.6 992,1189.9 C982.7,1193.2 973.4,1196.2 964.1,1199.1 C954.7,1201.9 945.5,1204.6 935.8,1207.1 C926.2,1209.7 916,1212.2 906.2,1214.3 C896.4,1216.4 886.7,1218.2 877,1219.7 C867.3,1221.3 857.6,1222.5 847.9,1223.6 C838.2,1224.6 823.8,1225.6 819,1226 L1595,1227 L1595,0 L1367,0Z M1765,0 L1765,1282 L2282,1282 L2282,1041 C2278.2,1038 2266.8,1029.1 2259.4,1022.7 C2252,1016.3 2244.7,1009.4 2237.5,1002.5 C2230.4,995.6 2223.2,988.5 2216.4,981.3 C2209.5,974.2 2203,966.8 2196.4,959.4 C2189.9,951.9 2183.4,944.6 2177.1,936.9 C2170.8,929.2 2164.7,921.3 2158.9,913.3 C2153,905.3 2147.2,896.9 2141.8,888.9 C2136.4,881 2131.4,873.6 2126.4,865.5 C2121.3,857.5 2116.2,849.2 2111.3,840.8 C2106.3,832.4 2101.4,824.1 2096.7,815.3 C2091.9,806.5 2087.4,797.1 2083,788.1 C2078.6,779.1 2074.2,770.3 2070.3,761.5 C2066.3,752.6 2062.8,743.7 2059.4,734.9 C2055.9,726.1 2052.7,717.5 2049.5,708.4 C2046.4,699.4 2043.4,689.9 2040.5,680.5 C2037.5,671.2 2034.5,661.6 2031.9,652.3 C2029.3,642.9 2027,633.3 2024.9,624.4 C2022.9,615.4 2021.2,607.1 2019.5,598.4 C2017.8,589.7 2016.2,580.9 2014.8,572 C2013.3,563.1 2012,554.1 2010.8,545.2 C2009.7,536.2 2008.8,527.2 2007.9,518.1 C2007.1,508.9 2006.3,499.7 2005.7,490.3 C2005.2,480.8 2004.8,471.1 2004.6,461.5 C2004.4,451.8 2004.4,442.2 2004.4,432.4 C2004.4,422.6 2004.5,412.5 2004.8,402.8 C2005.2,393.2 2005.8,383.8 2006.5,374.5 C2007.2,365.2 2008.1,356.2 2009,347 C2010,337.8 2011.1,328.6 2012.4,319.4 C2013.7,310.2 2015.2,300.9 2016.8,291.9 C2018.4,282.9 2020.2,274.3 2022.2,265.3 C2024.1,256.2 2026.3,246.9 2028.7,237.6 C2031.1,228.2 2033.8,218.7 2036.5,209.3 C2039.2,199.9 2041.9,190.2 2044.9,181.2 C2047.9,172.2 2051.2,164.2 2054.5,155.5 C2057.9,146.8 2061.1,137.9 2064.8,129 C2068.6,120.1 2072.9,110.9 2077,102 C2081.2,93.1 2085.3,84.2 2089.7,75.5 C2094.2,66.8 2098.9,58.3 2103.7,49.8 C2108.4,41.4 2113.2,33 2118.3,24.7 C2123.3,16.4 2131.4,4.1 2134,0 L1765,0Z";
function abertura() {
  const fundo = CORES[A.home_fundo] || "#6D5F37";
  const formas = CORES[A.home_formas] || "#EE7F31";
  const logo = CORES[A.home_logo] || "#C6C6C7";
  cores(fundo, logo);
  document.title = E.nome || "Estúdio Tubu";
  app.innerHTML = `<div class="abertura">
    <div class="palco-abertura">
      <svg class="abertura-fundo" viewBox="0 0 2282 1282" preserveAspectRatio="none" aria-hidden="true">
        <rect width="2282" height="1282" fill="${fundo}"/><path fill="${formas}" stroke="${formas}" stroke-width="2" stroke-linejoin="round" d="${FORMAS_ABERTURA}"/>
      </svg>
      <h1 class="abertura-logo" role="img" aria-label="${esc(E.nome || "Estúdio Tubu")}"></h1>
    </div>
    ${menu("")}
  </div>`;
  scrollTo(0, 0);
}

// Projetos: arte da marca no fundo (triângulo e retângulo sobre a cor principal),
// lista dos projetos à esquerda e os thumbnails à direita.
// Ao passar o mouse numa foto, o nome do projeto na lista fica sublinhado.
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
    <div class="rolagem"><div class="projetos-corpo">
      <ul class="lista-projetos">${P.map((p, i) => `<li><a href="#p-${p.slug}" data-i="${i}">${esc(p.titulo.toLowerCase())}</a></li>`).join("")}</ul>
      <div class="thumbs">${P.map((p, i) => {
        const foto = p.capa || (listaFotos(p)[0] || {}).imagem;
        return `<a href="#p-${p.slug}" data-i="${i}" aria-label="${esc(p.titulo)}">${foto ? `<img src="${rel(foto)}" alt="" loading="lazy">` : ""}</a>`;
      }).join("")}</div>
    </div></div>
  </div>`;
  // ao passar o mouse numa foto, o nome do projeto na lista fica sublinhado
  const nomes = app.querySelectorAll(".lista-projetos a");
  app.querySelectorAll(".thumbs a").forEach((a) => {
    const t = nomes[a.dataset.i];
    const on = () => t.classList.add("ativo");
    const off = () => t.classList.remove("ativo");
    a.addEventListener("mouseenter", on); a.addEventListener("mouseleave", off);
    a.addEventListener("focus", on); a.addEventListener("blur", off);
  });
  scrollTo(0, 0);
}

// Sobre: arte azul e laranja (cores trocáveis no painel em "Aparência do site") (faixa à esquerda, círculo grande), texto à esquerda e foto da Marina à direita
function sobre() {
  const fundo = CORES[A.sobre_fundo] || "#8CB4DB";
  const formas = CORES[A.sobre_formas] || "#EE7F31";
  cores(fundo, CORES[A.sobre_texto] || CORES["Grafite"]);
  document.title = `Sobre — ${E.nome || "Estúdio Tubu"}`;
  const texto = E.sobre ? "<p>" + esc(E.sobre).replace(/\n+/g, "</p><p>") + "</p>" : "<p>[texto sobre o estúdio]</p>";
  const foto = E.foto_sobre
    ? `<img src="${rel(E.foto_sobre)}" alt="${esc(E.responsavel || E.nome || "")}">`
    : `<span>foto da Marina</span>`;
  app.innerHTML = `<div class="sobre" style="--fundo-sobre:${fundo};--laranja:${formas}">
    <div class="sobre-arte" aria-hidden="true"><div class="palco-sobre"><i class="s-faixa"></i><i class="s-circulo"></i><i class="s-anel"></i></div></div>
    <header class="proj-topo"><a href="#" class="logo" aria-label="${esc(E.nome)}"></a>${menu("sobre")}</header>
    <div class="sobre-corpo"><div class="sobre-texto">${texto}</div><figure class="sobre-foto${E.foto_sobre ? "" : " vazia"}">${foto}</figure></div>
  </div>`;
  // celular: centra o círculo da arte na foto e acompanha a rolagem
  const fig = app.querySelector(".sobre-foto"), raiz = app.querySelector(".sobre");
  const centrar = () => {
    if (!fig || !raiz || !raiz.isConnected) return;
    const r = fig.getBoundingClientRect();
    raiz.style.setProperty("--cx", `${r.left + r.width / 2}px`);
    raiz.style.setProperty("--cy", `${r.top + r.height / 2}px`);
    raiz.style.setProperty("--diam", `${r.width * 1.5}px`);
  };
  centrar();
  onresize = centrar;
  app.querySelector(".sobre-corpo").addEventListener("scroll", centrar, { passive: true });
  scrollTo(0, 0);
}
// Contato: arte da marca (faixas e arcos) no fundo e os contatos no lugar do logo central.
// Formas desenhadas a partir da arte enviada (2000 × 1126); cores escolhidas no painel em "Aparência do site".
const FORMAS_CONTATO = "M104,0 L104,600 L336,600 L336,0 L104,0Z M952,0 C952.2,4.8 952.5,19.7 953.1,28.9 C953.6,38.2 954.5,46.6 955.4,55.6 C956.3,64.6 957.3,74.1 958.6,83.1 C959.9,92.1 961.5,100.5 963.2,109.4 C964.8,118.4 966.7,127.8 968.6,136.7 C970.5,145.5 972.4,153.6 974.8,162.6 C977.2,171.6 980,181.5 982.9,190.8 C985.8,200.2 988.9,209.6 992.3,218.7 C995.6,227.8 999.4,236.7 1002.9,245.3 C1006.4,253.9 1009.5,261.5 1013.5,270.1 C1017.5,278.7 1022.1,288.1 1026.7,296.8 C1031.3,305.5 1036.2,314.2 1041,322.5 C1045.8,330.8 1050.8,338.8 1055.7,346.6 C1060.6,354.4 1065.2,361.5 1070.6,369.2 C1076,377 1082.1,385.3 1088.1,393 C1094.1,400.8 1100.2,408.7 1106.6,416 C1112.9,423.2 1119.5,429.8 1126.3,436.7 C1133,443.7 1139.9,451.1 1147.1,457.8 C1154.4,464.5 1161.9,470.6 1169.6,476.7 C1177.2,482.7 1185.2,488.5 1193.1,493.9 C1201.1,499.4 1208.9,504.5 1217.3,509.4 C1225.6,514.3 1234.4,518.9 1243.2,523.4 C1252,527.9 1261,532.3 1270.1,536.3 C1279.2,540.3 1288.6,544 1297.7,547.6 C1306.8,551.1 1315.5,554.4 1324.7,557.5 C1333.9,560.6 1343.6,563.4 1353,566.2 C1362.5,568.9 1372.2,571.6 1381.6,573.9 C1391,576.2 1400,578.3 1409.6,580.2 C1419.2,582.2 1429.1,584.1 1438.9,585.6 C1448.7,587.2 1458.6,588.4 1468.4,589.7 C1478.2,591.1 1488.2,592.5 1497.9,593.5 C1507.5,594.6 1516.6,595.4 1526.2,596.1 C1535.8,596.9 1545.9,597.4 1555.5,598 C1565.1,598.7 1574.3,599.6 1584,600 C1593.8,600.3 1604.2,600 1614,600 C1623.8,600 1633.2,600 1643,600 C1652.8,600 1663,600 1673,600 C1683,600 1693.2,600 1703,600 C1712.8,600 1722.2,600 1732,600 C1741.8,600 1752,600 1762,600 C1772,600 1782,600 1792,600 C1802,600 1812.2,600 1822,600 C1831.8,600 1841.2,600 1851,600 C1860.8,600 1871,600 1881,600 C1891,600 1901,600 1911,600 C1921,600 1931.2,600 1941,600 C1950.8,600 1960.2,600 1970,600 C1979.8,600 1995,600 2000,600 L2000,428 C1995,428 1980.1,427.9 1970.1,427.9 C1960.1,427.9 1950.1,427.9 1940.2,427.8 C1930.2,427.8 1920.2,427.8 1910.3,427.7 C1900.3,427.7 1890.3,427.7 1880.3,427.7 C1870.4,427.6 1860.4,427.6 1850.4,427.6 C1840.5,427.5 1830.5,427.5 1820.5,427.5 C1810.5,427.5 1800.6,427.4 1790.6,427.4 C1780.6,427.4 1770.7,427.3 1760.7,427.3 C1750.7,427.3 1740.8,427.2 1730.8,427.2 C1720.8,427.2 1710.8,427.2 1700.9,427.1 C1690.9,427.1 1680.9,427.2 1671,427 C1661,426.9 1651.2,426.7 1641.4,426.3 C1631.6,425.9 1621.9,425.3 1612.1,424.5 C1602.4,423.7 1592.7,422.7 1582.9,421.5 C1573.1,420.2 1563.2,418.4 1553.4,416.7 C1543.6,415 1533.7,413.5 1524,411.4 C1514.3,409.3 1504.7,406.7 1495.1,404.1 C1485.6,401.5 1476.2,399 1466.8,395.8 C1457.4,392.6 1447.7,388.8 1438.5,385 C1429.3,381.2 1420.4,377.2 1411.6,372.8 C1402.7,368.4 1393.9,363.7 1385.4,358.7 C1376.9,353.7 1368.5,348.3 1360.5,342.8 C1352.4,337.2 1344.6,331.4 1337,325.3 C1329.3,319.2 1321.8,312.8 1314.6,306 C1307.4,299.3 1300.3,292 1293.7,284.7 C1287,277.4 1280.7,269.9 1274.6,262.2 C1268.5,254.5 1262.6,246.7 1257.2,238.7 C1251.8,230.7 1247.1,222.5 1242.3,214.2 C1237.4,205.8 1232.5,197.3 1228.1,188.6 C1223.8,179.9 1219.8,170.9 1216.2,162.1 C1212.5,153.3 1209.2,144.8 1206.2,135.9 C1203.2,127.1 1200.5,118.1 1198,109 C1195.5,99.9 1193.3,90.5 1191.3,81.4 C1189.4,72.2 1187.7,63 1186.2,54 C1184.8,45 1183.6,36.4 1182.6,27.4 C1181.5,18.4 1180.4,4.6 1180,0 L952,0Z M1704,427 L2000,428 L2000,338 C1995.8,340.1 1983.4,346.2 1974.9,350.4 C1966.4,354.6 1957.5,359.1 1949,363.1 C1940.5,367.2 1932.5,371 1923.9,374.7 C1915.4,378.4 1906.5,382.1 1897.6,385.5 C1888.8,388.8 1879.8,391.9 1870.8,394.9 C1861.8,397.9 1852.7,400.7 1843.5,403.4 C1834.3,406 1825,408.6 1815.7,410.9 C1806.4,413.2 1796.9,415.3 1787.7,417.1 C1778.5,418.8 1769.7,420.1 1760.4,421.4 C1751.1,422.7 1741.5,424.1 1732.1,425 C1722.7,426 1708.7,426.7 1704,427Z M0,743 L0,962 C4.5,960.9 17.9,957.5 27.2,955.4 C36.6,953.2 46.5,951.3 56.2,949.3 C65.9,947.4 75.6,945.3 85.3,943.7 C95,942.1 104.8,940.9 114.6,939.6 C124.4,938.4 134.2,937.2 144,936.3 C153.8,935.5 163.4,934.9 173.3,934.5 C183.1,934.1 193,934.1 203,934 C212.9,933.9 222.9,933.9 232.9,933.9 C242.9,933.9 252.9,933.9 262.9,933.9 C272.9,933.9 282.8,933.8 292.8,933.8 C302.8,933.8 312.8,933.8 322.8,933.8 C332.8,933.8 342.8,933.8 352.7,933.7 C362.7,933.7 372.7,933.7 382.7,933.7 C392.7,933.7 402.7,933.7 412.6,933.6 C422.6,933.6 432.6,933.6 442.6,933.6 C452.6,933.6 462.6,933.6 472.6,933.6 C482.5,933.5 492.5,933.5 502.5,933.5 C512.5,933.5 522.5,933.5 532.5,933.5 C542.4,933.4 552.4,933.4 562.4,933.4 C572.4,933.4 582.4,933.4 592.4,933.4 C602.4,933.4 612.3,933.3 622.3,933.3 C632.3,933.3 642.3,933.3 652.3,933.3 C662.3,933.3 672.2,933.2 682.2,933.2 C692.2,933.2 702.2,933.2 712.2,933.2 C722.2,933.2 732.2,933.2 742.1,933.1 C752.1,933.1 762.1,933.1 772.1,933.1 C782.1,933.1 792.1,933.1 802,933 C812,933 827,933 832,933 C828,930.1 816.3,921.1 808.1,915.3 C800,909.5 791.3,903.6 782.9,898.2 C774.6,892.7 766.4,887.6 758.1,882.5 C749.7,877.4 741.5,872.5 732.8,867.6 C724.1,862.6 714.9,857.6 706,853 C697.1,848.4 688.4,844 679.5,839.7 C670.5,835.4 661.6,831.3 652.4,827.1 C643.1,823 633.4,818.7 624.1,814.8 C614.8,811 605.7,807.5 596.4,804.1 C587,800.6 577.8,797.4 568.2,794.2 C558.6,791.1 548.4,788 538.7,785.2 C529,782.4 519.5,779.8 509.9,777.2 C500.3,774.6 490.9,771.8 481.1,769.5 C471.2,767.3 460.8,765.5 450.9,763.6 C441,761.6 431.7,759.6 421.7,757.9 C411.8,756.2 401.3,754.8 391.3,753.4 C381.3,752 371.6,750.7 361.8,749.6 C352,748.5 342.3,747.6 332.3,746.8 C322.3,746 311.8,745.2 301.8,744.6 C291.9,744.1 282.4,743.7 272.6,743.4 C262.7,743.2 253.1,743.1 243,743 C232.9,742.9 222.2,743 212,743 C201.8,743 192,743 182,743 C172,743 162.2,743 152,743 C141.8,743 131.2,743 121,743 C110.8,743 101,743 91,743 C81,743 71.2,743 61,743 C50.8,743 40.2,743 30,743 C19.8,743 5,743 0,743Z M1339.5,743.5 L1339,1126 L1566,1126 L1566,743 L1339.5,743.5Z M238,934 C242.9,934.3 257.6,935 267.2,935.7 C276.7,936.4 285.8,937.3 295.4,938.4 C305,939.5 315.1,940.9 324.8,942.3 C334.4,943.8 343.7,945.4 353.3,947.2 C362.9,949 373,951 382.5,953.2 C392.1,955.4 401.1,957.7 410.5,960.3 C419.9,962.9 429.8,965.8 439,968.8 C448.3,971.7 457.1,974.7 466.2,978 C475.4,981.2 484.8,984.5 494,988.1 C503.1,991.8 512.2,995.8 520.9,999.8 C529.7,1003.7 537.9,1007.6 546.6,1011.9 C555.3,1016.3 564.5,1021.1 573.1,1025.8 C581.6,1030.4 589.5,1035.1 597.8,1040 C606.1,1044.9 614.8,1050.1 622.9,1055.3 C631.1,1060.5 638.9,1065.7 646.9,1071.3 C654.8,1076.8 663.1,1082.9 670.8,1088.7 C678.6,1094.6 685.9,1100.2 693.2,1106.4 C700.6,1112.6 711.4,1122.7 715,1126 L1019,1126 C1016.2,1122 1008.1,1109.8 1002.3,1102 C996.5,1094.1 990.2,1086.5 984,1078.9 C977.9,1071.3 971.7,1063.7 965.2,1056.3 C958.8,1048.8 951.9,1041.3 945.1,1034.3 C938.4,1027.2 931.6,1020.9 924.7,1014.1 C917.7,1007.2 910.6,1000.1 903.4,993.2 C896.3,986.3 889.1,979.5 881.7,972.9 C874.3,966.3 866.7,959.7 859,953.6 C851.3,947.5 844.1,939.4 835.2,936.1 C826.4,932.9 815.9,934.4 806,934 C796.1,933.6 786,934 776,934 C766,934 756,934 746,934 C736,934 726,934 716,934 C706,934 695.8,934 686,934 C676.2,934 666.8,934 657,934 C647.2,934 637,934 627,934 C617,934 607,934 597,934 C587,934 577,934 567,934 C557,934 547,934 537,934 C527,934 517,934 507,934 C497,934 487,934 477,934 C467,934 457,934 447,934 C437,934 427,934 417,934 C407,934 396.8,934 387,934 C377.2,934 367.8,934 358,934 C348.2,934 338,934 328,934 C318,934 308,934 298,934 C288,934 278,934 268,934 C258,934 243,934 238,934Z";
function contato() {
  const fundo = CORES[A.contato_fundo] || CORES["Verde musgo"];
  const formas = CORES[A.contato_formas] || CORES["Rosa"];
  cores(fundo, CORES[A.contato_texto] || CORES["Cinza"]);
  document.title = `Contato — ${E.nome || "Estúdio Tubu"}`;
  const ig = (E.instagram || "").replace(/^@/, "");
  // telefone abre conversa no WhatsApp: no celular abre o app; no computador tenta o app do WhatsApp
  // e, se ele não estiver instalado (a página não perde o foco), abre o WhatsApp Web
  const digitos = (E.telefone || "").replace(/\D/g, "");
  const fone = digitos.length > 11 && digitos.startsWith("55") ? digitos : "55" + digitos;
  const celular = matchMedia("(pointer: coarse)").matches;
  const zap = `https://wa.me/${fone}`;
  app.innerHTML = `<div class="contato">
    <svg class="contato-arte" viewBox="0 0 2000 1126" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="2000" height="1126" fill="${fundo}"/><path fill="${formas}" stroke="${formas}" stroke-width="2" stroke-linejoin="round" d="${FORMAS_CONTATO}"/>
    </svg>
    <header class="proj-topo"><a href="#" class="logo" aria-label="${esc(E.nome)}"></a>${menu("contato")}</header>
    <div class="palco-contato"><ul class="contato-lista">
      ${E.responsavel ? `<li>${esc(E.responsavel)}</li>` : ""}
      ${E.email ? `<li><a href="mailto:${esc(E.email)}">${esc(E.email)}</a></li>` : ""}
      ${E.telefone ? `<li><a href="${zap}" target="_blank" rel="noopener" class="zap">${esc(E.telefone)}</a></li>` : ""}
      ${ig ? `<li><a href="https://instagram.com/${esc(ig)}" target="_blank" rel="noopener">@${esc(ig)}</a></li>` : ""}
      ${E.cidade ? `<li>${esc(E.cidade)}</li>` : ""}
    </ul></div>
  </div>`;
  const link = app.querySelector(".zap");
  if (link && !celular) link.addEventListener("click", (ev) => {
    ev.preventDefault();
    let saiu = false;
    const marcar = () => { saiu = true; };
    addEventListener("blur", marcar, { once: true });
    location.href = `whatsapp://send?phone=${fone}`;
    setTimeout(() => {
      removeEventListener("blur", marcar);
      if (!saiu && document.hasFocus() && !document.hidden) location.href = `https://web.whatsapp.com/send?phone=${fone}`;
    }, 2000);
  });
  scrollTo(0, 0);
}

// fotos de um projeto: aceita o formato antigo (só o caminho) e o novo ({ imagem, lado_a_lado })
const listaFotos = (p) => (p.fotos || []).map((f) => (typeof f === "string" ? { imagem: f } : f)).filter((f) => f && f.imagem);

function projeto(slug) {
  const i = P.findIndex((p) => p.slug === slug);
  if (i < 0) return projetos();
  const p = P[i], prox = P[(i + 1) % P.length];
  cores(CORES[p.cor_fundo], CORES[p.cor_texto]);
  document.title = `${p.titulo} — ${E.nome || "Estúdio Tubu"}`;
  const ficha = [["Localização", p.localizacao], ["Ano", p.ano], ["Área", p.area], ["Colaboradores", p.colaboradores],
    ["Fotografia", p.fotografia], ["Construção", p.construcao]].filter(([, v]) => v);
  const fotos = listaFotos(p);
  const img = (f) => `<img loading="lazy" src="${rel(f.imagem)}" alt="${esc(p.titulo)}">`;
  // foto marcada "lado a lado" vai na mesma linha que a próxima
  let htmlFotos = "";
  for (let k = 0; k < fotos.length; k++) {
    if (fotos[k].lado_a_lado && fotos[k + 1]) { htmlFotos += `<div class="par">${img(fotos[k])}${img(fotos[k + 1])}</div>`; k++; }
    else htmlFotos += img(fotos[k]);
  }
  app.innerHTML = `<div class="projeto">
    <header class="proj-topo"><a href="#" class="logo" aria-label="${esc(E.nome)}"></a>${menu("projetos")}</header>
    <div class="rolagem">
    <div class="fotos">${fotos.length
      ? htmlFotos
      : `<div class="vazio">fotos ainda não adicionadas</div>`}</div>
    <section class="fim">
      <div><h1>${esc(p.titulo)}</h1><p class="sub">${[p.localizacao, p.ano].filter(Boolean).map(esc).join(" · ")}</p></div>
      <div>
        ${p.texto ? `<p class="texto">${esc(p.texto)}</p>` : ""}
        ${ficha.length ? `<dl class="ficha">${ficha.map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join("")}</dl>` : ""}
      </div>
    </section>
    <nav class="proj-rodape"><a href="#projetos">← Todos os projetos</a>${P.length > 1 ? `<a href="#p-${prox.slug}">Próximo: ${esc(prox.titulo)} →</a>` : ""}</nav>
    </div>
  </div>`;
  // par de fotos lado a lado: mesma largura da foto horizontal mais próxima (alinhado por fora)
  const alinharPares = () => app.querySelectorAll(".fotos .par").forEach((par) => {
    const horiz = (el) => el && el.tagName === "IMG" && el.naturalWidth > el.naturalHeight;
    let ref = null;
    for (let el = par.previousElementSibling; el && !ref; el = el.previousElementSibling) if (horiz(el)) ref = el;
    for (let el = par.nextElementSibling; el && !ref; el = el.nextElementSibling) if (horiz(el)) ref = el;
    par.style.maxWidth = ref ? `${ref.getBoundingClientRect().width}px` : "";
  });
  app.querySelectorAll(".fotos img").forEach((im) => im.addEventListener("load", alinharPares));
  onresize = alinharPares;
  alinharPares();
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
