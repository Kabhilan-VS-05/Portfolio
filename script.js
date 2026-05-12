// DOM Elements
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-links a');
const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    
    if (navLinksContainer.classList.contains('active')) {
        navLinksContainer.style.display = 'flex';
        navLinksContainer.style.flexDirection = 'column';
        navLinksContainer.style.position = 'absolute';
        navLinksContainer.style.top = '72px';
        navLinksContainer.style.left = '0';
        navLinksContainer.style.width = '100%';
        navLinksContainer.style.background = 'rgba(10, 10, 10, 0.98)';
        navLinksContainer.style.backdropFilter = 'blur(12px)';
        navLinksContainer.style.padding = '2rem';
        navLinksContainer.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
    } else {
        navLinksContainer.style.display = 'none';
    }
});

// Reset mobile menu on window resize
window.addEventListener('resize', () => {
    if(window.innerWidth > 768) {
        navLinksContainer.style.display = 'flex';
        navLinksContainer.style.flexDirection = 'row';
        navLinksContainer.style.position = 'static';
        navLinksContainer.style.padding = '0';
        navLinksContainer.style.width = 'auto';
        navLinksContainer.style.background = 'transparent';
        navLinksContainer.style.borderBottom = 'none';
        navLinksContainer.classList.remove('active');
    } else if (!navLinksContainer.classList.contains('active')) {
        navLinksContainer.style.display = 'none';
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
            // Animate section headers
            const header = entry.target.querySelector('.section-header');
            if (header) {
                header.style.opacity = '0';
                header.style.transform = 'translateY(20px)';
                header.style.transition = 'all 0.6s ease-out';
                setTimeout(() => {
                    header.style.opacity = '1';
                    header.style.transform = 'translateY(0)';
                }, 100);
            }

            // Animate cards and items
            const children = entry.target.querySelectorAll('.project-card, .skill-card, .timeline-item, .featured-project-card');
            children.forEach((child, index) => {
                child.style.opacity = '0';
                child.style.transform = 'translateY(20px)';
                child.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
                
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, 150);
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
                top: targetSection.offsetTop - 72, // Offset for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.9)';
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.08)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.7)';
        navbar.style.borderBottom = '1px solid transparent';
    }
});

// Typing Effect
const typingElement = document.querySelector('.typing-text');
const roles = [
    "practical software", 
    "AI-assisted systems", 
    "reliable backends",
    "scalable applications"
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeDelay = 80;
let eraseDelay = 40;
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
        typeDelay = 80;
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

// Cursor Glow Follower
const cursorGlow = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', (e) => {
    if(cursorGlow) {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
    }
});

// Spotlight Effect for Cards
const cards = document.querySelectorAll('.project-card, .skill-card, .featured-project-card');
cards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});


