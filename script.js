document.addEventListener('DOMContentLoaded', () => {

    // 1. Изменение шапки при скролле
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });

    // 2. Переключение мобильного меню
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

    // 3. Обработка формы контактов
    const contactForm = document.getElementById('contact-form');
    const formToast = document.getElementById('form-toast');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Показываем сообщение об успехе
        formToast.classList.remove('hidden');
        contactForm.reset();

        // Скрываем через 5 секунд
        setTimeout(() => {
            formToast.classList.add('hidden');
        }, 5000);
    });

    // 4. Анимация цифр в блоке статистики
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

    // Запуск анимации при прокрутке до блока
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
