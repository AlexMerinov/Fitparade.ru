import MicroModal from 'micromodal';
import defaultSettings from './settings';

export const closeModal = () => {
    const modalOpen = document.querySelector('.modal.is-open');
    if (modalOpen !== null) {
        const modalOpenId = modalOpen.getAttribute('id');
        if (modalOpenId !== null) {
            MicroModal.close(modalOpenId);
        }
    }
};

export const openModal = (modalId?: string) => {
    closeModal();
    if (modalId === undefined) {
        return;
    }
    MicroModal.show(modalId, defaultSettings);
};
