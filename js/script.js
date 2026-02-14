// ========================================
// SMOOTH SCROLL BEHAVIOR
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Trigger fade-in animation for the element box
            entry.target.classList.add('visible');

            // Trigger drop-in animation for the image inside
            const imageElement = entry.target.querySelector('.element-image img');
            if (imageElement) {
                // Use a small delay to ensure the class is applied after the element is in view
                setTimeout(() => {
                    imageElement.classList.add('animate');
                }, 10);
            }

            // Optional: Stop observing after element is visible
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all element boxes for fade-in animation
document.querySelectorAll('.element-box').forEach(element => {
    observer.observe(element);
});

// Observe all team members for fade-in animation
document.querySelectorAll('.team-member').forEach(element => {
    observer.observe(element);
});

// ========================================
// OPTIONAL: ADD ACTIVE STATE TO NAV LINKS
// ========================================

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.footer-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
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

// ========================================
// PAGE LOAD ANIMATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Add a small delay to ensure everything is loaded
    document.body.style.opacity = '1';
});

// Set initial opacity
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease-in';
setTimeout(() => {
    document.body.style.opacity = '1';
}, 100);

