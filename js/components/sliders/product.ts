import Swiper from 'swiper';
import { Navigation, Pagination, Parallax, Thumbs, Zoom } from 'swiper/modules';

document.addEventListener(
    'DOMContentLoaded',
    () => {
        Swiper.use([Navigation, Pagination, Parallax, Thumbs, Zoom]);

        const sliders = document.querySelectorAll('.js-slider-product');
        sliders.forEach((slider) => {
            const parent = slider.closest('.swiper-wrapper');
            const dataIndex = slider.getAttribute('data-index');
            const modal = document
                .querySelector(
                    `.js-slider-product-modal[data-index="${dataIndex}"]`
                )
                ?.closest('.modal');

            const swiperSlder = new Swiper(slider, {
                slidesPerView: 'auto',
                speed: 700,
                parallax: true,
                loop: true,
                grabCursor: true,
                watchSlidesProgress: true,
                navigation: {
                    nextEl: parent?.querySelector('.swiper-button-next'),
                    prevEl: parent?.querySelector('.swiper-button-prev'),
                },
                pagination: {
                    el: parent?.querySelector('.swiper-pagination'),
                    clickable: true,
                },
                on: {
                    activeIndexChange(swiper: any) {
                        if (!modal?.classList.contains('is-open')) {
                            const sliderSwiper = document.querySelector(
                                `.js-slider-product-modal[data-index="${dataIndex}"]`
                            );
                            sliderSwiper?.swiper.slideTo(swiper.realIndex);
                        }
                    },
                },
            });
        });

        const slidersModal = document.querySelectorAll(
            '.js-slider-product-modal'
        );
        slidersModal.forEach((slider) => {
            let swiperSlderThumb = null;
            const parent = slider.closest('.swiper-wrapper');
            const modal = slider.closest('.modal');

            const dataIndex = slider.getAttribute('data-index');

            const thumb = parent?.querySelector(
                '.js-slider-product-modal-thumb'
            );
            if (thumb !== null && thumb !== undefined) {
                swiperSlderThumb = new Swiper(thumb, {
                    slidesPerView: 'auto',
                    speed: 700,
                    parallax: true,
                    loop: true,
                    grabCursor: true,
                    watchSlidesProgress: true,
                    on: {
                        resize(instance: any) {
                            thumb.classList.toggle(
                                'swiper-center-hide',
                                instance.virtualSize > instance.size
                            );
                        },
                    },
                });
            }

            const swiperSlder = new Swiper(slider, {
                slidesPerView: 'auto',
                speed: 700,
                parallax: true,
                loop: true,
                grabCursor: true,
                watchSlidesProgress: true,
                navigation: {
                    nextEl: parent?.querySelector('.swiper-button-next'),
                    prevEl: parent?.querySelector('.swiper-button-prev'),
                },
                pagination: {
                    el: parent?.querySelector('.swiper-pagination'),
                    clickable: true,
                },
                thumbs: {
                    swiper: swiperSlderThumb,
                },
                zoom: {
                    maxRatio: 3,
                },
                on: {
                    activeIndexChange(swiper: any) {
                        if (modal?.classList.contains('is-open')) {
                            const sliderSwiper = document.querySelector(
                                `.product__gallery .js-slider-product[data-index="${dataIndex}"]`
                            );
                            sliderSwiper?.swiper.slideTo(swiper.realIndex);
                        }
                    },
                },
            });
        });
    },
    { once: true }
);
