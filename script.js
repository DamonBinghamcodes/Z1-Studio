// Main JavaScript for Z1 Studio
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS if available
  if (typeof AOS !== 'undefined') {
      AOS.init({
          duration: 800,
          easing: 'ease-out-cubic',
          once: true,
          offset: 100,
          disable: 'mobile'
      });
  }

  // Navigation functionality
  initNavigation();
  
  // Smooth scrolling
  initSmoothScrolling();
  
  // Header scroll effect
  initHeaderScroll();
  
  // Contact form
  initContactForm();
});

// Navigation Functions
function initNavigation() {
  const hamburger = document.getElementById('hamburger');
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.navbar a');
  
  // Mobile menu toggle
  if (hamburger && navbar) {
      hamburger.addEventListener('click', function() {
          hamburger.classList.toggle('active');
          navbar.classList.toggle('active');
          
          // Prevent body scroll when menu is open
          if (navbar.classList.contains('active')) {
              document.body.style.overflow = 'hidden';
          } else {
              document.body.style.overflow = '';
          }
      });
      
      // Close menu when clicking on links
      navLinks.forEach(link => {
          link.addEventListener('click', function() {
              hamburger.classList.remove('active');
              navbar.classList.remove('active');
              document.body.style.overflow = '';
          });
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', function(event) {
          const isClickInside = navbar.contains(event.target) || hamburger.contains(event.target);
          if (!isClickInside && navbar.classList.contains('active')) {
              hamburger.classList.remove('active');
              navbar.classList.remove('active');
              document.body.style.overflow = '';
          }
      });
  }
  
  // Set active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
      const linkPage = link.getAttribute('href').split('/').pop();
      if (linkPage === currentPage) {
          link.classList.add('active');
      }
  });
}

// Header scroll effect
function initHeaderScroll() {
  const header = document.querySelector('.header');
  
  if (header) {
      let lastScroll = 0;
      
      window.addEventListener('scroll', function() {
          const currentScroll = window.pageYOffset;
          
          if (currentScroll > 100) {
              header.classList.add('scrolled');
          } else {
              header.classList.remove('scrolled');
          }
          
          // Hide/show header on scroll
          if (currentScroll > lastScroll && currentScroll > 200) {
              header.style.transform = 'translateY(-100%)';
          } else {
              header.style.transform = 'translateY(0)';
          }
          
          lastScroll = currentScroll;
      });
  }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
              const headerOffset = 80;
              const elementPosition = targetElement.offsetTop;
              const offsetPosition = elementPosition - headerOffset;

              window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
              });
              
              // Close mobile menu if open
              const hamburger = document.getElementById('hamburger');
              const navbar = document.getElementById('navbar');
              if (hamburger && navbar && navbar.classList.contains('active')) {
                  hamburger.classList.remove('active');
                  navbar.classList.remove('active');
                  document.body.style.overflow = '';
              }
          }
      });
  });
}

// Contact form functionality
function initContactForm() {
  const form = document.querySelector('.contact-form');
  
  if (form) {
      form.addEventListener('submit', async function(e) {
          e.preventDefault();
          
          const submitBtn = form.querySelector('button[type="submit"]');
          const originalText = submitBtn.textContent;
          
          // Loading state
          submitBtn.textContent = 'Sending...';
          submitBtn.disabled = true;
          
          // Simulate form submission (replace with actual API call)
          try {
              await new Promise(resolve => setTimeout(resolve, 2000));
              
              // Success state
              submitBtn.textContent = 'Message Sent!';
              submitBtn.style.background = '#27ca3f';
              
              // Show success message
              showNotification('Message sent successfully! We\'ll get back is you within 48 hours.', 'success');
              
              // Reset form
              form.reset();
              
          } catch (error) {
              // Error state
              submitBtn.textContent = 'Error';
              submitBtn.style.background = '#ff5f56';
              showNotification('Failed to send message. Please try again.', 'error');
          }
          
          // Reset button after 3 seconds
          setTimeout(() => {
              submitBtn.textContent = originalText;
              submitBtn.style.background = '';
              submitBtn.disabled = false;
          }, 3000);
      });
  }
}

// Notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      max-width: 350px;
      background: ${type === 'success' ? '#27ca3f' : type === 'error' ? '#ff5f56' : '#007bff'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      z-index: 10000;
      transform: translateX(400px);
      transition: transform 0.3s ease;
      font-weight: 500;
  `;
  
  notification.textContent = message;
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
      notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Animate out and remove
  setTimeout(() => {
      notification.style.transform = 'translateX(400px)';
      setTimeout(() => {
          notification.remove();
      }, 300);
  }, 4000);
}

// Prevent iOS bounce effect
document.addEventListener('touchmove', function(e) {
  if (document.body.classList.contains('menu-open')) {
      e.preventDefault();
  }
}, { passive: false });

// Fix viewport height on mobile
function setViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setViewportHeight();
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', setViewportHeight);