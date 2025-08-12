import { toggleMenuHandler } from "./header.mjs";
import { toggleModal } from "./modal.mjs";
import { buildAppointment } from "./request-appointment.mjs";

// add event listener
document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.querySelector("#toggle-menu");
    const apptFormContainer = document.querySelector("#appointment-form-container");

    // build toggle menu 
    if (toggleButton) {
        toggleButton.addEventListener("click", toggleMenuHandler);
    }

    // build appointment modal
    if (apptFormContainer) {
        buildAppointment(apptFormContainer);
    }
    
    // add event listeners for modal buttons
    document.addEventListener("click", (event) => {
        const button = event.target.closest(".modal-button, .contact-button-header");
        if (button) {
            const modalId = button.dataset.modal;
            if (modalId) {
                toggleModal(modalId);
            }
        }

        // close modal on X
        if (event.target.classList.contains("close-modal")) {
            const modal = event.target.closest(".modal");
            modal?.classList.add("hidden");
        }
    });
});