// Galeria das páginas de projeto.
// 1) Clicar numa imagem abre a versão grande, com anterior/próxima (setas do teclado também).
// 2) As animações tocam só quando aparecem na tela. Com "reduzir movimento" ligado, ficam paradas com controles.
(function () {
  var reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- vídeos ----------
  var videos = document.querySelectorAll("video[data-auto]");
  if (reduzir || !("IntersectionObserver" in window)) {
    videos.forEach(function (v) { v.controls = true; v.preload = "metadata"; });
  } else {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        var v = en.target;
        if (en.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () { v.controls = true; }); }
        else v.pause();
      });
    }, { threshold: 0.25 });
    videos.forEach(function (v) { obs.observe(v); });
  }

  // ---------- visualizador ----------
  var links = Array.prototype.slice.call(document.querySelectorAll(".galeria a, .midia a[data-w]"));
  if (!links.length || typeof HTMLDialogElement !== "function") return;

  var dlg = document.createElement("dialog");
  dlg.className = "visor";
  dlg.setAttribute("aria-label", "Imagem ampliada");
  dlg.innerHTML =
    '<figure><img alt=""><figcaption></figcaption></figure>' +
    '<button type="button" class="visor-fechar">Fechar</button>' +
    '<button type="button" class="visor-ant" aria-label="Imagem anterior">‹</button>' +
    '<button type="button" class="visor-prox" aria-label="Próxima imagem">›</button>';
  document.body.appendChild(dlg);

  var img = dlg.querySelector("img"), cap = dlg.querySelector("figcaption");
  var atual = 0, grupo = links, origem = null;

  function mostrar(i) {
    atual = (i + grupo.length) % grupo.length;
    var a = grupo[atual], mini = a.querySelector("img");
    img.src = a.href;
    img.width = a.dataset.w; img.height = a.dataset.h;
    img.alt = mini ? mini.alt : "";
    cap.textContent = grupo.length > 1 ? (atual + 1) + " de " + grupo.length : "";
    var multi = grupo.length > 1;
    dlg.querySelector(".visor-ant").hidden = !multi;
    dlg.querySelector(".visor-prox").hidden = !multi;
  }

  links.forEach(function (a) {
    a.addEventListener("click", function (ev) {
      if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.button !== 0) return;
      ev.preventDefault();
      var lista = a.closest(".galeria");
      grupo = lista ? Array.prototype.slice.call(lista.querySelectorAll("a")) : [a];
      origem = a;
      mostrar(grupo.indexOf(a));
      dlg.showModal();
    });
  });

  dlg.querySelector(".visor-fechar").addEventListener("click", function () { dlg.close(); });
  dlg.querySelector(".visor-ant").addEventListener("click", function () { mostrar(atual - 1); });
  dlg.querySelector(".visor-prox").addEventListener("click", function () { mostrar(atual + 1); });
  dlg.addEventListener("click", function (ev) { if (ev.target === dlg) dlg.close(); });
  dlg.addEventListener("keydown", function (ev) {
    if (ev.key === "ArrowLeft") mostrar(atual - 1);
    if (ev.key === "ArrowRight") mostrar(atual + 1);
  });
  dlg.addEventListener("close", function () { img.removeAttribute("src"); if (origem) origem.focus(); });

  // deslizar no celular
  var x0 = null;
  dlg.addEventListener("touchstart", function (ev) { x0 = ev.touches[0].clientX; }, { passive: true });
  dlg.addEventListener("touchend", function (ev) {
    if (x0 === null) return;
    var dx = ev.changedTouches[0].clientX - x0; x0 = null;
    if (Math.abs(dx) > 50 && grupo.length > 1) mostrar(atual + (dx < 0 ? 1 : -1));
  });
})();
