import SlimSelect from 'slim-select';

document.addEventListener(
    'DOMContentLoaded',
    () => {
        const selects = document.querySelectorAll('.js-select');
        selects.forEach((item: any) => {
            item.classList.add('ss-container');
            const select = item.querySelector('select');
            const placeholder = select.getAttribute('data-placeholder') || '';
            if (select !== null && select !== undefined) {
                new SlimSelect({
                    select,
                    settings: {
                        contentPosition: 'relative',
                        contentLocation: item,
                        openPosition: 'down',
                        showSearch: false,
                        placeholderText: placeholder,
                    },
                });
            }
            select.addEventListener('change', () => {
                select.classList.remove('error');
            });
        });
    },
    { once: true }
);
