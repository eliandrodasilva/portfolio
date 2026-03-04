function toggleMenu() {
    var menu = document.getElementById("mobileMenu");
    var iconOpen = document.getElementById("menuIconOpen");
    var iconClose = document.getElementById("menuIconClose");
    var isOpen = menu.classList.contains("open");

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