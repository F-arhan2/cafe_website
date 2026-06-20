document.addEventListener('DOMContentLoaded', () => {

    // 1. Dynamic Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Menu Explore Button Toggle Logic
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const hiddenItems = document.querySelectorAll('.hidden-item');
    let isExpanded = false;

    loadMoreBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;
        hiddenItems.forEach(item => {
            // Keep filter consistency when expanding items
            const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
            if (activeFilter === 'all' || item.dataset.category === activeFilter) {
                item.style.display = isExpanded ? 'block' : 'none';
            }
            if (isExpanded) { item.classList.remove('hidden-item'); }
            else { item.classList.add('hidden-item'); }
        });
        loadMoreBtn.textContent = isExpanded ? 'Show Less' : 'Explore More';
    });

    // NEW ELEMENT LOGIC: Menu Filter Categories 
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Toggle Active Filter Class
            document.querySelector('.filter-btn.active').classList.remove('active');
            e.target.classList.add('active');

            const filterValue = e.target.dataset.filter;

            menuItems.forEach(item => {
                const matchesFilter = filterValue === 'all' || item.dataset.category === filterValue;
                const isNotHiddenRow = !item.classList.contains('hidden-item') || isExpanded;

                if (matchesFilter && isNotHiddenRow) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // NEW ELEMENT LOGIC: Testimonial Carousel Slider
    const slides = document.querySelectorAll('.testimonial-slide');
    const nextBtn = document.getElementById('nextSlide');
    const prevBtn = document.getElementById('prevSlide');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    function startSlideShow() {
        slideInterval = setInterval(() => { showSlide(currentSlide + 1); }, 5000);
    }

    nextBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        showSlide(currentSlide + 1);
        startSlideShow();
    });

    prevBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        showSlide(currentSlide - 1);
        startSlideShow();
    });

    startSlideShow(); // Initialize Carousel Auto-play

    // NEW ELEMENT LOGIC: Scroll-Triggered Animated Numbers Counter
    const counters = document.querySelectorAll('.counter');
    let counted = false;

    const startCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const speed = target / 100; // Adjust for smoothness

                if (count < target) {
                    counter.innerText = Math.ceil(count + speed);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target.toLocaleString() + (target > 100 ? '+' : '');
                }
            };
            updateCount();
        });
    };

    // Simple intersection observer to see when user scrolls to stats section
    window.addEventListener('scroll', () => {
        const statsSection = document.querySelector('.stats-section');
        if (!statsSection) return;
        const position = statsSection.getBoundingClientRect();

        // Check if element is visible on screen
        if (position.top < window.innerHeight && position.bottom >= 0 && !counted) {
            startCounters();
            counted = true;
        }
    });

    // 4. Contact Modal Logic
    const modal = document.getElementById('contactModal');
    const openModalBtn = document.getElementById('openContact');
    const closeModalSpan = document.querySelector('.close-modal');
    const contactForm = document.getElementById('cafeForm');

    openModalBtn.addEventListener('click', () => { modal.style.display = 'flex'; });
    closeModalSpan.addEventListener('click', () => { modal.style.display = 'none'; });

    window.addEventListener('click', (e) => {
        if (e.target === modal) { modal.style.display = 'none'; }
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for reaching out! The team at MochaMuse will contact you shortly.');
        contactForm.reset();
        modal.style.display = 'none';
    });
});