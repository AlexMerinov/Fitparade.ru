import Inputmask from 'inputmask';

document.addEventListener('DOMContentLoaded', () => {
    const phones = document.querySelectorAll('.js-input-format-phone');
    phones.forEach((input) => {
        Inputmask('tel', {
            mask: '+7 (999) 999-99-99',
            showMaskOnHover: false,
            placeholder: '_',
            rightAlign: false,
        }).mask(input);
    });
});
