import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

const catalogSizeSlider = () => {
    const sliders = document.querySelectorAll(
        '.js-catalog-size-slider:not(.js-init)'
    );

    sliders.forEach((slider) => {
        slider.classList.add('js-init');
        const swiperSlder = new Swiper(slider, {
            slidesPerView: 'auto',
            speed: 300,
            loop: false,
            grabCursor: true,
            observeParents: true,
            observer: true,
            navigation: {
                nextEl: slider.parentElement?.querySelector(
                    '.swiper-button-next'
                ),
                prevEl: slider.parentElement?.querySelector(
                    '.swiper-button-prev'
                ),
            },
        });
    });
};

const startCatalogSizeSlider = () => {
    Swiper.use([Navigation]);
    catalogSizeSlider();
};

document.addEventListener(
    'DOMContentLoaded',
    () => {
        startCatalogSizeSlider();
    },
    { once: true }
);

document.addEventListener('AjaxContentLoaded', () => {
    startCatalogSizeSlider();
});
