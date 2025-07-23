
// REQUEST APPOINTMENT MODAL
export const requestAppointmentForm = `
    <h2>Request an Appointment</h2>
    <form id="appointment-form">
        <label for="full-name">Full Name:</label>
        <input type="text" id="full-name" name="full-name" autocomplete="name" placeholder="First and Last Name" required>
        
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" autocomplete="email" placeholder="email@email.com" required>
        
        <label for="phone">Phone Number:</label>
        <input type="tel" id="phone" name="phone" autocomplete="tel" placeholder="(123)456-7890" required>
        
        <label for="message">Reason or Comments:</label>
        <textarea id="message" name="message" placeholder="Your message here..." required></textarea>
        
        <p class="privacy-policy">
            By submitting this form, you agree to our 
            <a href="privacy-policy.html" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
        </p>
        <button type="submit" class="submit-button">Submit</button>

        // form feedback
        <p id="form-feedback" aria-live="polite" class="hidden"></p>
    </form>
`;