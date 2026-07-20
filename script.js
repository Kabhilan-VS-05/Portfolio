document.addEventListener('DOMContentLoaded', () => {
    // Initialize Feather Icons
    if (window.feather) {
        feather.replace();
    }

    // DOM Elements
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    // Mobile Menu Toggle
    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
        });
    }

    // Passive & Throttled Scroll Listener (Prevents Forced Reflow & Layout Thrashing)
    let isTicking = false;
    const sections = document.querySelectorAll('section, header');
    const dockItems = document.querySelectorAll('.dock-item');

    window.addEventListener('scroll', () => {
        if (!isTicking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;

                // Navbar Scrolled Effect
                if (scrollY > 40) {
                    navbar?.classList.add('scrolled');
                } else {
                    navbar?.classList.remove('scrolled');
                }

                // Mobile Bottom Dock Observer
                if (dockItems.length > 0) {
                    let currentSectionId = '';
                    sections.forEach(section => {
                        const sectionTop = section.offsetTop - 120;
                        const sectionHeight = section.offsetHeight;
                        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                            currentSectionId = section.getAttribute('id') || '';
                        }
                    });

                    dockItems.forEach(item => {
                        const href = item.getAttribute('href');
                        const isActive = (href === '#' && (currentSectionId === '' || currentSectionId === 'hero')) || (href === `#${currentSectionId}`);
                        item.classList.toggle('active', isActive);
                    });
                }

                isTicking = false;
            });
            isTicking = true;
        }
    }, { passive: true });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navLinksContainer && navLinksContainer.classList.contains('active')) {
                    navLinksContainer.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetSection.offsetTop - 72,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Helper: Recalculate parent drawers when nested content expands
    function recalculateParentDrawers(element) {
        let current = element.parentElement;
        while (current) {
            if (current.classList.contains('expand-drawer') && current.classList.contains('expanded')) {
                const content = current.querySelector('.drawer-content');
                if (content) {
                    current.style.maxHeight = content.scrollHeight + 120 + 'px';
                }
            }
            current = current.parentElement;
        }
    }

    // Generic Icon Expand Buttons for Cards (Works for both main cards & sub-cards)
    document.querySelectorAll('.expandable-card .icon-expand-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = button.closest('.expandable-card');
            const drawer = card ? card.querySelector('.expand-drawer') : null;
            const drawerContent = drawer ? drawer.querySelector('.drawer-content') : null;

            if (!card || !drawer || !drawerContent) return;

            const isExpanded = card.classList.contains('expanded');

            if (isExpanded) {
                // Collapse drawer
                drawer.style.maxHeight = drawerContent.scrollHeight + 80 + 'px';
                card.classList.remove('expanded');
                button.classList.remove('active');
                
                requestAnimationFrame(() => {
                    drawer.style.maxHeight = '0px';
                    recalculateParentDrawers(card);
                });
            } else {
                // Expand drawer
                card.classList.add('expanded');
                button.classList.add('active');
                drawer.style.maxHeight = drawerContent.scrollHeight + 120 + 'px';
                recalculateParentDrawers(card);

                // Transition to 'none' after animation so nested content is never clipped
                setTimeout(() => {
                    if (card.classList.contains('expanded')) {
                        drawer.style.maxHeight = 'none';
                    }
                }, 420);
            }
        });
    });

    // Section-Level Toggle: All Skills
    const toggleSkillsBtn = document.getElementById('toggle-all-skills');
    const allSkillsDrawer = document.getElementById('all-skills-drawer');

    if (toggleSkillsBtn && allSkillsDrawer) {
        toggleSkillsBtn.addEventListener('click', () => {
            const isExpanded = toggleSkillsBtn.classList.contains('active');
            const drawerContent = allSkillsDrawer.querySelector('.drawer-content');

            if (isExpanded) {
                if (drawerContent) allSkillsDrawer.style.maxHeight = drawerContent.scrollHeight + 80 + 'px';
                toggleSkillsBtn.classList.remove('active');
                allSkillsDrawer.classList.remove('expanded');
                
                requestAnimationFrame(() => {
                    allSkillsDrawer.style.maxHeight = '0px';
                });
            } else {
                toggleSkillsBtn.classList.add('active');
                allSkillsDrawer.classList.add('expanded');
                if (drawerContent) {
                    allSkillsDrawer.style.maxHeight = drawerContent.scrollHeight + 120 + 'px';
                    setTimeout(() => {
                        if (allSkillsDrawer.classList.contains('expanded')) {
                            allSkillsDrawer.style.maxHeight = 'none';
                        }
                    }, 420);
                }
            }
        });
    }

    // Section-Level Toggle: All Projects
    const toggleProjectsBtn = document.getElementById('toggle-all-projects');
    const allProjectsDrawer = document.getElementById('all-projects-drawer');

    if (toggleProjectsBtn && allProjectsDrawer) {
        toggleProjectsBtn.addEventListener('click', () => {
            const isExpanded = toggleProjectsBtn.classList.contains('active');
            const drawerContent = allProjectsDrawer.querySelector('.drawer-content');

            if (isExpanded) {
                if (drawerContent) allProjectsDrawer.style.maxHeight = drawerContent.scrollHeight + 80 + 'px';
                toggleProjectsBtn.classList.remove('active');
                allProjectsDrawer.classList.remove('expanded');
                
                requestAnimationFrame(() => {
                    allProjectsDrawer.style.maxHeight = '0px';
                });
            } else {
                toggleProjectsBtn.classList.add('active');
                allProjectsDrawer.classList.add('expanded');
                if (drawerContent) {
                    allProjectsDrawer.style.maxHeight = drawerContent.scrollHeight + 120 + 'px';
                    setTimeout(() => {
                        if (allProjectsDrawer.classList.contains('expanded')) {
                            allProjectsDrawer.style.maxHeight = 'none';
                        }
                    }, 420);
                }
            }
        });
    }

    // Accordions (Academic Journey)
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.closest('.accordion-item');
            const content = item ? item.querySelector('.accordion-content') : null;
            const body = content ? content.querySelector('.accordion-body') : null;

            if (!item || !content || !body) return;

            const isActive = item.classList.contains('active');

            if (isActive) {
                content.style.maxHeight = body.scrollHeight + 40 + 'px';
                item.classList.remove('active');
                
                requestAnimationFrame(() => {
                    content.style.maxHeight = '0px';
                    recalculateParentDrawers(item);
                });
            } else {
                item.classList.add('active');
                content.style.maxHeight = body.scrollHeight + 80 + 'px';
                recalculateParentDrawers(item);

                setTimeout(() => {
                    if (item.classList.contains('active')) {
                        content.style.maxHeight = 'none';
                    }
                }, 380);
            }
        });
    });
});
