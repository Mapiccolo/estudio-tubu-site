# Site estudio tubù — como colocar no ar

Custo mensal: **R$ 0**. Só o domínio, que já está pago na GoDaddy.

| Peça | Para quê | Custo |
|---|---|---|
| GitHub | guarda os arquivos do site | grátis |
| Vercel | publica o site | grátis (plano Hobby) |
| Pages CMS | painel onde a Marina edita | grátis |
| GoDaddy | domínio | já pago |

## 1. GitHub (feito por você, uma vez só)
1. Crie um repositório **privado**, por exemplo `estudio-tubu-site`.
2. Suba esta pasta inteira, incluindo o arquivo oculto `.pages.yml`. Pelo Claude Code: "crie o repositório e faça o push desta pasta".

## 2. Vercel
1. vercel.com → Add New Project → importe o repositório.
2. Não precisa configurar nada: o `vercel.json` já diz o que fazer.
3. Deploy. O site fica num endereço provisório `...vercel.app`.

## 3. Domínio da GoDaddy
1. Na Vercel: Project → Settings → Domains → adicione `seudominio.com.br` e `www.seudominio.com.br`.
2. A Vercel mostra os registros de DNS (um **A** para o domínio raiz e um **CNAME** para o `www`).
3. Na GoDaddy: Meus Produtos → Domínio → DNS → edite/crie esses dois registros (apague o "A" antigo que aponta para a página de estacionamento da GoDaddy).
4. A propagação leva de minutos a algumas horas. O HTTPS é automático.

## 4. Pages CMS (painel da Marina)
1. A Marina cria uma conta gratuita no GitHub.
2. No repositório: Settings → Collaborators → convide a conta dela.
3. Ela entra em **app.pagescms.org** → "Sign in with GitHub" → escolhe o repositório.
4. Pronto. Ela vê **Projetos** e **Sobre o estúdio**.

## Como a Marina usa
- **Novo projeto:** Projetos → Add an entry → nome, thumbnail, fotos (na ordem do scroll), texto curto, ficha técnica e as duas cores → Save.
- **Ordem na lista:** campo "Ordem na lista" (1 aparece primeiro).
- **Esconder um projeto sem apagar:** desmarcar "Mostrar no site".
- **Cores:** "Cor de fundo da página" e "Cor do texto e do logo", escolhidas entre as 11 da paleta.
- Campos da ficha deixados vazios não aparecem no site.
- Depois de salvar, o site se atualiza sozinho em ~1 minuto.

**Dica para ela:** exportar as fotos em JPG com ~2000 px no lado maior (cerca de 300–600 KB cada). Isso deixa o site rápido.

## Arquivos
- `content/projetos/*.json`: um arquivo por projeto (o painel cria e edita).
- `content/estudio.json`: contatos do rodapé.
- `media/`: imagens enviadas pelo painel.
- `index.html`, `style.css`, `app.js`: o desenho do site (só você mexe).
- `build.js`: junta os projetos na publicação (roda sozinho na Vercel).

Fonte provisória (Inter Tight) até haver licença web da Neue Montreal / Ufficio Display. Logo em PNG: trocar pelo SVG das designers.
