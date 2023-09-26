import { slideToggle } from '@js/components/animation/toggle';

document.addEventListener('DOMContentLoaded', () => {
    const { body } = document;
    const jsMenuBurger = document.querySelector('.js-menu-burger');
    let wintop = 0;

    jsMenuBurger.addEventListener('click', (e) => {
        e.preventDefault();
        if (!body.classList.contains('menu-show')) {
            wintop = window.scrollY;
            body.classList.add('menu-show');
            body.style.top = `-${wintop}px`;
            body.style.setProperty('--wintop', `${wintop}px`);
        } else {
            body.classList.remove('menu-show');
            window.scroll(0, wintop);
            body.style.removeProperty('top');
            body.style.removeProperty('--wintop');
        }
    });

    // const links = document.querySelectorAll('.js-menu-toggle');
    // links.forEach((link) => {
    //     link.addEventListener('click', (e) => {
    //         if (window.matchMedia('(max-width: 1279px)').matches) {
    //             e.preventDefault();
    //             const target = link.nextElementSibling;
    //             slideToggle(link, target, 300);
    //         }
    //     });
    // });
});
