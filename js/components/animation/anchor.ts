import ScrollToAnchor from './scroll-to-anchor';

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.js-anchor');
    links.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            ScrollToAnchor(href, 20);
        });
    });
});
