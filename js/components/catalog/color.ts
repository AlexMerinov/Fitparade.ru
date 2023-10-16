document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (e) => {
        const color = e.target as Element;
        if (color !== null && color !== undefined) {
            if (
                color.classList.contains('js-catalog-color-change') ||
                color.closest('.js-catalog-color-change')
            ) {
                e.preventDefault();

                const index = color.getAttribute('data-index');
                const parent =
                    color.closest('.catalog-list__item') ||
                    color.closest('.product');
                if (parent !== null && parent !== undefined) {
                    const colorItems = parent.querySelectorAll(
                        '.js-catalog-color-change'
                    );
                    colorItems.forEach((colorItem) => {
                        colorItem.classList.remove('active');
                    });
                    color.classList.add('active');

                    if (parent.classList.contains('catalog-list__item')) {
                        const galleries = parent.querySelectorAll(
                            '.catalog-list__gallery'
                        );
                        galleries.forEach((gallery) => {
                            gallery.classList.add('hide');
                        });
                    } else {
                        const galleries =
                            parent.querySelectorAll('.product__gallery');
                        galleries.forEach((gallery) => {
                            gallery.classList.add('hide');
                        });
                    }

                    const galleryCurrent =
                        parent.querySelector(
                            `.catalog-list__gallery[data-index="${index}"]`
                        ) ||
                        parent.querySelector(
                            `.product__gallery[data-index="${index}"]`
                        );
                    galleryCurrent?.classList.remove('hide');
                }
            }
        }
    });
});
