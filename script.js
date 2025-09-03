document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector("nav");
    const toggleIcon = navToggle.querySelector("i");

    navToggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", isOpen);
        // Toggle between bars and close icons
        if (isOpen) {
            toggleIcon.classList.remove("fa-bars");
            toggleIcon.classList.add("fa-times");
        } else {
            toggleIcon.classList.remove("fa-times");
            toggleIcon.classList.add("fa-bars");
        }
    });

    // Close the nav when a link is clicked
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("open");
            toggleIcon.classList.remove("fa-times");
            toggleIcon.classList.add("fa-bars");
            navToggle.setAttribute("aria-expanded", false);
        });
    });

    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetID = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetID);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Function to sanitize input by escaping HTML
    function sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }

    // Basic form validation and submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const messageDiv = document.getElementById('formMessage');
            messageDiv.textContent = '';

            // Sanitize and trim inputs
            const name = sanitizeInput(this.name.value.trim());
            const email = sanitizeInput(this.email.value.trim());
            const subject = sanitizeInput(this.subject.value.trim());
            const message = sanitizeInput(this.message.value.trim());

            // Check for empty fields
            if (!name || !email || !subject || !message) {
                messageDiv.textContent = 'Please fill in all fields.';
                messageDiv.style.color = 'red';
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                messageDiv.textContent = 'Please enter a valid email address.';
                messageDiv.style.color = 'red';
                return;
            }

            // Here you can add AJAX or fetch to send form data to server
            messageDiv.textContent = 'Thank you for your message! I will get back to you soon.';
            messageDiv.style.color = 'green';
            this.reset();
        });
    }
});
