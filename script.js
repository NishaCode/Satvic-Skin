// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Header Scroll Effect ---
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Navigation ---
    const menuBtn = document.querySelector('.menu-btn');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');
    
    menuBtn.addEventListener('click', () => {
        navList.classList.toggle('active');
        
        // Toggle menu icon
        const svg = menuBtn.querySelector('svg');
        if (navList.classList.contains('active')) {
            svg.innerHTML = '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>';
        } else {
            svg.innerHTML = '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>';
        }
    });
    
    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            menuBtn.querySelector('svg').innerHTML = '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>';
        });
    });

    // --- Active Link Switching on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    
    function scrollActive() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const link = document.querySelector(`.nav-link[href*="${sectionId}"]`);
            
            if (link) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }
    window.addEventListener('scroll', scrollActive);

    // --- Scroll Animations (Intersection Observer) ---
    const faders = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);
    
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // --- Shopping Cart Functionality ---
    const cartBtns = document.querySelectorAll('.add-to-cart-btn');
    const cartCountEl = document.querySelector('.cart-count');
    let cartCount = 0;
    
    cartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productName = btn.getAttribute('data-product');
            
            // Add slight animation to button
            btn.textContent = 'Added!';
            btn.style.backgroundColor = 'var(--clr-accent-dark)';
            btn.style.color = 'var(--clr-white)';
            
            setTimeout(() => {
                btn.textContent = 'Add to Cart';
                btn.style.backgroundColor = '';
                btn.style.color = '';
            }, 2000);
            
            // Update cart count
            cartCount++;
            cartCountEl.textContent = cartCount;
            
            // Pulse animation on cart icon
            cartCountEl.style.transform = 'scale(1.3)';
            setTimeout(() => {
                cartCountEl.style.transform = 'scale(1)';
            }, 300);
            
            console.log(`Added ${productName} to cart.`);
        });
    });

    // --- Newsletter Form Submission ---
    const newsletterForm = document.getElementById('newsletterForm');
    const formMsg = document.getElementById('formMsg');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            
            if (emailInput.value) {
                formMsg.textContent = "Thank you for subscribing! Welcome to the family.";
                formMsg.style.color = "var(--clr-accent)";
                emailInput.value = '';
                
                setTimeout(() => {
                    formMsg.textContent = "";
                }, 5000);
            }
        });
    }
});
