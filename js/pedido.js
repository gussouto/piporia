/* Pedido: revisar carrinho e enviar pelo WhatsApp */
(function () {
  "use strict";
  var P = window.Piporia;
  var listEl = document.getElementById("cart-list");
  var sumEl = document.getElementById("cart-sum");
  var formEl = document.getElementById("order-form");
  var emptyEl = document.getElementById("cart-empty");
  var fullEl = document.getElementById("cart-full");
  var addrField = document.getElementById("addr-field");

  function render() {
    var items = P.cart.get();
    var has = items.length > 0;
    emptyEl.hidden = has;
    fullEl.hidden = !has;
    if (!has) return;
    listEl.innerHTML = items.map(function (i) {
      return '<div class="cart-line" data-key="' + P.esc(i.key) + '">' +
        "<div><h3>" + P.esc(i.nome) + '</h3><div class="det">' + P.esc(i.detalhe) + " · " + P.brl(i.preco) + " cada</div></div>" +
        '<div class="price">' + P.brl(i.preco * i.qtd) + "</div>" +
        '<div class="actions"><div class="qty" role="group" aria-label="Quantidade de ' + P.esc(i.nome) + '">' +
        '<button type="button" data-act="minus" aria-label="Diminuir">−</button><output>' + i.qtd + "</output>" +
        '<button type="button" data-act="plus" aria-label="Aumentar">+</button></div>' +
        '<button type="button" class="link-btn" data-act="remove">Remover</button></div></div>';
    }).join("");
    sumEl.textContent = P.brl(P.cart.total());
  }

  listEl.addEventListener("click", function (e) {
    var b = e.target.closest("button[data-act]");
    if (!b) return;
    var key = b.closest(".cart-line").getAttribute("data-key");
    var item = P.cart.get().filter(function (i) { return i.key === key; })[0];
    if (!item) return;
    var act = b.getAttribute("data-act");
    if (act === "remove") P.cart.remove(key);
    else if (act === "plus") P.cart.setQty(key, Math.min(50, item.qtd + 1));
    else if (act === "minus") P.cart.setQty(key, item.qtd - 1);
  });
  window.addEventListener("cart:change", render);

  formEl.addEventListener("change", function () {
    var delivery = formEl.elements.tipo.value === "entrega";
    addrField.hidden = !delivery;
  });

  document.getElementById("clear-cart").addEventListener("click", function () {
    if (confirm("Limpar todos os itens do pedido?")) P.cart.clear();
  });

  formEl.addEventListener("submit", function (e) {
    e.preventDefault();
    var items = P.cart.get();
    if (!items.length) return;
    var f = formEl.elements;
    var nome = f.nome.value.trim();
    var tipo = f.tipo.value;
    var endereco = f.endereco.value.trim();
    var obs = f.obs.value.trim();
    var errNome = document.getElementById("err-nome");
    var errEnd = document.getElementById("err-end");
    errNome.textContent = ""; errEnd.textContent = "";
    if (!nome) { errNome.textContent = "Informe seu nome."; f.nome.focus(); return; }
    if (tipo === "entrega" && !endereco) { errEnd.textContent = "Informe o endereço de entrega."; f.endereco.focus(); return; }

    var linhas = items.map(function (i) {
      return "• " + i.qtd + "x " + i.nome + " (" + i.detalhe + ") — " + P.brl(i.preco * i.qtd);
    });
    var msg = "Olá, Pipória! Quero fazer este pedido pelo site:\n\n" +
      linhas.join("\n") + "\n\n" +
      "*Total dos itens: " + P.brl(P.cart.total()) + "*\n\n" +
      "*Nome:* " + nome + "\n" +
      (tipo === "entrega" ? "*Entrega em:* " + endereco : "*Retirada* na loja (" + P.ADDRESS + ")") +
      (obs ? "\n*Observações:* " + obs : "");
    window.open(P.waLink(msg), "_blank", "noopener");
  });

  render();
})();
