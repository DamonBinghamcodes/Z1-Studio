document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".cta-button");
    btn.addEventListener("click", () => {
      window.location.href = "projects.html"; // or any internal section
    });
  });
  