function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

function toggleMode() {
    const body = document.body;
    const toggleButton = document.getElementById("theme-toggle");
    
    if (!toggleButton) return;
    
    // Check local storage for theme preference
    if (localStorage.getItem("theme") === "dark-mode") {
        body.classList.add("dark-mode");
        toggleButton.textContent = "Light Mode";
    }
    
    toggleButton.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        
        // Update button text and save preference
        if (body.classList.contains("dark-mode")) {
            toggleButton.textContent = "Light Mode";
            localStorage.setItem("theme", "dark-mode");
        } else {
            toggleButton.textContent = "Dark Mode";
            localStorage.removeItem("theme");
        }
    });
}

// Initialize dark mode on page load
document.addEventListener('DOMContentLoaded', function() {
    // Setup dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.checked = true;
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', function() {
            if (this.checked) {
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }
    
    // Setup form validation
    setupFormValidation();
});

// FORM VALIDATION
function setupFormValidation() {
    const submissionForm = document.getElementById('submissionForm');
    const contactForm = document.getElementById('contactForm');
    
    if (submissionForm) {
        submissionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm(this)) {
                alert('Thank you for your submission! We will review your animation soon.');
                this.reset();
            }
        });
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm(this)) {
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            }
        });
    }
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'red';
        } else {
            input.style.borderColor = '#ddd';
        }
    });
    
    return isValid;
}