import SlimSelect from 'slim-select';

document.addEventListener('DOMContentLoaded', () => {
    const selects = document.querySelectorAll('.js-select');
    selects.forEach((item) => {
        item.classList.add('ss-container');
        const select = item.querySelector('select');
        if (select !== null && select !== undefined) {
            new SlimSelect({
                select,
                settings: {
                    contentPosition: 'relative',
                    contentLocation: item,
                    openPosition: 'down',
                    showSearch: false,
                },
            });
        }
    });
});
