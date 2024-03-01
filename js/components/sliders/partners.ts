import Swiper from 'swiper';

document.addEventListener(
    'DOMContentLoaded',
    () => {
        const sliders = document.querySelectorAll('.js-slider-partners');

        sliders.forEach((slider) => {
            const swiperSlder = new Swiper(slider, {
                slidesPerView: 'auto',
                speed: 300,
                loop: false,
                grabCursor: true,
            });
        });
    },
    { once: true }
);
