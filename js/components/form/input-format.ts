import Inputmask from 'inputmask';

export const maskPhone = (input) => {
    if (!input.classList.contains('mask-init')) {
        input.classList.add('mask-init');
        const { value } = input;
        if (value.length) {
            if (value[0] === '7') {
                input.value = value.slice(1);
            }
        }
        Inputmask('tel', {
            mask: '+7 (999) 999-99-99',
            showMaskOnHover: false,
            placeholder: '_',
            rightAlign: false,
        }).mask(input);
    }
};

document.maskPhone = maskPhone;

export const maskNumeric = (input) => {
    if (!input.classList.contains('mask-init')) {
        input.classList.add('mask-init');
        Inputmask('numeric', {
            rightAlign: false,
            showMaskOnHover: false,
            placeholder: '',
        }).mask(input);
    }
};

document.addEventListener(
    'DOMContentLoaded',
    () => {
        const phones = document.querySelectorAll('.js-input-format-phone');
        phones.forEach((input) => {
            maskPhone(input);
        });

        const numbers = document.querySelectorAll('.js-input-format-number');
        numbers.forEach((input) => {
            maskNumeric(input);
        });
    },
    { once: true }
);
