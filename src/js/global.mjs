
// REQUEST APPOINTMENT MODAL
export const requestAppointmentForm = `
    <span class="close-modal" aria-label="Close Modal">&times;</span>
    <h2 id="appt-h2">Request an Appointment</h2>
    <form id="appointment-form">
        <label for="full-name">Full Name:</label>
        <input type="text" id="full-name" name="full-name" autocomplete="name" placeholder="First and Last Name" required>
        
        <label for="appt-form-email">Email:</label>
        <input type="email" id="appt-form-email" name="appt-form-email" autocomplete="email" placeholder="email@email.com" required>
        
        <label for="appt-form-phone">Phone Number:</label>
        <input type="tel" id="appt-form-phone" name="appt-form-phone" autocomplete="tel" placeholder="(123)456-7890" required>
        
        <label for="appt-form-message">Reason or Comments:</label>
        <textarea id="appt-form-message" name="appt-form-message" placeholder="Your message here..." required></textarea>
        
        <p class="warning">Please do not add any personal or sensitive information</p>
        <button type="submit" class="appt-form-submit-button">Submit</button>

        <p id="form-feedback" aria-live="polite" class="hidden"></p>
    </form>
`;