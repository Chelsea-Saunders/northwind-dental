import { registerModal } from "./modal.mjs";
import { buildAppointment } from "./request-appointment.mjs";

registerModal("request-appt-modal", buildAppointment);

// MUTE/UNMUTE LOGIC
function initYouTubePlayer() {
    const speakerToggle = document.querySelector("#speaker-toggle");
    let iframe = document.querySelector("#youtube-video");
    if (!iframe || ! speakerToggle) return;

    let isMuted = true;

    speakerToggle.addEventListener("click", () => {
        const nextSrc = iframe.src.replace(
            isMuted ? "mute=0" : "mute=1",
            isMuted ? "mute=1" : "mute=0"
        )
        const newIframe = iframe.cloneNode(true);
        newIframe.src = nextSrc;

        iframe.parentNode.replaceChild(newIframe, iframe);
        iframe = newIframe;

        speakerToggle.classList.toggle("muted", isMuted);
        speakerToggle.setAttribute("aria-pressed", String(!isMuted));
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

//DOMContent Loaded Event
document.addEventListener("DOMContentLoaded", () => {

    setTimeout( initYouTubePlayer, 300);
    requestAnimationFrame(insuranceModal);
    insuranceModal();

    document.querySelector("#read-more-resnik-toggle")?.addEventListener("click", (event) => {
        event.preventDefault();
        toggleReadMoreResnik();
    });
});