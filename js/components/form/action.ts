import 'regenerator-runtime/runtime'; // fix console error 'Uncaught ReferenceError: regeneratorRuntime is not defined'
import MicroModal from 'micromodal';
import { defaultSettings } from '@js/components/modals/settings';

const blurActiveElement = () => {
    const activeElement = document.activeElement as HTMLElement | null;
    if (activeElement !== null) {
        activeElement.blur();
    }
};
const closeOpenModals = () => {
    const openModals = document.querySelectorAll('.modal.is-open');
    openModals.forEach((modal) => {
        MicroModal.close(modal.id);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('bouncerFormValid', (e) => {
        const form = e.target as HTMLFormElement | null;
        if (form === null || !form.classList.contains('js-form-action')) {
            return;
        }

        // const inputToken =
        //     form.querySelector<HTMLInputElement>('[name="_token"]');
        // const token = inputToken?.value as string;

        const { method } = form;
        const { action } = form;
        const allInputs =
            form.querySelectorAll<HTMLInputElement>('input, textarea');
        const selectInputs = form.querySelectorAll<HTMLInputElement>('select');
        let messCaption: any;
        let messText: any;

        const modalid = 'modal-message';
        const modal = document.getElementById(modalid);
        if (typeof modal !== 'undefined' && modal != null) {
            messCaption = modal.querySelector<HTMLElement>(
                '#js-modal-message-caption'
            );
            messText = modal.querySelector<HTMLElement>(
                '#js-modal-message-text'
            );
        }

        const button = form.querySelector<HTMLButtonElement>(
            'button[type="submit"]'
        );
        if (button !== null) {
            button.setAttribute('disabled', 'disabled');
        }

        const successCallback = () => {
            form.reset();
            allInputs.forEach((input) => {
                input.dispatchEvent(new Event('change'));
                input.dispatchEvent(new Event('input'));
            });
            selectInputs.forEach((input) => {
                input.dispatchEvent(new Event('change'));
            });
        };

        const sendForm = async () => {
            try {
                const body = new FormData(form);

                const response = await fetch(action, {
                    method,
                    headers: {
                        // 'X-CSRF-TOKEN': token,
                        Accept: 'application/json',
                    },
                    body,
                });

                if (response.ok) {
                    const json = await response.json();

                    if (button) {
                        button.removeAttribute('disabled');
                    }

                    closeOpenModals();
                    if (
                        typeof messCaption !== 'undefined' &&
                        messCaption != null &&
                        typeof messText !== 'undefined' &&
                        messText != null
                    ) {
                        messCaption.innerText = json.title;
                        messText.innerText = json.text;
                    }
                    if (!json.status) {
                        modal?.classList.add('modal--message--error');
                    } else {
                        modal?.classList.remove('modal--message--error');
                        blurActiveElement();
                        successCallback();
                    }

                    MicroModal.show(modalid, defaultSettings);

                    setTimeout(() => {
                        if (modal?.classList.contains('is-open')) {
                            MicroModal.close(modalid);
                        }
                    }, 3000);

                    return await Promise.resolve();
                }
                throw new Error('Error form');
            } catch (err) {
                if (button) {
                    button.removeAttribute('disabled');
                }

                closeOpenModals();
                modal?.classList.add('modal--message--error');
                MicroModal.show(modalid, defaultSettings);
                if (
                    typeof messCaption !== 'undefined' &&
                    messCaption != null &&
                    typeof messText !== 'undefined' &&
                    messText != null
                ) {
                    messCaption.innerText = 'Что-то пошло не так :(';
                    messText.innerText = 'Попробуйте отправить форму ещё раз.';
                }
                setTimeout(() => {
                    if (modal?.classList.contains('is-open')) {
                        MicroModal.close(modalid);
                    }
                }, 3000);

                console.error(err);
            }
        };

        // Обновление каптчи перед отправкой формы
        // const reCaptchaInputs = form.querySelectorAll('.g-recaptcha');
        // if (reCaptchaInputs.length > 0) {
        //     grecaptcha
        //         .execute('6LeKgi0gAAAAAAL-5aF-Bwlttywa65bTbJrmIjV3')
        //         .then(function (token) {
        //             for (let i = 0; i < reCaptchaInputs.length; i++) {
        //                 reCaptchaInputs[i].value = token;
        //             }
        //             sendForm();
        //         });
        // } else {
        //     sendForm();
        // }

        sendForm();
    });
});
