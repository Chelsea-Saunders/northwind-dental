import { toggleMenuHandler } from "./header.mjs";
import { toggleModal } from "./modal.mjs";

// add event listener
document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.querySelector("#toggle-menu");

    if (toggleButton) {
        toggleButton.addEventListener("click", toggleMenuHandler);
    }
    
    // add event listeners for modal buttons
    document.querySelectorAll(".modal-button").forEach(button => {
        button.addEventListener("click", () => {
            const modalId = button.dataset.modal;
            if (modalId) toggleModal(modalId);
        });
    });
});