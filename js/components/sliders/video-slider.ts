import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

document.addEventListener('DOMContentLoaded', () => {
    Swiper.use([Navigation]);

    const sliders = document.querySelectorAll('.js-slider-videos');

    sliders.forEach((slider) => {
        const swiperSlder = new Swiper(slider, {
            slidesPerView: 'auto',
            speed: 300,
            loop: false,
            grabCursor: true,
            navigation: {
                nextEl: slider.parentElement?.querySelector(
                    '.swiper-button-next'
                ),
                prevEl: slider.parentElement?.querySelector(
                    '.swiper-button-prev'
                ),
            },
            on: {
                setTranslate(swiper: any, translate: any) {},
            },
        });

        const videoLinks = slider.querySelectorAll('[data-youtube-id]');
        videoLinks.forEach((link) => {
            const videoFrame = link
                .closest('.videos-section')
                ?.querySelector('.js-video-link');
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const yId = link.getAttribute('data-youtube-id') || '';
                videoLinks.forEach((link) => {
                    link.classList.remove('active');
                });
                link.classList.add('active');
                videoFrame?.setAttribute('data-youtube-id', yId);
                videoFrame?.dispatchEvent(new Event('click'));
            });
        });
    });
});
