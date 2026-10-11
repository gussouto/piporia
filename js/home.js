/* Home: galeria em movimento e sabores */
(function () {
  "use strict";
  var P = window.Piporia, M = window.PIPORIA_MENU;

  var fotos = [
    ["img/galeria-1.jpg", "Pipoca gourmet com cobertura de Nutella"],
    ["img/galeria-2.jpg", "Balde de pipoca coberto de chocolate ao leite"],
    ["img/galeria-3.jpg", "Pote de pipoca com creme e chocolate"],
    ["img/galeria-4.jpg", "Açaí na garrafa Pipória"],
    ["img/galeria-5.jpg", "Panqueca com calda de caramelo"]
  ];
  var track = document.getElementById("marquee-track");
  if (track) {
    function set(hidden) {
      return fotos.map(function (f) {
        return '<div class="marquee-item"' + (hidden ? ' aria-hidden="true"' : "") + '><img src="' + f[0] + '" alt="' + (hidden ? "" : P.esc(f[1])) + '" loading="lazy" draggable="false"></div>';
      }).join("");
    }
    /* A animação desloca -50% da faixa, então ela precisa ser formada por
       duas metades idênticas. Quatro conjuntos cobrem telas largas sem emenda. */
    track.innerHTML = set(false) + set(true) + set(true) + set(true);
  }

  var fl = document.getElementById("flavors");
  if (fl) {
    fl.innerHTML = M.itens.filter(function (i) { return i.categoria === "pipoca"; }).map(function (it) {
      var ps = it.tamanhos.map(function (t) { return t.preco; });
      return '<a class="flavor" href="cardapio.html?item=' + it.id + '">' +
        P.planet(it.cor, it.cor2) +
        "<strong>" + P.esc(it.nome) + "</strong><span>" + P.esc(it.subtitulo) + "</span>" +
        "<em>a partir de " + P.brl(Math.min.apply(null, ps)) + "</em></a>";
    }).join("");
  }
})();
