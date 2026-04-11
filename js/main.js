let currentLocale = 'pt-BR'
const localeMap = { 'pt-BR': 'ptbr', 'en': 'en' }
const translations = {}

document.addEventListener('DOMContentLoaded', async () => {
    await loadTranslations(currentLocale);
    updateAllText();
});

function toggleMenu() {
    var menu = document.getElementById('mobileMenu');
    var iconOpen = document.getElementById('menuIconOpen');
    var iconClose = document.getElementById('menuIconClose');
    var isOpen = menu.classList.contains('open');

    if (isOpen) {
        menu.classList.remove('open');
        iconOpen.style.display = '';
        iconClose.style.display = 'none';
    } else {
        menu.classList.add('open');
        iconOpen.style.display = 'none';
        iconClose.style.display = '';
    }
}

function closeMenu() {
    document.getElementById('mobileMenu').classList.remove('open');
    document.getElementById('menuIconOpen').style.display = '';
    document.getElementById('menuIconClose').style.display = 'none';
}

async function loadTranslations(locale) {
    const folderName = localeMap[locale] || locale;
    try {
        const response = await fetch(`./json/i18n/${folderName}/index.json`);
        if (!response.ok) throw new Error(`Failed to load translations for ${locale}`);
        translations[locale] = await response.json();
    } catch (error) {
        console.error('Error loading translations:', error);
        translations[locale] = {};
    }
}

async function toggleLang() {
    currentLocale = currentLocale === 'pt-BR' ? 'en' : 'pt-BR';
    document.documentElement.lang = currentLocale;

    var buttonText = currentLocale === 'pt-BR' ? 'EN' : 'PT-BR';
    document.getElementById("langBtnDesktop").textContent = buttonText;
    document.getElementById("langBtnMobile").textContent = buttonText;

    await loadTranslations(currentLocale);
    updateAllText();
}

function updateAllText() {
    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.dataset.i18n
        const value = getTranslation(key)

        if (value) {
            element.textContent = value
        }
    })

    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
        const key = element.dataset.i18nPlaceholder
        const value = getTranslation(key)

        if (value) {
            element.placeholder = value
        }
    })

    document.querySelectorAll("label[data-i18n-label]").forEach(element => {
        const key = element.dataset.i18nLabel
        const value = getTranslation(key)

        if (value) {
            element.textContent = value
        }
    })
}

function getTranslation(key) {
    const value = key
        .split('.')
        .reduce((obj, i) => obj?.[i], translations[currentLocale]);
    
    return value || key;
}