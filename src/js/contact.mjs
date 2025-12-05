
import { 
    validateForm, 
    autoGrowTextarea,
    validateEmail,
    formatPhoneNumber,
    showSubmissionMessage,
    clearFormFields
} from "./form-utilities.mjs";
import { closeAndReload } from "./modal.mjs";

// REQUEST APPOINTMENT MODAL
export function buildAppointment(container) {
    if (!container) return;

    // LOOKUPS
    const form = container.querySelector("#appointment-form");
    const name = container.querySelector("#full-name");
    const email = container.querySelector("#appt-form-email");
    const phone = container.querySelector("#appt-form-phone");
    const message = container.querySelector("#appt-form-message");
    const website = container.querySelector("#website");
    const timestamp = container.querySelector("#timestamp");
    const feedback = container.querySelector("#form-feedback");
    const submitButton = container.querySelector(".appt-form-submit-button");

    // MODAL HELPERS (LOCAL)

    // function to toggle busy state
    function setBusy(isBusy) {
        if (!submitButton || !form) return;
        if (!submitButton.dataset.label) submitButton.dataset.label = submitButton.textContent.trim();
        submitButton.disabled = isBusy;
        form.toggleAttribute("aria-busy", isBusy);
        submitButton.textContent = isBusy ? "Sending..." : (submitButton.dataset.label || "Send");
    }

    // function to show feedback message
    function showFeedback(text) {
        if (!feedback) return;
        feedback.textContent = text;
        feedback.classList.remove("hidden");
        clearTimeout(showFeedback.timeout);
        showFeedback.timeout = setTimeout(() => {
            feedback?.classList.add("hidden");
        }, 4000);
    }

    // function to get form data
    function getFormData() {
        const body = new FormData();
        body.set("name",     name?.value || "");
        body.set("email",    email?.value || "");
        body.set("phone",    phone?.value || "");
        body.set("message",  message?.value || "");
        body.set("website",  website?.value.trim() || "");
        body.set("timestamp", timestamp?.value || "");
        return body;
    }

    // anti-span function
    function antiSpamCheck() {
        const honeypot = website?.value.trim() || "";
        const started = Number(timestamp?.value || 0);
        const spam = started && (Date.now() - started < 1500);
        if (timestamp) timestamp.value = String(Date.now()); // reset for next submit
        return !!honeypot || !!spam;
    }

    // validate fields function
    function validateFormFields() {
        // validate email
        email?.addEventListener("input", () => {
            const ok = validateEmail(email.value);
            email.classList.toggle("error", !ok);
            email.setAttribute("aria-invalid", String(!ok));
            feedback?.classList.add("hidden");
        });

        // phone formatting
        phone?.addEventListener("input", (event) => {
            event.target.value = formatPhoneNumber(event.target.value);
            feedback?.classList.add("hidden");
        });

        // auto-grow message textarea
        if (message) {
            autoGrowTextarea(message);
            message.addEventListener("input", () => {
                autoGrowTextarea(message);
            });
        }
    }

    // INITIALIZE FORM
    if (timestamp && !timestamp.value) timestamp.value = String(Date.now());
    
    validateFormFields();

    const clearForm = () => clearFormFields(form);

    // SUBMIT HANDLER
    form?.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!validateForm(form)) {
            showFeedback("Please fix errors in the form.");
            showSubmissionMessage("Please fix these errors!");
            return;
        }

        if (antiSpamCheck()) {
            clearForm();
            showFeedback("Spam detected. Message not sent!");
            showSubmissionMessage("Spam detected. Message not sent!");
            return;
        }

        setBusy(true);

        // ----- Network and backend validation -----
        let json;
        try {
            const body = getFormData();
            const response = await fetch("/backend/sendmail.php", {
                method: "POST", 
                body, 
                headers: { "X-Requested-With": "fetch" }
            });

            try {
                json = await response.json(); 
            } catch {
                json = null;
            }

            if (!response.ok || !json || !json.ok) {
                console.error("Sendmail backend error:", { response, json });
                throw new Error(json?.error || "Send failed");
            }
        } catch (error) {
            console.error("Contact form submission error:", error);
            showFeedback("Something went wrong. Please try again.");
            showSubmissionMessage("Something went wrong. Please try again.");
            setBusy(false);
            return;
        }

        // ----- UI after success: no errors if this part fails -----
        try {
            showFeedback("Message Sent. Thank you!");
            showSubmissionMessage("Message Sent. Thank you!");
            clearForm();
            
            closeAndReload("request-apointment-modal", 1000);
        } finally {
            setBusy(false);
        }
    });
}