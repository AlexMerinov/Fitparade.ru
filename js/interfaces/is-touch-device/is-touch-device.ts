const IsTouchDevice = () => {
    return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
    );
};

export default IsTouchDevice();

document.addEventListener(
    'DOMContentLoaded',
    () => {
        if (IsTouchDevice()) {
            document.body.classList.add('is-touch-device');
        }
    },
    { once: true }
);
