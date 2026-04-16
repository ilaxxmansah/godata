// Enhanced GoData Website JavaScript - Final Production Version
// Updated: Fixed Testimonial Fallback Data & Consolidated Functions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initDynamicContent();
    initMobileMenu();
    initSmoothScrolling();
    initScrollToTop();
    initHeaderScroll();
    initThemeToggle();
    initFormValidation();
    initNewsletterForm();
    initWhatsAppIntegration();
    initPerformanceOptimizations();
    initTestimonialSlider();
    
    console.log('GoData website initialized successfully');
});

/* ================= DYNAMIC CONTENT & RENDERING ================= */
function initDynamicContent() {
    const fallbackData = {
        stats: [
            { number: '50+', label: 'Projects Completed' },
            { number: '150+', label: 'Happy Clients' },
            { number: '24/7', label: 'Support Available' },
            { number: '99.9%', label: 'Uptime Guarantee' }
        ],
        services: [
            {
                icon: 'fa-cloud',
                title: 'Cloud Solutions',
                intro: 'Harness the power of the cloud with our scalable and secure cloud services.',
                points: [
                    { icon: 'fa-server', text: 'Scalable Cloud Infrastructure (IaaS)' },
                    { icon: 'fa-cloud-upload-alt', text: 'Managed Cloud Hosting (PaaS)' },
                    { icon: 'fa-cloud-download-alt', text: 'Cloud Security & Backup' },
                    { icon: 'fa-exchange-alt', text: 'Cloud Migration Services' }
                ]
            },
            {
                icon: 'fa-laptop-code',
                title: 'Web Development',
                intro: 'Elevate your digital footprint with our expert development services.',
                points: [
                    { icon: 'fa-code', text: 'Custom Web Application Development' },
                    { icon: 'fa-project-diagram', text: 'Enterprise Solutions' },
                    { icon: 'fa-shopping-cart', text: 'E-commerce Solutions' },
                    { icon: 'fa-paint-brush', text: 'UI/UX Design Services' }
                ]
            },
            {
                icon: 'fa-cogs',
                title: 'Managed IT Services',
                intro: 'Ensure seamless IT operations with proactive and responsive support.',
                points: [
                    { icon: 'fa-headset', text: '24/7 Remote & On-Site Support' },
                    { icon: 'fa-shield-alt', text: 'Cybersecurity Solutions' },
                    { icon: 'fa-network-wired', text: 'Network Management' },
                    { icon: 'fa-database', text: 'Backup & Disaster Recovery' }
                ]
            }
        ],
        testimonials: [
            {
                quote: 'Improved our efficiency by 300%. Their cloud solutions are top-notch.',
                author: 'Rajesh Kumar',
                company: 'Tech Solutions Ltd',
                stars: 5
            },
            {
                quote: 'Our new website increased lead generation significantly. Modern and responsive design.',
                author: 'Priya Sharma',
                company: 'Digital Agency',
                stars: 5
            },
            {
                quote: 'Delighted with our partnership with GoData. Our online presence is in great shape.',
                author: 'Akash Samania',
                company: 'A2GraphicMedia',
                stars: 5
            },
            {
                quote: 'Your engineer is thorough and polite. Issues always get resolved on time.',
                author: 'Meenakshi Gupta',
                company: 'Healthcare Industry Client',
                stars: 5
            },
            {
                quote: 'Handled 1000+ virtual event logins smoothly, even at the last minute. Great weekend support.',
                author: 'Sachin Bhatia',
                company: 'Event Management Client',
                stars: 5
            }
        ]
    };

    fetch('content.json', { cache: 'no-store' })
        .then(r => r.ok ? r.json() : Promise.reject())
        .then(data => renderDynamicSections(data))
        .catch(() => {
            console.warn('Using fallback data for sections');
            renderDynamicSections(fallbackData);
        });

    function renderDynamicSections(data) {
        renderStats(data.stats);
        renderServices(data.services);
        renderTestimonials(data.testimonials);
        // Trigger animations after content is added to DOM
        initScrollAnimations();
        initStatCounters();
        observeServiceCards();
    }

    function renderStats(items) {
        const grid = document.getElementById('statsGrid');
        if (!grid) return;
        grid.innerHTML = (items || []).map(i => `
            <div class="stat-item">
                <div class="stat-number">${i.number}</div>
                <div class="stat-label">${i.label}</div>
            </div>`).join('');
    }

    function renderServices(items) {
        const grid = document.getElementById('servicesGrid');
        if (!grid) return;
        grid.innerHTML = (items || []).map(s => `
            <div class="service">
                <i class="fas ${s.icon}"></i>
                <h3>${s.title}</h3>
                <p>${s.intro}</p>
                <ul>${(s.points || []).map(p => `<li><i class="fas ${p.icon}"></i> ${p.text}</li>`).join('')}</ul>
            </div>`).join('');
    }

    function renderTestimonials(items) {
        const grid = document.getElementById('testimonialsGrid');
        if (!grid) return;
        grid.innerHTML = (items || []).map(t => `
            <div class="testimonial">
                <p>"${t.quote}"</p>
                <div class="stars">${'★'.repeat(t.stars || 5)}</div>
                <h4>${t.author}</h4>
                <span>${t.company}</span>
            </div>`).join('');
    }
}

