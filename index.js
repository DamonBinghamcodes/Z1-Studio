document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".cta-button");
    btn.addEventListener("click", () => {
      window.location.href = "projects.html"; // or any internal section
    });
  });
  // Mobile hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('show');
  hamburger.classList.toggle('open');
});
