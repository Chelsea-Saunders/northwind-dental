import { toggleMenuHandler } from "./header.mjs";
// import { requestAppointmentForm } from "./global.mjs";

// add event listener
document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.querySelector("#toggle-menu");
    if (toggleButton) {
        toggleButton.addEventListener("click", toggleMenuHandler);
    }
    // const appointmentContainer = document.querySelector("#appointment-form-container");
    // if (appointmentContainer) {
    //     appointmentContainer.innerHTML = requestAppointmentForm;
    // }
});