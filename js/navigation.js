// ==================== Navigation Functionality ==================== //

document.addEventListener('DOMContentLoaded', function () {
    console.log('Navigation module loaded');

    // Handle sidebar link active states
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            // Remove active class from all items
            navItems.forEach(link => link.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
        });
    });

    // Highlight sidebar item based on current page
    const currentPath = window.location.pathname;
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (currentPath.includes(href) ||
            (currentPath.includes('pages/') && !href.includes('#'))) {
            item.classList.add('active');
        }
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
