import { slideToggle } from '@js/components/animation/toggle';

document.addEventListener('DOMContentLoaded', () => {
    const { body } = document;
    const jsMenuBurger = document.querySelector('.js-menu-burger');
    let winTop = 0;

    jsMenuBurger?.addEventListener('click', (e) => {
        e.preventDefault();
        if (!body.classList.contains('menu-show')) {
            winTop = window.scrollY;
            body.classList.add('menu-show');
            body.style.top = `-${winTop}px`;
            body.style.setProperty('--wintop', `${winTop}px`);
        } else {
            body.classList.remove('menu-show');
            document
                .querySelector('html')
                ?.classList.add('scroll-smooth-disabled');
            window.scroll(0, winTop);
            document
                .querySelector('html')
                ?.classList.remove('scroll-smooth-disabled');
            body.style.removeProperty('top');
            body.style.removeProperty('--wintop');

            const menuShows = document.querySelectorAll('.header-menu-show');
            menuShows.forEach((item) => {
                item.classList.remove('header-menu-show');
            });
        }
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

    document.body.addEventListener('click', (e) => {
        const target = e.target as Element;
        if (
            target.classList.contains('js-menu-more') ||
            target.closest('.js-menu-more')
        ) {
            e.preventDefault();
            const link = target.classList.contains('js-menu-more')
                ? target
                : target.closest('.js-menu-more');
            link?.parentElement?.classList.add('hide');
        }
    });
});
