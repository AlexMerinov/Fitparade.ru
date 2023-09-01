export default function inputFilled() {
    const inputs = document.querySelectorAll('input,select,textarea');
    inputs.forEach((input: any, index) => {
        if (input.value !== '' && !input.classList.contains('filled')) {
            input.classList.add('filled');
        }

        const eventList = ['input', 'change', 'keyup', 'paste'];
        for (const ev of eventList) {
            input.addEventListener(ev, () => {
                if ((<HTMLInputElement>input).value !== '') {
                    input.classList.add('filled');
                } else {
                    input.classList.remove('filled');
                }
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    inputFilled();
});
