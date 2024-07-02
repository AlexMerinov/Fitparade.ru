import { loadYmap } from 'vue-yandex-maps';

document.addEventListener(
    'DOMContentLoaded',
    () => {
        const maps = document.querySelectorAll('.js-ymap');
        if (maps.length > 0) {
            const selectCity = document.querySelector(
                '.js-ymap-city-change'
            ) as HTMLSelectElement;
            const cityIndex = selectCity?.value || 0;

            const cityItems = document.querySelectorAll('.shops-list-wrapper');
            selectCity?.addEventListener('change', () => {
                cityItems.forEach((city, index) => {
                    if (index === Number(selectCity.value)) {
                        city.classList.remove('hide');
                    } else {
                        city.classList.add('hide');
                    }
                });
            });

            maps.forEach((mapBlock) => {
                const mapInit = async () => {
                    await loadYmap({
                        apiKey: mapBlock.getAttribute('data-api-key'),
                        lang: 'ru_RU',
                        coordorder: 'latlong',
                        enterprise: false,
                        version: '2.1',
                    });

                    const pin = mapBlock.getAttribute('data-pin');
                    const myMap = new ymaps.Map(mapBlock.getAttribute('id'), {
                        center: [55.75399399999374, 37.62209300000001],
                        zoom: 10,
                        controls: ['smallMapDefaultSet'],
                    });
                    // myMap.behaviors.disable('scrollZoom');

                    const areas = mapBlock.querySelectorAll('.ymap__area');

                    if (areas.length > 0) {
                        const showGeoObjects = () => {
                            myMap.geoObjects.removeAll();

                            const ans: any[] = [];
                            const extendedResult: any[] = [];

                            areas.forEach((area: any, index) => {
                                const items =
                                    area.querySelectorAll('.ymap__item');
                                const myGeoObjects: any[] = [];

                                items.forEach((item: any) => {
                                    const coordinates = item
                                        .getAttribute('data-coordinates')
                                        .split(',');
                                    myGeoObjects.push({
                                        type: 'Feature',
                                        geometry: {
                                            type: 'Point',
                                            coordinates,
                                        },
                                        options: {
                                            iconLayout: 'default#image',
                                            iconImageHref: pin,
                                            iconImageSize: [26, 36],
                                            iconImageOffset: [-13, -36],
                                            hasHint: true,
                                        },
                                        properties: {
                                            clusterCaption:
                                                item.getAttribute('data-name'),
                                            balloonContentBody: item.innerHTML,
                                            hintContent:
                                                item.getAttribute('data-name'),
                                        },
                                    });
                                });

                                ans[
                                    index
                                ] = `{"type": "FeatureCollection", "features": ${JSON.stringify(
                                    myGeoObjects
                                )}}`;

                                const result = ymaps.geoQuery(myMap.geoObjects);
                                extendedResult[index] = result.add(ans[index]);
                                const clusterer = extendedResult[index]
                                    .search('geometry.type == "Point"')
                                    .clusterize({
                                        gridSize: 50,
                                        minClusterSize: 2,
                                        clusterIconColor: '#356A41',
                                        zoomMargin: 50,
                                    });
                                myMap.geoObjects.add(clusterer);
                            });

                            const setMapCenter = (cityIndex: any) => {
                                if (
                                    extendedResult[cityIndex]._objects.length >
                                    1
                                ) {
                                    myMap.setBounds(
                                        extendedResult[cityIndex].getBounds(),
                                        {
                                            checkZoomRange: true,
                                            zoomMargin: 50,
                                        }
                                    );
                                }
                                if (
                                    extendedResult[cityIndex]._objects
                                        .length === 1
                                ) {
                                    myMap.setCenter(
                                        extendedResult[cityIndex]._objects[0]
                                            .geometry._coordinates,
                                        13
                                    );
                                }
                            };

                            setMapCenter(cityIndex);

                            selectCity?.addEventListener('change', () => {
                                setMapCenter(selectCity.value);
                            });

                            document.addEventListener('modalOpen', () => {
                                let cityModalIndex = cityIndex;

                                if (mapBlock.getAttribute('data-city')) {
                                    areas.forEach((area, i) => {
                                        if (
                                            area.getAttribute('data-city') ===
                                            mapBlock.getAttribute('data-city')
                                        ) {
                                            cityModalIndex = i;
                                        }
                                    });
                                }

                                setTimeout(() => {
                                    setMapCenter(cityModalIndex);
                                }, 100);
                            });
                        };

                        showGeoObjects();
                    }
                };
                mapInit();
            });
        }
    },
    { once: true }
);
