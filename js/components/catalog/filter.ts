document.addEventListener(
    'DOMContentLoaded',
    () => {
        // Кнопка корзины на мобиле

        let winTop = 0;

        document.body.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (
                target.classList.contains('js-modal-filter-show') ||
                target.closest('.js-modal-filter-show')
            ) {
                e.preventDefault();

                winTop = window.scrollY;
                document.body.classList.add('filter-modal-show');
                document.body.style.top = `-${winTop}px`;
                document.body.style.setProperty('--wintop', `${winTop}px`);

                const modal = document.querySelector('.catalog-cols__filter');
                modal?.setAttribute('aria-hidden', 'false');
                modal?.classList.add('show');
            }
        });

        document.body.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (
                target.classList.contains('js-modal-filter-hide') ||
                target.closest('.js-modal-filter-hide')
            ) {
                e.preventDefault();

                document.body.classList.remove('filter-modal-show');
                document
                    .querySelector('html')
                    ?.classList.add('scroll-smooth-disabled');
                window.scroll(0, winTop);
                document
                    .querySelector('html')
                    ?.classList.remove('scroll-smooth-disabled');
                document.body.style.removeProperty('top');
                document.body.style.removeProperty('--wintop');
                const modal = document.querySelector('.catalog-cols__filter');
                modal?.setAttribute('aria-hidden', 'true');
                setTimeout(() => {
                    modal?.classList.remove('show');
                }, 300);
            }
        });
    },
    { once: true }
);
