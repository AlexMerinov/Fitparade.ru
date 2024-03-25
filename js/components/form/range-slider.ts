import noUiSlider from 'nouislider';
import wNumb from 'wnumb';

const rangeInit = (item: any) => {
    
	const slider = item.querySelector('.range-slider__line');
	
    if (slider !== null && slider !== undefined) 
	{
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
        ) 
		{
            slider.noUiSlider.on('update', (values: any, handle: any) => {

				//if (window['notFireSliderEvent'])
				//{
				//	window['notFireSliderEvent'] = false;
					
				//	return;
				//}
				//else
				//{
					if (handle == 0) 
					{
						if (values[handle])
						{
							if (values[handle].replace(/[^0-9]/g, '') * 1 > dataMin * 1) 
							{
								inputMin.value = values[handle];
								
								slider.setAttribute('data-value-min', values[handle]);
							} 
							else 
							{
								inputMin.value = '';
								inputMin.setAttribute('placeholder', values[handle]);
								
								slider.setAttribute('data-value-min', '');
							}
						}
					}
					
					if (handle == 1) 
					{
						if (values[handle])
						{
							if (values[handle].replace(/[^0-9]/g, '') * 1 < dataMax * 1) 
							{
								inputMax.value = values[handle];
								
								slider.setAttribute('data-value-max', values[handle]);
							} 
							else 
							{
								inputMax.value = '';
								inputMax.setAttribute('placeholder', values[handle]);
								
								slider.setAttribute('data-value-max', '');
							}
						}
					}
				//}
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

const updateSlider = (item: any) => {
	
	// Вариант 1
	/*
	let sliderUpdate = item.querySelector('.range-slider__line');
	
	if (sliderUpdate !== null && sliderUpdate !== undefined) 
	{
		let dataMin = 0;
		
        let dataMax = 100;
		
        if (sliderUpdate.getAttribute('data-min')) 
		{
            dataMin = Number(sliderUpdate.getAttribute('data-min'));
        }
		
        if (sliderUpdate.getAttribute('data-min')) 
		{
            dataMax = Number(sliderUpdate.getAttribute('data-max'));
        }
		
        let dataValueMin = dataMin;
		
        let dataValueMax = dataMax;
		
        if (sliderUpdate.getAttribute('data-value-min')) 
		{
            dataValueMin = Number(sliderUpdate.getAttribute('data-value-min'));
        }
		
        if (sliderUpdate.getAttribute('data-value-max')) 
		{
            dataValueMax = Number(sliderUpdate.getAttribute('data-value-max'));
        }
		
        let suffix = '';
		
        if (sliderUpdate.getAttribute('data-suffix')) 
		{
            suffix = ` ${sliderUpdate.getAttribute('data-suffix')}`;
        }
		
		window['notFireSliderEvent'] = true;
		
		sliderUpdate.noUiSlider.updateOptions({
			range: {
				'min': dataMin,
				'max': dataMax,
			},
			start: [dataValueMin, dataValueMax]
		}, false); // false не работает, всё равно происходит событие update, которое запихивает в инпуты значения, чего быть не должно, поэтому уничтожим и пересоздадим слайдер

	}
	*/
	
	// Вариант 2
	/**/
	let slider = item.querySelector('.range-slider__line');
	
	if (slider !== null && slider !== undefined) 
	{
		slider.noUiSlider.destroy();
		
		rangeInit(item);
	}
	/**/
}

document.addEventListener(
    'DOMContentLoaded',
    () => {
        const ranges = document.querySelectorAll('.js-range-slider');
        ranges.forEach((item) => {
		
            rangeInit(item);
			
			item.addEventListener('initSlider', function(event) {
				updateSlider(event.target);
			});
			
        });
    },
    { once: true }
);
