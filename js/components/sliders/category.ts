import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

document.addEventListener('DOMContentLoaded', () => {
    Swiper.use([Navigation]);

    const sliders = document.querySelectorAll('.js-slider-category');

    sliders.forEach((slider) => {
        let slideIndex = 0;
        const btnActive = slider.querySelectorAll('.btn');
        btnActive.forEach((btn, index) => {
            if (btn.classList.contains('active')) {
                slideIndex = index;
            }
        });

        const swiperSlder = new Swiper(slider, {
            initialSlide: slideIndex,
            slidesPerView: 'auto',
            speed: 300,
            loop: false,
            centerInsufficientSlides: true,
            centeredSlidesBounds: true,
            centeredSlides: true,
            grabCursor: true,
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
});
