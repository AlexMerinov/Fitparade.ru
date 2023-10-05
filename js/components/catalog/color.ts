document.addEventListener('DOMContentLoaded', () => {
    const colors = document.querySelectorAll('.js-catalog-color-change');
    colors.forEach((color) => {
        color.addEventListener('click', (e) => {
            e.preventDefault();

            const index = color.getAttribute('data-index');
            const parent = color.closest('.catalog-list__item');
            console.log('index', index);
            if (parent !== null && parent !== undefined) {
                const colorItems = parent.querySelectorAll(
                    '.js-catalog-color-change'
                );
                colorItems.forEach((colorItem) => {
                    colorItem.classList.remove('active');
                });
                color.classList.add('active');

                const galleries = parent.querySelectorAll(
                    '.catalog-list__gallery'
                );
                galleries.forEach((gallery) => {
                    gallery.classList.add('hide');
                });

                const galleryCurrent = parent.querySelector(
                    `.catalog-list__gallery[data-index="${index}"]`
                );
                galleryCurrent?.classList.remove('hide');
            }
        });
    });
});
