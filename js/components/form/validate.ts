import Bouncer from 'formbouncerjs';
import Inputmask from 'inputmask';
import { maskNumeric, maskPhone } from '@js/components/form/input-format';

const validateSettings = {
    messages: {
        missingValue: {
            'checkbox': 'Обязательное поле',
            'radio': 'Выберите вариант',
            'select': 'Выберите вариант',
            'select-multiple': 'Выберите вариант',
            'default': 'Обязательное поле',
        },
        patternMismatch: {
            email: 'Некорректный email',
            url: 'Некорректный url',
            number: 'Некорректное число',
            color: 'Некорректный цвет',
            date: 'Некорректная дата',
            time: 'Некорректное время',
            month: 'Некорректный месяц',
            default: 'Некорректный формат',
        },
        outOfRange: {
            over: 'Пожалуйста, выберите значение, которое не превышает {max}',
            under: 'Пожалуйста, выберите значение не менее {min}',
        },
        wrongLength: {
            over: 'Максимум {maxLength} символов. Сейчас: {length}',
            under: 'Минимум {minLength} символов. Сейчас: {length}',
        },
        requiredVisible: 'Обязательное поле',
        inputFileAccept: 'Неверный формат файла',
        inputFileSize: 'Неверный размер файла',
        inputPasswordMatch: 'Введенные пароли не совпадают',
        inputPhone: 'Некорректный номер телефона',
    },
    customValidations: {
        requiredVisible(field: any) {
            // required only visible inputs
            if (field.getAttribute('data-required-visible')) {
                const parent = field.parentElement;
                return !field.value.length > 0 && parent.offsetParent !== null;
            }
        },
        inputFileAccept(field: any) {
            if (field.getAttribute('accept')) {
                const { value } = field;
                let accept = field.getAttribute('accept');
                accept = accept
                    .replace(/\./g, '')
                    .replace(/\s+/g, '')
                    .split(',');
                if (value.length > 0) {
                    const ex = value.substring(value.lastIndexOf('.') + 1);
                    if (accept.includes(ex)) {
                        return false;
                    }
                    return true;
                }
            }
        },
        inputFileSize(field: any) {
            if (field.getAttribute('data-max-size')) {
                const { files } = field;
                const { value } = field;
                const maxsize = field.getAttribute('data-max-size') * 1;
                let size = 0;
                Object.values(files).forEach((file: any) => {
                    size += file.size;
                });
                if (value.length > 0) {
                    if (size <= maxsize) {
                        return false;
                    }
                    return true;
                }
            }
        },
        inputPasswordMatch(field: any) {
            if (field.getAttribute('data-password-match')) {
                const inputId = field.getAttribute('data-password-match');
                const input = document.querySelector(inputId);
                if (typeof input !== 'undefined' && input !== null) {
                    if (input.value === field.value) {
                        return false;
                    }
                }
                return true;
            }
        },
        inputPhone(field) {
            if (
                field.classList.contains('js-input-format-phone') &&
                field.value.length > 0
            ) {
                return !Inputmask.isValid(field.value, {
                    mask: '+7 (999) 999-99-99',
                });
            }
        },
    },
};

const formValidate = (form: any, formIndex: any) => {
    if (form === null || form === undefined) {
        return;
    }

    if (!formIndex) {
        formIndex = Math.floor(Math.random() * 1000);
    }
    // const formflag = true;
    form.setAttribute('novalidate', '');
    form.classList.add(`js-form-validate-${formIndex}`);
    // form.addEventListener('submit', (e: any) => {
    //     e.preventDefault();
    let disableSubmit = false;
    if (
        form.classList.contains('js-form-action') ||
        form.classList.contains('js-form-submit-disabled')
    ) {
        disableSubmit = true;
    }
    // if (formflag) {
    const formBouncer = new Bouncer(`.js-form-validate-${formIndex}`, {
        // messages: bouncerlang,
        disableSubmit,
        ...validateSettings,
    });

    const phones = form.querySelectorAll('.js-input-format-phone');
    phones.forEach((input) => {
        maskPhone(input);
    });

    const numbers = form.querySelectorAll('.js-input-format-number');
    numbers.forEach((input) => {
        maskNumeric(input);
    });
    //     formflag = false;
    // }
    // });
};

document.addEventListener('DOMContentLoaded', () => {
    const jsform = document.querySelectorAll('.js-form-validate');
    jsform.forEach((form, index) => {
        formValidate(form, index);
    });
});

document.formValidate = formValidate;
