
import { toggleModal } from "./modal.mjs";

// WHAT EACH MODAL CONTENT WILL BE
const services = [
    {
        id: "preventative-content", 
        name: "Preventative Care", 
        img: "src/images/img-links/smile.png",
        alt: "Image of a bright smile", 
        description: "Regular exams, cleanings and preventative treatments keep your smile healthy.",
        list: [
            "Comprehensive Exams", 
            "Professional Cleanings", 
            "Fluoride Treatments",
            "Dental Sealants",
            "Oral Cancer Screenings",
            "X-rays"
        ]
    },
    {
        id: "restorative-content", 
        name: "Restorative Care", 
        img: "src/images/img-links/implants.png",
        alt: "Image of a dental implant bridge",
        description: "Restorative dentistry repairs and restores damaged or missing teeth.", 
        list: [
            "Fillings",
            "Same Day Crowns", 
            "Bridges", 
            "Implants"
        ]
    },
    {
        id: "emergency-content", 
        name: "Emergency Care",
        img: "src/images/img-links/emergency.png",
        alt: "Image of a person with a toothache",
        description: "We provide prompt care for dental emergencies to relieve pain and restore function.",
        list: [
            "Toothaches",
            "Chipped or Broken Teeth",
            "Lost Fillings or Crowns",
            "Abscesses",
            "Oral Trauma",
            "Root Canals", 
            "Extractions"
        ]
    },
    {
        id: "cosmetic-content", 
        name: "Cosmetic Dentistry",
        img: "src/images/img-links/whitening.png",
        alt: "Image of digitally whitened teeth",
        description: "Enhance your smile with our cosmetic dentistry services.",
        list: [
            "Teeth Whitening",
            "Veneers"
        ]
    },
    {
        id: "removable-content",
        name: "Removable Prosthetics",
        img: "src/images/img-links/dentures.png",
        alt: "Image of a set of dentures",
        description: "Custom-made dentures and partials to restore oral function and aesthetics.",
        list: [
            "Full Dentures",
            "Partial Dentures",
            "Implant-Supported Dentures", 
            "Flippers"
        ]
    }

]

// SERVICES OFFERED MODAL
const servicesOfferedModal = `
    <h2 id="services-h2">Services Offered</h2>
    <ul id="services-offered-list">
        <li>
            <div class="circle-img-wrapper modal-button" data-modal="preventative-content">
                <img src="src/images/img-links/smile.png" alt="Image of a bright smile" id="preventative" class="service-icon">
            </div>
            <h3 class="serv-h3">Preventative Care</h3>
        </li>
        <li>
            <div class="circle-img-wrapper modal-button" data-modal="restorative-content">
                <img src="src/images/img-links/implants.png" alt="Image of a dental implant bridge" id="restorative" class="service-icon">
            </div>
            <h3 class="serv-h3">Restorative Care</h3>
        </li>
        <li>
            <div class="circle-img-wrapper modal-button" data-modal="emergency-content">
                <img src="src/images/img-links/emergency.png" alt="Image of a person with a toothache" id="emergency" class="service-icon">
            </div>
            <h3 class="serv-h3">Emergency Care</h3>
        </li>
        <li>
            <div class="circle-img-wrapper modal-button" data-modal="cosmetic-content">
                <img src="src/images/img-links/whitening.png" alt="Image of digitally whitened teeth" id="whitening" class="service-icon">
            </div>
            <h3 class="serv-h3">Cosmetic Dentistry</h3>
        </li>
        <li>
            <div class="circle-img-wrapper modal-button" data-modal="removable-content">
                <img src="src/images/img-links/dentures.png" alt="Image of a set of dentures" id="removable" class="service-icon">
            </div>
            <h3 class="serv-h3">Removable Prosthetics</h3>
        </li>
    </ul>

`;

function buildModal(service) {
    return `
        <span class="close-modal" role="button" aria-label="Close Modal">&times;</span>
        <h2>${service.name}</h2>
        <img src="${service.img}" alt=${service.alt} class="service-img">
        <p>${service.description}</p>
        <ul class="feature-list">
            ${service.list.map(item => `<li>${item}</li>`).join("")}
        <ul>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    // create service list
    const container = document.getElementById("services-offered-container");

    container.innerHTML = servicesOfferedModal;

    // click handler for grid buttons
    container.querySelectorAll(".modal-button").forEach(button => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-modal");
            const service = services.find(serv => serv.id === modalId);

            if (service) {
                const modal = document.getElementById(modalId);
                const modalContent = modal.querySelector(".modal-content");
                modalContent.innerHTML = buildModal(service);
                toggleModal(modalId, true);
            }
        });
    });
});



// Build Modals from services array
services.forEach(service => {
    document.body.insertAdjacentHTML("beforeend", `
        <div id="${service.id}" class="modal hidden" aria-hidden="true">
            <div class="modal-content">
                <span class="close-modal" role="button" aria-label="Close Modal">&times;</span>
                <h3>${service.name}</h3>
                <img src="${service.img}" alt="${service.alt}" class="service-img">
                <p>${service.description}</p>
                <ul>
                    ${service.list.map(item => `<li>${item}</li>`).join("")}
                </ul>
            </div>
        </div>
    `);
});
// // CREATE SERVICE LIST
// document.getElementById("services-container").innerHTML = `
//     <h2 id=services-h2">Services Offered</h2>
//     <ul id="services-offered-list">
//         ${services.map(service => `
//             <li>
//                 <div class="circle-img-wrapper modal-button" data-modal="${service.id}">
//                     <img src="${service.img}" alt="${service.alt}" class="${service.id}">
//                 </div>
//                 <h3 class="serv-h3">${service.name}</h3>
//                 // <p>${service.description}</p>
//             </li>
//         `).join('')}
//     </ul>
// `;

// // BUILD MODAL
// services.forEach(service => {
//     document.body.insertAdjacentHTML("beforeend", `
//         <div id=${service.id} class="modal hidden" aria-hidden="true">
//             <div class="modal-content">
//                 <span class="close-modal" role"button" aria-label="Close Modal">&times;</span>
//                 <h3>${service.name}</h3>
//                 <p>${service.description}</p>
//                 <ul>
//                     ${service.list.map(item => `<li>${item}</li>`).join('')}
//                 </ul>
//             </div>
//         </div>
//     `);
// });

// // script appears when page loads (DOM)
// document.addEventListener("DOMContentLoaded", () => {
//     const container = document.getElementById("services-container");
//     if (container) {
//         container.innerHTML = servicesOfferedModal;
//     }
// });