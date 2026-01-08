// Function to initialize features after header/footer load
function initSiteFeatures() {
    // Mobile Menu Toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Optional: Change hamburger to X
            mobileMenu.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });
    }

    // Dark Mode Toggle
    const darkToggle = document.getElementById('dark-toggle');
    if (darkToggle) {
        darkToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDark);
            // Change icon
            darkToggle.textContent = isDark ? '☀️' : '🌙';
        });
    }

    // Load saved dark mode
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        if (darkToggle) darkToggle.textContent = '☀️';
    }

    // Highlight active nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href').split('/').pop();
        if (href === currentPage) {
            link.classList.add('active');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Run after page load
window.addEventListener('load', () => {
    // Header/Footer load hone ke baad features init karo
    setTimeout(initSiteFeatures, 300); // Safe delay for fetch complete
});

// Agar fetch fast hai to direct bhi call kar sakte hain
// But timeout safe rahega
