const header = document.querySelector('.site-header');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('primaryNav');
const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const sections = Array.from(document.querySelectorAll('main section[id]'));
const copyEmailButton = document.getElementById('copyEmail');

function setHeaderState() {
    header?.classList.toggle('scrolled', window.scrollY > 8);
}

function closeNav() {
    navMenu?.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
    navToggle?.setAttribute('aria-label', 'Open navigation menu');
    document.body.classList.remove('nav-open');
}

navToggle?.addEventListener('click', () => {
    const isOpen = navMenu?.classList.toggle('is-open') ?? false;
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    document.body.classList.toggle('nav-open', isOpen);
});

navLinks.forEach((link) => {
    link.addEventListener('click', closeNav);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeNav();
    }
});

if ('IntersectionObserver' in window) {
    const activeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            navLinks.forEach((link) => {
                link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
            });
        });
    }, {
        rootMargin: '-35% 0px -55% 0px',
        threshold: 0
    });

    sections.forEach((section) => activeObserver.observe(section));

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.08
    });

    document.querySelectorAll('.reveal').forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    document.querySelectorAll('.reveal').forEach((element) => {
        element.classList.add('is-visible');
    });
}

copyEmailButton?.addEventListener('click', async () => {
    const email = copyEmailButton.dataset.email;
    if (!email) return;

    try {
        await navigator.clipboard.writeText(email);
        const originalText = copyEmailButton.textContent;
        copyEmailButton.textContent = 'Email Copied';
        window.setTimeout(() => {
            copyEmailButton.textContent = originalText;
        }, 1800);
    } catch {
        window.location.href = `mailto:${email}`;
    }
});

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });
