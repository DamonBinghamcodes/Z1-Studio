// Main JavaScript for Z1 Studio
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS
  AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
      delay: 100
  });

  // Navigation functionality
  initNavigation();
  
  // Animated text rotation
  initTextRotation();
  
  // Counter animations
  initCounters();
  
  // Smooth scrolling
  initSmoothScrolling();
  
  // Contact form
  initContactForm();
  
  // Parallax effects
  initParallaxEffects();
  
  // Page progress
  initPageProgress();
  
  // Intersection observer for animations
  initIntersectionObserver();
});

// Navigation Functions
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
  });

  // Close mobile menu when clicking on links
  navLinks.forEach(link => {
      link.addEventListener('click', () => {
          navToggle.classList.remove('active');
          navMenu.classList.remove('active');
      });
  });

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
          navbar.classList.add('scrolled');
      } else {
          navbar.classList.remove('scrolled');
      }
  });

  // Active section highlighting
  const sections = document.querySelectorAll('section[id]');
  
  function updateActiveNav() {
      const scrollY = window.pageYOffset;
      
      sections.forEach(section => {
          const sectionHeight = section.offsetHeight;
          const sectionTop = section.offsetTop - 100;
          const sectionId = section.getAttribute('id');
          const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
          
          if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
              navLinks.forEach(link => link.classList.remove('active'));
              if (navLink) navLink.classList.add('active');
          }
      });
  }
  
  window.addEventListener('scroll', updateActiveNav);
}

// Animated text rotation
function initTextRotation() {
  const rotatingText = document.getElementById('rotating-text');
  if (!rotatingText) return;
  
  const words = ['exceptional', 'innovative', 'beautiful', 'powerful', 'modern'];
  let currentIndex = 0;
  
  function rotateText() {
      rotatingText.style.opacity = '0';
      rotatingText.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
          currentIndex = (currentIndex + 1) % words.length;
          rotatingText.textContent = words[currentIndex];
          rotatingText.style.opacity = '1';
          rotatingText.style.transform = 'translateY(0)';
      }, 300);
  }
  
  setInterval(rotateText, 3000);
}

// Counter animations
function initCounters() {
  const counters = document.querySelectorAll('[data-target]');
  
  const animateCounter = (counter) => {
      const target = parseInt(counter.getAttribute('data-target'));
      const increment = target / 100;
      let current = 0;
      
      const updateCounter = () => {
          if (current < target) {
              current += increment;
              counter.textContent = Math.floor(current);
              requestAnimationFrame(updateCounter);
          } else {
              counter.textContent = target;
          }
      };
      
      updateCounter();
  };
  
  // Intersection observer for counters
  const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              animateCounter(entry.target);
              counterObserver.unobserve(entry.target);
          }
      });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => {
      counterObserver.observe(counter);
  });
}

// Smooth scrolling
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          
          if (target) {
              const headerOffset = 80;
              const elementPosition = target.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

              window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
              });
          }
      });
  });
}

// Contact form functionality
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      // Loading state
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      // Simulate form submission (replace with actual API call)
      try {
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Success state
          submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
          submitBtn.style.background = '#27ca3f';
          
          // Reset form
          form.reset();
          
          // Show success message
          showNotification('Message sent successfully!', 'success');
          
      } catch (error) {
          // Error state
          submitBtn.innerHTML = '<i class="fas fa-times"></i> Error';
          submitBtn.style.background = '#ff5f56';
          showNotification('Failed to send message. Please try again.', 'error');
      }
      
      // Reset button after 3 seconds
      setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
      }, 3000);
  });
}

// Parallax effects
function initParallaxEffects() {
  let ticking = false;
  
  function updateParallax() {
      const scrolled = window.pageYOffset;
      const heroElements = document.querySelectorAll('.float-element');
      const shapes = document.querySelectorAll('.shape');
      
      heroElements.forEach((element, index) => {
          const speed = 0.5 + (index * 0.2);
          const yPos = -(scrolled * speed);
          element.style.transform = `translateY(${yPos}px)`;
      });
      
      shapes.forEach((shape, index) => {
          const speed = 0.3 + (index * 0.1);
          const yPos = -(scrolled * speed);
          shape.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
      });
      
      ticking = false;
  }
  
  function requestTick() {
      if (!ticking) {
          requestAnimationFrame(updateParallax);
          ticking = true;
      }
  }
  
  window.addEventListener('scroll', requestTick);
}

