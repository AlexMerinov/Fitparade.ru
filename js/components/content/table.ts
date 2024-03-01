document.addEventListener(
    'DOMContentLoaded',
    () => {
        const tables = document.querySelectorAll<HTMLElement>(
            '.text-content table'
        );
        tables.forEach((table) => {
            const wrapper = document.createElement('div');
            wrapper.classList.add('table');
            table.insertAdjacentElement('afterend', wrapper);
            wrapper.appendChild(table);
        });
    },
    { once: true }
);
