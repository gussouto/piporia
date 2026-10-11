/* Cardápio: filtros, detalhes do item e adicionar ao pedido */
(function () {
  "use strict";
  var M = window.PIPORIA_MENU, P = window.Piporia;
  var root = document.getElementById("menu-root");
  var chips = document.getElementById("filters");
  var dlg = document.getElementById("item-modal");
  var params = new URLSearchParams(location.search);
  var current = params.get("cat") || "todos";

  function byId(id) { return M.itens.filter(function (i) { return i.id === id; })[0]; }
  function minPrice(it) {
    var ps = it.tamanhos.map(function (t) { return t.preco; }).filter(function (p) { return p != null; });
    return ps.length ? Math.min.apply(null, ps) : null;
  }

  /* ---------- Filtros ---------- */
  function renderChips() {
    var list = [{ id: "todos", nome: "Tudo" }].concat(M.categorias);
    chips.innerHTML = list.map(function (c) {
      return '<button type="button" class="chip" data-cat="' + c.id + '" aria-pressed="' + (c.id === current) + '">' + P.esc(c.nome) + "</button>";
    }).join("");
  }
  chips.addEventListener("click", function (e) {
    var b = e.target.closest(".chip");
    if (!b) return;
    current = b.getAttribute("data-cat");
    var url = current === "todos" ? location.pathname : location.pathname + "?cat=" + current;
    history.replaceState(null, "", url);
    renderChips();
    renderMenu();
  });

  /* ---------- Cards ---------- */
  function cardHTML(it) {
    var media = it.imagem
      ? '<img src="' + it.imagem + '" alt="' + P.esc(it.nome) + '" loading="lazy">'
      : P.planet(it.cor || "#b5832f", it.cor2 || "#e6b560");
    var prices = it.tamanhos.map(function (t) {
      return "<span><small>" + P.esc(t.nome) + "</small>" + (t.preco == null ? "Consultar valor" : P.brl(t.preco)) + "</span>";
    }).join("");
    return '<div class="m-card" role="button" tabindex="0" data-id="' + it.id + '">' +
      '<div class="m-media">' + media + "</div>" +
      '<div class="m-body"><h3>' + P.esc(it.nome) + "</h3>" +
      (it.subtitulo ? '<div class="m-sub">' + P.esc(it.subtitulo) + "</div>" : "") +
      '<p class="m-desc">' + P.esc(it.descricao) + "</p>" +
      '<div class="m-prices">' + prices + "</div>" +
      '<div class="m-open">Ver detalhes e pedir</div></div></div>';
  }
  function renderMenu() {
    var cats = M.categorias.filter(function (c) { return current === "todos" || c.id === current; });
    root.innerHTML = cats.map(function (c) {
      var itens = M.itens.filter(function (i) { return i.categoria === c.id; });
      if (!itens.length) return "";
      return '<section class="cat-block" aria-labelledby="cat-' + c.id + '">' +
        '<h2 class="cat-title" id="cat-' + c.id + '">' + P.esc(c.nome) + "</h2>" +
        (c.nota ? '<p class="cat-note">' + P.esc(c.nota) + "</p>" : "") +
        '<div class="menu-grid">' + itens.map(cardHTML).join("") + "</div></section>";
    }).join("");
  }
  root.addEventListener("click", function (e) {
    var c = e.target.closest(".m-card");
    if (c) openItem(byId(c.getAttribute("data-id")));
  });

  root.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    var c = e.target.closest(".m-card");
    if (!c) return;
    e.preventDefault();
    openItem(byId(c.getAttribute("data-id")));
  });

  /* ---------- Detalhe do item ---------- */
  function openItem(it) {
    if (!it) return;
    var st = { size: 0, second: "", qty: 1 };
    var priced = it.tamanhos.some(function (t) { return t.preco != null; });
    var others = it.combinavel ? M.itens.filter(function (o) { return o.combinavel && o.id !== it.id; }) : [];
    var media = it.imagem
      ? '<img src="' + it.imagem + '" alt="' + P.esc(it.nome) + '">'
      : P.planet(it.cor || "#b5832f", it.cor2 || "#e6b560");

    var sizes = it.tamanhos.map(function (t, i) {
      return '<label class="opt"><input type="radio" name="size" value="' + i + '"' + (i === 0 ? " checked" : "") + ">" +
        "<span>" + P.esc(t.nome) + "<small>" + (t.preco == null ? "Consultar valor" : P.brl(t.preco)) + "</small></span></label>";
    }).join("");

    var secondField = others.length
      ? '<div class="field"><label for="second">Segundo recheio (opcional)</label>' +
        '<select id="second"><option value="">Só o ' + P.esc(it.nome) + "</option>" +
        others.map(function (o) { return '<option value="' + o.id + '">' + P.esc(o.nome) + " — " + P.esc(o.subtitulo || "") + "</option>"; }).join("") +
        "</select></div>"
      : "";

    var foot = priced
      ? '<div class="modal-foot"><div class="total" id="m-total"></div>' +
        '<div class="qty" role="group" aria-label="Quantidade"><button type="button" id="q-minus" aria-label="Diminuir">−</button><output id="q-out">1</output><button type="button" id="q-plus" aria-label="Aumentar">+</button></div></div>' +
        '<button type="button" class="btn btn-primary btn-block" id="m-add">Adicionar ao pedido</button>'
      : '<a class="btn btn-primary btn-block" target="_blank" rel="noopener" href="' +
        P.waLink("Olá! Vim pelo site da Pipória e queria saber valores e opções de: " + it.nome + ".") +
        '">Perguntar o valor no WhatsApp</a>';

    dlg.innerHTML =
      '<div class="modal-grid"><div class="modal-media">' + media + "</div>" +
      '<div class="modal-body"><button type="button" class="modal-close" aria-label="Fechar">×</button>' +
      "<h3>" + P.esc(it.nome) + "</h3>" +
      (it.subtitulo ? '<div class="m-sub">' + P.esc(it.subtitulo) + "</div>" : "") +
      '<p class="m-desc">' + P.esc(it.descricao) + "</p>" +
      '<div class="field"><span class="legend">Tamanho</span><div class="opts">' + sizes + "</div></div>" +
      secondField + foot + "</div></div>";

    function unit() {
      var base = it.tamanhos[st.size].preco;
      if (base == null) return null;
      var other = st.second ? byId(st.second) : null;
      if (other) {
        var match = other.tamanhos.filter(function (t) { return t.nome === it.tamanhos[st.size].nome; })[0];
        if (match && match.preco != null) base = Math.max(base, match.preco);
      }
      return base;
    }
    function refresh() {
      var u = unit();
      var t = dlg.querySelector("#m-total");
      if (t && u != null) t.textContent = P.brl(u * st.qty);
      var q = dlg.querySelector("#q-out");
      if (q) q.textContent = st.qty;
    }

    dlg.querySelectorAll('input[name="size"]').forEach(function (r) {
      r.addEventListener("change", function () { st.size = +r.value; refresh(); });
    });
    var sec = dlg.querySelector("#second");
    if (sec) sec.addEventListener("change", function () { st.second = sec.value; refresh(); });
    var minus = dlg.querySelector("#q-minus"), plus = dlg.querySelector("#q-plus");
    if (minus) minus.addEventListener("click", function () { st.qty = Math.max(1, st.qty - 1); refresh(); });
    if (plus) plus.addEventListener("click", function () { st.qty = Math.min(50, st.qty + 1); refresh(); });
    dlg.querySelector(".modal-close").addEventListener("click", function () { dlg.close(); });

    var add = dlg.querySelector("#m-add");
    if (add) add.addEventListener("click", function () {
      var other = st.second ? byId(st.second) : null;
      var size = it.tamanhos[st.size].nome;
      var nome = it.nome + (other ? " + " + other.nome : "");
      var recheio = it.subtitulo ? it.subtitulo + (other && other.subtitulo ? " + " + other.subtitulo : "") : "";
      P.cart.add({
        key: it.id + "|" + size + "|" + (st.second || ""),
        nome: nome,
        detalhe: size + (recheio ? " · " + recheio : ""),
        preco: unit(),
        qtd: st.qty
      });
      dlg.close();
      P.toast(st.qty + "x " + nome + " no pedido.", "pedido.html", "Ver pedido");
    });

    refresh();
    if (!dlg.open) dlg.showModal();
  }

  dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });

  renderChips();
  renderMenu();
  var deep = params.get("item");
  if (deep && byId(deep)) openItem(byId(deep));
})();
