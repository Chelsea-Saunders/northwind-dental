import { toggleMenuHandler } from "./header.mjs";
import { toggleModal } from "./modal.mjs";
import { buildAppointment } from "./contact.mjs";

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
        const a = event.target.closest("a");
        if (!a) return;
        
        if (a.href && a.href.includes("/pdf-forms/")) return;
        if (a.getAttribute("target") === "_blank") return;
        if (a.hasAttribute("download")) return;
        if (a.hasAttribute("data-bypass")) return;

        const opener = event.target.closest('[data-modal="request-appt-modal"]');
        if (opener) {
            if (opener.tagName === "A") {
                event.preventDefault();
            }
            toggleModal("request-appt-modal", true);
            return;
        }
        
        // const button = event.target.closest(".modal-button, .contact-button-header");
        // if (button) {
        //     const modalId = button.dataset.modal;
        //     if (modalId) {
        //         toggleModal(modalId);
        //     }
        // }

        // // close modal on X
        // if (event.target.classList.contains("close-modal")) {
        //     const modal = event.target.closest(".modal");
        //     modal?.classList.add("hidden");
        // }
    });
});