/* ================= UI COMPONENTS & INTERACTION ================= */

function initThemeToggle() {
    const root = document.documentElement;
    const toggleBtn = document.getElementById('themeToggle');
    if (!toggleBtn) return;

    const applyTheme = (theme) => {
        root.setAttribute('data-color-scheme', theme);
        toggleBtn.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('godata_theme', theme);
    };

    const stored = localStorage.getItem('godata_theme');
    applyTheme(stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

    toggleBtn.addEventListener('click', () => {
        const current = root.getAttribute('data-color-scheme');
        applyTheme(current === 'dark' ? 'light' : 'dark');
    });
}

function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-links');
    const overlay = document.querySelector('.overlay');
    if (!toggle || !nav) return;

    const toggleMenu = () => {
        const isOpen = nav.classList.toggle('active');
        overlay?.classList.toggle('active');
        toggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    toggle.addEventListener('click', toggleMenu);
    if (overlay) overlay.addEventListener('click', toggleMenu);
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) toggleMenu();
        });
    });
}

/* ================= SCROLLING & ANIMATIONS ================= */

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const headerHeight = document.querySelector('header')?.offsetHeight || 80;
                window.scrollTo({
                    top: target.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initScrollToTop() {
    const btn = document.getElementById('scrollToTop');
    if (!btn) return;
    window.addEventListener('scroll', throttle(() => {
        btn.classList.toggle('show', window.pageYOffset > 300);
    }, 100));
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    window.addEventListener('scroll', throttle(() => {
        header.classList.toggle('scrolled', window.pageYOffset > 50);
    }, 100));
}

function initScrollAnimations() {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.services-grid, .stats-grid, .about-content, .service').forEach(el => observer.observe(el));
}

function initStatCounters() {
    const numbers = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animate();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const animate = () => {
        numbers.forEach(el => {
            const originalText = el.innerText;
            const numericValue = parseInt(originalText.replace(/[^\d]/g, ''));
            if (isNaN(numericValue)) return;

            let current = 0;
            const duration = 2000; // 2 seconds
            const stepTime = 30;
            const increment = numericValue / (duration / stepTime);

            const timer = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    el.innerText = originalText;
                    clearInterval(timer);
                } else {
                    el.innerText = Math.floor(current) + (originalText.includes('+') ? '+' : '');
                }
            }, stepTime);
        });
    };

    const section = document.querySelector('.stats-section');
    if (section) observer.observe(section);
}

function initTestimonialSlider() {
    const slider = document.getElementById('testimonialsGrid');
    if (!slider) return;
    
    let isPaused = false;
    slider.addEventListener('mouseenter', () => isPaused = true);
    slider.addEventListener('mouseleave', () => isPaused = false);

    setInterval(() => {
        if (isPaused) return;
        const step = slider.clientWidth;
        if (slider.scrollLeft + step >= slider.scrollWidth - 10) {
            slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            slider.scrollBy({ left: step, behavior: 'smooth' });
        }
    }, 5000);
}

/* ================= FORMS & INTEGRATIONS ================= */

function initFormValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerText;
        
        btn.disabled = true;
        btn.innerText = 'Sending Message...';
        
        // Simulating API call/submission
        setTimeout(() => {
            alert('🎉 Thank you! Your message has been sent successfully. We will get back to you soon.');
            form.reset();
            btn.disabled = false;
            btn.innerText = originalText;
        }, 2000);
    });
}

function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        if (email) {
            alert('📧 Thanks for subscribing to our newsletter!');
            form.reset();
        }
    });
}

function initWhatsAppIntegration() {
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', () => {
            console.log('WhatsApp contact button clicked');
        });
    });
}

function initPerformanceOptimizations() {
    // Add lazy loading to images that don't have it
    document.querySelectorAll('img').forEach(img => {
        if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
    });
}

function observeServiceCards() {
    const cards = document.querySelectorAll('.service');
    cards.forEach((card, i) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "all 0.6s ease-out";
        
        // Simple delay effect
        setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, 200 * i);
    });
}

/* ================= UTILITY FUNCTIONS ================= */

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}