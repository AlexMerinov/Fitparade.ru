document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.js-form-tabs');
    tabs.forEach((item) => {
        const tab = item.querySelectorAll('input');
        const tabItems = item.getAttribute('data-tabs');
        const tabContents = document.querySelectorAll(
            `#${tabItems}>.form-tabs-items__item`
        );
        tab.forEach((input, index) => {
            const changeTab = () => {
                item.style.setProperty('--tab-active', index + 1);
                tabContents.forEach((tabContent, indexContent) => {
                    if (index === indexContent) {
                        tabContent.classList.remove('hide');
                    } else {
                        tabContent.classList.add('hide');
                    }
                });
            };

            input.addEventListener('change', () => {
                changeTab();

                if (item.getAttribute('data-tab-sync')) {
                    const tabId = item.getAttribute('data-tab-sync');
                    const tabSync = document.getElementById(tabId);
                    const inputs = tabSync?.querySelectorAll('input');
                    if (inputs !== null && inputs !== undefined) {
                        inputs[index].dispatchEvent(
                            new CustomEvent('customChange')
                        );
                    }
                }
            });

            input.addEventListener('customChange', () => {
                changeTab();
            });
        });
    });
});
