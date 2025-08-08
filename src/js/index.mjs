
import { requestAppointmentForm } from "./request-appointment.mjs";

const focusableSelectors = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

// MUTE/UNMUTE LOGIC
function initYouTubePlayer() {
    const speakerToggle = document.querySelector("#speaker-toggle");
    const iframe = document.querySelector("#youtube-video");
    if (!iframe || ! speakerToggle) {
        console.log("YouTube iframe or speaker toggle not found");
        return;
    }

    let isMuted = true;

    speakerToggle.addEventListener("click", function() {
        console.log("speaker icon clicked");
        if (isMuted) {
            console.log("unmuting and replacing iframe");
            // replace iframe with unmuted version
            const newIframe = iframe.cloneNode(true);
            newIframe.src = iframe.src.replace("mute=1", "mute=0");
            iframe.parentNode.replaceChild(newIframe, iframe);

            speakerToggle.classList.remove("muted");
        } else {
            console.log("muting and replacing iframe");
            //reload muted version
            const newIframe = iframe.cloneNode(true);
            newIframe.src = iframe.src.replace("mute=0", "mute=1");
            iframe.parentNode.replaceChild(newIframe, iframe);

            speakerToggle.classList.add("muted");
        }
        isMuted = !isMuted;
    });
}

// RESNIK IMPLANT INSTITUTE ...READ MORE CLICK
function toggleReadMoreResnik() {
    const moreText = document.querySelector (".more-text-resnik");
    const toggleButton = document.querySelector("#read-more-resnik-toggle");
    const modalContent = document.querySelector(".resnik-modal-content");

    if (moreText && toggleButton && modalContent) {
        moreText.classList.toggle("hidden");
        moreText.style.opacity = "1";
        toggleButton.style.display = "none";
        toggleButton.setAttribute("aria-expanded", "true");

        modalContent.classList.toggle("initial-state");
        modalContent.classList.add("expanded-state");
    }
    return false; // Prevent default action if needed
}

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

// INSURANCE MODAL
function insuranceModal() {
    const insuranceLogos = [
        { name: "Premera Blue Cross", src: "./src/images/insurance-logos/premera-bluecross.png", alt: "Premera Blue Cross Insurance Logo" },
        { name: "cigna-dental", src: "./src/images/insurance-logos/cigna-dental.png", alt: "Cigna Dental Insurance Logo" },
        { name: "bluecross-blueshield", src: "./src/images/insurance-logos/bluecross-blueshield.png", alt: "Blue Cross Blue Shield Insurance Logo" },
        { name: "moda-health", src: "./src/images/insurance-logos/moda.png", alt: "Moda Health Insurance Logo" },
        { name: "delta-dental", src: "./src/images/insurance-logos/delta-dental.jpg", alt: "Delta Dental Insurance Logo" },
        { name: "united-concordia-dental", src: "./src/images/insurance-logos/united-concordia-dental.png", alt: "United Cordia Dental Insurance Logo" },
        { name: "metlife", src: "./src/images/insurance-logos/metlife.png", alt: "MetLife Insurance Logo" }, 
        { name: "aetna", src: "./src/images/insurance-logos/aetna.svg", alt: "Aetna Insurance Logo" }
    ];

    const logoContainer = document.getElementById("insurance-logos");
    logoContainer.innerHTML = ""; // Clear existing logos
    insuranceLogos.forEach(logo => {
        const img = document.createElement("img");
        img.src = logo.src;
        img.alt = logo.alt;
        logoContainer.appendChild(img);
    });
}
// // TOGGLE MODAL OPEN
// button.addEventListener("click", () => {
//     const modalId = button.getAttribute("data-modal");
//     toggleModal(modalId, true);
// });

// //TOGGLE MODAL CLOSED
// closeButton.addEventListener("click", () => {
//     const modal = closeButton.closest(".modal");
//     if (modal) {
//         toggleModal(modal.id, false);
//     }
// });
// document.querySelectorAll(".modal-button").forEach(button => {
//     button.addEventListener("click", () => {
//         const modalId = button.getAttribute("data-modal");
//         const modal = document.getElementById(modalId);
//         if (modal) modal.classList.remove("hidden");
//     });
// });
// //TOGGLE MODAL CLOSED
// document.querySelectorAll(".close-modal").forEach(closeButton => {
//     closeButton.addEventListener("click", () => {
//         const modal = closeButton.closest(".modal");
//         if (modal) modal.classList.add("hidden");
//     });
// });
// // TOGGLE MENU CLOSED WITH ESCAPE KEY
// document.addEventListener("keydown", event => {
//     if (event.key === "Escape") {
//         document.querySelectorAll(".modal").forEach(modal => {
//             modal.classList.add("hidden");
//         });
//     }
// });

