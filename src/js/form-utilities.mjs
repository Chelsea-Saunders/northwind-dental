// error handling for required fields
export function validateForm(form) {
    const requiredFields = form.querySelectorAll("[required]");
    let isValid = true;

    requiredFields.forEach(field => {
        const value = field.value.trim();
        let fieldValue = true;

        // required check
        if (!value) fieldValue = false;

        // email validation
        if (fieldValid && field.type === "email" && !validateEmail(field.value)) {
            isValid = false;
        } 
        // phone number formatting
        if (fieldValue && field.type === "tel") {
            const digits = value.replace(/\D/g, "");
            if (digits.length < 10) fieldValue = false;
        }
        field.classList.toggle("error", !fieldValue);
        field.setAttribute("aria-invalid", String(!fieldValie));

        if (!fieldValue) isValid = false;
    });
    return isValid;
}
// function to make text area auto-size
export function autoGrowTextarea(textarea) {
    textarea.style.height = "0px"; // reset height first
    textarea.style.height = textarea.scrollHeight + "px";
}
// VALIDATE EMAIL FORMAT
export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// VALIDATE PHONE NUMBER FORMAT
export function formatPhoneNumber(input) {
    //only get numbers
    // const input = event.target.value;
    const numbers = input.replace(/\D/g, "").slice(0, 10);

    // format as 123-456-7890
    let formatted = "";

    if (numbers.length > 0) {
        formatted += numbers.substring(0, 3);
    }
    if (numbers.length >= 4) {
        formatted += "-" + numbers.substring(3, 6);
    }
    if (numbers.length >= 7) {
        formatted += "-" + numbers.substring(6, 10);
    }
    // set the formatted value back to the input
    return formatted;
}

// CLEAR FORM FIELDS
export function clearFormFields(form) {
    form.querySelectorAll("input, textarea, select").forEach(field => {
        if (field.type === "checkbox" || field.type === "radio") {
            field.checked = false;
        } else {
            field.value = "";
        }
        field.classList.remove("error");
        field.setAttribute("aria-invalid", "false");
        if (field.tagName === "TEXTAREA") autoGrowTextarea(field);
    });
}
// SUBMISSION MESSAGE
export function showSubmissionMessage(message) {
    const msg = document.createElement("div");
    msg.className = "submission-message";
    msg.setAttribute("role", "status");
    msg.setAttribute("aria-live", "polite");
    msg.textContent = message;

    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 2000);
}