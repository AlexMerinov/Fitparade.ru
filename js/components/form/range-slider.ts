import noUiSlider from 'nouislider';
import wNumb from 'wnumb';

const rangeInit = (item: any) => {
    const slider = item.querySelector('.range-slider__line');
    if (slider !== null && slider !== undefined) {
        let dataMin = 0;
        let dataMax = 100;
        if (slider.getAttribute('data-min')) {
            dataMin = Number(slider.getAttribute('data-min'));
        }
        if (slider.getAttribute('data-min')) {
            dataMax = Number(slider.getAttribute('data-max'));
        }
        let dataValueMin = dataMin;
        let dataValueMax = dataMax;
        if (slider.getAttribute('data-value-min')) {
            dataValueMin = Number(slider.getAttribute('data-value-min'));
        }
        if (slider.getAttribute('data-value-max')) {
            dataValueMax = Number(slider.getAttribute('data-value-max'));
        }
        let suffix = '';
        if (slider.getAttribute('data-suffix')) {
            suffix = ` ${slider.getAttribute('data-suffix')}`;
        }
        noUiSlider.create(slider, {
            start: [dataValueMin, dataValueMax],
            connect: true,
            range: {
                min: dataMin,
                max: dataMax,
            },
            format: wNumb({
                decimals: 0,
                thousand: ' ',
                suffix,
            }),
        });

        const inputMin = item.querySelector('input[data-value-min]');
        const inputMax = item.querySelector('input[data-value-max]');
        if (
            inputMin !== null &&
            inputMin !== undefined &&
            inputMax !== null &&
            inputMax !== undefined
        ) {
            slider.noUiSlider.on('update', (values: any, handle: any) => {
                if (handle == 0) {
                    if (
                        values[handle].replace(/[^0-9]/g, '') * 1 >
                        dataMin * 1
                    ) {
                        inputMin.value = values[handle];
                    } else {
                        inputMin.value = '';
                        inputMin.setAttribute('placeholder', values[handle]);
                    }
                }
                if (handle == 1) {
                    if (
                        values[handle].replace(/[^0-9]/g, '') * 1 <
                        dataMax * 1
                    ) {
                        inputMax.value = values[handle];
                    } else {
                        inputMax.value = '';
                        inputMax.setAttribute('placeholder', values[handle]);
                    }
                }
            });

            slider.noUiSlider.on('change', (values: any, handle: any) => {
                
				if (handle == 0) 
				{
                    inputMin.dispatchEvent(new Event('change'));
                }
                
				if (handle == 1) 
				{
                    inputMax.dispatchEvent(new Event('change'));
                }
				
				// для битрикса // Dmitry
				if (document.querySelector('#NEXT_SMART_FILTER_P1_MIN'))
				{
					document.querySelector('#NEXT_SMART_FILTER_P1_MIN').dispatchEvent(new Event('change'));
				}
				//
            });

            inputMin.addEventListener('change', () => {
                slider.noUiSlider.set([inputMin.value, null]);
            });
			
            inputMax.addEventListener('change', () => {
                slider.noUiSlider.set([null, inputMax.value]);
            });
        }
    }
};

document.addEventListener(
    'DOMContentLoaded',
    () => {
        const ranges = document.querySelectorAll('.js-range-slider');
        ranges.forEach((item) => {
            rangeInit(item);
        });
    },
    { once: true }
);
