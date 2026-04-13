const GITHUB_USERNAME = "eliandrodasilva";

let currentLocale = "pt-BR";
const localeMap = { "pt-BR": "ptbr", en: "en" };
const translations = {};

document.addEventListener("DOMContentLoaded", async () => {
  await loadTranslations(currentLocale);
  updateAllText();
  loadGithubData();
});

function toggleMenu() {
  var menu = document.getElementById("mobileMenu");
  var iconOpen = document.getElementById("menuIconOpen");
  var iconClose = document.getElementById("menuIconClose");
  var isOpen = menu.classList.contains("open");

  if (isOpen) {
    menu.classList.remove("open");
    iconOpen.style.display = "";
    iconClose.style.display = "none";
  } else {
    menu.classList.add("open");
    iconOpen.style.display = "none";
    iconClose.style.display = "";
  }
}

function closeMenu() {
  document.getElementById("mobileMenu").classList.remove("open");
  document.getElementById("menuIconOpen").style.display = "";
  document.getElementById("menuIconClose").style.display = "none";
}

async function loadTranslations(locale) {
  const folderName = localeMap[locale] || locale;
  try {
    const response = await fetch(`./json/i18n/${folderName}/index.json`);
    if (!response.ok)
      throw new Error(`Failed to load translations for ${locale}`);
    translations[locale] = await response.json();
  } catch (error) {
    console.error("Error loading translations:", error);
    translations[locale] = {};
  }
}

async function toggleLang() {
  currentLocale = currentLocale === "pt-BR" ? "en" : "pt-BR";
  document.documentElement.lang = currentLocale;

  var buttonText = currentLocale === "pt-BR" ? "EN" : "PT-BR";
  document.getElementById("langBtnDesktop").textContent = buttonText;
  document.getElementById("langBtnMobile").textContent = buttonText;

  await loadTranslations(currentLocale);
  updateAllText();
  loadGithubData();
}

function updateAllText() {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const value = getTranslation(key);

    if (value) {
      element.textContent = value;
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    const value = getTranslation(key);

    if (value) {
      element.placeholder = value;
    }
  });

  document.querySelectorAll("label[data-i18n-label]").forEach((element) => {
    const key = element.dataset.i18nLabel;
    const value = getTranslation(key);

    if (value) {
      element.textContent = value;
    }
  });
}

function getTranslation(key) {
  const value = key
    .split(".")
    .reduce((obj, i) => obj?.[i], translations[currentLocale]);

  return value || key;
}

async function loadGithubData() {
  const content = document.getElementById("githubContent");

  try {
    const userRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}`,
    );
    if (!userRes.ok) throw new Error("GitHub API error");
    const user = await userRes.json();

    renderGithubProfile(user);

    content.style.display = "block";
  } catch (err) {
    console.error("GitHub API error:", err);
  }
}

function renderGithubProfile(user) {
  document.getElementById("ghAvatar").src = user.avatar_url;
  document.getElementById("ghName").textContent = user.name || user.login;
  document.getElementById("ghLogin").textContent = `@${user.login}`;
  document.getElementById("ghRepos").textContent = user.public_repos;
  document.getElementById("ghFollowers").textContent = user.followers;
  document.getElementById("ghFollowing").textContent = user.following;
  document.getElementById("ghProfileLink").href = user.html_url;

  const bio = document.getElementById("ghBio");
  bio.textContent = user.bio || "";
  bio.style.display = user.bio ? "" : "none";

  if (user.location) {
    document.getElementById("ghLocationText").textContent = user.location;
    document.getElementById("ghLocation").style.display = "inline-flex";
  }
  if (user.company) {
    document.getElementById("ghCompanyText").textContent = user.company;
    document.getElementById("ghCompany").style.display = "inline-flex";
  }

  const joined = new Date(user.created_at);
  const label = currentLocale === "pt-BR" ? "Membro desde" : "Member since";
  document.getElementById("ghCreatedAt").textContent =
    `${label} ${joined.toLocaleDateString(currentLocale === "pt-BR" ? "pt-BR" : "en-US", { month: "long", year: "numeric" })}`;
}
