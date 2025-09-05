import { registerModal } from "./modal.mjs";
import { buildAppointment } from "./contact.mjs";
import premera   from '../images/insurance-logos/premera-bluecross.png';
import cigna     from '../images/insurance-logos/cigna-dental.png';
import bcbs      from '../images/insurance-logos/bluecross-blueshield.png';
import moda      from '../images/insurance-logos/moda.png';
import delta     from '../images/insurance-logos/delta-dental.jpg';
import united    from '../images/insurance-logos/united-concordia-dental.png';
import metlife   from '../images/insurance-logos/metlife.png';
import aetna     from '../images/insurance-logos/aetna.svg';


registerModal("request-appt-modal", buildAppointment);

// used for google reviews (API)
const API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
const container = document.getElementById("reviews-container");

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
// INSURANCE MODAL
function insuranceModal() {
    const logoContainer = document.getElementById("insurance-logos");
    if (!logoContainer) return;

    const insuranceLogos = [
        { name: "Premera Blue Cross", src: premera, alt: "Premera Blue Cross Insurance Logo" },
        { name: "cigna-dental", src: cigna, alt: "Cigna Dental Insurance Logo" },
        { name: "bluecross-blueshield", src: bcbs, alt: "Blue Cross Blue Shield Insurance Logo" },
        { name: "moda-health", src: moda, alt: "Moda Health Insurance Logo" },
        { name: "delta-dental", src: delta, alt: "Delta Dental Insurance Logo" },
        { name: "united-concordia-dental", src: united, alt: "United Concordia Dental Insurance Logo" },
        { name: "metlife", src: metlife, alt: "MetLife Insurance Logo" }, 
        { name: "aetna", src: aetna, alt: "Aetna Insurance Logo" }
    ];

    logoContainer.innerHTML = "";
    insuranceLogos.forEach(logo => {
        const img = document.createElement("img");
        img.src = logo.src;
        img.alt = logo.alt;
        img.loading = "lazy";
        img.decoding = "async";
        logoContainer.appendChild(img);
    });
}

// GOOGLE REVIEWS

// fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=YOUR_PLACE_ID&key=${API_KEY}`)
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.error(error));

//DOMContent Loaded Event
document.addEventListener("DOMContentLoaded", () => {

    // setTimeout( initYouTubePlayer, 300);
    // setTimeout( onYouTubeIframeAPIReady, 300);
    requestAnimationFrame(insuranceModal);
    insuranceModal();

    document.querySelector("#read-more-resnik-toggle")?.addEventListener("click", (event) => {
        event.preventDefault();
        toggleReadMoreResnik();
    });
});