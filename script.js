document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Feather Icons
    if (window.feather) {
        feather.replace();
    }

    // 2. DOM Elements
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a:not(.btn-nav)');
    const dockItems = document.querySelectorAll('.dock-item');
    const toast = document.getElementById('toast-notification');
    const toastMsg = document.getElementById('toast-message');

    // 3. Navbar Scrolled Border & Active Link Spy
    let isTicking = false;
    const sections = document.querySelectorAll('section, header');

    window.addEventListener('scroll', () => {
        if (!isTicking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;

                // Subtle navbar border on scroll
                if (scrollY > 30) {
                    navbar?.classList.add('scrolled');
                } else {
                    navbar?.classList.remove('scrolled');
                }

                // Active section spy
                let currentSectionId = '';
                sections.forEach(section => {
                    const top = section.offsetTop - 120;
                    const height = section.offsetHeight;
                    if (scrollY >= top && scrollY < top + height) {
                        currentSectionId = section.getAttribute('id') || '';
                    }
                });

                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    const isActive = (href === '#' && (currentSectionId === '' || currentSectionId === 'hero')) || (href === `#${currentSectionId}`);
                    link.classList.toggle('active', isActive);
                });

                dockItems.forEach(item => {
                    const href = item.getAttribute('href');
                    const isActive = (href === '#' && (currentSectionId === '' || currentSectionId === 'hero')) || (href === `#${currentSectionId}`);
                    item.classList.toggle('active', isActive);
                });

                isTicking = false;
            });
            isTicking = true;
        }
    }, { passive: true });

    // 4. Smooth Scrolling for Internal Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 68,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Toast Notification Helper
    let toastTimer = null;
    function showToast(message) {
        if (!toast) return;
        if (toastMsg) toastMsg.textContent = message;
        toast.classList.add('show');

        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toast.classList.remove('show');
        }, 2800);
    }

    // 6. One-Click Copy to Clipboard
    document.querySelectorAll('[data-copy]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const text = btn.getAttribute('data-copy');
            if (!text) return;

            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(() => {
                    showToast(`Copied: ${text}`);
                }).catch(() => {
                    fallbackCopy(text);
                });
            } else {
                fallbackCopy(text);
            }
        });
    });

    function fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`Copied: ${text}`);
    }

    // 7. Clean Project Category Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card[data-category]');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = (card.getAttribute('data-category') || '').split(' ');
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 8. Academic Journey Accordion
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        const body = item.querySelector('.accordion-body');

        // Set initial state for items with .active
        if (item.classList.contains('active') && content && body) {
            content.style.maxHeight = body.scrollHeight + 40 + 'px';
        }

        header?.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            if (isActive) {
                content.style.maxHeight = body.scrollHeight + 40 + 'px';
                item.classList.remove('active');
                requestAnimationFrame(() => {
                    content.style.maxHeight = '0px';
                });
            } else {
                item.classList.add('active');
                content.style.maxHeight = body.scrollHeight + 40 + 'px';
                setTimeout(() => {
                    if (item.classList.contains('active')) {
                        content.style.maxHeight = 'none';
                    }
                }, 300);
            }
        });
    });

    // 9. Quick Message Contact Form
    const contactForm = document.getElementById('portfolio-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contact-name')?.value.trim();
            const email = document.getElementById('contact-email')?.value.trim();
            const subject = document.getElementById('contact-subject')?.value.trim() || 'Software Opportunity / Inquiry';
            const message = document.getElementById('contact-message')?.value.trim();

            if (!name || !email || !message) {
                showToast('Please fill out all required fields.');
                return;
            }

            const mailtoUri = `mailto:kabhilan2905@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Kabhilan,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            showToast('Opening email client...');
            setTimeout(() => {
                window.location.href = mailtoUri;
            }, 400);
        });
    }

    // 10. Interactive Vector Search Demo Simulation
    const vectorData = {
        firmware: {
            text: '"Embedded Firmware Engineer with C++ & FreeRTOS"',
            nco: '2152.0100',
            occupation: 'Electronics & Embedded Systems Engineer',
            confidence: '96.8% Confidence Match',
            latency: 'Execution: 38ms'
        },
        ml: {
            text: '"ML Engineer optimizing transformer inference on GPUs"',
            nco: '2512.0100',
            occupation: 'Machine Learning & Software Systems Specialist',
            confidence: '97.4% Confidence Match',
            latency: 'Execution: 42ms'
        },
        backend: {
            text: '"Healthcare API Architect with PostgreSQL & Microservices"',
            nco: '2511.0200',
            occupation: 'Database Architect & Enterprise Systems Analyst',
            confidence: '95.9% Confidence Match',
            latency: 'Execution: 34ms'
        }
    };

    const presetButtons = document.querySelectorAll('.demo-preset-btn');
    const queryText = document.getElementById('demo-query-text');
    const ncoCode = document.getElementById('demo-nco-code');
    const occupation = document.getElementById('demo-occupation');
    const confidence = document.getElementById('demo-confidence');
    const latency = document.getElementById('demo-latency');

    presetButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            presetButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const key = btn.getAttribute('data-query');
            const data = vectorData[key];
            if (data && queryText) {
                queryText.textContent = data.text;
                ncoCode.textContent = data.nco;
                occupation.textContent = data.occupation;
                confidence.textContent = data.confidence;
                latency.textContent = data.latency;
            }
        });
    });

    // 11. Command Palette (Cmd/Ctrl + K)
    const cmdBackdrop = document.getElementById('cmd-palette-modal');
    const cmdTriggerBtn = document.getElementById('cmd-trigger-btn');
    const cmdSearchInput = document.getElementById('cmd-search-input');
    const cmdItems = document.querySelectorAll('.cmd-item');

    function openCmdPalette() {
        if (!cmdBackdrop) return;
        cmdBackdrop.classList.add('active');
        if (cmdSearchInput) {
            cmdSearchInput.value = '';
            cmdSearchInput.focus();
            filterCmdItems('');
        }
    }

    function closeCmdPalette() {
        cmdBackdrop?.classList.remove('active');
    }

    cmdTriggerBtn?.addEventListener('click', openCmdPalette);

    window.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (cmdBackdrop?.classList.contains('active')) {
                closeCmdPalette();
            } else {
                openCmdPalette();
            }
        } else if (e.key === 'Escape' && cmdBackdrop?.classList.contains('active')) {
            closeCmdPalette();
        }
    });

    cmdBackdrop?.addEventListener('click', (e) => {
        if (e.target === cmdBackdrop) {
            closeCmdPalette();
        }
    });

    function filterCmdItems(query) {
        const q = query.toLowerCase().trim();
        cmdItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(q) ? 'flex' : 'none';
        });
    }

    cmdSearchInput?.addEventListener('input', (e) => {
        filterCmdItems(e.target.value);
    });

    cmdItems.forEach(item => {
        item.addEventListener('click', () => {
            const action = item.getAttribute('data-action');
            const target = item.getAttribute('data-target');

            closeCmdPalette();

            if (action === 'goto' && target) {
                const el = document.querySelector(target);
                if (el) {
                    window.scrollTo({
                        top: el.offsetTop - 68,
                        behavior: 'smooth'
                    });
                }
            } else if (action === 'repo') {
                const url = item.getAttribute('data-url');
                if (url) {
                    window.open(url, '_blank', 'noopener,noreferrer');
                }
            } else if (action === 'resume') {
                window.open('Kabhilan_VS_23ISR021_Resume.pdf', '_blank');
            } else if (action === 'copy-email') {
                if (navigator.clipboard) {
                    navigator.clipboard.writeText('kabhilan2905@gmail.com');
                    showToast('Copied: kabhilan2905@gmail.com');
                }
            }
        });
    });
});

