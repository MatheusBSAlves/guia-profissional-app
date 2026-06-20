/* Aplica o tema antes da pagina renderizar para evitar flash visual */
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

  const initialTheme = getSavedTheme() || getSystemTheme();
  document.documentElement.setAttribute("data-theme", initialTheme);
})();
