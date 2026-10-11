/* ==========================================================
   Pipória — cabeçalho, rodapé, tema, carrinho e WhatsApp
   ========================================================== */
(function () {
  "use strict";

  var WA_NUMBER = "5534984475322";
  var INSTAGRAM = "https://www.instagram.com/piporia.gourmet";
  var ADDRESS = "Av. Solidariedade, 1230, Uberlândia - MG";
  var CART_KEY = "piporia_cart_v1";
  var THEME_KEY = "piporia_theme";

  function brl(n) {
    return Number(n).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function waLink(text) {
    return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text);
  }

  /* ---------- Planeta (usado quando o item não tem foto) ---------- */
  function planet(cor, cor2) {
    var dots = [[48,50],[62,46],[74,56],[50,66],[66,70],[56,80],[78,72],[42,62],[60,58]]
      .map(function (p, i) {
        return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + (5 + (i % 3)) + '" fill="' + cor2 + '" opacity=".5"/>';
      }).join("");
    return '<svg viewBox="0 0 120 120" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">' +
      '<g transform="rotate(-18 60 62)">' +
      '<path d="M4 62 A56 16 0 0 1 116 62" fill="none" stroke="#d4a94f" stroke-width="4" stroke-linecap="round"/>' +
      '</g>' +
      '<circle cx="60" cy="60" r="34" fill="' + cor + '"/>' + dots +
      '<g transform="rotate(-18 60 62)">' +
      '<path d="M4 62 A56 16 0 0 0 116 62" fill="none" stroke="#e8c77a" stroke-width="4" stroke-linecap="round"/>' +
      '</g>' +
      '<path d="M96 22l1.8 4.2 4.2 1.8-4.2 1.8L96 34l-1.8-4.2L90 28l4.2-1.8z" fill="#e8c77a"/>' +
      '</svg>';
  }

  /* ---------- Tema ---------- */
  function setTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem(THEME_KEY, t); } catch (e) {}
    var b = document.querySelector(".theme-toggle");
    if (b) b.setAttribute("aria-label", t === "dark" ? "Mudar para o tema claro" : "Mudar para o tema escuro");
  }

  /* ---------- Carrinho ---------- */
  var cart = {
    get: function () {
      try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; }
    },
    save: function (list) {
      try { localStorage.setItem(CART_KEY, JSON.stringify(list)); } catch (e) {}
      window.dispatchEvent(new Event("cart:change"));
    },
    add: function (item) {
      var list = cart.get();
      var found = list.filter(function (i) { return i.key === item.key; })[0];
      if (found) found.qtd += item.qtd; else list.push(item);
      cart.save(list);
    },
    setQty: function (key, qtd) {
      var list = cart.get();
      list.forEach(function (i) { if (i.key === key) i.qtd = Math.max(1, qtd); });
      cart.save(list);
    },
    remove: function (key) {
      cart.save(cart.get().filter(function (i) { return i.key !== key; }));
    },
    clear: function () { cart.save([]); },
    count: function () { return cart.get().reduce(function (s, i) { return s + i.qtd; }, 0); },
    total: function () { return cart.get().reduce(function (s, i) { return s + i.qtd * i.preco; }, 0); }
  };

  function updateBadge() {
    var n = cart.count();
    document.querySelectorAll(".cart-count").forEach(function (el) {
      el.textContent = n;
      el.setAttribute("data-n", n);
    });
  }

  /* ---------- Aviso rápido ---------- */
  var toastTimer;
  function toast(msg, linkHref, linkText) {
    var el = document.querySelector(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      el.setAttribute("role", "status");
      document.body.appendChild(el);
    }
    el.innerHTML = "<span>" + esc(msg) + "</span>" +
      (linkHref ? '<a href="' + linkHref + '">' + esc(linkText) + "</a>" : "");
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("show"); }, 4200);
  }

  /* ---------- Ícones ---------- */
  var ICON_WA = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52s.198-.298.298-.497c.099-.198.05-.371-.025-.52s-.669-1.612-.916-2.207c-.242-.579-.487-.5-.669-.51a13 13 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074s2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413s.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.9 11.9 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413"/></svg>';
  var ICON_SUN = '<svg class="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  var ICON_MOON = '<svg class="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z"/></svg>';
  var ICON_MENU = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';

  /* ---------- Cabeçalho ---------- */
  function renderHeader() {
    var host = document.getElementById("site-header");
    if (!host) return;
    var page = document.body.getAttribute("data-page");
    function cur(p) { return page === p ? ' aria-current="page"' : ""; }
    host.outerHTML =
      '<header class="site-header"><div class="wrap hdr-in">' +
      '<a class="brand" href="index.html" aria-label="Pipória, página inicial">' +
      '<img class="brand-logo" src="img/logo.png" alt="" width="46" height="46" onerror="this.remove()">' +
      '<span class="brand-name">Pipória</span></a>' +
      '<nav class="nav" id="nav" aria-label="Principal">' +
      '<a href="index.html"' + cur("home") + ">Home</a>" +
      '<a href="sobre.html"' + cur("sobre") + ">Sobre</a>" +
      '<a href="pedido.html"' + cur("pedido") + '>Realizar pedido <span class="cart-count" data-n="0">0</span></a>' +
      '<div class="has-sub"><a href="cardapio.html"' + cur("cardapio") + ">Cardápio</a>" +
      '<div class="sub"><div class="sub-in">' +
      '<a href="cardapio.html?cat=pipoca">Pipocas Gourmet</a>' +
      '<a href="cardapio.html?cat=acai">Açaí na Garrafa</a>' +
      '<a href="cardapio.html?cat=panqueca">Panqueca</a>' +
      "</div></div></div></nav>" +
      '<button class="icon-btn theme-toggle" type="button" aria-label="Mudar o tema">' + ICON_SUN + ICON_MOON + "</button>" +
      '<button class="icon-btn nav-toggle" type="button" aria-expanded="false" aria-controls="nav" aria-label="Abrir o menu">' + ICON_MENU + "</button>" +
      "</div></header>";
  }

  /* ---------- Rodapé ---------- */
  function renderFooter() {
    var host = document.getElementById("site-footer");
    if (!host) return;
    host.outerHTML =
      '<footer class="site-footer"><div class="wrap">' +
      '<div class="foot-grid">' +
      '<div><div class="foot-brand"><img src="img/logo.png" alt="" width="64" height="64" onerror="this.remove()"><span>Pipória</span></div>' +
      "<p>Pipocas gourmet no balde. A sua nova paixão intergaláctica. Explosão de sabor, outro mundo.</p></div>" +
      "<div><h4>Contato</h4><ul>" +
      '<li><a href="' + waLink("Olá! Vim pelo site da Pipória.") + '" target="_blank" rel="noopener">WhatsApp: (34) 98447-5322</a></li>' +
      '<li><a href="' + INSTAGRAM + '" target="_blank" rel="noopener">Instagram: @piporia.gourmet</a></li>' +
      "<li><address>" + esc(ADDRESS) + "</address></li></ul></div>" +
      "<div><h4>Navegação</h4><ul>" +
      '<li><a href="index.html">Home</a></li>' +
      '<li><a href="sobre.html">Sobre</a></li>' +
      '<li><a href="cardapio.html">Cardápio</a></li>' +
      '<li><a href="pedido.html">Realizar pedido</a></li></ul></div>' +
      "</div>" +
      '<div class="copy">© 2026 Pipória — Todos os direitos reservados.</div>' +
      "</div></footer>" +
      '<a class="wa-float" href="' + waLink("Olá! Vim pelo site da Pipória e gostaria de fazer um pedido.") +
      '" target="_blank" rel="noopener" aria-label="Falar com a Pipória no WhatsApp">' + ICON_WA + "</a>";
  }

  /* ---------- Eventos globais ---------- */
  function bind() {
    var tg = document.querySelector(".theme-toggle");
    if (tg) {
      setTheme(document.documentElement.getAttribute("data-theme") || "light");
      tg.addEventListener("click", function () {
        setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
      });
    }
    var nt = document.querySelector(".nav-toggle");
    var nav = document.getElementById("nav");
    if (nt && nav) {
      nt.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        nt.setAttribute("aria-expanded", open);
        nt.setAttribute("aria-label", open ? "Fechar o menu" : "Abrir o menu");
      });
    }
    window.addEventListener("cart:change", updateBadge);
    window.addEventListener("storage", updateBadge);
    updateBadge();
  }

  renderHeader();
  renderFooter();
  bind();

  window.Piporia = {
    WA_NUMBER: WA_NUMBER, ADDRESS: ADDRESS, INSTAGRAM: INSTAGRAM,
    brl: brl, esc: esc, waLink: waLink, planet: planet, cart: cart, toast: toast
  };
})();
