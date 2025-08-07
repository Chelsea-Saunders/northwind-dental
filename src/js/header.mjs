
// function to toggle header visibility
export function toggleMenuHandler() {
    const toggleButton = document.querySelector("#toggle-menu");
    const nav = document.querySelector("#global-nav");
    const header = document.querySelector(".global-header");

    if (!toggleButton || !nav || !header) return;

    // toggle the class to show/hide the menu
    const isOpen = toggleButton.getAttribute("data-menu-open") === "true";
    toggleButton.setAttribute("data-menu-open", String(!isOpen));
    toggleButton.setAttribute("aria-expanded", String(!isOpen));

    nav.classList.toggle("open");
    toggleButton.classList.toggle("open");
    header.classList.toggle("menu-open");
}