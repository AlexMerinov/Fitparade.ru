document.addEventListener('DOMContentLoaded', () => {
    const searchWrapper = document.querySelector('.header-search');
    if (searchWrapper !== null && searchWrapper !== undefined) {
        const linksShow = document.querySelectorAll('.js-search-show');
        linksShow.forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                searchWrapper.classList.add('header-search--show');
                setTimeout(() => {
                    searchWrapper
                        .querySelector<HTMLInputElement>('.form__input')
                        ?.focus();
                }, 300);
            });
        });

        const linksHide = document.querySelectorAll('.js-search-close');
        linksHide.forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                searchWrapper.classList.remove('header-search--show');
            });
        });
    }
});
