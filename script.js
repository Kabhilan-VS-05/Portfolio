// DOM Elements
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-links a');
const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    
    // Add simple animation styles dynamically for mobile menu if needed
    if (navLinksContainer.classList.contains('active')) {
        navLinksContainer.style.display = 'flex';
        navLinksContainer.style.flexDirection = 'column';
        navLinksContainer.style.position = 'absolute';
        navLinksContainer.style.top = '80px';
        navLinksContainer.style.left = '0';
        navLinksContainer.style.width = '100%';
        navLinksContainer.style.background = '#0a0a0c';
        navLinksContainer.style.padding = '2rem';
        navLinksContainer.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
    } else {
        navLinksContainer.style.display = 'none';
        // Reset styles for desktop view when toggled off
        if(window.innerWidth > 768) {
             navLinksContainer.style.display = 'flex';
             navLinksContainer.style.flexDirection = 'row';
             navLinksContainer.style.position = 'static';
             navLinksContainer.style.padding = '0';
             navLinksContainer.style.width = 'auto';
             navLinksContainer.style.borderBottom = 'none';
        }
    }
});

// Scroll Observer for Fade-in effects
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate children if needed
            const children = entry.target.querySelectorAll('.project-card, .skill-card, .timeline-item');
            children.forEach((child, index) => {
                child.style.opacity = '0';
                child.style.transform = 'translateY(20px)';
                child.style.transition = `all 0.5s ease ${index * 0.1}s`;
                
                // Force reflow
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, 50);
            });
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (window.innerWidth <= 768) {
            navLinksContainer.classList.remove('active');
            navLinksContainer.style.display = 'none';
        }
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80, // Offset for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 12, 0.95)';
        navbar.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.5)';
    } else {
        navbar.style.background = 'rgba(10, 10, 12, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

/* =========================================
   IMPRESSIVE FEATURES ADDITION
   ========================================= */

// 1. Typing Effect
const typingElement = document.querySelector('.typing-text');
const roles = [
    "Applied Software Developer", 
    "AI Enthusiast", 
    "System Reliability Engineer",
    "Computer Vision Developer"
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeDelay = 100;
let eraseDelay = 50;
let newTextDelay = 2000;

function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeDelay = eraseDelay;
    } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeDelay = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeDelay = newTextDelay;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex++;
        if (roleIndex >= roles.length) roleIndex = 0;
        typeDelay = 500;
    }

    setTimeout(type, typeDelay);
}

// Start typing effect on load
document.addEventListener('DOMContentLoaded', () => {
    if(typingElement) setTimeout(type, 1000);
});

// 2. Canvas Particle Network
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

// Handle Resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// Mouse Interaction
const mouse = {
    x: null,
    y: null,
    radius: 150
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color; //'rgba(6, 182, 212, 0.5)'; // Cyan accent
        ctx.fill();
    }
    
    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
        
        // Mouse collision
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 2;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 2;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 2;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 2;
            }
        }
        
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function initParticles() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 3) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 2) - 1; // Speed
        let directionY = (Math.random() * 2) - 1;
        let color = 'rgba(6, 182, 212, 0.6)'; // Accent (Cyan)
        
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function animateParticles() {
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connectParticles();
}

function connectParticles() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + 
                           ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            
            if (distance < (canvas.width/7) * (canvas.height/7)) {
                 opacityValue = 1 - (distance/20000);
                 ctx.strokeStyle = 'rgba(6, 182, 212,' + opacityValue + ')';
                 ctx.lineWidth = 1;
                 ctx.beginPath();
                 ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                 ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                 ctx.stroke();
            }
        }
    }
}

initParticles();
animateParticles();
