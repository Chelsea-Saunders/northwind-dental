
import { 
    validateForm, 
    autoGrowTextarea,
    validateEmail,
    formatPhoneNumber,
    clearFormFields,
    showSubmissionMessage
} from "./form-utilities.mjs";

// REQUEST APPOINTMENT MODAL
export function buildAppointment(container) {
    container.innerHTML = `
        <span class="close-modal" aria-label="Close Modal">&times;</span>
        <h2 id="appt-h2">Contact Us</h2>
        <form id="appointment-form" novalidate>
            <label for="full-name">Full Name:</label>
            <input type="text" id="full-name" name="full-name" autocomplete="name" placeholder="First and Last Name" required>
            
            <label for="appt-form-email">Email:</label>
            <input type="email" id="appt-form-email" name="appt-form-email" autocomplete="email" placeholder="email@email.com" required>
            
            <label for="appt-form-phone">Phone Number:</label>
            <input type="tel" id="appt-form-phone" inputmode="tel" maxlength="12" name="appt-form-phone" autocomplete="tel" placeholder="(123)456-7890" required>
            
            <label for="appt-form-message">Reason or Comments:</label>
            <textarea id="appt-form-message" name="appt-form-message" placeholder="Your message here..." required></textarea>
            
            <button type="submit" class="appt-form-submit-button">Submit</button>
            <p id="form-feedback" aria-live="polite" class="hidden"></p>
        </form>
    `;

    const form = container.querySelector("#appointment-form");
    const email = container.querySelector("#appt-form-email");
    const phone = container.querySelector("#appt-form-phone");
    const message = container.querySelector("#appt-form-message");
    const feedback = container.querySelector("#form-feedback");

    [email, phone, message].forEach(field => {
        field?.addEventListener("input", () => feedback?.classList.add("hidden"));
    });

    if (message) {
        autoGrowTextarea(message);
        message.addEventListener("input", () => autoGrowTextarea(message));
    }
    if (phone) {
        phone.addEventListener("input", (event) => {
            const position = event.target.selectionStart;
            const previous = event.target.value;
            event.target.value = formatPhoneNumber(previous);
            event.target.selectionStart = event.target.selectionEnd = Math.min(position, event.target.value.length);
        });
    }
    if (email) {
        email.addEventListener("input", () => {
        email.classList.toggle("error", !validateEmail(email.value));
        email.setAttribute("aria-invalid", !validateEmail(email.value));
        });
    }

    if (form) {
        form.addEventListener("submit", event => {
            event.preventDefault();
            if (validateForm(form)) {
                if (feedback) {
                    feedback.textContent = "Form submitted successfully!";
                    feedback.classList.remove("hidden");
                }
                showSubmissionMessage("Form submitted successfully!");
                clearFormFields(form);
                if (feedback) feedback.classList.add("hidden");
                if (message) {
                    autoGrowTextarea(message);
                }
            } else {
                if (feedback) {
                    feedback.textContent = "Please fix these errors";
                    feedback.classList.remove("hidden");
                }
                showSubmissionMessage("Please fix these errors");
            }
        });
    }
    return () => {};
}