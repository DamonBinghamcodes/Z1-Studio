// Select the hamburger menu and navbar menu
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navbarMenu = document.querySelector('.navbar-menu');

// Add click event listener
hamburgerMenu.addEventListener('click', () => {
    navbarMenu.classList.toggle('hidden');
});
