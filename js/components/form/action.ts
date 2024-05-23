import 'regenerator-runtime/runtime'; // fix console error 'Uncaught ReferenceError: regeneratorRuntime is not defined'
import MicroModal from 'micromodal';
import defaultSettings from '@js/components/modals/settings';

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

document.addEventListener(
    'DOMContentLoaded',
    () => {
        document.addEventListener('bouncerFormValid', (e) => {
            const form = e.target as HTMLFormElement | null;
            if (form === null || !form.classList.contains('js-form-action')) {
                return;
            }

            const { method } = form;
            const { action } = form;
            const allInputs =
                form.querySelectorAll<HTMLInputElement>('input, textarea');
            const selectInputs =
                form.querySelectorAll<HTMLInputElement>('select');

            const modalid = 'modal-message';
            const modal = document.getElementById(modalid);

            const button = form.querySelector<HTMLButtonElement>(
                'button[type="submit"]'
            );
            if (button !== null) {
                button.setAttribute('disabled', 'disabled');
            }

            const successCallback = () => {
                closeOpenModals();

                MicroModal.show(modalid, defaultSettings);

                setTimeout(() => {
                    if (modal?.classList.contains('is-open')) {
                        MicroModal.close(modalid);
                    }
                }, 3000);

                form.reset();
                allInputs.forEach((input) => {
                    if (
                        input.classList.contains('js-input-format-phone') &&
                        !input.getAttribute('value')
                    ) {
                        input.value = '';
                    } else {
                        input.dispatchEvent(new Event('change'));
                    }
                    // input.dispatchEvent(new Event('change'));
                    // input.dispatchEvent(new Event('input'));
                });
                selectInputs.forEach((input) => {
                    input.dispatchEvent(new Event('change'));
                });

                const formError = form.querySelector('.form-error');
                if (formError !== undefined && formError !== null) {
                    formError.remove();
                }
            };

            const errorCallback = (errorText = 'Ошибка отправки формы') => {
                if (button) {
                    button.removeAttribute('disabled');
                }
                let formError = form.querySelector('.form-error');
                if (formError === undefined || formError === null) {
                    formError = document.createElement('div');
                    formError.classList.add('form-error');
                    const formSubmit = form.querySelector('.form__submit');
                    formSubmit?.prepend(formError);
                }
                formError.innerHTML = errorText;
            };

            const sendForm = async () => {
                try {
                    const body = new FormData(form);

                    const response = await fetch(action, {
                        method,
                        headers: {
                            Accept: 'application/json',
                        },
                        body,
                    });

                    if (response.ok) {
                        const json = await response.json();

                        if (button) {
                            button.removeAttribute('disabled');
                        }

                        if (!json.status) {
                            errorCallback(json.errorText);
                        } else {
                            blurActiveElement();
                            successCallback();
                        }

                        return await Promise.resolve();
                    }

                    errorCallback();

                    throw new Error('Error form');
                } catch (err) {
                    errorCallback();
                }
            };

            sendForm();
        });
    },
    { once: true }
);
