// Welcome Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
    });

    // Loading screen
    const loader = document.getElementById('loader');
    const welcome = document.getElementById('welcome');
    
    // Simulate loading time
    setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 800);
    }, 3000);

    // Parallax effect for floating shapes
    document.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.shape');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed * 20;
            const y = (mouseY - 0.5) * speed * 20;
            
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Button hover effects
    const enterBtn = document.querySelector('.enter-studio-btn');
    
    if (enterBtn) {
        enterBtn.addEventListener('mouseenter', function() {
            this.style.animation = 'none';
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        enterBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }

    // Typing animation for tagline
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        
        setTimeout(() => {
            let index = 0;
            const typeInterval = setInterval(() => {
                if (index < text.length) {
                    tagline.textContent += text.charAt(index);
                    index++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 50);
        }, 4000);
    }

    // Add glitch effect to logo on hover
    const logoText = document.querySelector('.logo-text');
    if (logoText) {
        logoText.addEventListener('mouseenter', function() {
            this.style.animation = 'glitch 0.5s ease-in-out';
        });
        
        logoText.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    }

    // Particle effect on button click
    enterBtn.addEventListener('click', function(e) {
        createParticles(e.clientX, e.clientY);
    });
});

// Function to enter the studio (navigate to home page)
function enterStudio() {
    // Add exit animation
    const welcome = document.getElementById('welcome');
    welcome.style.animation = 'fadeOut 0.8s ease-in-out forwards';
    
    setTimeout(() => {
        window.location.href = 'home.html';
    }, 800);
}

// Particle creation function
function createParticles(x, y) {
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: #ff6b35;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${x}px;
            top: ${y}px;
        `;
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 5 + Math.random() * 10;
        const lifetime = 1000 + Math.random() * 1000;
        
        animateParticle(particle, angle, velocity, lifetime);
    }
}

function animateParticle(particle, angle, velocity, lifetime) {
    const startTime = Date.now();
    const startX = parseFloat(particle.style.left);
    const startY = parseFloat(particle.style.top);
    
    function update() {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / lifetime;
        
        if (progress >= 1) {
            particle.remove();
            return;
        }
        
        const x = startX + Math.cos(angle) * velocity * elapsed / 16;
        const y = startY + Math.sin(angle) * velocity * elapsed / 16 + (elapsed * elapsed) / 50000;
        const opacity = 1 - progress;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.opacity = opacity;
        
        requestAnimationFrame(update);
    }
    
    requestAnimationFrame(update);
}

// Add custom CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: scale(0.95);
        }
    }
    
    @keyframes glitch {
        0%, 100% { transform: translate(0); }
        10% { transform: translate(-2px, -2px); }
        20% { transform: translate(2px, 2px); }
        30% { transform: translate(-2px, 2px); }
        40% { transform: translate(2px, -2px); }
        50% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        70% { transform: translate(-2px, 2px); }
        80% { transform: translate(2px, -2px); }
        90% { transform: translate(-2px, -2px); }
    }
    
    .enter-studio-btn:active {
        transform: translateY(-1px) scale(1.02) !important;
    }
`;
document.head.appendChild(style);