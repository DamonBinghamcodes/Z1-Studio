// Select elements
const hamburger = document.querySelector(".hamburger-menu");
const navLinks = document.querySelector(".nav-links");

// Function to toggle menu
function toggleMenu() {
    navLinks.classList.toggle("open");
    hamburger.classList.toggle("active");

    // Toggle menu visibility
    if (navLinks.classList.contains("open")) {
        navLinks.style.display = "flex";
    } else {
        navLinks.style.display = "none";
    }
}

// Event listener for menu toggle
hamburger.addEventListener("click", toggleMenu);
