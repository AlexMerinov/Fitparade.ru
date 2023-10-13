document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('.js-checkbox-all');
    inputs.forEach((input: any) => {
        const parent = input.closest('.filter__group');
        const items = parent?.querySelectorAll(
            'input[type="checkbox"]:not(.js-checkbox-all)'
        );

        input.addEventListener('change', () => {
            items?.forEach((item: any) => {
                if (input.checked) {
                    item.checked = false;
                }
            });
        });

        items?.forEach((item: any) => {
            item.addEventListener('change', () => {
                if (item.checked) {
                    input.checked = false;
                }
            });
        });
    });
});
