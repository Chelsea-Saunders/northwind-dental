
// SERVICES OFFERED MODAL
const servicesOfferedModal = `
    <span class="close-modal" aria-label="Close Modal">&times;</span>
    <h2 id="services-h2">Services Offered</h2>
    <ul id="services-offered-list">
        <li>
            <div class="circle-img-wrapper open-modal">
                <img src="" alt="" class="">
            </div>
            <h3>Preventative Care</h3>
        </li>
        <li>
            <div class="circle-img-wrapper open-modal">
                <img src="" alt="" class="">
            </div>
            <h3>Restorative Care</h3>
        </li>
        <li>
            <div class="circle-img-wrapper open-modal">
                <img src="" alt="" class="">
            </div>
            <h3>Emergency Care</h3>
        </li>
        <li>
            <div class="circle-img-wrapper open-modal">
                <img src="" alt="" class="">
            </div>
            <h3>Cosmetic Dentistry</h3>
        </li>
        <li>
            <div class="circle-img-wrapper open-modal">
                <img src="" alt="" class="">
            </div>
            <h3>Other Care</h3>
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