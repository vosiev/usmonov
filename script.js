document.addEventListener('DOMContentLoaded', () => {

    const bgMusic = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle');
    const musicIcon = document.getElementById('music-icon');
    let isPlaying = false;

    bgMusic.volume = 0.25;

    const startMusic = () => {
        if (!isPlaying) {
            bgMusic.play().then(() => {
                isPlaying = true;
                musicIcon.className = 'fa-solid fa-volume-high';
            }).catch(() => {});
        }
    };

    document.addEventListener('click', startMusic, { once: true });
    document.addEventListener('scroll', startMusic, { once: true });

    musicToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isPlaying) {
            bgMusic.pause();
            isPlaying = false;
            musicIcon.className = 'fa-solid fa-volume-xmark';
        } else {
            bgMusic.play().then(() => {
                isPlaying = true;
                musicIcon.className = 'fa-solid fa-volume-high';
            }).catch(() => {});
        }
    });

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    const contactForm = document.getElementById('contact-form');
    const formToast = document.getElementById('form-toast');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        formToast.classList.remove('hidden');
        contactForm.reset();

        setTimeout(() => {
            formToast.classList.add('hidden');
        }, 5000);
    });

    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    const animateStats = () => {
        statNumbers.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            if (!target) return;

            let current = 0;
            const increment = target / 50;

            const updateCount = () => {
                current += increment;
                if (current < target) {
                    stat.innerText = Math.ceil(current) + (target === 100 ? '%' : '+');
                    setTimeout(updateCount, 30);
                } else {
                    stat.innerText = target + (target === 100 ? '%' : '+');
                }
            };

            updateCount();
        });
    };

    const statsSection = document.getElementById('stats');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animateStats();
                animated = true;
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        observer.observe(statsSection);
    }
});
