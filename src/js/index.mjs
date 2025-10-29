import { registerModal } from "./modal.mjs";
import { buildAppointment } from "./contact.mjs";

function onDomReady(fn) {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
        fn();
    }
}

// Insurance Logos
const  premera = '/images/insurance-logos/premera-bluecross.png';
const cigna = '/images/insurance-logos/cigna-dental.png';
const bcbs = '/images/insurance-logos/bluecross-blueshield.png';
const moda = '/images/insurance-logos/moda.png';
const delta = '/images/insurance-logos/delta-dental.jpg';
const united = '/images/insurance-logos/united-concordia-dental.png';
const metlife = '/images/insurance-logos/metlife.png';
const aetna = '/images/insurance-logos/aetna.svg';

registerModal("request-appt-modal", buildAppointment);

// used for google reviews (API)
// const API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

// INSURANCE MODAL
function insuranceModal() {
    const logoContainer = document.getElementById("insurance-logos");
    const section = document.querySelector(".resnik-section");
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
    if (section) {
        const io = new IntersectionObserver(([entry]) => {
            section.classList.toggle("resnik-in", entry.isIntersecting);
        }, { threshold: 0.15 });
        io.observe(section);
    }
}

onDomReady(() => {
    registerModal("request-appt-modal", insuranceModal);
    requestAnimationFrame(insuranceModal);
})