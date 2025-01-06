// Get the modal and close button
const successModal = document.getElementById("successModal");
const closeModal = document.getElementById("closeModal");

// Function to show the modal
function showSuccessModal() {
  successModal.style.display = "flex"; // Show modal (flex for centering)
}

// Function to close the modal
function closeSuccessModal() {
  successModal.style.display = "none"; // Hide modal
}

// close modal on clicking the close button
closeModal.addEventListener("click", closeSuccessModal);

// close modal on clicking outside the modal content
window.addEventListener("click", (event) => {
  if (event.target === successModal) {
    closeSuccessModal();
  }
});


document.getElementById('contactForm').addEventListener('submit', async function(event) {
    console.log('sending email');
    
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const feedback = document.getElementById('feedback');

        try {
            const response = await fetch('http://127.0.0.1:4000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            });

            if (response.ok) {
                // Show success modal
                showSuccessModal();
                e.target.reset();
            } else {
                feedback.style.display = 'block';
                feedback.style.color = '#f56c6c';
                feedback.textContent = 'Something went wrong. Please try again.';
            }
        } catch (error) {
            feedback.style.display = 'block';
            feedback.style.color = '#f56c6c';
            feedback.textContent = 'An error occurred. Please try again.';
        }
    });

