import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

document.addEventListener('DOMContentLoaded', () => {
    Swiper.use([Navigation]);

    const sliders = document.querySelectorAll('.js-slider-catalog');

    sliders.forEach((slider) => {
        const swiperSlder = new Swiper(slider, {
            slidesPerView: 'auto',
            speed: 300,
            loop: false,
            grabCursor: true,
            navigation: {
                nextEl: slider.parentElement?.querySelector(
                    '.swiper-button-catalog.swiper-button-next'
                ),
                prevEl: slider.parentElement?.querySelector(
                    '.swiper-button-catalog.swiper-button-prev'
                ),
            },
        });
    });
});
