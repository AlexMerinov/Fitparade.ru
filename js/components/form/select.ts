import SlimSelect from 'slim-select';
import IsTouchDevice from '@js/interfaces/is-touch-device/is-touch-device';

const ssContentPosition = () => {
    const selects = document.querySelectorAll('.js-select,.js-select-custom');
    selects.forEach((item) => {
        const ssMain = item.querySelector('.ss-main');
        if (ssMain !== null && ssMain !== undefined) {
            const ssContent = item.querySelector('.ss-content');
            const rectMain = ssMain?.getBoundingClientRect();
            const rectContent = ssContent?.getBoundingClientRect();
            if (rectMain.x + rectContent.width > document.body.clientWidth) {
                ssContent?.classList.add('ss-content--right');
            } else {
                ssContent?.classList.remove('ss-content--right');
            }
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const selects = document.querySelectorAll('.js-select');
    selects.forEach((item) => {
        item.classList.add('ss-container');
        const select = item.querySelector('select');
        if (select !== null && select !== undefined) {
            const placeholder = select.getAttribute('data-placeholder');
            const position = select.getAttribute('data-position');
            const search = select.getAttribute('data-search');
            const searchText = select.getAttribute('data-search-text');
            const closeOnSelect = select.getAttribute('multiple') !== '';
            new SlimSelect({
                select,
                settings: {
                    contentPosition: 'relative',
                    contentLocation: item,
                    placeholderText: placeholder,
                    showSearch: search,
                    openPosition: position || 'auto',
                    searchText: 'Совпадений не найдено',
                    searchPlaceholder: searchText || 'Поиск',
                    searchHighlight: true,
                    closeOnSelect,
                    allowDeselect: !closeOnSelect,
                    maxValuesShown: 10000,
                },
            });
            if (select.getAttribute('multiple') === '') {
                const dataId = select.getAttribute('data-id');
                const ssValues = document.querySelector(
                    `.ss-main[data-id="${dataId}"] .ss-values`
                );
                ssValues.setAttribute('data-placeholder', placeholder);
            }
            ssContentPosition();

            // if(IsTouchDevice){
            //     const options = select.querySelectorAll('option[data-placeholder="true"]');
            //     options.forEach((option) => {
            //         option.remove();
            //     });
            // }

            select.addEventListener('change', (e) => {
                select.classList.remove('error');
            });

            if (select.getAttribute('data-tags')) {
                // show selected tags

                const showTags = () => {
                    const dataTags = select.getAttribute('data-tags');
                    const blockTags = document.getElementById(dataTags);
                    if (blockTags !== null && blockTags !== undefined) {
                        blockTags.innerHTML = '';
                        const options = [...select.options].filter(
                            (x) => x.selected
                        );

                        options.forEach((option) => {
                            const btn = document.createElement('span');
                            btn.classList.add(
                                'btn',
                                'btn--small',
                                'btn--border'
                            );
                            btn.setAttribute(
                                'data-id',
                                option.getAttribute('id')
                            );
                            btn.innerHTML = `${option.innerText}<span class="icon-delete"></span>`;
                            blockTags.appendChild(btn);

                            btn.addEventListener('click', (e) => {
                                const btnId = btn.getAttribute('data-id');
                                const optionId = document.getElementById(btnId);
                                optionId.selected = false;
                                select.dispatchEvent(new Event('change'));
                            });
                        });

                        if (options.length > 0) {
                            blockTags.classList.remove('hide');
                        } else {
                            blockTags.classList.add('hide');
                        }
                    }
                };

                select.addEventListener('change', (e) => {
                    showTags();
                });

                select.dispatchEvent(new Event('change')); // plugin set "data-id" after change
            }
        }
    });

    const selectCustom = document.querySelectorAll('.js-select-custom');
    selectCustom.forEach((item) => {
        item.classList.add('ss-container');
        item.classList.add('ss-container--custom');
        const select = item.querySelector('.ss-main');
        const options = item.querySelector('.ss-content');
        select?.addEventListener('click', (e) => {
            select.classList.toggle('ss-open-below');
            options.classList.toggle('ss-open-below');
        });
        window.addEventListener('click', (e) => {
            if (
                !(options?.contains(e.target) || select?.contains(e.target)) &&
                select.classList.contains('ss-open-below')
            ) {
                select.classList.remove('ss-open-below');
                options.classList.remove('ss-open-below');
            }
        });
        ssContentPosition();
    });
});

window.addEventListener('resize', () => {
    ssContentPosition();
});
