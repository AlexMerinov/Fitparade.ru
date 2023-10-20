import Swiper from 'swiper';

document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.js-lk-menu-slider');

    sliders.forEach((slider) => {
        let slideIndex = 0;
        const btnActive = slider.querySelectorAll('.lk-menu__link');
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
            grabCursor: true,
        });
    });
});