// Page progress indicator
function initPageProgress() {
  const progressBar = document.querySelector('.nav-progress');
  if (!progressBar) return;
  
  window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      
      progressBar.style.width = scrolled + '%';
  });
}

// Intersection observer for animations
function initIntersectionObserver() {
  const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('animate-in');
          }
      });
  }, observerOptions);
  
  // Observe elements for animation
  const elementsToAnimate = document.querySelectorAll('.service-card, .project-card, .value-item, .contact-item');
  elementsToAnimate.forEach(el => observer.observe(el));
}

// Utility functions
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
      <div class="notification-content">
          <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
          <span>${message}</span>
      </div>
  `;
  
  // Add styles
  notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#27ca3f' : type === 'error' ? '#ff5f56' : '#007bff'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      z-index: 10000;
      transform: translateX(400px);
      transition: transform 0.3s ease;
  `;
  
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
  }, 3000);
}

// Mouse cursor effects
function initCursorEffects() {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: linear-gradient(135deg, #ff6b35, #f7931e);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: all 0.1s ease;
      opacity: 0;
  `;
  
  document.body.appendChild(cursor);
  
  document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      cursor.style.opacity = '1';
  });
  
  // Hide cursor when mouse leaves window
  document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
  });
  
  // Scale cursor on hover over interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .project-card, .service-card');
  
  interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
          cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
          cursor.style.background = 'rgba(255, 107, 53, 0.3)';
      });
      
      el.addEventListener('mouseleave', () => {
          cursor.style.transform = 'translate(-50%, -50%) scale(1)';
          cursor.style.background = 'linear-gradient(135deg, #ff6b35, #f7931e)';
      });
  });
}

// Initialize cursor effects for desktop only
if (window.innerWidth > 768) {
  initCursorEffects();
}

// Project card interactions
function initProjectInteractions() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-15px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0) scale(1)';
      });
      
      // Add click animation
      card.addEventListener('click', function(e) {
          const ripple = document.createElement('div');
          const rect = this.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height);
          const x = e.clientX - rect.left - size / 2;
          const y = e.clientY - rect.top - size / 2;
          
          ripple.style.cssText = `
              position: absolute;
              width: ${size}px;
              height: ${size}px;
              left: ${x}px;
              top: ${y}px;
              background: rgba(255, 107, 53, 0.3);
              border-radius: 50%;
              transform: scale(0);
              animation: ripple 0.6s ease-out;
              pointer-events: none;
          `;
          
          this.style.position = 'relative';
          this.style.overflow = 'hidden';
          this.appendChild(ripple);
          
          setTimeout(() => {
              ripple.remove();
          }, 600);
      });
  });
}

// Service card hover effects
function initServiceInteractions() {
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach(card => {
      const icon = card.querySelector('.service-icon');
      
      card.addEventListener('mouseenter', function() {
          if (icon) {
              icon.style.transform = 'translateY(-10px) rotate(10deg)';
          }
      });
      
      card.addEventListener('mouseleave', function() {
          if (icon) {
              icon.style.transform = 'translateY(0) rotate(0deg)';
          }
      });
  });
}

// Initialize additional interactions
initProjectInteractions();
initServiceInteractions();

// Page load performance optimization
window.addEventListener('load', () => {
  // Remove any loading states
  document.body.classList.add('loaded');
  
  // Initialize lazy loading for images
  if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  const img = entry.target;
                  img.src = img.dataset.src;
                  img.classList.remove('lazy');
                  imageObserver.unobserve(img);
              }
          });
      });
      
      document.querySelectorAll('img[data-src]').forEach(img => {
          imageObserver.observe(img);
      });
  }
});

// Add CSS animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes ripple {
      to {
          transform: scale(4);
          opacity: 0;
      }
  }
  
  .animate-in {
      animation: slideInUp 0.6s ease-out forwards;
  }
  
  @keyframes slideInUp {
      from {
          opacity: 0;
          transform: translateY(30px);
      }
      to {
          opacity: 1;
          transform: translateY(0);
      }
  }
  
  .notification-content {
      display: flex;
      align-items: center;
      gap: 0.5rem;
  }
  
  .loaded .hero-visual {
      animation: heroVisualFloat 6s ease-in-out infinite;
  }
  
  @keyframes heroVisualFloat {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
  }
  
  .lazy {
      opacity: 0;
      transition: opacity 0.3s;
  }
  
  .lazy:not([src]) {
      visibility: hidden;
  }
`;

document.head.appendChild(styleSheet);