// REQUEST APPOINTMENT MODAL 
// MAKE APPT MODAL TEXTAREA AUTO-RESIZE
document.querySelectorAll("textarea").forEach(textarea => {
    textarea.addEventListener("input", () => {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    });
});
// error handling for required fields
function validateForm(form) {
    const requiredFields = form.querySelectorAll("[required]");
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add("error");
            isValid = false;
        } else {
            field.classList.remove("error");
        }

        // email validation
        if (field.type === "email" && !validateEmail(field.value)) {
            field.classList.add("error");
            isValid = false;
        } 
        // phone number formatting
        if (field.type === "tel" && field.value.replace(/\D/g, "").length < 10) {
            field.classList.add("error");
            isValid = false;
        }
    });
    return isValid;
}
// function to make text area auto-size
function autoGrowTextarea(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
}
// VALIDATE EMAIL FORMAT
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// VALIDATE PHONE NUMBER FORMAT
function formatPhoneNumberString(input) {
    //only get numbers
    // const input = event.target.value;
    const numbers = input.replace(/\D/g, ""); // removes anything that isn't a digit

    // format as 123-456-7890
    let formatted = "";

    if (numbers.length > 0) {
        formatted += numbers.substring(0, 3);
    }
    if (numbers.length >= 4) {
        formatted += "-" + numbers.substring(3, 6);
    }
    if (numbers.length >= 7) {
        formatted += "-" + numbers.substring(6, 10);
    }
    // set the formatted value back to the input
    return formatted;
}
// input event handler (for live formatting)
function formatPhoneNumber(event) {
    event.target.value = formatPhoneNumberString(event.target.value);
}
// CLEAR FORM FIELDS
function clearFormFields(form) {
    form.querySelectorAll("input, textarea, select").forEach(field => {
        if (field.type === "checkbox" || field.type === "radio") {
            field.checked = false;
        } else {
            field.value = "";
        }
        field.classList.remove("error");
    });
}
// SUBMISSION MESSAGE
function showSubmissionMessage(message) {
    const messageContainer = document.createElement("div");
    messageContainer.className = "submission-message";
    messageContainer.textContent = message;
    document.body.appendChild(messageContainer);

    setTimeout(() => {
        messageContainer.remove();
    }, 2000);
}

// INIT FUNCTION TO ATTACH EVENT LISTENERS
function init() {
    const readMoreButton = document.querySelector("#read-more-toggle");
    const readMoreResnikButton = document.querySelector("#read-more-resnik-toggle");
    const form = document.querySelector("#appointment-form");
    const phoneInput = form?.querySelector("#appt-form-phone");

    // event listener for toggleReadMore
    if (readMoreButton) {
        readMoreButton.addEventListener("click", toggleReadMore);
    }

    // event listener for toggleReadMoreResnik
    if (readMoreResnikButton) {
        readMoreResnikButton.addEventListener("click", toggleReadMoreResnik);
    }

    // event listeners for modal buttons
    document.querySelectorAll(".modal-button").forEach(button => {
        button.addEventListener("click", () => {
            const modalId = button.dataset.modal;
            console.log("open static modal:", modalId);
            toggleModal(modalId, true);
        });
    });

    // Make appointment form textarea auto-resize
    document.addEventListener("input", event => {
        if (event.target.id === "appt-form-message") {
            autoGrowTextarea(event.target);
        }
    })
    
    // event listener for clear page
    const clearButton = document.querySelector(".clear-form-button");
    if (clearButton) {
        clearButton.addEventListener("click", () => {
            const form = document.querySelector(".appointment-form");
            if (form) {
                clearFormFields(form);
            }
        });
    }

    // event listener for phone number formatting
    if (phoneInput) {
        phoneInput.addEventListener("input", formatPhoneNumber);
    }
    // submit validation
    if (form) {
        form.addEventListener("submit", event => {
            event.preventDefault();
            if (validateForm(form)) {
                // if valid, show success message
                showSubmissionMessage("Form submitted successfully!");
                clearFormFields(form);
            } else {
                // if invalid, show error message
                showSubmissionMessage("Please fix the errors in the form.");
            }
        })
    }

}

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

//DOMContent Loaded Event
document.addEventListener("DOMContentLoaded", () => {

    setTimeout(() => {
        initYouTubePlayer();
    }, 300);

    //  toggle insurance modal
    insuranceModal();

    // run init after form is inserted
    init();
});
