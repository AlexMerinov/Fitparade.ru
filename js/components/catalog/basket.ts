document.addEventListener('DOMContentLoaded', () => {
    // Кнопка корзины на мобиле

    let winTop = 0;

    document.body.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (
            target.classList.contains('js-modal-catalog-show') ||
            target.closest('.js-modal-catalog-show')
        ) {
            e.preventDefault();
            const btn = target.classList.contains('js-modal-catalog-show')
                ? target
                : target.closest('.js-modal-catalog-show');
            const parent = btn?.closest('.catalog-list__item');
            const catalogList = btn?.closest('.catalog-list');

            const modal = parent?.querySelector('.catalog-list__modal');
            if (
                modal !== null &&
                modal !== undefined &&
                catalogList !== undefined &&
                catalogList !== null
            ) {
                catalogList.swiper.allowTouchMove = false;
                catalogList.classList.add('catalog-list--show-modal');
                modal.classList.add('show');
                modal.setAttribute('aria-hidden', 'false');

                winTop = window.scrollY;
                document.body.classList.add('catalog-modal-show');
                document.body.style.top = `-${winTop}px`;
                document.body.style.setProperty('--wintop', `${winTop}px`);
            }
        }
    });

    document.body.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (
            target.classList.contains('js-modal-catalog-hide') ||
            target.closest('.js-modal-catalog-hide')
        ) {
            e.preventDefault();

            const modal = target?.closest('.catalog-list__modal');
            const catalogList = target?.closest('.catalog-list');
            if (
                modal !== null &&
                modal !== undefined &&
                catalogList !== undefined &&
                catalogList !== null
            ) {
                document.body.classList.remove('catalog-modal-show');
                window.scroll(0, winTop);
                document.body.style.removeProperty('top');
                document.body.style.removeProperty('--wintop');
                modal.setAttribute('aria-hidden', 'true');
                setTimeout(() => {
                    catalogList.swiper.allowTouchMove = true;
                    catalogList.classList.remove('catalog-list--show-modal');
                    modal.classList.remove('show');
                }, 300);
            }
        }
    });
});
