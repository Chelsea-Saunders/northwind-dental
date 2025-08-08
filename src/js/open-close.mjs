import requestAppointmentForm from "./request-appointment-form.mjs";


// TOGGLE ALL ROUND BUTTONS
function toggleModal (modalId, show = true) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.toggle("hidden", !show);
    modal.setAttribute("aria-hidden", String(!show));
    document.body.classList.toggle("modal-open", show);

    //  dynamically add appt modal
    if (show && modalId === "request-appt-modal") {
        const container = document.querySelector("#appointment-form-container");
        if (container && container.innerHTML.trim() === "") {
            container.innerHTML = requestAppointmentForm;
        }
    }

    if (show) {
        const focusableElements = modal.querySelectorAll(focusableSelectors);
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        // focus the first element
        firstElement?.focus();

        function trapTab(event) {
            if (event.key !== "Tab") return;

            if (event.shiftKey) {
                if(document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }
        }

        // add keydown for tab navigation
        modal.addEventListener("keydown", trapTab);

        // remove tab on modal close
        const removeTrapTab = () => {
            modal.removeEventListener("keydown", trapTab);
        };

        // remove tab on escape key
        const escListener = (event) => {
            if (event.key === "Escape") {
                toggleModal(modalId, false);
                removeTrapTab();
                document.removeEventListener("keydown", escListener);
            }
        };
        document.addEventListener("keydown", escListener);

        // remove tab trap on close button click
        modal.querySelectorAll(".close-modal").forEach(button => {
            button.addEventListener("click", removeTrapTab, { once: true });
        });
    }
}

// TOGGLE MODAL OPEN
document.querySelectorAll(".modal-button").forEach(button => {
    button.addEventListener("click", () => {
        const modalId = button.getAttribute("data-modal");
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove("hidden");
    });
});
//TOGGLE MODAL CLOSED
document.querySelectorAll(".close-modal").forEach(closeButton => {
    closeButton.addEventListener("click", () => {
        const modal = closeButton.closest(".modal");
        if (modal) modal.classList.add("hidden");
    });
});
// TOGGLE MENU CLOSED WITH ESCAPE KEY
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        document.querySelectorAll(".modal").forEach(modal => {
            modal.classList.add("hidden");
        });
    }
});

export function toggleClosed() {
    // CLOSE MODAL ON X OR ESCAPE
    document.addEventListener("click",(event) => {
        if (event.target.classList.contains("close-modal")) {
            const modal = event.target.closest(".modal");
            if (modal) {
                toggleModal(modal.id, false);
            }
        }
    });
    // escape key to close modal
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            document.querySelectorAll(".modal").forEach(modal => {
                toggleModal(modal.id, false);
            });
        }
    });
}