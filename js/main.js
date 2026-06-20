/* Comportamentos globais: ano, menu mobile e tema */
(function () {
  "use strict";

  const STORAGE_KEY = "guia-tema";

  function getSavedTheme() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "light" || saved === "dark") {
        return saved;
      }
    } catch (error) {
      return null;
    }
    return null;
  }

  function getSystemTheme() {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  }

  function applyTheme(theme) {
    const isDark = theme === "dark";
    const toggle = document.querySelector("#themeToggle");

    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");

    if (!toggle) {
      return;
    }

    toggle.setAttribute("aria-pressed", isDark ? "true" : "false");
    toggle.setAttribute("aria-label", isDark ? "Mudar para modo claro" : "Mudar para modo escuro");

    const label = toggle.querySelector(".theme-label");
    if (label) {
      label.textContent = isDark ? "Claro" : "Escuro";
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
      return;
    }
  }

  function setYear() {
    const year = document.querySelector("#ano");
    if (year) {
      year.textContent = String(new Date().getFullYear());
    }
  }

  function setupThemeToggle() {
    const toggle = document.querySelector("#themeToggle");
    if (!toggle) {
      return;
    }

    applyTheme(document.documentElement.getAttribute("data-theme") || "light");

    toggle.addEventListener("click", function () {
      const currentTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
      saveTheme(nextTheme);
    });
  }

  function setupSystemThemeObserver() {
    if (!window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = function (event) {
      if (!getSavedTheme()) {
        applyTheme(event.matches ? "dark" : "light");
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
    }
  }

  function setupMobileNav() {
    const nav = document.querySelector("#siteNav");
    const toggle = document.querySelector("#navToggle");

    if (!nav || !toggle) {
      return;
    }

    function closeNav() {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menu");
    }

    function openNav() {
      nav.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Fechar menu");
    }

    toggle.addEventListener("click", function () {
      if (nav.classList.contains("is-open")) {
        closeNav();
      } else {
        openNav();
      }
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("click", function (event) {
      if (window.innerWidth > 720) {
        return;
      }

      if (!nav.contains(event.target) && !toggle.contains(event.target)) {
        closeNav();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 720) {
        closeNav();
      }
    });
  }

  applyTheme(document.documentElement.getAttribute("data-theme") || getSavedTheme() || getSystemTheme());

  document.addEventListener("DOMContentLoaded", function () {
    setYear();
    setupThemeToggle();
    setupSystemThemeObserver();
    setupMobileNav();
  });
})();
