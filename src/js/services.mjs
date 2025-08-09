
// SERVICES OFFERED MODAL
const servicesOfferedModal = `
    <h2 id="services-h2">Services Offered</h2>
    <ul id="services-offered-list">
        <li>
            <div class="circle-img-wrapper open-modal">
                <img src="src/images/img-links/smile.png" alt="Image of a bright smile" class="preventative-smile">
            </div>
            <h3 class="serv-h3">Preventative Care</h3>
        </li>
        <li>
            <div class="circle-img-wrapper open-modal">
                <img src="src/images/img-links/implants.png" alt="Image of a dental implant bridge" class="restorative">
            </div>
            <h3 class="serv-h3">Restorative Care</h3>
        </li>
        <li>
            <div class="circle-img-wrapper open-modal">
                <img src="src/images/img-links/emergency.png" alt="Image of a person with a toothache" class="emergency">
            </div>
            <h3 class="serv-h3">Emergency Care</h3>
        </li>
        <li>
            <div class="circle-img-wrapper open-modal">
                <img src="src/images/img-links/whitening.png" alt="Image of digitally whitened teeth" class="whitening">
            </div>
            <h3 class="serv-h3">Cosmetic Dentistry</h3>
        </li>
        <li>
            <div class="circle-img-wrapper open-modal">
                <img src="src/images/img-links/dentures.png" alt="Image of dentures" class="dentures">
            </div>
            <h3 class="serv-h3">Other Care</h3>
        </li>
    </ul>

`;

// script appears when page loads (DOM)
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("services-container");
    if (container) {
        container.innerHTML = servicesOfferedModal;
    }
});