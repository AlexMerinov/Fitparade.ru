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

    const sliders = document.querySelectorAll('.js-slider-main');

    sliders.forEach((slider) => {
        const swiperSlder = new Swiper(slider, {
            slidesPerView: 'auto',
            speed: 700,
            parallax: true,
            loop: true,
            grabCursor: true,
            autoplay: {
                delay: 7000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    });

    fDataParallax();
});

window.addEventListener('resize', () => {
    fDataParallax();
});
