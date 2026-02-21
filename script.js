/**
 * BİRKAN ELEKTRİK - Interactive JavaScript
 * Modern animations and interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // PRELOADER
    // ============================================
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('hide');
        }, 2000);
    });
    
    // ============================================
    // AOS ANIMATION INITIALIZATION
    // ============================================
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
    
    // ============================================
    // SCROLL PROGRESS BAR
    // ============================================
    const scrollProgress = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    });
    
    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ============================================
    // MOBILE NAVIGATION
    // ============================================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // ============================================
    // ACTIVE NAV LINK ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // ============================================
    // COUNTER ANIMATION
    // ============================================
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 20);
            } else {
                counter.innerText = target;
                // Add '+' or '%' suffix
                if (target === 5000) counter.innerText = target + '+';
                if (target === 100) counter.innerText = target + '%';
            }
        });
    };
    
    // Trigger counter animation when hero section is visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateCounters, 500);
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
    
    // ============================================
    // TESTIMONIALS SLIDER
    // ============================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let autoSlideInterval;
    
    function showSlide(index) {
        testimonialCards.forEach((card, i) => {
            card.classList.remove('active');
            dots[i].classList.remove('active');
        });
        
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonialCards.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
        showSlide(currentSlide);
    }
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    nextBtn.addEventListener('click', function() {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });
    
    prevBtn.addEventListener('click', function() {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            stopAutoSlide();
            currentSlide = index;
            showSlide(currentSlide);
            startAutoSlide();
        });
    });
    
    startAutoSlide();
    
    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ============================================
    // CONTACT FORM HANDLING
    // ============================================
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const modalClose = document.querySelector('.modal-close');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Validate phone number (basic Turkish phone validation)
        const phoneRegex = /^[0-9]{10,11}$/;
        const phoneDigits = data.phone.replace(/\D/g, '');
        
        if (!phoneRegex.test(phoneDigits)) {
            alert('Lütfen geçerli bir telefon numarası girin.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Show success modal
            successModal.classList.add('active');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Log form data (in real scenario, send to server)
            console.log('Form Data:', data);
        }, 1500);
    });
    
    // Close modal
    modalClose.addEventListener('click', function() {
        successModal.classList.remove('active');
    });
    
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            successModal.classList.remove('active');
        }
    });
    
    // ============================================
    // PHONE NUMBER FORMATTING
    // ============================================
    const phoneInput = document.getElementById('phone');
    
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            if (value.length <= 4) {
                value = value;
            } else if (value.length <= 7) {
                value = value.slice(0, 4) + ' ' + value.slice(4);
            } else if (value.length <= 9) {
                value = value.slice(0, 4) + ' ' + value.slice(4, 7) + ' ' + value.slice(7);
            } else {
                value = value.slice(0, 4) + ' ' + value.slice(4, 7) + ' ' + value.slice(7, 9) + ' ' + value.slice(9, 11);
            }
        }
        
        e.target.value = value;
    });
    
    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // SCROLL REVEAL ANIMATION (Fallback for AOS)
    // ============================================
    const revealElements = document.querySelectorAll('.service-card, .why-card, .about-feature');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initial check
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
    
    // ============================================
    // PARALLAX EFFECT FOR HERO
    // ============================================
    const heroBg = document.querySelector('.hero-bg');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // ============================================
    // INTERACTIVE SERVICE CARDS
    // ============================================
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ============================================
    // MAGNETIC BUTTON EFFECT
    // ============================================
    const magneticBtns = document.querySelectorAll('.btn-primary, .nav-cta');
    
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
    
    // ============================================
    // KEYBOARD NAVIGATION SUPPORT
    // ============================================
    document.addEventListener('keydown', function(e) {
        // ESC key to close mobile menu
        if (e.key === 'Escape') {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            
            // Close modal if open
            if (successModal.classList.contains('active')) {
                successModal.classList.remove('active');
            }
        }
    });
    
    // ============================================
    // PERFORMANCE: PAUSE ANIMATIONS WHEN TAB HIDDEN
    // ============================================
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopAutoSlide();
        } else {
            startAutoSlide();
        }
    });
    
    // ============================================
    // CONSOLE WELCOME MESSAGE
    // ============================================
    console.log('%c🔌 BİRKAN ELEKTRİK', 'font-size: 24px; font-weight: bold; color: #ffd700;');
    console.log('%cProfesyonel Elektrik Hizmetleri', 'font-size: 14px; color: #ff6b35;');
    console.log('%c📞 0555 123 45 67 | 7/24 Acil Servis', 'font-size: 12px; color: #666;');
    
});

// ============================================
// LAZY LOADING FOR IMAGES (if added later)
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// SERVICE WORKER REGISTRATION (for PWA)
// ============================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service-worker.js is created
        // navigator.serviceWorker.register('/service-worker.js');
    });
}
