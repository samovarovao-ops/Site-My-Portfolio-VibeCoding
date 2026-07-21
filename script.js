/**
 * Portfolio — Ольга Самоварова
 * Modern scroll animations, parallax, and interactivity
 */

(function () {
    'use strict';

    // ============================================
    // Scroll Reveal with Intersection Observer
    // ============================================
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Unobserve after reveal for performance
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
        }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    // ============================================
    // Navigation — Scroll Effect
    // ============================================
    const nav = document.getElementById('nav');
    let lastScrollY = 0;

    function handleNavScroll() {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            nav.classList.add('nav--scrolled');
        } else {
            nav.classList.remove('nav--scrolled');
        }

        lastScrollY = scrollY;
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // ============================================
    // Mobile Menu
    // ============================================
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-menu__link');

    function toggleMobileMenu() {
        burger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    burger.addEventListener('click', toggleMobileMenu);

    mobileLinks.forEach((link) => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth',
                });
            }
        });
    });

    // ============================================
    // Parallax Background Glows
    // ============================================
    const glows = document.querySelectorAll('.bg-glow');

    function handleParallax() {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;

        glows.forEach((glow, index) => {
            const speed = 0.03 + index * 0.01;
            const yOffset = scrollY * speed;
            const xOffset = Math.sin(scrollY * 0.001 + index) * 20;
            glow.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    }

    window.addEventListener('scroll', handleParallax, { passive: true });

    // ============================================
    // Mouse Glow Effect on Cards
    // ============================================
    const cards = document.querySelectorAll('.case-card, .skill-group, .contact__card');

    cards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // ============================================
    // Staggered Reveal for Grid Items
    // ============================================
    const grids = document.querySelectorAll('.cases__grid, .skills__grid');

    grids.forEach((grid) => {
        const children = grid.children;
        const gridObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        Array.from(children).forEach((child, index) => {
                            setTimeout(() => {
                                child.style.opacity = '1';
                                child.style.transform = 'translateY(0)';
                            }, index * 100);
                        });
                        gridObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        // Set initial state
        Array.from(children).forEach((child) => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(30px)';
            child.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        gridObserver.observe(grid);
    });

    // ============================================
    // Typing Effect for Hero Badge
    // ============================================
    const badge = document.querySelector('.hero__badge');
    if (badge) {
        const text = badge.textContent;
        badge.textContent = '';
        badge.style.opacity = '1';

        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                badge.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }

        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }

    // ============================================
    // Tilt Effect on Case Cards (desktop only)
    // ============================================
    if (window.matchMedia('(min-width: 768px)').matches) {
        const caseCards = document.querySelectorAll('.case-card');

        caseCards.forEach((card) => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }

    // ============================================
    // Active Nav Link on Scroll
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    function highlightNavLink() {
        const scrollY = window.scrollY + 100;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink, { passive: true });

    // ============================================
    // Contact Form Handling
    // ============================================
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn__text');
            const btnLoader = submitBtn.querySelector('.btn__loader');

            // Show loading state
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-flex';

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Show success message
                    contactForm.style.display = 'none';
                    formSuccess.style.display = 'block';
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                // Fallback: submit traditionally
                contactForm.submit();
            }
        });
    }

    // ============================================
    // Preload Critical Resources
    // ============================================
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            // Preload GitHub avatar or other resources if needed
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = 'https://raw.githubusercontent.com';
            document.head.appendChild(link);
        });
    }

    // ============================================
    // Console Easter Egg
    // ============================================
    console.log(
        '%c{ Ольга Самоварова }',
        'background: linear-gradient(135deg, #6c5ce7, #00cec9); color: white; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: bold;'
    );
    console.log('%cСоздаю MVP за дни, а не месяцы 🚀', 'color: #8888a0; font-size: 12px;');

})();
