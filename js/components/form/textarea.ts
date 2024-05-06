const fTextarea = (textarea: any) => {
    textarea.style.height = 'auto';
    textarea.setAttribute(
        'style',
        `height:${textarea.scrollHeight + 2}px;overflow-y:hidden;`
    );
};

const fTextareaInit = (textarea: any) => {
    fTextarea(textarea);
    textarea.addEventListener('input', () => {
        fTextarea(textarea);
    });
    window.addEventListener('resize', () => {
        fTextarea(textarea);
    });
};

document.fTextareaInit = fTextareaInit;

document.addEventListener(
    'DOMContentLoaded',
    () => {
        const jstextarea = document.querySelectorAll('.js-textarea');
        jstextarea.forEach((textarea, index) => {
            fTextareaInit(textarea);
        });
    },
    { once: true }
);

document.addEventListener('modalOpen', () => {
    const jstextarea = document.querySelectorAll('.modal .js-textarea');
    jstextarea.forEach((textarea, index) => {
        fTextarea(textarea);
        textarea.addEventListener('input', () => {
            window.dispatchEvent(new Event('resize')); // Для пересчета позиции модалки
        });
    });
});
