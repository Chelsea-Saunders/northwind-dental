
// SERVICES OFFERED MODAL
const servicesOfferedModal = `
    <span class="close-modal" aria-label="Close Modal">&times;</span>
    <h2 id="services-h2">Services Offered</h2>
    <ul id="services-offered-list">
        <li>
            <div class="circle-img-wrapper open-modal">
                <img src="" alt="" class-"">
            </div>
            <h3>Preventative Care</h3>
        </li>
        <li>
            <div class="circle-img-wrapper open-modal">
                <img src="" alt="" class-"">
            </div>
            <h3>Restorative Care</h3>
        </li>
        <li>
            <div class="circle-img-wrapper open-modal">
                <img src="" alt="" class-"">
            </div>
            <h3>Emergency Care</h3>
        </li>
        <li>
            <div class="circle-img-wrapper open-modal">
                <img src="" alt="" class-"">
            </div>
            <h3>Cosmetic Dentistry</h3>
        </li>
        <li>
            <div class="circle-img-wrapper open-modal">
                <img src="" alt="" class-"">
            </div>
            <h3>Other Care</h3>
        </li>
    </ul>

`;

// MODAL HANDLER
document.querySelectorAll(".open-modal").forEach(item => {
    item.addEventListener("click", function() {
        const modalId = this.dataset.modal;
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add("visible");
        }
    });
});