import Swiper from 'swiper';
import { Navigation, Pagination, Parallax, Autoplay } from 'swiper/modules';

const fDataParallax = () => {
    const mainSliderBg = document.querySelectorAll('.main-slider__bg');
    mainSliderBg.forEach((item) => {
        if (window.matchMedia('(max-width: 500px)').matches) {
            item.setAttribute('data-swiper-parallax', '200');
        } else {
            item.setAttribute('data-swiper-parallax', '400');
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    Swiper.use([Navigation, Pagination, Parallax, Autoplay]);

    const sliders = document.querySelectorAll('.js-slider-product');

    sliders.forEach((slider) => {
        const parent = slider.closest('.swiper-wrapper');
        const swiperSlder = new Swiper(slider, {
            slidesPerView: 'auto',
            speed: 700,
            parallax: true,
            loop: true,
            grabCursor: true,
            navigation: {
                nextEl: parent?.querySelector('.swiper-button-next'),
                prevEl: parent?.querySelector('.swiper-button-prev'),
            },
            pagination: {
                el: parent?.querySelector('.swiper-pagination'),
                clickable: true,
            },
        });
    });

    fDataParallax();
});

window.addEventListener('resize', () => {
    fDataParallax();
});
