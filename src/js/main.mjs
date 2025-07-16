import { toggleMenuHandler } from "./header.mjs";

// add event listener
document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.querySelector("#toggle-menu");
    if (toggleButton) {
        toggleButton.addEventListener("click", toggleMenuHandler);
    }
});