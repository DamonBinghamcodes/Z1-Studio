// script.js
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const navbar = document.getElementById("navbar");
  
    hamburger.addEventListener("click", () => {
      navbar.classList.toggle("show");
    });
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".slider-track");
    const dots = document.querySelectorAll(".dot");
  
    let currentSlide = 0;
  
    function updateSlider() {
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
      dots.forEach(dot => dot.classList.remove("active"));
      dots[currentSlide].classList.add("active");
    }
  
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentSlide = index;
        updateSlider();
      });
    });
  
    // Optional mobile swipe
    let startX = 0;
    track.addEventListener("touchstart", e => {
      startX = e.touches[0].clientX;
    });
  
    track.addEventListener("touchend", e => {
      const endX = e.changedTouches[0].clientX;
      const delta = endX - startX;
  
      if (delta > 50 && currentSlide > 0) {
        currentSlide--;
      } else if (delta < -50 && currentSlide < dots.length - 1) {
        currentSlide++;
      }
      updateSlider();
    });
  
    updateSlider();
  });
  
  track.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    console.log("Swipe started", startX);
  });
  
  track.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    const delta = endX - startX;
    console.log("Swipe ended", endX, "Delta:", delta);
  
    if (delta > 50 && currentSlide > 0) {
      currentSlide--;
    } else if (delta < -50 && currentSlide < dots.length - 1) {
      currentSlide++;
    }
    updateSlider();
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.slider-container');
    const dots = document.querySelectorAll('.dot');
  
    container.addEventListener('scroll', () => {
      const scrollLeft = container.scrollLeft;
      const width = container.offsetWidth;
      const index = Math.round(scrollLeft / width);
      
      dots.forEach(dot => dot.classList.remove('active'));
      if (dots[index]) dots[index].classList.add('active');
    });
  });
  