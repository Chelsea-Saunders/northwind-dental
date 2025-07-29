
import { requestAppointmentForm } from "./global.mjs";

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

// WELCOME MESSAGE ...READ MORE CLICK
function toggleReadMore() {
    const moreText = document.querySelector(".more-text");
    const toggleButton = document.querySelector(".read-more");
    const modalContent = document.querySelector(".welcome-modal-content");

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
// MODAL CONTENT FOR ALL ROUND BUTTONS
const modalContent = {
    "insurance-modal": `
        <button class="close-modal" aria-label="Close modal">&times;</button>
        <h2 class="modal-h2">Insurance</h2>
        <p class="modal-p">We accept this wide range of insurance plans</p>
        <ul class="ins-ul-img">
            <li class="ins-li"><img src="./images/cigna-dental.png" alt="Cigna Dental Logo" class="cigna"></li>
            <li class="ins-li"><img src="./images/bluecross-blueshield.png" alt="Blue Cross Blue Shield Logo" class="bcbs"></li>
            <li class="ins-li"><img src="./images/delta-dental_moda-health.png" alt="Delta Dental Logo" class="delta"></li>
            <li class="ins-li"><img src="./images/united-concordia-dental.png" alt="United Concordia Dental Logo" class="ucd"></li>
            <li class="ins-li"><img src="./images/metlife.png" alt="MetLife Logo" class="metlife"></li>
            <li class="ins-li"><img src="./images/premera-bluecross.png" alt="Premera Blue Cross Logo" class="premera"></li>
        </ul>
        <button class="contact-us-button" onclick="window.location.href='#'" aria-label="Contact Us">Contact Us</button>
        `,
        "google-reviews-modal": `
        <button class="close-modal" aria-label="Close modal">&times;</button>
        <h2 class="modal-h2">Google Reviews</h2>
        <p class="modal-p">Here's what our patients are saying about us:</p>
        <p><a href="https://www.google.com/search?q=Northwind+Dental+Wasilla+alaska&sca_esv=9dae32fe7ce8d20d&ei=1QCAaIz6Af290PEPsZ7sqQ8&ved=0ahUKEwjMuMrlstGOAxX9HjQIHTEPO_UQ4dUDCBA&uact=5&oq=Northwind+Dental+Wasilla+alaska&gs_lp=Egxnd3Mtd2l6LXNlcnAiH05vcnRod2luZCBEZW50YWwgV2FzaWxsYSBhbGFza2EyBhAAGBYYHjILEAAYgAQYhgMYigUyCxAAGIAEGIYDGIoFMgsQABiABBiGAxiKBTIIEAAYgAQYogQyCBAAGIAEGKIEMgUQABjvBUi5KVC6BVjEJHABeACQAQCYAWqgAboLqgEEMTkuMbgBA8gBAPgBAZgCFaACgQzCAgsQABiABBiwAxiiBMICCxAAGLADGKIEGIkFwgIIEAAYsAMY7wXCAgUQIRigAcICBRAhGKsCwgIIEAAYogQYiQWYAwCIBgGQBgSSBwQyMC4xoAfVYrIHBDE5LjG4B_0LwgcGMC4xNy40yAcy&sclient=gws-wiz-serp#lrd=0x56c8e0843c7feec1:0x7dcaf09dba0957df,1,,,,"
            target="_blank" 
            rel="noopener noreferrer">
            Read our Google Reviews
            </a></p>
        `,
        "services-offered-modal": `
        <button class="close-modal" aria-label="Close modal">&times;</button>
        <h2 class="modal-h2">Services</h2>
        <p class="modal-p">We offer a wide range of dental services to meet your needs:</p>
        <p><a href="services.html" class="services-link" aria-label="Services">Services Offered</a></p>
        `,
        "meet-the-team-modal": `
        <button class="close-modal" aria-label="Close modal">&times;</button>
        <h2 class="modal-h2">Meet the Team</h2>
        <p class="modal-p">Our dedicated team is here to provide you with the best dental care:</p>
        <p><a href="team.html" class="meet-team-link" aria-label="Meet the Team">Meet the Team</a></p>
        `,
        "request-appt-modal": requestAppointmentForm
}
// OPEN MODAL FOR ALL ROUND BUTTONS
function openModal(modalType) {
    const content = modalContent[modalType];

    console.log("modal type:", modalType);
    console.log("modal content:", content);

    if (!content) {
        console.warn("no content found for modal:", modalType);
        return;
    }

    // create modal element
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
        <div class="modal-box">
            <button class="close-modal" aria-label="Close modal">&times;</button>
            ${content}
        </div>
    `;

    // add modal to DOM
    document.body.appendChild(modal);

    const closeButton = modal.querySelector(".close-modal");
    document.body.classList.add("modal-open");

    const focusableElements = modal.querySelectorAll(focusableSelectors);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // tab navigation within the modal
    if (firstElement && lastElement) {
        firstElement.focus();

        modal.addEventListener("keydown", function(event) {
            if (event.key === "Tab") {
                if (event.shiftKey) {
                    // shift + tab
                    if (document.activeElement === firstElement) {
                        event.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    // tab only
                    if (document.activeElement === lastElement) {
                        event.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }


    // close button
    function closeModal() {
        modal.remove();
        document.body.classList.remove("modal-open");
        document.removeEventListener("keydown", escapeListener);
    }

    // close with button
    closeButton.addEventListener("click", closeModal);
 
    // close modal with escape key
    function escapeListener(event) {
        if (event.key === "Escape") {
            closeModal();
        }
    }
    document.addEventListener("keydown", escapeListener);
}
    

// INIT FUNCTION TO ATTACH EVENT LISTENERS
function init() {
    // const speaker = document.querySelector(".speaker-icon");
    const readMoreButton = document.querySelector("#read-more-toggle");
    const readMoreResnikButton = document.querySelector("#read-more-resnik-toggle");

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
            const modalType = button.dataset.modal;
            console.log("Modal button clicked:", modalType);
            openModal(modalType);
        });
    });
}
init();

//DOMContent Loaded Event
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded");

    setTimeout(() => {
        console.log("running initYouTubePlayer()");
        initYouTubePlayer();
    }, 300);
});





/* <ul class="services-list">
            <li class="service-item" id="preventative">Preventitive Care</li>
            <li class="service-item">Dental Cleanings</li>
            <li class="service-item">Comprehensive Oral Exams</li>
            <li class="service-item">Digital X-rays</li>
            <li class="service-item">Floride Treatments</li>
            <li class="service-item">Dental Sealants</li>
            
            <li class="service-item" id="resotrative">Restorative Care</li>
            <li class="service-item">Fillings</li>
            <li class="service-item">Crowns</li>
            <li class="service-item">Bridges</li>
            <li class="service-item">Dentures(partial and full)</li>
            <li class="service-item">Root Canals Therapy</li>
            <li class="service-item">Dental Implants</li>
            
            <li class="service-item" id="cosmetic">Cosmetic Care</li>
            <li class="service-item">Teeth Whitening</li>
            <li class="service-item">Porcelain Veneers</li>

            <li class="service-item" id="periodontal">Periodontal Care</li>
            <li class="service-item">Gum Disease Treatment</li>
            <li class="service-item">Deep Cleanings</li>
            <li class="service-item">Periodontal Maintenance</li>

            <li class="service-item" id="emergency">Emergency Care</li>
            <li class="service-item">Same-Day Appointments</li>
            <li class="service-item">Tooth Extractions</li>
            <li class="service-item">Pain Management</li>
            <li class="service-item">Trauma Care</li>

            <li class="service-item" id="sedation">Sedation Options</li>
            <li class="service-item">Nitrous Oxide</li>
            <li class="service-item">Oral Sedation</li>
            <li class="service-item">IV Sedation</li>
        </ul> */