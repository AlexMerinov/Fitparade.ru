document.addEventListener(
    'DOMContentLoaded',
    () => {
        document.body.addEventListener('click', (e) => {
            const link = e.target as Element;
            if (link !== null && link !== undefined) {
                if (
                    link.classList.contains('js-filter-more') ||
                    link.closest('.js-filter-more')
                ) {
                    e.preventDefault();

                    const parent = link.closest('.filter__group');
                    const items = parent?.querySelectorAll('.filter__item');

                    if (link.classList.contains('active')) {
                        link.classList.remove('active');
                        link.textContent = 'Посмотреть все';
                    } else {
                        link.classList.add('active');
                        link.textContent = 'Свернуть';
                    }

                    items?.forEach((item, index) => {
                        if (index > 5) {
                            if (link.classList.contains('active')) {
                                item.classList.remove('hide');
                                item.classList.add('fade-in');
                            } else {
                                item.classList.add('hide');
                                item.classList.remove('fade-in');
                            }
                        }
                    });
                }
            }
        });
    },
    { once: true }
);
