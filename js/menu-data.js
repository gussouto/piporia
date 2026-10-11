/* ==========================================================
   CARDÁPIO DA PIPÓRIA
   Para adicionar um item, copie um bloco de "itens" e edite.
   Para adicionar uma categoria, inclua em "categorias".

   Campos de cada item:
   - id          identificador único, sem espaços ou acentos
   - categoria   "pipoca", "acai" ou "panqueca" (ou uma nova)
   - nome        nome exibido
   - subtitulo   linha pequena acima da descrição (opcional)
   - descricao   texto do detalhe
   - tamanhos    lista de { nome, preco }. Use preco: null para
                 "consultar valor" (o cliente é levado ao WhatsApp)
   - imagem      caminho da foto (opcional). Sem foto, o site
                 desenha o planeta usando as cores abaixo
   - cor / cor2  cores do planeta (somente quando não há foto)
   - combinavel  true = permite escolher um segundo recheio
   ========================================================== */

window.PIPORIA_MENU = {
  categorias: [
    {
      id: "pipoca",
      nome: "Pipocas Gourmet",
      nota: "Clássicos. Você pode escolher até dois recheios por pipoca."
    },
    {
      id: "acai",
      nome: "Açaí na Garrafa",
      nota: "Para levar e tomar onde quiser."
    },
    {
      id: "panqueca",
      nome: "Panqueca",
      nota: ""
    }
  ],

  itens: [
    /* ---------------- PIPOCAS ---------------- */
    {
      id: "lua", categoria: "pipoca", nome: "Lua", subtitulo: "Leitinho",
      descricao: "Doce, suave e cremoso como a luz da lua.",
      tamanhos: [{ nome: "500 ml", preco: 26 }, { nome: "1 L", preco: 40 }],
      cor: "#e7c98b", cor2: "#fff3d1", combinavel: true
    },
    {
      id: "jupiter", categoria: "pipoca", nome: "Júpiter", subtitulo: "Creme de avelã",
      descricao: "Intenso, envolvente e cheio de camadas de sabor.",
      tamanhos: [{ nome: "500 ml", preco: 26 }, { nome: "1 L", preco: 40 }],
      cor: "#7a4a2a", cor2: "#c58a55", combinavel: true
    },
    {
      id: "netuno", categoria: "pipoca", nome: "Netuno", subtitulo: "Cookies & Cream",
      descricao: "A crocância dos cookies encontrando a suavidade do creme. Uma combinação que conquista qualquer galáxia.",
      tamanhos: [{ nome: "500 ml", preco: 26 }, { nome: "1 L", preco: 40 }],
      cor: "#d9d2c6", cor2: "#3a3430", combinavel: true
    },
    {
      id: "marte", categoria: "pipoca", nome: "Marte", subtitulo: "Bueno",
      descricao: "Anéis de sabor envolvendo uma explosão de creme de avelã e chocolate. Um clássico que conquista toda a galáxia.",
      tamanhos: [{ nome: "500 ml", preco: 26 }, { nome: "1 L", preco: 40 }],
      cor: "#b5832f", cor2: "#e6b560", combinavel: true
    },
    {
      id: "urano", categoria: "pipoca", nome: "Urano", subtitulo: "Rafaello",
      descricao: "A delicadeza do coco com chocolate branco que derrete na boca. Sofisticação em cada pedacinho.",
      tamanhos: [{ nome: "500 ml", preco: 26 }, { nome: "1 L", preco: 40 }],
      cor: "#efe3c8", cor2: "#ffffff", combinavel: true
    },
    {
      id: "plutao", categoria: "pipoca", nome: "Plutão", subtitulo: "Ovomaltine",
      descricao: "A crocância inconfundível do Ovomaltine que transforma cada mordida em pura nostalgia e prazer.",
      tamanhos: [{ nome: "500 ml", preco: 26 }, { nome: "1 L", preco: 40 }],
      cor: "#6b4226", cor2: "#b07a45", combinavel: true
    },
    {
      id: "saturno", categoria: "pipoca", nome: "Saturno", subtitulo: "Nutella",
      descricao: "O inconfundível sabor da Nutella, cremoso e irresistível, para os verdadeiros amantes de chocolate.",
      tamanhos: [{ nome: "500 ml", preco: 29 }, { nome: "1 L", preco: 45 }],
      imagem: "img/galeria-1.jpg",
      cor: "#5a3520", cor2: "#9a6a42", combinavel: true
    },

    /* ---------------- AÇAÍ NA GARRAFA ----------------
       Valores ainda não informados: o site mostra "Consultar valor"
       e leva o cliente ao WhatsApp. Troque preco: null pelo valor
       (ex.: preco: 18) e o item passa a ir para o carrinho. */
    {
      id: "acai-garrafa", categoria: "acai", nome: "Açaí na Garrafa",
      subtitulo: "Para levar",
      descricao: "Açaí cremoso servido na garrafa, pronto para levar e tomar onde quiser. Pergunte pelos sabores e acompanhamentos disponíveis.",
      tamanhos: [{ nome: "Garrafa", preco: null }],
      imagem: "img/galeria-4.jpg"
    },

    /* ---------------- PANQUECA ---------------- */
    {
      id: "panqueca", categoria: "panqueca", nome: "Panqueca",
      subtitulo: "Com calda",
      descricao: "Panqueca recheada e finalizada com calda. Pergunte pelos recheios disponíveis.",
      tamanhos: [{ nome: "Unidade", preco: null }],
      imagem: "img/galeria-5.jpg"
    }
  ]
};
