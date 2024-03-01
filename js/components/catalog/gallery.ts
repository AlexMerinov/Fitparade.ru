const catalogListGallery = () => {
    const listGallery = document.querySelectorAll<HTMLElement>(
        '.js-catalog-list-gallery:not(.js-init)'
    );
    listGallery.forEach((gallery) => {
        gallery.classList.add('js-init');
        const items = gallery.querySelectorAll('.catalog-list__gallery__item');
        items.forEach((photo) => {
            photo.addEventListener('mouseover', () => {
                const img = photo.getAttribute('data-img') || '';
                gallery.setAttribute('data-src-bg', img);
                gallery.style.backgroundImage = `url('${img}')`;
                items.forEach((photoItem) => {
                    photoItem.classList.remove('active');
                });
                photo.classList.add('active');
            });
        });
    });
};

document.addEventListener(
    'DOMContentLoaded',
    () => {
        catalogListGallery();
    },
    { once: true }
);
document.addEventListener('AjaxContentLoaded', () => {
    catalogListGallery();
});
