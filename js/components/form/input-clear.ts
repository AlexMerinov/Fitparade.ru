document.addEventListener('DOMContentLoaded', () => {
    const clears = document.querySelectorAll('.js-form-input-clear');
    clears.forEach((clear, index) => {
        const input = clear.nextElementSibling as HTMLInputElement;
        if (input !== null && input !== undefined) {
            if (input.value.length > 0) {
                clear.classList.add('active');
            }
            input.addEventListener('input', () => {
                if (input.value.length > 0) {
                    clear.classList.add('active');
                } else {
                    clear.classList.remove('active');
                }
            });
            clear.addEventListener('click', () => {
                clear.classList.remove('active');
                input.value = '';
                input.focus();
            });
        }
    });
});
