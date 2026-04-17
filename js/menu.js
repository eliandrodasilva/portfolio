export function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  const isOpen = menu.classList.contains("open");
  setMenuState(!isOpen);
}

export function closeMenu() {
  setMenuState(false);
}

function setMenuState(open) {
  const menu = document.getElementById("mobileMenu");
  const iconOpen = document.getElementById("menuIconOpen");
  const iconClose = document.getElementById("menuIconClose");

  menu.classList.toggle("open", open);
  iconOpen.style.display = open ? "none" : "";
  iconClose.style.display = open ? "" : "none";
}