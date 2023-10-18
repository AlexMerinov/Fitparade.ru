import autoComplete from '@tarekraafat/autocomplete.js';

document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('.js-dadata-city');
    inputs.forEach((input, index) => {
        input.classList.add(`js-dadata-city-${index}`);
        input.setAttribute('autocomplete', 'off');

        const addressFlag = input.classList.contains('js-dadata-address');

        const autoCompleteJS = new autoComplete({
            selector: `.js-dadata-city-${index}`,
            data: {
                src: async (query) => {
                    try {
                        const url =
                            'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
                        const token =
                            'f719441cdbcdb3f8267ed2407106df3c197bfe31';
                        const options = {
                            method: 'POST',
                            mode: 'cors',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'Authorization': `Token ${token}`,
                            },
                            body: JSON.stringify({
                                query,
                                // from_bound: { value: 'city' },
                                // to_bound: { value: 'settlement' },
                                count: 5,
                            }),

                            // bounds: 'city-settlement',
                            geoLocation: false,
                        };
                        if (!addressFlag) {
                            options.body = JSON.stringify({
                                query,
                                from_bound: { value: 'city' },
                                to_bound: { value: 'settlement' },
                                count: 5,
                            });
                            options.bounds = 'city-settlement';
                        }
                        const source = await fetch(url, options);
                        const data = await source.json();

                        if (!addressFlag) {
                            return data.suggestions.filter((suggestion) => {
                                return suggestion.data.fias_level !== '65';
                            });
                        }

                        return data.suggestions;
                    } catch (error) {
                        return error;
                    }
                },
                // keys: ['value'],
            },
            searchEngine: (query, record) => {
                return record;
            },
            threshold: 2,
            resultsList: {
                element: (list, data) => {
                    if (!data.results.length) {
                        const message = document.createElement('div');
                        message.setAttribute('class', 'no_result');
                        message.innerHTML = `Не найдено совпадений для "${data.query}"`;
                        list.prepend(message);
                    } else {
                        const li = list.querySelectorAll('li');
                        data.results.forEach((item, index) => {
                            li[index].innerHTML = item.value.value;
                        });
                    }
                },
                noResults: true,
                maxResults: 10,
            },
            submit: true,
            events: {
                input: {
                    selection: (event) => {
                        const selection = event.detail.selection.value;
                        if (!addressFlag) {
                            input.value =
                                selection.data.city ||
                                selection.data.settlement;
                        } else {
                            input.value = selection.value;
                        }

                        input.dispatchEvent(new CustomEvent('cityChange'));
                    },
                    navigate: (event) => {
                        const selection = event.detail.selection.value;
                        if (!addressFlag) {
                            input.value =
                                selection.data.city ||
                                selection.data.settlement;
                        } else {
                            input.value = selection.value;
                        }
                    },
                },
            },
        });
    });
});
