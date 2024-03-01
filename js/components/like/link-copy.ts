import { openModal, closeModal } from '@js/components/modals/utils';

document.addEventListener(
    'DOMContentLoaded',
    () => {
        const links = document.querySelectorAll('.js-link-copy');
        links.forEach((link) => {
            let ModalTimeout = setTimeout(() => {}, 0);
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href') || '';
                const input = document.createElement('input');
                input.value = href;
                document.body.appendChild(input);
                input.select();
                document.execCommand('copy');
                input.remove();
                closeModal();
                openModal('modal-link-copy');
                clearTimeout(ModalTimeout);
                ModalTimeout = setTimeout(() => {
                    closeModal();
                }, 3000);
            });
        });
    },
    { once: true }
);
