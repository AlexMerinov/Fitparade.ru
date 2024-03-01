document.addEventListener(
    'DOMContentLoaded',
    () => {
        document.body.addEventListener('click', (e) => {
            const target = e.target as Element;
            if (target !== null && target !== undefined) {
                if (
                    target.classList.contains('js-catalog-load-more') ||
                    target.closest('.js-catalog-load-more')
                ) {
                    e.preventDefault();
                    const url = target.getAttribute('href') || '';

                    fetch(url)
                        .then((response) => {
                            return response.text();
                        })
                        .then((data) => {
                            const parent = target.closest('.catalog-load-more');
                            const div = document.createElement('div');
                            div.innerHTML = data;
                            parent?.insertAdjacentElement('afterend', div);
                            parent?.remove();
                            document.dispatchEvent(
                                new CustomEvent('AjaxContentLoaded')
                            );
                        })
                        .catch((err) => {
                            console.warn('Something went wrong.', err);
                        });
                }
            }
        });
    },
    { once: true }
);
