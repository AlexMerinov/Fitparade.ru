const cityPosition = () => {
    const link = document.querySelector('.js-modal-city');
    if (link !== null && link !== undefined) {
        const rect = link.getBoundingClientRect();
        const modal = document.getElementById('modal-city');
        modal?.setAttribute(
            'style',
            `--modal-x:${rect.x}px; --modal-w:${rect.width}px;`
        );
    }
};

document.addEventListener('DOMContentLoaded', () => {
    cityPosition();
});

window.addEventListener('resize', () => {
    cityPosition();
});
