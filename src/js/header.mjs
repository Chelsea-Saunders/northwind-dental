
// function to toggle header visibility
export function toggleMenuHandler() {
    const toggleButton = document.querySelector("#toggle-menu");
    const nav = document.querySelector("#global-nav");

    if (!toggleButton || !nav) return;

    // toggle the class to show/hide the menu
    const isOpen = toggleButton.getAttribute("data-menu-open") === "true";
    toggleButton.setAttribute("data-menu-open", String(!isOpen));
    toggleButton.setAttribute("aria-expanded", String(!isOpen));

    nav.classList.toggle("open");
}