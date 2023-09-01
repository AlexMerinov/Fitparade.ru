import 'regenerator-runtime/runtime'; // fix console error 'Uncaught ReferenceError: regeneratorRuntime is not defined'
// @ts-ignore
import autoComplete from '@tarekraafat/autocomplete.js';

document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('.js-autocomplete-search');
    inputs.forEach((input: any, index) => {
        input.classList.add(`js-autocomplete-search-${index}`);
        const url = input.getAttribute('data-url');
        // eslint-disable-next-line new-cap
        const autoCompleteJS = new autoComplete({
            selector: `.js-autocomplete-search-${index}`,
            data: {
                src: async (query: any) => {
                    try {
                        const category = input.getAttribute('data-category');
                        const source = await fetch(
                            `${url}?category=${category}&query=${query}`
                        );
                        const data = await source.json();
                        return data;
                    } catch (error) {
                        return error;
                    }
                },
                keys: ['name'],
            },
            threshold: 2,
            resultsList: {
                element: (list: any, data: any) => {
                    if (!data.results.length) {
                        const message = document.createElement('div');
                        message.setAttribute('class', 'no_result');
                        message.innerHTML = `Не найдено совпадений для "${data.query}"`;
                        list.prepend(message);
                    } else {
                        const li = list.querySelectorAll('li');
                        data.results.forEach((item: any, index: any) => {
                            const div = document.createElement('div');
                            div.classList.add('autoComplete-img');
                            div.style.backgroundImage = `url("${item.value.img}")`;
                            li[index].innerHTML = '';
                            li[index].appendChild(div);
                            li[index].innerHTML += `<div>${item.match}</div>`;
                        });
                    }
                },
                noResults: true,
                maxResults: 10,
            },
            resultItem: {
                highlight: true,
            },
            submit: true,
            events: {
                input: {
                    selection: (event: any) => {
                        const selection = event.detail.selection.value;
                        if (
                            selection.url !== null &&
                            selection.url !== undefined
                        ) {
                            window.location = selection.url;
                            autoCompleteJS.unInit();
                        }
                        autoCompleteJS.input.value = selection.name;
                    },
                },
            },
        });

        const form = input.closest('form');
        input.addEventListener('focus', () => {
            form?.classList.add('search--focus');
        });
        input.addEventListener('blur', () => {
            form?.classList.remove('search--focus');
        });
        input.addEventListener('input', () => {
            if (input.value.length > 0) {
                form?.classList.remove('error');
            }
        });
    });

    const selects = document.querySelectorAll(
        'select.js-autocomplete-search-category'
    );
    selects.forEach((select: any, index) => {
        const form = select.closest('form');
        const input = form?.querySelector('.js-autocomplete-search');
        select.addEventListener('change', () => {
            input?.setAttribute('data-category', select.value);
        });
    });
});
