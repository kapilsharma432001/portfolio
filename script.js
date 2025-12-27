// ===== Custom Cursor =====
const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');

let mouseX = 0, mouseY = 0;
let outlineX = 0, outlineY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
});

// Smooth follow for outline
function animateCursor() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;

    cursorOutline.style.left = outlineX + 'px';
    cursorOutline.style.top = outlineY + 'px';

    requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .work-item, .skill-block');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
});

// ===== Navigation =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll effect
let lastScroll = 0;
const scrollHint = document.querySelector('.scroll-hint');

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Hide scroll hint when scrolled past hero
    if (scrollHint) {
        if (currentScroll > 100) {
            scrollHint.style.opacity = '0';
        } else {
            scrollHint.style.opacity = '1';
        }
    }

    lastScroll = currentScroll;
});

// Mobile menu
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in to elements
document.querySelectorAll('.work-item, .skill-block, .about-main, .about-sidebar, .contact-main, .contact-aside').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(el);
});

// Stagger animation for skill blocks
document.querySelectorAll('.skill-block').forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.1}s`;
});

// ===== Console Easter Egg =====
console.log('%c Hey there, curious developer! 👋', 'font-size: 16px; font-weight: bold; color: #5eead4;');
console.log('%c Looking for bugs? I promise there aren\'t any... probably.', 'font-size: 12px; color: #888;');
console.log('%c Feel free to reach out: kapil.sharma.dev04@gmail.com', 'font-size: 12px; color: #888;');

// ===== Keyboard Navigation Easter Egg =====
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join('') === konamiSequence.join('')) {
        document.body.style.transition = 'filter 0.5s ease';
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = '';
        }, 2000);
    }
});

// ===== Page Load Animation =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Animate hero elements
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-links');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.transitionDelay = `${0.2 + index * 0.1}s`;

        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 50);
    });
});

// ===== Link Hover Sound (subtle) =====
// Uncomment if you want subtle hover sounds
// const hoverSound = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10...');
// hoverElements.forEach(el => {
//     el.addEventListener('mouseenter', () => {
//         hoverSound.currentTime = 0;
//         hoverSound.volume = 0.1;
//         hoverSound.play().catch(() => {});
//     });
// });

// ===== Current Year in Footer =====
const yearElement = document.querySelector('.footer-year');
if (yearElement) {
    yearElement.textContent = `© ${new Date().getFullYear()}`;
}

// ===== Terminal Typing Animation =====
const terminalCommands = [
    {
        command: 'cat about.txt',
        output: [
            '→ Backend Engineer with 4.5+ years of experience',
            '→ Python • FastAPI • Django • AWS enthusiast',
            '→ Currently building @ Tiger Analytics',
            '→ Making machines think (sometimes correctly)'
        ]
    },
    {
        command: 'ls skills/',
        output: [
            'python/  aws/  databases/  docker/',
            'terraform/  langchain/  fastapi/'
        ]
    },
    {
        command: './run_server.py --mode=awesome',
        output: [
            '🚀 Server starting on port 8000...',
            '✓ API ready to handle your requests!'
        ]
    }
];

let currentCommandIndex = 0;
let currentCharIndex = 0;
let isTyping = false;
let isDeleting = false;
const typingElement = document.getElementById('typing-command');
const outputElement = document.getElementById('terminal-output');
const cursorElement = document.querySelector('.terminal-cursor');

function typeCommand() {
    if (!typingElement) return;

    const currentCmd = terminalCommands[currentCommandIndex];

    if (!isDeleting) {
        // Typing the command
        if (currentCharIndex < currentCmd.command.length) {
            typingElement.textContent += currentCmd.command[currentCharIndex];
            currentCharIndex++;
            setTimeout(typeCommand, 50 + Math.random() * 50);
        } else {
            // Command complete, show output
            setTimeout(showOutput, 300);
        }
    }
}

function showOutput() {
    const currentCmd = terminalCommands[currentCommandIndex];
    outputElement.innerHTML = '';

    currentCmd.output.forEach((line, index) => {
        setTimeout(() => {
            const lineEl = document.createElement('div');
            lineEl.className = 'output-line';
            lineEl.textContent = line;
            lineEl.style.animationDelay = `${index * 0.1}s`;
            outputElement.appendChild(lineEl);

            // After last line, wait and move to next command
            if (index === currentCmd.output.length - 1) {
                setTimeout(nextCommand, 2500);
            }
        }, index * 200);
    });
}

function nextCommand() {
    // Clear for next command
    typingElement.textContent = '';
    outputElement.innerHTML = '';
    currentCharIndex = 0;
    currentCommandIndex = (currentCommandIndex + 1) % terminalCommands.length;

    setTimeout(typeCommand, 500);
}

// Start terminal animation after page load
setTimeout(() => {
    typeCommand();
}, 1000);

// ===== Animated Stats Counter =====
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;

    const statsSection = document.querySelector('.stats-grid');
    if (!statsSection) return;

    const rect = statsSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible) {
        statsAnimated = true;

        statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.target);
            const suffix = stat.dataset.suffix || '';
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(counter);
                }

                // Format large numbers
                if (target >= 1000) {
                    stat.textContent = Math.floor(current).toLocaleString() + suffix;
                } else {
                    stat.textContent = Math.floor(current) + suffix;
                }
            }, 16);
        });
    }
}

window.addEventListener('scroll', animateStats);
// Check on load too
setTimeout(animateStats, 500);

// ===== Orbit Skill Interactions =====
const orbitItems = document.querySelectorAll('.orbit-item');
const coreInner = document.querySelector('.core-inner');
const skillCards = document.querySelectorAll('.skill-detail-card');

function showSkillDetail(skillName) {
    skillCards.forEach(card => {
        card.classList.remove('active');
        if (card.dataset.detail === skillName) {
            card.classList.add('active');
        }
    });
}

function showDefaultDetail() {
    skillCards.forEach(card => {
        card.classList.remove('active');
        if (card.dataset.detail === 'default') {
            card.classList.add('active');
        }
    });
}

orbitItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const skillName = item.dataset.skill;
        showSkillDetail(skillName);
    });

    item.addEventListener('mouseleave', () => {
        showDefaultDetail();
    });

    // Also add cursor hover effect
    item.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
    item.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
});

if (coreInner) {
    coreInner.addEventListener('mouseenter', () => {
        showSkillDetail('Python');
    });

    coreInner.addEventListener('mouseleave', () => {
        showDefaultDetail();
    });

    coreInner.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
    coreInner.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
}

// ===== Enhanced Scroll Reveal for Stats =====
const statsCards = document.querySelectorAll('.stat-card');
statsCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    card.style.transitionDelay = `${index * 0.1}s`;
});

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

statsCards.forEach(card => statsObserver.observe(card));

// ===== Terminal Window Hover Effect =====
const terminalWindow = document.querySelector('.terminal-window');
if (terminalWindow) {
    terminalWindow.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
    terminalWindow.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
}
