// 📌 Elementy
const menuBtn = document.getElementById("side-barMenu");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const exitBtn = document.getElementById("exit-btn");
const dropdownMenuBtn = document.getElementById("dropdown-menu-btn");
const menuLink = document.getElementById("menu-link");
const dropdownMenuLi = document.getElementById("mainDropdown-menu-li");
const dropdownMenu = sidebar.querySelector(".submenu");
const mainDropdownMenu = document.getElementById("dropdown-menu");

// 🔧 Funkcja przełączania sidebara
function toggleSidebar() {
  const isActive = sidebar.classList.toggle("sidebar-active");
  overlay.classList.toggle("overlay-active");
  let removeFocusTrap;
  if (isActive) {
    sidebar.removeAttribute("inert");
    sidebar.setAttribute("aria-hidden", "false");
    menuBtn.setAttribute("aria-expanded", "true");
    exitBtn.setAttribute("aria-expanded", "true");
    removeFocusTrap = trapFocus(sidebar);
  } else {
    sidebar.setAttribute("inert", "");
    sidebar.setAttribute("aria-hidden", "true");
    menuBtn.setAttribute("aria-expanded", "false");
    exitBtn.setAttribute("aria-expanded", "false");
    removeFocusTrap();
  }
}
function toogleDropDownMenu() {
  const isActive = dropdownMenuLi.classList.toggle("main-dropdown-menu-active");
  if (isActive) {
    mainDropdownMenu.removeAttribute("inert");
    mainDropdownMenu.setAttribute("aria-hidden", "false");
    menuLink.setAttribute("aria-expanded", "true");
    menuLink.setAttribute("aria-label", "zamknij rozwijane menu");
    return;
  }
  mainDropdownMenu.setAttribute("inert", "");
  mainDropdownMenu.setAttribute("aria-hidden", "true");
  menuLink.setAttribute("aria-expanded", "false");
  menuLink.setAttribute("aria-label", "Otwórz rozwijane menu inne usługi");
}

menuLink.addEventListener("click", toogleDropDownMenu);
// 🔧 Funkcja przełączania dropdowna w sidebarze

function toggleDropdown() {
  const isActive = dropdownMenuBtn.classList.toggle("dropdown-menu-active");
  dropdownMenu.hidden = !isActive;

  if (isActive) {
    dropdownMenu.removeAttribute("inert");
    dropdownMenuBtn.setAttribute("aria-expanded", "true");
    dropdownMenuBtn.setAttribute("aria-label", "zamknij rozwijane menu");
  } else {
    dropdownMenu.setAttribute("inert", "");
    dropdownMenuBtn.setAttribute("aria-expanded", "false");
    dropdownMenuBtn.setAttribute(
      "aria-label",
      "Otwórz rozwijane menu inne usługi"
    );
  }
}

// 🧭 Zdarzenia kliknięcia
exitBtn.addEventListener("click", (e) => {
  exitBtn.blur();
  e.stopPropagation();
  toggleSidebar();
});
menuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleSidebar();
});
dropdownMenuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleDropdown();
});

overlay.addEventListener("click", toggleSidebar);
const imageButton = document.querySelector('img[role="button"]');

imageButton.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault(); // zapobiega scrollowaniu przy spacji
    imageButton.click();
  }
});
document.addEventListener("click", (e) => {
  // zamykanie sidebaru kliknięciem poza
  if (
    sidebar.classList.contains("sidebar-active") &&
    !sidebar.contains(e.target) &&
    !menuBtn.contains(e.target)
  ) {
    toggleSidebar();
  }
  if (
    dropdownMenuLi.classList.contains("main-dropdown-menu-active") &&
    !mainDropdownMenu.contains(e.target) &&
    !menuLink.contains(e.target)
  ) {
    toogleDropDownMenu();
  }
  if (
    dropdownMenuBtn.classList.contains("dropdown-menu-active") &&
    !dropdownMenu.contains(e.target) &&
    !dropdownMenuBtn.contains(e.target)
  ) {
    // zamykanie dropdowna kliknięciem poza
    toggleDropdown();
  }
});

function trapFocus(container) {
  const focusableElements = container.querySelectorAll(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );
  const firstEl = focusableElements[0];
  const lastEl = focusableElements[focusableElements.length - 1];

  function handleKeyDown(e) {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    }
  }

  container.addEventListener("keydown", handleKeyDown);

  // Opcjonalnie ustaw fokus na pierwszy element
  firstEl.focus();

  // Zwracamy funkcję do usunięcia listenera
  return () => {
    container.removeEventListener("keydown", handleKeyDown);
  };
}
