const localeMap = { "pt-BR": "ptbr", en: "en" };
const translations = {};
export let currentLocale = "pt-BR";

export async function loadTranslations(locale) {
  const folderName = localeMap[locale] || locale;
  try {
    const response = await fetch(`./json/i18n/${folderName}/index.json`);
    if (!response.ok) throw new Error(`Failed to load translations for ${locale}`);
    translations[locale] = await response.json();
  } catch (error) {
    console.error("Error loading translations:", error);
    translations[locale] = {};
  }
}

export function getTranslation(key) {
  return (
    key.split(".").reduce((obj, i) => obj?.[i], translations[currentLocale]) || key
  );
}

export function updateAllText() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const value = getTranslation(el.dataset.i18n);
    if (value) el.textContent = value;
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const value = getTranslation(el.dataset.i18nPlaceholder);
    if (value) el.placeholder = value;
  });

  document.querySelectorAll("label[data-i18n-label]").forEach((el) => {
    const value = getTranslation(el.dataset.i18nLabel);
    if (value) el.textContent = value;
  });
}

export async function toggleLang(onAfterChange) {
  currentLocale = currentLocale === "pt-BR" ? "en" : "pt-BR";
  document.documentElement.lang = currentLocale;

  const buttonText = currentLocale === "pt-BR" ? "EN" : "PT-BR";
  document.getElementById("langBtnDesktop").textContent = buttonText;
  document.getElementById("langBtnMobile").textContent = buttonText;

  await loadTranslations(currentLocale);
  updateAllText();

  onAfterChange?.();
}