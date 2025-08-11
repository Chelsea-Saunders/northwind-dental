import { toggleMenuHandler } from "./header.mjs";
import { toggleModal } from "./modal.mjs";

// add event listener
document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.querySelector("#toggle-menu");

    if (toggleButton) {
        toggleButton.addEventListener("click", toggleMenuHandler);
    }
    
    // add event listeners for modal buttons
    document.addEventListener("click", (event) => {
        const button = event.target.closest(".modal-button");
        if (button) {
            const modalId = button.dataset.modal;
            if (modalId) {
                toggleModal(modalId);
            }
        }
    });

    // // temporary:
    // document.addEventListener("click", (event) => {
    //     console.log("clicked element:", event.target);
    //     console.log("found modal button:", event.target.closest(".modal-button"));
    // })
});