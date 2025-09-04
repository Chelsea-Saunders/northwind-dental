import { registerModal } from "./modal.mjs";
import { buildAppointment } from "./contact.mjs";

registerModal("request-appt-modal", buildAppointment);

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
        { name: "Premera Blue Cross", src: "./src/images/insurance-logos/premera-bluecross.png", alt: "Premera Blue Cross Insurance Logo" },
        { name: "cigna-dental", src: "./src/images/insurance-logos/cigna-dental.png", alt: "Cigna Dental Insurance Logo" },
        { name: "bluecross-blueshield", src: "./src/images/insurance-logos/bluecross-blueshield.png", alt: "Blue Cross Blue Shield Insurance Logo" },
        { name: "moda-health", src: "./src/images/insurance-logos/moda.png", alt: "Moda Health Insurance Logo" },
        { name: "delta-dental", src: "./src/images/insurance-logos/delta-dental.jpg", alt: "Delta Dental Insurance Logo" },
        { name: "united-concordia-dental", src: "./src/images/insurance-logos/united-concordia-dental.png", alt: "United Concordia Dental Insurance Logo" },
        { name: "metlife", src: "./src/images/insurance-logos/metlife.png", alt: "MetLife Insurance Logo" }, 
        { name: "aetna", src: "./src/images/insurance-logos/aetna.svg", alt: "Aetna Insurance Logo" }
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