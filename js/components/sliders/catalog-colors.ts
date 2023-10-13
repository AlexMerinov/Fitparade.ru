import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

const catalogColorsSlider = () => {
    const sliders = document.querySelectorAll(
        '.js-catalog-colors-slider:not(.js-init)'
    );

    sliders.forEach((slider) => {
        slider.classList.add('js-init');
        const swiperSlder = new Swiper(slider, {
            slidesPerView: 'auto',
            speed: 300,
            loop: false,
            grabCursor: true,
            direction: 'horizontal',
            observeParents: true,
            navigation: {
                nextEl: slider.parentElement?.querySelector(
                    '.swiper-button-next'
                ),
                prevEl: slider.parentElement?.querySelector(
                    '.swiper-button-prev'
                ),
            },
            breakpoints: {
                // when window width is >= 320px
                1280: {
                    direction: 'vertical',
                },
            },
        });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    Swiper.use([Navigation]);
    catalogColorsSlider();
});
document.addEventListener('AjaxContentLoaded', () => {
    catalogColorsSlider();
});
