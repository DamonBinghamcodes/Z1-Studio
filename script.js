document.addEventListener("DOMContentLoaded", () => {
  // === HAMBURGER MENU ===
  const hamburger = document.getElementById("hamburger");
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll('#navbar a');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove('show');
    hamburger.classList.remove('active');
  });
});

  if (hamburger && navbar) {
    hamburger.addEventListener("click", () => {
      navbar.classList.toggle("show");
      hamburger.classList.toggle("active"); // toggle animation class too
    });
  }

  // === SLIDER DOTS FOR SCROLL SNAP ===
  const container = document.querySelector(".slider-container");
  const dots = document.querySelectorAll(".dot");

  if (container && dots.length > 0) {
    container.addEventListener("scroll", () => {
      const scrollLeft = container.scrollLeft;
      const tileWidth = container.offsetWidth;
      const index = Math.round(scrollLeft / tileWidth);

      dots.forEach(dot => dot.classList.remove("active"));
      if (dots[index]) dots[index].classList.add("active");
    });

    // Allow clicking dots to scroll to tile
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        container.scrollTo({
          left: container.offsetWidth * index,
          behavior: "smooth"
        });
      });
    });
  }
});
