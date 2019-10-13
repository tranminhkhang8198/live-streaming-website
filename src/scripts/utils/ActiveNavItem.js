const currentPage = window.location.pathname.replace(/.html/, '');

const navLinks = Array.from(document.querySelectorAll('.nav-link'));
navLinks.forEach(item => {
    if (item.getAttribute('href') === currentPage) {
        item.classList.add('active');
    };
});
