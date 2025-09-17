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

    // Close button inside nav for mobile
    const navClose = document.querySelector(".nav-close");
    navClose.addEventListener("click", () => {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", false);
        toggleIcon.classList.remove("fa-times");
        toggleIcon.classList.add("fa-bars");
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

    // Project filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });



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

            // Send form data to Formspree (replace with your actual Formspree endpoint)
            const formData = new FormData(this);

            fetch('https://formspree.io/f/xldwyoon', {  // Replace 'your-form-id' with your actual Formspree form ID
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    messageDiv.textContent = 'Thank you for your message! I will get back to you soon.';
                    messageDiv.style.color = 'green';
                    this.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                messageDiv.textContent = 'Oops! There was a problem submitting your form. Please try again later.';
                messageDiv.style.color = 'red';
            });
        });
    }

});
