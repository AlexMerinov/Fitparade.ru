import { slideToggle } from '@js/components/animation/toggle';

document.addEventListener('DOMContentLoaded', () => {
    const { body } = document;
    const jsMenuBurger = document.querySelector('.js-menu-burger');
    let wintop = 0;

    jsMenuBurger?.addEventListener('click', (e) => {
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

            const menuShows = document.querySelectorAll('.header-menu-show');
            menuShows.forEach((item) => {
                item.classList.remove('header-menu-show');
            });
        }
    });

    const linksMore = document.querySelectorAll('.js-menu-more');
    linksMore.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            link.parentElement?.classList.add('hide');
        });
    });

    const linksArr = document.querySelectorAll('.js-menu-arr');
    linksArr.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            link.closest('li')?.classList.add('header-menu-show');
        });
    });

    const linksBack = document.querySelectorAll('.js-menu-back');
    linksBack.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            link.closest('.header-menu-show')?.classList.remove(
                'header-menu-show'
            );
        });
    });

    const linksToggle = document.querySelectorAll('.js-menu-toggle');
    linksToggle.forEach((link) => {
        link.addEventListener('click', (e) => {
            // if (window.matchMedia('(max-width: 1279px)').matches) {
            e.preventDefault();
            const target = link.nextElementSibling;
            slideToggle(link, target, 300);
            // }
        });
    });
});
