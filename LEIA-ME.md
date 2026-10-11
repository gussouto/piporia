# Site da Pipória

Site estático (HTML, CSS e JavaScript puro). Não precisa instalar nada.

## Como ver no computador
Abra a pasta e dê dois cliques em `index.html`.
Para publicar, envie a pasta inteira para qualquer hospedagem de site estático (Netlify, Vercel, GitHub Pages, Hostinger etc.).

## Como adicionar ou mudar itens do cardápio
Tudo fica em **`js/menu-data.js`**. Não é preciso mexer em mais nenhum arquivo.

- **Novo item:** copie um bloco de `itens`, mude `id` (único, sem espaço nem acento), `nome`, `descricao` e `tamanhos`.
- **Preço:** `{ nome: "500 ml", preco: 26 }`. Para vários tamanhos, inclua mais linhas na lista.
- **Foto:** coloque o arquivo em `img/` e informe `imagem: "img/nome-do-arquivo.jpg"`. Sem foto, o site desenha um planeta com as cores `cor` e `cor2`.
- **Nova categoria:** inclua em `categorias` (id, nome, nota) e use esse id no campo `categoria` dos itens. O filtro aparece sozinho.
- **Segundo recheio:** `combinavel: true` permite combinar com outro item que também tenha `combinavel: true`. Com dois recheios vale o preço do mais caro.

## Açaí e panqueca
Os valores ainda não foram informados, então os dois itens aparecem como **"Consultar valor"** e levam o cliente ao WhatsApp.
Quando tiver os preços, troque `preco: null` pelo valor (exemplo: `preco: 18`). O item passa a ir para o carrinho normalmente.

## Outras informações
- WhatsApp, Instagram e endereço: constantes no começo de `js/app.js`.
- Cores: variáveis no começo de `css/style.css`.
- Imagens: `img/logo.png`, `img/galeria-1.jpg` a `galeria-5.jpg` e `img/sobre-mushroom.jpg`.
