import { toggleMenu, closeMenu } from "./menu.js";
import { loadTranslations, updateAllText, toggleLang, currentLocale } from "./i18n.js";
import { loadGithubData } from "./github.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadTranslations(currentLocale);
  updateAllText();
  loadGithubData(currentLocale);

  document.getElementById("langBtnDesktop")
    .addEventListener("click", () =>
      toggleLang(() => loadGithubData(currentLocale))
    );

  document.getElementById("langBtnMobile")
    .addEventListener("click", () =>
      toggleLang(() => loadGithubData(currentLocale))
    );

  document.getElementById("menuToggle")
    .addEventListener("click", toggleMenu);

  document.querySelectorAll("#mobileMenu a")
    .forEach(link => {
      link.addEventListener("click", closeMenu);
    });
});