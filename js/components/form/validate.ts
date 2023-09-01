import Bouncer from 'formbouncerjs';
import Inputmask from 'inputmask';

document.addEventListener('DOMContentLoaded', () => {
    const jsform = document.querySelectorAll('.js-form-validate');
    jsform.forEach((form, index) => {
        let formflag = true;
        form.setAttribute('novalidate', '');
        form.classList.add(`js-form-validate-${index}`);
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let disableSubmit = false;
            if (form.classList.contains('js-form-action')) {
                disableSubmit = true;
            }
            if (formflag) {
                const formBouncer = new Bouncer(`.js-form-validate-${index}`, {
                    // messages: bouncerlang,
                    disableSubmit,
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
                    },
                    customValidations: {
                        requiredVisible(field: any) {
                            // required only visible inputs
                            if (field.getAttribute('data-required-visible')) {
                                const parent = field.parentElement;
                                return (
                                    !field.value.length > 0 &&
                                    parent.offsetParent !== null
                                );
                            }
                        },
                        inputFileAccept(field: any) {
                            if (field.getAttribute('accept')) {
                                const { value } = field;
                                let accept = field.getAttribute('accept');
                                console.log(parent);
                                accept = accept
                                    .replace(/\./g, '')
                                    .replace(/\s+/g, '')
                                    .split(',');
                                if (value.length > 0) {
                                    const ex = value.substring(
                                        value.lastIndexOf('.') + 1
                                    );
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
                                const maxsize =
                                    field.getAttribute('data-max-size') * 1;
                                let size = 0;
                                Object.values(files).forEach((file, index) => {
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
                                const inputId = field.getAttribute(
                                    'data-password-match'
                                );
                                const input = document.querySelector(inputId);
                                if (
                                    typeof input !== 'undefined' &&
                                    input !== null
                                ) {
                                    if (input.value === field.value) {
                                        return false;
                                    }
                                }
                                return true;
                            }
                        },
                    },
                });
                formflag = false;
            }
        });
    });
});
