/* Script comum: ano no rodapé, menu mobile e modo escuro */
(function () {
  "use strict";

  var STORAGE_KEY = "guia-tema";

  // Aplica tema o quanto antes para evitar "flash" de tema claro
  function getInitialTheme() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "light" || saved === "dark") return saved;
    } catch (e) { /* localStorage indisponível */ }
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    var btn = document.getElementById("themeToggle");
    if (btn) {
      var isDark = theme === "dark";
      btn.setAttribute("aria-pressed", isDark ? "true" : "false");
      btn.setAttribute(
        "aria-label",
        isDark ? "Mudar para modo claro" : "Mudar para modo escuro"
      );
      var label = btn.querySelector(".theme-label");
      if (label) label.textContent = isDark ? "Claro" : "Escuro";
    }
  }

  // Roda imediatamente (script é carregado no fim do body)
  applyTheme(getInitialTheme());

  document.addEventListener("DOMContentLoaded", function () {
    var ano = document.getElementById("ano");
    if (ano) ano.textContent = String(new Date().getFullYear());

    var toggle = document.getElementById("navToggle");
    var nav = document.querySelector(".site-nav");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }

    var themeBtn = document.getElementById("themeToggle");
    if (themeBtn) {
      // Garante que o estado visual do botão esteja sincronizado
      applyTheme(document.documentElement.getAttribute("data-theme") || "light");
      themeBtn.addEventListener("click", function () {
        var current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
        var next = current === "dark" ? "light" : "dark";
        applyTheme(next);
        try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* ignore */ }
      });
    }

    // Acompanha mudança da preferência do sistema, se o usuário não escolheu nada
    if (window.matchMedia) {
      var mq = window.matchMedia("(prefers-color-scheme: dark)");
      var handler = function (e) {
        var saved = null;
        try { saved = localStorage.getItem(STORAGE_KEY); } catch (err) { /* ignore */ }
        if (saved !== "light" && saved !== "dark") {
          applyTheme(e.matches ? "dark" : "light");
        }
      };
      if (mq.addEventListener) mq.addEventListener("change", handler);
      else if (mq.addListener) mq.addListener(handler);
    }
  });
})();