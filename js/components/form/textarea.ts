const fTextarea = (textarea: any) => {
    textarea.style.height = 'auto';
    textarea.setAttribute(
        'style',
        `height:${textarea.scrollHeight + 2}px;overflow-y:hidden;`
    );
};

const fTextareaInit = () => {
    const jstextarea = document.querySelectorAll('.js-textarea');
    jstextarea.forEach((textarea, index) => {
        fTextarea(textarea);
        textarea.addEventListener('input', () => {
            fTextarea(textarea);
        });
    });

    window.addEventListener('resize', () => {
        const jstextarea = document.querySelectorAll('.js-textarea');
        jstextarea.forEach((textarea, index) => {
            fTextarea(textarea);
        });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    fTextareaInit();
});
