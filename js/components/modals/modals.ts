import MicroModal from 'micromodal';
import { defaultSettings } from './settings';
import { openModal, closeModal } from './utils';

const fModalPosition = () => {
    const modal = document.querySelector('.modal.is-open .modal__container');
    const modalParent = document.querySelector(
        '.modal.is-open .modal__overlay'
    );
    if (
        typeof modal !== 'undefined' &&
        modal != null &&
        typeof modalParent !== 'undefined' &&
        modalParent != null
    ) {
        if (modal.clientHeight > modalParent.clientHeight) {
            modalParent.classList.add('modal__overlay--block');
        } else {
            modalParent.classList.remove('modal__overlay--block');
        }
    }
};

const scrollWidth = () => {
    if (!document.body.classList.contains('modal-show')) {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        let scrollWidth = 0;
        scrollWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.setProperty('--scroll-width', `${scrollWidth}px`);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    scrollWidth();

    MicroModal.init(defaultSettings);

    const modallinks = document.querySelectorAll('[data-micromodal]');
    modallinks.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            const modalID = item.getAttribute('data-micromodal') as string;
            if (modalID! == null && modalID !== undefined) {
                openModal(modalID);

                setTimeout(() => {
                    fModalPosition();
                }, 100);
            }
        });
    });

    const modalOpenLinks = document.querySelectorAll('.js-modal-open');
    modalOpenLinks.forEach((item, index) => {
        item.dispatchEvent(new Event('click'));
    });
});

window.addEventListener('resize', () => {
    scrollWidth();

    setTimeout(() => {
        fModalPosition();
    }, 100);
});
